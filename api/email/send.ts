import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createTransport } from 'nodemailer';
import { supabase } from '../_lib/supabase.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { to, toName, subject, html, text, leadId } = req.body;
  if (!to || !subject || !html) {
    return res.status(400).json({ error: 'to, subject, html are required' });
  }

  // Get SMTP config
  const { data: config, error: configErr } = await supabase.from('api_config').select('*').eq('id', 1).single();
  if (configErr || !config?.gmail_smtp_user || !config?.gmail_smtp_password) {
    return res.status(400).json({ error: 'SMTP not configured', message: 'Please configure Gmail SMTP in settings' });
  }

  try {
    const port = config.gmail_smtp_port || 587;
    const transporter = createTransport({
      host: config.gmail_smtp_host || 'smtp.gmail.com',
      port,
      secure: port === 465,
      auth: { user: config.gmail_smtp_user, pass: config.gmail_smtp_password.replace(/\s/g, '') },
      tls: { rejectUnauthorized: false }
    });

    await transporter.verify();

    const fromName = config.gmail_smtp_from_name || 'LeadForge AI';
    const fromEmail = config.gmail_smtp_from_email || config.gmail_smtp_user;

    const info = await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: `"${toName || to}" <${to}>`,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, '')
    });

    // Log email
    await supabase.from('email_logs').insert([{
      lead_id: leadId || null,
      to_email: to,
      subject,
      body: html,
      status: 'sent',
      sent_at: new Date().toISOString()
    }]);

    // Update lead if provided
    if (leadId) {
      await supabase.from('leads').update({
        email_sent: true,
        email_sent_date: new Date().toISOString(),
        last_contact: new Date().toISOString()
      }).eq('id', leadId);
    }

    return res.json({ success: true, message: 'Email sent successfully', messageId: info.messageId, to, subject });
  } catch (err: any) {
    console.error('Email error:', err);
    return res.status(500).json({ error: 'Failed to send email', message: err.message });
  }
}
