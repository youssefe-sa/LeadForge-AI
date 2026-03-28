// ── TEMPLATE ULTIME - GARANTIE PROFESSIONNELLE 100% ──
// Résultat professionnel garanti pour chaque prospect

export interface UltimateContent {
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
}

const SECTOR_ULTIMATE_TEMPLATES = {
  plomberie: {
    primary: '#1e40af',
    secondary: '#3b82f6',
    accent: '#60a5fa',
    background: '#f8fafc',
    heroBackground: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
    services: [
      {
        name: 'Dépannage Urgence',
        description: 'Intervention rapide 24/7 pour toutes vos urgences de plomberie',
        features: ['Disponible 24/7', 'Intervention sous 2h', 'Devis gratuit']
      },
      {
        name: 'Installation Sanitaire',
        description: 'Pose professionnelle de tous vos équipements sanitaires',
        features: ['Salle de bain complète', 'Cuisine équipée', 'WC et douche']
      },
      {
        name: 'Chauffage & Climatisation',
        description: 'Installation et entretien de vos systèmes de chauffage',
        features: ['Pompes à chaleur', 'Chaudières', 'Climatisation']
      },
      {
        name: 'Diagnostic Fuites',
        description: 'Détection précise et réparation de toutes les fuites',
        features: ['Caméra endoscopique', 'Détection thermique', 'Garantie 2 ans']
      },
      {
        name: 'Rénovation Salle de Bain',
        description: 'Transformation complète de votre salle de bain',
        features: ['Design sur mesure', 'Matériaux premium', 'Délai respecté']
      },
      {
        name: 'Plomberie Générale',
        description: 'Tous travaux de plomberie pour professionnels et particuliers',
        features: ['Neuf et rénovation', 'Mise aux normes', 'Certification']
      }
    ],
    heroTitle: 'Votre Plombier Expert',
    heroSubtitle: 'Intervention rapide et garantie dans toute la région',
    aboutText: 'Artisan plombier certifié avec 15 ans d\'expérience, nous garantissons un service d\'excellence avec des matériaux de qualité et une intervention rapide.',
    ctaText: 'Appeler maintenant'
  },
  electricien: {
    primary: '#dc2626',
    secondary: '#ef4444',
    accent: '#f87171',
    background: '#fef2f2',
    heroBackground: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
    services: [
      {
        name: 'Mise aux Normes',
        description: 'Mise en conformité complète de votre installation électrique',
        features: ['Consuel', 'Normes NFC 15-100', 'Diagnostic gratuit']
      },
      {
        name: 'Tableau Électrique',
        description: 'Installation et remplacement de tableaux électriques',
        features: ['Disjoncteurs différentiels', 'Parafoudres', 'Label Promotelec']
      },
      {
        name: 'Éclairage Design',
        description: 'Installation d\'éclairages modernes et design',
        features: ['LED', 'Spots encastrés', 'Domotique']
      },
      {
        name: 'Domotique',
        description: 'Installation de systèmes domotiques intelligents',
        features: ['Gestion smartphone', 'Scénarios personnalisés', 'Économie d\'énergie']
      },
      {
        name: 'Dépannage Électrique',
        description: 'Diagnostic et réparation de tous problèmes électriques',
        features: ['Intervention 24/7', 'Diagnostic précis', 'Garantie']
      },
      {
        name: 'Diagnostic Électrique',
        description: 'Bilan complet de votre installation électrique',
        features: ['Rapport détaillé', 'Recommandations', 'Devis']
      }
    ],
    heroTitle: 'Votre Électricien Qualifié',
    heroSubtitle: 'Sécurité et performance pour toutes vos installations électriques',
    aboutText: 'Électricien qualifié avec certification Qualifelec, nous assurons la sécurité et la performance de vos installations électriques.',
    ctaText: 'Demander un devis'
  },
  coiffeur: {
    primary: '#7c3aed',
    secondary: '#8b5cf6',
    accent: '#a78bfa',
    background: '#faf5ff',
    heroBackground: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
    services: [
      {
        name: 'Coupe Femme',
        description: 'Coupe moderne et tendance adaptée à votre style',
        features: ['Conseil personnalisé', 'Produits premium', 'Coiffage inclus']
      },
      {
        name: 'Coupe Homme',
        description: 'Coupe masculine moderne et soignée',
        features: ['Barbe traditionnelle', 'Soins visage', 'Produits bio']
      },
      {
        name: 'Coloration',
        description: 'Coloration professionnelle et sur-mesure',
        features: ['Balayage', 'Mèches', 'Coloration complète']
      },
      {
        name: 'Soin Capillaire',
        description: 'Soins profonds pour cheveux sains et brillants',
        features: ['Masques nourrissants', 'Huiles essentielles', 'Rituel complet']
      },
      {
        name: 'Extension Cheveux',
        description: 'Pose d\'extensions de qualité professionnelle',
        features: ['Extensions naturelles', 'Pose durable', 'Entretien']
      },
      {
        name: 'Coiffage Événement',
        description: 'Coiffage spécial pour vos événements importants',
        features: ['Mariage', 'Soirée', 'Maquillage inclus']
      }
    ],
    heroTitle: 'Votre Salon Coiffure',
    heroSubtitle: 'Expert en coiffure et beauté pour sublimer votre style',
    aboutText: 'Salon de coiffure moderne avec une équipe passionnée par l\'art de la coiffure et les dernières tendances.',
    ctaText: 'Prendre rendez-vous'
  },
  restaurant: {
    primary: '#ea580c',
    secondary: '#f97316',
    accent: '#fb923c',
    background: '#fff7ed',
    heroBackground: 'linear-gradient(135deg, #ea580c 0%, #f97316 100%)',
    services: [
      {
        name: 'Cuisine Traditionnelle',
        description: 'Plats authentiques et recettes familiales',
        features: ['Produits locaux', 'Recettes traditionnelles', 'Chef expérimenté']
      },
      {
        name: 'Menu Dégustation',
        description: 'Expérience gastronomique complète',
        features: ['7 services', 'Accords mets-vins', 'Menu saisonnier']
      },
      {
        name: 'Service Traiteur',
        description: 'Traiteur pour vos événements privés et professionnels',
        features: ['Événements 50-500 pers', 'Personnalisation', 'Service sur place']
      },
      {
        name: 'Vins Sélectionnés',
        description: 'Carte de vins raffinée et conseils sommelier',
        features: ['Vins locaux', 'Sélection mondiale', 'Dégustations']
      },
      {
        name: 'Brunch Dominical',
        description: 'Brunch gourmand et convivial le dimanche',
        features: ['Formule complète', 'Produits frais', 'Ambiance familiale']
      },
      {
        name: 'Événements Privés',
        description: 'Organisation d\'événements sur mesure',
        features: ['Salle privative', 'Menu personnalisé', 'Animation']
      }
    ],
    heroTitle: 'Votre Restaurant Gastronomique',
    heroSubtitle: 'Cuisine authentique et produits locaux pour une expérience inoubliable',
    aboutText: 'Restaurant familial avec une cuisine authentique mettant en valeur les produits locaux et les recettes traditionnelles.',
    ctaText: 'Réserver une table'
  },
  garage: {
    primary: '#16a34a',
    secondary: '#22c55e',
    accent: '#4ade80',
    background: '#f0fdf4',
    heroBackground: 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)',
    services: [
      {
        name: 'Diagnostic Moteur',
        description: 'Diagnostic complet et précis de tous types de moteurs',
        features: ['Valise diagnostic', 'Analyse électronique', 'Rapport détaillé']
      },
      {
        name: 'Révision Complète',
        description: 'Entretien complet pour garantir la longévité de votre véhicule',
        features: ['Filtres huile/air', 'Bougies', 'Liquides']
      },
      {
        name: 'Pneumatique',
        description: 'Vente et pose de pneus de qualité',
        features: ['Toutes marques', 'Équilibrage', 'Géométrie']
      },
      {
        name: 'Carrosserie',
        description: 'Réparation carrosserie et peinture professionnelle',
        features: ['Petits chocs', 'Peinture carrosserie', 'Garantie']
      },
      {
        name: 'Vidange Entretien',
        description: 'Vidange et entretien régulier de votre véhicule',
        features: ['Huile qualité', 'Contrôle 30 points', 'Carnet entretien']
      },
      {
        name: 'Contrôle Technique',
        description: 'Préparation et passage du contrôle technique',
        features: ['Pré-CT', 'Réparations mineures', 'Convoyage']
      }
    ],
    heroTitle: 'Votre Garage Automobile',
    heroSubtitle: 'Entretien et réparation professionnels pour tous types de véhicules',
    aboutText: 'Garage automobile certifié avec des mécaniciens expérimentés et des équipements modernes pour garantir un service de qualité.',
    ctaText: 'Prendre rendez-vous'
  },
  default: {
    primary: '#1f2937',
    secondary: '#374151',
    accent: '#6b7280',
    background: '#f9fafb',
    heroBackground: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
    services: [
      {
        name: 'Consultation',
        description: 'Conseil professionnel personnalisé',
        features: ['Analyse besoins', 'Recommandations', 'Devis détaillé']
      },
      {
        name: 'Service Premium',
        description: 'Service haut de gamme adapté à vos exigences',
        features: ['Qualité supérieure', 'Garantie étendue', 'Support prioritaire']
      },
      {
        name: 'Intervention Rapide',
        description: 'Intervention express pour vos urgences',
        features: ['Disponible 24/7', 'Intervention immédiate', 'Suivi continu']
      },
      {
        name: 'Devis Gratuit',
        description: 'Estimation gratuite et sans engagement',
        features: ['Analyse complète', 'Tarifs transparents', 'Comparatif options']
      },
      {
        name: 'Garantie Satisfaction',
        description: 'Garantie totale de satisfaction',
        features: ['Satisfaction ou remboursé', 'Reprise gratuite', 'Assistance continue']
      },
      {
        name: 'Support Client',
        description: 'Support client disponible et réactif',
        features: ['Téléphone', 'Email', 'Chat en ligne']
      }
    ],
    heroTitle: 'Votre Service Professionnel',
    heroSubtitle: 'Expertise et qualité pour un service d\'excellence',
    aboutText: 'Professionnel expérimenté engagé à fournir un service de qualité supérieure avec une attention particulière aux détails.',
    ctaText: 'Nous contacter'
  }
};

function getUltimateTemplate(sector: string) {
  const normalizedSector = (sector || '').toLowerCase();
  
  for (const [key, template] of Object.entries(SECTOR_ULTIMATE_TEMPLATES)) {
    if (normalizedSector.includes(key)) {
      return template;
    }
  }
  
  // Vérifications spécifiques
  if (normalizedSector.includes('médec') || normalizedSector.includes('clinique')) {
    return SECTOR_ULTIMATE_TEMPLATES.default;
  }
  if (normalizedSector.includes('avocat') || normalizedSector.includes('notaire')) {
    return SECTOR_ULTIMATE_TEMPLATES.default;
  }
  if (normalizedSector.includes('beauté') || normalizedSector.includes('esthétique')) {
    return SECTOR_ULTIMATE_TEMPLATES.coiffeur;
  }
  if (normalizedSector.includes('boulanger') || normalizedSector.includes('pâtissier')) {
    return SECTOR_ULTIMATE_TEMPLATES.restaurant;
  }
  
  return SECTOR_ULTIMATE_TEMPLATES.default;
}

export function generateUltimateSite(lead: any): string {
  const template = getUltimateTemplate(lead.sector);
  const companyName = lead.name || 'Entreprise';
  const city = lead.city || '';
  const phone = lead.phone || '';
  const email = lead.email || '';
  const address = lead.address || '';
  const website = lead.website || '';
  const rating = lead.googleRating || 0;
  const reviews = lead.googleReviews || 0;
  const description = lead.description || template.aboutText;
  
  // Témoignages avec texte par défaut si nécessaire
  const testimonials = (lead.googleReviewsData || []).slice(0, 3).map((review: any) => ({
    author: review.author || 'Client satisfait',
    text: review.text || 'Excellent service, très professionnel et disponible. Je recommande vivement !',
    rating: review.rating || 5,
    date: review.date || ''
  }));

  // Si pas de témoignages, en générer par défaut
  if (testimonials.length === 0) {
    testimonials.push(
      {
        author: 'Jean Dupont',
        text: 'Service exceptionnel ! Professionnel, ponctuel et très compétent. Je recommande vivement.',
        rating: 5,
        date: 'Il y a 1 semaine'
      },
      {
        author: 'Marie Martin',
        text: 'Très satisfait du travail réalisé. Sérieux et disponible, je n\'hésiterai pas à faire appel à nouveau.',
        rating: 5,
        date: 'Il y a 2 semaines'
      },
      {
        author: 'Pierre Bernard',
        text: 'Excellente prestation de service. Travail soigné et respect des délais. Bravo !',
        rating: 5,
        date: 'Il y a 1 mois'
      }
    );
  }

  const content: UltimateContent = {
    companyName,
    sector: lead.sector || 'Professionnel',
    city,
    description,
    phone,
    email,
    address,
    website,
    rating,
    reviews,
    services: template.services,
    testimonials,
    heroTitle: template.heroTitle,
    heroSubtitle: `${template.heroSubtitle}${city ? ' à ' + city : ''}`,
    aboutText: description,
    ctaText: template.ctaText
  };

  return buildUltimateHTML(content, template);
}

function buildUltimateHTML(content: UltimateContent, template: any): string {
  const { companyName, heroTitle, heroSubtitle, aboutText, services, testimonials, phone, email, address, website, rating, reviews } = content;
  
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${companyName} - ${content.sector}${content.city ? ' à ' + content.city : ''}</title>
    <meta name="description" content="${heroSubtitle.substring(0, 160)}">
    <meta name="keywords" content="${companyName}, ${content.sector}, ${content.city || 'France'}">
    
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@700;800;900&display=swap" rel="stylesheet">
    
    <style>
        :root {
            --primary-color: ${template.primary};
            --secondary-color: ${template.secondary};
            --accent-color: ${template.accent};
            --background-color: ${template.background};
            --hero-background: ${template.heroBackground};
            --text-dark: #1f2937;
            --text-light: #6b7280;
            --white: #ffffff;
            --border-light: #e5e7eb;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            line-height: 1.6;
            color: var(--text-dark);
            background-color: var(--background-color);
            overflow-x: hidden;
        }
        
        h1, h2, h3, h4, h5, h6 {
            font-family: 'Playfair Display', serif;
            font-weight: 700;
            line-height: 1.2;
        }
        
        /* Navigation */
        .navbar {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.08);
            padding: 1rem 0;
            position: fixed;
            width: 100%;
            top: 0;
            z-index: 1000;
            transition: all 0.3s ease;
        }
        
        .navbar-brand {
            font-size: 1.75rem;
            font-weight: 700;
            color: var(--primary-color) !important;
            text-decoration: none;
            font-family: 'Playfair Display', serif;
        }
        
        .nav-link {
            color: var(--text-dark) !important;
            font-weight: 500;
            margin: 0 1rem;
            transition: all 0.3s ease;
            position: relative;
            font-size: 0.95rem;
        }
        
        .nav-link:hover {
            color: var(--primary-color) !important;
        }
        
        .nav-link::after {
            content: '';
            position: absolute;
            bottom: -8px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 3px;
            background: var(--primary-color);
            transition: width 0.3s ease;
            border-radius: 2px;
        }
        
        .nav-link:hover::after {
            width: 80%;
        }
        
        /* Hero Section */
        .hero {
            background: var(--hero-background);
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
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
            opacity: 0.3;
        }
        
        .hero-content {
            position: relative;
            z-index: 2;
            color: var(--white);
        }
        
        .hero h1 {
            font-size: clamp(3rem, 8vw, 5.5rem);
            font-weight: 800;
            margin-bottom: 2rem;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            letter-spacing: -0.02em;
        }
        
        .hero p {
            font-size: 1.4rem;
            margin-bottom: 3rem;
            opacity: 0.95;
            max-width: 600px;
            font-weight: 300;
        }
        
        .btn-hero {
            background: var(--white);
            color: var(--primary-color);
            padding: 1.25rem 3rem;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            font-size: 1.1rem;
            display: inline-block;
            transition: all 0.3s ease;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
            letter-spacing: 0.01em;
        }
        
        .btn-hero:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
            color: var(--primary-color);
        }
        
        /* Sections */
        .section {
            padding: 6rem 0;
        }
        
        .section-title {
            text-align: center;
            margin-bottom: 4rem;
        }
        
        .section-title h2 {
            font-size: 3rem;
            color: var(--text-dark);
            margin-bottom: 1.5rem;
            font-weight: 800;
            letter-spacing: -0.02em;
        }
        
        .section-title p {
            font-size: 1.2rem;
            color: var(--text-light);
            max-width: 600px;
            margin: 0 auto;
        }
        
        /* Service Cards */
        .service-card {
            background: var(--white);
            border-radius: 20px;
            padding: 2.5rem;
            height: 100%;
            box-shadow: 0 8px 35px rgba(0, 0, 0, 0.08);
            transition: all 0.4s ease;
            border: 1px solid var(--border-light);
            position: relative;
            overflow: hidden;
        }
        
        .service-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 5px;
            background: var(--primary-color);
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.4s ease;
        }
        
        .service-card:hover::before {
            transform: scaleX(1);
        }
        
        .service-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
        }
        
        .service-icon {
            width: 70px;
            height: 70px;
            background: var(--primary-color);
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 2rem;
            font-size: 1.8rem;
            color: var(--white);
        }
        
        .service-card h3 {
            font-size: 1.5rem;
            color: var(--text-dark);
            margin-bottom: 1rem;
            font-weight: 600;
        }
        
        .service-card p {
            color: var(--text-light);
            margin-bottom: 2rem;
            font-size: 1.05rem;
            line-height: 1.7;
        }
        
        .service-features {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        
        .service-features li {
            display: flex;
            align-items: center;
            margin-bottom: 0.8rem;
            color: var(--text-light);
            font-size: 0.95rem;
        }
        
        .service-features li::before {
            content: '✓';
            color: var(--primary-color);
            font-weight: 700;
            margin-right: 0.8rem;
            font-size: 1.1rem;
        }
        
        /* About Section */
        .about-section {
            background: var(--white);
        }
        
        .about-content {
            background: var(--background-color);
            border-radius: 30px;
            padding: 4rem;
            box-shadow: 0 15px 50px rgba(0, 0, 0, 0.05);
        }
        
        .about-content h3 {
            font-size: 2.2rem;
            color: var(--text-dark);
            margin-bottom: 2rem;
            font-weight: 700;
        }
        
        .about-content p {
            font-size: 1.15rem;
            line-height: 1.8;
            color: var(--text-light);
            margin-bottom: 2rem;
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }
        
        .stat-item {
            text-align: center;
        }
        
        .stat-number {
            font-size: 3rem;
            font-weight: 800;
            color: var(--primary-color);
            margin-bottom: 0.5rem;
            font-family: 'Playfair Display', serif;
        }
        
        .stat-label {
            color: var(--text-light);
            font-size: 1rem;
            font-weight: 500;
        }
        
        /* Testimonials */
        .testimonial-card {
            background: var(--white);
            border-radius: 20px;
            padding: 2.5rem;
            height: 100%;
            box-shadow: 0 8px 35px rgba(0, 0, 0, 0.08);
            position: relative;
            border: 1px solid var(--border-light);
        }
        
        .testimonial-card::before {
            content: '"';
            position: absolute;
            top: 2rem;
            left: 2rem;
            font-size: 4rem;
            color: var(--primary-color);
            opacity: 0.1;
            font-family: 'Playfair Display', serif;
            font-weight: 800;
        }
        
        .testimonial-text {
            font-size: 1.1rem;
            line-height: 1.7;
            margin-bottom: 2rem;
            color: var(--text-dark);
            font-style: italic;
            position: relative;
            z-index: 1;
        }
        
        .testimonial-author {
            font-weight: 600;
            color: var(--text-dark);
            margin-bottom: 0.5rem;
            font-size: 1.1rem;
        }
        
        .testimonial-rating {
            color: #fbbf24;
            font-size: 1.1rem;
        }
        
        .testimonial-date {
            color: var(--text-light);
            font-size: 0.9rem;
            margin-top: 0.5rem;
        }
        
        /* Contact Section */
        .contact-section {
            background: var(--hero-background);
            color: var(--white);
            position: relative;
        }
        
        .contact-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid2" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid2)"/></svg>');
            opacity: 0.3;
        }
        
        .contact-content {
            position: relative;
            z-index: 2;
        }
        
        .contact-card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            border-radius: 25px;
            padding: 3.5rem;
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
        }
        
        .contact-info-item {
            display: flex;
            align-items: center;
            margin-bottom: 2rem;
        }
        
        .contact-info-item i {
            font-size: 1.8rem;
            margin-right: 1.5rem;
            color: var(--white);
            width: 50px;
            text-align: center;
        }
        
        .contact-info-item span {
            font-size: 1.1rem;
            font-weight: 500;
        }
        
        .btn-contact {
            background: var(--white);
            color: var(--primary-color);
            padding: 1.25rem 3rem;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            font-size: 1.1rem;
            display: inline-block;
            transition: all 0.3s ease;
            box-shadow: 0 8px 30px rgba(255, 255, 255, 0.2);
            margin-top: 1rem;
        }
        
        .btn-contact:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 40px rgba(255, 255, 255, 0.3);
            color: var(--primary-color);
        }
        
        /* Footer */
        footer {
            background: var(--text-dark);
            color: var(--white);
            padding: 4rem 0 2rem;
        }
        
        .footer-brand {
            font-size: 2rem;
            font-weight: 700;
            color: var(--white);
            margin-bottom: 1rem;
            font-family: 'Playfair Display', serif;
        }
        
        .footer-description {
            color: #9ca3af;
            margin-bottom: 2rem;
            font-size: 1.05rem;
        }
        
        .footer-links {
            list-style: none;
            padding: 0;
        }
        
        .footer-links li {
            margin-bottom: 1rem;
        }
        
        .footer-links a {
            color: #9ca3af;
            text-decoration: none;
            transition: color 0.3s ease;
            font-size: 1rem;
        }
        
        .footer-links a:hover {
            color: var(--white);
        }
        
        .footer-contact-item {
            display: flex;
            align-items: center;
            margin-bottom: 1.5rem;
            color: #9ca3af;
        }
        
        .footer-contact-item i {
            margin-right: 1rem;
            color: var(--primary-color);
        }
        
        .footer-bottom {
            border-top: 1px solid #374151;
            margin-top: 3rem;
            padding-top: 2rem;
            text-align: center;
            color: #9ca3af;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .hero h1 {
                font-size: clamp(2.5rem, 6vw, 3.5rem);
            }
            
            .hero p {
                font-size: 1.1rem;
            }
            
            .section {
                padding: 4rem 0;
            }
            
            .section-title h2 {
                font-size: 2.2rem;
            }
            
            .service-card {
                padding: 2rem;
            }
            
            .about-content {
                padding: 2.5rem;
            }
            
            .contact-card {
                padding: 2.5rem;
            }
            
            .nav-link {
                margin: 0 0.5rem;
                font-size: 0.9rem;
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
                <a href="#contact" class="btn-hero">${content.ctaText}</a>
                ${rating > 0 ? `
                <div class="mt-5">
                    <div class="d-flex justify-content-center gap-4">
                        <div class="text-center">
                            <div class="display-4 fw-bold">${rating}</div>
                            <div class="text-white-50">Note Google</div>
                        </div>
                        <div class="text-center">
                            <div class="display-4 fw-bold">${reviews}+</div>
                            <div class="text-white-50">Avis clients</div>
                        </div>
                        <div class="text-center">
                            <div class="display-4 fw-bold">15+</div>
                            <div class="text-white-50">Années d'exp</div>
                        </div>
                    </div>
                </div>
                ` : ''}
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section class="section" id="services">
        <div class="container">
            <div class="section-title">
                <h2>Nos Services</h2>
                <p>Des solutions professionnelles complètes adaptées à vos besoins</p>
            </div>
            <div class="row g-4">
                ${services.map((service, index) => `
                <div class="col-md-6 col-lg-4">
                    <div class="service-card">
                        <div class="service-icon">
                            <i class="bi bi-${getServiceIcon(index)}"></i>
                        </div>
                        <h3>${service.name}</h3>
                        <p>${service.description}</p>
                        <ul class="service-features">
                            ${service.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
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
                <h3>${companyName}</h3>
                <p>${aboutText}</p>
                <p>Nous sommes passionnés par notre métier et nous nous engageons à fournir un service d'excellence à chaque client. Notre expertise et notre savoir-faire garantissent des résultats durables et satisfaisants.</p>
                <div class="stats-grid">
                    <div class="stat-item">
                        <div class="stat-number">15+</div>
                        <div class="stat-label">Années d'expérience</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">500+</div>
                        <div class="stat-label">Clients satisfaits</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">24/7</div>
                        <div class="stat-label">Support disponible</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">100%</div>
                        <div class="stat-label">Garantie satisfaction</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials Section -->
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
                            ${'★'.repeat(testimonial.rating || 5)}${'☆'.repeat(5 - (testimonial.rating || 5))}
                        </div>
                        ${testimonial.date ? `<div class="testimonial-date">${testimonial.date}</div>` : ''}
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section class="section contact-section" id="contact">
        <div class="container">
            <div class="contact-content">
                <div class="section-title">
                    <h2 style="color: white;">Contact</h2>
                    <p style="color: rgba(255,255,255,0.9);">Prenez contact pour votre projet</p>
                </div>
                <div class="row justify-content-center">
                    <div class="col-lg-8">
                        <div class="contact-card">
                            <div class="row">
                                <div class="col-md-6">
                                    ${phone ? `
                                    <div class="contact-info-item">
                                        <i class="bi bi-telephone-fill"></i>
                                        <span>${phone}</span>
                                    </div>
                                    ` : ''}
                                    ${email ? `
                                    <div class="contact-info-item">
                                        <i class="bi bi-envelope-fill"></i>
                                        <span>${email}</span>
                                    </div>
                                    ` : ''}
                                    ${address ? `
                                    <div class="contact-info-item">
                                        <i class="bi bi-geo-alt-fill"></i>
                                        <span>${address}</span>
                                    </div>
                                    ` : ''}
                                    ${website ? `
                                    <div class="contact-info-item">
                                        <i class="bi bi-globe"></i>
                                        <span>${website}</span>
                                    </div>
                                    ` : ''}
                                </div>
                                <div class="col-md-6 text-center">
                                    <h4 class="mb-4">Contactez-nous</h4>
                                    <p class="mb-4">Nous sommes à votre disposition pour répondre à toutes vos questions</p>
                                    ${phone ? `
                                    <a href="tel:${phone}" class="btn-contact">
                                        <i class="bi bi-telephone-fill me-2"></i>${content.ctaText}
                                    </a>
                                    ` : ''}
                                    ${email ? `
                                    <a href="mailto:${email}" class="btn-contact ms-2">
                                        <i class="bi bi-envelope-fill me-2"></i>Envoyer un email
                                    </a>
                                    ` : ''}
                                </div>
                            </div>
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
                <div class="col-lg-4 mb-4">
                    <div class="footer-brand">${companyName}</div>
                    <div class="footer-description">${content.sector} professionnel${content.city ? ' à ' + content.city : ''}</div>
                </div>
                <div class="col-lg-4 mb-4">
                    <h5 class="mb-3">Services</h5>
                    <ul class="footer-links">
                        ${services.slice(0, 4).map(service => `<li><a href="#services">${service.name}</a></li>`).join('')}
                    </ul>
                </div>
                <div class="col-lg-4 mb-4">
                    <h5 class="mb-3">Contact</h5>
                    ${phone ? `<div class="footer-contact-item"><i class="bi bi-telephone-fill"></i> ${phone}</div>` : ''}
                    ${email ? `<div class="footer-contact-item"><i class="bi bi-envelope-fill"></i> ${email}</div>` : ''}
                    ${address ? `<div class="footer-contact-item"><i class="bi bi-geo-alt-fill"></i> ${address}</div>` : ''}
                </div>
            </div>
            <div class="footer-bottom">
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
                navbar.style.boxShadow = '0 8px 40px rgba(0, 0, 0, 0.12)';
            } else {
                navbar.style.padding = '1rem 0';
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.08)';
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
        document.addEventListener('DOMContentLoaded', function() {
            document.querySelectorAll('.service-card, .testimonial-card, .about-content').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(40px)';
                el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                observer.observe(el);
            });
        });
    </script>
</body>
</html>`;
}

function getServiceIcon(index: number): string {
  const icons = [
    'tools', 'gear-fill', 'wrench', 'hammer', 'buildings', 'house-gear-fill',
    'lightning-charge-fill', 'shield-check', 'award-fill', 'star-fill', 'heart-fill',
    'telephone-fill', 'envelope-fill', 'geo-alt-fill', 'clock-fill', 'check-circle-fill'
  ];
  return icons[index % icons.length];
}
