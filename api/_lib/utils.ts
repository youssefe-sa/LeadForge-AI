import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

const LOGO_SVG = `<svg width="280" height="60" viewBox="0 0 280 60" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="5" width="50" height="50" rx="14" fill="#D4500A" />
  <text x="25" y="41" font-family="Arial" font-weight="900" font-size="28" fill="white" text-anchor="middle">ST</text>
  <text x="62" y="32" font-family="Arial" font-weight="bold" font-size="24" fill="#1a202c">Services-Siteup</text>
  <text x="62" y="50" font-family="Arial" font-size="11" fill="#718096" font-style="italic">Propulsez votre présence en ligne avec excellence</text>
</svg>`;

export async function generateAndSaveDevis(lead: any, price: string = '146'): Promise<string> {
  const devisNumber = `DEV-${lead.id.slice(0, 8).toUpperCase()}-${Date.now()}`;
  const today = new Date().toLocaleDateString('fr-FR');
  const expiryDate = new Date(Date.now() + 7 * 86400000).toLocaleDateString('fr-FR');

  const html = `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8">
    <title>Devis ${devisNumber}</title>    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 0; margin: 0; color: #1a202c; background-color: #f7fafc; font-size: 13px; }
      .container { max-width: 800px; margin: 20px auto; background: white; padding: 40px; border-radius: 4px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); position: relative; }
      .print-btn { position: absolute; top: 15px; right: 15px; background: #D4500A; color: white; padding: 8px 15px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 12px; }
      @media print { .print-btn { display: none; } .container { box-shadow: none; margin: 0; width: 100%; padding: 20px; } body { background: white; } }
      .header { display: flex; justify-content: space-between; border-bottom: 2px solid #edf2f7; padding-bottom: 20px; margin-bottom: 25px; align-items: center; }
      .client-info { display: flex; justify-content: space-between; margin-bottom: 25px; background: #f8fafc; padding: 15px 20px; border-radius: 8px; border: 1px solid #edf2f7; }
      .section-title { background: #2d3748; color: white; padding: 6px 12px; font-size: 12px; font-weight: bold; border-radius: 4px; margin-top: 15px; text-transform: uppercase; letter-spacing: 0.5px; }
      table.pro-table { width: 100%; border-collapse: collapse; margin-top: 5px; }
      table.pro-table td { padding: 6px 12px; border-bottom: 1px solid #f1f5f9; font-size: 13px; }
      table.pro-table td:first-child { color: #D4500A; width: 20px; font-weight: bold; }
      .price-box { background: #f8fafc; color: #1a202c; padding: 20px; border-radius: 8px; margin-top: 25px; border: 1px solid #e2e8f0; }
      .modalities { background: #f0fff4; border-left: 4px solid #48bb78; padding: 15px 20px; border-radius: 4px; margin-top: 20px; color: #22543d; }
      h4 { margin: 0 0 5px 0; font-size: 11px; color: #718096; text-transform: uppercase; }
      p { margin: 0; line-height: 1.4; }
    </style>
  </head><body>
    <div class="container">
      <button class="print-btn" onclick="window.print()">📥 IMPRIMER LE DEVIS</button>
      <div class="header">
        ${LOGO_SVG}
        <div style="text-align:right">
          <h2 style="margin:0; font-size:24px; font-weight:900; color:#2d3748;">DEVIS PRO</h2>
          <p style="margin:0; color:#718096; font-size:12px;">N° ${devisNumber}<br>Date : ${today}</p>
        </div>
      </div>
      <div class="client-info">
        <div><h4>Émetteur</h4><p><strong>Services-Siteup</strong><br>siteup.services@gmail.com</p></div>
        <div style="text-align:right"><h4>Destinataire</h4><p><strong>${lead.name}</strong><br>${lead.city || ''}</p></div>
      </div>

      <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div>
          <div class="section-title">🌐 Site Web Professionnel</div>
          <table class="pro-table">
            <tr><td>•</td><td>Design sur mesure & Responsive</td></tr>
            <tr><td>•</td><td>Pages stratégiques (Accueil, Services...)</td></tr>
            <tr><td>•</td><td>WhatsApp & Formulaire intégrés</td></tr>
            <tr><td>•</td><td>Chatbot intelligent 24/7</td></tr>
          </table>
          <div class="section-title">🎯 Formation & Support</div>
          <table class="pro-table">
            <tr><td>•</td><td>Support prioritaire 3 mois</td></tr>
            <tr><td>•</td><td>Maintenance & Sécurité garanties</td></tr>
          </table>
        </div>
        <div>
          <div class="section-title">🚀 Performance & SEO</div>
          <table class="pro-table">
            <tr><td>•</td><td>Référencement Google (SEO)</td></tr>
            <tr><td>•</td><td>Chargement ultra-rapide</td></tr>
            <tr><td>•</td><td>Sécurité SSL (HTTPS)</td></tr>
            <tr><td>•</td><td>Statistiques Analytics</td></tr>
          </table>
          <div class="section-title">🏆 Avantages Exclusifs</div>
          <table class="pro-table">
            <tr><td>•</td><td>Garantie Satisfaction 15 j</td></tr>
            <tr><td>•</td><td>Livraison express en 48h</td></tr>
            <tr><td>•</td><td>Propriété totale à 100%</td></tr>
          </table>
        </div>
      </div>

      <div class="price-box">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <h3 style="margin:0; font-size:22px;">INVESTISSEMENT : ${price} €</h3>
            <p style="margin:2px 0 0 0; color:#4a5568; font-size:12px;">Paiement unique (Hébergement & Domaine inclus 1 an)</p>
          </div>
          <div style="text-align:right; border-left: 1px solid #cbd5e0; padding-left: 20px;">
            <p style="font-size:12px;"><strong>À partir de la 2ème année :</strong></p>
            <p style="font-size:16px; font-weight:bold; color:#D4500A;">46€ / an</p>
          </div>
        </div>
      </div>

      <div class="modalities">
        <p>✅ <strong>Modalités :</strong> Acompte de <strong>46€</strong> pour lancer la production. Solde de <strong>100€</strong> à la livraison.</p>
      </div>

      <div style="margin-top:30px; padding-top:15px; border-top:1px solid #edf2f7; display:flex; justify-content:space-between; align-items:flex-end;">
        <div>
          <p style="font-size:11px; color:#718096; margin-bottom:5px;">Signature Prestataire</p>
          <div style="font-weight:bold; font-size:16px; color:#D4500A;">Services-Siteup</div>
        </div>
        <div style="font-size:10px; color:#a0aec0;">Offre valable 7 jours. Document généré numériquement.</div>
      </div>
    </div>
  </body></html>`;


  const fileName = `devis-${lead.id}-${Date.now()}.html`;
  const { error: uploadError } = await supabase.storage.from('documents').upload(fileName, Buffer.from(html, 'utf-8'), { 
    contentType: 'text/html; charset=utf-8', 
    upsert: true 
  });
  if (uploadError) throw uploadError;

  const publicUrl = `https://www.services-siteup.online/docs/${fileName}`;
  await supabase.from('leads').update({ devis_url: publicUrl }).eq('id', lead.id);
  return publicUrl;
}

export async function generateAndSaveInvoice(lead: any, price: string = '146', type: 'deposit' | 'final' = 'deposit'): Promise<string> {
  const invNumber = `INV-${lead.id.slice(0, 8).toUpperCase()}-${Date.now()}`;
  const amount = type === 'deposit' ? '46' : '100';
  const today = new Date().toLocaleDateString('fr-FR');

  const html = `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8">
    <title>Facture ${invNumber}</title>
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 0; margin: 0; color: #1a202c; background-color: #f7fafc; }
      .container { max-width: 800px; margin: 40px auto; background: white; padding: 60px; border-radius: 4px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); position: relative; }
      .header { display: flex; justify-content: space-between; border-bottom: 2px solid #edf2f7; padding-bottom: 30px; margin-bottom: 40px; align-items: center; }
      .status-badge { display: inline-block; background: #e8f5e9; color: #2e7d32; padding: 8px 15px; border-radius: 20px; font-weight: bold; font-size: 14px; }
    </style>
  </head><body>
    <div class="container">
      <div class="header">
        ${LOGO_SVG}
        <div style="text-align:right">
          <h2 style="margin:0; font-size:28px;">FACTURE</h2>
          <p style="margin:0; color:#718096;">N° ${invNumber}</p>
          <div class="status-badge">PAYÉE</div>
        </div>
      </div>
      <div style="display:flex; justify-content:space-between; margin-bottom:50px; background:#f8fafc; padding:20px; border-radius:8px;">
        <div><h4>ÉMETTEUR</h4><p><strong>Services-Siteup</strong><br>siteup.services@gmail.com</p></div>
        <div style="text-align:right"><h4>DESTINATAIRE</h4><p><strong>${lead.name}</strong></p></div>
      </div>
      <div style="border-top:2px solid #28a745; padding:20px; text-align:right;">
        <p style="margin:0; color:#718096;">Total perçu le ${today}</p>
        <p style="margin:5px 0 0 0; font-size:32px; font-weight:900; color:#28a745;">${amount} €</p>
      </div>
    </div>
  </body></html>`;

  const fileName = `inv-${type}-${lead.id}-${Date.now()}.html`;
  const { error: uploadError } = await supabase.storage.from('documents').upload(fileName, Buffer.from(html, 'utf-8'), { 
    contentType: 'text/html; charset=utf-8', 
    upsert: true 
  });
  if (uploadError) throw uploadError;

  // Utilisation de votre domaine personnalisé
  const publicUrl = `https://www.services-siteup.online/docs/${fileName}`;

  // IMPORTANT: Mise à jour de la colonne invoice_url
  await supabase.from('leads').update({ invoice_url: publicUrl }).eq('id', lead.id);
  console.log('[Utils] Facture sauvegardée:', publicUrl);
  return publicUrl;
}

