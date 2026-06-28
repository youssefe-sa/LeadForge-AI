// ============================================================
// LeadForge AI — Utility Functions
// ============================================================

import { Lead } from './types';

// --- SAFE HELPERS ---
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

// --- EMAIL VALIDATION ---
const DISPOSABLE_DOMAINS = ['tempmail.com', 'throwaway.email', 'guerrillamail.com', 'mailinator.com', 'yopmail.com', 'fakeinbox.com', 'sharklasers.com', 'guerrillamailblock.com', 'grr.la', 'dispostable.com', '10minutemail.com', 'trashmail.com', 'maildrop.cc', 'temp-mail.org', 'fakeinbox.com', 'tempmailo.com', 'mohmal.com'];
const DIRECTORY_DOMAINS = ['pagesjaunes.fr', 'google.com', 'facebook.com', 'linkedin.com', 'twitter.com', 'instagram.com', 'pinterest.com', 'tiktok.com', 'youtube.com', 'amazon.com', 'ebay.com', 'yelp.com', 'tripadvisor.com'];

export function isEmailDomainValid(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return false;
  if (DISPOSABLE_DOMAINS.includes(domain)) return false;
  if (DIRECTORY_DOMAINS.some(d => domain.includes(d))) return false;
  return true;
}

export function extractEmail(text: string): string | null {
  if (!text) return null;
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const matches = text.match(emailRegex);
  if (!matches) return null;
  for (const email of matches) {
    if (isEmailDomainValid(email)) return email.toLowerCase();
  }
  return matches[0]?.toLowerCase() || null;
}

export function extractPhone(text: string): string | null {
  if (!text) return null;
  const phoneRegex = /(?:\+33|0033|0)[1-9](?:[\s.-]?\d{2}){4}/g;
  const matches = text.match(phoneRegex);
  return matches?.[0] || null;
}

export function snippetsText(snippets: string[]): string {
  return snippets.filter(Boolean).join(' | ').substring(0, 500);
}

// --- IMAGE PROXY ---
export function proxyImage(url: string, w?: number): string {
  if (!url) return '';
  if (!url.startsWith('http')) return url;
  return `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=${w || 1200}&q=80&output=webp&default=1`;
}

export const proxyImg = proxyImage;

// --- TEMPLATE TYPE ---
export function getTemplateType(sector: string): number {
  const s = (sector || '').toLowerCase();
  if (['restaurant', 'boulangerie', 'café', 'cafe', 'traiteur', 'pizzeria'].some(k => s.includes(k))) return 1;
  if (['hôtel', 'hotel', 'riad', 'resort', 'gîte', 'camping'].some(k => s.includes(k))) return 2;
  if (['médecin', 'medecin', 'dentiste', 'clinique', 'pharmacie', 'kiné', 'ostéo'].some(k => s.includes(k))) return 3;
  if (['avocat', 'immobilier', 'commerce', 'banque', 'assurance', 'consultant'].some(k => s.includes(k))) return 4;
  if (['coiffeur', 'salon', 'beauté', 'spa', 'esthétique', 'onglerie', 'barbier'].some(k => s.includes(k))) return 5;
  return 1;
}

// --- CSV EXPORT ---
export function mapColumns(headers: string[]): Record<string, keyof Lead> {
  const mapping: Record<string, keyof Lead> = {};
  const headerMap: Record<string, keyof Lead> = {
    'nom': 'name', 'name': 'name', 'email': 'email', 'téléphone': 'phone', 'telephone': 'phone', 'phone': 'phone',
    'secteur': 'sector', 'sector': 'sector', 'ville': 'city', 'city': 'city', 'adresse': 'address', 'address': 'address',
    'site web': 'website', 'website': 'website', 'note': 'googleRating', 'rating': 'googleRating',
    'avis': 'googleReviews', 'reviews': 'googleReviews', 'description': 'description', 'score': 'score',
    'état': 'stage', 'stage': 'stage', 'notes': 'notes', 'source': 'source', 'campagne': 'campaign', 'campaign': 'campaign',
  };
  for (const h of headers) {
    const normalized = h.toLowerCase().trim();
    if (headerMap[normalized]) mapping[h] = headerMap[normalized];
  }
  return mapping;
}

export function exportLeadsCSV(leads: Lead[], filename: string = 'leads.csv'): void {
  if (!leads.length) return;
  const headers = ['name', 'email', 'phone', 'sector', 'city', 'address', 'website', 'googleRating', 'googleReviews', 'score', 'stage', 'notes'];
  const csvRows = [headers.join(',')];
  for (const lead of leads) {
    const row = headers.map(h => {
      const val = String((lead as unknown as Record<string, unknown>)[h] || '');
      return val.includes(',') ? `"${val.replace(/"/g, '""')}"` : val;
    });
    csvRows.push(row.join(','));
  }
  const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

// --- IS ENGLISH TEXT ---
export function isEnglishText(text: string): boolean {
  if (!text) return false;
  const englishWords = ['the', 'and', 'is', 'was', 'are', 'were', 'have', 'has', 'had', 'will', 'would', 'could', 'should', 'this', 'that', 'with', 'from', 'for', 'not', 'but', 'what', 'when', 'where', 'how', 'all', 'each', 'every', 'some', 'any', 'very', 'really', 'just', 'also', 'only', 'than', 'then', 'them', 'they', 'their', 'there', 'here', 'which', 'who', 'whom', 'whose', 'been', 'being', 'does', 'did', 'doing', 'done', 'made', 'make', 'made', 'good', 'great', 'best', 'nice', 'love', 'like', 'best', 'amazing', 'excellent', 'perfect', 'wonderful', 'fantastic', 'terrible', 'awful', 'horrible'];
  const words = text.toLowerCase().split(/\s+/);
  const englishCount = words.filter(w => englishWords.includes(w)).length;
  return englishCount / words.length > 0.15;
}
