// Templates sectoriels avec VARIATION DYNAMIQUE - Chaque prospect = site unique
import { getSectorImages } from './pexelsImages';

// Interface pour les données enrichies des prospects
interface EnrichedProspectData {
  description?: string;
  services?: string[];
  specialties?: string[];
  certifications?: string[];
  experience?: string;
  portfolio?: string[];
  pricing?: string;
  availability?: string;
  customFields?: Record<string, any>;
}

// ===== SYSTÈME DE VARIATION DYNAMIQUE =====
// Crée un "fingerprint" unique basé sur le nom d'entreprise pour varier le layout

function generateCompanyHash(companyName: string): number {
  let hash = 0;
  const str = companyName.toLowerCase().replace(/\s/g, '');
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

function shuffleArray<T>(array: T[], seed: number): T[] {
  const result = [...array];
  let currentSeed = seed;
  
  for (let i = result.length - 1; i > 0; i--) {
    currentSeed = (currentSeed * 9301 + 49297) % 233280;
    const j = Math.floor((currentSeed / 233280) * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  
  return result;
}

// Palettes de couleurs variées par secteur
const COLOR_PALETTES: Record<string, string[][]> = {
  coiffeur: [
    ['#6b21a8', '#581c87', '#7c3aed', '#f8fafc'], // Violet
    ['#be185d', '#9d174d', '#ec4899', '#fdf2f8'], // Rose
    ['#1e293b', '#334155', '#64748b', '#f8fafc'], // Chic noir
    ['#059669', '#047857', '#10b981', '#f0fdf4'], // Naturel
  ],
  plomberie: [
    ['#0f766e', '#115e59', '#14b8a6', '#f0fdfa'], // Turquoise
    ['#1e40af', '#1e3a8a', '#2563eb', '#eff6ff'], // Bleu pro
    ['#0369a1', '#075985', '#0ea5e9', '#f0f9ff'], // Ciel
    ['#374151', '#1f2937', '#4b5563', '#f9fafb'], // Moderne
  ],
  restaurant: [
    ['#c2410c', '#9a3412', '#ea580c', '#fff7ed'], // Orange
    ['#166534', '#14532d', '#16a34a', '#f0fdf4'], // Vert nature
    ['#1e3a8a', '#172554', '#3b82f6', '#eff6ff'], // Bleu gastronomique
    ['#7c2d12', '#5c2712', '#a16207', '#fef3c7'], // Chaleureux
  ],
  garage: [
    ['#166534', '#14532d', '#059669', '#f0fdf4'], // Vert
    ['#1e40af', '#1e3a8a', '#2563eb', '#eff6ff'], // Bleu industriel
    ['#374151', '#1f2937', '#dc2626', '#f9fafb'], // Sportif
    ['#0f172a', '#1e293b', '#3b82f6', '#f8fafc'], // Tech
  ],
  electricien: [
    ['#1e40af', '#1e3a8a', '#fbbf24', '#eff6ff'], // Bleu/Jaune élec
    ['#374151', '#1f2937', '#10b981', '#f9fafb'], // Moderne
    ['#7c2d12', '#9a3412', '#f59e0b', '#fff7ed'], // Industriel
    ['#0c4a6e', '#075985', '#38bdf8', '#f0f9ff'], // Tech blue
  ],
  fitness: [
    ['#dc2626', '#b91c1c', '#fbbf24', '#fef2f2'], // Rouge/orange
    ['#1e40af', '#1e3a8a', '#3b82f6', '#eff6ff'], // Blue energy
    ['#059669', '#047857', '#10b981', '#f0fdf4'], // Green vitality
    ['#7c3aed', '#6d28d9', '#a78bfa', '#f5f3ff'], // Purple power
  ],
  medical: [
    ['#1e40af', '#1e3a8a', '#06b6d4', '#eff6ff'], // Blue médical
    ['#059669', '#047857', '#14b8a6', '#f0fdf4'], // Green santé
    ['#7c3aed', '#6d28d9', '#8b5cf6', '#f5f3ff'], // Violet soin
    ['#0f172a', '#334155', '#64748b', '#f8fafc'], // Pro
  ],
  avocat: [
    ['#1e3a8a', '#172554', '#3b82f6', '#eff6ff'], // Bleu juridique
    ['#451a03', '#78350f', '#a16207', '#fef3c7'], // Cuir/luxe
    ['#0f172a', '#1e293b', '#94a3b8', '#f8fafc'], // Élégant
    ['#064e3b', '#065f46', '#10b981', '#ecfdf5'], // Confiance
  ],
  nettoyage: [
    ['#059669', '#047857', '#10b981', '#f0fdf4'], // Green clean
    ['#0ea5e9', '#0284c7', '#38bdf8', '#f0f9ff'], // Blue fresh
    ['#7c3aed', '#6d28d9', '#a78bfa', '#f5f3ff'], // Premium
    ['#ffffff', '#f8fafc', '#e2e8f0', '#0f172a'], // Pureté
  ],
  jardin: [
    ['#14532d', '#166534', '#22c55e', '#f0fdf4'], // Nature green
    ['#78716c', '#57534e', '#a8a29e', '#fafaf9'], // Terre
    ['#7c2d12', '#9a3412', '#d97706', '#fef3c7'], // Automne
    ['#0369a1', '#0ea5e9', '#7dd3fc', '#f0f9ff'], // Eau/jardin
  ]
};

// Variantes de layouts par secteur
const LAYOUT_VARIANTS: Record<string, string[][]> = {
  coiffeur: [
    ['hero-booking', 'services-grid', 'gallery-showcase', 'team-stylists', 'pricing-table', 'testimonials-clients', 'contact-appointment'],
    ['hero-fullscreen', 'about-story', 'services-cards', 'gallery-masonry', 'testimonials-slider', 'booking-form', 'contact-map'],
    ['hero-split', 'specialties-highlight', 'services-list', 'before-after', 'team-grid', 'promotions-banner', 'contact-info'],
    ['hero-video', 'services-pricing', 'gallery-carousel', 'expertise-section', 'reviews-cards', 'instagram-feed', 'booking-cta']
  ],
  plomberie: [
    ['emergency-hero', 'services-intervention', 'intervention-areas', 'certifications-showcase', 'project-gallery', 'emergency-contacts', 'quote-request'],
    ['hero-24h', 'expertise-section', 'services-grid', 'before-after', 'testimonials-clients', 'pricing-transparent', 'contact-urgent'],
    ['hero-trust', 'services-list', 'why-choose-us', 'service-areas-map', 'recent-projects', 'certifications', 'contact-form'],
    ['emergency-popup', 'hero-services', 'intervention-types', 'pricing-calculator', 'gallery-work', 'reviews-section', 'contact-multi']
  ],
  restaurant: [
    ['restaurant-hero', 'menu-showcase', 'specialties-dishes', 'gallery-interior', 'reservation-system', 'reviews-diners', 'contact-info'],
    ['hero-ambiance', 'story-section', 'menu-cards', 'chef-specialties', 'gallery-atmosphere', 'events-section', 'reservation-form'],
    ['hero-dish', 'about-kitchen', 'menu-pdf', 'wine-selection', 'private-rooms', 'testimonials-gourmet', 'contact-reservation'],
    ['video-hero', 'menu-daily', 'specialties-season', 'terrace-gallery', 'booking-widget', 'reviews-stars', 'contact-hours']
  ],
  garage: [
    ['garage-hero', 'services-auto', 'diagnostic-tools', 'brands-showcase', 'workshop-gallery', 'appointment-system', 'emergency-towing'],
    ['hero-car', 'services-list', 'diagnostic-tech', 'parts-showcase', 'before-after-repair', 'booking-online', 'contact-24h'],
    ['hero-trust', 'expertise-section', 'services-packages', 'customer-cars', 'reviews-clients', 'quote-form', 'location-map'],
    ['hero-emergency', 'services-mobile', 'brands-logos', 'team-mechanics', 'facilities-gallery', 'appointment-cta', 'contact-multi']
  ],
  electricien: [
    ['hero-certif', 'services-residential', 'services-commercial', 'certifications-badges', 'projects-gallery', 'emergency-24h', 'quote-form'],
    ['hero-safety', 'services-grid', 'normes-section', 'intervention-types', 'before-after', 'reviews-clients', 'contact-rdv'],
    ['hero-install', 'expertise-list', 'services-pricing', 'certifications-show', 'recent-work', 'emergency-banner', 'contact-form'],
    ['hero-guarantee', 'services-domotic', 'services-renovation', 'brands-partners', 'testimonials-section', 'quote-calculator', 'contact-urgent']
  ],
  fitness: [
    ['hero-energy', 'services-coaching', 'services-equipment', 'courses-schedule', 'results-before-after', 'testimonials-transformations', 'trial-form'],
    ['hero-motivation', 'coachs-team', 'services-personal', 'services-group', 'facilities-gallery', 'pricing-plans', 'contact-join'],
    ['hero-results', 'programs-section', 'services-nutrition', 'equipment-modern', 'success-stories', 'booking-classes', 'contact-info'],
    ['hero-challenge', 'services-grid', 'timetable-week', 'gallery-workout', 'reviews-members', 'promo-trial', 'contact-form']
  ],
  medical: [
    ['hero-care', 'services-consult', 'specialties-grid', 'equipments-modern', 'doctors-team', 'appointments-online', 'contact-emergency'],
    ['hero-trust', 'services-list', 'expertise-section', 'clinic-gallery', 'testimonials-patients', 'booking-system', 'contact-hours'],
    ['hero-welcome', 'services-medical', 'specialties-detailed', 'tech-advanced', 'reviews-stars', 'appointment-form', 'contact-map'],
    ['hero-health', 'services-checkup', 'doctors-profiles', 'facilities-modern', 'insurance-partners', 'contact-booking', 'emergency-line']
  ],
  avocat: [
    ['hero-justice', 'services-law', 'expertise-domains', 'case-success', 'team-lawyers', 'consultation-form', 'contact-office'],
    ['hero-defense', 'services-list', 'specialties-detailed', 'results-cases', 'testimonials-clients', 'appointment-booking', 'contact-info'],
    ['hero-rights', 'practice-areas', 'approach-section', 'credentials-show', 'reviews-trust', 'contact-consultation', 'location-map'],
    ['hero-expert', 'services-packages', 'case-studies', 'team-partners', 'faqs-section', 'contact-form', 'emergency-contact']
  ],
  nettoyage: [
    ['hero-clean', 'services-residential', 'services-commercial', 'products-eco', 'before-after', 'testimonials-clients', 'quote-form'],
    ['hero-pro', 'services-list', 'certifications-badges', 'equipments-pro', 'pricing-packages', 'booking-system', 'contact-24h'],
    ['hero-shine', 'services-grid', 'guarantee-section', 'recent-work', 'reviews-stars', 'contact-form', 'emergency-line'],
    ['hero-fresh', 'specialties-section', 'services-industrial', 'green-products', 'gallery-results', 'quote-calculator', 'contact-multi']
  ],
  jardin: [
    ['hero-nature', 'services-creation', 'services-maintenance', 'seasonal-work', 'portfolio-landscapes', 'testimonials-clients', 'quote-form'],
    ['hero-garden', 'services-list', 'expertise-plants', 'before-after', 'projects-gallery', 'booking-visit', 'contact-info'],
    ['hero-landscape', 'services-design', 'maintenance-plans', 'gallery-transformations', 'reviews-satisfaction', 'contact-consultation', 'seasonal-tips'],
    ['hero-green', 'services-arbor', 'irrigation-systems', 'portfolio-parks', 'testimonials-section', 'quote-request', 'contact-areas']
  ]
};

// Layouts spécifiques par secteur
export const SECTOR_LAYOUTS = {
  // Coiffeur - Layout avec galerie photos, tarifs, rendez-vous
  coiffeur: {
    sections: [
      'hero-booking',      // Hero avec bouton réservation
      'services-grid',     // Grille services avec prix
      'gallery-showcase',  // Galerie photos travaux
      'team-stylists',     // Équipe de coiffeurs
      'pricing-table',     // Tableau tarifs détaillé
      'testimonials-clients', // Avis clients avec photos
      'contact-appointment' // Contact avec formulaire RDV
    ],
    features: {
      gallery: true,
      pricing: true,
      booking: true,
      team: true,
      promotions: true
    }
  },

  // Plombier - Layout technique avec interventions, certifications
  plombberie: {
    sections: [
      'emergency-hero',    // Hero avec urgence 24/7
      'services-intervention', // Services par type d'intervention
      'intervention-areas', // Zones d'intervention
      'certifications-showcase', // Certifications et assurances
      'project-gallery',   // Galerie projets réalisés
      'emergency-contacts', // Contacts d'urgence
      'quote-request'      // Formulaire devis rapide
    ],
    features: {
      emergency: true,
      certifications: true,
      projects: true,
      zones: true,
      quote: true
    }
  },

  // Restaurant - Layout menu, réservations, avis
  restaurant: {
    sections: [
      'restaurant-hero',   // Hero avec ambiance
      'menu-showcase',     // Menu avec prix
      'specialties-dishes', // Spécialités du chef
      'gallery-interior',  // Galerie intérieur/extérieur
      'reservation-system', // Système réservation
      'reviews-diners',    // Avis clients
      'contact-info'       // Infos contact et horaires
    ],
    features: {
      menu: true,
      reservations: true,
      gallery: true,
      specialties: true,
      reviews: true
    }
  },

  // Garage - Layout services auto, diagnostics
  garage: {
    sections: [
      'garage-hero',       // Hero avec services
      'services-auto',     // Services automobiles
      'diagnostic-tools',  // Outils de diagnostic
      'brands-showcase',   // Marques traitées
      'workshop-gallery',  // Galerie atelier
      'appointment-system', // Prise de RDV
      'emergency-towing'    // Dépannage remorquage
    ],
    features: {
      diagnostics: true,
      brands: true,
      workshop: true,
      appointment: true,
      towing: true
    }
  },

  // Électricien - Layout normes, installations
  electricien: {
    sections: [
      'electricien-hero',  // Hero professionnel
      'services-electric', // Services électriques
      'norms-certifications', // Normes et certifications
      'installation-gallery', // Galerie installations
      'safety-standards',  // Standards de sécurité
      'intervention-map',  // Carte interventions
      'quote-form'        // Formulaire devis
    ],
    features: {
      norms: true,
      safety: true,
      installations: true,
      map: true,
      quote: true
    }
  },

  // Fitness - Layout équipements, coaching, abonnements
  fitness: {
    sections: [
      'fitness-hero',      // Hero dynamique
      'equipment-showcase', // Équipements
      'coaching-programs', // Programmes coaching
      'membership-plans',  // Plans d'abonnement
      'gallery-gym',       // Galerie salle
      'trainers-team',     // Équipe de coachs
      'trial-form'         // Formulaire essai gratuit
    ],
    features: {
      equipment: true,
      coaching: true,
      membership: true,
      team: true,
      trial: true
    }
  },

  // Medical - Layout consultations, spécialités, RDV
  medical: {
    sections: [
      'medical-hero',      // Hero confiance
      'specialties-list',   // Spécialités médicales
      'consultations-types', // Types de consultations
      'medical-team',       // Équipe médicale
      'facility-tour',      // Visite installations
      'appointment-system', // Système RDV
      'emergency-info'      // Infos urgences
    ],
    features: {
      specialties: true,
      consultations: true,
      team: true,
      facility: true,
      appointments: true
    }
  },

  // Avocat - Layout domaines, expertise, consultations
  avocat: {
    sections: [
      'law-hero',          // Hero sérieux
      'practice-areas',    // Domaines de pratique
      'expertise-showcase', // Expertise spécifique
      'case-studies',      // Études de cas
      'legal-team',        // Équipe juridique
      'consultation-form', // Formulaire consultation
      'office-location'    // Localisation cabinet
    ],
    features: {
      domains: true,
      expertise: true,
      cases: true,
      team: true,
      consultation: true
    }
  },

  // Nettoyage - Layout services, certifications, devis
  nettoyage: {
    sections: [
      'cleaning-hero',     // Hero propreté
      'cleaning-services', // Services nettoyage
      'certifications-eco', // Certifications écologiques
      'before-after-gallery', // Galerie avant/après
      'pricing-packages',  // Forfaits tarifs
      'booking-system',    // Système réservation
      'contact-form'       // Formulaire contact
    ],
    features: {
      services: true,
      eco: true,
      gallery: true,
      pricing: true,
      booking: true
    }
  },

  // Jardin - Layout aménagements, projets, entretien
  jardin: {
    sections: [
      'garden-hero',       // Hero nature
      'landscaping-services', // Services aménagement
      'project-gallery',   // Galerie projets
      'plant-catalog',     // Catalogue plantes
      'maintenance-plans', // Plans entretien
      'design-process',    // Processus design
      'quote-request'      // Demande devis
    ],
    features: {
      landscaping: true,
      projects: true,
      plants: true,
      maintenance: true,
      design: true
    }
  }
};

// Fonction pour générer le HTML spécifique au secteur avec VARIATION DYNAMIQUE
export function generateSectorSpecificHTML(sector: string, lead: any, enrichedData?: EnrichedProspectData): string {
  const companyName = lead.name || lead.companyName || 'Entreprise';
  const companyHash = generateCompanyHash(companyName);
  
  // Utiliser le hash pour créer une variation unique
  const paletteIndex = companyHash % 4; // 4 palettes par secteur
  const layoutVariantIndex = (companyHash >> 2) % 4; // 4 variantes de layout
  
  // Sélectionner la palette de couleurs unique pour cette entreprise
  const sectorPalettes = COLOR_PALETTES[sector] || COLOR_PALETTES.coiffeur;
  const selectedPalette = sectorPalettes[paletteIndex];
  
  // Sélectionner la variante de layout unique
  const sectorVariants = LAYOUT_VARIANTS[sector] || LAYOUT_VARIANTS.coiffeur;
  const selectedSections = sectorVariants[layoutVariantIndex];
  
  // Mélanger l'ordre des sections légèrement selon le hash
  const shuffledSections = shuffleArray(selectedSections, companyHash);
  
  // Créer le layout dynamique
  const dynamicLayout = {
    sections: shuffledSections,
    colors: {
      primary: selectedPalette[0],
      secondary: selectedPalette[1],
      accent: selectedPalette[2],
      background: selectedPalette[3]
    },
    companyHash: companyHash,
    uniqueId: `${sector}-${companyHash.toString(36).substring(0, 6)}`
  };
  
  // Intégrer les données enrichies
  const personalizedContent = integrateEnrichedData(lead, enrichedData, sector);
  
  // Générer le HTML avec le layout dynamique unique
  return buildSectorHTML(sector, dynamicLayout, personalizedContent);
}

function integrateEnrichedData(lead: any, enriched: EnrichedProspectData | undefined, sector: string) {
  // Intégrer les données d'enrichissement pour personnaliser le contenu
  return {
    ...lead,
    enrichedServices: enriched?.services || [],
    specialties: enriched?.specialties || [],
    certifications: enriched?.certifications || [],
    experience: enriched?.experience || '',
    portfolio: enriched?.portfolio || [],
    pricing: enriched?.pricing || '',
    customFields: enriched?.customFields || {}
  };
}

function buildSectorHTML(sector: string, layout: any, content: any): string {
  // Construire le HTML spécifique selon le secteur et le layout
  // Cette fonction va générer des structures HTML complètement différentes
  
  switch(sector) {
    case 'coiffeur':
      return buildCoiffeurHTML(content, layout);
    case 'plomberie':
      return buildPlombierHTML(content, layout);
    case 'restaurant':
      return buildRestaurantHTML(content, layout);
    // ... autres secteurs
    default:
      return buildDefaultHTML(content, layout);
  }
}

// Fonctions spécifiques par secteur
function buildCoiffeurHTML(content: any, layout: any): string {
  const colors = layout.colors;
  const uniqueId = layout.uniqueId;
  
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${content.name} - Salon de Coiffure à ${content.city}</title>
    <style>
        :root {
            --primary: ${colors.primary};
            --secondary: ${colors.secondary};
            --accent: ${colors.accent};
            --bg: ${colors.background};
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', system-ui, sans-serif; background: var(--bg); }
        
        .hero-booking {
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            color: white;
            padding: 100px 20px;
            text-align: center;
        }
        .hero-booking h1 { font-size: 3rem; margin-bottom: 20px; }
        .booking-btn {
            background: var(--accent);
            color: white;
            padding: 15px 40px;
            border: none;
            border-radius: 50px;
            font-size: 1.1rem;
            cursor: pointer;
            margin-top: 30px;
        }
        
        .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
            padding: 60px 20px;
            max-width: 1200px;
            margin: 0 auto;
        }
        .service-card {
            background: white;
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.1);
            border-top: 4px solid var(--accent);
        }
        .service-card h3 { color: var(--primary); margin-bottom: 10px; }
        .price { color: var(--accent); font-size: 1.3rem; font-weight: bold; }
        
        .gallery-showcase {
            background: white;
            padding: 60px 20px;
            text-align: center;
        }
        .gallery-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            max-width: 1200px;
            margin: 30px auto;
        }
        .gallery-item img { width: 100%; height: 200px; object-fit: cover; border-radius: 10px; }
        
        .team-stylists, .contact-appointment {
            padding: 60px 20px;
            max-width: 800px;
            margin: 0 auto;
            text-align: center;
        }
        .contact-appointment { background: linear-gradient(135deg, var(--primary), var(--secondary)); color: white; }
        
        .site-identifier {
            position: fixed;
            bottom: 10px;
            right: 10px;
            font-size: 10px;
            color: rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>
    <section class="hero-booking">
        <h1>${content.name}</h1>
        <p>Salon de coiffure professionnel à ${content.city}</p>
        <button class="booking-btn">Prendre RDV</button>
    </section>
    
    <section class="services-grid">
        ${(content.enrichedServices || ['Coupe', 'Coloration', 'Lissage', 'Chignon']).map((service: any) => `
            <div class="service-card">
                <h3>${typeof service === 'string' ? service : service.name}</h3>
                <p>Service professionnel de qualité</p>
                <span class="price">${typeof service === 'string' ? 'Sur devis' : (service.price || 'Sur devis')}€</span>
            </div>
        `).join('')}
    </section>
    
    <section class="gallery-showcase">
        <h2>Nos Réalisations</h2>
        <div class="gallery-grid">
            ${(content.portfolio || ['https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400']).map((img: string) => `
                <div class="gallery-item">
                    <img src="${img}" alt="Réalisation" />
                </div>
            `).join('')}
        </div>
    </section>
    
    <section class="contact-appointment">
        <h2>Réservation en ligne</h2>
        <p>📞 ${content.phone || 'Contactez-nous'}</p>
        <p>📍 ${content.city}</p>
    </section>
    
    <div class="site-identifier">ID: ${uniqueId}</div>
</body>
</html>
  `;
}

function buildPlombierHTML(content: any, layout: any): string {
  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <title>${content.name} - Plombier à ${content.city}</title>
        <!-- Styles spécifiques plombier -->
    </head>
    <body>
        <!-- Hero urgence -->
        <section class="emergency-hero">
            <h1>${content.name}</h1>
            <p>Plombier d'urgence disponible 24/7 à ${content.city}</p>
            <div class="emergency-contacts">
                <a href="tel:${content.phone}" class="emergency-btn">Appeler d'urgence</a>
            </div>
        </section>
        
        <!-- Services intervention -->
        <section class="services-intervention">
            <h2>Services d'intervention</h2>
            ${(content.enrichedServices || []).map((service: any) => `
                <div class="intervention-card">
                    <h3>${service.name}</h3>
                    <p>${service.description}</p>
                    <div class="emergency-info">
                        ${service.urgency ? '<span class="urgent">URGENT</span>' : ''}
                    </div>
                </div>
            `).join('')}
        </section>
        
        <!-- Certifications -->
        <section class="certifications-showcase">
            <h2>Nos certifications</h2>
            <div class="certifications-grid">
                ${(content.certifications || []).map((cert: string) => `
                    <div class="certification-badge">
                        <span>${cert}</span>
                    </div>
                `).join('')}
            </div>
        </section>
        
        <!-- Galerie projets -->
        <section class="project-gallery">
            <h2>Projets réalisés</h2>
            <div class="projects-grid">
                ${(content.portfolio || []).map((img: string) => `
                    <div class="project-item">
                        <img src="${img}" alt="Projet plomberie" />
                        <div class="project-info">
                            <h4>Projet terminé</h4>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>
        
        <!-- Formulaire devis -->
        <section class="quote-request">
            <h2>Demande de devis</h2>
            <form class="quote-form">
                <!-- Champs spécifiques plomberie -->
            </form>
        </section>
    </body>
    </html>
  `;
}

function buildRestaurantHTML(content: any, layout: any): string {
  // Layout spécifique restaurant avec menu, réservations...
  return `<html>...</html>`;
}

function buildDefaultHTML(content: any, layout: any): string {
  // Layout par défaut dynamique et unique pour TOUS les secteurs
  const colors = layout.colors;
  const sections = layout.sections;
  const uniqueId = layout.uniqueId;
  
  // Générer un titre de secteur capitalisé
  const sectorTitle = content.sector ? content.sector.charAt(0).toUpperCase() + content.sector.slice(1) : 'Professionnel';
  
  // ── IMAGES SECTORIELLES PEXELS UNIQUEMENT ──
  // On utilise les images Pexels professionnelles spécifiques au secteur
  // pour éviter les images génériques de bureau ou incorrectes
  const sectorImages = getSectorImages(content.sector);
  const shuffledImages = shuffleArray(sectorImages, layout.companyHash || 12345);
  const selectedImages = shuffledImages.slice(0, 4);
  
  // Palette de couleurs dynamique si non fournie
  const defaultPalettes = [
    ['#1e40af', '#3b82f6', '#60a5fa', '#eff6ff'], // Blue professional
    ['#059669', '#10b981', '#34d399', '#f0fdf4'], // Green growth
    ['#7c3aed', '#8b5cf6', '#a78bfa', '#f5f3ff'], // Purple creative
    ['#dc2626', '#ef4444', '#f87171', '#fef2f2'], // Red dynamic
    ['#0f172a', '#334155', '#64748b', '#f8fafc'], // Dark elegant
    ['#c2410c', '#ea580c', '#fb923c', '#fff7ed'], // Orange warm
  ];
  
  const paletteIndex = (layout.companyHash || 12345) % defaultPalettes.length;
  const finalColors = colors || {
    primary: defaultPalettes[paletteIndex][0],
    secondary: defaultPalettes[paletteIndex][1],
    accent: defaultPalettes[paletteIndex][2],
    background: defaultPalettes[paletteIndex][3]
  };
  
  // Services dynamiques basés sur le secteur
  const dynamicServices = content.enrichedServices?.length > 0 
    ? content.enrichedServices.slice(0, 6).map((service: string, idx: number) => ({
        name: service,
        description: `Service professionnel de ${service.toLowerCase()}`,
        features: ['Qualité garantie', 'Expertise reconnue', 'Service rapide']
      }))
    : [
        { name: 'Service Premium', description: 'Solution complète et professionnelle', features: ['Expertise', 'Qualité', 'Garantie'] },
        { name: 'Conseil Personnalisé', description: 'Accompagnement sur mesure', features: ['Écoute', 'Conseil', 'Suivi'] },
        { name: 'Intervention Rapide', description: 'Réactivité et efficacité', features: ['Rapide', 'Fiable', 'Pro'] },
        { name: 'Devis Gratuit', description: 'Transparence totale', features: ['Gratuit', 'Détaillé', 'Sans engagement'] }
      ];
  
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${content.name} - ${sectorTitle} à ${content.city}</title>
    <meta name="description" content="${content.name} - ${sectorTitle} professionnel à ${content.city}. ${content.description || 'Services de qualité et expertise reconnue.'}">
    <style>
        :root {
            --primary: ${finalColors.primary};
            --secondary: ${finalColors.secondary};
            --accent: ${finalColors.accent};
            --bg: ${finalColors.background};
            --unique-id: "${uniqueId}";
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', system-ui, sans-serif; background: var(--bg); color: #1f2937; line-height: 1.6; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        
        /* Hero dynamique */
        .hero { 
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            color: white; 
            padding: 100px 0; 
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        .hero::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: url('${selectedImages[0]}') center/cover;
            opacity: 0.2;
        }
        .hero-content { position: relative; z-index: 1; }
        .hero h1 { font-size: 3.5rem; margin-bottom: 20px; font-weight: 800; }
        .hero p { font-size: 1.3rem; margin-bottom: 30px; opacity: 0.95; }
        .cta-button {
            display: inline-block;
            background: var(--accent);
            color: white;
            padding: 15px 40px;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            font-size: 1.1rem;
            transition: all 0.3s;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        .cta-button:hover { transform: translateY(-3px); box-shadow: 0 8px 25px rgba(0,0,0,0.3); }
        
        /* Sections dynamiques */
        .section { padding: 80px 0; }
        .section-title { 
            text-align: center; 
            font-size: 2.5rem; 
            color: var(--primary);
            margin-bottom: 50px;
            font-weight: 700;
        }
        
        /* Services grid dynamique */
        .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 30px;
            margin-top: 40px;
        }
        .service-card {
            background: white;
            border-radius: 20px;
            padding: 35px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.08);
            transition: all 0.3s;
            border-top: 4px solid var(--accent);
        }
        .service-card:hover { transform: translateY(-10px); box-shadow: 0 20px 60px rgba(0,0,0,0.12); }
        .service-card h3 { color: var(--primary); font-size: 1.4rem; margin-bottom: 15px; }
        .service-card p { color: #6b7280; margin-bottom: 20px; }
        .features-list { list-style: none; }
        .features-list li { 
            padding: 8px 0; 
            color: #4b5563;
            display: flex; 
            align-items: center; 
            gap: 10px;
        }
        .features-list li::before {
            content: '✓';
            color: var(--accent);
            font-weight: bold;
        }
        
        /* Gallery dynamique */
        .gallery-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 25px;
            margin-top: 40px;
        }
        .gallery-item {
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 8px 30px rgba(0,0,0,0.1);
            transition: transform 0.3s;
        }
        .gallery-item:hover { transform: scale(1.03); }
        .gallery-item img { width: 100%; height: 250px; object-fit: cover; }
        
        /* About section */
        .about-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 60px;
            align-items: center;
        }
        .about-text h2 { color: var(--primary); font-size: 2.2rem; margin-bottom: 25px; }
        .about-text p { color: #4b5563; font-size: 1.1rem; line-height: 1.8; margin-bottom: 20px; }
        .about-image {
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0,0,0,0.15);
        }
        .about-image img { width: 100%; height: 400px; object-fit: cover; }
        
        /* Contact section */
        .contact-section {
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            color: white;
            padding: 80px 0;
            text-align: center;
        }
        .contact-section h2 { font-size: 2.5rem; margin-bottom: 30px; }
        .contact-info {
            display: flex;
            justify-content: center;
            gap: 50px;
            flex-wrap: wrap;
            margin-top: 40px;
        }
        .contact-item {
            display: flex;
            align-items: center;
            gap: 15px;
            font-size: 1.2rem;
        }
        
        /* Unique identifier caché pour traçabilité */
        .site-identifier {
            position: fixed;
            bottom: 10px;
            right: 10px;
            font-size: 10px;
            color: rgba(0,0,0,0.1);
            pointer-events: none;
        }
        
        @media (max-width: 768px) {
            .hero h1 { font-size: 2.2rem; }
            .about-content { grid-template-columns: 1fr; }
            .contact-info { flex-direction: column; gap: 20px; }
        }
    </style>
</head>
<body>
    <!-- Hero Section -->
    <section class="hero">
        <div class="container hero-content">
            <h1>${content.name}</h1>
            <p>${sectorTitle} professionnel à ${content.city} - ${content.description || 'Expertise et qualité au service de vos projets'}</p>
            <a href="#contact" class="cta-button">${content.phone ? `Appeler: ${content.phone}` : 'Nous contacter'}</a>
        </div>
    </section>
    
    <!-- Services Section -->
    <section class="section">
        <div class="container">
            <h2 class="section-title">Nos Services</h2>
            <div class="services-grid">
                ${dynamicServices.map((service: any) => `
                    <div class="service-card">
                        <h3>${service.name}</h3>
                        <p>${service.description}</p>
                        <ul class="features-list">
                            ${service.features.map((f: string) => `<li>${f}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    
    <!-- About Section -->
    <section class="section" style="background: white;">
        <div class="container">
            <div class="about-content">
                <div class="about-text">
                    <h2>À Propos de ${content.name}</h2>
                    <p>${content.enrichedDescription || content.description || `${content.name} est un ${sectorTitle.toLowerCase()} professionnel basé à ${content.city}, reconnu pour son expertise et la qualité de ses services.`}</p>
                    <p>${content.experience ? `Avec ${content.experience} d'expérience, nous mettons notre savoir-faire à votre disposition.` : 'Nous mettons notre savoir-faire et notre expérience à votre disposition pour tous vos projets.'}</p>
                    ${content.specialties?.length > 0 ? `<p><strong>Nos spécialités :</strong> ${content.specialties.join(', ')}</p>` : ''}
                </div>
                <div class="about-image">
                    <img src="${selectedImages[1]}" alt="${content.name}">
                </div>
            </div>
        </div>
    </section>
    
    <!-- Gallery Section -->
    <section class="section">
        <div class="container">
            <h2 class="section-title">Nos Réalisations</h2>
            <div class="gallery-grid">
                ${selectedImages.map((img: string) => `
                    <div class="gallery-item">
                        <img src="${img}" alt="Réalisation ${content.name}">
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    
    <!-- Contact Section -->
    <section class="contact-section" id="contact">
        <div class="container">
            <h2>Contactez-nous</h2>
            <p style="font-size: 1.2rem; opacity: 0.9;">Disponible pour vos projets à ${content.city} et environs</p>
            <div class="contact-info">
                ${content.phone ? `
                    <div class="contact-item">
                        <span>📞</span>
                        <span>${content.phone}</span>
                    </div>
                ` : ''}
                ${content.email ? `
                    <div class="contact-item">
                        <span>✉️</span>
                        <span>${content.email}</span>
                    </div>
                ` : ''}
                <div class="contact-item">
                    <span>📍</span>
                    <span>${content.city}</span>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Identifiant unique caché -->
    <div class="site-identifier">ID: ${uniqueId}</div>
</body>
</html>
  `;
}
