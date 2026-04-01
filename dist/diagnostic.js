// === DIAGNOSTIC RAPIDE DES APIs LEADFORGE ===
// Copiez-collez ce code directement dans la console du navigateur (F12)

(async function quickDiagnostic() {
  console.log('🔍 === DIAGNOSTIC LEADFORGE AI ===');
  
  // Récupérer la configuration depuis l'application
  const apiConfig = await new Promise((resolve) => {
    // Attendre que la config soit chargée
    let attempts = 0;
    const checkConfig = () => {
      // @ts-ignore
      if (window.apiConfig) {
        // @ts-ignore
        resolve(window.apiConfig);
      } else if (attempts < 50) {
        attempts++;
        setTimeout(checkConfig, 100);
      } else {
        resolve({ groqKey: '', serperKey: '' });
      }
    };
    checkConfig();
  });

  const config = apiConfig as any;
  console.log('📋 Configuration trouvée:');
  console.log('  - Groq Key:', config.groqKey ? '✅ Présente' : '❌ Absente');
  console.log('  - Serper Key:', config.serperKey ? '✅ Présente' : '❌ Absente');

  const results = {
    serper: { status: 'unknown', details: '' },
    groq: { status: 'unknown', details: '' }
  };

  // Test Serper
  console.log('\n📡 Test de l\'API Serper...');
  if (config.serperKey) {
    try {
      const res = await fetch('https://google.serper.dev/search', {
        method: 'POST',
        headers: { 'X-API-KEY': config.serperKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: 'plombier paris 15', gl: 'fr', hl: 'fr' }),
      });
      
      if (res.ok) {
        const data = await res.json();
        const organicCount = data.organic?.length || 0;
        const hasPlaces = !!(data.places && data.places.length > 0);
        results.serper.status = 'success';
        results.serper.details = `HTTP ${res.status} - ${organicCount} résultats, Places: ${hasPlaces}`;
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
  } else {
    results.serper.status = 'error';
    results.serper.details = 'Pas de clé API Serper';
    console.error('❌ Pas de clé Serper');
  }

  // Test Groq
  console.log('\n🧠 Test de l\'API Groq...');
  if (config.groqKey) {
    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${config.groqKey}` },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: 'Réponds en une phrase: Quel est le capital de la France?' }
          ],
          temperature: 0.7,
          max_tokens: 100,
        }),
      });
      
      if (res.ok) {
        const data = await res.json();
        const content = data.choices?.[0]?.message?.content;
        if (content && content.trim()) {
          results.groq.status = 'success';
          results.groq.details = `HTTP ${res.status} - Réponse: "${content.trim()}"`;
          console.log('✅ Groq OK:', results.groq.details);
        } else {
          results.groq.status = 'error';
          results.groq.details = `HTTP ${res.status} - Pas de contenu dans la réponse`;
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
  } else {
    results.groq.status = 'error';
    results.groq.details = 'Pas de clé API Groq';
    console.error('❌ Pas de clé Groq');
  }

  // Résumé
  console.log('\n📊 === RÉSUMÉ DU DIAGNOSTIC ===');
  console.log('Serper:', results.serper.status, '-', results.serper.details);
  console.log('Groq:', results.groq.status, '-', results.groq.details);
  
  const serperOk = results.serper.status === 'success';
  const groqOk = results.groq.status === 'success';
  
  let summary = '';
  if (serperOk && groqOk) {
    summary = '✅ Toutes les APIs fonctionnent - L\'Agent 2 devrait marcher parfaitement !';
  } else if (serperOk && !groqOk) {
    summary = '⚠️ Serper OK mais Groq en erreur - Enrichissement limité (pas de descriptions IA)';
  } else if (!serperOk && groqOk) {
    summary = '⚠️ Groq OK mais Serper en erreur - Pas de données Google possibles';
  } else {
    summary = '❌ Les deux APIs sont en erreur - L\'Agent 2 ne fonctionnera pas du tout';
  }
  
  console.log('Résumé:', summary);
  console.log('=== FIN DU DIAGNOSTIC ===\n');

  // Afficher une alerte avec les résultats
  alert(`📊 RÉSULTATS DU DIAGNOSTIC:\n\n` +
        `🔍 Serper: ${results.serper.status}\n${results.serper.details}\n\n` +
        `🧠 Groq: ${results.groq.status}\n${results.groq.details}\n\n` +
        `📋 ${summary}`);

  return results;
})();
