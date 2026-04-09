// ── TEMPLATE ULTIME - GARANTIE PROFESSIONNELLE 100% ──
// Résultat professionnel garanti pour chaque prospect. Refonte Ultra-Premium (Dark Mode/Glassmorphism).

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
    primary: '#3b82f6',
    secondary: '#1d4ed8',
    accent: '#60a5fa',
    background: '#0B0A0F',
    services: [
      {
        name: 'Dépannage Urgence',
        description: 'Intervention rapide 24/7 pour toutes vos urgences de plomberie',
        features: ['Disponible 24/7', 'Intervention sous 2h', 'Devis transparent']
      },
      {
        name: 'Installation Sanitaire',
        description: 'Pose professionnelle de tous vos équipements sanitaires',
        features: ['Salle de bain complète', 'Cuisine équipée', 'Dépannage']
      },
      {
        name: 'Chauffage & Climatisation',
        description: 'Installation et entretien de vos systèmes de chauffage',
        features: ['Pompes à chaleur', 'Chaudières', "Economie d'énergie"]
      },
      {
        name: 'Diagnostic Fuites',
        description: 'Détection précise et réparation de toutes les fuites',
        features: ['Recherche non destructive', 'Caméra endoscopique', 'Assurance']
      },
      {
        name: 'Rénovation Complète',
        description: 'Transformation haute de gamme de votre salle de bain',
        features: ['Design sur mesure', 'Matériaux premium', 'Livraison clé en main']
      },
      {
        name: 'Plomberie Générale',
        description: 'Tous travaux de plomberie pour professionnels et particuliers',
        features: ['Mise aux normes', 'Garantie décennale', 'SAV réactif']
      }
    ],
    heroTitle: 'Votre Expert Plomberie',
    heroSubtitle: "Intervention d'excellence et garantie dans toute la région",
    aboutText: "Artisan certifié spécialisé dans les interventions premium. Nous garantissons un service d'excellence, réactif et doté d'une finition parfaite.",
    ctaText: 'Obtenir une intervention'
  },
  electricien: {
    primary: '#ef4444',
    secondary: '#b91c1c',
    accent: '#f87171',
    background: '#0B0A0F',
    services: [
      {
        name: 'Mise aux Normes',
        description: 'Mise en conformité totale de votre installation',
        features: ['Consuel garanti', 'Normes NFC 15-100', 'Diagnostic de sécurité']
      },
      {
        name: 'Tableau Électrique',
        description: 'Installation et rénovation de tableaux électriques',
        features: ['Sécurité certifiée', 'Marques premium', 'Protection optimale']
      },
      {
        name: 'Éclairage Architectonique',
        description: 'Mise en lumière moderne et design',
        features: ['LED Premium', 'Étude photométrique', 'Contrôle à distance']
      },
      {
        name: 'Maison Connectée',
        description: 'Installation de systèmes domotiques intelligents',
        features: ['Gestion smartphone', 'Scénarios de vie', 'Sécurité']
      },
      {
        name: 'Dépannage Électrique',
        description: 'Diagnostic pointu et réparation instantanée',
        features: ['Intervention 24/7', 'Outils de précision', 'Fiabilité totale']
      },
      {
        name: 'Diagnostic Complet',
        description: 'Bilan de votre installation électrique',
        features: ['Rapport détaillé', 'Conseil expert', 'Devis chiffré']
      }
    ],
    heroTitle: 'Excellence Électrique',
    heroSubtitle: "L'énergie sûre et connectée, maîtrisée par des experts",
    aboutText: "Entreprise d'électricité qualifiée, nous concevons, installons et sécurisons vos réseaux avec des technologies de pointe.",
    ctaText: 'Demander un diagnostic'
  },
  coiffeur: {
    primary: '#8b5cf6',
    secondary: '#6d28d9',
    accent: '#a78bfa',
    background: '#0B0A0F',
    services: [
      {
        name: 'Création Femme',
        description: 'Coupe tendance et sur-mesure pour sublimer votre visage',
        features: ['Visagisme', 'Techniques modernes', 'Coiffage wavy']
      },
      {
        name: 'Barber & Homme',
        description: 'Service barbier authentique et coupes structurées',
        features: ['Tracé millimétré', 'Soins barbe bio', 'Finition rasoir']
      },
      {
        name: 'Coloration Premium',
        description: 'Nuances parfaites, balayages subtils et respect du cheveu',
        features: ['Poudres naturelles', 'Ombré Hair', 'Protection Olaplex']
      },
      {
        name: 'Soin Profond',
        description: 'Rituels de soin luxueux pour une fibre capillaire réparée',
        features: ['Botox capillaire', 'Bain hydratant', 'Massage crânien relaxant']
      },
      {
        name: 'Extensions',
        description: 'Longueur et volume avec des extensions 100% naturelles',
        features: ['Kératine ou bandes', 'Invisible', 'Durabilité maximum']
      },
      {
        name: 'Haute Coiffure',
        description: 'Chignons et attaches pour vos plus beaux événements',
        features: ['Mariage', 'Essai personnalisé', 'Tenue parfaite']
      }
    ],
    heroTitle: "L'Atelier de Coiffure",
    heroSubtitle: "Révélez votre beauté entre les mains d'experts passionnés",
    aboutText: "Un salon d'exception où chaque détail est pensé pour votre bien-être. Notre équipe artistique maîtrise les techniques les plus sophistiquées.",
    ctaText: 'Réserver mon moment'
  },
  restaurant: {
    primary: '#d97706',
    secondary: '#b45309',
    accent: '#f59e0b',
    background: '#0B0A0F',
    services: [
      {
        name: 'Carte Signature',
        description: "Une cuisine d'inspiration, moderne et de saison",
        features: ['Produits exceptionnels', "Ferme à l'assiette", 'Végétarien disponible']
      },
      {
        name: 'Menu Dégustation',
        description: 'Le voyage culinaire ultime en plusieurs temps',
        features: ['Accord Mets & Vins', '7 services', 'Surprise du Chef']
      },
      {
        name: "Cave d'Exception",
        description: 'Notre sommelier vous guide à travers nos meilleurs flacons',
        features: ['Vignobles rares', 'Grands crus', 'Mixologie créative']
      },
      {
        name: 'Privatisation',
        description: 'Des espaces élégants pour vos événements privés',
        features: ['Service dédié', 'Menus personnalisés', "Jusqu'à 100 convives"]
      },
      {
        name: 'Brunch Premium',
        description: 'Le rendez-vous dominical incontournable et généreux',
        features: ['Buffet Signature', 'Viennoiseries maison', 'Jus fraîchement pressés']
      },
      {
        name: 'Service Traiteur',
        description: "L'excellence de notre cuisine où vous le souhaitez",
        features: ['Cocktails chics', 'Dîners de gala', 'Mise en scène']
      }
    ],
    heroTitle: 'Expérience Culinaire Unique',
    heroSubtitle: "L'harmonie parfaite entre gastronomie moderne et atmosphère élégante",
    aboutText: 'Nous repoussons les limites de la tradition culinaire pour offrir un moment inoubliable, où les produits nobles racontent une histoire dans chaque assiette.',
    ctaText: 'Réserver une table'
  },
  garage: {
    primary: '#10b981',
    secondary: '#047857',
    accent: '#34d399',
    background: '#0B0A0F',
    services: [
      {
        name: 'Diagnostic Électronique',
        description: 'Analyse précise de tous les calculateurs de votre véhicule',
        features: ['Valises constructeurs', 'Lecture de codes pannes', 'Effacement']
      },
      {
        name: 'Entretien Constructeur',
        description: 'Révisions respectant scrupuleusement les cahiers des charges',
        features: ['Maintien garantie', 'Pièces origine', 'Huile premium']
      },
      {
        name: 'Liaison au Sol',
        description: 'Techniciens experts en pneumatique et comportement',
        features: ['Géométrie 3D', 'Pneus Haute Perf', 'Amortisseurs']
      },
      {
        name: 'Carrosserie Premium',
        description: 'Restauration esthétique parfaite sans différence de teinte',
        features: ['Spectromètre', 'Cabine de chauffe', 'Detaling inclus']
      },
      {
        name: 'Moteur & Boîte',
        description: 'Interventions lourdes, remplacement de distribution ou embrayage',
        features: ['Outillage spécifique', 'Reconditionnement', 'Vidange BVA']
      },
      {
        name: 'Voitures de Prestige',
        description: 'Une équipe spécialisée dans les véhicules sportifs et luxe',
        features: ['Manipulation soigneuse', 'Local sécurisé', 'Expertise pointue']
      }
    ],
    heroTitle: 'Le Pôle Mécanique Prémium',
    heroSubtitle: "L'expertise absolue pour sublimer et entretenir votre véhicule",
    aboutText: "Notre garage de pointe rassemble l'élite des techniciens pour offrir à votre véhicule un entretien sans compromis.",
    ctaText: 'Prendre rendez-vous atelier'
  },
  default: {
    primary: '#ffffff',
    secondary: '#d4d4d4',
    accent: '#f5f5f5',
    background: '#0B0A0F',
    services: [
      {
        name: 'Consultation Experte',
        description: 'Analyse approfondie de vos besoins stratégiques',
        features: ['Diagnostic sur mesure', "Plan d'action", 'Écoute active']
      },
      {
        name: 'Solutions Premium',
        description: 'Implémentation de services à forte valeur ajoutée',
        features: ['Qualité irréprochable', 'Suivi de performance', 'Finitions parfaites']
      },
      {
        name: 'Accompagnement VIP',
        description: 'Un interlocuteur dédié tout au long du processus',
        features: ['Ligne directe', 'RDV prioritaire', 'Bilan mensuel']
      },
      {
        name: 'Innovation & Technologie',
        description: 'Utilisation des meilleurs outils du marché',
        features: ['Méthodes agiles', 'Veille constante', 'Equipement de pointe']
      },
      {
        name: 'Stratégie Sur-Mesure',
        description: 'Vos objectifs se transforment en résultats mesurables',
        features: ['ROI assuré', 'Alignement parfait', 'Transparence absolue']
      },
      {
        name: 'Service Client 24/7',
        description: 'Une présence permanente quand vous avez besoin de nous',
        features: ['Assistance immédiate', 'Proactivité', 'Garanties solides']
      }
    ],
    heroTitle: "Services Professionnels d'Excellence",
    heroSubtitle: "L'alliance de la rigueur et de l'innovation pour votre réussite",
    aboutText: "Nous bâtissons des relations durables basées sur la performance et l'intégrité. Notre ambition est d'élever vos standards et de vous accompagner vers le succès absolu.",
    ctaText: 'Initier notre collaboration'
  }
};

function getUltimateTemplate(sector: string) {
  const normalizedSector = (sector || '').toLowerCase();
  for (const [key, template] of Object.entries(SECTOR_ULTIMATE_TEMPLATES)) {
    if (normalizedSector.includes(key)) return template;
  }
  if (normalizedSector.includes('médec') || normalizedSector.includes('clinique') || normalizedSector.includes('dentiste')) {
    return { ...SECTOR_ULTIMATE_TEMPLATES.default, primary: '#0ea5e9', secondary: '#0284c7' };
  }
  if (normalizedSector.includes('avocat') || normalizedSector.includes('notaire') || normalizedSector.includes('juridi')) {
    return { ...SECTOR_ULTIMATE_TEMPLATES.default, primary: '#cda652', secondary: '#9b7c3d' };
  }
  if (normalizedSector.includes('beauté') || normalizedSector.includes('esthétique') || normalizedSector.includes('spa')) {
    return { ...SECTOR_ULTIMATE_TEMPLATES.coiffeur, primary: '#ec4899', secondary: '#be185d' };
  }
  if (normalizedSector.includes('boulanger') || normalizedSector.includes('pâtissier')) {
    return SECTOR_ULTIMATE_TEMPLATES.restaurant;
  }
  return SECTOR_ULTIMATE_TEMPLATES.default;
}

// 🎯 On accepte maintenant le contenu généré par l'IA (aiContent)
export function generateUltimateSite(lead: any, aiContent?: any): string {
  const template = getUltimateTemplate(lead.sector);
  const companyName = lead.name || 'Entreprise Premium';
  const city = lead.city || '';
  const phone = lead.phone || '';
  const email = lead.email || '';
  const address = lead.address || '';
  const website = lead.website || '';
  const rating = lead.googleRating || 0;
  const reviews = lead.googleReviews || 0;
  
  // Utiliser le contenu IA s'il existe, sinon fallback au template
  const description = aiContent?.aboutText || lead.description || template.aboutText;
  const heroTitle = aiContent?.heroTitle || template.heroTitle;
  const heroSubtitle = aiContent?.heroSubtitle || `${template.heroSubtitle}${city ? ' à ' + city : ''}`;
  const ctaText = aiContent?.cta || template.ctaText;
  
  // Utiliser les services IA s'ils existent et ont le bon format
  let finalServices = template.services;
  if (aiContent?.services && Array.isArray(aiContent.services) && aiContent.services.length > 0) {
    finalServices = aiContent.services.map((s: any, idx: number) => ({
      name: s.name || `Service ${idx+1}`,
      description: s.description || '',
      features: template.services[idx % template.services.length].features // garder les belles features HTML par défaut
    }));
  }

  // Avis Google réels
  const testimonials = (lead.googleReviewsData || []).slice(0, 3).map((review: any) => ({
    author: review.author || 'Client VIP',
    text: review.text || "Une prestation d'une qualité rare. L'équipe a su répondre à mes exigences avec une perfection remarquable. Je recommande les yeux fermés.",
    rating: review.rating || 5,
    date: review.date || ''
  }));

  if (testimonials.length === 0) {
    testimonials.push(
      { author: 'Emma L.', text: "Une expérience tout simplement majestueuse. Rapidité, précision et professionnalisme impressionnant.", rating: 5, date: 'Il y a 1 semaine' },
      { author: 'Arthur D.', text: "Service d'excellence du début à la fin. Les promesses sont tenues et même dépassées. Merci à toute l'équipe.", rating: 5, date: 'Il y a 2 semaines' }
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
    services: finalServices,
    testimonials,
    heroTitle,
    heroSubtitle,
    aboutText: description,
    ctaText
  };

  return buildUltimateHTML(content, template);
}

function buildUltimateHTML(content: UltimateContent, template: any): string {
  const { companyName, heroTitle, heroSubtitle, aboutText, services, testimonials, phone, email, address, website, rating, reviews } = content;
  
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex || '#ffffff');
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '255, 255, 255';
  };
  const primaryRgb = hexToRgb(template.primary);

  return `<!DOCTYPE html>
<html lang="fr" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${companyName} - ${content.sector}</title>
    
    <!-- Google Fonts: Outfit & Plus Jakarta Sans -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>

    <style>
        :root {
            --primary: ${template.primary};
            --secondary: ${template.secondary};
            --primary-rgb: ${primaryRgb};
            
            /* Premium Dark Mode Colors */
            --bg-base: #0a0a0c;
            --bg-surface: rgba(255, 255, 255, 0.03);
            --bg-glass: rgba(18, 18, 20, 0.4);
            --border-glass: rgba(255, 255, 255, 0.08);
            
            --text-main: #FFFFFF;
            --text-muted: #A1A1AA;
            
            --glow: 0 0 40px rgba(${primaryRgb}, 0.2);
            --glow-strong: 0 0 60px rgba(${primaryRgb}, 0.4);
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: var(--bg-base);
            color: var(--text-main);
            overflow-x: hidden;
            line-height: 1.7;
        }

        h1, h2, h3, h4, .brand-font {
            font-family: 'Outfit', sans-serif;
        }

        /* Abstract Animated Background */
        .bg-blobs {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            overflow: hidden;
            z-index: -1;
            background: #030305;
        }
        .blob {
            position: absolute;
            filter: blur(120px);
            opacity: 0.3;
            animation: float 20s infinite alternate cubic-bezier(0.4, 0, 0.2, 1);
            border-radius: 50%;
        }
        .blob-1 {
            background: var(--primary);
            width: 45vw; height: 45vw;
            top: -10vw; left: -10vw;
        }
        .blob-2 {
            background: var(--secondary);
            width: 35vw; height: 35vw;
            bottom: -5vw; right: -5vw;
            animation-delay: -10s;
        }
        @keyframes float {
            0% { transform: translate(0, 0) scale(1); }
            100% { transform: translate(15vw, 15vh) scale(1.1); }
        }

        /* Glassmorphism Components */
        .glass {
            background: var(--bg-glass);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid var(--border-glass);
            border-radius: 24px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }

        /* Navigation */
        nav {
            position: fixed;
            top: 0; width: 100%;
            z-index: 50;
            padding: 1.5rem 0;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        nav.scrolled {
            padding: 1rem 0;
            background: rgba(10, 10, 12, 0.85);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid var(--border-glass);
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .nav-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .brand {
            font-size: 1.75rem;
            font-weight: 800;
            letter-spacing: -0.5px;
            color: #fff;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .brand svg { color: var(--primary); }

        .btn-call {
            display: inline-flex; align-items: center; gap: 0.5rem;
            background: rgba(255,255,255,0.05); border: 1px solid var(--border-glass);
            color: white; padding: 0.5rem 1.25rem; border-radius: 100px;
            text-decoration: none; font-weight: 600; transition: all 0.3s;
        }
        .btn-call:hover {
            background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.2);
        }

        /* Hero Section */
        .hero {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 8rem 2rem 4rem;
            position: relative;
        }
        .hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1.25rem;
            border-radius: 100px;
            background: rgba(${primaryRgb}, 0.1);
            border: 1px solid rgba(${primaryRgb}, 0.2);
            color: ${template.primary === '#ffffff' ? '#ffffff' : 'var(--primary)'};
            font-size: 0.875rem;
            font-weight: 600;
            margin-bottom: 2rem;
            text-transform: uppercase;
            letter-spacing: 2px;
            backdrop-filter: blur(10px);
        }
        .hero h1 {
            font-size: clamp(3rem, 8vw, 6.5rem);
            font-weight: 800;
            line-height: 1;
            letter-spacing: -0.04em;
            margin-bottom: 1.5rem;
            background: linear-gradient(135deg, #fff 30%, rgba(255,255,255,0.5) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .hero p {
            font-size: clamp(1.125rem, 3vw, 1.375rem);
            color: var(--text-muted);
            max-width: 700px;
            margin: 0 auto 3.5rem;
            font-weight: 400;
        }
        .btn-glow {
            background: var(--primary);
            color: ${template.primary === '#ffffff' ? '#000' : '#fff'};
            padding: 1.25rem 2.5rem;
            border-radius: 100px;
            font-size: 1.125rem;
            font-weight: 600;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            transition: all 0.3s ease;
            cursor: pointer;
            box-shadow: var(--glow);
            border: none;
        }
        .btn-glow:hover {
            transform: translateY(-3px) scale(1.02);
            box-shadow: var(--glow-strong);
        }

        /* Container & Sections */
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 6rem 2rem;
            position: relative;
            z-index: 10;
        }
        .section-header {
            text-align: center;
            margin-bottom: 5rem;
        }
        .section-header h2 {
            font-size: clamp(2.5rem, 5vw, 3.5rem);
            margin-bottom: 1.25rem;
            font-weight: 700;
            letter-spacing: -0.02em;
        }
        .section-header p {
            color: var(--text-muted);
            font-size: 1.125rem;
            max-width: 600px;
            margin: 0 auto;
        }

        /* Services Grid */
        .grid-3 {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 2rem;
        }
        .card {
            padding: 3rem;
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s;
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            height: 100%;
        }
        .card::before {
            content: '';
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background: radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.06), transparent 40%);
            z-index: 0;
            opacity: 0;
            transition: opacity 0.3s;
        }
        .card:hover::before { opacity: 1; }
        .card:hover {
            transform: translateY(-8px);
            border-color: rgba(${primaryRgb}, 0.4);
            box-shadow: 0 20px 40px rgba(0,0,0,0.4), var(--glow);
        }
        .card > * { position: relative; z-index: 1; }
        
        .card-icon {
            width: 70px; height: 70px;
            border-radius: 20px;
            background: linear-gradient(135deg, rgba(${primaryRgb}, 0.2), rgba(${primaryRgb}, 0.05));
            border: 1px solid rgba(${primaryRgb}, 0.2);
            display: flex; align-items: center; justify-content: center;
            color: ${template.primary === '#ffffff' ? '#ffffff' : 'var(--primary)'};
            margin-bottom: 2rem;
        }
        .card-icon svg { width: 32px; height: 32px; }
        
        .card h3 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            font-weight: 700;
        }
        .card p {
            color: var(--text-muted);
            margin-bottom: 2rem;
            flex-grow: 1;
        }
        .feature-list {
            list-style: none;
            border-top: 1px solid var(--border-glass);
            padding-top: 1.5rem;
        }
        .feature-list li {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            color: #E4E4E7;
            margin-bottom: 0.75rem;
            font-size: 0.95rem;
        }
        .feature-list i {
            color: ${template.primary === '#ffffff' ? '#ffffff' : 'var(--primary)'};
            width: 18px; height: 18px;
        }

        /* About Grid */
        .about-wrap {
            display: grid; grid-template-columns: 1.2fr 0.8fr;
            gap: 5rem; align-items: center;
        }
        @media (max-width: 992px) { .about-wrap { grid-template-columns: 1fr; gap: 3rem; } }
        
        .stat-grid {
            display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;
        }
        .stat-card {
            padding: 2.5rem; text-align: center;
            display: flex; flex-direction: column; justify-content: center;
        }
        .stat-num {
            font-size: 3.5rem; font-weight: 800; font-family: 'Outfit';
            background: linear-gradient(135deg, var(--text-main) 0%, var(--text-muted) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 0.5rem;
            line-height: 1;
        }

        /* Testimonials */
        .testimonial-card {
            padding: 3rem;
            display: flex; flex-direction: column;
            justify-content: space-between;
        }
        .stars { display: flex; gap: 0.25rem; color: #FBBF24; margin-bottom: 1.5rem; }
        .stars svg { width: 20px; height: 20px; fill: currentColor; }
        
        /* CTA */
        .cta-box {
            text-align: center; padding: 6rem 3rem;
            background: radial-gradient(circle at center, rgba(${primaryRgb}, 0.15) 0%, transparent 70%);
            border: 1px solid var(--border-glass);
            margin-top: 2rem;
            position: relative; overflow: hidden;
        }
        
        .contact-details {
            display: flex; justify-content: center; gap: 2.5rem; flex-wrap: wrap; margin-top: 4rem;
        }
        .contact-item {
            display: flex; align-items: center; gap: 0.75rem; font-size: 1.1rem;
            color: var(--text-muted);
        }
        .contact-item svg { color: ${template.primary === '#ffffff' ? '#ffffff' : 'var(--primary)'}; }

        /* Animation classes */
        .reveal {
            opacity: 0;
            transform: translateY(40px);
            transition: all 0.9s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .reveal.active {
            opacity: 1;
            transform: translateY(0);
        }
    </style>
</head>
<body>

    <!-- Dynamic Background -->
    <div class="bg-blobs">
        <div class="blob blob-1"></div>
        <div class="blob blob-2"></div>
    </div>

    <!-- Navigation -->
    <nav id="navbar">
        <div class="nav-container">
            <a href="#" class="brand">
                <i data-lucide="zap"></i>${companyName}
            </a>
            ${phone ? `
            <a href="tel:${phone}" class="btn-call">
                <i data-lucide="phone"></i> ${phone}
            </a>` : ''}
        </div>
    </nav>

    <!-- Hero -->
    <section class="hero">
        <div class="hero-content reveal active">
            <div class="hero-badge">
                <i data-lucide="star"></i> Service Premium Certifié
            </div>
            <h1>${heroTitle}</h1>
            <p>${heroSubtitle}</p>
            <div style="margin-top: 2rem;">
                <a href="#services" class="btn-glow">
                    Découvrir nos solutions <i data-lucide="arrow-right"></i>
                </a>
            </div>
        </div>
    </section>

    <!-- Services -->
    <section class="container" id="services">
        <div class="section-header reveal">
            <h2>Notre Expertise</h2>
            <p>L'alliance parfaite de l'innovation et du savoir-faire pour des résultats hors normes.</p>
        </div>
        
        <div class="grid-3">
            ${services.map((s, i) => `
            <div class="card glass reveal" style="transition-delay: ${i * 100}ms">
                <div class="card-icon">
                    <i data-lucide="${['shield', 'layers', 'box', 'award', 'cpu', 'gem'][i%6]}"></i>
                </div>
                <h3>${s.name}</h3>
                <p>${s.description}</p>
                <ul class="feature-list">
                    ${s.features.map(f => `
                        <li><i data-lucide="check-circle-2"></i> ${f}</li>
                    `).join('')}
                </ul>
            </div>
            `).join('')}
        </div>
    </section>

    <!-- About / Stats -->
    <section class="container">
        <div class="about-wrap">
            <div class="reveal">
                <h2 style="font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; line-height: 1.2; margin-bottom: 1.5rem;">
                    Une vision axée sur <span style="color: ${template.primary === '#ffffff' ? '#ffffff' : 'var(--primary)'};">l'excellence.</span>
                </h2>
                <p style="color: var(--text-muted); font-size: 1.125rem; margin-bottom: 2.5rem; line-height: 1.8;">
                    ${aboutText}
                </p>
                <div style="display: flex; gap: 1.5rem; flex-wrap: wrap;">
                    <div style="display:flex; align-items:center; gap:0.5rem; background:rgba(255,255,255,0.05); padding: 0.75rem 1.5rem; border-radius: 100px; border: 1px solid var(--border-glass);">
                        <i data-lucide="check" style="color: ${template.primary === '#ffffff' ? '#ffffff' : 'var(--primary)'};"></i> <span>Équipe Dédiée</span>
                    </div>
                    <div style="display:flex; align-items:center; gap:0.5rem; background:rgba(255,255,255,0.05); padding: 0.75rem 1.5rem; border-radius: 100px; border: 1px solid var(--border-glass);">
                        <i data-lucide="check" style="color: ${template.primary === '#ffffff' ? '#ffffff' : 'var(--primary)'};"></i> <span>Innovation</span>
                    </div>
                </div>
            </div>
            
            <div class="stat-grid reveal" style="transition-delay: 200ms">
                ${(rating || 0) > 0 ? `
                <div class="stat-card glass">
                    <div class="stat-num">${rating}</div>
                    <div style="color:var(--text-muted); font-weight: 500;">Note Globale</div>
                </div>` : ''}
                ${(reviews || 0) > 0 ? `
                <div class="stat-card glass">
                    <div class="stat-num">${reviews}+</div>
                    <div style="color:var(--text-muted); font-weight: 500;">Avis Vérifiés</div>
                </div>` : ''}
                <div class="stat-card glass" ${(!rating && !reviews) ? 'style="grid-column: span 2;"' : ''}>
                    <div class="stat-num">100%</div>
                    <div style="color:var(--text-muted); font-weight: 500;">Satisfaction Client</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials -->
    ${testimonials && testimonials.length > 0 ? `
    <section class="container" id="testimonials">
        <div class="section-header reveal">
            <h2>Ils nous font confiance</h2>
            <p>Rejoignez nos clients VIP et vivez une expérience sans précédent.</p>
        </div>
        <div class="grid-3">
            ${testimonials.map((t, i) => `
            <div class="card testimonial-card glass reveal" style="transition-delay: ${i * 100}ms">
                <div>
                    <div class="stars">
                        ${Array(t.rating).fill('<i data-lucide="star"></i>').join('')}
                    </div>
                    <p style="color: #fff; font-size: 1.125rem; font-style: italic; line-height: 1.8;">"${t.text}"</p>
                </div>
                <div style="display: flex; align-items: center; gap: 1rem; margin-top: 2rem; border-top: 1px solid var(--border-glass); padding-top: 1.5rem;">
                    <div style="width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, var(--primary), var(--secondary)); display: flex; align-items:center; justify-content:center; font-weight: 700; color: ${template.primary === '#ffffff' ? '#000' : '#fff'}; font-size: 1.25rem;">
                        ${t.author.charAt(0)}
                    </div>
                    <div>
                        <div style="font-weight: 600; color: #fff;">${t.author}</div>
                        ${t.date ? `<div style="font-size: 0.875rem; color: var(--text-muted);">${t.date}</div>` : ''}
                    </div>
                </div>
            </div>
            `).join('')}
        </div>
    </section>
    ` : ''}

    <!-- CTA & Footer -->
    <section class="container">
        <div class="cta-box glass reveal">
            <h2 style="font-size: clamp(2rem, 5vw, 3.5rem); margin-bottom: 1.5rem; font-weight: 800;">
                Prêt à collaborer ensemble ?
            </h2>
            <p style="color: var(--text-muted); font-size: 1.25rem; margin-bottom: 3rem; max-width: 600px; margin-left: auto; margin-right: auto;">
                ${content.ctaText} ou contactez-nous directement pour concevoir votre projet.
            </p>
            
            ${phone ? `<a href="tel:${phone}" class="btn-glow" style="margin-bottom: 2rem;">
                <i data-lucide="phone-call"></i> Appeler : ${phone}
            </a>` : ''}

            <div class="contact-details">
                ${email ? `<div class="contact-item"><i data-lucide="mail"></i> ${email}</div>` : ''}
                ${address ? `<div class="contact-item"><i data-lucide="map-pin"></i> ${address}</div>` : ''}
                ${website ? `<div class="contact-item"><i data-lucide="globe"></i> ${website}</div>` : ''}
            </div>
        </div>
        
        <footer style="margin-top: 6rem; padding-top: 2rem; border-top: 1px solid var(--border-glass); display: flex; justify-content: space-between; align-items: center; color: var(--text-muted); flex-wrap: wrap; gap: 1rem;">
            <div class="brand" style="font-size: 1.25rem; color: var(--text-muted);">
                ${companyName}
            </div>
            <p style="font-size: 0.9rem;">&copy; ${new Date().getFullYear()} Tous droits réservés.</p>
        </footer>
    </section>

    <!-- Scripts -->
    <script>
        // Init Lucide Icons
        lucide.createIcons();

        // Navbar Scroll Effect
        window.addEventListener('scroll', () => {
            const nav = document.getElementById('navbar');
            if(window.scrollY > 50) nav.classList.add('scrolled');
            else nav.classList.remove('scrolled');
        });

        // Intersection Observer for Reveal Animations
        const reveals = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
        
        reveals.forEach(reveal => observer.observe(reveal));

        // Hover Effect on Cards (Glow follow mouse)
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', \`\${x}px\`);
                card.style.setProperty('--mouse-y', \`\${y}px\`);
            });
        });
    </script>
</body>
</html>`;
}
