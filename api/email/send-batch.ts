import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createTransport } from 'nodemailer';
import { supabase } from '../_lib/supabase.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { emails, delayMs = 2000 } = req.body;
  if (!Array.isArray(emails) || emails.length === 0) {
    return res.status(400).json({ error: 'Invalid emails array' });
  }

  const { data: config, error: configErr } = await supabase.from('api_config').select('*').eq('id', 1).single();
  if (configErr || !config?.gmail_smtp_user || !config?.gmail_smtp_password) {
    return res.status(400).json({ error: 'SMTP not configured' });
  }

  const port = config.gmail_smtp_port || 587;
  const transporter = createTransport({
    host: config.gmail_smtp_host || 'smtp.gmail.com',
    port,
    secure: port === 465,
    auth: { user: config.gmail_smtp_user, pass: config.gmail_smtp_password.replace(/\s/g, '') },
    tls: { rejectUnauthorized: false }
  });

  try { await transporter.verify(); } catch (e: any) {
    return res.status(500).json({ error: 'SMTP verification failed', message: e.message });
  }

  const fromName = config.gmail_smtp_from_name || 'LeadForge AI';
  const fromEmail = config.gmail_smtp_from_email || config.gmail_smtp_user;
  const results: any[] = [];
  const errors: any[] = [];

  for (const emailData of emails) {
    try {
      const { to, toName, subject, html, leadId } = emailData;
      const info = await transporter.sendMail({
        from: `"${fromName}" <${fromEmail}>`,
        to: `"${toName || to}" <${to}>`,
        subject, html, text: html.replace(/<[^>]*>/g, '')
      });

      await supabase.from('email_logs').insert([{
        lead_id: leadId || null, to_email: to, subject, status: 'sent', sent_at: new Date().toISOString()
      }]);

      if (leadId) {
        await supabase.from('leads').update({
          email_sent: true, email_sent_date: new Date().toISOString(), last_contact: new Date().toISOString()
        }).eq('id', leadId);
      }

      results.push({ to, status: 'sent', messageId: info.messageId });

      if (emails.indexOf(emailData) < emails.length - 1) {
        await new Promise(r => setTimeout(r, delayMs));
      }
    } catch (err: any) {
      errors.push({ to: emailData.to, error: err.message });
    }
  }

  return res.json({
    success: true,
    summary: { total: emails.length, sent: results.length, failed: errors.length },
    results,
    errors: errors.length > 0 ? errors : undefined
  });
}
