import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createTransport } from 'nodemailer';
import { supabase } from './_lib/supabase.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const action = req.query.action as string | undefined;

  // POST /api/config?action=test-smtp
  if (req.method === 'POST' && action === 'test-smtp') {
    const { data: config, error } = await supabase.from('api_config').select('*').eq('id', 1).single();
    if (error || !config?.gmail_smtp_user || !config?.gmail_smtp_password) {
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
      return res.json({ success: true, message: '✅ SMTP connection successful' });
    } catch (err: unknown) {
      return res.status(500).json({ error: 'SMTP connection failed', message: (err as Error).message });
    }
  }

  // GET /api/config
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('api_config').select('*').eq('id', 1).single();
    if (error || !data) {
      return res.json({
        groqKey: '', openrouterKey: '', geminiKey: '', nvidiaKey: '', serperKey: '',
        gmailSmtpHost: 'smtp.gmail.com', gmailSmtpPort: 587,
        gmailSmtpUser: '', gmailSmtpPassword: '',
        gmailSmtpFromName: '', gmailSmtpFromEmail: '', gmailSmtpSecure: false
      });
    }
    return res.json({
      groqKey: data.groq_key || '',
      openrouterKey: data.openrouter_key || '',
      geminiKey: data.gemini_key || '',
      nvidiaKey: data.nvidia_key || '',
      serperKey: data.serper_key || '',
      gmailSmtpHost: data.gmail_smtp_host || 'smtp.gmail.com',
      gmailSmtpPort: data.gmail_smtp_port || 587,
      gmailSmtpUser: data.gmail_smtp_user || '',
      gmailSmtpPassword: data.gmail_smtp_password ? '***' + data.gmail_smtp_password.slice(-4) : '',
      gmailSmtpFromName: data.gmail_smtp_from_name || '',
      gmailSmtpFromEmail: data.gmail_smtp_from_email || '',
      gmailSmtpSecure: data.gmail_smtp_secure || false
    });
  }

  // POST /api/config
  if (req.method === 'POST') {
    const body = req.body as Record<string, unknown>;
    const { data: existing } = await supabase.from('api_config').select('gmail_smtp_password').eq('id', 1).single();
    const pwd = body.gmailSmtpPassword as string | undefined;
    const realPassword = pwd?.startsWith('***') ? existing?.gmail_smtp_password : pwd;

    const row = {
      id: 1,
      groq_key: body.groqKey || null,
      openrouter_key: body.openrouterKey || null,
      gemini_key: body.geminiKey || null,
      nvidia_key: body.nvidiaKey || null,
      serper_key: body.serperKey || null,
      gmail_smtp_host: body.gmailSmtpHost || 'smtp.gmail.com',
      gmail_smtp_port: body.gmailSmtpPort || 587,
      gmail_smtp_user: body.gmailSmtpUser || null,
      gmail_smtp_password: realPassword || null,
      gmail_smtp_from_name: body.gmailSmtpFromName || null,
      gmail_smtp_from_email: body.gmailSmtpFromEmail || null,
      gmail_smtp_secure: body.gmailSmtpSecure ?? false,
      updated_at: new Date().toISOString()
    };

    const { error } = await supabase.from('api_config').upsert(row, { onConflict: 'id' });
    if (error) return res.status(500).json({ error: error.message });
    return res.json({ message: 'Configuration saved successfully' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
