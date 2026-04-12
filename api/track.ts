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

  const { id, type, url, redirect } = req.query;
  let targetUrl = (url || redirect) as string;

  if (!id || !type) {
    return res.status(400).json({ error: 'Missing ID or type' });
  }

  try {
    const leadId = id as string;
    const trackType = type as string;

    // --- RÉCUPÉRATION DES DONNÉES DU LEAD (VITAL) ---
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .select('*')
      .eq('id', leadId)
      .single();

    if (leadError || !lead) {
      console.error('[Tracking] Lead not found:', leadId);
      // On continue quand même si targetUrl existe pour ne pas bloquer le client
    }

    let updateData: any = {};
    const { data: config } = await supabase.from('api_config').select('*').limit(1).single();
    
    if (trackType === 'site_clicked') {
      updateData = { site_clicked: true };
      if (!targetUrl) targetUrl = lead?.site_url || lead?.landing_url || '/';
    } else if (trackType === 'start_clicked') {
      updateData = { site_clicked: true }; 
      const agentEmail = config?.gmail_smtp_from_email || config?.gmail_smtp_user || 'contact@leadforge.ai';
      const companyName = lead?.name || 'votre projet';
      
      // Encodage sécurisé pour la redirection (évite l'erreur 500 sur Vercel)
      const subject = encodeURIComponent(`Démarrage projet ${companyName}`);
      const body = encodeURIComponent(`Bonjour, je souhaite démarrer le projet pour ${companyName}.`);
      targetUrl = `mailto:${agentEmail}?subject=${subject}&body=${body}`;
    } else if (trackType === 'payment_clicked') {
      updateData = { payment_clicked: true };
      if (!targetUrl) targetUrl = config?.whop_deposit_link || '/';
    } else if (trackType === 'devis_clicked') {
      updateData = { devis_clicked: true };
    } else if (trackType === 'invoice_clicked') {
      updateData = { invoice_clicked: true };
    } else if (trackType === 'email_opened') {
      updateData = { email_opened: true };
    } else if (trackType === 'email_clicked') {
      updateData = { email_clicked: true };
    }

    // Mise à jour du statut du lead
    if (Object.keys(updateData).length > 0) {
      await supabase.from('leads').update(updateData).eq('id', leadId);
      
      // Logique de chainage automatique (30 minutes)
      if (trackType === 'site_clicked' || trackType === 'start_clicked') {
        // Annuler les relances
        await supabase.from('scheduled_emails').delete().eq('lead_id', leadId).eq('status', 'pending');
          
        // Programmer l'Email 2 (Devis) si pas déjà fait
        const { data: existingStep2 } = await supabase
          .from('scheduled_emails')
          .select('id')
          .eq('lead_id', leadId)
          .eq('template_id', 'step-2-devis')
          .limit(1);

        if (!existingStep2 || existingStep2.length === 0) {
          const sendDate = new Date();
          sendDate.setMinutes(sendDate.getMinutes() + 30);
          
          await supabase.from('scheduled_emails').insert([{
            lead_id: leadId,
            template_id: 'step-2-devis',
            scheduled_for: sendDate.toISOString(),
            status: 'pending'
          }]);
        }
      }
    }

    if (targetUrl) {
      return res.redirect(302, targetUrl);
    }

    const pixel = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
    res.setHeader('Content-Type', 'image/gif');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    return res.send(pixel);

  } catch (err) {
    console.error('[Tracking Error]', err);
    if (targetUrl) return res.redirect(302, targetUrl);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
