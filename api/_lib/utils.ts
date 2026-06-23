import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

const LOGO_SVG = `<svg width="220" height="50" viewBox="0 0 280 60" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="5" width="50" height="50" rx="14" fill="#D4500A" />
  <text x="25" y="41" font-family="Arial" font-weight="900" font-size="28" fill="white" text-anchor="middle">ST</text>
  <text x="62" y="32" font-family="Arial" font-weight="bold" font-size="24" fill="#1a202c">Services-Siteup</text>
  <text x="62" y="50" font-family="Arial" font-size="11" fill="#718096" font-style="italic">Propulsez votre présence en ligne</text>
</svg>`;

const DOC_STYLE = `
    <style>
      * { box-sizing: border-box; }
      body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 0; margin: 0; color: #1a202c; background-color: #f0f4f8; }
      .container { width: 95%; max-width: 750px; margin: 20px auto; background: white; padding: 25px 40px; border-radius: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); position: relative; overflow: hidden; }
      .print-btn { position: absolute; top: 10px; right: 40px; background: #D4500A; color: white; padding: 6px 12px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 10px; z-index: 10; }
      @media print { .print-btn { display: none; } .container { box-shadow: none; margin: 0; width: 100%; padding: 15px; } body { background: white; } }
      .header { display: flex; justify-content: space-between; border-bottom: 2px solid #edf2f7; padding-bottom: 10px; margin-bottom: 15px; align-items: flex-start; }
      .client-info { display: flex; justify-content: space-between; margin-bottom: 20px; background: #f8fafc; padding: 15px; border-radius: 6px; border: 1px solid #edf2f7; font-size: 12px; }
      .section-title { background: #f1f5f9; color: #D4500A; padding: 5px 10px; font-size: 12px; font-weight: bold; border-radius: 4px; margin-top: 15px; border-left: 4px solid #D4500A; }
      table.pro-table { width: 100%; border-collapse: collapse; margin-top: 5px; }
      table.pro-table td { padding: 8px 12px; border-bottom: 1px solid #f7fafc; font-size: 13px; line-height: 1.4; vertical-align: top; }
      .total-box { background: #f8fafc; color: #1a202c; padding: 20px; border-radius: 8px; margin-top: 30px; border: 1px solid #edf2f7; border-left: 5px solid #28a745; text-align: right; }
      .status-badge { display: inline-block; background: #e8f5e9; color: #2e7d32; padding: 5px 12px; border-radius: 20px; font-weight: bold; font-size: 11px; text-transform: uppercase; margin-top: 5px; }
    </style>
`;

export async function generateAndSaveDevis(lead: any, price: string = '146'): Promise<string> {
  const lang = (lead.city || '').toLowerCase().match(/london|new york|manhattan|brooklyn|chicago|los angeles|san francisco|miami|boston|seattle|austin|denver|atlanta|houston|toronto|vancouver|sydney|melbourne|berlin|munich|amsterdam|barcelona|madrid|rome|milan|dubai|singapore|tokyo|hong kong/) ? 'en' : 'fr';
  const devisNumber = `DEV-${lead.id.slice(0, 8).toUpperCase()}-${Date.now()}`;
  const today = new Date().toLocaleDateString(lang === 'en' ? 'en-US' : 'fr-FR');
  const deposit = lang === 'en' ? '46$' : '46€';
  const finalAmt = lang === 'en' ? '100$' : '100€';
  const totalPrice = lang === 'en' ? `${price}$` : `${price}€`;

  const t = lang === 'en' ? {
    title: 'QUOTE', printBtn: '📥 PRINT / PDF', date: 'Date',
    siteTitle: '🌐 COMPLETE PROFESSIONAL WEBSITE',
    siteItems: [
      ['<strong>Custom Design</strong>: Unique creation tailored to your brand and industry', '<strong>Responsive Design</strong>: Perfect display on desktop, tablet, and mobile'],
      ['<strong>Essential Pages</strong>: Home, About, Services, Contact...', '<strong>Contact Form & WhatsApp</strong>: Your clients can reach you directly'],
      ['<strong>Smart Chatbot</strong>: 24/7 assistant to answer questions', ''],
    ],
    optTitle: '🚀 OPTIMIZATION & PERFORMANCE', optItems: [['<strong>SEO Optimized</strong>: Natural referencing to appear on Google', '<strong>Performance & Security</strong>: Optimized loading and SSL Certificate included']],
    guarTitle: '🏆 ADVANTAGES & GUARANTEES', guarItems: [
      ['<strong>Satisfaction Guarantee</strong>: Full refund if not satisfied within 15 days', '<strong>Express Delivery</strong>: Website ready in 2 business days'],
      ['<strong>Total Ownership</strong>: You are 100% owner of your site and domain', ''],
    ],
    investmentLabel: 'INVESTMENT', investmentNote: 'Hosting and domain included for the 1st year.', packLabel: 'ALL-INCLUSIVE PACK',
    modalities: `<strong>✅ Terms:</strong> Starting deposit of <strong>${deposit}</strong>. Balance of <strong>${finalAmt}</strong> upon delivery.`,
    signature: 'Provider Signature', company: 'Services-Siteup',
  } : {
    title: 'DEVIS', printBtn: '📥 IMPRIMER / PDF', date: 'Date',
    siteTitle: '🌐 SITE WEB PROFESSIONNEL COMPLET',
    siteItems: [
      ['<strong>Design sur mesure</strong> : Création unique adaptée à votre image et votre secteur d\'activité', '<strong>Responsive design</strong> : Affichage parfait sur ordinateur, tablette et smartphone'],
      ['<strong>Pages essentielles</strong> : Accueil, Présentation, Services, Contact...', '<strong>Formulaire de contact & WhatsApp</strong> : Vos clients peuvent vous contacter directement'],
      ['<strong>Chatbot intelligent</strong> : Assistant 24/7 pour répondre aux questions', ''],
    ],
    optTitle: '🚀 OPTIMISATION ET PERFORMANCE', optItems: [['<strong>SEO optimisé</strong> : Référencement naturel pour apparaître sur Google', '<strong>Performance & Sécurité</strong> : Chargement optimisé et Certificat SSL inclus']],
    guarTitle: '🏆 AVANTAGES & GARANTIES', guarItems: [
      ['<strong>Garantie satisfaction</strong> : Remboursement complet si non satisfait sous 15j', '<strong>Livraison Express</strong> : Site web prêt en 2 jours ouvrés'],
      ['<strong>Propriété totale</strong> : Vous êtes 100% propriétaire de votre site et domaine', ''],
    ],
    investmentLabel: 'INVESTISSEMENT', investmentNote: 'Hébergement et domaine inclus la 1ère année.', packLabel: 'PACK TOUT INCLUS',
    modalities: `<strong>✅ Modalités :</strong> Acompte de démarrage de <strong>${deposit}</strong>. Solde de <strong>${finalAmt}</strong> à la livraison.`,
    signature: 'Signature Prestataire', company: 'Services-Siteup',
  };

  const html = `<!DOCTYPE html><html lang="${lang}"><head><meta charset="utf-8">
    <title>${t.title} ${devisNumber}</title>
    ${DOC_STYLE}
  </head><body>
    <div class="container">
      <button class="print-btn" onclick="window.print()">${t.printBtn}</button>
      <div class="header">
        ${LOGO_SVG}
        <div style="text-align:right; flex-shrink: 0;">
          <h2 style="margin:0; font-size:24px; font-weight:900;">${t.title}</h2>
          <p style="margin:0; color:#718096; font-size:11px;">N° ${devisNumber}<br>${t.date} : ${today}</p>
        </div>
      </div>
      <div class="client-info">
        <div style="flex: 1;"><strong>${t.company}</strong><br>siteup.services@gmail.com</div>
        <div style="text-align:right; flex: 1;"><strong>${lead.name}</strong><br>${lead.city || ''}</div>
      </div>

      <div class="section-title">${t.siteTitle}</div>
      <table class="pro-table">
        ${t.siteItems.map(([a, b]) => `<tr><td style="color:#D4500A; width:20px;">•</td><td>${a}</td>${b ? `<td style="color:#D4500A; width:20px;">•</td><td>${b}</td>` : '<td></td><td></td>'}</tr>`).join('')}
      </table>

      <div class="section-title">${t.optTitle}</div>
      <table class="pro-table">
        ${t.optItems.map(([a, b]) => `<tr><td style="color:#D4500A; width:20px;">•</td><td>${a}</td>${b ? `<td style="color:#D4500A; width:20px;">•</td><td>${b}</td>` : '<td></td><td></td>'}</tr>`).join('')}
      </table>

      <div class="section-title">${t.guarTitle}</div>
      <table class="pro-table">
        ${t.guarItems.map(([a, b]) => `<tr><td style="color:#D4500A; width:20px;">•</td><td>${a}</td>${b ? `<td style="color:#D4500A; width:20px;">•</td><td>${b}</td>` : '<td></td><td></td>'}</tr>`).join('')}
      </table>

      <div class="price-box" style="background:#f8fafc; color:#1a202c; padding:15px; border-radius:8px; margin-top:20px; border:1px solid #edf2f7; border-left:5px solid #1a202c;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <h3 style="margin:0; font-size:20px;">${t.investmentLabel} : ${totalPrice}</h3>
            <p style="margin:2px 0 0 0; font-size:11px; opacity:0.8;">${t.investmentNote}</p>
          </div>
          <div style="text-align:right">
            <span style="border:1px solid #D4500A; color:#D4500A; padding:3px 8px; border-radius:4px; font-weight:bold; font-size:11px;">${t.packLabel}</span>
          </div>
        </div>
      </div>

      <div class="modalities" style="background: #f0fff4; border: 1px solid #c6f6d5; padding: 12px; border-radius: 8px; margin-top: 15px; color: #22543d; border-left: 5px solid #48bb78;">
        <p style="margin:0; font-size:13px; line-height:1.4;">${t.modalities}</p>
      </div>

      <div style="margin-top:20px; padding-top:10px; border-top:1px solid #edf2f7;">
        <p style="font-size:11px; color:#718096; margin:0;">${t.signature}</p>
        <div style="font-weight:bold; font-size:15px; color:#D4500A;">${t.company}</div>
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
  const lang = (lead.city || '').toLowerCase().match(/london|new york|manhattan|brooklyn|chicago|los angeles|san francisco|miami|boston|seattle|austin|denver|atlanta|houston|toronto|vancouver|sydney|melbourne|berlin|munich|amsterdam|barcelona|madrid|rome|milan|dubai|singapore|tokyo|hong kong/) ? 'en' : 'fr';
  const invNumber = `INV-${lead.id.slice(0, 8).toUpperCase()}-${Date.now()}`;
  const amount = type === 'deposit' ? (lang === 'en' ? '46$' : '46€') : (lang === 'en' ? '100$' : '100€');
  const today = new Date().toLocaleDateString(lang === 'en' ? 'en-US' : 'fr-FR');

  const t = lang === 'en' ? {
    title: 'INVOICE', printBtn: '📥 PRINT / PDF', date: 'Date', paidBadge: 'PAID',
    detailTitle: 'SERVICE DETAILS', designation: 'Description', amountCol: 'Amount',
    serviceLabel: 'Services-Siteup Digital Service',
    depositDesc: 'Starting Deposit — Production Launch',
    finalDesc: 'Final Balance — Website Delivery & Validation',
    totalReceived: 'Total received on', company: 'Services-Siteup',
    signature: 'Provider Signature', paidNote: 'Invoice digitally paid',
  } : {
    title: 'FACTURE', printBtn: '📥 IMPRIMER / PDF', date: 'Date', paidBadge: 'PAYÉE',
    detailTitle: 'DÉTAIL DE LA PRESTATION', designation: 'Designation', amountCol: 'Montant',
    serviceLabel: 'Prestation Digitale Services-Siteup',
    depositDesc: 'Acompte de démarrage - Lancement de la production',
    finalDesc: 'Solde final - Livraison et validation du site web',
    totalReceived: 'Total perçu le', company: 'Services-Siteup',
    signature: 'Signature Prestataire', paidNote: 'Facture acquittée numériquement',
  };

  const desc = type === 'deposit' ? t.depositDesc : t.finalDesc;

  const html = `<!DOCTYPE html><html lang="${lang}"><head><meta charset="utf-8">
    <title>${t.title} ${invNumber}</title>
    ${DOC_STYLE}
  </head><body>
    <div class="container">
      <button class="print-btn" onclick="window.print()">${t.printBtn}</button>
      <div class="header">
        ${LOGO_SVG}
        <div style="text-align:right; flex-shrink: 0;">
          <h2 style="margin:0; font-size:24px; font-weight:900;">${t.title}</h2>
          <p style="margin:0; color:#718096; font-size:11px;">N° ${invNumber}<br>${t.date} : ${today}</p>
          <div class="status-badge">${t.paidBadge}</div>
        </div>
      </div>
      <div class="client-info">
        <div style="flex: 1;"><strong>${t.company}</strong><br>siteup.services@gmail.com</div>
        <div style="text-align:right; flex: 1;"><strong>${lead.name}</strong><br>${lead.city || ''}</div>
      </div>

      <div class="section-title">${t.detailTitle}</div>
      <table class="pro-table" style="width:100%;">
        <tr style="border-bottom: 2px solid #edf2f7; font-weight: bold; font-size: 11px; text-transform: uppercase; color: #718096;">
          <td style="padding: 10px;">${t.designation}</td>
          <td style="padding: 10px; text-align: right;">${t.amountCol}</td>
        </tr>
        <tr>
          <td style="padding: 15px 10px;">
            <strong>${t.serviceLabel}</strong><br>
            <span style="font-size: 12px; color: #718096;">${desc}</span>
          </td>
          <td style="padding: 15px 10px; text-align: right; font-weight: bold; font-size: 16px;">${amount}</td>
        </tr>
      </table>

      <div class="total-box">
        <p style="margin:0; font-size:13px; color:#718096;">${t.totalReceived} ${today}</p>
        <p style="margin:5px 0 0 0; font-size:28px; font-weight: 900; color: #28a745;">${amount}</p>
      </div>

      <div style="margin-top:40px; padding-top:20px; border-top:1px solid #edf2f7; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <p style="font-size:11px; color:#718096; margin:0;">${t.signature}</p>
          <div style="font-weight:bold; font-size:15px; color:#D4500A;">${t.company}</div>
        </div>
        <div style="font-size:10px; color:#cbd5e0;">${t.paidNote}</div>
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
