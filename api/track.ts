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

    const { id, type, url, redirect } = req.query;
    const targetUrl = (url || redirect) as string;

    if (!id || !type) {
      return res.status(400).json({ error: 'Missing ID or type' });
    }

    try {
      const leadId = id as string;
      const trackType = type as string;

      let updateData: any = {};
      
      if (trackType === 'site_clicked') {
        updateData = { site_clicked: true };
        targetUrl = data.site_url || data.landing_url || '/';
      } else if (trackType === 'start_clicked') {
        updateData = { site_clicked: true }; // On marque aussi comme intéressé
        // Récupérer la config pour l'email de l'agent
        const { data: config } = await supabase.from('api_config').select('*').single();
        const agentEmail = config?.gmail_smtp_from_email || config?.gmail_smtp_user || 'contact@leadforge.ai';
        const companyName = data.name || 'Projet';
        
        // Rediriger vers un mailto personnalisé
        targetUrl = `mailto:${agentEmail}?subject=Démarrage projet ${companyName}&body=Bonjour, je souhaite démarrer le projet pour ${companyName}.`;
      } else if (trackType === 'payment_clicked') {
        updateData = { payment_clicked: true };
        // Rediriger vers Whop (détecté via config ou data)
        const { data: config } = await supabase.from('api_config').select('*').single();
        targetUrl = config?.whop_deposit_link || '/';
      } else if (trackType === 'devis_clicked') {
        updateData = { devis_clicked: true };
      } else if (trackType === 'invoice_clicked') {
        updateData = { invoice_clicked: true };
      } else if (trackType === 'email_opened') {
        updateData = { email_opened: true };
      } else if (trackType === 'email_clicked') {
        updateData = { email_clicked: true };
      }

      if (Object.keys(updateData).length > 0) {
        await supabase.from('leads').update(updateData).eq('id', leadId);
        
        // --- LOGIQUE DE CHAINAGE INTELLIGENT ---
        if (trackType === 'site_clicked' || trackType === 'start_clicked') {
          // 1. Annuler toutes les relances (reminders) programmées
          await supabase.from('scheduled_emails')
            .delete()
            .eq('lead_id', leadId)
            .eq('status', 'pending');
            
          // 2. Vérifier si l'Email 2 (Devis) a déjà été programmé ou envoyé
          const { data: existingStep2 } = await supabase
            .from('scheduled_emails')
            .select('id')
            .eq('lead_id', leadId)
            .eq('template_id', 'email2_devis')
            .limit(1);

          if (!existingStep2 || existingStep2.length === 0) {
            // 3. Programmer l'Email 2 (Devis & Paiement) pour +30 minutes
            const sendDate = new Date();
            sendDate.setMinutes(sendDate.getMinutes() + 30); // <--- PASSAGE À 30 MIN
            
            await supabase.from('scheduled_emails').insert([{
              lead_id: leadId,
              template_id: 'email2_devis',
              scheduled_for: sendDate.toISOString(),
              status: 'pending'
            }]);
          }
        }
      }

      // Si c'est un clic sur un lien, on redirige
      if (targetUrl) {
        return res.redirect(302, targetUrl);
      }

      // Sinon (pixel d'ouverture), on renvoie le pixel transparent
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
