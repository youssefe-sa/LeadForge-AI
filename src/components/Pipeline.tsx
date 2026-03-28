import { useState } from 'react';
import { Lead, exportLeadsCSV } from '../lib/store';

const C = {
  bg: '#F7F6F2', surface: '#FFFFFF', surface2: '#F2F1EC',
  border: '#E4E2DA', tx: '#1C1B18', tx2: '#5C5A53', tx3: '#9B9890',
  accent: '#D4500A', accent2: '#F0E8DF',
  green: '#1A7A4A', blue: '#1A4FA0', amber: '#B45309', red: '#C0392B',
};

const stages: { key: Lead['stage']; label: string; color: string; icon: string }[] = [
  { key: 'new', label: 'Nouveau', color: C.tx3, icon: '📥' },
  { key: 'enriched', label: 'Enrichi', color: C.green, icon: '🧠' },
  { key: 'site_generated', label: 'Site Généré', color: C.blue, icon: '🌐' },
  { key: 'email_sent', label: 'Email Envoyé', color: C.amber, icon: '📧' },
  { key: 'interested', label: 'Intéressé', color: C.accent, icon: '🔥' },
  { key: 'converted', label: 'Converti', color: C.green, icon: '🏆' },
  { key: 'lost', label: 'Perdu', color: C.red, icon: '❌' },
];

interface Props {
  leads: Lead[];
  updateLead: (id: string, updates: Partial<Lead>) => void;
}

export default function Pipeline({ leads, updateLead }: Props) {
  const [view, setView] = useState<'kanban' | 'analytics'>('kanban');
  const [dragId, setDragId] = useState<string | null>(null);

  const stageCounts = stages.map(s => ({ ...s, count: leads.filter(l => l.stage === s.key).length }));
  const totalRevenue = leads.filter(l => l.stage === 'converted').reduce((s, l) => s + l.revenue, 0);

  const handleDragStart = (id: string) => setDragId(id);
  const handleDrop = (stage: Lead['stage']) => {
    if (dragId) {
      const updates: Partial<Lead> = { stage };
      if (stage === 'converted') updates.revenue = updates.revenue || 0;
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
    <div className="animate-fade" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start', 
        marginBottom: 28,
        position: 'sticky',
        top: 0,
        zIndex: 10,
        background: C.bg,
        padding: '20px 0',
        borderBottom: `1px solid ${C.border}`
      }}>
        <div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 700, color: C.tx, marginBottom: 4 }}>
            Pipeline & Analytics
          </h1>
          <p style={{ color: C.tx3, fontSize: 14 }}>Suivez vos leads dans le funnel et analysez les performances</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setView('kanban')} style={{
            padding: '9px 16px', borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: 'pointer',
            border: `1px solid ${view === 'kanban' ? C.accent : C.border}`,
            background: view === 'kanban' ? C.accent2 : C.surface,
            color: view === 'kanban' ? C.accent : C.tx2,
          }}>🗂️ Kanban</button>
          <button onClick={() => setView('analytics')} style={{
            padding: '9px 16px', borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: 'pointer',
            border: `1px solid ${view === 'analytics' ? C.accent : C.border}`,
            background: view === 'analytics' ? C.accent2 : C.surface,
            color: view === 'analytics' ? C.accent : C.tx2,
          }}>📊 Analytics</button>
          <button onClick={() => exportLeadsCSV(leads, 'pipeline_export.csv')} style={{
            padding: '9px 16px', borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: 'pointer',
            border: `1px solid ${C.border}`, background: C.surface, color: C.tx2,
          }}>↓ Export</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Pipeline', value: leads.length, color: C.accent },
          { label: 'Intéressés', value: leads.filter(l => l.stage === 'interested').length, color: C.amber },
          { label: 'Convertis', value: leads.filter(l => l.stage === 'converted').length, color: C.green },
          { label: 'Chiffre d\'Affaires', value: `${totalRevenue.toLocaleString()}€`, color: C.blue },
        ].map((s, i) => (
          <div key={i} style={{
            background: C.surface, borderRadius: 8, padding: '20px 22px',
            borderLeft: `3px solid ${s.color}`, boxShadow: '0 1px 3px rgba(28,27,24,0.06)',
          }}>
            <div style={{ fontSize: 12, color: C.tx3, fontWeight: 500, marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "'Fraunces', serif", color: C.tx }}>{s.value}</div>
          </div>
        ))}
      </div>

      {view === 'kanban' ? (
        /* KANBAN VIEW */
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 20 }}>
          {stages.map(stage => {
            const stageLeads = leads.filter(l => l.stage === stage.key);
            return (
              <div key={stage.key} style={{
                minWidth: 220, maxWidth: 260, flex: 1,
                background: C.surface2, borderRadius: 8, padding: '12px',
              }}
              onDragOver={e => { e.preventDefault(); e.currentTarget.style.background = C.accent2; }}
              onDragLeave={e => { e.currentTarget.style.background = C.surface2; }}
              onDrop={e => { e.preventDefault(); e.currentTarget.style.background = C.surface2; handleDrop(stage.key); }}
              >
                {/* Stage header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span>{stage.icon}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: C.tx }}>{stage.label}</span>
                  </div>
                  <span style={{
                    fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 10,
                    background: stage.color + '20', color: stage.color,
                    fontFamily: "'DM Mono', monospace",
                  }}>{stageLeads.length}</span>
                </div>

                {/* Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minHeight: 60 }}>
                  {stageLeads.slice(0, 20).map(lead => (
                    <div key={lead.id} draggable onDragStart={() => handleDragStart(lead.id)}
                      style={{
                        background: C.surface, borderRadius: 6, padding: '10px 12px',
                        border: `1px solid ${C.border}`, cursor: 'grab',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                        transition: 'box-shadow 150ms',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 3px 8px rgba(0,0,0,0.1)')}
                      onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.04)')}
                    >
                      <div style={{ fontSize: 13, fontWeight: 500, color: C.tx, marginBottom: 4 }}>{lead.name || '—'}</div>
                      <div style={{ fontSize: 11, color: C.tx3 }}>{lead.sector || lead.city || lead.email || '—'}</div>
                      {lead.score > 0 && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
                          <div style={{ flex: 1, height: 3, borderRadius: 2, background: C.surface2, overflow: 'hidden' }}>
                            <div style={{
                              height: '100%', borderRadius: 2,
                              width: `${lead.score}%`,
                              background: lead.score >= 80 ? C.green : lead.score >= 60 ? C.amber : C.tx3,
                            }} />
                          </div>
                          <span style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", color: C.tx3 }}>{lead.score}</span>
                        </div>
                      )}
                      {lead.stage === 'converted' && (
                        <div style={{ marginTop: 6 }}>
                          <input
                            type="number" placeholder="CA €" value={lead.revenue || ''}
                            onClick={e => e.stopPropagation()}
                            onChange={e => updateLead(lead.id, { revenue: parseFloat(e.target.value) || 0 })}
                            style={{
                              width: '100%', padding: '4px 8px', borderRadius: 4,
                              border: `1px solid ${C.border}`, fontSize: 12,
                              fontFamily: "'DM Mono', monospace", outline: 'none',
                            }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                  {stageLeads.length > 20 && (
                    <div style={{ fontSize: 11, color: C.tx3, textAlign: 'center', padding: 4 }}>
                      +{stageLeads.length - 20} autres
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* ANALYTICS VIEW */
        <div>
          {/* Funnel */}
          <div style={{ background: C.surface, borderRadius: 8, padding: '24px', border: `1px solid ${C.border}`, marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Funnel de Conversion</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {funnelData.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ width: 100, fontSize: 12, color: C.tx2, textAlign: 'right' }}>{f.label}</span>
                  <div style={{ flex: 1, height: 28, borderRadius: 4, background: C.surface2, overflow: 'hidden', position: 'relative' }}>
                    <div style={{
                      height: '100%', borderRadius: 4, background: f.color + 'cc',
                      width: `${(f.count / maxFunnel) * 100}%`,
                      transition: 'width 600ms ease',
                      minWidth: f.count > 0 ? 30 : 0,
                      display: 'flex', alignItems: 'center', paddingLeft: 8,
                    }}>
                      <span style={{ fontSize: 12, color: '#fff', fontWeight: 600, fontFamily: "'DM Mono', monospace" }}>{f.count}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {/* Stage distribution */}
            <div style={{ background: C.surface, borderRadius: 8, padding: '20px', border: `1px solid ${C.border}` }}>
              <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Distribution par Étape</h3>
              {stageCounts.map((s, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i < stageCounts.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>{s.icon}</span>
                    <span style={{ fontSize: 13, color: C.tx2 }}>{s.label}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 60, height: 4, borderRadius: 2, background: C.surface2 }}>
                      <div style={{
                        height: '100%', borderRadius: 2, background: s.color,
                        width: leads.length > 0 ? `${(s.count / leads.length) * 100}%` : '0%',
                      }} />
                    </div>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, fontWeight: 600, minWidth: 20, textAlign: 'right' }}>{s.count}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Top leads */}
            <div style={{ background: C.surface, borderRadius: 8, padding: '20px', border: `1px solid ${C.border}` }}>
              <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>🏆 Top Leads Engagés</h3>
              {leads.filter(l => l.score >= 60).sort((a, b) => b.score - a.score).slice(0, 8).map((lead, i) => (
                <div key={lead.id} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '8px 0', borderBottom: i < 7 ? `1px solid ${C.border}` : 'none',
                }}>
                  <div>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{lead.name}</span>
                    <span style={{ fontSize: 11, color: C.tx3, marginLeft: 6 }}>{lead.sector}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{
                      fontSize: 11, fontWeight: 600, padding: '2px 6px', borderRadius: 3,
                      background: lead.score >= 80 ? '#fef2f2' : '#fff7ed',
                      color: lead.score >= 80 ? C.red : C.amber,
                    }}>{lead.score}</span>
                    {lead.emailOpened && <span style={{ fontSize: 10 }}>👁️</span>}
                    {lead.emailClicked && <span style={{ fontSize: 10 }}>🔗</span>}
                  </div>
                </div>
              ))}
              {leads.filter(l => l.score >= 60).length === 0 && (
                <p style={{ color: C.tx3, fontSize: 13, textAlign: 'center', padding: 20 }}>Scorez vos leads pour voir les top leads</p>
              )}
            </div>
          </div>

          {/* Conversions */}
          <div style={{ background: C.surface, borderRadius: 8, padding: '20px', border: `1px solid ${C.border}`, marginTop: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>💰 Ventes & Conversions</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 16 }}>
              <div style={{ padding: '16px', background: C.bg, borderRadius: 6, textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 700, fontFamily: "'Fraunces', serif", color: C.green }}>{leads.filter(l => l.stage === 'converted').length}</div>
                <div style={{ fontSize: 12, color: C.tx3 }}>Clients convertis</div>
              </div>
              <div style={{ padding: '16px', background: C.bg, borderRadius: 6, textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 700, fontFamily: "'Fraunces', serif", color: C.blue }}>{totalRevenue.toLocaleString()}€</div>
                <div style={{ fontSize: 12, color: C.tx3 }}>CA Total</div>
              </div>
              <div style={{ padding: '16px', background: C.bg, borderRadius: 6, textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 700, fontFamily: "'Fraunces', serif", color: C.amber }}>
                  {leads.filter(l => l.stage === 'converted').length > 0 ? Math.round(totalRevenue / leads.filter(l => l.stage === 'converted').length) : 0}€
                </div>
                <div style={{ fontSize: 12, color: C.tx3 }}>CA Moyen / Lead</div>
              </div>
            </div>
            {leads.filter(l => l.stage === 'converted' && l.revenue > 0).length > 0 && (
              <div>
                <h4 style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, color: C.tx2 }}>Détail des ventes</h4>
                {leads.filter(l => l.stage === 'converted' && l.revenue > 0).map(l => (
                  <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: `1px solid ${C.border}`, fontSize: 13 }}>
                    <span>{l.name}</span>
                    <span style={{ fontWeight: 600, fontFamily: "'DM Mono', monospace", color: C.green }}>{l.revenue.toLocaleString()}€</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
