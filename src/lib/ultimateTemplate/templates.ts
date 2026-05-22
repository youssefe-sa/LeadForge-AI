import { getSectorImages } from '../pexelsImages';

export interface TemplateStyle {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  heroTitle?: string;
  heroSubtitle?: string;
  aboutText?: string;
  ctaText?: string;
  services?: Array<{ name: string; description: string; features: string[] }>;
  guarantees?: Array<{ title: string; icon: string }>;
}

export interface SectorLayout {
  sections: string[];
  customComponents?: string[];
  specialFeatures?: string[];
}

export const SECTOR_ULTIMATE_TEMPLATES: Record<string, TemplateStyle> = {
  plomberie: {
    primary: '#0f766e',
    secondary: '#115e59',
    accent: '#14b8a6',
    background: '#f0fdfa',
    services: [
      { name: 'Dépannage 24h/24', description: 'Intervention d\'urgence sur toutes fuites et pannes', features: ['Disponible 7j/7', 'Arrivée sous 1h30', 'Sans surprise tarifaire'] },
      { name: 'Installation Sanitaire', description: 'Pose et remplacement de vos appareils', features: ['Robinetterie', 'Éviers', 'WC', 'Douches'] },
      { name: 'Chauffage & Chaudière', description: 'Installation et réparation chauffage', features: ['Chaudières gaz/fioul', 'Pompes à chaleur', 'Détartrage'] },
      { name: 'Détection de Fuites', description: 'Localisation précise sans casse', features: ['Caméra thermique', 'Gaz traceur', 'Colmatage immédiat'] },
      { name: 'Rénovation Salle de Bain', description: 'Création et rénovation complète', features: ['Devis gratuit', 'Aide au choix', 'Clé en main'] },
      { name: 'Entretien Annuel', description: 'Maintenance préventive', features: ['Contrôle chauffage', 'Détartrage', 'Mise aux normes'] }
    ],
    guarantees: [
      { title: 'Garantie Décennale', icon: 'shield-check' },
      { title: 'Intervention < 2h', icon: 'clock' },
      { title: 'Devis Gratuit', icon: 'file-text' },
      { title: 'Artisan Qualifié', icon: 'check-square' }
    ],
    heroTitle: 'Artisan Plombier',
    heroSubtitle: "L'artisan du tuyau à votre service - De la fuite d'eau à la rénovation complète",
    aboutText: "Plombier chauffagiste depuis plus de 15 ans, je mets mon savoir-faire au service de vos installations. Artisan passionné, je garantis un travail soigné, des délais respectés et des tarifs transparents.",
    ctaText: 'Demandez un devis'
  },
  electricien: {
    primary: '#1e40af',
    secondary: '#1e3a8a',
    accent: '#2563eb',
    background: '#f8fafc',
    services: [
      { name: 'Mise aux Normes', description: 'Remise à neuf de votre installation électrique', features: ['Norme NFC 15-100', 'Tableau électrique neuf', 'Mise à la terre'] },
      { name: 'Dépannage Électrique', description: 'Pannes, court-circuits, disjonctions', features: ['Intervention rapide', 'Diagnostic complet', 'Réparation durable'] },
      { name: 'Installation Complète', description: 'Construction ou rénovation électrique', features: ['Câblage complet', 'Points de lumière', 'Prises et inters'] },
      { name: 'Domotique & Smart Home', description: 'Maison connectée et automatisée', features: ['Volets roulants', 'Éclairage auto', 'Thermostats'] },
      { name: 'Éclairage LED', description: 'Solutions éclairage économiques', features: ['Spots encastrés', 'Suspensions design', 'Éclairage extérieur'] },
      { name: 'Charging Véhicule', description: 'Installation bornes de recharge', features: ['Wallbox particulier', 'Borne entreprise', 'Certification IRVE'] }
    ],
    guarantees: [
      { title: 'Consuel Certifié', icon: 'shield-check' },
      { title: 'Garantie Décennale', icon: 'check-square' },
      { title: 'Intervention < 2h', icon: 'clock' },
      { title: 'Devis Gratuit', icon: 'file-text' }
    ],
    heroTitle: 'Électricien Agréé',
    heroSubtitle: "Votre expert électricien pour des installations sûres et modernes",
    aboutText: "Électricien certifié Consuel avec 15 ans d'expérience. Je sécurise votre habitat grâce à des installations conformes et durables. Artisan sérieux, intervention rapide et devis transparent.",
    ctaText: 'Contactez-moi'
  },
  coiffeur: {
    primary: '#6b21a8',
    secondary: '#581c87',
    accent: '#7c3aed',
    background: '#f8fafc',
    services: [
      { name: 'Coupes & Styles', description: 'Coupe sur-mesure femme et homme', features: ['Visagisme personnalisé', 'Techniques actuelles', 'Conseil entretien'] },
      { name: 'Barbier Traditionnel', description: 'Rasage et soins barbe', features: ['Rasage à l\'ancienne', 'Taille précise', 'Soins barbe'] },
      { name: 'Coloration Expert', description: 'Balayages, ombrés et couleurs', features: ['Coloration végétale', 'Mèches sur mesure', 'Glitter color'] },
      { name: 'Soins Capillaires', description: 'Traitements réparateurs', features: ['Botox capillaire', 'Kératine', 'Massage crânien'] },
      { name: 'Extensions Volume', description: 'Rajouts longueur et épaisseur', features: ['Pose à froid', 'Tape-in', 'Entretien inclus'] },
      { name: 'Chignons & Événements', description: 'Coiffures de cérémonie', features: ['Mariage', 'Sofreh aghd', 'Maquillage combo'] }
    ],
    guarantees: [
      { title: 'Produits Bio', icon: 'leaf' },
      { title: 'Stérilisation Outils', icon: 'sparkles' },
      { title: 'Formation Continue', icon: 'scissors' },
      { title: 'Satisfait ou Refait', icon: 'heart' }
    ],
    heroTitle: 'Coiffeur Visagiste',
    heroSubtitle: "L'art de sublimer vos cheveux avec passion et expertise",
    aboutText: "Coiffeur passionné depuis 15 ans, je crée des looks qui vous ressemblent. Spécialiste du visagisme et des techniques modernes, je veille à la santé de vos cheveux avec des produits naturels et de qualité.",
    ctaText: 'Prendre rendez-vous'
  },
  restaurant: {
    primary: '#c2410c',
    secondary: '#9a3412',
    accent: '#ea580c',
    background: '#f8fafc',
    services: [
      { name: 'Cuisine Maison', description: 'Plats préparés sur place', features: ['Produits locaux', 'Recettes authentiques', 'Fait minute'] },
      { name: 'Menu du Jour', description: 'Formule déjeuner économique', features: ['Entrée + Plat + Dessert', 'Produits frais', 'Cuisson minute'] },
      { name: 'Spécialités', description: 'Nos plats signature', features: ['Recettes du terroir', 'Grillades', 'Poissons frais'] },
      { name: 'Événements & Groupes', description: 'Repas de famille et séminaires', features: ['Menu groupe', 'Salle privative', 'Sur mesure'] },
      { name: 'Service Traiteur', description: 'Livraison et à emporter', features: ['Plateaux repas', 'Buffets', 'Livraison pro'] },
      { name: 'Boissons & Vins', description: 'Carte des vins et cocktails', features: ['Vins régionaux', 'Cocktails maison', 'Bières artisanales'] }
    ],
    guarantees: [
      { title: 'Cuisine Maison', icon: 'award' },
      { title: 'Produits Locaux', icon: 'leaf' },
      { title: 'Menu Sur Mesure', icon: 'check-square' },
      { title: 'Service Rapide', icon: 'clock' }
    ],
    heroTitle: 'Restaurant Traditionnel',
    heroSubtitle: "Cuisine authentique et accueil chaleureux depuis 2009",
    aboutText: "Chef passionné depuis 15 ans, je cuisine avec cœur des plats généreux et savoureux. Produits frais du marché, recettes authentiques et ambiance conviviale vous attendent dans notre établissement.",
    ctaText: 'Réserver une table'
  },
  garage: {
    primary: '#166534',
    secondary: '#14532d',
    accent: '#059669',
    background: '#f8fafc',
    services: [
      { name: 'Diagnostic moteur', description: 'Diagnostic précis et transparent', features: ['Test électronique', 'Rapport détaillé', 'Conseil intelligent'] },
      { name: 'Révision Entretien', description: 'Maintenance complète de votre véhicule', features: ['Vidange', 'Filtres', 'Contrôle sécurité'] },
      { name: 'Pneumatique', description: 'Montage, équilibrage et géométrie', features: ['Pneus toutes tailles', 'Performance optimale', 'Sécurité renforcée'] },
      { name: 'Carrosserie', description: 'Réparations et retouches soignées', features: ['Peinture pro', 'Débosselage', 'Finition haut de gamme'] },
      { name: 'Climatisation', description: 'Entretien et recharge système AC', features: ['Contrôle gaz', 'Désinfection', 'Efficacité retrouvée'] },
      { name: 'Prise en charge véhicule', description: 'Accueil rapide et service sur mesure', features: ['Devis clair', 'Remise clé', 'Suivi client'] }
    ],
    guarantees: [
      { title: 'Pièces Qualité', icon: 'award' },
      { title: 'Diagnostic Pro', icon: 'check-square' },
      { title: 'Intervention Rapide', icon: 'clock' },
      { title: 'Garantie Atelier', icon: 'shield-check' }
    ],
    heroTitle: 'Garage Automobile',
    heroSubtitle: "Entretien et réparation fiables pour votre véhicule",
    aboutText: "Garage indépendant avec une équipe d\'experts, nous accompagnons votre voiture du diagnostic à la réparation. Professionnalisme, transparence et rapidité sont au cœur de nos interventions.",
    ctaText: 'Demander un diagnostic'
  },
  nettoyage: {
    primary: '#047857',
    secondary: '#065f46',
    accent: '#10b981',
    background: '#f0fdf4',
    services: [
      { name: 'Nettoyage Résidentiel', description: 'Maison, appartement et locaux privés', features: ['Produits écologiques', 'Finition soignée', 'Disponibilité rapide'] },
      { name: 'Entretien Bureaux', description: 'Propreté quotidienne et régulière', features: ['Organisation fiable', 'Équipe discrète', 'Qualité constante'] },
      { name: 'Post-Chantier', description: 'Remise en état après travaux', features: ['Déchets évacués', 'Désinfection', 'Surface impeccable'] },
      { name: 'Vitrerie Professionnelle', description: 'Nettoyage vitres et baies vitrées', features: ['Sans traces', 'Hauteur maîtrisée', 'Résultat cristal'] },
      { name: 'Nettoyage Industriel', description: 'Entretien de sites industriels', features: ['Normes sécurité', 'Puissance adaptée', 'Équipe formée'] },
      { name: 'Forfaits Sur Mesure', description: 'Solutions adaptées à chaque budget', features: ['Devis gratuit', 'Flexibilité', 'Prix transparent'] }
    ],
    guarantees: [
      { title: 'Produits Écolos', icon: 'leaf' },
      { title: 'Intervention Rapide', icon: 'clock' },
      { title: 'Équipe Formée', icon: 'user' },
      { title: 'Devis Gratuit', icon: 'file-text' }
    ],
    heroTitle: 'Service de Nettoyage',
    heroSubtitle: "Propreté professionnelle pour vos espaces de vie et de travail",
    aboutText: "Entreprise de nettoyage expérimentée, nous proposons un service flexible et respectueux de l\'environnement. Nous offrons une propreté impeccable et un suivi personnalisé.",
    ctaText: 'Obtenir un devis'
  },
  default: {
    primary: '#D4500A',
    secondary: '#F97316',
    accent: '#F59E0B',
    background: '#fff7ed',
    services: [
      { name: 'Service Professionnel', description: 'Solide expertise pour tous les besoins', features: ['Accompagnement personnalisé', 'Résultats rapides', 'Qualité garantie'] },
      { name: 'Conseil Sur Mesure', description: 'Solutions adaptées à votre situation', features: ['Analyse précise', 'Plan d\'action clair', 'Suivi régulier'] },
      { name: 'Support Client', description: 'Disponibilité et réactivité', features: ['Réponse rapide', 'Assistance dédiée', 'Suivi continu'] },
      { name: 'Livraison Rapide', description: 'Respect des délais et efficacité', features: ['Processus optimisé', 'Qualité constante', 'Engagement fiable'] },
      { name: 'Offre Premium', description: 'Service haut de gamme pour un résultat durable', features: ['Standards élevés', 'Attention au détail', 'Satisfaction client'] },
      { name: 'Solution Complète', description: 'Tout ce dont vous avez besoin dans un seul service', features: ['Organisation centralisée', 'Processus transparent', 'Budget maîtrisé'] }
    ],
    guarantees: [
      { title: 'Professionnalisme', icon: 'check-square' },
      { title: 'Disponibilité', icon: 'clock' },
      { title: 'Qualité', icon: 'award' },
      { title: 'Satisfaction', icon: 'heart' }
    ],
    heroTitle: 'Service Expert',
    heroSubtitle: "Votre partenaire professionnel pour des résultats fiables",
    aboutText: "Nous créons des solutions complètes et adaptées à vos besoins. Notre équipe combine expertise, réactivité et qualité pour chaque projet.",
    ctaText: 'Contactez-nous'
  }
};

export const SECTOR_LAYOUTS: Record<string, SectorLayout> = {
  restaurant: {
    sections: ['header', 'hero', 'menu', 'about', 'gallery', 'testimonials', 'reservation', 'contact', 'footer'],
    customComponents: ['menu-grid', 'gallery-masonry', 'reservation-form'],
    specialFeatures: ['carte-interactive', 'horaires-ouvertures', 'menu-pdf']
  },
  garage: {
    sections: ['header', 'hero', 'services', 'brands', 'about', 'testimonials', 'appointment', 'contact', 'footer'],
    customComponents: ['brands-showcase', 'appointment-calendar', 'diagnostic-tool'],
    specialFeatures: ['marques-traitees', 'calendrier-rdv', 'diagnostic-en-ligne']
  },
  coiffeur: {
    sections: ['header', 'hero', 'services', 'gallery', 'about', 'testimonials', 'booking', 'contact', 'footer'],
    customComponents: ['service-cards', 'gallery-instagram', 'booking-system'],
    specialFeatures: ['galerie-shampoing', 'prix-services', 'rdv-en-ligne']
  },
  plomberie: {
    sections: ['header', 'hero', 'emergency', 'services', 'about', 'testimonials', 'quote', 'contact', 'footer'],
    customComponents: ['emergency-banner', 'service-grid', 'quote-calculator'],
    specialFeatures: ['urgence-24h', 'devis-en-ligne', 'intervention-rapide']
  },
  electricien: {
    sections: ['header', 'hero', 'services', 'certifications', 'about', 'testimonials', 'quote', 'contact', 'footer'],
    customComponents: ['certification-badges', 'service-categories', 'quote-form'],
    specialFeatures: ['normes-electriques', 'certifications', 'devis-gratuit']
  },
  nettoyage: {
    sections: ['header', 'hero', 'services', 'pricing', 'about', 'testimonials', 'quote', 'contact', 'footer'],
    customComponents: ['service-packages', 'pricing-table', 'quote-calculator'],
    specialFeatures: ['forfaits-nettoyage', 'tarifs-clairs', 'devis-personnalisé']
  },
  default: {
    sections: ['header', 'hero', 'services', 'about', 'testimonials', 'contact', 'footer'],
    customComponents: [],
    specialFeatures: []
  }
};

export function getSectorLayout(sector: string): SectorLayout {
  const normalizedSector = (sector || '').toLowerCase();
  for (const [key, layout] of Object.entries(SECTOR_LAYOUTS)) {
    if (normalizedSector.includes(key) || key.includes(normalizedSector)) {
      return layout;
    }
  }
  return SECTOR_LAYOUTS.default;
}

export function getSectorImagesFallback(sector: string): string[] {
  return getSectorImages(sector);
}

export function getUltimateTemplate(sector: string): TemplateStyle {
  const normalizedSector = (sector || '').toLowerCase();

  if (normalizedSector.includes('nettoyag') || normalizedSector.includes('propreté') || normalizedSector.includes('ménage')) return SECTOR_ULTIMATE_TEMPLATES.nettoyage;
  if (normalizedSector.includes('jardin') || normalizedSector.includes('paysag') || normalizedSector.includes('espaces verts')) return SECTOR_ULTIMATE_TEMPLATES.default;
  if (normalizedSector.includes('coach') || normalizedSector.includes('sport') || normalizedSector.includes('fitness') || normalizedSector.includes('salle')) return SECTOR_ULTIMATE_TEMPLATES.default;
  if (normalizedSector.includes('médec') || normalizedSector.includes('clinique') || normalizedSector.includes('dentiste') || normalizedSector.includes('santé')) return SECTOR_ULTIMATE_TEMPLATES.default;
  if (normalizedSector.includes('avocat') || normalizedSector.includes('notaire') || normalizedSector.includes('juridi') || normalizedSector.includes('droit')) return SECTOR_ULTIMATE_TEMPLATES.default;
  if (normalizedSector.includes('électricien') || normalizedSector.includes('electricien') || normalizedSector.includes('electric')) return SECTOR_ULTIMATE_TEMPLATES.electricien;
  if (normalizedSector.includes('plomb') || normalizedSector.includes('plomberie') || normalizedSector.includes('plombier') || normalizedSector.includes('chauffage') || normalizedSector.includes('clim')) return SECTOR_ULTIMATE_TEMPLATES.plomberie;
  if (normalizedSector.includes('coiff') || normalizedSector.includes('barb') || normalizedSector.includes('salon')) return SECTOR_ULTIMATE_TEMPLATES.coiffeur;
  if (normalizedSector.includes('restaurant') || normalizedSector.includes('cuisin') || normalizedSector.includes('traiteur')) return SECTOR_ULTIMATE_TEMPLATES.restaurant;
  if (normalizedSector.includes('garage') || normalizedSector.includes('mécan') || normalizedSector.includes('auto') || normalizedSector.includes('carrosserie')) return SECTOR_ULTIMATE_TEMPLATES.garage;
  if (normalizedSector.includes('climat') || normalizedSector.includes('frigo')) return SECTOR_ULTIMATE_TEMPLATES.plomberie;
  if (normalizedSector.includes('beauté') || normalizedSector.includes('esthétique') || normalizedSector.includes('spa')) return SECTOR_ULTIMATE_TEMPLATES.coiffeur;
  if (normalizedSector.includes('boulanger') || normalizedSector.includes('pâtissier')) return SECTOR_ULTIMATE_TEMPLATES.restaurant;

  for (const [key, template] of Object.entries(SECTOR_ULTIMATE_TEMPLATES)) {
    if (normalizedSector.includes(key)) return template;
  }

  return SECTOR_ULTIMATE_TEMPLATES.default;
}
