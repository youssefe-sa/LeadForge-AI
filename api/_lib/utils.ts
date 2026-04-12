import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

const LOGO_SVG = `<svg width="240" height="60" viewBox="0 0 240 60" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="5" width="50" height="50" rx="12" fill="#D4500A" />
  <text x="25" y="40" font-family="Arial" font-weight="900" font-size="30" fill="white" text-anchor="middle">SS</text>
  <text x="62" y="32" font-family="Arial" font-weight="bold" font-size="24" fill="#1a202c">Services-Siteup</text>
  <text x="62" y="50" font-family="Arial" font-size="12" fill="#718096" font-style="italic">Propulsez votre présence en ligne avec excellence</text>
</svg>`;

export async function generateAndSaveDevis(lead: any, price: string = '146'): Promise<string> {
  const devisNumber = `DEV-${lead.id.slice(0, 8).toUpperCase()}-${Date.now()}`;
  const today = new Date().toLocaleDateString('fr-FR');
  const expiryDate = new Date(Date.now() + 7 * 86400000).toLocaleDateString('fr-FR');

  const html = `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8">
    <title>Devis ${devisNumber}</title>
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 0; margin: 0; color: #1a202c; background-color: #f7fafc; }
      .container { max-width: 850px; margin: 40px auto; background: white; padding: 60px; border-radius: 4px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); position: relative; }
      .print-btn { position: absolute; top: 20px; right: 20px; background: #D4500A; color: white; padding: 10px 20px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
      @media print { .print-btn { display: none; } .container { box-shadow: none; margin: 0; width: 100%; } }
      .header { display: flex; justify-content: space-between; border-bottom: 2px solid #edf2f7; padding-bottom: 30px; margin-bottom: 40px; align-items: center; }
      .doc-type h2 { margin: 0; color: #1a202c; font-size: 32px; font-weight: 900; }
      .client-info { display: flex; justify-content: space-between; margin-bottom: 40px; background: #f8fafc; padding: 20px; border-radius: 8px; }
      .service-list { margin-bottom: 40px; }
      .service-category { margin-top: 25px; border-bottom: 1px solid #edf2f7; padding-bottom: 5px; color: #D4500A; font-weight: bold; text-transform: uppercase; font-size: 14px; }
      .service-item { padding: 10px 0; display: flex; align-items: flex-start; }
      .service-item strong { min-width: 250px; display: inline-block; }
      .price-box { background: #1a202c; color: white; padding: 30px; border-radius: 8px; margin-top: 40px; }
      .signature { margin-top: 60px; border-top: 1px solid #edf2f7; padding-top: 30px; }
    </style>
  </head><body>
    <div class="container">
      <button class="print-btn" onclick="window.print()">📥 TÉLÉCHARGER LE PDF</button>
      <div class="header">
        ${LOGO_SVG}
        <div class="doc-type">
          <h2>DEVIS</h2>
          <p style="margin:0; color:#718096; text-align:right;">N° ${devisNumber}<br>Date : ${today}</p>
        </div>
      </div>
      <div class="client-info">
        <div><h4>PRESTATAIRE</h4><p><strong>Services-Siteup</strong><br>siteup.services@gmail.com</p></div>
        <div style="text-align:right"><h4>DESTINATAIRE</h4><p><strong>${lead.name}</strong><br>${lead.city || ''}</p></div>
      </div>

      <div class="service-list">
        <div class="service-category">🌐 Site Web Professionnel Complet</div>
        <div class="service-item">• <strong>Design sur mesure</strong> : Création unique adaptée à votre image et votre secteur</div>
        <div class="service-item">• <strong>Responsive design</strong> : Affichage parfait sur ordinateur, tablette et smartphone</div>
        <div class="service-item">• <strong>Formulaire de contact & WhatsApp</strong> : Intégration directe pour vos clients</div>
        <div class="service-item">• <strong>Chatbot intelligent</strong> : Assistant 24/7 pour vos visiteurs</div>

        <div class="service-category">🚀 Optimisation et Performance</div>
        <div class="service-item">• <strong>SEO optimisé</strong> : Référencement naturel pour apparaître sur Google</div>
        <div class="service-item">• <strong>Sécurité SSL & Performance</strong> : Certificat HTTPS et chargement rapide inclus</div>

        <div class="service-category">🏆 Avantages Exclusifs</div>
        <div class="service-item">• <strong>Garantie satisfaction</strong> : Remboursement 15j si non satisfait</div>
        <div class="service-item">• <strong>Livraison Express</strong> : Votre site prêt en 2 jours ouvrés</div>
      </div>

      <div class="price-box">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <h3 style="margin:0; font-size:24px;">INVESTISSEMENT : ${price} €</h3>
            <p style="margin:5px 0 0 0; opacity:0.8; font-size:14px;">Hébergement & Nom de domaine inclus 1 an</p>
          </div>
          <div style="text-align:right">
            <span style="background:#D4500A; padding:5px 15px; border-radius:4px; font-weight:bold;">PAIEMENT UNIQUE</span>
          </div>
        </div>
        <hr style="opacity:0.2; margin:20px 0;">
        <p style="font-size:13px;">📌 <strong>À partir de la 2ème année :</strong> Seulement 46€ / an pour l'hébergement et le nom de domaine.</p>
      </div>

      <p style="margin-top:30px; font-size:14px; color:#4a5568;">
        ✅ <strong>Modalités :</strong> Acompte de démarrage (46€) requis pour lancer la production. Solde final (100€) à la livraison du site.
      </p>

      <div class="signature">
        <p style="font-size:12px; color:#718096; margin-bottom:5px;">Signature Prestataire</p>
        <div style="font-weight:bold; font-size:18px; color:#D4500A;">Services-Siteup</div>
        <div style="margin-top:10px; border:1px dashed #cbd5e0; width:200px; height:80px; display:flex; align-items:center; justify-content:center; color:#cbd5e0; font-size:12px;">CADRE SIGNATURE</div>
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

