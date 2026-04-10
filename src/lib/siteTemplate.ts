// -- SITE TEMPLATE --
// Template premium pour la génération de sites HTML

import { safeStr } from './supabase-store';

export interface PremiumContent {
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  services: Array<{ name: string; description: string; icon?: string }>;
  cta: string;
  testimonials: Array<{ author: string; text: string; rating: number; date: string }>;
  galleryTitle?: string;
  aboutTitle?: string;
  servicesTitle?: string;
  contactTitle?: string;
  whyChooseUs?: string[];
  heroStyle?: string;
  layoutStyle?: string;
  colorScheme?: string;
  fontStyle?: string;
}

export function generatePremiumSiteHtml(lead: any, content: PremiumContent, offset?: number): string {
  const companyName = safeStr(lead.name);
  const sector = safeStr(lead.sector) || 'Professionnel';
  const city = safeStr(lead.city);
  const phone = safeStr(lead.phone);
  const email = safeStr(lead.email);
  const address = safeStr(lead.address);

  // Get images from lead
  const images = [...(lead.images || []), ...(lead.websiteImages || [])].slice(0, 6);

  // Sector-specific color palette
  const sectorPalettes = {
    restaurant: { primary: '#E8590C', secondary: '#FB923C', dark: '#1c1917', light: '#FFF7ED' },
    coiffeur: { primary: '#7C3AED', secondary: '#A78BFA', dark: '#1e1040', light: '#F5F3FF' },
    spa: { primary: '#0D9488', secondary: '#2DD4BF', dark: '#042f2e', light: '#F0FDFA' },
    médecin: { primary: '#2563EB', secondary: '#60A5FA', dark: '#172554', light: '#EFF6FF' },
    dentiste: { primary: '#0891B2', secondary: '#22D3EE', dark: '#0c4a6e', light: '#ECFEFF' },
    avocat: { primary: '#1e3a5f', secondary: '#3b82f6', dark: '#0f172a', light: '#F1F5F9' },
    hôtel: { primary: '#B45309', secondary: '#F59E0B', dark: '#1c1917', light: '#FFFBEB' },
    default: { primary: '#D4500A', secondary: '#F97316', dark: '#1c1917', light: '#FFF7ED' }
  };

  const getPalette = (sector: string) => {
    const s = (sector || '').toLowerCase();
    for (const [key, palette] of Object.entries(sectorPalettes)) {
      if (s.includes(key)) return palette;
    }
    return sectorPalettes.default;
  };

  const palette = getPalette(sector);

  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${companyName} - ${sector}${city ? ' à ' + city : ''}</title>
    <meta name="description" content="${content.aboutText.substring(0, 160)}">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --primary-color: ${palette.primary};
            --secondary-color: ${palette.secondary};
            --dark-color: ${palette.dark};
            --light-color: ${palette.light};
            --text-dark: #1c1b18;
            --text-light: #6c757d;
            --border-color: #e9ecef;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; line-height: 1.6; color: var(--text-dark); overflow-x: hidden; }

        /* Navigation */
        .navbar { background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); box-shadow: 0 2px 20px rgba(0,0,0,0.1); transition: all 0.3s ease; }
        .navbar-brand { font-weight: 700; font-size: 1.5rem; color: var(--primary-color) !important; }
        .navbar-nav .nav-link { font-weight: 500; color: var(--text-dark) !important; transition: color 0.3s ease; margin: 0 10px; }
        .navbar-nav .nav-link:hover { color: var(--primary-color) !important; }
        .navbar-scrolled { padding: 10px 0 !important; }

        /* Hero Section */
        .hero { min-height: 100vh; background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%); display: flex; align-items: center; position: relative; overflow: hidden; }
        .hero::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.3); z-index: 1; }
        .hero-content { position: relative; z-index: 2; color: white; }
        .hero h1 { font-size: 3.5rem; font-weight: 800; margin-bottom: 20px; animation: fadeInUp 1s ease; }
        .hero .subtitle { font-size: 1.3rem; margin-bottom: 30px; opacity: 0.9; animation: fadeInUp 1s ease 0.2s; animation-fill-mode: both; }
        .hero-buttons { animation: fadeInUp 1s ease 0.4s; animation-fill-mode: both; }
        .btn-hero { padding: 15px 35px; font-weight: 600; border-radius: 50px; text-decoration: none; transition: all 0.3s ease; display: inline-block; margin: 10px; }
        .btn-primary-hero { background: white; color: var(--primary-color); border: 2px solid white; }
        .btn-primary-hero:hover { background: transparent; color: white; transform: translateY(-2px); }
        .btn-secondary-hero { background: transparent; color: white; border: 2px solid white; }
        .btn-secondary-hero:hover { background: white; color: var(--primary-color); transform: translateY(-2px); }

        /* Section Styles */
        .section { padding: 100px 0; }
        .section-title { font-size: 2.5rem; font-weight: 700; margin-bottom: 20px; color: var(--text-dark); }
        .section-subtitle { font-size: 1.1rem; color: var(--text-light); margin-bottom: 50px; }

        /* About Section */
        .about-section { background: var(--light-color); }
        .about-content { font-size: 1.1rem; line-height: 1.8; color: var(--text-dark); }

        /* Services Section */
        .service-card { background: white; border-radius: 20px; padding: 40px; height: 100%; box-shadow: 0 10px 40px rgba(0,0,0,0.1); transition: all 0.3s ease; border: 1px solid var(--border-color); }
        .service-card:hover { transform: translateY(-10px); box-shadow: 0 20px 60px rgba(0,0,0,0.15); }
        .service-icon { width: 70px; height: 70px; background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 1.8rem; color: white; }
        .service-card h3 { font-size: 1.3rem; font-weight: 600; margin-bottom: 15px; color: var(--text-dark); }
        .service-card p { color: var(--text-light); line-height: 1.6; }

        /* Gallery Section */
        .gallery-section { background: var(--light-color); }
        .gallery-item { position: relative; overflow: hidden; border-radius: 15px; height: 250px; margin-bottom: 30px; }
        .gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease; }
        .gallery-item:hover img { transform: scale(1.1); }
        .gallery-overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s ease; }
        .gallery-item:hover .gallery-overlay { opacity: 1; }

        /* Testimonials Section */
        .testimonial-card { background: white; border-radius: 20px; padding: 40px; margin: 20px 0; box-shadow: 0 10px 40px rgba(0,0,0,0.1); border-left: 5px solid var(--primary-color); }
        .testimonial-text { font-size: 1.1rem; line-height: 1.8; margin-bottom: 20px; font-style: italic; color: var(--text-dark); }
        .testimonial-author { font-weight: 600; color: var(--primary-color); margin-bottom: 5px; }
        .testimonial-date { color: var(--text-light); font-size: 0.9rem; }
        .rating { color: #ffc107; margin-bottom: 15px; }

        /* Contact Section */
        .contact-form { background: white; border-radius: 20px; padding: 50px; box-shadow: 0 20px 60px rgba(0,0,0,0.1); }
        .form-control, .form-select { border: 2px solid var(--border-color); border-radius: 10px; padding: 15px; font-size: 1rem; transition: all 0.3s ease; }
        .form-control:focus, .form-select:focus { border-color: var(--primary-color); box-shadow: 0 0 0 0.2rem rgba(0,0,0,0.1); }
        .contact-info-item { display: flex; align-items: center; margin-bottom: 30px; }
        .contact-info-icon { width: 50px; height: 50px; background: var(--primary-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; margin-right: 20px; font-size: 1.2rem; }
        .contact-info-text h4 { margin-bottom: 5px; color: var(--text-dark); }
        .contact-info-text p { color: var(--text-light); margin: 0; }

        /* Footer */
        footer { background: var(--dark-color); color: white; padding: 60px 0 30px; }
        footer h5 { color: var(--primary-color); margin-bottom: 20px; font-weight: 600; }
        footer ul li { margin-bottom: 10px; }
        footer ul li a { color: rgba(255,255,255,0.8); text-decoration: none; transition: color 0.3s ease; }
        footer ul li a:hover { color: var(--primary-color); }
        .footer-bottom { border-top: 1px solid rgba(255,255,255,0.1); margin-top: 40px; padding-top: 30px; text-align: center; color: rgba(255,255,255,0.6); }

        /* Animations */
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeInUp 0.8s ease; }

        /* Responsive */
        @media (max-width: 768px) {
            .hero h1 { font-size: 2.5rem; }
            .section-title { font-size: 2rem; }
            .section { padding: 60px 0; }
            .hero-buttons { text-align: center; }
            .btn-hero { display: block; margin: 10px 0; width: 100%; }
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg fixed-top">
        <div class="container">
            <a class="navbar-brand" href="#home">${companyName}</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link" href="#home">Accueil</a></li>
                    <li class="nav-item"><a class="nav-link" href="#about">À propos</a></li>
                    <li class="nav-item"><a class="nav-link" href="#services">Services</a></li>
                    <li class="nav-item"><a class="nav-link" href="#gallery">Galerie</a></li>
                    <li class="nav-item"><a class="nav-link" href="#testimonials">Témoignages</a></li>
                    <li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="hero">
        <div class="container">
            <div class="hero-content">
                <div class="row align-items-center min-vh-100">
                    <div class="col-lg-6">
                        <h1>${content.heroTitle}</h1>
                        <p class="subtitle">${content.heroSubtitle}</p>
                        <div class="hero-buttons">
                            ${phone ? `<a href="tel:${phone}" class="btn-hero btn-primary-hero">${content.cta}</a>` : ''}
                            ${email ? `<a href="mailto:${email}" class="btn-hero btn-secondary-hero">Nous contacter</a>` : ''}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="section about-section">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center mb-5">
                    <h2 class="section-title">${content.aboutTitle || 'Notre Expertise'}</h2>
                    <p class="section-subtitle">Découvrez notre savoir-faire et notre engagement envers l'excellence</p>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-8 mx-auto">
                    <div class="about-content">
                        <p>${content.aboutText}</p>
                        ${address ? `<p><strong>Adresse :</strong> ${address}</p>` : ''}
                        ${content.whyChooseUs && content.whyChooseUs.length > 0 ? `
                        <div class="mt-4">
                            <h4>Pourquoi nous choisir ?</h4>
                            <ul>
                                ${content.whyChooseUs.map(reason => `<li>${reason}</li>`).join('')}
                            </ul>
                        </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="section">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center mb-5">
                    <h2 class="section-title">${content.servicesTitle || 'Nos Services'}</h2>
                    <p class="section-subtitle">Des solutions professionnelles adaptées à vos besoins</p>
                </div>
            </div>
            <div class="row">
                ${content.services.map((service, index) => `
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="service-card">
                        <div class="service-icon">
                            ${service.icon || '<i class="fas fa-star"></i>'}
                        </div>
                        <h3>${service.name}</h3>
                        <p>${service.description}</p>
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- Gallery Section -->
    ${images.length > 0 ? `
    <section id="gallery" class="section gallery-section">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center mb-5">
                    <h2 class="section-title">${content.galleryTitle || 'Nos Réalisations'}</h2>
                    <p class="section-subtitle">Un aperçu de notre travail et de nos réalisations</p>
                </div>
            </div>
            <div class="row">
                ${images.map(img => `
                <div class="col-lg-4 col-md-6">
                    <div class="gallery-item">
                        <img src="${img}" alt="${companyName}" loading="lazy">
                        <div class="gallery-overlay">
                            <div class="text-white">
                                <h4>${companyName}</h4>
                                <p>${sector}</p>
                            </div>
                        </div>
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    <!-- Testimonials Section -->
    ${content.testimonials.length > 0 ? `
    <section id="testimonials" class="section bg-light">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center mb-5">
                    <h2 class="section-title">Témoignages</h2>
                    <p class="section-subtitle">Ce que nos clients disent de nous</p>
                </div>
            </div>
            <div class="row">
                ${content.testimonials.map(testimonial => `
                <div class="col-lg-4">
                    <div class="testimonial-card">
                        <div class="rating">
                            ${Array(testimonial.rating).fill('<i class="fas fa-star"></i>').join('')}
                        </div>
                        <p class="testimonial-text">"${testimonial.text}"</p>
                        <div class="testimonial-author">${testimonial.author}</div>
                        <div class="testimonial-date">${testimonial.date}</div>
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    <!-- Contact Section -->
    <section id="contact" class="section">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center mb-5">
                    <h2 class="section-title">${content.contactTitle || 'Contactez-nous'}</h2>
                    <p class="section-subtitle">Nous sommes là pour répondre à vos questions</p>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-8 mx-auto">
                    <div class="contact-form">
                        <div class="row">
                            ${phone ? `
                            <div class="col-md-4">
                                <div class="contact-info-item">
                                    <div class="contact-info-icon">
                                        <i class="fas fa-phone"></i>
                                    </div>
                                    <div class="contact-info-text">
                                        <h4>Téléphone</h4>
                                        <p><a href="tel:${phone}">${phone}</a></p>
                                    </div>
                                </div>
                            </div>` : ''}
                            ${email ? `
                            <div class="col-md-4">
                                <div class="contact-info-item">
                                    <div class="contact-info-icon">
                                        <i class="fas fa-envelope"></i>
                                    </div>
                                    <div class="contact-info-text">
                                        <h4>Email</h4>
                                        <p><a href="mailto:${email}">${email}</a></p>
                                    </div>
                                </div>
                            </div>` : ''}
                            ${address ? `
                            <div class="col-md-4">
                                <div class="contact-info-item">
                                    <div class="contact-info-icon">
                                        <i class="fas fa-map-marker-alt"></i>
                                    </div>
                                    <div class="contact-info-text">
                                        <h4>Adresse</h4>
                                        <p>${address}</p>
                                    </div>
                                </div>
                            </div>` : ''}
                        </div>
                        <div class="text-center mt-4">
                            ${phone ? `<a href="tel:${phone}" class="btn-hero btn-primary-hero">${content.cta}</a>` : ''}
                            ${email ? `<a href="mailto:${email}" class="btn-hero btn-secondary-hero">Envoyer un email</a>` : ''}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <div class="container">
            <div class="row">
                <div class="col-lg-4">
                    <h5>${companyName}</h5>
                    <p>${sector}${city ? ' - ' + city : ''}</p>
                    <p>${content.aboutText.substring(0, 150)}...</p>
                </div>
                <div class="col-lg-4">
                    <h5>Services</h5>
                    <ul class="list-unstyled">
                        ${content.services.slice(0, 4).map(service => `<li><a href="#services">${service.name}</a></li>`).join('')}
                    </ul>
                </div>
                <div class="col-lg-4">
                    <h5>Contact</h5>
                    <ul class="list-unstyled">
                        ${phone ? `<li><a href="tel:${phone}">${phone}</a></li>` : ''}
                        ${email ? `<li><a href="mailto:${email}">${email}</a></li>` : ''}
                        ${address ? `<li>${address}</li>` : ''}
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 ${companyName}. Tous droits réservés.</p>
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
                    entry.target.classList.add('animate-fade-in');
                }
            });
        }, observerOptions);

        document.addEventListener('DOMContentLoaded', function() {
            document.querySelectorAll('.service-card, .testimonial-card, .gallery-item').forEach(el => {
                observer.observe(el);
            });
        });
    </script>
</body>
</html>`;
}
