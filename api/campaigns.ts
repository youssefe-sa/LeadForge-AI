import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from './_lib/supabase.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // GET /api/campaigns
  if (req.method === 'GET') {
    const { status } = req.query;
    let query = supabase.from('campaigns').select('*').order('created_at', { ascending: false });
    if (status) query = query.eq('status', status as string);
    const { data, error } = await query;
    if (error) return res.status(500).json({ error: error.message });
    return res.json({ campaigns: data, count: data?.length ?? 0 });
  }

  // POST /api/campaigns
  if (req.method === 'POST') {
    const { name, templateId, leadIds } = req.body;
    if (!name || !templateId || !Array.isArray(leadIds) || leadIds.length === 0) {
      return res.status(400).json({ error: 'Required: name, templateId, leadIds[]' });
    }

    const { data: campaign, error: campErr } = await supabase.from('campaigns').insert([{
      name, template_id: templateId, leads_count: leadIds.length, status: 'draft'
    }]).select().single();

    if (campErr || !campaign) return res.status(500).json({ error: campErr?.message });

    // Add leads to campaign
    const campaignLeads = leadIds.map((leadId: string) => ({
      campaign_id: campaign.id, lead_id: leadId, status: 'pending'
    }));
    const { error: leadsErr } = await supabase.from('campaign_leads').insert(campaignLeads);
    if (leadsErr) return res.status(500).json({ error: leadsErr.message });

    return res.status(201).json({
      id: campaign.id, message: 'Campaign created successfully', name, templateId, leadsCount: leadIds.length
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
