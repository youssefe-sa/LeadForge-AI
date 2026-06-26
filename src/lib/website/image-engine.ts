import { Lead, ApiConfig } from '../supabase-store';
import { WebsiteImages } from './types';
import { getStaticImages } from './data/curated-images';

function getLeadHash(lead: Lead): number {
  const seed = lead.name + (lead.city || '') + (lead.sector || '');
  return seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
}

async function fetchPexelsForSector(sector: string, apiKey: string, count: number = 10): Promise<string[]> {
  if (!apiKey) return [];
  const queries: Record<string, string[]> = {
    plomberie: ['plumber working pipes leak repair', 'bathroom renovation plumbing', 'kitchen sink faucet installation', 'water heater boiler service'],
    electricien: ['electrician wiring electrical panel', 'modern lighting installation', 'smart home automation', 'electrician tools professional'],
    coiffeur: ['hair salon styling haircut', 'barber shop shaving', 'hair coloring balayage', 'salon hair treatment'],
    restaurant: ['restaurant kitchen chef cooking', 'fine dining table setting', 'restaurant interior ambiance', 'fresh ingredients cooking'],
    garage: ['auto mechanic car repair', 'car garage workshop', 'car diagnostics mechanic', 'car detailing service'],
    nettoyage: ['professional cleaning service', 'office cleaning team', 'window cleaning service', 'house cleaning fresh'],
    jardin: ['garden landscaping design', 'lawn mowing garden care', 'tree trimming arborist', 'garden flowers plants'],
    fitness: ['gym workout training', 'fitness coach personal trainer', 'yoga class fitness', 'gym equipment weights'],
    medical: ['doctor medical consultation', 'hospital modern medical', 'dentist dental care', 'medical professional stethoscope'],
    default: ['professional service workspace', 'modern office professional', 'business meeting team']
  };

  const s = (sector || '').toLowerCase();
  let sectorQueries = queries.default;
  for (const [key, q] of Object.entries(queries)) {
    if (s.includes(key)) { sectorQueries = q; break; }
  }

  const allImages: string[] = [];
  const { isImageBlocked } = await import('../imageFilters');

  for (const query of sectorQueries) {
    try {
      const resp = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape&size=medium`,
        { headers: { Authorization: apiKey } }
      );
      if (!resp.ok) continue;
      const data = await resp.json();
      for (const photo of (data.photos || [])) {
        const url = photo?.src?.large2x || photo?.src?.large || photo?.src?.medium || '';
        const alt = photo?.alt || '';
        if (url && !isImageBlocked(url, alt, sector)) {
          allImages.push(url);
        }
      }
    } catch { }
  }

  return [...new Set(allImages)];
}

export function filterImagesBySector(images: string[], sector: string): string[] {
  const s = (sector || '').toLowerCase();
  const blockedKeywords = s.includes('plomb')
    ? ['car', 'engine', 'food', 'hair', 'makeup', 'court', 'lawyer', 'medical', 'doctor']
    : s.includes('electric')
    ? ['food', 'hair', 'makeup', 'court', 'plumber', 'pipe', 'wrench']
    : s.includes('coiff')
    ? ['car', 'engine', 'food', 'court', 'lawyer', 'pipe', 'wrench']
    : s.includes('restaurant')
    ? ['car', 'engine', 'hair', 'makeup', 'court', 'pipe', 'wrench', 'electrical']
    : s.includes('garage')
    ? ['food', 'hair', 'makeup', 'court', 'pipe', 'wrench', 'medical', 'plumber']
    : s.includes('jardin')
    ? ['car', 'engine', 'food', 'hair', 'court', 'pipe', 'wrench', 'kitchen']
    : ['food', 'car', 'engine', 'hair', 'makeup', 'court', 'pipe', 'wrench'];

  return images.filter(img => {
    const low = img.toLowerCase();
    return !blockedKeywords.some(kw => low.includes(kw));
  });
}

export async function fetchImages(lead: Lead, apiConfig: ApiConfig): Promise<WebsiteImages> {
  const leadHash = getLeadHash(lead);

  const leadImages = [...(lead.images || []), ...(lead.websiteImages || [])]
    .filter(img => img && img.startsWith('https://'));

  let pexelImages: string[] = [];
  if (apiConfig.pexelsKey) {
    pexelImages = await fetchPexelsForSector(lead.sector, apiConfig.pexelsKey);
    pexelImages = filterImagesBySector(pexelImages, lead.sector);
  }

  const staticImages = getStaticImages(lead.sector, leadHash);
  const filteredStatic = filterImagesBySector(staticImages, lead.sector);

  const allImages = [...new Set([
    ...leadImages,
    ...pexelImages,
    ...filteredStatic
  ])];

  const offset = leadHash % Math.max(allImages.length, 1);
  const rotated = [...allImages.slice(offset), ...allImages.slice(0, offset)];

  return {
    hero: rotated[0] || filteredStatic[0] || '',
    gallery: rotated.slice(0, 6),
    services: rotated.slice(0, 6)
  };
}
