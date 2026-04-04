import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, systemPrompt, maxTokens = 1024 } = req.body;

    // Récupérer la configuration NVIDIA depuis Supabase
    const { data: config } = await supabase
      .from('api_config')
      .select('nvidia_key')
      .single();

    if (!config?.nvidia_key) {
      return res.status(400).json({ error: 'NVIDIA key not configured' });
    }

    // Appeler l'API NVIDIA depuis le serveur (pas de CORS)
    const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.nvidia_key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'meta/llama-3.1-8b-instruct',
        messages: [
          { role: 'system', content: systemPrompt || 'You are a helpful assistant.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: maxTokens,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return res.status(response.status).json({ error: 'NVIDIA API error', details: error });
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content?.trim() || '';

    return res.status(200).json({ result });

  } catch (error: any) {
    console.error('NVIDIA proxy error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
