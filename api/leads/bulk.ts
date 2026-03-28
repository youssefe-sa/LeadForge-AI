import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../_lib/supabase.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { leads } = req.body;
  if (!Array.isArray(leads) || leads.length === 0) {
    return res.status(400).json({ error: 'Invalid leads array' });
  }

  const rows = leads
    .filter(l => l.name)
    .map(l => ({
      name: l.name, email: l.email, phone: l.phone,
      website: l.website, address: l.address, city: l.city,
      sector: l.sector, rating: l.rating, reviews_count: l.reviews_count,
      has_website: l.has_website ?? false, source: l.source, notes: l.notes
    }));

  const { data, error } = await supabase.from('leads').insert(rows).select();
  if (error) return res.status(500).json({ error: error.message });
  return res.status(201).json({ message: `${data?.length} leads created`, leads: data });
}
