import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function generateAndSaveDevis(lead: any, price: string = '146'): Promise<string> {
  const devisNumber = `DEV-${lead.id.slice(0, 8).toUpperCase()}-${Date.now()}`;
  const today = new Date().toLocaleDateString('fr-FR');
  const expiryDate = new Date(Date.now() + 7 * 86400000).toLocaleDateString('fr-FR');
  const deliveryDate = new Date(Date.now() + 2 * 86400000).toLocaleDateString('fr-FR');

  const html = `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"></head><body style="font-family: Arial, sans-serif; padding: 40px; color: #333; line-height: 1.6;">
    <div style="max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 30px; border-radius: 8px;">
      <h1 style="color: #D4500A; border-bottom: 2px solid #D4500A;">DEVIS SERVICES SITEUP</h1>
      <p style="font-size: 18px;"><strong>N° ${devisNumber}</strong></p>
      <p><strong>Client :</strong> ${lead.name}</p>
      <p><strong>Montant Total :</strong> ${price} $</p>
      <p><strong>Date d''expiration :</strong> ${expiryDate}</p>
      <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
      <p style="background: #fff8f5; padding: 15px; border-radius: 5px;">Acompte requis : <strong>46$</strong><br>Solde final à la livraison : <strong>100$</strong></p>
      <p style="font-size: 12px; color: #888; text-align: center; margin-top: 30px;">Services SiteUp - Document généré automatiquement</p>
    </div>
  </body></html>`;

  const fileName = `devis-${lead.id}-${Date.now()}.html`;
  const { error } = await supabase.storage.from('documents').upload(fileName, Buffer.from(html, 'utf-8'), { 
    contentType: 'text/html; charset=utf-8', 
    upsert: true 
  });
  if (error) throw error;

  const { data } = supabase.storage.from('documents').getPublicUrl(fileName);
  await supabase.from('leads').update({ devis_url: data.publicUrl }).eq('id', lead.id);
  return data.publicUrl;
}

export async function generateAndSaveInvoice(lead: any, price: string = '146', type: 'deposit' | 'final' = 'deposit'): Promise<string> {
  const invNumber = `INV-${lead.id.slice(0, 8).toUpperCase()}-${Date.now()}`;
  const amount = type === 'deposit' ? '46' : '100';

  const html = `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"></head><body style="font-family: Arial, sans-serif; padding: 40px; color: #333;">
    <div style="max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 30px; border-radius: 8px;">
      <h1 style="color: #28a745; border-bottom: 2px solid #28a745;">FACTURE SERVICES SITEUP</h1>
      <p style="font-size: 18px;"><strong>N° ${invNumber}</strong></p>
      <p><strong>Client :</strong> ${lead.name}</p>
      <p><strong>Type :</strong> ${type === 'deposit' ? 'Acompte (Dépôt)' : 'Solde Final'}</p>
      <p><strong>Montant Reçu :</strong> ${amount} $</p>
      <div style="background: #e8f5e9; color: #2e7d32; padding: 15px; text-align: center; font-weight: bold; border-radius: 5px; font-size: 20px; margin-top: 20px;">PAYÉ</div>
    </div>
  </body></html>`;

  const fileName = `inv-${type}-${lead.id}-${Date.now()}.html`;
  const { error } = await supabase.storage.from('documents').upload(fileName, Buffer.from(html, 'utf-8'), { 
    contentType: 'text/html; charset=utf-8', 
    upsert: true 
  });
  if (error) throw error;

  const { data } = supabase.storage.from('documents').getPublicUrl(fileName);
  await supabase.from('leads').update({ invoice_url: data.publicUrl }).eq('id', lead.id);
  return data.publicUrl;
}
