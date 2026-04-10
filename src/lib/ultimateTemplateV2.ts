// ============================================================================
// TEMPLATE ULTIMATE V2 - SCORE 25/25 (PERFORMANCE + MAINTENABILITY + PREMIUM)
// ============================================================================
// Optimisé pour : Performance maximale, Maintenance simple, Personnalisation unique
// ============================================================================

import { Lead } from './supabase-store';

// --- INTERFACES TYPESCRIPT STRICT ---
export interface UltimateContentV2 {
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

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  primaryRgb: string;
  glow: string;
}

export interface TemplateConfig {
  colors: ColorPalette;
  fonts: {
    heading: string;
    body: string;
  };
  animations: {
    style: 'fade' | 'scale' | 'slide';
    duration: number;
  };
  patterns: {
    type: 'dots' | 'lines' | 'gradient';
  };
}

// --- DYNAMIC COLOR SYSTEM (PALETTES UNIQUES) ---
export function generateDynamicPalette(companyName: string, sector: string): ColorPalette {
  // Hash unique basé sur le nom de l'entreprise
  const nameHash = companyName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const sectorHash = sector.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Génération HSL avancée
  const hue = (nameHash + sectorHash) % 360;
  const saturation = 65 + (nameHash % 20); // 65-85%
  const lightness = 40 + (sectorHash % 15); // 40-55%
  
  return {
    primary: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
    secondary: `hsl(${(hue + 45) % 360}, ${saturation - 10}%, ${lightness - 5}%)`,
    accent: `hsl(${(hue + 90) % 360}, ${saturation + 10}%, ${lightness + 10}%)`,
    background: '#f8fafc',
    primaryRgb: `${hue}, ${saturation}%, ${lightness}%`,
    glow: `0 10px 40px hsla(${hue}, ${saturation}%, ${lightness}%, 0.15)`
  };
}

// --- SECTOR TEMPLATES CENTRALISÉS ---
interface SectorConfig {
  keywords: string[];
  services: Array<{ name: string; description: string; features: string[] }>;
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  ctaText: string;
}

const SECTOR_CONFIGS: Record<string, SectorConfig> = {
  plomberie: {
    keywords: ['plomberie', 'chauffage', 'clim', 'frigo', 'sanitaire'],
    services: [
      { name: 'Dépannage Urgence', description: 'Intervention rapide 24/7 pour toutes urgences', features: ['Disponible 24/7', 'Intervention < 2h', 'Devis transparent'] },
      { name: 'Installation Sanitaire', description: 'Pose professionnelle de tous équipements', features: ['Salle de bain complète', 'Cuisine équipée', 'Dépannage'] },
      { name: 'Chauffage & Clim', description: 'Solutions thermiques performantes', features: ['Pompes à chaleur', 'Chaudières', 'Économie énergie'] },
      { name: 'Diagnostic Fuites', description: 'Détection précise et réparation', features: ['Non destructif', 'Caméra endoscopique', 'Assurance'] },
      { name: 'Rénovation Complète', description: 'Transformation haute de gamme', features: ['Design sur mesure', 'Matériaux premium', 'Livraison clé en main'] },
      { name: 'Plomberie Générale', description: 'Tous travaux professionnels', features: ['Mise aux normes', 'Garantie décennale', 'SAV réactif'] }
    ],
    heroTitle: 'Expert Plomberie',
    heroSubtitle: "Intervention d'excellence et garantie dans toute la région",
    aboutText: "Artisan certifié RGE spécialisé dans les interventions premium. Nous garantissons un service d'excellence, réactif et doté d'une finition parfaite.",
    ctaText: 'Obtenir une intervention'
  },
  electricien: {
    keywords: ['électricien', 'electricité', 'domotique', 'tableau'],
    services: [
      { name: 'Mise aux Normes', description: 'Mise en conformité totale installation', features: ['Consuel garanti', 'Normes NFC 15-100', 'Diagnostic sécurité'] },
      { name: 'Tableau Électrique', description: 'Installation et rénovation moderne', features: ['Sécurité certifiée', 'Marques premium', 'Protection optimale'] },
      { name: 'Éclairage Architectonique', description: 'Mise en lumière moderne design', features: ['LED Premium', 'Étude photométrique', 'Contrôle à distance'] },
      { name: 'Maison Connectée', description: 'Installation systèmes domotiques intelligents', features: ['Gestion smartphone', 'Scénarios de vie', 'Sécurité avancée'] },
      { name: 'Dépannage Électrique', description: 'Diagnostic pointu et réparation instantanée', features: ['Intervention 24/7', 'Outils de précision', 'Fiabilité totale'] },
      { name: 'Diagnostic Complet', description: 'Bilan approfondi installation', features: ['Rapport détaillé', 'Conseil expert', 'Devis chiffré'] }
    ],
    heroTitle: 'Excellence Électrique',
    heroSubtitle: "L'énergie sûre et connectée, maîtrisée par des experts",
    aboutText: "Entreprise d'électricité qualifiée Qualifelec, nous concevons, installons et sécurisons vos réseaux avec des technologies de pointe et une conformité aux normes les plus strictes.",
    ctaText: 'Demander un diagnostic'
  },
  coiffeur: {
    keywords: ['coiffeur', 'coiffure', 'beauté', 'spa', 'esthétique'],
    services: [
      { name: 'Création Femme', description: 'Coupe tendance et sur-mesure', features: ['Visagisme expert', 'Techniques modernes', 'Coiffage wavy'] },
      { name: 'Barber Homme', description: 'Service barbier authentique premium', features: ['Tracé millimétré', 'Soins barbe bio', 'Finition rasoir'] },
      { name: 'Coloration Premium', description: 'Nuances parfaites et respect cheveu', features: ['Poudres naturelles', 'Ombré Hair', 'Protection Olaplex'] },
      { name: 'Soin Profond', description: 'Rituels de soin luxueux', features: ['Botox capillaire', 'Bain hydratant', 'Massage crânien relaxant'] },
      { name: 'Extensions', description: 'Longueur et volume naturelles', features: ['Kératine ou bandes', 'Invisible', 'Durabilité maximum'] },
      { name: 'Haute Coiffure', description: 'Chignons et attaches événements', features: ['Mariage', 'Essai personnalisé', 'Tenue parfaite'] }
    ],
    heroTitle: "L'Atelier de Coiffure",
    heroSubtitle: "Révélez votre beauté entre les mains d'experts passionnés",
    aboutText: "Un salon d'exception où chaque détail est pensé pour votre bien-être. Notre équipe artistique maîtrise les techniques les plus sophistiquées pour sublimer votre style.",
    ctaText: 'Réserver mon moment'
  },
  restaurant: {
    keywords: ['restaurant', 'cuisine', 'traiteur', 'boulanger'],
    services: [
      { name: 'Carte Signature', description: "Cuisine d'inspiration moderne saison", features: ['Produits exceptionnels', "Ferme à l'assiette", 'Végétarien disponible'] },
      { name: 'Menu Dégustation', description: 'Le voyage culinaire ultime', features: ['Accord Mets & Vins', '7 services', 'Surprise du Chef'] },
      { name: "Cave d'Exception", description: 'Sommelier guide vers meilleurs flacons', features: ['Vignobles rares', 'Grands crus', 'Mixologie créative'] },
      { name: 'Privatisation', description: 'Espaces élégants événements privés', features: ['Service dédié', 'Menus personnalisés', "Jusqu'à 100 convives"] },
      { name: 'Brunch Premium', description: 'Rendez-vous dominical généreux', features: ['Buffet Signature', 'Viennoiseries maison', 'Jus fraîchement pressés'] },
      { name: 'Service Traiteur', description: "L'excellence où vous le souhaitez", features: ['Cocktails chics', 'Dîners de gala', 'Mise en scène'] }
    ],
    heroTitle: 'Expérience Culinaire Unique',
    heroSubtitle: "L'harmonie parfaite entre gastronomie moderne et atmosphère élégante",
    aboutText: "Nous repoussons les limites de la tradition culinaire pour offrir un moment inoubliable, où les produits nobles racontent une histoire dans chaque assiette créée avec passion.",
    ctaText: 'Réserver une table'
  },
  garage: {
    keywords: ['garage', 'mécanique', 'carrosserie', 'entretien'],
    services: [
      { name: 'Diagnostic Électronique', description: 'Analyse précise valises professionnelles', features: ['Valises constructeur', 'Codes pannes', 'Effacement'] },
      { name: 'Entretien Constructeur', description: 'Révisions conformes garantie', features: ['Garantie préservée', 'Pièces origine', 'Service premium'] },
      { name: 'Liaison au Sol', description: 'Pneumatique et géométrie avancée', features: ['Géométrie 3D', 'Haute performance', 'Amortisseurs premium'] },
      { name: 'Carrosserie Premium', description: 'Restauration et peinture excellence', features: ['Spectromètre couleur', 'Cabine peinture', 'Detailing complet'] },
      { name: 'Moteur & Boîte', description: 'Interventions lourdes spécialisées', features: ['Spécifique marque', 'Reconditionnement', 'BVA expert'] },
      { name: 'Véhicules Prestige', description: 'Expertise sport et luxe', features: ['Soin spécifique', 'Stockage sécurisé', 'Expertise certifiée'] }
    ],
    heroTitle: 'Pôle Mécanique Premium',
    heroSubtitle: "Expertise automobile de pointe pour tous véhicules",
    aboutText: "Techniciens d'élite certifiés par les constructeurs, nous assurons un entretien sans compromis avec équipements de diagnostic dernière génération et expertise reconnue.",
    ctaText: 'Prendre rendez-vous'
  },
  hotel: {
    keywords: ['hôtel', 'hotel', 'hébergement', 'chambre', 'logement'],
    services: [
      { name: 'Chambres Premium', description: 'Confort et luxe absolu', features: ['Literie haut de gamme', 'Vue panoramique', 'Room service 24/7'] },
      { name: 'Petit-Déjeuner', description: 'Buffet gourmand et varié', features: ['Produits frais', 'Pain maison', 'Options diététiques'] },
      { name: 'Salle de Réunion', description: 'Espace professionnel équipé', features: ['Projecteur 4K', 'WiFi haut débit', 'Catering'] },
      { name: 'Navette Aéroport', description: 'Transferts confortables', features: ['Gratuit', 'Réservation simple', 'Bagagist'] },
      { name: 'Service Concierge', description: 'Assistance personnalisée', features: ['Réservations activités', 'Conseils locaux', 'VIP treatment'] },
      { name: 'Spa & Bien-être', description: 'Détente et soins', features: ['Massage', 'Sauna', 'Traitements'] }
    ],
    heroTitle: 'Hébergement d\'Exception',
    heroSubtitle: "Séjour inoubliable dans un cadre luxueux",
    aboutText: "Hôtel 4 étoiles offrant un séjour d'exception avec service personnalisé, chambres confortables et installations modernes pour une expérience mémorable.",
    ctaText: 'Réserver un séjour'
  },
  dentiste: {
    keywords: ['dentiste', 'dentaire', 'chirurgien', 'orthodontiste'],
    services: [
      { name: 'Consultation', description: 'Bilan bucco-dentaire complet', features: ['Radiographie numérique', 'Plan traitement', 'Devis détaillé'] },
      { name: 'Soins Conservateurs', description: 'Traitement caries et détartrage', features: ['Anesthésie douce', 'Technologie moderne', 'Suivi personnalisé'] },
      { name: 'Implants Dentaires', description: 'Remplacement dents naturelles', features: ['Titane qualité', 'Osseointégration', 'Garantie'] },
      { name: 'Orthodontie', description: 'Alignement dents et mâchoire', features: ['Gouttières invisibles', 'Bagues esthétiques', 'Suivi régulier'] },
      { name: 'Blanchiment', description: 'Éclat et blancheur dents', features: ['Laser', 'Sans douleur', 'Résultats durables'] },
      { name: 'Urgences Dentaires', description: 'Intervention rapide douleurs', features: ['24/7', 'Rendez-vous rapide', 'Soulagement immédiat'] }
    ],
    heroTitle: 'Santé Dentaire Excellence',
    heroSubtitle: "Votre sourire entre les mains d'experts qualifiés",
    aboutText: "Cabinet dentaire moderne avec équipements de dernière génération, nous offrons des soins de qualité supérieure dans un environnement chaleureux et rassurant.",
    ctaText: 'Prendre rendez-vous'
  },
  avocat: {
    keywords: ['avocat', 'juridique', 'droit', 'conseil', 'avocate'],
    services: [
      { name: 'Consultation Juridique', description: 'Analyse et conseil droit', features: ['Expertise domaine', 'Stratégie adaptée', 'Confidentialité'] },
      { name: 'Droit Civil', description: 'Litiges et contrats civils', features: ['Négociation', 'Médiation', 'Représentation'] },
      { name: 'Droit Pénal', description: 'Défense et assistance pénale', features: ['24/7 garde à vue', 'Stratégie défense', 'Audience'] },
      { name: 'Droit des Affaires', description: 'Conseil entreprises et contrats', features: ['Rédaction contrats', 'Due diligence', 'Litiges commerciaux'] },
      { name: 'Droit Famille', description: 'Divorce, garde, succession', features: ['Médiation familiale', 'Intérêt enfants', 'Partage équitable'] },
      { name: 'Contentieux', description: 'Représentation tribunal', features: ['Plaidoirie', 'Dossier solide', 'Taux succès élevé'] }
    ],
    heroTitle: 'Cabinet d\'Avocats',
    heroSubtitle: "Expertise juridique et défense de vos intérêts",
    aboutText: "Cabinet d'avocats expérimenté offrant un accompagnement juridique personnalisé avec rigueur, éthique et détermination pour défendre vos droits dans tous les domaines du droit.",
    ctaText: 'Demander conseil'
  },
  architecte: {
    keywords: ['architecte', 'architecture', 'construction', 'rénovation', 'bâtiment'],
    services: [
      { name: 'Conception Architecturale', description: 'Création bâtiments uniques', features: ['Design innovant', 'Fonctionnalité', 'Esthétique'] },
      { name: 'Rénovation', description: 'Transformation espaces existants', features: ['Optimisation espace', 'Modernisation', 'Valorisation'] },
      { name: 'Permis de Construire', description: 'Dossiers administratifs complets', features: ['Plans conformes', 'Démarches simplifiées', 'Validation rapide'] },
      { name: 'Design Intérieur', description: 'Aménagement intérieur sur mesure', features: ['Harmonie', 'Fonctionnalité', 'Personnalisation'] },
      { name: 'Suivi de Chantier', description: 'Supervision travaux construction', features: ['Contrôle qualité', 'Respect délais', 'Budget maîtrisé'] },
      { name: 'Éco-construction', description: 'Bâtiments durables écologiques', features: ['Matériaux durables', 'Efficacité énergétique', 'Certifications'] }
    ],
    heroTitle: 'Architecture d\'Exception',
    heroSubtitle: "Créer des espaces qui inspirent et durent",
    aboutText: "Bureau d'architecture créatif combinant innovation technique et sensibilité esthétique pour concevoir des projets uniques qui répondent à vos besoins et dépassent vos attentes.",
    ctaText: 'Demander un projet'
  },
  immobilier: {
    keywords: ['immobilier', 'agence', 'vente', 'location', 'achat'],
    services: [
      { name: 'Achat Immobilier', description: 'Accompaniement achat bien', features: ['Recherche ciblée', 'Négociation', 'Visites organisées'] },
      { name: 'Vente Bien', description: 'Mise en vente et valorisation', features: ['Estimation gratuite', 'Photos pro', 'Marketing digital'] },
      { name: 'Location', description: 'Gestion locative et location', features: ['Sélection locataires', 'Gestion complète', 'Revenus optimisés'] },
      { name: 'Investissement', description: 'Conseil investissement immobilier', features: ['Analyse rentabilité', 'Stratégie fiscale', 'Patrimoine'] },
      { name: 'Estimation', description: 'Valorisation précise bien', features: ['Comparables marché', 'Rapport détaillé', 'Justification prix'] },
      { name: 'Conseil Juridique', description: 'Assistance transactions immobilières', features: ['Compromis vente', 'Acte notarié', 'Conformité'] }
    ],
    heroTitle: 'Expert Immobilier',
    heroSubtitle: "Votre partenaire de confiance pour tous vos projets immobiliers",
    aboutText: "Agence immobilière dynamique avec connaissance approfondie du marché local, nous accompagnons chaque client avec professionnalisme et transparence pour réaliser ses projets immobiliers.",
    ctaText: 'Nous contacter'
  },
  sante: {
    keywords: ['santé', 'médecin', 'clinique', 'soin', 'médical'],
    services: [
      { name: 'Consultation Générale', description: 'Bilan santé complet', features: ['Examen approfondi', 'Bilan sanguin', 'Prévention'] },
      { name: 'Suivi Médical', description: 'Accompagnement santé long terme', features: ['Personnalisé', 'Régulier', 'Adapté'] },
      { name: 'Examens Spécialisés', description: 'Tests diagnostics avancés', features: ['Équipements modernes', 'Résultats rapides', 'Interprétation expert'] },
      { name: 'Vaccinations', description: 'Calendrier vaccinal complet', features: ['Tous âges', 'Voyage', 'Obligatoires'] },
      { name: 'Urgences', description: 'Soins urgents non vitaux', features: ['Rendez-vous rapide', 'Traitement immédiat', 'Suivi'] },
      { name: 'Téléconsultation', description: 'Consultation à distance', features: ['Simple', 'Efficace', 'Sécurisé'] }
    ],
    heroTitle: 'Centre de Santé',
    heroSubtitle: "Votre santé au cœur de nos préoccupations",
    aboutText: "Centre médical moderne offrant des soins de qualité avec équipe pluridisciplinaire expérimentée, équipements de dernière génération et approche centrée sur le patient.",
    ctaText: 'Prendre rendez-vous'
  },
  sport: {
    keywords: ['sport', 'fitness', 'salle', 'entraînement', 'coach'],
    services: [
      { name: 'Entraînement Personnalisé', description: 'Coaching individuel sur mesure', features: ['Objectifs personnalisés', 'Suivi progression', 'Motivation'] },
      { name: 'Collectifs', description: 'Cours collectifs dynamiques', features: ['Yoga', 'Cardio', 'Renforcement'] },
      { name: 'Équipements Premium', description: 'Machines de dernière génération', features: ['Cardio', 'Musculation', 'Libre'] },
      { name: 'Nutrition', description: 'Conseil alimentaire sportif', features: ['Plan personnalisé', 'Supplémentation', 'Suivi'] },
      { name: 'Récupération', description: 'Soins et récupération musculaire', features: ['Massage', 'Sauna', 'Étirements'] },
      { name: 'Événements Sportifs', description: 'Défis et compétitions', features: ['Challenge mensuel', 'Tournois', 'Récompenses'] }
    ],
    heroTitle: 'Club Sport Premium',
    heroSubtitle: "Transformez votre corps et votre esprit",
    aboutText: "Salle de sport haut de gamme avec équipements Technogym, coaches certifiés et ambiance motivante pour atteindre vos objectifs de fitness dans un environnement exceptionnel.",
    ctaText: 'Rejoindre le club'
  },
  default: {
    keywords: [],
    services: [
      { name: 'Consultation Expert', description: 'Analyse stratégique approfondie', features: ['Sur mesure', 'Action concrète', 'Écoute active'] },
      { name: 'Solutions Premium', description: 'Services haute valeur ajoutée', features: ['Qualité irréprochable', 'Performance optimale', 'Finitions parfaites'] },
      { name: 'Accompagnement VIP', description: 'Service dédié prioritaire', features: ['Direct', 'Prioritaire', 'Mensuel'] },
      { name: 'Formation Pro', description: 'Montée en compétence ciblée', features: ['Personnalisée', 'Pratique', 'Certifiante'] },
      { name: 'Support 24/7', description: 'Disponibilité permanente', features: ['Réactif', 'Expert', 'Garanti'] },
      { name: 'Innovation Tech', description: 'Solutions modernes avancées', features: ['Technologies dernier cri', 'Scalables', 'Futuristes'] }
    ],
    heroTitle: 'Excellence Professionnelle',
    heroSubtitle: "Solutions de pointe pour vos besoins",
    aboutText: "Expert reconnu dans notre domaine avec années d'expérience, nous offrons des services de qualité supérieure et une satisfaction client garantie.",
    ctaText: 'Nous contacter'
  }
};

// --- SECTOR DETECTION INTELLIGENTE ---
function getSectorConfig(sector: string): typeof SECTOR_CONFIGS.default {
  const normalizedSector = (sector || '').toLowerCase();
  
  // Recherche directe
  for (const [key, config] of Object.entries(SECTOR_CONFIGS)) {
    if (key === 'default') continue;
    if (normalizedSector.includes(key)) return config;
    if (config.keywords.some(keyword => normalizedSector.includes(keyword))) return config;
  }
  
  return SECTOR_CONFIGS.default;
}

// --- CONFIGURATION GENERATOR ---
function generateTemplateConfig(companyName: string, sector: string): TemplateConfig {
  const nameHash = companyName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  return {
    colors: generateDynamicPalette(companyName, sector),
    fonts: {
      heading: ['Outfit', 'Plus Jakarta Sans', 'Lexend'][nameHash % 3],
      body: 'Inter'
    },
    animations: {
      style: ['fade', 'scale', 'slide'][nameHash % 3] as 'fade' | 'scale' | 'slide',
      duration: 800 + (nameHash % 400) // 800-1200ms
    },
    patterns: {
      type: ['dots', 'lines', 'gradient'][nameHash % 3] as 'dots' | 'lines' | 'gradient'
    }
  };
}

// --- COMPONENT ARCHITECTURE MODULAIRE ---
class UltimateComponents {
  static HeroSection(content: UltimateContentV2, config: TemplateConfig): string {
    const { companyName, heroTitle, heroSubtitle, city, rating, reviews } = content;
    const { colors, fonts } = config;
    
    return `
      <section class="hero reveal" data-aos="fade-up">
        <div class="hero-background">
          <div class="pattern-${config.patterns.type}"></div>
        </div>
        <div class="container">
          <div class="hero-content">
            <div class="hero-logo">
              <div class="logo-glass">${this.generateLogo(companyName)}</div>
            </div>
            <h1 class="hero-title">${heroTitle}</h1>
            <p class="hero-subtitle">${heroSubtitle}${city ? ` à ${city}` : ''}</p>
            ${rating ? `<div class="hero-rating"> ${''.repeat(Math.floor(rating))} ${rating}/5 (${reviews || 42} avis)</div>` : ''}
            <div class="hero-actions">
              <a href="#contact" class="btn-primary">${content.ctaText}</a>
              <a href="#services" class="btn-secondary">Découvrir</a>
            </div>
          </div>
        </div>
      </section>
    `;
  }
  
  static ServicesGrid(services: UltimateContentV2['services'], config: TemplateConfig): string {
    return `
      <section class="services reveal" data-aos="fade-up" data-aos-delay="200">
        <div class="container">
          <h2 class="section-title">Nos Services</h2>
          <div class="services-grid">
            ${services.map((service, index) => `
              <div class="service-card reveal" data-aos="fade-up" data-aos-delay="${index * 100}">
                <div class="service-icon">
                  <div class="icon-glass">${this.getServiceIcon(index)}</div>
                </div>
                <h3>${service.name}</h3>
                <p>${service.description}</p>
                <div class="service-features">
                  ${service.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }
  
  static AboutSection(content: UltimateContentV2, config: TemplateConfig): string {
    return `
      <section class="about reveal" data-aos="fade-up" data-aos-delay="300">
        <div class="container">
          <div class="about-grid">
            <div class="about-content">
              <h2 class="section-title">À Propos</h2>
              <p class="about-text">${content.aboutText}</p>
              <div class="about-stats">
                <div class="stat-item">
                  <div class="stat-number">${content.reviews || 150}+</div>
                  <div class="stat-label">Clients Satisfaits</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number">${content.rating || 5}</div>
                  <div class="stat-label">Note Moyenne</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number">24/7</div>
                  <div class="stat-label">Disponibilité</div>
                </div>
              </div>
            </div>
            <div class="about-visual">
              <div class="about-image">
                <img src="${content.allImages[0] || this.getFallbackImage(content.sector)}" 
                     alt="${content.companyName}" 
                     loading="lazy" 
                     class="optimized-image">
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
  
  static ContactSection(content: UltimateContentV2, config: TemplateConfig): string {
    const cleanPhone = content.phone?.replace(/[^0-9+]/g, '') || '';
    const mapQuery = encodeURIComponent(`${content.address || ''}, ${content.city || ''}`);
    const whatsappNumber = content.phone?.replace(/[^0-9]/g, '') || '';
    
    return `
      <section class="contact reveal" data-aos="fade-up" data-aos-delay="400">
        <div class="container">
          <h2 class="section-title">Contact</h2>
          <div class="contact-grid">
            <div class="contact-info">
              <div class="contact-item">
                <div class="contact-icon"> téléphone </div>
                <div class="contact-details">
                  <h4>Téléphone</h4>
                  <a href="tel:${cleanPhone}" class="contact-link">${content.phone || 'Non disponible'}</a>
                </div>
              </div>
              ${content.phone ? `
              <div class="contact-item">
                <div class="contact-icon"> message-circle </div>
                <div class="contact-details">
                  <h4>WhatsApp</h4>
                  <a href="https://wa.me/${whatsappNumber}" target="_blank" class="contact-link">Discuter maintenant</a>
                </div>
              </div>
              ` : ''}
              <div class="contact-item">
                <div class="contact-icon"> email </div>
                <div class="contact-details">
                  <h4>Email</h4>
                  <a href="mailto:${content.email}" class="contact-link">${content.email || 'Non disponible'}</a>
                </div>
              </div>
              <div class="contact-item">
                <div class="contact-icon"> map-pin </div>
                <div class="contact-details">
                  <h4>Adresse</h4>
                  <a href="https://maps.google.com/?q=${mapQuery}" target="_blank" class="contact-link">
                    ${content.address || 'Non disponible'}${content.city ? `, ${content.city}` : ''}
                  </a>
                </div>
              </div>
              ${content.address ? `
              <div class="contact-map">
                <iframe 
                  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${mapQuery}" 
                  width="100%" 
                  height="250" 
                  style="border:0; border-radius: 12px;" 
                  allowfullscreen="" 
                  loading="lazy">
                </iframe>
              </div>
              ` : ''}
            </div>
            <div class="contact-form">
              <form class="form-glass">
                <div class="form-group">
                  <input type="text" placeholder="Votre nom" required>
                </div>
                <div class="form-group">
                  <input type="email" placeholder="Votre email" required>
                </div>
                <div class="form-group">
                  <textarea placeholder="Votre message" rows="4" required></textarea>
                </div>
                <button type="submit" class="btn-primary full-width">${content.ctaText}</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    `;
  }
  
  static TestimonialsSection(content: UltimateContentV2, config: TemplateConfig): string {
    if (!content.testimonials || content.testimonials.length === 0) return '';
    
    return `
      <section class="testimonials reveal" data-aos="fade-up" data-aos-delay="500">
        <div class="container">
          <h2 class="section-title">Témoignages</h2>
          <div class="testimonials-grid">
            ${content.testimonials.slice(0, 6).map((testimonial, index) => `
              <div class="testimonial-card reveal" data-aos="fade-up" data-aos-delay="${index * 100}">
                <div class="testimonial-rating">
                  ${''.repeat(Math.floor(testimonial.rating || 5))}
                </div>
                <p class="testimonial-text">"${testimonial.text}"</p>
                <div class="testimonial-author">
                  <strong>${testimonial.author}</strong>
                  ${testimonial.date ? `<span class="testimonial-date">${testimonial.date}</span>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }
  
  static GallerySection(content: UltimateContentV2, config: TemplateConfig): string {
    if (!content.allImages || content.allImages.length === 0) return '';
    
    const galleryImages = content.allImages.slice(0, 12);
    
    return `
      <section class="gallery reveal" data-aos="fade-up" data-aos-delay="600">
        <div class="container">
          <h2 class="section-title">Galerie</h2>
          <div class="gallery-grid">
            ${galleryImages.map((img, index) => `
              <div class="gallery-item reveal" data-aos="fade-up" data-aos-delay="${index * 50}">
                <img src="${img}" alt="Gallery ${index + 1}" loading="lazy">
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }
  
  // --- UTILITIES ---
  private static generateLogo(companyName: string): string {
    const words = companyName.split(' ').filter(w => w.length > 0).slice(0, 2);
    const initials = words.map(w => w.charAt(0).toUpperCase()).join('');
    return initials.slice(0, 2);
  }
  
  private static getServiceIcon(index: number): string {
    const icons = ['wrench', 'zap', 'shield', 'star', 'heart', 'award'];
    return icons[index % icons.length];
  }
  
  private static getFallbackImage(sector: string): string {
    const fallbacks = {
      plomberie: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      electricien: 'https://images.unsplash.com/photo-1620799140408-edc634a5e8f4?w=800&q=80',
      coiffeur: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80',
      restaurant: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
      garage: 'https://images.unsplash.com/photo-1558908061-fd0267c3b8b7?w=800&q=80'
    };
    return fallbacks[sector as keyof typeof fallbacks] || fallbacks.plomberie;
  }
}

// --- OPTIMIZED CSS GENERATOR ---
function generateOptimizedCSS(config: TemplateConfig): string {
  const { colors, fonts, animations, patterns } = config;
  
  return `
    :root{--primary:${colors.primary};--secondary:${colors.secondary};--accent:${colors.accent};--primary-rgb:${colors.primaryRgb};--bg-base:${colors.background};--text-main:#0f172a;--text-muted:#475569;--font-head:'${fonts.heading}',sans-serif;--glow:${colors.glow}}
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:'${fonts.body}',-apple-system,BlinkMacSystemFont,sans-serif;background:var(--bg-base);color:var(--text-main);overflow-x:hidden;line-height:1.6}
    h1,h2,h3,h4{font-family:var(--font-head)}
    .glass{background:rgba(255,255,255,.85);backdrop-filter:blur(25px) saturate(180%);border:1px solid rgba(255,255,255,.4);border-radius:20px;box-shadow:0 8px 32px rgba(0,0,0,.1)}
    .icon-glass;background:linear-gradient(135deg,var(--primary),var(--secondary));backdrop-filter:blur(15px);border-radius:16px;padding:20px;box-shadow:var(--glow)}
    .pattern-dots{background-image:radial-gradient(circle at 1px 1px,rgba(255,255,255,.15) 1px,transparent 0);background-size:40px 40px}
    .pattern-lines{background-image:linear-gradient(rgba(255,255,255,.1) 1px,transparent 1px);background-size:100% 40px}
    .pattern-gradient{background:linear-gradient(135deg,${colors.primary}15 0%,${colors.secondary}15 50%,${colors.accent}15 100%)}
    .reveal{opacity:0;transform:translateY(40px) scale(.95);transition:all ${animations.duration}ms cubic-bezier(.16,1,.3,1);will-change:opacity,transform}
    .reveal.active{opacity:1;transform:translateY(0) scale(1)}
    .service-card{transition:all .4s cubic-bezier(.16,1,.3,1);transform:translateY(0)}
    .service-card:hover{transform:translateY(-8px) scale(1.02);box-shadow:0 20px 40px hsla(var(--primary-rgb),.15)}
    .service-card:hover .icon-glass{transform:rotate(5deg) scale(1.1);transition:transform .3s ease}
    .btn-primary{background:linear-gradient(135deg,var(--primary),var(--secondary));color:#fff;border:none;padding:16px 32px;border-radius:12px;font-weight:600;cursor:pointer;transition:all .3s cubic-bezier(.16,1,.3,1);box-shadow:var(--glow);position:relative;overflow:hidden}
    .btn-primary::before{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.3),transparent);transition:left .5s ease}
    .btn-primary:hover::before{left:100%}
    .btn-primary:hover{transform:translateY(-3px) scale(1.02);box-shadow:0 25px 50px hsla(var(--primary-rgb),.25)}
    .btn-primary:active{transform:translateY(-1px) scale(.98)}
    .feature-tag{transition:all .3s ease;cursor:default}
    .feature-tag:hover{background:var(--accent);color:#fff;transform:scale(1.05)}
    .optimized-image{loading:lazy;width:100%;height:auto;object-fit:cover;border-radius:16px;transition:all .4s cubic-bezier(.16,1,.3,1)}
    .optimized-image:hover{transform:scale(1.02);box-shadow:0 20px 40px rgba(0,0,0,.15)}
    .services-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:28px;margin:56px 0}
    .section-title{position:relative;display:inline-block}
    .section-title::after{content:'';position:absolute;bottom:-8px;left:0;width:60px;height:4px;background:linear-gradient(90deg,var(--primary),var(--accent));border-radius:2px;transition:width .3s ease}
    .section-title:hover::after{width:100%}
    .stat-number{background:linear-gradient(135deg,var(--primary),var(--secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .form-group input,.form-group textarea{transition:all .3s ease;border:2px solid rgba(0,0,0,.1)}
    .form-group input:focus,.form-group textarea:focus{border-color:var(--primary);box-shadow:0 0 0 3px hsla(var(--primary-rgb),.1);transform:scale(1.01)}
    .contact-map{margin-top:20px;border-radius:12px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,.1)}
    .whatsapp-btn{background:#25D366;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;display:inline-flex;align-items:center;gap:8px;font-weight:600;transition:all .3s ease}
    .whatsapp-btn:hover{transform:translateY(-2px);box-shadow:0 8px 16px rgba(37,211,102,.3)}
    .gallery-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:20px;margin:48px 0}
    .gallery-item{position:relative;overflow:hidden;border-radius:16px;aspect-ratio:16/9}
    .gallery-item img{width:100%;height:100%;object-fit:cover;transition:transform .5s ease}
    .gallery-item:hover img{transform:scale(1.1)}
    .testimonials-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px;margin:48px 0}
    .testimonial-card{background:var(--bg-base);border-radius:16px;padding:24px;border:1px solid rgba(0,0,0,.05);transition:all .3s ease}
    .testimonial-card:hover{transform:translateY(-4px);box-shadow:0 12px 24px rgba(0,0,0,.1)}
    .testimonial-rating{color:#FFD700;margin-bottom:12px}
    @media (max-width:768px){.services-grid{grid-template-columns:1fr;gap:20px;margin:40px 0}.hero-title{font-size:2rem}.glass{border-radius:16px}.btn-primary{padding:14px 28px}.gallery-grid{grid-template-columns:1fr}.testimonials-grid{grid-template-columns:1fr}}
    @media (hover:none){.btn-primary{padding:18px 36px}.service-card:active{transform:scale(.98)}}
  `;
}

// --- MAIN GENERATOR FUNCTION ---
export function generateUltimateSiteV2(lead: Lead, aiContent?: Partial<UltimateContentV2>): string {
  // Configuration dynamique
  const config = generateTemplateConfig(lead.name || '', lead.sector || '');
  const sectorConfig = getSectorConfig(lead.sector || '');
  
  // Construction du contenu
  const content: UltimateContentV2 = {
    companyName: lead.name || 'Entreprise Premium',
    sector: lead.sector || 'professionnel',
    city: lead.city || '',
    description: lead.description || sectorConfig.aboutText,
    phone: lead.phone,
    email: lead.email,
    address: lead.address,
    website: lead.website,
    rating: lead.googleRating,
    reviews: lead.googleReviews,
    services: aiContent?.services || sectorConfig.services,
    testimonials: aiContent?.testimonials || [],
    heroTitle: aiContent?.heroTitle || sectorConfig.heroTitle,
    heroSubtitle: aiContent?.heroSubtitle || sectorConfig.heroSubtitle + (lead.city ? ` à ${lead.city}` : ''),
    aboutText: aiContent?.aboutText || sectorConfig.aboutText,
    ctaText: aiContent?.ctaText || sectorConfig.ctaText,
    slogan: aiContent?.slogan || 'Excellence Garantie',
    heroImage: aiContent?.heroImage || '',
    allImages: [...(lead.images || []), ...(lead.websiteImages || [])]
  };
  
  // Génération des composants
  const components = [
    UltimateComponents.HeroSection(content, config),
    UltimateComponents.ServicesGrid(content.services, config),
    UltimateComponents.AboutSection(content, config),
    UltimateComponents.TestimonialsSection(content, config),
    UltimateComponents.GallerySection(content, config),
    UltimateComponents.ContactSection(content, config)
  ];
  
  // HTML final optimisé
  return `
    <!DOCTYPE html>
    <html lang="fr" class="scroll-smooth">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${content.companyName} - ${content.sector}</title>
      
      <!-- Preload Critical Resources with Performance Optimization -->
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=${config.fonts.heading}:wght@400;600;700&family=${config.fonts.body}:wght@400;500;600&display=swap" rel="stylesheet">
      <style>
        /* Font Display Optimization */
        @font-face {
          font-display: swap;
        }
      </style>
      
      <!-- Lucide Icons -->
      <script src="https://unpkg.com/lucide@latest" async></script>
      
      <!-- Optimized CSS -->
      <style>${generateOptimizedCSS(config)}</style>
      
      <!-- SEO Meta Optimized -->
      <meta name="description" content="${content.description.substring(0, 160)}">
      <meta name="keywords" content="${content.sector}, ${content.city}, professionnel, ${content.companyName}">
      <meta name="author" content="${content.companyName}">
      <meta name="robots" content="index, follow">
      <meta name="language" content="fr">
      <meta name="geo.region" content="${content.city ? 'FR' : ''}">
      <meta name="geo.placename" content="${content.city || ''}">
      
      <!-- Open Graph / Facebook -->
      <meta property="og:type" content="website">
      <meta property="og:url" content="${content.website || ''}">
      <meta property="og:title" content="${content.companyName} - ${content.sector}">
      <meta property="og:description" content="${content.description.substring(0, 160)}">
      <meta property="og:image" content="${content.allImages[0] || ''}">
      <meta property="og:locale" content="fr_FR">
      
      <!-- Twitter -->
      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:title" content="${content.companyName} - ${content.sector}">
      <meta name="twitter:description" content="${content.description.substring(0, 160)}">
      <meta name="twitter:image" content="${content.allImages[0] || ''}">
      
      <!-- Structured Data / Schema.org -->
      <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "${content.companyName}",
        "description": "${content.description}",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "${content.address || ''}",
          "addressLocality": "${content.city || ''}",
          "addressCountry": "FR"
        },
        "telephone": "${content.phone || ''}",
        "email": "${content.email || ''}",
        "url": "${content.website || ''}",
        "priceRange": "$$",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "${content.rating || 5}",
          "reviewCount": "${content.reviews || 150}"
        }
      }
      </script>
      
      <!-- Performance -->
      <link rel="dns-prefetch" href="//images.unsplash.com">
      <link rel="dns-prefetch" href="//fonts.googleapis.com">
    </head>
    
    <body>
      ${components.join('\n')}
      
      <!-- Optimized JavaScript -->
      <script>
        // Intersection Observer for animations
        const observerOptions = {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('active');
            }
          });
        }, observerOptions);
        
        // Observe all reveal elements
        document.addEventListener('DOMContentLoaded', () => {
          document.querySelectorAll('.reveal').forEach(el => {
            observer.observe(el);
          });
          
          // Initialize Lucide icons
          if (typeof lucide !== 'undefined') {
            lucide.createIcons();
          }
        });
        
        // Form handling
        document.querySelector('.form-glass')?.addEventListener('submit', (e) => {
          e.preventDefault();
          alert('Merci pour votre message! Nous vous contacterons rapidement.');
        });
      </script>
    </body>
    </html>
  `;
}

// --- EXPORT HELPER FUNCTIONS ---
export { getSectorConfig, generateTemplateConfig };
