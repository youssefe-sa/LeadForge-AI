import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { generateAndSaveDevis, generateAndSaveInvoice } from './_lib/utils';

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

    const { data: lead, error: leadError } = await supabase.from('leads').select('*').eq('id', leadId).single();
    if (leadError || !lead) {
      console.error('[Tracking] Lead not found:', leadId);
    }

    let updateData: any = {};
    const { data: config } = await supabase.from('api_config').select('*').limit(1).single();
    
    if (trackType === 'site_clicked') {
      updateData = { site_clicked: true };
      if (!targetUrl) targetUrl = lead?.site_url || lead?.landing_url || '/';
    } 
    else if (trackType === 'start_clicked') {
      updateData = { site_clicked: true, status: 'interested' }; 
      const agentEmail = config?.gmail_smtp_from_email || config?.gmail_smtp_user || 'contact@leadforge.ai';
      const companyName = lead?.name || 'votre projet';
      
      // GÉNÉRATION AUTO DU DEVIS
      try {
        await generateAndSaveDevis(lead);
      } catch (err) {
        console.error('Erreur génération Devis:', err);
      }

      const subject = encodeURIComponent(`Démarrage projet ${companyName}`);
      const body = encodeURIComponent(`Bonjour, je souhaite démarrer le projet pour ${companyName}.`);
      targetUrl = `mailto:${agentEmail}?subject=${subject}&body=${body}`;
    } 
    else if (trackType === 'payment_clicked') {
      updateData = { payment_clicked: true };
      const isFinal = req.query.final === 'true';
      
      // GÉNÉRATION AUTO DE LA FACTURE
      try {
        const invUrl = await generateAndSaveInvoice(lead, '146', isFinal ? 'final' : 'deposit');
        if (lead) lead.invoice_url = invUrl; // Mettre à jour l'objet local pour la suite du script
      } catch (err) {
        console.error('Erreur génération Facture:', err);
      }

      if (!targetUrl) {
         targetUrl = isFinal ? config?.whop_final_payment_link : config?.whop_deposit_link;
         if (!targetUrl) targetUrl = config?.whop_deposit_link || '/';
      }
    } 
    else if (trackType === 'devis_clicked') {
      updateData = { devis_clicked: true };
      if (!targetUrl || targetUrl === '#') targetUrl = lead?.devis_url || '#';
    } 
    else if (trackType === 'invoice_clicked') {
      updateData = { invoice_clicked: true };
      if (!targetUrl || targetUrl === '#') targetUrl = lead?.invoice_url || '#';
    } 
    else if (trackType === 'email_opened') {
      updateData = { email_opened: true };
    } 
    else if (trackType === 'email_clicked') {
      updateData = { email_clicked: true };
    }

    if (Object.keys(updateData).length > 0) {
      await supabase.from('leads').update(updateData).eq('id', leadId);
      
      // --- LOGIQUE D'AUTOMATISATION DU TUNNEL ---
      let nextTemplateId = '';
      
      if (trackType === 'site_clicked' || trackType === 'start_clicked') {
        nextTemplateId = 'step-2-devis';
      } 
      // Planification automatique retirée pour le paiement (Validation manuelle requise désormais)

      if (nextTemplateId) {
        // 1. Annuler les emails en attente pour éviter les doublons
        await supabase.from('scheduled_emails').delete().eq('lead_id', leadId).eq('status', 'pending');
        
        // 2. Planifier l'étape suivante (dans 1 minute pour le test, puis 30 min en prod)
        const sendDate = new Date();
        sendDate.setMinutes(sendDate.getMinutes() + 2); // Délai de 2 minutes pour laisser le temps au client de voir la page
        
        await supabase.from('scheduled_emails').insert([{
          lead_id: leadId,
          template_id: nextTemplateId,
          scheduled_for: sendDate.toISOString(),
          status: 'pending'
        }]);
        console.log(`[Automation] Prochain email planifié : ${nextTemplateId} pour le lead ${leadId}`);
      }
    }

    if (targetUrl && targetUrl !== '#') {
      return res.redirect(302, targetUrl);
    }

    const pixel = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
    res.setHeader('Content-Type', 'image/gif');
    return res.send(pixel);

  } catch (err: any) {
    console.error('[Tracking Error]', err);
    return res.status(500).json({ error: 'Internal Error', message: err.message });
  }
}

