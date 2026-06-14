export interface ProcessedImage {
  url: string;
  type: 'logo' | 'photo' | 'icon' | 'banner' | 'unknown';
  width?: number;
  height?: number;
  aspectRatio?: number;
  isReal: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  fixedData?: Partial<any>;
}

export interface TemplateVariation {
  id: string;
  colorScheme: string;
  layoutStyle: string;
  componentOrder: string[];
  customClasses: Record<string, string>;
  hiddenElements: string[];
  additionalFeatures: string[];
}

export interface UltimateContent {
  companyName: string;
  sector: string;
  city: string;
  description: string;
  phone?: string;
  email?: string;
  address?: string;
  website?: string;
  rating?: number;
  reviews?: number;
  services: Array<{ name: string; description: string; features: string[] }>;
  testimonials: Array<{ author: string; text: string; rating: number; date?: string }>;
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  ctaText: string;
  slogan: string;
  heroImage: string;
  allImages: string[];
}

const BLOCKED_KEYWORDS = [
  'food', 'fruit', 'legume', 'carrot', 'salmon', 'kitchen', 'cooking', 'recipe', 'meal', 'dessert',
  'cake', 'pizza', 'burger', 'restaurant-menu', 'icon', 'logo', 'banner', 'thumbnail', 'avatar',
  'placeholder', 'sprite', 'badge', 'watermark', 'favicon', 'button', 'background', 'pattern'
];

const BLOCKED_DOMAINS = [
  'tripadvisor.com', 'yelp.com', 'facebook.com', 'instagram.com',
  'pagesjaunes.fr', 'linkedin.com', 'twitter.com'
];

export function detectImageType(url: string, filename?: string): ProcessedImage['type'] {
  const lowerUrl = url.toLowerCase();
  const lowerFilename = (filename || '').toLowerCase();
  if (lowerUrl.includes('logo') || lowerFilename.includes('logo')) return 'logo';
  if (lowerUrl.includes('icon') || lowerFilename.includes('icon')) return 'icon';
  if (lowerUrl.includes('banner') || lowerFilename.includes('banner')) return 'banner';
  if (lowerUrl.includes('width=') || lowerUrl.includes('height=')) {
    const widthMatch = lowerUrl.match(/width=(\d+)/);
    const heightMatch = lowerUrl.match(/height=(\d+)/);
    if (widthMatch && heightMatch) {
      const w = parseInt(widthMatch[1], 10);
      const h = parseInt(heightMatch[1], 10);
      const ratio = w / h;
      if (ratio < 1.5 && ratio > 0.5 && (w < 300 || h < 300)) return 'logo';
      if (ratio > 3) return 'banner';
    }
  }
  if (lowerUrl.includes('200x50') || lowerUrl.includes('150x50') || lowerUrl.includes('100x100')) return 'logo';
  if (lowerUrl.includes('1200x300') || lowerUrl.includes('1920x200')) return 'banner';
  return 'photo';
}

export function validateAndCategorizeImages(images: string[], isReal: boolean = true): ProcessedImage[] {
  return images
    .filter(img => {
      if (!img || typeof img !== 'string') return false;
      if (!img.startsWith('https://')) return false;
      const low = img.toLowerCase();
      if (BLOCKED_DOMAINS.some(d => low.includes(d))) return false;
      if (BLOCKED_KEYWORDS.some(kw => low.includes(kw))) return false;
      if (low.includes('favicon') || low.includes('sprite') || low.includes('pixel')) return false;
      return true;
    })
    .map(img => {
      const urlParts = img.split('/');
      const filename = urlParts[urlParts.length - 1];
      return {
        url: img,
        type: detectImageType(img, filename),
        isReal,
      };
    });
}

export function isValidPhone(phone: string): boolean {
  if (!phone) return false;
  const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

export function isValidEmail(email: string): boolean {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidUrl(url: string): boolean {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function validateLeadData(lead: any): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const fixedData: Partial<any> = {};

  if (!lead.name || lead.name.trim().length < 2) {
    errors.push('Nom de l\'entreprise invalide ou manquant');
    fixedData.name = lead.name || 'Entreprise';
  }
  if (!lead.sector || lead.sector.trim().length < 2) {
    errors.push('Secteur invalide ou manquant');
    fixedData.sector = lead.sector || 'Services';
  }
  if (!lead.phone || !isValidPhone(lead.phone)) {
    warnings.push('Téléphone invalide ou manquant');
    fixedData.phone = lead.phone || '+33 1 23 45 67 89';
  }
  if (!lead.email || !isValidEmail(lead.email)) {
    warnings.push('Email invalide ou manquant');
    fixedData.email = lead.email || 'contact@example.com';
  }
  if (!lead.city || lead.city.trim().length < 2) {
    warnings.push('Ville invalide ou manquante');
    fixedData.city = lead.city || 'Paris';
  }
  if (!lead.address || lead.address.trim().length < 5) {
    warnings.push('Adresse invalide ou manquante');
    fixedData.address = lead.address || 'Centre Ville';
  }
  if (lead.website && !isValidUrl(lead.website)) {
    warnings.push('URL du site web invalide');
    fixedData.website = '';
  }
  if (lead.googleRating && (lead.googleRating < 1 || lead.googleRating > 5)) {
    warnings.push('Rating Google invalide, normalisé à 5');
    fixedData.googleRating = 5;
  }
  if (lead.googleReviews && (lead.googleReviews < 0 || lead.googleReviews > 10000)) {
    warnings.push('Nombre d\'avis Google invalide, normalisé à 42');
    fixedData.googleReviews = 42;
  }

  if (Object.keys(fixedData).length > 0) {
    Object.assign(lead, fixedData);
  }

  return { isValid: errors.length === 0, errors, warnings, fixedData };
}

export function normalizeSector(sector: string): string {
  return (sector || '').toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').trim();
}

export function generateCompanyHash(name: string): number {
  let hash = 0;
  const str = (name || '').toLowerCase().replace(/\s/g, '');
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function getLogoInfo(name: string, sector: string = 'default') {
  if (!name) return { initials: 'CO', text: 'Company', word1: 'Company', word2: 'Pro' };
  const skip = ['le', 'la', 'les', 'de', 'du', 'des', "l'", "d'", 'à', 'a', 'et', '&', 'en', 'pour'];
  const cleanName = name.replace(/['’]/g, "'");
  const words = cleanName.split(/\s+/).filter(w => w.length > 0 && !skip.includes(w.toLowerCase()));
  let word1 = '';
  let word2 = '';
  if (words.length === 1) {
    word1 = words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
    const lowerWord1 = word1.toLowerCase();
    const s = sector.toLowerCase();
    if (s.includes('elec') && !lowerWord1.includes('elec')) {
      word2 = 'Électricité';
    } else if (s.includes('plomb') && !lowerWord1.includes('plomb')) {
      word2 = 'Plomberie';
    } else if ((s.includes('garage') || s.includes('auto')) && !lowerWord1.includes('auto') && !lowerWord1.includes('garage')) {
      word2 = 'Automobile';
    } else if (!lowerWord1.includes('service') && !lowerWord1.includes('pro')) {
      word2 = 'Services';
    }
  } else {
    word1 = words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
    word2 = words.slice(1).join(' ').charAt(0).toUpperCase() + words.slice(1).join(' ').slice(1).toLowerCase();
  }
  const initials = `${word1.charAt(0)}${word2.charAt(0) || word1.charAt(1) || 'O'}`.toUpperCase();
  return {
    initials,
    text: `${word1}${word2 ? ' ' + word2 : ''}`.trim(),
    word1,
    word2
  };
}

export function getHeroBadge(sector: string) {
  const normalized = normalizeSector(sector);
  if (normalized.includes('plomb')) return { icon: 'droplet', text: 'Urgence 24/7' };
  if (normalized.includes('électric')) return { icon: 'zap', text: 'Installation certifiée' };
  if (normalized.includes('coiff')) return { icon: 'sparkles', text: 'Style sur mesure' };
  if (normalized.includes('restaur')) return { icon: 'utensils', text: 'Cuisine maison' };
  if (normalized.includes('garage')) return { icon: 'truck', text: 'Expert auto' };
  return { icon: 'star', text: 'Service professionnel' };
}

export function generateTemplateVariation(companyName: string, sector: string): TemplateVariation {
  const combinedString = `${companyName.toLowerCase()}${sector.toLowerCase()}`;
  let hash = 0;
  for (let i = 0; i < combinedString.length; i++) {
    hash = ((hash << 5) - hash) + combinedString.charCodeAt(i);
    hash |= 0;
  }
  hash = Math.abs(hash);
  const variations: TemplateVariation[] = [
    { id: 'fresh', colorScheme: 'modern', layoutStyle: 'split', componentOrder: ['hero', 'services', 'about', 'testimonials', 'contact'], customClasses: {}, hiddenElements: [], additionalFeatures: [] },
    { id: 'premium', colorScheme: 'bright', layoutStyle: 'centered', componentOrder: ['hero', 'about', 'services', 'testimonials', 'contact'], customClasses: {}, hiddenElements: [], additionalFeatures: [] },
    { id: 'minimal', colorScheme: 'soft', layoutStyle: 'stacked', componentOrder: ['hero', 'services', 'about', 'testimonials', 'contact'], customClasses: {}, hiddenElements: [], additionalFeatures: [] },
    { id: 'dynamic', colorScheme: 'bold', layoutStyle: 'split', componentOrder: ['hero', 'about', 'services', 'testimonials', 'contact'], customClasses: {}, hiddenElements: [], additionalFeatures: [] }
  ];
  return variations[hash % variations.length];
}

export function applyTemplateVariation(html: string, variation: TemplateVariation): string {
  return html.replace(/layout-variant-\d/, `layout-variant-${variation.id === 'fresh' ? 0 : variation.id === 'premium' ? 1 : variation.id === 'minimal' ? 2 : 3}`);
}

export function generateAboutText(templateText: string, lead: any): string {
  if (!templateText || !lead) return templateText;
  const name = lead.name || 'Notre équipe';
  const city = lead.city || 'votre région';
  return templateText.replace(/\bEntreprise\b/, name).replace(/\bà votre région\b/, `à ${city}`).trim();
}

export function generateFeaturesFromService(name: string, description: string, sector: string): string[] {
  const defaultFeatures = ['Tarifs transparents', 'Intervention rapide', 'Satisfaction garantie'];
  const serviceName = (name || '').toLowerCase();
  const serviceDesc = (description || '').toLowerCase();
  const featureDictionary: Record<string, string[]> = {
    'plomb': ['Détection rapide', 'Réparation durable', 'Fuite maîtrisée'],
    'electricité': ['Normes respectées', 'Sécurité renforcée', 'Installation propre'],
    'électricien': ['Normes respectées', 'Sécurité renforcée', 'Installation propre'],
    'chauffage': ['Confort optimisé', 'Pilotage intelligent', 'Économie d\'énergie'],
    'coiff': ['Conseil visagisme', 'Finition soignée', 'Coloration personnalisée'],
    'restaur': ['Produits frais', 'Création du chef', 'Ambiance chaleureuse'],
    'garage': ['Contrôle précis', 'Réparation nette', 'Diagnostic complet'],
    'nettoy': ['Hygiène parfaite', 'Produits verts', 'Résultat impeccable']
  };
  for (const [keyword, features] of Object.entries(featureDictionary)) {
    if (serviceName.includes(keyword) || serviceDesc.includes(keyword)) {
      return features;
    }
  }
  const keywords = serviceDesc.match(/\b(installation|réparation|remplacement|rénovation|entretien|dépannage|conseil|sur-mesure|professionnel|certifié|garanti|rapide|qualité|économique)\b/g);
  if (keywords && keywords.length > 0) {
    return keywords.slice(0, 3).map(k => `${k.charAt(0).toUpperCase()}${k.slice(1)} garanti`);
  }
  return defaultFeatures;
}

export function cleanAuthorName(author: string): string {
  return (author || 'Client').trim();
}

export function cleanReviewText(text: string): string {
  return (text || '').trim();
}

export function formatReviewDate(dateString: string): string {
  if (!dateString) return '';
  return dateString;
}

export function extractServiceFromReview(text: string, sector: string): string {
  return '';
}

export function extractAndValidateRealReviews(googleReviewsData: any[], lead: any): Array<{ author: string; text: string; rating: number; date: string; service?: string; isReal: boolean }> {
  return (googleReviewsData || [])
    .filter(item => item && item.text && item.author)
    .slice(0, 6)
    .map(item => ({
      author: cleanAuthorName(item.author),
      text: cleanReviewText(item.text),
      rating: item.rating || 5,
      date: formatReviewDate(item.date || ''),
      service: extractServiceFromReview(item.text, lead.sector),
      isReal: true
    }));
}

export function getAuthenticReviews(sector: string): Array<{ author: string; text: string; rating: number; date: string; service?: string }> {
  const normalized = (sector || '').toLowerCase();
  const baseReviews: Record<string, Array<{ author: string; text: string; rating: number; date: string; service?: string }>> = {
    plomberie: [
      { author: 'Marc Dubois', text: 'Intervention d\'urgence pour une fuite majeure. Très sérieux et tarifs transparents.', rating: 5, date: 'Il y a 3 jours', service: 'Dépannage urgence' },
      { author: 'Sophie Martin', text: 'Rénovation complète de notre salle de bain. Travail impeccable, respect des délais et du budget.', rating: 5, date: 'Il y a 1 semaine', service: 'Rénovation salle de bain' }
    ],
    electricien: [
      { author: 'Alain Richard', text: 'Mise aux normes complète. Travail sérieux et attestation fournie.', rating: 5, date: 'Il y a 4 jours', service: 'Mise aux normes' },
      { author: 'Isabelle Moreau', text: 'Installation de notre borne de recharge. Raccordement propre et testé.', rating: 5, date: 'Il y a 1 semaine', service: 'Borne de recharge' }
    ],
    coiffeur: [
      { author: 'Camille Sanchez', text: 'Coupe et coloration parfaites exactement ce que je voulais.', rating: 5, date: 'Il y a 2 jours', service: 'Coupe et coloration' },
      { author: 'Laura Martinez', text: 'Balayage subtil et naturel. Le résultat est magnifique.', rating: 5, date: 'Il y a 5 jours', service: 'Balayage' }
    ],
    restaurant: [
      { author: 'Antoine Chevalier', text: 'Menu dégustation exceptionnel, service attentif et vins accordés parfaitement.', rating: 5, date: 'Il y a 1 jour', service: 'Menu dégustation' },
      { author: 'Marie Dupont', text: 'Soirée anniversaire organisée parfaitement, ambiance top.', rating: 5, date: 'Il y a 3 jours', service: 'Événement privé' }
    ],
    garage: [
      { author: 'Stéphane Weber', text: 'Réparation moteur complexe parfaitement exécutée. Voiture comme neuve.', rating: 5, date: 'Il y a 2 jours', service: 'Réparation moteur' },
      { author: 'Aurélie Meyer', text: 'Changement 4 pneus et géométrie complète. Service rapide et précis.', rating: 5, date: 'Il y a 4 jours', service: 'Pneumatique' }
    ],
    nettoyage: [
      { author: 'Laurent Weber', text: 'Nettoyage de fin de chantier impeccable. Travail sérieux et efficace.', rating: 5, date: 'Il y a 3 jours', service: 'Fin de chantier' },
      { author: 'Sophie Klein', text: 'Nettoyage bureaux mensuel discret et parfait.', rating: 5, date: 'Il y a 1 semaine', service: 'Nettoyage bureaux' }
    ]
  };
  return baseReviews[Object.keys(baseReviews).find(key => normalized.includes(key)) || ''] || [];
}

export function buildCompleteTestimonialList(realReviews: Array<any>, sector: string, targetCount: number): Array<{ author: string; text: string; rating: number; date: string; service?: string; isReal?: boolean }> {
  const authentic = getAuthenticReviews(sector);
  const merged = [...realReviews.map(r => ({ ...r, isReal: true })), ...authentic.map(r => ({ ...r, isReal: false }))];
  return merged.slice(0, targetCount);
}

// Remove exact-duplicate images (normalize by removing query strings and protocol)
export function dedupeImages(images: ProcessedImage[]): ProcessedImage[] {
  if (!images || images.length === 0) return [];
  const seen = new Set<string>();
  const out: ProcessedImage[] = [];
  for (const img of images) {
    if (!img || !img.url) continue;
    const normalized = img.url.split('?')[0].replace(/^https?:\/\/(www\.)?/, '');
    if (seen.has(normalized)) continue;
    seen.add(normalized);
    out.push(img);
  }
  return out;
}

// Lightweight URL-based image optimization: append host-specific resizing / compression params
export function optimizeImageUrl(url: string, maxWidth: number = 1200): string {
  if (!url || typeof url !== 'string') return url;
  const base = url.split('?')[0];
  const lower = base.toLowerCase();
  if (lower.includes('images.unsplash.com')) {
    return `${base}?w=${maxWidth}&auto=format&fit=crop&q=60`;
  }
  if (lower.includes('pexels') || lower.includes('images.pexels.com')) {
    return `${base}?auto=compress&cs=tinysrgb&dpr=1&w=${maxWidth}`;
  }
  if (lower.includes('cdn.pixabay.com')) {
    return `${base}?image_type=photo&w=${maxWidth}`;
  }
  // For other hosts, return base URL (consumer can enable a CDN/resizer later)
  return base;
}

// Select a limited number of images prioritizing banners and real photos
export function selectBestImages(images: ProcessedImage[], count: number): ProcessedImage[] {
  if (!images || images.length === 0) return [];
  const deduped = dedupeImages(images);
  const banners = deduped.filter(i => i.type === 'banner');
  const realPhotos = deduped.filter(i => i.isReal && i.type === 'photo');
  const stockPhotos = deduped.filter(i => !i.isReal && i.type === 'photo');
  const logos = deduped.filter(i => i.type === 'logo');
  const others = deduped.filter(i => !['banner', 'photo', 'logo'].includes(i.type));
  const ordered = [...banners, ...realPhotos, ...stockPhotos, ...logos, ...others];
  return ordered.slice(0, count);
}
