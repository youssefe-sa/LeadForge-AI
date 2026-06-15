// ── TEMPLATE ULTRA-PREMIUM 2026 - DESIGN SOPHISTIQUÉ ──
// Images multiples, logos automatiques, décorations avancées, animations complexes, sections riches

import { getSectorImages } from './pexelsImages';

interface UltraPremiumContent {
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
  services: Array<{ name: string; description: string; icon: string; features: string[]; image?: string }>;
  testimonials: Array<{ author: string; text: string; rating: number; date?: string; avatar?: string }>;
  portfolio: Array<{ title: string; description: string; image: string; category: string }>;
  team: Array<{ name: string; role: string; description: string; image?: string }>;
  certifications: Array<{ name: string; issuer: string; year: string }>;
  faq: Array<{ question: string; answer: string }>;
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  ctaText: string;
  slogan: string;
  heroImages: string[];
  allImages: string[];
  logo: { text: string; initials: string; icon: string };
}

// Palettes ultra-premium avec gradients complexes
const ULTRA_PREMIUM_PALETTES = {
  plomberie: {
    primary: '#0ea5e9',
    secondary: '#06b6d4',
    accent: '#38bdf8',
    accent2: '#7dd3fc',
    background: '#f0f9ff',
    surface: '#ffffff',
    surface2: '#e0f2fe',
    text: '#0f172a',
    textLight: '#475569',
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 50%, #38bdf8 100%)',
    gradient2: 'linear-gradient(45deg, #0ea5e9, #06b6d4, #38bdf8, #7dd3fc)',
    glass: 'rgba(255, 255, 255, 0.85)',
    glassDark: 'rgba(15, 23, 42, 0.9)',
    font: 'Inter',
    fontHeading: 'Playfair Display'
  },
  electricien: {
    primary: '#f59e0b',
    secondary: '#fbbf24',
    accent: '#fcd34d',
    accent2: '#fde68a',
    background: '#fffbeb',
    surface: '#ffffff',
    surface2: '#fef3c7',
    text: '#0f172a',
    textLight: '#475569',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #fcd34d 100%)',
    gradient2: 'linear-gradient(45deg, #f59e0b, #fbbf24, #fcd34d, #fde68a)',
    glass: 'rgba(255, 255, 255, 0.85)',
    glassDark: 'rgba(15, 23, 42, 0.9)',
    font: 'Inter',
    fontHeading: 'Playfair Display'
  },
  coiffeur: {
    primary: '#ec4899',
    secondary: '#f472b6',
    accent: '#f9a8d4',
    accent2: '#fbcfe8',
    background: '#fdf2f8',
    surface: '#ffffff',
    surface2: '#fce7f3',
    text: '#0f172a',
    textLight: '#475569',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #f472b6 50%, #f9a8d4 100%)',
    gradient2: 'linear-gradient(45deg, #ec4899, #f472b6, #f9a8d4, #fbcfe8)',
    glass: 'rgba(255, 255, 255, 0.85)',
    glassDark: 'rgba(15, 23, 42, 0.9)',
    font: 'Inter',
    fontHeading: 'Playfair Display'
  },
  restaurant: {
    primary: '#dc2626',
    secondary: '#ef4444',
    accent: '#f87171',
    accent2: '#fca5a5',
    background: '#fef2f2',
    surface: '#ffffff',
    surface2: '#fee2e2',
    text: '#0f172a',
    textLight: '#475569',
    gradient: 'linear-gradient(135deg, #dc2626 0%, #ef4444 50%, #f87171 100%)',
    gradient2: 'linear-gradient(45deg, #dc2626, #ef4444, #f87171, #fca5a5)',
    glass: 'rgba(255, 255, 255, 0.85)',
    glassDark: 'rgba(15, 23, 42, 0.9)',
    font: 'Inter',
    fontHeading: 'Playfair Display'
  },
  default: {
    primary: '#6366f1',
    secondary: '#8b5cf6',
    accent: '#a78bfa',
    accent2: '#c4b5fd',
    background: '#f5f3ff',
    surface: '#ffffff',
    surface2: '#ede9fe',
    text: '#0f172a',
    textLight: '#475569',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%)',
    gradient2: 'linear-gradient(45deg, #6366f1, #8b5cf6, #a78bfa, #c4b5fd)',
    glass: 'rgba(255, 255, 255, 0.85)',
    glassDark: 'rgba(15, 23, 42, 0.9)',
    font: 'Inter',
    fontHeading: 'Playfair Display'
  }
};

// Services ultra-détaillés avec images
const ULTRA_SERVICES = {
  plomberie: [
    { name: 'Dépannage Urgence 24/7', description: 'Intervention d\'urgence sur toutes fuites et pannes', icon: '⚡', features: ['Disponible 7j/7', 'Arrivée sous 45min', 'Sans surprise tarifaire', 'Garantie intervention'], image: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Installation Sanitaire Premium', description: 'Pose et remplacement d\'appareils haut de gamme', icon: '🚿', features: ['Robinetterie design', 'Éviers luxe', 'WC japonais', 'Douches spa'], image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Chauffage & Climatisation', description: 'Solutions thermiques modernes et écologiques', icon: '🌡️', features: ['Pompes à chaleur', 'Chaudières condensation', 'Clim réversible', 'Thermostats connectés'], image: 'https://images.pexels.com/photos/236603/pexels-photo-236603.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Détection de Fuites High-Tech', description: 'Localisation précise sans casse par caméra thermique', icon: '🔍', features: ['Caméra thermique', 'Gaz traceur', 'Acoustique', 'Rapport détaillé'], image: 'https://images.pexels.com/photos/5700164/pexels-photo-5700164.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Rénovation Salle de Bain', description: 'Création sur mesure avec design personnalisé', icon: '🛁', features: ['Design 3D', 'Marbre naturel', 'Éclairage LED', 'Accessoires luxe'], image: 'https://images.pexels.com/photos/262513/pexels-photo-262513.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Plomberie Écologique', description: 'Solutions durables et économies d\'eau', icon: '💧', features: ['Récupération eau', 'Filtration', 'Pompe chaleur', 'Certification RGE'], image: 'https://images.pexels.com/photos/5638732/pexels-photo-5638732.jpeg?auto=compress&cs=tinysrgb&w=800' }
  ],
  electricien: [
    { name: 'Installation Domotique Complète', description: 'Maison intelligente connectée et automatisée', icon: '🏠', features: ['Contrôle smartphone', 'Volets roulants', 'Éclairage automatique', 'Sécurité intégrée'], image: 'https://images.pexels.com/photos/355887/pexels-photo-355887.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Éclairage Design LED', description: 'Solutions lumineuses modernes et économiques', icon: '💡', features: ['Spots encastrés', 'Bande LED', 'Éclairage architectural', 'Scènes programmables'], image: 'https://images.pexels.com/photos/209241/pexels-photo-209241.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Bornes de Recharge Véhicule', description: 'Installation de bornes pour voitures électriques', icon: '🔋', features: ['Wallbox premium', 'Installation certifiée', 'Application mobile', 'Facturation intelligente'], image: 'https://images.pexels.com/photos/12634141/pexels-photo-12634141.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Mise aux Normes Sécurité', description: 'Conformité complète aux normes électriques', icon: '⚡', features: ['Norme NFC 15-100', 'Tableau différentiel', 'Prises spécialisées', 'Certification Consuel'], image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Panneaux Solaires', description: 'Installation photovoltaïque pour autoconsommation', icon: '☀️', features: ['Panneaux haute efficacité', 'Onduleurs hybrides', 'Monitoring en temps réel', 'Aides de l\'État'], image: 'https://images.pexels.com/photos/1198390/pexels-photo-1198390.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Réseau Ethernet Pro', description: 'Câblage réseau haut débit pour professionnels', icon: '🌐', features: ['Catégorie 6A', 'WiFi 6E', 'Serveur NAS', 'Sécurité réseau'], image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=800' }
  ],
  coiffeur: [
    { name: 'Visagisme Personnalisé', description: 'Analyse morphologique pour coupe parfaite', icon: '✂️', features: ['Analyse visage', 'Coupe adaptée', 'Conseil entretien', 'Produits sur mesure'], image: 'https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Coloration Artistique', description: 'Techniques avancées de coloration créative', icon: '🎨', features: ['Balayage soleil', 'Ombré hair', 'Coloration végétale', 'Mèches colorées'], image: 'https://images.pexels.com/photos/3998971/pexels-photo-3998971.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Soins Capillaires Luxe', description: 'Traitements profonds et régénérants', icon: '💆', features: ['Kératine brésilienne', 'Botox capillaire', 'Huiles précieuses', 'Massage crânien'], image: 'https://images.pexels.com/photos/3985210/pexels-photo-3985210.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Extensions Naturelles', description: 'Rajouts de longueur indétectables', icon: '💇', features: ['Pose à froid', 'Tape-in invisible', 'Cheveux naturels', 'Résultat parfait'], image: 'https://images.pexels.com/photos/3998752/pexels-photo-3998752.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Coiffure Événement', description: 'Créations sophistiquées pour occasions spéciales', icon: '👰', features: ['Chignons mariée', 'Sofreh aghd', 'Accessoires luxe', 'Maquillage combo'], image: 'https://images.pexels.com/photos/3998749/pexels-photo-3998749.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Barbier Premium', description: 'Rasage traditionnel et soins barbe haut de gamme', icon: '🪒', features: ['Rasage à l\'ancienne', 'Serviette chaude', 'Soins barbe luxe', 'Ambiance VIP'], image: 'https://images.pexels.com/photos/2373710/pexels-photo-2373710.jpeg?auto=compress&cs=tinysrgb&w=800' }
  ],
  restaurant: [
    { name: 'Cuisine Gastronomique', description: 'Plats d\'exception créés par notre chef étoilé', icon: '🍽️', features: ['Produits frais', 'Recettes créatives', 'Mise en plat artistique', 'Accord mets-vins'], image: 'https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Menu Dégustation', description: 'Expérience culinaire complète en plusieurs services', icon: '⭐', features: ['7 services', 'Vins inclus', 'Explication chef', 'Durée 3h'], image: 'https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Service Traiteur Premium', description: 'Restauration d\'excellence pour vos événements', icon: '🎉', features: ['Chef sur place', 'Vaisselle luxe', 'Personnalisation', 'Service complet'], image: 'https://images.pexels.com/photos/5638624/pexels-photo-5638624.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Cave à Vins', description: 'Sélection exceptionnelle de vins rares', icon: '🍷', features: ['Vins grands crus', 'Dégustation privée', 'Cave climatisée', 'Conseil sommelier'], image: 'https://images.pexels.com/photos/2513252/pexels-photo-2513252.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Brunch Gourmand', description: 'Brunch dominical avec produits du marché', icon: '🥗', features: ['Buffet chaud', 'Pâtisseries maison', 'Champagne inclus', 'Musique live'], image: 'https://images.pexels.com/photos/6424258/pexels-photo-6424258.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Cuisine Saisons', description: 'Menu qui change avec les saisons', icon: '🌸', features: ['Produits locaux', 'Saisonnalité', 'Partenaires producteurs', 'Durabilité'], image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800' }
  ],
  default: [
    { name: 'Consultation Expert', description: 'Analyse approfondie et recommandations personnalisées', icon: '📋', features: ['Diagnostic complet', 'Solutions sur mesure', 'Devis détaillé', 'Suivi dédié'], image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Intervention Premium', description: 'Service haut de gamme avec matériel professionnel', icon: '⚡', features: ['Matériel haut de gamme', 'Techniques avancées', 'Garantie résultat', 'SAV prioritaire'], image: 'https://images.pexels.com/photos/3184290/pexels-photo-3184290.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Accompagnement Complet', description: 'Support personnalisé de A à Z', icon: '💡', features: ['Conseil expert', 'Gestion projet', 'Coordination', 'Livraison clé en main'], image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Service Express', description: 'Intervention rapide sans compromis sur la qualité', icon: '🚀', features: ['Disponible 24/7', 'Intervention express', 'Tarification transparente', 'Satisfaction garantie'], image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Pack Premium', description: 'Solution tout-en-un avec avantages exclusifs', icon: '👑', features: ['Service VIP', 'Priorité absolue', 'Tarifs préférentiels', 'Conseiller dédié'], image: 'https://images.pexels.com/photos/3184391/pexels-photo-3184391.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: 'Maintenance Pro', description: 'Entretien régulier pour performance optimale', icon: '🔧', features: ['Contrat annuel', 'Visites programmées', 'Remplacement pièces', 'Support illimité'], image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800' }
  ]
};

// Portfolio par secteur
const ULTRA_PORTFOLIO = {
  plomberie: [
    { title: 'Rénovation Salle de Bain Haussmann', description: 'Transformation complète avec marbre italien et dorures', category: 'Rénovation', image: 'https://images.pexels.com/photos/262513/pexels-photo-262513.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { title: 'Installation Spa Privatif', description: 'Spa jacuzzi avec système de massage intégré', category: 'Installation', image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { title: 'Plomberie Écologique Villa', description: 'Système complet de récupération d\'eau de pluie', category: 'Écologie', image: 'https://images.pexels.com/photos/5638732/pexels-photo-5638732.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { title: 'Cuisine Design Premium', description: 'Ilot central avec évier design et robinetterie luxe', category: 'Design', image: 'https://images.pexels.com/photos/209241/pexels-photo-209241.jpeg?auto=compress&cs=tinysrgb&w=800' }
  ],
  electricien: [
    { title: 'Domotique Villa Moderne', description: 'Système complet de maison intelligente', category: 'Domotique', image: 'https://images.pexels.com/photos/355887/pexels-photo-355887.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { title: 'Éclairage Architectural', description: 'Mise en lumière spectaculaire de façade', category: 'Éclairage', image: 'https://images.pexels.com/photos/209241/pexels-photo-209241.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { title: 'Installation Solaire Complète', description: 'Centrale photovoltaïque 10kW avec stockage', category: 'Énergie', image: 'https://images.pexels.com/photos/1198390/pexels-photo-1198390.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { title: 'Réseau Data Center', description: 'Câblage fibre et cuivre haute densité', category: 'Professionnel', image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=800' }
  ],
  coiffeur: [
    { title: 'Transformation Complète', description: 'Changement de couleur et coupe radicale', category: 'Coloration', image: 'https://images.pexels.com/photos/3998971/pexels-photo-3998971.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { title: 'Extensions Longueur', description: 'Pose d'extensions naturelles 40cm', category: 'Extensions', image: 'https://images.pexels.com/photos/3998752/pexels-photo-3998752.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { title: 'Coiffure Mariage', description: 'Chignon sophistiqué avec accessoires', category: 'Événement', image: 'https://images.pexels.com/photos/3998749/pexels-photo-3998749.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { title: 'Soins Kératine', description: 'Traitement lissant et réparateur', category: 'Soins', image: 'https://images.pexels.com/photos/3985210/pexels-photo-3985210.jpeg?auto=compress&cs=tinysrgb&w=800' }
  ],
  restaurant: [
    { title: 'Menu Dégustation Chef', description: '7 services avec accord mets-vins', category: 'Gastronomie', image: 'https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { title: 'Traiteur Mariage 200', description: 'Service complet pour mariage de prestige', category: 'Traiteur', image: 'https://images.pexels.com/photos/5638624/pexels-photo-5638624.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { title: 'Cave à Vins Privée', description: 'Aménagement cave climatisée 500 bouteilles', category: 'Vins', image: 'https://images.pexels.com/photos/2513252/pexels-photo-2513252.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { title: 'Brunch Dominical', description: 'Formule brunch avec musique live', category: 'Brunch', image: 'https://images.pexels.com/photos/6424258/pexels-photo-6424258.jpeg?auto=compress&cs=tinysrgb&w=800' }
  ],
  default: [
    { title: 'Projet Résidentiel', description: 'Réalisation complète pour particulier', category: 'Résidentiel', image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { title: 'Projet Commercial', description: 'Installation pour entreprise', category: 'Commercial', image: 'https://images.pexels.com/photos/3184290/pexels-photo-3184290.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { title: 'Projet Industriel', description: 'Solution grande échelle', category: 'Industriel', image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { title: 'Projet Public', description: 'Installation pour secteur public', category: 'Public', image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800' }
  ]
};

// Équipe par secteur
const ULTRA_TEAM = {
  plomberie: [
    { name: 'Marc Dupont', role: 'Fondateur & Expert Plombier', description: '20 ans d\'expérience, certifié RGE', image: 'https://images.pexels.com/photos/5386754/pexels-photo-5386754.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Sophie Martin', role: 'Spécialiste Chauffage', description: 'Expert pompes à chaleur et chaudières', image: 'https://images.pexels.com/photos/5439367/pexels-photo-5439367.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Pierre Leroy', role: 'Technicien Sanitaire', description: 'Spécialiste installations haut de gamme', image: 'https://images.pexels.com/photos/5452296/pexels-photo-5452296.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Marie Dubois', role: 'Chef de Projet', description: 'Coordination et gestion des travaux', image: 'https://images.pexels.com/photos/5488676/pexels-photo-5488676.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ],
  electricien: [
    { name: 'Jean-Pierre Durand', role: 'Fondateur & Électricien', description: '25 ans d\'expérience, certifié Consuel', image: 'https://images.pexels.com/photos/5386754/pexels-photo-5386754.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Claire Bernard', role: 'Spécialiste Domotique', description: 'Expert maisons intelligentes', image: 'https://images.pexels.com/photos/5439367/pexels-photo-5439367.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Lucas Moreau', role: 'Technicien Photovoltaïque', description: 'Spécialiste énergies renouvelables', image: 'https://images.pexels.com/photos/5452296/pexels-photo-5452296.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Emma Petit', role: 'Ingénieure Réseau', description: 'Expert câblage et connectivité', image: 'https://images.pexels.com/photos/5488676/pexels-photo-5488676.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ],
  coiffeur: [
    { name: 'Isabelle Fontaine', role: 'Fondatrice & Styliste', description: '15 ans d\'expérience, formée à Paris', image: 'https://images.pexels.com/photos/3756678/pexels-photo-3756678.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Thomas Laurent', role: 'Coloriste Expert', description: 'Spécialiste techniques avancées', image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Camille Rousseau', role: 'Visagiste', description: 'Expert analyse morphologique', image: 'https://images.pexels.com/photos/3756680/pexels-photo-3756680.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Nicolas Blanc', role: 'Barbier Premium', description: 'Maître rasage traditionnel', image: 'https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ],
  restaurant: [
    { name: 'Antoine Beaumont', role: 'Chef Exécutif', description: '20 ans d\'expérience, étoilé Michelin', image: 'https://images.pexels.com/photos/5386754/pexels-photo-5386754.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Sophie Valois', role: 'Sommelier', description: 'Expert vins français et internationaux', image: 'https://images.pexels.com/photos/5439367/pexels-photo-5439367.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Lucas Garnier', role: 'Chef de Cuisine', description: 'Spécialiste cuisine de saison', image: 'https://images.pexels.com/photos/5452296/pexels-photo-5452296.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Marie Dubois', role: 'Maître d'Hôtel', description: 'Expert service et accueil', image: 'https://images.pexels.com/photos/5488676/pexels-photo-5488676.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ],
  default: [
    { name: 'Jean Dupont', role: 'Fondateur & Directeur', description: 'Expert du secteur depuis 20 ans', image: 'https://images.pexels.com/photos/5386754/pexels-photo-5386754.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Marie Martin', role: 'Responsable Qualité', description: 'Garante de l'excellence', image: 'https://images.pexels.com/photos/5439367/pexels-photo-5439367.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Pierre Leroy', role: 'Technicien Senior', description: 'Expert techniques avancées', image: 'https://images.pexels.com/photos/5452296/pexels-photo-5452296.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Sophie Bernard', role: 'Service Client', description: 'Votre contact privilégié', image: 'https://images.pexels.com/photos/5488676/pexels-photo-5488676.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ]
};

// Certifications par secteur
const ULTRA_CERTIFICATIONS = {
  plomberie: [
    { name: 'Certification RGE', issuer: 'ADEME', year: '2020' },
    { name: 'Qualibat RGE', issuer: 'Qualibat', year: '2019' },
    { name: 'Artisan Confirme', issuer: 'Chambre des Métiers', year: '2018' },
    { name: 'Garantie Décennale', issuer: 'Assurance Pro', year: '2015' }
  ],
  electricien: [
    { name: 'Certification Consuel', issuer: 'Consuel', year: '2021' },
    { name: 'Qualifelec', issuer: 'Qualifelec', year: '2019' },
    { name: 'IRVE Bornes', issuer: 'AFNOR', year: '2022' },
    { name: 'Domotique Expert', issuer: 'Smart Home Alliance', year: '2020' }
  ],
  coiffeur: [
    { name: 'Formation L\'Oréal', issuer: 'L\'Oréal Professionnel', year: '2021' },
    { name: 'Expert Coloration', issuer: 'Wella Professionals', year: '2020' },
    { name: 'Visagiste Certifié', issuer: 'Ecole de Coiffure Paris', year: '2019' },
    { name: 'Bio Éthique', issuer: 'Ecocert', year: '2022' }
  ],
  restaurant: [
    { name: 'Étoile Michelin', issuer: 'Guide Michelin', year: '2018' },
    { name: 'Gault & Millau', issuer: 'Gault & Millau', year: '2019' },
    { name: 'Maître Restaurateur', issuer: 'État Français', year: '2017' },
    { name: 'Vins Bio', issuer: 'Agriculture Biologique', year: '2020' }
  ],
  default: [
    { name: 'ISO 9001', issuer: 'ISO', year: '2021' },
    { name: 'Certification Qualité', issuer: 'AFNOR', year: '2020' },
    { name: 'Expert Reconnu', issuer: 'Fédération Professionnelle', year: '2019' },
    { name: 'Garantie Satisfaction', issuer: 'Service Client', year: '2018' }
  ]
};

// FAQ par secteur
const ULTRA_FAQ = {
  plomberie: [
    { question: 'Quels sont vos tarifs pour un dépannage ?', answer: 'Nos tarifs commencent à 89€ pour un dépannage simple. Le devis est gratuit et nous intervenons sous 45 minutes en urgence.' },
    { question: 'Êtes-vous disponible les week-ends ?', answer: 'Oui, nous sommes disponibles 7j/7, 24h/24 pour les urgences. Les interventions week-end sont facturées au même tarif.' },
    { question: 'Proposez-vous des devis gratuits ?', answer: 'Absolument ! Tous nos devis sont gratuits et sans engagement. Nous nous déplaçons pour évaluer vos besoins.' },
    { question: 'Quelles garanties offrez-vous ?', answer: 'Nous offrons une garantie décennale sur les installations et une garantie de 2 ans sur les pièces.' }
  ],
  electricien: [
    { question: 'Êtes-vous certifié pour les installations domestiques ?', answer: 'Oui, nous sommes certifiés Consuel et Qualifelec pour toutes les installations domestiques et professionnelles.' },
    { question: 'Installez-vous des panneaux solaires ?', answer: 'Oui, nous sommes spécialistes en photovoltaïque avec certification RGE pour les aides de l\'État.' },
    { question: 'Proposez-vous la domotique ?', answer: 'Oui, nous installons des systèmes domotiques complets : éclairage, volets, chauffage, sécurité, tout contrôlable depuis smartphone.' },
    { question: 'Quels sont vos délais d\'intervention ?', answer: 'En urgence, nous intervenons sous 1 heure. Pour les installations planifiées, nous nous adaptons à votre planning.' }
  ],
  coiffeur: [
    { question: 'Utilisez-vous des produits biologiques ?', answer: 'Oui, nous utilisons une gamme complète de produits biologiques et écologiques respectueux de vos cheveux.' },
    { question: 'Faites-vous les colorations végétales ?', answer: 'Absolument ! Nous sommes experts en colorations végétales sans ammoniaque ni oxydants.' },
    { question: 'Proposez-vous des essais avant transformation ?', answer: 'Oui, nous proposons des essais gratuits pour les colorations et coupes importantes.' },
    { question: 'Quels sont vos tarifs ?', answer: 'Nos tarifs varient selon le service. Une coupe complète commence à 45€, les colorations à partir de 80€.' }
  ],
  restaurant: [
    { question: 'Faut-il réserver ?', answer: 'Oui, la réservation est fortement recommandée, surtout le week-end. Vous pouvez réserver en ligne ou par téléphone.' },
    { question: 'Avez-vous des options végétariennes ?', answer: 'Oui, nous proposons des options végétariennes et véganes sur tous nos menus.' },
    { question: 'Proposez-vous des menus enfants ?', answer: 'Oui, nous avons un menu enfants à 15€ avec entrée, plat et dessert.' },
    { question: 'Acceptez-vous les groupes ?', answer: 'Oui, nous accueillons les groupes jusqu\'à 30 personnes. Au-delà, contactez-nous pour un espace privatif.' }
  ],
  default: [
    { question: 'Quels sont vos horaires d\'ouverture ?', answer: 'Nous sommes ouverts du lundi au samedi de 9h à 19h. Sur rendez-vous le dimanche.' },
    { question: 'Proposez-vous des devis gratuits ?', answer: 'Oui, tous nos devis sont gratuits et sans engagement. N\'hésitez pas à nous contacter.' },
    { question: 'Quelle est votre zone d\'intervention ?', answer: 'Nous intervenons dans toute la région et ses environs. Contactez-nous pour plus de précisions.' },
    { question: 'Acceptez-vous les paiements en plusieurs fois ?', answer: 'Oui, nous proposons des facilités de paiement. Demandez-nous en lors du devis.' }
  ]
};

function getUltraPalette(sector: string) {
  const normalizedSector = (sector || '').toLowerCase();
  
  if (normalizedSector.includes('plomb') || normalizedSector.includes('plomberie')) return ULTRA_PREMIUM_PALETTES.plomberie;
  if (normalizedSector.includes('électricien') || normalizedSector.includes('electric')) return ULTRA_PREMIUM_PALETTES.electricien;
  if (normalizedSector.includes('coiff') || normalizedSector.includes('barb')) return ULTRA_PREMIUM_PALETTES.coiffeur;
  if (normalizedSector.includes('restaurant') || normalizedSector.includes('cuisin')) return ULTRA_PREMIUM_PALETTES.restaurant;
  
  return ULTRA_PREMIUM_PALETTES.default;
}

function getUltraServices(sector: string) {
  const normalizedSector = (sector || '').toLowerCase();
  
  if (normalizedSector.includes('plomb') || normalizedSector.includes('plomberie')) return ULTRA_SERVICES.plomberie;
  if (normalizedSector.includes('électricien') || normalizedSector.includes('electric')) return ULTRA_SERVICES.electricien;
  if (normalizedSector.includes('coiff') || normalizedSector.includes('barb')) return ULTRA_SERVICES.coiffeur;
  if (normalizedSector.includes('restaurant') || normalizedSector.includes('cuisin')) return ULTRA_SERVICES.restaurant;
  
  return ULTRA_SERVICES.default;
}

function getUltraPortfolio(sector: string) {
  const normalizedSector = (sector || '').toLowerCase();
  
  if (normalizedSector.includes('plomb') || normalizedSector.includes('plomberie')) return ULTRA_PORTFOLIO.plomberie;
  if (normalizedSector.includes('électricien') || normalizedSector.includes('electric')) return ULTRA_PORTFOLIO.electricien;
  if (normalizedSector.includes('coiff') || normalizedSector.includes('barb')) return ULTRA_PORTFOLIO.coiffeur;
  if (normalizedSector.includes('restaurant') || normalizedSector.includes('cuisin')) return ULTRA_PORTFOLIO.restaurant;
  
  return ULTRA_PORTFOLIO.default;
}

function getUltraTeam(sector: string) {
  const normalizedSector = (sector || '').toLowerCase();
  
  if (normalizedSector.includes('plomb') || normalizedSector.includes('plomberie')) return ULTRA_TEAM.plomberie;
  if (normalizedSector.includes('électricien') || normalizedSector.includes('electric')) return ULTRA_TEAM.electricien;
  if (normalizedSector.includes('coiff') || normalizedSector.includes('barb')) return ULTRA_TEAM.coiffeur;
  if (normalizedSector.includes('restaurant') || normalizedSector.includes('cuisin')) return ULTRA_TEAM.restaurant;
  
  return ULTRA_TEAM.default;
}

function getUltraCertifications(sector: string) {
  const normalizedSector = (sector || '').toLowerCase();
  
  if (normalizedSector.includes('plomb') || normalizedSector.includes('plomberie')) return ULTRA_CERTIFICATIONS.plomberie;
  if (normalizedSector.includes('électricien') || normalizedSector.includes('electric')) return ULTRA_CERTIFICATIONS.electricien;
  if (normalizedSector.includes('coiff') || normalizedSector.includes('barb')) return ULTRA_CERTIFICATIONS.coiffeur;
  if (normalizedSector.includes('restaurant') || normalizedSector.includes('cuisin')) return ULTRA_CERTIFICATIONS.restaurant;
  
  return ULTRA_CERTIFICATIONS.default;
}

function getUltraFAQ(sector: string) {
  const normalizedSector = (sector || '').toLowerCase();
  
  if (normalizedSector.includes('plomb') || normalizedSector.includes('plomberie')) return ULTRA_FAQ.plomberie;
  if (normalizedSector.includes('électricien') || normalizedSector.includes('electric')) return ULTRA_FAQ.electricien;
  if (normalizedSector.includes('coiff') || normalizedSector.includes('barb')) return ULTRA_FAQ.coiffeur;
  if (normalizedSector.includes('restaurant') || normalizedSector.includes('cuisin')) return ULTRA_FAQ.restaurant;
  
  return ULTRA_FAQ.default;
}

function generateLogo(companyName: string, sector: string) {
  const words = companyName.split(' ').filter(w => w.length > 0);
  const initials = words.map(w => w[0]).join('').substring(0, 2).toUpperCase();
  
  const sectorIcons: Record<string, string> = {
    plomberie: '💧',
    electricien: '⚡',
    coiffeur: '✂️',
    restaurant: '🍽️'
  };
  
  const icon = sectorIcons[sector.toLowerCase()] || '⭐';
  
  return {
    text: companyName,
    initials,
    icon
  };
}

export async function generateUltraPremiumSite(lead: any): Promise<string> {
  const palette = getUltraPalette(lead.sector);
  const services = getUltraServices(lead.sector);
  const portfolio = getUltraPortfolio(lead.sector);
  const team = getUltraTeam(lead.sector);
  const certifications = getUltraCertifications(lead.sector);
  const faq = getUltraFAQ(lead.sector);
  
  // Images Pexels haute qualité multiples
  const sectorImages = getSectorImages(lead.sector);
  const heroImages = sectorImages.slice(0, 3);
  const allImages = sectorImages.length > 0 ? sectorImages : heroImages;
  
  // Logo automatique
  const logo = generateLogo(lead.name || 'Entreprise', lead.sector || 'default');
  
  // Contenu optimisé
  const companyName = lead.name || 'Entreprise';
  const city = lead.city || '';
  const sector = lead.sector || 'Professionnel';
  
  const content: UltraPremiumContent = {
    companyName,
    sector,
    city,
    description: lead.description || `Expert ${sector} de confiance${city ? ' à ' + city : ''}. Plus de 15 ans d'expérience dans le secteur avec une équipe de professionnels qualifiés.`,
    phone: lead.phone,
    email: lead.email,
    address: lead.address,
    website: lead.website,
    rating: lead.googleRating,
    reviews: lead.googleReviews,
    services,
    testimonials: lead.googleReviewsData && lead.googleReviewsData.length > 0 
      ? lead.googleReviewsData.slice(0, 4).map((r: any) => ({
          author: r.author || 'Client satisfait',
          text: r.text || 'Excellent service !',
          rating: r.rating || 5,
          date: r.date || 'Récemment'
        }))
      : [
          { author: 'Client Satisfait', text: 'Service exceptionnel du début à la fin. Professionnalisme et expertise remarquables.', rating: 5, date: 'Il y a 1 semaine' },
          { author: 'Client Ravi', text: 'Intervention rapide et efficace. Problème résolu avec des solutions durables.', rating: 5, date: 'Il y a 2 semaines' },
          { author: 'Client Fidèle', text: 'Qualité du travail irréprochable. Respect des délais et du budget.', rating: 5, date: 'Il y a 3 semaines' }
        ],
    portfolio,
    team,
    certifications,
    faq,
    heroTitle: companyName,
    heroSubtitle: lead.description || `L'excellence ${sector} à votre service${city ? ' à ' + city : ''}. Innovation, qualité et satisfaction garantie.`,
    aboutText: lead.description || `Forts de plus de 15 ans d'expérience dans le domaine ${sector}, notre équipe d'experts met tout en œuvre pour vous offrir des services d'exception. Nous combinons savoir-faire traditionnel et technologies modernes pour dépasser vos attentes.`,
    ctaText: 'Contactez-nous',
    slogan: `L'excellence ${sector} réinventée`,
    heroImages,
    allImages,
    logo
  };
  
  return buildUltraPremiumHTML(content, palette);
}

function buildUltraPremiumHTML(content: UltraPremiumContent, palette: any): string {
  const { companyName, heroTitle, heroSubtitle, aboutText, services, testimonials, portfolio, team, certifications, faq, phone, email, address, rating, reviews, logo } = content;
  
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${companyName} - ${content.sector}${content.city ? ' à ' + content.city : ''}</title>
    <meta name="description" content="${heroSubtitle}">
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=${palette.fontHeading === 'Playfair Display' ? 'Playfair+Display:wght@400;500;600;700;800;900&' : ''}${palette.font}:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    
    <!-- Font Awesome pour les icônes -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        :root {
            --primary: ${palette.primary};
            --secondary: ${palette.secondary};
            --accent: ${palette.accent};
            --accent2: ${palette.accent2};
            --background: ${palette.background};
            --surface: ${palette.surface};
            --surface2: ${palette.surface2};
            --text: ${palette.text};
            --text-light: ${palette.textLight};
            --gradient: ${palette.gradient};
            --gradient2: ${palette.gradient2};
            --glass: ${palette.glass};
            --glassDark: ${palette.glassDark};
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html {
            scroll-behavior: smooth;
        }
        
        body {
            font-family: '${palette.font}', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: var(--text);
            background: var(--background);
            overflow-x: hidden;
        }
        
        /* Animations globales */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(40px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeInLeft {
            from {
                opacity: 0;
                transform: translateX(-40px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes fadeInRight {
            from {
                opacity: 0;
                transform: translateX(40px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes scaleIn {
            from {
                opacity: 0;
                transform: scale(0.9);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.8; }
        }
        
        @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        /* Navigation Ultra-Premium */
        .navbar {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            background: var(--glass);
            backdrop-filter: blur(25px);
            -webkit-backdrop-filter: blur(25px);
            border-bottom: 1px solid rgba(0, 0, 0, 0.08);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .navbar.scrolled {
            background: rgba(255, 255, 255, 0.98);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
        }
        
        .nav-container {
            max-width: 1600px;
            margin: 0 auto;
            padding: 1.25rem 2.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo-container {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .logo-icon {
            width: 50px;
            height: 50px;
            background: var(--gradient);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
            animation: pulse 3s ease-in-out infinite;
        }
        
        .logo-text {
            font-family: '${palette.fontHeading}', serif;
            font-size: 1.8rem;
            font-weight: 800;
            background: var(--gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            letter-spacing: -0.03em;
        }
        
        .nav-links {
            display: flex;
            gap: 3rem;
            list-style: none;
        }
        
        .nav-link {
            color: var(--text);
            text-decoration: none;
            font-weight: 600;
            font-size: 0.95rem;
            position: relative;
            transition: all 0.3s ease;
            padding: 0.5rem 0;
        }
        
        .nav-link::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 3px;
            background: var(--gradient);
            border-radius: 2px;
            transition: width 0.3s ease;
        }
        
        .nav-link:hover {
            color: var(--primary);
        }
        
        .nav-link:hover::before {
            width: 100%;
        }
        
        .nav-cta {
            background: var(--gradient);
            background-size: 200% 200%;
            color: white;
            padding: 1rem 2.5rem;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 700;
            font-size: 0.95rem;
            transition: all 0.4s ease;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
            animation: gradientMove 3s ease infinite;
        }
        
        .nav-cta:hover {
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
        }
        
        /* Hero Section Ultra-Premium */
        .hero {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            background: linear-gradient(135deg, var(--background) 0%, var(--surface) 50%, var(--surface2) 100%);
            overflow: hidden;
            padding: 10rem 2rem 5rem;
        }
        
        .hero-bg {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            overflow: hidden;
        }
        
        .hero-bg::before {
            content: '';
            position: absolute;
            top: -30%;
            right: -10%;
            width: 900px;
            height: 900px;
            background: var(--gradient);
            border-radius: 50%;
            opacity: 0.12;
            filter: blur(120px);
            animation: float 25s ease-in-out infinite;
        }
        
        .hero-bg::after {
            content: '';
            position: absolute;
            bottom: -20%;
            left: -5%;
            width: 700px;
            height: 700px;
            background: var(--accent);
            border-radius: 50%;
            opacity: 0.08;
            filter: blur(100px);
            animation: float 20s ease-in-out infinite reverse;
        }
        
        .hero-pattern {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
                radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 80% 50%, rgba(236, 72, 153, 0.05) 0%, transparent 50%);
            pointer-events: none;
        }
        
        .hero-content {
            max-width: 1200px;
            text-align: center;
            position: relative;
            z-index: 1;
        }
        
        .hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: var(--glass);
            backdrop-filter: blur(15px);
            padding: 0.75rem 2rem;
            border-radius: 50px;
            font-size: 0.9rem;
            font-weight: 700;
            color: var(--primary);
            margin-bottom: 2.5rem;
            border: 2px solid rgba(0, 0, 0, 0.06);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
            animation: fadeInUp 0.8s ease;
        }
        
        .hero-badge i {
            font-size: 1.2rem;
        }
        
        .hero h1 {
            font-family: '${palette.fontHeading}', serif;
            font-size: clamp(3.5rem, 8vw, 6rem);
            font-weight: 900;
            line-height: 1.05;
            margin-bottom: 2rem;
            letter-spacing: -0.04em;
            background: var(--gradient2);
            background-size: 200% 200%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: gradientMove 5s ease infinite, fadeInUp 0.8s ease 0.2s both;
        }
        
        .hero p {
            font-size: 1.5rem;
            font-weight: 400;
            line-height: 1.8;
            margin-bottom: 3rem;
            color: var(--text-light);
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
            animation: fadeInUp 0.8s ease 0.4s both;
        }
        
        .hero-rating {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 3rem;
            animation: fadeInUp 0.8s ease 0.5s both;
        }
        
        .hero-rating .stars {
            color: #fbbf24;
            font-size: 1.5rem;
            letter-spacing: 0.1rem;
        }
        
        .hero-rating .rating-text {
            font-weight: 800;
            font-size: 1.3rem;
            color: var(--text);
        }
        
        .hero-rating .reviews {
            color: var(--text-light);
            font-size: 1rem;
            font-weight: 500;
        }
        
        .hero-cta-group {
            display: flex;
            gap: 1.5rem;
            justify-content: center;
            flex-wrap: wrap;
            animation: fadeInUp 0.8s ease 0.6s both;
        }
        
        .hero-cta {
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            background: var(--gradient);
            background-size: 200% 200%;
            color: white;
            padding: 1.5rem 3rem;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 700;
            font-size: 1.1rem;
            transition: all 0.4s ease;
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
            animation: gradientMove 3s ease infinite;
        }
        
        .hero-cta:hover {
            transform: translateY(-4px) scale(1.05);
            box-shadow: 0 16px 48px rgba(0, 0, 0, 0.3);
        }
        
        .hero-cta-secondary {
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            background: white;
            color: var(--primary);
            padding: 1.5rem 3rem;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 700;
            font-size: 1.1rem;
            border: 2px solid var(--primary);
            transition: all 0.4s ease;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }
        
        .hero-cta-secondary:hover {
            background: var(--primary);
            color: white;
            transform: translateY(-4px);
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
        }
        
        /* Services Section Ultra-Premium */
        .services {
            padding: 10rem 2rem;
            background: var(--surface);
            position: relative;
        }
        
        .section-header {
            text-align: center;
            max-width: 900px;
            margin: 0 auto 6rem;
        }
        
        .section-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: var(--background);
            color: var(--primary);
            padding: 0.6rem 1.5rem;
            border-radius: 50px;
            font-size: 0.85rem;
            font-weight: 700;
            margin-bottom: 2rem;
            border: 2px solid var(--primary);
        }
        
        .section-header h2 {
            font-family: '${palette.fontHeading}', serif;
            font-size: clamp(2.5rem, 5vw, 4rem);
            font-weight: 800;
            margin-bottom: 2rem;
            letter-spacing: -0.03em;
            color: var(--text);
        }
        
        .section-header p {
            font-size: 1.25rem;
            color: var(--text-light);
            line-height: 1.8;
        }
        
        .services-grid {
            max-width: 1600px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
            gap: 2.5rem;
        }
        
        .service-card {
            background: white;
            border: 1px solid rgba(0, 0, 0, 0.06);
            border-radius: 28px;
            overflow: hidden;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
        }
        
        .service-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 6px;
            background: var(--gradient);
            transform: scaleX(0);
            transition: transform 0.5s ease;
        }
        
        .service-card:hover {
            transform: translateY(-12px);
            box-shadow: 0 32px 64px rgba(0, 0, 0, 0.15);
            border-color: rgba(0, 0, 0, 0.1);
        }
        
        .service-card:hover::before {
            transform: scaleX(1);
        }
        
        .service-image {
            width: 100%;
            height: 250px;
            object-fit: cover;
            transition: transform 0.5s ease;
        }
        
        .service-card:hover .service-image {
            transform: scale(1.05);
        }
        
        .service-content {
            padding: 2.5rem;
        }
        
        .service-icon {
            width: 70px;
            height: 70px;
            background: var(--background);
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            margin-bottom: 1.5rem;
            transition: all 0.4s ease;
        }
        
        .service-card:hover .service-icon {
            background: var(--gradient);
            transform: scale(1.1) rotate(5deg);
        }
        
        .service-card h3 {
            font-size: 1.6rem;
            font-weight: 800;
            margin-bottom: 1rem;
            color: var(--text);
        }
        
        .service-card p {
            color: var(--text-light);
            line-height: 1.7;
            margin-bottom: 1.5rem;
            font-size: 1.05rem;
        }
        
        .service-features {
            display: flex;
            flex-wrap: wrap;
            gap: 0.75rem;
        }
        
        .service-feature {
            background: var(--background);
            padding: 0.5rem 1rem;
            border-radius: 12px;
            font-size: 0.85rem;
            font-weight: 600;
            color: var(--text);
            border: 1px solid rgba(0, 0, 0, 0.05);
        }
        
        /* Portfolio Section */
        .portfolio {
            padding: 10rem 2rem;
            background: var(--background);
        }
        
        .portfolio-grid {
            max-width: 1600px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 2rem;
        }
        
        .portfolio-item {
            position: relative;
            border-radius: 24px;
            overflow: hidden;
            aspect-ratio: 4/3;
            cursor: pointer;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .portfolio-item:hover {
            transform: scale(1.03);
            box-shadow: 0 24px 48px rgba(0, 0, 0, 0.2);
        }
        
        .portfolio-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
        }
        
        .portfolio-item:hover img {
            transform: scale(1.1);
        }
        
        .portfolio-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(transparent, rgba(0, 0, 0, 0.9));
            padding: 2rem;
            transform: translateY(100%);
            transition: transform 0.4s ease;
        }
        
        .portfolio-item:hover .portfolio-overlay {
            transform: translateY(0);
        }
        
        .portfolio-category {
            background: var(--gradient);
            color: white;
            padding: 0.4rem 1rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 700;
            display: inline-block;
            margin-bottom: 0.75rem;
        }
        
        .portfolio-item h3 {
            color: white;
            font-size: 1.4rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
        }
        
        .portfolio-item p {
            color: rgba(255, 255, 255, 0.8);
            font-size: 0.95rem;
        }
        
        /* Team Section */
        .team {
            padding: 10rem 2rem;
            background: var(--surface);
        }
        
        .team-grid {
            max-width: 1400px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2.5rem;
        }
        
        .team-card {
            background: white;
            border-radius: 28px;
            overflow: hidden;
            border: 1px solid rgba(0, 0, 0, 0.06);
            transition: all 0.4s ease;
        }
        
        .team-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 24px 48px rgba(0, 0, 0, 0.12);
        }
        
        .team-image {
            width: 100%;
            height: 300px;
            object-fit: cover;
        }
        
        .team-content {
            padding: 2rem;
            text-align: center;
        }
        
        .team-card h3 {
            font-size: 1.4rem;
            font-weight: 800;
            margin-bottom: 0.5rem;
            color: var(--text);
        }
        
        .team-role {
            color: var(--primary);
            font-weight: 600;
            margin-bottom: 1rem;
            font-size: 0.95rem;
        }
        
        .team-card p {
            color: var(--text-light);
            font-size: 0.95rem;
            line-height: 1.6;
        }
        
        /* Certifications Section */
        .certifications {
            padding: 8rem 2rem;
            background: var(--gradient);
            color: white;
        }
        
        .certifications-grid {
            max-width: 1400px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
        }
        
        .cert-card {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(15px);
            padding: 2.5rem;
            border-radius: 24px;
            text-align: center;
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: all 0.4s ease;
        }
        
        .cert-card:hover {
            background: rgba(255, 255, 255, 0.25);
            transform: translateY(-5px);
        }
        
        .cert-icon {
            font-size: 3rem;
            margin-bottom: 1.5rem;
        }
        
        .cert-card h3 {
            font-size: 1.3rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
        }
        
        .cert-card p {
            opacity: 0.8;
            font-size: 0.9rem;
            margin-bottom: 0.25rem;
        }
        
        /* FAQ Section */
        .faq {
            padding: 10rem 2rem;
            background: var(--background);
        }
        
        .faq-grid {
            max-width: 1000px;
            margin: 0 auto;
        }
        
        .faq-item {
            background: white;
            border-radius: 20px;
            margin-bottom: 1.5rem;
            border: 1px solid rgba(0, 0, 0, 0.06);
            overflow: hidden;
            transition: all 0.3s ease;
        }
        
        .faq-item:hover {
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        }
        
        .faq-question {
            padding: 2rem;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: 700;
            font-size: 1.1rem;
            color: var(--text);
        }
        
        .faq-question i {
            transition: transform 0.3s ease;
        }
        
        .faq-item.active .faq-question i {
            transform: rotate(180deg);
        }
        
        .faq-answer {
            padding: 0 2rem 2rem;
            color: var(--text-light);
            line-height: 1.7;
            display: none;
        }
        
        .faq-item.active .faq-answer {
            display: block;
            animation: fadeInUp 0.3s ease;
        }
        
        /* Testimonials Section */
        .testimonials {
            padding: 10rem 2rem;
            background: var(--surface);
        }
        
        .testimonials-grid {
            max-width: 1400px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
        }
        
        .testimonial-card {
            background: var(--background);
            padding: 3rem;
            border-radius: 28px;
            border: 1px solid rgba(0, 0, 0, 0.06);
            transition: all 0.4s ease;
        }
        
        .testimonial-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        .testimonial-stars {
            color: #fbbf24;
            font-size: 1.4rem;
            margin-bottom: 1.5rem;
            letter-spacing: 0.1rem;
        }
        
        .testimonial-text {
            font-size: 1.1rem;
            line-height: 1.8;
            color: var(--text);
            margin-bottom: 2rem;
            font-style: italic;
            font-weight: 500;
        }
        
        .testimonial-author {
            display: flex;
            align-items: center;
            gap: 1.25rem;
        }
        
        .author-avatar {
            width: 60px;
            height: 60px;
            background: var(--gradient);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 800;
            font-size: 1.5rem;
        }
        
        .author-info h4 {
            font-weight: 700;
            color: var(--text);
            margin-bottom: 0.25rem;
            font-size: 1.1rem;
        }
        
        .author-info span {
            font-size: 0.9rem;
            color: var(--text-light);
            font-weight: 500;
        }
        
        /* Contact Section */
        .contact {
            padding: 10rem 2rem;
            background: var(--gradient);
            color: white;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .contact::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -20%;
            width: 800px;
            height: 800px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            filter: blur(100px);
        }
        
        .contact-content {
            max-width: 1000px;
            margin: 0 auto;
            position: relative;
            z-index: 1;
        }
        
        .contact h2 {
            font-family: '${palette.fontHeading}', serif;
            font-size: clamp(2.5rem, 5vw, 4rem);
            font-weight: 800;
            margin-bottom: 2rem;
            letter-spacing: -0.03em;
        }
        
        .contact p {
            font-size: 1.4rem;
            opacity: 0.95;
            margin-bottom: 4rem;
            line-height: 1.7;
        }
        
        .contact-info {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
            margin-bottom: 4rem;
        }
        
        .contact-item {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(20px);
            padding: 2.5rem;
            border-radius: 24px;
            border: 1px solid rgba(255, 255, 255, 0.25);
            transition: all 0.4s ease;
        }
        
        .contact-item:hover {
            background: rgba(255, 255, 255, 0.25);
            transform: translateY(-6px);
        }
        
        .contact-item-icon {
            font-size: 2.5rem;
            margin-bottom: 1.5rem;
        }
        
        .contact-item h3 {
            font-weight: 700;
            margin-bottom: 1rem;
            font-size: 1.2rem;
        }
        
        .contact-item a {
            color: white;
            text-decoration: none;
            font-size: 1.15rem;
            transition: opacity 0.3s ease;
            font-weight: 500;
        }
        
        .contact-item a:hover {
            opacity: 0.8;
        }
        
        .contact-cta {
            display: inline-block;
            background: white;
            color: var(--primary);
            padding: 1.75rem 4rem;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 800;
            font-size: 1.2rem;
            transition: all 0.4s ease;
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
        }
        
        .contact-cta:hover {
            transform: translateY(-4px) scale(1.05);
            box-shadow: 0 16px 48px rgba(0, 0, 0, 0.35);
        }
        
        /* Footer Ultra-Premium */
        .footer {
            background: var(--text);
            color: white;
            padding: 5rem 2rem 2rem;
        }
        
        .footer-content {
            max-width: 1600px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 4rem;
            margin-bottom: 4rem;
        }
        
        .footer-section h3 {
            font-family: '${palette.fontHeading}', serif;
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 2rem;
        }
        
        .footer-section p {
            opacity: 0.8;
            line-height: 1.8;
            margin-bottom: 1.25rem;
            font-size: 1rem;
        }
        
        .footer-section a {
            color: white;
            text-decoration: none;
            opacity: 0.7;
            transition: all 0.3s ease;
            display: block;
            margin-bottom: 1rem;
            font-size: 1rem;
        }
        
        .footer-section a:hover {
            opacity: 1;
            transform: translateX(5px);
        }
        
        .footer-social {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
        }
        
        .footer-social a {
            width: 45px;
            height: 45px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            transition: all 0.3s ease;
        }
        
        .footer-social a:hover {
            background: var(--gradient);
            transform: translateY(-3px);
        }
        
        .footer-bottom {
            max-width: 1600px;
            margin: 0 auto;
            padding-top: 3rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            text-align: center;
            opacity: 0.6;
            font-size: 0.9rem;
        }
        
        /* Mobile Menu */
        .mobile-menu-toggle {
            display: none;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0.75rem;
            flex-direction: column;
            gap: 6px;
        }
        
        .mobile-menu-toggle span {
            display: block;
            width: 28px;
            height: 3px;
            background: var(--text);
            border-radius: 2px;
            transition: all 0.3s ease;
        }
        
        /* Responsive */
        @media (max-width: 1200px) {
            .services-grid {
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            }
            
            .portfolio-grid {
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            }
        }
        
        @media (max-width: 768px) {
            .nav-links, .nav-cta {
                display: none;
            }
            
            .mobile-menu-toggle {
                display: flex;
            }
            
            .nav-links.active {
                display: flex;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                flex-direction: column;
                padding: 2.5rem;
                gap: 1.5rem;
                border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
            }
            
            .hero {
                padding: 8rem 1.5rem 4rem;
            }
            
            .hero h1 {
                font-size: clamp(2.5rem, 10vw, 4rem);
            }
            
            .hero-cta-group {
                flex-direction: column;
                align-items: center;
            }
            
            .services, .portfolio, .team, .certifications, .faq, .testimonials, .contact {
                padding: 6rem 1.5rem;
            }
            
            .services-grid, .portfolio-grid, .team-grid, .certifications-grid, .testimonials-grid {
                grid-template-columns: 1fr;
            }
            
            .contact-info {
                grid-template-columns: 1fr;
            }
            
            .footer-content {
                grid-template-columns: 1fr;
                gap: 3rem;
            }
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar" id="navbar">
        <div class="nav-container">
            <div class="logo-container">
                <div class="logo-icon">${logo.icon}</div>
                <div class="logo-text">${logo.text}</div>
            </div>
            <button class="mobile-menu-toggle" onclick="toggleMobileMenu()">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <ul class="nav-links" id="navLinks">
                <li><a href="#home" class="nav-link">Accueil</a></li>
                <li><a href="#services" class="nav-link">Services</a></li>
                <li><a href="#portfolio" class="nav-link">Portfolio</a></li>
                <li><a href="#team" class="nav-link">Équipe</a></li>
                <li><a href="#testimonials" class="nav-link">Avis</a></li>
                <li><a href="#faq" class="nav-link">FAQ</a></li>
                <li><a href="#contact" class="nav-link">Contact</a></li>
            </ul>
            <a href="#contact" class="nav-cta">Contactez-nous</a>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero" id="home">
        <div class="hero-bg"></div>
        <div class="hero-pattern"></div>
        <div class="hero-content">
            <div class="hero-badge">
                <i class="fas fa-star"></i>
                ${content.slogan}
            </div>
            <h1>${heroTitle}</h1>
            <p>${heroSubtitle}</p>
            ${rating && rating > 0 ? `
            <div class="hero-rating">
                <span class="stars">${'★'.repeat(Math.floor(rating))}</span>
                <span class="rating-text">${rating}/5</span>
                <span class="reviews">(${reviews || 0} avis clients)</span>
            </div>
            ` : ''}
            <div class="hero-cta-group">
                <a href="#contact" class="hero-cta">
                    ${content.ctaText}
                    <i class="fas fa-arrow-right"></i>
                </a>
                <a href="#portfolio" class="hero-cta-secondary">
                    <i class="fas fa-images"></i>
                    Voir nos réalisations
                </a>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section class="services" id="services">
        <div class="section-header">
            <div class="section-badge">
                <i class="fas fa-cogs"></i>
                Nos Services Premium
            </div>
            <h2>Des solutions d'exception</h2>
            <p>Nous proposons une gamme complète de services haut de gamme adaptés à vos besoins les plus exigeants</p>
        </div>
        <div class="services-grid">
            ${services.map(service => `
            <div class="service-card">
                <img src="${service.image || 'https://images.pexels.com/photos/3184290/pexels-photo-3184290.jpeg?auto=compress&cs=tinysrgb&w=800'}" alt="${service.name}" class="service-image">
                <div class="service-content">
                    <div class="service-icon">${service.icon}</div>
                    <h3>${service.name}</h3>
                    <p>${service.description}</p>
                    <div class="service-features">
                        ${service.features.map(feature => `<span class="service-feature">${feature}</span>`).join('')}
                    </div>
                </div>
            </div>
            `).join('')}
        </div>
    </section>

    <!-- Portfolio Section -->
    <section class="portfolio" id="portfolio">
        <div class="section-header">
            <div class="section-badge">
                <i class="fas fa-briefcase"></i>
                Portfolio
            </div>
            <h2>Nos réalisations</h2>
            <p>Découvrez nos projets les plus remarquables et laissez-vous inspirer</p>
        </div>
        <div class="portfolio-grid">
            ${portfolio.map(item => `
            <div class="portfolio-item">
                <img src="${item.image}" alt="${item.title}">
                <div class="portfolio-overlay">
                    <span class="portfolio-category">${item.category}</span>
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            </div>
            `).join('')}
        </div>
    </section>

    <!-- Team Section -->
    <section class="team" id="team">
        <div class="section-header">
            <div class="section-badge">
                <i class="fas fa-users"></i>
                Notre Équipe
            </div>
            <h2>Des experts passionnés</h2>
            <p>Rencontrez les talents qui font notre excellence</p>
        </div>
        <div class="team-grid">
            ${team.map(member => `
            <div class="team-card">
                <img src="${member.image || 'https://images.pexels.com/photos/5386754/pexels-photo-5386754.jpeg?auto=compress&cs=tinysrgb&w=400'}" alt="${member.name}" class="team-image">
                <div class="team-content">
                    <h3>${member.name}</h3>
                    <div class="team-role">${member.role}</div>
                    <p>${member.description}</p>
                </div>
            </div>
            `).join('')}
        </div>
    </section>

    <!-- Certifications Section -->
    <section class="certifications" id="certifications">
        <div class="section-header">
            <div class="section-badge" style="background: rgba(255,255,255,0.2); border-color: rgba(255,255,255,0.4); color: white;">
                <i class="fas fa-award"></i>
                Certifications
            </div>
            <h2 style="color: white;">Nos garanties de qualité</h2>
            <p style="color: rgba(255,255,255,0.9);">Des certifications reconnues pour votre tranquillité d'esprit</p>
        </div>
        <div class="certifications-grid">
            ${certifications.map(cert => `
            <div class="cert-card">
                <div class="cert-icon"><i class="fas fa-certificate"></i></div>
                <h3>${cert.name}</h3>
                <p>${cert.issuer}</p>
                <p>${cert.year}</p>
            </div>
            `).join('')}
        </div>
    </section>

    <!-- FAQ Section -->
    <section class="faq" id="faq">
        <div class="section-header">
            <div class="section-badge">
                <i class="fas fa-question-circle"></i>
                FAQ
            </div>
            <h2>Questions fréquentes</h2>
            <p>Tout ce vous devez savoir sur nos services</p>
        </div>
        <div class="faq-grid">
            ${faq.map((item, index) => `
            <div class="faq-item" onclick="toggleFaq(this)">
                <div class="faq-question">
                    ${item.question}
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="faq-answer">${item.answer}</div>
            </div>
            `).join('')}
        </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials" id="testimonials">
        <div class="section-header">
            <div class="section-badge">
                <i class="fas fa-quote-left"></i>
                Témoignages
            </div>
            <h2>Ce que disent nos clients</h2>
            <p>L'excellence de nos services à travers les yeux de ceux qui nous font confiance</p>
        </div>
        <div class="testimonials-grid">
            ${testimonials.map(testimonial => `
            <div class="testimonial-card">
                <div class="testimonial-stars">${'★'.repeat(testimonial.rating)}</div>
                <p class="testimonial-text">"${testimonial.text}"</p>
                <div class="testimonial-author">
                    <div class="author-avatar">${testimonial.author.charAt(0).toUpperCase()}</div>
                    <div class="author-info">
                        <h4>${testimonial.author}</h4>
                        <span>${testimonial.date || 'Client satisfait'}</span>
                    </div>
                </div>
            </div>
            `).join('')}
        </div>
    </section>

    <!-- Contact Section -->
    <section class="contact" id="contact">
        <div class="contact-content">
            <h2>Contactez-nous</h2>
            <p>Une question ? Un projet ? Notre équipe est à votre écoute pour vous accompagner dans vos démarches</p>
            <div class="contact-info">
                ${phone ? `
                <div class="contact-item">
                    <div class="contact-item-icon"><i class="fas fa-phone-alt"></i></div>
                    <h3>Téléphone</h3>
                    <a href="tel:${phone}">${phone}</a>
                </div>
                ` : ''}
                ${email ? `
                <div class="contact-item">
                    <div class="contact-item-icon"><i class="fas fa-envelope"></i></div>
                    <h3>Email</h3>
                    <a href="mailto:${email}">${email}</a>
                </div>
                ` : ''}
                ${address ? `
                <div class="contact-item">
                    <div class="contact-item-icon"><i class="fas fa-map-marker-alt"></i></div>
                    <h3>Adresse</h3>
                    <p>${address}</p>
                </div>
                ` : ''}
            </div>
            ${phone ? `<a href="tel:${phone}" class="contact-cta">Appeler maintenant <i class="fas fa-phone-alt"></i></a>` : ''}
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-section">
                <h3>${logo.text}</h3>
                <p>${content.sector} d'excellence${content.city ? ' à ' + content.city : ''}. Innovation, qualité et satisfaction garantie depuis plus de 15 ans.</p>
                <div class="footer-social">
                    <a href="#"><i class="fab fa-facebook-f"></i></a>
                    <a href="#"><i class="fab fa-instagram"></i></a>
                    <a href="#"><i class="fab fa-linkedin-in"></i></a>
                    <a href="#"><i class="fab fa-twitter"></i></a>
                </div>
            </div>
            <div class="footer-section">
                <h3>Services</h3>
                ${services.slice(0, 5).map(service => `<a href="#services">${service.name}</a>`).join('')}
            </div>
            <div class="footer-section">
                <h3>Navigation</h3>
                <a href="#home">Accueil</a>
                <a href="#services">Services</a>
                <a href="#portfolio">Portfolio</a>
                <a href="#team">Équipe</a>
                <a href="#contact">Contact</a>
            </div>
            <div class="footer-section">
                <h3>Contact</h3>
                ${phone ? `<a href="tel:${phone}">${phone}</a>` : ''}
                ${email ? `<a href="mailto:${email}">${email}</a>` : ''}
                ${address ? `<p>${address}</p>` : ''}
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2024 ${logo.text}. Tous droits réservés. Design Ultra-Premium 2026.</p>
        </div>
    </footer>

    <script>
        // Mobile menu toggle
        function toggleMobileMenu() {
            const navLinks = document.getElementById('navLinks');
            navLinks.classList.toggle('active');
        }

        // FAQ toggle
        function toggleFaq(element) {
            element.classList.toggle('active');
        }

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                document.getElementById('navLinks').classList.remove('active');
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.pageYOffset > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Intersection Observer pour animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.addEventListener('DOMContentLoaded', function() {
            document.querySelectorAll('.service-card, .portfolio-item, .team-card, .cert-card, .faq-item, .testimonial-card, .contact-item').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(40px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });
        });

        // Parallax effect sur hero
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero-bg');
            if (hero) {
                hero.style.transform = 'translateY(' + scrolled * 0.3 + 'px)';
            }
        });
    </script>
</body>
</html>`;
}
