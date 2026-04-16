import React, { useState, useEffect } from 'react';
import { ApiConfig } from '../lib/supabase-store';

const C = {
  bg: '#F7F6F2', surface: '#FFFFFF', surface2: '#F2F1EC',
  border: '#E4E2DA', tx: '#1C1B18', tx2: '#5C5A53', tx3: '#9B9890',
  accent: '#D4500A', accent2: '#F0E8DF',
  green: '#1A7A4A', blue: '#1A4FA0', amber: '#B45309', red: '#C0392B',
};

const getAgents = (region: string) => [
  { id: 'dashboard', label: region === 'US' ? 'Lead Dashboard' : 'Lead Dashboard', icon: '📊', color: C.accent },
  { id: 'scorer', label: region === 'US' ? 'Scorer & Enrichment' : 'Scorer & Enrichissement', icon: '🧠', color: C.green },
  { id: 'website', label: region === 'US' ? 'Website Generator' : 'Website Generator', icon: '🌐', color: C.blue },
  { id: 'outreach', label: region === 'US' ? 'Outreach Agent' : 'Outreach Agent', icon: '📧', color: C.amber },
  { id: 'pipeline', label: region === 'US' ? 'Pipeline & Analytics' : 'Pipeline & Analytics', icon: '📈', color: C.red },
];

interface LogEntry {
  timestamp: string;
  message: string;
  color: string;
  type: 'system' | 'agent' | 'navigation' | 'verification' | 'lead' | 'api';
  agent?: string;
  action?: string;
}

interface Props {
  active: string;
  onNavigate: (id: string) => void;
  leadCount: number;
  apiCount: number;
  config: ApiConfig;
  updateConfig: (updates: Partial<ApiConfig>) => Promise<void>;
}

export default function Sidebar({ active, onNavigate, leadCount, apiCount, config, updateConfig }: Props) {
  const [logs, setLogs] = useState<LogEntry[]>([
    { 
      timestamp: new Date().toLocaleTimeString(), 
      message: '🚀 Système LeadForge AI démarré', 
      color: '#1A7A4A',
      type: 'system',
      action: 'démarrage'
    },
    { 
      timestamp: new Date().toLocaleTimeString(), 
      message: '👁️ Surveillance active...', 
      color: '#9B9890',
      type: 'system',
      action: 'surveillance'
    },
    { 
      timestamp: new Date().toLocaleTimeString(), 
      message: `📊 ${leadCount} leads chargés dans le système`, 
      color: '#D4500A',
      type: 'lead',
      action: 'chargement'
    },
    { 
      timestamp: new Date().toLocaleTimeString(), 
      message: `🔑 ${apiCount} APIs connectées et actives`, 
      color: '#1A4FA0',
      type: 'api',
      action: 'connexion'
    },
    { 
      timestamp: new Date().toLocaleTimeString(), 
      message: '📈 Pipeline d\'analyse prêt', 
      color: '#B45309',
      type: 'system',
      action: 'initialisation'
    },
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
        message: `🔄 Vérification automatique - Leads: ${leadCount}, APIs: ${apiCount}`,
        color: '#9B9890',
        type: 'verification',
        action: 'surveillance'
      };
      
      setLogs(prevLogs => {
        const updatedLogs = [...prevLogs, newLog];
        // Garder seulement les 50 derniers logs
        return updatedLogs.slice(-50);
      });
    }, 5000); // Toutes les 5 secondes

    return () => clearInterval(interval);
  }, [leadCount, apiCount]);

  useEffect(() => {
    // Ajouter un log quand le nombre de leads change
    const newLog: LogEntry = {
      timestamp: new Date().toLocaleTimeString(),
      message: `📊 Mise à jour: ${leadCount} leads détectés`,
      color: '#D4500A',
      type: 'lead',
      action: 'changement'
    };
    setLogs(prevLogs => [...prevLogs.slice(-49), newLog]);
  }, [leadCount]);

  useEffect(() => {
    // Ajouter un log quand le nombre d'APIs change
    const newLog: LogEntry = {
      timestamp: new Date().toLocaleTimeString(),
      message: `🔑 Mise à jour: ${apiCount} APIs connectées`,
      color: '#1A4FA0',
      type: 'api',
      action: 'mise à jour'
    };
    setLogs(prevLogs => [...prevLogs.slice(-49), newLog]);
  }, [apiCount]);

  useEffect(() => {
    // Ajouter un log quand la page active change
    const currentAgents = getAgents(config.region);
    const agentName = currentAgents.find(a => a.id === active)?.label || 'Page';
    const newLog: LogEntry = {
      timestamp: new Date().toLocaleTimeString(),
      message: `🧭 Navigation: ${agentName} activée`,
      color: '#B45309',
      type: 'navigation',
      action: 'activation',
      agent: agentName
    };
    setLogs(prevLogs => [...prevLogs.slice(-49), newLog]);
  }, [active, config.region]);
  return (
    <div style={{
      width: 240, minHeight: '100vh', background: C.surface, borderRight: `1px solid ${C.border}`,
      display: 'flex', flexDirection: 'column', position: 'fixed', left: 0, top: 0, zIndex: 50,
      fontFamily: "'Bricolage Grotesque', sans-serif",
    }}>
      {/* Logo */}
      <div style={{ padding: '24px 20px 20px', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8, background: C.accent,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 700, fontSize: 16,
            fontFamily: "'Fraunces', serif",
          }}>LF</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: C.tx, letterSpacing: '-0.3px' }}>LeadForge AI</div>
            <div style={{ fontSize: 11, color: C.tx3 }}>{config.region === 'US' ? 'B2B Outreach' : 'Prospection B2B'}</div>
          </div>
        </div>

        {/* Region Switcher Professional */}
        <div style={{ 
          display: 'inline-flex', 
          background: C.surface2, 
          borderRadius: 20, 
          padding: 2,
          border: `1px solid ${C.border}`,
          marginBottom: 10,
          position: 'relative'
        }}>
          <button
            onClick={() => updateConfig({ region: 'FR' })}
            style={{
              padding: '4px 14px',
              fontSize: 10,
              fontWeight: config.region === 'FR' ? 700 : 500,
              border: 'none',
              borderRadius: 18,
              background: config.region === 'FR' ? C.accent : 'transparent',
              color: config.region === 'FR' ? '#fff' : C.tx3,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              transition: 'all 0.25s ease',
              boxShadow: config.region === 'FR' ? '0 2px 4px rgba(212, 80, 10, 0.2)' : 'none'
            }}
          >
            <span>🇫🇷</span> FR
          </button>
          <button
            onClick={() => updateConfig({ region: 'US' })}
            style={{
              padding: '4px 14px',
              fontSize: 10,
              fontWeight: config.region === 'US' ? 700 : 500,
              border: 'none',
              borderRadius: 18,
              background: config.region === 'US' ? C.accent : 'transparent',
              color: config.region === 'US' ? '#fff' : C.tx3,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              transition: 'all 0.25s ease',
              boxShadow: config.region === 'US' ? '0 2px 4px rgba(212, 80, 10, 0.2)' : 'none'
            }}
          >
            <span>🇺🇸</span> US
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '12px 10px' }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: C.tx3, textTransform: 'uppercase', letterSpacing: '1px', padding: '8px 10px 6px', marginBottom: 2 }}>
          {config.region === 'US' ? 'Agents' : 'Agents'}
        </div>
        {getAgents(config.region).map(a => {
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
          {config.region === 'US' ? 'System' : 'Système'}
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
          <span style={{ fontSize: 13, fontWeight: active === 'campaigns' ? 600 : 400, color: active === 'campaigns' ? C.tx : C.tx2 }}>{config.region === 'US' ? 'Import Campaigns' : 'Campagnes d\'importation'}</span>
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
          <span style={{ fontSize: 13, fontWeight: active === 'settings' ? 600 : 400, color: active === 'settings' ? C.tx : C.tx2 }}>{config.region === 'US' ? 'Settings' : 'Paramètres'}</span>
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
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          justifyContent: 'center'
        }}>
          <span>📊</span>
          <span>Journal Temps Réel</span>
        </div>
        <div 
          ref={logContainerRef}
          style={{ 
            background: 'linear-gradient(135deg, #0A0A09 0%, #1A1A1A 100%)', 
            borderRadius: 8, 
            padding: 10, 
            height: 140, 
            overflow: 'auto',
            fontSize: 9,
            fontFamily: "'DM Mono', monospace",
            border: '1px solid #333',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
          }}
        >
          {logs.map((log, index) => {
            // Déterminer l'icône selon le type
            const getIcon = () => {
              switch(log.type) {
                case 'system': return '🚀';
                case 'agent': return '🤖';
                case 'navigation': return '🧭';
                case 'verification': return '🔄';
                case 'lead': return '📊';
                case 'api': return '🔑';
                default: return '📝';
              }
            };

            return (
              <div 
                key={index} 
                style={{ 
                  color: log.color, 
                  marginBottom: 3,
                  padding: '4px 6px',
                  borderRadius: 4,
                  background: index % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
                  borderLeft: `2px solid ${log.color}`,
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 6,
                  marginBottom: 1
                }}>
                  <span style={{ fontSize: 10 }}>{getIcon()}</span>
                  <span style={{ 
                    fontSize: 8, 
                    color: '#9B9890',
                    background: '#1C1B18',
                    padding: '1px 4px',
                    borderRadius: 3,
                    fontWeight: 600
                  }}>
                    {log.type?.toUpperCase()}
                  </span>
                  {log.agent && (
                    <span style={{ 
                      fontSize: 7, 
                      color: '#9B9890',
                      background: '#1C1B18',
                      padding: '1px 3px',
                      borderRadius: 3,
                      fontStyle: 'italic'
                    }}>
                      {log.agent}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 9, opacity: 0.8 }}>
                  [{log.timestamp}] {log.message}
                </div>
              </div>
            );
          })}
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
