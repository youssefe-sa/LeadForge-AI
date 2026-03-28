import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createTransport } from 'nodemailer';
import { supabase } from '../_lib/supabase.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

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
  } catch (err: any) {
    return res.status(500).json({ error: 'SMTP connection failed', message: err.message });
  }
}
