// ============================================================
// LeadForge AI — Modern Professional Website Generator v2.0
// Architecture unifiée, design moderne, performance optimisée
// ============================================================

import { Lead, safeStr, proxyImg } from "./supabase-store";

interface ModernSiteContent {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  aboutText: string;
  services: Array<{ 
    name: string; 
    description: string; 
    icon: string;
    features?: string[];
  }>;
  testimonials: Array<{
    author: string;
    text: string;
    rating: number;
    date: string;
    role?: string;
  }>;
  gallery: Array<{
    url: string;
    title: string;
    category: string;
  }>;
  achievements?: Array<{
    number: string;
    label: string;
  }>;
  cta: {
    primary: string;
    secondary: string;
  };
  contact: {
    title: string;
    subtitle: string;
  };
}

// ════════════════════════════════════════════════════════════
// SYSTÈME DE DESIGN MODERNE - Crystal Clear Design System
// ════════════════════════════════════════════════════════════

interface DesignSystem {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    neutral: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    success: string;
    warning: string;
    error: string;
  };
  typography: {
    fontFamily: {
      sans: string[];
      serif: string[];
      mono: string[];
    };
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
      '5xl': string;
    };
    fontWeight: {
      light: number;
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
      extrabold: number;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
  };
  borderRadius: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  animations: {
    duration: {
      fast: string;
      normal: string;
      slow: string;
    };
    easing: {
      ease: string;
      easeIn: string;
      easeOut: string;
      easeInOut: string;
    };
  };
}

// ════════════════════════════════════════════════════════════
// PALETTES PROFESSIONNELLES PAR SECTEUR
// ════════════════════════════════════════════════════════════

const SECTOR_DESIGN_SYSTEMS: Record<string, DesignSystem> = {
  restaurant: {
    colors: {
      primary: '#DC2626',
      secondary: '#F87171',
      accent: '#FBBF24',
      neutral: {
        50: '#FEF2F2',
        100: '#FEE2E2',
        200: '#FECACA',
        300: '#FCA5A5',
        400: '#F87171',
        500: '#EF4444',
        600: '#DC2626',
        700: '#B91C1C',
        800: '#991B1B',
        900: '#7F1D1D'
      },
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444'
    },
    typography: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem'
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800
      }
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem',
      '3xl': '4rem',
      '4xl': '6rem'
    },
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      full: '9999px'
    },
    shadows: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
      '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)'
    },
    animations: {
      duration: {
        fast: '150ms',
        normal: '300ms',
        slow: '500ms'
      },
      easing: {
        ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }
    }
  },
  coiffeur: {
    colors: {
      primary: '#7C3AED',
      secondary: '#A78BFA',
      accent: '#F472B6',
      neutral: {
        50: '#FAF5FF',
        100: '#F3E8FF',
        200: '#E9D5FF',
        300: '#D8B4FE',
        400: '#C084FC',
        500: '#A855F7',
        600: '#9333EA',
        700: '#7C3AED',
        800: '#6B21A8',
        900: '#581C87'
      },
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444'
    },
    typography: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem'
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800
      }
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem',
      '3xl': '4rem',
      '4xl': '6rem'
    },
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      full: '9999px'
    },
    shadows: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
      '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)'
    },
    animations: {
      duration: {
        fast: '150ms',
        normal: '300ms',
        slow: '500ms'
      },
      easing: {
        ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }
    }
  },
  spa: {
    colors: {
      primary: '#0D9488',
      secondary: '#2DD4BF',
      accent: '#14B8A6',
      neutral: {
        50: '#F0FDFA',
        100: '#CCFBF1',
        200: '#99F6E4',
        300: '#5EEAD4',
        400: '#2DD4BF',
        500: '#14B8A6',
        600: '#0D9488',
        700: '#0F766E',
        800: '#115E59',
        900: '#134E4A'
      },
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444'
    },
    typography: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Tenor Sans', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem'
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800
      }
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem',
      '3xl': '4rem',
      '4xl': '6rem'
    },
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      full: '9999px'
    },
    shadows: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
      '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)'
    },
    animations: {
      duration: {
        fast: '150ms',
        normal: '300ms',
        slow: '500ms'
      },
      easing: {
        ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }
    }
  },
  default: {
    colors: {
      primary: '#0F172A',
      secondary: '#1E293B',
      accent: '#3B82F6',
      neutral: {
        50: '#F8FAFC',
        100: '#F1F5F9',
        200: '#E2E8F0',
        300: '#CBD5E1',
        400: '#94A3B8',
        500: '#64748B',
        600: '#475569',
        700: '#334155',
        800: '#1E293B',
        900: '#0F172A'
      },
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444'
    },
    typography: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem'
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800
      }
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem',
      '3xl': '4rem',
      '4xl': '6rem'
    },
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      full: '9999px'
    },
    shadows: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
      '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)'
    },
    animations: {
      duration: {
        fast: '150ms',
        normal: '300ms',
        slow: '500ms'
      },
      easing: {
        ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }
    }
  }
};

function getDesignSystem(sector: string): DesignSystem {
  const s = (sector || '').toLowerCase();
  for (const [key, system] of Object.entries(SECTOR_DESIGN_SYSTEMS)) {
    if (key !== 'default' && s.includes(key)) return system;
  }
  return SECTOR_DESIGN_SYSTEMS.default;
}

// ════════════════════════════════════════════════════════════
// IMAGES PROFESSIONNELLES OPTIMISÉES
// ════════════════════════════════════════════════════════════

const PROFESSIONAL_IMAGES: Record<string, string[]> = {
  restaurant: [
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop&auto=format'
  ],
  coiffeur: [
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1521590832167-7228fcb8c1b5?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&h=600&fit=crop&auto=format'
  ],
  spa: [
    'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1540555700478-4be289fbec6e?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&h=600&fit=crop&auto=format'
  ],
  default: [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&auto=format'
  ]
};

function getProfessionalImages(sector: string): string[] {
  const s = (sector || '').toLowerCase();
  for (const [key, images] of Object.entries(PROFESSIONAL_IMAGES)) {
    if (key !== 'default' && s.includes(key)) return images;
  }
  return PROFESSIONAL_IMAGES.default;
}

// ════════════════════════════════════════════════════════════
// GÉNÉRATEUR DE CONTENU INTELLIGENT
// ════════════════════════════════════════════════════════════

function generateModernContent(lead: Lead): ModernSiteContent {
  const sector = (lead.sector || '').toLowerCase();
  const city = safeStr(lead.city);
  const name = safeStr(lead.name);
  
  // Contenu spécifique par secteur
  const sectorContent = {
    restaurant: {
      services: [
        { name: 'Cuisine Gastronomique', description: 'Une expérience culinaire unique avec des produits locaux', icon: '🍽️', features: ['Produits frais', 'Chef expérimenté', 'Menu saisonnier'] },
        { name: 'Service Traiteur', description: 'Organisation de vos événements privés et professionnels', icon: '🎉', features: ['Événements privés', 'Réceptions', 'Menus personnalisés'] },
        { name: 'Dégustation', description: 'Découvrez nos menus dégustation exclusifs', icon: '🍷', features: ['Accords mets-vins', 'Dégustations', 'Cave à vin'] },
        { name: 'Brunch', description: 'Moments conviviaux le week-end en famille', icon: '☕', features: ['Brunch dominical', 'Petit-déjeuner', 'Formules week-end'] },
        { name: 'Vins & Boissons', description: 'Sélection de vins et boissons artisanales', icon: '🥂', features: ['Carte des vins', 'Cocktails', 'Boissons locales'] },
        { name: 'Privatisation', description: 'Réservez notre espace pour vos événements', icon: '🏛️', features: ['Espaces privés', 'Séminaires', 'Célébrations'] }
      ],
      achievements: [
        { number: '15+', label: 'Ans d\'expérience' },
        { number: '50k+', label: 'Clients satisfaits' },
        { number: '100+', label: 'Vins référencés' },
        { number: '4.8★', label: 'Note moyenne' }
      ]
    },
    coiffeur: {
      services: [
        { name: 'Coupe Moderne', description: 'Des tendances actuelles adaptées à votre style', icon: '✂️', features: ['Tendances 2024', 'Conseil personnalisé', 'Style unique'] },
        { name: 'Coloration', description: 'Des couleurs vibrantes et naturelles', icon: '🎨', features: ['Coloration permanente', 'Mèches', 'Balayage'] },
        { name: 'Soin Capillaire', description: 'Traitements profonds pour cheveux sains', icon: '💆', features: ['Soin profond', 'Masques', 'Huiles naturelles'] },
        { name: 'Extension', description: 'Allongement et volume instantanés', icon: '💇', features: ['Extensions cheveux', 'Volume', 'Pose professionnelle'] },
        { name: 'Coiffure Homme', description: 'Coupes classiques et modernes pour hommes', icon: '👨', features: ['Barbe', 'Taille', 'Rasage traditionnel'] },
        { name: 'Soins Barbe', description: 'Entretien professionnel de votre barbe', icon: '🧔', features: ['Taille barbe', 'Soin', 'Modelage'] }
      ],
      achievements: [
        { number: '10+', label: 'Ans d\'expérience' },
        { number: '5k+', label: 'Clients fidèles' },
        { number: '20+', label: 'Styles créés' },
        { number: '4.9★', label: 'Avis clients' }
      ]
    },
    spa: {
      services: [
        { name: 'Massages', description: 'Détente profonde et bien-être absolu', icon: '💆', features: ['Massage relaxant', 'Pierres chaudes', 'Aromathérapie'] },
        { name: 'Soins du Visage', description: 'Traitements personnalisés pour votre peau', icon: '🧴', features: ['Hydratation', 'Anti-âge', 'Éclat'] },
        { name: 'Soin Corps', description: 'Gommages et enveloppements détox', icon: '🌿', features: ['Gommage', 'Enveloppement', 'Détox'] },
        { name: 'Sauna & Hammam', description: 'Purification et relaxation profonde', icon: '♨️', features: ['Sauna finlandais', 'Hammam', 'Bain vapeur'] },
        { name: 'Balnéothérapie', description: 'Bains thérapeutiques et jacuzzi', icon: '🛁', features: ['Jacuzzi', 'Bains thérapeutiques', 'Hydrothérapie'] },
        { name: 'Cure Bien-être', description: 'Programmes sur mesure pour revitaliser', icon: '✨', features: ['Cures jour', 'Forfaits bien-être', 'Programmes personnalisés'] }
      ],
      achievements: [
        { number: '8+', label: 'Ans d\'expérience' },
        { number: '3k+', label: 'Clients relaxés' },
        { number: '30+', label: 'Soins proposés' },
        { number: '4.7★', label: 'Satisfaction' }
      ]
    }
  };

  const defaultServices = [
    { name: 'Consultation', description: 'Analyse de vos besoins personnalisée', icon: '🔍', features: ['Diagnostic', 'Conseil', 'Expertise'] },
    { name: 'Service Premium', description: 'Solution haut de gamme adaptée à vous', icon: '⭐', features: ['Qualité supérieure', 'Service personnalisé', 'Garantie'] },
    { name: 'Support Client', description: 'Accompagnement continu et réactif', icon: '🤝', features: ['Disponibilité', 'Réactivité', 'Suivi'] },
    { name: 'Maintenance', description: 'Entretien régulier pour pérennité', icon: '🔧', features: ['Contrat maintenance', 'Intervention rapide', 'Prévention'] },
    { name: 'Formation', description: 'Transfert de compétences et savoir-faire', icon: '📚', features: ['Formation personnalisée', 'Support', 'Documentation'] },
    { name: 'Garantie', description: 'Engagement de satisfaction totale', icon: '🛡️', features: ['Garantie satisfait', 'SAV', 'Remboursement'] }
  ];

  const defaultAchievements = [
    { number: '10+', label: 'Ans d\'expérience' },
    { number: '1k+', label: 'Clients satisfaits' },
    { number: '50+', label: 'Projets réalisés' },
    { number: '4.8★', label: 'Note moyenne' }
  ];

  const sectorData = sectorContent[sector as keyof typeof sectorContent] || {
    services: defaultServices,
    achievements: defaultAchievements
  };

  return {
    heroTitle: `${name} - Excellence ${lead.sector || 'Professionnelle'}`,
    heroSubtitle: `Expert ${lead.sector || 'professionnel'}${city ? ` à ${city}` : ''}`,
    heroDescription: lead.description || `Découvrez notre expertise ${lead.sector || 'professionnelle'} et notre engagement qualité pour vous offrir un service exceptionnel.`,
    aboutText: lead.description || `Fièrement ${lead.sector || 'professionnel'}${city ? ` basé à ${city}` : ''}, nous combinons savoir-faire traditionnel et innovation moderne pour vous offrir des prestations d'excellence. Notre équipe passionnée met tout en œuvre pour dépasser vos attentes.`,
    services: sectorData.services,
    testimonials: (lead.googleReviewsData || []).slice(0, 6).map(r => ({
      author: safeStr(r.author),
      text: safeStr(r.text),
      rating: r.rating || 5,
      date: safeStr(r.date),
      role: 'Client satisfait'
    })),
    gallery: getProfessionalImages(sector).map((url, index) => ({
      url,
      title: `Réalisation ${index + 1}`,
      category: lead.sector || 'Professionnel'
    })),
    achievements: sectorData.achievements,
    cta: {
      primary: 'Prendre Rendez-vous',
      secondary: 'Nous Contacter'
    },
    contact: {
      title: 'Contactez-nous',
      subtitle: 'Notre équipe est à votre disposition pour répondre à toutes vos questions'
    }
  };
}

// ════════════════════════════════════════════════════════════
// GÉNÉRATEUR PRINCIPAL - TEMPLATE MODERNE UNIFIÉ
// ════════════════════════════════════════════════════════════

export function generateModernProfessionalSite(lead: Lead): string {
  const designSystem = getDesignSystem(lead.sector);
  const content = generateModernContent(lead);
  const name = safeStr(lead.name);
  const phone = safeStr(lead.phone);
  const email = safeStr(lead.email);
  const address = safeStr(lead.address);
  const city = safeStr(lead.city);
  const sector = safeStr(lead.sector) || 'Professionnel';
  
  const whatsappNumber = phone.replace(/[^0-9+]/g, '');
  
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name} - ${sector}${city ? ' à ' + city : ''}</title>
    <meta name="description" content="${content.heroDescription.substring(0, 160)}">
    <meta name="keywords" content="${sector}, ${city || 'France'}, ${name}, professionnel, expertise">
    <meta name="author" content="${name}">
    
    <!-- Open Graph -->
    <meta property="og:title" content="${name} - ${sector}">
    <meta property="og:description" content="${content.heroDescription}">
    <meta property="og:type" content="website">
    <meta property="og:image" content="${content.gallery[0]?.url || ''}">
    
    <!-- Preconnect -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=${designSystem.typography.fontFamily.serif[0].replace(' ', '+')}:wght@400;600;700&display=swap" rel="stylesheet">
    
    <style>
        :root {
            --color-primary: ${designSystem.colors.primary};
            --color-secondary: ${designSystem.colors.secondary};
            --color-accent: ${designSystem.colors.accent};
            --color-neutral-50: ${designSystem.colors.neutral[50]};
            --color-neutral-100: ${designSystem.colors.neutral[100]};
            --color-neutral-200: ${designSystem.colors.neutral[200]};
            --color-neutral-300: ${designSystem.colors.neutral[300]};
            --color-neutral-400: ${designSystem.colors.neutral[400]};
            --color-neutral-500: ${designSystem.colors.neutral[500]};
            --color-neutral-600: ${designSystem.colors.neutral[600]};
            --color-neutral-700: ${designSystem.colors.neutral[700]};
            --color-neutral-800: ${designSystem.colors.neutral[800]};
            --color-neutral-900: ${designSystem.colors.neutral[900]};
            --color-success: ${designSystem.colors.success};
            --color-warning: ${designSystem.colors.warning};
            --color-error: ${designSystem.colors.error};
            
            --font-sans: ${designSystem.typography.fontFamily.sans.join(', ')};
            --font-serif: ${designSystem.typography.fontFamily.serif.join(', ')};
            --font-mono: ${designSystem.typography.fontFamily.mono.join(', ')};
            
            --text-xs: ${designSystem.typography.fontSize.xs};
            --text-sm: ${designSystem.typography.fontSize.sm};
            --text-base: ${designSystem.typography.fontSize.base};
            --text-lg: ${designSystem.typography.fontSize.lg};
            --text-xl: ${designSystem.typography.fontSize.xl};
            --text-2xl: ${designSystem.typography.fontSize['2xl']};
            --text-3xl: ${designSystem.typography.fontSize['3xl']};
            --text-4xl: ${designSystem.typography.fontSize['4xl']};
            --text-5xl: ${designSystem.typography.fontSize['5xl']};
            
            --font-light: ${designSystem.typography.fontWeight.light};
            --font-normal: ${designSystem.typography.fontWeight.normal};
            --font-medium: ${designSystem.typography.fontWeight.medium};
            --font-semibold: ${designSystem.typography.fontWeight.semibold};
            --font-bold: ${designSystem.typography.fontWeight.bold};
            --font-extrabold: ${designSystem.typography.fontWeight.extrabold};
            
            --spacing-xs: ${designSystem.spacing.xs};
            --spacing-sm: ${designSystem.spacing.sm};
            --spacing-md: ${designSystem.spacing.md};
            --spacing-lg: ${designSystem.spacing.lg};
            --spacing-xl: ${designSystem.spacing.xl};
            --spacing-2xl: ${designSystem.spacing['2xl']};
            --spacing-3xl: ${designSystem.spacing['3xl']};
            --spacing-4xl: ${designSystem.spacing['4xl']};
            
            --radius-none: ${designSystem.borderRadius.none};
            --radius-sm: ${designSystem.borderRadius.sm};
            --radius-md: ${designSystem.borderRadius.md};
            --radius-lg: ${designSystem.borderRadius.lg};
            --radius-xl: ${designSystem.borderRadius.xl};
            --radius-full: ${designSystem.borderRadius.full};
            
            --shadow-sm: ${designSystem.shadows.sm};
            --shadow-md: ${designSystem.shadows.md};
            --shadow-lg: ${designSystem.shadows.lg};
            --shadow-xl: ${designSystem.shadows.xl};
            --shadow-2xl: ${designSystem.shadows['2xl']};
            
            --duration-fast: ${designSystem.animations.duration.fast};
            --duration-normal: ${designSystem.animations.duration.normal};
            --duration-slow: ${designSystem.animations.duration.slow};
            
            --ease: ${designSystem.animations.easing.ease};
            --ease-in: ${designSystem.animations.easing.easeIn};
            --ease-out: ${designSystem.animations.easing.easeOut};
            --ease-in-out: ${designSystem.animations.easing.easeInOut};
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
            font-family: var(--font-sans);
            font-size: var(--text-base);
            line-height: 1.6;
            color: var(--color-neutral-800);
            background: var(--color-neutral-50);
            overflow-x: hidden;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 var(--spacing-lg);
        }
        
        /* Navigation */
        .navbar {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid var(--color-neutral-200);
            z-index: 1000;
            transition: all var(--duration-normal) var(--ease);
        }
        
        .navbar-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: var(--spacing-md) var(--spacing-lg);
        }
        
        .navbar-brand {
            display: flex;
            align-items: center;
            gap: var(--spacing-md);
            text-decoration: none;
            color: var(--color-neutral-900);
            font-weight: var(--font-bold);
            font-size: var(--text-xl);
        }
        
        .navbar-brand-icon {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
            border-radius: var(--radius-lg);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: var(--font-bold);
            font-size: var(--text-lg);
        }
        
        .navbar-menu {
            display: flex;
            list-style: none;
            gap: var(--spacing-xl);
        }
        
        .navbar-menu a {
            text-decoration: none;
            color: var(--color-neutral-600);
            font-weight: var(--font-medium);
            transition: color var(--duration-normal) var(--ease);
            position: relative;
        }
        
        .navbar-menu a:hover {
            color: var(--color-primary);
        }
        
        .navbar-menu a::after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 0;
            height: 2px;
            background: var(--color-primary);
            transition: width var(--duration-normal) var(--ease);
        }
        
        .navbar-menu a:hover::after {
            width: 100%;
        }
        
        .navbar-cta {
            background: var(--color-primary);
            color: white;
            padding: var(--spacing-sm) var(--spacing-lg);
            border-radius: var(--radius-lg);
            text-decoration: none;
            font-weight: var(--font-semibold);
            transition: all var(--duration-normal) var(--ease);
        }
        
        .navbar-cta:hover {
            background: var(--color-secondary);
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
        }
        
        /* Mobile Menu */
        .mobile-menu-toggle {
            display: none;
            background: none;
            border: none;
            cursor: pointer;
            padding: var(--spacing-sm);
        }
        
        .mobile-menu-toggle span {
            display: block;
            width: 24px;
            height: 2px;
            background: var(--color-neutral-800);
            margin: 4px 0;
            transition: all var(--duration-normal) var(--ease);
        }
        
        /* Hero Section */
        .hero {
            padding: calc(100px + var(--spacing-4xl)) 0 var(--spacing-4xl);
            background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
            color: white;
            position: relative;
            overflow: hidden;
        }
        
        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('${content.gallery[0]?.url || ''}') center/cover;
            opacity: 0.1;
            z-index: 0;
        }
        
        .hero-container {
            position: relative;
            z-index: 1;
            text-align: center;
        }
        
        .hero-title {
            font-family: var(--font-serif);
            font-size: var(--text-5xl);
            font-weight: var(--font-extrabold);
            margin-bottom: var(--spacing-xl);
            line-height: 1.1;
            animation: fadeInUp 1s var(--ease-out);
        }
        
        .hero-subtitle {
            font-size: var(--text-2xl);
            font-weight: var(--font-medium);
            margin-bottom: var(--spacing-xl);
            opacity: 0.9;
            animation: fadeInUp 1s var(--ease-out) 0.2s both;
        }
        
        .hero-description {
            font-size: var(--text-lg);
            max-width: 600px;
            margin: 0 auto var(--spacing-2xl);
            opacity: 0.8;
            animation: fadeInUp 1s var(--ease-out) 0.4s both;
        }
        
        .hero-buttons {
            display: flex;
            gap: var(--spacing-lg);
            justify-content: center;
            flex-wrap: wrap;
            animation: fadeInUp 1s var(--ease-out) 0.6s both;
        }
        
        .btn {
            padding: var(--spacing-md) var(--spacing-xl);
            border-radius: var(--radius-lg);
            text-decoration: none;
            font-weight: var(--font-semibold);
            transition: all var(--duration-normal) var(--ease);
            display: inline-flex;
            align-items: center;
            gap: var(--spacing-sm);
            cursor: pointer;
            border: none;
            font-size: var(--text-base);
        }
        
        .btn-primary {
            background: white;
            color: var(--color-primary);
        }
        
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-xl);
        }
        
        .btn-secondary {
            background: transparent;
            color: white;
            border: 2px solid white;
        }
        
        .btn-secondary:hover {
            background: white;
            color: var(--color-primary);
            transform: translateY(-2px);
        }
        
        /* Achievements Section */
        .achievements {
            padding: var(--spacing-4xl) 0;
            background: white;
        }
        
        .achievements-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: var(--spacing-xl);
            text-align: center;
        }
        
        .achievement-item {
            text-align: center;
        }
        
        .achievement-number {
            font-size: var(--text-4xl);
            font-weight: var(--font-extrabold);
            color: var(--color-primary);
            margin-bottom: var(--spacing-sm);
        }
        
        .achievement-label {
            font-size: var(--text-sm);
            color: var(--color-neutral-600);
            font-weight: var(--font-medium);
        }
        
        /* Services Section */
        .services {
            padding: var(--spacing-4xl) 0;
            background: var(--color-neutral-50);
        }
        
        .section-header {
            text-align: center;
            margin-bottom: var(--spacing-4xl);
        }
        
        .section-title {
            font-family: var(--font-serif);
            font-size: var(--text-4xl);
            font-weight: var(--font-extrabold);
            color: var(--color-neutral-900);
            margin-bottom: var(--spacing-lg);
        }
        
        .section-subtitle {
            font-size: var(--text-lg);
            color: var(--color-neutral-600);
            max-width: 600px;
            margin: 0 auto;
        }
        
        .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: var(--spacing-xl);
        }
        
        .service-card {
            background: white;
            padding: var(--spacing-2xl);
            border-radius: var(--radius-xl);
            box-shadow: var(--shadow-md);
            transition: all var(--duration-normal) var(--ease);
            position: relative;
            overflow: hidden;
        }
        
        .service-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
        }
        
        .service-card:hover {
            transform: translateY(-8px);
            box-shadow: var(--shadow-2xl);
        }
        
        .service-icon {
            font-size: 3rem;
            margin-bottom: var(--spacing-lg);
        }
        
        .service-title {
            font-size: var(--text-xl);
            font-weight: var(--font-bold);
            color: var(--color-neutral-900);
            margin-bottom: var(--spacing-md);
        }
        
        .service-description {
            color: var(--color-neutral-600);
            margin-bottom: var(--spacing-lg);
            line-height: 1.6;
        }
        
        .service-features {
            list-style: none;
        }
        
        .service-features li {
            padding: var(--spacing-xs) 0;
            color: var(--color-neutral-600);
            position: relative;
            padding-left: var(--spacing-lg);
        }
        
        .service-features li::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: var(--color-success);
            font-weight: var(--font-bold);
        }
        
        /* Gallery Section */
        .gallery {
            padding: var(--spacing-4xl) 0;
            background: white;
        }
        
        .gallery-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: var(--spacing-lg);
        }
        
        .gallery-item {
            position: relative;
            border-radius: var(--radius-xl);
            overflow: hidden;
            aspect-ratio: 16/10;
            cursor: pointer;
            transition: all var(--duration-normal) var(--ease);
        }
        
        .gallery-item:hover {
            transform: scale(1.02);
            box-shadow: var(--shadow-2xl);
        }
        
        .gallery-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .gallery-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
            color: white;
            padding: var(--spacing-lg);
            transform: translateY(100%);
            transition: transform var(--duration-normal) var(--ease);
        }
        
        .gallery-item:hover .gallery-overlay {
            transform: translateY(0);
        }
        
        /* Testimonials Section */
        .testimonials {
            padding: var(--spacing-4xl) 0;
            background: var(--color-neutral-50);
        }
        
        .testimonials-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: var(--spacing-xl);
        }
        
        .testimonial-card {
            background: white;
            padding: var(--spacing-2xl);
            border-radius: var(--radius-xl);
            box-shadow: var(--shadow-md);
            position: relative;
        }
        
        .testimonial-card::before {
            content: '"';
            position: absolute;
            top: var(--spacing-lg);
            left: var(--spacing-lg);
            font-size: 4rem;
            color: var(--color-primary);
            opacity: 0.1;
            font-family: var(--font-serif);
        }
        
        .testimonial-text {
            font-style: italic;
            margin-bottom: var(--spacing-lg);
            color: var(--color-neutral-700);
            line-height: 1.6;
            position: relative;
            z-index: 1;
        }
        
        .testimonial-author {
            display: flex;
            align-items: center;
            gap: var(--spacing-md);
        }
        
        .testimonial-avatar {
            width: 50px;
            height: 50px;
            border-radius: var(--radius-full);
            background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: var(--font-bold);
        }
        
        .testimonial-info {
            flex: 1;
        }
        
        .testimonial-name {
            font-weight: var(--font-semibold);
            color: var(--color-neutral-900);
        }
        
        .testimonial-role {
            font-size: var(--text-sm);
            color: var(--color-neutral-600);
        }
        
        .testimonial-rating {
            color: var(--color-warning);
            margin-top: var(--spacing-xs);
        }
        
        /* Contact Section */
        .contact {
            padding: var(--spacing-4xl) 0;
            background: white;
        }
        
        .contact-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--spacing-4xl);
            align-items: start;
        }
        
        .contact-info {
            padding: var(--spacing-2xl);
        }
        
        .contact-item {
            display: flex;
            align-items: center;
            gap: var(--spacing-lg);
            margin-bottom: var(--spacing-xl);
            padding: var(--spacing-lg);
            background: var(--color-neutral-50);
            border-radius: var(--radius-lg);
            transition: all var(--duration-normal) var(--ease);
        }
        
        .contact-item:hover {
            background: var(--color-primary);
            color: white;
            transform: translateX(8px);
        }
        
        .contact-icon {
            width: 50px;
            height: 50px;
            background: var(--color-primary);
            border-radius: var(--radius-lg);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: var(--text-xl);
        }
        
        .contact-item:hover .contact-icon {
            background: white;
            color: var(--color-primary);
        }
        
        .contact-details h3 {
            font-size: var(--text-lg);
            font-weight: var(--font-semibold);
            margin-bottom: var(--spacing-xs);
        }
        
        .contact-details p {
            color: var(--color-neutral-600);
        }
        
        .contact-item:hover .contact-details p {
            color: rgba(255, 255, 255, 0.9);
        }
        
        .contact-form {
            background: var(--color-neutral-50);
            padding: var(--spacing-2xl);
            border-radius: var(--radius-xl);
        }
        
        .form-group {
            margin-bottom: var(--spacing-lg);
        }
        
        .form-label {
            display: block;
            margin-bottom: var(--spacing-sm);
            font-weight: var(--font-medium);
            color: var(--color-neutral-700);
        }
        
        .form-input,
        .form-textarea {
            width: 100%;
            padding: var(--spacing-md);
            border: 2px solid var(--color-neutral-200);
            border-radius: var(--radius-lg);
            font-size: var(--text-base);
            transition: all var(--duration-normal) var(--ease);
            background: white;
        }
        
        .form-input:focus,
        .form-textarea:focus {
            outline: none;
            border-color: var(--color-primary);
            box-shadow: 0 0 0 3px rgba(0,0,0,0.1);
        }
        
        .form-textarea {
            resize: vertical;
            min-height: 120px;
        }
        
        .form-submit {
            width: 100%;
            background: var(--color-primary);
            color: white;
            padding: var(--spacing-md) var(--spacing-xl);
            border: none;
            border-radius: var(--radius-lg);
            font-size: var(--text-base);
            font-weight: var(--font-semibold);
            cursor: pointer;
            transition: all var(--duration-normal) var(--ease);
        }
        
        .form-submit:hover {
            background: var(--color-secondary);
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
        }
        
        /* WhatsApp Button */
        .whatsapp-float {
            position: fixed;
            bottom: var(--spacing-xl);
            right: var(--spacing-xl);
            background: #25D366;
            color: white;
            width: 60px;
            height: 60px;
            border-radius: var(--radius-full);
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            font-size: 1.5rem;
            box-shadow: var(--shadow-lg);
            transition: all var(--duration-normal) var(--ease);
            z-index: 1000;
        }
        
        .whatsapp-float:hover {
            transform: scale(1.1);
            box-shadow: var(--shadow-2xl);
        }
        
        /* Footer */
        .footer {
            background: var(--color-neutral-900);
            color: white;
            padding: var(--spacing-4xl) 0 var(--spacing-xl);
        }
        
        .footer-content {
            display: grid;
            grid-template-columns: 2fr 1fr 1fr 1fr;
            gap: var(--spacing-4xl);
            margin-bottom: var(--spacing-2xl);
        }
        
        .footer-brand h3 {
            font-size: var(--text-2xl);
            font-weight: var(--font-bold);
            margin-bottom: var(--spacing-md);
        }
        
        .footer-brand p {
            color: var(--color-neutral-400);
            line-height: 1.6;
            margin-bottom: var(--spacing-lg);
        }
        
        .footer-links h4 {
            font-size: var(--text-lg);
            font-weight: var(--font-semibold);
            margin-bottom: var(--spacing-lg);
        }
        
        .footer-links ul {
            list-style: none;
        }
        
        .footer-links li {
            margin-bottom: var(--spacing-md);
        }
        
        .footer-links a {
            color: var(--color-neutral-400);
            text-decoration: none;
            transition: color var(--duration-normal) var(--ease);
        }
        
        .footer-links a:hover {
            color: white;
        }
        
        .footer-bottom {
            border-top: 1px solid var(--color-neutral-800);
            padding-top: var(--spacing-xl);
            text-align: center;
            color: var(--color-neutral-400);
        }
        
        /* Animations */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
            .navbar-menu {
                display: none;
            }
            
            .mobile-menu-toggle {
                display: block;
            }
            
            .hero-title {
                font-size: var(--text-3xl);
            }
            
            .hero-subtitle {
                font-size: var(--text-xl);
            }
            
            .hero-buttons {
                flex-direction: column;
                align-items: center;
            }
            
            .contact-container {
                grid-template-columns: 1fr;
            }
            
            .footer-content {
                grid-template-columns: 1fr;
                text-align: center;
            }
            
            .achievements-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar">
        <div class="navbar-container">
            <a href="#home" class="navbar-brand">
                <div class="navbar-brand-icon">${name.substring(0, 2).toUpperCase()}</div>
                <span>${name}</span>
            </a>
            
            <ul class="navbar-menu">
                <li><a href="#home">Accueil</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#gallery">Réalisations</a></li>
                <li><a href="#testimonials">Témoignages</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
            
            <a href="#contact" class="navbar-cta">${content.cta.primary}</a>
            
            <button class="mobile-menu-toggle">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero" id="home">
        <div class="container hero-container">
            <h1 class="hero-title">${content.heroTitle}</h1>
            <p class="hero-subtitle">${content.heroSubtitle}</p>
            <p class="hero-description">${content.heroDescription}</p>
            <div class="hero-buttons">
                <a href="#contact" class="btn btn-primary">${content.cta.primary}</a>
                <a href="#services" class="btn btn-secondary">Découvrir nos services</a>
            </div>
        </div>
    </section>

    <!-- Achievements Section -->
    <section class="achievements">
        <div class="container">
            <div class="achievements-grid">
                ${content.achievements?.map(achievement => `
                    <div class="achievement-item">
                        <div class="achievement-number">${achievement.number}</div>
                        <div class="achievement-label">${achievement.label}</div>
                    </div>
                `).join('') || ''}
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section class="services" id="services">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">Nos Services</h2>
                <p class="section-subtitle">Des solutions sur mesure adaptées à vos besoins spécifiques</p>
            </div>
            <div class="services-grid">
                ${content.services.map(service => `
                    <div class="service-card">
                        <div class="service-icon">${service.icon}</div>
                        <h3 class="service-title">${service.name}</h3>
                        <p class="service-description">${service.description}</p>
                        ${service.features ? `
                            <ul class="service-features">
                                ${service.features.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- Gallery Section -->
    <section class="gallery" id="gallery">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">Nos Réalisations</h2>
                <p class="section-subtitle">Un aperçu de notre expertise et de notre savoir-faire</p>
            </div>
            <div class="gallery-grid">
                ${content.gallery.map(item => `
                    <div class="gallery-item">
                        <img src="${item.url}" alt="${item.title}" loading="lazy">
                        <div class="gallery-overlay">
                            <h4>${item.title}</h4>
                            <p>${item.category}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials" id="testimonials">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">Témoignages Clients</h2>
                <p class="section-subtitle">Ce que nos clients pensent de nos services</p>
            </div>
            <div class="testimonials-grid">
                ${content.testimonials.map(testimonial => `
                    <div class="testimonial-card">
                        <p class="testimonial-text">"${testimonial.text}"</p>
                        <div class="testimonial-author">
                            <div class="testimonial-avatar">${testimonial.author.charAt(0).toUpperCase()}</div>
                            <div class="testimonial-info">
                                <div class="testimonial-name">${testimonial.author}</div>
                                <div class="testimonial-role">${testimonial.role || 'Client'}</div>
                                <div class="testimonial-rating">${'★'.repeat(testimonial.rating)}${'☆'.repeat(5 - testimonial.rating)}</div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section class="contact" id="contact">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">${content.contact.title}</h2>
                <p class="section-subtitle">${content.contact.subtitle}</p>
            </div>
            <div class="contact-container">
                <div class="contact-info">
                    ${phone ? `
                        <div class="contact-item">
                            <div class="contact-icon">📞</div>
                            <div class="contact-details">
                                <h3>Téléphone</h3>
                                <p><a href="tel:${phone}" style="color: inherit; text-decoration: none;">${phone}</a></p>
                            </div>
                        </div>
                    ` : ''}
                    ${email ? `
                        <div class="contact-item">
                            <div class="contact-icon">✉️</div>
                            <div class="contact-details">
                                <h3>Email</h3>
                                <p><a href="mailto:${email}" style="color: inherit; text-decoration: none;">${email}</a></p>
                            </div>
                        </div>
                    ` : ''}
                    ${address ? `
                        <div class="contact-item">
                            <div class="contact-icon">📍</div>
                            <div class="contact-details">
                                <h3>Adresse</h3>
                                <p>${address}</p>
                            </div>
                        </div>
                    ` : ''}
                    <div class="contact-item">
                        <div class="contact-icon">🕐</div>
                        <div class="contact-details">
                            <h3>Horaires</h3>
                            <p>Lundi - Vendredi: 9h - 18h<br>Samedi: 9h - 12h</p>
                        </div>
                    </div>
                </div>
                
                <div class="contact-form">
                    <form id="contactForm">
                        <div class="form-group">
                            <label class="form-label" for="name">Nom complet</label>
                            <input type="text" id="name" name="name" class="form-input" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="email">Email</label>
                            <input type="email" id="email" name="email" class="form-input" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="phone">Téléphone</label>
                            <input type="tel" id="phone" name="phone" class="form-input">
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="message">Message</label>
                            <textarea id="message" name="message" class="form-textarea" required></textarea>
                        </div>
                        <button type="submit" class="form-submit">Envoyer le message</button>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <!-- WhatsApp Button -->
    ${whatsappNumber ? `
        <a href="https://wa.me/${whatsappNumber}" class="whatsapp-float" target="_blank">
            💬
        </a>
    ` : ''}

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-brand">
                    <h3>${name}</h3>
                    <p>${content.heroDescription}</p>
                </div>
                <div class="footer-links">
                    <h4>Services</h4>
                    <ul>
                        <li><a href="#services">Consultation</a></li>
                        <li><a href="#services">Services Premium</a></li>
                        <li><a href="#services">Support</a></li>
                    </ul>
                </div>
                <div class="footer-links">
                    <h4>Entreprise</h4>
                    <ul>
                        <li><a href="#about">À propos</a></li>
                        <li><a href="#testimonials">Témoignages</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </div>
                <div class="footer-links">
                    <h4>Légal</h4>
                    <ul>
                        <li><a href="#mentions">Mentions légales</a></li>
                        <li><a href="#privacy">Politique de confidentialité</a></li>
                        <li><a href="#cgv">CGV</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; ${new Date().getFullYear()} ${name}. Tous droits réservés.</p>
            </div>
        </div>
    </footer>

    <script>
        // Smooth scrolling for navigation links
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
            });
        });

        // Form submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send to your backend
            // For now, we'll just show a success message
            alert('Merci pour votre message! Nous vous contacterons rapidement.');
            this.reset();
        });

        // Mobile menu toggle
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const navbarMenu = document.querySelector('.navbar-menu');
        
        mobileMenuToggle.addEventListener('click', function() {
            navbarMenu.style.display = navbarMenu.style.display === 'flex' ? 'none' : 'flex';
            navbarMenu.style.position = 'absolute';
            navbarMenu.style.top = '100%';
            navbarMenu.style.left = '0';
            navbarMenu.style.right = '0';
            navbarMenu.style.background = 'white';
            navbarMenu.style.flexDirection = 'column';
            navbarMenu.style.padding = 'var(--spacing-lg)';
            navbarMenu.style.boxShadow = 'var(--shadow-lg)';
        });

        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = 'var(--shadow-md)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out both';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.service-card, .testimonial-card, .achievement-item').forEach(el => {
            observer.observe(el);
        });
    </script>
</body>
</html>`;
}

// ════════════════════════════════════════════════════════════
// VALIDATION ET SÉCURITÉ
// ════════════════════════════════════════════════════════════

export function validateModernSite(html: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Validation de structure HTML
    if (!html.includes('<!DOCTYPE html>')) {
        errors.push('DOCTYPE manquant');
    }
    
    if (!html.includes('<head>') || !html.includes('</head>')) {
        errors.push('Balises head manquantes');
    }
    
    if (!html.includes('<body>') || !html.includes('</body>')) {
        errors.push('Balises body manquantes');
    }
    
    // Validation de contenu obligatoire
    const requiredSections = ['hero', 'services', 'contact'];
    requiredSections.forEach(section => {
        if (!html.includes(section)) {
            errors.push(`Section ${section} manquante`);
        }
    });
    
    // Validation de sécurité
    const dangerousPatterns = [
        /<script[^>]*src[^>]*>/gi,
        /javascript:/gi,
        /on\w+\s*=/gi,
        /<iframe/gi,
        /<object/gi,
        /<embed/gi
    ];
    
    dangerousPatterns.forEach(pattern => {
        if (pattern.test(html)) {
            errors.push('Contenu potentiellement dangereux détecté');
        }
    });
    
    // Validation de performance
    if (html.length > 500000) {
        errors.push('HTML trop volumineux (>500KB)');
    }
    
    const imgCount = (html.match(/<img/g) || []).length;
    if (imgCount > 20) {
        errors.push('Trop d\'images (>20)');
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
}

// ════════════════════════════════════════════════════════════
// UTILITAIRES
// ════════════════════════════════════════════════════════════

export function getModernSiteMetadata(lead: Lead) {
  return {
    title: `${lead.name} - ${lead.sector || 'Professionnel'}`,
    description: lead.description || `Expert ${lead.sector || 'professionnel'}${lead.city ? ` à ${lead.city}` : ''}`,
    keywords: [lead.sector, lead.city, lead.name, 'professionnel', 'expertise'].filter(Boolean).join(', '),
    author: lead.name,
    image: getProfessionalImages(lead.sector)[0]
  };
}
