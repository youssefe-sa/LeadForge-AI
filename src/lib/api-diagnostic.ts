// --- API DIAGNOSTIC TOOL ---
import { ApiConfig } from './supabase-store';

export async function diagnosticAPIs(config: ApiConfig) {
  console.log('🔍 === STARTING API DIAGNOSTIC ===');
  
  const results = {
    serper: { status: 'unknown', details: '' as string },
    groq: { status: 'unknown', details: '' as string },
    summary: '' as string
  };

  // 1. Test Serper API
  console.log('\n📡 Testing Serper API...');
  if (!config.serperKey) {
    results.serper.status = 'error';
    results.serper.details = 'No Serper API key provided';
  } else {
    try {
      const testQuery = 'plombier paris 15';
      const res = await fetch('https://google.serper.dev/search', {
        method: 'POST',
        headers: { 'X-API-KEY': config.serperKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: testQuery, gl: 'fr', hl: 'fr' }),
      });
      
      if (res.ok) {
        const data = await res.json();
        const organicCount = data.organic?.length || 0;
        const hasPlaces = !!(data.places && data.places.length > 0);
        const hasKnowledgeGraph = !!data.knowledgeGraph;
        
        results.serper.status = 'success';
        results.serper.details = `HTTP ${res.status} - Found ${organicCount} organic results, Places: ${hasPlaces}, KG: ${hasKnowledgeGraph}`;
        console.log('✅ Serper OK:', results.serper.details);
      } else {
        const errorText = await res.text();
        results.serper.status = 'error';
        results.serper.details = `HTTP ${res.status}: ${errorText}`;
        console.error('❌ Serper Error:', results.serper.details);
      }
    } catch (error) {
      results.serper.status = 'error';
      results.serper.details = `Exception: ${error}`;
      console.error('❌ Serper Exception:', error);
    }
  }

  // 2. Test Groq API
  console.log('\n🧠 Testing Groq API...');
  if (!config.groqKey) {
    results.groq.status = 'error';
    results.groq.details = 'No Groq API key provided';
  } else {
    try {
      const testPrompt = 'Réponds en une phrase: Quel est le capital de la France?';
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${config.groqKey}` },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: testPrompt }
          ],
          temperature: 0.7,
          max_tokens: 100,
        }),
      });
      
      if (res.ok) {
        const data = await res.json();
        const content = data.choices?.[0]?.message?.content;
        const usage = data.usage;
        
        if (content && content.trim()) {
          results.groq.status = 'success';
          results.groq.details = `HTTP ${res.status} - Response: "${content.trim()}" - Tokens: ${JSON.stringify(usage)}`;
          console.log('✅ Groq OK:', results.groq.details);
        } else {
          results.groq.status = 'error';
          results.groq.details = `HTTP ${res.status} - No content in response`;
          console.error('❌ Groq No Content:', results.groq.details);
        }
      } else {
        const errorText = await res.text();
        results.groq.status = 'error';
        results.groq.details = `HTTP ${res.status}: ${errorText}`;
        console.error('❌ Groq Error:', results.groq.details);
      }
    } catch (error) {
      results.groq.status = 'error';
      results.groq.details = `Exception: ${error}`;
      console.error('❌ Groq Exception:', error);
    }
  }

  // 3. Summary
  const serperOk = results.serper.status === 'success';
  const groqOk = results.groq.status === 'success';
  
  if (serperOk && groqOk) {
    results.summary = '✅ All APIs working correctly - Agent 2 should function properly';
  } else if (serperOk && !groqOk) {
    results.summary = '⚠️ Serper OK but Groq failing - Limited enrichment (no AI descriptions/reviews)';
  } else if (!serperOk && groqOk) {
    results.summary = '⚠️ Groq OK but Serper failing - No Google data enrichment possible';
  } else {
    results.summary = '❌ Both APIs failing - Agent 2 will not work at all';
  }

  console.log('\n📊 === DIAGNOSTIC SUMMARY ===');
  console.log('Serper:', results.serper.status, '-', results.serper.details);
  console.log('Groq:', results.groq.status, '-', results.groq.details);
  console.log('Summary:', results.summary);
  console.log('=== END DIAGNOSTIC ===\n');

  return results;
}

// Test function to run in browser console
export async function quickDiagnostic() {
  try {
    // @ts-ignore - Accessing global config
    const config = window.apiConfig;
    if (!config) {
      console.error('❌ No API config found in window.apiConfig');
      return;
    }
    await diagnosticAPIs(config);
  } catch (error) {
    console.error('❌ Diagnostic failed:', error);
  }
}
