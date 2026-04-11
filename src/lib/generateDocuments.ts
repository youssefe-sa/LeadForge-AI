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
  const devisNumber = `DEV-${lead.id.slice(0, 8).toUpperCase()}-${Date.now()}`;
  const today = new Date().toLocaleDateString('fr-FR');
  const expiryDate = new Date(Date.now() + 7 * 86400000).toLocaleDateString('fr-FR');
  const deliveryDate = new Date(Date.now() + 2 * 86400000).toLocaleDateString('fr-FR');
  const deposit = '46';
  const final = '100';

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Devis ${devisNumber}</title>
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
    <h2>DEVIS</h2>
    <p style="margin:4px 0">N° ${devisNumber}</p>
    <p style="margin:4px 0">Date : ${today}</p>
  </div>
</div>
<div class="client-box">
  <strong>Client :</strong><br>
  ${lead.name}<br>
  ${lead.city ? lead.city + '<br>' : ''}
  ${lead.email ? lead.email + '<br>' : ''}
  ${lead.phone ? lead.phone : ''}
</div>
<div class="validity">Offre valable jusqu'au ${expiryDate} (7 jours)</div>
<table>
  <thead>
    <tr><th>Prestation</th><th>Description</th><th style="text-align:right">Montant</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>Site web professionnel</td>
      <td>Design moderne responsive — Secteur ${lead.sector || 'professionnel'} — SEO local — Hébergement 1 an — Livraison en ${deliveryDate}</td>
      <td style="text-align:right">${price}€ HT</td>
    </tr>
    <tr>
      <td>Acompte (dépôt)</td>
      <td>Paiement initial pour démarrer les travaux</td>
      <td style="text-align:right">${deposit}€</td>
    </tr>
    <tr>
      <td>Solde à la livraison</td>
      <td>Paiement final à la remise du site terminé</td>
      <td style="text-align:right">${final}€</td>
    </tr>
    <tr class="total-row">
      <td colspan="2">TOTAL</td>
      <td style="text-align:right;color:#D4500A">${price}€ HT</td>
    </tr>
  </tbody>
</table>
<div class="footer">
  Services SiteUp · services-siteup.online · Devis non contractuel sans signature écrite
</div>
</body>
</html>`;
}

// ─── GÉNÉRATEUR DE FACTURE ─────────────────────────────────────────────────

export function buildInvoiceHTML(lead: Lead, price: string = '146', type: 'deposit' | 'final' | 'full' = 'full'): string {
  const invoiceNumber = `INV-${lead.id.slice(0, 8).toUpperCase()}-${Date.now()}`;
  const today = new Date().toLocaleDateString('fr-FR');

  const amounts = {
    deposit: { label: 'Acompte reçu (dépôt)', amount: '46' },
    final:   { label: 'Solde final reçu',      amount: '100' },
    full:    { label: 'Paiement total reçu',    amount: price },
  };
  const { label, amount } = amounts[type];

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Facture ${invoiceNumber}</title>
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
    <h2>FACTURE</h2>
    <p style="margin:4px 0">N° ${invoiceNumber}</p>
    <p style="margin:4px 0">Date : ${today}</p>
  </div>
</div>
<div class="client-box">
  <strong>Facturé à :</strong><br>
  ${lead.name}<br>
  ${lead.city ? lead.city + '<br>' : ''}
  ${lead.email ? lead.email : ''}
</div>
<div class="paid-stamp">PAYE</div>
<table>
  <thead>
    <tr><th>Description</th><th style="text-align:right">Montant</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>Site web professionnel — ${lead.sector || 'Services'} — ${lead.name}<br><small>${label}</small></td>
      <td style="text-align:right">${amount}€</td>
    </tr>
    <tr class="total-row">
      <td>TOTAL RECU</td>
      <td style="text-align:right;color:#D4500A">${amount}€</td>
    </tr>
  </tbody>
</table>
<div class="footer">
  Services SiteUp · services-siteup.online · Merci de votre confiance
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
  const blob = new Blob([html], { type: 'text/html; charset=utf-8' });

  const { error } = await supabase.storage
    .from(bucket)
    .upload(fileName, blob, {
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
