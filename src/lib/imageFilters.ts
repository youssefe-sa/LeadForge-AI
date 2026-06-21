// ── IMAGE FILTERS — Module unique de filtrage d'images ──
// Une seule blocklist partagée, utilisée par tous les générateurs.

// Mots-clés bloqués dans les URLs et alt-text des images
export const BLOCKED_KEYWORDS: string[] = [
  // Nourriture / Restauration (hors secteur restaurant)
  'food', 'fruit', 'vegetable', 'legume', 'carrot', 'salmon', 'pizza', 'burger',
  'dessert', 'cake', 'meal', 'cooking', 'recipe', 'kitchen', 'dining',
  'gourmet', 'cuisine', 'plate', 'dish', 'snack', 'breakfast', 'lunch',
  'dinner', 'brunch', 'appetizer', 'restaurant-menu',
  // Visages / Personnes (inutiles en hero de site pro)
  'portrait', 'face', 'selfie', 'person', 'man ', 'woman ', 'people',
  'crowd', 'group', 'headshot', 'photo-de-profil', 'avatar', 'profile',
  'staff', 'client', 'owner', 'team',
  // Marques / Graphisme / UI
  'logo', 'badge', 'stamp', 'seal', 'emblem', 'watermark', 'icon',
  'text-overlay', 'gradient-overlay', 'sign', 'button', 'menu',
  'advertisement', 'promo', 'flyer', 'poster', 'banner',
  // Contact / Coordonnées
  'phone number', 'tel:', 'numero',
  // Fichiers techniques
  'favicon', 'sprite', 'pixel',
  // Cartes / Géoloc
  'map', 'marker',
];

// Domaines bloqués (réseaux sociaux, annuaires, CDN Google, etc.)
export const BLOCKED_DOMAINS: string[] = [
  // Réseaux sociaux
  'facebook.com', 'instagram.com', 'twitter.com', 'linkedin.com',
  'tiktok.com', 'youtube.com', 'pinterest.com', 'snapchat.com',
  // Annuaires / Avis
  'tripadvisor.com', 'yelp.com', 'pagesjaunes.fr', 'foursquare.com',
  // Google / CDN (images non fiables)
  'google.com', 'gstatic.com', 'cloudfront.net', 'googleusercontent.com',
  'maps.google', 'lh3.', 'ggpht.com', 'googleapis.com',
  // Autres CDN non fiables
  'wp.com', 'wixstatic.com', 'squarespace.com',
];

/**
 * Filtre une URL d'image contre la blocklist unifiée.
 * Vérifie l'URL (domaine + mots-clés) et optionnellement l'alt-text.
 */
export function isImageBlocked(url: string, altText?: string): boolean {
  if (!url || typeof url !== 'string') return true;
  const lowUrl = url.toLowerCase();
  const lowAlt = (altText || '').toLowerCase();

  if (BLOCKED_DOMAINS.some(d => lowUrl.includes(d))) return true;
  if (BLOCKED_KEYWORDS.some(kw => lowUrl.includes(kw))) return true;
  if (lowAlt && BLOCKED_KEYWORDS.some(kw => lowAlt.includes(kw))) return true;

  return false;
}

/**
 * Filtre un tableau d'images, ne garde que les URLs valides et non bloquées.
 */
export function filterImages(urls: string[], altTexts?: string[]): string[] {
  return urls.filter((url, i) => {
    if (!url || typeof url !== 'string') return false;
    if (!url.startsWith('https://')) return false;
    const alt = altTexts?.[i];
    return !isImageBlocked(url, alt);
  });
}

/**
 * Extrait la dimension d'une URL d'image Unsplash/Pexels (width/height).
 * Retourne null si non extraction possible.
 */
export function getImageDimensions(url: string): { width: number; height: number } | null {
  const match = url.match(/(\d+)x(\d+)/);
  if (match) return { width: parseInt(match[1]), height: parseInt(match[2]) };

  const wMatch = url.match(/[?&]w=(\d+)/);
  if (wMatch) return { width: parseInt(wMatch[1]), height: 0 };

  return null;
}

/**
 * Vérifie si une image est paysage (ratio > minRatio).
 * Exclut les logos carrés, badges, avatars.
 */
export function isLandscapeImage(url: string, minRatio: number = 1.3): boolean {
  const dims = getImageDimensions(url);
  if (!dims || dims.height === 0) return true;
  return dims.width / dims.height >= minRatio;
}

/**
 * Filtre les images pour ne garder que les paysages (ratio > minRatio).
 * Utilisé pour le hero et les images principales.
 */
export function filterLandscapeImages(urls: string[], minRatio: number = 1.3): string[] {
  return urls.filter(url => isLandscapeImage(url, minRatio));
}
