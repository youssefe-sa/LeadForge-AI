import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from './_lib/supabase.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // GET /api/templates
  if (req.method === 'GET') {
    const { sector } = req.query;
    let query = supabase.from('email_templates').select('*').order('created_at', { ascending: false });
    if (sector) query = query.eq('sector', sector as string);
    const { data, error } = await query;
    if (error) return res.status(500).json({ error: error.message });
    return res.json({ templates: data, count: data?.length ?? 0 });
  }

  // POST /api/templates
  if (req.method === 'POST') {
    const { name, sector, subject, body } = req.body;
    if (!name || !sector || !subject || !body) {
      return res.status(400).json({ error: 'name, sector, subject, body are required' });
    }
    const { data, error } = await supabase.from('email_templates').insert([{ name, sector, subject, body }]).select().single();
    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json({ message: 'Template created successfully', ...data });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
