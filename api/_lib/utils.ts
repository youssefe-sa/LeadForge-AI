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
      body { font-family: Arial, sans-serif; padding: 40px; color: #333; line-height: 1.6; }
      .container { max-width: 700px; margin: auto; border: 2px solid #D4500A; padding: 40px; border-radius: 12px; position: relative; }
      .print-btn { position: absolute; top: 20px; right: 20px; background: #2c3e50; color: white; padding: 8px 15px; border: none; border-radius: 5px; cursor: pointer; text-decoration: none; font-size: 14px; }
      @media print { .print-btn { display: none; } }
      h1 { color: #D4500A; border-bottom: 3px solid #D4500A; padding-bottom: 10px; margin-top: 0; }
      .meta { display: flex; justify-content: space-between; margin-bottom: 30px; }
      .box { background: #fff8f5; padding: 20px; border-radius: 8px; border: 1px solid #ffe7d9; margin-top: 20px; }
    </style>
  </head><body>
    <div class="container">
      <button class="print-btn" onclick="window.print()">📥 Télécharger / Imprimer en PDF</button>
      <h1>DEVIS SERVICES SITEUP</h1>
      <div class="meta">
        <div><strong>N° ${devisNumber}</strong><br>Date : ${today}</div>
        <div style="text-align:right"><strong>Client :</strong><br>${lead.name}</div>
      </div>
      <p><strong>Objet :</strong> Création de site web professionnel pour ${lead.name}.</p>
      <div class="box">
        <p>Montant Total : <strong>${price} $</strong></p>
        <p>Acompte (à payer) : <strong>46 $</strong></p>
        <p>Solde final (à la livraison) : <strong>100 $</strong></p>
      </div>
      <p style="margin-top:40px; font-size:12px; color:#888; text-align:center;">Services SiteUp - services-siteup.online</p>
    </div>
  </body></html>`;

  const fileName = `devis-${lead.id}-${Date.now()}.html`;
  // UPLOAD AVEC SERVICE_ROLE (indispensable)
  const { error: uploadError } = await supabase.storage.from('documents').upload(fileName, Buffer.from(html, 'utf-8'), { 
    contentType: 'text/html; charset=utf-8', 
    upsert: true 
  });
  if (uploadError) throw uploadError;

  const { data: publicData } = supabase.storage.from('documents').getPublicUrl(fileName);
  const publicUrl = publicData.publicUrl;

  await supabase.from('leads').update({ devis_url: publicUrl }).eq('id', lead.id);
  console.log('[Utils] Devis sauvegardé:', publicUrl);
  return publicUrl;
}

export async function generateAndSaveInvoice(lead: any, price: string = '146', type: 'deposit' | 'final' = 'deposit'): Promise<string> {
  const invNumber = `INV-${lead.id.slice(0, 8).toUpperCase()}-${Date.now()}`;
  const amount = type === 'deposit' ? '46' : '100';
  const today = new Date().toLocaleDateString('fr-FR');

  const html = `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8">
    <title>Facture ${invNumber}</title>
    <style>
      body { font-family: Arial, sans-serif; padding: 40px; color: #333; }
      .container { max-width: 700px; margin: auto; border: 2px solid #28a745; padding: 40px; border-radius: 12px; position: relative; }
      .print-btn { position: absolute; top: 20px; right: 20px; background: #2c3e50; color: white; padding: 8px 15px; border: none; border-radius: 5px; cursor: pointer; text-decoration: none; font-size: 14px; }
      @media print { .print-btn { display: none; } }
      h1 { color: #28a745; border-bottom: 3px solid #28a745; padding-bottom: 10px; margin-top: 0; }
      .status { background: #e8f5e9; color: #2e7d32; padding: 15px; text-align: center; font-weight: bold; border-radius: 5px; font-size: 20px; margin: 30px 0; border: 1px solid #c8e6c9; }
    </style>
  </head><body>
    <div class="container">
      <button class="print-btn" onclick="window.print()">📥 Télécharger / Imprimer en PDF</button>
      <h1>FACTURE SERVICES SITEUP</h1>
      <p><strong>N° ${invNumber}</strong><br>Date : ${today}</p>
      <p><strong>Client :</strong> ${lead.name}</p>
      <div class="status">PAYÉ</div>
      <p>Prestation : ${type === 'deposit' ? 'Acompte Site Web' : 'Solde Final Site Web'}</p>
      <p>Montant Reçu : <strong>${amount} $</strong></p>
    </div>
  </body></html>`;

  const fileName = `inv-${type}-${lead.id}-${Date.now()}.html`;
  const { error: uploadError } = await supabase.storage.from('documents').upload(fileName, Buffer.from(html, 'utf-8'), { 
    contentType: 'text/html; charset=utf-8', 
    upsert: true 
  });
  if (uploadError) throw uploadError;

  const { data: publicData } = supabase.storage.from('documents').getPublicUrl(fileName);
  const publicUrl = publicData.publicUrl;

  // IMPORTANT: Mise à jour de la colonne invoice_url
  await supabase.from('leads').update({ invoice_url: publicUrl }).eq('id', lead.id);
  console.log('[Utils] Facture sauvegardée:', publicUrl);
  return publicUrl;
}

