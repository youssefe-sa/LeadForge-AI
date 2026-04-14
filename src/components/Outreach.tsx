import { useState } from 'react';
import { Lead, ApiConfig, EmailTemplate, callLLM } from '../lib/supabase-store';
import { supabase } from '../lib/supabase';
import { salesTemplates, reminderTemplates, getTemplateById } from '../templates/outreach-templates-final';

const C = {
  bg: '#F7F6F2', surface: '#FFFFFF', surface2: '#F2F1EC',
  border: '#E4E2DA', tx: '#1C1B18', tx2: '#4A4943', tx3: '#6B6960',
  accent: '#D4500A', accent2: '#F0E8DF',
  green: '#1A7A4A', blue: '#1A4FA0', amber: '#B45309', red: '#C0392B',
};

const API_BASE = '/api';

interface Props {
  leads: Lead[];
  updateLead: (id: string, updates: Partial<Lead>) => void;
  apiConfig: ApiConfig;
  templates: EmailTemplate[];
}

async function sendEmailViaApi(payload: {
  to: string; toName?: string; subject: string; html: string; leadId?: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(`${API_BASE}/email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) return { success: false, message: data.message || data.error || 'Erreur serveur' };
    return { success: true, message: data.message || 'Email envoyé' };
  } catch (err: unknown) {
    return { success: false, message: (err as Error).message };
  }
}

export default function Outreach({ leads, updateLead, apiConfig, templates }: Props) {
  const [sending, setSending] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0, name: '' });
  const [emailDelay, setEmailDelay] = useState(8000);
  const [logs, setLogs] = useState<string[]>([]);
  const [previewEmail, setPreviewEmail] = useState<{ lead: Lead; subject: string; body: string } | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState(salesTemplates[0]?.id || '');

  const [testEmailAddress, setTestEmailAddress] = useState('');
  const [testEmailSending, setTestEmailSending] = useState(false);

  // Nouveaux états pour workflow et paiement
  const [workflowMode, setWorkflowMode] = useState<'manual' | 'automated'>('manual');
  const [selectedWorkflowTemplate, setSelectedWorkflowTemplate] = useState('step-1-presentation');
  const [paymentLinks, setPaymentLinks] = useState<Record<string, { link: string; amount: number; created: string }>>({});
  const [devisLinks, setDevisLinks] = useState<Record<string, string>>({});
  const [invoiceLinks, setInvoiceLinks] = useState<Record<string, string>>({});
  const [showEmailPreview, setShowEmailPreview] = useState(false);

  const hasGmailSmtp = !!(apiConfig.gmailSmtpUser && apiConfig.gmailSmtpPassword);
  const hasLLM = !!(apiConfig.groqKey || apiConfig.geminiKey || apiConfig.nvidiaKey || apiConfig.openrouterKey);

  const ready = leads.filter(l => l.siteGenerated && !l.emailSent && l.email);
  const sent = leads.filter(l => l.emailSent);

  // Fonction de salutation professionnelle B2B
  const getSalutation = (lead: { name: string; contactName?: string }): string => {
    if (lead.contactName && lead.contactName.trim()) {
      return lead.contactName.trim();
    }
    return lead.name;
  };

  // Fonction de personnalisation partagée et robuste
  const personalizeTemplateContent = (template: EmailTemplate, lead: Lead, config: ApiConfig) => {
    // Détecter le domaine actuel pour le tracking
    const baseUrl = typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : 'https://leadforge.ai';
    const trackBase = `${baseUrl}/api/track?id=${lead.id}`;

    // Helper pour wrapper un lien avec le tracker
    const wrapLink = (url: string, type: string) => {
      if (!url || url === '#' || !lead.id) return url;
      return `${trackBase}&type=${type}&url=${encodeURIComponent(url)}`;
    };

    // 1. Définir toutes les variables de remplacement
    const firstName = (lead.contactName || lead.name || '').split(' ')[0];
    // trackBase est déjà déclaré à la ligne 76

    const replacements: Record<string, string> = {
      '{{name}}': lead.name || '',
      '{{firstName}}': firstName,
      '{{companyName}}': lead.name || '',
      '{{city}}': lead.city || 'votre ville',
      '{{sector}}': lead.sector || 'votre secteur',
      
      // Boutons traçables
      '{{websiteLink}}': `${trackBase}&type=site_clicked`,
      '{{startProjectLink}}': `${trackBase}&type=start_clicked`,
      '{{landingUrl}}': `${trackBase}&type=site_clicked`,
      '{{paymentLink}}': `${trackBase}&type=payment_clicked`,
      '{{finalPaymentLink}}': `${trackBase}&type=payment_clicked&final=true`,
      '{{devisLink}}': `${trackBase}&type=devis_clicked&url=${encodeURIComponent(lead.devis_url || '#')}`,
      '{{invoiceLink}}': `${trackBase}&type=invoice_clicked`,
      
      // Infos de Livraison (Email 6)
      '{{adminLink}}': lead.admin_url || `${lead.siteUrl || lead.website || ''}/admin`,
      '{{adminUsername}}': lead.admin_username || lead.name?.toLowerCase().replace(/\s+/g, '') || 'admin',
      '{{adminPassword}}': lead.admin_password || '********',
      '{{documentationLink}}': lead.documentation_url || '#',

      // Infos Agent
      '{{agentName}}': config.gmailSmtpFromName || 'Solutions Web',
      '{{agentEmail}}': config.gmailSmtpFromEmail || 'contact@leadforge.ai',
      
      // Données dynamiques
      '{{price}}': '146',
      '{{amount}}': '146',
      '{{validityDays}}': '7',
      '{{deliveryDate}}': new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR'),
      '{{expiryDate}}': new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR'),
    };

    let subject = template.subject || '';
    // Priorité au HTML pour la structure pro, fallback sur le texte
    let body = template.htmlContent || template.textContent || ''; 

    // 2. Remplacement massif et sécurisé
    for (const [key, val] of Object.entries(replacements)) {
      subject = subject.split(key).join(val);
      body = body.split(key).join(val);
    }

    return { subject, body };
  };

  const generateEmailContent = async (lead: Lead): Promise<{ subject: string; body: string }> => {
    // UNIFICATION : On donne la priorité aux templates de la BASE DE DONNÉES
    const allTemplates = [...templates, ...salesTemplates, ...reminderTemplates];
    const template = allTemplates.find((t: EmailTemplate) => t.id === selectedTemplate) || allTemplates[0];
    
    const base = personalizeTemplateContent(template, lead, apiConfig);

    if (hasLLM) {
      try {
        const prompt = `Personnalise cet email de prospection B2B. Garde le même format HTML et tous les liens intacts (landing, devis, paiement). Réponds UNIQUEMENT en JSON.
Lead: ${lead.name}, ${lead.sector || 'secteur inconnu'}, ${lead.city || 'ville inconnue'}
Template: ${template.name}

Email de base:
Sujet: ${base.subject}
Corps: ${base.body}

JSON: {"subject": "sujet personnalisé", "body": "corps personnalisé avec les liens inchangés"}`;

        const response = await callLLM(apiConfig, prompt, 'Tu personnalises des emails de prospection pro. Tu ne modifies JAMAIS les balises HTML ou les liens href. Réponds en JSON.');
        if (response) {
          try {
            const cleaned = response.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
            const data = JSON.parse(cleaned);
            if (data.subject && data.body) return data;
          } catch { /* fallback base */ }
        }
      } catch { /* fallback base */ }
    }

    return base;
  };

  const previewForLead = async (lead: Lead) => {
    const { subject, body } = await generateEmailContent(lead);
    setPreviewEmail({ lead, subject, body });
  };

  const sendWorkflowEmail = async (lead: Lead, templateId: string) => {
    if (!hasGmailSmtp) { alert('Configurez Gmail SMTP dans les Paramètres'); return; }
    if (!lead.email) { alert("Ce lead n'a pas d'email"); return; }

    // UNIFICATION : On cherche d'abord dans les templates de la DB (prop templates)
    const allTemplates = [...templates, ...salesTemplates, ...reminderTemplates];
    const template = allTemplates.find(t => t.id === templateId);
    if (!template) return;

    // SÉCURITÉ : Extraire le contenu (body si DB, htmlContent si Local)
    const rawContent = (template as any).body || template.htmlContent;
    const { subject, body } = personalizeTemplateContent({ ...template, htmlContent: rawContent }, lead, apiConfig);
    
    const result = await sendEmailViaApi({
      to: lead.email,
      toName: lead.name,
      subject,
      html: body, // Plus de replace br ici !
      leadId: lead.id,
    });

    if (result.success) {
      updateLead(lead.id, {
        emailSent: true,
        emailSentDate: new Date().toISOString(),
        stage: 'email_sent',
        lastContact: new Date().toISOString(),
      });
      setLogs(prev => [...prev, `✅ ${template.name} envoyé à ${lead.name}`]);
      
      // --- LOGIQUE DE RAPPEL AUTOMATIQUE J+1 ---
      let nextReminderId = '';
      if (templateId === 'step-1-presentation') nextReminderId = 'reminder1_after_email1';
      if (templateId === 'step-2-devis') nextReminderId = 'reminder2_after_devis';
      if (templateId === 'step-4-paiement') nextReminderId = 'reminder3_final_payment';

      if (nextReminderId) {
        const scheduledDate = new Date();
        scheduledDate.setDate(scheduledDate.getDate() + 1); // <--- PASSAGE À J+1
        
        supabase.from('scheduled_emails').insert([{
          lead_id: lead.id,
          template_id: nextReminderId,
          scheduled_for: scheduledDate.toISOString(),
          status: 'pending'
        }]).then(({ error }) => {
          const reminderNum = nextReminderId.includes('reminder1') ? '1' : 
                             nextReminderId.includes('reminder2') ? '2' : '3';
          if (!error) setLogs(prev => [...prev, `📅 Rappel ${reminderNum} programmé pour DEMAIN`]);
        });
      }
    } else {
      setLogs(prev => [...prev, `❌ Échec ${templateId} : ${result.message}`]);
    }
  };

  const confirmDeposit = async (lead: Lead) => {
    // 1. Annuler toutes les relances (reminders) programmées car le client a payé l'acompte
    await supabase.from('scheduled_emails').delete().eq('lead_id', lead.id).eq('status', 'pending');
    
    // 2. Envoyer immédiatement l'Email 3 (Confirmation Dépôt)
    await sendWorkflowEmail(lead, 'step-3-depot');
    
    // 3. Programmer le solde final (Email 4) dans 2 jours (Production Express)
    const scheduledDate = new Date();
    scheduledDate.setDate(scheduledDate.getDate() + 2); // <--- PASSAGE À J+2
    
    await supabase.from('scheduled_emails').insert([{
      lead_id: lead.id,
      template_id: 'step-4-paiement',
      scheduled_for: scheduledDate.toISOString(),
      status: 'pending'
    }]);

    setLogs(prev => [...prev, `💵 Acompte validé pour ${lead.name}. Email 3 envoyé et Email 4 programmé.`]);
  };

  const confirmFinalPayment = async (lead: Lead) => {
    // 1. Annuler toutes les relances programmées
    await supabase.from('scheduled_emails').delete().eq('lead_id', lead.id).eq('status', 'pending');
    
    // 2. Envoyer immédiatement l'Email 5 (Confirmation Solde Final)
    await sendWorkflowEmail(lead, 'step-5-confirmation');
    
    // 3. Programmer l'Email 6 (Livraison) pour dans 1 heure (le temps du déploiement final)
    const deliveryDate = new Date();
    deliveryDate.setHours(deliveryDate.getHours() + 1);
    
    await supabase.from('scheduled_emails').insert([{
      lead_id: lead.id,
      template_id: 'step-6-livraison',
      scheduled_for: deliveryDate.toISOString(),
      status: 'pending'
    }]);

    setLogs(prev => [...prev, `🏆 Solde final validé pour ${lead.name}. Email 5 envoyé et Livraison (E6) programmée.`]);
    
    updateLead(lead.id, {
      stage: 'converted',
      revenue: 146
    });
  };

  const sendOne = async (lead: Lead) => {
    if (!hasGmailSmtp) { alert('Configurez Gmail SMTP dans les Paramètres'); return; }
    if (!lead.email) { alert("Ce lead n'a pas d'email"); return; }

    const { subject, body } = await generateEmailContent(lead);
    const result = await sendEmailViaApi({
      to: lead.email,
      toName: lead.name,
      subject,
      html: body, // On envoie le HTML pur sans altération
      leadId: lead.id,
    });

    if (result.success) {
      updateLead(lead.id, {
        emailSent: true,
        emailSentDate: new Date().toISOString(),
        stage: 'email_sent',
        lastContact: new Date().toISOString(),
      });
      setLogs(prev => [...prev, `✅ Email envoyé à ${lead.name}`]);
    } else {
      setLogs(prev => [...prev, `❌ Échec d'envoi à ${lead.name}: ${result.message}`]);
    }
  };

  const sendBatch = async () => {
    if (!hasGmailSmtp) { alert('Configurez Gmail SMTP dans les Paramètres'); return; }
    if (ready.length === 0) return;

    setSending(true);
    setProgress({ current: 0, total: ready.length, name: '' });
    setLogs(prev => [...prev, `🚀 Début de l'envoi de ${ready.length} emails...`]);

    for (let i = 0; i < ready.length; i++) {
      const lead = ready[i];
      setProgress({ current: i + 1, total: ready.length, name: lead.name });

      const { subject, body } = await generateEmailContent(lead);
      const result = await sendEmailViaApi({
        to: lead.email!,
        toName: lead.name,
        subject,
        html: body,
        leadId: lead.id,
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
        setLogs(prev => [...prev, `❌ ${lead.name} — ${result.message}`]);
      }

      if (i < ready.length - 1) await new Promise(r => setTimeout(r, emailDelay));
    }

    setLogs(prev => [...prev, `🏁 Envoi terminé.`]);
    setSending(false);
  };

  const sendTestEmail = async () => {
    if (!hasGmailSmtp) { alert('Configurez Gmail SMTP dans les Paramètres'); return; }
    if (!testEmailAddress || !testEmailAddress.includes('@')) {
      alert('Veuillez entrer une adresse email valide');
      return;
    }

    setTestEmailSending(true);
    setLogs(prev => [...prev, `🧪 Envoi d'email test à ${testEmailAddress}...`]);

    const allTemplates = [...salesTemplates, ...reminderTemplates];
    const template = allTemplates.find((t: EmailTemplate) => t.id === selectedTemplate) || allTemplates[0];
    const testLead: Lead = {
      id: 'test', name: 'Test Prospect', email: testEmailAddress,
      sector: 'Commerce', city: 'Ville Test',
      landingUrl: 'https://example.com',
    } as Lead;

    const { subject, body } = personalizeTemplateContent(template, testLead, apiConfig);
    const result = await sendEmailViaApi({
      to: testEmailAddress,
      toName: 'Test',
      subject,
      html: body.replace(/\n/g, '<br/>'),
    });

    setLogs(prev => [...prev, result.success
      ? `✅ Email test envoyé à ${testEmailAddress}`
      : `❌ Échec envoi test: ${result.message}`
    ]);
    setTestEmailSending(false);
  };

  // Wrappers pour le workflow (utilisés dans le JSX)
  const sendEmail1Demo = (lead: Lead) => sendWorkflowEmail(lead, 'step-1-presentation');
  const sendEmail2WithPayment = (lead: Lead) => sendWorkflowEmail(lead, 'step-2-devis');
  const sendEmail3Confirmation = (lead: Lead) => sendWorkflowEmail(lead, 'step-3-depot');

  return (
    <div className="animate-fade" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        marginBottom: 28, position: 'sticky', top: 0, zIndex: 10,
        background: C.bg, padding: '20px 0', borderBottom: `1px solid ${C.border}`
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 12, color: C.tx3 }}>⏱ Délai entre emails :</span>
            {[2, 3, 5, 8].map(s => (
              <button key={s} onClick={() => setEmailDelay(s * 1000)} disabled={sending} style={{
                padding: '4px 10px', borderRadius: 4, border: `1px solid ${emailDelay === s * 1000 ? C.amber : C.border}`,
                background: emailDelay === s * 1000 ? C.amber + '22' : C.surface,
                color: emailDelay === s * 1000 ? C.amber : C.tx2,
                fontSize: 12, fontWeight: emailDelay === s * 1000 ? 700 : 400,
                cursor: sending ? 'default' : 'pointer',
              }}>{s}s</button>
            ))}
          </div>
          <button onClick={sendBatch} disabled={sending || ready.length === 0 || !hasGmailSmtp} style={{
            padding: '10px 20px', borderRadius: 6, border: 'none',
            background: sending || !hasGmailSmtp ? C.tx3 : C.amber, color: '#fff',
            fontWeight: 600, fontSize: 14, cursor: sending || !hasGmailSmtp ? 'default' : 'pointer',
          }}>
            {sending ? `Envoi ${progress.current}/${progress.total}...` : `📧 Envoyer ${ready.length} emails`}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Prêts à Envoyer', value: ready.length, color: C.amber },
          { label: 'Emails Envoyés', value: sent.length, color: C.green },
          { label: 'Ouverts', value: leads.filter(l => l.emailOpened).length, color: C.blue },
          { label: 'Non Ouverts', value: leads.filter(l => l.emailSent && !l.emailOpened).length, color: '#6c757d' },
          { label: 'Lien Site Cliqués', value: leads.filter(l => l.siteClicked).length, color: '#17a2b8' },
          { label: 'Lien Paiement Cliqués', value: leads.filter(l => l.paymentClicked).length, color: '#28a745' },
          { label: 'Devis Cliqués', value: leads.filter(l => l.devisClicked).length, color: '#ffc107' },
          { label: 'Facture Cliqués', value: leads.filter(l => l.invoiceClicked).length, color: '#dc3545' },
        ].map((s, i) => (
          <div key={i} style={{
            background: C.surface, borderRadius: 8, padding: '16px 12px',
            borderLeft: `3px solid ${s.color}`, boxShadow: '0 1px 3px rgba(28,27,24,0.06)',
          }}>
            <div style={{ fontSize: 10, color: C.tx3, fontWeight: 500, marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 24, fontWeight: 700, fontFamily: "'Fraunces', serif", color: C.tx }}>{s.value}</div>
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

      {/* Workflow Mode */}
      <div style={{ background: C.surface, borderRadius: 8, padding: '20px', border: `1px solid ${C.border}`, marginBottom: 20 }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>🚀 Mode Workflow</h3>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <button onClick={() => setWorkflowMode('manual')} style={{
            padding: '8px 16px', borderRadius: 6, fontSize: 13, cursor: 'pointer',
            border: `1px solid ${workflowMode === 'manual' ? C.accent : C.border}`,
            background: workflowMode === 'manual' ? C.accent2 : C.surface,
            color: workflowMode === 'manual' ? C.accent : C.tx2, fontWeight: 500,
          }}>📧 Manuel</button>
          <button onClick={() => setWorkflowMode('automated')} style={{
            padding: '8px 16px', borderRadius: 6, fontSize: 13, cursor: 'pointer',
            border: `1px solid ${workflowMode === 'automated' ? C.accent : C.border}`,
            background: workflowMode === 'automated' ? C.accent2 : C.surface,
            color: workflowMode === 'automated' ? C.accent : C.tx2, fontWeight: 500,
          }}>🤖 Automatisé</button>
        </div>
        
        {workflowMode === 'automated' && (
          <div style={{ background: C.bg, padding: '14px', borderRadius: 6, fontSize: 13 }}>
            <h4 style={{ fontWeight: 600, marginBottom: 8 }}>📋 Templates Workflow</h4>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
              {salesTemplates.map(t => (
                <button key={t.id} onClick={() => setSelectedWorkflowTemplate(t.id)} style={{
                  padding: '6px 12px', borderRadius: 4, fontSize: 12, cursor: 'pointer',
                  border: `1px solid ${selectedWorkflowTemplate === t.id ? C.accent : C.border}`,
                  background: selectedWorkflowTemplate === t.id ? C.accent2 : C.surface,
                  color: selectedWorkflowTemplate === t.id ? C.accent : C.tx2,
                }}>{t.name.split(' - ')[1]}</button>
              ))}
            </div>
            <div style={{ fontSize: 12, color: C.tx2, lineHeight: 1.4 }}>
              <strong>Workflow:</strong> Email 1 → (3j) Rappel 1 → Email 2 → (5j) Rappel 2 → Email 3 → Email 4 → (après Email 4) Rappel 3 → Email 5 → Email 6
            </div>
          </div>
        )}
      </div>

      {/* Templates */}
      <div style={{ background: C.surface, borderRadius: 8, padding: '20px', border: `1px solid ${C.border}`, marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>📋 Templates d'email</h3>
          <button 
            onClick={() => setShowEmailPreview(true)}
            style={{
              padding: '8px 16px',
              borderRadius: 6,
              border: '1px solid #D4500A',
              background: '#D4500A',
              color: '#fff',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            👁️ Visualiser l'email HTML
          </button>
        </div>
        
        
        {/* Templates de VENTE */}
        <div style={{ marginBottom: 20 }}>
          <h4 style={{ fontSize: 13, fontWeight: 600, color: C.green, marginBottom: 10 }}>� Templates de VENTE</h4>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
            {salesTemplates.map(t => (
              <button key={t.id} onClick={() => setSelectedTemplate(t.id)} style={{
                padding: '8px 14px', borderRadius: 6, fontSize: 13, cursor: 'pointer',
                border: `1px solid ${selectedTemplate === t.id ? C.green : C.border}`,
                background: selectedTemplate === t.id ? '#e8f5e9' : C.surface,
                color: selectedTemplate === t.id ? C.green : C.tx2, fontWeight: 500,
              }}>
                <span style={{ marginRight: 4 }}>{t.category === 'sale' ? '💰' : '⏰'}</span>
                {t.name.split(' - ')[1]}
              </button>
            ))}
          </div>
          <div style={{ fontSize: 11, color: C.tx3, fontStyle: 'italic' }}>
            Email 1: Présentation → Email 2: Devis/Paiement → Email 3: Confirmation Dépôt → Email 4: Paiement Final → Email 5: Confirmation Final → Email 6: Livraison
          </div>
        </div>

        {/* Templates de RAPPEL */}
        <div>
          <h4 style={{ fontSize: 13, fontWeight: 600, color: C.blue, marginBottom: 10 }}>⏰ Templates de RAPPEL</h4>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
            {reminderTemplates.map(t => (
              <button key={t.id} onClick={() => setSelectedTemplate(t.id)} style={{
                padding: '8px 14px', borderRadius: 6, fontSize: 13, cursor: 'pointer',
                border: `1px solid ${selectedTemplate === t.id ? C.blue : C.border}`,
                background: selectedTemplate === t.id ? '#e3f2fd' : C.surface,
                color: selectedTemplate === t.id ? C.blue : C.tx2, fontWeight: 500,
              }}>
                <span style={{ marginRight: 4 }}>⏰</span>
                {t.name.split(' - ')[1]}
              </button>
            ))}
          </div>
          <div style={{ fontSize: 11, color: C.tx3, fontStyle: 'italic' }}>
            Rappel 1: 3 jours après Email 1 → Rappel 2: 2 jours avant expiration → Rappel 3: 3 jours après Email 4 (paiement final)
          </div>
        </div>

        {/* Preview du template sélectionné */}
        {(() => {
          const allTemplates = [...templates, ...salesTemplates, ...reminderTemplates];
          const selected = allTemplates.find(t => t.id === selectedTemplate);
          if (!selected) return null;
          
          return (
            <div style={{ marginTop: 14, padding: '14px', background: C.bg, borderRadius: 6, fontSize: 13 }}>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>
                Sujet: {selected.subject}
              </div>
              
              {/* Template HTML - Affichage complet du contenu texte */}
              {selected.htmlContent ? (
                <div>
                  <div style={{ marginBottom: 8, fontSize: 11, color: C.tx3 }}>
                    💡 Template HTML moderne avec design professionnel
                  </div>
                  <div style={{ 
                    background: '#fff', 
                    padding: '12px', 
                    borderRadius: 6, 
                    border: '1px solid #e9ecef',
                    maxHeight: '300px',
                    overflowY: 'auto'
                  }}>
                    <pre style={{ 
                      fontFamily: "'DM Mono', monospace", 
                      fontSize: 11, 
                      color: C.tx2, 
                      whiteSpace: 'pre-wrap', 
                      lineHeight: 1.4,
                      margin: 0
                    }}>
                      {selected.htmlContent.replace(/<[^>]*>/g, '\n').replace(/\n\s*\n/g, '\n').trim()}
                    </pre>
                  </div>
                  <div style={{ marginTop: 8, fontSize: 10, color: C.tx3 }}>
                    📧 Contenu HTML complet (balises retirées pour la lisibilité)
                  </div>
                </div>
              ) : (
                /* Template texte classique */
                <pre style={{ 
                  fontFamily: "'DM Mono', monospace", 
                  fontSize: 12, 
                  color: C.tx2, 
                  whiteSpace: 'pre-wrap', 
                  lineHeight: 1.5,
                  background: '#fff',
                  padding: '12px',
                  borderRadius: 6,
                  border: '1px solid #e9ecef'
                }}>
                  {selected.textContent}
                </pre>
              )}
              
              {/* Variables du template */}
              {selected.variables && selected.variables.length > 0 && (
                <div style={{ marginTop: 12, padding: '8px', background: '#f8f9fa', borderRadius: 4 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: C.tx3, marginBottom: 4 }}>
                    🔄 Variables utilisées:
                  </div>
                  <div style={{ fontSize: 10, color: C.tx2, fontFamily: "'DM Mono', monospace" }}>
                    {selected.variables.map((v: string) => `{{${v}}}`).join(', ')}
                  </div>
                </div>
              )}

                          </div>
          );
        })()}
      </div>

      {/* Test Email */}
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
              flex: 1, padding: '10px 14px', borderRadius: 6,
              border: `1px solid ${C.border}`, fontSize: 13,
              background: C.surface, color: C.tx,
            }}
          />
          <button onClick={sendTestEmail} disabled={testEmailSending || !hasGmailSmtp} style={{
            padding: '10px 20px', borderRadius: 6, border: 'none',
            background: testEmailSending || !hasGmailSmtp ? C.tx3 : C.blue,
            color: '#fff', fontWeight: 600, fontSize: 14,
            cursor: testEmailSending || !hasGmailSmtp ? 'default' : 'pointer',
            whiteSpace: 'nowrap',
          }}>
            {testEmailSending ? '⏳ Envoi...' : '🧪 Envoyer test'}
          </button>
        </div>
        {!hasGmailSmtp && (
          <div style={{ marginTop: 10, fontSize: 12, color: C.amber }}>
            ⚠️ Configurez Gmail SMTP dans les Paramètres pour envoyer des emails
          </div>
        )}
      </div>

      {/* Ready / Sent */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
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
                  {workflowMode === 'automated' ? (
                    <>
                      <button onClick={() => sendWorkflowEmail(lead, 'email1_presentation')} disabled={!hasGmailSmtp} style={{
                        padding: '4px 10px', borderRadius: 4, border: 'none',
                        background: hasGmailSmtp ? C.blue : C.tx3, color: '#fff',
                        fontSize: 12, cursor: hasGmailSmtp ? 'pointer' : 'default',
                      }}>📧</button>
                      <button onClick={() => sendEmail2WithPayment(lead)} disabled={!hasGmailSmtp} style={{
                        padding: '4px 10px', borderRadius: 4, border: 'none',
                        background: hasGmailSmtp ? C.green : C.tx3, color: '#fff',
                        fontSize: 12, cursor: hasGmailSmtp ? 'pointer' : 'default',
                      }}>💳</button>
                      <button onClick={() => sendEmail3Confirmation(lead)} disabled={!hasGmailSmtp} style={{
                        padding: '4px 10px', borderRadius: 4, border: 'none',
                        background: hasGmailSmtp ? C.accent : C.tx3, color: '#fff',
                        fontSize: 12, cursor: hasGmailSmtp ? 'pointer' : 'default',
                      }}>🎉</button>
                    </>
                  ) : (
                    <button onClick={() => sendOne(lead)} disabled={!hasGmailSmtp} style={{
                      padding: '4px 10px', borderRadius: 4, border: 'none',
                      background: hasGmailSmtp ? C.amber : C.tx3, color: '#fff',
                      fontSize: 12, cursor: hasGmailSmtp ? 'pointer' : 'default',
                    }}>Envoyer</button>
                  )}
                </div>
              </div>
            ))}
            {ready.length === 0 && <p style={{ color: C.tx3, fontSize: 13, textAlign: 'center', padding: 20 }}>Aucun lead prêt à recevoir un email</p>}
          </div>
        </div>

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
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  {lead.emailOpened && <span style={{ fontSize: 10, padding: '2px 6px', borderRadius: 3, background: '#dbeafe', color: C.blue, fontWeight: 600 }}>Ouvert</span>}
                  <button onClick={() => confirmDeposit(lead)} style={{
                    padding: '4px 8px', borderRadius: 4, border: 'none',
                    background: C.green, color: '#fff', fontSize: 10, fontWeight: 600, cursor: 'pointer',
                  }}>💰 Valider Acompte</button>
                  <button onClick={() => confirmFinalPayment(lead)} style={{
                    padding: '4px 8px', borderRadius: 4, border: 'none',
                    background: C.amber, color: '#fff', fontSize: 10, fontWeight: 600, cursor: 'pointer',
                  }}>🏆 Valider Solde</button>
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

      {/* Payment Links Status */}
      {Object.keys(paymentLinks).length > 0 && (
        <div style={{ background: C.surface, borderRadius: 8, padding: '16px 20px', border: `1px solid ${C.border}`, marginTop: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>💳 Liens de paiement actifs</h3>
          <div style={{ fontSize: 12, fontFamily: "'DM Mono', monospace" }}>
            {Object.entries(paymentLinks).map(([leadId, data]) => {
              const lead = leads.find(l => l.id === leadId);
              return (
                <div key={leadId} style={{ padding: '8px 0', borderBottom: `1px solid ${C.border}` }}>
                  <div style={{ fontWeight: 500, marginBottom: 4 }}>{lead?.name || leadId}</div>
                  <div style={{ color: C.tx2, fontSize: 11 }}>
                    Montant: {data.amount}€ | Créé: {new Date(data.created).toLocaleDateString('fr-FR')}
                  </div>
                  <div style={{ color: C.blue, fontSize: 10, wordBreak: 'break-all' }}>
                    {data.link}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Preview Modal */}
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
            <div 
              style={{ 
                padding: 20, background: '#F7F6F2', borderRadius: 8, 
                fontSize: 14, lineHeight: 1.7, fontFamily: "'Bricolage Grotesque', sans-serif",
                maxHeight: 400, overflow: 'auto'
              }}
              dangerouslySetInnerHTML={{ __html: previewEmail.body }}
            />
            <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
              <button onClick={() => { sendOne(previewEmail.lead); setPreviewEmail(null); }} disabled={!hasGmailSmtp} style={{
                flex: 1, padding: '11px 0', borderRadius: 6, border: 'none',
                background: hasGmailSmtp ? C.amber : C.tx3, color: '#fff',
                fontWeight: 600, fontSize: 14, cursor: hasGmailSmtp ? 'pointer' : 'default',
              }}>📧 Envoyer maintenant</button>
              <button onClick={() => setPreviewEmail(null)} style={{
                padding: '11px 20px', borderRadius: 6, border: `1px solid ${C.border}`,
                background: C.surface, color: C.tx2, fontWeight: 500, fontSize: 14, cursor: 'pointer',
              }}>Fermer</button>
            </div>
          </div>
        </>
      )}

      {/* HTML Email Preview Modal */}
      {showEmailPreview && (() => {
        const allTemplates = [...templates, ...salesTemplates, ...reminderTemplates];
        const selected = allTemplates.find(t => t.id === selectedTemplate);
        if (!selected || !selected.htmlContent) return null;

        return (
          <>
            <div onClick={() => setShowEmailPreview(false)} style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0,0,0,0.5)', zIndex: 199,
            }} />
            <div style={{
              position: 'fixed', top: '5%', left: '5%', right: '5%', bottom: '5%',
              background: '#fff', borderRadius: 12,
              zIndex: 200, overflow: 'hidden',
              boxShadow: '0 25px 80px rgba(0,0,0,0.3)',
            }}>
              {/* Header */}
              <div style={{
                background: '#f8f9fa', padding: '16px 20px',
                borderBottom: '1px solid #dee2e6',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: '#495057' }}>
                    👁️ Visualisation Email HTML
                  </h3>
                  <p style={{ margin: '4px 0 0 0', fontSize: 12, color: '#6c757d' }}>
                    {selected.name} - {selected.subject}
                  </p>
                </div>
                <button onClick={() => setShowEmailPreview(false)} style={{
                  width: 32, height: 32, borderRadius: 6, border: '1px solid #dee2e6',
                  background: '#fff', fontSize: 16, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>✕</button>
              </div>

              {/* Email Content */}
              <div style={{
                height: 'calc(100% - 60px)', overflow: 'auto',
                background: '#f4f4f4'
              }}>
                <div dangerouslySetInnerHTML={{ __html: selected.htmlContent }} />
              </div>
            </div>
          </>
        );
      })()}
    </div>
  );
}
