import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function generateAndSaveDevis(lead: any, price: string = '146'): Promise<string> {
  const devisNumber = `DEV-${lead.id.slice(0, 8).toUpperCase()}-${Date.now()}`;
  const today = new Date().toLocaleDateString('fr-FR');
  const expiryDate = new Date(Date.now() + 7 * 86400000).toLocaleDateString('fr-FR');
  const deliveryDate = new Date(Date.now() + 2 * 86400000).toLocaleDateString('fr-FR');

  const html = `<!DOCTYPE html><html><body style="font-family: Arial; padding: 40px;">
    <h1 style="color: #D4500A;">DEVIS SERVICES SITEUP</h1>
    <p>N° ${devisNumber}</p>
    <p>Client : ${lead.name}</p>
    <p>Montant : ${price} $</p>
    <p>Valable jusqu''au : ${expiryDate}</p>
    <hr>
    <p>Acompte requis : 46$ / Solde final : 100$</p>
  </body></html>`;

  const fileName = `devis-${lead.id}-${Date.now()}.html`;
  const { error } = await supabase.storage.from('documents').upload(fileName, Buffer.from(html), { contentType: 'text/html', upsert: true });
  if (error) throw error;

  const { data } = supabase.storage.from('documents').getPublicUrl(fileName);
  await supabase.from('leads').update({ devis_url: data.publicUrl }).eq('id', lead.id);
  return data.publicUrl;
}

export async function generateAndSaveInvoice(lead: any, price: string = '146', type: 'deposit' | 'final' = 'deposit'): Promise<string> {
  const invNumber = `INV-${lead.id.slice(0, 8).toUpperCase()}-${Date.now()}`;
  const amount = type === 'deposit' ? '46' : '100';

  const html = `<!DOCTYPE html><html><body style="font-family: Arial; padding: 40px;">
    <h1 style="color: #D4500A;">FACTURE SERVICES SITEUP</h1>
    <p>N° ${invNumber}</p>
    <p>Client : ${lead.name}</p>
    <p>Type : ${type === 'deposit' ? 'Acompte' : 'Solde Final'}</p>
    <p>Montant Reçu : ${amount} $</p>
    <p style="color: green; font-weight: bold;">PAYÉ</p>
  </body></html>`;

  const fileName = `inv-${type}-${lead.id}-${Date.now()}.html`;
  const { error } = await supabase.storage.from('documents').upload(fileName, Buffer.from(html), { contentType: 'text/html', upsert: true });
  if (error) throw error;

  const { data } = supabase.storage.from('documents').getPublicUrl(fileName);
  await supabase.from('leads').update({ invoice_url: data.publicUrl }).eq('id', lead.id);
  return data.publicUrl;
}
