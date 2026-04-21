import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      const { limit = '50', offset = '0' } = req.query;
      
      const { data: bounces, error } = await supabase
        .from('email_bounces')
        .select('*')
        .order('created_at', { ascending: false })
        .range(parseInt(offset as string), parseInt(offset as string) + parseInt(limit as string) - 1);

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      return res.json({ bounces: bounces || [], count: bounces?.length || 0 });
    } catch (err: any) {
      console.error('[Bounce GET Error]', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, type, reason, leadId, messageId } = req.body;

    if (!email || !type) {
      return res.status(400).json({ error: 'Email and type are required' });
    }

    // Vérifier si ce bounce a déjà été enregistré
    const { data: existingBounce } = await supabase
      .from('email_bounces')
      .select('id')
      .eq('email', email)
      .eq('type', type)
      .maybeSingle();

    if (existingBounce) {
      console.log(`[Bounce] Déjà enregistré: ${email} - ${type}`);
      return res.json({ success: true, message: 'Bounce already recorded' });
    }

    // Enregistrer le bounce
    const { data: bounce, error: bounceError } = await supabase
      .from('email_bounces')
      .insert([{
        email,
        type, // 'hard', 'soft', 'complaint', 'timeout'
        reason: reason || '',
        lead_id: leadId || null,
        message_id: messageId || null,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (bounceError) {
      console.error('[Bounce] Insert error:', bounceError);
      return res.status(500).json({ error: bounceError.message });
    }

    // Mettre à jour le lead si fourni
    if (leadId) {
      const updateData: any = {};
      
      if (type === 'hard') {
        updateData.email_status = 'invalid';
        updateData.email_bounced = true;
        updateData.email_bounce_type = 'hard';
        updateData.email_bounce_date = new Date().toISOString();
      } else if (type === 'soft') {
        updateData.email_status = 'soft_bounce';
        updateData.email_bounced = true;
        updateData.email_bounce_type = 'soft';
        updateData.email_bounce_date = new Date().toISOString();
      } else if (type === 'complaint') {
        updateData.email_status = 'complaint';
        updateData.email_complained = true;
        updateData.email_complaint_date = new Date().toISOString();
      }

      if (Object.keys(updateData).length > 0) {
        await supabase
          .from('leads')
          .update(updateData)
          .eq('id', leadId);
        
        console.log(`[Bounce] Lead ${leadId} mis à jour: ${type}`);
      }
    }

    console.log(`[Bounce] Enregistré: ${email} - ${type} - ${reason}`);

    return res.json({
      success: true,
      message: 'Bounce recorded successfully',
      bounce
    });

  } catch (err: any) {
    console.error('[Bounce Error]', err);
    return res.status(500).json({ error: 'Internal server error', message: err.message });
  }
}
