import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createTransport } from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

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

    // 2. Récupérer la config SMTP
    const { data: config, error: configErr } = await supabase.from('api_config').select('*').eq('id', 1).single();
    if (configErr || !config?.gmail_smtp_user || !config?.gmail_smtp_password) {
      throw new Error('SMTP not configured in database');
    }

    const port = config.gmail_smtp_port || 587;
    const transporter = createTransport({
      host: config.gmail_smtp_host || 'smtp.gmail.com',
      port,
      secure: port === 465,
      auth: { user: config.gmail_smtp_user, pass: config.gmail_smtp_password.replace(/\s/g, '') },
      tls: { rejectUnauthorized: false }
    });

    const fromName = config.gmail_smtp_from_name || 'LeadForge AI';
    const fromEmail = config.gmail_smtp_from_email || config.gmail_smtp_user;
    
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

        // Récupérer le template spécifique depuis la base ou utiliser un fallback
        let subject = `Suivi de votre projet - ${lead.name}`;
        let html = `<p>Bonjour ${lead.name},</p><p>Ceci est un suivi de LeadForge pour votre site web.</p>`;

        const { data: template } = await supabase
          .from('email_templates')
          .select('*')
          .eq('id', job.template_id)
          .single();

        if (template) {
          subject = template.subject;
          html = template.body;
        }

        // Fonction de personnalisation équivalente au frontend
        const replacements: Record<string, string> = {
          '{{name}}': lead.name || '',
          '{{firstName}}': lead.name || '',
          '{{companyName}}': lead.name || '',
          '{{websiteLink}}': lead.site_url || '#',
          '{{paymentLink}}': config.whop_deposit_link || '#',
          '{{finalPaymentLink}}': config.whop_final_payment_link || '#',
          '{{agentName}}': config.gmail_smtp_from_name || 'Solutions Web',
          '{{agentEmail}}': config.gmail_smtp_from_email || config.gmail_smtp_user,
          '{{deliveryDate}}': new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR'),
        };

        for (const [key, val] of Object.entries(replacements)) {
          subject = subject.split(key).join(val as string);
          html = html.split(key).join(val as string);
        }

        // Injection du pixel de tracking
        const trackingPixel = `<img src="https://leadforge.ai/api/track?id=${lead.id}&type=email_opened" width="1" height="1" style="display:none;" />`;
        html = html.includes('</body>') ? html.replace('</body>', `${trackingPixel}</body>`) : html + trackingPixel;

        const info = await transporter.sendMail({
          from: `"${fromName}" <${fromEmail}>`,
          to: `"${lead.name}" <${lead.email}>`,
          subject,
          html,
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
