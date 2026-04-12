import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function generateAndSaveDevis(lead: any, price: string = '146'): Promise<string> {
  const devisNumber = `DEV-${lead.id.slice(0, 8).toUpperCase()}-${Date.now()}`;
  const today = new Date().toLocaleDateString('fr-FR');
  const expiryDate = new Date(Date.now() + 7 * 86400000).toLocaleDateString('fr-FR');
  const deliveryDate = new Date(Date.now() + 2 * 86400000).toLocaleDateString('fr-FR');

  const html = `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8">
    <title>Devis ${devisNumber}</title>
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 0; margin: 0; color: #1a202c; background-color: #f7fafc; }
      .container { max-width: 800px; margin: 40px auto; background: white; padding: 60px; border-radius: 4px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); position: relative; }
      .print-btn { position: absolute; top: 20px; right: 20px; background: #D4500A; color: white; padding: 10px 20px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
      @media print { .print-btn { display: none; } .container { box-shadow: none; margin: 0; width: 100%; } body { background: white; } }
      .header { display: flex; justify-content: space-between; border-bottom: 2px solid #edf2f7; padding-bottom: 30px; margin-bottom: 40px; }
      .brand { font-size: 28px; font-weight: 800; color: #D4500A; letter-spacing: -1px; }
      .doc-type { text-align: right; }
      .doc-type h2 { margin: 0; color: #2d3748; font-size: 32px; font-weight: 900; }
      .client-info { display: flex; justify-content: space-between; margin-bottom: 50px; }
      .info-box h4 { margin: 0 0 10px 0; color: #718096; text-transform: uppercase; font-size: 12px; letter-spacing: 1px; }
      table { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
      th { text-align: left; padding: 15px; border-bottom: 2px solid #edf2f7; color: #4a5568; font-size: 13px; text-transform: uppercase; }
      td { padding: 20px 15px; border-bottom: 1px solid #edf2f7; vertical-align: top; }
      .price { text-align: right; font-weight: 600; }
      .total-section { margin-left: auto; width: 300px; }
      .total-row { display: flex; justify-content: space-between; padding: 10px 0; }
      .grand-total { border-top: 2px solid #1a202c; margin-top: 10px; padding-top: 15px; font-weight: 900; font-size: 20px; }
      .footer-note { margin-top: 60px; padding-top: 30px; border-top: 1px solid #edf2f7; font-size: 13px; color: #718096; }
      .signature { display: flex; justify-content: space-between; margin-top: 50px; }
      .sig-box { width: 200px; height: 100px; border-bottom: 1px solid #cbd5e0; }
    </style>
  </head><body>
    <div class="container">
      <button class="print-btn" onclick="window.print()">📥 TÉLÉCHARGER LE PDF</button>
      <div class="header">
        <div class="brand">SERVICES SITEUP</div>
        <div class="doc-type">
          <h2>DEVIS</h2>
          <p style="margin:0; color:#718096;">N° ${devisNumber}</p>
        </div>
      </div>
      <div class="client-info">
        <div class="info-box">
          <h4>VOTRE EXPERT</h4>
          <p><strong>Services SiteUp</strong><br>Département Création Web<br>contact@services-siteup.online</p>
        </div>
        <div class="info-box" style="text-align:right">
          <h4>CLIENT</h4>
          <p><strong>${lead.name}</strong><br>${lead.city || ''}<br>${lead.sector || 'Secteur professionnel'}</p>
        </div>
      </div>
      <table>
        <thead>
          <tr><th>Description des Prestations</th><th style="text-align:right">Total</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Conception Web Premium - Pack Business</strong><br>
              <span style="font-size:13px; color:#718096;">
                • Design unique 100% Responsive (Mobile + Desktop)<br>
                • Optimisation SEO locale avancée automatique<br>
                • Interface d'administration simplifiée<br>
                • Intégration de vos contenus et photos
              </span>
            </td>
            <td class="price">${price} $</td>
          </tr>
          <tr>
            <td>
              <strong>Infrastructure & Maintenance (Inclus 1 an)</strong><br>
              <span style="font-size:13px; color:#718096;">
                • Hébergement Cloud Haute Performance<br>
                • Nom de domaine personnalisé (.fr, .com ou .online)<br>
                • Certificat SSL (Cadenas de sécurité HTTPS)<br>
                • Sauvegardes hebdomadaires
              </span>
            </td>
            <td class="price">OFFERT</td>
          </tr>
        </tbody>
      </table>
      <div class="total-section">
        <div class="total-row"><span>Sous-total HT</span><span>${price} $</span></div>
        <div class="total-row"><span>TVA (Auto-entrepreneur)</span><span>0.00 $</span></div>
        <div class="total-row grand-total"><span>TOTAL</span><span>${price} $</span></div>
      </div>
      <p style="background:#fefcbf; padding:15px; border-radius:6px; font-size:13px; color:#744210; margin-top:30px;">
        💡 <strong>Modalités :</strong> Acompte de démarrage (46$) requis pour lancer la production. Solde final (100$) à la livraison du site.
      </p>
      <div class="signature">
        <div>
          <p style="font-size:12px; color:#718096; margin-bottom:5px;">Cachet & Signature Prestataire</p>
          <div class="brand" style="font-size:16px; margin-top:10px;">Services SiteUp</div>
        </div>
        <div style="text-align:right">
          <p style="font-size:12px; color:#718096; margin-bottom:5px;">Bon pour accord (Signature Client)</p>
          <div class="sig-box"></div>
        </div>
      </div>
      <div class="footer-note">
        Offre valable jusqu'au ${expiryDate}. Le démarrage des travaux intervient sous 24h après réception de l'acompte. 
        Livraison estimée sous 48h ouvrées.
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
      .print-btn { position: absolute; top: 20px; right: 20px; background: #28a745; color: white; padding: 10px 20px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
      @media print { .print-btn { display: none; } .container { box-shadow: none; margin: 0; width: 100%; } }
      .header { display: flex; justify-content: space-between; border-bottom: 2px solid #edf2f7; padding-bottom: 30px; margin-bottom: 40px; }
      .brand { font-size: 28px; font-weight: 800; color: #28a745; letter-spacing: -1px; }
      .status-badge { display: inline-block; background: #e8f5e9; color: #2e7d32; padding: 5px 15px; border-radius: 20px; font-weight: bold; font-size: 14px; margin-top: 10px; }
      .total-box { background: #f8fafc; border-top: 2px solid #28a745; padding: 20px; margin-top: 40px; text-align: right; }
    </style>
  </head><body>
    <div class="container">
      <button class="print-btn" onclick="window.print()">📥 TÉLÉCHARGER LA FACTURE</button>
      <div class="header">
        <div class="brand">SERVICES SITEUP</div>
        <div style="text-align:right">
          <h2 style="margin:0; font-size:32px; font-weight:900;">FACTURE</h2>
          <p style="margin:0; color:#718096;">N° ${invNumber}</p>
          <div class="status-badge">PAYÉE - MERCI</div>
        </div>
      </div>
      <div style="display:flex; justify-content:space-between; margin-bottom:50px;">
        <div><h4>ÉMETTEUR</h4><p><strong>Services SiteUp</strong><br>contact@services-siteup.online</p></div>
        <div style="text-align:right"><h4>DESTINATAIRE</h4><p><strong>${lead.name}</strong><br>${lead.city || ''}</p></div>
      </div>
      <table style="width:100%; border-collapse:collapse;">
        <thead><tr style="border-bottom:2px solid #edf2f7"><th style="padding:15px 0; text-align:left">Description</th><th style="padding:15px 0; text-align:right">Montant</th></tr></thead>
        <tbody>
          <tr>
            <td style="padding:20px 0">Prestation digitale : ${type === 'deposit' ? 'Acompte (Lancement projet)' : 'Règlement du solde (Livraison)'}</td>
            <td style="padding:20px 0; text-align:right; font-weight:bold">${amount} $</td>
          </tr>
        </tbody>
      </table>
      <div class="total-box">
        <p style="margin:0; color:#718096; font-size:14px;">Total reçu le ${today}</p>
        <p style="margin:5px 0 0 0; font-size:24px; font-weight:900;">${amount} $</p>
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

