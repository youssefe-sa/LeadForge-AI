import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../_lib/supabase.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Uniquement GET
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).end();
  }

  const { data, error } = await supabase
    .from('leads')
    .select('site_html, name')
    .eq('id', id)
    .single();

  if (error || !data?.site_html) {
    return res.status(404).send(`<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Site non trouvé</title>
  <style>
    body { font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #f5f5f5; }
    .box { text-align: center; padding: 40px; background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,.08); }
    h1 { color: #e53e3e; margin-bottom: 8px; }
    p { color: #666; }
  </style>
</head>
<body>
  <div class="box">
    <h1>404 — Site non trouvé</h1>
    <p>Ce site n'a pas encore été généré ou n'existe pas.</p>
  </div>
</body>
</html>`);
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  return res.status(200).send(data.site_html);
}
