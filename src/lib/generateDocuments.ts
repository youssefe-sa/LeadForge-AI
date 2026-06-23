import { supabase } from './supabase';

export interface Lead {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  city?: string;
  sector?: string;
  landingUrl?: string;
  siteUrl?: string;
}

// ─── GÉNÉRATEUR DE DEVIS ───────────────────────────────────────────────────

export function buildDevisHTML(lead: Lead, price: string = '146'): string {
  const lang = (lead.city || '').toLowerCase().match(/london|new york|manhattan|brooklyn|chicago|los angeles|san francisco|miami|boston|seattle|austin|denver|atlanta|houston|toronto|vancouver|sydney|melbourne|berlin|munich|amsterdam|barcelona|madrid|rome|milan|dubai|singapore|tokyo|hong kong/) ? 'en' : 'fr';
  const devisNumber = `DEV-${lead.id.slice(0, 8).toUpperCase()}-${Date.now()}`;
  const today = new Date().toLocaleDateString(lang === 'en' ? 'en-US' : 'fr-FR');
  const expiryDate = new Date(Date.now() + 7 * 86400000).toLocaleDateString(lang === 'en' ? 'en-US' : 'fr-FR');
  const deliveryDate = new Date(Date.now() + 2 * 86400000).toLocaleDateString(lang === 'en' ? 'en-US' : 'fr-FR');
  const deposit = '46';
  const final = '100';
  const currency = lang === 'en' ? '$' : '$';

  const t = lang === 'en' ? {
    quote: 'QUOTE', client: 'Client', offer: `Offer valid until ${expiryDate} (7 days)`,
    colService: 'Service', colDesc: 'Description', colAmount: 'Amount',
    siteService: 'Professional Website', siteDesc: `Modern responsive design — ${lead.sector || 'Professional'} sector — Local SEO — 1 year hosting — Delivery by ${deliveryDate}`,
    depositService: 'Deposit (down payment)', depositDesc: 'Initial payment to start work',
    finalService: 'Balance on delivery', finalDesc: 'Final payment upon site handover',
    total: 'TOTAL', footer: 'Services SiteUp · services-siteup.online · Non-binding quote without written signature',
  } : {
    quote: 'DEVIS', client: 'Client', offer: `Offre valable jusqu'au ${expiryDate} (7 jours)`,
    colService: 'Prestation', colDesc: 'Description', colAmount: 'Montant',
    siteService: 'Site web professionnel', siteDesc: `Design moderne responsive — Secteur ${lead.sector || 'professionnel'} — SEO local — Hébergement 1 an — Livraison en ${deliveryDate}`,
    depositService: 'Acompte (dépôt)', depositDesc: 'Paiement initial pour démarrer les travaux',
    finalService: 'Solde à la livraison', finalDesc: 'Paiement final à la remise du site terminé',
    total: 'TOTAL', footer: 'Services SiteUp · services-siteup.online · Devis non contractuel sans signature écrite',
  };

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${t.quote} ${devisNumber}</title>
<style>
body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; color: #222; }
.header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; border-bottom: 3px solid #D4500A; padding-bottom: 20px; }
.brand { font-size: 26px; font-weight: bold; color: #D4500A; }
.doc-meta { text-align: right; }
.doc-meta h2 { margin: 0; font-size: 22px; color: #D4500A; }
.client-box { background: #f7f7f7; border-left: 4px solid #D4500A; padding: 16px 20px; border-radius: 4px; margin: 24px 0; }
.validity { background: #fff8e1; border: 1px solid #f0c040; padding: 10px 16px; border-radius: 6px; margin: 16px 0; font-size: 14px; }
table { width: 100%; border-collapse: collapse; margin: 24px 0; }
th { background: #D4500A; color: white; padding: 12px 16px; text-align: left; font-size: 14px; }
td { padding: 12px 16px; border-bottom: 1px solid #eee; font-size: 14px; }
tr:nth-child(even) td { background: #fafafa; }
.total-row td { font-weight: bold; font-size: 16px; background: #fff3ee; border-top: 2px solid #D4500A; }
.footer { margin-top: 48px; font-size: 12px; color: #888; border-top: 1px solid #eee; padding-top: 16px; text-align: center; }
</style>
</head>
<body>
<div class="header">
  <div class="brand">Services SiteUp</div>
  <div class="doc-meta">
    <h2>${t.quote}</h2>
    <p style="margin:4px 0">N° ${devisNumber}</p>
    <p style="margin:4px 0">${lang === 'en' ? 'Date' : 'Date'} : ${today}</p>
  </div>
</div>
<div class="client-box">
  <strong>${t.client} :</strong><br>
  ${lead.name}<br>
  ${lead.city ? lead.city + '<br>' : ''}
  ${lead.email ? lead.email + '<br>' : ''}
  ${lead.phone ? lead.phone : ''}
</div>
<div class="validity">${t.offer}</div>
<table>
  <thead>
    <tr><th>${t.colService}</th><th>${t.colDesc}</th><th style="text-align:right">${t.colAmount}</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>${t.siteService}</td>
      <td>${t.siteDesc}</td>
      <td style="text-align:right">${price} ${currency}</td>
    </tr>
    <tr>
      <td>${t.depositService}</td>
      <td>${t.depositDesc}</td>
      <td style="text-align:right">${deposit} ${currency}</td>
    </tr>
    <tr>
      <td>${t.finalService}</td>
      <td>${t.finalDesc}</td>
      <td style="text-align:right">${final} ${currency}</td>
    </tr>
    <tr class="total-row">
      <td colspan="2">${t.total}</td>
      <td style="text-align:right;color:#D4500A">${price} ${currency}</td>
    </tr>
  </tbody>
</table>
<div class="footer">
  ${t.footer}
</div>
</body>
</html>`;
}

// ─── GÉNÉRATEUR DE FACTURE ─────────────────────────────────────────────────

export function buildInvoiceHTML(lead: Lead, price: string = '146', type: 'deposit' | 'final' | 'full' = 'full'): string {
  const lang = (lead.city || '').toLowerCase().match(/london|new york|manhattan|brooklyn|chicago|los angeles|san francisco|miami|boston|seattle|austin|denver|atlanta|houston|toronto|vancouver|sydney|melbourne|berlin|munich|amsterdam|barcelona|madrid|rome|milan|dubai|singapore|tokyo|hong kong/) ? 'en' : 'fr';
  const invoiceNumber = `INV-${lead.id.slice(0, 8).toUpperCase()}-${Date.now()}`;
  const today = new Date().toLocaleDateString(lang === 'en' ? 'en-US' : 'fr-FR');
  const currency = '$';

  const amounts: Record<string, { labelEn: string; labelFr: string; amount: string }> = {
    deposit: { labelEn: 'Deposit received (down payment)', labelFr: 'Acompte reçu (dépôt)', amount: '46' },
    final:   { labelEn: 'Final balance received',         labelFr: 'Solde final reçu',      amount: '100' },
    full:    { labelEn: 'Total payment received',         labelFr: 'Paiement total reçu',    amount: price },
  };
  const { labelEn, labelFr, amount } = amounts[type];
  const label = lang === 'en' ? labelEn : labelFr;

  const t = lang === 'en' ? {
    title: 'INVOICE', date: 'Date', billTo: 'Bill To', paid: 'PAID',
    colDesc: 'Description', colAmount: 'Amount', totalReceived: 'TOTAL RECEIVED',
    serviceDesc: `Professional Website — ${lead.sector || 'Services'} — ${lead.name}`,
    footer: 'Services SiteUp · services-siteup.online · Thank you for your trust',
  } : {
    title: 'FACTURE', date: 'Date', billTo: 'Facturé à', paid: 'PAYÉE',
    colDesc: 'Description', colAmount: 'Montant', totalReceived: 'TOTAL REÇU',
    serviceDesc: `Site web professionnel — ${lead.sector || 'Services'} — ${lead.name}`,
    footer: 'Services SiteUp · services-siteup.online · Merci de votre confiance',
  };

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${t.title} ${invoiceNumber}</title>
<style>
body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; color: #222; }
.header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; border-bottom: 3px solid #D4500A; padding-bottom: 20px; }
.brand { font-size: 26px; font-weight: bold; color: #D4500A; }
.doc-meta { text-align: right; }
.doc-meta h2 { margin: 0; font-size: 22px; color: #D4500A; }
.client-box { background: #f7f7f7; border-left: 4px solid #D4500A; padding: 16px 20px; border-radius: 4px; margin: 24px 0; }
.paid-stamp { background: #e8f5e9; border: 2px solid #4caf50; color: #2e7d32; padding: 10px 20px; border-radius: 6px; display: inline-block; font-weight: bold; font-size: 16px; margin: 16px 0; }
table { width: 100%; border-collapse: collapse; margin: 24px 0; }
th { background: #D4500A; color: white; padding: 12px 16px; text-align: left; font-size: 14px; }
td { padding: 12px 16px; border-bottom: 1px solid #eee; font-size: 14px; }
.total-row td { font-weight: bold; font-size: 16px; background: #fff3ee; border-top: 2px solid #D4500A; }
.footer { margin-top: 48px; font-size: 12px; color: #888; border-top: 1px solid #eee; padding-top: 16px; text-align: center; }
</style>
</head>
<body>
<div class="header">
  <div class="brand">Services SiteUp</div>
  <div class="doc-meta">
    <h2>${t.title}</h2>
    <p style="margin:4px 0">N° ${invoiceNumber}</p>
    <p style="margin:4px 0">${lang === 'en' ? 'Date' : 'Date'} : ${today}</p>
  </div>
</div>
<div class="client-box">
  <strong>${t.billTo} :</strong><br>
  ${lead.name}<br>
  ${lead.city ? lead.city + '<br>' : ''}
  ${lead.email ? lead.email : ''}
</div>
<div class="paid-stamp">${t.paid}</div>
<table>
  <thead>
    <tr><th>${t.colDesc}</th><th style="text-align:right">${t.colAmount}</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>${t.serviceDesc}<br><small>${label}</small></td>
      <td style="text-align:right">${amount} ${currency}</td>
    </tr>
    <tr class="total-row">
      <td>${t.totalReceived}</td>
      <td style="text-align:right;color:#D4500A">${amount} ${currency}</td>
    </tr>
  </tbody>
</table>
<div class="footer">
  ${t.footer}
</div>
</body>
</html>`;
}

// ─── UPLOAD VERS SUPABASE STORAGE ─────────────────────────────────────────

export async function uploadDocumentToStorage(
  html: string,
  fileName: string,
  bucket: string = 'documents'
): Promise<string> {
  // Remplacement de Blob par Buffer pour compatibilité Node.js/Vercel
  const dataToUpload = Buffer.from(html, 'utf-8');

  const { error } = await supabase.storage
    .from(bucket)
    .upload(fileName, dataToUpload, {
      contentType: 'text/html; charset=utf-8',
      upsert: true,
    });

  if (error) throw new Error(`Upload Supabase échoué: ${error.message}`);

  const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
  return data.publicUrl;
}

// ─── FONCTION PRINCIPALE ───────────────────────────────────────────────────

export async function generateAndSaveDevis(lead: Lead, price: string = '146'): Promise<string> {
  const html = buildDevisHTML(lead, price);
  const fileName = `devis-${lead.id}-${Date.now()}.html`;
  const url = await uploadDocumentToStorage(html, fileName);

  await supabase.from('leads').update({ devis_url: url }).eq('id', lead.id);
  return url;
}

export async function generateAndSaveInvoice(
  lead: Lead,
  price: string = '146',
  type: 'deposit' | 'final' | 'full' = 'full'
): Promise<string> {
  const html = buildInvoiceHTML(lead, price, type);
  const fileName = `invoice-${type}-${lead.id}-${Date.now()}.html`;
  const url = await uploadDocumentToStorage(html, fileName);

  await supabase.from('leads').update({ invoice_url: url }).eq('id', lead.id);
  return url;
}
