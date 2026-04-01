// ============================================================
// LeadForge AI — API Test System
// Teste les APIs avant le lancement des agents
// ============================================================

import { ApiConfig } from './supabase-store';
import { apiErrorState, detectApiError } from './api-error-state';
import { eventBus, LeadForgeEvents } from './events';

export interface ApiTestResult {
  service: string;
  status: 'ok' | 'error';
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

// Test Groq API
async function testGroqApi(config: ApiConfig): Promise<ApiTestResult> {
  if (!config.groqKey) {
    return { service: 'groq', status: 'error', message: 'Clé API Groq non configurée' };
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.groqKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [{ role: 'user', content: 'Hi' }],
        max_tokens: 10,
      }),
    });

    if (response.ok) {
      return { service: 'groq', status: 'ok', message: 'API Groq fonctionnelle' };
    }

    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.error?.message || '';
    
    // Détecter rate limit
    if (response.status === 429 || errorMessage.includes('Rate limit')) {
      const error = { status: 429, message: errorMessage };
      const apiError = detectApiError(error, 'groq');
      if (apiError) apiErrorState.recordError(apiError);
      
      return { 
        service: 'groq', 
        status: 'error', 
        message: 'Rate limit Groq atteint - Attendez quelques secondes',
        statusCode: 429 
      };
    }

    return { 
      service: 'groq', 
      status: 'error', 
      message: `Erreur API Groq: ${response.status}`,
      statusCode: response.status 
    };
  } catch (error) {
    return { 
      service: 'groq', 
      status: 'error', 
      message: `Erreur réseau: ${(error as Error).message}` 
    };
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

  // Tester chaque API
  const [serperResult, groqResult, gmailResult] = await Promise.all([
    testSerperApi(config),
    testGroqApi(config),
    testGmailSmtp(config),
  ]);

  results.push(serperResult, groqResult, gmailResult);

  // Vérifier si on peut procéder
  // On nécessite au moins Serper OU Groq pour fonctionner
  const criticalServices = ['serper', 'groq'];
  const criticalResults = results.filter(r => criticalServices.includes(r.service));
  const hasWorkingCritical = criticalResults.some(r => r.status === 'ok');

  // Si aucun service critique ne fonctionne, on ne peut pas procéder
  const canProceed = hasWorkingCritical;

  // Émettre des événements pour les erreurs
  results
    .filter(r => r.status === 'error')
    .forEach(r => {
      eventBus.emit(LeadForgeEvents.API_ERROR, {
        type: 'api_error',
        service: r.service,
        message: r.message,
        statusCode: r.statusCode,
        timestamp: Date.now(),
      });
    });

  return {
    success: canProceed,
    results,
    canProceed,
  };
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
