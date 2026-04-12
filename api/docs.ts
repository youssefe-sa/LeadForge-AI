import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { file } = req.query;

  if (!file) {
    return res.status(400).send('Nom de fichier manquant');
  }

  try {
    // 1. Récupérer le fichier depuis le bucket "documents"
    const { data, error } = await supabase.storage
      .from('documents')
      .download(file as string);

    if (error || !data) {
      console.error('[Docs] Erreur téléchargement:', error);
      return res.status(404).send('Document introuvable');
    }

    // 2. Transformer le flux en texte
    const htmlContent = await data.text();

    // 3. Envoyer avec les bons headers pour forcer le rendu HTML
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    
    return res.status(200).send(htmlContent);

  } catch (err: any) {
    console.error('[Docs Error]', err);
    return res.status(500).send('Erreur lors de la lecture du document');
  }
}
