// Templates sectoriels complètement différents - Reconstruction totale

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

// Fonction pour générer le HTML spécifique au secteur
export function generateSectorSpecificHTML(sector: string, lead: any, enrichedData?: EnrichedProspectData): string {
  const layout = SECTOR_LAYOUTS[sector as keyof typeof SECTOR_LAYOUTS] || SECTOR_LAYOUTS.coiffeur;
  
  // Intégrer les données enrichies
  const personalizedContent = integrateEnrichedData(lead, enrichedData, sector);
  
  // Générer le HTML selon le layout spécifique
  return buildSectorHTML(sector, layout, personalizedContent);
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
  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <title>${content.name} - Coiffeur à ${content.city}</title>
        <!-- Styles spécifiques coiffeur -->
    </head>
    <body>
        <!-- Hero avec réservation -->
        <section class="hero-booking">
            <h1>${content.name}</h1>
            <p>Coiffeur professionnel à ${content.city}</p>
            <button class="booking-btn">Prendre RDV</button>
        </section>
        
        <!-- Galerie photos -->
        <section class="gallery-showcase">
            <h2>Nos réalisations</h2>
            <div class="gallery-grid">
                ${content.portfolio.map((img: string) => `
                    <div class="gallery-item">
                        <img src="${img}" alt="Réalisation coiffure" />
                    </div>
                `).join('')}
            </div>
        </section>
        
        <!-- Services avec tarifs -->
        <section class="services-grid">
            <h2>Nos services</h2>
            ${content.enrichedServices.map((service: any) => `
                <div class="service-card">
                    <h3>${service.name}</h3>
                    <p>${service.description}</p>
                    <span class="price">${service.price}</span>
                </div>
            `).join('')}
        </section>
        
        <!-- Équipe -->
        <section class="team-stylists">
            <h2>Notre équipe</h2>
            <!-- Contenu équipe -->
        </section>
        
        <!-- Formulaire RDV -->
        <section class="contact-appointment">
            <h2>Réservation</h2>
            <form class="appointment-form">
                <!-- Champs formulaire -->
            </form>
        </section>
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
            ${content.enrichedServices.map((service: any) => `
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
                ${content.certifications.map((cert: string) => `
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
                ${content.portfolio.map((img: string) => `
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
  // Layout par défaut générique
  return `<html>...</html>`;
}
