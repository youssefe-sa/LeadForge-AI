// ============================================================
// LeadForge AI — API Test System
// Teste les APIs avant le lancement des agents
// ============================================================

import { ApiConfig } from './supabase-store';
import { apiErrorState, detectApiError } from './api-error-state';
import { eventBus, LeadForgeEvents } from './events';

export interface ApiTestResult {
  service: string;
  status: 'ok' | 'error' | 'skipped';
  message: string;
  statusCode?: number;
}

export interface ApiTestReport {
  success: boolean;
  results: ApiTestResult[];
  canProceed: boolean;
}

// Test Serper API
async function testSerperApi(config: ApiConfig): Promise<ApiTestResult> {
  if (!config.serperKey) {
    return { service: 'serper', status: 'error', message: 'Clé API Serper non configurée' };
  }

  try {
    const response = await fetch('https://google.serper.dev/search', {
      method: 'POST',
      headers: {
        'X-API-KEY': config.serperKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ q: 'test', num: 1 }),
    });

    if (response.ok) {
      return { service: 'serper', status: 'ok', message: 'API Serper fonctionnelle' };
    }

    const errorText = await response.text();
    
    // Détecter les erreurs spécifiques
    if (errorText.includes('Not enough credits')) {
      const error = { status: 400, message: 'Not enough credits' };
      const apiError = detectApiError(error, 'serper');
      if (apiError) apiErrorState.recordError(apiError);
      
      return { 
        service: 'serper', 
        status: 'error', 
        message: 'Crédits Serper épuisés - Rechargez votre compte',
        statusCode: 400 
      };
    }

    return { 
      service: 'serper', 
      status: 'error', 
      message: `Erreur API Serper: ${response.status}`,
      statusCode: response.status 
    };
  } catch (error) {
    return { 
      service: 'serper', 
      status: 'error', 
      message: `Erreur réseau: ${(error as Error).message}` 
    };
  }
}

// Test generic LLM provider via /api/llm proxy
const LLM_ENDPOINTS: Record<string, { url: string; model: string; needsProxy: boolean }> = {
  groq:      { url: 'https://api.groq.com/openai/v1/chat/completions', model: 'llama-3.1-8b-instant', needsProxy: false },
  nvidia:    { url: '/api/llm', model: 'meta/llama-3.1-8b-instruct', needsProxy: true },
  gemini:    { url: '/api/llm', model: 'gemini-2.0-flash-lite', needsProxy: true },
  openrouter: { url: '/api/llm', model: 'meta-llama/llama-3.1-8b-instruct:free', needsProxy: true },
};

async function testLlmProvider(provider: string, apiKey: string): Promise<ApiTestResult> {
  if (!apiKey) {
    return { service: provider, status: 'error', message: `Clé API ${provider} non configurée` };
  }

  const endpoint = LLM_ENDPOINTS[provider];
  if (!endpoint) {
    return { service: provider, status: 'error', message: `Provider ${provider} inconnu` };
  }

  try {
    const fetchOptions: RequestInit = endpoint.needsProxy
      ? {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            provider,
            apiKey,
            body: { model: endpoint.model, messages: [{ role: 'user', content: 'Hi' }], max_tokens: 10 },
          }),
        }
      : {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: endpoint.model,
            messages: [{ role: 'user', content: 'Hi' }],
            max_tokens: 10,
          }),
        };

    const response = await fetch(endpoint.url, fetchOptions);

    if (response.ok) {
      const data = await response.json().catch(() => ({}));
      const hasContent = !!data.choices?.[0]?.message?.content;
      return { service: provider, status: 'ok', message: `API ${provider} fonctionnelle${hasContent ? '' : ' (réponse vide)'}` };
    }

    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.error?.message || '';

    if (response.status === 429 || errorMessage.includes('Rate limit')) {
      const error = { status: 429, message: errorMessage };
      const apiError = detectApiError(error, provider);
      if (apiError) apiErrorState.recordError(apiError);
      return { service: provider, status: 'error', message: `Rate limit ${provider} atteint`, statusCode: 429 };
    }

    return { service: provider, status: 'error', message: `Erreur API ${provider}: ${response.status}`, statusCode: response.status };
  } catch (error) {
    return { service: provider, status: 'error', message: `Erreur réseau ${provider}: ${(error as Error).message}` };
  }
}

// Test Gmail SMTP
async function testGmailSmtp(config: ApiConfig): Promise<ApiTestResult> {
  if (!config.gmailSmtpUser || !config.gmailSmtpPassword) {
    return { service: 'gmailSmtp', status: 'error', message: 'Configuration SMTP Gmail incomplète' };
  }

  // On ne teste pas réellement l'envoi d'email pour éviter les spams
  // On vérifie juste que les credentials sont présents
  return { 
    service: 'gmailSmtp', 
    status: 'ok', 
    message: 'Configuration SMTP Gmail présente' 
  };
}

// Test toutes les APIs
export async function testAllApis(config: ApiConfig): Promise<ApiTestReport> {
  const results: ApiTestResult[] = [];

  const defaultLlm = config.defaultLlm || 'groq';
  console.log(`🔧 API Testing: Default LLM is ${defaultLlm}`);

  // Tester Serper + le LLM par défaut en parallèle
  const serperResult = await testSerperApi(config);
  results.push(serperResult);

  // Tester le provider LLM par défaut (obligatoire)
  const defaultLlmResult = await testLlmProvider(defaultLlm, config[`${defaultLlm}Key` as keyof ApiConfig] as string || '');
  results.push(defaultLlmResult);

  // Tester les autres providers configurés en parallèle
  const otherProviders = ['groq', 'nvidia', 'gemini', 'openrouter'].filter(p => p !== defaultLlm);
  const otherTests = otherProviders
    .map(p => ({ key: config[`${p}Key` as keyof ApiConfig] as string || '', provider: p }))
    .filter(t => t.key)
    .map(t => testLlmProvider(t.provider, t.key));
  const otherResults = await Promise.all(otherTests);
  results.push(...otherResults);

  // Gmail SMTP
  const gmailResult = await testGmailSmtp(config);
  results.push(gmailResult);

  const hasWorkingSerper = serperResult.status === 'ok';
  const hasWorkingLlm = defaultLlmResult.status === 'ok';
  const canProceed = hasWorkingSerper && hasWorkingLlm;

  results
    .filter(r => r.status === 'error')
    .forEach(r => {
      eventBus.emit(LeadForgeEvents.API_ERROR, {
        type: 'api_error', service: r.service, message: r.message,
        statusCode: r.statusCode, timestamp: Date.now(),
      });
    });

  return { success: canProceed, results, canProceed };
}

// Fonction pour afficher les résultats de test dans l'UI
export function formatTestResults(report: ApiTestReport): string {
  if (report.canProceed) {
    const workingCount = report.results.filter(r => r.status === 'ok').length;
    return `✅ ${workingCount}/${report.results.length} APIs fonctionnent - Prêt à lancer les agents`;
  }

  const errors = report.results
    .filter(r => r.status === 'error')
    .map(r => `❌ ${r.service}: ${r.message}`)
    .join('\n');

  return `⚠️ Problèmes détectés:\n${errors}`;
}
