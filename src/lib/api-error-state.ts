// ============================================================
// LeadForge AI — API Error & Notification System
// Gestion des erreurs API (rate limit, crédits épuisés) et arrêt des agents
// ============================================================

import { eventBus, LeadForgeEvents } from './events';

// Types d'erreurs API
export type ApiErrorType = 'rate_limit' | 'credits_exhausted' | 'api_error' | 'network_error';

export interface ApiError {
  type: ApiErrorType;
  service: string; // 'groq', 'serper', 'openrouter', etc.
  message: string;
  statusCode?: number;
  retryAfter?: number; // secondes
  timestamp: number;
}

// État global des erreurs API
class ApiErrorState {
  private errors: ApiError[] = [];
  private agentsStopped: boolean = false;
  private activeAgents: Set<string> = new Set();

  // Enregistrer une erreur API
  recordError(error: Omit<ApiError, 'timestamp'>): void {
    const apiError: ApiError = {
      ...error,
      timestamp: Date.now(),
    };
    
    this.errors.push(apiError);
    
    // Garder seulement les 50 dernières erreurs
    if (this.errors.length > 50) {
      this.errors = this.errors.slice(-50);
    }

    // Émettre l'événement d'erreur
    eventBus.emit(LeadForgeEvents.API_ERROR, apiError);

    // Arrêter les agents si erreur critique
    if (error.type === 'rate_limit' || error.type === 'credits_exhausted') {
      this.stopAllAgents();
    }

    console.log(`[ApiErrorState] Error recorded: ${error.service} - ${error.type}`, apiError);
  }

  // Démarrer un agent
  startAgent(agentId: string): void {
    this.activeAgents.add(agentId);
    this.agentsStopped = false;
    console.log(`[ApiErrorState] Agent started: ${agentId}`);
  }

  // Arrêter un agent spécifique
  stopAgent(agentId: string): void {
    this.activeAgents.delete(agentId);
    console.log(`[ApiErrorState] Agent stopped: ${agentId}`);
  }

  // Arrêter tous les agents
  stopAllAgents(): void {
    if (this.activeAgents.size > 0) {
      this.agentsStopped = true;
      const agentIds = Array.from(this.activeAgents);
      this.activeAgents.clear();
      
      // Émettre l'événement d'arrêt des agents
      eventBus.emit(LeadForgeEvents.AGENTS_STOPPED, { 
        reason: 'api_error',
        agentIds,
        timestamp: Date.now(),
      });

      console.log(`[ApiErrorState] All agents stopped due to API error: ${agentIds.join(', ')}`);
    }
  }

  // Vérifier si les agents doivent s'arrêter
  shouldStop(): boolean {
    return this.agentsStopped;
  }

  // Vérifier si les agents sont arrêtés (alias pour shouldStop)
  areAgentsStopped(): boolean {
    return this.agentsStopped;
  }

  // Vérifier si un agent est actif
  isAgentActive(agentId: string): boolean {
    return this.activeAgents.has(agentId);
  }

  // Obtenir les erreurs récentes
  getRecentErrors(minutes: number = 5): ApiError[] {
    const cutoff = Date.now() - (minutes * 60 * 1000);
    return this.errors.filter(e => e.timestamp > cutoff);
  }

  // Obtenir toutes les erreurs
  getAllErrors(): ApiError[] {
    return [...this.errors];
  }

  // Vérifier si un service a des erreurs récentes
  hasRecentErrors(service: string, type?: ApiErrorType, minutes: number = 5): boolean {
    const recent = this.getRecentErrors(minutes);
    return recent.some(e => 
      e.service === service && 
      (!type || e.type === type)
    );
  }

  // Réinitialiser l'état (après résolution manuelle)
  reset(): void {
    this.agentsStopped = false;
    this.errors = []; // Vider complètement les erreurs
    console.log('[ApiErrorState] State reset - All errors cleared');
  }

  // Obtenir le statut actuel
  getStatus() {
    return {
      agentsStopped: this.agentsStopped,
      activeAgentsCount: this.activeAgents.size,
      recentErrorsCount: this.getRecentErrors(5).length,
      totalErrors: this.errors.length,
    };
  }
}

// Instance singleton
export const apiErrorState = new ApiErrorState();

// Fonctions utilitaires pour détecter les erreurs

export function detectApiError(error: any, service: string): ApiError | null {
  const status = error?.status || error?.statusCode;
  const message = error?.message || error?.error?.message || String(error);
  
  // Rate limit (429)
  if (status === 429 || message.includes('rate_limit') || message.includes('Rate limit')) {
    const retryMatch = message.match(/try again in ([\d.]+)s/i);
    const retryAfter = retryMatch ? parseFloat(retryMatch[1]) : undefined;
    
    return {
      type: 'rate_limit',
      service,
      message: `Rate limit atteint sur ${service}: ${message}`,
      statusCode: 429,
      retryAfter,
      timestamp: Date.now(),
    };
  }
  
  // Crédits épuisés (400 avec message spécifique)
  if (status === 400 && message.includes('Not enough credits')) {
    return {
      type: 'credits_exhausted',
      service,
      message: `Crédits épuisés sur ${service}. Rechargez votre compte.`,
      statusCode: 400,
      timestamp: Date.now(),
    };
  }
  
  // Erreur réseau
  if (message.includes('network') || message.includes('fetch') || message.includes('ECONNREFUSED')) {
    return {
      type: 'network_error',
      service,
      message: `Erreur réseau avec ${service}: ${message}`,
      timestamp: Date.now(),
    };
  }
  
  // Erreur API générique
  if (status >= 400) {
    return {
      type: 'api_error',
      service,
      message: `Erreur API ${service} (${status}): ${message}`,
      statusCode: status,
      timestamp: Date.now(),
    };
  }
  
  return null;
}

// Hook pour utiliser dans les composants React
export function useApiErrors() {
  return {
    recordError: (error: Omit<ApiError, 'timestamp'>) => apiErrorState.recordError(error),
    startAgent: (agentId: string) => apiErrorState.startAgent(agentId),
    stopAgent: (agentId: string) => apiErrorState.stopAgent(agentId),
    reset: () => apiErrorState.reset(),
    getStatus: () => apiErrorState.getStatus(),
    shouldStop: () => apiErrorState.shouldStop(),
    areAgentsStopped: () => apiErrorState.areAgentsStopped(),
  };
}
