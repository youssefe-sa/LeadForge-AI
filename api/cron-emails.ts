import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ error: 'Config Supabase manquante sur Vercel' });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // 1. Récupérer la config SMTP
    const { data: config, error: configError } = await supabase
      .from('api_config')
      .select('*')
      .limit(1)
      .single();

    if (configError || !config) throw new Error('Configuration SMTP manquante');

    // 2. Récupérer les emails en attente
    const { data: scheduledEmails, error: fetchError } = await supabase
      .from('scheduled_emails')
      .select('*, leads(*)')
      .eq('status', 'pending')
      .lte('scheduled_for', new Date().toISOString());

    if (fetchError) throw fetchError;
    if (!scheduledEmails || scheduledEmails.length === 0) {
      return res.json({ success: true, message: 'Aucun email à envoyer pour le moment.' });
    }

    // 3. Récupérer TOUS les templates de la DB d'un coup pour plus d'efficacité
    const { data: dbTemplates } = await supabase.from('email_templates').select('*');

    const transporter = nodemailer.createTransport({
      host: config.gmail_smtp_host || 'smtp.gmail.com',
      port: Number(config.gmail_smtp_port) || 587,
      secure: Number(config.gmail_smtp_port) === 465,
      auth: {
        user: config.gmail_smtp_user,
        pass: config.gmail_smtp_password,
      },
      tls: { rejectUnauthorized: false }
    });

    const fromName = config.gmail_smtp_from_name || 'Services Siteup';
    const fromEmail = config.gmail_smtp_from_email || config.gmail_smtp_user;
    const results = [];

    for (const job of scheduledEmails) {
      try {
        const lead = job.leads;
        if (!lead || !lead.email) throw new Error('Lead invalide');

        // CHERCHER LE TEMPLATE DANS LA BASE DE DONNÉES
        const template = dbTemplates?.find(t => t.id === job.template_id);
        if (!template) throw new Error(`Template ID "${job.template_id}" introuvable en base de données`);

        let subject = template.subject || 'Votre projet web';
        let body = template.body || ''; // Dans la DB, c'est la colonne 'body'

        // Injection des variables standardisées
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
          '{{deliveryDate}}': new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR'),
          '{{city}}': lead.city || '',
          '{{sector}}': lead.sector || ''
        };

        for (const [key, val] of Object.entries(replacements)) {
          subject = subject.split(key).join(val);
          body = body.split(key).join(val);
        }

        const trackingPixel = `<img src="${baseUrl}?id=${lead.id}&type=email_opened" width="1" height="1" style="display:none;" />`;
        const html = body.includes('</body>') ? body.replace('</body>', `${trackingPixel}</body>`) : body + trackingPixel;

        await transporter.sendMail({
          from: `"${fromName}" <${fromEmail}>`,
          to: `"${lead.name}" <${lead.email}>`,
          subject,
          html,
          text: body.replace(/<[^>]*>/g, '') // Version texte simplifiée
        });

        await supabase.from('scheduled_emails').update({ 
          status: 'sent', 
          updated_at: new Date().toISOString() 
        }).eq('id', job.id);

        results.push({ job_id: job.id, status: 'success' });

      } catch (err: any) {
        console.error(`[Cron] Erreur job ${job.id}:`, err.message);
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
    console.error('[Cron Error]', err);
    return res.status(500).json({ error: 'Internal Error', message: err.message });
  }
}


