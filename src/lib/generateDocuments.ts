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

export function buildDevisHTML(lead: Lead, price: string = '146', region: 'FR' | 'US' = 'FR'): string {
  const devisNumber = `DEV-${lead.id.slice(0, 8).toUpperCase()}-${Date.now()}`;
  const locale = region === 'US' ? 'en-US' : 'fr-FR';
  const currency = region === 'US' ? '$' : '€';
  
  const today = new Date().toLocaleDateString(locale);
  const expiryDate = new Date(Date.now() + 7 * 86400000).toLocaleDateString(locale);
  const deliveryDate = new Date(Date.now() + 2 * 86400000).toLocaleDateString(locale);
  const deposit = '46';
  const final = '100';

  const labels = {
    title: region === 'US' ? 'QUOTE' : 'DEVIS',
    number: region === 'US' ? 'No.' : 'N°',
    date: 'Date',
    validity: region === 'US' ? `Offer valid until ${expiryDate} (7 days)` : `Offre valable jusqu'au ${expiryDate} (7 jours)`,
    client: region === 'US' ? 'Client:' : 'Client :',
    headers: region === 'US' ? ['Service', 'Description', 'Amount'] : ['Prestation', 'Description', 'Montant'],
    items: region === 'US' ? [
      { name: 'Professional Website', desc: `Modern responsive design — ${lead.sector || 'Business'} sector — Local SEO — 1-year hosting — Delivery by ${deliveryDate}` },
      { name: 'Deposit', desc: 'Initial payment to start the project' },
      { name: 'Final Balance', desc: 'Final payment upon project delivery' }
    ] : [
      { name: 'Site web professionnel', desc: `Design moderne responsive — Secteur ${lead.sector || 'professionnel'} — SEO local — Hébergement 1 an — Livraison en ${deliveryDate}` },
      { name: 'Acompte (dépôt)', desc: 'Paiement initial pour démarrer les travaux' },
      { name: 'Solde à la livraison', desc: 'Paiement final à la remise du site terminé' }
    ],
    total: 'TOTAL',
    footer: region === 'US' ? 'Services SiteUp · services-siteup.online · Non-contractual quote without written signature' : 'Services SiteUp · services-siteup.online · Devis non contractuel sans signature écrite'
  };

  return `<!DOCTYPE html>
<html lang="${region === 'US' ? 'en' : 'fr'}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${labels.title} ${devisNumber}</title>
<style>
body { font-family: 'Helvetica', Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; color: #222; line-height: 1.5; }
.header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; border-bottom: 3px solid #D4500A; padding-bottom: 20px; }
.brand { font-size: 26px; font-weight: bold; color: #D4500A; }
.doc-meta { text-align: right; }
.doc-meta h2 { margin: 0; font-size: 22px; color: #D4500A; text-transform: uppercase; }
.client-box { background: #f7f7f7; border-left: 4px solid #D4500A; padding: 16px 20px; border-radius: 4px; margin: 24px 0; }
.validity { background: #fff8e1; border: 1px solid #f0c040; padding: 10px 16px; border-radius: 6px; margin: 16px 0; font-size: 14px; }
table { width: 100%; border-collapse: collapse; margin: 24px 0; }
th { background: #D4500A; color: white; padding: 12px 16px; text-align: left; font-size: 14px; text-transform: uppercase; }
td { padding: 12px 16px; border-bottom: 1px solid #eee; font-size: 14px; }
tr:nth-child(even) td { background: #fafafa; }
.total-row td { font-weight: bold; font-size: 18px; background: #fff3ee; border-top: 2px solid #D4500A; }
.footer { margin-top: 48px; font-size: 12px; color: #888; border-top: 1px solid #eee; padding-top: 16px; text-align: center; }
</style>
</head>
<body>
<div class="header">
  <div class="brand">Services SiteUp</div>
  <div class="doc-meta">
    <h2>${labels.title}</h2>
    <p style="margin:4px 0">${labels.number} ${devisNumber}</p>
    <p style="margin:4px 0">${labels.date} : ${today}</p>
  </div>
</div>
<div class="client-box">
  <strong>${labels.client}</strong><br>
  ${lead.name}<br>
  ${lead.city ? lead.city + '<br>' : ''}
  ${lead.email ? lead.email + '<br>' : ''}
  ${lead.phone ? lead.phone : ''}
</div>
<div class="validity">${labels.validity}</div>
<table>
  <thead>
    <tr><th>${labels.headers[0]}</th><th>${labels.headers[1]}</th><th style="text-align:right">${labels.headers[2]}</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>${labels.items[0].name}</td>
      <td>${labels.items[0].desc}</td>
      <td style="text-align:right">${price}${currency}</td>
    </tr>
    <tr>
      <td>${labels.items[1].name}</td>
      <td>${labels.items[1].desc}</td>
      <td style="text-align:right">${deposit}${currency}</td>
    </tr>
    <tr>
      <td>${labels.items[2].name}</td>
      <td>${labels.items[2].desc}</td>
      <td style="text-align:right">${final}${currency}</td>
    </tr>
    <tr class="total-row">
      <td colspan="2">${labels.total}</td>
      <td style="text-align:right;color:#D4500A">${price}${currency}</td>
    </tr>
  </tbody>
</table>
<div class="footer">
  ${labels.footer}
</div>
</body>
</html>`;
}

// ─── GÉNÉRATEUR DE FACTURE ─────────────────────────────────────────────────

export function buildInvoiceHTML(lead: Lead, price: string = '146', type: 'deposit' | 'final' | 'full' = 'full', region: 'FR' | 'US' = 'FR'): string {
  const invoiceNumber = `INV-${lead.id.slice(0, 8).toUpperCase()}-${Date.now()}`;
  const locale = region === 'US' ? 'en-US' : 'fr-FR';
  const currency = region === 'US' ? '$' : '€';
  const today = new Date().toLocaleDateString(locale);

  const amountsMap = {
    deposit: { 
      label: region === 'US' ? 'Deposit payment received' : 'Acompte reçu (dépôt)', 
      amount: '46' 
    },
    final: { 
      label: region === 'US' ? 'Final balance received' : 'Solde final reçu', 
      amount: '100' 
    },
    full: { 
      label: region === 'US' ? 'Full payment received' : 'Paiement total reçu', 
      amount: price 
    },
  };
  const { label, amount } = amountsMap[type];

  const labels = {
    title: region === 'US' ? 'INVOICE' : 'FACTURE',
    number: region === 'US' ? 'No.' : 'N°',
    date: 'Date',
    billedTo: region === 'US' ? 'Billed to:' : 'Facturé à :',
    paid: region === 'US' ? 'PAID' : 'PAYE',
    headers: region === 'US' ? ['Description', 'Amount'] : ['Description', 'Montant'],
    itemDesc: region === 'US' ? 'Professional Website' : 'Site web professionnel',
    total: region === 'US' ? 'TOTAL RECEIVED' : 'TOTAL RECU',
    footer: region === 'US' ? 'Services SiteUp · Thank you for your business!' : 'Services SiteUp · Merci de votre confiance'
  };

  return `<!DOCTYPE html>
<html lang="${region === 'US' ? 'en' : 'fr'}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${labels.title} ${invoiceNumber}</title>
<style>
body { font-family: 'Helvetica', Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; color: #222; }
.header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; border-bottom: 3px solid #D4500A; padding-bottom: 20px; }
.brand { font-size: 26px; font-weight: bold; color: #D4500A; }
.doc-meta { text-align: right; }
.doc-meta h2 { margin: 0; font-size: 22px; color: #D4500A; text-transform: uppercase; }
.client-box { background: #f7f7f7; border-left: 4px solid #D4500A; padding: 16px 20px; border-radius: 4px; margin: 24px 0; }
.paid-stamp { background: #e8f5e9; border: 2px solid #4caf50; color: #2e7d32; padding: 10px 20px; border-radius: 6px; display: inline-block; font-weight: bold; font-size: 16px; margin: 16px 0; }
table { width: 100%; border-collapse: collapse; margin: 24px 0; }
th { background: #D4500A; color: white; padding: 12px 16px; text-align: left; font-size: 14px; text-transform: uppercase; }
td { padding: 12px 16px; border-bottom: 1px solid #eee; font-size: 14px; }
.total-row td { font-weight: bold; font-size: 16px; background: #fff3ee; border-top: 2px solid #D4500A; }
.footer { margin-top: 48px; font-size: 12px; color: #888; border-top: 1px solid #eee; padding-top: 16px; text-align: center; }
</style>
</head>
<body>
<div class="header">
  <div class="brand">Services SiteUp</div>
  <div class="doc-meta">
    <h2>${labels.title}</h2>
    <p style="margin:4px 0">${labels.number} ${invoiceNumber}</p>
    <p style="margin:4px 0">${labels.date} : ${today}</p>
  </div>
</div>
<div class="client-box">
  <strong>${labels.billedTo}</strong><br>
  ${lead.name}<br>
  ${lead.city ? lead.city + '<br>' : ''}
  ${lead.email ? lead.email : ''}
</div>
<div class="paid-stamp">${labels.paid}</div>
<table>
  <thead>
    <tr><th>${labels.headers[0]}</th><th style="text-align:right">${labels.headers[1]}</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>${labels.itemDesc} — ${lead.sector || 'Services'} — ${lead.name}<br><small>${label}</small></td>
      <td style="text-align:right">${amount}${currency}</td>
    </tr>
    <tr class="total-row">
      <td>${labels.total}</td>
      <td style="text-align:right;color:#D4500A">${amount}${currency}</td>
    </tr>
  </tbody>
</table>
<div class="footer">
  ${labels.footer}
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

export async function generateAndSaveDevis(lead: Lead, price: string = '146', region: 'FR' | 'US' = 'FR'): Promise<string> {
  const html = buildDevisHTML(lead, price, region);
  const fileName = `devis-${lead.id}-${Date.now()}.html`;
  const url = await uploadDocumentToStorage(html, fileName);

  await supabase.from('leads').update({ devis_url: url }).eq('id', lead.id);
  return url;
}

export async function generateAndSaveInvoice(
  lead: Lead,
  price: string = '146',
  type: 'deposit' | 'final' | 'full' = 'full',
  region: 'FR' | 'US' = 'FR'
): Promise<string> {
  const html = buildInvoiceHTML(lead, price, type, region);
  const fileName = `invoice-${type}-${lead.id}-${Date.now()}.html`;
  const url = await uploadDocumentToStorage(html, fileName);

  await supabase.from('leads').update({ invoice_url: url }).eq('id', lead.id);
  return url;
}
