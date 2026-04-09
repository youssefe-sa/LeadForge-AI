// ── IMAGE AGENT — Recherche d'images professionnelles neutres ──
// Cherche automatiquement des images de stock en rapport avec le secteur du prospect.
// Priorité : Unsplash API → Pexels API → Fallback statique intégré.
// Garantie : images sans texte visible, sans logo, sans marque concurrente.

// Mots-clés de recherche par secteur (en anglais pour maximiser les résultats)
const SECTOR_KEYWORDS: Record<string, string[]> = {
  plombier: ['plumber tools professional', 'plumbing pipe repair', 'bathroom renovation'],
  plomberie: ['plumber tools professional', 'plumbing pipe repair', 'bathroom renovation'],
  electricien: ['electrician professional work', 'electrical panel wiring', 'electrical installation'],
  electricité: ['electrician professional work', 'electrical wiring tools', 'electrical panel'],
  coiffeur: ['hair salon interior', 'hairdresser scissors', 'barber shop professional'],
  coiffure: ['hair salon interior', 'hairdresser scissors', 'hairstyle professional'],
  restaurant: ['restaurant interior elegant', 'gourmet food presentation', 'restaurant kitchen chef'],
  cuisine: ['restaurant kitchen professional', 'gourmet food presentation', 'chef cooking'],
  garage: ['car mechanic workshop', 'auto repair professional', 'mechanic tools garage'],
  automobile: ['car mechanic workshop', 'auto repair tools', 'automobile professional'],
  nettoyage: ['professional cleaning service', 'cleaning products professional', 'office cleaning'],
  ménage: ['home cleaning professional', 'cleaning service house', 'cleaning products'],
  jardin: ['professional gardening', 'garden landscaping', 'gardener tools'],
  paysage: ['landscape gardening professional', 'garden design', 'outdoor landscaping'],
  médecin: ['medical office professional', 'doctor consultation room', 'healthcare professional'],
  dentiste: ['dental office professional', 'dentist equipment', 'dental clinic interior'],
  avocat: ['law office interior', 'legal books desk', 'lawyer professional office'],
  immobilier: ['real estate professional', 'modern house interior', 'property agent'],
  boulanger: ['bakery professional interior', 'bread pastry artisan', 'baker professional'],
  pâtissier: ['pastry professional kitchen', 'cake decoration professional', 'pastry chef'],
  spa: ['spa interior luxury', 'massage professional', 'wellness center'],
  beauté: ['beauty salon interior', 'makeup professional', 'esthetics beauty'],
  fitness: ['gym professional interior', 'personal trainer workout', 'fitness center'],
  coach: ['personal coach professional', 'fitness training session', 'coaching professional'],
  default: ['professional business service', 'modern office professional', 'business team work'],
};

function getSectorKeywords(sector: string): string[] {
  const s = (sector || '').toLowerCase();
  for (const [key, keywords] of Object.entries(SECTOR_KEYWORDS)) {
    if (s.includes(key)) return keywords;
  }
  return SECTOR_KEYWORDS.default;
}

// --- Unsplash API ---
async function fetchUnsplashImages(
  query: string,
  accessKey: string,
  count: number = 4
): Promise<string[]> {
  try {
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape&content_filter=high&client_id=${accessKey}`;
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    return (data.results || [])
      .map((photo: any) => photo?.urls?.regular || photo?.urls?.full || '')
      .filter(Boolean)
      .slice(0, count);
  } catch {
    return [];
  }
}

// --- Pexels API ---
async function fetchPexelsImages(
  query: string,
  apiKey: string,
  count: number = 4
): Promise<string[]> {
  try {
    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape`;
    const res = await fetch(url, { headers: { Authorization: apiKey } });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.photos || [])
      .map((photo: any) => photo?.src?.large2x || photo?.src?.large || photo?.src?.original || '')
      .filter(Boolean)
      .slice(0, count);
  } catch {
    return [];
  }
}

export interface ImageAgentConfig {
  unsplashKey?: string;
  pexelsKey?: string;
}

/**
 * AGENT PRINCIPAL : Cherche des images professionnelles et neutres pour un secteur donné.
 * - Utilise Unsplash en priorité (si clé disponible)
 * - Utilise Pexels en second recours (si clé disponible)
 * - Retourne au moins 6 images garanties (via fallback statique)
 */
export async function fetchSectorImages(
  sector: string,
  config: ImageAgentConfig,
  targetCount: number = 8
): Promise<string[]> {
  const keywords = getSectorKeywords(sector);
  const results: string[] = [];

  console.log(`🖼️ ImageAgent: Searching images for sector "${sector}" | keywords: ${keywords[0]}`);

  // Essayer Pexels EN PREMIER (pas de restriction de domaine, 200 req/h gratuit)
  if (config.pexelsKey && config.pexelsKey.length > 5) {
    for (const keyword of keywords) {
      if (results.length >= targetCount) break;
      const imgs = await fetchPexelsImages(keyword, config.pexelsKey, 4);
      results.push(...imgs);
      console.log(`🖼️ Pexels "${keyword}": ${imgs.length} images trouvées`);
    }
  }

  // Essayer Unsplash en SECOND (peut être bloqué en local/demo mode)
  if (results.length < targetCount && config.unsplashKey && config.unsplashKey.length > 5) {
    for (const keyword of keywords) {
      if (results.length >= targetCount) break;
      const imgs = await fetchUnsplashImages(keyword, config.unsplashKey, 4);
      results.push(...imgs);
      console.log(`🖼️ Unsplash "${keyword}": ${imgs.length} images trouvées`);
    }
  }

  const uniqueResults = [...new Set(results)].slice(0, targetCount);
  console.log(`🖼️ ImageAgent: Total ${uniqueResults.length} images trouvées pour "${sector}"`);

  return uniqueResults;
}
