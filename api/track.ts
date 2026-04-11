import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Autoriser CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id, type } = req.query;

  if (!id || !type) {
    return res.status(400).json({ error: 'Missing ID or type' });
  }

  try {
    const leadId = id as string;
    const trackType = type as string;

    console.log(`[Tracking] Recieved ${trackType} for lead ${leadId}`);

    let updateData: any = {};
    
    if (trackType === 'site_clicked') {
      updateData = { site_clicked: true };
    } else if (trackType === 'payment_clicked') {
      updateData = { payment_clicked: true };
    } else if (trackType === 'devis_clicked') {
      updateData = { devis_clicked: true };
    } else if (trackType === 'invoice_clicked') {
      updateData = { invoice_clicked: true };
    } else if (trackType === 'email_opened') {
      updateData = { email_opened: true };
    } else {
      return res.status(400).json({ error: 'Invalid tracking type' });
    }

    const { error } = await supabase
      .from('leads')
      .update(updateData)
      .eq('id', leadId);

    if (error) {
      console.error('[Tracking DB Error]', error);
      return res.status(500).json({ error: error.message });
    }

    // Retourner un pixel 1x1 transparent pour être discret
    const pixel = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
    res.setHeader('Content-Type', 'image/gif');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    return res.send(pixel);

  } catch (err) {
    console.error('[Tracking Error]', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
