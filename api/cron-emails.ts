import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createTransport } from 'nodemailer';
import { createClient } from '@supabase/supabase-js';
import { getTemplateById } from '../src/templates/outreach-templates-final';

// Safe Supabase init
function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Optionnel: sécuriser la route cron avec un secret
  // if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
  //   return res.status(401).end('Unauthorized');
  // }

  try {
    const supabase = getSupabase();
    if (!supabase) {
      return res.status(500).json({ error: 'Supabase configuration missing' });
    }

    // 1. Récupérer les emails planifiés en attente (dont la date est passée)
    const now = new Date().toISOString();
    const { data: scheduledEmails, error: fetchError } = await supabase
      .from('scheduled_emails')
      .select('*, leads (email, name, id)')
      .eq('status', 'pending')
      .lte('scheduled_for', now)
      .limit(20); // Limiter à 20 par exécution pour éviter les timeouts Vercel

    if (fetchError) throw fetchError;
    if (!scheduledEmails || scheduledEmails.length === 0) {
      return res.json({ success: true, message: 'No pending emails to send' });
    }

    // 2. Récupérer la config SMTP (priorité aux variables d'environnement)
    const smtpUser = process.env.GMAIL_SMTP_USER;
    const smtpPassword = process.env.GMAIL_SMTP_PASSWORD;
    const envFromName = process.env.GMAIL_SMTP_FROM_NAME;
    const envFromEmail = process.env.GMAIL_SMTP_FROM_EMAIL;

    // Si les variables d'environnement ne sont pas définies, utiliser Supabase
    let config;
    if (!smtpUser || !smtpPassword) {
      const { data: supabaseConfig, error: configErr } = await supabase.from('api_config').select('*').eq('id', 1).single();
      if (configErr || !supabaseConfig?.gmail_smtp_user || !supabaseConfig?.gmail_smtp_password) {
        throw new Error('SMTP not configured in database or environment variables');
      }
      config = supabaseConfig;
    }

    const port = config?.gmail_smtp_port || 587;
    const transporter = createTransport({
      host: config?.gmail_smtp_host || 'smtp.gmail.com',
      port,
      secure: port === 465,
      auth: { 
        user: smtpUser || config.gmail_smtp_user, 
        pass: (smtpPassword || config.gmail_smtp_password).replace(/\s/g, '') 
      },
      tls: { rejectUnauthorized: false }
    });

    const fromName = envFromName || config?.gmail_smtp_from_name || 'LeadForge AI';
    const fromEmail = envFromEmail || config?.gmail_smtp_from_email || config?.gmail_smtp_user || smtpUser;
    
    // Marquer comme processing
    const ids = scheduledEmails.map(e => e.id);
    await supabase.from('scheduled_emails').update({ status: 'processing', updated_at: new Date().toISOString() }).in('id', ids);

    // 3. Envoyer les emails
    const results = [];
    
    for (const job of scheduledEmails) {
      try {
        const lead = job.leads;
        if (!lead || !lead.email) {
          throw new Error('Lead has no email address');
        }

        // Utiliser les vrais templates depuis outreach-templates-final.ts
        const template = getTemplateById(job.template_id);
        if (!template) {
          throw new Error(`Template ${job.template_id} not found`);
        }

        // Personnaliser avec les données du lead
        const variables = {
          firstName: lead.name,
          companyName: lead.name,
          websiteLink: lead.site_url || '#',
          price: '146€ HT',
          agentName: config.gmail_smtp_from_name || 'Solutions Web',
          agentEmail: config.gmail_smtp_from_email || 'contact@leadforge.ai',
          amount: '146€ HT',
          validityDays: '7',
          deliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR'),
          expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR'),
          devisLink: lead.devis_url || '#',
          paymentLink: config.whop_deposit_link || '#',
          invoiceLink: lead.invoice_url || '#',
          finalPaymentLink: config.whop_final_payment_link || '#',
          adminLink: lead.site_url ? `${lead.site_url}/admin` : '#',
          adminUsername: lead.email || 'admin',
          adminPassword: 'TempPassword123',
          documentationLink: 'https://docs.leadforge.ai',
          sector: lead.sector || 'votre secteur',
          city: lead.city || 'votre ville'
        };

        let html = template.htmlContent;
        let subject = template.subject;
        for (const [key, val] of Object.entries(variables)) {
          html = html.replace(new RegExp(`{{${key}}}`, 'g'), val);
          subject = subject.replace(new RegExp(`{{${key}}}`, 'g'), val);
        }

        const info = await transporter.sendMail({
          from: `"${fromName}" <${fromEmail}>`,
          to: `"${lead.name}" <${lead.email}>`,
          subject: subject,
          html: html,
          text: html.replace(/<[^>]*>/g, '')
        });

        // Mettre à jour comme envoyé
        await supabase.from('scheduled_emails').update({ 
          status: 'sent', 
          updated_at: new Date().toISOString() 
        }).eq('id', job.id);

        results.push({ job_id: job.id, status: 'success' });

      } catch (err: unknown) {
        // Mettre à jour comme erreur
        await supabase.from('scheduled_emails').update({ 
          status: 'failed', 
          error_message: (err as Error).message,
          updated_at: new Date().toISOString() 
        }).eq('id', job.id);
        
        results.push({ job_id: job.id, status: 'failed', error: (err as Error).message });
      }
    }

    return res.json({
      success: true,
      processed: scheduledEmails.length,
      results
    });

  } catch (err: unknown) {
    console.error('[api/cron-emails] Error:', err);
    return res.status(500).json({ error: 'Internal server error', message: (err as Error).message });
  }
}
