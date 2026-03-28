import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../_lib/supabase.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing id' });

  // GET /api/leads/:id
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('leads').select('*').eq('id', id).single();
    if (error) return res.status(404).json({ error: 'Lead not found' });
    return res.json(data);
  }

  // PUT /api/leads/:id
  if (req.method === 'PUT') {
    const updates = { ...req.body, updated_at: new Date().toISOString() };
    const { error } = await supabase.from('leads').update(updates).eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    return res.json({ message: 'Lead updated successfully', id });
  }

  // DELETE /api/leads/:id
  if (req.method === 'DELETE') {
    const { error } = await supabase.from('leads').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    return res.json({ message: 'Lead deleted successfully', id });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
