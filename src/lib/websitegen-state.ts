// ============================================================
// LeadForge AI — WebsiteGen Processing State
// Suit l'état de processing pour Website Generator à travers toute l'application
// ============================================================

import * as React from 'react';

export interface WebsiteGenState {
  isProcessing: boolean;
  isPaused: boolean;
  currentTask: string;
  progress: {
    current: number;
    total: number;
    name: string;
    step: string;
  };
  agentId?: string;
}

class WebsiteGenStateManager {
  private state: WebsiteGenState = {
    isProcessing: false,
    isPaused: false,
    currentTask: '',
    progress: { current: 0, total: 0, name: '', step: '' },
  };

  private listeners: Set<(state: WebsiteGenState) => void> = new Set();

  // Obtenir l'état actuel
  getState(): WebsiteGenState {
    return { ...this.state };
  }

  // S'abonner aux changements
  subscribe(listener: (state: WebsiteGenState) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  // Notifier tous les listeners
  private notify(): void {
    const currentState = this.getState();
    this.listeners.forEach(listener => listener(currentState));
  }

  // Démarrer un processing
  startProcessing(taskName: string, agentId?: string): void {
    this.state = {
      isProcessing: true,
      isPaused: false,
      currentTask: taskName,
      progress: { current: 0, total: 0, name: '', step: '' },
      agentId,
    };

    console.log(`🚀 WebsiteGen Processing started: ${taskName}`);
    this.notify();
  }

  // Mettre à jour le progrès
  updateProgress(progress: Partial<WebsiteGenState['progress']>): void {
    this.state.progress = { ...this.state.progress, ...progress };
    this.notify();
  }

  // Arrêter le processing
  stopProcessing(): void {
    const taskName = this.state.currentTask;
    this.state = {
      isProcessing: false,
      isPaused: false,
      currentTask: '',
      progress: { current: 0, total: 0, name: '', step: '' },
    };

    console.log(`🏁 WebsiteGen Processing stopped: ${taskName}`);
    this.notify();
  }

  // Vérifier si un agent spécifique est en cours
  isAgentProcessing(agentId: string): boolean {
    return this.state.isProcessing && this.state.agentId === agentId;
  }

  // Mettre en pause le processing
  pauseProcessing(): void {
    if (this.state.isProcessing && !this.state.isPaused) {
      this.state.isPaused = true;
      console.log(`⏸️ WebsiteGen Processing paused: ${this.state.currentTask}`);
      this.notify();
    }
  }

  // Reprendre le processing
  resumeProcessing(): void {
    if (this.state.isProcessing && this.state.isPaused) {
      this.state.isPaused = false;
      console.log(`▶️ WebsiteGen Processing resumed: ${this.state.currentTask}`);
      this.notify();
    }
  }

  // Vérifier si le processing est en pause
  isProcessingPaused(): boolean {
    return this.state.isProcessing && this.state.isPaused;
  }

  // Réinitialiser l'état
  reset(): void {
    this.state = {
      isProcessing: false,
      isPaused: false,
      currentTask: '',
      progress: { current: 0, total: 0, name: '', step: '' },
    };
    this.notify();
  }
}

// Instance singleton
export const websiteGenState = new WebsiteGenStateManager();

// Hook React pour utiliser dans les composants
export function useWebsiteGenState() {
  const [state, setState] = React.useState(websiteGenState.getState());

  React.useEffect(() => {
    const unsubscribe = websiteGenState.subscribe(setState);
    return unsubscribe;
  }, []);

  return {
    ...state,
    startProcessing: websiteGenState.startProcessing.bind(websiteGenState),
    updateProgress: websiteGenState.updateProgress.bind(websiteGenState),
    stopProcessing: websiteGenState.stopProcessing.bind(websiteGenState),
    pauseProcessing: websiteGenState.pauseProcessing.bind(websiteGenState),
    resumeProcessing: websiteGenState.resumeProcessing.bind(websiteGenState),
    isProcessingPaused: websiteGenState.isProcessingPaused.bind(websiteGenState),
    reset: websiteGenState.reset.bind(websiteGenState),
  };
}
