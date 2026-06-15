// ── TEMPLATE EXACT - COPIE DU SITE EXEMPLE ──
// Design exactement comme https://019ecbc0-d057-72f4-b6ff-4be008c6072a.arena.site/

interface ExactContent {
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
  services: Array<{ icon: string; title: string; desc: string }>;
  testimonials: Array<{ name: string; role: string; text: string; stars: number; img: string }>;
  gallery: Array<{ url: string; label: string }>;
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  heroImage: string;
}

// Services par secteur
const SECTOR_SERVICES_EXACT = {
  plomberie: [
    { icon: '⏰', title: "Dépannage d'Urgence", desc: "Fuite, canalisation bouchée, coupure d'eau — nous intervenons en urgence dans les plus brefs délais." },
    { icon: '🏠', title: "Installation Sanitaire", desc: "Installation complète de salle de bain, douche, WC, lavabo et équipements sanitaires avec finitions impeccables." },
    { icon: '🔧', title: "Réparation & Rénovation", desc: "Remplacement de robinetterie, réparation de canalisations, rénovation complète de plomberie ancienne." },
    { icon: '🔍', title: "Détection de Fuites", desc: "Diagnostic précis par inspection caméra et détection acoustique pour localiser et réparer les fuites invisibles." },
    { icon: '🌀', title: "Débouchage Canalisations", desc: "Débouchage professionnel par hydrocurage haute pression, furet motorisé pour WC, évier, douche et égouts." },
    { icon: '🛡️', title: "Entretien & Maintenance", desc: "Contrats d'entretien préventif, vérification annuelle de l'installation, garantie longue durée sur tous nos travaux." }
  ],
  electricien: [
    { icon: '⚡', title: "Dépannage Électrique", desc: "Intervention rapide sur pannes, court-circuits et disjonctions. Disponible 24h/24." },
    { icon: '🏠', title: "Installation Domotique", desc: "Maison intelligente connectée et automatisée pour votre confort et sécurité." },
    { icon: '💡', title: "Éclairage LED Design", desc: "Solutions d'éclairage modernes et économiques pour intérieur et extérieur." },
    { icon: '🔋', title: "Bornes de Recharge", desc: "Installation de bornes pour véhicules électriques certifiées IRVE." },
    { icon: '☀️', title: "Panneaux Solaires", desc: "Installation photovoltaïque pour autoconsommation avec certification RGE." },
    { icon: '🔌', title: "Mise aux Normes", desc: "Conformité complète aux normes électriques NFC 15-100 avec certification Consuel." }
  ],
  coiffeur: [
    { icon: '✂️', title: "Visagisme Personnalisé", desc: "Analyse morphologique pour coupe parfaite adaptée à votre visage." },
    { icon: '🎨', title: "Coloration Artistique", desc: "Techniques avancées de coloration créative : balayage, ombré, coloration végétale." },
    { icon: '💆', title: "Soins Capillaires Luxe", desc: "Traitements profonds et régénérants : kératine, botox capillaire, huiles précieuses." },
    { icon: '💇', title: "Extensions Naturelles", desc: "Rajouts de longueur indétectables avec cheveux naturels de qualité." },
    { icon: '👰', title: "Coiffure Événement", desc: "Créations sophistiquées pour mariages, soirées et occasions spéciales." },
    { icon: '🪒', title: "Barbier Premium", desc: "Rasage traditionnel et soins barbe haut de gamme avec serviette chaude." }
  ],
  restaurant: [
    { icon: '🍽️', title: "Cuisine Gastronomique", desc: "Plats d'exception créés par notre chef avec produits frais du marché." },
    { icon: '⭐', title: "Menu Dégustation", desc: "Expérience culinaire complète en plusieurs services avec accord mets-vins." },
    { icon: '🎉', title: "Service Traiteur", desc: "Restauration d'excellence pour vos événements et réceptions." },
    { icon: '🍷', title: "Cave à Vins", desc: "Sélection exceptionnelle de vins rares avec dégustation privée." },
    { icon: '🥗', title: "Brunch Gourmand", desc: "Brunch dominical avec produits du marché et musique live." },
    { icon: '🌸', title: "Cuisine Saisons", desc: "Menu qui change avec les saisons avec produits locaux et durables." }
  ],
  default: [
    { icon: '📋', title: "Consultation Expert", desc: "Analyse approfondie et recommandations personnalisées pour votre projet." },
    { icon: '⚡', title: "Intervention Premium", desc: "Service haut de gamme avec matériel professionnel et techniques avancées." },
    { icon: '💡', title: "Accompagnement Complet", desc: "Support personnalisé de A à Z pour la réussite de votre projet." },
    { icon: '🚀', title: "Service Express", desc: "Intervention rapide sans compromis sur la qualité et les résultats." },
    { icon: '👑', title: "Pack Premium", desc: "Solution tout-en-un avec avantages exclusifs et service VIP." },
    { icon: '🔧', title: "Maintenance Pro", desc: "Entretien régulier pour performance optimale et longévité." }
  ]
};

// Témoignages par secteur
const SECTOR_TESTIMONIALS_EXACT = {
  plomberie: [
    { name: "Marie Leclerc", role: "Résidente Paris 11", text: "Intervention rapide suite à une fuite importante. Arrivé en moins d'une heure, professionnel, soigné et prix honnête.", stars: 5, img: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=80&w=80" },
    { name: "Thomas Girard", role: "Propriétaire Paris 11", text: "Rénovation complète de salle de bain réalisée avec soin. Travail impeccable, respect des délais et communication excellente.", stars: 5, img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=80&w=80" },
    { name: "Sophie Martin", role: "Locataire Paris 12", text: "Débouchage urgent réalisé un dimanche. Très professionnel, propre et efficace. Le problème n'est pas revenu.", stars: 5, img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=80&w=80" }
  ],
  electricien: [
    { name: "Jean Dupont", role: "Propriétaire", text: "Installation domotique complète réalisée avec professionnalisme. Très satisfait du résultat.", stars: 5, img: "https://images.pexels.com/photos/5386754/pexels-photo-5386754.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=80&w=80" },
    { name: "Claire Martin", role: "Gérante", text: "Panneaux solaires installés avec certification RGE. Économies dès le premier mois.", stars: 5, img: "https://images.pexels.com/photos/5439367/pexels-photo-5439367.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=80&w=80" },
    { name: "Pierre Leroy", role: "Particulier", text: "Dépannage électrique en urgence le dimanche. Intervention rapide et efficace.", stars: 5, img: "https://images.pexels.com/photos/5452296/pexels-photo-5452296.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=80&w=80" }
  ],
  coiffeur: [
    { name: "Isabelle Fontaine", role: "Cliente fidèle", text: "Visagisme parfait ! Coupe exactement comme je l'imaginais. Je recommande vivement.", stars: 5, img: "https://images.pexels.com/photos/3756678/pexels-photo-3756678.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=80&w=80" },
    { name: "Thomas Laurent", role: "Client", text: "Coloration exceptionnelle. Reflets naturels et brillance incroyable.", stars: 5, img: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=80&w=80" },
    { name: "Camille Rousseau", role: "Cliente", text: "Soins kératine parfaits. Mes cheveux n'ont jamais été aussi beaux.", stars: 5, img: "https://images.pexels.com/photos/3756680/pexels-photo-3756680.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=80&w=80" }
  ],
  restaurant: [
    { name: "Antoine Beaumont", role: "Client régulier", text: "Menu dégustation exceptionnel. Chaque plat était une découverte.", stars: 5, img: "https://images.pexels.com/photos/5386754/pexels-photo-5386754.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=80&w=80" },
    { name: "Sophie Valois", role: "Cliente", text: "Service traiteur pour notre mariage. 120 convives ravis.", stars: 5, img: "https://images.pexels.com/photos/5439367/pexels-photo-5439367.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=80&w=80" },
    { name: "Lucas Garnier", role: "Client", text: "Brunch dominical formidable. Produits frais et ambiance conviviale.", stars: 5, img: "https://images.pexels.com/photos/5452296/pexels-photo-5452296.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=80&w=80" }
  ],
  default: [
    { name: "Emma L.", role: "Cliente satisfaite", text: "Service exceptionnel du début à la fin. Professionnalisme remarquable.", stars: 5, img: "https://images.pexels.com/photos/5386754/pexels-photo-5386754.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=80&w=80" },
    { name: "Lucas D.", role: "Client ravi", text: "Intervention rapide et efficace. Problème résolu avec des solutions durables.", stars: 5, img: "https://images.pexels.com/photos/5439367/pexels-photo-5439367.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=80&w=80" },
    { name: "Sophie M.", role: "Cliente fidèle", text: "Qualité du travail irréprochable. Respect des délais et du budget.", stars: 5, img: "https://images.pexels.com/photos/5452296/pexels-photo-5452296.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=80&w=80" }
  ]
};

// Galerie par secteur
const SECTOR_GALLERY_EXACT = {
  plomberie: [
    { url: "https://images.pexels.com/photos/6419128/pexels-photo-6419128.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700", label: "Installation tuyauterie" },
    { url: "https://images.pexels.com/photos/6238612/pexels-photo-6238612.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700", label: "Salle de bain rénovée" },
    { url: "https://images.pexels.com/photos/29226620/pexels-photo-29226620.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700", label: "Raccordement radiateur" },
    { url: "https://images.pexels.com/photos/12196323/pexels-photo-12196323.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700", label: "Robinetterie haut de gamme" },
    { url: "https://images.pexels.com/photos/7227641/pexels-photo-7227641.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700", label: "Rénovation salle de bain" },
    { url: "https://images.pexels.com/photos/7545775/pexels-photo-7545775.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700", label: "Pose double vasque" }
  ],
  electricien: [
    { url: "https://images.pexels.com/photos/355887/pexels-photo-355887.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700", label: "Installation domotique" },
    { url: "https://images.pexels.com/photos/209241/pexels-photo-209241.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700", label: "Éclairage LED" },
    { url: "https://images.pexels.com/photos/12634141/pexels-photo-12634141.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700", label: "Borne de recharge" },
    { url: "https://images.pexels.com/photos/1198390/pexels-photo-1198390.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700", label: "Panneaux solaires" },
    { url: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700", label: "Tableau électrique" },
    { url: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700", label: "Câblage réseau" }
  ],
  coiffeur: [
    { url: "https://images.pexels.com/photos/3998971/pexels-photo-3998971.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700", label: "Coloration artistique" },
    { url: "https://images.pexels.com/photos/3998752/pexels-photo-3998752.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700", label: "Extensions naturelles" },
    { url: "https://images.pexels.com/photos/3998749/pexels-photo-3998749.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700", label: "Coiffure événement" },
    { url: "https://images.pexels.com/photos/3985210/pexels-photo-3985210.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700", label: "Soins capillaires" },
    { url: "https://images.pexels.com/photos/2373710/pexels-photo-2373710.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700", label: "Barbier premium" },
    { url: "https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700", label: "Visagisme personnalisé" }
  ],
  restaurant: [
    { url: "https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700", label: "Menu dégustation" },
    { url: "https://images.pexels.com/photos/5638624/pexels-photo-5638624.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700", label: "Service traiteur" },
    { url: "https://images.pexels.com/photos/2513252/pexels-photo-2513252.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700", label: "Cave à vins" },
    { url: "https://images.pexels.com/photos/6424258/pexels-photo-6424258.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700", label: "Brunch gourmand" },
    { url: "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700", label: "Cuisine gastronomique" },
    { url: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700", label: "Cuisine saisons" }
  ],
  default: [
    { url: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700", label: "Projet résidentiel" },
    { url: "https://images.pexels.com/photos/3184290/pexels-photo-3184290.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700", label: "Projet commercial" },
    { url: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700", label: "Projet industriel" },
    { url: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700", label: "Projet public" },
    { url: "https://images.pexels.com/photos/3184391/pexels-photo-3184391.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700", label: "Projet premium" },
    { url: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700", label: "Projet maintenance" }
  ]
};

function getSectorServicesExact(sector: string) {
  const normalizedSector = (sector || '').toLowerCase();
  
  if (normalizedSector.includes('plomb') || normalizedSector.includes('plomberie')) return SECTOR_SERVICES_EXACT.plomberie;
  if (normalizedSector.includes('électricien') || normalizedSector.includes('electric')) return SECTOR_SERVICES_EXACT.electricien;
  if (normalizedSector.includes('coiff') || normalizedSector.includes('barb')) return SECTOR_SERVICES_EXACT.coiffeur;
  if (normalizedSector.includes('restaurant') || normalizedSector.includes('cuisin')) return SECTOR_SERVICES_EXACT.restaurant;
  
  return SECTOR_SERVICES_EXACT.default;
}

function getSectorTestimonialsExact(sector: string) {
  const normalizedSector = (sector || '').toLowerCase();
  
  if (normalizedSector.includes('plomb') || normalizedSector.includes('plomberie')) return SECTOR_TESTIMONIALS_EXACT.plomberie;
  if (normalizedSector.includes('électricien') || normalizedSector.includes('electric')) return SECTOR_TESTIMONIALS_EXACT.electricien;
  if (normalizedSector.includes('coiff') || normalizedSector.includes('barb')) return SECTOR_TESTIMONIALS_EXACT.coiffeur;
  if (normalizedSector.includes('restaurant') || normalizedSector.includes('cuisin')) return SECTOR_TESTIMONIALS_EXACT.restaurant;
  
  return SECTOR_TESTIMONIALS_EXACT.default;
}

function getSectorGalleryExact(sector: string) {
  const normalizedSector = (sector || '').toLowerCase();
  
  if (normalizedSector.includes('plomb') || normalizedSector.includes('plomberie')) return SECTOR_GALLERY_EXACT.plomberie;
  if (normalizedSector.includes('électricien') || normalizedSector.includes('electric')) return SECTOR_GALLERY_EXACT.electricien;
  if (normalizedSector.includes('coiff') || normalizedSector.includes('barb')) return SECTOR_GALLERY_EXACT.coiffeur;
  if (normalizedSector.includes('restaurant') || normalizedSector.includes('cuisin')) return SECTOR_GALLERY_EXACT.restaurant;
  
  return SECTOR_GALLERY_EXACT.default;
}

export async function generateExactSite(lead: any): Promise<string> {
  const services = getSectorServicesExact(lead.sector);
  const testimonials = getSectorTestimonialsExact(lead.sector);
  const gallery = getSectorGalleryExact(lead.sector);
  
  const companyName = lead.name || 'Entreprise';
  const city = lead.city || '';
  const sector = lead.sector || 'Professionnel';
  
  const content: ExactContent = {
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
          name: r.author || 'Client satisfait',
          role: 'Client',
          text: r.text || 'Excellent service !',
          stars: r.rating || 5,
          img: "https://images.pexels.com/photos/5386754/pexels-photo-5386754.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=80&w=80"
        }))
      : testimonials,
    gallery,
    heroTitle: companyName,
    heroSubtitle: lead.description || `Expert ${sector} Fiable & Réactif${city ? ' à ' + city : ''}. Interventions d'urgence, installations et rénovations complètes.`,
    aboutText: lead.description || `${companyName} est une entreprise artisanale fondée sur l'excellence, la réactivité et l'honnêteté. Basés${city ? ' à ' + city : ''}, nous intervenons sur toute la région. Chaque intervention est réalisée avec des matériaux de qualité, dans le respect des normes en vigueur.`,
    heroImage: gallery[0]?.url || 'https://images.pexels.com/photos/6419128/pexels-photo-6419128.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600'
  };
  
  return buildExactHTML(content);
}

function buildExactHTML(content: ExactContent): string {
  const { companyName, heroTitle, heroSubtitle, aboutText, services, testimonials, gallery, phone, email, address, rating, reviews, heroImage } = content;
  
  const stepsDescriptions = [
    "Appelez-nous ou envoyez un message. Nous répondons sous 30 minutes.",
    "Déplacement gratuit, diagnostic précis et évaluation de l'intervention nécessaire.",
    "Devis détaillé, transparent et sans surprise, soumis pour approbation.",
    "Réalisation des travaux dans les règles de l'art, avec matériaux de qualité.",
    "Réception des travaux et suivi post-intervention avec garantie écrite."
  ];
  
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
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    <style>
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
            color: #1a1a2e;
            line-height: 1.6;
        }
        
        /* ===== TICKER SCROLL ===== */
        @keyframes ticker {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        .ticker-track {
            display: flex;
            width: max-content;
            animation: ticker 30s linear infinite;
        }
        .ticker-track:hover {
            animation-play-state: paused;
        }
        
        /* ===== FADE IN UP ===== */
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(40px); }
            to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
            animation: fadeInUp 0.7s ease forwards;
        }
        
        /* ===== REVEAL on scroll ===== */
        .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal.visible {
            opacity: 1;
            transform: translateY(0);
        }
        .reveal-left {
            opacity: 0;
            transform: translateX(-40px);
            transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal-left.visible {
            opacity: 1;
            transform: translateX(0);
        }
        .reveal-right {
            opacity: 0;
            transform: translateX(40px);
            transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal-right.visible {
            opacity: 1;
            transform: translateX(0);
        }
        
        /* ===== STAGGER CHILDREN ===== */
        .stagger > *:nth-child(1) { transition-delay: 0.1s; }
        .stagger > *:nth-child(2) { transition-delay: 0.2s; }
        .stagger > *:nth-child(3) { transition-delay: 0.3s; }
        .stagger > *:nth-child(4) { transition-delay: 0.4s; }
        .stagger > *:nth-child(5) { transition-delay: 0.5s; }
        .stagger > *:nth-child(6) { transition-delay: 0.6s; }
        
        /* ===== CARD HOVER ===== */
        .card-hover {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card-hover:hover {
            transform: translateY(-6px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.12);
        }
        
        /* ===== HERO OVERLAY ===== */
        .hero-overlay {
            background: linear-gradient(
                105deg,
                rgba(10, 15, 40, 0.88) 0%,
                rgba(10, 15, 40, 0.60) 55%,
                rgba(10, 15, 40, 0.20) 100%
            );
        }
        
        /* ===== ACCENT LINE ===== */
        .accent-line::after {
            content: '';
            display: block;
            width: 52px;
            height: 3px;
            background: #C8922A;
            margin-top: 12px;
        }
        .accent-line-center::after {
            content: '';
            display: block;
            width: 52px;
            height: 3px;
            background: #C8922A;
            margin: 12px auto 0;
        }
        
        /* ===== GOLD BTN ===== */
        .btn-gold {
            background: #C8922A;
            color: #fff;
            font-weight: 600;
            letter-spacing: 0.04em;
            transition: background 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease;
            border: none;
            cursor: pointer;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }
        .btn-gold:hover {
            background: #a97520;
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(200,146,42,0.35);
        }
        
        /* ===== DARK BTN ===== */
        .btn-dark {
            background: #0f1630;
            color: #fff;
            font-weight: 600;
            letter-spacing: 0.04em;
            transition: background 0.25s ease, transform 0.2s ease;
            border: none;
            cursor: pointer;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }
        .btn-dark:hover {
            background: #1d2750;
            transform: translateY(-2px);
        }
        
        /* ===== NAV LINK ===== */
        .nav-link {
            position: relative;
            font-weight: 500;
            color: #e8e8e8;
            transition: color 0.2s;
            text-decoration: none;
        }
        .nav-link::after {
            content: '';
            position: absolute;
            bottom: -3px;
            left: 0;
            width: 0;
            height: 2px;
            background: #C8922A;
            transition: width 0.3s ease;
        }
        .nav-link:hover { color: #fff; }
        .nav-link:hover::after { width: 100%; }
        
        /* ===== FLOATING BADGE ===== */
        @keyframes float {
            0%   { transform: translateY(0px); }
            50%  { transform: translateY(-8px); }
            100% { transform: translateY(0px); }
        }
        .float-badge {
            animation: float 3s ease-in-out infinite;
        }
        
        /* ===== IMAGE ZOOM ON HOVER ===== */
        .img-zoom {
            overflow: hidden;
        }
        .img-zoom img {
            transition: transform 0.5s ease;
        }
        .img-zoom:hover img {
            transform: scale(1.06);
        }
        
        /* ===== Ticker Bar ===== */
        .ticker-bar {
            background: #C8922A;
            color: white;
            font-size: 12px;
            font-weight: 500;
            overflow: hidden;
            height: 34px;
        }
        
        /* ===== Navbar ===== */
        .navbar {
            position: sticky;
            top: 0;
            z-index: 50;
            background: #0f1630;
            transition: all 0.3s;
        }
        .navbar.scrolled {
            background: #0f1630;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        
        /* ===== Hero ===== */
        .hero {
            position: relative;
            min-height: 92vh;
            display: flex;
            align-items: center;
            overflow: hidden;
        }
        
        /* ===== Features Strip ===== */
        .features-strip {
            background: white;
            border-bottom: 1px solid #f1f5f9;
        }
        
        /* ===== Services ===== */
        .services-section {
            background: #f8fafc;
            padding: 6rem 0;
        }
        
        /* ===== About ===== */
        .about-section {
            background: white;
            padding: 6rem 0;
        }
        
        /* ===== Why Us ===== */
        .why-us-section {
            background: #0f1630;
            padding: 6rem 0;
            color: white;
        }
        
        /* ===== Stats ===== */
        .stats-section {
            background: white;
            padding: 5rem 0;
            border-bottom: 1px solid #f1f5f9;
        }
        
        /* ===== Demarches ===== */
        .demarches-section {
            background: #f8fafc;
            padding: 6rem 0;
        }
        
        /* ===== Gallery ===== */
        .gallery-section {
            background: white;
            padding: 6rem 0;
        }
        
        /* ===== Testimonials ===== */
        .testimonials-section {
            background: #f8fafc;
            padding: 6rem 0;
        }
        
        /* ===== Contact ===== */
        .contact-section {
            background: white;
            padding: 6rem 0;
        }
        
        /* ===== Footer ===== */
        .footer {
            background: #0f1630;
            color: white;
            padding: 4rem 0 2rem;
        }
        
        /* ===== Responsive ===== */
        @media (max-width: 1024px) {
            .hero h1 {
                font-size: 2.5rem !important;
            }
        }
        
        @media (max-width: 768px) {
            .desktop-nav {
                display: none;
            }
            .mobile-menu-btn {
                display: flex;
            }
            .mobile-menu {
                display: flex;
            }
            .hero {
                min-height: auto;
                padding: 8rem 0 4rem;
            }
            .hero-info-card {
                display: none;
            }
        }
        
        .mobile-menu-btn {
            display: none;
            flex-direction: column;
            gap: 6px;
            background: none;
            border: none;
            cursor: pointer;
            padding: 8px;
        }
        .mobile-menu-btn span {
            display: block;
            width: 24px;
            height: 2px;
            background: white;
            transition: all 0.3s;
        }
        .mobile-menu {
            display: none;
            position: fixed;
            inset: 0;
            background: rgba(15, 22, 48, 0.97);
            flex-direction: column;
            padding: 6rem 2rem;
            gap: 1.5rem;
            z-index: 40;
        }
        .mobile-menu a {
            color: white;
            font-size: 1.25rem;
            font-weight: 600;
            text-decoration: none;
            padding: 1rem 0;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
    </style>
</head>
<body>
    <!-- Ticker Bar -->
    <div class="ticker-bar">
        <div class="ticker-track h-full flex items-center gap-12 whitespace-nowrap">
            <span class="shrink-0 px-4">✦ Intervention rapide 7j/7</span>
            <span class="shrink-0 px-4">✦ Devis gratuit sans engagement</span>
            <span class="shrink-0 px-4">✦ ${content.sector} certifié${content.city ? ' ' + content.city : ''}</span>
            <span class="shrink-0 px-4">✦ Urgence 24h disponible</span>
            <span class="shrink-0 px-4">✦ 15 ans d'expérience</span>
            <span class="shrink-0 px-4">✦ Satisfaction garantie</span>
            <span class="shrink-0 px-4">✦ Travaux soignés & durables</span>
            <span class="shrink-0 px-4">✦ Artisan de confiance</span>
            <span class="shrink-0 px-4">✦ Intervention rapide 7j/7</span>
            <span class="shrink-0 px-4">✦ Devis gratuit sans engagement</span>
            <span class="shrink-0 px-4">✦ ${content.sector} certifié${content.city ? ' ' + content.city : ''}</span>
            <span class="shrink-0 px-4">✦ Urgence 24h disponible</span>
            <span class="shrink-0 px-4">✦ 15 ans d'expérience</span>
            <span class="shrink-0 px-4">✦ Satisfaction garantie</span>
            <span class="shrink-0 px-4">✦ Travaux soignés & durables</span>
            <span class="shrink-0 px-4">✦ Artisan de confiance</span>
        </div>
    </div>

    <!-- Navbar -->
    <nav class="navbar py-4" id="navbar">
        <div class="max-w-7xl mx-auto px-6 flex items-center justify-between">
            <!-- Logo -->
            <a href="#accueil" class="flex items-center gap-3 text-decoration-none">
                <div class="w-9 h-9 bg-[#C8922A] flex items-center justify-center rounded">
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" class="w-5 h-5">
                        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
                    </svg>
                </div>
                <div>
                    <div class="text-white font-bold text-base leading-tight">${companyName}</div>
                    <div class="text-[#C8922A] text-[10px] font-semibold uppercase tracking-widest">${content.sector} · Expert</div>
                </div>
            </a>

            <!-- Desktop nav -->
            <ul class="desktop-nav hidden lg:flex items-center gap-7 list-style-none m-0 p-0">
                <li><a href="#accueil" class="nav-link text-sm">Accueil</a></li>
                <li><a href="#services" class="nav-link text-sm">Services</a></li>
                <li><a href="#apropos" class="nav-link text-sm">À Propos</a></li>
                <li><a href="#demarches" class="nav-link text-sm">Démarches</a></li>
                <li><a href="#galerie" class="nav-link text-sm">Galerie</a></li>
                <li><a href="#temoignages" class="nav-link text-sm">Témoignages</a></li>
                <li><a href="#contact" class="nav-link text-sm">Contact</a></li>
            </ul>

            <!-- CTA -->
            ${phone ? `
            <a href="tel:${phone}" class="hidden lg:flex items-center gap-2 btn-gold px-5 py-2.5 rounded text-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.82a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.13 1 .37 1.97.72 2.9a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.18-1.18a2 2 0 012.11-.45c.93.35 1.9.59 2.9.72A2 2 0 0122 14.92z"/>
                </svg>
                ${phone}
            </a>
            ` : ''}

            <!-- Mobile hamburger -->
            <button class="mobile-menu-btn" onclick="toggleMobileMenu()" aria-label="Menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </nav>

    <!-- Mobile menu -->
    <div class="mobile-menu" id="mobileMenu">
        <a href="#accueil" onclick="toggleMobileMenu()">Accueil</a>
        <a href="#services" onclick="toggleMobileMenu()">Services</a>
        <a href="#apropos" onclick="toggleMobileMenu()">À Propos</a>
        <a href="#demarches" onclick="toggleMobileMenu()">Démarches</a>
        <a href="#galerie" onclick="toggleMobileMenu()">Galerie</a>
        <a href="#temoignages" onclick="toggleMobileMenu()">Témoignages</a>
        <a href="#contact" onclick="toggleMobileMenu()">Contact</a>
        ${phone ? `<a href="tel:${phone}" class="btn-gold px-6 py-3 rounded text-center mt-4">Appeler maintenant</a>` : ''}
    </div>

    <!-- Hero Section -->
    <section id="accueil" class="hero">
        <!-- BG Image -->
        <div class="absolute inset-0">
            <img src="${heroImage}" alt="${content.sector} professionnel" class="w-full h-full object-cover" />
            <div class="hero-overlay absolute inset-0" />
        </div>

        <!-- Decorative vertical line -->
        <div class="absolute left-0 top-0 bottom-0 w-1 bg-[#C8922A] opacity-70" />

        <div class="relative z-10 max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
            <!-- Left content -->
            <div>
                <div class="inline-flex items-center gap-2 bg-[#C8922A]/20 border border-[#C8922A]/40 text-[#C8922A] text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded mb-6 animate-fadeInUp">
                    <span class="w-2 h-2 rounded-full bg-[#C8922A] animate-pulse"/>
                    Artisan Certifié · ${content.city || 'France'}
                </div>
                <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-fadeInUp" style="animation-delay: 0.15s">
                    Expert en ${content.sector}<br />
                    <span class="text-[#C8922A]">Fiable & Réactif</span>
                </h1>
                <p class="text-slate-300 text-lg leading-relaxed mb-8 max-w-lg animate-fadeInUp" style="animation-delay: 0.3s">
                    ${heroSubtitle}
                </p>
                <div class="flex flex-wrap gap-4 animate-fadeInUp" style="animation-delay: 0.45s">
                    ${phone ? `
                    <a href="tel:${phone}" class="btn-gold px-7 py-3.5 rounded text-sm flex items-center gap-2">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4">
                            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.82a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.13 1 .37 1.97.72 2.9a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.18-1.18a2 2 0 012.11-.45c.93.35 1.9.59 2.9.72A2 2 0 0122 14.92z"/>
                        </svg>
                        Appeler Maintenant
                    </a>
                    ` : ''}
                    <a href="#contact" class="btn-dark px-7 py-3.5 rounded text-sm border border-white/20">
                        Demander un Devis
                    </a>
                </div>

                <!-- Trust badges -->
                <div class="flex flex-wrap gap-6 mt-10 animate-fadeInUp" style="animation-delay: 0.6s">
                    <div class="flex items-center gap-2 text-white text-sm">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#C8922A" stroke-width="2.5" class="w-4 h-4 shrink-0">
                            <path d="M20 6L9 17l-5-5"/>
                        </svg>
                        Devis Gratuit
                    </div>
                    <div class="flex items-center gap-2 text-white text-sm">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#C8922A" stroke-width="2.5" class="w-4 h-4 shrink-0">
                            <path d="M20 6L9 17l-5-5"/>
                        </svg>
                        Intervention Express
                    </div>
                    <div class="flex items-center gap-2 text-white text-sm">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#C8922A" stroke-width="2.5" class="w-4 h-4 shrink-0">
                            <path d="M20 6L9 17l-5-5"/>
                        </svg>
                        Garantie Travaux
                    </div>
                </div>
            </div>

            <!-- Right info card -->
            <div class="hero-info-card hidden lg:block">
                <div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 float-badge">
                    <div class="text-[#C8922A] text-xs font-bold uppercase tracking-widest mb-4">Horaires & Urgences</div>
                    <div class="space-y-4">
                        <div class="flex justify-between items-center border-b border-white/10 pb-3">
                            <span class="text-slate-300 text-sm">Lun – Ven</span>
                            <span class="text-white font-semibold text-sm">09h00 – 18h00</span>
                        </div>
                        <div class="flex justify-between items-center border-b border-white/10 pb-3">
                            <span class="text-slate-300 text-sm">Samedi</span>
                            <span class="text-white font-semibold text-sm">09h00 – 16h00</span>
                        </div>
                        <div class="flex justify-between items-center border-b border-white/10 pb-3">
                            <span class="text-slate-300 text-sm">Urgences</span>
                            <span class="text-white font-semibold text-sm">Disponible 24h/24</span>
                        </div>
                    </div>
                    ${phone ? `
                    <a href="tel:${phone}" class="mt-6 block text-center btn-gold px-4 py-3 rounded-lg text-sm">
                        ${phone}
                    </a>
                    ` : ''}
                    <p class="text-center text-slate-400 text-xs mt-3">Appel gratuit · Devis immédiat</p>
                </div>
            </div>
        </div>

        <!-- Scroll indicator -->
        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 text-xs animate-bounce">
            <span>Défiler</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4">
                <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
        </div>
    </section>

    <!-- Features Strip -->
    <section class="features-strip py-0">
        <div class="max-w-7xl mx-auto px-6">
            <div class="grid grid-cols-2 lg:grid-cols-4 divide-x divide-slate-100">
                <div class="flex items-center gap-4 px-6 py-6 reveal">
                    <span class="text-3xl">🛡</span>
                    <div>
                        <div class="font-bold text-[#0f1630] text-sm">Artisan Agréé</div>
                        <div class="text-slate-500 text-xs">Qualibat certifié</div>
                    </div>
                </div>
                <div class="flex items-center gap-4 px-6 py-6 reveal">
                    <span class="text-3xl">⚡</span>
                    <div>
                        <div class="font-bold text-[#0f1630] text-sm">Intervention Rapide</div>
                        <div class="text-slate-500 text-xs">Sous 60 minutes</div>
                    </div>
                </div>
                <div class="flex items-center gap-4 px-6 py-6 reveal">
                    <span class="text-3xl">📋</span>
                    <div>
                        <div class="font-bold text-[#0f1630] text-sm">Devis Transparent</div>
                        <div class="text-slate-500 text-xs">Sans frais cachés</div>
                    </div>
                </div>
                <div class="flex items-center gap-4 px-6 py-6 reveal">
                    <span class="text-3xl">🔧</span>
                    <div>
                        <div class="font-bold text-[#0f1630] text-sm">Travaux Garantis</div>
                        <div class="text-slate-500 text-xs">Garantie décennale</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="services-section">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center mb-16">
                <p class="text-[#C8922A] text-xs font-bold uppercase tracking-widest mb-3 reveal">Ce que nous faisons</p>
                <h2 class="text-3xl md:text-4xl font-bold text-[#0f1630] accent-line-center reveal">Nos Prestations</h2>
                <p class="text-slate-500 mt-6 max-w-xl mx-auto text-sm leading-relaxed reveal">
                    De la réparation d'urgence à la rénovation complète, nous prenons en charge tous vos besoins en ${content.sector.toLowerCase()} avec professionnalisme et rigueur.
                </p>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
                ${services.map((s, i) => `
                <div class="bg-white rounded-xl p-8 card-hover border border-slate-100 group reveal" style="transition-delay: ${i * 0.1}s">
                    <div class="w-14 h-14 bg-slate-50 border border-slate-100 group-hover:bg-[#0f1630] group-hover:border-[#0f1630] rounded-lg flex items-center justify-center text-3xl mb-5 transition-all duration-300">
                        ${s.icon}
                    </div>
                    <h3 class="font-bold text-[#0f1630] text-base mb-2">${s.title}</h3>
                    <p class="text-slate-500 text-sm leading-relaxed">${s.desc}</p>
                </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section id="apropos" class="about-section">
        <div class="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <!-- Images -->
            <div class="reveal-left">
                <div class="grid grid-cols-2 gap-4">
                    <div class="img-zoom rounded-xl overflow-hidden h-72">
                        <img src="${gallery[1]?.url || gallery[0]?.url}" alt="${content.sector} au travail" class="w-full h-full object-cover" />
                    </div>
                    <div class="img-zoom rounded-xl overflow-hidden h-72 mt-10">
                        <img src="${gallery[2]?.url || gallery[0]?.url}" alt="Technicien professionnel" class="w-full h-full object-cover" />
                    </div>
                </div>
                <!-- Floating badge -->
                <div class="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#C8922A] text-white text-center px-6 py-4 rounded-xl shadow-xl float-badge">
                    <div class="text-3xl font-bold">15+</div>
                    <div class="text-xs font-semibold uppercase tracking-wide mt-0.5">Ans d'Expérience</div>
                </div>
            </div>

            <!-- Text -->
            <div class="reveal-right">
                <p class="text-[#C8922A] text-xs font-bold uppercase tracking-widest mb-3">À propos de nous</p>
                <h2 class="text-3xl md:text-4xl font-bold text-[#0f1630] mb-2 accent-line">
                    Artisan de Confiance${content.city ? ' à ' + content.city : ''}
                </h2>
                <p class="text-slate-500 text-sm leading-relaxed mt-6 mb-4">
                    ${aboutText}
                </p>
                <p class="text-slate-500 text-sm leading-relaxed mb-8">
                    Chaque intervention est réalisée avec des matériaux de qualité, dans le respect des normes en vigueur, et avec un souci constant de la satisfaction client.
                </p>

                <div class="space-y-4 mb-8">
                    <div class="flex items-start gap-3 text-sm text-slate-600">
                        <span class="w-5 h-5 rounded-full bg-[#C8922A]/15 text-[#C8922A] flex items-center justify-center shrink-0 mt-0.5">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="w-3 h-3">
                                <path d="M20 6L9 17l-5-5"/>
                            </svg>
                        </span>
                        Intervention d'urgence 7j/7, y compris jours fériés
                    </div>
                    <div class="flex items-start gap-3 text-sm text-slate-600">
                        <span class="w-5 h-5 rounded-full bg-[#C8922A]/15 text-[#C8922A] flex items-center justify-center shrink-0 mt-0.5">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="w-3 h-3">
                                <path d="M20 6L9 17l-5-5"/>
                            </svg>
                        </span>
                        Devis gratuit détaillé, sans engagement
                    </div>
                    <div class="flex items-start gap-3 text-sm text-slate-600">
                        <span class="w-5 h-5 rounded-full bg-[#C8922A]/15 text-[#C8922A] flex items-center justify-center shrink-0 mt-0.5">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="w-3 h-3">
                                <path d="M20 6L9 17l-5-5"/>
                            </svg>
                        </span>
                        Matériaux certifiés et garantie sur tous les travaux
                    </div>
                    <div class="flex items-start gap-3 text-sm text-slate-600">
                        <span class="w-5 h-5 rounded-full bg-[#C8922A]/15 text-[#C8922A] flex items-center justify-center shrink-0 mt-0.5">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="w-3 h-3">
                                <path d="M20 6L9 17l-5-5"/>
                            </svg>
                        </span>
                        Respect rigoureux des délais convenus
                    </div>
                </div>

                <a href="#contact" class="btn-gold px-7 py-3.5 rounded text-sm inline-block">
                    Demander un Devis Gratuit
                </a>
            </div>
        </div>
    </section>

    <!-- Why Us Section -->
    <section class="why-us-section">
        <div class="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <div class="reveal-left">
                <p class="text-[#C8922A] text-xs font-bold uppercase tracking-widest mb-3">Pourquoi nous choisir ?</p>
                <h2 class="text-3xl md:text-4xl font-bold text-white mb-2 accent-line">
                    La Différence d'un Vrai Professionnel
                </h2>
                <p class="text-slate-400 text-sm leading-relaxed mt-6 mb-8">
                    Nous ne nous contentons pas de réparer — nous conseillons, nous anticipons et nous garantissons. Notre approche artisanale alliée à des équipements modernes nous permet d'offrir un service sans compromis.
                </p>

                <div class="grid grid-cols-2 gap-5">
                    <div class="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors">
                        <div class="text-[#C8922A] text-2xl font-bold mb-1">24h</div>
                        <div class="text-slate-300 text-sm">Service urgence</div>
                    </div>
                    <div class="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors">
                        <div class="text-[#C8922A] text-2xl font-bold mb-1">100%</div>
                        <div class="text-slate-300 text-sm">Devis honnêtes</div>
                    </div>
                    <div class="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors">
                        <div class="text-[#C8922A] text-2xl font-bold mb-1">NF</div>
                        <div class="text-slate-300 text-sm">Normes respectées</div>
                    </div>
                    <div class="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors">
                        <div class="text-[#C8922A] text-2xl font-bold mb-1">0€</div>
                        <div class="text-slate-300 text-sm">Frais de déplacement*</div>
                    </div>
                </div>
                <p class="text-slate-600 text-xs mt-3">*Sous conditions, dans la zone d'intervention</p>
            </div>

            <div class="reveal-right">
                <div class="img-zoom rounded-2xl overflow-hidden">
                    <img src="${gallery[3]?.url || gallery[0]?.url}" alt="Expert ${content.sector.toLowerCase()}" class="w-full h-80 object-cover" />
                </div>
                <div class="absolute -bottom-5 -right-5 bg-[#C8922A] text-white p-6 rounded-xl">
                    <div class="text-4xl font-bold">${rating || 4.9}%</div>
                    <div class="text-xs font-semibold uppercase tracking-wide mt-1">Satisfaction Client</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
        <div class="max-w-5xl mx-auto px-6">
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-12 divide-x divide-slate-100">
                <div class="text-center reveal">
                    <div class="text-5xl font-bold text-[#C8922A] mb-2">15<span class="text-3xl">+</span></div>
                    <div class="text-sm uppercase tracking-widest text-slate-500 font-medium">Ans d'Expérience</div>
                </div>
                <div class="text-center reveal">
                    <div class="text-5xl font-bold text-[#C8922A] mb-2">850<span class="text-3xl">+</span></div>
                    <div class="text-sm uppercase tracking-widest text-slate-500 font-medium">Chantiers Réalisés</div>
                </div>
                <div class="text-center reveal">
                    <div class="text-5xl font-bold text-[#C8922A] mb-2">98<span class="text-3xl">%</span></div>
                    <div class="text-sm uppercase tracking-widest text-slate-500 font-medium">Clients Satisfaits</div>
                </div>
                <div class="text-center reveal">
                    <div class="text-5xl font-bold text-[#C8922A] mb-2">30<span class="text-3xl">min</span></div>
                    <div class="text-sm uppercase tracking-widest text-slate-500 font-medium">Délai d'Intervention</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Demarches Section -->
    <section id="demarches" class="demarches-section">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center mb-16">
                <p class="text-[#C8922A] text-xs font-bold uppercase tracking-widest mb-3 reveal">Comment ça marche</p>
                <h2 class="text-3xl md:text-4xl font-bold text-[#0f1630] accent-line-center reveal">
                    Nos Démarches en 5 Étapes
                </h2>
                <p class="text-slate-500 mt-6 max-w-xl mx-auto text-sm reveal">
                    Un processus clair et transparent du premier contact à la livraison finale, pour une expérience sereine.
                </p>
            </div>

            <!-- Steps desktop -->
            <div class="hidden md:grid grid-cols-5 gap-0 relative">
                <!-- Connecting line -->
                <div class="absolute top-10 left-[10%] right-[10%] h-px bg-slate-200 z-0" />
                ${['01', '02', '03', '04', '05'].map((num, i) => `
                <div class="relative z-10 flex flex-col items-center text-center px-3 reveal" style="transition-delay: ${i * 0.1}s">
                    <div class="w-20 h-20 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center mb-5 shadow-md">
                        <span class="text-[#C8922A] text-xl font-bold">${num}</span>
                    </div>
                    <h3 class="font-bold text-[#0f1630] text-sm mb-2">${['Contact', 'Diagnostic', 'Devis', 'Intervention', 'Garantie'][i]}</h3>
                    <p class="text-slate-500 text-xs leading-relaxed">${stepsDescriptions[i]}</p>
                </div>
                `).join('')}
            </div>

            <!-- Steps mobile -->
            <div class="md:hidden space-y-5">
                ${['01', '02', '03', '04', '05'].map((num, i) => `
                <div class="flex items-start gap-5 bg-white rounded-xl p-5 shadow-sm reveal" style="transition-delay: ${i * 0.1}s">
                    <div class="w-12 h-12 rounded-full bg-[#C8922A] flex items-center justify-center text-white font-bold shrink-0">
                        ${num}
                    </div>
                    <div>
                        <h3 class="font-bold text-[#0f1630] text-sm mb-1">${['Contact', 'Diagnostic', 'Devis', 'Intervention', 'Garantie'][i]}</h3>
                        <p class="text-slate-500 text-xs leading-relaxed">${stepsDescriptions[i]}</p>
                    </div>
                </div>
                `).join('')}
            </div>

            <!-- CTA -->
            <div class="text-center mt-14 reveal">
                <a href="#contact" class="btn-gold px-8 py-3.5 rounded text-sm inline-block">
                    Démarrer une Demande
                </a>
            </div>
        </div>
    </section>

    <!-- Gallery Section -->
    <section id="galerie" class="gallery-section">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center mb-16">
                <p class="text-[#C8922A] text-xs font-bold uppercase tracking-widest mb-3 reveal">Nos Réalisations</p>
                <h2 class="text-3xl md:text-4xl font-bold text-[#0f1630] accent-line-center reveal">Galerie de Projets</h2>
                <p class="text-slate-500 mt-6 max-w-xl mx-auto text-sm reveal">
                    Découvrez quelques-unes de nos réalisations récentes — chaque projet reflète notre engagement pour la qualité et le soin du détail.
                </p>
            </div>

            <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 stagger">
                ${gallery.map((img, i) => `
                <div class="img-zoom rounded-xl overflow-hidden cursor-pointer relative group reveal" style="transition-delay: ${i * 0.08}s" onclick="openLightbox('${img.url}')">
                    <img src="${img.url}" alt="${img.label}" class="w-full h-56 object-cover" />
                    <div class="absolute inset-0 bg-[#0f1630]/0 group-hover:bg-[#0f1630]/50 transition-all duration-300 flex items-center justify-center">
                        <span class="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#C8922A] px-4 py-2 rounded">
                            ${img.label}
                        </span>
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- Lightbox -->
    <div id="lightbox" class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 hidden" onclick="closeLightbox()">
        <img id="lightbox-img" src="" alt="Galerie" class="max-w-4xl w-full max-h-[85vh] object-contain rounded-xl" />
        <button class="absolute top-6 right-6 text-white bg-white/20 hover:bg-white/40 w-10 h-10 rounded-full flex items-center justify-center" onclick="closeLightbox()">
            ✕
        </button>
    </div>

    <!-- Testimonials Section -->
    <section id="temoignages" class="testimonials-section">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center mb-16">
                <p class="text-[#C8922A] text-xs font-bold uppercase tracking-widest mb-3 reveal">Avis Clients</p>
                <h2 class="text-3xl md:text-4xl font-bold text-[#0f1630] accent-line-center reveal">Ce que disent nos clients</h2>
                <p class="text-slate-500 mt-6 max-w-xl mx-auto text-sm reveal">
                    La satisfaction de nos clients est notre meilleure carte de visite. Voici ce qu'ils disent de notre travail.
                </p>
            </div>

            <div class="grid md:grid-cols-3 gap-6 stagger">
                ${testimonials.map((t, i) => `
                <div class="bg-white rounded-xl p-7 shadow-sm border border-slate-100 card-hover reveal" style="transition-delay: ${i * 0.12}s">
                    <div class="flex gap-0.5 mb-4">
                        ${'★'.repeat(t.stars)}
                    </div>
                    <p class="text-slate-600 text-sm leading-relaxed mt-4 mb-6 italic">"${t.text}"</p>
                    <div class="flex items-center gap-3 pt-4 border-t border-slate-100">
                        <img src="${t.img}" alt="${t.name}" class="w-11 h-11 rounded-full object-cover" />
                        <div>
                            <div class="font-bold text-[#0f1630] text-sm">${t.name}</div>
                            <div class="text-slate-400 text-xs">${t.role}</div>
                        </div>
                    </div>
                </div>
                `).join('')}
            </div>

            <!-- Google rating badge -->
            <div class="flex justify-center mt-12 reveal">
                <div class="inline-flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-6 py-3 shadow-sm">
                    <div class="text-3xl">⭐</div>
                    <div>
                        <div class="font-bold text-[#0f1630] text-sm">${rating || 4.9}/5 sur Google</div>
                        <div class="text-slate-400 text-xs">Basé sur ${reviews || 120}+ avis vérifiés</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact-section">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center mb-16">
                <p class="text-[#C8922A] text-xs font-bold uppercase tracking-widest mb-3 reveal">Nous contacter</p>
                <h2 class="text-3xl md:text-4xl font-bold text-[#0f1630] accent-line-center reveal">Demandez votre Devis Gratuit</h2>
                <p class="text-slate-500 mt-6 max-w-xl mx-auto text-sm reveal">
                    Remplissez le formulaire ci-dessous ou appelez-nous directement. Nous vous répondons sous 30 minutes.
                </p>
            </div>

            <div class="grid lg:grid-cols-5 gap-12 items-start">
                <!-- Info -->
                <div class="lg:col-span-2 space-y-6 reveal-left">
                    <!-- Hours -->
                    <div class="bg-slate-50 rounded-xl p-6 border border-slate-100">
                        <h3 class="font-bold text-[#0f1630] text-sm mb-4 flex items-center gap-2">
                            🕐 Horaires d'Ouverture
                        </h3>
                        <div class="flex justify-between py-2 border-b border-slate-200 last:border-0 text-sm">
                            <span class="text-slate-600">Lundi – Vendredi</span>
                            <span class="font-semibold text-[#0f1630]">09h00 – 18h00</span>
                        </div>
                        <div class="flex justify-between py-2 border-b border-slate-200 last:border-0 text-sm">
                            <span class="text-slate-600">Samedi</span>
                            <span class="font-semibold text-[#0f1630]">09h00 – 16h00</span>
                        </div>
                        <div class="flex justify-between py-2 border-b border-slate-200 last:border-0 text-sm">
                            <span class="text-slate-600">Dimanche</span>
                            <span class="font-semibold text-[#0f1630]">Urgences uniquement</span>
                        </div>
                    </div>

                    <!-- Contact info -->
                    <div class="bg-[#0f1630] rounded-xl p-6 space-y-4">
                        ${phone ? `
                        <a href="tel:${phone}" class="flex items-start gap-3 group text-decoration-none">
                            <span class="text-[#C8922A] mt-0.5">📞</span>
                            <div>
                                <div class="text-slate-400 text-xs mb-0.5">Téléphone</div>
                                <div class="text-white text-sm font-medium group-hover:text-[#C8922A] transition-colors">${phone}</div>
                            </div>
                        </a>
                        ` : ''}
                        ${email ? `
                        <a href="mailto:${email}" class="flex items-start gap-3 group text-decoration-none">
                            <span class="text-[#C8922A] mt-0.5">✉️</span>
                            <div>
                                <div class="text-slate-400 text-xs mb-0.5">Email</div>
                                <div class="text-white text-sm font-medium group-hover:text-[#C8922A] transition-colors">${email}</div>
                            </div>
                        </a>
                        ` : ''}
                        ${address ? `
                        <div class="flex items-start gap-3">
                            <span class="text-[#C8922A] mt-0.5">📍</span>
                            <div>
                                <div class="text-slate-400 text-xs mb-0.5">Adresse</div>
                                <div class="text-white text-sm font-medium">${address}</div>
                            </div>
                        </div>
                        ` : ''}
                    </div>
                </div>

                <!-- Form -->
                <div class="lg:col-span-3 reveal-right">
                    <form class="bg-slate-50 rounded-2xl p-8 border border-slate-100" onsubmit="handleFormSubmit(event)">
                        <div class="grid md:grid-cols-2 gap-5 mb-5">
                            <div>
                                <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Nom complet *</label>
                                <input type="text" required class="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-[#C8922A] focus:ring-1 focus:ring-[#C8922A] transition-all" placeholder="Votre nom" />
                            </div>
                            <div>
                                <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Téléphone *</label>
                                <input type="tel" required class="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-[#C8922A] focus:ring-1 focus:ring-[#C8922A] transition-all" placeholder="06 XX XX XX XX" />
                            </div>
                        </div>
                        <div class="grid md:grid-cols-2 gap-5 mb-5">
                            <div>
                                <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Email</label>
                                <input type="email" class="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-[#C8922A] focus:ring-1 focus:ring-[#C8922A] transition-all" placeholder="votre@email.com" />
                            </div>
                            <div>
                                <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Type d'intervention</label>
                                <select class="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-[#C8922A] focus:ring-1 focus:ring-[#C8922A] transition-all text-slate-600">
                                    <option value="">-- Sélectionner --</option>
                                    <option>Dépannage urgent</option>
                                    <option>Détection de fuite</option>
                                    <option>Installation sanitaire</option>
                                    <option>Débouchage</option>
                                    <option>Rénovation complète</option>
                                    <option>Autre</option>
                                </select>
                            </div>
                        </div>
                        <div class="mb-6">
                            <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Décrivez votre besoin *</label>
                            <textarea required rows="4" class="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-[#C8922A] focus:ring-1 focus:ring-[#C8922A] transition-all resize-none" placeholder="Décrivez le problème ou les travaux souhaités..."></textarea>
                        </div>
                        <button type="submit" class="w-full btn-gold py-3.5 rounded-lg text-sm">
                            Envoyer ma Demande →
                        </button>
                        <p class="text-center text-slate-400 text-xs mt-3">
                            Réponse garantie sous 30 minutes · Devis gratuit & sans engagement
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="max-w-7xl mx-auto px-6">
            <div class="grid md:grid-cols-3 gap-8 mb-8">
                <div>
                    <div class="flex items-center gap-3 mb-4">
                        <div class="w-9 h-9 bg-[#C8922A] flex items-center justify-center rounded">
                            <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" class="w-5 h-5">
                                <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
                            </svg>
                        </div>
                        <div>
                            <div class="text-white font-bold text-base leading-tight">${companyName}</div>
                            <div class="text-[#C8922A] text-[10px] font-semibold uppercase tracking-widest">${content.sector} · Expert</div>
                        </div>
                    </div>
                    <p class="text-slate-400 text-sm leading-relaxed">
                        ${content.sector} d'excellence${content.city ? ' à ' + content.city : ''}. Innovation, qualité et satisfaction garantie depuis plus de 15 ans.
                    </p>
                </div>
                <div>
                    <h3 class="font-bold text-white text-sm mb-4">Services</h3>
                    ${services.slice(0, 4).map(s => `<a href="#services" class="text-slate-400 text-sm hover:text-white transition-colors block mb-2 text-decoration-none">${s.title}</a>`).join('')}
                </div>
                <div>
                    <h3 class="font-bold text-white text-sm mb-4">Contact</h3>
                    ${phone ? `<a href="tel:${phone}" class="text-slate-400 text-sm hover:text-white transition-colors block mb-2 text-decoration-none">${phone}</a>` : ''}
                    ${email ? `<a href="mailto:${email}" class="text-slate-400 text-sm hover:text-white transition-colors block mb-2 text-decoration-none">${email}</a>` : ''}
                    ${address ? `<p class="text-slate-400 text-sm">${address}</p>` : ''}
                </div>
            </div>
            <div class="border-t border-slate-700 pt-6 text-center">
                <p class="text-slate-500 text-xs">&copy; 2024 ${companyName}. Tous droits réservés.</p>
            </div>
        </div>
    </footer>

    <script>
        // Mobile menu toggle
        function toggleMobileMenu() {
            const menu = document.getElementById('mobileMenu');
            menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
        }

        // Lightbox
        function openLightbox(url) {
            const lightbox = document.getElementById('lightbox');
            const img = document.getElementById('lightbox-img');
            img.src = url;
            lightbox.classList.remove('hidden');
        }

        function closeLightbox() {
            const lightbox = document.getElementById('lightbox');
            lightbox.classList.add('hidden');
        }

        // Form submit
        function handleFormSubmit(e) {
            e.preventDefault();
            alert('Merci pour votre demande ! Nous vous répondrons dans les plus brefs délais.');
            e.target.reset();
        }

        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.pageYOffset > 60) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Intersection Observer pour animations
        const observerOptions = {
            threshold: 0.12
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.addEventListener('DOMContentLoaded', function() {
            document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
                observer.observe(el);
            });
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
    </script>
</body>
</html>`;
}
