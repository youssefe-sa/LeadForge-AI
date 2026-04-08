// ============================================================
// LeadForge AI - Plumberz Template Adaptation v1.0
// Basé sur le template Plumberz de HTML Codex (item 2195)
// Structure identique avec toutes les sections et détails
// ============================================================

import { Lead, safeStr, proxyImg } from "./supabase-store";

interface PlumberzContent {
  companyName: string;
  sector: string;
  city: string;
  phone: string;
  email: string;
  address: string;
  description: string;
  services: Array<{ name: string; description: string; icon: string }>;
  teamMembers: Array<{ name: string; position: string }>;
  testimonials: Array<{ name: string; text: string; profession: string; rating: number }>;
}

// Images professionnelles par secteur
const BUSINESS_IMAGES: Record<string, string[]> = {
  restaurant: [
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&fit=crop&q=80"
  ],
  coiffeur: [
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1521590832167-7228fcb8c1b5?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=1200&fit=crop&q=80"
  ],
  spa: [
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1540555700478-4be289fbec6e?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200&fit=crop&q=80"
  ],
  médecin: [
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1200&fit=crop&q=80"
  ],
  default: [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=1200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&fit=crop&q=80"
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

// Couleurs professionnelles par secteur
const BUSINESS_COLORS: Record<string, { primary: string; secondary: string }> = {
  restaurant: { primary: "#E8590C", secondary: "#FB923C" },
  coiffeur: { primary: "#7C3AED", secondary: "#A78BFA" },
  spa: { primary: "#0D9488", secondary: "#2DD4BF" },
  médecin: { primary: "#2563EB", secondary: "#60A5FA" },
  default: { primary: "#D4500A", secondary: "#F97316" }
};

function getBusinessColors(sector: string): { primary: string; secondary: string } {
  const s = (sector || "").toLowerCase();
  if (s.includes("restaurant") || s.includes("café")) return BUSINESS_COLORS.restaurant;
  if (s.includes("coiffeur") || s.includes("barb")) return BUSINESS_COLORS.coiffeur;
  if (s.includes("spa") || s.includes("beauté")) return BUSINESS_COLORS.spa;
  if (s.includes("médec") || s.includes("clinique")) return BUSINESS_COLORS.médecin;
  return BUSINESS_COLORS.default;
}

// Icônes par secteur
const BUSINESS_ICONS: Record<string, string[]> = {
  restaurant: ["fa-utensils", "fa-coffee", "fa-wine-glass", "fa-birthday-cake", "fa-pizza-slice"],
  coiffeur: ["fa-cut", "fa-shower", "fa-brush", "fa-magic", "fa-star"],
  spa: ["fa-spa", "fa-heart", "fa-leaf", "fa-sun", "fa-moon"],
  médecin: ["fa-heartbeat", "fa-stethoscope", "fa-pills", "fa-hospital", "fa-user-md"],
  default: ["fa-cog", "fa-tools", "fa-wrench", "fa-briefcase", "fa-handshake"]
};

function getBusinessIcons(sector: string): string[] {
  const s = (sector || "").toLowerCase();
  if (s.includes("restaurant") || s.includes("café")) return BUSINESS_ICONS.restaurant;
  if (s.includes("coiffeur") || s.includes("barb")) return BUSINESS_ICONS.coiffeur;
  if (s.includes("spa") || s.includes("beauté")) return BUSINESS_ICONS.spa;
  if (s.includes("médec") || s.includes("clinique")) return BUSINESS_ICONS.médecin;
  return BUSINESS_ICONS.default;
}

// Contenu dynamique par secteur
function generateBusinessContent(lead: Lead): PlumberzContent {
  const sector = (lead.sector || "").toLowerCase();
  const images = getBusinessImages(sector);
  const colors = getBusinessColors(sector);
  const icons = getBusinessIcons(sector);
  
  let services: Array<{ name: string; description: string; icon: string }> = [];
  let teamMembers: Array<{ name: string; position: string }> = [];
  let testimonials: Array<{ name: string; text: string; profession: string; rating: number }> = [];
  
  if (sector.includes("restaurant") || sector.includes("café")) {
    services = [
      { name: "Cuisine Gastronomique", description: "Plats traditionnels préparés avec des ingrédients frais et locaux", icon: icons[0] },
      { name: "Service Traiteur", description: "Organisation d'événements privés et professionnels", icon: icons[1] },
      { name: "Menu Dégustation", description: "Expérience culinaire complète avec accords mets-vins", icon: icons[2] },
      { name: "Pâtisserie Maison", description: "Desserts artisanaux faits maison", icon: icons[3] },
      { name: "Bar à Cocktails", description: "Boissons créatives et classiques", icon: icons[4] }
    ];
    teamMembers = [
      { name: "Jean Dupont", position: "Chef Cuisine" },
      { name: "Marie Martin", position: "Pâtissière" },
      { name: "Pierre Durand", position: "Sommelier" },
      { name: "Sophie Lefebvre", position: "Chef de Rang" }
    ];
  }
  else if (sector.includes("coiffeur") || sector.includes("barb")) {
    services = [
      { name: "Coupe Moderne", description: "Styles tendances et classiques pour hommes et femmes", icon: icons[0] },
      { name: "Coloration", description: "Colorations professionnelles et naturelles", icon: icons[1] },
      { name: "Soin Capillaire", description: "Traitements revitalisants personnalisés", icon: icons[2] },
      { name: "Extension Cheveux", description: "Pose d'extensions de qualité", icon: icons[3] },
      { name: "Soins Barbe", description: "Taille et entretien barbe traditionnel", icon: icons[4] }
    ];
    teamMembers = [
      { name: "Lucas Bernard", position: "Coiffeur Senior" },
      { name: "Emma Petit", position: "Coloriste" },
      { name: "Nicolas Leroy", position: "Spécialiste Barbe" },
      { name: "Camille Dubois", position: "Coiffeuse Junior" }
    ];
  }
  else if (sector.includes("spa") || sector.includes("beauté")) {
    services = [
      { name: "Massage Relaxant", description: "Techniques de massage pour détente profonde", icon: icons[0] },
      { name: "Soin du Visage", description: "Soins esthétiques personnalisés", icon: icons[1] },
      { name: "Soins Corps", description: "Gommage et hydratation complète", icon: icons[2] },
      { name: "Sauna & Hammam", description: "Espaces de bien-être et détente", icon: icons[3] },
      { name: "Cure Journée", description: "Journée bien-être complète", icon: icons[4] }
    ];
    teamMembers = [
      { name: "Isabelle Moreau", position: "Esthéticienne" },
      { name: "David Robert", position: "Masseur" },
      { name: "Laurent Simon", position: "Spécialiste Spa" },
      { name: "Julie Garnier", position: "Conseillère Bien-être" }
    ];
  }
  else if (sector.includes("médec") || sector.includes("clinique")) {
    services = [
      { name: "Consultation Générale", description: "Bilan de santé complet et diagnostic", icon: icons[0] },
      { name: "Vaccinations", description: "Calendrier vaccinal à jour", icon: icons[1] },
      { name: "Examens Préventifs", description: "Dépistage et prévention", icon: icons[2] },
      { name: "Télémédecine", description: "Consultations à distance sécurisées", icon: icons[3] },
      { name: "Urgences", description: "Service d'urgence 24/7", icon: icons[4] }
    ];
    teamMembers = [
      { name: "Dr. Martin Blanc", position: "Médecin Généraliste" },
      { name: "Dr. Sophie Rousseau", position: "Pédiatre" },
      { name: "Dr. Pierre Dubois", position: "Cardiologue" },
      { name: "Dr. Marie Laurent", position: "Infirmière" }
    ];
  }
  else {
    // Business général
    services = [
      { name: "Consultation", description: "Analyse de vos besoins personnalisée", icon: icons[0] },
      { name: "Service Premium", description: "Solution complète adaptée", icon: icons[1] },
      { name: "Support Technique", description: "Assistance continue et réactive", icon: icons[2] },
      { name: "Formation", description: "Transfert de compétences", icon: icons[3] },
      { name: "Maintenance", description: "Entretien régulier optimisé", icon: icons[4] }
    ];
    teamMembers = [
      { name: "Thomas Bernard", position: "Directeur" },
      { name: "Claire Martin", position: "Consultante Senior" },
      { name: "Nicolas Petit", position: "Technicien Expert" },
      { name: "Sophie Durand", position: "Support Client" }
    ];
  }
  
  testimonials = [
    {
      name: "Client Satisfait",
      text: `Excellent service chez ${lead.name}! Professionnalisme exceptionnel et résultats dépassant mes attentes.`,
      profession: "Client fidèle",
      rating: 5
    },
    {
      name: "Marie Dupont",
      text: `Une expérience incroyable avec ${lead.name}. L'équipe est compétente et l'accueil chaleureux.`,
      profession: "Cliente régulière",
      rating: 5
    },
    {
      name: "Jean Martin",
      text: `Service impeccable et qualité irréprochable. ${lead.name} est devenu mon partenaire de confiance.`,
      profession: "Client satisfait",
      rating: 5
    },
    {
      name: "Sophie Laurent",
      text: `Je recommande vivement ${lead.name} pour leur professionnalisme et leur réactivité exceptionnelle.`,
      profession: "Partenaire",
      rating: 5
    }
  ];
  
  return {
    companyName: lead.name,
    sector: lead.sector || "Professionnel",
    city: lead.city || "France",
    phone: lead.phone || "+012 345 6789",
    email: lead.email || "info@example.com",
    address: lead.address || "123 Street, Paris, France",
    description: lead.description || `Expert ${lead.sector || 'professionnel'} de confiance à ${lead.city || 'votre région'}.`,
    services,
    teamMembers,
    testimonials
  };
}

export function generatePlumberzSite(lead: Lead): string {
  const content = generateBusinessContent(lead);
  const images = getBusinessImages(lead.sector);
  const colors = getBusinessColors(lead.sector);
  
  return `<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="utf-8">
    <title>${content.companyName} - ${content.sector}</title>
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <meta content="${content.sector}, ${content.city}, professionnel, service" name="keywords">
    <meta content="${content.description}" name="description">

    <!-- Favicon -->
    <link href="img/favicon.ico" rel="icon">

    <!-- Google Web Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Roboto:wght@500;700&display=swap" rel="stylesheet">

    <!-- Icon Font Stylesheet -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet">

    <!-- Libraries Stylesheet -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/tempusdominus/5.0.0/css/tempusdominus-bootstrap-4.min.css" rel="stylesheet" />

    <!-- Customized Bootstrap Stylesheet -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Template Stylesheet -->
    <style>
        :root {
            --primary: ${colors.primary};
            --secondary: ${colors.secondary};
        }

        .bg-primary { background-color: var(--primary) !important; }
        .text-primary { color: var(--primary) !important; }
        .btn-primary { background-color: var(--primary) !important; border-color: var(--primary) !important; }
        .btn-primary:hover { background-color: var(--secondary) !important; border-color: var(--secondary) !important; }
        
        .spinner-border { border-color: var(--primary) !important; }
        
        .team-text .bg-primary { background-color: var(--primary) !important; }
        
        .testimonial-item .text-secondary { color: var(--primary) !important; }
        
        .btn-outline-primary { border-color: var(--primary) !important; color: var(--primary) !important; }
        .btn-outline-primary:hover { background-color: var(--primary) !important; border-color: var(--primary) !important; }
        
        .service-item-top .btn-outline-primary { border-color: var(--primary) !important; color: var(--primary) !important; }
        .service-item-top .btn-outline-primary:hover { background-color: var(--primary) !important; color: white !important; }
        
        .footer .btn-outline-light:hover { background-color: var(--primary) !important; border-color: var(--primary) !important; }
        
        .back-to-top { background-color: var(--primary) !important; }
        
        .video { 
            background: linear-gradient(rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)), url('${images[0]}');
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            min-height: 500px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            position: relative;
        }
        
        .btn-play {
            width: 80px;
            height: 80px;
            background: var(--primary);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 24px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .btn-play:hover {
            background: var(--secondary);
            transform: scale(1.1);
        }
        
        .btn-play span {
            display: block;
            width: 0;
            height: 0;
            border-left: 20px solid white;
            border-top: 12px solid transparent;
            border-bottom: 12px solid transparent;
            margin-left: 5px;
        }
        
        .service-item-top {
            transition: all 0.3s ease;
        }
        
        .service-item-top:hover {
            transform: translateY(-10px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        .team-item {
            transition: all 0.3s ease;
        }
        
        .team-item:hover {
            transform: translateY(-10px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        .testimonial-item {
            transition: all 0.3s ease;
        }
        
        .testimonial-item:hover {
            transform: translateY(-10px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        .fact {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
        }
        
        @media (max-width: 768px) {
            .video { min-height: 400px; }
            .btn-play { width: 60px; height: 60px; font-size: 18px; }
        }
    </style>
</head>

<body>
    <!-- Spinner Start -->
    <div id="spinner" class="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
        <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
    <!-- Spinner End -->

    <!-- Topbar Start -->
    <div class="container-fluid bg-light d-none d-lg-block">
        <div class="row align-items-center top-bar">
            <div class="col-lg-3 col-md-12 text-center text-lg-start">
                <a href="" class="navbar-brand m-0 p-0">
                    <h1 class="text-primary m-0">${content.companyName}</h1>
                </a>
            </div>
            <div class="col-lg-9 col-md-12 text-end">
                <div class="h-100 d-inline-flex align-items-center me-4">
                    <i class="fa fa-map-marker-alt text-primary me-2"></i>
                    <p class="m-0">${content.address}</p>
                </div>
                <div class="h-100 d-inline-flex align-items-center me-4">
                    <i class="far fa-envelope-open text-primary me-2"></i>
                    <p class="m-0">${content.email}</p>
                </div>
                <div class="h-100 d-inline-flex align-items-center">
                    <a class="btn btn-sm-square bg-white text-primary me-1" href=""><i class="fab fa-facebook-f"></i></a>
                    <a class="btn btn-sm-square bg-white text-primary me-1" href=""><i class="fab fa-twitter"></i></a>
                    <a class="btn btn-sm-square bg-white text-primary me-1" href=""><i class="fab fa-linkedin-in"></i></a>
                    <a class="btn btn-sm-square bg-white text-primary me-0" href=""><i class="fab fa-instagram"></i></a>
                </div>
            </div>
        </div>
    </div>
    <!-- Topbar End -->

    <!-- Navbar Start -->
    <div class="container-fluid nav-bar bg-light">
        <nav class="navbar navbar-expand-lg navbar-light bg-white p-3 py-lg-0 px-lg-4">
            <a href="" class="navbar-brand d-flex align-items-center m-0 p-0 d-lg-none">
                <h1 class="text-primary m-0">${content.companyName}</h1>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span class="fa fa-bars"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <div class="navbar-nav me-auto">
                    <a href="#home" class="nav-item nav-link active">Accueil</a>
                    <a href="#about" class="nav-item nav-link">À Propos</a>
                    <a href="#services" class="nav-item nav-link">Services</a>
                    <div class="nav-item dropdown">
                        <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                        <div class="dropdown-menu fade-up m-0">
                            <a href="#booking" class="dropdown-item">Réservation</a>
                            <a href="#team" class="dropdown-item">Équipe</a>
                            <a href="#testimonials" class="dropdown-item">Témoignages</a>
                            <a href="#contact" class="dropdown-item">Contact</a>
                        </div>
                    </div>
                    <a href="#contact" class="nav-item nav-link">Contact</a>
                </div>
                <div class="mt-4 mt-lg-0 me-lg-n4 py-3 px-4 bg-primary d-flex align-items-center">
                    <div class="d-flex flex-shrink-0 align-items-center justify-content-center bg-white" style="width: 45px; height: 45px;">
                        <i class="fa fa-phone-alt text-primary"></i>
                    </div>
                    <div class="ms-3">
                        <p class="mb-1 text-white">Urgence 24/7</p>
                        <h5 class="m-0 text-secondary">${content.phone}</h5>
                    </div>
                </div>
            </div>
        </nav>
    </div>
    <!-- Navbar End -->

    <!-- Carousel Start -->
    <div class="container-fluid p-0 mb-5" id="home">
        <div class="owl-carousel header-carousel position-relative">
            <div class="owl-carousel-item position-relative">
                <img class="img-fluid" src="${images[0]}" alt="${content.companyName}">
                <div class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center" style="background: rgba(0, 0, 0, .4);">
                    <div class="container">
                        <div class="row justify-content-start">
                            <div class="col-10 col-lg-8">
                                <h5 class="text-white text-uppercase mb-3 animated slideInDown">${content.sector} & Services Professionnels</h5>
                                <h1 class="display-3 text-white animated slideInDown mb-4">Services ${content.sector} Efficaces et Fiables</h1>
                                <p class="fs-5 fw-medium text-white mb-4 pb-2">${content.description}</p>
                                <a href="#about" class="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft">En Savoir Plus</a>
                                <a href="#booking" class="btn btn-secondary py-md-3 px-md-5 animated slideInRight">Devis Gratuit</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="owl-carousel-item position-relative">
                <img class="img-fluid" src="${images[1]}" alt="${content.companyName}">
                <div class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center" style="background: rgba(0, 0, 0, .4);">
                    <div class="container">
                        <div class="row justify-content-start">
                            <div class="col-10 col-lg-8">
                                <h5 class="text-white text-uppercase mb-3 animated slideInDown">Excellence & Qualité</h5>
                                <h1 class="display-3 text-white animated slideInDown mb-4">Solutions Professionnelles Adaptées</h1>
                                <p class="fs-5 fw-medium text-white mb-4 pb-2">Expertise confirmée et service client exceptionnel pour tous vos besoins.</p>
                                <a href="#services" class="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft">Nos Services</a>
                                <a href="#contact" class="btn btn-secondary py-md-3 px-md-5 animated slideInRight">Contactez-nous</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Carousel End -->

    <!-- Service Start -->
    <div class="container-xxl py-5" id="services">
        <div class="container">
            <div class="row g-4">
                ${content.services.slice(0, 3).map((service, index) => `
                <div class="col-lg-4 col-md-6 service-item-top wow fadeInUp" data-wow-delay="${index * 0.2}s">
                    <div class="overflow-hidden">
                        <img class="img-fluid w-100 h-100" src="${images[index + 2] || images[0]}" alt="${service.name}">
                    </div>
                    <div class="d-flex align-items-center justify-content-between bg-light p-4">
                        <h5 class="text-truncate me-3 mb-0">${service.name}</h5>
                        <a class="btn btn-square btn-outline-primary border-2 border-white flex-shrink-0" href="#booking"><i class="fa fa-arrow-right"></i></a>
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
    </div>
    <!-- Service End -->

    <!-- About Start -->
    <div class="container-xxl py-5" id="about">
        <div class="container">
            <div class="row g-5">
                <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                    <h6 class="text-secondary text-uppercase">À Propos de Nous</h6>
                    <h1 class="mb-4">Entreprise ${content.sector} de Confiance Depuis Plusieurs Années</h1>
                    <p class="mb-4">${content.description}</p>
                    <p class="fw-medium text-primary"><i class="fa fa-check text-success me-3"></i>Services ${content.sector} résidentiels & commerciaux</p>
                    <p class="fw-medium text-primary"><i class="fa fa-check text-success me-3"></i>Services de qualité à prix abordables</p>
                    <p class="fw-medium text-primary"><i class="fa fa-check text-success me-3"></i>Services d'urgence 24/7 immédiats</p>
                    <div class="bg-primary d-flex align-items-center p-4 mt-5">
                        <div class="d-flex flex-shrink-0 align-items-center justify-content-center bg-white" style="width: 60px; height: 60px;">
                            <i class="fa fa-phone-alt fa-2x text-primary"></i>
                        </div>
                        <div class="ms-3">
                            <p class="fs-5 fw-medium mb-2 text-white">Urgence 24/7</p>
                            <h3 class="m-0 text-secondary">${content.phone}</h3>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 pt-4" style="min-height: 500px;">
                    <div class="position-relative h-100 wow fadeInUp" data-wow-delay="0.5s">
                        <img class="position-absolute img-fluid w-100 h-100" src="${images[3] || images[0]}" style="object-fit: cover; padding: 0 0 50px 100px;" alt="${content.companyName}">
                        <img class="position-absolute start-0 bottom-0 img-fluid bg-white pt-2 pe-2 w-50 h-50" src="${images[4] || images[1]}" style="object-fit: cover;" alt="${content.companyName}">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- About End -->

    <!-- Fact Start -->
    <div class="container-fluid fact bg-dark my-5 py-5">
        <div class="container">
            <div class="row g-4">
                <div class="col-md-6 col-lg-3 text-center wow fadeIn" data-wow-delay="0.1s">
                    <i class="fa fa-check fa-2x text-white mb-3"></i>
                    <h2 class="text-white mb-2" data-toggle="counter-up">15</h2>
                    <p class="text-white mb-0">Années d'Expérience</p>
                </div>
                <div class="col-md-6 col-lg-3 text-center wow fadeIn" data-wow-delay="0.3s">
                    <i class="fa fa-users-cog fa-2x text-white mb-3"></i>
                    <h2 class="text-white mb-2" data-toggle="counter-up">25</h2>
                    <p class="text-white mb-0">Experts Techniques</p>
                </div>
                <div class="col-md-6 col-lg-3 text-center wow fadeIn" data-wow-delay="0.5s">
                    <i class="fa fa-users fa-2x text-white mb-3"></i>
                    <h2 class="text-white mb-2" data-toggle="counter-up">1500</h2>
                    <p class="text-white mb-0">Clients Satisfaits</p>
                </div>
                <div class="col-md-6 col-lg-3 text-center wow fadeIn" data-wow-delay="0.7s">
                    <i class="fa fa-wrench fa-2x text-white mb-3"></i>
                    <h2 class="text-white mb-2" data-toggle="counter-up">2000</h2>
                    <p class="text-white mb-0">Projets Complétés</p>
                </div>
            </div>
        </div>
    </div>
    <!-- Fact End -->

    <!-- Service Detail Start -->
    <div class="container-fluid py-5 px-4 px-lg-0">
        <div class="row g-0">
            <div class="col-lg-3 d-none d-lg-flex">
                <div class="d-flex align-items-center justify-content-center bg-primary w-100 h-100">
                    <h1 class="display-3 text-white m-0" style="transform: rotate(-90deg);">15 Ans d'Expérience</h1>
                </div>
            </div>
            <div class="col-md-12 col-lg-9">
                <div class="ms-lg-5 ps-lg-5">
                    <div class="text-center text-lg-start wow fadeInUp" data-wow-delay="0.1s">
                        <h6 class="text-secondary text-uppercase">Nos Services</h6>
                        <h1 class="mb-5">Découvrez Nos Services</h1>
                    </div>
                    <div class="owl-carousel service-carousel position-relative wow fadeInUp" data-wow-delay="0.1s">
                        ${content.services.map((service, index) => `
                        <div class="bg-light p-4">
                            <div class="d-flex align-items-center justify-content-center border border-5 border-white mb-4" style="width: 75px; height: 75px;">
                                <i class="fa ${service.icon} fa-2x text-primary"></i>
                            </div>
                            <h4 class="mb-3">${service.name}</h4>
                            <p>${service.description}</p>
                            <p class="text-primary fw-medium"><i class="fa fa-check text-success me-2"></i>Service de Qualité</p>
                            <p class="text-primary fw-medium"><i class="fa fa-check text-success me-2"></i>Satisfaction Client</p>
                            <p class="text-primary fw-medium"><i class="fa fa-check text-success me-2"></i>Support 24/7</p>
                            <a href="#booking" class="btn bg-white text-primary w-100 mt-2">En Savoir Plus<i class="fa fa-arrow-right text-secondary ms-2"></i></a>
                        </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Service Detail End -->

    <!-- Booking Start -->
    <div class="container-fluid my-5 px-0" id="booking">
        <div class="video wow fadeInUp" data-wow-delay="0.1s">
            <h1 class="text-white mb-4">Service d'Urgence ${content.sector}</h1>
            <h3 class="text-white mb-0">24 Heures par Jour, 7 Jours par Semaine</h3>
        </div>
        <div class="container position-relative wow fadeInUp" data-wow-delay="0.1s" style="margin-top: -6rem;">
            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <div class="bg-light text-center p-5">
                        <h1 class="mb-4">Réserver un Service</h1>
                        <form>
                            <div class="row g-3">
                                <div class="col-12 col-sm-6">
                                    <input type="text" class="form-control border-0" placeholder="Votre Nom" style="height: 55px;">
                                </div>
                                <div class="col-12 col-sm-6">
                                    <input type="email" class="form-control border-0" placeholder="Votre Email" style="height: 55px;">
                                </div>
                                <div class="col-12 col-sm-6">
                                    <select class="form-select border-0" style="height: 55px;">
                                        <option selected>Sélectionner un Service</option>
                                        ${content.services.map((service, index) => `<option value="${index + 1}">${service.name}</option>`).join('')}
                                    </select>
                                </div>
                                <div class="col-12 col-sm-6">
                                    <input type="date" class="form-control border-0" placeholder="Date de Service" style="height: 55px;">
                                </div>
                                <div class="col-12">
                                    <textarea class="form-control border-0" placeholder="Demande Spécifique" rows="4"></textarea>
                                </div>
                                <div class="col-12">
                                    <button class="btn btn-primary w-100 py-3" type="submit">Réserver Maintenant</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Booking End -->

    <!-- Team Start -->
    <div class="container-xxl py-5" id="team">
        <div class="container">
            <div class="text-center wow fadeInUp" data-wow-delay="0.1s">
                <h6 class="text-secondary text-uppercase">Notre Équipe</h6>
                <h1 class="mb-5">Nos Experts Techniques</h1>
            </div>
            <div class="row g-4">
                ${content.teamMembers.map((member, index) => `
                <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="${index * 0.2}s">
                    <div class="team-item">
                        <div class="position-relative overflow-hidden">
                            <img class="img-fluid" src="${images[index % images.length]}" alt="${member.name}">
                        </div>
                        <div class="team-text">
                            <div class="bg-light">
                                <h5 class="fw-bold mb-0">${member.name}</h5>
                                <small>${member.position}</small>
                            </div>
                            <div class="bg-primary">
                                <a class="btn btn-square mx-1" href=""><i class="fab fa-facebook-f"></i></a>
                                <a class="btn btn-square mx-1" href=""><i class="fab fa-twitter"></i></a>
                                <a class="btn btn-square mx-1" href=""><i class="fab fa-instagram"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
    </div>
    <!-- Team End -->

    <!-- Testimonial Start -->
    <div class="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s" id="testimonials">
        <div class="container">
            <div class="text-center">
                <h6 class="text-secondary text-uppercase">Témoignages</h6>
                <h1 class="mb-5">Ce Que Disent Nos Clients!</h1>
            </div>
            <div class="owl-carousel testimonial-carousel position-relative wow fadeInUp" data-wow-delay="0.1s">
                ${content.testimonials.map((testimonial, index) => `
                <div class="testimonial-item text-center">
                    <div class="testimonial-text bg-light text-center p-4 mb-4">
                        <p class="mb-0">${testimonial.text}</p>
                    </div>
                    <img class="bg-light rounded-circle p-2 mx-auto mb-2" src="${images[index % images.length]}" style="width: 80px; height: 80px;">
                    <div class="mb-2">
                        ${Array(testimonial.rating).fill('<small class="fa fa-star text-secondary"></small>').join('')}
                    </div>
                    <h5 class="mb-1">${testimonial.name}</h5>
                    <p class="m-0">${testimonial.profession}</p>
                </div>
                `).join('')}
            </div>
        </div>
    </div>
    <!-- Testimonial End -->

    <!-- Footer Start -->
    <div class="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn" data-wow-delay="0.1s" id="contact">
        <div class="container py-5">
            <div class="row g-5">
                <div class="col-lg-3 col-md-6">
                    <h4 class="text-light mb-4">Adresse</h4>
                    <p class="mb-2"><i class="fa fa-map-marker-alt me-3"></i>${content.address}</p>
                    <p class="mb-2"><i class="fa fa-phone-alt me-3"></i>${content.phone}</p>
                    <p class="mb-2"><i class="fa fa-envelope me-3"></i>${content.email}</p>
                    <div class="d-flex pt-2">
                        <a class="btn btn-outline-light btn-social" href=""><i class="fab fa-twitter"></i></a>
                        <a class="btn btn-outline-light btn-social" href=""><i class="fab fa-facebook-f"></i></a>
                        <a class="btn btn-outline-light btn-social" href=""><i class="fab fa-youtube"></i></a>
                        <a class="btn btn-outline-light btn-social" href=""><i class="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <h4 class="text-light mb-4">Horaires d'Ouverture</h4>
                    <h6 class="text-light">Lundi - Vendredi:</h6>
                    <p class="mb-4">09:00 - 18:00</p>
                    <h6 class="text-light">Samedi - Dimanche:</h6>
                    <p class="mb-0">09:00 - 12:00</p>
                </div>
                <div class="col-lg-3 col-md-6">
                    <h4 class="text-light mb-4">Services</h4>
                    ${content.services.slice(0, 4).map(service => `
                    <a class="btn btn-link" href="#services">${service.name}</a>
                    `).join('')}
                </div>
                <div class="col-lg-3 col-md-6">
                    <h4 class="text-light mb-4">Newsletter</h4>
                    <p>Restez informé de nos dernières actualités et offres spéciales.</p>
                    <div class="position-relative mx-auto" style="max-width: 400px;">
                        <input class="form-control border-0 w-100 py-3 ps-4 pe-5" type="text" placeholder="Votre email">
                        <button type="button" class="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2">S'inscrire</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="copyright">
                <div class="row">
                    <div class="col-md-6 text-center text-md-start mb-3 mb-md-0">
                        &copy; <a class="border-bottom" href="#">${content.companyName}</a>, Tous Droits Réservés.
                    </div>
                    <div class="col-md-6 text-center text-md-end">
                        Designed By <a class="border-bottom" href="#">LeadForge AI</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Footer End -->

    <!-- Back to Top -->
    <a href="#" class="btn btn-lg btn-primary btn-lg-square rounded-0 back-to-top"><i class="bi bi-arrow-up"></i></a>

    <!-- JavaScript Libraries -->
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/easing/1.4.1/easing.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/waypoints/4.0.1/jquery.waypoints.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Counter-Up/1.0.0/jquery.counterup.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tempusdominus/5.0.0/js/moment.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tempusdominus/5.0.0/js/moment-timezone.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tempusdominus/5.0.0/js/tempusdominus-bootstrap-4.min.js"></script>

    <!-- Template Javascript -->
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

        // Counter animation
        $(document).ready(function() {
            $('[data-toggle="counter-up"]').each(function() {
                var $this = $(this);
                var countTo = $this.attr('data-count') || $this.text();
                $({ countNum: $this.text() }).animate({
                    countNum: countTo
                }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function() {
                        $this.text(this.countNum);
                    }
                });
            });
        });

        // Initialize Owl Carousel
        $(document).ready(function() {
            $('.header-carousel').owlCarousel({
                animateOut: 'fadeOut',
                animateIn: 'fadeIn',
                items: 1,
                margin: 0,
                stagePadding: 0,
                smartSpeed: 450,
                autoplay: true,
                autoplayTimeout: 5000,
                autoplayHoverPause: true,
                loop: true,
                dots: false,
                nav: true,
                navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>']
            });

            $('.service-carousel').owlCarousel({
                loop: true,
                margin: 30,
                nav: true,
                navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
                responsive: {
                    0: { items: 1 },
                    768: { items: 2 },
                    992: { items: 3 }
                }
            });

            $('.testimonial-carousel').owlCarousel({
                loop: true,
                margin: 30,
                nav: true,
                navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
                responsive: {
                    0: { items: 1 },
                    768: { items: 2 },
                    992: { items: 3 }
                }
            });
        });

        // Form submission
        document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Merci pour votre réservation! Nous vous contacterons rapidement.');
            this.reset();
        });
    </script>
</body>

</html>`;
}

export type { PlumberzContent };
