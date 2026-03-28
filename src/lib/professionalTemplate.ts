// ── TEMPLATE PROFESSIONNEL GARANTI 100% ──
// Plus de risques IA - template parfait pour chaque secteur

export interface ProfessionalContent {
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  services: Array<{ name: string; description: string; icon: string }>;
  testimonials: Array<{ author: string; text: string; rating: number }>;
  contactInfo: {
    phone?: string;
    email?: string;
    address?: string;
    city?: string;
  };
  sector: string;
  companyName: string;
}

const SECTOR_TEMPLATES = {
  plomberie: {
    primary: '#2563eb',
    secondary: '#3b82f6',
    accent: '#60a5fa',
    services: [
      'Dépannage urgence 24/7',
      'Installation sanitaire',
      'Chauffage et climatisation',
      'Plomberie générale',
      'Diagnostic fuites',
      'Rénovation salle de bain'
    ],
    heroText: 'Expert plombier à votre service',
    about: 'Artisan plombier certifié avec 15 ans d\'expérience',
    color: 'blue'
  },
  electricien: {
    primary: '#dc2626',
    secondary: '#ef4444',
    accent: '#f87171',
    services: [
      'Mise aux normes électriques',
      'Tableau électrique',
      'Éclairage',
      'Domotique',
      'Dépannage urgence',
      'Diagnostic électrique'
    ],
    heroText: 'Électricien qualifié et rapide',
    about: 'Électricien certifié avec garantie décennale',
    color: 'red'
  },
  coiffeur: {
    primary: '#7c3aed',
    secondary: '#8b5cf6',
    accent: '#a78bfa',
    services: [
      'Coupe femme',
      'Coupe homme',
      'Coloration',
      'Balayage',
      'Soin capillaire',
      'Extension cheveux'
    ],
    heroText: 'Artiste coiffeur pour votre style',
    about: 'Salon de coiffure moderne et équipe passionnée',
    color: 'purple'
  },
  restaurant: {
    primary: '#ea580c',
    secondary: '#f97316',
    accent: '#fb923c',
    services: [
      'Plats traditionnels',
      'Menu dégustation',
      'Service traiteur',
      'Vins sélectionnés',
      'Brunch dominical',
      'Événements privés'
    ],
    heroText: 'Cuisine authentique et savoureuse',
    about: 'Chef expérimenté et produits locaux de qualité',
    color: 'orange'
  },
  garage: {
    primary: '#166534',
    secondary: '#15803d',
    accent: '#16a34a',
    services: [
      'Diagnostic moteur',
      'Révision complète',
      'Pneumatique',
      'Carrosserie',
      'Vidange',
      'Contrôle technique'
    ],
    heroText: 'Garage automobile de confiance',
    about: 'Mécaniciens experts et équipements modernes',
    color: 'green'
  },
  default: {
    primary: '#1f2937',
    secondary: '#374151',
    accent: '#6b7280',
    services: [
      'Consultation professionnelle',
      'Service personnalisé',
      'Intervention rapide',
      'Devis gratuit',
      'Garantie satisfaction',
      'Support client'
    ],
    heroText: 'Professionnel à votre service',
    about: 'Expert dans notre domaine avec années d\'expérience',
    color: 'gray'
  }
};

function getSectorTemplate(sector: string) {
  const normalizedSector = (sector || '').toLowerCase();
  
  for (const [key, template] of Object.entries(SECTOR_TEMPLATES)) {
    if (normalizedSector.includes(key)) {
      return template;
    }
  }
  
  // Vérifications spécifiques
  if (normalizedSector.includes('médec') || normalizedSector.includes('clinique')) {
    return SECTOR_TEMPLATES.default;
  }
  if (normalizedSector.includes('avocat') || normalizedSector.includes('notaire')) {
    return SECTOR_TEMPLATES.default;
  }
  if (normalizedSector.includes('beauté') || normalizedSector.includes('esthétique')) {
    return SECTOR_TEMPLATES.coiffeur;
  }
  
  return SECTOR_TEMPLATES.default;
}

export function generateProfessionalSite(lead: any): string {
  const sectorTemplate = getSectorTemplate(lead.sector);
  const companyName = lead.name || 'Entreprise';
  const city = lead.city || '';
  const phone = lead.phone || '';
  const email = lead.email || '';
  const address = lead.address || '';
  const description = lead.description || sectorTemplate.about;
  
  // Extraire les avis clients
  const testimonials = (lead.googleReviewsData || []).slice(0, 3).map((review: any) => ({
    author: review.author || 'Client satisfait',
    text: review.text || 'Excellent service, je recommande vivement !',
    rating: review.rating || 5
  }));

  // Générer les services personnalisés
  const services = sectorTemplate.services.map((serviceName, index) => ({
    name: serviceName,
    description: `Solution professionnelle ${serviceName.toLowerCase()} adaptée à vos besoins spécifiques.`,
    icon: getIconForService(serviceName, index)
  }));

  const content: ProfessionalContent = {
    heroTitle: companyName,
    heroSubtitle: `${sectorTemplate.heroText}${city ? ' à ' + city : ''}. ${description}`,
    aboutText: description,
    services,
    testimonials,
    contactInfo: { phone, email, address, city },
    sector: lead.sector || 'Professionnel',
    companyName
  };

  return buildProfessionalHTML(content, sectorTemplate);
}

function getIconForService(serviceName: string, index: number): string {
  const icons = [
    '⚡', '🔧', '🛠️', '🏆', '💎', '🛡️', 
    '📞', '🏠', '🚗', '💇', '🍽️', '🔌'
  ];
  return icons[index % icons.length];
}

function buildProfessionalHTML(content: ProfessionalContent, template: any): string {
  const { companyName, heroTitle, heroSubtitle, aboutText, services, testimonials, contactInfo } = content;
  
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${companyName} - ${content.sector}${contactInfo.city ? ' à ' + contactInfo.city : ''}</title>
    <meta name="description" content="${heroSubtitle.substring(0, 160)}">
    <meta name="keywords" content="${companyName}, ${content.sector}, ${contactInfo.city || 'France'}">
    
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet">
    
    <style>
        :root {
            --primary-color: ${template.primary};
            --secondary-color: ${template.secondary};
            --accent-color: ${template.accent};
            --dark-color: #1f2937;
            --light-color: #f9fafb;
            --gradient: linear-gradient(135deg, ${template.primary} 0%, ${template.secondary} 100%);
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
            color: var(--dark-color);
            overflow-x: hidden;
        }
        
        h1, h2, h3, h4, h5, h6 {
            font-family: 'Playfair Display', serif;
            font-weight: 700;
        }
        
        /* Navigation */
        .navbar {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
            padding: 1rem 0;
            position: fixed;
            width: 100%;
            top: 0;
            z-index: 1000;
            transition: all 0.3s ease;
        }
        
        .navbar-brand {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--primary-color) !important;
            text-decoration: none;
        }
        
        .nav-link {
            color: var(--dark-color) !important;
            font-weight: 500;
            margin: 0 0.5rem;
            transition: all 0.3s ease;
            position: relative;
        }
        
        .nav-link:hover {
            color: var(--primary-color) !important;
        }
        
        .nav-link::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 0;
            height: 2px;
            background: var(--primary-color);
            transition: width 0.3s ease;
        }
        
        .nav-link:hover::after {
            width: 100%;
        }
        
        /* Hero Section */
        .hero {
            background: var(--gradient);
            min-height: 100vh;
            display: flex;
            align-items: center;
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
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
            opacity: 0.3;
        }
        
        .hero-content {
            position: relative;
            z-index: 2;
        }
        
        .hero h1 {
            font-size: clamp(2.5rem, 5vw, 4rem);
            color: white;
            margin-bottom: 1.5rem;
            font-weight: 800;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .hero p {
            font-size: 1.25rem;
            color: rgba(255, 255, 255, 0.9);
            margin-bottom: 2rem;
            max-width: 600px;
        }
        
        .btn-primary-custom {
            background: white;
            color: var(--primary-color);
            padding: 1rem 2rem;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            display: inline-block;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }
        
        .btn-primary-custom:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
            color: var(--primary-color);
        }
        
        /* Sections */
        .section {
            padding: 5rem 0;
        }
        
        .section-title {
            text-align: center;
            margin-bottom: 3rem;
        }
        
        .section-title h2 {
            font-size: 2.5rem;
            color: var(--dark-color);
            margin-bottom: 1rem;
        }
        
        .section-title p {
            font-size: 1.1rem;
            color: #6b7280;
            max-width: 600px;
            margin: 0 auto;
        }
        
        /* Service Cards */
        .service-card {
            background: white;
            border-radius: 15px;
            padding: 2rem;
            height: 100%;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            transition: all 0.3s ease;
            border: 1px solid #f3f4f6;
        }
        
        .service-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
            border-color: var(--primary-color);
        }
        
        .service-icon {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            display: block;
        }
        
        .service-card h3 {
            font-size: 1.25rem;
            color: var(--dark-color);
            margin-bottom: 1rem;
        }
        
        .service-card p {
            color: #6b7280;
            margin-bottom: 0;
        }
        
        /* About Section */
        .about-section {
            background: var(--light-color);
        }
        
        .about-content {
            background: white;
            border-radius: 20px;
            padding: 3rem;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
        }
        
        /* Testimonials */
        .testimonial-card {
            background: white;
            border-radius: 15px;
            padding: 2rem;
            height: 100%;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            position: relative;
        }
        
        .testimonial-card::before {
            content: '"';
            position: absolute;
            top: 1rem;
            left: 1.5rem;
            font-size: 3rem;
            color: var(--primary-color);
            opacity: 0.2;
            font-family: 'Playfair Display', serif;
        }
        
        .testimonial-text {
            font-style: italic;
            margin-bottom: 1.5rem;
            color: var(--dark-color);
        }
        
        .testimonial-author {
            font-weight: 600;
            color: var(--primary-color);
            margin-bottom: 0.5rem;
        }
        
        .testimonial-rating {
            color: #fbbf24;
        }
        
        /* Contact Section */
        .contact-section {
            background: var(--gradient);
            color: white;
        }
        
        .contact-card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 3rem;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .contact-info-item {
            display: flex;
            align-items: center;
            margin-bottom: 1.5rem;
        }
        
        .contact-info-item i {
            font-size: 1.5rem;
            margin-right: 1rem;
            color: white;
        }
        
        .contact-info-item span {
            font-size: 1.1rem;
        }
        
        .btn-contact {
            background: white;
            color: var(--primary-color);
            padding: 1rem 2rem;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            display: inline-block;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }
        
        .btn-contact:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
            color: var(--primary-color);
        }
        
        /* Footer */
        footer {
            background: var(--dark-color);
            color: white;
            padding: 3rem 0 1rem;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .hero h1 {
                font-size: 2rem;
            }
            
            .hero p {
                font-size: 1rem;
            }
            
            .section {
                padding: 3rem 0;
            }
            
            .section-title h2 {
                font-size: 2rem;
            }
            
            .service-card {
                padding: 1.5rem;
            }
            
            .about-content {
                padding: 2rem;
            }
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg">
        <div class="container">
            <a class="navbar-brand" href="#home">${companyName}</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#home">Accueil</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#services">Services</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#about">À Propos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#testimonials">Avis</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#contact">Contact</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero" id="home">
        <div class="container">
            <div class="hero-content text-center">
                <h1>${heroTitle}</h1>
                <p>${heroSubtitle}</p>
                <a href="#contact" class="btn-primary-custom">Nous Contacter</a>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section class="section" id="services">
        <div class="container">
            <div class="section-title">
                <h2>Nos Services</h2>
                <p>Découvrez notre gamme complète de services professionnels</p>
            </div>
            <div class="row g-4">
                ${services.map((service, index) => `
                <div class="col-md-6 col-lg-4">
                    <div class="service-card">
                        <div class="service-icon">${service.icon}</div>
                        <h3>${service.name}</h3>
                        <p>${service.description}</p>
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section class="section about-section" id="about">
        <div class="container">
            <div class="section-title">
                <h2>À Propos</h2>
                <p>Notre histoire et notre engagement</p>
            </div>
            <div class="about-content">
                <div class="row align-items-center">
                    <div class="col-lg-12">
                        <h3 class="mb-3">${companyName}</h3>
                        <p class="lead">${aboutText}</p>
                        <p>Nous sommes passionnés par notre métier et nous nous engageons à fournir un service d'excellence à chaque client. Notre expertise et notre savoir-faire garantissent des résultats durables et satisfaisants.</p>
                        <div class="row mt-4">
                            <div class="col-md-4">
                                <div class="text-center">
                                    <div class="display-4 text-primary mb-2">15+</div>
                                    <div>Années d'expérience</div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="text-center">
                                    <div class="display-4 text-primary mb-2">500+</div>
                                    <div>Clients satisfaits</div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="text-center">
                                    <div class="display-4 text-primary mb-2">24/7</div>
                                    <div>Support disponible</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials Section -->
    ${testimonials.length > 0 ? `
    <section class="section" id="testimonials">
        <div class="container">
            <div class="section-title">
                <h2>Avis Clients</h2>
                <p>Ce que nos clients disent de nous</p>
            </div>
            <div class="row g-4">
                ${testimonials.map((testimonial, index) => `
                <div class="col-md-6 col-lg-4">
                    <div class="testimonial-card">
                        <div class="testimonial-text">
                            "${testimonial.text}"
                        </div>
                        <div class="testimonial-author">${testimonial.author}</div>
                        <div class="testimonial-rating">
                            ${'★'.repeat(testimonial.rating)}${'☆'.repeat(5 - testimonial.rating)}
                        </div>
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    <!-- Contact Section -->
    <section class="section contact-section" id="contact">
        <div class="container">
            <div class="section-title">
                <h2 style="color: white;">Contact</h2>
                <p style="color: rgba(255,255,255,0.9);">Prenez rendez-vous ou posez vos questions</p>
            </div>
            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <div class="contact-card">
                        <div class="row">
                            <div class="col-md-6">
                                ${contactInfo.phone ? `
                                <div class="contact-info-item">
                                    <i class="bi bi-telephone-fill"></i>
                                    <span>${contactInfo.phone}</span>
                                </div>
                                ` : ''}
                                ${contactInfo.email ? `
                                <div class="contact-info-item">
                                    <i class="bi bi-envelope-fill"></i>
                                    <span>${contactInfo.email}</span>
                                </div>
                                ` : ''}
                                ${contactInfo.address ? `
                                <div class="contact-info-item">
                                    <i class="bi bi-geo-alt-fill"></i>
                                    <span>${contactInfo.address}</span>
                                </div>
                                ` : ''}
                            </div>
                            <div class="col-md-6 text-center">
                                <h4 class="mb-3">Contactez-nous</h4>
                                <p class="mb-4">Nous sommes à votre disposition pour répondre à toutes vos questions</p>
                                ${contactInfo.phone ? `
                                <a href="tel:${contactInfo.phone}" class="btn-contact">
                                    <i class="bi bi-telephone-fill me-2"></i>Appeler maintenant
                                </a>
                                ` : ''}
                                ${contactInfo.email ? `
                                <a href="mailto:${contactInfo.email}" class="btn-contact ms-2">
                                    <i class="bi bi-envelope-fill me-2"></i>Envoyer un email
                                </a>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <div class="container text-center">
            <div class="row">
                <div class="col-md-4 mb-4">
                    <h5>${companyName}</h5>
                    <p>${content.sector} professionnel${contactInfo.city ? ' à ' + contactInfo.city : ''}</p>
                </div>
                <div class="col-md-4 mb-4">
                    <h5>Services</h5>
                    <ul class="list-unstyled">
                        ${services.slice(0, 3).map(service => `<li><a href="#services" style="color: #9ca3af; text-decoration: none;">${service.name}</a></li>`).join('')}
                    </ul>
                </div>
                <div class="col-md-4 mb-4">
                    <h5>Contact</h5>
                    <p style="color: #9ca3af;">
                        ${contactInfo.phone ? `<div><i class="bi bi-telephone"></i> ${contactInfo.phone}</div>` : ''}
                        ${contactInfo.email ? `<div><i class="bi bi-envelope"></i> ${contactInfo.email}</div>` : ''}
                    </p>
                </div>
            </div>
            <hr style="border-color: #374151; margin: 2rem 0;">
            <div class="text-center">
                <p>&copy; 2024 ${companyName}. Tous droits réservés.</p>
            </div>
        </div>
    </footer>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    
    <script>
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

        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.padding = '0.5rem 0';
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                navbar.style.padding = '1rem 0';
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        });

        // Animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements
        document.querySelectorAll('.service-card, .testimonial-card, .about-content').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    </script>
</body>
</html>`;
}
