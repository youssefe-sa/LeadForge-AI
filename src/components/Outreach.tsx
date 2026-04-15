import { useState } from 'react';
import { Lead, ApiConfig, EmailTemplate, callLLM, useScheduledEmails, ScheduledEmail } from '../lib/supabase-store';
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
  const [selectedWorkflowTemplate, setSelectedWorkflowTemplate] = useState('step-1-start');
  const [paymentLinks, setPaymentLinks] = useState<Record<string, { link: string; amount: number; created: string }>>({});
  const [devisLinks, setDevisLinks] = useState<Record<string, string>>({});
  const [invoiceLinks, setInvoiceLinks] = useState<Record<string, string>>({});
  const { scheduled, cancelEmail } = useScheduledEmails();
  const [showEmailPreview, setShowEmailPreview] = useState(false);

  // États pour la pagination et le filtrage
  const [currentPage, setCurrentPage] = useState(1);
  const [leadsPerPage, setLeadsPerPage] = useState(3);
  const [filterStatus, setFilterStatus] = useState<'all' | 'opened' | 'converted' | 'not-converted'>('all');

  const hasGmailSmtp = !!(apiConfig.gmailSmtpUser && apiConfig.gmailSmtpPassword);
  const hasLLM = !!(apiConfig.groqKey || apiConfig.geminiKey || apiConfig.nvidiaKey || apiConfig.openrouterKey);

  // LOG DIAGNOSTIC
  console.log('🔍 Outreach Dashboard:', {
    leadsCount: leads.length,
    scheduledCount: scheduled.length,
    hasSmtp: hasGmailSmtp
  });

  const ready = leads.filter(l => l.siteGenerated && !l.emailSent && l.email);
  const sent = leads.filter(l => l.emailSent);

  // Logique de filtrage
  const filteredSent = sent.filter(lead => {
    switch (filterStatus) {
      case 'opened':
        return lead.emailOpened;
      case 'converted':
        return lead.stage === 'converted';
      case 'not-converted':
        return lead.stage !== 'converted';
      default:
        return true;
    }
  });

  // Logique de pagination
  const totalPages = Math.ceil(filteredSent.length / leadsPerPage);
  const startIndex = (currentPage - 1) * leadsPerPage;
  const endIndex = startIndex + leadsPerPage;
  const paginatedSent = filteredSent.slice(startIndex, endIndex);

  // Réinitialiser la page si le filtre change
  const handleFilterChange = (newFilter: typeof filterStatus) => {
    setFilterStatus(newFilter);
    setCurrentPage(1);
  };

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
      '{{invoiceLink}}': `${trackBase}&type=invoice_clicked&url=${encodeURIComponent(lead.invoice_url || '#')}`,
      '{{finalInvoiceLink}}': `${trackBase}&type=invoice_clicked&final=true&url=${encodeURIComponent(lead.invoice_url || '#')}`,
      
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
        sentSteps: Array.from(new Set([...(lead.sentSteps || []), templateId]))
      });
      setLogs(prev => [...prev, `✅ ${template.name} envoyé à ${lead.name}`]);
      
      // --- LOGIQUE DE RAPPEL AUTOMATIQUE J+1 ---
      let nextReminderId = '';
      if (templateId === 'step-1-start') nextReminderId = 'reminder1_after_email1';
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
    
    // 2. Envoyer l'Email 5 (Confirmation Solde Final)
    await sendWorkflowEmail(lead, 'step-5-confirmation');
    
    // 3. Programmer l'Email 6 (Livraison) pour dans 1 heure
    const deliveryDate = new Date();
    deliveryDate.setHours(deliveryDate.getHours() + 1);
    
    await supabase.from('scheduled_emails').insert([{
      lead_id: lead.id,
      template_id: 'step-6-livraison',
      scheduled_for: deliveryDate.toISOString(),
      status: 'pending'
    }]);

    // 4. Update groupé pour éviter la race condition entre sendWorkflowEmail et l'update du stage
    // On force l'ajout de step-5-confirmation dans sentSteps au cas où l'update interne de sendWorkflowEmail soit écrasé
    updateLead(lead.id, {
      stage: 'converted',
      revenue: 146,
      sentSteps: Array.from(new Set([...(lead.sentSteps || []), 'step-5-confirmation']))
    });

    setLogs(prev => [...prev, `🏆 Solde final validé pour ${lead.name}. Email 5 envoyé et Livraison (E6) programmée.`]);
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
        sentSteps: Array.from(new Set([...(lead.sentSteps || []), selectedTemplate]))
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
          sentSteps: Array.from(new Set([...(lead.sentSteps || []), selectedTemplate]))
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
  const sendEmail1Demo = (lead: Lead) => sendWorkflowEmail(lead, 'step-1-start');
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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 10, marginBottom: 24 }}>
        {[
          { label: 'Prêts à Envoyer', value: ready.length, color: C.amber },
          { label: 'Emails Envoyés', value: sent.length, color: C.green },
          { label: 'Ouverts', value: leads.filter(l => l.emailOpened).length, color: C.blue },
          { label: 'Lien Site Cliqués', value: leads.filter(l => l.siteClicked).length, color: '#17a2b8' },
          { label: 'Acompte $46 Cliqué', value: leads.filter(l => l.paymentDepositClicked).length, color: '#28a745' },
          { label: 'Solde $100 Cliqué', value: leads.filter(l => l.paymentFinalClicked).length, color: '#2ecc71' },
          { label: 'Devis Cliqués', value: leads.filter(l => l.devisClicked).length, color: '#ffc107' },
          { label: 'Facture Acomp', value: leads.filter(l => l.invoiceDepositClicked).length, color: '#dc3545' },
          { label: 'Facture Solde', value: leads.filter(l => l.invoiceFinalClicked).length, color: '#e74c3c' },
          { label: 'Total CA ($)', value: `${leads.filter(l => l.stage === 'converted').reduce((s, l) => s + (l.revenue || 0), 0)}$`, color: C.tx },
        ].map((s, i) => (
          <div key={i} style={{
            background: C.surface, borderRadius: 8, padding: '12px 8px',
            borderLeft: `3px solid ${s.color}`, boxShadow: '0 1px 3px rgba(28,27,24,0.06)',
            display: 'flex', flexDirection: 'column', justifyContent: 'center'
          }}>
            <div style={{ fontSize: 8.5, color: C.tx3, fontWeight: 800, marginBottom: 4, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{s.label}</div>
            <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "'Fraunces', serif", color: C.tx }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Vue "File d'attente" (AMÉLIORÉE AVEC SCROLL) */}
      {scheduled.length > 0 && (
        <div style={{ background: C.surface, borderRadius: 8, padding: '20px', border: `1px solid ${C.border}`, marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
             <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
               ⏳ File d'attente ({scheduled.length})
             </h3>
             <span style={{ fontSize: 11, color: C.tx3, background: C.bg, padding: '2px 8px', borderRadius: 4 }}>
               Mise à jour en direct ⚡
             </span>
          </div>
          <div style={{ 
            display: 'flex', flexDirection: 'column', gap: 8, 
            maxHeight: '320px', overflowY: 'auto', paddingRight: '8px'
          }}>
            {scheduled.map((job: ScheduledEmail) => {
              const lead = leads.find(l => l.id === job.lead_id);
              return (
                <div key={job.id} style={{ 
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '12px 16px', background: C.bg, borderRadius: 8, border: `1px solid ${C.border}`
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.tx }}>{lead?.name || 'Lead inconnu'}</div>
                    <div style={{ fontSize: 11, color: C.tx3 }}>{job.template_id} • Prévu le {new Date(job.scheduled_for).toLocaleString()}</div>
                  </div>
                  <button 
                    onClick={() => cancelEmail(job.id)}
                    style={{ 
                      padding: '6px 12px', borderRadius: 4, background: '#fee2e2', color: '#dc2626', 
                      fontSize: 11, fontWeight: 700, border: 'none', cursor: 'pointer' 
                    }}
                  >Annuler</button>
                </div>
              );
            })}
          </div>
        </div>
      )}

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

        <div style={{ background: C.surface, borderRadius: 12, padding: '18px', border: `1px solid ${C.border}`, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          {/* Header avec filtre */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, paddingBottom: 10, borderBottom: `2px solid ${C.bg}` }}>
            <div>
              <h3 style={{ fontSize: 17, fontWeight: 700, margin: 0, color: C.green, display: 'flex', alignItems: 'center', gap: 8 }}>
                ✅ Emails Envoyés
                <span style={{ fontSize: 12, fontWeight: 500, color: C.tx3, background: C.bg, padding: '3px 8px', borderRadius: 12 }}>
                  {filteredSent.length}
                </span>
              </h3>
              <p style={{ fontSize: 11, color: C.tx3, margin: '4px 0 0 0' }}>Détails complets des campagnes d'emailing</p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
              {/* Filtres */}
              <div style={{ display: 'flex', gap: 4, fontSize: 9 }}>
                <button
                  onClick={() => handleFilterChange('all')}
                  style={{
                    padding: '4px 8px',
                    borderRadius: 4,
                    border: `1px solid ${filterStatus === 'all' ? C.green : C.border}`,
                    background: filterStatus === 'all' ? C.green + '15' : C.bg,
                    color: filterStatus === 'all' ? C.green : C.tx3,
                    fontSize: 9,
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  📧 Tous ({sent.length})
                </button>
                <button
                  onClick={() => handleFilterChange('opened')}
                  style={{
                    padding: '4px 8px',
                    borderRadius: 4,
                    border: `1px solid ${filterStatus === 'opened' ? C.blue : C.border}`,
                    background: filterStatus === 'opened' ? C.blue + '15' : C.bg,
                    color: filterStatus === 'opened' ? C.blue : C.tx3,
                    fontSize: 9,
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  📧 Ouverts ({sent.filter(l => l.emailOpened).length})
                </button>
                <button
                  onClick={() => handleFilterChange('converted')}
                  style={{
                    padding: '4px 8px',
                    borderRadius: 4,
                    border: `1px solid ${filterStatus === 'converted' ? C.green : C.border}`,
                    background: filterStatus === 'converted' ? C.green + '15' : C.bg,
                    color: filterStatus === 'converted' ? C.green : C.tx3,
                    fontSize: 9,
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  🏆 Convertis ({leads.filter(l => l.stage === 'converted').length})
                </button>
                <button
                  onClick={() => handleFilterChange('not-converted')}
                  style={{
                    padding: '4px 8px',
                    borderRadius: 4,
                    border: `1px solid ${filterStatus === 'not-converted' ? C.amber : C.border}`,
                    background: filterStatus === 'not-converted' ? C.amber + '15' : C.bg,
                    color: filterStatus === 'not-converted' ? C.amber : C.tx3,
                    fontSize: 9,
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  ⏳ En cours ({sent.filter(l => l.stage !== 'converted').length})
                </button>
              </div>
              
                          </div>
          </div>

          {/* Vue détaillée mais compacte avec pagination */}
          <div style={{ maxHeight: 650, overflowY: 'auto', paddingRight: 4 }}>
            {paginatedSent.map(lead => {
              const isConverted = lead.stage === 'converted';
              const progressPercent = ((lead.sentSteps || []).length / 8) * 100;
              
              return (
                <div key={lead.id} style={{
                  background: C.bg,
                  borderRadius: 8,
                  padding: '14px 16px',
                  marginBottom: 8,
                  border: `1px solid ${C.border}`,
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}>
                  {/* En-tête avec infos principales */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                        <div style={{ 
                          width: 8, height: 8, borderRadius: '50%', 
                          background: isConverted ? C.green : lead.emailOpened ? C.blue : C.tx3,
                          boxShadow: isConverted ? `0 0 0 3px ${C.green}20` : lead.emailOpened ? `0 0 0 3px ${C.blue}20` : 'none'
                        }} />
                        <h4 style={{ fontSize: 14, fontWeight: 700, margin: 0, color: C.tx }}>
                          {lead.name}
                        </h4>
                        {isConverted && (
                          <span style={{ 
                            fontSize: 9, padding: '2px 6px', borderRadius: 8, 
                            background: C.green + '15', color: C.green, fontWeight: 600,
                            border: `1px solid ${C.green}40`
                          }}>
                            ✅ Converti ({lead.revenue || 0}€)
                          </span>
                        )}
                        {lead.emailOpened && !isConverted && (
                          <span style={{ 
                            fontSize: 9, padding: '2px 6px', borderRadius: 8, 
                            background: C.blue + '15', color: C.blue, fontWeight: 600,
                            border: `1px solid ${C.blue}40`
                          }}>
                            📧 Ouvert
                          </span>
                        )}
                      </div>
                      
                      <div style={{ display: 'flex', gap: 16, fontSize: 10, color: C.tx3, fontFamily: "'DM Mono', monospace" }}>
                        <span>📧 {lead.email}</span>
                        <span>📅 {lead.emailSentDate ? new Date(lead.emailSentDate).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }) : ''}</span>
                        <span>🏢 {lead.sector || 'N/A'}</span>
                        <span>🌍 {lead.city || 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Informations détaillées sur les emails */}
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: C.tx2, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                      📧 Détails des emails envoyés
                      <span style={{ fontSize: 9, color: C.tx3, fontWeight: 400 }}>
                        ({(lead.sentSteps || []).length}/8 étapes)
                      </span>
                    </div>
                    
                    {/* Grille d'étapes détaillées sur une ligne */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 2 }}>
                      {[
                        { id: 'step-1-start', label: 'Présentation', icon: '📧', desc: 'Email initial de présentation' },
                        { id: 'step-2-devis', label: 'Devis', icon: '📄', desc: 'Devis et lien de paiement' },
                        { id: 'reminder1_after_email1', label: 'Rappel 1', icon: '⏰', desc: 'Rappel 3j après présentation' },
                        { id: 'reminder2_after_devis', label: 'Rappel 2', icon: '⏰', desc: 'Rappel 2j avant expiration' },
                        { id: 'step-3-depot', label: 'Acompte', icon: '💰', desc: 'Confirmation acompte 46€' },
                        { id: 'reminder3_final_payment', label: 'Rappel 3', icon: '⏰', desc: 'Rappel 3j après paiement final' },
                        { id: 'step-5-confirmation', label: 'Solde', icon: '🏆', desc: 'Confirmation solde 100€' },
                        { id: 'step-6-livraison', label: 'Livraison', icon: '📦', desc: 'Livraison du site web' }
                      ].map(step => {
                        const isSent = (lead.sentSteps || []).includes(step.id);
                        const isPending = scheduled.some(s => s.lead_id === lead.id && s.template_id === step.id);
                        
                        return (
                          <div key={step.id} style={{ 
                            fontSize: 8, fontWeight: 600, padding: '6px 4px', borderRadius: 4,
                            background: isSent ? C.green + '15' : isPending ? C.amber + '15' : '#ffffff',
                            color: isSent ? C.green : isPending ? C.amber : C.tx3,
                            border: `1px solid ${isSent ? C.green + '40' : isPending ? C.amber + '40' : C.border}`,
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
                            textAlign: 'center',
                            transition: 'all 0.2s ease',
                            cursor: 'pointer'
                          }}
                          title={step.desc}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <span style={{ fontSize: 10 }}>{isSent ? '✅' : isPending ? '⏳' : '⚪'}</span>
                              <span>{step.icon}</span>
                            </div>
                            <span>{step.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Statistiques sur une seule ligne forcée */}
                  <div style={{ 
                    display: 'flex', 
                    gap: 6, 
                    marginBottom: 10, 
                    fontSize: 9, 
                    color: C.tx3, 
                    alignItems: 'center', 
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    flexWrap: 'nowrap'
                  }}>
                    <span style={{ flexShrink: 0, display: 'inline-block' }}>📈 Progression: {(() => {
                      const salesSteps = ['step-1-start', 'step-2-devis', 'step-3-depot', 'step-5-confirmation', 'step-6-livraison'];
                      const sentSalesSteps = (lead.sentSteps || []).filter(step => salesSteps.includes(step));
                      return Math.round((sentSalesSteps.length / salesSteps.length) * 100);
                    })()}%</span>
                    {lead.siteClicked && <span style={{ flexShrink: 0, display: 'inline-block' }}>🔗 Site cliqué</span>}
                    {lead.paymentDepositClicked && <span style={{ flexShrink: 0, display: 'inline-block' }}>💳 Acompte cliqué</span>}
                    {lead.paymentFinalClicked && <span style={{ flexShrink: 0, display: 'inline-block' }}>💳 Solde cliqué</span>}
                    {lead.devisClicked && <span style={{ flexShrink: 0, display: 'inline-block' }}>📄 Devis cliqué</span>}
                    {lead.invoiceDepositClicked && <span style={{ flexShrink: 0, display: 'inline-block' }}>🧾 Facture acompte cliquée</span>}
                    {lead.invoiceFinalClicked && <span style={{ flexShrink: 0, display: 'inline-block' }}>🧾 Facture solde cliquée</span>}
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', paddingTop: 8, borderTop: `1px solid ${C.border}` }}>
                    <button 
                      onClick={() => previewForLead(lead)} 
                      style={{
                        padding: '6px 12px', borderRadius: 6, border: `1px solid ${C.border}`,
                        background: C.surface, fontSize: 10, cursor: 'pointer', color: C.blue,
                        fontWeight: 500, transition: 'all 0.2s ease'
                      }}
                    >
                      👁️ Aperçu
                    </button>
                    
                    {!isConverted && (
                      <>
                        <button 
                          onClick={() => confirmDeposit(lead)} 
                          style={{
                            padding: '6px 12px', borderRadius: 6, border: 'none',
                            background: C.green, color: '#fff', fontSize: 10, fontWeight: 600, cursor: 'pointer',
                            transition: 'all 0.2s ease', boxShadow: '0 2px 4px rgba(26, 122, 74, 0.2)'
                          }}
                        >
                          💰 Valider Acompte
                        </button>
                        <button 
                          onClick={() => confirmFinalPayment(lead)} 
                          style={{
                            padding: '6px 12px', borderRadius: 6, border: 'none',
                            background: C.amber, color: '#fff', fontSize: 10, fontWeight: 600, cursor: 'pointer',
                            transition: 'all 0.2s ease', boxShadow: '0 2px 4px rgba(212, 80, 10, 0.2)'
                          }}
                        >
                          🏆 Valider Solde
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
            
            {paginatedSent.length === 0 && filteredSent.length > 0 && (
              <div style={{ 
                textAlign: 'center', padding: '30px 20px', 
                background: C.bg, borderRadius: 10, border: `2px dashed ${C.border}`
              }}>
                <div style={{ fontSize: 20, marginBottom: 6 }}>🔍</div>
                <h4 style={{ fontSize: 14, fontWeight: 600, color: C.tx2, margin: '0 0 6px 0' }}>
                  Aucun lead trouvé pour ce filtre
                </h4>
                <p style={{ fontSize: 11, color: C.tx3, margin: 0 }}>
                  Essayez un autre filtre pour voir les leads correspondants
                </p>
              </div>
            )}

            {sent.length === 0 && (
              <div style={{ 
                textAlign: 'center', padding: '40px 20px', 
                background: C.bg, borderRadius: 10, border: `2px dashed ${C.border}`
              }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>📭</div>
                <h4 style={{ fontSize: 16, fontWeight: 600, color: C.tx2, margin: '0 0 8px 0' }}>
                  Aucun email envoyé
                </h4>
                <p style={{ fontSize: 12, color: C.tx3, margin: 0 }}>
                  Commencez par envoyer des emails aux leads prêts dans la section "Prêts à envoyer"
                </p>
              </div>
            )}

            {/* Contrôles de pagination */}
            {totalPages > 1 && (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                gap: 8, 
                marginTop: 16,
                paddingTop: 12,
                borderTop: `1px solid ${C.border}`
              }}>
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 6,
                    border: `1px solid ${C.border}`,
                    background: currentPage === 1 ? C.bg : C.surface,
                    color: currentPage === 1 ? C.tx3 : C.tx,
                    fontSize: 10,
                    fontWeight: 500,
                    cursor: currentPage === 1 ? 'default' : 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  ← Précédent
                </button>

                {/* Numéros de page */}
                <div style={{ display: 'flex', gap: 4 }}>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        style={{
                          padding: '4px 8px',
                          borderRadius: 4,
                          border: `1px solid ${pageNum === currentPage ? C.green : C.border}`,
                          background: pageNum === currentPage ? C.green + '15' : C.bg,
                          color: pageNum === currentPage ? C.green : C.tx3,
                          fontSize: 9,
                          fontWeight: pageNum === currentPage ? 600 : 400,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          minWidth: '24px'
                        }}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 6,
                    border: `1px solid ${C.border}`,
                    background: currentPage === totalPages ? C.bg : C.surface,
                    color: currentPage === totalPages ? C.tx3 : C.tx,
                    fontSize: 10,
                    fontWeight: 500,
                    cursor: currentPage === totalPages ? 'default' : 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Suivant →
                </button>
              </div>
            )}

            {/* Info de pagination */}
            {totalPages > 1 && (
              <div style={{ 
                textAlign: 'center', 
                fontSize: 9, 
                color: C.tx3, 
                marginTop: 8 
              }}>
                Page {currentPage} sur {totalPages} • {filteredSent.length} leads au total
              </div>
            )}
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
