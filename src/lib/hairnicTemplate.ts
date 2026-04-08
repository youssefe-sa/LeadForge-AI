// ============================================================
// LeadForge AI - Hairnic Template Adaptation v1.0
// Basé sur le template Hairnic de HTML Codex
// Adapté pour tous les types de business
// ============================================================

import { Lead, safeStr, proxyImg } from "./supabase-store";

interface HairnicContent {
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  services: Array<{ name: string; description: string; icon?: string; price?: string }>;
  cta: string;
  testimonials: Array<{
    author: string;
    text: string;
    rating: number;
    date: string;
    profession?: string;
  }>;
  galleryTitle?: string;
  aboutTitle?: string;
  servicesTitle?: string;
  contactTitle?: string;
  whyChooseUs?: string[];
}

// Images professionnelles par secteur
const BUSINESS_IMAGES: Record<string, string[]> = {
  restaurant: [
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&fit=crop&q=80"
  ],
  coiffeur: [
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1521590832167-7228fcb8c1b5?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=800&fit=crop&q=80"
  ],
  spa: [
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1540555700478-4be289fbec6e?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&fit=crop&q=80"
  ],
  médecin: [
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&fit=crop&q=80"
  ],
  default: [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=800&fit=crop&q=80"
  ]
};

function getBusinessImages(sector: string): string[] {
  const s = (sector || "").toLowerCase();
  if (s.includes("restaurant") || s.includes("café") || s.includes("traiteur")) return BUSINESS_IMAGES.restaurant;
  if (s.includes("coiffeur") || s.includes("barb") || s.includes("salon")) return BUSINESS_IMAGES.coiffeur;
  if (s.includes("spa") || s.includes("beauté") || s.includes("massage")) return BUSINESS_IMAGES.spa;
  if (s.includes("médec") || s.includes("clinique") || s.includes("pharma")) return BUSINESS_IMAGES.médecin;
  return BUSINESS_IMAGES.default;
}

// Palettes de couleurs professionnelles
interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  dark: string;
  light: string;
}

const COLOR_SCHEMES: Record<string, ColorScheme> = {
  "professional-blue": {
    primary: "#1e40af",
    secondary: "#3b82f6", 
    accent: "#60a5fa",
    dark: "#1e3a8a",
    light: "#dbeafe"
  },
  "professional-red": {
    primary: "#dc2626",
    secondary: "#ef4444",
    accent: "#f87171", 
    dark: "#991b1b",
    light: "#fee2e2"
  },
  "professional-green": {
    primary: "#059669",
    secondary: "#10b981",
    accent: "#34d399",
    dark: "#047857",
    light: "#d1fae5"
  },
  "professional-purple": {
    primary: "#7c3aed",
    secondary: "#8b5cf6",
    accent: "#a78bfa",
    dark: "#6d28d9", 
    light: "#ede9fe"
  },
  "professional-orange": {
    primary: "#ea580c",
    secondary: "#f97316",
    accent: "#fb923c",
    dark: "#c2410c",
    light: "#fed7aa"
  }
};

function getColorScheme(lead: Lead): ColorScheme {
  const hash = lead.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const schemes = Object.keys(COLOR_SCHEMES);
  return COLOR_SCHEMES[schemes[hash % schemes.length]];
}

// Icônes Bootstrap par secteur
function getBusinessIcons(sector: string): string[] {
  const s = (sector || "").toLowerCase();
  
  if (s.includes("restaurant") || s.includes("café")) {
    return ["bi-cup-hot", "bi-egg-fried", "bi-basket2", "bi-cake2", "bi-wine-glass"];
  }
  if (s.includes("coiffeur") || s.includes("barb")) {
    return ["bi-scissors", "bi-brush", "bi-palette", "bi-star", "bi-heart"];
  }
  if (s.includes("spa") || s.includes("beauté")) {
    return ["bi-flower1", "bi-droplet", "bi-stars", "bi-sun", "bi-moon"];
  }
  if (s.includes("médec") || s.includes("clinique")) {
    return ["bi-heart-pulse", "bi-shield-check", "bi-capsule", "bi-clipboard2-pulse", "bi-hospital"];
  }
  
  return ["bi-star", "bi-gear", "bi-graph-up", "bi-people", "bi-award"];
}

// Contenu dynamique par secteur
function generateBusinessContent(lead: Lead): HairnicContent {
  const sector = (lead.sector || "").toLowerCase();
  const images = getBusinessImages(sector);
  const icons = getBusinessIcons(sector);
  
  let services: Array<{ name: string; description: string; icon?: string; price?: string }> = [];
  let heroTitle = "";
  let heroSubtitle = "";
  let aboutText = "";
  let whyChooseUs: string[] = [];
  
  if (sector.includes("restaurant") || sector.includes("café")) {
    heroTitle = `Cuisine ${lead.name} - Goût Authentique`;
    heroSubtitle = `Découvrez nos plats traditionnels préparés avec passion et des ingrédients frais`;
    services = [
      { name: "Plats du Jour", description: "Spécialités quotidiennes faites maison", icon: icons[0], price: "15-25" },
      { name: "Menu Dégustation", description: "Expérience gastronomique complète", icon: icons[1], price: "45-65" },
      { name: "Formules Rapides", description: "Repas équilibrés pour le midi", icon: icons[2], price: "12-18" },
      { name: "Desserts Maison", description: "Pâtisseries artisanales", icon: icons[3], price: "6-12" }
    ];
    whyChooseUs = ["Produits locaux et frais", "Cuisine authentique", "Service rapide", "Ambiance chaleureuse"];
  }
  else if (sector.includes("coiffeur") || sector.includes("barb")) {
    heroTitle = `${lead.name} - Art Capillaire`;
    heroSubtitle = `Transformez votre look avec nos experts en coiffure et styling`;
    services = [
      { name: "Coupe Homme", description: "Coupe moderne et stylée", icon: icons[0], price: "25-45" },
      { name: "Coloration", description: "Coloration professionnelle", icon: icons[1], price: "60-120" },
      { name: "Soin Cheveux", description: "Traitement revitalisant", icon: icons[2], price: "40-80" },
      { name: "Coiffure Femme", description: "Style personnalisé", icon: icons[3], price: "35-70" }
    ];
    whyChooseUs = ["Produits professionnels", "Écoute attentive", "Tendances actuelles", "Conseils personnalisés"];
  }
  else if (sector.includes("spa") || sector.includes("beauté")) {
    heroTitle = `${lead.name} - Bien-être & Détente`;
    heroSubtitle = `Échappez-vous dans notre oasis de relaxation et de soins`;
    services = [
      { name: "Massage Relaxant", description: "Décontraction musculaire profonde", icon: icons[0], price: "60-90" },
      { name: "Soin du Visage", description: "Régénération cutanée", icon: icons[1], price: "70-110" },
      { name: "Soins Corps", description: "Gommage et hydratation", icon: icons[2], price: "80-130" },
      { name: "Spa Jour", description: "Journée bien-être complète", icon: icons[3], price: "150-250" }
    ];
    whyChooseUs = ["Ambiance sereine", "Produits naturels", "Professionnels certifiés", "Résultats visibles"];
  }
  else if (sector.includes("médec") || sector.includes("clinique")) {
    heroTitle = `${lead.name} - Santé & Prévention`;
    heroSubtitle = `Soins médicaux de qualité avec une approche humaine`;
    services = [
      { name: "Consultation Générale", description: "Bilan de santé complet", icon: icons[0], price: "45-80" },
      { name: "Vaccinations", description: "Mise à jour vaccinale", icon: icons[1], price: "25-60" },
      { name: "Examens Préventifs", description: "Dépistage régulier", icon: icons[2], price: "80-150" },
      { name: "Télémédecine", description: "Consultation à distance", icon: icons[3], price: "35-65" }
    ];
    whyChooseUs = ["Personnel qualifié", "Horaires flexibles", "Confidentialité", "Équipement moderne"];
  }
  else {
    // Business général
    heroTitle = `${lead.name} - Excellence Professionnelle`;
    heroSubtitle = `Solutions innovantes pour répondre à vos besoins`;
    services = [
      { name: "Consultation", description: "Analyse de vos besoins", icon: icons[0], price: "Sur devis" },
      { name: "Service Premium", description: "Solution complète", icon: icons[1], price: "Sur devis" },
      { name: "Support Technique", description: "Assistance continue", icon: icons[2], price: "Sur devis" },
      { name: "Formation", description: "Transfert de compétences", icon: icons[3], price: "Sur devis" }
    ];
    whyChooseUs = ["Expertise reconnue", "Service client", "Rapport qualité/prix", "Innovation constante"];
  }
  
  aboutText = `Chez ${lead.name}, nous mettons tout en oeuvre pour vous offrir un service d'excellence. Notre équipe de professionnels passionnés travaille quotidiennement pour dépasser vos attentes et vous proposer des solutions adaptées à vos besoins spécifiques.`;
  
  return {
    heroTitle,
    heroSubtitle,
    aboutText,
    services,
    cta: "Contactez-nous",
    testimonials: [
      {
        author: "Client Satisfait",
        text: `Excellent service chez ${lead.name}! Professionnalisme et qualité au rendez-vous. Je recommande vivement.`,
        rating: 5,
        date: "2024-01-15",
        profession: "Client régulier"
      },
      {
        author: "Marie Dupont",
        text: `Une expérience exceptionnelle avec ${lead.name}. L'équipe est à l'écoute et les résultats dépassent mes attentes.`,
        rating: 5,
        date: "2024-01-10",
        profession: "Cliente fidèle"
      },
      {
        author: "Jean Martin",
        text: `Service impeccable et résultats spectaculaires. ${lead.name} est devenu mon partenaire de confiance.`,
        rating: 5,
        date: "2024-01-05",
        profession: "Client satisfait"
      }
    ],
    galleryTitle: "Notre Galerie",
    aboutTitle: "À Propos de Nous",
    servicesTitle: "Nos Services",
    contactTitle: "Contactez-nous",
    whyChooseUs
  };
}

export function generateHairnicSite(lead: Lead): string {
  const content = generateBusinessContent(lead);
  const images = getBusinessImages(lead.sector);
  const colors = getColorScheme(lead);
  
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <title>${lead.name} - Site Professionnel</title>
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <meta content="${lead.sector}, ${lead.city}, professionnel, service" name="keywords">
    <meta content="${content.heroSubtitle}" name="description">

    <!-- Favicon -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="icon">

    <!-- Google Web Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500&family=Poppins:wght@200;600;700&display=swap" rel="stylesheet">

    <!-- Icon Font Stylesheet -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet">

    <!-- Libraries Stylesheet -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css" rel="stylesheet">

    <!-- Customized Bootstrap Stylesheet -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Template Stylesheet -->
    <style>
        /********** Template CSS **********/
        :root {
            --primary: ${colors.primary};
            --secondary: ${colors.secondary};
            --accent: ${colors.accent};
            --dark: ${colors.dark};
            --light: ${colors.light};
        }

        /*** Spinner ***/
        #spinner {
            opacity: 0;
            visibility: hidden;
            transition: opacity .5s ease-out, visibility 0s linear .5s;
            z-index: 99999;
        }

        #spinner.show {
            transition: opacity .5s ease-out, visibility 0s linear 0s;
            visibility: visible;
            opacity: 1;
        }

        .back-to-top {
            position: fixed;
            display: none;
            right: 45px;
            bottom: 45px;
            z-index: 99;
        }

        img.animated.pulse {
            animation-duration: 5s;
        }

        /*** Button ***/
        .btn {
            font-weight: 500;
            transition: .5s;
        }

        .btn.btn-primary {
            color: var(--bs-white);
        }

        .btn-square {
            width: 38px;
            height: 38px;
        }

        .btn-sm-square {
            width: 32px;
            height: 32px;
        }

        .btn-lg-square {
            width: 48px;
            height: 48px;
        }

        .btn-square,
        .btn-sm-square,
        .btn-lg-square {
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: normal;
            border-radius: 50px;
        }

        /*** Navbar ***/
        .sticky-top {
            top: -150px;
            transition: .5s;
        }

        .navbar {
            padding: 11px 0 !important;
            height: 85px;
            background: var(--primary) !important;
        }

        .navbar .navbar-nav .nav-link {
            margin-right: 45px;
            padding: 0;
            color: rgba(255, 255, 255, 0.8);
            font-weight: 500;
            transition: .5s;
            outline: none;
        }

        .navbar .navbar-nav .nav-link:hover,
        .navbar .navbar-nav .nav-link.active {
            color: var(--bs-white);
        }

        .navbar .dropdown-toggle::after {
            border: none;
            content: "\\f107";
            font-family: "Font Awesome 5 Free";
            font-weight: 900;
            vertical-align: middle;
            margin-left: 8px;
        }

        @media (max-width: 991.98px) {
            .navbar .navbar-nav {
                background: var(--primary);
                padding: 15px;
                border-radius: 0 0 10px 10px;
            }
            
            .navbar .navbar-nav .nav-link {
                margin-right: 0;
                padding: 10px 0;
            }
        }

        /*** Hero Header ***/
        .hero-header {
            background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${images[0]}');
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;
            min-height: 600px;
            display: flex;
            align-items: center;
        }

        /*** Section ***/
        .section {
            padding: 80px 0;
        }

        .section-title {
            position: relative;
            display: inline-block;
            margin-bottom: 30px;
        }

        .section-title::before {
            content: '';
            position: absolute;
            width: 60px;
            height: 3px;
            bottom: -5px;
            left: 0;
            background: var(--primary);
        }

        .section-title.text-center::before {
            left: 50%;
            transform: translateX(-50%);
        }

        /*** Service ***/
        .service-item {
            background: var(--light);
            border-radius: 10px;
            transition: .5s;
        }

        .service-item:hover {
            transform: translateY(-10px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .service-item .service-icon {
            width: 80px;
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--primary);
            border-radius: 50px;
            margin: 0 auto 20px;
            color: var(--bs-white);
            font-size: 30px;
        }

        /*** Testimonial ***/
        .testimonial-item {
            background: var(--light);
            border-radius: 10px;
            padding: 30px;
            position: relative;
        }

        .testimonial-item::before {
            content: '"';
            position: absolute;
            top: 20px;
            left: 20px;
            font-size: 60px;
            color: var(--primary);
            opacity: 0.1;
        }

        .testimonial-item .testimonial-text {
            font-style: italic;
            margin-bottom: 20px;
        }

        .testimonial-item .testimonial-author {
            display: flex;
            align-items: center;
        }

        .testimonial-item .testimonial-author img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-right: 15px;
        }

        /*** Contact ***/
        .contact-form {
            background: var(--light);
            border-radius: 10px;
            padding: 40px;
        }

        .contact-form .form-control {
            border: 1px solid #ddd;
            border-radius: 5px;
            padding: 12px 15px;
            font-size: 16px;
        }

        .contact-form .form-control:focus {
            border-color: var(--primary);
            box-shadow: 0 0 0 0.2rem rgba(var(--primary), 0.25);
        }

        /*** Footer ***/
        .footer {
            background: var(--dark);
            color: rgba(255, 255, 255, 0.8);
            padding: 60px 0 30px;
        }

        .footer .footer-link {
            color: rgba(255, 255, 255, 0.8);
            text-decoration: none;
            transition: .3s;
        }

        .footer .footer-link:hover {
            color: var(--bs-white);
        }

        .footer .btn-footer {
            background: var(--primary);
            color: var(--bs-white);
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            transition: .3s;
        }

        .footer .btn-footer:hover {
            background: var(--secondary);
        }

        /*** WhatsApp Button ***/
        .whatsapp-float {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: #25d366;
            color: white;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            transition: all 0.3s ease;
            z-index: 1000;
            text-decoration: none;
        }

        .whatsapp-float:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
            color: white;
        }

        /*** Responsive ***/
        @media (max-width: 768px) {
            .hero-header {
                min-height: 500px;
            }
            
            .section {
                padding: 60px 0;
            }
            
            .service-item {
                margin-bottom: 30px;
            }
            
            .testimonial-item {
                margin-bottom: 30px;
            }
        }
    </style>
</head>

<body>
    <!-- Spinner Start -->
    <div id="spinner" class="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
        <div class="spinner-grow text-primary" style="width: 3rem; height: 3rem;" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
    <!-- Spinner End -->

    <!-- Navbar Start -->
    <div class="container-fluid sticky-top">
        <div class="container">
            <nav class="navbar navbar-expand-lg navbar-light p-0">
                <a href="#home" class="navbar-brand">
                    <h2 class="text-white">${lead.name}</h2>
                </a>
                <button type="button" class="navbar-toggler ms-auto me-0" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <div class="navbar-nav ms-auto">
                        <a href="#home" class="nav-item nav-link active">Accueil</a>
                        <a href="#about" class="nav-item nav-link">À Propos</a>
                        <a href="#services" class="nav-item nav-link">Services</a>
                        <a href="#testimonials" class="nav-item nav-link">Témoignages</a>
                        <a href="#contact" class="nav-item nav-link">Contact</a>
                    </div>
                    <a href="#contact" class="btn btn-dark py-2 px-4 d-none d-lg-inline-block">Contactez-nous</a>
                </div>
            </nav>
        </div>
    </div>
    <!-- Navbar End -->

    <!-- Hero Start -->
    <div class="container-fluid hero-header mb-5" id="home">
        <div class="container">
            <div class="row g-5 align-items-center">
                <div class="col-lg-6 text-center text-lg-start">
                    <h3 class="fw-light text-white animated slideInRight">Professionnel & Qualité</h3>
                    <h1 class="display-4 text-white animated slideInRight">${content.heroTitle}</h1>
                    <p class="text-white mb-4 animated slideInRight">${content.heroSubtitle}</p>
                    <a href="#contact" class="btn btn-dark py-2 px-4 me-3 animated slideInRight">Contactez-nous</a>
                    <a href="#services" class="btn btn-outline-dark py-2 px-4 animated slideInRight">Nos Services</a>
                </div>
                <div class="col-lg-6">
                    <img class="img-fluid animated pulse infinite" src="${images[1]}" alt="${lead.name}">
                </div>
            </div>
        </div>
    </div>
    <!-- Hero End -->

    <!-- About Start -->
    <div class="container-fluid py-5" id="about">
        <div class="container">
            <div class="row g-5 align-items-center">
                <div class="col-lg-6">
                    <h1 class="mb-4">${content.aboutTitle || 'À Propos de Nous'}</h1>
                    <p class="mb-4">${content.aboutText}</p>
                    <div class="row g-3">
                        ${content.whyChooseUs ? content.whyChooseUs.map(point => `
                            <div class="col-sm-6">
                                <h6 class="mb-3"><i class="bi bi-check-circle-fill text-primary me-2"></i>${point}</h6>
                            </div>
                        `).join('') : ''}
                    </div>
                </div>
                <div class="col-lg-6">
                    <img class="img-fluid rounded" src="${images[2]}" alt="${lead.name}">
                </div>
            </div>
        </div>
    </div>
    <!-- About End -->

    <!-- Services Start -->
    <div class="container-fluid py-5" id="services">
        <div class="container">
            <div class="text-center mx-auto mb-5" style="max-width: 600px;">
                <h1 class="mb-0">${content.servicesTitle || 'Nos Services'}</h1>
            </div>
            <div class="row g-4">
                ${content.services.map((service, index) => `
                    <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="${index * 0.1}s">
                        <div class="service-item text-center">
                            <div class="service-icon">
                                <i class="bi ${service.icon}"></i>
                            </div>
                            <h4>${service.name}</h4>
                            <p class="mb-3">${service.description}</p>
                            <h5 class="text-primary">${service.price || 'Sur devis'}</h5>
                            <a href="#contact" class="btn btn-primary py-2 px-3">Réserver</a>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </div>
    <!-- Services End -->

    <!-- Testimonials Start -->
    <div class="container-fluid py-5" id="testimonials">
        <div class="container">
            <div class="text-center mx-auto mb-5" style="max-width: 600px;">
                <h1 class="mb-0">Témoignages Clients</h1>
            </div>
            <div class="row g-4">
                ${content.testimonials.map((testimonial, index) => `
                    <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="${index * 0.1}s">
                        <div class="testimonial-item">
                            <div class="testimonial-text mb-3">
                                <p>"${testimonial.text}"</p>
                            </div>
                            <div class="testimonial-author d-flex align-items-center">
                                <div class="ms-3">
                                    <h5>${testimonial.author}</h5>
                                    <small>${testimonial.profession || 'Client'}</small>
                                    <div class="text-warning">
                                        ${Array(testimonial.rating).fill('<i class="bi bi-star-fill"></i>').join('')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </div>
    <!-- Testimonials End -->

    <!-- Contact Start -->
    <div class="container-fluid py-5" id="contact">
        <div class="container">
            <div class="text-center mx-auto mb-5" style="max-width: 600px;">
                <h1 class="mb-0">${content.contactTitle || 'Contactez-nous'}</h1>
            </div>
            <div class="row g-4">
                <div class="col-lg-6">
                    <div class="contact-form">
                        <form>
                            <div class="mb-3">
                                <label class="form-label">Nom</label>
                                <input type="text" class="form-control" placeholder="Votre nom">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Email</label>
                                <input type="email" class="form-control" placeholder="Votre email">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Téléphone</label>
                                <input type="tel" class="form-control" placeholder="Votre téléphone">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Message</label>
                                <textarea class="form-control" rows="4" placeholder="Votre message"></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary py-2 px-4">Envoyer</button>
                        </form>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="ps-lg-5">
                        <div class="mb-4">
                            <h5><i class="bi bi-geo-alt-fill text-primary me-2"></i>Adresse</h5>
                            <p>${lead.address || lead.city || 'Adresse non disponible'}</p>
                        </div>
                        <div class="mb-4">
                            <h5><i class="bi bi-telephone-fill text-primary me-2"></i>Téléphone</h5>
                            <p>${lead.phone || 'Téléphone non disponible'}</p>
                        </div>
                        <div class="mb-4">
                            <h5><i class="bi bi-envelope-fill text-primary me-2"></i>Email</h5>
                            <p>${lead.email || 'Email non disponible'}</p>
                        </div>
                        <div class="mb-4">
                            <h5><i class="bi bi-clock-fill text-primary me-2"></i>Horaires</h5>
                            <p>Lundi - Vendredi: 9h - 18h<br>Samedi: 9h - 12h</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Contact End -->

    <!-- Footer Start -->
    <div class="container-fluid footer text-white py-5" id="footer">
        <div class="container">
            <div class="row g-5">
                <div class="col-lg-4">
                    <h3 class="text-white mb-4">${lead.name}</h3>
                    <p>${content.heroSubtitle}</p>
                    <div class="d-flex pt-2">
                        <a class="btn btn-outline-light btn-social" href="#"><i class="fab fa-facebook-f"></i></a>
                        <a class="btn btn-outline-light btn-social" href="#"><i class="fab fa-instagram"></i></a>
                        <a class="btn btn-outline-light btn-social" href="#"><i class="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
                <div class="col-lg-4">
                    <h4 class="text-white mb-4">Liens Utiles</h4>
                    <div class="d-flex flex-column">
                        <a class="footer-link" href="#home">Accueil</a>
                        <a class="footer-link" href="#about">À Propos</a>
                        <a class="footer-link" href="#services">Services</a>
                        <a class="footer-link" href="#contact">Contact</a>
                    </div>
                </div>
                <div class="col-lg-4">
                    <h4 class="text-white mb-4">Newsletter</h4>
                    <p>Inscrivez-vous pour recevoir nos dernières actualités</p>
                    <div class="position-relative">
                        <input class="form-control bg-transparent text-white w-100 py-3 ps-4 pe-5" type="text" placeholder="Votre email">
                        <button type="button" class="btn btn-primary py-2 px-3 position-absolute top-0 end-0 mt-2 me-2">S'inscrire</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Footer End -->

    <!-- WhatsApp Button -->
    <a href="https://wa.me/33600000000?text=Bonjour%20${encodeURIComponent(lead.name)}%20!" class="whatsapp-float" target="_blank">
        <i class="bi bi-whatsapp"></i>
    </a>

    <!-- Back to Top -->
    <a href="#" class="btn btn-primary btn-lg-square back-to-top"><i class="bi bi-arrow-up"></i></a>

    <!-- JavaScript Libraries -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"></script>
    
    <script>
        // Spinner
        setTimeout(function () {
            if (document.getElementById('spinner')) {
                document.getElementById('spinner').classList.remove('show');
            }
        }, 1000);

        // Back to top button
        window.onscroll = function () {
            scrollFunction();
        };

        function scrollFunction() {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                document.querySelector(".back-to-top").style.display = "flex";
            } else {
                document.querySelector(".back-to-top").style.display = "none";
            }
        }

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.sticky-top');
            if (window.scrollY > 100) {
                navbar.style.top = '0';
            } else {
                navbar.style.top = '-150px';
            }
        });

        // Form submission
        document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Merci pour votre message! Nous vous contacterons rapidement.');
            this.reset();
        });
    </script>
</body>
</html>`;
}

export type { HairnicContent, ColorScheme };
