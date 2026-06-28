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
 */
function buildDynamicQueries(sector: string, serviceNames: string[]): string[] {
  const sectorKeywords = extractSectorKeywords(sector);
  const queries: string[] = [];
  
  if (sectorKeywords.length > 0) {
    queries.push(`${sectorKeywords.join(' ')} professional service`);
    queries.push(`${sectorKeywords.join(' ')} business workspace`);
  }
  
  for (const name of serviceNames.slice(0, 4)) {
    const normalized = normalizeText(name);
    if (normalized.length > 3) {
      queries.push(`${normalized} professional`);
    }
  }
  
  if (sectorKeywords.length > 0) {
    queries.push(`${sectorKeywords[0]} interior modern`);
    queries.push(`${sectorKeywords[0]} team working`);
  }
  
  if (queries.length === 0) {
    queries.push(`${normalizeText(sector)} professional`);
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
 * Fetches sector images from Pexels with dynamic queries.
 * Also includes the lead's own scraped images as priority.
 */
export async function fetchSectorImagesDynamic(
  apiKey: string,
  sector: string,
  serviceNames: string[],
  leadImages: string[],
  count: number = 8
): Promise<string[]> {
  const cacheKey = `${sector}_${count}`;
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
    
    for (const query of queries) {
      if (results.length >= count) break;
      try {
        const res = await fetch(
          `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=5&orientation=landscape&size=medium&safesearch=true`,
          { headers: { Authorization: apiKey } }
        );
        if (!res.ok) continue;
        const data = await res.json();
        for (const photo of data.photos || []) {
          if (results.length >= count) break;
          const url = photo?.src?.large2x || photo?.src?.large || photo?.src?.medium || '';
          const alt = photo?.alt || '';
          if (!url || seen.has(url)) continue;
          if (!isAltTextRelevant(alt, sector)) continue;
          seen.add(url);
          results.push(url);
        }
      } catch { /* skip */ }
    }
    
    // Pass 2: relaxed validation
    if (results.length < 3) {
      for (const query of queries) {
        if (results.length >= count) break;
        try {
          const res = await fetch(
            `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=5&orientation=landscape&size=medium&safesearch=true`,
            { headers: { Authorization: apiKey } }
          );
          if (!res.ok) continue;
          const data = await res.json();
          for (const photo of data.photos || []) {
            if (results.length >= count) break;
            const url = photo?.src?.large2x || photo?.src?.large || photo?.src?.medium || '';
            if (url && !seen.has(url)) { seen.add(url); results.push(url); }
          }
        } catch { /* skip */ }
      }
    }
  }
  
  sectorImagesCache[cacheKey] = results;
  return results;
}
