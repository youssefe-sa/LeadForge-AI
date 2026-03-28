import { useState } from 'react';
import { Lead, ApiConfig, EmailTemplate, callLLM } from '../lib/store';
import { gmailSmtpService } from '../lib/gmailSmtpService';

const C = {
  bg: '#F7F6F2', surface: '#FFFFFF', surface2: '#F2F1EC',
  border: '#E4E2DA', tx: '#1C1B18', tx2: '#5C5A53', tx3: '#9B9890',
  accent: '#D4500A', accent2: '#F0E8DF',
  green: '#1A7A4A', blue: '#1A4FA0', amber: '#B45309', red: '#C0392B',
};

interface Props {
  leads: Lead[];
  updateLead: (id: string, updates: Partial<Lead>) => void;
  apiConfig: ApiConfig;
  templates: EmailTemplate[];
}

export default function Outreach({ leads, updateLead, apiConfig, templates }: Props) {
  const [sending, setSending] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0, name: '' });
  const [logs, setLogs] = useState<string[]>([]);
  const [previewEmail, setPreviewEmail] = useState<{ lead: Lead; subject: string; body: string } | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]?.id || '');
  
  // Test email states
  const [testEmailAddress, setTestEmailAddress] = useState('');
  const [testEmailSending, setTestEmailSending] = useState(false);

  const hasGmailSmtp = !!(apiConfig.gmailSmtpUser && apiConfig.gmailSmtpPassword);
  const hasLLM = !!(apiConfig.groqKey || apiConfig.openrouterKey);

  const ready = leads.filter(l => l.siteGenerated && !l.emailSent && l.email);
  const sent = leads.filter(l => l.emailSent);

  const personalizeTemplate = (template: EmailTemplate, lead: Lead) => {
    const replacements: Record<string, string> = {
      '{name}': lead.name,
      '{city}': lead.city || 'votre ville',
      '{sector}': lead.sector || 'votre secteur',
      '{landingUrl}': lead.landingUrl || lead.siteUrl || '#',
      '{email}': lead.email,
    };
    let subject = template.subject;
    let body = template.body;
    for (const [key, val] of Object.entries(replacements)) {
      subject = subject.split(key).join(val);
      body = body.split(key).join(val);
    }
    return { subject, body };
  };

  const generateEmailContent = async (lead: Lead): Promise<{ subject: string; body: string }> => {
    // Find best template for sector
    const template = templates.find(t => lead.sector?.toLowerCase().includes(t.sector.toLowerCase())) || templates[templates.length - 1];
    const base = personalizeTemplate(template, lead);

    // If LLM available, personalize further
    if (hasLLM) {
      try {
        const prompt = `Personnalise cet email de prospection B2B. Garde le même format et le lien de la landing page. Réponds UNIQUEMENT en JSON.
Lead: ${lead.name}, ${lead.sector || 'secteur inconnu'}, ${lead.city || 'ville inconnue'}
Landing: ${lead.landingUrl || lead.siteUrl}

Email de base:
Sujet: ${base.subject}
Corps: ${base.body}

JSON: {"subject": "sujet personnalisé", "body": "corps personnalisé avec le lien"}`;

        const response = await callLLM(apiConfig, prompt, 'Tu personnalises des emails de prospection en français. Garde toujours le lien de la landing page. Réponds en JSON.');
        if (response) {
          try {
            const cleaned = response.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
            const data = JSON.parse(cleaned);
            if (data.subject && data.body) return data;
          } catch { /* use base */ }
        }
      } catch { /* use base */ }
    }

    return base;
  };

  const previewForLead = async (lead: Lead) => {
    const { subject, body } = await generateEmailContent(lead);
    setPreviewEmail({ lead, subject, body });
  };

  const sendOne = async (lead: Lead) => {
    if (!hasGmailSmtp) { alert('Configurez Gmail SMTP dans les Paramètres'); return; }
    if (!lead.email) { alert('Ce lead n\'a pas d\'email'); return; }

    const { subject, body } = await generateEmailContent(lead);
    const htmlBody = body.replace(/\n/g, '<br/>');
    
    // Configure Gmail SMTP service
    gmailSmtpService.setConfig(apiConfig);
    
    const result = await gmailSmtpService.sendEmail({
      to: lead.email,
      toName: lead.name,
      subject,
      html: htmlBody,
    });
    
    if (result.success) {
      updateLead(lead.id, {
        emailSent: true,
        emailSentDate: new Date().toISOString(),
        stage: 'email_sent',
        lastContact: new Date().toISOString(),
      });
      setLogs(prev => [...prev, `✅ Email envoyé à ${lead.name} (${lead.email})`]);
    } else {
      setLogs(prev => [...prev, `❌ Échec d'envoi à ${lead.name} (${lead.email})`]);
    }
  };

  const sendBatch = async () => {
    if (!hasGmailSmtp) { alert('Configurez Gmail SMTP dans les Paramètres'); return; }
    if (ready.length === 0) return;

    setSending(true);
    setProgress({ current: 0, total: ready.length, name: '' });
    setLogs(prev => [...prev, `🚀 Début de l'envoi de ${ready.length} emails...`]);

    // Configure Gmail SMTP service
    gmailSmtpService.setConfig(apiConfig);

    for (let i = 0; i < ready.length; i++) {
      const lead = ready[i];
      setProgress({ current: i + 1, total: ready.length, name: lead.name });

      const { subject, body } = await generateEmailContent(lead);
      const htmlBody = body.replace(/\n/g, '<br/>');
      
      const result = await gmailSmtpService.sendEmail({
        to: lead.email,
        toName: lead.name,
        subject,
        html: htmlBody,
      });

      if (result.success) {
        updateLead(lead.id, {
          emailSent: true,
          emailSentDate: new Date().toISOString(),
          stage: 'email_sent',
          lastContact: new Date().toISOString(),
        });
        setLogs(prev => [...prev, `✅ ${lead.name} — envoyé`]);
      } else {
        setLogs(prev => [...prev, `❌ ${lead.name} — échec`]);
      }

      // Rate limit: 1 email per 2 seconds
      if (i < ready.length - 1) await new Promise(r => setTimeout(r, 2000));
    }

    setLogs(prev => [...prev, `🏁 Envoi terminé.`]);
    setSending(false);
  };

  // Send test email function
  const sendTestEmail = async () => {
    if (!hasGmailSmtp) { 
      alert('Configurez Gmail SMTP dans les Paramètres'); 
      console.log('Debug hasGmailSmtp:', hasGmailSmtp);
      console.log('Debug apiConfig:', apiConfig);
      return; 
    }
    if (!testEmailAddress || !testEmailAddress.includes('@')) {
      alert('Veuillez entrer une adresse email valide');
      return;
    }

    setTestEmailSending(true);
    setLogs(prev => [...prev, `🧪 Envoi d'email test à ${testEmailAddress}...`]);

    // Configure Gmail SMTP service
    gmailSmtpService.setConfig(apiConfig);
    
    // Debug: check if service is configured
    const isServiceConfigured = gmailSmtpService.isConfigured();
    console.log('Debug isServiceConfigured:', isServiceConfigured);
    console.log('Debug apiConfig passed to service:', {
      gmailSmtpUser: apiConfig.gmailSmtpUser,
      gmailSmtpPassword: apiConfig.gmailSmtpPassword ? '***' + apiConfig.gmailSmtpPassword.slice(-4) : 'missing',
      passwordLength: apiConfig.gmailSmtpPassword?.length
    });

    // Get the first template
    const template = templates.find(t => t.id === selectedTemplate) || templates[0];
    
    // Personalize template with test data
    const testLead: Lead = {
      id: 'test',
      name: 'Test Prospect',
      email: testEmailAddress,
      sector: template?.sector || 'Commerce',
      city: 'Ville Test',
      landingUrl: 'https://example.com',
    } as Lead;

    const { subject, body } = personalizeTemplate(template, testLead);
    const htmlBody = body.replace(/\n/g, '<br/>');

    const result = await gmailSmtpService.sendEmail({
      to: testEmailAddress,
      toName: 'Test',
      subject,
      html: htmlBody,
    });

    if (result.success) {
      setLogs(prev => [...prev, `✅ Email test envoyé à ${testEmailAddress}`]);
    } else {
      setLogs(prev => [...prev, `❌ Échec envoi test: ${result.message}`]);
    }

    setTestEmailSending(false);
  };

  return (
    <div className="animate-fade" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start', 
        marginBottom: 28,
        position: 'sticky',
        top: 0,
        zIndex: 10,
        background: C.bg,
        padding: '20px 0',
        borderBottom: `1px solid ${C.border}`
      }}>
        <div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 700, color: C.tx, marginBottom: 4 }}>
            Outreach Agent
          </h1>
          <p style={{ color: C.tx3, fontSize: 14 }}>
            Envoyez des emails personnalisés via Gmail SMTP
            {hasGmailSmtp ? ' — Gmail SMTP ✅' : ' — ⚠️ Configurez Gmail SMTP dans les Paramètres'}
          </p>
        </div>
        <button onClick={sendBatch} disabled={sending || ready.length === 0 || !hasGmailSmtp} style={{
          padding: '10px 20px', borderRadius: 6, border: 'none',
          background: sending || !hasGmailSmtp ? C.tx3 : C.amber, color: '#fff',
          fontWeight: 600, fontSize: 14, cursor: sending || !hasGmailSmtp ? 'default' : 'pointer',
        }}>
          {sending ? `Envoi ${progress.current}/${progress.total}...` : `📧 Envoyer ${ready.length} emails`}
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Emails Envoyés', value: sent.length, color: C.green },
          { label: 'Prêts à Envoyer', value: ready.length, color: C.amber },
          { label: 'Ouverts', value: leads.filter(l => l.emailOpened).length, color: C.blue },
          { label: 'Cliqués', value: leads.filter(l => l.emailClicked).length, color: C.accent },
        ].map((s, i) => (
          <div key={i} style={{
            background: C.surface, borderRadius: 8, padding: '20px 22px',
            borderLeft: `3px solid ${s.color}`, boxShadow: '0 1px 3px rgba(28,27,24,0.06)',
          }}>
            <div style={{ fontSize: 12, color: C.tx3, fontWeight: 500, marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 32, fontWeight: 700, fontFamily: "'Fraunces', serif", color: C.tx }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Progress */}
      {sending && (
        <div style={{ background: C.surface, borderRadius: 8, padding: '16px 20px', border: `1px solid ${C.border}`, marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 500 }}>📧 Envoi: {progress.name}</span>
            <span style={{ fontSize: 12, color: C.tx3, fontFamily: "'DM Mono', monospace" }}>{progress.current}/{progress.total}</span>
          </div>
          <div style={{ height: 6, borderRadius: 3, background: C.surface2, overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: 3, background: C.amber,
              width: `${(progress.current / progress.total) * 100}%`,
              transition: 'width 300ms',
            }} />
          </div>
        </div>
      )}

      {/* Templates */}
      <div style={{ background: C.surface, borderRadius: 8, padding: '20px', border: `1px solid ${C.border}`, marginBottom: 20 }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>📋 Templates d'email</h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {templates.map(t => (
            <button key={t.id} onClick={() => setSelectedTemplate(t.id)} style={{
              padding: '8px 14px', borderRadius: 6, fontSize: 13, cursor: 'pointer',
              border: `1px solid ${selectedTemplate === t.id ? C.amber : C.border}`,
              background: selectedTemplate === t.id ? '#fff7ed' : C.surface,
              color: selectedTemplate === t.id ? C.amber : C.tx2, fontWeight: 500,
            }}>{t.name}</button>
          ))}
        </div>
        {templates.find(t => t.id === selectedTemplate) && (
          <div style={{ marginTop: 14, padding: '14px', background: C.bg, borderRadius: 6, fontSize: 13 }}>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>
              Sujet: {templates.find(t => t.id === selectedTemplate)?.subject}
            </div>
            <pre style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: C.tx2, whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
              {templates.find(t => t.id === selectedTemplate)?.body}
            </pre>
          </div>
        )}
      </div>

      {/* Test Email Section */}
      <div style={{ background: C.surface, borderRadius: 8, padding: '20px', border: `1px solid ${C.border}`, marginBottom: 20 }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>🧪 Envoyer un email test</h3>
        <p style={{ fontSize: 13, color: C.tx2, marginBottom: 12 }}>
          Envoyez un email test pour vérifier l'apparence et la livraison avant d'envoyer à vos leads.
        </p>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <input
            type="email"
            value={testEmailAddress}
            onChange={e => setTestEmailAddress(e.target.value)}
            placeholder="votre.email@test.com"
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: 6,
              border: `1px solid ${C.border}`,
              fontSize: 13,
              background: C.surface,
              color: C.tx,
            }}
          />
          <button
            onClick={sendTestEmail}
            disabled={testEmailSending || !hasGmailSmtp}
            style={{
              padding: '10px 20px',
              borderRadius: 6,
              border: 'none',
              background: testEmailSending || !hasGmailSmtp ? C.tx3 : C.blue,
              color: '#fff',
              fontWeight: 600,
              fontSize: 14,
              cursor: testEmailSending || !hasGmailSmtp ? 'default' : 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {testEmailSending ? '⏳ Envoi...' : '🧪 Envoyer test'}
          </button>
        </div>
        {!hasGmailSmtp && (
          <div style={{ marginTop: 10, fontSize: 12, color: C.amber }}>
            ⚠️ Configurez Gmail SMTP dans les Paramètres pour envoyer des emails
          </div>
        )}
      </div>

      {/* Ready to send and Sent grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Ready to send */}
        <div style={{ background: C.surface, borderRadius: 8, padding: '20px', border: `1px solid ${C.border}` }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16, color: C.amber }}>📬 Prêts à envoyer ({ready.length})</h3>
          <div style={{ maxHeight: 400, overflowY: 'auto' }}>
            {ready.map(lead => (
              <div key={lead.id} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '10px 12px', borderBottom: `1px solid ${C.border}`,
              }}>
                <div>
                  <div style={{ fontWeight: 500, fontSize: 13 }}>{lead.name}</div>
                  <div style={{ fontSize: 11, color: C.tx3, fontFamily: "'DM Mono', monospace" }}>{lead.email}</div>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button onClick={() => previewForLead(lead)} style={{
                    padding: '4px 10px', borderRadius: 4, border: `1px solid ${C.border}`,
                    background: C.surface, fontSize: 12, cursor: 'pointer', color: C.blue,
                  }}>👁️</button>
                  <button onClick={() => sendOne(lead)} disabled={!hasGmailSmtp} style={{
                    padding: '4px 10px', borderRadius: 4, border: 'none',
                    background: hasGmailSmtp ? C.amber : C.tx3, color: '#fff', fontSize: 12, cursor: hasGmailSmtp ? 'pointer' : 'default',
                  }}>Envoyer</button>
                </div>
              </div>
            ))}
            {ready.length === 0 && <p style={{ color: C.tx3, fontSize: 13, textAlign: 'center', padding: 20 }}>Aucun lead prêt à recevoir un email</p>}
          </div>
        </div>

        {/* Sent */}
        <div style={{ background: C.surface, borderRadius: 8, padding: '20px', border: `1px solid ${C.border}` }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16, color: C.green }}>✅ Emails envoyés ({sent.length})</h3>
          <div style={{ maxHeight: 400, overflowY: 'auto' }}>
            {sent.map(lead => (
              <div key={lead.id} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '10px 12px', borderBottom: `1px solid ${C.border}`,
              }}>
                <div>
                  <div style={{ fontWeight: 500, fontSize: 13 }}>{lead.name}</div>
                  <div style={{ fontSize: 11, color: C.tx3, fontFamily: "'DM Mono', monospace" }}>
                    {lead.emailSentDate ? new Date(lead.emailSentDate).toLocaleDateString('fr-FR') : ''} — {lead.email}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                  {lead.emailOpened && <span style={{ fontSize: 10, padding: '2px 6px', borderRadius: 3, background: '#dbeafe', color: C.blue, fontWeight: 600 }}>Ouvert</span>}
                  {lead.emailClicked && <span style={{ fontSize: 10, padding: '2px 6px', borderRadius: 3, background: '#e8f5e9', color: C.green, fontWeight: 600 }}>Cliqué</span>}
                </div>
              </div>
            ))}
            {sent.length === 0 && <p style={{ color: C.tx3, fontSize: 13, textAlign: 'center', padding: 20 }}>Aucun email envoyé</p>}
          </div>
        </div>
      </div>

      {/* Logs */}
      {logs.length > 0 && (
        <div style={{ background: C.surface, borderRadius: 8, padding: '16px 20px', border: `1px solid ${C.border}`, marginTop: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600 }}>Journal d'envoi</h3>
            <button onClick={() => setLogs([])} style={{
              padding: '3px 10px', borderRadius: 4, border: `1px solid ${C.border}`,
              background: C.surface, fontSize: 11, cursor: 'pointer', color: C.tx3,
            }}>Effacer</button>
          </div>
          <div style={{ maxHeight: 200, overflowY: 'auto', fontFamily: "'DM Mono', monospace", fontSize: 12 }}>
            {logs.map((log, i) => (
              <div key={i} style={{ padding: '3px 0', color: log.startsWith('✅') ? C.green : log.startsWith('❌') ? C.red : C.tx2 }}>{log}</div>
            ))}
          </div>
        </div>
      )}

      {/* Email Preview Modal */}
      {previewEmail && (
        <>
          <div onClick={() => setPreviewEmail(null)} style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.3)', zIndex: 99,
          }} />
          <div style={{
            position: 'fixed', top: '10%', left: '50%', transform: 'translateX(-50%)',
            width: 600, maxHeight: '80%', background: C.surface, borderRadius: 12,
            zIndex: 100, padding: 28, overflowY: 'auto',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 20 }}>Aperçu de l'email</h2>
              <button onClick={() => setPreviewEmail(null)} style={{
                width: 28, height: 28, borderRadius: 4, border: `1px solid ${C.border}`,
                background: C.surface, fontSize: 14, cursor: 'pointer',
              }}>✕</button>
            </div>
            <div style={{ marginBottom: 12 }}>
              <span style={{ fontSize: 12, color: C.tx3 }}>À :</span>
              <span style={{ fontSize: 13, marginLeft: 8, fontFamily: "'DM Mono', monospace" }}>{previewEmail.lead.email}</span>
            </div>
            <div style={{ marginBottom: 16 }}>
              <span style={{ fontSize: 12, color: C.tx3 }}>Sujet :</span>
              <span style={{ fontSize: 14, marginLeft: 8, fontWeight: 600 }}>{previewEmail.subject}</span>
            </div>
            <div style={{
              padding: 20, background: C.bg, borderRadius: 8, fontSize: 14, lineHeight: 1.7,
              whiteSpace: 'pre-wrap', fontFamily: "'Bricolage Grotesque', sans-serif",
            }}>{previewEmail.body}</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
              <button onClick={() => { sendOne(previewEmail.lead); setPreviewEmail(null); }} disabled={!hasGmailSmtp} style={{
                flex: 1, padding: '11px 0', borderRadius: 6, border: 'none',
                background: hasGmailSmtp ? C.amber : C.tx3, color: '#fff', fontWeight: 600, fontSize: 14,
                cursor: hasGmailSmtp ? 'pointer' : 'default',
              }}>📧 Envoyer maintenant</button>
              <button onClick={() => setPreviewEmail(null)} style={{
                padding: '11px 20px', borderRadius: 6, border: `1px solid ${C.border}`,
                background: C.surface, color: C.tx2, fontWeight: 500, fontSize: 14, cursor: 'pointer',
              }}>Fermer</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
