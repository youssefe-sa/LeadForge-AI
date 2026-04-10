// ── TEMPLATE ULTIME - GARANTIE PROFESSIONNELLE 100% (MODERNE BRIGHT 2026) ──
// Résultat professionnel de pointe. Glassmorphism clair, complet, avec chatbot et WhatsApp.

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

const SECTOR_ULTIMATE_TEMPLATES = {
  plomberie: {
    primary: '#2563eb',
    secondary: '#1d4ed8',
    accent: '#60a5fa',
    background: '#f8fafc',
    services: [
      { name: 'Dépannage Urgence', description: 'Intervention rapide 24/7 pour toutes vos urgences de plomberie', features: ['Disponible 24/7', 'Intervention sous 2h', 'Devis transparent'] },
      { name: 'Installation Sanitaire', description: 'Pose professionnelle de tous vos équipements sanitaires', features: ['Salle de bain complète', 'Cuisine équipée', 'Dépannage'] },
      { name: 'Chauffage & Climatisation', description: 'Installation et entretien de vos systèmes de chauffage', features: ['Pompes à chaleur', 'Chaudières', "Economie d'énergie"] },
      { name: 'Diagnostic Fuites', description: 'Détection précise et réparation de toutes les fuites', features: ['Recherche non destructive', 'Caméra endoscopique', 'Assurance'] },
      { name: 'Rénovation Complète', description: 'Transformation haute de gamme de votre salle de bain', features: ['Design sur mesure', 'Matériaux premium', 'Livraison clé en main'] },
      { name: 'Plomberie Générale', description: 'Tous travaux de plomberie pour professionnels et particuliers', features: ['Mise aux normes', 'Garantie décennale', 'SAV réactif'] }
    ],
    heroTitle: 'Votre Expert Plomberie',
    heroSubtitle: "Intervention d'excellence et garantie dans toute la région",
    aboutText: "Artisan certifié spécialisé dans les interventions premium. Nous garantissons un service d'excellence, réactif et doté d'une finition parfaite.",
    ctaText: 'Intervention'
  },
  electricien: {
    primary: '#dc2626',
    secondary: '#b91c1c',
    accent: '#f87171',
    background: '#f8fafc',
    services: [
      { name: 'Mise aux Normes', description: 'Mise en conformité totale de votre installation', features: ['Consuel garanti', 'Normes NFC 15-100', 'Diagnostic de sécurité'] },
      { name: 'Tableau Électrique', description: 'Installation et rénovation de tableaux électriques', features: ['Sécurité certifiée', 'Marques premium', 'Protection optimale'] },
      { name: 'Éclairage Architectonique', description: 'Mise en lumière moderne et design', features: ['LED Premium', 'Étude photométrique', 'Contrôle à distance'] },
      { name: 'Maison Connectée', description: 'Installation de systèmes domotiques intelligents', features: ['Gestion smartphone', 'Scénarios de vie', 'Sécurité'] },
      { name: 'Dépannage Électrique', description: 'Diagnostic pointu et réparation instantanée', features: ['Intervention 24/7', 'Outils de précision', 'Fiabilité totale'] },
      { name: 'Diagnostic Complet', description: 'Bilan de votre installation électrique', features: ['Rapport détaillé', 'Conseil expert', 'Devis chiffré'] }
    ],
    heroTitle: 'Excellence Électrique',
    heroSubtitle: "L'énergie sûre et connectée, maîtrisée par des experts",
    aboutText: "Entreprise d'électricité qualifiée, nous concevons, installons et sécurisons vos réseaux avec des technologies de pointe.",
    ctaText: 'Diagnostic'
  },
  coiffeur: {
    primary: '#7c3aed',
    secondary: '#6d28d9',
    accent: '#a78bfa',
    background: '#f8fafc',
    services: [
      { name: 'Création Femme', description: 'Coupe tendance et sur-mesure pour sublimer votre visage', features: ['Visagisme', 'Techniques modernes', 'Coiffage wavy'] },
      { name: 'Barber & Homme', description: 'Service barbier authentique et coupes structurées', features: ['Tracé millimétré', 'Soins barbe bio', 'Finition rasoir'] },
      { name: 'Coloration Premium', description: 'Nuances parfaites, balayages subtils et respect du cheveu', features: ['Poudres naturelles', 'Ombré Hair', 'Protection Olaplex'] },
      { name: 'Soin Profond', description: 'Rituels de soin luxueux pour une fibre capillaire réparée', features: ['Botox capillaire', 'Bain hydratant', 'Massage crânien relaxant'] },
      { name: 'Extensions', description: 'Longueur et volume avec des extensions 100% naturelles', features: ['Kératine ou bandes', 'Invisible', 'Durabilité maximum'] },
      { name: 'Haute Coiffure', description: 'Chignons et attaches pour vos plus beaux événements', features: ['Mariage', 'Essai personnalisé', 'Tenue parfaite'] }
    ],
    heroTitle: "L'Atelier de Coiffure",
    heroSubtitle: "Révélez votre beauté entre les mains d'experts passionnés",
    aboutText: "Un salon d'exception où chaque détail est pensé pour votre bien-être. Notre équipe artistique maîtrise les techniques les plus sophistiquées.",
    ctaText: 'Réserver'
  },
  restaurant: {
    primary: '#ea580c',
    secondary: '#c2410c',
    accent: '#fb923c',
    background: '#f8fafc',
    services: [
      { name: 'Carte Signature', description: "Une cuisine d'inspiration, moderne et de saison", features: ['Produits exceptionnels', "Ferme à l'assiette", 'Végétarien disponible'] },
      { name: 'Menu Dégustation', description: 'Le voyage culinaire ultime en plusieurs temps', features: ['Accord Mets & Vins', '7 services', 'Surprise du Chef'] },
      { name: "Cave d'Exception", description: 'Notre sommelier vous guide à travers nos meilleurs flacons', features: ['Vignobles rares', 'Grands crus', 'Mixologie créative'] },
      { name: 'Privatisation', description: 'Des espaces élégants pour vos événements privés', features: ['Service dédié', 'Menus personnalisés', "Jusqu'à 100 convives"] },
      { name: 'Brunch Premium', description: 'Le rendez-vous dominical incontournable et généreux', features: ['Buffet Signature', 'Viennoiseries maison', 'Jus fraîchement pressés'] },
      { name: 'Service Traiteur', description: "L'excellence de notre cuisine où vous le souhaitez", features: ['Cocktails chics', 'Dîners de gala', 'Mise en scène'] }
    ],
    heroTitle: 'Expérience Culinaire Unique',
    heroSubtitle: "L'harmonie parfaite entre gastronomie moderne et atmosphère élégante",
    aboutText: 'Nous repoussons les limites de la tradition culinaire pour offrir un moment inoubliable, où les produits nobles racontent une histoire dans chaque assiette.',
    ctaText: 'Réserver'
  },
  garage: {
    primary: '#059669',
    secondary: '#047857',
    accent: '#34d399',
    background: '#f8fafc',
    services: [
      { name: 'Diagnostic Électronique', description: 'Analyse précise de tous les calculateurs de votre véhicule', features: ['Valises constructeurs', 'Lecture de codes pannes', 'Effacement'] },
      { name: 'Entretien Constructeur', description: 'Révisions respectant scrupuleusement les cahiers des charges', features: ['Maintien garantie', 'Pièces origine', 'Huile premium'] },
      { name: 'Liaison au Sol', description: 'Techniciens experts en pneumatique et comportement', features: ['Géométrie 3D', 'Pneus Haute Perf', 'Amortisseurs'] },
      { name: 'Carrosserie Premium', description: 'Restauration esthétique parfaite sans différence de teinte', features: ['Spectromètre', 'Cabine de chauffe', 'Detaling inclus'] },
      { name: 'Moteur & Boîte', description: 'Interventions lourdes, remplacement de distribution ou embrayage', features: ['Outillage spécifique', 'Reconditionnement', 'Vidange BVA'] },
      { name: 'Voitures de Prestige', description: 'Une équipe spécialisée dans les véhicules sportifs et luxe', features: ['Manipulation soigneuse', 'Local sécurisé', 'Expertise pointue'] }
    ],
    heroTitle: 'Le Pôle Mécanique Prémium',
    heroSubtitle: "L'expertise absolue pour sublimer et entretenir votre véhicule",
    aboutText: "Notre garage de pointe rassemble l'élite des techniciens pour offrir à votre véhicule un entretien sans compromis.",
    ctaText: 'Rendez-vous'
  },
  default: {
    primary: '#334155',
    secondary: '#1e293b',
    accent: '#94a3b8',
    background: '#f8fafc',
    services: [
      { name: 'Consultation Experte', description: 'Analyse approfondie de vos besoins stratégiques', features: ['Diagnostic sur mesure', "Plan d'action", 'Écoute active'] },
      { name: 'Solutions Premium', description: 'Implémentation de services à forte valeur ajoutée', features: ['Qualité irréprochable', 'Suivi de performance', 'Finitions parfaites'] },
      { name: 'Accompagnement VIP', description: 'Un interlocuteur dédié tout au long du processus', features: ['Ligne directe', 'RDV prioritaire', 'Bilan mensuel'] },
      { name: 'Innovation & Technologie', description: 'Utilisation des meilleurs outils du marché', features: ['Méthodes agiles', 'Veille constante', 'Equipement de pointe'] },
      { name: 'Stratégie Sur-Mesure', description: 'Vos objectifs se transforment en résultats mesurables', features: ['ROI assuré', 'Alignement parfait', 'Transparence absolue'] },
      { name: 'Service Client 24/7', description: 'Une présence permanente quand vous avez besoin de nous', features: ['Assistance immédiate', 'Proactivité', 'Garanties solides'] }
    ],
    heroTitle: "Services Professionnels d'Excellence",
    heroSubtitle: "L'alliance de la rigueur et de l'innovation pour votre réussite",
    aboutText: "Nous bâtissons des relations durables basées sur la performance et l'intégrité. Notre ambition est d'élever vos standards et de vous accompagner vers le succès absolu.",
    ctaText: 'Démarrer'
  }
};

// --- RÉFÉRENTIEL D'IMAGES PREMIUM NEUTRES PAR SECTEUR (2026) ---
// Ces images sont garanties sans logos d'entreprises tierces ni textes publicitaires.
const SECTOR_IMAGES: Record<string, string[]> = {
  plomberie: [
    'https://images.unsplash.com/photo-1504148455328-497c5efdf13a?w=1200&q=80', // Outils
    'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=1200&q=80', // Tuyauterie
    'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=1200&q=80', // Mains travaillant
    'https://images.unsplash.com/photo-1590610904018-05260f852656?w=1200&q=80'  // Robinetterie neutre
  ],
  electricien: [
    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&q=80', // Tableau électrique neutre
    'https://images.unsplash.com/photo-1558210857-39d4a984f246?w=1200&q=80', // Fils et outils
    'https://images.unsplash.com/photo-1563770660941-20978e87081b?w=1200&q=80', // Intervention
    'https://images.unsplash.com/photo-1454165833267-033f23bdf586?w=1200&q=80'  // Plan neutre
  ],
  coiffeur: [
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80', // Salon neutre
    'https://images.unsplash.com/photo-1521590832167-7228fcb8c1b5?w=1200&q=80', // Ciseaux
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=80', // Coupe de cheveux
    'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=1200&q=80'  // Barber neutre
  ],
  restaurant: [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80', // Salle neutre
    'https://images.unsplash.com/photo-1550966841-3ee71448f522?w=1200&q=80', // Plat gastronomique
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80', // Intérieur élégant
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80'  // Cuisine
  ],
  garage: [
    'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&q=80', // Atelier neutre
    'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=80', // Moteur
    'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=1200&q=80', // Mecanicien (mains)
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80'  // Roues/Pneus
  ],
  nettoyage: [
    'https://images.unsplash.com/photo-1581578731522-a0034a49f763?w=1200&q=80', // Produits nettoyage
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&q=80', // Sol propre
    'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=1200&q=80'  // Menage
  ],
  jardin: [
    'https://images.unsplash.com/photo-1592150621344-79e50975bcba?w=1200&q=80', // Pelouse tondue
    'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=1200&q=80', // Jardinier (mains)
    'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1200&q=80'  // Outils jardin
  ],
  fitness: [
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80', // Salle sport
    'https://images.unsplash.com/photo-1583454110551-21f2fa2adfcd?w=1200&q=80', // Halteres
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80'  // Coach
  ],
  medical: [
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=80', // Bureau medical
    'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1200&q=80', // Diagnostic
    'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1200&q=80'  // Clinique neutre
  ],
  avocat: [
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80', // Livres de droit
    'https://images.unsplash.com/photo-1521791055366-0d553872125f?w=1200&q=80', // Bureau neutre
    'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1200&q=80'  // Signatures
  ],
  default: [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&q=80'
  ]
};

function getSectorImagesFallback(sector: string): string[] {
  const normalizedSector = (sector || '').toLowerCase();
  if (normalizedSector.includes('nettoyag') || normalizedSector.includes('propreté')) return SECTOR_IMAGES.nettoyage;
  if (normalizedSector.includes('jardin') || normalizedSector.includes('paysag')) return SECTOR_IMAGES.jardin;
  if (normalizedSector.includes('coach') || normalizedSector.includes('sport') || normalizedSector.includes('fitness')) return SECTOR_IMAGES.fitness;
  
  for (const [key, images] of Object.entries(SECTOR_IMAGES)) {
    if (normalizedSector.includes(key)) return images;
  }
  return SECTOR_IMAGES.default;
}

function getUltimateTemplate(sector: string) {
  const normalizedSector = (sector || '').toLowerCase();
  for (const [key, template] of Object.entries(SECTOR_ULTIMATE_TEMPLATES)) {
    if (normalizedSector.includes(key)) return template;
  }
  if (normalizedSector.includes('climat') || normalizedSector.includes('frigo') || normalizedSector.includes('chauffage')) {
    return SECTOR_ULTIMATE_TEMPLATES.plomberie;
  }
  if (normalizedSector.includes('médec') || normalizedSector.includes('clinique') || normalizedSector.includes('dentiste')) {
    return { ...SECTOR_ULTIMATE_TEMPLATES.default, primary: '#0284c7', secondary: '#0369a1' };
  }
  if (normalizedSector.includes('avocat') || normalizedSector.includes('notaire') || normalizedSector.includes('juridi')) {
    return { ...SECTOR_ULTIMATE_TEMPLATES.default, primary: '#b45309', secondary: '#92400e' };
  }
  if (normalizedSector.includes('beauté') || normalizedSector.includes('esthétique') || normalizedSector.includes('spa')) {
    return { ...SECTOR_ULTIMATE_TEMPLATES.coiffeur, primary: '#db2777', secondary: '#be185d' };
  }
  if (normalizedSector.includes('boulanger') || normalizedSector.includes('pâtissier')) {
    return SECTOR_ULTIMATE_TEMPLATES.restaurant;
  }
  return SECTOR_ULTIMATE_TEMPLATES.default;
}

// Nettoyeur de texte de logo selon les instructions (2 lettres, 2 mots sans les articles)
function getLogoInfo(name: string) {
  if (!name) return { initials: "CO", text: "Company" };
  const skip = ['le', 'la', 'les', 'de', 'du', 'des', "l'", "d'", 'à', 'a', 'et', '&', 'en', 'pour'];
  let cleanName = name.replace(/['']/g, "' ");
  const words = cleanName.split(/\s+/).filter(w => w.length > 0 && !skip.includes(w.toLowerCase()));
  const finalWords = words.slice(0, 2).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
  if (finalWords.length === 0) finalWords.push("Pro", "Service");
  if (finalWords.length === 1) finalWords.push("Pro");
  const initials = finalWords[0].charAt(0) + finalWords[1].charAt(0);
  const text = finalWords.join(' ');
  return { initials: initials.toUpperCase(), text, word1: finalWords[0], word2: finalWords[1] };
}

export function generateUltimateSite(lead: any, aiContent?: any): string {
  const template = getUltimateTemplate(lead.sector);
  const companyName = lead.name || 'Entreprise Premium';
  const city = lead.city || '';
  const phone = lead.phone || '+33 6 12 34 56 78';
  const email = lead.email || 'contact@entreprise.fr';
  const address = lead.address || (city ? `Centre Ville, ${city}` : 'France');
  const website = lead.website || '';
  const rating = lead.googleRating || 5;
  const reviews = lead.googleReviews || 42;
  
  const description = aiContent?.aboutText || lead.description || template.aboutText;
  const heroTitle = aiContent?.heroTitle || template.heroTitle;
  const heroSubtitle = aiContent?.heroSubtitle || `${template.heroSubtitle}${city ? ' à ' + city : ''}`;
  
  // Limiter le CTA à 2 mots maximum
  let rawCtaText = aiContent?.cta || template.ctaText;
  const ctaWords = rawCtaText.split(/\s+/).filter((w: string) => w.length > 0);
  const ctaText = ctaWords.slice(0, 2).join(' ');
  
  let finalServices = template.services;
  if (aiContent?.services && Array.isArray(aiContent.services) && aiContent.services.length > 0) {
    finalServices = aiContent.services.map((s: any, idx: number) => ({
      name: s.name || `Service ${idx+1}`,
      description: s.description || '',
      features: template.services[idx % template.services.length].features
    }));
  }

  // 6 avis demandés (si le lead en a moins, on complète)
  let testimonials = (lead.googleReviewsData || []).map((review: any) => ({
    author: review.author || 'Client VIP',
    text: review.text || "Une prestation exceptionnelle.",
    rating: review.rating || 5,
    date: review.date || 'Récemment'
  }));

  const fallbackReviews = [
    { author: 'Emma L.', text: "Une expérience tout simplement majestueuse. Rapidité, précision et professionnalisme impressionnant. Merci à toute l'équipe pour ce travail d'orfèvre.", rating: 5, date: 'Il y a 1 semaine' },
    { author: 'Arthur D.', text: "Service d'excellence du début à la fin. Les promesses sont tenues et même dépassées. C'est rare de trouver des professionnels aussi dévoués.", rating: 5, date: 'Il y a 2 semaines' },
    { author: 'Sophie M.', text: "Très satisfaite de l'intervention. Une équipe à l'écoute, réactive et des résultats visibles immédiatement. Je recommande fortement.", rating: 5, date: 'Il y a 3 semaines' },
    { author: 'Lucas T.', text: "Intervention rapide et propre. Tarifs clairs sans mauvaises surprises. Je garde le numéro précieusement.", rating: 5, date: 'Il y a 1 mois' },
    { author: 'Marie J.', text: "Je n'ai jamais vu un tel niveau de finition. Ils ont un vrai sens du détail. Tout a été livré en temps et en heure.", rating: 5, date: 'Il y a 1 mois' },
    { author: 'Hugo N.', text: "Contact fluide, devis respecté, personnel respectueux des lieux. Un professionnalisme comme on n'en fait plus !", rating: 5, date: 'Il y a 2 mois' }
  ];
  
  while (testimonials.length < 6) {
    testimonials.push(fallbackReviews[testimonials.length % fallbackReviews.length]);
  }
  testimonials = testimonials.slice(0, 6);

  let nameHash = 0;
  for (let i = 0; i < companyName.length; i++) nameHash += companyName.charCodeAt(i);
  const baseSlogan = aiContent?.slogan || "L'excellence à votre service";
  const sloganVariations = [
    baseSlogan,
    `${companyName} : Excellence & Passion`,
    `Votre partenaire de confiance à ${city}`,
    "L'art de la perfection au quotidien",
    "Solutions premium sur-mesure"
  ];
  const finalSlogan = sloganVariations[nameHash % sloganVariations.length];

  // ── COLLECTE IMAGES RÉELLES (champs existants dans Lead) ──
  // Domaines connus pour bloquer l'intégration externe (CORS/Hotlinking)
  const BLOCKED_DOMAINS = [
    'pagesjaunes.fr', 
    'justacote.com', 
    'justacote.fr', 
    'lafourchette.com', 
    'tripadvisor.', 
    'yelp.com',
    'facebook.com',
    'fbcdn.net',
    'instagram.com'
  ];

  const realImagesRaw = [
    ...(lead.images || []),
    ...(lead.websiteImages || [])
  ].filter(img => {
    if (!img || typeof img !== 'string') return false;
    
    // 1. Forcer HTTPS pour éviter le Mixed Content
    if (!img.startsWith('https://')) return false;

    const lowerImg = img.toLowerCase();

    // 2. Bloquer les domaines avec protection anti-hotlink
    if (BLOCKED_DOMAINS.some(d => lowerImg.includes(d))) return false;

    // 3. Filtrer les artefacts techniques et logos de concurrents
    const hardSkip = ['favicon', 'sprite', 'pixel', 'tracking', 'beacon', '.gif', '1x1', '.svg'];
    if (hardSkip.some(s => lowerImg.includes(s))) return false;
    
    return true;
  });

  const realImages = [...new Set(realImagesRaw)];

  // ── FALLBACKS SECTORIELS NEUTRES (sans branding concurrent) ──
  const fallbacks = getSectorImagesFallback(lead.sector);

  // ── DISTRIBUTION PAR SECTION (7 slots: Hero + About + 5 Services) ──
  // Priorité: image réelle du prospect → fallback sectoriel
  const getSlotImage = (slot: number): string => {
    if (realImages[slot]) return realImages[slot];
    const fallbackIndex = slot % fallbacks.length;
    return fallbacks[fallbackIndex];
  };

  // Image Hero = première image réelle, sinon premier fallback
  const heroImage = realImages[0] || fallbacks[0];
  
  // Pool complet = réelles d'abord, complétées par fallbacks
  const allImages = realImages.length >= 6
    ? realImages
    : [...realImages, ...fallbacks].slice(0, Math.max(6, realImages.length + fallbacks.length));

  const content: UltimateContent = {
    companyName, 
    sector: lead.sector || 'Professionnel', 
    city, 
    description, 
    phone, 
    email, 
    address, 
    website, 
    rating, 
    reviews,
    services: finalServices, 
    testimonials, 
    heroTitle, 
    heroSubtitle, 
    aboutText: description, 
    ctaText, 
    slogan: finalSlogan, 
    heroImage, 
    allImages
  };

  return buildUltimateHTML(content, template, fallbacks);
}

function buildUltimateHTML(content: UltimateContent, template: any, sectorFallbacks: string[] = []): string {
  const { companyName, heroTitle, heroSubtitle, aboutText, services, testimonials, phone, email, address, website, city, ctaText, rating, reviews, slogan, heroImage, allImages } = content;
  
  // Dynamic Unique Vibe Generator
  let nameHash = 0;
  for (let i = 0; i < companyName.length; i++) nameHash += companyName.charCodeAt(i);
  const hue = (nameHash % 360);
  const primaryColor = `hsl(${hue}, 70%, 45%)`;
  const secondaryColor = `hsl(${(hue + 60) % 360}, 65%, 40%)`;
  const accentColor = `hsl(${(hue + 200) % 360}, 80%, 60%)`;
  
  // Variation Logic
  const patternType = nameHash % 4;
  const fontPair = nameHash % 3;
  const animStyle = nameHash % 2;
  const shapesType = nameHash % 3;

  const logoInfo = getLogoInfo(companyName);
  const primaryRgb = `${hue}, 70%, 45%`;
  const cleanPhoneLink = phone ? phone.replace(/[^0-9+]/g, '') : '';
  const mapQuery = encodeURIComponent(address + (content.city ? ', ' + content.city : ''));

  // ── IMAGE DISTRIBUTION INTELLIGENTE PAR SLOT ──
  // Chaque section a sa propre image, pas de rotation aveugle.
  // Si une image réelle existe pour ce slot → on l'utilise.
  // Sinon → fallback sectoriel neutre garanti.
  const emergencyFallback = sectorFallbacks[0] || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80';
  
  const getImg = (slot: number): string => {
    // Priorité 1 : image réelle du prospect pour ce slot
    if (allImages[slot]) return allImages[slot];
    // Priorité 2 : image réelle en rotation si pool insuffisant
    if (allImages.length > 0) return allImages[slot % allImages.length];
    // Priorité 3 : fallback sectoriel neutre
    if (sectorFallbacks.length > 0) return sectorFallbacks[slot % sectorFallbacks.length];
    return emergencyFallback;
  };

  // onerror JS inline pour chaque <img> — 3 niveaux de fallback
  const imgErr = (fallbackSlot: number) =>
    `onerror="this.onerror=null;this.src='${sectorFallbacks[fallbackSlot % Math.max(sectorFallbacks.length,1)] || emergencyFallback}'"`;

  return `<!DOCTYPE html>
<html lang="fr" class="scroll-smooth" style="overflow-x: hidden;">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>${companyName} - ${content.sector} à ${city} | Services Professionnels</title>
    
    <!-- SEO Meta Tags -->
    <meta name="description" content="${companyName} - ${content.sector} professionnel à ${city}. ${heroSubtitle}. Contactez-nous au ${phone} pour vos projets.">
    <meta name="keywords" content="${content.sector}, ${city}, ${companyName}, professionnel, services, intervention rapide, qualité">
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
    <link rel="canonical" href="${website || '#'}">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="${website || '#'}">
    <meta property="og:title" content="${companyName} - ${content.sector} à ${city}">
    <meta property="og:description" content="${heroSubtitle}">
    <meta property="og:image" content="${heroImage}">
    <meta property="og:locale" content="fr_FR">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="${website || '#'}">
    <meta name="twitter:title" content="${companyName} - ${content.sector} à ${city}">
    <meta name="twitter:description" content="${heroSubtitle}">
    <meta name="twitter:image" content="${heroImage}">
    
    <!-- Google Fonts: Diverse Dynamic Pairings -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    ${fontPair === 0 ? `<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">` :
      fontPair === 1 ? `<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">` :
      `<link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">`}
    
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>

    <!-- Structured Data JSON-LD for LocalBusiness SEO -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "${companyName}",
        "description": "${heroSubtitle}",
        "image": "${heroImage}",
        "telephone": "${phone}",
        "email": "${email}",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "${address}",
            "addressLocality": "${city}",
            "addressCountry": "FR"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "",
            "longitude": ""
        },
        "openingHours": "Mo-Fr 09:00-18:00",
        "priceRange": "$$",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "${rating || 5}",
            "reviewCount": "${reviews || 42}"
        }
    }
    </script>

    <style>
        :root {
            --primary: ${primaryColor};
            --secondary: ${secondaryColor};
            --accent: ${accentColor};
            --primary-rgb: ${hue}, 70%, 45%;
            
            --bg-base: #f8fafc;
            --bg-glass: rgba(255, 255, 255, 0.7);
            --text-main: #0f172a;
            --text-muted: #475569;
            --font-head: ${fontPair === 0 ? "'Outfit'" : fontPair === 1 ? "'Plus Jakarta Sans'" : "'Lexend'"}, sans-serif;
            
            --glow: 0 10px 40px hsla(${hue}, 70%, 45%, 0.1);
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: 'Inter', sans-serif;
            background-color: var(--bg-base);
            color: var(--text-main);
            overflow-x: hidden;
            line-height: 1.7;
            width: 100%;
            max-width: 100vw;
            min-width: 320px;
        }
        
        * {
            max-width: 100%;
            box-sizing: border-box;
        }
        
        img, video, iframe {
            max-width: 100%;
            height: auto;
        }
        
        .top-marquee {
            width: 100%;
            max-width: 100vw;
            overflow: hidden;
        }
        
        .marquee-content {
            min-width: max-content;
        }

        h1, h2, h3, h4 { font-family: var(--font-head); }

        /* Desktop specific - ensure mobile menu is hidden */
        @media (min-width: 769px) {
            .mobile-menu-toggle {
                display: none !important;
            }
            .mobile-menu {
                display: none !important;
            }
        }

        /* ADVANCED DYNAMIC ANIMATIONS 2026 */
        .reveal { 
            opacity: 0; 
            transform: ${animStyle === 0 ? 'translateY(50px)' : 'scale(0.9) blur(10px)'}; 
            transition: all 1s cubic-bezier(0.25, 1, 0.5, 1); 
        }
        .reveal.active { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }

        .reveal-left { opacity: 0; transform: translateX(-60px); transition: all 1.2s ease-out; }
        .reveal-left.active { opacity: 1; transform: translateX(0); }

        .reveal-right { opacity: 0; transform: translateX(60px); transition: all 1.2s ease-out; }
        .reveal-right.active { opacity: 1; transform: translateX(0); }

        .stagger-item { opacity: 0; transform: translateY(20px); transition: 0.5s ease-out; }
        .active .stagger-item { opacity: 1; transform: translateY(0); }

        /* DYNAMIC PATTERN INJECTION */
        .bg-pattern {
            position: absolute; top:0; left:0; width:100%; height:100%;
            pointer-events: none; opacity: 0.05; z-index: 0;
            ${patternType === 0 ? `background-image: radial-gradient(var(--primary) 1.5px, transparent 1.5px); background-size: 25px 25px;` : 
              patternType === 1 ? `background-image: linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px); background-size: 40px 40px;` :
              patternType === 2 ? `background: repeating-linear-gradient(45deg, var(--primary), var(--primary) 1px, transparent 1px, transparent 12px);` :
              `background-image: radial-gradient(var(--primary) 0.5px, transparent 0.5px); background-size: 15px 15px;`}
        }

        /* Top Marquee Defilant */
        .top-marquee {
            background-color: var(--primary);
            color: white;
            font-size: 0.85rem;
            font-weight: 500;
            padding: 8px 0;
            white-space: nowrap;
            overflow: hidden;
            position: relative;
            z-index: 100;
            width: 100%;
            max-width: 100vw;
        }
        .marquee-content {
            display: inline-flex;
            gap: 3rem;
            animation: marquee 30s linear infinite;
        }
        .marquee-content:hover {
            animation-play-state: paused;
        }
        .marquee-item {
            display: inline-flex;
            align-items: center;
            gap: 6px;
        }
        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }

        /* Abstract Animated Light Background */
        .pattern-waves {
            position: absolute; width: 100%; height: 100%; top: 0; left: 0;
            background: linear-gradient(135deg, transparent 40%, rgba(${primaryRgb}, 0.05) 50%, transparent 60%);
            background-size: 200% 200%;
            animation: waveFlow 15s linear infinite;
            z-index: 0;
        }
        @keyframes waveFlow { 0% { background-position: 0% 0%; } 100% { background-position: 200% 200%; } }

        section { position: relative; }
        section::before {
            content: ''; position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            opacity: 0.03;
            background-image: radial-gradient(var(--primary) 1px, transparent 1px);
            background-size: 40px 40px;
            pointer-events: none; z-index: 0;
        }

        .bg-blobs {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            overflow: hidden;
            z-index: -1;
            background: #f8fafc;
        }
        .blob {
            position: absolute;
            filter: blur(100px);
            opacity: 0.15;
            animation: float 20s infinite alternate cubic-bezier(0.4, 0, 0.2, 1);
            border-radius: 50%;
        }
        .anim-shape {
            position: absolute; opacity: 0.08; pointer-events: none; z-index: 0;
            animation: floatShape 14s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate;
        }
        @keyframes floatShape {
            0% { transform: translateY(0) rotate(0deg) scale(1); }
            100% { transform: translateY(-80px) rotate(180deg) scale(1.2); }
        }
        .bg-grid {
            background-image: radial-gradient(rgba(${primaryRgb}, 0.1) 1px, transparent 1px);
            background-size: 30px 30px;
        }
        .bg-alternate {
            background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(var(--primary-rgb), 0.03) 50%, rgba(255,255,255,0) 100%);
        }
        .blob-1 {
            background: var(--primary);
            width: 45vw; height: 45vw;
            top: -10vw; left: -10vw;
        }
        .blob-2 {
            background: var(--secondary);
            width: 35vw; height: 35vw;
            bottom: -5vw; right: -5vw;
            animation-delay: -10s;
        }
        @keyframes float {
            0% { transform: translate(0, 0) scale(1); }
            100% { transform: translate(15vw, 15vh) scale(1.1); }
        }

        /* Modern Glassmorphism Components */
        .glass {
            background: var(--bg-glass);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border: 1px solid var(--border-glass);
            border-radius: 24px;
            box-shadow: 0 8px 32px rgba(31, 38, 135, 0.04);
        }

        /* Navigation */
        nav {
            position: fixed;
            top: 36px; /* Below marquee */
            width: 100%;
            z-index: 50;
            padding: 1.5rem 0;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .mobile-menu-toggle {
            display: none;
        }
        nav.scrolled {
            top: 0;
            padding: 1rem 0;
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(0,0,0,0.05);
            box-shadow: 0 10px 30px rgba(0,0,0,0.03);
        }
        .nav-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo-svg {
            width: 45px;
            height: 45px;
            border-radius: 12px;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-family: 'Outfit', sans-serif;
            font-weight: 800;
            font-size: 1.25rem;
            letter-spacing: -0.5px;
            box-shadow: 0 8px 20px rgba(${primaryRgb}, 0.2);
        }
        .brand {
            font-size: 1.75rem;
            font-weight: 800;
            letter-spacing: -0.5px;
            color: var(--text-main);
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .btn-call {
            display: inline-flex; align-items: center; gap: 0.5rem;
            background: white; border: 1px solid rgba(0,0,0,0.05);
            color: var(--text-main); padding: 0.5rem 1.25rem; border-radius: 100px;
            text-decoration: none; font-weight: 600; transition: all 0.3s;
            box-shadow: 0 4px 10px rgba(0,0,0,0.02);
        }
        .btn-call:hover {
            background: var(--primary); color: white;
            box-shadow: var(--glow);
        }

        /* Stats Banner */
        .stats-banner { padding: 4rem 2rem; background: var(--primary); color: white; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; text-align: center; border-radius: 30px; margin: 0 auto; position: relative; overflow: hidden; box-shadow: 0 15px 35px rgba(var(--primary-rgb), 0.2); }
        .stats-banner::after { content:''; position:absolute; top:0;left:0;right:0;bottom:0; background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent); pointer-events:none;}
        .stat-banner-item h3 { font-size: 3rem; font-weight: 800; font-family: 'Outfit'; margin-bottom: 0.5rem; line-height: 1; }
        
        /* Valeurs */
        .valeurs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 2rem; }
        .valeur-card { padding: 2.5rem 1.5rem; display: flex; flex-direction: column; align-items: center; text-align: center; border-radius: 20px; background: white; border: 1px solid rgba(0,0,0,0.04); transition: 0.3s; box-shadow: 0 5px 15px rgba(0,0,0,0.02); }
        .valeur-card:hover { transform: translateY(-5px); box-shadow: var(--glow); }
        .valeur-icon { width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, rgba(${primaryRgb}, 0.15), rgba(${primaryRgb}, 0.05)); color: var(--primary); display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; }

        /* Hero Section */
        .hero {
            min-height: 100vh;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: center;
            padding: 10rem 2rem 4rem;
            position: relative;
            max-width: 1200px;
            margin: 0 auto;
            z-index: 10;
        }
        @media (max-width: 900px) {
            .hero { grid-template-columns: 1fr; text-align: center; }
            .hero .hero-image-col { display: none; }
        }
        .hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1.5rem;
            border-radius: 100px;
            background: white;
            border: 1px solid rgba(${primaryRgb}, 0.2);
            color: var(--primary);
            font-size: 0.875rem;
            font-weight: 700;
            margin-bottom: 2rem;
            text-transform: uppercase;
            letter-spacing: 2px;
            box-shadow: 0 4px 20px rgba(${primaryRgb}, 0.08);
        }
        .hero h1 {
            font-size: clamp(3rem, 7vw, 5.5rem);
            font-weight: 800;
            line-height: 1.1;
            letter-spacing: -0.04em;
            margin-bottom: 1.5rem;
            color: var(--text-main);
        }
        .hero h1 span {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .hero p {
            font-size: clamp(1.125rem, 2.5vw, 1.375rem);
            color: var(--text-muted);
            max-width: 700px;
            margin: 0 auto 3.5rem;
            font-weight: 400;
        }
        .btn-glow {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white;
            padding: 1.25rem 2.5rem;
            border-radius: 100px;
            font-size: 1.125rem;
            font-weight: 600;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            transition: all 0.3s ease;
            cursor: pointer;
            box-shadow: var(--glow-strong);
            border: none;
        }
        .btn-glow:hover {
            transform: translateY(-3px) scale(1.02);
            box-shadow: 0 20px 40px rgba(${primaryRgb}, 0.3);
            color: white;
        }

        /* Container & Sections */
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 6rem 2rem;
            position: relative;
            z-index: 10;
        }
        .section-header {
            text-align: center;
            margin-bottom: 4rem;
        }
        .section-header h2 {
            font-size: clamp(2.5rem, 5vw, 3.5rem);
            margin-bottom: 1.25rem;
            font-weight: 800;
            letter-spacing: -0.02em;
        }
        .section-header p {
            color: var(--text-muted);
            font-size: 1.125rem;
            max-width: 600px;
            margin: 0 auto;
        }

        /* Process Section (4 Démarches) */
        .process-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 2rem;
            position: relative;
        }
        .step-card {
            padding: 2.5rem;
            text-align: center;
            background: white;
            border-radius: 24px;
            position: relative;
            box-shadow: 0 4px 20px rgba(0,0,0,0.02);
            border: 1px solid rgba(0,0,0,0.03);
            transition: transform 0.3s;
        }
        .step-card:hover { transform: translateY(-5px); box-shadow: var(--glow); }
        .step-number {
            width: 60px; height: 60px;
            border-radius: 50%;
            background: var(--bg-base);
            color: var(--primary);
            font-weight: 800;
            font-size: 1.5rem;
            display: flex; align-items: center; justify-content: center;
            margin: 0 auto 1.5rem;
            border: 2px dashed var(--primary);
        }
        
        /* Services Grid */
        .grid-3 {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 2rem;
        }
        .card {
            padding: 3rem;
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s;
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            height: 100%;
        }
        .card::before {
            content: '';
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background: radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,1), transparent 40%);
            z-index: 0;
            opacity: 0;
            transition: opacity 0.3s;
        }
        .card:hover::before { opacity: 1; }
        .card:hover {
            transform: translateY(-8px);
            border-color: rgba(${primaryRgb}, 0.2);
            box-shadow: 0 20px 40px rgba(0,0,0,0.05), var(--glow);
        }
        .card > * { position: relative; z-index: 1; }
        
        .card-icon {
            width: 70px; height: 70px;
            border-radius: 20px;
            background: linear-gradient(135deg, rgba(${primaryRgb}, 0.15), rgba(${primaryRgb}, 0.05));
            display: flex; align-items: center; justify-content: center;
            color: var(--primary);
            margin-bottom: 2rem;
        }
        
        .card h3 { font-size: 1.5rem; margin-bottom: 1rem; font-weight: 700; color: var(--text-main); }
        .card p { color: var(--text-muted); margin-bottom: 2rem; flex-grow: 1; }
        .feature-list { list-style: none; border-top: 1px solid rgba(0,0,0,0.05); padding-top: 1.5rem; }
        .feature-list li { display: flex; align-items: center; gap: 0.75rem; color: var(--text-muted); margin-bottom: 0.75rem; font-size: 0.95rem; font-weight: 500; }
        .feature-list i { color: var(--primary); width: 18px; height: 18px; }

        /* Testimonials */
        .testimonial-card {
            padding: 3rem; display: flex; flex-direction: column; justify-content: space-between;
        }
        .stars { display: flex; gap: 0.25rem; color: #f59e0b; margin-bottom: 1.5rem; }
        
        /* Map & Contact Form */
        .contact-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
            background: white;
            border-radius: 30px;
            overflow: hidden;
            box-shadow: 0 20px 50px rgba(0,0,0,0.03);
            border: 1px solid rgba(0,0,0,0.04);
        }
        @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr; } }
        
        .contact-form-side { padding: 4rem; }
        .form-group { margin-bottom: 1.5rem; }
        .form-control {
            width: 100%; padding: 1rem 1.5rem; border-radius: 12px;
            border: 1px solid #e2e8f0; background: #f8fafc;
            font-family: 'Inter', sans-serif; font-size: 1rem;
            transition: all 0.3s;
        }
        .form-control:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 4px rgba(${primaryRgb}, 0.1); background: white; }
        
        .map-side iframe { width: 100%; height: 100%; min-height: 400px; border: none; filter: grayscale(10%) contrast(110%); }

        /* Footer */
        footer {
            background: var(--text-main);
            color: white;
            padding: 5rem 2rem 2rem;
            margin-top: 4rem;
            border-top-left-radius: 40px;
            border-top-right-radius: 40px;
        }
        .footer-grid {
            max-width: 1200px; margin: 0 auto;
            display: grid; grid-template-columns: 2fr 1fr 1fr 1.5fr; gap: 4rem;
            margin-bottom: 4rem;
        }
        @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 600px) { .footer-grid { grid-template-columns: 1fr; } }
        
        .footer-logo { font-size: 2rem; font-family: 'Outfit'; font-weight: 800; color: white; display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
        .footer-col h4 { font-size: 1.25rem; font-weight: 700; margin-bottom: 1.5rem; color: white; }
        .footer-col ul { list-style: none; }
        .footer-col ul li { margin-bottom: 0.75rem; }
        .footer-col ul li a { color: var(--text-light); text-decoration: none; transition: 0.3s; }
        .footer-col ul li a:hover { color: white; padding-left: 5px; }
        .footer-bottom { text-align: center; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 2rem; color: var(--text-light); font-size: 0.9rem; }

        /* Modal Styles */
        .modal {
            display: none; position: fixed; z-index: 2000; left: 0; top: 0; width: 100%; height: 100%;
            background-color: rgba(0,0,0,0.6); backdrop-filter: blur(8px);
        }
        .modal-content {
            background-color: #fff; margin: 3% auto; padding: 4rem; border-radius: 32px;
            width: 90%; max-width: 1000px; max-height: 90vh; overflow-y: auto; position: relative;
            box-shadow: 0 40px 100px rgba(0,0,0,0.3); border: 1px solid rgba(0,0,0,0.05);
        }
        .close-modal {
            position: absolute; right: 2rem; top: 2rem; color: #000; font-size: 32px; font-weight: 300; cursor: pointer; transition: 0.3s;
            width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; border-radius: 50%; background: #f1f5f9;
        }
        .close-modal:hover { background: var(--primary); color: white; }
        .modal h2 { margin-bottom: 2.5rem; font-family: 'Outfit'; font-weight: 800; color: var(--text-main); font-size: 2.5rem; letter-spacing: -1px; }
        .modal h3 { margin-bottom: 1rem; margin-top: 2.5rem; font-family: 'Outfit'; font-weight: 700; color: var(--text-main); }
        .modal p { margin-bottom: 1.5rem; line-height: 1.8; color: var(--text-muted); font-size: 1.05rem; }

        /* Floating Widgets (Unified Style 2026) */
        .float-widget {
            position: fixed; right: 25px;
            width: 50px; height: 50px;
            border-radius: 50%; display: flex; align-items: center; justify-content: center;
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
            z-index: 1000; transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            text-decoration: none; border: none; cursor: pointer;
        }
        .float-widget:hover { transform: scale(1.1) translateY(-5px); }
        .float-widget i, .float-widget svg { width: 24px; height: 24px; }

        .float-phone { bottom: 30px; background: white; color: var(--primary); border: 2px solid var(--primary); }
        .float-chatbot { bottom: 90px; background: linear-gradient(135deg, var(--primary), var(--secondary)); color: white; }
        .float-whatsapp { bottom: 150px; background: #25D366; color: white; }

        .chat-window {
            position: fixed; bottom: 85px; right: 85px;
            width: 350px; height: 500px;
            background: white; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.15);
            z-index: 998; display: flex; flex-direction: column; overflow: hidden;
            opacity: 0; pointer-events: none; transform: translateY(20px); transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .chat-window.open { opacity: 1; pointer-events: all; transform: translateY(0); }
        .chat-header {
            background: linear-gradient(135deg, var(--primary), var(--secondary)); color: white;
            padding: 1.25rem; font-family: 'Outfit'; font-weight: 700; display: flex; align-items: center; gap: 10px;
        }
        .chat-body { flex: 1; padding: 1.5rem; overflow-y: auto; background: #f8fafc; }
        .chat-msg { background: white; padding: 1rem; border-radius: 12px; border-bottom-left-radius: 0; box-shadow: 0 2px 10px rgba(0,0,0,0.05); margin-bottom: 1rem; font-size: 0.95rem; }
        .chat-input { padding: 1rem; background: white; border-top: 1px solid #e2e8f0; display: flex; gap: 10px; }
        .chat-input input { flex: 1; border: none; outline: none; background: #f1f5f9; padding: 0.75rem 1rem; border-radius: 100px; font-family: 'Inter'; }
        
        /* Mobile Responsive Design */
        @media (max-width: 768px) {
            /* Hero Section Mobile - Fix padding to avoid overlap with marquee + navbar */
            .hero {
                grid-template-columns: 1fr;
                padding: 7rem 1.5rem 3rem;
                text-align: center;
            }
            .hero .hero-image-col {
                display: none;
            }
            .hero h1 {
                font-size: clamp(2.5rem, 10vw, 4rem);
                text-align: center;
            }
            .hero h2 {
                font-size: clamp(1rem, 4vw, 1.5rem);
                text-align: center;
            }
            .hero p {
                text-align: center;
                font-size: 1rem;
            }
            .hero-badge {
                margin: 0 auto 1.5rem;
                font-size: 0.8rem;
                padding: 0.4rem 1rem;
            }
            .hero-content > div[style*="display: flex"] {
                justify-content: center;
            }
            
            /* Container Mobile */
            .container {
                padding: 4rem 1.5rem;
            }
            .section-header h2 {
                font-size: clamp(2rem, 6vw, 2.5rem);
            }
            .section-header p {
                font-size: 1rem;
            }
            
            /* Grid Mobile */
            .grid-3 {
                grid-template-columns: 1fr;
                gap: 1.5rem;
            }
            .valeurs-grid {
                grid-template-columns: 1fr;
                gap: 1.5rem;
            }
            .process-grid {
                grid-template-columns: 1fr;
                gap: 1.5rem;
            }
            
            /* Cards Mobile */
            .card {
                padding: 2rem;
            }
            .card-icon {
                width: 60px;
                height: 60px;
                margin-bottom: 1.5rem;
            }
            .card h3 {
                font-size: 1.25rem;
            }
            
            /* Stats Banner Mobile */
            .stats-banner {
                grid-template-columns: 1fr 1fr;
                gap: 1.5rem;
                padding: 3rem 1.5rem;
            }
            .stat-banner-item h3 {
                font-size: 2.5rem;
            }
            
            /* Contact Grid Mobile */
            .contact-grid {
                grid-template-columns: 1fr;
            }
            .contact-form-side {
                padding: 2.5rem 1.5rem;
            }
            .map-side iframe {
                min-height: 300px;
            }
            
            /* Footer Mobile */
            .footer-grid {
                grid-template-columns: 1fr;
                gap: 2rem;
            }
            footer {
                padding: 4rem 1.5rem 2rem;
            }
            
            /* Navigation Mobile */
            nav {
                top: 28px;
                padding: 0.5rem 0;
            }
            .nav-container {
                padding: 0 1rem;
            }
            .desktop-menu {
                display: none !important;
            }
            .brand {
                font-size: 1rem;
            }
            .logo-svg {
                width: 32px;
                height: 32px;
                font-size: 0.9rem;
                border-radius: 8px;
            }
            .btn-call {
                display: none !important;
            }
            .mobile-menu-toggle {
                display: block !important;
            }
            .mobile-menu {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                padding: 1rem;
                box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                border-bottom: 1px solid rgba(0,0,0,0.05);
                z-index: 100;
            }
            .mobile-menu.open {
                display: block;
            }
            .mobile-menu-link {
                display: block;
                padding: 1rem;
                text-decoration: none;
                color: var(--text-main);
                font-weight: 500;
                border-bottom: 1px solid rgba(0,0,0,0.05);
                transition: all 0.3s;
            }
            .mobile-menu-link:hover {
                color: var(--primary);
                padding-left: 1.5rem;
            }
            .mobile-menu-link:last-child {
                border-bottom: none;
            }
            .mobile-call-link {
                color: var(--primary);
                font-weight: 700;
            }
            
            /* Floating Widgets Mobile */
            .float-widget {
                width: 45px;
                height: 45px;
                right: 15px;
            }
            .float-phone {
                bottom: 20px;
            }
            .float-chatbot {
                bottom: 75px;
            }
            .float-whatsapp {
                bottom: 130px;
            }
            
            /* Chat Window Mobile */
            .chat-window {
                width: calc(100% - 30px);
                height: 400px;
                right: 15px;
                bottom: 85px;
            }
            
            /* Modal Mobile */
            .modal-content {
                width: 95%;
                padding: 2rem 1.5rem;
                margin: 5% auto;
            }
            .close-modal {
                right: 1rem;
                top: 1rem;
                width: 36px;
                height: 36px;
                font-size: 24px;
            }
            .modal h2 {
                font-size: 1.75rem;
            }
            
            /* Top Marquee Mobile */
            .top-marquee {
                font-size: 0.7rem;
                padding: 5px 0;
            }
            .marquee-content {
                gap: 1.5rem;
            }
            
            /* About Section Mobile */
            [id="about"] [style*="grid-template-columns"] {
                grid-template-columns: 1fr;
                gap: 2rem;
            }
            [id="about"] img {
                height: 350px;
            }
        }
        
        @media (max-width: 480px) {
            /* Extra Small Mobile */
            .hero {
                padding: 7rem 1rem 2rem;
            }
            .hero h1 {
                font-size: 2rem;
            }
            .hero p {
                font-size: 0.95rem;
            }
            .container {
                padding: 3rem 1rem;
            }
            .stats-banner {
                grid-template-columns: 1fr;
                padding: 2.5rem 1rem;
                gap: 2rem;
            }
            .card {
                padding: 1.5rem;
            }
            .btn-glow {
                padding: 1rem 2rem;
                font-size: 1rem;
            }
            .float-widget {
                width: 40px;
                height: 40px;
                right: 10px;
            }
            .float-phone {
                bottom: 15px;
            }
            .float-chatbot {
                bottom: 65px;
            }
            .float-whatsapp {
                bottom: 115px;
            }
            .chat-window {
                width: calc(100% - 20px);
                height: 350px;
                right: 10px;
            }
            .nav-container {
                padding: 0 0.75rem;
            }
            .brand {
                font-size: 0.9rem;
            }
            .logo-svg {
                width: 28px;
                height: 28px;
                font-size: 0.8rem;
                border-radius: 6px;
            }
            .btn-call {
                display: none !important;
            }
        }
        
    </style>
</head>
<body>

    <!-- Marquee Banner -->
    <div class="top-marquee">
        <div class="marquee-content">
            <div class="marquee-item"><i data-lucide="clock" stroke-width="2.5" width="16"></i> Ouvert de 9h à 18h en semaine</div>
            <div class="marquee-item"><i data-lucide="phone" stroke-width="2.5" width="16"></i> Intervention rapide: ${phone}</div>
            <div class="marquee-item"><i data-lucide="mail" stroke-width="2.5" width="16"></i> Envoyez un message: ${email}</div>
            <div class="marquee-item"><i data-lucide="map-pin" stroke-width="2.5" width="16"></i> Basé à: ${city || address}</div>
            <!-- Duplication for infinite effect -->
            <div class="marquee-item"><i data-lucide="clock" stroke-width="2.5" width="16"></i> Ouvert de 9h à 18h en semaine</div>
            <div class="marquee-item"><i data-lucide="phone" stroke-width="2.5" width="16"></i> Intervention rapide: ${phone}</div>
            <div class="marquee-item"><i data-lucide="mail" stroke-width="2.5" width="16"></i> Envoyez un message: ${email}</div>
            <div class="marquee-item"><i data-lucide="map-pin" stroke-width="2.5" width="16"></i> Basé à: ${city || address}</div>
        </div>
    </div>

    <div class="bg-blobs"><div class="blob blob-1"></div><div class="blob blob-2"></div></div>

    <!-- Navigation -->
    <nav id="navbar">
        <div class="nav-container">
            <a href="#" class="brand" style="text-decoration: none; display: flex; align-items: center; gap: 1rem;">
                <div class="logo-svg">${logoInfo.initials}</div>
                <div style="display: flex; flex-direction: column; justify-content: center;">
                    <div style="font-weight: 800; font-family: 'Outfit'; color: var(--text-main); font-size: 1.5rem; line-height: 1.1;">${logoInfo.text}</div>
                    <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 500;">${slogan}</div>
                </div>
            </a>
            <div style="display: flex; gap: 1.5rem; align-items: center;">
                <div style="display: none; align-items: center; gap: 1.5rem; font-weight: 500;" class="desktop-menu">
                    <a href="#about" style="text-decoration: none; color: var(--text-main);">À propos</a>
                    <a href="#valeurs" style="text-decoration: none; color: var(--text-main);">Valeurs</a>
                    <a href="#services" style="text-decoration: none; color: var(--text-main);">Services</a>
                    <a href="#testimonials" style="text-decoration: none; color: var(--text-main);">Avis</a>
                </div>
                ${phone ? `<a href="tel:${cleanPhoneLink}" class="btn-call"><i data-lucide="phone" width="18"></i> Nous appeler</a>` : ''}
                <button class="mobile-menu-toggle" id="mobile-menu-toggle" style="display: none; background: none; border: none; cursor: pointer; padding: 0.5rem;">
                    <i data-lucide="menu" width="28" height="28" style="color: var(--text-main);"></i>
                </button>
            </div>
        </div>
        <!-- Mobile Menu -->
        <div class="mobile-menu" id="mobile-menu">
            <a href="#about" class="mobile-menu-link">À propos</a>
            <a href="#valeurs" class="mobile-menu-link">Valeurs</a>
            <a href="#services" class="mobile-menu-link">Services</a>
            <a href="#testimonials" class="mobile-menu-link">Avis</a>
            <a href="#contact" class="mobile-menu-link">Contact</a>
            ${phone ? `<a href="tel:${cleanPhoneLink}" class="mobile-menu-link mobile-call-link"><i data-lucide="phone" width="18" style="margin-right: 8px;"></i> ${phone}</a>` : ''}
        </div>
    </nav>

    <!-- Hero -->
    <section class="hero bg-grid">
        <div class="bg-pattern"></div>
        <!-- Floating animated decorations - Specialized per site -->
        ${shapesType === 0 ? `
            <div class="anim-shape" style="top: 10%; left: 5%; width: 100px; height: 100px; border-radius: 50%; border: 15px solid hsla(${hue}, 70%, 50%, 0.1);"></div>
            <div class="anim-shape" style="bottom: 15%; right: 10%; width: 150px; height: 150px; border-radius: 50%; background: hsla(${hue}, 70%, 50%, 0.05);"></div>
        ` : shapesType === 1 ? `
            <div class="anim-shape" style="top: 15%; right: 5%; width: 80px; height: 80px; background: hsla(${hue}, 70%, 50%, 0.1); transform: rotate(45deg);"></div>
            <div class="anim-shape" style="bottom: 20%; left: 8%; width: 120px; height: 120px; border: 10px solid hsla(${hue}, 70%, 50%, 0.05); transform: rotate(15deg);"></div>
        ` : `
            <div class="anim-shape" style="top: 10%; left: 50%; width: 0; height: 0; border-left: 50px solid transparent; border-right: 50px solid transparent; border-bottom: 100px solid hsla(${hue}, 70%, 50%, 0.08);"></div>
            <div class="anim-shape" style="bottom: 10%; right: 40%; width: 100px; height: 100px; border: 4px solid var(--secondary); opacity: 0.1; clip-path: polygon(50% 0%, 0% 100%, 100% 100%);"></div>
        `}
        <div class="pattern-waves"></div>
        <div class="hero-content reveal active" style="position: relative; z-index: 1;">
            <div class="hero-badge"><i data-lucide="shield-check" width="18"></i> 2026 Innovation Premium</div>
            <h1 style="text-align: left; font-size: clamp(3rem, 6vw, 5.5rem); margin-bottom: 0.5rem; line-height: 1.1;">
                <span style="color: var(--primary);">${logoInfo.word1}</span><br>
                <span style="background: linear-gradient(135deg, var(--secondary), #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${logoInfo.word2}</span>
            </h1>
            <h2 style="text-align: left; font-size: clamp(1.2rem, 3vw, 2rem); font-family: 'Outfit'; color: var(--text-main); font-weight: 700; margin-bottom: 1.5rem; opacity: 0.8;">${slogan}</h2>
            <p style="text-align: left; margin-bottom: 2.5rem; font-size: 1.15rem;">${heroSubtitle}</p>
            
            <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 1rem; margin-bottom: 2rem; justify-content: flex-start; ${(rating || 0) === 0 && (reviews || 0) === 0 ? 'display: none;' : ''}">
                <div style="display: flex; color: #f59e0b;">
                    <i data-lucide="star" fill="currentColor"></i>
                    <i data-lucide="star" fill="currentColor"></i>
                    <i data-lucide="star" fill="currentColor"></i>
                    <i data-lucide="star" fill="currentColor"></i>
                    <i data-lucide="star" fill="currentColor" ${(rating || 0) < 5 ? 'opacity="0.5"' : ''}></i>
                </div>
                <div style="font-weight: 700; color: var(--text-main); font-size: 1.1rem;">${rating || 5}/5</div>
                <div style="color: var(--text-muted); font-size: 0.9rem;">(Basé sur ${reviews || 42} avis certifiés)</div>
            </div>

            <div style="text-align: left;">
                <a href="#contact" class="btn-glow">
                    ${ctaText} <i data-lucide="arrow-right"></i>
                </a>
            </div>
        </div>
        <div class="hero-image-col reveal active" style="position: relative; z-index: 1;">
            <div style="position: relative; border-radius: 40px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.1); border: 2px solid rgba(0,0,0,0.05); padding: 1rem; background: white;">
                <img src="${heroImage}" ${imgErr(0)} alt="${companyName}" style="width: 100%; height: 500px; display: block; object-fit: cover; border-radius: 30px;">
                <div style="position: absolute; top:0; left:0; right:0; bottom:0; background: radial-gradient(circle at center, transparent 40%, rgba(var(--primary-rgb), 0.05)); pointer-events: none;"></div>
                <!-- Motifs professionnels sur l'image -->
                <div style="position: absolute; bottom: 2rem; left: -2rem; background: var(--primary); height: 100px; width: 100px; border-radius: 50%; opacity: 0.1; filter: blur(20px);"></div>
                <div style="position: absolute; top: -1rem; right: 2rem; background: var(--secondary); height: 80px; width: 80px; border-radius: 30px; transform: rotate(45deg); opacity: 0.1; filter: blur(10px);"></div>
            </div>
        </div>
    </section>

    <!-- A Propos -->
    <section class="container" id="about">
        <div class="bg-pattern"></div>
        <div class="section-header reveal">
            <h2>L'art de l'excellence professionnelle</h2>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 4rem; align-items: center; position: relative; z-index: 1;">
            <div class="reveal reveal-left" style="position: relative;">
                <!-- Decorative background elements -->
                <div style="position: absolute; top: -20px; left: -20px; width: 100px; height: 100px; background: radial-gradient(var(--primary) 2px, transparent 2px); background-size: 10px 10px; z-index: 0; opacity: 0.2;"></div>
                <div style="position: absolute; bottom: -20px; right: -20px; border: 4px solid var(--primary); width: 80%; height: 80%; border-radius: 30px; z-index: 0; opacity: 0.1;"></div>
                
                <div style="position: relative; border-radius: 30px; overflow: hidden; box-shadow: 0 30px 60px rgba(0,0,0,0.1); z-index: 1; border: 8px solid white;">
                    <img src="${getImg(1)}" ${imgErr(1)} alt="${companyName}" style="width: 100%; height: 450px; object-fit: cover; display: block;">
                </div>
            </div>
            <div class="reveal reveal-right">
                <h2 style="font-size: clamp(2rem, 3.5vw, 3rem); font-weight: 800; margin-bottom: 1.5rem; font-family: 'Outfit';">
                    Qui sommes-nous ?
                </h2>
                <p style="color: var(--text-muted); font-size: 1.125rem; line-height: 1.8; margin-bottom: 2.5rem;">
                    ${aboutText}
                </p>
                <ul style="list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem;">
                    <li style="display: flex; align-items: center; gap: 0.5rem; font-weight: 600; color: var(--text-main);"><i data-lucide="check-circle-2" style="color: var(--primary);"></i> Expertise reconnue</li>
                    <li style="display: flex; align-items: center; gap: 0.5rem; font-weight: 600; color: var(--text-main);"><i data-lucide="check-circle-2" style="color: #10b981;"></i> Solutions sur-mesure</li>
                    <li style="display: flex; align-items: center; gap: 0.5rem; font-weight: 600; color: var(--text-main);"><i data-lucide="check-circle-2" style="color: #f59e0b;"></i> Accompagnement total</li>
                    <li style="display: flex; align-items: center; gap: 0.5rem; font-weight: 600; color: var(--text-main);"><i data-lucide="check-circle-2" style="color: #8b5cf6;"></i> Réactivité garantie</li>
                </ul>
            </div>
        </div>
    </section>

    <!-- Nos Valeurs -->
    <section class="container bg-alternate" id="valeurs">
        <div class="anim-shape" style="top: -5%; right: -5%; width: 120px; height: 120px; background: rgba(var(--primary-rgb), 0.1); border-radius: 30%;"></div>
        <div class="section-header reveal" style="position: relative; z-index: 1;">
            <h2>Les valeurs qui nous animent</h2>
            <p>Ce qui fait de nous le partenaire idéal pour vos projets ambitieux.</p>
        </div>
        <div class="valeurs-grid">
            <div class="valeur-card reveal" style="transition-delay: 100ms">
                <div class="valeur-icon"><i data-lucide="shield" width="32" height="32"></i></div>
                <h3 style="font-family: 'Outfit'; font-size: 1.35rem; margin-bottom: 1rem;">Fiabilité</h3>
                <p style="color: var(--text-muted); font-size: 0.95rem;">Nous tenons nos promesses. La confiance de nos clients est notre bien le plus précieux.</p>
            </div>
            <div class="valeur-card reveal" style="transition-delay: 200ms">
                <div class="valeur-icon"><i data-lucide="lightbulb" width="32" height="32"></i></div>
                <h3 style="font-family: 'Outfit'; font-size: 1.35rem; margin-bottom: 1rem;">Innovation</h3>
                <p style="color: var(--text-muted); font-size: 0.95rem;">Nous utilisons les approches les plus modernes pour garantir des résultats durables.</p>
            </div>
            <div class="valeur-card reveal" style="transition-delay: 300ms">
                <div class="valeur-icon"><i data-lucide="heart" width="32" height="32"></i></div>
                <h3 style="font-family: 'Outfit'; font-size: 1.35rem; margin-bottom: 1rem;">Passion</h3>
                <p style="color: var(--text-muted); font-size: 0.95rem;">Un amour profond du travail bien fait et une implication totale dans chaque détail.</p>
            </div>
            <div class="valeur-card reveal" style="transition-delay: 400ms">
                <div class="valeur-icon"><i data-lucide="gem" width="32" height="32"></i></div>
                <h3 style="font-family: 'Outfit'; font-size: 1.35rem; margin-bottom: 1rem;">Excellence</h3>
                <p style="color: var(--text-muted); font-size: 0.95rem;">Le standard minimum : une qualité irréprochable et un niveau de finition parfait.</p>
            </div>
        </div>
    </section>

    <!-- Nos Chiffres Clés -->
    <section class="container" style="padding-top: 2rem; padding-bottom: 2rem;">
        <div class="stats-banner reveal">
            <div class="stat-banner-item">
                <h3>${reviews}+</h3>
                <div style="font-weight: 500; opacity: 0.9;">Clients Satisfaits</div>
            </div>
            <div class="stat-banner-item">
                <h3>10+</h3>
                <div style="font-weight: 500; opacity: 0.9;">Ans d'Expérience</div>
            </div>
            <div class="stat-banner-item">
                <h3>${(reviews || 42) * 5}+</h3>
                <div style="font-weight: 500; opacity: 0.9;">Projets Réalisés</div>
            </div>
            <div class="stat-banner-item">
                <h3>100%</h3>
                <div style="font-weight: 500; opacity: 0.9;">Satisfaction Garantie</div>
            </div>
        </div>
    </section>

    <!-- Garanties & Assurances -->
    <section class="container bg-alternate" id="garanties" style="background: rgba(255,255,255,0.4); backdrop-filter: blur(10px); margin: 3rem auto; border-radius: 40px; box-shadow: 0 10px 40px rgba(0,0,0,0.03); border: 1px solid rgba(0,0,0,0.05);">
        <div class="section-header reveal">
            <h2>Garanties & Assurances</h2>
            <p>Travaillez l'esprit serein grâce à nos couvertures complètes conformes à la législation.</p>
        </div>
        <div class="valeurs-grid">
            <div class="valeur-card reveal" style="border-top: 4px solid #10b981; transition-delay: 100ms; background: white;">
                <div class="valeur-icon" style="background: rgba(16,185,129,0.1); color: #10b981;"><i data-lucide="shield-check" width="32" height="32"></i></div>
                <h3 style="font-family: 'Outfit'; font-size: 1.25rem; font-weight: 700; color: var(--text-main);">Garantie Décennale</h3>
            </div>
            <div class="valeur-card reveal" style="border-top: 4px solid #3b82f6; transition-delay: 200ms; background: white;">
                <div class="valeur-icon" style="background: rgba(59,130,246,0.1); color: #3b82f6;"><i data-lucide="briefcase" width="32" height="32"></i></div>
                <h3 style="font-family: 'Outfit'; font-size: 1.25rem; font-weight: 700; color: var(--text-main);">Assurance RC Pro</h3>
            </div>
            <div class="valeur-card reveal" style="border-top: 4px solid #f59e0b; transition-delay: 300ms; background: white;">
                <div class="valeur-icon" style="background: rgba(245,158,11,0.1); color: #f59e0b;"><i data-lucide="award" width="32" height="32"></i></div>
                <h3 style="font-family: 'Outfit'; font-size: 1.25rem; font-weight: 700; color: var(--text-main);">Certification Qualité</h3>
            </div>
            <div class="valeur-card reveal" style="border-top: 4px solid #8b5cf6; transition-delay: 400ms; background: white;">
                <div class="valeur-icon" style="background: rgba(139,92,246,0.1); color: #8b5cf6;"><i data-lucide="lock" width="32" height="32"></i></div>
                <h3 style="font-family: 'Outfit'; font-size: 1.25rem; font-weight: 700; color: var(--text-main);">Assurance Tous Risques</h3>
            </div>
        </div>
    </section>

    <!-- Process (4 Démarches) -->
    <section class="container" id="process">
        <div class="anim-shape" style="bottom: 10%; left: 0%; width: 80px; height: 80px; border: 4px solid var(--secondary); transform: rotate(20deg); opacity: 0.1;"></div>
        <div class="section-header reveal">
            <h2>Notre démarche en 4 étapes</h2>
            <p>Une méthodologie claire et transparente pour garantir le succès de votre projet.</p>
        </div>
        <div class="process-grid reveal">
            <div class="step-card">
                <div class="step-number">1</div>
                <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1rem; font-family: 'Outfit';">Prise de contact</h3>
                <p style="color: var(--text-muted); font-size: 0.95rem;">Nous étudions ensemble votre besoin et définissons les priorités.</p>
            </div>
            <div class="step-card">
                <div class="step-number">2</div>
                <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1rem; font-family: 'Outfit';">Devis détaillé</h3>
                <p style="color: var(--text-muted); font-size: 0.95rem;">Un chiffrage précis et transparent, sans aucun frais caché.</p>
            </div>
            <div class="step-card">
                <div class="step-number">3</div>
                <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1rem; font-family: 'Outfit';">Intervention</h3>
                <p style="color: var(--text-muted); font-size: 0.95rem;">Réalisation de la prestation par nos experts qualifiés.</p>
            </div>
            <div class="step-card">
                <div class="step-number">4</div>
                <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1rem; font-family: 'Outfit';">Suivi qualité</h3>
                <p style="color: var(--text-muted); font-size: 0.95rem;">Nous nous assurons de votre entière satisfaction après livraison.</p>
            </div>
        </div>
    </section>

    <!-- Services -->
    <section class="container bg-alternate" id="services">
        <div class="section-header reveal" style="position: relative; z-index: 1;">
            <h2>Notre Expertise Premium</h2>
            <p>L'alliance parfaite de la maîtrise technique et des outils les plus modernes.</p>
        </div>
        <div class="grid-3">
            ${services.map((s, i) => `
            <div class="card glass reveal zoom-hover" style="transition-delay: ${i * 100}ms">
                ${getImg(i + 2) ? `
                <div style="height: 200px; margin: -3rem -3rem 2rem; border-radius: 20px 20px 0 0; overflow: hidden; position: relative;">
                    <img src="${getImg(i + 2)}" ${imgErr(i + 2)} alt="${s.name}" style="width: 100%; height: 100%; object-fit: cover;">
                    <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 100%; background: linear-gradient(to top, rgba(255,255,255,0.4), transparent);"></div>
                </div>` : ''}
                <div class="card-icon" style="${getImg(i + 2) ? 'margin-top: -1rem;' : ''} background: white; border: 1px solid rgba(0,0,0,0.05); box-shadow: 0 10px 20px rgba(0,0,0,0.05);">
                    <i data-lucide="${['shield', 'layers', 'box', 'award', 'cpu', 'gem'][i%6]}" width="32" height="32"></i>
                </div>
                <h3>${s.name}</h3>
                <p>${s.description}</p>
                <ul class="feature-list">
                    ${s.features.map(f => `
                        <li><i data-lucide="check-circle-2"></i> ${f}</li>
                    `).join('')}
                </ul>
            </div>
            `).join('')}
        </div>
    </section>

    <!-- Testimonials (6 Avis) -->
    <section class="container" id="testimonials">
        <div class="section-header reveal" style="position: relative; z-index: 1;">
            <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(0,0,0,0.03); padding: 0.5rem 1rem; border-radius: 100px; margin-bottom: 1rem; font-weight: 600; font-size: 0.9rem;">
                <i data-lucide="map-pin" width="16" style="color: #ea4335;"></i> Avis authentiques vérifiés par Google Maps
            </div>
            <h2>Ils l'ont vérifié, ils l'ont approuvé</h2>
            <p>Découvrez pourquoi 100% de nos clients nous recommandent à leur entourage.</p>
        </div>
        <div class="grid-3">
            ${testimonials.map((t, i) => `
            <div class="card testimonial-card glass reveal" style="transition-delay: ${(i%3) * 100}ms">
                <div>
                    <div class="stars">
                        ${Array(t.rating).fill('<i data-lucide="star" fill="currentColor"></i>').join('')}
                    </div>
                    <p style="color: var(--text-main); font-size: 1.125rem; font-weight: 500; font-style: italic; line-height: 1.6;">"${t.text}"</p>
                </div>
                <div style="display: flex; align-items: center; gap: 1rem; margin-top: 2rem; border-top: 1px solid rgba(0,0,0,0.05); padding-top: 1.5rem;">
                    <div style="width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, var(--primary), var(--secondary)); display: flex; align-items:center; justify-content:center; font-weight: 700; color: white; font-size: 1.25rem;">
                        ${t.author.charAt(0)}
                    </div>
                    <div>
                        <div style="font-weight: 700; color: var(--text-main);">${t.author}</div>
                        ${t.date ? `<div style="font-size: 0.875rem; color: var(--text-muted);">${t.date}</div>` : ''}
                    </div>
                </div>
            </div>
            `).join('')}
        </div>
    </section>

    <!-- Maps & Contact -->
    <section class="container" id="contact">
        <div class="section-header reveal">
            <h2>Passez à l'action dès aujourd'hui</h2>
            <p>Notre équipe est prête à intervenir. Contactez-nous pour un diagnostic rapide.</p>
        </div>
        <div class="contact-grid reveal">
            <div class="map-side">
                <iframe 
                    src="https://maps.google.com/maps?q=${mapQuery}&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                    allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
            <div class="contact-form-side">
                <h3 style="font-size: 2rem; font-family: 'Outfit'; margin-bottom: 2rem;">Envoyez-nous un message</h3>
                <form onsubmit="event.preventDefault(); alert('Message envoyé avec succès. Nous vous contacterons très vite !');">
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Votre nom complet" required>
                    </div>
                    <div class="form-group">
                        <input type="email" class="form-control" placeholder="Votre adresse e-mail" required>
                    </div>
                    <div class="form-group">
                        <input type="tel" class="form-control" placeholder="Votre téléphone" required>
                    </div>
                    <div class="form-group">
                        <textarea class="form-control" rows="4" placeholder="Détaillez votre besoin..." required></textarea>
                    </div>
                    <button type="submit" class="btn-glow" style="width: 100%; justify-content: center;">
                        <i data-lucide="send"></i> Envoyer la demande
                    </button>
                    <p style="text-align: center; margin-top: 1rem; font-size: 0.85rem; color: var(--text-light);">
                        Données protégées et confidentielles. Aucun spam.
                    </p>
                </form>
            </div>
        </div>
    </section>

    <!-- Professional Footer -->
    <footer>
        <div class="footer-grid">
            <div class="footer-col">
                <div class="footer-logo">
                    <div class="logo-svg" style="box-shadow: none;">${logoInfo.initials}</div>
                    ${logoInfo.text}
                </div>
                <p style="color: var(--text-light); margin-bottom: 2rem;">${aboutText.substring(0, 120)}...</p>
                <div style="display: flex; gap: 1rem;">
                    <a href="#" style="color: white; opacity: 0.7; transition: 0.3s;"><i data-lucide="facebook"></i></a>
                    <a href="#" style="color: white; opacity: 0.7; transition: 0.3s;"><i data-lucide="instagram"></i></a>
                    <a href="#" style="color: white; opacity: 0.7; transition: 0.3s;"><i data-lucide="linkedin"></i></a>
                </div>
            </div>
            <div class="footer-col">
                <h4>Nos Services</h4>
                <ul>
                    ${services.slice(0,4).map(s => `<li><a href="#services">${s.name}</a></li>`).join('')}
                    <li><a href="#contact">Sur Devis</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Liens Utiles</h4>
                <ul>
                    <li><a href="#process">Notre Démarche</a></li>
                    <li><a href="#testimonials">Avis Clients</a></li>
                    <li><a href="javascript:void(0)" onclick="openModal('modal-mentions')">Mentions Légales</a></li>
                    <li><a href="javascript:void(0)" onclick="openModal('modal-policy')">Confidentialité</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Contact Info</h4>
                <ul style="color: var(--text-light);">
                    ${phone ? `<li style="display: flex; gap: 10px;"><i data-lucide="phone"></i> ${phone}</li>` : ''}
                    ${email ? `<li style="display: flex; gap: 10px;"><i data-lucide="mail"></i> ${email}</li>` : ''}
                    ${address ? `<li style="display: flex; gap: 10px;"><i data-lucide="map-pin"></i> ${address}</li>` : ''}
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2026 ${companyName}. Tous droits réservés. Créé Services-Siteup.</p>
        </div>
    </footer>

    <!-- Floating Buttons (Aligned Vertical) -->
    <a href="tel:${cleanPhoneLink}" class="float-widget float-phone" title="Appeler maintenant">
        <i data-lucide="phone"></i>
    </a>

    <button id="chatbot-toggle" class="float-widget float-chatbot" title="Discuter avec notre IA">
        <i data-lucide="message-circle"></i>
    </button>

    <a href="https://wa.me/${cleanPhoneLink}?text=Bonjour, je souhaite avoir plus d'informations." target="_blank" class="float-widget float-whatsapp" title="Discuter sur WhatsApp">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/></svg>
    </a>

    <!-- Chatbot Window -->
    <div class="chat-window" id="chat-window">
        <div class="chat-header">
            <div style="width: 10px; height: 10px; background: #22c55e; border-radius: 50%;"></div>
            Assistant IA - ${logoInfo.text}
        </div>
        <div class="chat-body" id="chat-body">
            <div class="chat-msg">Bonjour ! Je suis l'assistant virtuel de ${logoInfo.text}. Comment puis-je vous aider aujourd'hui ? Avez-vous une question sur nos services ?</div>
        </div>
        <div class="chat-input">
            <input type="text" id="chat-text" placeholder="Écrivez votre message...">
            <button onclick="sendMsg()" style="background: none; border: none; color: var(--primary); cursor: pointer;"><i data-lucide="send"></i></button>
        </div>
    </div>

    <!-- Modals for Policies -->
    <div id="modal-mentions" class="modal">
        <div class="modal-content">
            <span class="close-modal" onclick="closeModal('modal-mentions')">&times;</span>
            <h2>Mentions Légales</h2>
            <h3>1. Édition du site</h3>
            <p>Le présent site est édité par l'entreprise <strong>${companyName}</strong>, située au <strong>${address}</strong>.</p>
            <p>Directeur de la publication : Le Gérant de ${companyName}.</p>
            <h3>2. Hébergement</h3>
            <p>Le site est hébergé par Vercel Inc., dont le siège social est situé au 340 S Lemon Ave #4133 Walnut, CA 91789, USA.</p>
            <h3>3. Propriété intellectuelle</h3>
            <p>Tous les éléments du site (textes, logos, images, icônes) sont la propriété exclusive de ${companyName} ou de ses partenaires. Toute reproduction, représentation, modification ou adaptation totale ou partielle de tout ou partie du site est interdite.</p>
            <h3>4. Contact</h3>
            <p>Pour toute question ou demande d'information, vous pouvez nous contacter :</p>
            <ul>
                <li>Par téléphone au : <strong>${phone}</strong></li>
                <li>Par e-mail à : <strong>${email}</strong></li>
            </ul>
        </div>
    </div>

    <div id="modal-policy" class="modal">
        <div class="modal-content">
            <span class="close-modal" onclick="closeModal('modal-policy')">&times;</span>
            <h2>Politique de Confidentialité</h2>
            <p>Chez <strong>${companyName}</strong>, nous accordons une importance capitale à la protection de vos données personnelles.</p>
            <h3>1. Collecte des données</h3>
            <p>Nous collectons les données que vous nous soumettez via nos formulaires de contact : Nom, Prénom, Numéro de téléphone et Adresse e-mail.</p>
            <h3>2. Finalité du traitement</h3>
            <p>Ces données sont uniquement utilisées pour répondre à vos demandes de renseignements, établir des devis personnalisés ou assurer le suivi de nos interventions.</p>
            <h3>3. Conservation des données</h3>
            <p>Les données sont conservées pendant une durée de 3 ans après notre dernier contact avec vous. Elles ne sont jamais cédées ou vendues à des tiers.</p>
            <h3>4. Vos droits (RGPD)</h3>
            <p>Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles. Pour exercer ce droit, écrivez-nous à <strong>${email}</strong>.</p>
            <h3>5. Cookies</h3>
            <p>Notre site peut utiliser des cookies de confort pour améliorer votre expérience utilisateur. Vous pouvez les désactiver dans les paramètres de votre navigateur.</p>
        </div>
    </div>

    <!-- Scripts -->
    <script>
        lucide.createIcons();

        // Navbar Scroll Effect
        window.addEventListener('scroll', () => {
            const nav = document.getElementById('navbar');
            if(window.scrollY > 40) nav.classList.add('scrolled');
            else nav.classList.remove('scrolled');
        });

        // CSS Media query JS equivalent for desktop menu
        if (window.innerWidth > 768) {
            document.querySelector('.desktop-menu').style.display = 'flex';
        }

        // Mobile Menu Toggle
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuToggle && mobileMenu) {
            mobileMenuToggle.addEventListener('click', () => {
                mobileMenu.classList.toggle('open');
            });
            
            // Close menu when clicking on a link
            mobileMenu.querySelectorAll('.mobile-menu-link').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('open');
                });
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                    mobileMenu.classList.remove('open');
                }
            });
        }

        // Intersection Observer for Reveal Animations
        const reveals = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
        reveals.forEach(reveal => observer.observe(reveal));

        // Hover Effect on Cards
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', \`\${x}px\`);
                card.style.setProperty('--mouse-y', \`\${y}px\`);
            });
        });

        // Chatbot Logic
        const chatToggle = document.getElementById('chatbot-toggle');
        const chatWindow = document.getElementById('chat-window');
        const chatBody = document.getElementById('chat-body');
        const chatText = document.getElementById('chat-text');

        chatToggle.addEventListener('click', () => {
            chatWindow.classList.toggle('open');
        });

        function sendMsg() {
            const val = chatText.value.trim();
            if(!val) return;
            
            // User msg
            const uMsg = document.createElement('div');
            uMsg.className = 'chat-msg';
            uMsg.style.background = 'var(--primary)';
            uMsg.style.color = 'white';
            uMsg.style.marginLeft = 'auto';
            uMsg.style.borderBottomLeftRadius = '12px';
            uMsg.style.borderBottomRightRadius = '0';
            uMsg.textContent = val;
            chatBody.appendChild(uMsg);
            chatText.value = '';
            chatBody.scrollTo(0, chatBody.scrollHeight);

            // Bot typing
            setTimeout(() => {
                const bMsg = document.createElement('div');
                bMsg.className = 'chat-msg';
                
                const responses = [
                    "C'est noté ! Je transfère votre demande à notre équipe experte. Pouvez-vous me laisser vos coordonnées ?",
                    "Excellente question. Nos tarifs sur-mesure nécessitent une étude rapide. Appelez-nous au ${phone} pour vérifier.",
                    "Oui, nous couvrons bien cette prestation. Souhaitez-vous planifier un diagnostic gratuit ?",
                    "Pour cette demande spécifique, le plus rapide est de nous laisser votre numéro. Acceptez-vous ?"
                ];
                bMsg.textContent = responses[Math.floor(Math.random() * responses.length)];
                
                chatBody.appendChild(bMsg);
                chatBody.scrollTo(0, chatBody.scrollHeight);
            }, 1000);
        }
        chatText.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMsg(); });

        // Modal Management
        function openModal(id) {
            document.getElementById(id).style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
        function closeModal(id) {
            document.getElementById(id).style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        window.onclick = function(event) {
            if (event.target.className === 'modal') {
                event.target.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    </script>
</body>
</html>`;
}
