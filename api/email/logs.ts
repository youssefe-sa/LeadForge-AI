import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../_lib/supabase.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { leadId, limit = '50', offset = '0' } = req.query;
  let query = supabase.from('email_logs').select('*').order('sent_at', { ascending: false })
    .range(parseInt(offset as string), parseInt(offset as string) + parseInt(limit as string) - 1);
  if (leadId) query = query.eq('lead_id', leadId as string);

  const { data, error } = await query;
  if (error) return res.status(500).json({ error: error.message });
  return res.json({ logs: data, count: data?.length ?? 0 });
}
