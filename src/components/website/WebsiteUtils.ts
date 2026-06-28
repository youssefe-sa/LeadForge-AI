// ============================================================
// LeadForge AI — Website Generation Utilities
// HTML extraction, validation, content generation
// ============================================================

import { Lead, ApiConfig, callLLM, safeStr } from '../../lib/supabase-store';

export const getCssVar = (name: string, fallback: string) => {
  const val = getComputedStyle(document.documentElement).getPropertyValue(`--${name}`).trim();
  return val || fallback;
};

export const contrastColor = (bg: string, fg: string) => {
  const luminance = (hex: string) => {
    const rgb = hex.replace('#', '').match(/.{2}/g)!.map(v => parseInt(v, 16) / 255);
    const a = rgb.map(v => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  };
  const bgLum = luminance(bg);
  const fgLum = luminance(fg);
  const contrast = (Math.max(bgLum, fgLum) + 0.05) / (Math.min(bgLum, fgLum) + 0.05);
  if (contrast < 4.5) {
    return bgLum > 0.5 ? '#1C1B18' : '#FFFFFF';
  }
  return fg;
};

export function extractHtml(response: string): string | null {
  if (!response) return null;
  let html = response.replace(/```html?\s*/gi, '').replace(/```\s*/g, '').trim();
  const invalidPatterns = [/video/i, /iframe.*youtube/i, /iframe.*vimeo/i, /pappers/i, /data:video/i, /\.mp4/i, /\.webm/i, /\.avi/i];
  for (const pattern of invalidPatterns) {
    if (pattern.test(html)) return null;
  }
  const requiredElements = [/<head/i, /<body/i, /<nav/i, /<section/i, /<footer/i];
  if (!requiredElements.every(pattern => pattern.test(html))) return null;
  const doctypeMatch = html.match(/<!DOCTYPE\s+html[\s\S]*<\/html>/i);
  if (doctypeMatch) return doctypeMatch[0];
  const htmlMatch = html.match(/<html[\s\S]*<\/html>/i);
  if (htmlMatch) return `<!DOCTYPE html>\n${htmlMatch[0]}`;
  if (html.startsWith('<!DOCTYPE') || html.startsWith('<html')) {
    if (!html.includes('</html>')) html += '\n</html>';
    return html;
  }
  return null;
}

export function validateHtml(html: string): boolean {
  if (!html || html.length < 3000) return false;
  const checks = [html.includes('<head'), html.includes('<body'), html.includes('<style'), html.includes('</html>'), html.includes('section') || html.includes('main'), html.includes('nav') || html.includes('header')];
  return checks.filter(Boolean).length >= 3;
}

export function shouldForceFallback(html: string | null): boolean {
  if (!html) return true;
  const suspiciousPatterns = [/video/i, /iframe/i, /pappers/i, /data:video/i, /youtube\.com/i, /vimeo\.com/i, /\.mp4/i, /\.webm/i];
  return suspiciousPatterns.some(pattern => pattern.test(html));
}

export interface SiteContent {
  heroTitle: string; heroSubtitle: string; aboutText: string;
  services: Array<{ name: string; description: string; icon?: string }>;
  cta: string; testimonials: Array<{ author: string; text: string; rating: number; date: string }>;
  galleryTitle?: string; aboutTitle?: string; servicesTitle?: string; contactTitle?: string;
  whyChooseUs?: string[];
  heroStyle?: string; layoutStyle?: string; colorScheme?: string; fontStyle?: string;
}

export const SECTOR_SERVICES: Record<string, string[]> = {
  restaurant: ['Cuisine gastronomique', 'Service traiteur', 'Événements privés', 'Menu dégustation', 'Vins et boissons', 'Brunch dominical'],
  boulangerie: ['Boulangerie artisanale', 'Pâtisserie maison', 'Viennoiseries fraîches', 'Commandes événementielles', 'Pain de tradition', 'Créations sur mesure'],
  coiffeur: ['Coupe moderne', 'Coloration professionnelle', 'Soin capillaire', 'Extension cheveux', 'Coiffure homme', 'Soins barbe'],
  plomberie: ['Dépannage urgence 24h/24', 'Installation sanitaire', 'Chauffage & chaudière', 'Détection de fuites', 'Rénovation salle de bain', 'Entretien annuel'],
  electricien: ['Mise aux normes', 'Dépannage électrique', 'Installation complète', 'Domotique & smart home', 'Éclairage LED', 'Bornes de recharge'],
  garage: ['Diagnostic moteur', 'Révision complète', 'Pneumatiques', 'Carrosserie', 'Climatisation', 'Contrôle technique'],
  hôtel: ['Chambres premium', 'Service petit-déjeuner', 'Salle de réunion', 'Navette aéroport', 'Concierge', 'Restaurant gastronomique'],
  dentiste: ['Blanchiment dentaire', 'Implants & couronnes', 'Orthodontie', 'Soins préventifs', 'Détartrage professionnel', 'Chirurgie orale'],
  médecin: ['Consultation généraliste', 'Bilan de santé', 'Vaccination', 'Suivi médical', 'Examens biologiques', 'Télémédecine'],
  kiné: ['Rééducation articulaire', 'Massage thérapeutique', 'Rééducation respiratoire', 'Rééducation périnéale', 'Kiné du sport', 'Ostéopathie'],
  avocat: ['Droit de la famille', 'Droit du travail', 'Droit pénal', 'Droit des affaires', 'Droit immobilier', 'Médiation'],
  notaire: ['Actes de vente', 'Successions & donations', 'Conventions matrimoniales', 'Création de société', 'Conseil patrimonial', 'Testaments'],
  jardin: ['Création de jardins', 'Tonte & entretien', 'Élagage & abattage', 'Terrasses & clôtures', 'Arrosage automatique', 'Potager & verger'],
  fitness: ['Coaching personnel', 'Cours collectifs', 'Musculation libre', 'Cardio zone', 'Préparation physique', 'Espace bien-être'],
  nettoyage: ['Nettoyage de bureaux', 'Nettoyage vitres', 'Grand nettoyage', 'Désinfection', 'Nettoyage industriel', 'Remise en état'],
  spa: ['Massage relaxant', 'Soin du visage', 'Gommage corps', 'Manucure & pédicure', 'Épilation', 'Routine bien-être'],
  default: ['Consultation', 'Service professionnel', 'Devis gratuit', 'Accompagnement', 'Maintenance', 'Suivi personnalisé'],
};

export const WHY_CHOOSE: Record<string, string[]> = {
  restaurant: ['Produits frais et locaux', 'Recettes authentiques faites maison', 'Ambiance chaleureuse et accueil', 'Menu créatif et de saison'],
  coiffeur: ['Coiffeurs experts des dernières tendances', 'Produits de qualité premium', 'Salon moderne et relaxant', 'Consultation personnalisée'],
  plomberie: ['Artisans qualifiés et certifiés', 'Travail garanti décennal', 'Tarifs transparents et justes', 'Intervention urgence rapide'],
  electricien: ['Installations conformes aux normes', 'Matériel de qualité professionnelle', 'Service après-vente inclus', 'Devis gratuit et détaillé'],
  garage: ['Mécaniciens certifiés et expérimentés', 'Diagnostic et devis transparents', 'Pièces originales et de qualité', "Délais d'intervention rapides"],
  médecin: ['Équipement médical de dernière génération', 'Environnement stérile et confortable', 'Soins doux et sans douleur', 'Horaires flexibles et sans attendre'],
  avocat: ['Confidentialité et discrétion', 'Expertise juridique approfondie', 'Suivi personnalisé de votre dossier', 'Conseils clairs et compréhensibles'],
  spa: ['Ambiance zen et relaxante', 'Produits naturels et bio', 'Techniques de soin authentiques', 'Personnel formé et certifié'],
  fitness: ['Coachs diplômés et expérimentés', 'Équipements dernière génération', 'Programmes personnalisés', 'Communauté motivante'],
  nettoyage: ['Produits certifiés écologiques', 'Personnel formé et fiable', 'Horaires flexibles', 'Contrôle qualité après chaque passage'],
  jardin: ['Paysagistes certifiés et passionnés', 'Adapté au climat local', 'Approche écologique et durable', 'Santé des plantes garantie'],
  default: ['Équipe experte avec des années d\'expérience', 'Devis transparent sans frais cachés', 'Satisfaction client garantie', 'Solutions adaptées à chaque besoin'],
};

export const WHY_CHOOSE_EN: Record<string, string[]> = {
  restaurant: ['Fresh, locally sourced ingredients', 'Authentic homemade recipes', 'Warm and welcoming atmosphere', 'Seasonal and creative menu'],
  coiffeur: ['Expert stylists with latest trends', 'Premium quality products', 'Relaxing and modern salon', 'Personalized consultation'],
  plomberie: ['Qualified and certified tradespeople', 'Guaranteed workmanship', 'Transparent and fair pricing', 'Fast emergency response'],
  electricien: ['Certified and experienced electricians', 'Quality professional equipment', 'After-sales service included', 'Free and detailed quotes'],
  garage: ['Certified and experienced mechanics', 'Transparent diagnosis and quotes', 'Original and quality parts', 'Quick turnaround time'],
  médecin: ['State-of-the-art medical equipment', 'Sterile and comfortable environment', 'Gentle and pain-free care', 'Flexible appointment scheduling'],
  avocat: ['Confidentiality and discretion', 'Deep legal expertise', 'Personalized case follow-up', 'Clear and understandable advice'],
  spa: ['Zen and relaxing atmosphere', 'Natural and organic products', 'Authentic care techniques', 'Trained and certified staff'],
  fitness: ['Certified and experienced coaches', 'Latest generation equipment', 'Personalized programs', 'Motivating community'],
  nettoyage: ['Eco-friendly certified products', 'Trained and reliable staff', 'Flexible scheduling', 'Quality inspection after each visit'],
  jardin: ['Certified and passionate landscapers', 'Adapted to local climate', 'Ecological and sustainable approach', 'Guaranteed plant health'],
  default: ['Expert team with years of experience', 'Transparent quotes with no hidden fees', 'Customer satisfaction guaranteed', 'Tailored solutions for every need'],
};

export function getServices(sector: string): string[] {
  const s = (sector || '').toLowerCase();
  for (const [key, services] of Object.entries(SECTOR_SERVICES)) {
    if (s.includes(key)) return services;
  }
  return SECTOR_SERVICES.default;
}

export function getWhyChoose(sector: string, lang: 'fr' | 'en' = 'fr'): string[] {
  const s = (sector || '').toLowerCase();
  const table = lang === 'en' ? WHY_CHOOSE_EN : WHY_CHOOSE;
  for (const [key, reasons] of Object.entries(table)) {
    if (s.includes(key)) return reasons;
  }
  return table.default;
}

export function generateContent(lead: Lead, hasLLM: boolean, apiConfig: ApiConfig): Promise<SiteContent> {
  // Returns a promise for async content generation
  return Promise.resolve(generateDefaultContent(lead));
}

function generateDefaultContent(lead: Lead): SiteContent {
  const sector = (lead.sector || '').toLowerCase();
  const lang = detectLanguage(lead);
  const isEn = lang === 'en';
  const services = getServices(sector);
  const whyChoose = getWhyChoose(sector, lang);
  return {
    heroTitle: lead.name,
    heroSubtitle: lead.description || `${lead.name} — ${lead.sector || (isEn ? 'professional' : 'professionnel')}${lead.city ? (isEn ? ` in ${lead.city}` : ` à ${lead.city}`) : ''}.`,
    aboutText: lead.description || `${lead.name} ${isEn ? 'is a' : 'est un'} ${lead.sector || (isEn ? 'business' : 'établissement')}${lead.city ? (isEn ? ` located in ${lead.city}` : ` situé à ${lead.city}`) : ''}.`,
    services: services.map((name, i) => ({
      name,
      description: isEn ? `${name} — Professional service tailored to your needs.` : `${name} — Prestation professionnelle adaptée à vos besoins.`,
      icon: ['✦', '◆', '●', '◇', '○', '▹'][i]
    })),
    cta: isEn ? 'Contact Us' : 'Contactez-nous',
    testimonials: (lead.googleReviewsData || []).map(r => ({ author: safeStr(r.author), text: safeStr(r.text), rating: r.rating || 5, date: safeStr(r.date) })),
    galleryTitle: isEn ? 'Our Portfolio' : 'Nos Réalisations',
    aboutTitle: isEn ? 'Our Business' : 'Notre Établissement',
    servicesTitle: isEn ? 'Our Services' : 'Nos Services',
    contactTitle: 'Contact',
    whyChooseUs: whyChoose,
  };
}

import { detectLanguage } from '../../lib/ultimateTemplate';
