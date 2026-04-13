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

  const html = `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8">
    <title>Devis ${devisNumber}</title>
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 0; margin: 0; color: #1a202c; background-color: white; }
      .container { max-width: 800px; margin: 0 auto; background: white; padding: 20px 45px; position: relative; }
      .print-btn { position: absolute; top: 10px; right: 45px; background: #D4500A; color: white; padding: 8px 15px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 11px; }
      @media print { .print-btn { display: none; } .container { padding: 10px 20px; width: 100%; } }
      .header { display: flex; justify-content: space-between; border-bottom: 2px solid #edf2f7; padding-bottom: 10px; margin-bottom: 10px; align-items: center; }
      .client-info { display: flex; justify-content: space-between; margin-bottom: 10px; background: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid #edf2f7; font-size: 12px; }
      .section-title { background: #f1f5f9; color: #D4500A; padding: 4px 10px; font-size: 12px; font-weight: bold; border-radius: 4px; margin-top: 10px; border-left: 4px solid #D4500A; }
      table.pro-table { width: 100%; border-collapse: collapse; margin-top: 2px; }
      table.pro-table td { padding: 2px 12px; border-bottom: 1px solid #f7fafc; font-size: 11.5px; line-height: 1.3; }
      table.pro-table td:first-child { color: #D4500A; width: 15px; font-weight: bold; }
      .price-box { background: #f8fafc; color: #1a202c; padding: 15px 20px; border-radius: 8px; margin-top: 15px; border: 1px solid #edf2f7; border-left: 5px solid #1a202c; }
      .modalities { background: #f0fff4; border: 1px solid #c6f6d5; padding: 12px; border-radius: 8px; margin-top: 15px; color: #22543d; border-left: 5px solid #48bb78; }
    </style>
  </head><body>
    <div class="container">
      <button class="print-btn" onclick="window.print()">📥 IMPRIMER / PDF</button>
      <div class="header">
        ${LOGO_SVG}
        <div style="text-align:right">
          <h2 style="margin:0; font-size:22px; font-weight:900;">DEVIS</h2>
          <p style="margin:0; color:#718096; font-size:11px;">N° ${devisNumber} | Date : ${today}</p>
        </div>
      </div>
      <div class="client-info">
        <div><strong>Services-Siteup</strong> | siteup.services@gmail.com</div>
        <div style="text-align:right"><strong>${lead.name}</strong> | ${lead.city || ''}</div>
      </div>

      <div class="section-title">🌐 SITE WEB PROFESSIONNEL COMPLET</div>
      <table class="pro-table">
        <tr><td>•</td><td><strong>Design sur mesure</strong> : Création unique adaptée à votre image et votre secteur d''activité</td></tr>
        <tr><td>•</td><td><strong>Responsive design</strong> : Affichage parfait sur ordinateur, tablette et smartphone</td></tr>
        <tr><td>•</td><td><strong>Pages essentielles</strong> : Accueil, Présentation, Services, Contact...</td></tr>
        <tr><td>•</td><td><strong>Formulaire de contact</strong> : Vos clients peuvent vous contacter directement depuis le site</td></tr>
        <tr><td>•</td><td><strong>WhatsApp intégré</strong> : Vos clients vous contacter directement via WhatsApp</td></tr>
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
            <h3 style="margin:0; font-size:20px;">INVESTISSEMENT : ${price} €</h3>
            <p style="margin:2px 0 0 0; font-size:11px; opacity:0.8;">La création de votre site web est payée une seule fois.</p>
          </div>
          <div style="text-align:right">
            <span style="border:1px solid #D4500A; color:#D4500A; padding:3px 8px; border-radius:4px; font-weight:bold; font-size:10px;">PACK TOUT INCLUS</span>
          </div>
        </div>
        <p style="font-size:11px; margin-top:8px;">• <strong>Inclus la 1ère année :</strong> Hébergement, Domaine, 3 mois de maintenance.</p>
        <p style="font-size:11px; margin-top:2px;">• <strong>Dès la 2ème année :</strong> 46€ / an pour l''hébergement et le domaine.</p>
      </div>

      <div class="modalities">
        <p style="margin:0; font-size:12.5px; line-height:1.4;">
          <strong>✅ Modalités :</strong> Acompte de <strong>46€</strong> pour lancer la production. Solde de <strong>100€</strong> à la livraison.
        </p>
      </div>

      <div style="margin-top:15px; padding-top:10px; border-top:1px solid #edf2f7; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <p style="font-size:11px; color:#718096; margin:0;">Signature Prestataire</p>
          <div style="font-weight:bold; font-size:14px; color:#D4500A;">Services-Siteup</div>
        </div>
        <div style="font-size:10px; color:#cbd5e0;">Document généré numériquement</div>
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

  const publicUrl = `https://www.services-siteup.online/docs/${fileName}`;
  await supabase.from('leads').update({ invoice_url: publicUrl }).eq('id', lead.id);
  return publicUrl;
}
