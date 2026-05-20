// Service API Pexels dynamique avec recherche sectorielle
// Télécharge les images dans Supabase Storage pour persistance

import { supabase } from './supabase';

// API key handled server‑side; removed from client

// Mots-clés de recherche par secteur (en anglais pour Pexels)
const SECTOR_SEARCH_QUERIES: Record<string, string[]> = {
  plomberie: ['plumber working', 'plumbing repair', 'plumber fixing pipe', 'plumber tools', 'bathroom repair'],
  electricien: ['electrician working', 'electrical repair', 'electrician tools', 'wiring installation', 'circuit breaker'],
  coiffeur: ['hairdresser working', 'hair stylist salon', 'barber cutting hair', 'hair salon professional', 'hairdresser tools'],
  restaurant: ['chef cooking', 'restaurant kitchen', 'professional cooking', 'chef preparing food', 'restaurant service'],
  garage: ['mechanic working', 'car repair shop', 'auto mechanic', 'car maintenance', 'garage workshop'],
  nettoyage: ['cleaning service', 'professional cleaner', 'office cleaning', 'janitor working', 'cleaning equipment'],
  jardin: ['gardener working', 'landscaping professional', 'garden maintenance', 'lawn care', 'tree trimming'],
  fitness: ['personal trainer', 'gym workout', 'fitness coach', 'gym equipment', 'athletic training'],
  medical: ['doctor consultation', 'medical professional', 'healthcare worker', 'clinic interior', 'medical examination'],
  avocat: ['lawyer office', 'legal professional', 'attorney working', 'law firm', 'legal consultation'],
  default: ['professional working', 'business service', 'artisan working', 'trade professional', 'service worker']
};

// Mots-clés à éviter pour filtrer les images de nourriture
const BLOCKED_IMAGE_KEYWORDS = [
  'food', 'fruit', 'vegetable', 'carrot', 'salmon', 'pizza', 'burger', 
  'dessert', 'cake', 'meal', 'cooking', 'recipe', 'kitchen', 'dining',
  'restaurant food', 'gourmet', 'cuisine', 'plate', 'dish', 'snack',
  'breakfast', 'lunch', 'dinner', 'brunch', 'appetizer'
];

interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
  };
  photographer: string;
  alt: string;
}

interface PexelsSearchResponse {
  photos: PexelsPhoto[];
  total_results: number;
  page: number;
  per_page: number;
}

/**
 * Recherche des images sur l'API Pexels pour un secteur donné
 */
export async function searchPexelsImages(sector: string, perPage: number = 10): Promise<string[]> {
  // Proxy request to server‑side endpoint that injects the API key securely
  const response = await fetch(`/api/pexels/search?sector=${encodeURIComponent(sector)}&perPage=${perPage}`);
  if (!response.ok) {
    console.warn('⚠️ Pexels proxy error', response.status);
    return [];
  }
  const data = await response.json();
  return data.urls || [];
}

/**
 * Télécharge une image et la stocke dans Supabase Storage
 */
export async function downloadAndStoreImage(
  imageUrl: string, 
  leadId: string, 
  index: number
): Promise<string | null> {
  try {
    // Télécharger l'image
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.status}`);
    }
    
    const blob = await response.blob();
    
    // Vérifier que c'est bien une image
    if (!blob.type.startsWith('image/')) {
      throw new Error('Not an image file');
    }
    
    // Générer un nom de fichier unique
    const fileName = `${leadId}/image_${index}_${Date.now()}.webp`;
    
    // Uploader dans Supabase Storage
    const { data, error } = await supabase.storage
      .from('site-images')
      .upload(fileName, blob, {
        contentType: 'image/webp',
        cacheControl: '3600',
        upsert: true
      });
    
    if (error) {
      throw error;
    }
    
    // Récupérer l'URL publique
    const { data: publicUrlData } = supabase.storage
      .from('site-images')
      .getPublicUrl(fileName);
    
    console.log(`✅ Image stockée: ${publicUrlData.publicUrl}`);
    return publicUrlData.publicUrl;
    
  } catch (error) {
    console.error('❌ Erreur stockage image:', error);
    return null;
  }
}

/**
 * Obtient des images pour un lead (API Pexels + Storage)
 * PRIORITÉ 1: Images réelles du lead
 * PRIORITÉ 2: Images API Pexels stockées dans Supabase
 */
export async function getImagesForLead(
  lead: { 
    id: string; 
    sector?: string; 
    images?: string[]; 
    websiteImages?: string[];
  },
  count: number = 6
): Promise<string[]> {
  const leadId = lead.id;
  const sector = lead.sector || 'default';
  
  // 1. Récupérer les images réelles du lead (filtrées)
  const rawLeadImages = [...(lead.images || []), ...(lead.websiteImages || [])]
    .filter(img => {
      if (!img || typeof img !== 'string') return false;
      if (!img.startsWith('https://')) return false;
      const low = img.toLowerCase();
      // Bloquer les images de nourriture
      if (BLOCKED_IMAGE_KEYWORDS.some(kw => low.includes(kw))) return false;
      // Bloquer les domaines suspects
      if (low.includes('tripadvisor') || low.includes('yelp.com') || low.includes('facebook.com')) return false;
      return true;
    });
  
  console.log(`🖼️ ${leadId}: ${rawLeadImages.length} images réelles trouvées`);
  
  // Si on a assez d'images réelles, les utiliser
  if (rawLeadImages.length >= count) {
    return rawLeadImages.slice(0, count);
  }
  
  // 2. Compléter avec l'API Pexels
  const neededImages = count - rawLeadImages.length;
  console.log(`🔍 Recherche de ${neededImages} images sur Pexels API...`);
  
  const pexelsUrls = await searchPexelsImages(sector, neededImages + 5); // +5 pour avoir de la marge si certaines échouent
  
  // 3. Télécharger et stocker les images Pexels
  const storedUrls: string[] = [];
  for (let i = 0; i < pexelsUrls.length && storedUrls.length < neededImages; i++) {
    const storedUrl = await downloadAndStoreImage(pexelsUrls[i], leadId, i);
    if (storedUrl) {
      storedUrls.push(storedUrl);
    }
  }
  
  // 4. Combiner: réelles + stockées
  const combinedImages = [...rawLeadImages, ...storedUrls];
  
  console.log(`✅ ${leadId}: ${rawLeadImages.length} réelles + ${storedUrls.length} Pexels stockées = ${combinedImages.length} total`);
  
  return combinedImages.slice(0, count);
}

/**
 * Fonction de fallback si l'API échoue - utilise les images statiques
 */
export function getFallbackImages(sector: string): string[] {
  // Import dynamique pour éviter les dépendances circulaires
  const { getSectorImages } = require('./pexelsImages');
  return getSectorImages(sector);
}
