// ============================================================
// Dynamic Sector Image Fetcher
// Builds Pexels queries from the sector name + service names.
// Works for ANY sector — no hardcoded list needed.
// ============================================================

/**
 * Normalizes French accented characters to ASCII equivalents.
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
 * "Plomberie & Chauffage" → ["plomberie", "chauffage"]
 * "Restaurant italien" → ["restaurant", "italien"]
 */
function extractSectorKeywords(sector: string): string[] {
  const normalized = normalizeText(sector);
  const words = normalized.split(' ').filter(w => w.length > 2);
  // Remove very generic words that would pollute search results
  const stopwords = new Set(['les', 'des', 'une', 'pour', 'avec', 'dans', 'sur', 'pro', 'services', 'professionnel', 'specialiste', 'specialiste', 'enterprise', 'societe', 'atelier', 'centre', 'studio', 'cabinet', 'bureau', 'agence', 'shop', 'store', 'house', 'group', 'plus', 'best', 'top', 'new', 'the', 'and', 'for', 'your', 'our']);
  return words.filter(w => !stopwords.has(w) && w.length > 2);
}

/**
 * Validates if an image's alt text is relevant to the sector.
 * Checks if ANY of the sector keywords appear in the alt text.
 * For unknown sectors, extracts keywords from the sector name itself.
 */
function validateImageForSector(altText: string, sector: string): boolean {
  const lowAlt = (altText || '').toLowerCase();
  if (!lowAlt) return true; // If no alt text, accept (can't reject)
  
  const keywords = extractSectorKeywords(sector);
  if (keywords.length === 0) return true; // No keywords to check against
  
  // At least one sector keyword must appear in the alt text
  return keywords.some(kw => lowAlt.includes(kw));
}

/**
 * Builds dynamic Pexels search queries from sector name + service names.
 * No hardcoded mapping — works for any sector automatically.
 */
function buildDynamicQueries(sector: string, serviceNames: string[]): string[] {
  const sectorKeywords = extractSectorKeywords(sector);
  const queries: string[] = [];
  
  // Strategy 1: Sector name + "professional" (e.g., "vétérinaire professional")
  if (sectorKeywords.length > 0) {
    queries.push(`${sectorKeywords.join(' ')} professional`);
    queries.push(`${sectorKeywords.join(' ')} business`);
  }
  
  // Strategy 2: Each service name as a query (e.g., "vaccination animal professional")
  for (const name of serviceNames.slice(0, 4)) {
    const normalized = normalizeText(name);
    if (normalized.length > 3) {
      queries.push(`${normalized} professional`);
    }
  }
  
  // Strategy 3: Sector keywords combined with generic professional terms
  if (sectorKeywords.length > 0) {
    queries.push(`${sectorKeywords[0]} workspace interior`);
    queries.push(`${sectorKeywords[0]} service work`);
  }
  
  // Strategy 4: Fallback — just the sector name
  if (queries.length === 0) {
    queries.push(`${normalizeText(sector)} professional`);
    queries.push(`${normalizeText(sector)} business`);
  }
  
  return queries;
}

// Cache to avoid repeated API calls for the same sector
const sectorImagesCache: Record<string, string[]> = {};
const serviceImageCache: Record<string, string> = {};

/**
 * Fetches sector-specific images from Pexels.
 * Builds queries dynamically from sector name + service names.
 * Validates each image's alt text against sector keywords.
 * Works for ANY sector — no predefined list needed.
 */
export async function fetchValidatedSectorImages(
  apiKey: string,
  sector: string,
  serviceNames: string[],
  count: number = 6
): Promise<string[]> {
  const cacheKey = `${sector}_${count}`;
  if (sectorImagesCache[cacheKey]) return sectorImagesCache[cacheKey];
  
  const queries = buildDynamicQueries(sector, serviceNames);
  const results: string[] = [];
  const seen = new Set<string>();
  
  // Pass 1: Strict validation — only accept images with matching alt text
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
        if (!validateImageForSector(alt, sector)) continue;
        seen.add(url);
        results.push(url);
      }
    } catch { /* skip */ }
  }
  
  // Pass 2: Relaxed — accept any image from the sector queries (no alt validation)
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
  
  sectorImagesCache[cacheKey] = results;
  return results;
}

/**
 * Fetches a single validated image for a specific service.
 * Dynamically builds query from sector + service name.
 */
export async function fetchValidatedServiceImage(
  apiKey: string,
  sector: string,
  serviceName: string
): Promise<string> {
  const cacheKey = `${sector}_${serviceName}`;
  if (serviceImageCache[cacheKey]) return serviceImageCache[cacheKey];
  
  const serviceQuery = normalizeText(serviceName);
  const sectorQuery = extractSectorKeywords(sector).join(' ');
  const query = `${sectorQuery} ${serviceQuery} professional`.substring(0, 100);
  
  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=5&orientation=landscape&size=medium&safesearch=true`,
      { headers: { Authorization: apiKey } }
    );
    if (!res.ok) return '';
    const data = await res.json();
    for (const photo of data.photos || []) {
      const url = photo?.src?.large2x || photo?.src?.large || photo?.src?.medium || '';
      const alt = photo?.alt || '';
      if (url && validateImageForSector(alt, sector)) {
        serviceImageCache[cacheKey] = url;
        return url;
      }
    }
    // Fallback: accept any image from the query
    for (const photo of data.photos || []) {
      const url = photo?.src?.large2x || photo?.src?.large || photo?.src?.medium || '';
      if (url) { serviceImageCache[cacheKey] = url; return url; }
    }
  } catch { /* skip */ }
  return '';
}
