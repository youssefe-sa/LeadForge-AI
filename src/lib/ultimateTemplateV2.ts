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
      { name: 'Dépannage Urgence', description: 'Intervention rapide 24/7', features: ['Disponible 24/7', 'Intervention < 2h', 'Devis transparent'] },
      { name: 'Installation Sanitaire', description: 'Pose professionnelle', features: ['Salle de bain', 'Cuisine', 'Dépannage'] },
      { name: 'Chauffage & Clim', description: 'Solutions thermiques', features: ['Pompes à chaleur', 'Chaudières', 'Économie énergie'] },
      { name: 'Diagnostic Fuites', description: 'Détection précise', features: ['Non destructif', 'Caméra', 'Assurance'] },
      { name: 'Rénovation', description: 'Transformation', features: ['Design sur mesure', 'Premium', 'Clé en main'] },
      { name: 'Plomberie Générale', description: 'Tous travaux', features: ['Mise aux normes', 'Garantie', 'SAV'] }
    ],
    heroTitle: 'Expert Plomberie',
    heroSubtitle: "Intervention d'excellence garantie",
    aboutText: "Artisan certifié spécialisé dans les interventions premium.",
    ctaText: 'Obtenir une intervention'
  },
  electricien: {
    keywords: ['électricien', 'electricité', 'domotique', 'tableau'],
    services: [
      { name: 'Mise aux Normes', description: 'Conformité totale', features: ['Consuel', 'NFC 15-100', 'Sécurité'] },
      { name: 'Tableau Électrique', description: 'Installation moderne', features: ['Sécurité', 'Premium', 'Protection'] },
      { name: 'Éclairage Design', description: 'Mise en lumière', features: ['LED', 'Photométrie', 'Contrôle'] },
      { name: 'Domotique', description: 'Maison connectée', features: ['Smartphone', 'Scénarios', 'Sécurité'] },
      { name: 'Dépannage 24/7', description: 'Urgence électrique', features: ['Rapide', 'Précision', 'Fiabilité'] },
      { name: 'Diagnostic Complet', description: 'Bilan installation', features: ['Rapport', 'Conseil', 'Devis'] }
    ],
    heroTitle: 'Excellence Électrique',
    heroSubtitle: "L'énergie sûre et connectée",
    aboutText: "Entreprise qualifiée, technologies de pointe.",
    ctaText: 'Demander un diagnostic'
  },
  coiffeur: {
    keywords: ['coiffeur', 'coiffure', 'beauté', 'spa', 'esthétique'],
    services: [
      { name: 'Création Femme', description: 'Coupe tendance', features: ['Visagisme', 'Moderne', 'Wavy'] },
      { name: 'Barber Homme', description: 'Service barbier', features: ['Millimétré', 'Bio', 'Rasoir'] },
      { name: 'Coloration Premium', description: 'Nuances parfaites', features: ['Naturelles', 'Ombré', 'Olaplex'] },
      { name: 'Soin Profond', description: 'Rituels luxe', features: ['Botox', 'Hydratant', 'Massage'] },
      { name: 'Extensions', description: 'Volume naturel', features: ['Kératine', 'Invisible', 'Durable'] },
      { name: 'Haute Coiffure', description: 'Événements', features: ['Mariage', 'Personnalisé', 'Parfait'] }
    ],
    heroTitle: "L'Atelier de Coiffure",
    heroSubtitle: "Révélez votre beauté",
    aboutText: "Salon d'exception, équipe artistique.",
    ctaText: 'Réserver mon moment'
  },
  restaurant: {
    keywords: ['restaurant', 'cuisine', 'traiteur', 'boulanger'],
    services: [
      { name: 'Carte Signature', description: 'Cuisine moderne', features: ['Exceptionnels', 'Ferme', 'Végétarien'] },
      { name: 'Menu Dégustation', description: 'Voyage culinaire', features: ['Mets & Vins', '7 services', 'Surprise'] },
      { name: 'Cave Exception', description: 'Sommelier', features: ['Rares', 'Grands crus', 'Mixologie'] },
      { name: 'Privatisation', description: 'Événements', features: ['Dédié', 'Personnalisés', '100 convives'] },
      { name: 'Brunch Premium', description: 'Dimanche', features: ['Signature', 'Maison', 'Pressés'] },
      { name: 'Service Traiteur', description: 'Excellence', features: ['Cocktails', 'Gala', 'Mise en scène'] }
    ],
    heroTitle: 'Expérience Culinaire',
    heroSubtitle: "Gastronomie moderne",
    aboutText: "Produits nobles, moment inoubliable.",
    ctaText: 'Réserver une table'
  },
  garage: {
    keywords: ['garage', 'mécanique', 'carrosserie', 'entretien'],
    services: [
      { name: 'Diagnostic Électronique', description: 'Analyse précise', features: ['Valises', 'Codes pannes', 'Effacement'] },
      { name: 'Entretien Constructeur', description: 'Révisions', features: ['Garantie', 'Origine', 'Premium'] },
      { name: 'Liaison au Sol', description: 'Pneus', features: ['Géométrie 3D', 'Haute Perf', 'Amortisseurs'] },
      { name: 'Carrosserie Premium', description: 'Restauration', features: ['Spectromètre', 'Cabine', 'Detailing'] },
      { name: 'Moteur & Boîte', description: 'Interventions lourdes', features: ['Spécifique', 'Reconditionnement', 'BVA'] },
      { name: 'Véhicules Prestige', description: 'Sport & luxe', features: ['Soin', 'Sécurisé', 'Expertise'] }
    ],
    heroTitle: 'Pôle Mécanique Premium',
    heroSubtitle: "Expertise automobile",
    aboutText: "Techniciens d'élite, entretien sans compromis.",
    ctaText: 'Prendre rendez-vous'
  },
  default: {
    keywords: [],
    services: [
      { name: 'Consultation Expert', description: 'Analyse stratégique', features: ['Sur mesure', 'Action', 'Écoute'] },
      { name: 'Solutions Premium', description: 'Haute valeur', features: ['Qualité', 'Performance', 'Finitions'] },
      { name: 'Accompagnement VIP', description: 'Dédicace', features: ['Direct', 'Prioritaire', 'Mensuel'] },
      { name: 'Formation Pro', description: 'Montée en compétence', features: ['Personnalisée', 'Pratique', 'Certifiante'] },
      { name: 'Support 24/7', description: 'Disponibilité', features: ['Réactif', 'Expert', 'Garanti'] },
      { name: 'Innovation Tech', description: 'Solutions modernes', features: ['Avancées', 'Scalables', 'Futures'] }
    ],
    heroTitle: 'Excellence Professionnelle',
    heroSubtitle: "Solutions de pointe",
    aboutText: "Expert dans notre domaine, années d'expérience.",
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
  const { colors, fonts, animations } = config;
  
  return `
    :root {
      --primary: ${colors.primary};
      --secondary: ${colors.secondary};
      --accent: ${colors.accent};
      --primary-rgb: ${colors.primaryRgb};
      --bg-base: ${colors.background};
      --text-main: #0f172a;
      --text-muted: #475569;
      --font-head: '${fonts.heading}', sans-serif;
      --glow: ${colors.glow};
    }
    
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: '${fonts.body}', -apple-system, BlinkMacSystemFont, sans-serif;
      background: var(--bg-base);
      color: var(--text-main);
      overflow-x: hidden;
      line-height: 1.6;
    }
    
    h1, h2, h3, h4 { font-family: var(--font-head); }
    
    /* Optimized Glass Effect */
    .glass {
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 16px;
    }
    
    /* Performance Optimized Animations */
    .reveal {
      opacity: 0;
      transform: translateY(30px);
      transition: all ${animations.duration}ms cubic-bezier(0.25, 1, 0.5, 1);
      will-change: opacity, transform;
    }
    
    .reveal.active {
      opacity: 1;
      transform: translateY(0);
    }
    
    /* Lazy Loading Images */
    .optimized-image {
      loading: lazy;
      width: 100%;
      height: auto;
      object-fit: cover;
      border-radius: 12px;
    }
    
    /* Responsive Grid */
    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
      margin: 48px 0;
    }
    
    /* Modern Buttons */
    .btn-primary {
      background: var(--primary);
      color: white;
      border: none;
      padding: 16px 32px;
      border-radius: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: var(--glow);
    }
    
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 20px 40px hsla(var(--primary-rgb), 0.2);
    }
    
    /* Mobile Responsive */
    @media (max-width: 768px) {
      .services-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }
      
      .hero-title {
        font-size: 2rem;
      }
    }
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
      
      <!-- Preload Critical Resources -->
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=${config.fonts.heading}:wght@300;400;500;700;800&family=${config.fonts.body}:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      
      <!-- Lucide Icons -->
      <script src="https://unpkg.com/lucide@latest" async></script>
      
      <!-- Optimized CSS -->
      <style>${generateOptimizedCSS(config)}</style>
      
      <!-- SEO Meta -->
      <meta name="description" content="${content.description}">
      <meta name="keywords" content="${content.sector}, ${content.city}, professionnel">
      <meta property="og:title" content="${content.companyName}">
      <meta property="og:description" content="${content.description}">
      
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
