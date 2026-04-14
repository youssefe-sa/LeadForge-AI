import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface LogEntry {
  timestamp: string;
  message: string;
  color: string;
  source?: string; // Dashboard, Scorer, Website, Outreach, Pipeline, System
}

interface LogContextType {
  logs: LogEntry[];
  addLog: (message: string, color?: string, source?: string) => void;
  clearLogs: () => void;
}

const LogContext = createContext<LogContextType | undefined>(undefined);

export function LogProvider({ children }: { children: ReactNode }) {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const addLog = useCallback((message: string, color: string = '#9B9890', source?: string) => {
    const newLog: LogEntry = {
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      message,
      color,
      source
    };
    
    setLogs(prevLogs => {
      const updatedLogs = [...prevLogs, newLog];
      // Garder les 50 derniers logs pour avoir plus d'historique
      return updatedLogs.slice(-50);
    });
  }, []);

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  return (
    <LogContext.Provider value={{ logs, addLog, clearLogs }}>
      {children}
    </LogContext.Provider>
  );
}

export function useLogger() {
  const context = useContext(LogContext);
  if (!context) {
    throw new Error('useLogger must be used within a LogProvider');
  }
  return context;
}
