import { useState, useMemo, useRef, useEffect } from 'react';
import { Lead, ApiConfig, callLLM, callLLMForWebsite, generateWebsitePrompt, safeStr, proxyImg } from '../lib/supabase-store';
import { generateProfessionalSite } from '../lib/professionalTemplate';
import { generateUltimateSite } from '../lib/ultimateTemplate';
import { generatePremiumSiteHtml } from '../lib/siteTemplate';

const C = {
  bg: '#F7F6F2', surface: '#FFFFFF', surface2: '#F2F1EC',
  border: '#E4E2DA', tx: '#1C1B18', tx2:
   '#5C5A53', tx3: '#9B9890',
  accent: '#D4500A', accent2: '#F0E8DF',
  green: '#1A7A4A', blue: '#1A4FA0', amber: '#B45309', red: '#C0392B',
};

interface Props {
  leads: Lead[];
  updateLead: (id: string, updates: Partial<Lead>) => void;
  apiConfig: ApiConfig;
}

interface ChatMessage { role: 'user' | 'assistant'; text: string; }

const SECTOR_PALETTES: Record<string, { p: string; p2: string; dk: string; lt: string; font: string }> = {
  restaurant: { p: '#E8590C', p2: '#FB923C', dk: '#1c1917', lt: '#FFF7ED', font: 'Playfair Display' },
  coiffeur: { p: '#7C3AED', p2: '#A78BFA', dk: '#1e1040', lt: '#F5F3FF', font: 'Cormorant Garamond' },
  salon: { p: '#DB2777', p2: '#F472B6', dk: '#2d0a20', lt: '#FDF2F8', font: 'Cormorant Garamond' },
  spa: { p: '#0D9488', p2: '#2DD4BF', dk: '#042f2e', lt: '#F0FDFA', font: 'Tenor Sans' },
  médecin: { p: '#2563EB', p2: '#60A5FA', dk: '#172554', lt: '#EFF6FF', font: 'Inter' },
  dentiste: { p: '#0891B2', p2: '#22D3EE', dk: '#0c4a6e', lt: '#ECFEFF', font: 'Inter' },
  avocat: { p: '#1e3a5f', p2: '#3b82f6', dk: '#0f172a', lt: '#F1F5F9', font: 'Libre Baskerville' },
  hôtel: { p: '#B45309', p2: '#F59E0B', dk: '#1c1917', lt: '#FFFBEB', font: 'Cormorant Garamond' },
  default: { p: '#D4500A', p2: '#F97316', dk: '#1c1917', lt: '#FFF7ED', font: 'Plus Jakarta Sans' },
};

function getSectorPalette(sector: string) {
  const s = (sector || '').toLowerCase();
  for (const [k, v] of Object.entries(SECTOR_PALETTES)) { if (s.includes(k)) return v; }
  return SECTOR_PALETTES.default;
}

// CURATED IMAGES — source.unsplash.com is DEAD since 2025
const CURATED_FALLBACKS: Record<string, string[]> = {
  restaurant: [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1200&fit=crop&q=80',
  ],
  coiffeur: [
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1521590832167-7228fcb8c1b5?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&fit=crop&q=80',
  ],
  salon: [
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1596178060810-72f53ce9a65c?w=1200&fit=crop&q=80',
  ],
  spa: [
    'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1540555700478-4be289fbec6e?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=1200&fit=crop&q=80',
  ],
  médecin: [
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1551076805-e1869033e561?w=1200&fit=crop&q=80',
  ],
  dentiste: [
    'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=1200&fit=crop&q=80',
  ],
  avocat: [
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1521791055366-0d553872125f?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?w=1200&fit=crop&q=80',
  ],
  hôtel: [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1455587734955-081b22074882?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&fit=crop&q=80',
  ],
  garage: [
    'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1200&fit=crop&q=80',
  ],
  default: [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&fit=crop&q=80',
  ],
};

function getCuratedFallback(sector: string, index: number): string {
  const s = (sector || '').toLowerCase();
  for (const [k, v] of Object.entries(CURATED_FALLBACKS)) {
    if (k !== 'default' && s.includes(k)) return v[index % v.length];
  }
  if (s.includes('beauté') || s.includes('beauty') || s.includes('esthéti')) return CURATED_FALLBACKS.salon[index % 6];
  if (s.includes('hotel') || s.includes('riad')) return CURATED_FALLBACKS.hôtel[index % 6];
  if (s.includes('barb')) return CURATED_FALLBACKS.coiffeur[index % 6];
  return CURATED_FALLBACKS.default[index % 6];
}

export default function WebsiteGen({ leads, updateLead, apiConfig }: Props) {
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0, name: '', step: '' });
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [showEditor, setShowEditor] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const hasLLM = !!apiConfig.groqKey;
  const enriched = leads.filter(l => l.score > 0 && !l.siteGenerated);
  const generated = leads.filter(l => l.siteGenerated);
  const previewLead = useMemo(() => leads.find(l => l.id === previewId) || null, [leads, previewId]);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chatMessages, chatLoading]);

  // ── SHORTER, MORE EFFECTIVE AI PROMPT ──
  const buildShortPrompt = (lead: Lead, styleHint?: string): { prompt: string; system: string } => {
    const pal = getSectorPalette(lead.sector);
    const n = safeStr(lead.name);
    const sector = safeStr(lead.sector) || 'Professionnel';
    const city = safeStr(lead.city);
    const ph = safeStr(lead.phone);
    const em = safeStr(lead.email);
    const addr = safeStr(lead.address);
    const wa = ph.replace(/[^0-9+]/g, '');
    const hrs = safeStr(lead.hours || lead.serperHours);
    const rating = lead.googleRating;
    const reviews = lead.googleReviews;

    const rawImgs = [...new Set([...(lead.images || []), ...(lead.websiteImages || [])].filter(u => typeof u === 'string' && u.startsWith('http')))];
    const allImgs = rawImgs.map(u => proxyImg(u, 1200));
    let _fbIdx = 0;
    while (allImgs.length < 6) { allImgs.push(getCuratedFallback(lead.sector, _fbIdx)); _fbIdx++; }

    const revTexts = (lead.googleReviewsData || []).filter(r => r && safeStr(r.text).length > 5).slice(0, 4)
      .map(r => `"${safeStr(r.text)}" — ${safeStr(r.author)} (${r.rating}★)`).join('\n');

    const styles = ['elegant classic with full-screen hero overlay', 'split-screen modern with side-by-side hero', 'dark bold premium with dark background and neon accents', 'minimal zen with maximum whitespace and centered text', 'colorful modern with rounded corners and floating cards', 'magazine editorial with asymmetric grid layout'];

    const system = `Tu es un expert en développement web et design UI/UX. Crée des sites web MODERNES, PROFESSIONNELS et UNIQUES.

PRINCIPES:
- Design épuré et moderne
- Structure HTML5 sémantique
- CSS responsive et animations fluides
- Contenu personnalisé selon le secteur
- Performance optimisée

RÈGLES STRICTES:
- JAMAIS de vidéos ou iframes
- JAMAIS de contenu externe (Pappers, etc.)
- UNiquement HTML/CSS/JavaScript vanilla
- Images statiques uniquement
- Structure complète avec nav, sections, footer

Directives:
- Utiliser les couleurs et polices fournies
- Intégrer les images harmonieusement
- Créer un design unique pour chaque entreprise
- Assurer une parfaite responsivité
- HTML valide et bien structuré

Retourne UNIQUEMENT le code HTML complet, sans markdown.`;

    const prompt = `Crée un site web PROFESSIONNEL pour "${n}" (${sector} à ${city || 'France'}).

STYLE: Design moderne, épuré et unique
PALETTE: ${pal.p} (primaire), ${pal.p2} (secondaire), ${pal.dk} (sombre), ${pal.lt} (clair)
POLICES: titres=${pal.font}, corps=Plus Jakarta Sans

INFOS CLIENT:
- Entreprise: ${n}
- Secteur: ${sector} 
- Localisation: ${city || 'France'}, ${addr || ''}
- Contact: ${ph || 'Non renseigné'}, ${em || 'Non renseigné'}
- Rating: ${rating > 0 ? rating + '/5 (' + reviews + ' avis)' : 'Non noté'}
${revTexts ? '\nAVIS CLIENTS:\n' + revTexts : ''}

IMAGES: ${allImgs.slice(0, 6).map((u, i) => `${i + 1}. ${u}`).join('\n')}

SECTIONS OBLIGATOIRES:
1. Hero avec titre, sous-titre, boutons CTA
2. Navigation fixe responsive
3. Services (6-8 cartes)
4. Portfolio/Galerie
5. Témoignages
6. Contact avec formulaire
7. Footer

EXIGENCES:
- Design unique et professionnel
- 100% responsive
- Animations fluides
- HTML sémantique
- Min 5000 caractères
- PAS DE VIDÉOS, PAS D'IFRAMES
- UNIQUEMENT HTML/CSS/JS VANILLA

Retourne UNIQUEMENT le HTML complet.`;

    return { prompt, system };
  };

  const extractHtml = (response: string): string | null => {
    if (!response) return null;
    let html = response.replace(/```html?\s*/gi, '').replace(/```\s*/g, '').trim();
    
    // VALIDATIONS STRICTES
    const invalidPatterns = [
      /<video/i,
      /<iframe.*youtube/i,
      /<iframe.*vimeo/i,
      /pappers/i,
      /<script.*src.*video/i,
      /data:video/i,
      /\.mp4/i,
      /\.webm/i,
      /\.avi/i
    ];
    
    // Rejeter si contenu invalide détecté
    for (const pattern of invalidPatterns) {
      if (pattern.test(html)) {
        // Log uniquement en développement
        if (process.env.NODE_ENV === 'development') {
          console.warn('Contenu invalide détecté, rejet du HTML');
        }
        return null;
      }
    }
    
    // Doit contenir les éléments de base d'un site professionnel
    const requiredElements = [
      /<head/i,
      /<body/i,
      /<nav/i,
      /<section/i,
      /<footer/i
    ];
    
    const hasRequiredElements = requiredElements.every(pattern => pattern.test(html));
    if (!hasRequiredElements) {
      // Log uniquement en développement
      if (process.env.NODE_ENV === 'development') {
        console.warn('Structure HTML incomplète');
      }
      return null;
    }
    
    const doctypeMatch = html.match(/<!DOCTYPE\s+html[\s\S]*<\/html>/i);
    if (doctypeMatch) return doctypeMatch[0];
    const htmlMatch = html.match(/<html[\s\S]*<\/html>/i);
    if (htmlMatch) return `<!DOCTYPE html>\n${htmlMatch[0]}`;
    if (html.startsWith('<!DOCTYPE') || html.startsWith('<html')) {
      if (!html.includes('</html>')) html += '\n</html>';
      return html;
    }
    return null;
  };

  const validateHtml = (html: string): boolean => {
    if (!html || html.length < 3000) return false;
    const checks = [
      html.includes('<head'), 
      html.includes('<body'), 
      html.includes('<style'), 
      html.includes('</html>'),
      html.includes('section') || html.includes('main'),
      html.includes('nav') || html.includes('header')
    ];
    return checks.filter(Boolean).length >= 3;
  };

  // ── FORCED FALLBACK IF AI GENERATES BAD CONTENT ──
  const shouldForceFallback = (html: string | null): boolean => {
    if (!html) return true;
    
    // Force fallback si contenu suspect
    const suspiciousPatterns = [
      /<video/i,
      /<iframe/i,
      /pappers/i,
      /data:video/i,
      /youtube\.com/i,
      /vimeo\.com/i,
      /\.mp4/i,
      /\.webm/i
    ];
    
    return suspiciousPatterns.some(pattern => pattern.test(html));
  };

  // ── GENERATE CONTENT FOR FALLBACK TEMPLATE ──
  const generateContent = async (lead: Lead) => {
    type SC = {
      heroTitle: string; heroSubtitle: string; aboutText: string;
      services: Array<{ name: string; description: string; icon?: string }>;
      cta: string; testimonials: Array<{ author: string; text: string; rating: number; date: string }>;
      galleryTitle?: string; aboutTitle?: string; servicesTitle?: string; contactTitle?: string;
      whyChooseUs?: string[];
      // 🎨 NOUVEAUX CHAMPS POUR VARIATIONS
      heroStyle?: string; layoutStyle?: string; colorScheme?: string; fontStyle?: string;
    };

    const sector = (lead.sector || '').toLowerCase();
    const sectorServices: Record<string, string[]> = {
      restaurant: ['Cuisine gastronomique', 'Service traiteur', 'Événements privés', 'Menu dégustation', 'Vins et boissons', 'Brunch dominical'],
      coiffeur: ['Coupe moderne', 'Coloration professionnelle', 'Soin capillaire', 'Extension cheveux', 'Coiffure homme', 'Soins barbe'],
      plomberie: ['Dépannage urgence', 'Installation sanitaire', 'Chauffage', 'Plomberie générale', 'Diagnostic fuite', 'Rénovation salle de bain'],
      garage: ['Diagnostic moteur', 'Révision complète', 'Pneumatique', 'Carrosserie', 'Vidange', 'Contrôle technique'],
      hôtel: ['Chambres premium', 'Service petit-déjeuner', 'Salle de réunion', 'Navette aéroport', 'Concierge', 'Restaurant gastronomique'],
      default: ['Consultation', 'Service standard', 'Solution premium', 'Support client', 'Maintenance', 'Formation']
    };

    const getServices = () => {
      for (const [key, services] of Object.entries(sectorServices)) {
        if (sector.includes(key)) return services;
      }
      return sectorServices.default;
    };

    // 🎯 VARIATIONS DE CONTENU BASÉES SUR LE PROSPECT
    const seed = lead.name + (lead.city || '') + (lead.sector || '');
    const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    const heroStyles = [
      'hero-split-screen', 'hero-fullscreen-overlay', 'hero-minimal-center', 
      'hero-bold-left', 'hero-gradient-right', 'hero-image-background'
    ];
    const layoutStyles = [
      'layout-modern-grid', 'layout-classic-centered', 'layout-asymmetric',
      'layout-magazine', 'layout-cards', 'layout-minimal'
    ];
    
    const content: SC = {
      heroTitle: lead.name,
      heroSubtitle: lead.description || `Expert ${lead.sector || 'professionnel'} à ${lead.city || 'votre région'}. Qualité et confiance.`,
      aboutText: lead.description || `${lead.name} est votre ${lead.sector || 'partenaire professionnel'} de confiance${lead.city ? ` à ${lead.city}` : ''}. Nous combinons expertise et savoir-faire pour vous offrir un service d'excellence.`,
      services: getServices().map((name, i) => ({ 
        name, 
        description: `Solution professionnelle ${name.toLowerCase()} adaptée à vos besoins spécifiques.`,
        icon: ['⚡', '🔧', '🏆', '💎', '🛡️', '📞'][i] 
      })),
      cta: 'Demander un devis',
      testimonials: (lead.googleReviewsData || []).map(r => ({ author: safeStr(r.author), text: safeStr(r.text), rating: r.rating || 5, date: safeStr(r.date) })),
      galleryTitle: 'Nos Réalisations',
      aboutTitle: 'Notre Expertise',
      servicesTitle: 'Nos Services',
      contactTitle: 'Contactez-nous',
      whyChooseUs: [
        `Expertise confirmée en ${lead.sector || 'notre domaine'}`,
        'Engagement qualité et satisfaction',
        'Réactivité et disponibilité',
        'Tarifs compétitifs et transparents'
      ],
      // 🎨 VARIATIONS UNIQUES
      heroStyle: heroStyles[hash % heroStyles.length],
      layoutStyle: layoutStyles[(hash + 1) % layoutStyles.length],
      colorScheme: `scheme-${(hash % 8) + 1}`,
      fontStyle: `font-${(hash % 6) + 1}`
    };

    if (hasLLM) {
      try {
        const basePrompt = lead.generatedPrompt || generateWebsitePrompt(lead);
        const prompt = `Génère du contenu RICHE et SPÉCIFIQUE pour "${lead.name}" (${lead.sector || 'professionnel'} à ${lead.city || 'France'}).

Contexte: ${basePrompt.substring(0, 1500)}

Retourne UNIQUEMENT du JSON avec ces champs:
- heroTitle: titre accrocheur avec le nom "${lead.name}" (max 8 mots)
- heroSubtitle: sous-titre 2-3 phrases captivantes
- aboutText: paragraphe narratif de 5+ phrases (pas corporate)
- servicesTitle: titre créatif pour la section services
- aboutTitle: titre créatif pour la section à propos
- services: array de 6 objets {name, description (2-3 phrases), icon (emoji)}
- whyChooseUs: array de 4 raisons spécifiques au secteur
- cta: texte du bouton CTA
Tout en français. Spécifique au secteur "${lead.sector || 'professionnel'}".`;

        const response = await callLLM(apiConfig, prompt, 'Copywriter web expert français. Retourne UNIQUEMENT du JSON valide sans markdown.');
        if (response) {
          const jsonStr = response.replace(/```json?\s*/gi, '').replace(/```\s*/g, '').trim();
          const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const data = JSON.parse(jsonMatch[0]);
            if (data.heroTitle) content.heroTitle = safeStr(data.heroTitle);
            if (data.heroSubtitle) content.heroSubtitle = safeStr(data.heroSubtitle);
            if (data.aboutText) content.aboutText = safeStr(data.aboutText);
            if (data.servicesTitle) content.servicesTitle = safeStr(data.servicesTitle);
            if (data.aboutTitle) content.aboutTitle = safeStr(data.aboutTitle);
            if (data.cta) content.cta = safeStr(data.cta);
            if (Array.isArray(data.services) && data.services.length >= 3) {
              content.services = data.services.slice(0, 6).map((s: Record<string, unknown>) => ({
                name: safeStr(s.name) || 'Service', description: safeStr(s.description) || '', icon: safeStr(s.icon) || '✦',
              }));
            }
            if (Array.isArray(data.whyChooseUs)) content.whyChooseUs = data.whyChooseUs.map((w: unknown) => safeStr(w)).filter(Boolean);
          }
        }
      } catch { /* use defaults */ }
    }
    return content;
  };

  // ── GENERATE SITE — TEMPLATE PREMIUM PROFESSIONNEL ──
  const generateSite = async (lead: Lead) => {
    const slug = lead.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').substring(0, 30);
    setProgress(p => ({ ...p, step: '📝 Génération du contenu...' }));
    try {
      // Contenu riche puis template premium (hero image, secteur, galerie, WhatsApp)
      const content = await generateContent(lead);
      setProgress(p => ({ ...p, step: '🎨 Génération du site premium...' }));
      const html = generatePremiumSiteHtml(lead, content);
      const baseUrl = ((import.meta as any).env?.VITE_APP_URL as string | undefined)?.replace(/\/$/, '') || window.location.origin;
      updateLead(lead.id, {
        siteGenerated: true, siteHtml: html,
        siteUrl: `${baseUrl}/api/sites/${lead.id}`,
        landingUrl: `${baseUrl}/api/sites/${lead.id}`,
        stage: lead.stage === 'new' || lead.stage === 'enriched' ? 'site_generated' : lead.stage,
      });
      
    } catch (e) {
      // Log uniquement en développement
      if (process.env.NODE_ENV === 'development') {
        console.error('Generation failed:', e);
      }
      setProgress(p => ({ ...p, step: '🔄 Fallback template...' }));
      const emergencyHtml = generateProfessionalSite(lead);
      const baseUrl = ((import.meta as any).env?.VITE_APP_URL as string | undefined)?.replace(/\/$/, '') || window.location.origin;
      updateLead(lead.id, {
        siteGenerated: true, siteHtml: emergencyHtml,
        siteUrl: `${baseUrl}/api/sites/${lead.id}`,
        landingUrl: `${baseUrl}/api/sites/${lead.id}`,
        stage: lead.stage === 'new' || lead.stage === 'enriched' ? 'site_generated' : lead.stage,
      });
    }
  };

  // ── EMERGENCY TEMPLATE (100% FOOLPROOF) ──
  const generateEmergencySite = (lead: Lead): string => {
    const n = safeStr(lead.name);
    const sec = safeStr(lead.sector) || 'Professionnel';
    const city = safeStr(lead.city);
    const ph = safeStr(lead.phone);
    const em = safeStr(lead.email);
    const addr = safeStr(lead.address);
    const desc = safeStr(lead.description) || `Professionnel ${sec} de confiance${city ? ' à ' + city : ''}.`;
    
    return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${n} - ${sec}${city ? ' à ' + city : ''}</title>
    <meta name="description" content="${desc.substring(0, 160)}">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; line-height: 1.6; color: #333; }
        .hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 100px 0; text-align: center; }
        .hero h1 { font-size: 3rem; font-weight: 700; margin-bottom: 20px; }
        .hero p { font-size: 1.2rem; margin-bottom: 30px; opacity: 0.9; }
        .btn-primary { background: #ff6b6b; border: none; padding: 15px 30px; border-radius: 50px; font-weight: 600; text-decoration: none; display: inline-block; transition: all 0.3s; }
        .btn-primary:hover { background: #ff5252; transform: translateY(-2px); }
        .section { padding: 80px 0; }
        .info-card { background: #f8f9fa; border-radius: 15px; padding: 30px; margin: 20px 0; border: 1px solid #e9ecef; }
        .contact-info { background: #ffffff; border-radius: 15px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
        .footer { background: #2d3436; color: white; padding: 40px 0; text-align: center; }
    </style>
</head>
<body>
    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <h1>${n}</h1>
            <p>${desc}</p>
            <a href="#contact" class="btn-primary">Contactez-nous</a>
        </div>
    </section>

    <!-- About Section -->
    <section class="section">
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <div class="info-card">
                        <h2>Notre Expertise</h2>
                        <p>${sec} professionnel avec années d'expérience${city ? ' à ' + city : ''}. Nous garantissons un service de qualité.</p>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="info-card">
                        <h2>Nos Services</h2>
                        <ul>
                            <li>Service professionnel</li>
                            <li>Intervention rapide</li>
                            <li>Devis gratuit</li>
                            <li>Garantie satisfaction</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section class="section" id="contact">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <div class="contact-info">
                        <h2 class="text-center mb-4">Contactez-nous</h2>
                        <div class="row">
                            ${ph ? `<div class="col-md-6 mb-3"><strong>Téléphone:</strong><br><a href="tel:${ph}">${ph}</a></div>` : ''}
                            ${em ? `<div class="col-md-6 mb-3"><strong>Email:</strong><br><a href="mailto:${em}">${em}</a></div>` : ''}
                            ${addr ? `<div class="col-12 mb-3"><strong>Adresse:</strong><br>${addr}</div>` : ''}
                        </div>
                        <div class="text-center mt-4">
                            <a href="tel:${ph || '#'}" class="btn-primary">Appeler maintenant</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 ${n}. Tous droits réservés.</p>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`;
  };

  const generateBatch = async () => {
    if (enriched.length === 0) return;
    setGenerating(true);
    setProgress({ current: 0, total: enriched.length, name: '', step: '' });
    for (let i = 0; i < enriched.length; i++) {
      setProgress({ current: i + 1, total: enriched.length, name: enriched[i].name, step: '🤖 Génération...' });
      await generateSite(enriched[i]);
      if (i < enriched.length - 1) await new Promise(r => setTimeout(r, 800));
    }
    setGenerating(false);
  };

  // ── AI CHAT EDITOR ──
  const handleChatSend = async () => {
    if (!chatInput.trim() || !previewLead || chatLoading) return;
    const msg = chatInput.trim();
    setChatInput('');
    setChatMessages(prev => [...prev, { role: 'user', text: msg }]);
    setChatLoading(true);

    try {
      const { prompt, system } = buildShortPrompt(previewLead, msg.includes('couleur') || msg.includes('color') ? msg : undefined);
      const fullPrompt = `${prompt}\n\nMODIFICATION DEMANDÉE PAR L'UTILISATEUR:\n"${msg}"\n\nApplique cette modification au site. Retourne le HTML COMPLET modifié.`;
      const response = await callLLMForWebsite(apiConfig, fullPrompt, system);
      const extracted = extractHtml(response);

      if (extracted && validateHtml(extracted)) {
        updateLead(previewLead.id, { siteHtml: extracted });
        setChatMessages(prev => [...prev, { role: 'assistant', text: `✅ Site modifié avec succès ! La modification "${msg}" a été appliquée. Le site est rafraîchi dans la prévisualisation.` }]);
      } else {
        // Fallback: regenerate with template
        const content = await generateContent(previewLead);
        const html = generatePremiumSiteHtml(previewLead, content);
        updateLead(previewLead.id, { siteHtml: html });
        setChatMessages(prev => [...prev, { role: 'assistant', text: `⚠️ L'IA n'a pas pu modifier directement. Le site a été régénéré avec un nouveau design. Réessayez votre demande.` }]);
      }
    } catch {
      setChatMessages(prev => [...prev, { role: 'assistant', text: '❌ Erreur lors de la modification. Vérifiez votre clé API.' }]);
    }
    setChatLoading(false);
  };

  const openPreview = (id: string) => { setPreviewId(id); setChatMessages([]); setShowEditor(false); };

  // ── CHANGER PALETTE DE COULEURS ──
  const changePalette = async () => {
    if (!previewLead) return;
    setGenerating(true);
    setProgress({ current: 1, total: 1, name: previewLead.name, step: '🎨 Changement de palette...' });
    
    try {
      // Forcer une nouvelle seed pour générer une palette différente
      // On modifie temporairement le nom pour générer une nouvelle palette
      const originalName = previewLead.name;
      const tempLead = { 
        ...previewLead, 
        name: previewLead.name + '_' + Date.now().toString() // Ajouter timestamp pour forcer nouvelle palette
      };
      
      // Générer le contenu avec la nouvelle palette
      const content = await generateContent(tempLead);
      const html = generatePremiumSiteHtml(tempLead, content);
      
      // Mettre à jour le site avec la nouvelle palette mais restaurer le nom original
      const baseUrl = ((import.meta as any).env?.VITE_APP_URL as string | undefined)?.replace(/\/$/, '') || window.location.origin;
      updateLead(previewLead.id, { 
        siteHtml: html,
        siteUrl: `${baseUrl}/api/sites/${previewLead.id}`,
        landingUrl: `${baseUrl}/api/sites/${previewLead.id}`,
      });
      
      // Forcer le rafraîchissement de l'aperçu
      setTimeout(() => {
        setPreviewId(null);
        setTimeout(() => setPreviewId(previewLead.id), 100);
      }, 500);
    } catch (error) {
      console.error('Erreur lors du changement de palette:', error);
      setProgress(p => ({ ...p, step: '❌ Erreur lors du changement de palette' }));
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="animate-fade" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start', 
        marginBottom: 28,
        position: 'sticky',
        top: 0,
        zIndex: 10,
        background: C.bg,
        padding: '20px 0',
        borderBottom: `1px solid ${C.border}`
      }}>
        <div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 700, color: C.tx, marginBottom: 4 }}>Website Generator</h1>
          <p style={{ color: C.tx3, fontSize: 14 }}>
            Template premium (hero image, galerie, avis, WhatsApp) + contenu IA
            {hasLLM ? ' ✅ IA active' : ' — ⚠️ Ajoutez une clé LLM'}
          </p>
        </div>
        <button onClick={generateBatch} disabled={generating || enriched.length === 0} style={{
          padding: '10px 20px', borderRadius: 6, border: 'none',
          background: generating ? C.tx3 : C.blue, color: '#fff',
          fontWeight: 600, fontSize: 14, cursor: generating ? 'default' : 'pointer',
        }}>
          {generating ? `Génération ${progress.current}/${progress.total}...` : `🌐 Générer ${enriched.length} sites`}
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Sites Générés', value: generated.length, color: C.green, icon: '✅' },
          { label: 'En Attente', value: enriched.length, color: C.amber, icon: '⏳' },
          { label: 'Avec IA', value: leads.filter(l => l.siteGenerated).length, color: C.blue, icon: '🤖' },
          { label: 'Total Leads', value: leads.length, color: C.accent, icon: '📊' },
        ].map((s, i) => (
          <div key={i} style={{
            background: C.surface, borderRadius: 8, padding: '20px 22px',
            borderLeft: `3px solid ${s.color}`, boxShadow: '0 1px 3px rgba(28,27,24,0.06)',
          }}>
            <div style={{ fontSize: 12, color: C.tx3, fontWeight: 500, marginBottom: 6 }}>{s.icon} {s.label}</div>
            <div style={{ fontSize: 32, fontWeight: 700, fontFamily: "'Fraunces', serif", color: C.tx }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Info box */}
      <div style={{
        background: '#eff6ff', borderRadius: 8, padding: '14px 18px', marginBottom: 20,
        border: '1px solid #bfdbfe', borderLeft: `4px solid ${C.blue}`,
        fontSize: 13, color: '#1e40af', lineHeight: 1.6,
      }}>
        <strong>🎨 Site professionnel :</strong> Chaque site utilise le template premium (hero avec image, couleurs par secteur, galerie, témoignages Google, bouton WhatsApp, formulaire de contact). Le contenu (titres, services, à propos) est généré par l’IA quand une clé LLM est configurée. <strong>Éditeur IA</strong> intégré pour modifier le site après génération.
      </div>

      {/* Progress */}
      {generating && (
        <div style={{ background: C.surface, borderRadius: 8, padding: '16px 20px', border: `1px solid ${C.border}`, marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 13, fontWeight: 500 }}>🌐 {progress.name}</span>
            <span style={{ fontSize: 12, color: C.tx3, fontFamily: "'DM Mono', monospace" }}>{progress.current}/{progress.total}</span>
          </div>
          <div style={{ fontSize: 12, color: C.blue, marginBottom: 8 }}>{progress.step}</div>
          <div style={{ height: 6, borderRadius: 3, background: C.surface2, overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: 3, background: `linear-gradient(90deg, ${C.blue}, ${C.accent})`,
              width: `${(progress.current / progress.total) * 100}%`, transition: 'width 500ms ease',
            }} />
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Generated */}
        <div style={{ background: C.surface, borderRadius: 8, padding: '20px', border: `1px solid ${C.border}` }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16, color: C.green }}>✅ Sites Générés ({generated.length})</h3>
          <div style={{ maxHeight: 500, overflowY: 'auto' }}>
            {generated.map(l => (
              <div key={l.id} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '12px', borderBottom: `1px solid ${C.border}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {l.logo && <img src={l.logo} alt="" style={{ width: 28, height: 28, borderRadius: 6, objectFit: 'cover' }} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />}
                  <div>
                    <div style={{ fontWeight: 500, fontSize: 13 }}>{l.name}</div>
                    <div style={{ fontSize: 11, color: C.tx3, marginTop: 2 }}>{l.sector || 'Professionnel'} · {l.city || '—'}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button onClick={() => openPreview(l.id)} style={{
                    padding: '4px 10px', borderRadius: 4, border: `1px solid ${C.border}`,
                    background: C.surface, fontSize: 12, cursor: 'pointer', color: C.blue, fontWeight: 500,
                  }}>👁️ Voir</button>
                  <button onClick={() => {
                    setGenerating(true);
                    setProgress({ current: 1, total: 1, name: l.name, step: '🔄 Régénération...' });
                    generateSite(l).then(() => {
                      setGenerating(false);
                      // Forcer le rafraîchissement si c'est le lead en preview
                      if (previewId === l.id) {
                        setTimeout(() => {
                          setPreviewId(null);
                          setTimeout(() => setPreviewId(l.id), 100);
                        }, 500);
                      }
                    });
                  }} disabled={generating} style={{
                    padding: '4px 10px', borderRadius: 4, border: `1px solid ${C.border}`,
                    background: generating ? C.tx3 : C.surface, fontSize: 12, cursor: generating ? 'default' : 'pointer', color: generating ? C.tx2 : C.amber,
                    opacity: generating ? 0.6 : 1,
                  }}>🔄</button>
                  <button onClick={() => {
                    const blob = new Blob([l.siteHtml], { type: 'text/html' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a'); a.href = url; a.download = `${l.name.replace(/\s+/g, '_')}.html`; a.click();
                  }} style={{
                    padding: '4px 10px', borderRadius: 4, border: `1px solid ${C.green}`,
                    background: '#f0fdf4', fontSize: 12, cursor: 'pointer', color: C.green,
                  }}>↓</button>
                </div>
              </div>
            ))}
            {generated.length === 0 && <p style={{ color: C.tx3, fontSize: 13, textAlign: 'center', padding: 20 }}>Aucun site généré</p>}
          </div>
        </div>

        {/* Pending */}
        <div style={{ background: C.surface, borderRadius: 8, padding: '20px', border: `1px solid ${C.border}` }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16, color: C.amber }}>⏳ En Attente ({enriched.length})</h3>
          <div style={{ maxHeight: 500, overflowY: 'auto' }}>
            {enriched.map(l => (
              <div key={l.id} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '12px', borderBottom: `1px solid ${C.border}`,
              }}>
                <div>
                  <div style={{ fontWeight: 500, fontSize: 13 }}>{l.name}</div>
                  <div style={{ fontSize: 11, color: C.tx3, marginTop: 2 }}>Score: {l.score} — {l.sector || 'Secteur inconnu'}</div>
                </div>
                <button onClick={() => generateSite(l)} style={{
                  padding: '4px 12px', borderRadius: 4, border: 'none',
                  background: C.blue, color: '#fff', fontSize: 12, cursor: 'pointer', fontWeight: 500,
                }}>Générer</button>
              </div>
            ))}
            {enriched.length === 0 && <p style={{ color: C.tx3, fontSize: 13, textAlign: 'center', padding: 20 }}>Tous les leads enrichis ont un site</p>}
          </div>
        </div>
      </div>

      {/* ═══ PREVIEW MODAL ═══ */}
      {previewLead && (
        <>
          <div onClick={() => setPreviewId(null)} style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.6)', zIndex: 99, backdropFilter: 'blur(4px)',
          }} />
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: C.surface, zIndex: 100,
            display: 'flex', flexDirection: 'column', overflow: 'hidden',
            boxShadow: '0 24px 80px rgba(0,0,0,0.35)',
          }}>
            {/* Top bar */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '10px 20px', borderBottom: `1px solid ${C.border}`, background: C.surface2, flexShrink: 0,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ display: 'flex', gap: 6 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 6, background: '#ff5f57' }} />
                  <div style={{ width: 12, height: 12, borderRadius: 6, background: '#febc2e' }} />
                  <div style={{ width: 12, height: 12, borderRadius: 6, background: '#28c840' }} />
                </div>
                <div style={{
                  padding: '6px 16px', borderRadius: 8, background: C.surface, border: `1px solid ${C.border}`,
                  fontSize: 12, color: C.tx3, fontFamily: "'DM Mono', monospace",
                }}>🔒 {previewLead.siteUrl}</div>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <button onClick={() => setPreviewMode('desktop')} style={{
                  padding: '5px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer',
                  border: `1px solid ${previewMode === 'desktop' ? C.blue : C.border}`,
                  background: previewMode === 'desktop' ? '#dbeafe' : C.surface,
                  color: previewMode === 'desktop' ? C.blue : C.tx3,
                }}>🖥️</button>
                <button onClick={() => setPreviewMode('mobile')} style={{
                  padding: '5px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer',
                  border: `1px solid ${previewMode === 'mobile' ? C.blue : C.border}`,
                  background: previewMode === 'mobile' ? '#dbeafe' : C.surface,
                  color: previewMode === 'mobile' ? C.blue : C.tx3,
                }}>📱</button>
                <div style={{ width: 1, height: 20, background: C.border }} />
                <button onClick={() => setShowEditor(!showEditor)} style={{
                  padding: '5px 14px', borderRadius: 6, fontSize: 12, cursor: 'pointer',
                  border: `1px solid ${showEditor ? C.accent : C.border}`,
                  background: showEditor ? C.accent2 : C.surface,
                  color: showEditor ? C.accent : C.tx2, fontWeight: 600,
                }}>✏️ Éditeur IA</button>
                <button onClick={changePalette} style={{
                  padding: '5px 14px', borderRadius: 6, fontSize: 12, cursor: 'pointer',
                  border: `1px solid ${C.amber}`, background: '#fffbeb', color: C.amber, fontWeight: 500,
                }}>🎨 Palette</button>
                <button onClick={() => {
                  const blob = new Blob([previewLead.siteHtml], { type: 'text/html' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a'); a.href = url; a.download = `${previewLead.name.replace(/\s+/g, '_')}.html`; a.click();
                }} style={{
                  padding: '5px 14px', borderRadius: 6, fontSize: 12, cursor: 'pointer',
                  border: `1px solid ${C.green}`, background: '#f0fdf4', color: C.green, fontWeight: 500,
                }}>↓ HTML</button>
                <button onClick={() => {
                  const newWindow = window.open('', '_blank');
                  if (newWindow && previewLead.siteHtml) {
                    newWindow.document.write(previewLead.siteHtml);
                    newWindow.document.close();
                  }
                }} style={{
                  padding: '5px 14px', borderRadius: 6, fontSize: 12, cursor: 'pointer',
                  border: `1px solid ${C.blue}`, background: '#dbeafe', color: C.blue, fontWeight: 500,
                }}>🌐 Ouvrir</button>
                <button onClick={() => setPreviewId(null)} style={{
                  width: 30, height: 30, borderRadius: 6, border: `1px solid ${C.border}`,
                  background: C.surface, fontSize: 16, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>✕</button>
              </div>
            </div>

            {/* Content */}
            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
              <div style={{
                flex: 1, display: 'flex', justifyContent: 'center',
                background: '#e5e7eb', padding: previewMode === 'mobile' ? '20px' : '0',
              }}>
                <iframe
                  srcDoc={previewLead.siteHtml}
                  style={{
                    border: 'none', width: previewMode === 'mobile' ? 390 : '100%', height: '100%', background: '#fff',
                    ...(previewMode === 'mobile' ? { borderRadius: 24, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' } : {}),
                  }}
                  title="Preview"
                />
              </div>

              {/* AI Editor Panel */}
              {showEditor && (
                <div style={{
                  width: 380, borderLeft: `1px solid ${C.border}`, display: 'flex',
                  flexDirection: 'column', background: C.surface, flexShrink: 0,
                }}>
                  <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}`, background: C.accent2 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: C.accent, marginBottom: 4 }}>✏️ Éditeur IA</div>
                    <div style={{ fontSize: 12, color: C.tx3, lineHeight: 1.5 }}>L&apos;IA régénère le site avec vos modifications.</div>
                  </div>
                  <div style={{ padding: '12px 16px', borderBottom: `1px solid ${C.border}`, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {['Change le titre du hero', 'Palette bleu et or', 'Ajoute plus de services', 'Redesign complet', 'Design plus luxueux', 'Style minimaliste'].map((s, i) => (
                      <button key={i} onClick={() => setChatInput(s)} style={{
                        fontSize: 11, padding: '4px 10px', borderRadius: 12,
                        border: `1px solid ${C.border}`, background: C.surface2, cursor: 'pointer', color: C.tx2,
                      }}>{s}</button>
                    ))}
                  </div>
                  <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {chatMessages.length === 0 && (
                      <div style={{ textAlign: 'center', color: C.tx3, fontSize: 13, padding: '40px 20px' }}>
                        <div style={{ fontSize: 32, marginBottom: 12 }}>🤖</div>
                        <strong>Éditeur IA</strong>
                        <p style={{ marginTop: 8, lineHeight: 1.6 }}>
                          Décrivez les modifications souhaitées.<br />
                          &quot;Change les couleurs en violet&quot;<br />
                          &quot;Refais le design entièrement&quot;
                        </p>
                      </div>
                    )}
                    {chatMessages.map((msg, i) => (
                      <div key={i} style={{
                        alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                        maxWidth: '88%', padding: '10px 14px', borderRadius: 14,
                        background: msg.role === 'user' ? `linear-gradient(135deg, ${C.accent}, ${C.amber})` : C.surface2,
                        color: msg.role === 'user' ? '#fff' : C.tx, fontSize: 13, lineHeight: 1.6,
                        borderBottomRightRadius: msg.role === 'user' ? 4 : 14,
                        borderBottomLeftRadius: msg.role === 'assistant' ? 4 : 14,
                      }}>{msg.text}</div>
                    ))}
                    {chatLoading && (
                      <div style={{ alignSelf: 'flex-start', padding: '10px 18px', borderRadius: 14, background: C.surface2, display: 'flex', gap: 4 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.tx3, animation: 'pulse 1.4s infinite' }} />
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.tx3, animation: 'pulse 1.4s infinite 0.2s' }} />
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.tx3, animation: 'pulse 1.4s infinite 0.4s' }} />
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>
                  <div style={{ padding: '12px 16px', borderTop: `1px solid ${C.border}`, display: 'flex', gap: 8 }}>
                    <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') handleChatSend(); }}
                      placeholder="Décrivez votre modification..."
                      style={{ flex: 1, padding: '10px 14px', borderRadius: 20, border: `1px solid ${C.border}`, fontSize: 13, fontFamily: 'inherit', outline: 'none' }}
                    />
                    <button onClick={handleChatSend} disabled={chatLoading} style={{
                      width: 38, height: 38, borderRadius: '50%', border: 'none',
                      background: chatLoading ? C.tx3 : C.accent, color: '#fff',
                      fontSize: 16, cursor: chatLoading ? 'default' : 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>➤</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
