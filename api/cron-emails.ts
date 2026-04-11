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

        // Dans un environnement complet, on compilerait le template depuis supabase_store
        // Pour simuler, on envoie un mail de base (à améliorer en utilisant les templates réels)
        const html = `<p>Bonjour ${lead.name},</p><p>Ceci est un rappel automatique de LeadForge.</p>`;
        const subject = `Rappel pour ${lead.name}`;

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
