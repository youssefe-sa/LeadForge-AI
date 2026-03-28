import { useState, useRef, useCallback } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { Lead, mapColumns, exportLeadsCSV } from '../lib/store';

const C = {
  bg: '#F7F6F2', surface: '#FFFFFF', surface2: '#F2F1EC',
  border: '#E4E2DA', tx: '#1C1B18', tx2: '#5C5A53', tx3: '#9B9890',
  accent: '#D4500A', accent2: '#F0E8DF',
  green: '#1A7A4A', blue: '#1A4FA0', amber: '#B45309', red: '#C0392B',
};

const tempColors: Record<string, { bg: string; text: string; label: string }> = {
  very_hot: { bg: '#fef2f2', text: C.red, label: 'Très Chaud' },
  hot: { bg: '#fff7ed', text: C.amber, label: 'Chaud' },
  warm: { bg: '#fffbeb', text: '#92400e', label: 'Tiède' },
  cold: { bg: '#f0f4f8', text: '#64748b', label: 'Froid' },
  '': { bg: C.surface2, text: C.tx3, label: 'Non scoré' },
};

const stageLabels: Record<string, string> = {
  new: 'Nouveau', enriched: 'Enrichi', site_generated: 'Site Généré',
  email_sent: 'Email Envoyé', interested: 'Intéressé', converted: 'Converti', lost: 'Perdu',
};

const allTags = ['Sans site', 'Site obsolète', 'Prioritaire', 'Déjà contacté', 'Email'];

interface Props {
  leads: Lead[];
  addLeads: (leads: Partial<Lead>[]) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  deleteLeads: (ids: string[]) => void;
}

export default function Dashboard({ leads, addLeads, updateLead, deleteLeads }: Props) {
  const [search, setSearch] = useState('');
  const [filterTemp, setFilterTemp] = useState('');
  const [filterTag, setFilterTag] = useState('');
  const [filterSector, setFilterSector] = useState('');
  const [sortField, setSortField] = useState<keyof Lead>('createdAt');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [panelLeadId, setPanelLeadId] = useState<string | null>(null);
  const [panelMode, setPanelMode] = useState<'view' | 'edit'>('view');
  const [editData, setEditData] = useState<Lead | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [importing, setImporting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const perPage = 25;

  // Always get fresh lead data from leads array
  const panelLead = panelLeadId ? leads.find(l => l.id === panelLeadId) || null : null;

  // --- FILE PARSING ---
  const parseFile = useCallback((file: File) => {
    setImporting(true);
    const ext = file.name.split('.').pop()?.toLowerCase();

    if (ext === 'csv' || ext === 'txt') {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const headers = results.meta.fields || [];
          const mapping = mapColumns(headers);
          const parsed: Partial<Lead>[] = results.data.map((row: unknown) => {
            const r = row as Record<string, string>;
            return {
              name: r[mapping.name] || '',
              email: r[mapping.email] || '',
              phone: r[mapping.phone] || '',
              sector: r[mapping.sector] || '',
              city: r[mapping.city] || '',
              address: r[mapping.address] || '',
              website: r[mapping.website] || '',
              googleMapsUrl: r[mapping.googleMapsUrl] || '',
              googleRating: parseFloat(r[mapping.googleRating]) || 0,
              googleReviews: parseInt(r[mapping.googleReviews]) || 0,
            };
          }).filter((l: Partial<Lead>) => l.name || l.email);
          addLeads(parsed);
          setImporting(false);
        },
        error: () => { setImporting(false); alert('Erreur de parsing CSV'); },
      });
    } else if (ext === 'xlsx' || ext === 'xls') {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const wb = XLSX.read(e.target?.result, { type: 'binary' });
          const ws = wb.Sheets[wb.SheetNames[0]];
          const data: Record<string, string>[] = XLSX.utils.sheet_to_json(ws, { defval: '' });
          if (data.length === 0) { setImporting(false); return; }
          const headers = Object.keys(data[0]);
          const mapping = mapColumns(headers);
          const parsed: Partial<Lead>[] = data.map(r => ({
            name: r[mapping.name] || '',
            email: r[mapping.email] || '',
            phone: r[mapping.phone] || '',
            sector: r[mapping.sector] || '',
            city: r[mapping.city] || '',
            address: r[mapping.address] || '',
            website: r[mapping.website] || '',
            googleMapsUrl: r[mapping.googleMapsUrl] || '',
            googleRating: parseFloat(r[mapping.googleRating]) || 0,
            googleReviews: parseInt(r[mapping.googleReviews]) || 0,
          })).filter(l => l.name || l.email);
          addLeads(parsed);
        } catch { alert('Erreur de parsing Excel'); }
        setImporting(false);
      };
      reader.readAsBinaryString(file);
    } else {
      alert('Format non supporté. Utilisez CSV, TXT, XLS ou XLSX.');
      setImporting(false);
    }
  }, [addLeads]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) parseFile(file);
  }, [parseFile]);

  // --- FILTERING & SORTING ---
  let filtered = leads.filter(l => {
    if (search) {
      const s = search.toLowerCase();
      if (!l.name.toLowerCase().includes(s) && !l.email.toLowerCase().includes(s) && !l.city.toLowerCase().includes(s) && !l.sector.toLowerCase().includes(s)) return false;
    }
    if (filterTemp && l.temperature !== filterTemp) return false;
    if (filterTag) {
      if (filterTag === 'Email') {
        // Filtre spécial pour "Email" : cherche les leads qui ont un email
        if (!l.email || l.email.trim() === '') return false;
      } else {
        // Filtre normal pour les autres tags
        if (!l.tags.includes(filterTag)) return false;
      }
    }
    if (filterSector && l.sector !== filterSector) return false;
    return true;
  });

  filtered.sort((a, b) => {
    const av = a[sortField] ?? '';
    const bv = b[sortField] ?? '';
    if (typeof av === 'number' && typeof bv === 'number') return sortDir === 'asc' ? av - bv : bv - av;
    return sortDir === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const pageLeads = filtered.slice(page * perPage, (page + 1) * perPage);
  const sectors = [...new Set(leads.map(l => l.sector).filter(Boolean))];

  const stats = {
    total: leads.length,
    noSite: leads.filter(l => !l.website || l.tags.includes('Sans site')).length,
    avgScore: leads.length > 0 ? Math.round(leads.reduce((s, l) => s + l.score, 0) / leads.length) : 0,
    veryHot: leads.filter(l => l.temperature === 'very_hot').length,
  };

  // --- CALCUL INTÉLLIGENT DES COMPTEURS DE FILTRES ---
  const getFilterCount = (filterType: string, filterValue: string) => {
    if (!filterValue) return 0;
    
    return leads.filter(lead => {
      switch (filterType) {
        case 'temp':
          return lead.temperature === filterValue;
        case 'tag':
          if (filterValue === 'Email') {
            return lead.email && lead.email.trim() !== '';
          }
          return lead.tags.includes(filterValue);
        case 'sector':
          return lead.sector === filterValue;
        case 'search':
          const s = filterValue.toLowerCase();
          return lead.name.toLowerCase().includes(s) || 
                 lead.email.toLowerCase().includes(s) || 
                 lead.city.toLowerCase().includes(s) || 
                 lead.sector.toLowerCase().includes(s);
        default:
          return false;
      }
    }).length;
  };

  // Calcul des compteurs pour les filtres actifs
  const activeFilters = [];
  if (search) activeFilters.push({ type: 'search', value: search, label: `Recherche: "${search}"` });
  if (filterTemp) activeFilters.push({ type: 'temp', value: filterTemp, label: `Temp: ${tempColors[filterTemp]?.label || filterTemp}` });
  if (filterTag) activeFilters.push({ type: 'tag', value: filterTag, label: `Tag: ${filterTag}` });
  if (filterSector) activeFilters.push({ type: 'sector', value: filterSector, label: `Secteur: ${filterSector}` });

  // Calcul intelligent: si plusieurs filtres, montrer le résultat combiné
  const getCombinedFilterText = () => {
    if (activeFilters.length === 0) return '';
    if (activeFilters.length === 1) return `${filtered.length} résultat${filtered.length > 1 ? 's' : ''}`;
    
    const filterLabels = activeFilters.map(f => f.label).join(' + ');
    return `${filtered.length} résultat${filtered.length > 1 ? 's' : ''} pour ${filterLabels}`;
  };

  const handleSort = (field: keyof Lead) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('asc'); }
  };

  const toggleSelect = (id: string) => {
    setSelected(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };
  const toggleAll = () => {
    if (selected.size === pageLeads.length) setSelected(new Set());
    else setSelected(new Set(pageLeads.map(l => l.id)));
  };

  const openPanel = (lead: Lead, mode: 'view' | 'edit') => {
    setPanelLeadId(lead.id);
    setPanelMode(mode);
    if (mode === 'edit') setEditData({ ...lead });
  };

  const closePanel = () => {
    setPanelLeadId(null);
    setPanelMode('view');
    setEditData(null);
  };

  const saveEdit = () => {
    if (editData) {
      updateLead(editData.id, editData);
      setPanelMode('view');
      setEditData(null);
    }
  };

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
            Lead Dashboard
          </h1>
          <p style={{ color: C.tx3, fontSize: 14 }}>Importez, filtrez et gérez tous vos leads B2B — cliquez sur un lead pour voir ses détails</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {selected.size > 0 && (
            <button onClick={() => { deleteLeads([...selected]); setSelected(new Set()); }} style={{
              padding: '9px 16px', borderRadius: 6, border: `1px solid ${C.red}`, background: '#fff',
              color: C.red, fontSize: 13, fontWeight: 500, cursor: 'pointer',
            }}>Supprimer ({selected.size})</button>
          )}
          <button onClick={() => exportLeadsCSV(filtered)} style={{
            padding: '9px 16px', borderRadius: 6, border: `1px solid ${C.border}`, background: '#fff',
            color: C.tx2, fontSize: 13, fontWeight: 500, cursor: 'pointer',
          }}>↓ Exporter CSV</button>
          <button onClick={() => fileRef.current?.click()} style={{
            padding: '9px 18px', borderRadius: 6, border: 'none', background: C.accent,
            color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}>+ Importer</button>
          <input ref={fileRef} type="file" accept=".csv,.xlsx,.xls,.txt" style={{ display: 'none' }}
            onChange={e => { const f = e.target.files?.[0]; if (f) parseFile(f); e.target.value = ''; }} />
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Leads', value: stats.total, color: C.accent },
          { label: 'Sans Site Web', value: stats.noSite, color: C.blue },
          { label: 'Score Moyen', value: stats.avgScore, color: C.green },
          { label: 'Très Chauds', value: stats.veryHot, color: C.red },
        ].map((s, i) => (
          <div key={i} style={{
            background: C.surface, borderRadius: 8, padding: '20px 22px',
            borderLeft: `3px solid ${s.color}`,
            boxShadow: '0 1px 3px rgba(28,27,24,0.06)',
          }}>
            <div style={{ fontSize: 12, color: C.tx3, fontWeight: 500, marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 32, fontWeight: 700, fontFamily: "'Fraunces', serif", color: C.tx }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Import zone */}
      {leads.length === 0 && (
        <div
          onDragOver={e => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          style={{
            border: `2px dashed ${isDragOver ? C.accent : C.border}`,
            borderRadius: 12, padding: '60px 40px', textAlign: 'center',
            background: isDragOver ? C.accent2 : C.surface,
            transition: 'all 200ms', cursor: 'pointer', marginBottom: 24,
          }}
          onClick={() => fileRef.current?.click()}
        >
          {importing ? (
            <div style={{ color: C.accent }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>⚙️</div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>Import en cours...</div>
            </div>
          ) : (
            <>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📂</div>
              <div style={{ fontSize: 18, fontWeight: 600, color: C.tx, marginBottom: 8 }}>
                Glissez-déposez votre fichier de leads ici
              </div>
              <div style={{ fontSize: 14, color: C.tx3, marginBottom: 16 }}>
                CSV, Excel (.xlsx), TXT — Parsing intelligent des colonnes
              </div>
              <div style={{
                display: 'inline-block', padding: '10px 24px', borderRadius: 6,
                background: C.accent, color: '#fff', fontWeight: 600, fontSize: 14,
              }}>Choisir un fichier</div>
            </>
          )}
        </div>
      )}

      {/* Filters & Table */}
      {leads.length > 0 && (
        <>
          <div
            onDragOver={e => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            style={{
              border: `1px dashed ${isDragOver ? C.accent : C.border}`,
              borderRadius: 8, padding: '12px 16px', textAlign: 'center',
              background: isDragOver ? C.accent2 : C.surface2,
              transition: 'all 200ms', cursor: 'pointer', marginBottom: 16,
              fontSize: 13, color: C.tx3,
            }}
            onClick={() => fileRef.current?.click()}
          >
            📂 Glissez un fichier ici pour ajouter des leads — ou cliquez pour parcourir
          </div>

          <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
            <input
              value={search} onChange={e => { setSearch(e.target.value); setPage(0); }}
              placeholder="🔍 Rechercher par nom, email, ville, secteur..."
              style={{
                flex: 1, minWidth: 250, padding: '9px 14px', borderRadius: 6, fontSize: 13,
                border: `1px solid ${C.border}`, background: C.surface, outline: 'none',
                fontFamily: "'Bricolage Grotesque', sans-serif",
              }}
            />
            <select value={filterTemp} onChange={e => { setFilterTemp(e.target.value); setPage(0); }}
              style={{ padding: '9px 12px', borderRadius: 6, border: `1px solid ${C.border}`, background: C.surface, fontSize: 13, cursor: 'pointer', fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              <option value="">Toutes températures</option>
              <option value="very_hot">🔴 Très Chaud ({getFilterCount('temp', 'very_hot')})</option>
              <option value="hot">🟠 Chaud ({getFilterCount('temp', 'hot')})</option>
              <option value="warm">🟡 Tiède ({getFilterCount('temp', 'warm')})</option>
              <option value="cold">⚪ Froid ({getFilterCount('temp', 'cold')})</option>
            </select>
            <select value={filterTag} onChange={e => { setFilterTag(e.target.value); setPage(0); }}
              style={{ padding: '9px 12px', borderRadius: 6, border: `1px solid ${C.border}`, background: C.surface, fontSize: 13, cursor: 'pointer', fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              <option value="">Tous tags</option>
              {allTags.map(t => <option key={t} value={t}>{t} ({getFilterCount('tag', t)})</option>)}
            </select>
            <select value={filterSector} onChange={e => { setFilterSector(e.target.value); setPage(0); }}
              style={{ padding: '9px 12px', borderRadius: 6, border: `1px solid ${C.border}`, background: C.surface, fontSize: 13, cursor: 'pointer', fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              <option value="">Tous secteurs</option>
              {sectors.map(s => <option key={s} value={s}>{s} ({getFilterCount('sector', s)})</option>)}
            </select>
          </div>

          {/* Affichage intelligent des résultats */}
          {getCombinedFilterText() && (
            <div style={{
              background: C.accent2, borderRadius: 8, padding: '12px 16px', marginBottom: 16,
              border: `1px solid ${C.accent}`, fontSize: 13, color: C.accent,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span style={{ fontWeight: 600 }}>
                📊 {getCombinedFilterText()}
              </span>
              <span style={{ color: C.tx3, fontSize: 12 }}>
                sur {leads.length} lead{leads.length > 1 ? 's' : ''} total
              </span>
            </div>
          )}

          {/* Table */}
          <div style={{ background: C.surface, borderRadius: 8, border: `1px solid ${C.border}`, overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: C.surface2 }}>
                    <th style={{ padding: '10px 12px', textAlign: 'left', width: 40 }}>
                      <input type="checkbox" checked={selected.size === pageLeads.length && pageLeads.length > 0}
                        onChange={toggleAll} style={{ accentColor: C.accent }} />
                    </th>
                    {[
                      { field: 'name' as keyof Lead, label: 'Nom' },
                      { field: 'email' as keyof Lead, label: 'Email' },
                      { field: 'phone' as keyof Lead, label: 'Téléphone' },
                      { field: 'sector' as keyof Lead, label: 'Secteur' },
                      { field: 'city' as keyof Lead, label: 'Ville' },
                      { field: 'score' as keyof Lead, label: 'Score' },
                      { field: 'temperature' as keyof Lead, label: 'Statut' },
                      { field: 'stage' as keyof Lead, label: 'Étape' },
                    ].map(col => (
                      <th key={col.field} onClick={() => handleSort(col.field)} style={{
                        padding: '10px 12px', textAlign: 'left', cursor: 'pointer',
                        fontWeight: 600, color: C.tx2, fontSize: 11, textTransform: 'uppercase',
                        letterSpacing: '0.5px', whiteSpace: 'nowrap', userSelect: 'none',
                      }}>
                        {col.label} {sortField === col.field ? (sortDir === 'asc' ? '↑' : '↓') : ''}
                      </th>
                    ))}
                    <th style={{ padding: '10px 12px', width: 80 }}></th>
                  </tr>
                </thead>
                <tbody>
                  {pageLeads.map((lead, i) => (
                    <tr key={lead.id} style={{
                      borderTop: `1px solid ${C.border}`,
                      background: i % 2 === 0 ? C.surface : C.surface2,
                      cursor: 'pointer',
                      transition: 'background 150ms',
                    }}
                    onClick={() => openPanel(lead, 'view')}
                    onMouseEnter={e => (e.currentTarget.style.background = C.accent2)}
                    onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? C.surface : C.surface2)}
                    >
                      <td style={{ padding: '10px 12px' }} onClick={e => e.stopPropagation()}>
                        <input type="checkbox" checked={selected.has(lead.id)}
                          onChange={() => toggleSelect(lead.id)} style={{ accentColor: C.accent }} />
                      </td>
                      <td style={{ padding: '10px 12px', fontWeight: 500, color: C.tx, maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {lead.name || '—'}
                        {lead.tags.length > 0 && (
                          <div style={{ display: 'flex', gap: 4, marginTop: 3 }}>
                            {lead.tags.slice(0, 2).map(t => (
                              <span key={t} style={{
                                fontSize: 10, padding: '1px 6px', borderRadius: 3,
                                background: t === 'Sans site' ? '#dbeafe' : t === 'Prioritaire' ? '#fef3c7' : C.surface2,
                                color: t === 'Sans site' ? C.blue : t === 'Prioritaire' ? C.amber : C.tx3,
                                fontWeight: 600,
                              }}>{t}</span>
                            ))}
                          </div>
                        )}
                      </td>
                      <td style={{ padding: '10px 12px', fontFamily: "'DM Mono', monospace", fontSize: 12, color: C.tx2 }}>{lead.email || '—'}</td>
                      <td style={{ padding: '10px 12px', fontFamily: "'DM Mono', monospace", fontSize: 12, color: C.tx2 }}>{lead.phone || '—'}</td>
                      <td style={{ padding: '10px 12px', color: C.tx2 }}>{lead.sector || '—'}</td>
                      <td style={{ padding: '10px 12px', color: C.tx2 }}>{lead.city || '—'}</td>
                      <td style={{ padding: '10px 12px' }}>
                        {lead.score > 0 ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ width: 50, height: 4, borderRadius: 2, background: C.surface2, overflow: 'hidden' }}>
                              <div className="animate-grow" style={{
                                height: '100%', borderRadius: 2,
                                width: `${lead.score}%`,
                                background: lead.score >= 80 ? C.green : lead.score >= 60 ? C.amber : C.tx3,
                              }} />
                            </div>
                            <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500, fontSize: 12 }}>{lead.score}</span>
                          </div>
                        ) : <span style={{ color: C.tx3 }}>—</span>}
                      </td>
                      <td style={{ padding: '10px 12px' }}>
                        {lead.temperature ? (
                          <span style={{
                            fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 3,
                            background: tempColors[lead.temperature]?.bg, color: tempColors[lead.temperature]?.text,
                          }}>{tempColors[lead.temperature]?.label}</span>
                        ) : <span style={{ color: C.tx3 }}>—</span>}
                      </td>
                      <td style={{ padding: '10px 12px' }}>
                        <span style={{ fontSize: 11, color: C.tx3 }}>
                          {stageLabels[lead.stage] || lead.stage}
                        </span>
                      </td>
                      <td style={{ padding: '10px 12px' }} onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', gap: 4 }}>
                          <button onClick={() => openPanel(lead, 'view')} style={{
                            padding: '4px 8px', borderRadius: 4, border: `1px solid ${C.border}`,
                            background: C.surface, fontSize: 12, cursor: 'pointer', color: C.blue,
                          }}>👁️</button>
                          <button onClick={() => openPanel(lead, 'edit')} style={{
                            padding: '4px 8px', borderRadius: 4, border: `1px solid ${C.border}`,
                            background: C.surface, fontSize: 12, cursor: 'pointer', color: C.tx2,
                          }}>✏️</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {pageLeads.length === 0 && (
                    <tr><td colSpan={10} style={{ padding: 40, textAlign: 'center', color: C.tx3 }}>
                      {leads.length > 0 ? 'Aucun lead ne correspond aux filtres' : 'Aucun lead importé'}
                    </td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '12px 16px', borderTop: `1px solid ${C.border}`, fontSize: 13,
              }}>
                <span style={{ color: C.tx3 }}>{filtered.length} résultat(s) — Page {page + 1}/{totalPages}</span>
                <div style={{ display: 'flex', gap: 4 }}>
                  <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
                    style={{ padding: '6px 12px', borderRadius: 4, border: `1px solid ${C.border}`, background: C.surface, cursor: page === 0 ? 'default' : 'pointer', opacity: page === 0 ? 0.4 : 1, fontSize: 13 }}>← Préc</button>
                  <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}
                    style={{ padding: '6px 12px', borderRadius: 4, border: `1px solid ${C.border}`, background: C.surface, cursor: page >= totalPages - 1 ? 'default' : 'pointer', opacity: page >= totalPages - 1 ? 0.4 : 1, fontSize: 13 }}>Suiv →</button>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* ============================== */}
      {/* DETAIL / EDIT SLIDE PANEL      */}
      {/* ============================== */}
      {panelLead && (
        <>
          {/* Overlay */}
          <div onClick={closePanel} style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.25)', zIndex: 99,
          }} />

          {/* Panel */}
          <div style={{
            position: 'fixed', top: 0, right: 0, bottom: 0, width: 560,
            background: C.surface, boxShadow: '-6px 0 30px rgba(0,0,0,0.15)',
            zIndex: 100, overflowY: 'auto', fontFamily: "'Bricolage Grotesque', sans-serif",
          }}>
            {/* Panel Header */}
            <div style={{
              padding: '24px 28px 16px', borderBottom: `1px solid ${C.border}`,
              background: C.bg, position: 'sticky', top: 0, zIndex: 2,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 700, color: C.tx, marginBottom: 6 }}>
                    {panelLead.name || 'Lead sans nom'}
                  </h2>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {panelLead.temperature && (
                      <span style={{
                        fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 4,
                        background: tempColors[panelLead.temperature]?.bg,
                        color: tempColors[panelLead.temperature]?.text,
                      }}>{tempColors[panelLead.temperature]?.label}</span>
                    )}
                    <span style={{
                      fontSize: 11, fontWeight: 500, padding: '3px 10px', borderRadius: 4,
                      background: C.surface2, color: C.tx2,
                    }}>{stageLabels[panelLead.stage]}</span>
                    {panelLead.tags.map(tag => (
                      <span key={tag} style={{
                        fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 3,
                        background: tag === 'Sans site' ? '#dbeafe' : tag === 'Prioritaire' ? '#fef3c7' : C.surface2,
                        color: tag === 'Sans site' ? C.blue : tag === 'Prioritaire' ? C.amber : C.tx3,
                      }}>{tag}</span>
                    ))}
                  </div>
                </div>
                <button onClick={closePanel} style={{
                  width: 34, height: 34, borderRadius: 6, border: `1px solid ${C.border}`,
                  background: C.surface, fontSize: 16, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>✕</button>
              </div>
              {/* Mode toggle */}
              <div style={{ display: 'flex', gap: 6 }}>
                <button onClick={() => { setPanelMode('view'); setEditData(null); }} style={{
                  padding: '6px 14px', borderRadius: 5, fontSize: 12, fontWeight: 500, cursor: 'pointer',
                  border: `1px solid ${panelMode === 'view' ? C.accent : C.border}`,
                  background: panelMode === 'view' ? C.accent2 : C.surface,
                  color: panelMode === 'view' ? C.accent : C.tx2,
                }}>👁️ Voir les détails</button>
                <button onClick={() => { setPanelMode('edit'); setEditData({ ...panelLead }); }} style={{
                  padding: '6px 14px', borderRadius: 5, fontSize: 12, fontWeight: 500, cursor: 'pointer',
                  border: `1px solid ${panelMode === 'edit' ? C.accent : C.border}`,
                  background: panelMode === 'edit' ? C.accent2 : C.surface,
                  color: panelMode === 'edit' ? C.accent : C.tx2,
                }}>✏️ Modifier</button>
              </div>
            </div>

            <div style={{ padding: '24px 28px' }}>
              {/* ======= VIEW MODE ======= */}
              {panelMode === 'view' && (
                <>
                  {/* Score overview */}
                  {panelLead.score > 0 && (
                    <div style={{
                      background: `linear-gradient(135deg, ${panelLead.score >= 80 ? '#f0fdf4' : panelLead.score >= 60 ? '#fffbeb' : '#f8fafc'}, ${C.surface})`,
                      borderRadius: 10, padding: '20px', marginBottom: 24,
                      border: `1px solid ${panelLead.score >= 80 ? '#bbf7d0' : panelLead.score >= 60 ? '#fed7aa' : C.border}`,
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{
                          width: 70, height: 70, borderRadius: '50%',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
                          background: C.surface,
                          border: `3px solid ${panelLead.score >= 80 ? C.green : panelLead.score >= 60 ? C.amber : C.tx3}`,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        }}>
                          <span style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 700, color: panelLead.score >= 80 ? C.green : panelLead.score >= 60 ? C.amber : C.tx, lineHeight: 1 }}>
                            {panelLead.score}
                          </span>
                          <span style={{ fontSize: 9, color: C.tx3, fontWeight: 500 }}>/100</span>
                        </div>
                        <div>
                          <div style={{ fontSize: 15, fontWeight: 600, color: C.tx, marginBottom: 3 }}>Score de Qualité</div>
                          <div style={{ fontSize: 12, color: C.tx2 }}>
                            {panelLead.score >= 80 ? '🔥 Lead à fort potentiel — prioriser le contact' : panelLead.score >= 60 ? '👍 Bon potentiel — à contacter rapidement' : panelLead.score >= 40 ? '📊 Potentiel moyen' : '❄️ Faible potentiel'}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Contact info — ALL FIELDS */}
                  <div style={{ marginBottom: 24 }}>
                    <h3 style={{ fontSize: 13, fontWeight: 600, color: C.tx, marginBottom: 12 }}>📇 Informations de Contact</h3>
                    <div style={{ background: C.bg, borderRadius: 8, border: `1px solid ${C.border}`, overflow: 'hidden' }}>
                      {[
                        { icon: '🏢', label: 'Nom', value: panelLead.name || '' },
                        { icon: '✉️', label: 'Email', value: panelLead.email || '', mono: true, copy: true },
                        { icon: '📞', label: 'Téléphone', value: panelLead.phone || '', mono: true, copy: true },
                        { icon: '📍', label: 'Adresse', value: panelLead.address || '' },
                        { icon: '🏙️', label: 'Ville', value: panelLead.city || '' },
                        { icon: '📁', label: 'Secteur', value: panelLead.sector || panelLead.serperType || '' },
                        { icon: '🌐', label: 'Site Web', value: panelLead.website || '', mono: true, link: true },
                        { icon: '🗺️', label: 'Google Maps', value: panelLead.googleMapsUrl || '', mono: true, link: true },
                        { icon: '⏰', label: 'Horaires', value: panelLead.hours || panelLead.serperHours || '' },
                      ].map((item, i) => (
                        <div key={i} style={{
                          display: 'grid', gridTemplateColumns: '120px 1fr',
                          padding: '10px 16px', borderBottom: i < 8 ? `1px solid ${C.border}` : 'none',
                          alignItems: 'center',
                        }}>
                          <span style={{ fontSize: 12, color: C.tx3, fontWeight: 500 }}>{item.icon} {item.label}</span>
                          {item.value ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              {item.link && typeof item.value === 'string' && item.value.startsWith('http') ? (
                                <a href={item.value} target="_blank" rel="noopener noreferrer" style={{
                                  fontSize: item.mono ? 11 : 13, color: C.blue, textDecoration: 'none',
                                  fontFamily: item.mono ? "'DM Mono', monospace" : "'Bricolage Grotesque', sans-serif",
                                  wordBreak: 'break-all' as const,
                                }}>{item.value} ↗</a>
                              ) : (
                                <span style={{
                                  fontSize: item.mono ? 12 : 13, color: C.tx,
                                  fontFamily: item.mono ? "'DM Mono', monospace" : "'Bricolage Grotesque', sans-serif",
                                }}>{item.value}</span>
                              )}
                              {item.copy && (
                                <button onClick={() => navigator.clipboard.writeText(String(item.value))} style={{
                                  padding: '2px 6px', borderRadius: 3, border: `1px solid ${C.border}`,
                                  background: C.surface, fontSize: 10, cursor: 'pointer', color: C.tx3, flexShrink: 0,
                                }} title="Copier">📋</button>
                              )}
                            </div>
                          ) : (
                            <span style={{ fontSize: 12, color: C.tx3, fontStyle: 'italic' }}>Non renseigné</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Google presence */}
                  <div style={{ marginBottom: 24 }}>
                    <h3 style={{ fontSize: 13, fontWeight: 600, color: C.tx, marginBottom: 12 }}>⭐ Présence Google</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      <div style={{ background: C.bg, borderRadius: 8, padding: '14px', border: `1px solid ${C.border}`, textAlign: 'center' }}>
                        <div style={{ fontSize: 26, fontWeight: 700, fontFamily: "'Fraunces', serif", color: panelLead.googleRating >= 4 ? C.green : C.tx3 }}>
                          {panelLead.googleRating > 0 ? panelLead.googleRating.toFixed(1) : '—'}
                        </div>
                        <div style={{ fontSize: 11, color: C.tx3 }}>Note Google</div>
                        {panelLead.googleRating > 0 && (
                          <div style={{ marginTop: 4, fontSize: 13 }}>
                            {'★'.repeat(Math.round(panelLead.googleRating))}{'☆'.repeat(5 - Math.round(panelLead.googleRating))}
                          </div>
                        )}
                      </div>
                      <div style={{ background: C.bg, borderRadius: 8, padding: '14px', border: `1px solid ${C.border}`, textAlign: 'center' }}>
                        <div style={{ fontSize: 26, fontWeight: 700, fontFamily: "'Fraunces', serif", color: (typeof panelLead.googleReviews === 'number' ? panelLead.googleReviews : 0) >= 20 ? C.blue : C.tx3 }}>
                          {typeof panelLead.googleReviews === 'number' && panelLead.googleReviews > 0 ? panelLead.googleReviews : '—'}
                        </div>
                        <div style={{ fontSize: 11, color: C.tx3 }}>Avis Google</div>
                      </div>
                    </div>
                  </div>

                  {/* Google Reviews */}
                  {(panelLead.googleReviewsData || []).length > 0 && (
                    <div style={{ marginBottom: 24 }}>
                      <h3 style={{ fontSize: 13, fontWeight: 600, color: C.tx, marginBottom: 12 }}>🗣️ Avis Clients ({panelLead.googleReviewsData.length})</h3>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                        {panelLead.googleReviewsData.filter(r => r && typeof r === 'object' && typeof r.text === 'string').map((review, i) => {
                          const rating = typeof review.rating === 'number' ? Math.min(5, Math.max(0, review.rating)) : 5;
                          const author = String(review.author || 'Client');
                          const text = String(review.text || '');
                          const date = String(review.date || '');
                          return (
                            <div key={i} style={{
                              background: C.bg, borderRadius: 8, padding: '12px 14px',
                              border: `1px solid ${C.border}`, borderLeft: '3px solid #f59e0b',
                            }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                <span style={{ fontSize: 11, fontWeight: 600, color: C.tx }}>{author}</span>
                                <span style={{ fontSize: 11, color: '#f59e0b' }}>{'★'.repeat(rating)}</span>
                              </div>
                              <p style={{ fontSize: 11, color: C.tx2, lineHeight: 1.5, margin: 0 }}>
                                &ldquo;{text.length > 120 ? text.substring(0, 120) + '...' : text}&rdquo;
                              </p>
                              {date && <div style={{ fontSize: 9, color: C.tx3, marginTop: 4 }}>{date}</div>}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Logo */}
                  {panelLead.logo && (
                    <div style={{ marginBottom: 24 }}>
                      <h3 style={{ fontSize: 13, fontWeight: 600, color: C.tx, marginBottom: 12 }}>🎨 Logo</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: C.bg, borderRadius: 8, padding: '14px', border: `1px solid ${C.border}` }}>
                        <img src={panelLead.logo} alt="Logo" style={{ width: 60, height: 60, borderRadius: 8, objectFit: 'cover', border: `2px solid ${C.border}` }}
                          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                        <div style={{ fontSize: 12, color: C.tx2 }}>Logo identifié via recherche web</div>
                      </div>
                    </div>
                  )}

                  {/* Description AI */}
                  <div style={{ marginBottom: 24 }}>
                    <h3 style={{ fontSize: 13, fontWeight: 600, color: C.tx, marginBottom: 12 }}>💬 Description</h3>
                    {panelLead.description ? (
                      <div style={{
                        background: C.bg, borderRadius: 8, padding: '14px 16px',
                        border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.green}`,
                        fontSize: 13, color: C.tx2, lineHeight: 1.7,
                      }}>{panelLead.description}</div>
                    ) : (
                      <div style={{
                        background: C.bg, borderRadius: 8, padding: '14px 16px',
                        border: `1px dashed ${C.border}`, fontSize: 13, color: C.tx3,
                        textAlign: 'center' as const,
                      }}>Aucune description. Enrichissez ce lead depuis l&apos;Agent 2.</div>
                    )}
                  </div>

                  {/* Serper web snippets */}
                  {panelLead.serperSnippets && panelLead.serperSnippets.length > 0 && (
                    <div style={{ marginBottom: 24 }}>
                      <h3 style={{ fontSize: 13, fontWeight: 600, color: C.tx, marginBottom: 12 }}>🔍 Infos Web (Serper)</h3>
                      <div style={{ background: C.bg, borderRadius: 8, border: `1px solid ${C.border}`, overflow: 'hidden' }}>
                        {panelLead.serperSnippets.filter((s: string) => typeof s === 'string').map((snippet: string, i: number) => (
                          <div key={i} style={{
                            padding: '10px 16px', fontSize: 12, color: C.tx2, lineHeight: 1.6,
                            borderBottom: i < panelLead.serperSnippets.length - 1 ? `1px solid ${C.border}` : 'none',
                          }}>{snippet}</div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Images — always shown */}
                  <div style={{ marginBottom: 24 }}>
                    <h3 style={{ fontSize: 13, fontWeight: 600, color: C.tx, marginBottom: 12 }}>🖼️ Images ({panelLead.images.length})</h3>
                    {panelLead.images.length > 0 ? (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                        {panelLead.images.filter(img => typeof img === 'string' && img.startsWith('http')).map((img, i) => (
                          <div key={i} style={{ borderRadius: 8, overflow: 'hidden', border: `1px solid ${C.border}`, aspectRatio: '4/3', background: C.surface2, position: 'relative' as const }}>
                            <img src={img} alt={`Image ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              referrerPolicy="no-referrer"
                              onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                            <a href={img} target="_blank" rel="noopener noreferrer" style={{
                              position: 'absolute', bottom: 4, right: 4, padding: '2px 6px',
                              background: 'rgba(0,0,0,0.6)', color: '#fff', borderRadius: 4, fontSize: 10,
                              textDecoration: 'none',
                            }}>↗</a>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{
                        background: C.bg, borderRadius: 8, padding: '20px',
                        border: `1px dashed ${C.border}`, fontSize: 13, color: C.tx3,
                        textAlign: 'center' as const,
                      }}>
                        Aucune image. Enrichissez ce lead depuis l&apos;Agent 2 pour trouver des photos.
                      </div>
                    )}
                  </div>

                  {/* Pipeline progress */}
                  <div style={{ marginBottom: 24 }}>
                    <h3 style={{ fontSize: 13, fontWeight: 600, color: C.tx, marginBottom: 12 }}>📈 Progression Pipeline</h3>
                    <div style={{ background: C.bg, borderRadius: 8, padding: '14px 16px', border: `1px solid ${C.border}` }}>
                      <div style={{ display: 'flex', gap: 4, marginBottom: 10 }}>
                        {['new', 'enriched', 'site_generated', 'email_sent', 'interested', 'converted'].map((stage, i) => {
                          const stages = ['new', 'enriched', 'site_generated', 'email_sent', 'interested', 'converted'];
                          const currentIdx = stages.indexOf(panelLead.stage);
                          return (
                            <div key={stage} style={{
                              flex: 1, height: 5, borderRadius: 3,
                              background: i <= currentIdx ? (i === currentIdx ? C.accent : C.green) : C.surface2,
                            }} />
                          );
                        })}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: C.tx3 }}>
                        <span>Nouveau</span><span>Enrichi</span><span>Site</span><span>Email</span><span>Intéressé</span><span>Converti</span>
                      </div>
                      <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                        <div style={{ fontSize: 12, color: C.tx2 }}>
                          <span style={{ color: C.tx3 }}>Site : </span>
                          <span style={{ fontWeight: 500 }}>{panelLead.siteGenerated ? '✅ Généré' : '❌ Non'}</span>
                        </div>
                        <div style={{ fontSize: 12, color: C.tx2 }}>
                          <span style={{ color: C.tx3 }}>Email : </span>
                          <span style={{ fontWeight: 500 }}>{panelLead.emailSent ? '✅ Envoyé' : '❌ Non'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  {panelLead.notes && (
                    <div style={{ marginBottom: 24 }}>
                      <h3 style={{ fontSize: 13, fontWeight: 600, color: C.tx, marginBottom: 12 }}>📝 Notes</h3>
                      <div style={{
                        background: '#fffef5', borderRadius: 8, padding: '12px 16px',
                        border: `1px solid #fde68a`, fontSize: 12, color: C.tx2,
                        lineHeight: 1.6, fontFamily: "'DM Mono', monospace",
                      }}>{panelLead.notes}</div>
                    </div>
                  )}

                  {/* Metadata */}
                  <div style={{
                    background: C.bg, borderRadius: 8, padding: '12px 16px',
                    border: `1px solid ${C.border}`, fontSize: 11, color: C.tx3, marginBottom: 20,
                  }}>
                    <div>Créé : <span style={{ fontFamily: "'DM Mono', monospace" }}>{panelLead.createdAt ? new Date(panelLead.createdAt).toLocaleString('fr-FR') : '—'}</span></div>
                    <div>Mis à jour : <span style={{ fontFamily: "'DM Mono', monospace" }}>{panelLead.updatedAt ? new Date(panelLead.updatedAt).toLocaleString('fr-FR') : '—'}</span></div>
                  </div>

                  <button onClick={() => { setPanelMode('edit'); setEditData({ ...panelLead }); }} style={{
                    width: '100%', padding: '11px 0', borderRadius: 6, border: 'none',
                    background: C.accent, color: '#fff', fontWeight: 600, fontSize: 14, cursor: 'pointer',
                  }}>✏️ Modifier ce lead</button>
                </>
              )}

              {/* ======= EDIT MODE ======= */}
              {panelMode === 'edit' && editData && (
                <>
                  {[
                    { key: 'name', label: 'Nom', type: 'text' },
                    { key: 'email', label: 'Email', type: 'email' },
                    { key: 'phone', label: 'Téléphone', type: 'text' },
                    { key: 'sector', label: 'Secteur', type: 'text' },
                    { key: 'city', label: 'Ville', type: 'text' },
                    { key: 'address', label: 'Adresse', type: 'text' },
                    { key: 'website', label: 'Site Web', type: 'text' },
                    { key: 'googleMapsUrl', label: 'URL Google Maps', type: 'text' },
                    { key: 'googleRating', label: 'Note Google', type: 'number' },
                    { key: 'googleReviews', label: 'Nombre d\'avis', type: 'number' },
                    { key: 'hours', label: 'Horaires', type: 'text' },
                    { key: 'description', label: 'Description', type: 'textarea' },
                    { key: 'notes', label: 'Notes internes', type: 'textarea' },
                  ].map(f => (
                    <div key={f.key} style={{ marginBottom: 14 }}>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: C.tx2, marginBottom: 4 }}>{f.label}</label>
                      {f.type === 'textarea' ? (
                        <textarea
                          value={String((editData as unknown as Record<string, unknown>)[f.key] || '')}
                          onChange={e => setEditData({ ...editData, [f.key]: e.target.value })}
                          rows={3}
                          style={{
                            width: '100%', padding: '8px 12px', borderRadius: 6, border: `1px solid ${C.border}`,
                            fontSize: 13, resize: 'vertical',
                            fontFamily: f.key === 'notes' ? "'DM Mono', monospace" : "'Bricolage Grotesque', sans-serif",
                            outline: 'none', background: C.bg,
                          }}
                        />
                      ) : (
                        <input
                          type={f.type}
                          value={String((editData as unknown as Record<string, unknown>)[f.key] || '')}
                          onChange={e => setEditData({ ...editData, [f.key]: f.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value })}
                          style={{
                            width: '100%', padding: '8px 12px', borderRadius: 6, border: `1px solid ${C.border}`,
                            fontSize: 13, outline: 'none', background: C.bg,
                            fontFamily: ['email', 'phone', 'googleMapsUrl'].includes(f.key) ? "'DM Mono', monospace" : "'Bricolage Grotesque', sans-serif",
                          }}
                        />
                      )}
                    </div>
                  ))}

                  {/* Tags */}
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: C.tx2, marginBottom: 6 }}>Tags</label>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {allTags.map(tag => {
                        const active = editData.tags.includes(tag);
                        return (
                          <button key={tag} onClick={() => {
                            const newTags = active ? editData.tags.filter(t => t !== tag) : [...editData.tags, tag];
                            setEditData({ ...editData, tags: newTags });
                          }} style={{
                            padding: '5px 12px', borderRadius: 4, fontSize: 12, fontWeight: 500, cursor: 'pointer',
                            border: `1px solid ${active ? C.accent : C.border}`,
                            background: active ? C.accent2 : C.surface,
                            color: active ? C.accent : C.tx2,
                          }}>{tag}</button>
                        );
                      })}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 8, marginTop: 20, paddingBottom: 20 }}>
                    <button onClick={saveEdit} style={{
                      flex: 1, padding: '11px 0', borderRadius: 6, border: 'none',
                      background: C.accent, color: '#fff', fontWeight: 600, fontSize: 14, cursor: 'pointer',
                    }}>✅ Enregistrer</button>
                    <button onClick={() => { setPanelMode('view'); setEditData(null); }} style={{
                      padding: '11px 20px', borderRadius: 6, border: `1px solid ${C.border}`,
                      background: C.surface, color: C.tx2, fontWeight: 500, fontSize: 14, cursor: 'pointer',
                    }}>Annuler</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
