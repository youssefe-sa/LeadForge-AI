import { useState } from 'react';
import { Lead, exportLeadsCSV } from '../lib/supabase-store';

const C = {
  bg: '#F7F6F2', surface: '#FFFFFF', surface2: '#F2F1EC',
  border: '#E4E2DA', tx: '#1C1B18', tx2: '#5C5A53', tx3: '#9B9890',
  accent: '#D4500A', accent2: '#F0E8DF',
  green: '#1A7A4A', blue: '#1A4FA0', amber: '#B45309', red: '#C0392B',
};

const stages: { key: Lead['stage']; label: string; color: string; icon: string; description: string }[] = [
  { key: 'new', label: 'Nouveaux Leads', color: C.tx3, icon: '📥', description: 'Leads fraîchement importés' },
  { key: 'enriched', label: 'Enrichis', color: C.green, icon: '🧠', description: 'Données complétées par IA' },
  { key: 'site_generated', label: 'Sites Générés', color: C.blue, icon: '🌐', description: 'Sites web créés' },
  { key: 'email_sent', label: 'Emails Envoyés', color: C.amber, icon: '📧', description: 'Campagnes email lancées' },
  { key: 'interested', label: 'Intéressés', color: C.accent, icon: '🔥', description: 'Leads engagés' },
  { key: 'converted', label: 'Convertis', color: C.green, icon: '🏆', description: 'Clients acquis' },
  { key: 'lost', label: 'Perdus', color: C.red, icon: '❌', description: 'Opportunités perdues' },
];

interface Props {
  leads: Lead[];
  updateLead: (id: string, updates: Partial<Lead>) => void;
}

export default function Pipeline({ leads, updateLead }: Props) {
  const [view, setView] = useState<'kanban' | 'analytics'>('analytics');
  const [dragId, setDragId] = useState<string | null>(null);

  // Calculs avancés
  const stageCounts = stages.map(s => ({ ...s, count: leads.filter(l => l.stage === s.key).length }));
  const totalRevenue = leads.filter(l => l.stage === 'converted').reduce((s, l) => s + (l.revenue || 0), 0);
  const conversionRate = leads.length > 0 ? (leads.filter(l => l.stage === 'converted').length / leads.length) * 100 : 0;
  const avgScore = leads.length > 0 ? Math.round(leads.reduce((s, l) => s + (l.score || 0), 0) / leads.length) : 0;
  const highScoreLeads = leads.filter(l => (l.score || 0) >= 60);
  const engagedLeads = leads.filter(l => l.emailOpened || l.emailClicked);
  const avgRevenuePerConversion = leads.filter(l => l.stage === 'converted').length > 0 ? totalRevenue / leads.filter(l => l.stage === 'converted').length : 0;

  const handleDragStart = (id: string) => setDragId(id);
  const handleDrop = (stage: Lead['stage']) => {
    if (dragId) {
      const lead = leads.find(l => l.id === dragId);
      const updates: Partial<Lead> = { stage };
      if (stage === 'converted') updates.revenue = lead?.revenue || 146;
      updateLead(dragId, updates);
      setDragId(null);
    }
  };

  // Funnel data
  const funnelData = stages.slice(0, 6).map(s => {
    const count = leads.filter(l => l.stage === s.key).length;
    return { ...s, count };
  });
  const maxFunnel = Math.max(1, ...funnelData.map(f => f.count));

  return (
    <div className="animate-fade" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", padding: 24, maxWidth: 1400, margin: '0 auto' }}>
      
      {/* Header professionnel */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start', 
        marginBottom: 32,
        padding: '24px 32px',
        background: C.surface, 
        borderRadius: 12,
        border: `1px solid ${C.border}`,
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
      }}>
        <div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: C.tx, marginBottom: 8 }}>
            📊 Pipeline Commercial & Analytics
          </h1>
          <p style={{ color: C.tx3, fontSize: 16, lineHeight: 1.5 }}>
            Suivez votre cycle de vente complet, du lead à la conversion, avec des analyses détaillées et des insights actionnables
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button onClick={() => setView('kanban')} style={{
            padding: '8px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer',
            border: `2px solid ${view === 'kanban' ? C.accent : C.border}`,
            background: view === 'kanban' ? C.accent : C.surface,
            color: view === 'kanban' ? '#fff' : C.tx2,
            transition: 'all 0.2s ease',
            display: 'flex', alignItems: 'center', gap: 4,
            whiteSpace: 'nowrap'
          }}>🗂️ Kanban</button>
          <button onClick={() => setView('analytics')} style={{
            padding: '8px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer',
            border: `2px solid ${view === 'analytics' ? C.accent : C.border}`,
            background: view === 'analytics' ? C.accent : C.surface,
            color: view === 'analytics' ? '#fff' : C.tx2,
            transition: 'all 0.2s ease',
            display: 'flex', alignItems: 'center', gap: 4,
            whiteSpace: 'nowrap'
          }}>📈 Analytics</button>
          <button onClick={() => exportLeadsCSV(leads, 'pipeline_export.csv')} style={{
            padding: '8px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer',
            border: `2px solid ${C.green}`, background: C.green, color: '#fff',
            transition: 'all 0.2s ease',
            display: 'flex', alignItems: 'center', gap: 4,
            whiteSpace: 'nowrap'
          }}>📥 Export</button>
        </div>
      </div>

      {/* KPIs principaux */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        {[
          { 
            label: '📥 Leads Totaux', 
            value: leads.length.toLocaleString(), 
            change: '+12%', 
            color: C.accent,
            description: 'Total des leads dans le pipeline'
          },
          { 
            label: '🏆 Conversions', 
            value: leads.filter(l => l.stage === 'converted').length.toLocaleString(), 
            change: '+8%', 
            color: C.green,
            description: 'Leads devenus clients'
          },
          { 
            label: '💰 Chiffre d\'Affaires', 
            value: `${totalRevenue.toLocaleString()}$`, 
            change: '+15%', 
            color: C.blue,
            description: 'Revenu total généré'
          },
          { 
            label: '📈 Taux de Conversion', 
            value: `${conversionRate.toFixed(1)}%`, 
            change: '+2.1%', 
            color: conversionRate >= 10 ? C.green : C.amber,
            description: 'Pourcentage de leads convertis'
          },
        ].map((kpi, i) => (
          <div key={i} style={{
            background: C.surface, 
            borderRadius: 12, 
            padding: '24px',
            border: `1px solid ${C.border}`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            transition: 'all 0.2s ease',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <span style={{ fontSize: 14, color: C.tx3, fontWeight: 500 }}>{kpi.label}</span>
              <span style={{
                fontSize: 12, fontWeight: 700, padding: '4px 8px', borderRadius: 6,
                background: kpi.change.startsWith('+') ? C.green + '20' : C.red + '20',
                color: kpi.change.startsWith('+') ? C.green : C.red
              }}>{kpi.change}</span>
            </div>
            <div style={{ fontSize: 32, fontWeight: 700, color: C.tx, marginBottom: 8 }}>{kpi.value}</div>
            <div style={{ fontSize: 12, color: C.tx3 }}>{kpi.description}</div>
          </div>
        ))}
      </div>

      {view === 'kanban' ? (
        /* VUE KANBAN AMÉLIORÉE */
        <div style={{ background: C.surface, borderRadius: 12, padding: '24px', border: `1px solid ${C.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h2 style={{ fontSize: 20, fontWeight: 600, color: C.tx }}>📋 Pipeline Visuel</h2>
            <div style={{ fontSize: 14, color: C.tx3 }}>
              Glissez-déposez les leads pour les déplacer entre les étapes
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Première rangée: Nouveaux Leads, Enrichis, Sites Générés */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {stages.slice(0, 3).map(stage => {
                const stageLeads = leads.filter(l => l.stage === stage.key);
                return (
                  <div key={stage.key} style={{
                    background: C.bg, borderRadius: 8, padding: '12px',
                    border: `2px solid ${stage.color}20`,
                    minHeight: '300px'
                  }}
                  onDragOver={e => { e.preventDefault(); e.currentTarget.style.background = C.accent2; }}
                  onDragLeave={e => { e.currentTarget.style.background = C.bg; }}
                  onDrop={e => { e.preventDefault(); e.currentTarget.style.background = C.bg; handleDrop(stage.key); }}
                  >
                    {/* En-tête de colonne */}
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      marginBottom: 12,
                      padding: '8px 12px',
                      background: stage.color + '15',
                      borderRadius: 6,
                      border: `1px solid ${stage.color}30`
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 14 }}>{stage.icon}</span>
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 600, color: C.tx }}>{stage.label}</div>
                          <div style={{ fontSize: 10, color: C.tx3 }}>{stage.description}</div>
                        </div>
                      </div>
                      <span style={{
                        fontSize: 10, fontWeight: 700, padding: '4px 8px', borderRadius: 12,
                        background: stage.color, color: '#fff',
                        fontFamily: "'DM Mono', monospace",
                        minWidth: 20, textAlign: 'center'
                      }}>{stageLeads.length}</span>
                    </div>

                    {/* Cartes de leads */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minHeight: 100 }}>
                      {stageLeads.slice(0, 15).map(lead => (
                        <div key={lead.id} draggable onDragStart={() => handleDragStart(lead.id)}
                          style={{
                            background: C.surface, borderRadius: 6, padding: '8px 10px',
                            border: `1px solid ${C.border}`, cursor: 'grab',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                            transition: 'all 0.2s ease',
                          }}
                          onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.12)')}
                          onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)')}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: 12, fontWeight: 600, color: C.tx, marginBottom: 2 }}>{lead.name || 'Sans nom'}</div>
                              <div style={{ fontSize: 10, color: C.tx3 }}>{lead.sector || lead.city || lead.email || '—'}</div>
                            </div>
                            {(lead.score || 0) > 0 && (
                              <div style={{
                                fontSize: 10, fontWeight: 700, padding: '2px 4px', borderRadius: 4,
                                background: lead.score >= 80 ? C.green + '20' : lead.score >= 60 ? C.amber + '20' : C.tx3 + '20',
                                color: lead.score >= 80 ? C.green : lead.score >= 60 ? C.amber : C.tx3,
                                fontFamily: "'DM Mono', monospace",
                              }}>{lead.score}</div>
                            )}
                          </div>
                          
                          {(lead.score || 0) > 0 && (
                            <div style={{ marginBottom: 6 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                                <span style={{ fontSize: 9, color: C.tx3 }}>Score</span>
                                <div style={{ flex: 1, height: 4, borderRadius: 2, background: C.surface2, overflow: 'hidden' }}>
                                  <div style={{
                                    height: '100%', borderRadius: 2,
                                    width: `${lead.score}%`,
                                    background: lead.score >= 80 ? C.green : lead.score >= 60 ? C.amber : C.tx3,
                                    transition: 'width 600ms ease',
                                  }} />
                                </div>
                              </div>
                            </div>
                          )}

                          <div style={{ display: 'flex', gap: 4, fontSize: 9, color: C.tx3 }}>
                            {lead.emailOpened && <span style={{ background: C.green + '20', padding: '1px 3px', borderRadius: 2 }}>👁️</span>}
                            {lead.emailClicked && <span style={{ background: C.blue + '20', padding: '1px 3px', borderRadius: 2 }}>🔗</span>}
                            {lead.website && <span style={{ background: C.amber + '20', padding: '1px 3px', borderRadius: 2 }}>🌐</span>}
                          </div>

                          {lead.stage === 'converted' && (
                            <div style={{ marginTop: 6 }}>
                              <input
                                type="number"
                                placeholder="€"
                                value={lead.revenue || ''}
                                onClick={e => e.stopPropagation()}
                                onChange={e => updateLead(lead.id, { revenue: parseFloat(e.target.value) || 0 })}
                                style={{
                                  width: '100%', padding: '4px 6px', borderRadius: 4,
                                  border: `2px solid ${C.green}`, fontSize: 10,
                                  fontFamily: "'DM Mono', monospace", outline: 'none',
                                  background: C.green + '10',
                                }}
                              />
                            </div>
                          )}
                        </div>
                      ))}
                      {stageLeads.length > 15 && (
                        <div style={{ 
                          fontSize: 10, 
                          color: C.tx3, 
                          textAlign: 'center', 
                          padding: '6px',
                          background: C.surface2,
                          borderRadius: 4,
                          border: `1px dashed ${C.border}`
                        }}>
                          +{stageLeads.length - 15} autres
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Deuxième rangée: Emails Envoyés, Intéressés, Convertis, Perdus */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
              {stages.slice(3).map(stage => {
                const stageLeads = leads.filter(l => l.stage === stage.key);
                return (
                  <div key={stage.key} style={{
                    background: C.bg, borderRadius: 8, padding: '12px',
                    border: `2px solid ${stage.color}20`,
                    minHeight: '300px'
                  }}
                  onDragOver={e => { e.preventDefault(); e.currentTarget.style.background = C.accent2; }}
                  onDragLeave={e => { e.currentTarget.style.background = C.bg; }}
                  onDrop={e => { e.preventDefault(); e.currentTarget.style.background = C.bg; handleDrop(stage.key); }}
                  >
                    {/* En-tête de colonne */}
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      marginBottom: 12,
                      padding: '8px 12px',
                      background: stage.color + '15',
                      borderRadius: 6,
                      border: `1px solid ${stage.color}30`
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 14 }}>{stage.icon}</span>
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 600, color: C.tx }}>{stage.label}</div>
                          <div style={{ fontSize: 10, color: C.tx3 }}>{stage.description}</div>
                        </div>
                      </div>
                      <span style={{
                        fontSize: 10, fontWeight: 700, padding: '4px 8px', borderRadius: 12,
                        background: stage.color, color: '#fff',
                        fontFamily: "'DM Mono', monospace",
                        minWidth: 20, textAlign: 'center'
                      }}>{stageLeads.length}</span>
                    </div>

                    {/* Cartes de leads */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minHeight: 100 }}>
                      {stageLeads.slice(0, 15).map(lead => (
                        <div key={lead.id} draggable onDragStart={() => handleDragStart(lead.id)}
                          style={{
                            background: C.surface, borderRadius: 6, padding: '8px 10px',
                            border: `1px solid ${C.border}`, cursor: 'grab',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                            transition: 'all 0.2s ease',
                          }}
                          onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.12)')}
                          onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)')}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: 12, fontWeight: 600, color: C.tx, marginBottom: 2 }}>{lead.name || 'Sans nom'}</div>
                              <div style={{ fontSize: 10, color: C.tx3 }}>{lead.sector || lead.city || lead.email || '—'}</div>
                            </div>
                            {(lead.score || 0) > 0 && (
                              <div style={{
                                fontSize: 10, fontWeight: 700, padding: '2px 4px', borderRadius: 4,
                                background: lead.score >= 80 ? C.green + '20' : lead.score >= 60 ? C.amber + '20' : C.tx3 + '20',
                                color: lead.score >= 80 ? C.green : lead.score >= 60 ? C.amber : C.tx3,
                                fontFamily: "'DM Mono', monospace",
                              }}>{lead.score}</div>
                            )}
                          </div>
                          
                          {(lead.score || 0) > 0 && (
                            <div style={{ marginBottom: 6 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                                <span style={{ fontSize: 9, color: C.tx3 }}>Score</span>
                                <div style={{ flex: 1, height: 4, borderRadius: 2, background: C.surface2, overflow: 'hidden' }}>
                                  <div style={{
                                    height: '100%', borderRadius: 2,
                                    width: `${lead.score}%`,
                                    background: lead.score >= 80 ? C.green : lead.score >= 60 ? C.amber : C.tx3,
                                    transition: 'width 600ms ease',
                                  }} />
                                </div>
                              </div>
                            </div>
                          )}

                          <div style={{ display: 'flex', gap: 4, fontSize: 9, color: C.tx3 }}>
                            {lead.emailOpened && <span style={{ background: C.green + '20', padding: '1px 3px', borderRadius: 2 }}>👁️</span>}
                            {lead.emailClicked && <span style={{ background: C.blue + '20', padding: '1px 3px', borderRadius: 2 }}>🔗</span>}
                            {lead.website && <span style={{ background: C.amber + '20', padding: '1px 3px', borderRadius: 2 }}>🌐</span>}
                          </div>

                          {lead.stage === 'converted' && (
                            <div style={{ marginTop: 6 }}>
                              <input
                                type="number"
                                placeholder="€"
                                value={lead.revenue || ''}
                                onClick={e => e.stopPropagation()}
                                onChange={e => updateLead(lead.id, { revenue: parseFloat(e.target.value) || 0 })}
                                style={{
                                  width: '100%', padding: '4px 6px', borderRadius: 4,
                                  border: `2px solid ${C.green}`, fontSize: 10,
                                  fontFamily: "'DM Mono', monospace", outline: 'none',
                                  background: C.green + '10',
                                }}
                              />
                            </div>
                          )}
                        </div>
                      ))}
                      {stageLeads.length > 15 && (
                        <div style={{ 
                          fontSize: 10, 
                          color: C.tx3, 
                          textAlign: 'center', 
                          padding: '6px',
                          background: C.surface2,
                          borderRadius: 4,
                          border: `1px dashed ${C.border}`
                        }}>
                          +{stageLeads.length - 15} autres
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* VUE ANALYTICS AMÉLIORÉE */
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          
          {/* Colonne gauche - Funnel et Distribution */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            
            {/* Funnel de conversion */}
            <div style={{ 
              background: C.surface, 
              borderRadius: 12, 
              padding: '24px', 
              border: `1px solid ${C.border}`,
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: C.tx }}>📊 Funnel de Conversion</h3>
                <div style={{ fontSize: 12, color: C.tx3, background: C.bg, padding: '6px 12px', borderRadius: 6 }}>
                  {leads.length} leads totaux
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {funnelData.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 140 }}>
                      <span style={{ fontSize: 16 }}>{f.icon}</span>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: C.tx }}>{f.label}</div>
                        <div style={{ fontSize: 11, color: C.tx3 }}>{f.description}</div>
                      </div>
                    </div>
                    <div style={{ flex: 1, height: 32, borderRadius: 6, background: C.surface2, overflow: 'hidden', position: 'relative' }}>
                      <div style={{
                        height: '100%', borderRadius: 6, background: f.color + 'cc',
                        width: `${(f.count / maxFunnel) * 100}%`,
                        transition: 'width 800ms ease',
                        minWidth: f.count > 0 ? 40 : 0,
                        display: 'flex', alignItems: 'center', paddingLeft: 12,
                      }}>
                        <span style={{ fontSize: 14, color: '#fff', fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>{f.count}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Distribution par étape */}
            <div style={{ 
              background: C.surface, 
              borderRadius: 12, 
              padding: '24px', 
              border: `1px solid ${C.border}`,
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: C.tx, marginBottom: 20 }}>📈 Distribution par Étape</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {stageCounts.map((s, i) => (
                  <div key={i} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '12px 16px',
                    background: C.bg,
                    borderRadius: 8,
                    border: `1px solid ${C.border}`
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: 16 }}>{s.icon}</span>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: C.tx }}>{s.label}</div>
                        <div style={{ fontSize: 11, color: C.tx3 }}>{s.description}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 80, height: 6, borderRadius: 3, background: C.surface2 }}>
                        <div style={{
                          height: '100%', borderRadius: 3, background: s.color,
                          width: leads.length > 0 ? `${(s.count / leads.length) * 100}%` : '0%',
                          transition: 'width 600ms ease',
                        }} />
                      </div>
                      <span style={{ 
                        fontSize: 14, 
                        fontWeight: 700, 
                        fontFamily: "'DM Mono', monospace", 
                        minWidth: 30, 
                        textAlign: 'right',
                        color: s.color
                      }}>{s.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Colonne droite - Top Leads et Conversions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            
            {/* Top Leads */}
            <div style={{ 
              background: C.surface, 
              borderRadius: 12, 
              padding: '24px', 
              border: `1px solid ${C.border}`,
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: C.tx }}>🏆 Top Leads Qualifiés</h3>
                <div style={{ fontSize: 12, color: C.tx3, background: C.bg, padding: '6px 12px', borderRadius: 6 }}>
                  Score ≥ 60
                </div>
              </div>
              
              {highScoreLeads.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {highScoreLeads.sort((a, b) => b.score - a.score).slice(0, 6).map((lead, i) => (
                    <div key={lead.id} style={{
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      padding: '12px 16px',
                      background: C.bg,
                      borderRadius: 8,
                      border: `1px solid ${C.border}`,
                    }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: C.tx, marginBottom: 4 }}>{lead.name}</div>
                        <div style={{ fontSize: 12, color: C.tx3 }}>{lead.sector || 'Non spécifié'}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{
                          fontSize: 14, fontWeight: 700, padding: '6px 10px', borderRadius: 6,
                          background: lead.score >= 80 ? C.green + '20' : C.amber + '20',
                          color: lead.score >= 80 ? C.green : C.amber,
                          fontFamily: "'DM Mono', monospace",
                        }}>{lead.score}</div>
                        <div style={{ display: 'flex', gap: 4 }}>
                          {lead.emailOpened && <span style={{ fontSize: 14 }}>👁️</span>}
                          {lead.emailClicked && <span style={{ fontSize: 14 }}>🔗</span>}
                          {lead.website && <span style={{ fontSize: 14 }}>🌐</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '40px 20px',
                  background: C.bg,
                  borderRadius: 8,
                  border: `1px dashed ${C.border}`
                }}>
                  <div style={{ fontSize: 16, marginBottom: 8 }}>🎯</div>
                  <div style={{ fontSize: 14, color: C.tx3, marginBottom: 4 }}>Aucun lead qualifié</div>
                  <div style={{ fontSize: 12, color: C.tx3 }}>Enrichissez vos leads pour voir les meilleurs scores</div>
                </div>
              )}
            </div>

            {/* Conversions et Revenus */}
            <div style={{ 
              background: C.surface, 
              borderRadius: 12, 
              padding: '24px', 
              border: `1px solid ${C.border}`,
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: C.tx, marginBottom: 20 }}>💰 Performance Commerciale</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 20 }}>
                <div style={{ 
                  padding: '20px', 
                  background: C.green + '10', 
                  borderRadius: 8, 
                  textAlign: 'center',
                  border: `2px solid ${C.green}20`
                }}>
                  <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "'Fraunces', serif", color: C.green }}>
                    {leads.filter(l => l.stage === 'converted').length}
                  </div>
                  <div style={{ fontSize: 13, color: C.tx3, marginTop: 4 }}>Clients Convertis</div>
                </div>
                <div style={{ 
                  padding: '20px', 
                  background: C.blue + '10', 
                  borderRadius: 8, 
                  textAlign: 'center',
                  border: `2px solid ${C.blue}20`
                }}>
                  <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "'Fraunces', serif", color: C.blue }}>
                    {totalRevenue.toLocaleString()}$
                  </div>
                  <div style={{ fontSize: 13, color: C.tx3, marginTop: 4 }}>Chiffre d\'Affaires</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                <div style={{ 
                  padding: '16px', 
                  background: C.bg, 
                  borderRadius: 8, 
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "'Fraunces', serif", color: C.amber }}>
                    {conversionRate.toFixed(1)}%
                  </div>
                  <div style={{ fontSize: 12, color: C.tx3, marginTop: 4 }}>Taux de Conversion</div>
                </div>
                <div style={{ 
                  padding: '16px', 
                  background: C.bg, 
                  borderRadius: 8, 
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "'Fraunces', serif", color: C.accent }}>
                    {Math.round(avgRevenuePerConversion)}$
                  </div>
                  <div style={{ fontSize: 12, color: C.tx3, marginTop: 4 }}>Panier Moyen</div>
                </div>
              </div>

              {/* Détail des ventes */}
              {leads.filter(l => l.stage === 'converted' && l.revenue > 0).length > 0 && (
                <div style={{ marginTop: 20 }}>
                  <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: C.tx2 }}>📋 Détail des Ventes</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {leads.filter(l => l.stage === 'converted' && l.revenue > 0).map(l => (
                      <div key={l.id} style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        padding: '10px 16px',
                        background: C.bg,
                        borderRadius: 6,
                        border: `1px solid ${C.border}`,
                      }}>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: C.tx }}>{l.name}</div>
                          <div style={{ fontSize: 11, color: C.tx3 }}>{l.sector || 'Non spécifié'}</div>
                        </div>
                        <div style={{ 
                          fontSize: 14, 
                          fontWeight: 700, 
                          fontFamily: "'DM Mono', monospace", 
                          color: C.green,
                          background: C.green + '15',
                          padding: '4px 8px',
                          borderRadius: 4
                        }}>{l.revenue.toLocaleString()}$</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
