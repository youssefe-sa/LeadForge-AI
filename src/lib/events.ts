// Système d'événements pour la synchronisation entre composants

type EventHandler = (...args: any[]) => void;

class EventBus {
  private events: Record<string, EventHandler[]> = {};

  // S'abonner à un événement
  on(event: string, handler: EventHandler) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(handler);
  }

  // Se désabonner d'un événement
  off(event: string, handler: EventHandler) {
    if (!this.events[event]) return;
    const index = this.events[event].indexOf(handler);
    if (index > -1) {
      this.events[event].splice(index, 1);
    }
  }

  // Émettre un événement
  emit(event: string, ...args: any[]) {
    if (!this.events[event]) return;
    this.events[event].forEach(handler => handler(...args));
  }

  // Nettoyer tous les événements
  clear() {
    this.events = {};
  }
}

// Instance globale de l'EventBus
export const eventBus = new EventBus();

// Types d'événements pour LeadForge
export const LeadForgeEvents = {
  LEADS_CHANGED: 'leads-changed',
  CAMPAIGNS_CHANGED: 'campaigns-changed',
  LEAD_ADDED: 'lead-added',
  LEAD_DELETED: 'lead-deleted',
  CAMPAIGN_ADDED: 'campaign-added',
  CAMPAIGN_DELETED: 'campaign-deleted',
  DATA_REFRESH: 'data-refresh',
  // Nouveaux événements pour les erreurs API
  API_ERROR: 'api-error',
  AGENTS_STOPPED: 'agents-stopped',
  // Nouveaux événements pour le processing global
  PROCESSING_STARTED: 'processing-started',
  PROCESSING_STOPPED: 'processing-stopped',
  PROCESSING_PAUSED: 'processing-paused',
  PROCESSING_RESUMED: 'processing-resumed',
};
