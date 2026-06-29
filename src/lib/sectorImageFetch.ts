// ============================================================
// Dynamic Sector Image Fetcher
// Builds Pexels queries from sector name + service names.
// Falls back to lead's own scraped images.
// ============================================================

/**
 * Normalizes French accented characters to ASCII.
 */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extracts meaningful keywords from a sector name.
 */
function extractSectorKeywords(sector: string): string[] {
  const normalized = normalizeText(sector);
  const words = normalized.split(' ').filter(w => w.length > 2);
  const stopwords = new Set(['les', 'des', 'une', 'pour', 'avec', 'dans', 'sur', 'pro', 'services', 'professionnel', 'specialiste', 'enterprise', 'societe', 'atelier', 'centre', 'studio', 'cabinet', 'bureau', 'agence', 'shop', 'store', 'house', 'group', 'plus', 'best', 'top', 'new', 'the', 'and', 'for', 'your', 'our']);
  return words.filter(w => !stopwords.has(w) && w.length > 2);
}

/**
 * Builds dynamic Pexels search queries from sector + service names.
 * Uses "person working at" style to avoid logos/cartes d'affaires.
 */
function buildDynamicQueries(sector: string, serviceNames: string[]): string[] {
  const sectorKeywords = extractSectorKeywords(sector);
  const queries: string[] = [];

  if (sectorKeywords.length > 0) {
    const sectorWord = sectorKeywords.join(' ');
    queries.push(`person working at ${sectorWord}`);
    queries.push(`${sectorWord} professional photography`);
    queries.push(`${sectorWord} tools equipment`);
  }

  for (const name of serviceNames.slice(0, 4)) {
    const normalized = normalizeText(name);
    if (normalized.length > 3) {
      queries.push(`person working at ${normalized}`);
    }
  }

  if (sectorKeywords.length > 0) {
    queries.push(`${sectorKeywords[0]} workplace hands`);
  }

  if (queries.length === 0) {
    queries.push(`person working at ${normalizeText(sector)}`);
  }

  return queries;
}

/**
 * Checks if alt text is relevant to the sector.
 */
function isAltTextRelevant(altText: string, sector: string): boolean {
  const lowAlt = (altText || '').toLowerCase();
  if (!lowAlt) return true;
  const keywords = extractSectorKeywords(sector);
  if (keywords.length === 0) return true;
  return keywords.some(kw => lowAlt.includes(kw));
}

// Cache
const sectorImagesCache: Record<string, string[]> = {};

/**
 * Simple string hash for lead variability.
 * Returns a positive integer used as Pexels page offset.
 */
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + ch;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

/**
 * Basic heuristic to detect images that likely contain text/logos/watermarks.
 * Returns true if the image URL pattern looks like a business card or logo.
 */
function looksLikeTextImage(url: string, altText: string): boolean {
  const lowAlt = (altText || '').toLowerCase();
  const textIndicators = [
    'logo', 'brand', 'business card', 'carte de visite',
    'phone number', 'telephone', 'numéro', 'contact info',
    'banner', 'poster', 'flyer', 'affiche', 'presse',
    'watermark', 'stock photo', 'shutterstock', 'getty',
  ];
  for (const indicator of textIndicators) {
    if (lowAlt.includes(indicator)) return true;
  }
  return false;
}

/**
 * Fetches sector images from Pexels with dynamic queries.
 * Also includes the lead's own scraped images as priority.
 * @param leadHash - hash of lead name+city for variability (each lead gets different images)
 */
export async function fetchSectorImagesDynamic(
  apiKey: string,
  sector: string,
  serviceNames: string[],
  leadImages: string[],
  count: number = 8,
  leadHash: number = 0
): Promise<string[]> {
  const cacheKey = `${sector}_${count}_${leadHash % 50}`;
  if (sectorImagesCache[cacheKey]) return sectorImagesCache[cacheKey];

  const results: string[] = [];
  const seen = new Set<string>();

  // Priority 1: Lead's own scraped images (already verified real)
  for (const img of leadImages) {
    if (results.length >= count) break;
    if (img && img.startsWith('http') && !seen.has(img)) {
      seen.add(img);
      results.push(img);
    }
  }

  // Priority 2: Pexels API with dynamic queries
  if (apiKey && results.length < count) {
    const queries = buildDynamicQueries(sector, serviceNames);
    const pageOffset = (leadHash % 5) + 1;

    for (const query of queries) {
      if (results.length >= count) break;
      try {
        const res = await fetch(
          `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=5&page=${pageOffset}&orientation=landscape&size=large&safesearch=true`,
          { headers: { Authorization: apiKey } }
        );
        if (!res.ok) continue;
        const data = await res.json();
        for (const photo of data.photos || []) {
          if (results.length >= count) break;
          const url = photo?.src?.large2x || photo?.src?.large || '';
          const alt = photo?.alt || '';
          if (!url || seen.has(url)) continue;
          if (looksLikeTextImage(url, alt)) continue;
          if (!isAltTextRelevant(alt, sector)) continue;
          seen.add(url);
          results.push(url);
        }
      } catch { /* skip */ }
    }

    // Pass 2: relaxed validation (skip alt-text + text filter)
    if (results.length < 3) {
      for (const query of queries) {
        if (results.length >= count) break;
        try {
          const res = await fetch(
            `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=5&page=${pageOffset + 2}&orientation=landscape&size=large&safesearch=true`,
            { headers: { Authorization: apiKey } }
          );
          if (!res.ok) continue;
          const data = await res.json();
          for (const photo of data.photos || []) {
            if (results.length >= count) break;
            const url = photo?.src?.large2x || photo?.src?.large || '';
            if (url && !seen.has(url)) { seen.add(url); results.push(url); }
          }
        } catch { /* skip */ }
      }
    }
  }

  sectorImagesCache[cacheKey] = results;
  return results;
}
