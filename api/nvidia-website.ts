import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, systemPrompt, maxTokens = 8192, nvidiaKey } = req.body;

    if (!nvidiaKey) {
      return res.status(400).json({ error: 'NVIDIA key not provided' });
    }

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt not provided' });
    }

    console.log('🔧 NVIDIA Website API Route: Processing request', { 
      promptLength: prompt.length, 
      hasSystemPrompt: !!systemPrompt,
      maxTokens 
    });

    // Appeler l'API NVIDIA depuis le serveur (pas de CORS)
    const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${nvidiaKey}`,
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

    console.log('🔧 NVIDIA Website API Route: Response status', response.status);

    if (!response.ok) {
      const error = await response.text();
      console.error('🔧 NVIDIA Website API Route: API error', { status: response.status, error });
      return res.status(response.status).json({ error: 'NVIDIA API error', details: error });
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content?.trim() || '';

    console.log('🔧 NVIDIA Website API Route: Success', { resultLength: result.length });

    return res.status(200).json({ result });

  } catch (error: any) {
    console.error('🔧 NVIDIA Website API Route: Internal error', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
