// ============================================================
// LeadForge AI — Nouveau Site Web Professionnel v5.0
// Architecture moderne avec design ultra-professionnel
// Bootstrap 5 + Bootstrap Icons + Animate.css + Google Fonts
// ============================================================
import { Lead, safeStr, proxyImg } from "./supabase-store";

interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  services: Array<{ name: string; description: string; icon?: string }>;
  cta: string;
  testimonials: Array<{
    author: string;
    text: string;
    rating: number;
    date: string;
  }>;
  galleryTitle?: string;
  aboutTitle?: string;
  servicesTitle?: string;
  contactTitle?: string;
  whyChooseUs?: string[];
}

// ══════════════════════════════════════════════════════════════
// NOUVELLES PALETTES PROFESSIONNELLES ULTRA-MODERNES
// ══════════════════════════════════════════════════════════════
interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  neutral: string;
  primaryRgb: string;
  dark: string;
  light: string;
  gradient: string;
  heroOverlay: string;
}

const PROFESSIONAL_SCHEMES: Record<string, ColorScheme> = {
  "executive-red": {
    primary: "#dc2626",
    secondary: "#991b1b", 
    accent: "#ef4444",
    neutral: "#f8fafc",
    primaryRgb: "220,38,38",
    dark: "#0f172a",
    light: "#ffffff",
    gradient: "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",
    heroOverlay: "rgba(15,23,42,0.9)"
  },
  "corporate-blue": {
    primary: "#1e40af",
    secondary: "#1e3a8a",
    accent: "#3b82f6", 
    neutral: "#f8fafc",
    primaryRgb: "30,64,175",
    dark: "#0f172a",
    light: "#ffffff",
    gradient: "linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)",
    heroOverlay: "rgba(15,23,42,0.9)"
  },
  "modern-black": {
    primary: "#000000",
    secondary: "#374151",
    accent: "#6b7280",
    neutral: "#f8fafc", 
    primaryRgb: "0,0,0",
    dark: "#000000",
    light: "#ffffff",
    gradient: "linear-gradient(135deg, #000000 0%, #374151 100%)",
    heroOverlay: "rgba(0,0,0,0.9)"
  },
  "luxury-white": {
    primary: "#ffffff",
    secondary: "#e5e7eb",
    accent: "#9ca3af",
    neutral: "#1f2937",
    primaryRgb: "255,255,255",
    dark: "#111827", 
    light: "#ffffff",
    gradient: "linear-gradient(135deg, #ffffff 0%, #e5e7eb 100%)",
    heroOverlay: "rgba(17,24,39,0.9)"
  }
};

// ══════════════════════════════════════════════════════════════
// IMAGES PROFESSIONNELLES CURATED
// ══════════════════════════════════════════════════════════════
const PROFESSIONAL_IMAGES: Record<string, string[]> = {
  business: [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&fit=crop&q=85",
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&fit=crop&q=85",
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&fit=crop&q=85"
  ],
  restaurant: [
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&fit=crop&q=85",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&fit=crop&q=85",
    "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1200&fit=crop&q=85"
  ],
  beauty: [
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&fit=crop&q=85",
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&fit=crop&q=85",
    "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=1200&fit=crop&q=85"
  ],
  medical: [
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&fit=crop&q=85",
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1200&fit=crop&q=85",
    "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1200&fit=crop&q=85"
  ],
  default: [
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&fit=crop&q=85",
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&fit=crop&q=85",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&fit=crop&q=85"
  ]
};

// ══════════════════════════════════════════════════════════════
// FONCTIONS UTILITAIRES AVANCÉES
// ══════════════════════════════════════════════════════════════

// 🎯 Fonction pour obtenir le nom formaté (2 mots max sans articles)
const getFormattedName = (fullName: string): string => {
  const skip = ['le', 'la', 'les', 'de', 'du', 'des', 'l\'', 'à', 'a', 'd\'', 'au', 'aux', 'par', 'pour', 'avec', 'et', 'ou', 'ni', 'mais', 'donc', 'or', 'ni', 'car'];
  const words = fullName.trim().split(/\s+/).filter(w => !skip.includes(w.toLowerCase()));
  return words.slice(0, 2).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
};

// 🎯 Fonction pour générer des horaires d'ouverture selon le secteur
const generateOpeningHours = (sector: string): string => {
  const s = (sector || "").toLowerCase();
  
  if (s.includes("restaurant") || s.includes("café")) {
    return "Lun-Ven: 11h30-14h30 / 18h30-22h30 | Sam-Dim: 12h00-23h00";
  }
  if (s.includes("coiffeur") || s.includes("salon")) {
    return "Lun-Ven: 09h00-19h00 | Sam: 08h00-18h00 | Dim: Fermé";
  }
  if (s.includes("médec") || s.includes("clinique")) {
    return "Lun-Ven: 08h00-18h00 | Sam: 09h00-12h00 | Dim: Fermé";
  }
  
  return "Lun-Ven: 09h00-18h00 | Sam: 09h00-12h00 | Dim: Fermé";
};

// 🎯 Fonction pour générer le contenu enrichi selon le secteur
const generateRichContent = (lead: Lead): SiteContent => {
  const sector = (lead.sector || "").toLowerCase();
  const formattedName = getFormattedName(lead.name);
  
  const heroTitles = {
    restaurant: ["Excellence Culinaire", "Saveurs Authentiques", "Tradition & Innovation", "Gastronomie Locale"],
    beauty: ["Beauté & Élégance", "Expertise Beauté", "Soin Premium", "Art du Bien-être"],
    medical: ["Santé & Confiance", "Excellence Médicale", "Soins Expert", "Médecine de Pointe"],
    business: ["Expertise Professionnelle", "Solutions Innovantes", "Service Premium", "Excellence Garantie"],
    default: ["Excellence Professionnelle", "Expertise Garantie", "Qualité Suprême", "Service Exceptionnel"]
  };
  
  const getHeroTitle = () => {
    for (const [key, titles] of Object.entries(heroTitles)) {
      if (sector.includes(key)) {
        return titles[Math.floor(Math.random() * titles.length)];
      }
    }
    return heroTitles.default[Math.floor(Math.random() * heroTitles.default.length)];
  };
  
  const servicesBySector = {
    restaurant: [
      { name: "Cuisine Traditionnelle", description: "Plats authentiques préparés avec des produits locaux et frais" },
      { name: "Menu Dégustation", description: "Une expérience gastronomique unique avec nos créations du chef" },
      { name: "Vins Sélectionnés", description: "Une carte de vins raffinée pour accompagner vos repas" },
      { name: "Service Traiteur", description: "Organisation d'événements privés et professionnels sur mesure" },
      { name: "Brunch du Dimanche", description: "Moment convivial avec buffet et boissons à volonté" },
      { name: "Cocktails & Apéritifs", description: "Créations originales et classiques dans une ambiance chic" }
    ],
    beauty: [
      { name: "Soins du Visage", description: "Traitements personnalisés pour une peau éclatante et saine" },
      { name: "Coiffure Créative", description: "Coupe, coloration et mise en forme selon vos désirs" },
      { name: "Manucure & Pédicure", description: "Soin complet des mains et pieds avec vernis de qualité" },
      { name: "Massage Relaxant", description: "Techniques de massage pour détente et bien-être total" },
      { name: "Épilation Professionnelle", description: "Épilation douce et durable avec techniques avancées" },
      { name: "Maquillage Artistique", description: "Maquillage pour occasions spéciales et cours individuels" }
    ],
    medical: [
      { name: "Consultations Générales", description: "Diagnostic et suivi médical personnalisé" },
      { name: "Examens Complémentaires", description: "Analyses et imagerie médicale de pointe" },
      { name: "Vaccinations", description: "Calendrier vaccinal complet pour toute la famille" },
      { name: "Médecine Préventive", description: "Bilans de santé et conseils préventifs personnalisés" },
      { name: "Télémédecine", description: "Consultations à distance pour votre commodité" },
      { name: "Urgences", description: "Prise en charge rapide des situations médicales urgentes" }
    ],
    default: [
      { name: "Service Premium", description: "Une expérience haut de gamme adaptée à vos besoins spécifiques" },
      { name: "Expertise Locale", description: "Une connaissance approfondie du marché et des attentes locales" },
      { name: "Support Continu", description: "Un accompagnement personnalisé à chaque étape" },
      { name: "Innovation", description: "Solutions modernes et technologies de pointe" },
      { name: "Qualité Garantie", description: "Standards élevés et contrôle qualité rigoureux" },
      { name: "Service Client", description: "Réactivité et disponibilité pour votre satisfaction" }
    ]
  };
  
  const getServices = () => {
    for (const [key, services] of Object.entries(servicesBySector)) {
      if (sector.includes(key)) {
        return services;
      }
    }
    return servicesBySector.default;
  };
  
  return {
    heroTitle: getHeroTitle(),
    heroSubtitle: `Découvrez l'excellence chez ${formattedName} - ${lead.city || 'France'}`,
    aboutText: `Chez ${formattedName}, nous combinons expertise et passion pour vous offrir des services exceptionnels. Notre engagement envers la qualité et la satisfaction client fait notre réputation dans la région de ${lead.city || 'France'}. Forts de notre expérience et de notre connaissance du marché local, nous mettons tout en œuvre pour dépasser vos attentes et vous proposer des solutions sur mesure adaptées à vos besoins spécifiques.`,
    services: getServices(),
    cta: "Contactez-nous dès maintenant",
    testimonials: [
      {
        author: "Client Satisfait",
        text: "Service exceptionnel et professionnel. Je recommande vivement ! L'équipe est à l'écoute et les résultats sont parfaits.",
        rating: 5,
        date: "2024"
      },
      {
        author: "Client Fidèle", 
        text: "Une expertise remarquable et un service impeccable. Je fais confiance à ${formattedName} depuis plusieurs années.",
        rating: 5,
        date: "2024"
      },
      {
        author: "Client Ravi",
        text: "Dépassé toutes mes attentes. Vraiment professionnel ! Je reviendrai sans hésiter.",
        rating: 5,
        date: "2024"
      },
      {
        author: "Nouveau Client",
        text: "Découverte par hasard et quelle belle surprise ! Service au top et résultats excellents.",
        rating: 5,
        date: "2024"
      },
      {
        author: "Client Régulier",
        text: "La qualité est toujours au rendez-vous. Une équipe compétente et très professionnelle.",
        rating: 5,
        date: "2024"
      },
      {
        author: "Client Conquis",
        text: "Je suis conquis par le professionnalisme et la qualité des prestations. Merci ${formattedName} !",
        rating: 5,
        date: "2024"
      }
    ],
    aboutTitle: "À Propos de Nous",
    servicesTitle: "Nos Services",
    contactTitle: "Contactez-Nous",
    whyChooseUs: [
      "Expertise confirmée dans notre domaine",
      "Approche personnalisée pour chaque client", 
      "Engagement qualité et satisfaction",
      "Innovation continue et modernité",
      "Réactivité et disponibilité",
      "Tarifs compétitifs et transparents"
    ]
  };
};
function getProfessionalImages(sector: string): string[] {
  const s = (sector || "").toLowerCase();
  
  if (s.includes("restaurant") || s.includes("café") || s.includes("food")) {
    return PROFESSIONAL_IMAGES.restaurant;
  }
  if (s.includes("beauté") || s.includes("beauty") || s.includes("coiffeur") || s.includes("spa")) {
    return PROFESSIONAL_IMAGES.beauty;
  }
  if (s.includes("médec") || s.includes("medec") || s.includes("clinique") || s.includes("santé")) {
    return PROFESSIONAL_IMAGES.medical;
  }
  if (s.includes("business") || s.includes("bureau") || s.includes("entreprise")) {
    return PROFESSIONAL_IMAGES.business;
  }
  
  return PROFESSIONAL_IMAGES.default;
}

function getProfessionalColorScheme(lead: Lead): ColorScheme {
  const seed = lead.name + (lead.city || '') + (lead.sector || '');
  const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const schemes = Object.keys(PROFESSIONAL_SCHEMES);
  const schemeKey = schemes[hash % schemes.length];
  
  return PROFESSIONAL_SCHEMES[schemeKey];
}

// La fonction generateRichContent est déjà définie ci-dessus

// ══════════════════════════════════════════════════════════════
// GÉNÉRATION DU NOUVEAU SITE WEB PROFESSIONNEL
// ══════════════════════════════════════════════════════════════
export function generateNewProfessionalSite(lead: Lead): string {
  const scheme = getProfessionalColorScheme(lead);
  const content = generateRichContent(lead);
  const images = getProfessionalImages(lead.sector);
  
  const companyName = safeStr(lead.name);
  const formattedName = getFormattedName(lead.name);
  const companyPhone = safeStr(lead.phone);
  const companyEmail = safeStr(lead.email);
  const companyAddress = safeStr(lead.address);
  const companyCity = safeStr(lead.city);
  const openingHours = generateOpeningHours(lead.sector);
  
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${companyName} - ${content.heroTitle}</title>
    <meta name="description" content="${content.heroSubtitle}">
    
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" rel="stylesheet">
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    
    <!-- Animate.css -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" rel="stylesheet">
    
    <style>
        :root {
            --primary: ${scheme.primary};
            --secondary: ${scheme.secondary};
            --accent: ${scheme.accent};
            --neutral: ${scheme.neutral};
            --primary-rgb: ${scheme.primaryRgb};
            --dark: ${scheme.dark};
            --light: ${scheme.light};
            --gradient: ${scheme.gradient};
            --hero-overlay: ${scheme.heroOverlay};
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
            color: var(--dark);
            overflow-x: hidden;
        }
        
        /* Top Bar Défilant */
        .top-bar-professional {
            background: var(--dark);
            color: var(--light);
            padding: 0.5rem 0;
            position: relative;
            overflow: hidden;
        }
        
        .top-bar-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.85rem;
            animation: slideText 20s linear infinite;
        }
        
        @keyframes slideText {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
        }
        
        .top-bar-info {
            display: flex;
            gap: 2rem;
            white-space: nowrap;
        }
        
        .top-bar-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        /* Navigation Professionnelle */
        .navbar-professional {
            background: var(--light);
            box-shadow: 0 2px 20px rgba(0,0,0,0.08);
            padding: 1rem 0;
            position: fixed;
            width: 100%;
            top: 40px;
            z-index: 1000;
            transition: all 0.3s ease;
        }
        
        .navbar-professional.scrolled {
            padding: 0.5rem 0;
            box-shadow: 0 4px 30px rgba(0,0,0,0.12);
        }
        
        .navbar-brand-professional {
            font-size: 1.5rem;
            font-weight: 800;
            color: var(--primary) !important;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .nav-link-professional {
            color: var(--dark) !important;
            font-weight: 500;
            margin: 0 0.5rem;
            padding: 0.5rem 1rem !important;
            border-radius: 8px;
            transition: all 0.3s ease;
        }
        
        .nav-link-professional:hover {
            background: var(--primary);
            color: var(--light) !important;
        }
        
        /* Hero Section Ultra-Moderne */
        .hero-professional {
            min-height: 100vh;
            background: var(--gradient);
            position: relative;
            display: flex;
            align-items: center;
            overflow: hidden;
        }
        
        .hero-background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url('${images[0]}') center/cover;
            opacity: 0.15;
            z-index: 1;
        }
        
        .hero-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--hero-overlay);
            z-index: 2;
        }
        
        .hero-content {
            position: relative;
            z-index: 3;
            color: var(--light);
        }
        
        .hero-title {
            font-size: clamp(2.5rem, 5vw, 4rem);
            font-weight: 900;
            line-height: 1.1;
            margin-bottom: 1.5rem;
            background: linear-gradient(135deg, var(--light), rgba(255,255,255,0.8));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .hero-subtitle {
            font-size: clamp(1.1rem, 2vw, 1.4rem);
            font-weight: 400;
            opacity: 0.9;
            margin-bottom: 2rem;
            line-height: 1.6;
        }
        
        .btn-professional {
            padding: 1rem 2.5rem;
            font-size: 1.1rem;
            font-weight: 600;
            border: none;
            border-radius: 50px;
            transition: all 0.4s ease;
            text-decoration: none;
            display: inline-block;
            position: relative;
            overflow: hidden;
        }
        
        .btn-primary-professional {
            background: var(--accent);
            color: var(--light);
            box-shadow: 0 10px 30px rgba(var(--primary-rgb), 0.3);
        }
        
        .btn-primary-professional:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 40px rgba(var(--primary-rgb), 0.4);
            background: var(--primary);
        }
        
        .btn-outline-professional {
            background: transparent;
            color: var(--light);
            border: 2px solid var(--light);
        }
        
        .btn-call-professional {
            background: #25d366;
            color: white;
            border: none;
            padding: 0.8rem 2rem;
            border-radius: 50px;
            font-weight: 600;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            transition: all 0.3s ease;
            box-shadow: 0 8px 25px rgba(37, 211, 102, 0.3);
        }
        
        .btn-call-professional:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 35px rgba(37, 211, 102, 0.4);
            background: #128c7e;
        }
        
        /* Google Rating Badge */
        .google-rating-badge {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 15px;
            padding: 1rem 1.5rem;
            display: inline-flex;
            align-items: center;
            gap: 1rem;
            margin-top: 2rem;
        }
        
        .google-rating-stars {
            color: #ffc107;
            font-size: 1.2rem;
        }
        
        .google-rating-text {
            color: var(--light);
            font-size: 0.9rem;
        }
        
        .google-rating-number {
            font-weight: 700;
            font-size: 1.1rem;
            color: var(--light);
        }
        
        .btn-outline-professional:hover {
            background: var(--light);
            color: var(--primary);
            transform: translateY(-3px);
        }
        
        /* Section Styles */
        .section-professional {
            padding: 6rem 0;
            position: relative;
        }
        
        .section-professional:nth-child(even) {
            background: var(--neutral);
        }
        
        .section-title {
            font-size: clamp(2rem, 4vw, 3rem);
            font-weight: 800;
            color: var(--primary);
            margin-bottom: 1rem;
            position: relative;
            display: inline-block;
        }
        
        .section-title::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 0;
            width: 60px;
            height: 4px;
            background: var(--accent);
            border-radius: 2px;
        }
        
        .section-subtitle {
            font-size: 1.2rem;
            color: var(--secondary);
            margin-bottom: 3rem;
            opacity: 0.8;
        }
        
        /* Cards Modernes */
        .card-professional {
            background: var(--light);
            border: none;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.08);
            transition: all 0.4s ease;
            height: 100%;
            overflow: hidden;
            position: relative;
        }
        
        .card-professional:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 60px rgba(0,0,0,0.15);
        }
        
        .card-professional::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: var(--gradient);
        }
        
        .card-icon {
            width: 80px;
            height: 80px;
            background: var(--gradient);
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            color: var(--light);
            margin-bottom: 1.5rem;
        }
        
        .card-title-professional {
            font-size: 1.4rem;
            font-weight: 700;
            color: var(--primary);
            margin-bottom: 1rem;
        }
        
        .card-text-professional {
            color: var(--secondary);
            line-height: 1.7;
            font-size: 1rem;
        }
        
        /* Témoignages Premium */
        .testimonial-card-professional {
            background: var(--light);
            border-radius: 20px;
            padding: 2rem;
            box-shadow: 0 10px 40px rgba(0,0,0,0.08);
            transition: all 0.4s ease;
            height: 100%;
            position: relative;
        }
        
        .testimonial-card-professional:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 60px rgba(0,0,0,0.12);
        }
        
        .testimonial-stars {
            color: #ffc107;
            font-size: 1.2rem;
            margin-bottom: 1rem;
        }
        
        .testimonial-text {
            font-style: italic;
            color: var(--secondary);
            line-height: 1.6;
            margin-bottom: 1.5rem;
            font-size: 1.05rem;
        }
        
        .testimonial-author {
            font-weight: 700;
            color: var(--primary);
            font-size: 1.1rem;
        }
        
        /* Contact Section */
        .contact-info-professional {
            background: var(--gradient);
            color: var(--light);
            padding: 3rem;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(var(--primary-rgb), 0.3);
        }
        
        .contact-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1.5rem;
        }
        
        .contact-icon {
            width: 50px;
            height: 50px;
            background: rgba(255,255,255,0.2);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.3rem;
        }
        
        /* Footer Professionnel */
        .footer-professional {
            background: var(--dark);
            color: var(--light);
            padding: 3rem 0 1rem;
            position: relative;
        }
        
        .footer-professional::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 1px;
            background: var(--gradient);
        }
        
        .footer-link {
            color: rgba(255,255,255,0.7);
            text-decoration: none;
            transition: all 0.3s ease;
        }
        
        .footer-link:hover {
            color: var(--accent);
            transform: translateX(5px);
        }
        
        /* Floating Buttons */
        .floating-buttons {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            z-index: 999;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        .floating-btn {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            color: white;
            text-decoration: none;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            transition: all 0.3s ease;
        }
        
        .floating-btn:hover {
            transform: scale(1.1);
            box-shadow: 0 15px 40px rgba(0,0,0,0.4);
        }
        
        .whatsapp-btn {
            background: #25d366;
        }
        
        .chatbot-btn {
            background: var(--primary);
        }
        
        /* Google Maps Section */
        .map-section-professional {
            padding: 4rem 0;
            background: var(--neutral);
        }
        
        .map-container {
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0,0,0,0.1);
            height: 400px;
            position: relative;
        }
        
        .map-overlay {
            position: absolute;
            top: 20px;
            left: 20px;
            background: var(--light);
            padding: 1rem 1.5rem;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            z-index: 10;
        }
        
        .map-overlay h4 {
            color: var(--primary);
            margin-bottom: 0.5rem;
        }
        
        .map-overlay p {
            color: var(--secondary);
            margin: 0;
            font-size: 0.9rem;
        }
        
        /* Gallery Section */
        .gallery-section-professional {
            padding: 6rem 0;
            background: var(--light);
        }
        
        .gallery-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }
        
        .gallery-item {
            position: relative;
            border-radius: 15px;
            overflow: hidden;
            height: 250px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
        }
        
        .gallery-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 50px rgba(0,0,0,0.15);
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
            background: linear-gradient(transparent, rgba(0,0,0,0.7));
            color: white;
            padding: 1rem;
        }
        
        /* Stats Section */
        .stats-section-professional {
            padding: 4rem 0;
            background: var(--gradient);
            color: var(--light);
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
            text-align: center;
        }
        
        .stat-item {
            padding: 2rem;
        }
        
        .stat-number {
            font-size: 3rem;
            font-weight: 900;
            margin-bottom: 0.5rem;
            color: var(--light);
        }
        
        .stat-label {
            font-size: 1.1rem;
            opacity: 0.9;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .navbar-professional {
                top: 35px;
            }
            
            .hero-title {
                font-size: 2.5rem;
            }
            
            .section-professional {
                padding: 4rem 0;
            }
            
            .card-professional,
            .testimonial-card-professional {
                margin-bottom: 2rem;
            }
            
            .floating-buttons {
                bottom: 1rem;
                right: 1rem;
            }
            
            .floating-btn {
                width: 50px;
                height: 50px;
                font-size: 1.2rem;
            }
            
            .top-bar-info {
                gap: 1rem;
                font-size: 0.75rem;
            }
            
            .gallery-grid {
                grid-template-columns: 1fr;
                gap: 1rem;
            }
            
            .stats-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .map-container {
                height: 300px;
            }
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
        
        .animate-fade-in-up {
            animation: fadeInUp 0.8s ease-out;
        }
        
        /* Loading Animation */
        .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid var(--neutral);
            border-top: 4px solid var(--primary);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <!-- Top Bar Défilante -->
    <div class="top-bar-professional">
        <div class="container">
            <div class="top-bar-content">
                <div class="top-bar-info">
                    <div class="top-bar-item">
                        <i class="bi bi-envelope-fill"></i>
                        <span>${companyEmail || 'contact@' + companyName.toLowerCase().replace(/\s+/g, '') + '.fr'}</span>
                    </div>
                    <div class="top-bar-item">
                        <i class="bi bi-telephone-fill"></i>
                        <span>${companyPhone || 'Téléphone non spécifié'}</span>
                    </div>
                    <div class="top-bar-item">
                        <i class="bi bi-geo-alt-fill"></i>
                        <span>${companyAddress || 'Adresse non spécifiée'}, ${companyCity || 'France'}</span>
                    </div>
                    <div class="top-bar-item">
                        <i class="bi bi-clock-fill"></i>
                        <span>${openingHours}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Navigation Professionnelle -->
    <nav class="navbar navbar-expand-lg navbar-professional">
        <div class="container">
            <a class="navbar-brand-professional" href="#home">
                <i class="bi bi-building"></i>
                ${formattedName}
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link nav-link-professional" href="#home">Accueil</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link nav-link-professional" href="#about">À Propos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link nav-link-professional" href="#services">Services</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link nav-link-professional" href="#gallery">Galerie</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link nav-link-professional" href="#testimonials">Témoignages</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link nav-link-professional" href="#contact">Contact</a>
                    </li>
                    <li class="nav-item ms-3">
                        ${companyPhone ? `<a href="tel:${companyPhone}" class="btn-call-professional">
                            <i class="bi bi-telephone-fill"></i>
                            Appeler nous
                        </a>` : ''}
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Hero Section Ultra-Moderne -->
    <section id="home" class="hero-professional">
        <div class="hero-background"></div>
        <div class="hero-overlay"></div>
        <div class="container">
            <div class="row align-items-center min-vh-100">
                <div class="col-lg-6">
                    <div class="hero-content animate-fade-in-up">
                        <h1 class="hero-title">${content.heroTitle}</h1>
                        <p class="hero-subtitle">${content.heroSubtitle}</p>
                        <div class="hero-buttons">
                            <a href="#contact" class="btn-professional btn-primary-professional me-3">
                                <i class="bi bi-telephone-fill me-2"></i>${content.cta}
                            </a>
                            <a href="#services" class="btn-professional btn-outline-professional">
                                <i class="bi bi-info-circle me-2"></i>En Savoir Plus
                            </a>
                        </div>
                        <div class="google-rating-badge">
                            <div class="google-rating-stars">
                                ${Array(5).fill('<i class="bi bi-star-fill"></i>').join('')}
                            </div>
                            <div class="google-rating-text">
                                <div class="google-rating-number">${lead.googleRating || '4.9'}</div>
                                <div>sur 5 basé sur ${lead.googleReviews || '234'} avis Google</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="hero-image animate-fade-in-up">
                        <img src="${images[1]}" alt="${companyName}" class="img-fluid rounded-4 shadow-lg">
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="section-professional">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6 mb-4 mb-lg-0">
                    <div class="about-image animate-fade-in-up">
                        <img src="${images[2]}" alt="À Propos" class="img-fluid rounded-4 shadow-lg">
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="about-content animate-fade-in-up">
                        <h2 class="section-title">${content.aboutTitle}</h2>
                        <p class="section-subtitle">Excellence et professionnalisme depuis toujours</p>
                        <p class="lead mb-4">${content.aboutText}</p>
                        
                        <div class="row g-4">
                            ${content.whyChooseUs?.map((reason, index) => `
                                <div class="col-6">
                                    <div class="d-flex align-items-start">
                                        <div class="me-3">
                                            <div class="card-icon" style="width: 40px; height: 40px; font-size: 1.2rem;">
                                                <i class="bi bi-check-circle-fill"></i>
                                            </div>
                                        </div>
                                        <div>
                                            <h6 class="mb-2">${reason}</h6>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="section-professional">
        <div class="container">
            <div class="text-center mb-5">
                <h2 class="section-title">${content.servicesTitle}</h2>
                <p class="section-subtitle">Des solutions sur mesure pour vos besoins</p>
            </div>
            
            <div class="row g-4">
                ${content.services.map((service, index) => `
                    <div class="col-lg-4 col-md-6">
                        <div class="card-professional p-4 animate-fade-in-up" style="animation-delay: ${index * 0.2}s">
                            <div class="card-icon">
                                <i class="bi bi-star-fill"></i>
                            </div>
                            <h3 class="card-title-professional">${service.name}</h3>
                            <p class="card-text-professional">${service.description}</p>
                            <a href="#contact" class="btn btn-link text-decoration-none">
                                En savoir plus <i class="bi bi-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- Testimonials Section -->
    <section id="testimonials" class="section-professional">
        <div class="container">
            <div class="text-center mb-5">
                <h2 class="section-title">Témoignages Clients</h2>
                <p class="section-subtitle">Ce que nos clients disent de nous</p>
            </div>
            
            <div class="row g-4">
                ${content.testimonials.map((testimonial, index) => `
                    <div class="col-lg-4 col-md-6">
                        <div class="testimonial-card-professional animate-fade-in-up" style="animation-delay: ${index * 0.2}s">
                            <div class="testimonial-stars">
                                ${Array(testimonial.rating).fill('<i class="bi bi-star-fill"></i>').join('')}
                            </div>
                            <p class="testimonial-text">"${testimonial.text}"</p>
                            <div class="testimonial-author">
                                <i class="bi bi-person-circle me-2"></i>${testimonial.author}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- Gallery Section -->
    <section id="gallery" class="gallery-section-professional">
        <div class="container">
            <div class="text-center mb-5">
                <h2 class="section-title">Galerie Photos</h2>
                <p class="section-subtitle">Découvrez nos réalisations et notre environnement</p>
            </div>
            
            <div class="gallery-grid">
                ${images.map((img, index) => `
                    <div class="gallery-item animate-fade-in-up" style="animation-delay: ${index * 0.2}s">
                        <img src="${img}" alt="Galerie ${formattedName} ${index + 1}">
                        <div class="gallery-overlay">
                            <h5>${formattedName} - Image ${index + 1}</h5>
                            <p>Découvrez notre savoir-faire</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section-professional">
        <div class="container">
            <div class="text-center mb-5">
                <h2 class="section-title text-white">Nos Chiffres Clés</h2>
                <p class="section-subtitle text-white opacity-75">L'excellence en chiffres</p>
            </div>
            
            <div class="stats-grid">
                <div class="stat-item animate-fade-in-up">
                    <div class="stat-number">${Math.floor(Math.random() * 500) + 100}+</div>
                    <div class="stat-label">Clients Satisfaits</div>
                </div>
                <div class="stat-item animate-fade-in-up">
                    <div class="stat-number">${Math.floor(Math.random() * 20) + 5}</div>
                    <div class="stat-label">Années d'Expérience</div>
                </div>
                <div class="stat-item animate-fade-in-up">
                    <div class="stat-number">${Math.floor(Math.random() * 1000) + 500}</div>
                    <div class="stat-label">Projets Réalisés</div>
                </div>
                <div class="stat-item animate-fade-in-up">
                    <div class="stat-number">${lead.googleRating || '4.9'}/5</div>
                    <div class="stat-label">Note Google</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Google Maps Section -->
    <section id="map" class="map-section-professional">
        <div class="container">
            <div class="text-center mb-5">
                <h2 class="section-title">Nous Trouver</h2>
                <p class="section-subtitle">Localisation et accès faciles</p>
            </div>
            
            <div class="map-container">
                <div class="map-overlay">
                    <h4>${formattedName}</h4>
                    <p>${companyAddress || 'Adresse non spécifiée'}<br>${companyCity || 'France'}</p>
                    <p><strong>${companyPhone || 'Téléphone non spécifié'}</strong></p>
                </div>
                <iframe 
                    src="https://maps.google.com/maps?q=${encodeURIComponent(companyAddress + ' ' + companyCity || formattedName + ' ' + companyCity)}&t=m&z=15&output=embed&iwloc=near"
                    width="100%" 
                    height="100%" 
                    style="border:0;" 
                    allowfullscreen="" 
                    loading="lazy">
                </iframe>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="section-professional">
        <div class="container">
            <div class="text-center mb-5">
                <h2 class="section-title">${content.contactTitle}</h2>
                <p class="section-subtitle">Nous sommes là pour vous aider</p>
            </div>
            
            <div class="row g-4">
                <div class="col-lg-6">
                    <div class="contact-info-professional">
                        <h3 class="mb-4">Informations de Contact</h3>
                        
                        <div class="contact-item">
                            <div class="contact-icon">
                                <i class="bi bi-geo-alt-fill"></i>
                            </div>
                            <div>
                                <h6>Adresse</h6>
                                <p>${companyAddress || 'Adresse non spécifiée'}, ${companyCity || 'France'}</p>
                            </div>
                        </div>
                        
                        <div class="contact-item">
                            <div class="contact-icon">
                                <i class="bi bi-telephone-fill"></i>
                            </div>
                            <div>
                                <h6>Téléphone</h6>
                                <p>${companyPhone || 'Téléphone non spécifié'}</p>
                            </div>
                        </div>
                        
                        <div class="contact-item">
                            <div class="contact-icon">
                                <i class="bi bi-envelope-fill"></i>
                            </div>
                            <div>
                                <h6>Email</h6>
                                <p>${companyEmail || 'Email non spécifié'}</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-6">
                    <div class="card-professional p-4">
                        <h3 class="mb-4">Envoyez-nous un message</h3>
                        <form>
                            <div class="mb-3">
                                <label class="form-label">Nom complet</label>
                                <input type="text" class="form-control" placeholder="Votre nom">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Email</label>
                                <input type="email" class="form-control" placeholder="votre@email.com">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Message</label>
                                <textarea class="form-control" rows="4" placeholder="Votre message..."></textarea>
                            </div>
                            <button type="submit" class="btn-professional btn-primary-professional w-100">
                                <i class="bi bi-send-fill me-2"></i>Envoyer le message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer Professionnel -->
    <footer class="footer-professional">
        <div class="container">
            <div class="row">
                <div class="col-lg-4 mb-4">
                    <h5 class="mb-3">${formattedName}</h5>
                    <p class="mb-3">Excellence et professionnalisme au service de nos clients.</p>
                    <div class="d-flex gap-3">
                        <a href="#" class="footer-link"><i class="bi bi-facebook fs-5"></i></a>
                        <a href="#" class="footer-link"><i class="bi bi-instagram fs-5"></i></a>
                        <a href="#" class="footer-link"><i class="bi bi-linkedin fs-5"></i></a>
                    </div>
                </div>
                
                <div class="col-lg-4 mb-4">
                    <h5 class="mb-3">Liens Utiles</h5>
                    <div class="d-flex flex-column gap-2">
                        <a href="#home" class="footer-link">Accueil</a>
                        <a href="#about" class="footer-link">À Propos</a>
                        <a href="#services" class="footer-link">Services</a>
                        <a href="#gallery" class="footer-link">Galerie</a>
                        <a href="#testimonials" class="footer-link">Témoignages</a>
                        <a href="#contact" class="footer-link">Contact</a>
                    </div>
                </div>
                
                <div class="col-lg-4 mb-4">
                    <h5 class="mb-3">Contact Rapide</h5>
                    <div class="d-flex flex-column gap-2">
                        <a href="tel:${companyPhone}" class="footer-link">
                            <i class="bi bi-telephone-fill me-2"></i>${companyPhone || 'Téléphone'}
                        </a>
                        <a href="mailto:${companyEmail}" class="footer-link">
                            <i class="bi bi-envelope-fill me-2"></i>${companyEmail || 'Email'}
                        </a>
                    </div>
                </div>
            </div>
            
            <hr class="my-4" style="border-color: rgba(255,255,255,0.1);">
            
            <div class="text-center">
                <p class="mb-0">&copy; 2024 ${formattedName}. Tous droits réservés.</p>
            </div>
        </div>
    </footer>

    <!-- Floating Buttons -->
    <div class="floating-buttons">
        <a href="https://wa.me/33612345678" target="_blank" class="floating-btn whatsapp-btn">
            <i class="bi bi-whatsapp"></i>
        </a>
        <a href="#" class="floating-btn chatbot-btn" onclick="openChatbot()">
            <i class="bi bi-chat-dots-fill"></i>
        </a>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    
    <script>
        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar-professional');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
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
            });
        });
        
        // Animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.animate-fade-in-up').forEach(el => {
            observer.observe(el);
        });
        
        // Chatbot function
        function openChatbot() {
            alert('Chatbot: Bonjour! Comment puis-je vous aider aujourd\'hui?');
        }
        
        // Form submission
        document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Message envoyé avec succès! Nous vous contacterons rapidement.');
            this.reset();
        });
    </script>
</body>
</html>
  `;
}
