import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from './_lib/supabase.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // GET /api/leads
  if (req.method === 'GET') {
    const { status, search, limit = '100', offset = '0' } = req.query;
    let query = supabase.from('leads').select('*');
    if (status) query = query.eq('status', status as string);
    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,city.ilike.%${search}%`);
    }
    query = query.order('created_at', { ascending: false })
      .range(parseInt(offset as string), parseInt(offset as string) + parseInt(limit as string) - 1);
    const { data, error } = await query;
    if (error) return res.status(500).json({ error: error.message });
    return res.json({ leads: data, count: data?.length ?? 0 });
  }

  // POST /api/leads
  if (req.method === 'POST') {
    const body = req.body;
    if (!body.name) return res.status(400).json({ error: 'name is required' });
    const { data, error } = await supabase.from('leads').insert([{
      name: body.name, email: body.email, phone: body.phone,
      website: body.website, address: body.address, city: body.city,
      sector: body.sector, rating: body.rating, reviews_count: body.reviews_count,
      has_website: body.has_website ?? false, source: body.source, notes: body.notes
    }]).select().single();
    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json({ message: 'Lead created successfully', ...data });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
