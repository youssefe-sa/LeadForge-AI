// ============================================================
// LeadForge AI — Production Store (localStorage persistence)
// ============================================================
import { useState, useEffect, useCallback } from 'react';

// --- SAFE HELPERS (defined once, used everywhere) ---
export function safeStr(v: unknown): string {
  if (v === null || v === undefined) return '';
  if (typeof v === 'string') return v;
  if (typeof v === 'number' || typeof v === 'boolean') return String(v);
  if (Array.isArray(v)) return v.filter(x => typeof x === 'string').join(', ');
  return '';
}

export function safeNum(v: unknown): number {
  if (typeof v === 'number' && !isNaN(v)) return v;
  if (typeof v === 'string') { const n = parseFloat(v); return isNaN(n) ? 0 : n; }
  return 0;
}

export function safeStrArr(v: unknown): string[] {
  if (!Array.isArray(v)) return typeof v === 'string' && v ? [v] : [];
  return v.map(item => safeStr(item)).filter(Boolean);
}

// --- TYPES ---
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  sector: string;
  city: string;
  address: string;
  website: string;
  googleMapsUrl: string;
  googleRating: number;
  googleReviews: number;
  description: string;
  hours: string;
  tags: string[];
  score: number;
  temperature: 'very_hot' | 'hot' | 'warm' | 'cold' | '';
  stage: 'new' | 'enriched' | 'site_generated' | 'email_sent' | 'interested' | 'converted' | 'lost';
  notes: string;
  images: string[];
  siteGenerated: boolean;
  siteUrl: string;
  siteHtml: string;
  landingUrl: string;
  emailSent: boolean;
  emailSentDate: string;
  emailOpened: boolean;
  emailClicked: boolean;
  lastContact: string;
  followUps: number;
  revenue: number;
  createdAt: string;
  updatedAt: string;
  googleReviewsData: Array<{ author: string; rating: number; text: string; date: string }>;
  logo: string;
  websiteImages: string[];
  generatedPrompt: string;
  serperSnippets: string[];
  serperType: string;
  serperCid: string;
  serperHours: string;
}

export interface ApiConfig {
  groqKey: string;
  openrouterKey: string;
  serperKey: string;
  // Gmail SMTP Configuration
  gmailSmtpHost: string;
  gmailSmtpPort: number;
  gmailSmtpUser: string;
  gmailSmtpPassword: string;
  gmailSmtpFromName: string;
  gmailSmtpFromEmail: string;
  gmailSmtpSecure: boolean;
}

export interface ApiStatus {
  [key: string]: 'untested' | 'testing' | 'active' | 'error';
}

export interface EmailTemplate {
  id: string;
  name: string;
  sector: string;
  subject: string;
  body: string;
}

// --- DEFAULTS ---
export const defaultApiConfig: ApiConfig = {
  groqKey: '', openrouterKey: '',
  serperKey: '',
  // Gmail SMTP defaults
  gmailSmtpHost: 'smtp.gmail.com',
  gmailSmtpPort: 587,
  gmailSmtpUser: '',
  gmailSmtpPassword: '',
  gmailSmtpFromName: '',
  gmailSmtpFromEmail: '',
  gmailSmtpSecure: true,
};

export const defaultEmailTemplates: EmailTemplate[] = [
  { id: '1', name: 'Restaurant - Premier contact', sector: 'Restaurant',
    subject: 'Un site web professionnel pour {name}',
    body: 'Bonjour,\n\nJe me permets de vous contacter car j\'ai remarqué que {name} à {city} ne dispose pas encore d\'un site web professionnel.\n\nJ\'ai pris l\'initiative de créer une maquette de site web spécialement conçue pour votre restaurant. Vous pouvez la découvrir ici :\n\n{landingUrl}\n\nCe site inclut :\n- Menu en ligne avec photos\n- Réservation en ligne\n- Avis Google intégrés\n- Optimisé pour Google (SEO local)\n\nLe site est prêt à être mis en ligne. Si cela vous intéresse, n\'hésitez pas à me répondre.\n\nCordialement' },
  { id: '2', name: 'Commerce - Premier contact', sector: 'Commerce',
    subject: 'Votre boutique {name} mérite un site web moderne',
    body: 'Bonjour,\n\nJe vous contacte car j\'ai vu que {name} à {city} n\'a pas de site web.\n\nJ\'ai créé un site web professionnel pour votre commerce :\n\n{landingUrl}\n\n- Catalogue produits\n- Horaires et localisation\n- Visible sur Google\n\nRépondez à cet email pour en discuter.\n\nCordialement' },
  { id: '3', name: 'Générique - Premier contact', sector: 'Autre',
    subject: 'Un site web professionnel pour {name}',
    body: 'Bonjour,\n\nJ\'ai remarqué que {name} à {city} ne dispose pas encore d\'un site web.\n\nJ\'ai créé un site web professionnel spécialement pour vous :\n\n{landingUrl}\n\n- Design moderne et professionnel\n- Optimisé pour mobile\n- Visible sur Google\n\nDécouvrez-le et n\'hésitez pas à me contacter.\n\nCordialement' },
];

// --- PERSISTENCE HELPERS ---
function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(`leadforge_${key}`);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return fallback;
}

function saveToStorage(key: string, value: unknown) {
  try {
    localStorage.setItem(`leadforge_${key}`, JSON.stringify(value));
  } catch { /* ignore */ }
}

// --- HOOKS ---
export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>(() => loadFromStorage('leads', []));

  useEffect(() => { saveToStorage('leads', leads); }, [leads]);

  const addLeads = useCallback((newLeads: Partial<Lead>[]) => {
    setLeads(prev => {
      const existingEmails = new Set(prev.map(l => l.email.toLowerCase()));
      const existingPhones = new Set(prev.map(l => l.phone));
      const toAdd: Lead[] = [];
      const duplicates: string[] = [];

      for (const nl of newLeads) {
        const email = (nl.email || '').toLowerCase().trim();
        const phone = (nl.phone || '').trim();
        if (email && existingEmails.has(email)) { duplicates.push(nl.name || email); continue; }
        if (phone && phone.length > 4 && existingPhones.has(phone)) { duplicates.push(nl.name || phone); continue; }

        const lead: Lead = {
          id: crypto.randomUUID(),
          name: safeStr(nl.name),
          email: email,
          phone: phone,
          sector: safeStr(nl.sector),
          city: safeStr(nl.city),
          address: safeStr(nl.address),
          website: safeStr(nl.website),
          googleMapsUrl: safeStr(nl.googleMapsUrl),
          googleRating: safeNum(nl.googleRating),
          googleReviews: safeNum(nl.googleReviews),
          description: safeStr(nl.description),
          hours: safeStr(nl.hours),
          tags: nl.tags || (nl.website ? [] : ['Sans site']),
          score: 0,
          temperature: '',
          stage: 'new',
          notes: safeStr(nl.notes),
          images: safeStrArr(nl.images),
          siteGenerated: false,
          siteUrl: '',
          siteHtml: '',
          landingUrl: '',
          emailSent: false,
          emailSentDate: '',
          emailOpened: false,
          emailClicked: false,
          lastContact: '',
          followUps: 0,
          revenue: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          googleReviewsData: [],
          logo: '',
          websiteImages: [],
          generatedPrompt: '',
          serperSnippets: [],
          serperType: '',
          serperCid: '',
          serperHours: '',
        };
        if (email) existingEmails.add(email);
        if (phone && phone.length > 4) existingPhones.add(phone);
        toAdd.push(lead);
      }

      if (duplicates.length > 0) {
        setTimeout(() => alert(`${duplicates.length} doublon(s) ignoré(s) :\n${duplicates.slice(0, 5).join('\n')}${duplicates.length > 5 ? `\n... et ${duplicates.length - 5} autres` : ''}`), 100);
      }

      return [...prev, ...toAdd];
    });
  }, []);

  const updateLead = useCallback((id: string, updates: Partial<Lead>) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, ...updates, updatedAt: new Date().toISOString() } : l));
  }, []);

  const updateLeads = useCallback((updates: { id: string; data: Partial<Lead> }[]) => {
    setLeads(prev => {
      const map = new Map(updates.map(u => [u.id, u.data]));
      return prev.map(l => map.has(l.id) ? { ...l, ...map.get(l.id)!, updatedAt: new Date().toISOString() } : l);
    });
  }, []);

  const deleteLead = useCallback((id: string) => {
    setLeads(prev => prev.filter(l => l.id !== id));
  }, []);

  const deleteLeads = useCallback((ids: string[]) => {
    const idSet = new Set(ids);
    setLeads(prev => prev.filter(l => !idSet.has(l.id)));
  }, []);

  const clearAll = useCallback(() => { setLeads([]); }, []);

  return { leads, setLeads, addLeads, updateLead, updateLeads, deleteLead, deleteLeads, clearAll };
}

export function useApiConfig() {
  const [config, setConfig] = useState<ApiConfig>(() => loadFromStorage('apiConfig', defaultApiConfig));
  const [statuses, setStatuses] = useState<ApiStatus>(() => loadFromStorage('apiStatuses', {}));

  useEffect(() => { saveToStorage('apiConfig', config); }, [config]);
  useEffect(() => { saveToStorage('apiStatuses', statuses); }, [statuses]);

  const updateConfig = useCallback((updates: Partial<ApiConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  }, []);

  const setStatus = useCallback((key: string, status: 'untested' | 'testing' | 'active' | 'error') => {
    setStatuses(prev => ({ ...prev, [key]: status }));
  }, []);

  return { config, updateConfig, statuses, setStatus };
}

export function useEmailTemplates() {
  const [templates, setTemplates] = useState<EmailTemplate[]>(() => loadFromStorage('emailTemplates', defaultEmailTemplates));
  useEffect(() => { saveToStorage('emailTemplates', templates); }, [templates]);
  return { templates, setTemplates };
}

// --- SCORING ALGORITHM ---
export function calculateScore(lead: Lead): { score: number; temperature: Lead['temperature'] } {
  let score = 0;
  if (lead.name) score += 5;
  if (lead.email) score += 8;
  if (lead.phone) score += 5;
  if (lead.address) score += 3;
  if (lead.city) score += 3;
  if (lead.sector) score += 3;
  if (lead.description) score += 3;
  if (!lead.website || lead.tags.includes('Sans site')) score += 25;
  else if (lead.tags.includes('Site obsolète')) score += 15;
  if (lead.googleRating >= 4.5) score += 10;
  else if (lead.googleRating >= 4.0) score += 7;
  else if (lead.googleRating >= 3.0) score += 4;
  if (lead.googleReviews >= 50) score += 10;
  else if (lead.googleReviews >= 20) score += 7;
  else if (lead.googleReviews >= 5) score += 4;
  const highValueSectors = ['restaurant', 'hotel', 'riad', 'avocat', 'medecin', 'spa', 'clinique', 'dentiste'];
  const medValueSectors = ['commerce', 'boutique', 'garage', 'artisan', 'boulangerie', 'coiffeur', 'salon'];
  const sl = (lead.sector || lead.name || '').toLowerCase();
  if (highValueSectors.some(s => sl.includes(s))) score += 15;
  else if (medValueSectors.some(s => sl.includes(s))) score += 10;
  else score += 5;
  if (lead.images.length > 0) score += 5;
  if (lead.tags.includes('Prioritaire')) score += 5;
  score = Math.min(100, Math.max(0, score));
  let temperature: Lead['temperature'] = 'cold';
  if (score >= 80) temperature = 'very_hot';
  else if (score >= 60) temperature = 'hot';
  else if (score >= 40) temperature = 'warm';
  return { score, temperature };
}

// --- LLM API CALLS ---
export async function callLLM(config: ApiConfig, prompt: string, systemPrompt?: string): Promise<string> {
  if (config.groqKey) {
    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${config.groqKey}` },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            ...(systemPrompt ? [{ role: 'system' as const, content: systemPrompt }] : []),
            { role: 'user' as const, content: prompt }
          ],
          temperature: 0.7, max_tokens: 4000,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        return safeStr(data?.choices?.[0]?.message?.content);
      }
    } catch { /* fall through */ }
  }
  if (config.geminiKey) {
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${config.geminiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: (systemPrompt ? systemPrompt + '\n\n' : '') + prompt }] }],
        }),
      });
      if (res.ok) {
        const data = await res.json();
        return safeStr(data?.candidates?.[0]?.content?.parts?.[0]?.text);
      }
    } catch { /* fall through */ }
  }
  if (config.openrouterKey) {
    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${config.openrouterKey}` },
        body: JSON.stringify({
          model: 'meta-llama/llama-4-scout:free',
          messages: [
            ...(systemPrompt ? [{ role: 'system' as const, content: systemPrompt }] : []),
            { role: 'user' as const, content: prompt }
          ],
        }),
      });
      if (res.ok) {
        const data = await res.json();
        return safeStr(data?.choices?.[0]?.message?.content);
      }
    } catch { /* fall through */ }
  }
  return '';
}

// --- LLM FOR FULL WEBSITE GENERATION (higher token limit) ---
export async function callLLMForWebsite(config: ApiConfig, prompt: string, systemPrompt?: string): Promise<string> {
  // Try Groq FIRST — user's primary LLM, fast & reliable
  if (config.groqKey) {
    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${config.groqKey}` },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            ...(systemPrompt ? [{ role: 'system' as const, content: systemPrompt }] : []),
            { role: 'user' as const, content: prompt }
          ],
          temperature: 0.7, max_tokens: 32000,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        const text = safeStr(data?.choices?.[0]?.message?.content);
        if (text && text.length > 500) return text;
      }
    } catch { /* fall through */ }
  }
  // Gemini as secondary — higher output token limit
  if (config.geminiKey) {
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${config.geminiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: (systemPrompt ? systemPrompt + '\n\n' : '') + prompt }] }],
          generationConfig: { maxOutputTokens: 65536, temperature: 0.7 },
        }),
      });
      if (res.ok) {
        const data = await res.json();
        const text = safeStr(data?.candidates?.[0]?.content?.parts?.[0]?.text);
        if (text && text.length > 500) return text;
      }
    } catch { /* fall through */ }
  }
  // OpenRouter as last fallback
  if (config.openrouterKey) {
    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${config.openrouterKey}` },
        body: JSON.stringify({
          model: 'meta-llama/llama-4-scout:free',
          messages: [
            ...(systemPrompt ? [{ role: 'system' as const, content: systemPrompt }] : []),
            { role: 'user' as const, content: prompt }
          ],
          max_tokens: 16000,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        const text = safeStr(data?.choices?.[0]?.message?.content);
        if (text && text.length > 500) return text;
      }
    } catch { /* fall through */ }
  }
  return '';
}

// --- SERPER API ---
async function serperFetch(apiKey: string, endpoint: string, body: Record<string, unknown>): Promise<Record<string, unknown> | null> {
  if (!apiKey) return null;
  try {
    const res = await fetch(`https://google.serper.dev/${endpoint}`, {
      method: 'POST',
      headers: { 'X-API-KEY': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.ok) return await res.json();
  } catch { /* ignore */ }
  return null;
}

// --- ENRICHMENT WITH SERPER ---
export async function enrichWithSerper(apiKey: string, lead: Lead): Promise<Partial<Lead>> {
  const updates: Partial<Lead> = {};
  const query = `${lead.name} ${lead.city || ''} ${lead.sector || ''}`.trim();

  // 1. Places search
  try {
    const placesResult = await serperFetch(apiKey, 'places', { q: query, gl: 'fr', hl: 'fr' });
    if (placesResult) {
      const places = placesResult.places;
      if (Array.isArray(places) && places.length > 0) {
        const p = places[0];
        if (p && typeof p === 'object') {
          const place = p as Record<string, unknown>;
          if (!lead.address) updates.address = safeStr(place.address);
          if (!lead.phone) updates.phone = safeStr(place.phoneNumber || place.phone);
          if (!lead.website) updates.website = safeStr(place.website);
          if (!lead.googleRating) updates.googleRating = safeNum(place.rating);
          if (!lead.googleReviews) updates.googleReviews = safeNum(place.ratingCount || place.reviewCount);
          if (!lead.sector) updates.sector = safeStr(place.category || place.type);
          updates.serperType = safeStr(place.category || place.type);

          const cid = safeStr(place.cid);
          if (cid) updates.serperCid = cid;

          const mapsLink = safeStr(place.link);
          if (!lead.googleMapsUrl) {
            updates.googleMapsUrl = mapsLink || (cid ? `https://www.google.com/maps?cid=${cid}` : '');
          }

          if (!lead.city && typeof place.address === 'string') {
            const parts = place.address.split(',').map((s: string) => s.trim());
            if (parts.length >= 2) updates.city = parts[parts.length - 2] || '';
          }

          const thumb = safeStr(place.thumbnailUrl || place.thumbnail);
          if (thumb && thumb.startsWith('http')) {
            const imgs = [...(lead.images || [])];
            if (!imgs.includes(thumb)) { imgs.push(thumb); updates.images = imgs; }
          }
        }
      }
    }
  } catch { /* ignore */ }

  // 2. Images search
  try {
    const imageResult = await serperFetch(apiKey, 'images', { q: query, gl: 'fr', hl: 'fr', num: 8 });
    if (imageResult) {
      const images = imageResult.images;
      if (Array.isArray(images)) {
        const currentImgs = [...(updates.images || lead.images || [])];
        for (const img of images.slice(0, 6)) {
          if (img && typeof img === 'object') {
            const url = safeStr((img as Record<string, unknown>).imageUrl || (img as Record<string, unknown>).thumbnailUrl);
            if (url && url.startsWith('http') && !currentImgs.includes(url)) {
              currentImgs.push(url);
            }
          }
        }
        if (currentImgs.length > (updates.images || lead.images || []).length) {
          updates.images = currentImgs.slice(0, 12);
        }
      }
    }
  } catch { /* ignore */ }

  // 3. Web search for snippets + knowledge graph
  try {
    const searchResult = await serperFetch(apiKey, 'search', { q: query, gl: 'fr', hl: 'fr' });
    if (searchResult) {
      const kg = searchResult.knowledgeGraph;
      if (kg && typeof kg === 'object') {
        const kgObj = kg as Record<string, unknown>;
        if (!lead.website && !updates.website) updates.website = safeStr(kgObj.website);
        if (!lead.phone && !updates.phone) updates.phone = safeStr(kgObj.phone);
        if (!lead.address && !updates.address) updates.address = safeStr(kgObj.address);
        if (!lead.googleRating && !updates.googleRating) updates.googleRating = safeNum(kgObj.rating);
        if (!lead.googleReviews && !updates.googleReviews) updates.googleReviews = safeNum(kgObj.ratingCount);
        const kgImage = safeStr(kgObj.imageUrl);
        if (kgImage && kgImage.startsWith('http')) {
          const imgs = [...(updates.images || lead.images || [])];
          if (!imgs.includes(kgImage)) { imgs.unshift(kgImage); updates.images = imgs.slice(0, 12); }
        }
        const attrs = kgObj.attributes;
        if (attrs && typeof attrs === 'object') {
          const attrsObj = attrs as Record<string, unknown>;
          const horaires = attrsObj['Horaires'] || attrsObj['Hours'] || attrsObj['Opening hours'];
          if (horaires) {
            updates.serperHours = safeStr(horaires);
            if (!lead.hours) updates.hours = safeStr(horaires);
          }
        }
      }
      const organic = searchResult.organic;
      if (Array.isArray(organic)) {
        const snippets: string[] = [];
        for (const r of organic.slice(0, 4)) {
          if (r && typeof r === 'object') {
            const s = safeStr((r as Record<string, unknown>).snippet);
            if (s) snippets.push(s);
          }
        }
        if (snippets.length > 0) updates.serperSnippets = snippets;
      }
    }
  } catch { /* ignore */ }

  return updates;
}

// --- FETCH GOOGLE REVIEWS ---
export async function fetchSerperReviews(apiKey: string, cid: string): Promise<Lead['googleReviewsData']> {
  if (!apiKey || !cid) return [];
  try {
    const result = await serperFetch(apiKey, 'maps/reviews', { cid, num: 20 });
    if (!result) return [];

    let rawReviews: unknown[] = [];
    if (Array.isArray(result.reviews)) rawReviews = result.reviews;
    else if (result.place && typeof result.place === 'object') {
      const place = result.place as Record<string, unknown>;
      if (Array.isArray(place.reviews)) rawReviews = place.reviews;
    }

    return rawReviews
      .filter((r): r is Record<string, unknown> => r !== null && typeof r === 'object')
      .filter(r => safeNum(r.rating) >= 4)
      .slice(0, 6)
      .map(r => ({
        author: safeStr(r.user || r.author || r.name) || 'Client Google',
        rating: safeNum(r.rating) || 5,
        text: safeStr(r.snippet || r.text || r.review || r.body),
        date: safeStr(r.date || r.time || r.relativeDate),
      }))
      .filter(r => r.text.length > 5);
  } catch { /* ignore */ }
  return [];
}

// Fallback: extract reviews using LLM
export async function extractReviewsFromSearch(serperKey: string, lead: Lead, apiConfig: ApiConfig): Promise<Lead['googleReviewsData']> {
  const result = await serperFetch(serperKey, 'search', { q: `"${lead.name}" ${lead.city || ''} avis clients google`, gl: 'fr', hl: 'fr' });
  if (!result) return [];
  const organic = result.organic;
  if (!Array.isArray(organic)) return [];
  const snippets = organic.map((r: unknown) => {
    if (r && typeof r === 'object') return safeStr((r as Record<string, unknown>).snippet);
    return '';
  }).filter(Boolean).join('\n');
  if (snippets.length < 50) return [];
  if (!apiConfig.groqKey && !apiConfig.geminiKey && !apiConfig.openrouterKey) return [];
  const prompt = `From the following search results about "${lead.name}", extract up to 6 REAL positive customer reviews (4-5 stars). Return ONLY valid JSON array. No markdown, no backticks.\n\nSearch results:\n${snippets.substring(0, 2000)}\n\nJSON format: [{"author": "Name", "rating": 5, "text": "Review text", "date": "Date or empty"}]\nIf no reviews found, return: []`;
  const response = await callLLM(apiConfig, prompt, 'Extract customer reviews. Return ONLY valid JSON array.');
  if (response) {
    try {
      const cleaned = response.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
      const reviews = JSON.parse(cleaned);
      if (Array.isArray(reviews)) {
        return reviews.slice(0, 6).map(r => ({
          author: safeStr(r?.author) || 'Client',
          rating: safeNum(r?.rating) || 5,
          text: safeStr(r?.text),
          date: safeStr(r?.date),
        })).filter(r => r.text.length > 5);
      }
    } catch { /* ignore */ }
  }
  return [];
}

// --- DEEP EMAIL SEARCH ---
export async function deepSearchEmail(serperKey: string, lead: Lead, apiConfig: ApiConfig): Promise<string> {
  if (!serperKey) return '';
  const extractEmail = (text: string): string => {
    const match = text.match(/[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/);
    return match ? match[0] : '';
  };
  // Strategy 1: website
  if (lead.website) {
    const domain = lead.website.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
    const r1 = await serperFetch(serperKey, 'search', { q: `site:${domain} email contact "@"`, gl: 'fr', hl: 'fr' });
    if (r1 && Array.isArray(r1.organic)) {
      const text = r1.organic.map((x: unknown) => {
        if (x && typeof x === 'object') { const o = x as Record<string, unknown>; return `${safeStr(o.snippet)} ${safeStr(o.title)}`; }
        return '';
      }).join(' ');
      const email = extractEmail(text);
      if (email) return email;
    }
  }
  // Strategy 2: name + city
  const r2 = await serperFetch(serperKey, 'search', { q: `"${lead.name}" "${lead.city || ''}" email contact`, gl: 'fr', hl: 'fr' });
  if (r2) {
    if (r2.knowledgeGraph && typeof r2.knowledgeGraph === 'object') {
      const kgEmail = safeStr((r2.knowledgeGraph as Record<string, unknown>).email);
      if (kgEmail && kgEmail.includes('@')) return kgEmail;
    }
    if (Array.isArray(r2.organic)) {
      const text = r2.organic.map((x: unknown) => {
        if (x && typeof x === 'object') return safeStr((x as Record<string, unknown>).snippet);
        return '';
      }).join(' ');
      const email = extractEmail(text);
      if (email) return email;
    }
  }
  // Strategy 3: social media
  const r3 = await serperFetch(serperKey, 'search', { q: `"${lead.name}" (facebook OR instagram OR linkedin) email`, gl: 'fr', hl: 'fr' });
  if (r3 && Array.isArray(r3.organic)) {
    const text = r3.organic.map((x: unknown) => {
      if (x && typeof x === 'object') return safeStr((x as Record<string, unknown>).snippet);
      return '';
    }).join(' ');
    const email = extractEmail(text);
    if (email) return email;
  }
  // Strategy 4: AI
  if (apiConfig.groqKey || apiConfig.geminiKey || apiConfig.openrouterKey) {
    const allSnippets: string[] = [];
    if (r2 && Array.isArray(r2.organic)) allSnippets.push(...r2.organic.map((x: unknown) => { if (x && typeof x === 'object') return safeStr((x as Record<string, unknown>).snippet); return ''; }).filter(Boolean));
    if (r3 && Array.isArray(r3.organic)) allSnippets.push(...r3.organic.map((x: unknown) => { if (x && typeof x === 'object') return safeStr((x as Record<string, unknown>).snippet); return ''; }).filter(Boolean));
    const prompt = `Based on these search results about "${lead.name}" in ${lead.city || 'unknown'}, extract the professional email address. Return ONLY the email, nothing else. If impossible, return "NONE".\n\nWebsite: ${lead.website || 'none'}\nPhone: ${lead.phone || 'none'}\nResults:\n${allSnippets.slice(0, 5).join('\n')}`;
    const response = await callLLM(apiConfig, prompt);
    if (response && !response.toUpperCase().includes('NONE')) {
      const email = extractEmail(response);
      if (email) return email;
    }
  }
  return '';
}

// --- SEARCH LEAD IMAGES (Logo + Website) ---
export async function searchLeadImages(serperKey: string, lead: Lead): Promise<{ logo: string; websiteImages: string[] }> {
  const result = { logo: '', websiteImages: [] as string[] };
  if (!serperKey) return result;
  // Logo
  try {
    const logoResult = await serperFetch(serperKey, 'images', { q: `"${lead.name}" ${lead.city || ''} logo`, gl: 'fr', num: 3 });
    if (logoResult && Array.isArray(logoResult.images) && logoResult.images.length > 0) {
      const first = logoResult.images[0];
      if (first && typeof first === 'object') {
        const url = safeStr((first as Record<string, unknown>).imageUrl || (first as Record<string, unknown>).thumbnailUrl);
        if (url && url.startsWith('http')) result.logo = url;
      }
    }
  } catch { /* ignore */ }
  // Website images
  if (lead.website) {
    try {
      const domain = lead.website.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
      const imgResult = await serperFetch(serperKey, 'images', { q: `site:${domain}`, num: 8 });
      if (imgResult && Array.isArray(imgResult.images)) {
        for (const img of imgResult.images.slice(0, 8)) {
          if (img && typeof img === 'object') {
            const url = safeStr((img as Record<string, unknown>).imageUrl || (img as Record<string, unknown>).thumbnailUrl);
            if (url && url.startsWith('http')) result.websiteImages.push(url);
          }
        }
      }
    } catch { /* ignore */ }
  }
  return result;
}

// --- GENERATE WEBSITE PROMPT ---
export function generateWebsitePrompt(lead: Lead): string {
  const reviews = (lead.googleReviewsData || [])
    .filter(r => r && typeof r.text === 'string')
    .map(r => `  - "${r.text}" — ${safeStr(r.author)} (${safeNum(r.rating)}★${r.date ? `, ${safeStr(r.date)}` : ''})`)
    .join('\n');

  const allImages = [...(lead.images || [])].filter(u => typeof u === 'string' && u.startsWith('http'));
  const imageList = allImages.length > 0
    ? allImages.map((url, i) => `  ${i + 1}. ${url}`).join('\n')
    : '  No images found — use sector-appropriate stock photos';

  const wsImages = (lead.websiteImages || []).filter(u => typeof u === 'string' && u.startsWith('http'));
  const wsImageList = wsImages.length > 0
    ? wsImages.map((url, i) => `  ${i + 1}. ${url}`).join('\n')
    : '';

  return `Create a modern theme website for "${lead.name}" with a premium and stylish design. The website should include a strong hero section with logo, headline, short description, and a "Book Appointment" button, and pages like Home, Services, Gallery, About, and Book Appointment.
Appointments should be booked in two ways: users can either fill a complete booking form with service, date, and contact details, or connect directly with the business through a WhatsApp button.

Now use the following "${lead.name}" details to generate the website:

Business Information:
- Business Name: ${lead.name}
- Sector/Category: ${lead.sector || 'Non spécifié'}
- City: ${lead.city || 'Non spécifiée'}
- Full Address: ${lead.address || 'Non renseignée'}
- Phone: ${lead.phone || 'Non renseigné'}
- Email: ${lead.email || 'Non renseigné'}
- Current Website: ${lead.website || 'No existing website'}
- Google Maps: ${lead.googleMapsUrl || 'Non renseigné'}

Google Presence:
- Rating: ${lead.googleRating > 0 ? `${lead.googleRating}/5` : 'Not rated'}
- Total Reviews: ${lead.googleReviews || 0}
${reviews ? `\nReal Customer Reviews:\n${reviews}` : ''}

Operating Hours: ${lead.hours || lead.serperHours || 'Not specified'}

Business Description:
${lead.description || 'No description available — generate an appropriate one based on the business name, sector, and location.'}

Available Visual Assets:
- Logo: ${lead.logo || 'Not identified — create a text-based logo using the business name'}
- Photos:
${imageList}
${wsImageList ? `- Original Website Images:\n${wsImageList}` : ''}`;
}

// --- RESEND EMAIL ---
export async function sendEmail(config: ApiConfig, to: string, subject: string, html: string): Promise<boolean> {
  if (!config.resendKey) return false;
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${config.resendKey}` },
      body: JSON.stringify({
        from: `${config.resendName || 'LeadForge'} <${config.resendEmail || 'onboarding@resend.dev'}>`,
        to: [to],
        subject,
        html,
      }),
    });
    return res.ok;
  } catch { return false; }
}

// --- UNSPLASH ---
export async function searchUnsplash(key: string, query: string): Promise<string[]> {
  if (!key) return [];
  try {
    const res = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=6&client_id=${key}`);
    if (res.ok) {
      const data = await res.json();
      return (data.results || []).map((r: { urls: { regular: string } }) => safeStr(r?.urls?.regular)).filter(Boolean);
    }
  } catch { /* ignore */ }
  return [];
}

// --- PEXELS ---
export async function searchPexels(key: string, query: string): Promise<string[]> {
  if (!key) return [];
  try {
    const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=6`, {
      headers: { 'Authorization': key },
    });
    if (res.ok) {
      const data = await res.json();
      return (data.photos || []).map((p: { src: { medium: string } }) => safeStr(p?.src?.medium)).filter(Boolean);
    }
  } catch { /* ignore */ }
  return [];
}

// --- IMAGE PROXY (fixes CORS/403) ---
export function proxyImg(url: string, w: number = 800): string {
  if (!url) return '';
  if (!url.startsWith('http')) return url;
  // Don't proxy images that already support CORS
  if (url.includes('images.unsplash.com') || url.includes('pexels.com')) return url;
  return `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=${w}&q=80&output=webp&default=1`;
}

// --- SECTOR-SPECIFIC UNSPLASH QUERIES ---
export const SECTOR_IMAGE_QUERIES: Record<string, string[]> = {
  restaurant: ['restaurant elegant interior dining', 'gourmet food plating chef', 'restaurant terrace ambiance', 'fine dining table setting', 'restaurant kitchen professional', 'wine bar restaurant'],
  coiffeur: ['hair salon modern interior', 'hairdresser styling professional', 'hair salon chair mirror luxury', 'hair color treatment salon', 'barber shop professional', 'hair styling tools'],
  salon: ['beauty salon modern luxury', 'nail salon manicure professional', 'beauty treatment facial spa', 'beauty salon interior', 'hair styling salon', 'beauty products professional'],
  spa: ['luxury spa interior zen', 'massage therapy relaxation stones', 'spa treatment room candles', 'wellness center pool', 'aromatherapy spa luxury', 'spa facial treatment'],
  'médecin': ['modern medical clinic interior', 'doctor office professional clean', 'medical examination room', 'healthcare facility modern', 'medical consultation doctor', 'hospital corridor modern'],
  dentiste: ['modern dental clinic chair', 'dental office bright clean', 'dentist equipment professional', 'dental treatment smile', 'dental clinic waiting room', 'dental care professional'],
  avocat: ['law office professional books', 'lawyer desk wooden elegant', 'courthouse interior architecture', 'legal consultation meeting room', 'corporate law firm modern', 'justice scales legal'],
  'hôtel': ['luxury hotel lobby chandelier', 'hotel suite bedroom elegant', 'hotel swimming pool resort', 'boutique hotel interior design', 'hotel reception modern', 'hotel restaurant fine dining'],
  hotel: ['luxury hotel lobby chandelier', 'hotel suite bedroom elegant', 'hotel swimming pool resort', 'boutique hotel interior design', 'hotel reception modern', 'hotel restaurant fine dining'],
  riad: ['riad morocco courtyard fountain', 'moroccan architecture traditional tiles', 'riad pool garden morocco', 'moroccan interior design ornate', 'riad bedroom elegant morocco', 'moroccan tea ceremony mint'],
  garage: ['auto repair shop modern', 'car mechanic working professional', 'automotive workshop equipment', 'car service center modern', 'auto body paint professional', 'tire service automotive'],
  boulangerie: ['artisan bakery bread loaves', 'french pastry croissant golden', 'bakery display window fresh', 'bread baking oven artisan wood', 'pastry shop interior elegant', 'fresh baguette bakery french'],
  commerce: ['retail store modern interior', 'boutique shop display elegant', 'shopping store products', 'commercial storefront modern', 'retail interior design', 'product display shelves'],
  'beauté': ['beauty cosmetics luxury products', 'makeup artist professional studio', 'skincare treatment professional', 'beauty salon interior luxury', 'cosmetic products display elegant', 'beauty treatment facial'],
  immobilier: ['modern house architecture exterior', 'real estate luxury villa', 'apartment interior modern design', 'house interior living room', 'real estate office modern', 'modern kitchen interior design'],
};

export function getSectorImageQuery(sector: string, index: number = 0): string {
  const s = (sector || '').toLowerCase();
  for (const [key, queries] of Object.entries(SECTOR_IMAGE_QUERIES)) {
    if (s.includes(key)) return queries[index % queries.length];
  }
  return ['professional business modern office', 'office workspace clean modern', 'business team meeting professional', 'corporate interior modern design', 'professional service quality', 'customer service satisfaction'][index % 6];
}

export function getTemplateType(sector: string): number {
  const s = (sector || '').toLowerCase();
  if (['restaurant', 'boulangerie', 'café', 'cafe', 'traiteur', 'pizzeria'].some(k => s.includes(k))) return 1;
  if (['hôtel', 'hotel', 'riad', 'resort', 'gîte', 'camping'].some(k => s.includes(k))) return 2;
  if (['médecin', 'medecin', 'dentiste', 'clinique', 'pharmacie', 'kiné', 'ostéo'].some(k => s.includes(k))) return 3;
  if (['avocat', 'immobilier', 'commerce', 'banque', 'assurance', 'consultant'].some(k => s.includes(k))) return 4;
  if (['coiffeur', 'salon', 'beauté', 'spa', 'esthétique', 'onglerie', 'barbier'].some(k => s.includes(k))) return 5;
  return 1;
}

// --- RE-EXPORT PREMIUM TEMPLATE ---
export { generatePremiumSiteHtml } from './siteTemplate';

// --- CSV EXPORT ---
export function exportLeadsCSV(leads: Lead[], filename: string = 'leads_export.csv') {
  const headers = ['Nom', 'Email', 'Téléphone', 'Secteur', 'Ville', 'Adresse', 'Site Web', 'Note Google', 'Avis Google', 'Score', 'Température', 'Étape', 'Tags', 'Description', 'Notes'];
  const rows = leads.map(l => [
    l.name, l.email, l.phone, l.sector, l.city, l.address, l.website,
    String(l.googleRating), String(l.googleReviews),
    String(l.score), l.temperature, l.stage, l.tags.join(';'), l.description, l.notes,
  ]);
  const csv = [headers, ...rows].map(r => r.map(v => `"${(v || '').replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

// --- COLUMN MAPPING FOR IMPORT ---
export function mapColumns(headers: string[]): Record<string, string> {
  const mapping: Record<string, string> = {};
  const maps: Record<string, string[]> = {
    name: ['name', 'nom', 'business', 'entreprise', 'company', 'société', 'raison sociale', 'business name', 'nom entreprise', 'title'],
    email: ['email', 'e-mail', 'mail', 'courriel', 'adresse email', 'email address'],
    phone: ['phone', 'tel', 'téléphone', 'telephone', 'mobile', 'phone number', 'numéro'],
    sector: ['sector', 'secteur', 'category', 'catégorie', 'type', 'industry', 'activité', 'business type'],
    city: ['city', 'ville', 'localité', 'commune'],
    address: ['address', 'adresse', 'street', 'rue', 'location', 'full address'],
    website: ['website', 'site', 'site web', 'url', 'web', 'site internet', 'domain'],
    googleMapsUrl: ['google maps', 'maps url', 'maps', 'google maps url', 'link', 'google url'],
    googleRating: ['rating', 'note', 'note google', 'google rating', 'stars', 'étoiles'],
    googleReviews: ['reviews', 'avis', 'nombre avis', 'google reviews', 'review count', 'nb avis'],
  };
  const headersLower = headers.map(h => h.toLowerCase().trim());
  for (const [field, aliases] of Object.entries(maps)) {
    const idx = headersLower.findIndex(h => aliases.some(a => h.includes(a)));
    if (idx !== -1) mapping[field] = headers[idx];
  }
  return mapping;
}
