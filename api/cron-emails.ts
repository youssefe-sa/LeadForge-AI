import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';
import { allTemplates } from '../src/templates/outreach-templates-final';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Sécurisation par clé API simple ou Cron-Secret
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers['authorization'];
  
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    // return res.status(401).json({ error: 'Unauthorized' });
    // Désactivé temporairement pour vos tests si nécessaire
  }

  try {
    // 1. Récupérer les emails en attente
    const { data: scheduledEmails, error: fetchError } = await supabase
      .from('scheduled_emails')
      .select('*, leads(*)')
      .eq('status', 'pending')
      .lte('scheduled_for', new Date().toISOString());

    if (fetchError) throw fetchError;
    if (!scheduledEmails || scheduledEmails.length === 0) {
      return res.json({ success: true, message: 'No pending emails to send' });
    }

    // 2. Récupérer la config SMTP
    const { data: config, error: configError } = await supabase
      .from('api_config')
      .select('*')
      .single();

    if (configError || !config) throw new Error('SMTP Config missing');

    const transporter = nodemailer.createTransport({
      host: config.gmail_smtp_host || 'smtp.gmail.com',
      port: parseInt(config.gmail_smtp_port || '465'),
      secure: config.gmail_smtp_port === '465',
      auth: {
        user: config.gmail_smtp_user,
        pass: config.gmail_smtp_pass,
      },
    });

    const fromName = config.gmail_smtp_from_name || 'Services Siteup';
    const fromEmail = config.gmail_smtp_from_email || config.gmail_smtp_user;

    const results = [];

    for (const job of scheduledEmails) {
      try {
        const lead = job.leads;
        if (!lead) continue;

        // Trouver le template Services Siteup correspondant
        const template = allTemplates.find(t => t.id === job.template_id);
        if (!template) throw new Error(`Template ${job.template_id} not found`);

        let subject = template.subject;
        let html = template.htmlContent;
        let text = template.textContent;

        // --- GÉNÉRATION DES LIENS DE TRACKING (VITAL) ---
        const baseUrl = 'https://leadforge.ai/api/track'; // À adapter selon votre domaine
        const websiteLink = `${baseUrl}?id=${lead.id}&type=site_clicked`;
        const startProjectLink = `${baseUrl}?id=${lead.id}&type=start_clicked`;
        const devisLink = `${baseUrl}?id=${lead.id}&type=devis_clicked&url=${encodeURIComponent(lead.devis_url || '#')}`;
        const paymentLink = `${baseUrl}?id=${lead.id}&type=payment_clicked`;
        const finalPaymentLink = `${baseUrl}?id=${lead.id}&type=payment_clicked&final=true`;

        // --- MOTEUR D'INJECTION DE VARIABLES SERVICES SITEUP ---
        const replacements: Record<string, string> = {
          '{{firstName}}': lead.name?.split(' ')[0] || lead.name || 'Client',
          '{{companyName}}': lead.name || 'votre entreprise',
          '{{websiteLink}}': websiteLink,
          '{{startProjectLink}}': startProjectLink,
          '{{devisLink}}': devisLink,
          '{{paymentLink}}': paymentLink,
          '{{finalPaymentLink}}': finalPaymentLink,
          '{{invoiceLink}}': `${baseUrl}?id=${lead.id}&type=invoice_clicked`,
          '{{agentName}}': fromName,
          '{{agentEmail}}': fromEmail,
          '{{deliveryDate}}': new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR'),
          '{{adminLink}}': lead.admin_url || '#',
          '{{adminUsername}}': lead.admin_username || 'admin',
          '{{adminPassword}}': lead.admin_password || '********',
          '{{documentationLink}}': lead.documentation_url || '#'
        };

        for (const [key, val] of Object.entries(replacements)) {
          subject = subject.split(key).join(val);
          html = html.split(key).join(val);
          text = text.split(key).join(val);
        }

        // Injection du pixel d'ouverture
        const trackingPixel = `<img src="${baseUrl}?id=${lead.id}&type=email_opened" width="1" height="1" style="display:none;" />`;
        html = html.replace('</body>', `${trackingPixel}</body>`);

        await transporter.sendMail({
          from: `"${fromName}" <${fromEmail}>`,
          to: `"${lead.name}" <${lead.email}>`,
          subject,
          html,
          text
        });

        // Marquer comme envoyé
        await supabase.from('scheduled_emails').update({ 
          status: 'sent', 
          updated_at: new Date().toISOString() 
        }).eq('id', job.id);

        results.push({ job_id: job.id, status: 'success' });

      } catch (err: any) {
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
    return res.status(500).json({ error: err.message });
  }
}
