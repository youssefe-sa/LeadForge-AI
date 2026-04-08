import React, { useState, useEffect } from 'react';

const C = {
  bg: '#F7F6F2', surface: '#FFFFFF', surface2: '#F2F1EC',
  border: '#E4E2DA', tx: '#1C1B18', tx2: '#5C5A53', tx3: '#9B9890',
  accent: '#D4500A', accent2: '#F0E8DF',
  green: '#1A7A4A', blue: '#1A4FA0', amber: '#B45309', red: '#C0392B',
};

const agents = [
  { id: 'dashboard', label: 'Lead Dashboard', icon: '📊', color: C.accent },
  { id: 'scorer', label: 'Scorer & Enrichissement', icon: '🧠', color: C.green },
  { id: 'website', label: 'Website Generator', icon: '🌐', color: C.blue },
  { id: 'website-v2', label: 'Website Generator V2', icon: '🚀', color: '#7C3AED' },
  { id: 'outreach', label: 'Outreach Agent', icon: '📧', color: C.amber },
  { id: 'pipeline', label: 'Pipeline & Analytics', icon: '📈', color: C.red },
];

interface LogEntry {
  timestamp: string;
  message: string;
  color: string;
}

interface Props {
  active: string;
  onNavigate: (id: string) => void;
  leadCount: number;
  apiCount: number;
}

export default function Sidebar({ active, onNavigate, leadCount, apiCount }: Props) {
  const [logs, setLogs] = useState<LogEntry[]>([
    { timestamp: new Date().toLocaleTimeString(), message: 'Système démarré', color: '#1A7A4A' },
    { timestamp: new Date().toLocaleTimeString(), message: 'Surveillance active...', color: '#9B9890' },
    { timestamp: new Date().toLocaleTimeString(), message: `${leadCount} leads chargés`, color: '#D4500A' },
    { timestamp: new Date().toLocaleTimeString(), message: `${apiCount} APIs connectées`, color: '#1A4FA0' },
    { timestamp: new Date().toLocaleTimeString(), message: 'Pipeline en cours...', color: '#B45309' },
  ]);
  
  const logContainerRef = React.useRef<HTMLDivElement>(null);

  // Fonction pour scroller automatiquement en bas
  const scrollToBottom = () => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  };

  // Scroller quand les logs changent
  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newLog: LogEntry = {
        timestamp: new Date().toLocaleTimeString(),
        message: `Vérification automatique - Leads: ${leadCount}, APIs: ${apiCount}`,
        color: '#9B9890'
      };
      
      setLogs(prevLogs => {
        const updatedLogs = [...prevLogs, newLog];
        // Garder seulement les 20 derniers logs
        return updatedLogs.slice(-20);
      });
    }, 5000); // Toutes les 5 secondes

    return () => clearInterval(interval);
  }, [leadCount, apiCount]);

  useEffect(() => {
    // Ajouter un log quand le nombre de leads change
    const newLog: LogEntry = {
      timestamp: new Date().toLocaleTimeString(),
      message: `Changement détecté: ${leadCount} leads dans le système`,
      color: '#D4500A'
    };
    setLogs(prevLogs => [...prevLogs.slice(-19), newLog]);
  }, [leadCount]);

  useEffect(() => {
    // Ajouter un log quand le nombre d'APIs change
    const newLog: LogEntry = {
      timestamp: new Date().toLocaleTimeString(),
      message: `Mise à jour APIs: ${apiCount} services actifs`,
      color: '#1A4FA0'
    };
    setLogs(prevLogs => [...prevLogs.slice(-19), newLog]);
  }, [apiCount]);

  useEffect(() => {
    // Ajouter un log quand la page active change
    const newLog: LogEntry = {
      timestamp: new Date().toLocaleTimeString(),
      message: `Navigation: ${active} activé`,
      color: '#B45309'
    };
    setLogs(prevLogs => [...prevLogs.slice(-19), newLog]);
  }, [active]);
  return (
    <div style={{
      width: 240, minHeight: '100vh', background: C.surface, borderRight: `1px solid ${C.border}`,
      display: 'flex', flexDirection: 'column', position: 'fixed', left: 0, top: 0, zIndex: 50,
      fontFamily: "'Bricolage Grotesque', sans-serif",
    }}>
      {/* Logo */}
      <div style={{ padding: '24px 20px 20px', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8, background: C.accent,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 700, fontSize: 16,
            fontFamily: "'Fraunces', serif",
          }}>LF</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: C.tx, letterSpacing: '-0.3px' }}>LeadForge AI</div>
            <div style={{ fontSize: 11, color: C.tx3 }}>Prospection B2B</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '12px 10px' }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: C.tx3, textTransform: 'uppercase', letterSpacing: '1px', padding: '8px 10px 6px', marginBottom: 2 }}>
          Agents
        </div>
        {agents.map(a => {
          const isActive = active === a.id;
          return (
            <button key={a.id} onClick={() => onNavigate(a.id)} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px', borderRadius: 6, border: 'none', cursor: 'pointer',
              background: isActive ? C.accent2 : 'transparent',
              marginBottom: 2, textAlign: 'left', transition: 'all 150ms',
            }}
            onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = C.surface2; }}
            onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
              <span style={{ fontSize: 14 }}>{a.icon}</span>
              <span style={{
                fontSize: 13, fontWeight: isActive ? 600 : 400,
                color: isActive ? C.tx : C.tx2,
              }}>{a.label}</span>
            </button>
          );
        })}

        <div style={{ height: 1, background: C.border, margin: '12px 10px' }} />
        <div style={{ fontSize: 10, fontWeight: 600, color: C.tx3, textTransform: 'uppercase', letterSpacing: '1px', padding: '8px 10px 6px' }}>
          Système
        </div>
        <button 
          style={{
            width: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            gap: 10,
            padding: '12px', 
            borderRadius: 6, 
            border: 'none',
            cursor: 'pointer',
            background: active === 'campaigns' ? C.accent2 : 'transparent',
            textAlign: 'left',
            transition: 'all 0.2s ease',
          }}
          onClick={() => onNavigate('campaigns')}
          onMouseEnter={e => { if (active !== 'campaigns') (e.currentTarget as HTMLElement).style.background = C.surface2; }}
          onMouseLeave={e => { if (active !== 'campaigns') (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
        >
          <span style={{ fontSize: 14 }}>📋</span>
          <span style={{ fontSize: 13, fontWeight: active === 'campaigns' ? 600 : 400, color: active === 'campaigns' ? C.tx : C.tx2 }}>Campagnes d'importation</span>
        </button>
        <button 
          style={{
            width: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            gap: 10,
            padding: '12px', 
            borderRadius: 6, 
            border: 'none',
            cursor: 'pointer',
            background: active === 'settings' ? C.accent2 : 'transparent',
            textAlign: 'left',
            transition: 'all 0.2s ease',
          }}
          onClick={() => onNavigate('settings')}
          onMouseEnter={e => { if (active !== 'settings') (e.currentTarget as HTMLElement).style.background = C.surface2; }}
          onMouseLeave={e => { if (active !== 'settings') (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
        >
          <span style={{ fontSize: 14 }}>⚙️</span>
          <span style={{ fontSize: 13, fontWeight: active === 'settings' ? 600 : 400, color: active === 'settings' ? C.tx : C.tx2 }}>Paramètres</span>
        </button>
      </nav>

      {/* Journal des activités en temps réel */}
      <div style={{ 
        padding: '12px', 
        borderTop: `1px solid ${C.border}`,
        background: '#1C1B18',
        borderBottom: `1px solid ${C.border}`
      }}>
        <div style={{ 
          fontSize: 10, 
          fontWeight: 600, 
          color: '#9B9890', 
          textTransform: 'uppercase', 
          letterSpacing: '1px', 
          marginBottom: 8,
          textAlign: 'center'
        }}>
          Journal Temps Réel
        </div>
        <div 
          ref={logContainerRef}
          style={{ 
            background: '#0A0A09', 
            borderRadius: 6, 
            padding: 8, 
            height: 120, 
            overflow: 'auto',
            fontSize: 10,
            fontFamily: "'DM Mono', monospace",
            border: '1px solid #333'
          }}
        >
          {logs.map((log, index) => (
            <div key={index} style={{ color: log.color, marginBottom: 2 }}>
              [{log.timestamp}] {log.message}
            </div>
          ))}
        </div>
      </div>

      {/* Footer stats */}
      <div style={{ padding: '10px 16px', borderTop: `1px solid ${C.border}`, fontSize: 11 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ color: C.tx3 }}>Leads</span>
          <span style={{ fontWeight: 600, color: C.tx, fontFamily: "'DM Mono', monospace" }}>{leadCount}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: C.tx3 }}>APIs</span>
          <span style={{ fontWeight: 600, color: C.tx, fontFamily: "'DM Mono', monospace" }}>{apiCount}</span>
        </div>
      </div>
    </div>
  );
}
