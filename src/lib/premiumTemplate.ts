// ── TEMPLATE PREMIUM 2026 - DESIGN MODERNE PROFESSIONNEL ──
// Glassmorphism, animations fluides, images haute qualité, contenu riche

import { getSectorImages } from './pexelsImages';

interface PremiumContent {
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
  services: Array<{ name: string; description: string; icon: string; features: string[] }>;
  testimonials: Array<{ author: string; text: string; rating: number; date?: string }>;
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  ctaText: string;
  slogan: string;
  heroImage: string;
  allImages: string[];
}

// Palettes de couleurs premium par secteur
const SECTOR_PREMIUM_PALETTES = {
  plomberie: {
    primary: '#0ea5e9',
    secondary: '#0284c7',
    accent: '#38bdf8',
    background: '#f0f9ff',
    surface: '#ffffff',
    text: '#0f172a',
    textLight: '#64748b',
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
    glass: 'rgba(255, 255, 255, 0.8)',
    font: 'Inter'
  },
  electricien: {
    primary: '#f59e0b',
    secondary: '#d97706',
    accent: '#fbbf24',
    background: '#fffbeb',
    surface: '#ffffff',
    text: '#0f172a',
    textLight: '#64748b',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    glass: 'rgba(255, 255, 255, 0.8)',
    font: 'Inter'
  },
  coiffeur: {
    primary: '#ec4899',
    secondary: '#db2777',
    accent: '#f472b6',
    background: '#fdf2f8',
    surface: '#ffffff',
    text: '#0f172a',
    textLight: '#64748b',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
    glass: 'rgba(255, 255, 255, 0.8)',
    font: 'Playfair Display'
  },
  restaurant: {
    primary: '#dc2626',
    secondary: '#b91c1c',
    accent: '#ef4444',
    background: '#fef2f2',
    surface: '#ffffff',
    text: '#0f172a',
    textLight: '#64748b',
    gradient: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
    glass: 'rgba(255, 255, 255, 0.8)',
    font: 'Playfair Display'
  },
  garage: {
    primary: '#16a34a',
    secondary: '#15803d',
    accent: '#22c55e',
    background: '#f0fdf4',
    surface: '#ffffff',
    text: '#0f172a',
    textLight: '#64748b',
    gradient: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
    glass: 'rgba(255, 255, 255, 0.8)',
    font: 'Inter'
  },
  nettoyage: {
    primary: '#0891b2',
    secondary: '#0e7490',
    accent: '#06b6d4',
    background: '#ecfeff',
    surface: '#ffffff',
    text: '#0f172a',
    textLight: '#64748b',
    gradient: 'linear-gradient(135deg, #0891b2 0%, #0e7490 100%)',
    glass: 'rgba(255, 255, 255, 0.8)',
    font: 'Inter'
  },
  jardin: {
    primary: '#22c55e',
    secondary: '#16a34a',
    accent: '#4ade80',
    background: '#f0fdf4',
    surface: '#ffffff',
    text: '#0f172a',
    textLight: '#64748b',
    gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
    glass: 'rgba(255, 255, 255, 0.8)',
    font: 'Inter'
  },
  fitness: {
    primary: '#ef4444',
    secondary: '#dc2626',
    accent: '#f87171',
    background: '#fef2f2',
    surface: '#ffffff',
    text: '#0f172a',
    textLight: '#64748b',
    gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    glass: 'rgba(255, 255, 255, 0.8)',
    font: 'Inter'
  },
  medical: {
    primary: '#3b82f6',
    secondary: '#2563eb',
    accent: '#60a5fa',
    background: '#eff6ff',
    surface: '#ffffff',
    text: '#0f172a',
    textLight: '#64748b',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    glass: 'rgba(255, 255, 255, 0.8)',
    font: 'Inter'
  },
  avocat: {
    primary: '#1e40af',
    secondary: '#1e3a8a',
    accent: '#3b82f6',
    background: '#eff6ff',
    surface: '#ffffff',
    text: '#0f172a',
    textLight: '#64748b',
    gradient: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
    glass: 'rgba(255, 255, 255, 0.8)',
    font: 'Libre Baskerville'
  },
  default: {
    primary: '#6366f1',
    secondary: '#4f46e5',
    accent: '#818cf8',
    background: '#f5f3ff',
    surface: '#ffffff',
    text: '#0f172a',
    textLight: '#64748b',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
    glass: 'rgba(255, 255, 255, 0.8)',
    font: 'Inter'
  }
};

// Services détaillés par secteur
const SECTOR_SERVICES = {
  plomberie: [
    { name: 'Dépannage Urgence 24/7', description: 'Intervention rapide sur toutes fuites et pannes d\'urgence', icon: '⚡', features: ['Disponible 7j/7', 'Arrivée sous 1h', 'Sans surprise tarifaire'] },
    { name: 'Installation Sanitaire', description: 'Pose et remplacement de vos appareils sanitaires', icon: '🚿', features: ['Robinetterie premium', 'Éviers design', 'WC modernes', 'Douches à l\'italienne'] },
    { name: 'Chauffage & Climatisation', description: 'Installation, entretien et réparation chauffage', icon: '🌡️', features: ['Chaudières haute performance', 'Pompes à chaleur', 'Climatisation réversible', 'Détartrage professionnel'] },
    { name: 'Détection de Fuites', description: 'Localisation précise sans casse grâce aux technologies avancées', icon: '🔍', features: ['Caméra thermique', 'Gaz traceur', 'Colmatage immédiat', 'Garantie résultat'] },
    { name: 'Rénovation Salle de Bain', description: 'Création et rénovation complète de salle de bain', icon: '🛁', features: ['Design sur mesure', 'Devis gratuit', 'Aide au choix', 'Clé en main'] },
    { name: 'Entretien & Maintenance', description: 'Maintenance préventive pour éviter les pannes', icon: '🔧', features: ['Contrôle annuel', 'Détartrage', 'Mise aux normes', 'Suivi personnalisé'] }
  ],
  electricien: [
    { name: 'Mise aux Normes', description: 'Remise à neuf complète de votre installation électrique', icon: '⚡', features: ['Norme NFC 15-100', 'Tableau électrique neuf', 'Mise à la terre', 'Certification Consuel'] },
    { name: 'Dépannage Électrique', description: 'Intervention rapide sur pannes, court-circuits et disjonctions', icon: '🔌', features: ['Diagnostic complet', 'Réparation durable', 'Intervention 24/7', 'Devis transparent'] },
    { name: 'Installation Domotique', description: 'Maison connectée et automatisée pour votre confort', icon: '🏠', features: ['Volets roulants connectés', 'Éclairage intelligent', 'Thermostats WiFi', 'Contrôle smartphone'] },
    { name: 'Éclairage LED Design', description: 'Solutions d\'éclairage modernes et économiques', icon: '💡', features: ['Spots encastrés', 'Suspensions design', 'Bandes LED', 'Éclairage extérieur'] },
    { name: 'Bornes de Recharge', description: 'Installation de bornes pour véhicules électriques', icon: '🔋', features: ['Wallbox particulier', 'Borne entreprise', 'Certification IRVE', 'Installation certifiée'] },
    { name: 'Tableau Électrique', description: 'Remplacement et mise aux normes de tableaux électriques', icon: '🔌', features: ['Disjoncteurs différentiels', 'Protection sur mesure', 'Câblage propre', 'Garantie décennale'] }
  ],
  coiffeur: [
    { name: 'Coupes & Visagisme', description: 'Coupes sur-mesure adaptées à votre morphologie', icon: '✂️', features: ['Visagisme personnalisé', 'Techniques actuelles', 'Conseil entretien', 'Produits premium'] },
    { name: 'Barbier Traditionnel', description: 'Rasage traditionnel et soins barbe premium', icon: '🪒', features: ['Rasage à l\'ancienne', 'Taille de précision', 'Soins barbe luxe', 'Ambiance masculine'] },
    { name: 'Coloration Expert', description: 'Balayages, ombrés et colorations végétales', icon: '🎨', features: ['Coloration végétale', 'Mèches sur mesure', 'Balayage soleil', 'Protection cheveux'] },
    { name: 'Soins Capillaires', description: 'Traitements réparateurs et soins profonds', icon: '💆', features: ['Botox capillaire', 'Kératine brésilienne', 'Massage crânien', 'Huiles précieuses'] },
    { name: 'Extensions & Volume', description: 'Rajouts de longueur et d\'épaisseur naturels', icon: '💇', features: ['Pose à froid', 'Tape-in invisible', 'Entretien inclus', 'Résultat naturel'] },
    { name: 'Coiffure Événement', description: 'Chignons et coiffures pour occasions spéciales', icon: '👰', features: ['Mariage', 'Sofreh aghd', 'Maquillage combo', 'Essai préalable'] }
  ],
  restaurant: [
    { name: 'Cuisine Gastronomique', description: 'Plats authentiques préparés avec passion', icon: '🍽️', features: ['Produits frais du jour', 'Recettes traditionnelles', 'Cuisine minute', 'Chef expérimenté'] },
    { name: 'Menu du Marché', description: 'Formule déjeuner avec produits de saison', icon: '🥗', features: ['Entrée + Plat + Dessert', 'Produits locaux', 'Prix attractif', 'Rotation hebdo'] },
    { name: 'Spécialités Signature', description: 'Nos plats exclusifs et créations du chef', icon: '⭐', features: ['Recettes uniques', 'Mise en plat soignée', 'Accord mets-vins', 'Expérience unique'] },
    { name: 'Événements & Groupes', description: 'Repas de famille, séminaires et événements', icon: '🎉', features: ['Menu groupe personnalisé', 'Salle privative', 'Service traiteur', 'Animation sur mesure'] },
    { name: 'Service Traiteur', description: 'Livraison à domicile et plats à emporter', icon: '📦', features: ['Plateaux repas', 'Buffets traditionnels', 'Livraison professionnelle', 'Emballage éco'] },
    { name: 'Carte des Vins', description: 'Sélection de vins régionaux et cocktails maison', icon: '🍷', features: ['Vins AOC', 'Cocktails signature', 'Dégustation', 'Conseils sommelier'] }
  ],
  garage: [
    { name: 'Mécanique Générale', description: 'Entretien et réparation toutes marques', icon: '🔧', features: ['Révisions constructeur', 'Courroies distribution', 'Freins complète', 'Diagnostic précis'] },
    { name: 'Diagnostic Électronique', description: 'Analyse électronique multimarque complète', icon: '💻', features: ['Valise diagnostic', 'Effacement défauts', 'Paramétrage ECU', 'Rapport détaillé'] },
    { name: 'Pneumatiques & Géométrie', description: 'Montage, équilibrage et géométrie 3D', icon: '🛞', features: ['Pneus toutes saisons', 'Pneus run-flat', 'Géométrie 3D', 'Stockage hiver'] },
    { name: 'Climatisation', description: 'Recharge, diagnostic et réparation clim', icon: '❄️', features: ['Recharge gaz R134a', 'Détection fuites', 'Filtre habitacle', 'Purification'] },
    { name: 'Carrosserie & Peinture', description: 'Réparation carrosserie et peinture automobile', icon: '🎨', features: ['Débosselage sans peinture', 'Peinture à la nuance', 'Polissage optique', 'Vitrage'] },
    { name: 'Contrôle Technique', description: 'Préparation et accompagnement contrôle technique', icon: '📋', features: ['Pré-contrôle complet', 'Réparations conformité', 'Contre-visite', 'Accompagnement'] }
  ],
  default: [
    { name: 'Consultation Expert', description: 'Analyse approfondie de vos besoins', icon: '📋', features: ['Diagnostic personnalisé', 'Recommandations sur mesure', 'Devis détaillé', 'Suivi dédié'] },
    { name: 'Intervention Pro', description: 'Réalisation soignée et professionnelle', icon: '⚡', features: ['Matériel adapté', 'Techniques actuelles', 'Respect des normes', 'Propreté garantie'] },
    { name: 'Conseil & Accompagnement', description: 'Support et recommandations d\'expert', icon: '💡', features: ['Conseils personnalisés', 'Solutions optimales', 'Formation incluse', 'Support continu'] },
    { name: 'Service Rapide', description: 'Réactivité et respect des délais', icon: '🚀', features: ['Intervention express', 'Horaires flexibles', 'Urgences traitées', 'Respect planning'] },
    { name: 'Garantie Qualité', description: 'Engagement résultat et satisfaction', icon: '✅', features: ['Contrôle qualité strict', 'Corrections incluses', 'SAV réactif', 'Garantie satisfaction'] },
    { name: 'Tarifs Transparents', description: 'Honoraires clairs et justifiés', icon: '💰', features: ['Devis gratuit', 'Pas de surprise', 'Facilités paiement', 'Facture détaillée'] }
  ]
};

// Témoignages premium par secteur
const SECTOR_TESTIMONIALS = {
  plomberie: [
    { author: 'Marc D.', text: 'Intervention à 23h pour une fuite majeure. Arrivé en 45 minutes, problème résolu proprement. Tarifs très corrects pour un dépannage d\'urgence.', rating: 5, date: 'Il y a 1 semaine' },
    { author: 'Sophie L.', text: 'Rénovation complète de notre salle de bain. Travail impeccable, respect des délais et budget tenu. Je recommande vivement ce plombier.', rating: 5, date: 'Il y a 2 semaines' },
    { author: 'Pierre M.', text: 'Installation d\'une pompe à chaleur. Conseils avisés sur le choix du matériel, installation soignée et économies sur ma facture dès le premier mois.', rating: 5, date: 'Il y a 3 semaines' }
  ],
  electricien: [
    { author: 'Valérie R.', text: 'Mise aux normes complète de notre maison ancienne. Travail propre, explications claires et certification Consuel obtenue sans souci.', rating: 5, date: 'Il y a 1 semaine' },
    { author: 'Jean-Baptiste K.', text: 'Installation de ma borne de recharge voiture électrique. Professionnel, rapide et à un prix compétitif. Très satisfait du résultat.', rating: 5, date: 'Il y a 2 semaines' },
    { author: 'Claire D.', text: 'Domotique installée dans toute la maison. Éclairage automatique, volets roulants connectés... Un vrai confort au quotidien !', rating: 5, date: 'Il y a 3 semaines' }
  ],
  coiffeur: [
    { author: 'Camille S.', text: 'Enfin un coiffeur qui comprend ce que je veux ! Visagisme parfait, coupe exactement comme je l\'imaginais. Je ne changerai plus de salon.', rating: 5, date: 'Il y a 1 semaine' },
    { author: 'Thomas L.', text: 'Rasage traditionnel exceptionnel. Serviette chaude, mousse de qualité, massage... Un vrai moment de détente masculine.', rating: 5, date: 'Il y a 2 semaines' },
    { author: 'Marie-Hélène P.', text: 'Balayage sublime ! Des reflets naturels et une brillance incroyable. Mes cheveux n\'ont jamais été aussi beaux.', rating: 5, date: 'Il y a 3 semaines' }
  ],
  restaurant: [
    { author: 'Antoine G.', text: 'Menu dégustation d\'exception. Chaque plat était une découverte, les accords mets-vins parfaits. Un restaurant qui mérite ses étoiles.', rating: 5, date: 'Il y a 1 semaine' },
    { author: 'Isabelle M.', text: 'Service traiteur pour notre mariage. 120 convives, tous ravis. Cuisine raffinée, service impeccable et prix très raisonnable.', rating: 5, date: 'Il y a 2 semaines' },
    { author: 'Philippe D.', text: 'Brunch du dimanche formidable. Produits frais, portions généreuses et ambiance conviviale. Notre nouveau rendez-vous familial.', rating: 5, date: 'Il y a 3 semaines' }
  ],
  garage: [
    { author: 'Stéphane B.', text: 'Diagnostic moteur complexe résolu en 2 jours. Mécanicien compétent qui explique clairement les réparations nécessaires. Prix honnête.', rating: 5, date: 'Il y a 1 semaine' },
    { author: 'Nathalie F.', text: '4 pneus changés et géométrie faite. Prix imbattable, service rapide et personnel accueillant. Je recommande ce garage à 100%.', rating: 5, date: 'Il y a 2 semaines' },
    { author: 'Michel R.', text: 'Carrosserie réparée après un accrochage. On ne voit plus la rayure, peinture parfaite. Véhicule rendu dans les délais annoncés.', rating: 5, date: 'Il y a 3 semaines' }
  ],
  default: [
    { author: 'Emma L.', text: 'Service exceptionnel du début à la fin. Professionnalisme, expertise et gentillesse. Une expérience tout simplement majestueuse.', rating: 5, date: 'Il y a 1 semaine' },
    { author: 'Lucas D.', text: 'Intervention rapide et efficace. Problème résolu rapidement avec des solutions durables. Je recommande vivement.', rating: 5, date: 'Il y a 2 semaines' },
    { author: 'Sophie M.', text: 'Qualité du travail irréprochable. Respect des délais et du budget. Une entreprise sérieuse et fiable.', rating: 5, date: 'Il y a 3 semaines' }
  ]
};

function getPremiumPalette(sector: string) {
  const normalizedSector = (sector || '').toLowerCase();
  
  if (normalizedSector.includes('plomb') || normalizedSector.includes('plomberie') || normalizedSector.includes('plombier')) return SECTOR_PREMIUM_PALETTES.plomberie;
  if (normalizedSector.includes('électricien') || normalizedSector.includes('electricien') || normalizedSector.includes('electric')) return SECTOR_PREMIUM_PALETTES.electricien;
  if (normalizedSector.includes('coiff') || normalizedSector.includes('barb') || normalizedSector.includes('salon')) return SECTOR_PREMIUM_PALETTES.coiffeur;
  if (normalizedSector.includes('restaurant') || normalizedSector.includes('cuisin') || normalizedSector.includes('traiteur')) return SECTOR_PREMIUM_PALETTES.restaurant;
  if (normalizedSector.includes('garage') || normalizedSector.includes('mécan') || normalizedSector.includes('auto')) return SECTOR_PREMIUM_PALETTES.garage;
  if (normalizedSector.includes('nettoy') || normalizedSector.includes('propreté') || normalizedSector.includes('ménage')) return SECTOR_PREMIUM_PALETTES.nettoyage;
  if (normalizedSector.includes('jardin') || normalizedSector.includes('paysag')) return SECTOR_PREMIUM_PALETTES.jardin;
  if (normalizedSector.includes('fitness') || normalizedSector.includes('sport') || normalizedSector.includes('coach')) return SECTOR_PREMIUM_PALETTES.fitness;
  if (normalizedSector.includes('médec') || normalizedSector.includes('clinique') || normalizedSector.includes('santé')) return SECTOR_PREMIUM_PALETTES.medical;
  if (normalizedSector.includes('avocat') || normalizedSector.includes('juridi') || normalizedSector.includes('droit')) return SECTOR_PREMIUM_PALETTES.avocat;
  
  return SECTOR_PREMIUM_PALETTES.default;
}

function getSectorServices(sector: string) {
  const normalizedSector = (sector || '').toLowerCase();
  
  if (normalizedSector.includes('plomb') || normalizedSector.includes('plomberie')) return SECTOR_SERVICES.plomberie;
  if (normalizedSector.includes('électricien') || normalizedSector.includes('electric')) return SECTOR_SERVICES.electricien;
  if (normalizedSector.includes('coiff') || normalizedSector.includes('barb')) return SECTOR_SERVICES.coiffeur;
  if (normalizedSector.includes('restaurant') || normalizedSector.includes('cuisin')) return SECTOR_SERVICES.restaurant;
  if (normalizedSector.includes('garage') || normalizedSector.includes('mécan') || normalizedSector.includes('auto')) return SECTOR_SERVICES.garage;
  
  return SECTOR_SERVICES.default;
}

function getSectorTestimonials(sector: string) {
  const normalizedSector = (sector || '').toLowerCase();
  
  if (normalizedSector.includes('plomb') || normalizedSector.includes('plomberie')) return SECTOR_TESTIMONIALS.plomberie;
  if (normalizedSector.includes('électricien') || normalizedSector.includes('electric')) return SECTOR_TESTIMONIALS.electricien;
  if (normalizedSector.includes('coiff') || normalizedSector.includes('barb')) return SECTOR_TESTIMONIALS.coiffeur;
  if (normalizedSector.includes('restaurant') || normalizedSector.includes('cuisin')) return SECTOR_TESTIMONIALS.restaurant;
  if (normalizedSector.includes('garage') || normalizedSector.includes('mécan') || normalizedSector.includes('auto')) return SECTOR_TESTIMONIALS.garage;
  
  return SECTOR_TESTIMONIALS.default;
}

export async function generatePremiumSite(lead: any): Promise<string> {
  const palette = getPremiumPalette(lead.sector);
  const services = getSectorServices(lead.sector);
  const testimonials = getSectorTestimonials(lead.sector);
  
  // Images Pexels haute qualité
  const sectorImages = getSectorImages(lead.sector);
  const heroImage = sectorImages[0] || 'https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?auto=compress&cs=tinysrgb&w=1920';
  const allImages = sectorImages.length > 0 ? sectorImages : [heroImage];
  
  // Contenu optimisé
  const companyName = lead.name || 'Entreprise';
  const city = lead.city || '';
  const sector = lead.sector || 'Professionnel';
  
  const content: PremiumContent = {
    companyName,
    sector,
    city,
    description: lead.description || `Expert ${sector} de confiance${city ? ' à ' + city : ''}. Plus de 15 ans d'expérience dans le secteur.`,
    phone: lead.phone,
    email: lead.email,
    address: lead.address,
    website: lead.website,
    rating: lead.googleRating,
    reviews: lead.googleReviews,
    services,
    testimonials: lead.googleReviewsData && lead.googleReviewsData.length > 0 
      ? lead.googleReviewsData.slice(0, 3).map((r: any) => ({
          author: r.author || 'Client satisfait',
          text: r.text || 'Excellent service !',
          rating: r.rating || 5,
          date: r.date || 'Récemment'
        }))
      : testimonials,
    heroTitle: companyName,
    heroSubtitle: lead.description || `Votre expert ${sector} pour des services d'excellence${city ? ' à ' + city : ''}`,
    aboutText: lead.description || `Forts de plus de 15 ans d'expérience dans le domaine ${sector}, nous nous engageons à fournir des services de qualité supérieure. Notre équipe de professionnels qualifiés met tout en œuvre pour répondre à vos attentes et dépasser vos espérances.`,
    ctaText: 'Contactez-nous',
    slogan: `L'excellence ${sector} à votre service`,
    heroImage,
    allImages
  };
  
  return buildPremiumHTML(content, palette);
}

function buildPremiumHTML(content: PremiumContent, palette: any): string {
  const { companyName, heroTitle, heroSubtitle, aboutText, services, testimonials, phone, email, address, rating, reviews } = content;
  
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${companyName} - ${content.sector}${content.city ? ' à ' + content.city : ''}</title>
    <meta name="description" content="${heroSubtitle}">
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=${palette.font === 'Playfair Display' ? 'Playfair+Display:wght@400;500;600;700&' : ''}${palette.font === 'Libre Baskerville' ? 'Libre+Baskerville:wght@400;700&' : ''}Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    <style>
        :root {
            --primary: ${palette.primary};
            --secondary: ${palette.secondary};
            --accent: ${palette.accent};
            --background: ${palette.background};
            --surface: ${palette.surface};
            --text: ${palette.text};
            --text-light: ${palette.textLight};
            --gradient: ${palette.gradient};
            --glass: ${palette.glass};
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
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: var(--text);
            background: var(--background);
            overflow-x: hidden;
        }
        
        /* Navigation Premium */
        .navbar {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            background: var(--glass);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
            transition: all 0.3s ease;
        }
        
        .navbar.scrolled {
            background: rgba(255, 255, 255, 0.95);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        }
        
        .nav-container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            font-family: '${palette.font}', serif;
            font-size: 1.8rem;
            font-weight: 700;
            color: var(--primary);
            text-decoration: none;
            letter-spacing: -0.02em;
            transition: all 0.3s ease;
        }
        
        .logo:hover {
            transform: scale(1.02);
        }
        
        .nav-links {
            display: flex;
            gap: 2.5rem;
            list-style: none;
        }
        
        .nav-link {
            color: var(--text);
            text-decoration: none;
            font-weight: 500;
            font-size: 0.95rem;
            position: relative;
            transition: color 0.3s ease;
        }
        
        .nav-link::after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 0;
            height: 2px;
            background: var(--primary);
            transition: width 0.3s ease;
        }
        
        .nav-link:hover {
            color: var(--primary);
        }
        
        .nav-link:hover::after {
            width: 100%;
        }
        
        .nav-cta {
            background: var(--gradient);
            color: white;
            padding: 0.75rem 1.75rem;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            font-size: 0.9rem;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        
        .nav-cta:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }
        
        /* Hero Section Premium */
        .hero {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            background: linear-gradient(135deg, var(--background) 0%, var(--surface) 100%);
            overflow: hidden;
            padding: 8rem 2rem 4rem;
        }
        
        .hero::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -20%;
            width: 800px;
            height: 800px;
            background: var(--gradient);
            border-radius: 50%;
            opacity: 0.08;
            filter: blur(100px);
            animation: float 20s ease-in-out infinite;
        }
        
        .hero::after {
            content: '';
            position: absolute;
            bottom: -30%;
            left: -10%;
            width: 600px;
            height: 600px;
            background: var(--accent);
            border-radius: 50%;
            opacity: 0.06;
            filter: blur(80px);
            animation: float 15s ease-in-out infinite reverse;
        }
        
        @keyframes float {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            50% { transform: translate(30px, -30px) rotate(180deg); }
        }
        
        .hero-content {
            max-width: 900px;
            text-align: center;
            position: relative;
            z-index: 1;
        }
        
        .hero-badge {
            display: inline-block;
            background: var(--glass);
            backdrop-filter: blur(10px);
            padding: 0.5rem 1.5rem;
            border-radius: 50px;
            font-size: 0.85rem;
            font-weight: 600;
            color: var(--primary);
            margin-bottom: 2rem;
            border: 1px solid rgba(0, 0, 0, 0.05);
            animation: fadeInUp 0.8s ease;
        }
        
        .hero h1 {
            font-family: '${palette.font}', serif;
            font-size: clamp(3rem, 7vw, 5rem);
            font-weight: 800;
            line-height: 1.1;
            margin-bottom: 1.5rem;
            letter-spacing: -0.03em;
            background: var(--gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: fadeInUp 0.8s ease 0.2s both;
        }
        
        .hero p {
            font-size: 1.35rem;
            font-weight: 400;
            line-height: 1.7;
            margin-bottom: 2.5rem;
            color: var(--text-light);
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
            animation: fadeInUp 0.8s ease 0.4s both;
        }
        
        .hero-rating {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            margin-bottom: 2.5rem;
            animation: fadeInUp 0.8s ease 0.5s both;
        }
        
        .hero-rating .stars {
            color: #fbbf24;
            font-size: 1.2rem;
        }
        
        .hero-rating .rating-text {
            font-weight: 600;
            color: var(--text);
        }
        
        .hero-rating .reviews {
            color: var(--text-light);
            font-size: 0.9rem;
        }
        
        .hero-cta {
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            background: var(--gradient);
            color: white;
            padding: 1.25rem 2.5rem;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            font-size: 1rem;
            transition: all 0.3s ease;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
            animation: fadeInUp 0.8s ease 0.6s both;
        }
        
        .hero-cta:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
        }
        
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
        
        /* Services Section */
        .services {
            padding: 8rem 2rem;
            background: var(--surface);
            position: relative;
        }
        
        .section-header {
            text-align: center;
            max-width: 800px;
            margin: 0 auto 5rem;
        }
        
        .section-badge {
            display: inline-block;
            background: var(--background);
            color: var(--primary);
            padding: 0.5rem 1.25rem;
            border-radius: 50px;
            font-size: 0.85rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
        }
        
        .section-header h2 {
            font-family: '${palette.font}', serif;
            font-size: clamp(2.5rem, 5vw, 3.5rem);
            font-weight: 700;
            margin-bottom: 1.5rem;
            letter-spacing: -0.02em;
            color: var(--text);
        }
        
        .section-header p {
            font-size: 1.15rem;
            color: var(--text-light);
            line-height: 1.7;
        }
        
        .services-grid {
            max-width: 1400px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
            gap: 2rem;
        }
        
        .service-card {
            background: var(--surface);
            border: 1px solid rgba(0, 0, 0, 0.05);
            border-radius: 24px;
            padding: 2.5rem;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
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
            background: var(--gradient);
            transform: scaleX(0);
            transition: transform 0.4s ease;
        }
        
        .service-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
            border-color: rgba(0, 0, 0, 0.1);
        }
        
        .service-card:hover::before {
            transform: scaleX(1);
        }
        
        .service-icon {
            width: 60px;
            height: 60px;
            background: var(--background);
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.8rem;
            margin-bottom: 1.5rem;
            transition: all 0.3s ease;
        }
        
        .service-card:hover .service-icon {
            background: var(--gradient);
            transform: scale(1.1);
        }
        
        .service-card h3 {
            font-size: 1.4rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: var(--text);
        }
        
        .service-card p {
            color: var(--text-light);
            line-height: 1.7;
            margin-bottom: 1.5rem;
        }
        
        .service-features {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        
        .service-feature {
            background: var(--background);
            padding: 0.4rem 0.8rem;
            border-radius: 8px;
            font-size: 0.8rem;
            font-weight: 500;
            color: var(--text);
        }
        
        /* About Section */
        .about {
            padding: 8rem 2rem;
            background: var(--background);
        }
        
        .about-content {
            max-width: 1000px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: center;
        }
        
        .about-text h2 {
            font-family: '${palette.font}', serif;
            font-size: clamp(2rem, 4vw, 2.8rem);
            font-weight: 700;
            margin-bottom: 1.5rem;
            letter-spacing: -0.02em;
            color: var(--text);
        }
        
        .about-text p {
            font-size: 1.1rem;
            line-height: 1.8;
            color: var(--text-light);
            margin-bottom: 1.5rem;
        }
        
        .about-stats {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
        }
        
        .stat-card {
            background: var(--surface);
            padding: 2rem;
            border-radius: 16px;
            text-align: center;
            border: 1px solid rgba(0, 0, 0, 0.05);
        }
        
        .stat-number {
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--primary);
            margin-bottom: 0.5rem;
        }
        
        .stat-label {
            font-size: 0.9rem;
            color: var(--text-light);
            font-weight: 500;
        }
        
        /* Testimonials Section */
        .testimonials {
            padding: 8rem 2rem;
            background: var(--surface);
        }
        
        .testimonials-grid {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
        }
        
        .testimonial-card {
            background: var(--background);
            padding: 2.5rem;
            border-radius: 20px;
            border: 1px solid rgba(0, 0, 0, 0.05);
            transition: all 0.3s ease;
        }
        
        .testimonial-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
        }
        
        .testimonial-stars {
            color: #fbbf24;
            font-size: 1.2rem;
            margin-bottom: 1rem;
        }
        
        .testimonial-text {
            font-size: 1.05rem;
            line-height: 1.7;
            color: var(--text);
            margin-bottom: 1.5rem;
            font-style: italic;
        }
        
        .testimonial-author {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .author-avatar {
            width: 50px;
            height: 50px;
            background: var(--gradient);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 700;
            font-size: 1.2rem;
        }
        
        .author-info h4 {
            font-weight: 600;
            color: var(--text);
            margin-bottom: 0.25rem;
        }
        
        .author-info span {
            font-size: 0.85rem;
            color: var(--text-light);
        }
        
        /* Contact Section */
        .contact {
            padding: 8rem 2rem;
            background: var(--gradient);
            color: white;
            text-align: center;
        }
        
        .contact-content {
            max-width: 800px;
            margin: 0 auto;
        }
        
        .contact h2 {
            font-family: '${palette.font}', serif;
            font-size: clamp(2.5rem, 5vw, 3.5rem);
            font-weight: 700;
            margin-bottom: 1.5rem;
            letter-spacing: -0.02em;
        }
        
        .contact p {
            font-size: 1.2rem;
            opacity: 0.9;
            margin-bottom: 3rem;
        }
        
        .contact-info {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-bottom: 3rem;
        }
        
        .contact-item {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            padding: 2rem;
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: all 0.3s ease;
        }
        
        .contact-item:hover {
            background: rgba(255, 255, 255, 0.15);
            transform: translateY(-4px);
        }
        
        .contact-item-icon {
            font-size: 2rem;
            margin-bottom: 1rem;
        }
        
        .contact-item h3 {
            font-weight: 600;
            margin-bottom: 0.5rem;
        }
        
        .contact-item a {
            color: white;
            text-decoration: none;
            font-size: 1.1rem;
            transition: opacity 0.3s ease;
        }
        
        .contact-item a:hover {
            opacity: 0.8;
        }
        
        .contact-cta {
            display: inline-block;
            background: white;
            color: var(--primary);
            padding: 1.25rem 3rem;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 700;
            font-size: 1.1rem;
            transition: all 0.3s ease;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
        }
        
        .contact-cta:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
        }
        
        /* Footer */
        .footer {
            background: var(--text);
            color: white;
            padding: 4rem 2rem 2rem;
        }
        
        .footer-content {
            max-width: 1400px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 3rem;
            margin-bottom: 3rem;
        }
        
        .footer-section h3 {
            font-family: '${palette.font}', serif;
            font-size: 1.3rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
        }
        
        .footer-section p {
            opacity: 0.7;
            line-height: 1.7;
            margin-bottom: 1rem;
        }
        
        .footer-section a {
            color: white;
            text-decoration: none;
            opacity: 0.7;
            transition: opacity 0.3s ease;
            display: block;
            margin-bottom: 0.75rem;
        }
        
        .footer-section a:hover {
            opacity: 1;
        }
        
        .footer-bottom {
            max-width: 1400px;
            margin: 0 auto;
            padding-top: 2rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            text-align: center;
            opacity: 0.6;
            font-size: 0.9rem;
        }
        
        /* Mobile Menu */
        .mobile-menu-toggle {
            display: none;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0.5rem;
            flex-direction: column;
            gap: 5px;
        }
        
        .mobile-menu-toggle span {
            display: block;
            width: 25px;
            height: 2px;
            background: var(--text);
            transition: all 0.3s ease;
        }
        
        /* Responsive */
        @media (max-width: 1024px) {
            .about-content {
                grid-template-columns: 1fr;
                gap: 3rem;
            }
            
            .services-grid {
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            }
        }
        
        @media (max-width: 768px) {
            .nav-links, .nav-cta {
                display: none;
            }
            
            .mobile-menu-toggle {
                display: flex;
            }
            
            .nav-links.active {
                display: flex;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                flex-direction: column;
                padding: 2rem;
                gap: 1.5rem;
                border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            }
            
            .hero {
                padding: 6rem 1.5rem 3rem;
            }
            
            .hero h1 {
                font-size: clamp(2.5rem, 8vw, 3.5rem);
            }
            
            .services, .about, .testimonials, .contact {
                padding: 5rem 1.5rem;
            }
            
            .services-grid {
                grid-template-columns: 1fr;
            }
            
            .about-stats {
                grid-template-columns: 1fr;
            }
            
            .contact-info {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar" id="navbar">
        <div class="nav-container">
            <a href="#home" class="logo">${companyName}</a>
            <button class="mobile-menu-toggle" onclick="toggleMobileMenu()">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <ul class="nav-links" id="navLinks">
                <li><a href="#home" class="nav-link">Accueil</a></li>
                <li><a href="#services" class="nav-link">Services</a></li>
                <li><a href="#about" class="nav-link">À propos</a></li>
                <li><a href="#testimonials" class="nav-link">Avis</a></li>
                <li><a href="#contact" class="nav-link">Contact</a></li>
            </ul>
            <a href="#contact" class="nav-cta">Contactez-nous</a>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero" id="home">
        <div class="hero-content">
            <div class="hero-badge">✨ ${content.slogan}</div>
            <h1>${heroTitle}</h1>
            <p>${heroSubtitle}</p>
            ${rating && rating > 0 ? `
            <div class="hero-rating">
                <span class="stars">${'★'.repeat(Math.floor(rating))}${rating % 1 >= 0.5 ? '½' : ''}</span>
                <span class="rating-text">${rating}/5</span>
                <span class="reviews">(${reviews || 0} avis)</span>
            </div>
            ` : ''}
            <a href="#contact" class="hero-cta">
                ${content.ctaText}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
            </a>
        </div>
    </section>

    <!-- Services Section -->
    <section class="services" id="services">
        <div class="section-header">
            <div class="section-badge">Nos Services</div>
            <h2>Des solutions professionnelles</h2>
            <p>Nous proposons une gamme complète de services adaptés à vos besoins spécifiques</p>
        </div>
        <div class="services-grid">
            ${services.map(service => `
            <div class="service-card">
                <div class="service-icon">${service.icon}</div>
                <h3>${service.name}</h3>
                <p>${service.description}</p>
                <div class="service-features">
                    ${service.features.map(feature => `<span class="service-feature">${feature}</span>`).join('')}
                </div>
            </div>
            `).join('')}
        </div>
    </section>

    <!-- About Section -->
    <section class="about" id="about">
        <div class="about-content">
            <div class="about-text">
                <div class="section-badge">À propos</div>
                <h2>L'excellence depuis 15 ans</h2>
                <p>${aboutText}</p>
                <p>Notre engagement : vous fournir un service de qualité supérieure, dans le respect des délais et avec une transparence totale sur nos tarifs.</p>
            </div>
            <div class="about-stats">
                <div class="stat-card">
                    <div class="stat-number">15+</div>
                    <div class="stat-label">Années d'expérience</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">500+</div>
                    <div class="stat-label">Clients satisfaits</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">24/7</div>
                    <div class="stat-label">Disponibilité</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">100%</div>
                    <div class="stat-label">Satisfaction</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials" id="testimonials">
        <div class="section-header">
            <div class="section-badge">Témoignages</div>
            <h2>Ce que disent nos clients</h2>
            <p>L'avis de nos clients est notre meilleure carte de visite</p>
        </div>
        <div class="testimonials-grid">
            ${testimonials.map(testimonial => `
            <div class="testimonial-card">
                <div class="testimonial-stars">${'★'.repeat(testimonial.rating)}</div>
                <p class="testimonial-text">"${testimonial.text}"</p>
                <div class="testimonial-author">
                    <div class="author-avatar">${testimonial.author.charAt(0).toUpperCase()}</div>
                    <div class="author-info">
                        <h4>${testimonial.author}</h4>
                        <span>${testimonial.date || 'Client satisfait'}</span>
                    </div>
                </div>
            </div>
            `).join('')}
        </div>
    </section>

    <!-- Contact Section -->
    <section class="contact" id="contact">
        <div class="contact-content">
            <h2>Contactez-nous</h2>
            <p>Une question ? Un projet ? N'hésitez pas à nous contacter</p>
            <div class="contact-info">
                ${phone ? `
                <div class="contact-item">
                    <div class="contact-item-icon">📞</div>
                    <h3>Téléphone</h3>
                    <a href="tel:${phone}">${phone}</a>
                </div>
                ` : ''}
                ${email ? `
                <div class="contact-item">
                    <div class="contact-item-icon">✉️</div>
                    <h3>Email</h3>
                    <a href="mailto:${email}">${email}</a>
                </div>
                ` : ''}
                ${address ? `
                <div class="contact-item">
                    <div class="contact-item-icon">📍</div>
                    <h3>Adresse</h3>
                    <p>${address}</p>
                </div>
                ` : ''}
            </div>
            ${phone ? `<a href="tel:${phone}" class="contact-cta">Appeler maintenant</a>` : ''}
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-section">
                <h3>${companyName}</h3>
                <p>${content.sector} professionnel à votre service${content.city ? ' à ' + content.city : ''}.</p>
            </div>
            <div class="footer-section">
                <h3>Services</h3>
                ${services.slice(0, 4).map(service => `<a href="#services">${service.name}</a>`).join('')}
            </div>
            <div class="footer-section">
                <h3>Contact</h3>
                ${phone ? `<a href="tel:${phone}">${phone}</a>` : ''}
                ${email ? `<a href="mailto:${email}">${email}</a>` : ''}
                ${address ? `<p>${address}</p>` : ''}
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2024 ${companyName}. Tous droits réservés.</p>
        </div>
    </footer>

    <script>
        // Mobile menu toggle
        function toggleMobileMenu() {
            const navLinks = document.getElementById('navLinks');
            navLinks.classList.toggle('active');
        }

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
                document.getElementById('navLinks').classList.remove('active');
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.pageYOffset > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
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
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.addEventListener('DOMContentLoaded', function() {
            document.querySelectorAll('.service-card, .testimonial-card, .stat-card, .contact-item').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });
        });
    </script>
</body>
</html>`;
}
