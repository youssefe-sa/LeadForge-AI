import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createTransport } from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from './_lib/supabase.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  return res.status(405).json({ error: 'Use /api/email/send or /api/email/logs' });
}
