import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../_lib/supabase.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing id' });

  // GET /api/campaigns/:id
  if (req.method === 'GET') {
    const { data: campaign, error } = await supabase.from('campaigns').select('*').eq('id', id).single();
    if (error) return res.status(404).json({ error: 'Campaign not found' });

    const { data: leads } = await supabase.from('campaign_leads')
      .select('*, leads(*)')
      .eq('campaign_id', id);

    return res.json({ campaign, leads: leads?.map(l => ({ ...l.leads, campaign_status: l.status, sent_at: l.sent_at })) });
  }

  // DELETE /api/campaigns/:id
  if (req.method === 'DELETE') {
    await supabase.from('campaign_leads').delete().eq('campaign_id', id);
    const { error } = await supabase.from('campaigns').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    return res.json({ message: 'Campaign deleted successfully', id });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
