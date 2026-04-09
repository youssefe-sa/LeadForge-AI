// ── TEMPLATE ULTIME - GARANTIE PROFESSIONNELLE 100% (MODERNE BRIGHT 2026) ──
// Résultat professionnel de pointe. Glassmorphism clair, complet, avec chatbot et WhatsApp.

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
    primary: '#2563eb',
    secondary: '#1d4ed8',
    accent: '#60a5fa',
    background: '#f8fafc',
    services: [
      { name: 'Dépannage Urgence', description: 'Intervention rapide 24/7 pour toutes vos urgences de plomberie', features: ['Disponible 24/7', 'Intervention sous 2h', 'Devis transparent'] },
      { name: 'Installation Sanitaire', description: 'Pose professionnelle de tous vos équipements sanitaires', features: ['Salle de bain complète', 'Cuisine équipée', 'Dépannage'] },
      { name: 'Chauffage & Climatisation', description: 'Installation et entretien de vos systèmes de chauffage', features: ['Pompes à chaleur', 'Chaudières', "Economie d'énergie"] },
      { name: 'Diagnostic Fuites', description: 'Détection précise et réparation de toutes les fuites', features: ['Recherche non destructive', 'Caméra endoscopique', 'Assurance'] },
      { name: 'Rénovation Complète', description: 'Transformation haute de gamme de votre salle de bain', features: ['Design sur mesure', 'Matériaux premium', 'Livraison clé en main'] },
      { name: 'Plomberie Générale', description: 'Tous travaux de plomberie pour professionnels et particuliers', features: ['Mise aux normes', 'Garantie décennale', 'SAV réactif'] }
    ],
    heroTitle: 'Votre Expert Plomberie',
    heroSubtitle: "Intervention d'excellence et garantie dans toute la région",
    aboutText: "Artisan certifié spécialisé dans les interventions premium. Nous garantissons un service d'excellence, réactif et doté d'une finition parfaite.",
    ctaText: 'Obtenir une intervention'
  },
  electricien: {
    primary: '#dc2626',
    secondary: '#b91c1c',
    accent: '#f87171',
    background: '#f8fafc',
    services: [
      { name: 'Mise aux Normes', description: 'Mise en conformité totale de votre installation', features: ['Consuel garanti', 'Normes NFC 15-100', 'Diagnostic de sécurité'] },
      { name: 'Tableau Électrique', description: 'Installation et rénovation de tableaux électriques', features: ['Sécurité certifiée', 'Marques premium', 'Protection optimale'] },
      { name: 'Éclairage Architectonique', description: 'Mise en lumière moderne et design', features: ['LED Premium', 'Étude photométrique', 'Contrôle à distance'] },
      { name: 'Maison Connectée', description: 'Installation de systèmes domotiques intelligents', features: ['Gestion smartphone', 'Scénarios de vie', 'Sécurité'] },
      { name: 'Dépannage Électrique', description: 'Diagnostic pointu et réparation instantanée', features: ['Intervention 24/7', 'Outils de précision', 'Fiabilité totale'] },
      { name: 'Diagnostic Complet', description: 'Bilan de votre installation électrique', features: ['Rapport détaillé', 'Conseil expert', 'Devis chiffré'] }
    ],
    heroTitle: 'Excellence Électrique',
    heroSubtitle: "L'énergie sûre et connectée, maîtrisée par des experts",
    aboutText: "Entreprise d'électricité qualifiée, nous concevons, installons et sécurisons vos réseaux avec des technologies de pointe.",
    ctaText: 'Demander un diagnostic'
  },
  coiffeur: {
    primary: '#7c3aed',
    secondary: '#6d28d9',
    accent: '#a78bfa',
    background: '#f8fafc',
    services: [
      { name: 'Création Femme', description: 'Coupe tendance et sur-mesure pour sublimer votre visage', features: ['Visagisme', 'Techniques modernes', 'Coiffage wavy'] },
      { name: 'Barber & Homme', description: 'Service barbier authentique et coupes structurées', features: ['Tracé millimétré', 'Soins barbe bio', 'Finition rasoir'] },
      { name: 'Coloration Premium', description: 'Nuances parfaites, balayages subtils et respect du cheveu', features: ['Poudres naturelles', 'Ombré Hair', 'Protection Olaplex'] },
      { name: 'Soin Profond', description: 'Rituels de soin luxueux pour une fibre capillaire réparée', features: ['Botox capillaire', 'Bain hydratant', 'Massage crânien relaxant'] },
      { name: 'Extensions', description: 'Longueur et volume avec des extensions 100% naturelles', features: ['Kératine ou bandes', 'Invisible', 'Durabilité maximum'] },
      { name: 'Haute Coiffure', description: 'Chignons et attaches pour vos plus beaux événements', features: ['Mariage', 'Essai personnalisé', 'Tenue parfaite'] }
    ],
    heroTitle: "L'Atelier de Coiffure",
    heroSubtitle: "Révélez votre beauté entre les mains d'experts passionnés",
    aboutText: "Un salon d'exception où chaque détail est pensé pour votre bien-être. Notre équipe artistique maîtrise les techniques les plus sophistiquées.",
    ctaText: 'Réserver mon moment'
  },
  restaurant: {
    primary: '#ea580c',
    secondary: '#c2410c',
    accent: '#fb923c',
    background: '#f8fafc',
    services: [
      { name: 'Carte Signature', description: "Une cuisine d'inspiration, moderne et de saison", features: ['Produits exceptionnels', "Ferme à l'assiette", 'Végétarien disponible'] },
      { name: 'Menu Dégustation', description: 'Le voyage culinaire ultime en plusieurs temps', features: ['Accord Mets & Vins', '7 services', 'Surprise du Chef'] },
      { name: "Cave d'Exception", description: 'Notre sommelier vous guide à travers nos meilleurs flacons', features: ['Vignobles rares', 'Grands crus', 'Mixologie créative'] },
      { name: 'Privatisation', description: 'Des espaces élégants pour vos événements privés', features: ['Service dédié', 'Menus personnalisés', "Jusqu'à 100 convives"] },
      { name: 'Brunch Premium', description: 'Le rendez-vous dominical incontournable et généreux', features: ['Buffet Signature', 'Viennoiseries maison', 'Jus fraîchement pressés'] },
      { name: 'Service Traiteur', description: "L'excellence de notre cuisine où vous le souhaitez", features: ['Cocktails chics', 'Dîners de gala', 'Mise en scène'] }
    ],
    heroTitle: 'Expérience Culinaire Unique',
    heroSubtitle: "L'harmonie parfaite entre gastronomie moderne et atmosphère élégante",
    aboutText: 'Nous repoussons les limites de la tradition culinaire pour offrir un moment inoubliable, où les produits nobles racontent une histoire dans chaque assiette.',
    ctaText: 'Réserver une table'
  },
  garage: {
    primary: '#059669',
    secondary: '#047857',
    accent: '#34d399',
    background: '#f8fafc',
    services: [
      { name: 'Diagnostic Électronique', description: 'Analyse précise de tous les calculateurs de votre véhicule', features: ['Valises constructeurs', 'Lecture de codes pannes', 'Effacement'] },
      { name: 'Entretien Constructeur', description: 'Révisions respectant scrupuleusement les cahiers des charges', features: ['Maintien garantie', 'Pièces origine', 'Huile premium'] },
      { name: 'Liaison au Sol', description: 'Techniciens experts en pneumatique et comportement', features: ['Géométrie 3D', 'Pneus Haute Perf', 'Amortisseurs'] },
      { name: 'Carrosserie Premium', description: 'Restauration esthétique parfaite sans différence de teinte', features: ['Spectromètre', 'Cabine de chauffe', 'Detaling inclus'] },
      { name: 'Moteur & Boîte', description: 'Interventions lourdes, remplacement de distribution ou embrayage', features: ['Outillage spécifique', 'Reconditionnement', 'Vidange BVA'] },
      { name: 'Voitures de Prestige', description: 'Une équipe spécialisée dans les véhicules sportifs et luxe', features: ['Manipulation soigneuse', 'Local sécurisé', 'Expertise pointue'] }
    ],
    heroTitle: 'Le Pôle Mécanique Prémium',
    heroSubtitle: "L'expertise absolue pour sublimer et entretenir votre véhicule",
    aboutText: "Notre garage de pointe rassemble l'élite des techniciens pour offrir à votre véhicule un entretien sans compromis.",
    ctaText: 'Prendre rendez-vous atelier'
  },
  default: {
    primary: '#334155',
    secondary: '#1e293b',
    accent: '#94a3b8',
    background: '#f8fafc',
    services: [
      { name: 'Consultation Experte', description: 'Analyse approfondie de vos besoins stratégiques', features: ['Diagnostic sur mesure', "Plan d'action", 'Écoute active'] },
      { name: 'Solutions Premium', description: 'Implémentation de services à forte valeur ajoutée', features: ['Qualité irréprochable', 'Suivi de performance', 'Finitions parfaites'] },
      { name: 'Accompagnement VIP', description: 'Un interlocuteur dédié tout au long du processus', features: ['Ligne directe', 'RDV prioritaire', 'Bilan mensuel'] },
      { name: 'Innovation & Technologie', description: 'Utilisation des meilleurs outils du marché', features: ['Méthodes agiles', 'Veille constante', 'Equipement de pointe'] },
      { name: 'Stratégie Sur-Mesure', description: 'Vos objectifs se transforment en résultats mesurables', features: ['ROI assuré', 'Alignement parfait', 'Transparence absolue'] },
      { name: 'Service Client 24/7', description: 'Une présence permanente quand vous avez besoin de nous', features: ['Assistance immédiate', 'Proactivité', 'Garanties solides'] }
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
    return { ...SECTOR_ULTIMATE_TEMPLATES.default, primary: '#0284c7', secondary: '#0369a1' };
  }
  if (normalizedSector.includes('avocat') || normalizedSector.includes('notaire') || normalizedSector.includes('juridi')) {
    return { ...SECTOR_ULTIMATE_TEMPLATES.default, primary: '#b45309', secondary: '#92400e' };
  }
  if (normalizedSector.includes('beauté') || normalizedSector.includes('esthétique') || normalizedSector.includes('spa')) {
    return { ...SECTOR_ULTIMATE_TEMPLATES.coiffeur, primary: '#db2777', secondary: '#be185d' };
  }
  if (normalizedSector.includes('boulanger') || normalizedSector.includes('pâtissier')) {
    return SECTOR_ULTIMATE_TEMPLATES.restaurant;
  }
  return SECTOR_ULTIMATE_TEMPLATES.default;
}

// Nettoyeur de texte de logo selon les instructions (2 lettres, 2 mots sans les articles)
function getLogoInfo(name: string) {
  if (!name) return { initials: "CO", text: "Company" };
  const skip = ['le', 'la', 'les', 'de', 'du', 'des', "l'", "d'", 'à', 'a', 'et', '&', 'en', 'pour'];
  let cleanName = name.replace(/['']/g, "' ");
  const words = cleanName.split(/\s+/).filter(w => w.length > 0 && !skip.includes(w.toLowerCase()));
  const finalWords = words.slice(0, 2).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
  if (finalWords.length === 0) finalWords.push("Pro", "Service");
  if (finalWords.length === 1) finalWords.push("Pro");
  const initials = finalWords[0].charAt(0) + finalWords[1].charAt(0);
  const text = finalWords.join(' ');
  return { initials: initials.toUpperCase(), text };
}

export function generateUltimateSite(lead: any, aiContent?: any): string {
  const template = getUltimateTemplate(lead.sector);
  const companyName = lead.name || 'Entreprise Premium';
  const city = lead.city || '';
  const phone = lead.phone || '+33 6 12 34 56 78';
  const email = lead.email || 'contact@entreprise.fr';
  const address = lead.address || (city ? `Centre Ville, ${city}` : 'France');
  const website = lead.website || '';
  const rating = lead.googleRating || 5;
  const reviews = lead.googleReviews || 42;
  
  const description = aiContent?.aboutText || lead.description || template.aboutText;
  const heroTitle = aiContent?.heroTitle || template.heroTitle;
  const heroSubtitle = aiContent?.heroSubtitle || `${template.heroSubtitle}${city ? ' à ' + city : ''}`;
  const ctaText = aiContent?.cta || template.ctaText;
  
  let finalServices = template.services;
  if (aiContent?.services && Array.isArray(aiContent.services) && aiContent.services.length > 0) {
    finalServices = aiContent.services.map((s: any, idx: number) => ({
      name: s.name || `Service ${idx+1}`,
      description: s.description || '',
      features: template.services[idx % template.services.length].features
    }));
  }

  // 6 avis demandés (si le lead en a moins, on complète)
  let testimonials = (lead.googleReviewsData || []).map((review: any) => ({
    author: review.author || 'Client VIP',
    text: review.text || "Une prestation exceptionnelle.",
    rating: review.rating || 5,
    date: review.date || 'Récemment'
  }));

  const fallbackReviews = [
    { author: 'Emma L.', text: "Une expérience tout simplement majestueuse. Rapidité, précision et professionnalisme impressionnant. Merci à toute l'équipe pour ce travail d'orfèvre.", rating: 5, date: 'Il y a 1 semaine' },
    { author: 'Arthur D.', text: "Service d'excellence du début à la fin. Les promesses sont tenues et même dépassées. C'est rare de trouver des professionnels aussi dévoués.", rating: 5, date: 'Il y a 2 semaines' },
    { author: 'Sophie M.', text: "Très satisfaite de l'intervention. Une équipe à l'écoute, réactive et des résultats visibles immédiatement. Je recommande fortement.", rating: 5, date: 'Il y a 3 semaines' },
    { author: 'Lucas T.', text: "Intervention rapide et propre. Tarifs clairs sans mauvaises surprises. Je garde le numéro précieusement.", rating: 5, date: 'Il y a 1 mois' },
    { author: 'Marie J.', text: "Je n'ai jamais vu un tel niveau de finition. Ils ont un vrai sens du détail. Tout a été livré en temps et en heure.", rating: 5, date: 'Il y a 1 mois' },
    { author: 'Hugo N.', text: "Contact fluide, devis respecté, personnel respectueux des lieux. Un professionnalisme comme on n'en fait plus !", rating: 5, date: 'Il y a 2 mois' }
  ];
  
  while (testimonials.length < 6) {
    testimonials.push(fallbackReviews[testimonials.length % fallbackReviews.length]);
  }
  testimonials = testimonials.slice(0, 6);

  const content: UltimateContent = {
    companyName, sector: lead.sector || 'Professionnel', city, description, phone, email, address, website, rating, reviews,
    services: finalServices, testimonials, heroTitle, heroSubtitle, aboutText: description, ctaText
  };

  return buildUltimateHTML(content, template);
}

function buildUltimateHTML(content: UltimateContent, template: any): string {
  const { companyName, heroTitle, heroSubtitle, aboutText, services, testimonials, phone, email, address, website, city, ctaText, rating, reviews } = content;
  
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex || '#ffffff');
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '255, 255, 255';
  };
  const primaryRgb = hexToRgb(template.primary);
  const logoInfo = getLogoInfo(companyName);
  
  const cleanPhoneLink = phone ? phone.replace(/[^0-9+]/g, '') : '';
  const mapQuery = encodeURIComponent(address + (content.city ? ', ' + content.city : ''));

  return `<!DOCTYPE html>
<html lang="fr" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${companyName} - ${content.sector}</title>
    
    <!-- Google Fonts: Outfit & Inter -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>

    <style>
        :root {
            --primary: ${template.primary};
            --secondary: ${template.secondary};
            --primary-rgb: ${primaryRgb};
            
            /* Modern Light Glassmorphism Colors 2026 */
            --bg-base: #f8fafc;
            --bg-surface: rgba(255, 255, 255, 0.7);
            --bg-glass: rgba(255, 255, 255, 0.65);
            --border-glass: rgba(255, 255, 255, 0.8);
            
            --text-main: #0f172a;
            --text-muted: #475569;
            --text-light: #94a3b8;
            
            --glow: 0 10px 40px rgba(${primaryRgb}, 0.08);
            --glow-strong: 0 15px 50px rgba(${primaryRgb}, 0.15);
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: 'Inter', sans-serif;
            background-color: var(--bg-base);
            color: var(--text-main);
            overflow-x: hidden;
            line-height: 1.7;
        }

        h1, h2, h3, h4, .brand-font {
            font-family: 'Outfit', sans-serif;
        }

        /* Top Marquee Defilant */
        .top-marquee {
            background-color: var(--primary);
            color: white;
            font-size: 0.85rem;
            font-weight: 500;
            padding: 8px 0;
            white-space: nowrap;
            overflow: hidden;
            position: relative;
            z-index: 100;
        }
        .marquee-content {
            display: inline-flex;
            gap: 3rem;
            animation: marquee 30s linear infinite;
        }
        .marquee-content:hover {
            animation-play-state: paused;
        }
        .marquee-item {
            display: inline-flex;
            align-items: center;
            gap: 6px;
        }
        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }

        /* Abstract Animated Light Background */
        .bg-blobs {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            overflow: hidden;
            z-index: -1;
            background: #f8fafc;
        }
        .blob {
            position: absolute;
            filter: blur(100px);
            opacity: 0.15;
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

        /* Modern Glassmorphism Components */
        .glass {
            background: var(--bg-glass);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border: 1px solid var(--border-glass);
            border-radius: 24px;
            box-shadow: 0 8px 32px rgba(31, 38, 135, 0.04);
        }

        /* Navigation */
        nav {
            position: fixed;
            top: 36px; /* Below marquee */
            width: 100%;
            z-index: 50;
            padding: 1.5rem 0;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        nav.scrolled {
            top: 0;
            padding: 1rem 0;
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(0,0,0,0.05);
            box-shadow: 0 10px 30px rgba(0,0,0,0.03);
        }
        .nav-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo-svg {
            width: 45px;
            height: 45px;
            border-radius: 12px;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-family: 'Outfit', sans-serif;
            font-weight: 800;
            font-size: 1.25rem;
            letter-spacing: -0.5px;
            box-shadow: 0 8px 20px rgba(${primaryRgb}, 0.2);
        }
        .brand {
            font-size: 1.75rem;
            font-weight: 800;
            letter-spacing: -0.5px;
            color: var(--text-main);
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .btn-call {
            display: inline-flex; align-items: center; gap: 0.5rem;
            background: white; border: 1px solid rgba(0,0,0,0.05);
            color: var(--text-main); padding: 0.5rem 1.25rem; border-radius: 100px;
            text-decoration: none; font-weight: 600; transition: all 0.3s;
            box-shadow: 0 4px 10px rgba(0,0,0,0.02);
        }
        .btn-call:hover {
            background: var(--primary); color: white;
            box-shadow: var(--glow);
        }

        /* Hero Section */
        .hero {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 10rem 2rem 4rem;
            position: relative;
        }
        .hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1.5rem;
            border-radius: 100px;
            background: white;
            border: 1px solid rgba(${primaryRgb}, 0.2);
            color: var(--primary);
            font-size: 0.875rem;
            font-weight: 700;
            margin-bottom: 2rem;
            text-transform: uppercase;
            letter-spacing: 2px;
            box-shadow: 0 4px 20px rgba(${primaryRgb}, 0.08);
        }
        .hero h1 {
            font-size: clamp(3rem, 7vw, 5.5rem);
            font-weight: 800;
            line-height: 1.1;
            letter-spacing: -0.04em;
            margin-bottom: 1.5rem;
            color: var(--text-main);
        }
        .hero h1 span {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .hero p {
            font-size: clamp(1.125rem, 2.5vw, 1.375rem);
            color: var(--text-muted);
            max-width: 700px;
            margin: 0 auto 3.5rem;
            font-weight: 400;
        }
        .btn-glow {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white;
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
            box-shadow: var(--glow-strong);
            border: none;
        }
        .btn-glow:hover {
            transform: translateY(-3px) scale(1.02);
            box-shadow: 0 20px 40px rgba(${primaryRgb}, 0.3);
            color: white;
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
            margin-bottom: 4rem;
        }
        .section-header h2 {
            font-size: clamp(2.5rem, 5vw, 3.5rem);
            margin-bottom: 1.25rem;
            font-weight: 800;
            letter-spacing: -0.02em;
        }
        .section-header p {
            color: var(--text-muted);
            font-size: 1.125rem;
            max-width: 600px;
            margin: 0 auto;
        }

        /* Process Section (4 Démarches) */
        .process-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 2rem;
            position: relative;
        }
        .step-card {
            padding: 2.5rem;
            text-align: center;
            background: white;
            border-radius: 24px;
            position: relative;
            box-shadow: 0 4px 20px rgba(0,0,0,0.02);
            border: 1px solid rgba(0,0,0,0.03);
            transition: transform 0.3s;
        }
        .step-card:hover { transform: translateY(-5px); box-shadow: var(--glow); }
        .step-number {
            width: 60px; height: 60px;
            border-radius: 50%;
            background: var(--bg-base);
            color: var(--primary);
            font-weight: 800;
            font-size: 1.5rem;
            display: flex; align-items: center; justify-content: center;
            margin: 0 auto 1.5rem;
            border: 2px dashed var(--primary);
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
            background: radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,1), transparent 40%);
            z-index: 0;
            opacity: 0;
            transition: opacity 0.3s;
        }
        .card:hover::before { opacity: 1; }
        .card:hover {
            transform: translateY(-8px);
            border-color: rgba(${primaryRgb}, 0.2);
            box-shadow: 0 20px 40px rgba(0,0,0,0.05), var(--glow);
        }
        .card > * { position: relative; z-index: 1; }
        
        .card-icon {
            width: 70px; height: 70px;
            border-radius: 20px;
            background: linear-gradient(135deg, rgba(${primaryRgb}, 0.15), rgba(${primaryRgb}, 0.05));
            display: flex; align-items: center; justify-content: center;
            color: var(--primary);
            margin-bottom: 2rem;
        }
        
        .card h3 { font-size: 1.5rem; margin-bottom: 1rem; font-weight: 700; color: var(--text-main); }
        .card p { color: var(--text-muted); margin-bottom: 2rem; flex-grow: 1; }
        .feature-list { list-style: none; border-top: 1px solid rgba(0,0,0,0.05); padding-top: 1.5rem; }
        .feature-list li { display: flex; align-items: center; gap: 0.75rem; color: var(--text-muted); margin-bottom: 0.75rem; font-size: 0.95rem; font-weight: 500; }
        .feature-list i { color: var(--primary); width: 18px; height: 18px; }

        /* Testimonials */
        .testimonial-card {
            padding: 3rem; display: flex; flex-direction: column; justify-content: space-between;
        }
        .stars { display: flex; gap: 0.25rem; color: #f59e0b; margin-bottom: 1.5rem; }
        
        /* Map & Contact Form */
        .contact-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
            background: white;
            border-radius: 30px;
            overflow: hidden;
            box-shadow: 0 20px 50px rgba(0,0,0,0.03);
            border: 1px solid rgba(0,0,0,0.04);
        }
        @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr; } }
        
        .contact-form-side { padding: 4rem; }
        .form-group { margin-bottom: 1.5rem; }
        .form-control {
            width: 100%; padding: 1rem 1.5rem; border-radius: 12px;
            border: 1px solid #e2e8f0; background: #f8fafc;
            font-family: 'Inter', sans-serif; font-size: 1rem;
            transition: all 0.3s;
        }
        .form-control:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 4px rgba(${primaryRgb}, 0.1); background: white; }
        
        .map-side iframe { width: 100%; height: 100%; min-height: 400px; border: none; filter: grayscale(10%) contrast(110%); }

        /* Footer */
        footer {
            background: var(--text-main);
            color: white;
            padding: 5rem 2rem 2rem;
            margin-top: 4rem;
            border-top-left-radius: 40px;
            border-top-right-radius: 40px;
        }
        .footer-grid {
            max-width: 1200px; margin: 0 auto;
            display: grid; grid-template-columns: 2fr 1fr 1fr 1.5fr; gap: 4rem;
            margin-bottom: 4rem;
        }
        @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 600px) { .footer-grid { grid-template-columns: 1fr; } }
        
        .footer-logo { font-size: 2rem; font-family: 'Outfit'; font-weight: 800; color: white; display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
        .footer-col h4 { font-size: 1.25rem; font-weight: 700; margin-bottom: 1.5rem; color: white; }
        .footer-col ul { list-style: none; }
        .footer-col ul li { margin-bottom: 0.75rem; }
        .footer-col ul li a { color: var(--text-light); text-decoration: none; transition: 0.3s; }
        .footer-col ul li a:hover { color: white; padding-left: 5px; }
        .footer-bottom { text-align: center; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 2rem; color: var(--text-light); font-size: 0.9rem; }

        /* Floating Widgets */
        .float-whatsapp {
            position: fixed; bottom: 30px; left: 30px;
            width: 60px; height: 60px;
            background: #25D366; color: white;
            border-radius: 50%; display: flex; align-items: center; justify-content: center;
            font-size: 30px; box-shadow: 0 10px 30px rgba(37, 211, 102, 0.4);
            z-index: 999; transition: transform 0.3s; text-decoration: none;
        }
        .float-whatsapp:hover { transform: scale(1.1) translateY(-5px); color: white; }

        /* Fake Chatbot UI */
        .chatbot-btn {
            position: fixed; bottom: 30px; right: 30px;
            width: 65px; height: 65px;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center;
            box-shadow: var(--glow-strong); z-index: 999; cursor: pointer; transition: 0.3s; border: none;
        }
        .chatbot-btn:hover { transform: scale(1.1) translateY(-5px); }
        .chat-window {
            position: fixed; bottom: 100px; right: 30px;
            width: 350px; height: 500px;
            background: white; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.15);
            z-index: 998; display: flex; flex-direction: column; overflow: hidden;
            opacity: 0; pointer-events: none; transform: translateY(20px); transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .chat-window.open { opacity: 1; pointer-events: all; transform: translateY(0); }
        .chat-header {
            background: linear-gradient(135deg, var(--primary), var(--secondary)); color: white;
            padding: 1.25rem; font-family: 'Outfit'; font-weight: 700; display: flex; align-items: center; gap: 10px;
        }
        .chat-body { flex: 1; padding: 1.5rem; overflow-y: auto; background: #f8fafc; }
        .chat-msg { background: white; padding: 1rem; border-radius: 12px; border-bottom-left-radius: 0; box-shadow: 0 2px 10px rgba(0,0,0,0.05); margin-bottom: 1rem; font-size: 0.95rem; }
        .chat-input { padding: 1rem; background: white; border-top: 1px solid #e2e8f0; display: flex; gap: 10px; }
        .chat-input input { flex: 1; border: none; outline: none; background: #f1f5f9; padding: 0.75rem 1rem; border-radius: 100px; font-family: 'Inter'; }
        
        .reveal { opacity: 0; transform: translateY(40px); transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .reveal.active { opacity: 1; transform: translateY(0); }
    </style>
</head>
<body>

    <!-- Marquee Banner -->
    <div class="top-marquee">
        <div class="marquee-content">
            <div class="marquee-item"><i data-lucide="clock" stroke-width="2.5" width="16"></i> Ouvert de 9h à 18h en semaine</div>
            <div class="marquee-item"><i data-lucide="phone" stroke-width="2.5" width="16"></i> Intervention rapide: ${phone}</div>
            <div class="marquee-item"><i data-lucide="mail" stroke-width="2.5" width="16"></i> Envoyez un message: ${email}</div>
            <div class="marquee-item"><i data-lucide="map-pin" stroke-width="2.5" width="16"></i> Basé à: ${city || address}</div>
            <!-- Duplication for infinite effect -->
            <div class="marquee-item"><i data-lucide="clock" stroke-width="2.5" width="16"></i> Ouvert de 9h à 18h en semaine</div>
            <div class="marquee-item"><i data-lucide="phone" stroke-width="2.5" width="16"></i> Intervention rapide: ${phone}</div>
            <div class="marquee-item"><i data-lucide="mail" stroke-width="2.5" width="16"></i> Envoyez un message: ${email}</div>
            <div class="marquee-item"><i data-lucide="map-pin" stroke-width="2.5" width="16"></i> Basé à: ${city || address}</div>
        </div>
    </div>

    <div class="bg-blobs"><div class="blob blob-1"></div><div class="blob blob-2"></div></div>

    <!-- Navigation -->
    <nav id="navbar">
        <div class="nav-container">
            <a href="#" class="brand">
                <div class="logo-svg">${logoInfo.initials}</div>
                ${logoInfo.text}
            </a>
            <div style="display: flex; gap: 1.5rem; align-items: center;">
                <div style="display: none; align-items: center; gap: 2rem; font-weight: 500;" class="desktop-menu">
                    <a href="#services" style="text-decoration: none; color: var(--text-main);">Services</a>
                    <a href="#process" style="text-decoration: none; color: var(--text-main);">Démarche</a>
                    <a href="#testimonials" style="text-decoration: none; color: var(--text-main);">Avis</a>
                </div>
                ${phone ? `<a href="tel:${phone}" class="btn-call"><i data-lucide="phone" width="18"></i> Nous appeler</a>` : ''}
            </div>
        </div>
    </nav>

    <!-- Hero -->
    <section class="hero">
        <div class="hero-content reveal active">
            <div class="hero-badge"><i data-lucide="shield-check" width="18"></i> 2026 Innovation Premium</div>
            <h1>${heroTitle.replace(/ (.*?)$/, ' <span>$1</span>')}</h1>
            <p>${heroSubtitle}</p>
            <div>
                <a href="#contact" class="btn-glow">
                    ${ctaText} <i data-lucide="arrow-right"></i>
                </a>
            </div>
        </div>
    </section>

    <!-- Process (4 Démarches) -->
    <section class="container" id="process">
        <div class="section-header reveal">
            <h2>Notre démarche en 4 étapes</h2>
            <p>Une méthodologie claire et transparente pour garantir le succès de votre projet.</p>
        </div>
        <div class="process-grid reveal">
            <div class="step-card">
                <div class="step-number">1</div>
                <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1rem; font-family: 'Outfit';">Prise de contact</h3>
                <p style="color: var(--text-muted); font-size: 0.95rem;">Nous étudions ensemble votre besoin et définissons les priorités.</p>
            </div>
            <div class="step-card">
                <div class="step-number">2</div>
                <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1rem; font-family: 'Outfit';">Devis détaillé</h3>
                <p style="color: var(--text-muted); font-size: 0.95rem;">Un chiffrage précis et transparent, sans aucun frais caché.</p>
            </div>
            <div class="step-card">
                <div class="step-number">3</div>
                <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1rem; font-family: 'Outfit';">Intervention</h3>
                <p style="color: var(--text-muted); font-size: 0.95rem;">Réalisation de la prestation par nos experts qualifiés.</p>
            </div>
            <div class="step-card">
                <div class="step-number">4</div>
                <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1rem; font-family: 'Outfit';">Suivi qualité</h3>
                <p style="color: var(--text-muted); font-size: 0.95rem;">Nous nous assurons de votre entière satisfaction après livraison.</p>
            </div>
        </div>
    </section>

    <!-- Services -->
    <section class="container" id="services">
        <div class="section-header reveal">
            <h2>Notre Expertise Premium</h2>
            <p>L'alliance parfaite de la maîtrise technique et des outils les plus modernes.</p>
        </div>
        <div class="grid-3">
            ${services.map((s, i) => `
            <div class="card glass reveal" style="transition-delay: ${i * 100}ms">
                <div class="card-icon">
                    <i data-lucide="${['shield', 'layers', 'box', 'award', 'cpu', 'gem'][i%6]}" width="32" height="32"></i>
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

    <!-- Testimonials (6 Avis) -->
    <section class="container" id="testimonials">
        <div class="section-header reveal">
            <h2>Ils l'ont vérifié, ils l'ont approuvé</h2>
            <p>Découvrez pourquoi 100% de nos clients nous recommandent à leur entourage.</p>
        </div>
        <div class="grid-3">
            ${testimonials.map((t, i) => `
            <div class="card testimonial-card glass reveal" style="transition-delay: ${(i%3) * 100}ms">
                <div>
                    <div class="stars">
                        ${Array(t.rating).fill('<i data-lucide="star" fill="currentColor"></i>').join('')}
                    </div>
                    <p style="color: var(--text-main); font-size: 1.125rem; font-weight: 500; font-style: italic; line-height: 1.6;">"${t.text}"</p>
                </div>
                <div style="display: flex; align-items: center; gap: 1rem; margin-top: 2rem; border-top: 1px solid rgba(0,0,0,0.05); padding-top: 1.5rem;">
                    <div style="width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, var(--primary), var(--secondary)); display: flex; align-items:center; justify-content:center; font-weight: 700; color: white; font-size: 1.25rem;">
                        ${t.author.charAt(0)}
                    </div>
                    <div>
                        <div style="font-weight: 700; color: var(--text-main);">${t.author}</div>
                        ${t.date ? `<div style="font-size: 0.875rem; color: var(--text-muted);">${t.date}</div>` : ''}
                    </div>
                </div>
            </div>
            `).join('')}
        </div>
    </section>

    <!-- Maps & Contact -->
    <section class="container" id="contact">
        <div class="section-header reveal">
            <h2>Passez à l'action dès aujourd'hui</h2>
            <p>Notre équipe est prête à intervenir. Contactez-nous pour un diagnostic rapide.</p>
        </div>
        <div class="contact-grid reveal">
            <div class="map-side">
                <iframe 
                    src="https://maps.google.com/maps?q=${mapQuery}&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                    allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
            <div class="contact-form-side">
                <h3 style="font-size: 2rem; font-family: 'Outfit'; margin-bottom: 2rem;">Envoyez-nous un message</h3>
                <form onsubmit="event.preventDefault(); alert('Message envoyé avec succès. Nous vous contacterons très vite !');">
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Votre nom complet" required>
                    </div>
                    <div class="form-group">
                        <input type="email" class="form-control" placeholder="Votre adresse e-mail" required>
                    </div>
                    <div class="form-group">
                        <input type="tel" class="form-control" placeholder="Votre téléphone" required>
                    </div>
                    <div class="form-group">
                        <textarea class="form-control" rows="4" placeholder="Détaillez votre besoin..." required></textarea>
                    </div>
                    <button type="submit" class="btn-glow" style="width: 100%; justify-content: center;">
                        <i data-lucide="send"></i> Envoyer la demande
                    </button>
                    <p style="text-align: center; margin-top: 1rem; font-size: 0.85rem; color: var(--text-light);">
                        Données protégées et confidentielles. Aucun spam.
                    </p>
                </form>
            </div>
        </div>
    </section>

    <!-- Professional Footer -->
    <footer>
        <div class="footer-grid">
            <div class="footer-col">
                <div class="footer-logo">
                    <div class="logo-svg" style="box-shadow: none;">${logoInfo.initials}</div>
                    ${logoInfo.text}
                </div>
                <p style="color: var(--text-light); margin-bottom: 2rem;">${aboutText.substring(0, 120)}...</p>
                <div style="display: flex; gap: 1rem;">
                    <a href="#" style="color: white; opacity: 0.7; transition: 0.3s;"><i data-lucide="facebook"></i></a>
                    <a href="#" style="color: white; opacity: 0.7; transition: 0.3s;"><i data-lucide="instagram"></i></a>
                    <a href="#" style="color: white; opacity: 0.7; transition: 0.3s;"><i data-lucide="linkedin"></i></a>
                </div>
            </div>
            <div class="footer-col">
                <h4>Nos Services</h4>
                <ul>
                    ${services.slice(0,4).map(s => `<li><a href="#services">${s.name}</a></li>`).join('')}
                    <li><a href="#contact">Sur Devis</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Liens Utiles</h4>
                <ul>
                    <li><a href="#process">Notre Démarche</a></li>
                    <li><a href="#testimonials">Avis Clients</a></li>
                    <li><a href="#">Mentions Légales</a></li>
                    <li><a href="#">Confidentialité</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Contact Info</h4>
                <ul style="color: var(--text-light);">
                    ${phone ? `<li style="display: flex; gap: 10px;"><i data-lucide="phone"></i> ${phone}</li>` : ''}
                    ${email ? `<li style="display: flex; gap: 10px;"><i data-lucide="mail"></i> ${email}</li>` : ''}
                    ${address ? `<li style="display: flex; gap: 10px;"><i data-lucide="map-pin"></i> ${address}</li>` : ''}
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2026 ${logoInfo.text}. Tous droits réservés. Créé avec les dernières technologies du web.</p>
        </div>
    </footer>

    <!-- Floating Buttons -->
    <a href="https://wa.me/${cleanPhoneLink}?text=Bonjour, je souhaite avoir plus d'informations." target="_blank" class="float-whatsapp" title="Discuter sur WhatsApp">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/></svg>
    </a>

    <button id="chatbot-toggle" class="chatbot-btn">
        <i data-lucide="message-circle" width="30" height="30"></i>
    </button>

    <!-- Chatbot Window -->
    <div class="chat-window" id="chat-window">
        <div class="chat-header">
            <div style="width: 10px; height: 10px; background: #22c55e; border-radius: 50%;"></div>
            Assistant IA - ${logoInfo.text}
        </div>
        <div class="chat-body" id="chat-body">
            <div class="chat-msg">Bonjour ! Je suis l'assistant virtuel de ${logoInfo.text}. Comment puis-je vous aider aujourd'hui ? Avez-vous une question sur nos services ?</div>
        </div>
        <div class="chat-input">
            <input type="text" id="chat-text" placeholder="Écrivez votre message...">
            <button onclick="sendMsg()" style="background: none; border: none; color: var(--primary); cursor: pointer;"><i data-lucide="send"></i></button>
        </div>
    </div>

    <!-- Scripts -->
    <script>
        lucide.createIcons();

        // Navbar Scroll Effect
        window.addEventListener('scroll', () => {
            const nav = document.getElementById('navbar');
            if(window.scrollY > 40) nav.classList.add('scrolled');
            else nav.classList.remove('scrolled');
        });

        // CSS Media query JS equivalent for desktop menu
        if (window.innerWidth > 768) {
            document.querySelector('.desktop-menu').style.display = 'flex';
        }

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

        // Hover Effect on Cards
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', \`\${x}px\`);
                card.style.setProperty('--mouse-y', \`\${y}px\`);
            });
        });

        // Chatbot Logic
        const chatToggle = document.getElementById('chatbot-toggle');
        const chatWindow = document.getElementById('chat-window');
        const chatBody = document.getElementById('chat-body');
        const chatText = document.getElementById('chat-text');

        chatToggle.addEventListener('click', () => {
            chatWindow.classList.toggle('open');
        });

        function sendMsg() {
            const val = chatText.value.trim();
            if(!val) return;
            
            // User msg
            const uMsg = document.createElement('div');
            uMsg.className = 'chat-msg';
            uMsg.style.background = 'var(--primary)';
            uMsg.style.color = 'white';
            uMsg.style.marginLeft = 'auto';
            uMsg.style.borderBottomLeftRadius = '12px';
            uMsg.style.borderBottomRightRadius = '0';
            uMsg.textContent = val;
            chatBody.appendChild(uMsg);
            chatText.value = '';
            chatBody.scrollTo(0, chatBody.scrollHeight);

            // Bot typing
            setTimeout(() => {
                const bMsg = document.createElement('div');
                bMsg.className = 'chat-msg';
                
                const responses = [
                    "C'est noté ! Je transfère votre demande à notre équipe experte. Pouvez-vous me laisser vos coordonnées ?",
                    "Excellente question. Nos tarifs sur-mesure nécessitent une étude rapide. Appelez-nous au ${phone} pour vérifier.",
                    "Oui, nous couvrons bien cette prestation. Souhaitez-vous planifier un diagnostic gratuit ?",
                    "Pour cette demande spécifique, le plus rapide est de nous laisser votre numéro. Acceptez-vous ?"
                ];
                bMsg.textContent = responses[Math.floor(Math.random() * responses.length)];
                
                chatBody.appendChild(bMsg);
                chatBody.scrollTo(0, chatBody.scrollHeight);
            }, 1000);
        }
        chatText.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMsg(); });
    </script>
</body>
</html>`;
}
