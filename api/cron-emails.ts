import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';
import { allTemplates } from '../src/templates/outreach-templates-final';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Initialisation sécurisée à l'intérieur du handler pour éviter le crash top-level
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('[Cron] Configuration Supabase manquante dans Vercel');
    return res.status(500).json({ error: 'Config Supabase (URL/Key) manquante sur Vercel' });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // 2. Vérification config SMTP
    const { data: config, error: configError } = await supabase
      .from('api_config')
      .select('*')
      .limit(1)
      .single();

    if (configError || !config) {
      console.error('[Cron] Configuration SMTP introuvable dans la table api_config');
      return res.status(400).json({ error: 'Configuration SMTP manquante dans la base de données' });
    }

    // 3. Récupérer les emails en attente
    const { data: scheduledEmails, error: fetchError } = await supabase
      .from('scheduled_emails')
      .select('*, leads(*)')
      .eq('status', 'pending')
      .lte('scheduled_for', new Date().toISOString());

    if (fetchError) throw fetchError;
    if (!scheduledEmails || scheduledEmails.length === 0) {
      return res.json({ success: true, message: 'Aucun email en attente' });
    }

    // 4. Préparer le transporteur
    const transporter = nodemailer.createTransport({
      host: config.gmail_smtp_host || 'smtp.gmail.com',
      port: Number(config.gmail_smtp_port) || 587,
      secure: Number(config.gmail_smtp_port) === 465,
      auth: {
        user: config.gmail_smtp_user,
        pass: config.gmail_smtp_password,
      },
      tls: { rejectUnauthorized: false } // Plus robuste pour les serveurs SMTP
    });

    const fromName = config.gmail_smtp_from_name || 'Services Siteup';
    const fromEmail = config.gmail_smtp_from_email || config.gmail_smtp_user;

    const results = [];

    for (const job of scheduledEmails) {
      try {
        const lead = job.leads;
        if (!lead || !lead.email) {
          throw new Error('Lead sans email ou introuvable');
        }

        const template = allTemplates.find(t => t.id === job.template_id);
        if (!template) throw new Error(`Template ${job.template_id} non trouvé`);

        let subject = template.subject || 'Votre projet web';
        let html = template.htmlContent || template.textContent || '';
        let text = template.textContent || '';

        // Injection des variables
        const baseUrl = 'https://www.services-siteup.online/api/track';
        const replacements: Record<string, string> = {
          '{{firstName}}': lead.name?.split(' ')[0] || lead.name || 'Client',
          '{{companyName}}': lead.name || 'votre entreprise',
          '{{websiteLink}}': `${baseUrl}?id=${lead.id}&type=site_clicked`,
          '{{startProjectLink}}': `${baseUrl}?id=${lead.id}&type=start_clicked`,
          '{{devisLink}}': `${baseUrl}?id=${lead.id}&type=devis_clicked&url=${encodeURIComponent(lead.devis_url || '#')}`,
          '{{paymentLink}}': `${baseUrl}?id=${lead.id}&type=payment_clicked`,
          '{{finalPaymentLink}}': `${baseUrl}?id=${lead.id}&type=payment_clicked&final=true`,
          '{{agentName}}': fromName,
          '{{agentEmail}}': fromEmail,
          '{{deliveryDate}}': new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR')
        };

        for (const [key, val] of Object.entries(replacements)) {
          subject = subject.split(key).join(val);
          html = html.split(key).join(val);
          text = text.split(key).join(val);
        }

        const trackingPixel = `<img src="${baseUrl}?id=${lead.id}&type=email_opened" width="1" height="1" style="display:none;" />`;
        if (html.includes('</body>')) {
          html = html.replace('</body>', `${trackingPixel}</body>`);
        } else {
          html += trackingPixel;
        }

        await transporter.sendMail({
          from: `"${fromName}" <${fromEmail}>`,
          to: `"${lead.name}" <${lead.email}>`,
          subject,
          html,
          text
        });

        await supabase.from('scheduled_emails').update({ 
          status: 'sent', 
          updated_at: new Date().toISOString() 
        }).eq('id', job.id);

        results.push({ job_id: job.id, status: 'success' });

      } catch (err: any) {
        console.error(`[Cron] Erreur sur job ${job.id}:`, err.message);
        await supabase.from('scheduled_emails').update({ 
          status: 'failed', 
          error_message: err.message,
          updated_at: new Date().toISOString() 
        }).eq('id', job.id);
        results.push({ job_id: job.id, status: 'failed', error: err.message });
      }
    }

    return res.json({ success: true, processed: scheduledEmails.length, results });

  } catch (err: any) {
    console.error('[Cron Global Error]', err);
    return res.status(500).json({ error: 'Internal Error', message: err.message });
  }
}

