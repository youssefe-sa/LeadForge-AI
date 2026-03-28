import { useState, useMemo } from 'react';
import {
  Lead, ApiConfig, calculateScore, callLLM,
  enrichWithSerper, fetchSerperReviews, extractReviewsFromSearch,
  deepSearchEmail, searchLeadImages, generateWebsitePrompt,
  searchUnsplash, searchPexels,
} from '../lib/store';

const C = {
  bg: '#F7F6F2', surface: '#FFFFFF', surface2: '#F2F1EC',
  border: '#E4E2DA', tx: '#1C1B18', tx2: '#5C5A53', tx3: '#9B9890',
  accent: '#D4500A', accent2: '#F0E8DF',
  green: '#1A7A4A', blue: '#1A4FA0', amber: '#B45309', red: '#C0392B',
};

const tempMap: Record<string, { bg: string; text: string; label: string; icon: string }> = {
  very_hot: { bg: '#fef2f2', text: C.red, label: 'Très Chaud', icon: '🔴' },
  hot: { bg: '#fff7ed', text: C.amber, label: 'Chaud', icon: '🟠' },
  warm: { bg: '#fffbeb', text: '#92400e', label: 'Tiède', icon: '🟡' },
  cold: { bg: '#f0f4f8', text: '#64748b', label: 'Froid', icon: '⚪' },
  '': { bg: C.surface2, text: C.tx3, label: 'Non scoré', icon: '⬜' },
};

const stageLabels: Record<string, string> = {
  new: 'Nouveau', enriched: 'Enrichi', site_generated: 'Site Généré',
  email_sent: 'Email Envoyé', interested: 'Intéressé', converted: 'Converti', lost: 'Perdu',
};

interface Props {
  leads: Lead[];
  updateLead: (id: string, updates: Partial<Lead>) => void;
  apiConfig: ApiConfig;
}

export default function Scorer({ leads, updateLead, apiConfig }: Props) {
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0, name: '', step: '' });
  const [logs, setLogs] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [filterView, setFilterView] = useState<'all' | 'unscored' | 'very_hot' | 'hot' | 'warm' | 'cold'>('all');
  const [filterEmail, setFilterEmail] = useState<'all' | 'with' | 'without'>('all');
  const [filterWebsite, setFilterWebsite] = useState<'all' | 'with' | 'without'>('all');
  const [currentPage, setCurrentPage] = useState(0);
  const [promptCopied, setPromptCopied] = useState(false);
  const itemsPerPage = 20;

  const selectedLead = useMemo(() => {
    if (!selectedId) return null;
    return leads.find(l => l.id === selectedId) || null;
  }, [selectedId, leads]);

  const hasLLM = !!(apiConfig.groqKey || apiConfig.geminiKey || apiConfig.openrouterKey);
  const hasSerper = !!apiConfig.serperKey;
  const hasImages = !!(apiConfig.unsplashKey || apiConfig.pexelsKey);

  // ENRICHMENT FLOW
  const enrichLead = async (lead: Lead, setStep: (s: string) => void): Promise<Partial<Lead>> => {
    const updates: Partial<Lead> = {};

    // STEP 1: Serper enrichment
    if (hasSerper) {
      setStep('🔍 Recherche Google Maps...');
      try {
        const serperUpdates = await enrichWithSerper(apiConfig.serperKey, lead);
        Object.assign(updates, serperUpdates);
      } catch { /* ignore */ }
    }

    // STEP 2: Google Reviews
    if (hasSerper) {
      setStep('⭐ Extraction des avis clients...');
      const merged = { ...lead, ...updates };
      const cid = merged.serperCid || '';
      let reviews: Lead['googleReviewsData'] = [];
      if (cid) {
        reviews = await fetchSerperReviews(apiConfig.serperKey, cid);
      }
      if (reviews.length < 3 && hasLLM) {
        const extra = await extractReviewsFromSearch(apiConfig.serperKey, merged, apiConfig);
        const existing = new Set(reviews.map(r => r.text.substring(0, 30)));
        for (const r of extra) {
          if (!existing.has(r.text.substring(0, 30))) {
            reviews.push(r);
            if (reviews.length >= 6) break;
          }
        }
      }
      if (reviews.length > 0) updates.googleReviewsData = reviews.slice(0, 6);
    }

    // STEP 3: Logo & Website Images
    if (hasSerper) {
      setStep('🖼️ Recherche logo & images du site...');
      const merged = { ...lead, ...updates };
      const imgResults = await searchLeadImages(apiConfig.serperKey, merged);
      if (imgResults.logo) updates.logo = imgResults.logo;
      if (imgResults.websiteImages.length > 0) updates.websiteImages = imgResults.websiteImages;
    }

    // STEP 4: Deep Email Search
    const currentEmail = updates.email || lead.email;
    if (!currentEmail && hasSerper) {
      setStep('✉️ Recherche email approfondie...');
      const merged = { ...lead, ...updates };
      const foundEmail = await deepSearchEmail(apiConfig.serperKey, merged, apiConfig);
      if (foundEmail) updates.email = foundEmail;
    }

    // STEP 5: Stock images fallback
    const currentImages = updates.images || lead.images || [];
    if (currentImages.length < 3 && hasImages) {
      setStep('📸 Recherche images de stock...');
      const merged = { ...lead, ...updates };
      const query = `${merged.sector || merged.name} ${merged.city || 'business'}`;
      let stockImages: string[] = [];
      if (apiConfig.unsplashKey) stockImages = await searchUnsplash(apiConfig.unsplashKey, query);
      if (stockImages.length === 0 && apiConfig.pexelsKey) stockImages = await searchPexels(apiConfig.pexelsKey, query);
      if (stockImages.length > 0) {
        updates.images = [...currentImages, ...stockImages.filter(u => !currentImages.includes(u))].slice(0, 12);
      }
    }

    // STEP 6: AI enrichment
    if (hasLLM) {
      setStep('🧠 Enrichissement IA (description, secteur)...');
      try {
        const merged = { ...lead, ...updates };
        const snippetContext = (merged.serperSnippets || []).join('\n');
        const prompt = `Analyse ce lead B2B et enrichis les données manquantes. Réponds UNIQUEMENT en JSON valide, sans markdown, sans backticks.
Lead: ${JSON.stringify({
  name: merged.name, email: merged.email, phone: merged.phone,
  sector: merged.sector, city: merged.city, address: merged.address,
  website: merged.website, googleRating: merged.googleRating,
  googleReviews: merged.googleReviews,
})}
${snippetContext ? `\nInformations web trouvées:\n${snippetContext}` : ''}

Retourne un JSON avec ces champs (laisse vide "" si tu ne peux pas deviner) :
{"sector": "secteur d'activité si absent", "description": "description professionnelle de 3-4 phrases basée sur toutes les données disponibles", "hours": "horaires estimés si pertinent", "city": "ville si absente"}`;

        const response = await callLLM(apiConfig, prompt, 'Tu es un expert en analyse de leads B2B. Réponds toujours en JSON valide uniquement.');
        if (response) {
          try {
            const cleaned = response.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
            const data = JSON.parse(cleaned);
            if (data.sector && !merged.sector) updates.sector = String(data.sector);
            if (data.description) updates.description = String(data.description);
            if (data.hours && !merged.hours) updates.hours = String(data.hours);
            if (data.city && !merged.city) updates.city = String(data.city);
          } catch {
            if (response.length > 20 && response.length < 500) {
              updates.description = response.replace(/```/g, '').replace(/json/g, '').trim();
            }
          }
        }
      } catch { /* ignore */ }
    }

    // STEP 7: Score
    setStep('📊 Calcul du score...');
    const finalLead = { ...lead, ...updates };
    const { score, temperature } = calculateScore(finalLead);
    updates.score = score;
    updates.temperature = temperature;
    updates.stage = lead.stage === 'new' ? 'enriched' : lead.stage;

    const tags = [...(lead.tags || [])];
    const hasWebsite = updates.website || lead.website;
    if (!hasWebsite && !tags.includes('Sans site')) tags.push('Sans site');
    if (hasWebsite && tags.includes('Sans site')) tags.splice(tags.indexOf('Sans site'), 1);
    updates.tags = tags;

    // STEP 8: Generate prompt
    setStep('📝 Génération du prompt de site web...');
    const promptLead = { ...lead, ...updates };
    updates.generatedPrompt = generateWebsitePrompt(promptLead);

    return updates;
  };

  const scoreAll = async () => {
    const toScore = leads.filter(l => l.stage === 'new' || l.score === 0);
    if (toScore.length === 0) { alert('Tous les leads sont déjà scorés !'); return; }
    setProcessing(true);
    setProgress({ current: 0, total: toScore.length, name: '', step: '' });
    setLogs([`🚀 Début de l'enrichissement de ${toScore.length} leads...`]);

    for (let i = 0; i < toScore.length; i++) {
      const lead = toScore[i];
      const setStep = (step: string) => setProgress({ current: i + 1, total: toScore.length, name: lead.name || lead.email, step });
      setStep('Démarrage...');
      setLogs(prev => [...prev, `⚙️ [${i + 1}/${toScore.length}] ${lead.name || lead.email}...`]);

      const updates = await enrichLead(lead, setStep);
      updateLead(lead.id, updates);

      const reviewsCount = (updates.googleReviewsData || []).length;
      const imagesCount = (updates.images || []).length;
      const t = tempMap[updates.temperature || ''];
      setLogs(prev => [...prev,
        `✅ ${lead.name}: Score ${updates.score}/100 — ${t?.label} · ${imagesCount} img · ${reviewsCount} avis${updates.logo ? ' · logo ✓' : ''}${updates.email && !lead.email ? ' · email trouvé ✓' : ''}`
      ]);

      if (i < toScore.length - 1) {
        await new Promise(r => setTimeout(r, hasSerper ? 1200 : hasLLM ? 500 : 100));
      }
    }
    setLogs(prev => [...prev, `🏁 Enrichissement terminé ! ${toScore.length} leads traités.`]);
    setProcessing(false);
  };

  const scoreFilteredLeads = async () => {
    const toScore = filteredLeads.filter(l => l.score === 0);
    if (toScore.length === 0) { 
      alert('Aucun lead non scoré dans les résultats filtrés !'); 
      return; 
    }
    setProcessing(true);
    setProgress({ current: 0, total: toScore.length, name: '', step: '' });
    setLogs([`🚀 Début de l'enrichissement de ${toScore.length} leads filtrés...`]);

    for (let i = 0; i < toScore.length; i++) {
      const lead = toScore[i];
      const setStep = (step: string) => setProgress({ current: i + 1, total: toScore.length, name: lead.name || lead.email, step });
      setStep('Démarrage...');
      setLogs(prev => [...prev, `⚙️ [${i + 1}/${toScore.length}] ${lead.name || lead.email}...`]);

      const updates = await enrichLead(lead, setStep);
      updateLead(lead.id, updates);

      const reviewsCount = (updates.googleReviewsData || []).length;
      const imagesCount = (updates.images || []).length;
      const t = tempMap[updates.temperature || ''];
      setLogs(prev => [...prev,
        `✅ ${lead.name}: Score ${updates.score}/100 — ${t?.label} · ${imagesCount} img · ${reviewsCount} avis${updates.logo ? ' · logo ✓' : ''}${updates.email && !lead.email ? ' · email trouvé ✓' : ''}`
      ]);

      if (i < toScore.length - 1) {
        await new Promise(r => setTimeout(r, hasSerper ? 1200 : hasLLM ? 500 : 100));
      }
    }
    setLogs(prev => [...prev, `🏁 Enrichissement terminé ! ${toScore.length} leads filtrés traités.`]);
    setProcessing(false);
  };

  const scoreOne = async (lead: Lead) => {
    setProcessing(true);
    const setStep = (step: string) => setProgress({ current: 1, total: 1, name: lead.name, step });
    setStep('Démarrage...');
    setLogs(prev => [...prev, `⚙️ Enrichissement: ${lead.name || lead.email}...`]);
    const updates = await enrichLead(lead, setStep);
    updateLead(lead.id, updates);
    const t = tempMap[updates.temperature || ''];
    const reviewsCount = (updates.googleReviewsData || []).length;
    setLogs(prev => [...prev, `✅ ${lead.name}: Score ${updates.score}/100 — ${t?.label} · ${reviewsCount} avis${updates.logo ? ' · logo' : ''}${updates.email && !lead.email ? ' · email trouvé' : ''}`]);
    setProcessing(false);
  };

  const regeneratePrompt = (lead: Lead) => {
    const prompt = generateWebsitePrompt(lead);
    updateLead(lead.id, { generatedPrompt: prompt });
  };

  // Filter leads
  const filteredLeads = leads.filter(l => {
    if (searchFilter) {
      const s = searchFilter.toLowerCase();
      if (!l.name.toLowerCase().includes(s) && !l.email.toLowerCase().includes(s) && !l.city.toLowerCase().includes(s) && !l.sector.toLowerCase().includes(s)) return false;
    }
    // Filtre par température
    if (filterView === 'unscored') return l.score === 0;
    if (filterView === 'very_hot') return l.temperature === 'very_hot';
    if (filterView === 'hot') return l.temperature === 'hot';
    if (filterView === 'warm') return l.temperature === 'warm';
    if (filterView === 'cold') return l.temperature === 'cold';
    
    // Filtre par email
    if (filterEmail === 'with') {
      if (!l.email || l.email.trim() === '') return false;
    }
    if (filterEmail === 'without') {
      if (l.email && l.email.trim() !== '') return false;
    }
    
    // Filtre par site web
    if (filterWebsite === 'with') {
      if (!l.website || l.website.trim() === '') return false;
    }
    if (filterWebsite === 'without') {
      if (l.website && l.website.trim() !== '') return false;
    }
    
    return true;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const paginatedLeads = filteredLeads.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Reset page when filters change
  const handleFilterChange = () => {
    setCurrentPage(0);
  };

  // Update filter handlers to reset page
  const handleSearchChange = (value: string) => {
    setSearchFilter(value);
    handleFilterChange();
  };

  const handleFilterViewChange = (value: any) => {
    setFilterView(value);
    handleFilterChange();
  };

  const handleFilterEmailChange = (value: any) => {
    setFilterEmail(value);
    handleFilterChange();
  };

  const handleFilterWebsiteChange = (value: any) => {
    setFilterWebsite(value);
    handleFilterChange();
  };

  // Stats
  const scored = leads.filter(l => l.score > 0);
  const unscored = leads.filter(l => l.score === 0);
  const byTemp = {
    very_hot: leads.filter(l => l.temperature === 'very_hot').length,
    hot: leads.filter(l => l.temperature === 'hot').length,
    warm: leads.filter(l => l.temperature === 'warm').length,
    cold: leads.filter(l => l.temperature === 'cold').length,
  };
  const sectorCounts: Record<string, number> = {};
  leads.forEach(l => { if (l.sector) sectorCounts[l.sector] = (sectorCounts[l.sector] || 0) + 1; });
  const topSectors = Object.entries(sectorCounts).sort((a, b) => b[1] - a[1]).slice(0, 8);
  const leadsWithReviews = leads.filter(l => (l.googleReviewsData || []).length > 0).length;

  // Score breakdown helper
  const getScoreBreakdown = (lead: Lead) => {
    const items: { label: string; points: number; max: number; detail: string }[] = [];
    let completeness = 0;
    const fields: string[] = [];
    if (lead.name) { completeness += 5; fields.push('Nom'); }
    if (lead.email) { completeness += 8; fields.push('Email'); }
    if (lead.phone) { completeness += 5; fields.push('Tél'); }
    if (lead.address) { completeness += 3; fields.push('Adresse'); }
    if (lead.city) { completeness += 3; fields.push('Ville'); }
    if (lead.sector) { completeness += 3; fields.push('Secteur'); }
    if (lead.description) { completeness += 3; fields.push('Description'); }
    items.push({ label: 'Complétude des données', points: completeness, max: 30, detail: fields.length > 0 ? fields.join(', ') : 'Aucune donnée' });

    let websiteScore = 0;
    if (!lead.website || lead.tags.includes('Sans site')) websiteScore = 25;
    else if (lead.tags.includes('Site obsolète')) websiteScore = 15;
    items.push({ label: 'Potentiel web', points: websiteScore, max: 25, detail: !lead.website ? 'Pas de site → fort potentiel' : 'A déjà un site' });

    let google = 0;
    if (lead.googleRating >= 4.5) google += 10; else if (lead.googleRating >= 4.0) google += 7; else if (lead.googleRating >= 3.0) google += 4;
    if (lead.googleReviews >= 50) google += 10; else if (lead.googleReviews >= 20) google += 7; else if (lead.googleReviews >= 5) google += 4;
    items.push({ label: 'Présence Google', points: google, max: 20, detail: `${lead.googleRating ? lead.googleRating + '★' : 'Pas de note'} · ${lead.googleReviews || 0} avis` });

    let sectorScore = 5;
    const highVal = ['restaurant', 'hôtel', 'hotel', 'riad', 'avocat', 'médecin', 'spa', 'clinique', 'dentiste'];
    const medVal = ['commerce', 'boutique', 'garage', 'artisan', 'boulangerie', 'coiffeur', 'salon'];
    const sl = (lead.sector || lead.name || '').toLowerCase();
    if (highVal.some(s => sl.includes(s))) sectorScore = 15;
    else if (medVal.some(s => sl.includes(s))) sectorScore = 10;
    items.push({ label: 'Valeur secteur', points: sectorScore, max: 15, detail: lead.sector || 'Non détecté' });
    items.push({ label: 'Visuels disponibles', points: lead.images.length > 0 ? 5 : 0, max: 5, detail: lead.images.length > 0 ? `${lead.images.length} image(s)` : 'Aucune' });
    items.push({ label: 'Tag prioritaire', points: lead.tags.includes('Prioritaire') ? 5 : 0, max: 5, detail: lead.tags.includes('Prioritaire') ? 'Marqué prioritaire' : 'Non prioritaire' });
    return items;
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
            Scorer & Enrichissement
          </h1>
          <p style={{ color: C.tx3, fontSize: 14 }}>
            {hasSerper ? '🔍 Serper' : ''}{hasLLM ? ' · 🧠 IA' : ''}{hasImages ? ' · 🖼️ Stock' : ''}
            {!hasSerper && !hasLLM ? ' ⚠️ Configurez Serper + LLM dans Paramètres' : ' — activés'}
          </p>
        </div>
        <button onClick={scoreAll} disabled={processing || leads.length === 0} style={{
          padding: '10px 20px', borderRadius: 6, border: 'none',
          background: processing ? C.tx3 : C.green, color: '#fff',
          fontWeight: 600, fontSize: 14, cursor: processing ? 'default' : 'pointer',
          opacity: processing ? 0.7 : 1,
        }}>
          {processing ? `⚙️ ${progress.current}/${progress.total}...` : `⚡ Enrichir tout (${unscored.length} non scorés)`}
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { label: 'Scorés', value: scored.length, color: C.green, sub: `/ ${leads.length}` },
          { label: 'Très Chauds', value: byTemp.very_hot, color: C.red, sub: '' },
          { label: 'Chauds', value: byTemp.hot, color: C.amber, sub: '' },
          { label: 'Avec Avis', value: leadsWithReviews, color: C.blue, sub: '' },
          { label: 'Score Moyen', value: scored.length > 0 ? Math.round(scored.reduce((s, l) => s + l.score, 0) / scored.length) : 0, color: C.accent, sub: '/100' },
        ].map((s, i) => (
          <div key={i} style={{
            background: C.surface, borderRadius: 8, padding: '18px 20px',
            borderLeft: `3px solid ${s.color}`, boxShadow: '0 1px 3px rgba(28,27,24,0.06)',
          }}>
            <div style={{ fontSize: 11, color: C.tx3, fontWeight: 500, marginBottom: 4 }}>{s.label}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span style={{ fontSize: 28, fontWeight: 700, fontFamily: "'Fraunces', serif", color: C.tx }}>{s.value}</span>
              <span style={{ fontSize: 13, color: C.tx3 }}>{s.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Progress */}
      {processing && (
        <div style={{ background: C.surface, borderRadius: 8, padding: '16px 20px', border: `1px solid ${C.border}`, marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 13, fontWeight: 500 }}>⚙️ {progress.name}</span>
            <span style={{ fontSize: 12, color: C.tx3, fontFamily: "'DM Mono', monospace" }}>{progress.current}/{progress.total}</span>
          </div>
          <div style={{ fontSize: 12, color: C.accent, marginBottom: 8 }}>{progress.step}</div>
          <div style={{ height: 6, borderRadius: 3, background: C.surface2, overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: 3, background: C.green,
              width: `${(progress.current / progress.total) * 100}%`,
              transition: 'width 300ms ease',
            }} />
          </div>
        </div>
      )}

      {/* Distribution charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        <div style={{ background: C.surface, borderRadius: 8, padding: '20px', border: `1px solid ${C.border}` }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Distribution par température</h3>
          {[
            { label: 'Très Chaud (80-100)', count: byTemp.very_hot, color: C.red },
            { label: 'Chaud (60-79)', count: byTemp.hot, color: C.amber },
            { label: 'Tiède (40-59)', count: byTemp.warm, color: '#d4a017' },
            { label: 'Froid (0-39)', count: byTemp.cold, color: C.tx3 },
          ].map((t, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                <span style={{ color: C.tx2 }}>{t.label}</span>
                <span style={{ fontWeight: 600, fontFamily: "'DM Mono', monospace" }}>{t.count}</span>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: C.surface2 }}>
                <div style={{
                  height: '100%', borderRadius: 3, background: t.color,
                  width: leads.length > 0 ? `${(t.count / leads.length) * 100}%` : '0%',
                  transition: 'width 600ms ease',
                }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: C.surface, borderRadius: 8, padding: '20px', border: `1px solid ${C.border}` }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Secteurs d&apos;activité</h3>
          {topSectors.length === 0 ? (
            <p style={{ color: C.tx3, fontSize: 13 }}>Aucun secteur détecté.</p>
          ) : topSectors.map(([sector, count], i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i < topSectors.length - 1 ? `1px solid ${C.border}` : 'none' }}>
              <span style={{ fontSize: 13, color: C.tx2 }}>{sector}</span>
              <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 3, background: '#dbeafe', color: C.blue, fontFamily: "'DM Mono', monospace" }}>{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Search & Filters */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 8, 
        marginBottom: 14, 
        padding: '12px 16px',
        background: C.surface2,
        borderRadius: 8,
        border: `1px solid ${C.border}`,
        flexWrap: 'nowrap',
        overflowX: 'auto'
      }}>
        <input 
          value={searchFilter} 
          onChange={e => handleSearchChange(e.target.value)}
          placeholder="🔍 Rechercher..."
          style={{ 
            flex: '0 0 200px', 
            padding: '6px 12px', 
            borderRadius: 5, 
            fontSize: 12, 
            border: `1px solid ${C.border}`, 
            background: C.surface, 
            outline: 'none', 
            fontFamily: "'Bricolage Grotesque', sans-serif",
            minWidth: 0
          }}
        />
        
        {/* Filtres Température */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 11, color: C.tx3, fontWeight: 600, marginRight: 4 }}>Temp:</span>
          {(['all', 'unscored', 'very_hot', 'hot', 'warm', 'cold'] as const).map(f => (
            <button key={f} onClick={() => handleFilterViewChange(f)} style={{
              padding: '4px 8px', 
              borderRadius: 4, 
              fontSize: 11, 
              fontWeight: 500, 
              cursor: 'pointer',
              border: `1px solid ${filterView === f ? C.accent : C.border}`,
              background: filterView === f ? C.accent2 : C.surface,
              color: filterView === f ? C.accent : C.tx2,
              whiteSpace: 'nowrap',
            }}>
              {f === 'all' ? 'Tous' : f === 'unscored' ? 'Non scorés' : tempMap[f]?.label?.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Séparateur */}
        <div style={{ width: 1, height: '20px', background: C.border }} />

        {/* Filtres Email */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 11, color: C.tx3, fontWeight: 600, marginRight: 4 }}>Email:</span>
          {(['all', 'with', 'without'] as const).map(f => (
            <button key={`email-${f}`} onClick={() => handleFilterEmailChange(f)} style={{
              padding: '4px 8px', 
              borderRadius: 4, 
              fontSize: 11, 
              fontWeight: 500, 
              cursor: 'pointer',
              border: `1px solid ${filterEmail === f ? C.blue : C.border}`,
              background: filterEmail === f ? '#dbeafe' : C.surface,
              color: filterEmail === f ? C.blue : C.tx2,
              whiteSpace: 'nowrap',
            }}>
              {f === 'all' ? 'Tous' : f === 'with' ? 'Avec' : 'Sans'}
            </button>
          ))}
        </div>

        {/* Séparateur */}
        <div style={{ width: 1, height: '20px', background: C.border }} />

        {/* Filtres Site Web */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 11, color: C.tx3, fontWeight: 600, marginRight: 4 }}>Site:</span>
          {(['all', 'with', 'without'] as const).map(f => (
            <button key={`web-${f}`} onClick={() => handleFilterWebsiteChange(f)} style={{
              padding: '4px 8px', 
              borderRadius: 4, 
              fontSize: 11, 
              fontWeight: 500, 
              cursor: 'pointer',
              border: `1px solid ${filterWebsite === f ? C.green : C.border}`,
              background: filterWebsite === f ? '#dcfce7' : C.surface,
              color: filterWebsite === f ? C.green : C.tx2,
              whiteSpace: 'nowrap',
            }}>
              {f === 'all' ? 'Tous' : f === 'with' ? 'Avec' : 'Sans'}
            </button>
          ))}
        </div>
      </div>

      {/* Results count and action - seulement si des filtres sont appliqués */}
      {(filterView !== 'all' || filterEmail !== 'all' || filterWebsite !== 'all' || searchFilter) && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: 16,
          padding: '10px 16px',
          background: C.accent2,
          borderRadius: 6,
          border: `1px solid ${C.accent}`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: C.accent }}>
              📊 {filteredLeads.length} résultat{filteredLeads.length > 1 ? 's' : ''}
            </span>
            {filteredLeads.length !== leads.length && (
              <span style={{ fontSize: 12, color: C.tx3 }}>
                sur {leads.length} lead{leads.length > 1 ? 's' : ''} total
              </span>
            )}
          </div>
          <button 
            onClick={() => scoreFilteredLeads()} 
            disabled={processing || filteredLeads.length === 0 || filteredLeads.every(l => l.score > 0)} 
            style={{
              padding: '6px 14px', 
              borderRadius: 5, 
              fontSize: 12, 
              fontWeight: 600,
              border: 'none',
              background: processing || filteredLeads.length === 0 || filteredLeads.every(l => l.score > 0) ? C.tx3 : C.green,
              color: '#fff',
              cursor: processing || filteredLeads.length === 0 || filteredLeads.every(l => l.score > 0) ? 'default' : 'pointer',
              opacity: processing || filteredLeads.length === 0 || filteredLeads.every(l => l.score > 0) ? 0.7 : 1,
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            {processing ? `⚙️ ${progress.current}/${progress.total}...` : `⚡ Enrichir ${filteredLeads.length > 0 ? filteredLeads.filter(l => l.score === 0).length : 0} non scoré${filteredLeads.filter(l => l.score === 0).length > 1 ? 's' : ''}`}
          </button>
        </div>
      )}

      {/* Leads list */}
      <div style={{ background: C.surface, borderRadius: 8, border: `1px solid ${C.border}`, overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: `1px solid ${C.border}` }}>
          <h3 style={{ fontSize: 15, fontWeight: 600 }}>
            Cliquez sur un lead pour voir tous les détails ({filteredLeads.length})
          </h3>
        </div>
        <div style={{ maxHeight: 500, overflowY: 'auto' }}>
          {paginatedLeads.length === 0 && (
            <p style={{ color: C.tx3, fontSize: 13, textAlign: 'center', padding: 40 }}>
              {filteredLeads.length > 0 ? 'Aucun lead ne correspond aux filtres' : 'Aucun lead. Importez depuis le Dashboard.'}
            </p>
          )}
          {paginatedLeads.map((lead, idx) => {
            const t = tempMap[lead.temperature || ''];
            const isActive = selectedId === lead.id;
            const reviewsCount = (lead.googleReviewsData || []).length;
            return (
              <div key={lead.id} onClick={() => setSelectedId(lead.id)} style={{
                display: 'grid', gridTemplateColumns: '1fr auto auto', alignItems: 'center', gap: 12,
                padding: '14px 20px', borderBottom: `1px solid ${C.border}`,
                background: isActive ? C.accent2 : idx % 2 === 0 ? C.surface : C.surface2,
                cursor: 'pointer', transition: 'background 150ms',
                borderLeft: isActive ? `3px solid ${C.accent}` : '3px solid transparent',
              }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#F5F3ED'; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = idx % 2 === 0 ? C.surface : C.surface2; }}
              >
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                    {lead.logo && <img src={lead.logo} alt="" style={{ width: 20, height: 20, borderRadius: 4, objectFit: 'cover' }} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />}
                    <span style={{ fontWeight: 600, fontSize: 14, color: C.tx, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {lead.name || lead.email || '—'}
                    </span>
                    {lead.temperature && (
                      <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 3, background: t.bg, color: t.text }}>{t.label}</span>
                    )}
                    {reviewsCount > 0 && (
                      <span style={{ fontSize: 10, fontWeight: 500, padding: '2px 7px', borderRadius: 3, background: '#fef3c7', color: C.amber }}>⭐ {reviewsCount} avis</span>
                    )}
                  </div>
                  <div style={{ fontSize: 12, color: C.tx3, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    {lead.sector && <span>📁 {lead.sector}</span>}
                    {lead.city && <span>📍 {lead.city}</span>}
                    {lead.email && <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11 }}>✉️ {lead.email}</span>}
                  </div>
                </div>
                {/* Score */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 100 }}>
                  {lead.score > 0 ? (
                    <>
                      <div style={{ width: 60, height: 6, borderRadius: 3, background: C.surface2, overflow: 'hidden' }}>
                        <div style={{
                          height: '100%', borderRadius: 3, width: `${lead.score}%`,
                          background: lead.score >= 80 ? C.green : lead.score >= 60 ? C.amber : C.tx3,
                        }} />
                      </div>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, fontWeight: 600, minWidth: 28, color: lead.score >= 80 ? C.green : lead.score >= 60 ? C.amber : C.tx2 }}>{lead.score}</span>
                    </>
                  ) : <span style={{ color: C.tx3, fontSize: 12 }}>—</span>}
                </div>
                <button onClick={e => { e.stopPropagation(); scoreOne(lead); }} disabled={processing} style={{
                  padding: '5px 12px', borderRadius: 5, border: `1px solid ${C.border}`,
                  background: C.surface, fontSize: 11, cursor: 'pointer', color: C.green, fontWeight: 500,
                }}>{lead.score > 0 ? '🔄 Re-enrichir' : '⚡ Enrichir'}</button>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 20px',
            borderTop: `1px solid ${C.border}`,
            fontSize: 13,
            background: C.surface2
          }}>
            <span style={{ color: C.tx3 }}>
              {filteredLeads.length} résultat{filteredLeads.length > 1 ? 's' : ''} — Page {currentPage + 1}/{totalPages}
            </span>
            <div style={{ display: 'flex', gap: 6 }}>
              <button 
                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
                style={{
                  padding: '6px 12px',
                  borderRadius: 4,
                  border: `1px solid ${C.border}`,
                  background: C.surface,
                  cursor: currentPage === 0 ? 'default' : 'pointer',
                  opacity: currentPage === 0 ? 0.4 : 1,
                  fontSize: 12
                }}
              >
                ← Préc
              </button>
              <button 
                onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                disabled={currentPage >= totalPages - 1}
                style={{
                  padding: '6px 12px',
                  borderRadius: 4,
                  border: `1px solid ${C.border}`,
                  background: C.surface,
                  cursor: currentPage >= totalPages - 1 ? 'default' : 'pointer',
                  opacity: currentPage >= totalPages - 1 ? 0.4 : 1,
                  fontSize: 12
                }}
              >
                Suiv →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Logs */}
      {logs.length > 0 && (
        <div style={{ background: C.surface, borderRadius: 8, padding: '16px 20px', border: `1px solid ${C.border}`, marginTop: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600 }}>Journal d&apos;enrichissement</h3>
            <button onClick={() => setLogs([])} style={{ padding: '3px 10px', borderRadius: 4, border: `1px solid ${C.border}`, background: C.surface, fontSize: 11, cursor: 'pointer', color: C.tx3 }}>Effacer</button>
          </div>
          <div style={{ maxHeight: 200, overflowY: 'auto', fontFamily: "'DM Mono', monospace", fontSize: 12 }}>
            {logs.map((log, i) => (
              <div key={i} style={{ padding: '3px 0', color: log.startsWith('✅') ? C.green : log.startsWith('❌') ? C.red : log.startsWith('🚀') || log.startsWith('🏁') ? C.accent : C.tx2 }}>{log}</div>
            ))}
          </div>
        </div>
      )}

      {/* ========== DETAIL PANEL ========== */}
      {selectedLead && (
        <>
          <div onClick={() => setSelectedId(null)} style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.25)', zIndex: 99,
          }} />
          <div style={{
            position: 'fixed', top: 0, right: 0, bottom: 0, width: 640,
            background: C.surface, boxShadow: '-6px 0 30px rgba(0,0,0,0.15)',
            zIndex: 100, overflowY: 'auto', fontFamily: "'Bricolage Grotesque', sans-serif",
          }}>
            {/* Header */}
            <div style={{ padding: '24px 28px 20px', borderBottom: `1px solid ${C.border}`, background: C.bg, position: 'sticky', top: 0, zIndex: 2 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  {selectedLead.logo && (
                    <img src={selectedLead.logo} alt="Logo" style={{ width: 52, height: 52, borderRadius: 10, objectFit: 'cover', border: `2px solid ${C.border}`, flexShrink: 0 }}
                      onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  )}
                  <div>
                    <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 700, color: C.tx, marginBottom: 6 }}>
                      {selectedLead.name || 'Lead sans nom'}
                    </h2>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {selectedLead.temperature && (
                        <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 4, background: tempMap[selectedLead.temperature].bg, color: tempMap[selectedLead.temperature].text }}>
                          {tempMap[selectedLead.temperature].icon} {tempMap[selectedLead.temperature].label}
                        </span>
                      )}
                      <span style={{ fontSize: 11, fontWeight: 500, padding: '3px 10px', borderRadius: 4, background: C.surface2, color: C.tx2 }}>{stageLabels[selectedLead.stage]}</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setSelectedId(null)} style={{
                  width: 34, height: 34, borderRadius: 6, border: `1px solid ${C.border}`,
                  background: C.surface, fontSize: 16, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>✕</button>
              </div>
            </div>

            <div style={{ padding: '24px 28px' }}>
              {/* Score Overview */}
              <div style={{
                background: `linear-gradient(135deg, ${selectedLead.score >= 80 ? '#f0fdf4' : selectedLead.score >= 60 ? '#fffbeb' : '#f8fafc'}, ${C.surface})`,
                borderRadius: 10, padding: '24px', marginBottom: 24,
                border: `1px solid ${selectedLead.score >= 80 ? '#bbf7d0' : selectedLead.score >= 60 ? '#fed7aa' : C.border}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  <div style={{
                    width: 80, height: 80, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
                    background: C.surface,
                    border: `3px solid ${selectedLead.score >= 80 ? C.green : selectedLead.score >= 60 ? C.amber : C.tx3}`,
                  }}>
                    <span style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 700, color: selectedLead.score >= 80 ? C.green : selectedLead.score >= 60 ? C.amber : C.tx, lineHeight: 1 }}>
                      {selectedLead.score}
                    </span>
                    <span style={{ fontSize: 9, color: C.tx3 }}>/100</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: C.tx, marginBottom: 4 }}>Score de Qualité</div>
                    <div style={{ fontSize: 13, color: C.tx2 }}>
                      {selectedLead.score >= 80 ? '🔥 Fort potentiel — prioriser' : selectedLead.score >= 60 ? '👍 Bon potentiel' : selectedLead.score >= 40 ? '📊 Potentiel moyen' : selectedLead.score > 0 ? '❄️ Faible potentiel' : '⬜ Non scoré'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Score Breakdown */}
              {selectedLead.score > 0 && (
                <div style={{ marginBottom: 28 }}>
                  <h3 style={{ fontSize: 14, fontWeight: 600, color: C.tx, marginBottom: 14 }}>📊 Détail du Score</h3>
                  <div style={{ background: C.bg, borderRadius: 8, overflow: 'hidden', border: `1px solid ${C.border}` }}>
                    {getScoreBreakdown(selectedLead).map((item, i) => (
                      <div key={i} style={{
                        padding: '12px 16px', borderBottom: i < 5 ? `1px solid ${C.border}` : 'none',
                        display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 12,
                      }}>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 500, color: C.tx, marginBottom: 3 }}>{item.label}</div>
                          <div style={{ fontSize: 11, color: C.tx3 }}>{item.detail}</div>
                          <div style={{ marginTop: 6, height: 4, borderRadius: 2, background: C.surface2, overflow: 'hidden', maxWidth: 200 }}>
                            <div style={{ height: '100%', borderRadius: 2, width: `${(item.points / item.max) * 100}%`, background: item.points >= item.max * 0.7 ? C.green : item.points >= item.max * 0.4 ? C.amber : C.tx3 }} />
                          </div>
                        </div>
                        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, fontWeight: 600, color: item.points >= item.max * 0.7 ? C.green : item.points > 0 ? C.amber : C.tx3, minWidth: 55, textAlign: 'right' as const }}>{item.points}/{item.max}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Info */}
              <div style={{ marginBottom: 28 }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: C.tx, marginBottom: 14 }}>📇 Informations de Contact</h3>
                <div style={{ background: C.bg, borderRadius: 8, border: `1px solid ${C.border}`, overflow: 'hidden' }}>
                  {[
                    { icon: '🏢', label: 'Nom', value: selectedLead.name },
                    { icon: '✉️', label: 'Email', value: selectedLead.email, mono: true, copyable: true },
                    { icon: '📞', label: 'Téléphone', value: selectedLead.phone, mono: true, copyable: true },
                    { icon: '📍', label: 'Adresse', value: selectedLead.address },
                    { icon: '🏙️', label: 'Ville', value: selectedLead.city },
                    { icon: '📁', label: 'Secteur', value: selectedLead.sector || selectedLead.serperType },
                    { icon: '🌐', label: 'Site Web', value: selectedLead.website, mono: true, link: true },
                    { icon: '🗺️', label: 'Google Maps', value: selectedLead.googleMapsUrl, mono: true, link: true },
                    { icon: '⏰', label: 'Horaires', value: selectedLead.hours || selectedLead.serperHours },
                  ].map((item, i) => (
                    <div key={i} style={{
                      display: 'grid', gridTemplateColumns: '120px 1fr',
                      padding: '11px 16px', borderBottom: i < 8 ? `1px solid ${C.border}` : 'none', alignItems: 'center',
                    }}>
                      <span style={{ fontSize: 12, color: C.tx3, fontWeight: 500 }}>{item.icon} {item.label}</span>
                      {item.value ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          {item.link && item.value.startsWith('http') ? (
                            <a href={item.value} target="_blank" rel="noopener noreferrer" style={{
                              color: C.blue, textDecoration: 'none',
                              fontFamily: item.mono ? "'DM Mono', monospace" : "'Bricolage Grotesque', sans-serif",
                              fontSize: item.mono ? 11 : 13, wordBreak: 'break-all' as const,
                            }}>{item.value} ↗</a>
                          ) : (
                            <span style={{
                              color: C.tx,
                              fontFamily: item.mono ? "'DM Mono', monospace" : "'Bricolage Grotesque', sans-serif",
                              fontSize: item.mono ? 12 : 13,
                            }}>{item.value}</span>
                          )}
                          {item.copyable && (
                            <button onClick={() => navigator.clipboard.writeText(item.value || '')} style={{
                              padding: '2px 6px', borderRadius: 3, border: `1px solid ${C.border}`,
                              background: C.surface, fontSize: 10, cursor: 'pointer', color: C.tx3,
                            }}>📋</button>
                          )}
                        </div>
                      ) : (
                        <span style={{ fontSize: 12, color: C.tx3, fontStyle: 'italic' }}>Non renseigné</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Google Presence */}
              <div style={{ marginBottom: 28 }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: C.tx, marginBottom: 14 }}>⭐ Présence Google Maps</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div style={{ background: C.bg, borderRadius: 8, padding: '16px 18px', border: `1px solid ${C.border}`, textAlign: 'center' as const }}>
                    <div style={{ fontSize: 30, fontWeight: 700, fontFamily: "'Fraunces', serif", color: selectedLead.googleRating >= 4 ? C.green : C.tx3 }}>
                      {selectedLead.googleRating > 0 ? selectedLead.googleRating.toFixed(1) : '—'}
                    </div>
                    <div style={{ fontSize: 11, color: C.tx3, marginTop: 2 }}>Note Google</div>
                    {selectedLead.googleRating > 0 && (
                      <div style={{ marginTop: 6, fontSize: 16, color: '#f59e0b' }}>
                        {'★'.repeat(Math.round(selectedLead.googleRating))}{'☆'.repeat(5 - Math.round(selectedLead.googleRating))}
                      </div>
                    )}
                  </div>
                  <div style={{ background: C.bg, borderRadius: 8, padding: '16px 18px', border: `1px solid ${C.border}`, textAlign: 'center' as const }}>
                    <div style={{ fontSize: 30, fontWeight: 700, fontFamily: "'Fraunces', serif", color: selectedLead.googleReviews >= 20 ? C.blue : C.tx3 }}>
                      {selectedLead.googleReviews > 0 ? selectedLead.googleReviews : '—'}
                    </div>
                    <div style={{ fontSize: 11, color: C.tx3, marginTop: 2 }}>Avis Google</div>
                  </div>
                </div>
                {selectedLead.serperType && (
                  <div style={{ marginTop: 10, padding: '10px 14px', borderRadius: 6, background: C.bg, border: `1px solid ${C.border}`, fontSize: 12, color: C.tx2 }}>
                    <strong>Catégorie Google :</strong> {selectedLead.serperType}
                  </div>
                )}
              </div>

              {/* Google Reviews */}
              <div style={{ marginBottom: 28 }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: C.tx, marginBottom: 14 }}>
                  🗣️ Avis Clients Google ({(selectedLead.googleReviewsData || []).length})
                </h3>
                {(selectedLead.googleReviewsData || []).length > 0 ? (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    {selectedLead.googleReviewsData.filter(r => r && typeof r.text === 'string').map((review, i) => {
                      const rating = typeof review.rating === 'number' ? Math.min(5, Math.max(0, review.rating)) : 5;
                      return (
                        <div key={i} style={{
                          background: C.bg, borderRadius: 8, padding: '14px 16px',
                          border: `1px solid ${C.border}`, borderLeft: '3px solid #f59e0b',
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                            <span style={{ fontSize: 12, fontWeight: 600, color: C.tx }}>{String(review.author || 'Client')}</span>
                            <span style={{ fontSize: 12, color: '#f59e0b' }}>{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</span>
                          </div>
                          <p style={{ fontSize: 12, color: C.tx2, lineHeight: 1.5, margin: 0 }}>
                            &ldquo;{String(review.text).length > 150 ? String(review.text).substring(0, 150) + '...' : String(review.text)}&rdquo;
                          </p>
                          {review.date && <div style={{ fontSize: 10, color: C.tx3, marginTop: 6 }}>{String(review.date)}</div>}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div style={{ background: C.bg, borderRadius: 8, padding: '20px', border: `1px dashed ${C.border}`, fontSize: 13, color: C.tx3, textAlign: 'center' as const }}>
                    Aucun avis client récupéré. {hasSerper ? 'Cliquez "Re-enrichir".' : 'Configurez Serper API.'}
                  </div>
                )}
              </div>

              {/* Description */}
              <div style={{ marginBottom: 28 }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: C.tx, marginBottom: 14 }}>💬 Description IA</h3>
                {selectedLead.description ? (
                  <div style={{
                    background: C.bg, borderRadius: 8, padding: '16px 18px',
                    border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.green}`,
                    fontSize: 13, color: C.tx2, lineHeight: 1.7,
                  }}>{selectedLead.description}</div>
                ) : (
                  <div style={{ background: C.bg, borderRadius: 8, padding: '16px', border: `1px dashed ${C.border}`, fontSize: 13, color: C.tx3, textAlign: 'center' as const }}>
                    Aucune description.
                  </div>
                )}
              </div>

              {/* Logo */}
              <div style={{ marginBottom: 28 }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: C.tx, marginBottom: 14 }}>🎨 Logo</h3>
                {selectedLead.logo ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: C.bg, borderRadius: 8, padding: '16px', border: `1px solid ${C.border}` }}>
                    <img src={selectedLead.logo} alt="Logo" style={{ width: 80, height: 80, borderRadius: 10, objectFit: 'cover', border: `2px solid ${C.border}` }}
                      onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    <div style={{ fontSize: 13, color: C.tx2 }}>Logo trouvé via recherche web</div>
                  </div>
                ) : (
                  <div style={{ background: C.bg, borderRadius: 8, padding: '16px', border: `1px dashed ${C.border}`, fontSize: 13, color: C.tx3, textAlign: 'center' as const }}>
                    Logo non identifié.
                  </div>
                )}
              </div>

              {/* Images */}
              <div style={{ marginBottom: 28 }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: C.tx, marginBottom: 14 }}>🖼️ Photos ({selectedLead.images.length})</h3>
                {selectedLead.images.length > 0 ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                    {selectedLead.images.filter(img => typeof img === 'string' && img.startsWith('http')).map((img, i) => (
                      <div key={i} style={{ borderRadius: 8, overflow: 'hidden', border: `1px solid ${C.border}`, aspectRatio: '4/3', background: C.surface2, position: 'relative' as const }}>
                        <img src={img} alt={`Image ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          referrerPolicy="no-referrer"
                          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                        <a href={img} target="_blank" rel="noopener noreferrer" style={{
                          position: 'absolute', bottom: 4, right: 4, padding: '2px 6px',
                          background: 'rgba(0,0,0,0.6)', color: '#fff', borderRadius: 4, fontSize: 10, textDecoration: 'none',
                        }}>↗</a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ background: C.bg, borderRadius: 8, padding: '24px', border: `1px dashed ${C.border}`, fontSize: 13, color: C.tx3, textAlign: 'center' as const }}>
                    Aucune image trouvée.
                  </div>
                )}
              </div>

              {/* Website Images */}
              {(selectedLead.websiteImages || []).length > 0 && (
                <div style={{ marginBottom: 28 }}>
                  <h3 style={{ fontSize: 14, fontWeight: 600, color: C.tx, marginBottom: 14 }}>📸 Images du Site Original ({selectedLead.websiteImages.length})</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                    {selectedLead.websiteImages.filter(img => typeof img === 'string' && img.startsWith('http')).map((img, i) => (
                      <div key={i} style={{ borderRadius: 6, overflow: 'hidden', border: `1px solid ${C.border}`, aspectRatio: '1', background: C.surface2 }}>
                        <img src={img} alt={`Site ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          referrerPolicy="no-referrer"
                          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Serper Snippets */}
              {selectedLead.serperSnippets && selectedLead.serperSnippets.length > 0 && (
                <div style={{ marginBottom: 28 }}>
                  <h3 style={{ fontSize: 14, fontWeight: 600, color: C.tx, marginBottom: 14 }}>🔍 Informations Web</h3>
                  <div style={{ background: C.bg, borderRadius: 8, border: `1px solid ${C.border}`, overflow: 'hidden' }}>
                    {selectedLead.serperSnippets.map((snippet: string, i: number) => (
                      <div key={i} style={{
                        padding: '10px 16px', fontSize: 12, color: C.tx2, lineHeight: 1.6,
                        borderBottom: i < selectedLead.serperSnippets.length - 1 ? `1px solid ${C.border}` : 'none',
                      }}>{snippet}</div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {selectedLead.notes && (
                <div style={{ marginBottom: 28 }}>
                  <h3 style={{ fontSize: 14, fontWeight: 600, color: C.tx, marginBottom: 14 }}>📝 Notes</h3>
                  <div style={{ background: '#fffef5', borderRadius: 8, padding: '14px 16px', border: '1px solid #fde68a', fontSize: 12, color: C.tx2, lineHeight: 1.6, fontFamily: "'DM Mono', monospace" }}>
                    {selectedLead.notes}
                  </div>
                </div>
              )}

              {/* Pipeline */}
              <div style={{ marginBottom: 28 }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: C.tx, marginBottom: 14 }}>📈 Progression Pipeline</h3>
                <div style={{ background: C.bg, borderRadius: 8, padding: '16px', border: `1px solid ${C.border}` }}>
                  <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
                    {['new', 'enriched', 'site_generated', 'email_sent', 'interested', 'converted'].map((stage, i) => {
                      const stages = ['new', 'enriched', 'site_generated', 'email_sent', 'interested', 'converted'];
                      const currentIdx = stages.indexOf(selectedLead.stage);
                      return <div key={stage} style={{ flex: 1, height: 6, borderRadius: 3, background: i <= currentIdx ? (i === currentIdx ? C.accent : C.green) : C.surface2 }} />;
                    })}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: C.tx3 }}>
                    <span>Nouveau</span><span>Enrichi</span><span>Site</span><span>Email</span><span>Intéressé</span><span>Converti</span>
                  </div>
                </div>
              </div>

              {/* Generated Prompt */}
              <div style={{ marginBottom: 28 }}>
                <div style={{
                  background: 'linear-gradient(135deg, #eff6ff, #f0fdf4)',
                  borderRadius: 10, padding: '20px 22px', border: `2px solid ${C.blue}`,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: C.blue, margin: 0 }}>🤖 Prompt de Création de Site Web</h3>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button onClick={() => {
                        if (selectedLead.generatedPrompt) {
                          navigator.clipboard.writeText(selectedLead.generatedPrompt);
                          setPromptCopied(true);
                          setTimeout(() => setPromptCopied(false), 2000);
                        }
                      }} style={{
                        padding: '5px 12px', borderRadius: 5, fontSize: 11, fontWeight: 600, cursor: 'pointer',
                        border: `1px solid ${promptCopied ? C.green : C.blue}`,
                        background: promptCopied ? '#e8f5e9' : '#eff6ff',
                        color: promptCopied ? C.green : C.blue,
                      }}>{promptCopied ? '✅ Copié !' : '📋 Copier'}</button>
                      <button onClick={() => regeneratePrompt(selectedLead)} style={{
                        padding: '5px 12px', borderRadius: 5, fontSize: 11, fontWeight: 600, cursor: 'pointer',
                        border: `1px solid ${C.amber}`, background: '#fffbeb', color: C.amber,
                      }}>🔄 Régénérer</button>
                    </div>
                  </div>
                  {selectedLead.generatedPrompt ? (
                    <div style={{
                      background: C.surface, borderRadius: 8, padding: '16px',
                      border: `1px solid ${C.border}`, maxHeight: 300, overflowY: 'auto',
                      fontFamily: "'DM Mono', monospace", fontSize: 11, lineHeight: 1.7,
                      color: C.tx2, whiteSpace: 'pre-wrap' as const, wordBreak: 'break-word' as const,
                    }}>{selectedLead.generatedPrompt}</div>
                  ) : (
                    <div style={{
                      background: C.surface, borderRadius: 8, padding: '20px',
                      border: `1px dashed ${C.border}`, fontSize: 13, color: C.tx3, textAlign: 'center' as const,
                    }}>Aucun prompt. Cliquez Re-enrichir.</div>
                  )}
                  <div style={{ marginTop: 12, fontSize: 11, color: C.tx3, lineHeight: 1.5 }}>
                    ℹ️ Ce prompt est utilisé par l&apos;Agent 3 — Website Generator pour créer le site web.
                  </div>
                </div>
              </div>

              {/* Metadata */}
              <div style={{ background: C.bg, borderRadius: 8, padding: '12px 16px', border: `1px solid ${C.border}`, fontSize: 12, color: C.tx3, marginBottom: 28 }}>
                <div>Créé : <span style={{ fontFamily: "'DM Mono', monospace" }}>{selectedLead.createdAt ? new Date(selectedLead.createdAt).toLocaleString('fr-FR') : '—'}</span></div>
                <div>Mis à jour : <span style={{ fontFamily: "'DM Mono', monospace" }}>{selectedLead.updatedAt ? new Date(selectedLead.updatedAt).toLocaleString('fr-FR') : '—'}</span></div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 8, paddingBottom: 20 }}>
                <button onClick={() => scoreOne(selectedLead)} disabled={processing} style={{
                  flex: 1, padding: '11px 0', borderRadius: 6, border: 'none',
                  background: C.green, color: '#fff', fontWeight: 600, fontSize: 14,
                  cursor: processing ? 'default' : 'pointer', opacity: processing ? 0.6 : 1,
                }}>{processing ? '⏳ Enrichissement...' : '⚡ Re-enrichir ce lead'}</button>
                <button onClick={() => setSelectedId(null)} style={{
                  padding: '11px 20px', borderRadius: 6, border: `1px solid ${C.border}`,
                  background: C.surface, color: C.tx2, fontWeight: 500, fontSize: 14, cursor: 'pointer',
                }}>Fermer</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
