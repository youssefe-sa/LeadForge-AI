// ============================================================
// LeadForge AI — Global Processing State
// Suit l'état de processing à travers toute l'application
// ============================================================

import * as React from 'react';
import { eventBus, LeadForgeEvents } from './events';

export interface ProcessingState {
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

class ProcessingStateManager {
  private state: ProcessingState = {
    isProcessing: false,
    isPaused: false,
    currentTask: '',
    progress: { current: 0, total: 0, name: '', step: '' },
  };

  private listeners: Set<(state: ProcessingState) => void> = new Set();

  // Obtenir l'état actuel
  getState(): ProcessingState {
    return { ...this.state };
  }

  // S'abonner aux changements
  subscribe(listener: (state: ProcessingState) => void): () => void {
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

    console.log(`🚀 Processing started: ${taskName}`);
    this.notify();

    // Émettre un événement global
    eventBus.emit(LeadForgeEvents.PROCESSING_STARTED, {
      taskName,
      agentId,
      timestamp: Date.now(),
    });
  }

  // Mettre à jour le progrès
  updateProgress(progress: Partial<ProcessingState['progress']>): void {
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

    console.log(`🏁 Processing stopped: ${taskName}`);
    this.notify();

    // Émettre un événement global
    eventBus.emit(LeadForgeEvents.PROCESSING_STOPPED, {
      taskName,
      timestamp: Date.now(),
    });
  }

  // Vérifier si un agent spécifique est en cours
  isAgentProcessing(agentId: string): boolean {
    return this.state.isProcessing && this.state.agentId === agentId;
  }

  // Mettre en pause le processing
  pauseProcessing(): void {
    if (this.state.isProcessing && !this.state.isPaused) {
      this.state.isPaused = true;
      console.log(`⏸️ Processing paused: ${this.state.currentTask}`);
      this.notify();

      // Émettre un événement global
      eventBus.emit(LeadForgeEvents.PROCESSING_PAUSED, {
        taskName: this.state.currentTask,
        timestamp: Date.now(),
      });
    }
  }

  // Reprendre le processing
  resumeProcessing(): void {
    if (this.state.isProcessing && this.state.isPaused) {
      this.state.isPaused = false;
      console.log(`▶️ Processing resumed: ${this.state.currentTask}`);
      this.notify();

      // Émettre un événement global
      eventBus.emit(LeadForgeEvents.PROCESSING_RESUMED, {
        taskName: this.state.currentTask,
        timestamp: Date.now(),
      });
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
export const processingState = new ProcessingStateManager();

// Hook React pour utiliser dans les composants
export function useProcessingState() {
  const [state, setState] = React.useState(processingState.getState());

  React.useEffect(() => {
    const unsubscribe = processingState.subscribe(setState);
    return unsubscribe;
  }, []);

  return {
    ...state,
    startProcessing: processingState.startProcessing.bind(processingState),
    updateProgress: processingState.updateProgress.bind(processingState),
    stopProcessing: processingState.stopProcessing.bind(processingState),
    pauseProcessing: processingState.pauseProcessing.bind(processingState),
    resumeProcessing: processingState.resumeProcessing.bind(processingState),
    isProcessingPaused: processingState.isProcessingPaused.bind(processingState),
    reset: processingState.reset.bind(processingState),
  };
}

// Importer React pour le hook
// React est déjà importé en haut du fichier
