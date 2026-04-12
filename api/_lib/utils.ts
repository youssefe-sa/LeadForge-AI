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
    <title>Devis ${devisNumber}</title>
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 0; margin: 0; color: #1a202c; background-color: #f7fafc; }
      .container { max-width: 850px; margin: 40px auto; background: white; padding: 60px; border-radius: 4px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); position: relative; }
      .print-btn { position: absolute; top: 20px; right: 20px; background: #D4500A; color: white; padding: 10px 20px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
      @media print { .print-btn { display: none; } .container { box-shadow: none; margin: 0; width: 100%; } body { background: white; } }
      .header { display: flex; justify-content: space-between; border-bottom: 2px solid #edf2f7; padding-bottom: 30px; margin-bottom: 40px; align-items: center; }
      .client-info { display: flex; justify-content: space-between; margin-bottom: 40px; background: #f8fafc; padding: 25px; border-radius: 8px; }
      .section-title { background: #1a202c; color: white; padding: 10px 15px; font-size: 14px; font-weight: bold; border-radius: 4px; margin-top: 30px; }
      table.pro-table { width: 100%; border-collapse: collapse; margin-top: 5px; }
      table.pro-table td { padding: 8px 15px; border-bottom: 1px solid #edf2f7; font-size: 14px; line-height: 1.5; }
      table.pro-table td:first-child { color: #D4500A; width: 25px; font-weight: bold; }
      .price-box { background: #1a202c; color: white; padding: 30px; border-radius: 8px; margin-top: 40px; }
      .modalities { background: #f0fff4; border: 1px solid #c6f6d5; padding: 25px; border-radius: 8px; margin-top: 30px; color: #22543d; border-left: 5px solid #48bb78; }
    </style>
  </head><body>
    <div class="container">
      <button class="print-btn" onclick="window.print()">📥 TÉLÉCHARGER LE PDF</button>
      <div class="header">
        ${LOGO_SVG}
        <div style="text-align:right">
          <h2 style="margin:0; font-size:32px; font-weight:900;">DEVIS</h2>
          <p style="margin:0; color:#718096;">N° ${devisNumber}<br>Date : ${today}</p>
        </div>
      </div>
      <div class="client-info">
        <div><h4>Veuillez adresser le règlement à :</h4><p><strong>Services-Siteup</strong><br>siteup.services@gmail.com</p></div>
        <div style="text-align:right"><h4>Client :</h4><p><strong>${lead.name}</strong><br>${lead.city || ''}</p></div>
      </div>

      <div class="section-title">🌐 SITE WEB PROFESSIONNEL COMPLET</div>
      <table class="pro-table">
        <tr><td>•</td><td><strong>Design sur mesure</strong> : Création unique adaptée à votre image et votre secteur d'activité</td></tr>
        <tr><td>•</td><td><strong>Responsive design</strong> : Affichage parfait sur ordinateur, tablette et smartphone</td></tr>
        <tr><td>•</td><td><strong>Pages essentielles</strong> : Accueil, Présentation, Services, Contact...</td></tr>
        <tr><td>•</td><td><strong>Formulaire de contact</strong> : Vos clients peuvent vous contacter directement depuis le site</td></tr>
        <tr><td>•</td><td><strong>WhatsApp intégré</strong> : Vos clients peuvent vous contacter directement via WhatsApp</td></tr>
        <tr><td>•</td><td><strong>Chatbot intelligent</strong> : Assistant 24/7 pour répondre aux questions de vos visiteurs</td></tr>
      </table>

      <div class="section-title">🚀 OPTIMISATION ET PERFORMANCE</div>
      <table class="pro-table">
        <tr><td>•</td><td><strong>SEO optimisé</strong> : Référencement naturel pour apparaître dans Google</td></tr>
        <tr><td>•</td><td><strong>Performance rapide</strong> : Temps de chargement optimisé pour meilleure expérience utilisateur</td></tr>
        <tr><td>•</td><td><strong>Sécurité SSL</strong> : Certificat HTTPS inclus pour la sécurité de vos visiteurs</td></tr>
        <tr><td>•</td><td><strong>Analytics intégré</strong> : Suivi des visiteurs et statistiques de performance</td></tr>
      </table>

      <div class="section-title">🎯 FORMATION ET SUPPORT</div>
      <table class="pro-table">
        <tr><td>•</td><td><strong>Support prioritaire</strong> : Assistance pendant 3 mois</td></tr>
        <tr><td>•</td><td><strong>Mises à jour incluses</strong> : Maintenance et sécurité garanties</td></tr>
      </table>

      <div class="section-title">🏆 AVANTAGES EXCLUSIFS</div>
      <table class="pro-table">
        <tr><td>•</td><td><strong>Garantie satisfaction</strong> : Remboursement complet si pas satisfait sous 15 jours</td></tr>
        <tr><td>•</td><td><strong>Livraison rapide</strong> : Site web prêt en 2 jours ouvrés</td></tr>
        <tr><td>•</td><td><strong>Économie garantie</strong> : 75% moins cher que les agences traditionnelles</td></tr>
        <tr><td>•</td><td><strong>Propriété totale</strong> : Vous êtes 100% propriétaire de votre site et domaine</td></tr>
      </table>

      <div class="price-box">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <h3 style="margin:0; font-size:26px;">INVESTISSEMENT : ${price} €</h3>
            <p style="margin:5px 0 0 0; opacity:0.8;">La création de votre site web professionnel est payée une seule fois.</p>
          </div>
          <div style="text-align:right">
            <span style="background:#D4500A; padding:8px 15px; border-radius:4px; font-weight:bold;">PACK TOUT INCLUS</span>
          </div>
        </div>
        <hr style="opacity:0.2; margin:20px 0;">
        <p style="font-size:14px; margin-bottom:5px;"><strong>Inclut la 1ère année :</strong></p>
        <ul style="font-size:13px; margin:0; padding-left:20px; opacity:0.9;">
          <li>Hébergement professionnel 1 an inclus</li>
          <li>Nom de domaine professionnel 1 an inclus</li>
          <li>3 mois gratuits de suivi et maintenance</li>
        </ul>
        <p style="font-size:14px; margin-top:15px;"><strong>À partir de la 2ème année :</strong> 46€ par an (Hébergement ET nom de domaine).</p>
      </div>

      <div class="modalities">
        <h4 style="margin:0 0 10px 0;">✅ MODALITÉS DE PAIEMENT</h4>
        <p style="margin:0; font-size:15px; line-height:1.6;">
          Le lancement de la production est conditionné par le règlement d'un <strong>acompte de démarrage de 46€</strong>.<br>
          Le <strong>solde final de 100€</strong> sera dû uniquement à la livraison et validation de votre site web.
        </p>
      </div>

      <div style="margin-top:50px; padding-top:20px; border-top:1px solid #edf2f7;">
        <p style="font-size:12px; color:#718096; margin-bottom:5px;">Signature Prestataire</p>
        <div style="font-weight:bold; font-size:18px; color:#D4500A;">Services-Siteup</div>
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

