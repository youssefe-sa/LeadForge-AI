// ── IMAGE FILTERS — Module unique de filtrage d'images ──

// Mots-clés bloqués dans les URLs et alt-text des images
export const BLOCKED_KEYWORDS: string[] = [
  'food', 'fruit', 'vegetable', 'legume', 'carrot', 'salmon', 'pizza', 'burger',
  'dessert', 'cake', 'meal', 'cooking', 'recipe', 'kitchen', 'dining',
  'gourmet', 'cuisine', 'plate', 'dish', 'snack', 'breakfast', 'lunch',
  'dinner', 'brunch', 'appetizer', 'restaurant-menu',
  'portrait', 'face', 'selfie', 'person', 'man ', 'woman ', 'people',
  'crowd', 'group', 'headshot', 'photo-de-profil', 'avatar', 'profile',
  'staff', 'client', 'owner', 'team',
  'logo', 'badge', 'stamp', 'seal', 'emblem', 'watermark', 'icon',
  'text-overlay', 'gradient-overlay', 'sign', 'button', 'menu',
  'advertisement', 'promo', 'flyer', 'poster', 'banner',
  'phone number', 'tel:', 'numero',
  'favicon', 'sprite', 'pixel',
  'map', 'marker',
  // NSFW / nude filtering
  'nude', 'naked', 'bare', 'topless', 'underwear', 'lingerie', 'bikini',
  'swimsuit', 'swimwear', 'sensual', 'erotic', 'intimate', 'bedroom',
  'cleavage', 'skin ', 'body ', 'torso', 'chest', 'breast',
  'striptease', 'burlesque', 'exotic',
  'sexy', 'hot girl', 'hot guy', 'attractive',
  'yoga pants', 'tight', 'revealing',
  'massage', 'spa treatment', 'wellness ritual',
  'sunset silhouette', 'beach body',
];

export const BLOCKED_DOMAINS: string[] = [
  'facebook.com', 'instagram.com', 'twitter.com', 'linkedin.com',
  'tiktok.com', 'youtube.com', 'pinterest.com', 'snapchat.com',
  'tripadvisor.com', 'yelp.com', 'pagesjaunes.fr', 'foursquare.com',
  'google.com', 'gstatic.com', 'cloudfront.net', 'googleusercontent.com',
  'maps.google', 'lh3.', 'ggpht.com', 'googleapis.com',
  'wp.com', 'wixstatic.com', 'squarespace.com',
];

const STOCK_IMAGE_DOMAINS = ['images.pexels.com', 'images.unsplash.com', 'pexels.com', 'unsplash.com'];

export function isImageBlocked(url: string, altText?: string): boolean {
  if (!url || typeof url !== 'string') return true;
  const lowUrl = url.toLowerCase();
  const lowAlt = (altText || '').toLowerCase();
  if (BLOCKED_DOMAINS.some(d => lowUrl.includes(d))) return true;
  if (BLOCKED_KEYWORDS.some(kw => lowUrl.includes(kw))) return true;
  if (lowAlt && BLOCKED_KEYWORDS.some(kw => lowAlt.includes(kw))) return true;
  return false;
}

export function filterImages(urls: string[], altTexts?: string[]): string[] {
  return urls.filter((url, i) => {
    if (!url || typeof url !== 'string') return false;
    if (!url.startsWith('https://')) return false;
    const alt = altTexts?.[i];
    return !isImageBlocked(url, alt);
  });
}

export function isStockImage(url: string): boolean {
  if (!url) return false;
  const low = url.toLowerCase();
  return STOCK_IMAGE_DOMAINS.some(d => low.includes(d));
}

export function getImageDimensions(url: string): { width: number; height: number } | null {
  const wMatch = url.match(/[?&]w=(\d+)/);
  const hMatch = url.match(/[?&]h=(\d+)/);
  if (!wMatch && !hMatch) return null;
  return {
    width: wMatch ? parseInt(wMatch[1]) : 0,
    height: hMatch ? parseInt(hMatch[1]) : 0,
  };
}

export function isLandscapeImage(url: string, minRatio: number = 1.2): boolean {
  const dims = getImageDimensions(url);
  if (!dims || dims.width === 0 || dims.height === 0) return false;
  return dims.width / dims.height >= minRatio;
}

export function filterStockImages(urls: string[]): string[] {
  return urls.filter(url => isStockImage(url));
}
