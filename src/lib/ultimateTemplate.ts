// ── PREMIUM LOCAL BUSINESS TEMPLATE ──
// Design épuré, luxe, professionnel. Zero gimmicks, zero popups agressifs.

import { getSectorImages } from './pexelsImages';
import { getImagesForLead } from './pexelsApi';

// ── AVIS FALLBACK SECTORIELS ──
const SECTOR_FALLBACK_REVIEWS: Record<string, Array<{ author: string; text: string; rating: number; date: string }>> = {
  plomberie: [
    { author: 'M. Dupont', text: "Intervention rapide pour une fuite d'eau en pleine nuit. Plombier professionnel et tarifs justes. Je recommande !", rating: 5, date: 'Il y a 1 semaine' },
    { author: 'Mme Martin', text: "Chauffage réparé en 1h, impeccable. Un vrai pro qui connait son métier.", rating: 5, date: 'Il y a 2 semaines' },
    { author: 'Pierre L.', text: "Remplacement complet de la salle de bain. Travail soigné, respect des délais.", rating: 5, date: 'Il y a 3 semaines' },
    { author: 'Sophie R.', text: "Détection de fuite sans casse. Technologie au top et prix raisonnable.", rating: 5, date: 'Il y a 1 mois' },
    { author: 'Jean-Claude B.', text: "Entretien annuel de la chaudière. Consciencieux et sympathique.", rating: 5, date: 'Il y a 1 mois' },
    { author: 'Marie T.', text: "Débouchage d'urgence. Arrivé en 45min, problème résolu. Merci !", rating: 5, date: 'Il y a 2 mois' }
  ],
  electricien: [
    { author: 'Sylvie M.', text: "Mise aux normes complète de ma maison ancienne. Travail propre et conforme.", rating: 5, date: 'Il y a 1 semaine' },
    { author: 'Marc D.', text: "Installation de ma borne de recharge voiture électrique. Parfait !", rating: 5, date: 'Il y a 2 semaines' },
    { author: 'Nathalie P.', text: "Domotique installée dans toute la maison. Un vrai confort au quotidien.", rating: 5, date: 'Il y a 3 semaines' },
    { author: 'Philippe R.', text: "Court-circuit réparé en urgence. Intervention rapide et efficace.", rating: 5, date: 'Il y a 1 mois' },
    { author: 'Isabelle G.', text: "Éclairage LED dans tout l'appartement. Économies d'énergie garanties.", rating: 5, date: 'Il y a 1 mois' },
    { author: 'François L.', text: "Diagnostic complet avant achat immobilier. Rassurant et professionnel.", rating: 5, date: 'Il y a 2 mois' }
  ],
  coiffeur: [
    { author: 'Sophie L.', text: "Coupe parfaite, exactement ce que je voulais. Le visagisme fait toute la différence !", rating: 5, date: 'Il y a 1 semaine' },
    { author: 'Thomas H.', text: "Barbier au top, rasage à l'ancienne de qualité. Ambiance masculine garantie.", rating: 5, date: 'Il y a 2 semaines' },
    { author: 'Camille D.', text: "Coloration balayage magnifique. Des compliments tous les jours !", rating: 5, date: 'Il y a 3 semaines' },
    { author: 'Laura M.', text: "Soins kératine pour mes cheveux abîmés. Résultat spectaculaire.", rating: 5, date: 'Il y a 1 mois' },
    { author: 'Emma B.', text: "Chignon de mariage exceptionnel. Tenu toute la journée et la nuit.", rating: 5, date: 'Il y a 1 mois' },
    { author: 'Nicolas P.', text: "Extensions naturelles, on ne voit pas la différence. Super travail.", rating: 5, date: 'Il y a 2 mois' }
  ],
  restaurant: [
    { author: 'Julie M.', text: "Menu dégustation exceptionnel. Une explosion de saveurs à chaque plat !", rating: 5, date: 'Il y a 1 semaine' },
    { author: 'Antoine D.', text: "Service impeccable et cadre magnifique. Parfait pour les occasions spéciales.", rating: 5, date: 'Il y a 2 semaines' },
    { author: 'Sarah K.', text: "Produits locaux et cuisine créative. Une belle découverte gastronomique.", rating: 5, date: 'Il y a 3 semaines' },
    { author: 'David L.', text: "Brunch de qualité, copieux et fait maison. On reviendra !", rating: 5, date: 'Il y a 1 mois' },
    { author: 'Claire P.', text: "Accueil chaleureux comme à la maison. Une cuisine avec du cœur.", rating: 5, date: 'Il y a 1 mois' },
    { author: 'Romain G.', text: "Carte des vins excellente et conseils avisés. Soirée parfaite.", rating: 5, date: 'Il y a 2 mois' }
  ],
  garage: [
    { author: 'Stéphane B.', text: "Réparation moteur complexe résolue en 2 jours. Mécanicien de talent !", rating: 5, date: 'Il y a 1 semaine' },
    { author: 'Aurélie M.', text: "Pneus changés et géométrie faite. Prix compétitif et rapide.", rating: 5, date: 'Il y a 2 semaines' },
    { author: 'Christophe L.', text: "Diagnostic électronique précis. Enfin un garage honnête !", rating: 5, date: 'Il y a 3 semaines' },
    { author: 'Marie-Jeanne T.', text: "Carrosserie réparée impeccablement. On ne voit plus la rayure.", rating: 5, date: 'Il y a 1 mois' },
    { author: 'Pierre D.', text: "Révision complète à prix juste. Pas de travaux inutiles proposés.", rating: 5, date: 'Il y a 1 mois' },
    { author: 'Sandrine H.', text: "Climatisation rechargée et nettoyée. Parfait pour l'été.", rating: 5, date: 'Il y a 2 mois' }
  ],
  nettoyage: [
    { author: 'Mme Bernard', text: "Appartement rendu impeccable après déménagement. Propreté impeccable !", rating: 5, date: 'Il y a 1 semaine' },
    { author: 'M. Leroy', text: "Bureaux entreprise nettoyés tous les soirs. Service fiable et discret.", rating: 5, date: 'Il y a 2 semaines' },
    { author: 'Famille Dubois', text: "Nettoyage après travaux. Poussière et débris partout enlevés. Bravo !", rating: 5, date: 'Il y a 3 semaines' },
    { author: 'Mme Petit', text: "Canapé et moquettes nettoyés à domicile. Comme neuf, odeurs disparues.", rating: 5, date: 'Il y a 1 mois' },
    { author: 'M. Moreau', text: "Vitres immeuble 4 étages sans traces. Équipe courageuse !", rating: 5, date: 'Il y a 1 mois' },
    { author: 'Mme Roux', text: "Désinfection complète post-covid. Rassurant et professionnel.", rating: 5, date: 'Il y a 2 mois' }
  ],
  jardin: [
    { author: 'M. Fontaine', text: "Jardin totalement transformé. Un vrai havre de paix maintenant !", rating: 5, date: 'Il y a 1 semaine' },
    { author: 'Mme Chevalier', text: "Taille de haies millimétrée. Géométrie parfaite et nettoyé.", rating: 5, date: 'Il y a 2 semaines' },
    { author: 'M. Lambert', text: "Terrasse bois rénovée et traitée. Protégée pour des années.", rating: 5, date: 'Il y a 3 semaines' },
    { author: 'Mme Simon', text: "Massif fleuri créé de A à Z. Plantes parfaitement adaptées.", rating: 5, date: 'Il y a 1 mois' },
    { author: 'M. Roussel', text: "Pelouse semée et arrosage automatique installé. Zéro entretien !", rating: 5, date: 'Il y a 1 mois' },
    { author: 'Mme Garnier', text: "Élagage dangereux d'un grand chêne. Pro sans risques.", rating: 5, date: 'Il y a 2 mois' }
  ],
  fitness: [
    { author: 'Nicolas V.', text: "Programme perte de poids efficace -8kg en 3 mois. Coach motivant !", rating: 5, date: 'Il y a 1 semaine' },
    { author: 'Caroline M.', text: "Remise en forme post-grossesse adaptée. Exercices sur mesure.", rating: 5, date: 'Il y a 2 semaines' },
    { author: 'Alexandre K.', text: "Préparation marathon réussie. Temps visé atteint grâce au suivi.", rating: 5, date: 'Il y a 3 semaines' },
    { author: 'Émilie R.', text: "Cours collectifs dynamiques. Ambiance top et résultats garantis.", rating: 5, date: 'Il y a 1 mois' },
    { author: 'Julien B.', text: "Nutrition + sport = résultats durables. Accompagnement complet.", rating: 5, date: 'Il y a 1 mois' },
    { author: 'Sophie G.', text: "Musculation sans blessure grâce aux conseils techniques.", rating: 5, date: 'Il y a 2 mois' }
  ],
  medical: [
    { author: 'M. Durand', text: "Consultation à l'écoute et diagnostic précis. Enfin un médecin disponible !", rating: 5, date: 'Il y a 1 semaine' },
    { author: 'Mme Lefebvre', text: "Kiné compétente pour ma rééducation genou. Progrès rapides.", rating: 5, date: 'Il y a 2 semaines' },
    { author: 'M. Michel', text: "Dentiste doux et patient. Phobie du dentiste vaincue !", rating: 5, date: 'Il y a 3 semaines' },
    { author: 'Mme Fournier', text: "Infirmière à domicile régulière et professionnelle. Rassurante.", rating: 5, date: 'Il y a 1 mois' },
    { author: 'M. Girard', text: "Pédicure soignante pour diabétique. Extrêmement précautionneuse.", rating: 5, date: 'Il y a 1 mois' },
    { author: 'Mme Bonnet', text: "Ostéo qui soulage enfin mes maux de dos chroniques. Un soulagement !", rating: 5, date: 'Il y a 2 mois' }
  ],
  avocat: [
    { author: 'M. Lemaire', text: "Divorce compliqué géré avec professionnalisme et empathie.", rating: 5, date: 'Il y a 1 semaine' },
    { author: 'Mme Duval', text: "Succès en appel pour mon licenciement abusif. Défense exemplaire !", rating: 5, date: 'Il y a 2 semaines' },
    { author: 'M. Bernard', text: "Contrat commercial rédigé avec précision. Zéro zone grise.", rating: 5, date: 'Il y a 3 semaines' },
    { author: 'Mme Morin', text: "Succession familiale débloquée rapidement. Fin des conflits.", rating: 5, date: 'Il y a 1 mois' },
    { author: 'M. Petit', text: "Conseil fiscal pertinent qui m'a fait économiser beaucoup.", rating: 5, date: 'Il y a 1 mois' },
    { author: 'Mme Giraud', text: "Défense pénale efficace. Acquittement obtenu. Excellence !", rating: 5, date: 'Il y a 2 mois' }
  ],
  default: [
    { author: 'Emma L.', text: "Une expérience tout simplement majestueuse...", rating: 5, date: 'Il y a 1 semaine' },
    { author: 'Arthur D.', text: "Service d'excellence du début à la fin...", rating: 5, date: 'Il y a 2 semaines' },
    { author: 'Sophie M.', text: "Je recommande vivement cette entreprise...", rating: 5, date: 'Il y a 3 semaines' },
    { author: 'Lucas P.', text: "Professionnalisme et expertise remarquables...", rating: 5, date: 'Il y a 1 mois' },
    { author: 'Marie B.', text: "Un service client irréprochable...", rating: 5, date: 'Il y a 1 mois' },
    { author: 'Thomas R.', text: "Excellence et qualité au rendez-vous...", rating: 5, date: 'Il y a 2 mois' }
  ]
};

function getSectorFallbackReviews(sector: string): Array<{ author: string; text: string; rating: number; date: string }> {
  const normalizedSector = (sector || '').toLowerCase();
  for (const [key, reviews] of Object.entries(SECTOR_FALLBACK_REVIEWS)) {
    if (normalizedSector.includes(key)) return reviews;
  }
  return SECTOR_FALLBACK_REVIEWS.default;
}

function generateAboutText(templateText: string, lead: any): string {
  let years = 'plusieurs';
  if (lead.establishedYear && typeof lead.establishedYear === 'number') {
    const currentYear = new Date().getFullYear();
    const calculatedYears = currentYear - lead.establishedYear;
    if (calculatedYears > 0 && calculatedYears < 100) years = calculatedYears.toString();
  } else if (lead.description) {
    const yearMatch = lead.description.match(/(\d+)\s*ans?\s+d['']exp[eé]rience/i);
    if (yearMatch) years = yearMatch[1];
  }
  return templateText.replace(/depuis plus de 15 ans/gi, `depuis ${years} ans`)
                     .replace(/15 ans d['']exp[eé]rience/gi, `${years} ans d'expérience`);
}

function generateFeaturesFromService(name: string, description: string, sector: string): string[] {
  const serviceName = (name || '').toLowerCase();
  const serviceDesc = (description || '').toLowerCase();
  const defaultFeatures = ['Service professionnel', 'Intervention garantie', 'Devis gratuit'];
  const featureDictionary: Record<string, string[]> = {
    'urgence': ['Disponible 24h/24', 'Intervention rapide', 'Déplacement inclus'],
    'depannage': ['Réparation durable', 'Pièces garanties', 'Tarifs transparents'],
    'installation': ['Pose certifiée', 'Conformité normes', 'Garantie décennale'],
    'chauffage': ['Économies énergie', 'Installation propre', 'Entretien annuel'],
    'sanitaire': ['Matériel qualité', 'Finitions soignées', 'Délai respecté'],
    'mise aux normes': ['Conformité NFC 15-100', 'Certification Consuel', 'Sécurité garantie'],
    'domotique': ['Configuration incluse', 'App smartphone', 'Support technique'],
    'éclairage': ['Design moderne', 'LED économique', 'Installation discrète'],
    'coupe': ['Visagisme personnalisé', 'Conseil entretien', 'Produits adaptés'],
    'coloration': ['Coloration végétale', 'Protection cheveux', 'Brillance longue durée'],
    'barbier': ['Rasage précis', 'Soins barbe', 'Ambiance masculine'],
    'menu': ['Produits frais', 'Cuisine maison', 'Accord mets-vins'],
    'livraison': ['Emballage qualité', 'Livraison rapide', 'Commande en ligne'],
    'moteur': ['Diagnostic précis', 'Réparation garantie', "Pièces d'origine"],
    'pneus': ['Montage rapide', 'Géométrie 3D', 'Stockage hiver'],
    'carrosserie': ['Peinture neuve', 'Débosselage sans peinture', 'Garantie vie'],
    'ménage': ['Produits écologiques', 'Équipe formée', 'Intervention régulière'],
    'vitres': ['Sans traces garanti', 'Accès difficile', 'Sécurité maximale'],
    'désinfection': ['Produits certifiés', 'Zones sensibles', 'Certificat fourni'],
    'taille': ['Forme parfaite', 'Évacuation déchets', 'Santé végétaux'],
    'pelouse': ['Semence adaptée', 'Arrosage auto', 'Entretien minime'],
    'coaching': ['Programme personnalisé', 'Suivi nutrition', 'Résultats mesurables'],
    'musculation': ['Technique sécurisée', 'Progression adaptée', 'Sans blessure'],
    'consultation': ["À l'écoute", 'Diagnostic précis', 'Disponibilité rapide'],
    'kiné': ['Rééducation active', 'Appareillage moderne', 'Progrès rapides'],
    'divorce': ['Discrétion totale', 'Médiation possible', 'Protection intérêts'],
    'contrat': ['Rédaction précise', 'Clauses protectrices', 'Relecture gratuite'],
  };
  for (const [keyword, features] of Object.entries(featureDictionary)) {
    if (serviceName.includes(keyword) || serviceDesc.includes(keyword)) return features;
  }
  const keywords = serviceDesc.match(/\b(installation|réparation|remplacement|rénovation|entretien|dépannage|conseil|sur-mesure|professionnel|certifié|garanti|rapide|qualité|économique)\b/g);
  if (keywords && keywords.length > 0) return keywords.slice(0, 3).map(k => k.charAt(0).toUpperCase() + k.slice(1) + ' garanti');
  return defaultFeatures;
}

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
  slogan: string;
  heroImage: string;
  allImages: string[];
}

const SECTOR_ULTIMATE_TEMPLATES: Record<string, {
  primary: string; secondary: string; accent: string; background: string;
  services: Array<{ name: string; description: string; features: string[] }>;
  guarantees: Array<{ title: string; icon: string }>;
  heroTitle: string; heroSubtitle: string; aboutText: string; ctaText: string;
}> = {
  plomberie: {
    primary: '#0f766e', secondary: '#115e59', accent: '#14b8a6', background: '#f0fdfa',
    services: [
      { name: 'Dépannage 24h/24', description: "Intervention d'urgence sur toutes fuites et pannes", features: ['Disponible 7j/7', 'Arrivée sous 1h30', 'Sans surprise tarifaire'] },
      { name: 'Installation Sanitaire', description: 'Pose et remplacement de vos appareils', features: ['Robinetterie', 'Éviers', 'WC', 'Douches'] },
      { name: 'Chauffage & Chaudière', description: 'Installation et réparation chauffage', features: ['Chaudières gaz/fioul', 'Pompes à chaleur', 'Détartrage'] },
      { name: 'Détection de Fuites', description: 'Localisation précise sans casse', features: ['Caméra thermique', 'Gaz traceur', 'Colmatage immédiat'] },
      { name: 'Rénovation Salle de Bain', description: 'Création et rénovation complète', features: ['Devis gratuit', 'Aide au choix', 'Clé en main'] },
      { name: 'Entretien Annuel', description: 'Maintenance préventive', features: ['Contrôle chauffage', 'Détartrage', 'Mise aux normes'] }
    ],
    guarantees: [
      { title: 'Garantie Décennale', icon: 'shield-check' },
      { title: 'Intervention < 2h', icon: 'clock' },
      { title: 'Devis Gratuit', icon: 'file-text' },
      { title: 'Artisan Qualifié', icon: 'badge-check' }
    ],
    heroTitle: 'Artisan Plombier', heroSubtitle: "De la fuite d'eau à la rénovation complète, un savoir-faire au service de vos installations",
    aboutText: "Plombier chauffagiste depuis plus de 15 ans, je mets mon savoir-faire au service de vos installations. Artisan passionné, je garantis un travail soigné, des délais respectés et des tarifs transparents.",
    ctaText: 'Demander un devis gratuit'
  },
  electricien: {
    primary: '#1e40af', secondary: '#1e3a8a', accent: '#2563eb', background: '#f8fafc',
    services: [
      { name: 'Mise aux Normes', description: 'Remise à neuf de votre installation électrique', features: ['Norme NFC 15-100', 'Tableau électrique neuf', 'Mise à la terre'] },
      { name: 'Dépannage Électrique', description: 'Pannes, court-circuits, disjonctions', features: ['Intervention rapide', 'Diagnostic complet', 'Réparation durable'] },
      { name: 'Installation Complète', description: 'Construction ou rénovation électrique', features: ['Câblage complet', 'Points de lumière', 'Prises et inters'] },
      { name: 'Domotique & Smart Home', description: 'Maison connectée et automatisée', features: ['Volets roulants', 'Éclairage auto', 'Thermostats'] },
      { name: 'Éclairage LED', description: 'Solutions éclairage économiques', features: ['Spots encastrés', 'Suspensions design', 'Éclairage extérieur'] },
      { name: 'Bornes de Recharge', description: 'Installation bornes véhicule électrique', features: ['Wallbox particulier', 'Borne entreprise', 'Certification IRVE'] }
    ],
    guarantees: [
      { title: 'Consuel Certifié', icon: 'shield-check' },
      { title: 'Garantie Décennale', icon: 'badge-check' },
      { title: 'Intervention < 2h', icon: 'clock' },
      { title: 'Devis Gratuit', icon: 'file-text' }
    ],
    heroTitle: 'Électricien Agréé', heroSubtitle: "Des installations sûres, conformes et durables pour votre habitat et votre entreprise",
    aboutText: "Électricien certifié Consuel avec 15 ans d'expérience. Je sécurise votre habitat grâce à des installations conformes et durables. Artisan sérieux, intervention rapide et devis transparent.",
    ctaText: 'Contactez-nous'
  },
  coiffeur: {
    primary: '#6b21a8', secondary: '#581c87', accent: '#7c3aed', background: '#faf5ff',
    services: [
      { name: 'Coupes & Styles', description: 'Coupe sur-mesure femme et homme', features: ['Visagisme personnalisé', 'Techniques actuelles', 'Conseil entretien'] },
      { name: 'Barbier Traditionnel', description: 'Rasage et soins barbe', features: ["Rasage à l'ancienne", 'Taille précise', 'Soins barbe'] },
      { name: 'Coloration Expert', description: 'Balayages, ombrés et couleurs', features: ['Coloration végétale', 'Mèches sur mesure', 'Glitter color'] },
      { name: 'Soins Capillaires', description: 'Traitements réparateurs', features: ['Botox capillaire', 'Kératine', 'Massage crânien'] },
      { name: 'Extensions Volume', description: 'Rajouts longueur et épaisseur', features: ['Pose à froid', 'Tape-in', 'Entretien inclus'] },
      { name: 'Chignons & Événements', description: 'Coiffures de cérémonie', features: ['Mariage', 'Sofreh aghd', 'Maquillage combo'] }
    ],
    guarantees: [
      { title: 'Produits Bio', icon: 'leaf' },
      { title: 'Stérilisation Outils', icon: 'sparkles' },
      { title: 'Formation Continue', icon: 'scissors' },
      { title: 'Satisfait ou Refait', icon: 'heart' }
    ],
    heroTitle: 'Coiffeur Visagiste', heroSubtitle: "L'art de sublimer vos cheveux avec passion et expertise",
    aboutText: "Coiffeur passionné depuis 15 ans, je crée des looks qui vous ressemblent. Spécialiste du visagisme et des techniques modernes, je veille à la santé de vos cheveux avec des produits naturels et de qualité.",
    ctaText: 'Prendre rendez-vous'
  },
  restaurant: {
    primary: '#c2410c', secondary: '#9a3412', accent: '#ea580c', background: '#fff7ed',
    services: [
      { name: 'Cuisine Maison', description: 'Plats préparés sur place', features: ['Produits locaux', 'Recettes authentiques', 'Fait minute'] },
      { name: 'Menu du Jour', description: 'Formule déjeuner économique', features: ['Entrée + Plat + Dessert', 'Produits frais', 'Cuisson minute'] },
      { name: 'Spécialités', description: 'Nos plats signature', features: ['Recettes du terroir', 'Grillades', 'Poissons frais'] },
      { name: 'Événements & Groupes', description: 'Repas de famille et séminaires', features: ['Menu groupe', 'Salle privative', 'Sur mesure'] },
      { name: 'Service Traiteur', description: 'Livraison et à emporter', features: ['Plateaux repas', 'Buffets', 'Livraison pro'] },
      { name: 'Boissons & Vins', description: 'Carte des vins et cocktails', features: ['Vins régionaux', 'Cocktails maison', 'Bières artisanales'] }
    ],
    guarantees: [
      { title: 'Produits Frais', icon: 'leaf' },
      { title: 'Service Rapide', icon: 'clock' },
      { title: 'Avis 4.8/5', icon: 'star' },
      { title: 'Parking Gratuit', icon: 'car' }
    ],
    heroTitle: 'Restaurant Traditionnel', heroSubtitle: "Cuisine authentique et accueil chaleureux depuis 2009",
    aboutText: "Chef passionné depuis 15 ans, je cuisine avec cœur des plats généreux et savoureux. Produits frais du marché, recettes authentiques et ambiance conviviale vous attendent.",
    ctaText: 'Réserver une table'
  },
  garage: {
    primary: '#166534', secondary: '#14532d', accent: '#059669', background: '#f0fdf4',
    services: [
      { name: 'Mécanique Générale', description: 'Entretien et réparation toutes marques', features: ['Révisions constructeur', 'Courroies', 'Freins'] },
      { name: 'Diagnostic Auto', description: 'Analyse électronique complète', features: ['Valise multimarque', 'Effacement défauts', 'Paramétrage'] },
      { name: 'Pneumatiques', description: 'Montage, équilibrage, géométrie', features: ['Pneus toutes saisons', 'Pneus run-flat', 'Parallélisme'] },
      { name: 'Climatisation', description: 'Recharge et réparation clim', features: ['Recharge gaz R134a', 'Détection fuites', 'Filtre habitacle'] },
      { name: 'Carrosserie', description: 'Réparation et peinture', features: ['Débosselage', 'Peinture à la nuance', 'Polissage optique'] },
      { name: 'Contrôle Technique', description: 'Préparation et contre-visite', features: ['Pré-contrôle', 'Réparations conformité', 'Accompagnement'] }
    ],
    guarantees: [
      { title: 'Devis Gratuit', icon: 'file-text' },
      { title: 'Garantie Pièces', icon: 'shield-check' },
      { title: 'Intervention Rapide', icon: 'clock' },
      { title: 'Véhicule de Courtoisie', icon: 'car' }
    ],
    heroTitle: 'Garage Automobile', heroSubtitle: "Mécanicien passionné, votre véhicule entre de bonnes mains",
    aboutText: "Mécanicien automobile depuis 15 ans, j'entretiens et répare toutes marques avec passion. Diagnostic précis, devis transparents et respect des délais.",
    ctaText: 'Demendez un RDV'
  },
  nettoyage: {
    primary: '#059669', secondary: '#047857', accent: '#10b981', background: '#f0fdf4',
    services: [
      { name: 'Nettoyage de Bureaux', description: 'Entretien quotidien de vos locaux', features: ['Poussière, sols, vitres', 'Produits écolabels', 'Horaires flexibles'] },
      { name: 'Nettoyage Vitres', description: 'Vitres intérieures et extérieures', features: ['Accès difficile', 'Sans traces garanti', 'Bâtiments R+10'] },
      { name: 'Grand Nettoyage', description: 'Nettoyage en profondeur résidentiel', features: ['Cuisine dégraissée', 'Salle de bain désinfectée', 'Sol ciré'] },
      { name: 'Désinfection', description: 'Traitement anti-bactérien et virucide', features: ['Certifié COVID', 'Produits bio', 'Rapport de traitement'] },
      { name: 'Nettoyage Industriel', description: 'Entrepôts, usines, ateliers', features: ['Monobrosse industrielle', 'Aspirateur eau/poussière', 'Horaires de nuit'] },
      { name: 'Remise en État', description: 'Après travaux ou déménagement', features: ['Évacuation gravats', 'Nettoyage fin', 'Livraison clé en main'] }
    ],
    guarantees: [
      { title: 'Produits Écolabels', icon: 'leaf' },
      { title: 'Personnel Formé', icon: 'users' },
      { title: 'Intervention Fiable', icon: 'clock' },
      { title: 'Assurance RC Pro', icon: 'shield-check' }
    ],
    heroTitle: 'Société de Nettoyage', heroSubtitle: "Propreté professionnelle et écologique pour vos espaces",
    aboutText: "Entreprise de nettoyage depuis 15 ans, nos équipes formées interviennent avec rigueur et discrétion. Produits écolabels, matériel professionnel et engagement qualité.",
    ctaText: 'Demander un devis'
  },
  jardin: {
    primary: '#14532d', secondary: '#166534', accent: '#15803d', background: '#f0fdf4',
    services: [
      { name: 'Création de Jardins', description: 'Aménagement paysager complet', features: ['Plan sur mesure', 'Plantations adaptées', 'Gazon en rouleaux'] },
      { name: 'Tonte & Entretien', description: 'Pelouse et massifs entretenus', features: ['Tonte régulière', 'Taille haies', 'Désherbage manuel'] },
      { name: 'Élagage & Abattage', description: 'Arbres et arbustes sécurisés', features: ['Élagage raisonné', 'Grimper pro', 'Broyage branches'] },
      { name: 'Terrasses & Clôtures', description: 'Aménagement structure bois', features: ['Terrasse pin/ipé', 'Clôture occultation', 'Pergolas'] },
      { name: 'Arrosage Automatique', description: 'Installation système arrosage', features: ['Goutte à goutte', 'Tuyères enterrées', 'Programmateur connecté'] },
      { name: 'Potager & Verger', description: 'Création et entretien potager', features: ['Bacs surélevés', 'Compostage', 'Taille fruitiers'] }
    ],
    guarantees: [
      { title: 'Plantes Garanties', icon: 'sprout' },
      { title: 'Intervention Propre', icon: 'sparkles' },
      { title: 'Conseils Saisonniers', icon: 'sun' },
      { title: 'Paysagiste Qualifié', icon: 'tree-deciduous' }
    ],
    heroTitle: 'Jardinier Paysagiste', heroSubtitle: "Création et entretien de jardins uniques et harmonieux",
    aboutText: "Paysagiste passionné depuis 15 ans, je conçois et entretiens des espaces verts qui vivent au rythme des saisons.",
    ctaText: 'Demander un devis'
  },
  fitness: {
    primary: '#dc2626', secondary: '#b91c1c', accent: '#ef4444', background: '#fef2f2',
    services: [
      { name: 'Coaching Personnel', description: 'Accompagnement individuel sur mesure', features: ['Bilan morpho', 'Programme adapté', 'Suivi hebdo'] },
      { name: 'Cours Collectifs', description: 'Groupes dynamiques et motivants', features: ['HIIT', 'Yoga', 'Zumba', 'Musculation guidée'] },
      { name: 'Musculation Libre', description: 'Espace haltères et machines', features: ['Poids libres', 'Machines guidées', 'Cage à squat'] },
      { name: 'Cardio Zone', description: 'Équipements endurance modernes', features: ['Tapis connectés', 'Vélos elliptiques', 'Rameurs'] },
      { name: 'Préparation Physique', description: 'Prépa compétition ou remise en forme', features: ['Tests perf', 'Plan nutrition', 'Récupération'] },
      { name: 'Espace Bien-être', description: 'Détente après effort', features: ['Sauna', 'Douche jets', 'Casiers sécurisés'] }
    ],
    guarantees: [
      { title: 'Coachs Diplômés', icon: 'award' },
      { title: 'Matériel Neuf', icon: 'dumbbell' },
      { title: 'Sans Engagement', icon: 'badge-check' },
      { title: 'Accès 6h-23h', icon: 'clock' }
    ],
    heroTitle: 'Coach Sportif', heroSubtitle: "Votre coach personnel pour atteindre vos objectifs fitness",
    aboutText: "Coach sportif diplômé d'État avec 15 ans d'expérience. Programmes personnalisés pour perdre du poids, gagner en muscle ou préparer une compétition.",
    ctaText: 'Essai offert'
  },
  medical: {
    primary: '#1e40af', secondary: '#1e3a8a', accent: '#2563eb', background: '#eff6ff',
    services: [
      { name: 'Médecine Générale', description: 'Consultations et suivi de santé', features: ['Bilan annuel', 'Vaccinations', 'Certificats'] },
      { name: 'Kinésithérapie', description: 'Rééducation et réadaptation', features: ['Massages médicaux', 'Rééducation post-op', 'Posturologie'] },
      { name: 'Ostéopathie', description: 'Soins sans médicaments', features: ['Bébés', 'Femmes enceintes', 'Sportifs'] },
      { name: 'Infirmier à Domicile', description: 'Soins à votre domicile', features: ['Injections', 'Pansements', 'Prélèvements'] },
      { name: 'Analyses Biologiques', description: 'Laboratoire sur place', features: ['Prise de sang', 'Tests rapides', 'Résultats 24h'] },
      { name: 'Télémédecine', description: 'Consultation vidéo', features: ['Ordonnance électronique', '7j/7 disponible', 'Sans déplacement'] }
    ],
    guarantees: [
      { title: 'Conventionné Secteur 1', icon: 'stethoscope' },
      { title: '3ème Payant', icon: 'credit-card' },
      { title: 'RDV sous 48h', icon: 'calendar' },
      { title: 'Équipe Pluridisciplinaire', icon: 'users' }
    ],
    heroTitle: 'Cabinet Médical', heroSubtitle: "Votre santé entre les mains de professionnels qualifiés",
    aboutText: "Médecin généraliste depuis 15 ans, je vous accueille dans un cabinet moderne et chaleureux. Écoute, diagnostic précis et suivi personnalisé.",
    ctaText: 'Prendre rendez-vous'
  },
  avocat: {
    primary: '#1e3a8a', secondary: '#172554', accent: '#2563eb', background: '#f8fafc',
    services: [
      { name: 'Droit Civil & Famille', description: 'Divorce, succession, bail', features: ['Divorce amiable/contentieux', 'Régime matrimonial', 'Garde alternée'] },
      { name: 'Droit Pénal', description: 'Défense et assistance victimes', features: ['Garde à vue', 'Tribunal correctionnel', 'Victimes préjudice'] },
      { name: 'Droit du Travail', description: 'Licenciement et contentieux', features: ['Rupture conventionnelle', 'Harcèlement', "Prud'hommes"] },
      { name: 'Droit des Affaires', description: 'Conseil entreprises et particuliers', features: ['Création société', 'Contrats commerciaux', 'Recouvrement'] },
      { name: 'Immobilier', description: 'Vente, achat, litiges', features: ['Promesse vente', 'Copropriété', 'Malfaisance construction'] },
      { name: 'Droit Routier', description: 'Permis, accidents, infractions', features: ['Retrait permis', 'Excès vitesse', 'Défense pénale'] }
    ],
    guarantees: [
      { title: 'Avocat au Barreau', icon: 'scale' },
      { title: 'Consultation Privée', icon: 'shield' },
      { title: 'Défense Déterminée', icon: 'sword' },
      { title: 'Honoraires Transparent', icon: 'file-text' }
    ],
    heroTitle: 'Avocat à la Cour', heroSubtitle: "Conseil juridique personnalisé et défense de vos droits",
    aboutText: "Avocat inscrit au Barreau depuis 15 ans, je défends vos intérêts avec rigueur et détermination. Chaque dossier mérite une stratégie sur mesure.",
    ctaText: 'Prendre rendez-vous'
  },
  default: {
    primary: '#1e293b', secondary: '#334155', accent: '#475569', background: '#f8fafc',
    services: [
      { name: 'Prestation Sur Mesure', description: 'Services adaptés à vos besoins', features: ['Étude personnalisée', 'Devis détaillé', 'Écoute attentive'] },
      { name: 'Intervention Pro', description: 'Travail soigné et professionnel', features: ['Matériel adapté', 'Techniques actuelles', 'Respect des normes'] },
      { name: 'Conseil Expert', description: 'Accompagnement et recommandations', features: ['Diagnostic complet', 'Solutions pertinentes', 'Suivi personnalisé'] },
      { name: 'Service Rapide', description: 'Réactivité et respect des délais', features: ['Intervention rapide', 'Horaires flexibles', 'Urgences traitées'] },
      { name: 'Garantie Qualité', description: 'Engagement résultat et satisfaction', features: ['Contrôle qualité', 'Corrections incluses', 'SAV réactif'] },
      { name: 'Tarifs Transparents', description: 'Honoraires clairs et justifiés', features: ['Devis gratuit', 'Pas de surprise', 'Facilités paiement'] }
    ],
    guarantees: [
      { title: 'Artisan Certifié', icon: 'badge-check' },
      { title: 'Devis Gratuit', icon: 'file-text' },
      { title: 'Intervention Rapide', icon: 'clock' },
      { title: 'Satisfaction Garantie', icon: 'heart' }
    ],
    heroTitle: 'Artisan Professionnel', heroSubtitle: "Votre expert de confiance pour des prestations de qualité",
    aboutText: "Artisan passionné depuis 15 ans, je mets mon savoir-faire et mon expertise à votre service. Qualité, transparence et satisfaction sont mes priorités.",
    ctaText: 'Contactez-nous'
  }
};

function getUltimateTemplate(sector: string) {
  const s = (sector || '').toLowerCase();
  if (s.includes('nettoyag') || s.includes('propreté') || s.includes('ménage')) return SECTOR_ULTIMATE_TEMPLATES.nettoyage;
  if (s.includes('jardin') || s.includes('paysag') || s.includes('espaces verts')) return SECTOR_ULTIMATE_TEMPLATES.jardin;
  if (s.includes('coach') || s.includes('sport') || s.includes('fitness') || s.includes('salle')) return SECTOR_ULTIMATE_TEMPLATES.fitness;
  if (s.includes('médec') || s.includes('clinique') || s.includes('dentiste') || s.includes('santé')) return SECTOR_ULTIMATE_TEMPLATES.medical;
  if (s.includes('avocat') || s.includes('notaire') || s.includes('juridi') || s.includes('droit')) return SECTOR_ULTIMATE_TEMPLATES.avocat;
  if (s.includes('électricien') || s.includes('electricien') || s.includes('electric')) return SECTOR_ULTIMATE_TEMPLATES.electricien;
  if (s.includes('plomb') || s.includes('chauffage') || s.includes('clim')) return SECTOR_ULTIMATE_TEMPLATES.plomberie;
  if (s.includes('coiff') || s.includes('barb') || s.includes('salon')) return SECTOR_ULTIMATE_TEMPLATES.coiffeur;
  if (s.includes('restaurant') || s.includes('cuisin') || s.includes('traiteur')) return SECTOR_ULTIMATE_TEMPLATES.restaurant;
  if (s.includes('garage') || s.includes('mécan') || s.includes('auto') || s.includes('carrosserie')) return SECTOR_ULTIMATE_TEMPLATES.garage;
  if (s.includes('beauté') || s.includes('esthétique') || s.includes('spa')) return SECTOR_ULTIMATE_TEMPLATES.coiffeur;
  if (s.includes('boulanger') || s.includes('pâtissier')) return SECTOR_ULTIMATE_TEMPLATES.restaurant;
  return SECTOR_ULTIMATE_TEMPLATES.default;
}

function getLogoInfo(name: string, sector: string = 'default') {
  if (!name) return { initials: 'CO', text: 'Company', word1: 'Company', word2: 'Pro' };
  const skip = ['le', 'la', 'les', 'de', 'du', 'des', "l'", "d'", 'à', 'a', 'et', '&', 'en', 'pour'];
  const words = name.replace(/['']/g, "' ").split(/\s+/).filter(w => w.length > 0 && !skip.includes(w.toLowerCase()));
  let word1 = '', word2 = '';
  if (words.length === 1) {
    word1 = words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
    const lw = word1.toLowerCase(), s = sector.toLowerCase();
    if (s.includes('elec') && !lw.includes('elec')) word2 = 'Électricité';
    else if (s.includes('plomb') && !lw.includes('plomb')) word2 = 'Plomberie';
    else if ((s.includes('garage') || s.includes('auto')) && !lw.includes('auto') && !lw.includes('garage')) word2 = 'Automobile';
    else if (!lw.includes('service') && !lw.includes('pro')) word2 = 'Services';
  } else {
    word1 = words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
    word2 = words.slice(1).join(' ').charAt(0).toUpperCase() + words.slice(1).join(' ').slice(1).toLowerCase();
  }
  return { initials: word1.substring(0, 2).toUpperCase(), text: name, word1, word2 };
}

function getHeroBadge(sector: string): { icon: string; text: string } {
  const s = (sector || '').toLowerCase();
  if (s.includes('plomb')) return { icon: 'droplets', text: 'Dépannage rapide garanti' };
  if (s.includes('électricien') || s.includes('electric')) return { icon: 'zap', text: 'Électricien certifié' };
  if (s.includes('coiff') || s.includes('barb')) return { icon: 'scissors', text: 'Coiffeur professionnel' };
  if (s.includes('restaurant') || s.includes('cuisin')) return { icon: 'chef-hat', text: 'Chef qualifié' };
  if (s.includes('garage') || s.includes('mécan')) return { icon: 'wrench', text: 'Garage agréé' };
  if (s.includes('nettoy') || s.includes('ménage')) return { icon: 'sparkles', text: 'Service nettoyage pro' };
  if (s.includes('jardin') || s.includes('paysag')) return { icon: 'leaf', text: 'Jardinier expert' };
  if (s.includes('fitness') || s.includes('sport')) return { icon: 'dumbbell', text: 'Coach diplômé' };
  if (s.includes('médec') || s.includes('santé') || s.includes('dentiste')) return { icon: 'stethoscope', text: 'Professionnel de santé' };
  if (s.includes('avocat') || s.includes('juridi')) return { icon: 'scale', text: 'Avocat au barreau' };
  return { icon: 'badge-check', text: 'Professionnel certifié' };
}

export function generateUltimateSite(lead: any, aiContent?: any): string {
  const template = getUltimateTemplate(lead.sector);
  const companyName = lead.name || 'Entreprise Premium';
  const city = lead.city || '';
  const phone = lead.phone || '+33 6 12 34 56 78';
  const email = lead.email || 'contact@entreprise.fr';
  const address = lead.address || (city ? `Centre Ville, ${city}` : 'France');
  const rating = lead.googleRating || 5;
  const reviews = lead.googleReviews || 42;
  const description = generateAboutText(aiContent?.aboutText || lead.description || template.aboutText, lead);
  const heroTitle = aiContent?.heroTitle || template.heroTitle;
  const heroSubtitle = aiContent?.heroSubtitle || `${template.heroSubtitle}${city ? ' à ' + city : ''}`;
  let ctaText = aiContent?.cta || template.ctaText || 'Demander un devis';
  if (ctaText.length > 50) ctaText = ctaText.substring(0, 47) + '...';

  let finalServices = template.services;
  if (aiContent?.services && Array.isArray(aiContent.services) && aiContent.services.length > 0) {
    finalServices = aiContent.services.map((s: any, idx: number) => {
      let features = s.features;
      if (!features || features.length === 0) features = generateFeaturesFromService(s.name, s.description, lead.sector);
      return { name: s.name || `Service ${idx + 1}`, description: s.description || '', features: features.slice(0, 3) };
    });
  }

  let testimonials = (lead.googleReviewsData || []).map((review: any) => ({
    author: review.author || 'Client VIP', text: review.text || "Une prestation exceptionnelle.",
    rating: review.rating || 5, date: review.date || 'Récemment'
  }));
  const fallbackReviews = getSectorFallbackReviews(lead.sector);
  while (testimonials.length < 6) testimonials.push(fallbackReviews[testimonials.length % fallbackReviews.length]);
  testimonials = testimonials.slice(0, 6);

  let nameHash = 0;
  for (let i = 0; i < companyName.length; i++) nameHash += companyName.charCodeAt(i);
  const sloganVariations = ["L'excellence à votre service", "L'art de la perfection au quotidien", "Solutions premium sur-mesure", "Excellence & Passion", "Votre partenaire de confiance"];
  const finalSlogan = aiContent?.slogan || sloganVariations[nameHash % sloganVariations.length];

  const BLOCKED_KEYWORDS = ['food', 'fruit', 'legume', 'carrot', 'salmon', 'kitchen', 'cooking', 'recipe', 'meal', 'dessert', 'cake', 'pizza', 'burger', 'restaurant-menu'];
  const BLOCKED_DOMAINS = ['tripadvisor.com', 'yelp.com', 'facebook.com', 'instagram.com', 'pagesjaunes.fr'];
  const rawLeadImages = [...(lead.images || []), ...(lead.websiteImages || [])].filter(img => {
    if (!img || typeof img !== 'string' || !img.startsWith('https://')) return false;
    const low = img.toLowerCase();
    if (BLOCKED_KEYWORDS.some(kw => low.includes(kw))) return false;
    if (BLOCKED_DOMAINS.some(d => low.includes(d))) return false;
    if (low.includes('favicon') || low.includes('sprite') || low.includes('pixel')) return false;
    return true;
  });

  const sectorImages = getSectorImages(lead.sector);
  const combinedImages = [...rawLeadImages];
  while (combinedImages.length < 6) combinedImages.push(sectorImages[combinedImages.length % sectorImages.length]);

  let imageHash = 0;
  for (let i = 0; i < companyName.length; i++) { imageHash = ((imageHash << 5) - imageHash) + companyName.charCodeAt(i); imageHash |= 0; }
  imageHash = Math.abs(imageHash);
  const startIndex = imageHash % combinedImages.length;
  const heroImage = combinedImages[startIndex];
  const allImages = [];
  for (let i = 1; i <= 5; i++) allImages.push(combinedImages[(startIndex + i) % combinedImages.length]);

  const content: UltimateContent = {
    companyName, sector: lead.sector || 'Professionnel', city, description, phone, email, address,
    website: lead.website || '', rating, reviews, services: finalServices, testimonials,
    heroTitle, heroSubtitle, aboutText: description, ctaText, slogan: finalSlogan, heroImage, allImages
  };

  const layoutVariant = nameHash % 4;
  return buildUltimateHTML(content, template, combinedImages, layoutVariant);
}

export async function generateUltimateSiteAsync(lead: any, aiContent?: any): Promise<string> {
  const template = getUltimateTemplate(lead.sector);
  const companyName = lead.name || 'Entreprise Premium';
  const city = lead.city || '';
  const phone = lead.phone || '+33 6 12 34 56 78';
  const email = lead.email || 'contact@entreprise.fr';
  const address = lead.address || (city ? `Centre Ville, ${city}` : 'France');
  const rating = lead.googleRating || 5;
  const reviews = lead.googleReviews || 42;
  const description = generateAboutText(aiContent?.aboutText || lead.description || template.aboutText, lead);
  const heroTitle = aiContent?.heroTitle || template.heroTitle;
  const heroSubtitle = aiContent?.heroSubtitle || `${template.heroSubtitle}${city ? ' à ' + city : ''}`;
  let ctaText = aiContent?.cta || template.ctaText || 'Demander un devis';
  if (ctaText.length > 50) ctaText = ctaText.substring(0, 47) + '...';

  let nameHash = 0;
  for (let i = 0; i < companyName.length; i++) nameHash += companyName.charCodeAt(i);
  const sloganVariations = ["L'excellence à votre service", "L'art de la perfection au quotidien", "Solutions premium sur-mesure", "Excellence & Passion", "Votre partenaire de confiance"];
  const finalSlogan = aiContent?.slogan || sloganVariations[nameHash % sloganVariations.length];

  let combinedImages: string[] = [];
  try { combinedImages = await getImagesForLead(lead, 6); }
  catch { combinedImages = getSectorImages(lead.sector); }

  let imageHash = 0;
  for (let i = 0; i < companyName.length; i++) { imageHash = ((imageHash << 5) - imageHash) + companyName.charCodeAt(i); imageHash |= 0; }
  imageHash = Math.abs(imageHash);
  const startIndex = imageHash % (combinedImages.length || 1);
  const heroImage = combinedImages[startIndex] || '';
  const allImages = [];
  for (let i = 1; i <= 5; i++) allImages.push(combinedImages[(startIndex + i) % (combinedImages.length || 1)]);

  let finalServices = template.services;
  if (aiContent?.services && Array.isArray(aiContent.services) && aiContent.services.length > 0) {
    finalServices = aiContent.services.map((s: any, idx: number) => {
      let features = s.features;
      if (!features || features.length === 0) features = generateFeaturesFromService(s.name, s.description, lead.sector);
      return { name: s.name || `Service ${idx + 1}`, description: s.description || '', features: features.slice(0, 3) };
    });
  }

  let testimonials = (lead.googleReviewsData || []).map((review: any) => ({
    author: review.author || 'Client VIP', text: review.text || "Une prestation exceptionnelle.",
    rating: review.rating || 5, date: review.date || 'Récemment'
  }));
  const fallbackReviews = getSectorFallbackReviews(lead.sector);
  while (testimonials.length < 6) testimonials.push(fallbackReviews[testimonials.length % fallbackReviews.length]);
  testimonials = testimonials.slice(0, 6);

  const content: UltimateContent = {
    companyName, sector: lead.sector || 'Professionnel', city, description, phone, email, address,
    website: lead.website || '', rating, reviews, services: finalServices, testimonials,
    heroTitle, heroSubtitle, aboutText: description, ctaText, slogan: finalSlogan, heroImage, allImages
  };

  return buildUltimateHTML(content, template, combinedImages, nameHash % 4);
}

function buildUltimateHTML(content: UltimateContent, template: any, combinedImages: string[] = [], layoutVariant: number = 0): string {
  const { companyName, heroTitle, heroSubtitle, aboutText, services, testimonials, phone, email, address, website, city, ctaText, rating, reviews, slogan, heroImage, allImages } = content;
  const primaryColor = template.primary;
  const secondaryColor = template.secondary;
  const accentColor = template.accent;
  const hexToRgb = (hex: string) => { let r = 0, g = 0, b = 0; if (hex.length === 7) { r = parseInt(hex.substring(1, 3), 16); g = parseInt(hex.substring(3, 5), 16); b = parseInt(hex.substring(5, 7), 16); } return `${r}, ${g}, ${b}`; };
  const primaryRgb = hexToRgb(primaryColor);

  let nameHash = 0;
  for (let i = 0; i < companyName.length; i++) nameHash += companyName.charCodeAt(i);

  const logoInfo = getLogoInfo(companyName, content.sector);
  const heroBadge = getHeroBadge(content.sector);
  const cleanPhoneLink = phone ? phone.replace(/[^0-9+]/g, '') : '';
  const mapQuery = encodeURIComponent(address + (city ? ', ' + city : ''));

  const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="${primaryColor}"/><text x="50%" y="50%" font-family="sans-serif" font-size="45" font-weight="bold" fill="white" dominant-baseline="central" text-anchor="middle">${logoInfo.initials}</text></svg>`;
  const faviconDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(faviconSvg)}`;

  const companyHash = (() => { let h = 0; for (let i = 0; i < companyName.length; i++) { h = ((h << 5) - h) + companyName.charCodeAt(i); h |= 0; } return Math.abs(h); })();
  const emergencyFallback = combinedImages[0] || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80';
  const getImg = (slot: number): string => {
    const uniqueIndex = (companyHash + slot) % (combinedImages.length || 1);
    if (combinedImages[uniqueIndex] && combinedImages[uniqueIndex].startsWith('https://')) return combinedImages[uniqueIndex];
    if (allImages[slot % allImages.length] && allImages[slot % allImages.length].startsWith('https://')) return allImages[slot % allImages.length];
    return emergencyFallback;
  };
  const imgErr = (fallbackSlot: number) => `onerror="this.onerror=null;this.src='${getImg(fallbackSlot)}'"`;

  const fontPair = nameHash % 3;
  const headingFont = fontPair === 0 ? "'DM Sans'" : fontPair === 1 ? "'Plus Jakarta Sans'" : "'Satoshi'";

  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/svg+xml" href="${faviconDataUrl}">
    <title>${companyName} - ${content.sector} à ${city}</title>
    <meta name="description" content="${heroSubtitle}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="${website || '#'}">
    <meta property="og:type" content="website">
    <meta property="og:title" content="${companyName} - ${content.sector}">
    <meta property="og:description" content="${heroSubtitle}">
    <meta property="og:image" content="${heroImage}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${companyName}">
    <meta name="twitter:description" content="${heroSubtitle}">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>

    <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"LocalBusiness","name":"${companyName}","description":"${heroSubtitle}","image":"${heroImage}","telephone":"${phone}","email":"${email}","address":{"@type":"PostalAddress","streetAddress":"${address}","addressLocality":"${city}","addressCountry":"FR"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"${rating || 5}","reviewCount":"${reviews || 42}"}}}
    </script>

    <style>
        :root {
            --primary: ${primaryColor};
            --primary-rgb: ${primaryRgb};
            --secondary: ${secondaryColor};
            --accent: ${accentColor};
            --bg: #fafaf9;
            --surface: #ffffff;
            --text: #18181b;
            --text-secondary: #71717a;
            --text-tertiary: #a1a1aa;
            --border: #e4e4e7;
            --border-light: #f4f4f5;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        html { scroll-behavior: smooth; }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: var(--bg);
            color: var(--text);
            line-height: 1.7;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            overflow-x: hidden;
        }

        h1, h2, h3, h4, h5 { font-family: ${headingFont}, 'DM Sans', sans-serif; line-height: 1.2; }

        .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }

        /* ── NAVBAR ── */
        .navbar {
            position: fixed; top: 0; left: 0; right: 0; z-index: 100;
            padding: 20px 0;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .navbar.scrolled {
            background: rgba(255,255,255,0.92);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-bottom: 1px solid var(--border);
            padding: 12px 0;
        }
        .navbar-inner {
            max-width: 1200px; margin: 0 auto; padding: 0 24px;
            display: flex; justify-content: space-between; align-items: center;
        }
        .navbar-brand {
            display: flex; align-items: center; gap: 12px; text-decoration: none; color: var(--text);
        }
        .navbar-logo {
            width: 40px; height: 40px; border-radius: 10px;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            display: flex; align-items: center; justify-content: center;
            color: white; font-weight: 800; font-size: 14px; font-family: ${headingFont};
        }
        .navbar-name { font-weight: 700; font-size: 1.1rem; }
        .navbar-links { display: flex; align-items: center; gap: 32px; }
        .navbar-links a {
            text-decoration: none; color: var(--text-secondary); font-size: 0.9rem; font-weight: 500;
            transition: color 0.2s;
        }
        .navbar-links a:hover { color: var(--primary); }
        .navbar-cta {
            display: inline-flex; align-items: center; gap: 8px;
            background: var(--primary); color: white; padding: 10px 24px; border-radius: 8px;
            text-decoration: none; font-weight: 600; font-size: 0.9rem;
            transition: all 0.2s;
        }
        .navbar-cta:hover { opacity: 0.9; transform: translateY(-1px); }
        .mobile-toggle { display: none; background: none; border: none; cursor: pointer; padding: 8px; }
        .mobile-menu {
            display: none; position: absolute; top: 100%; left: 0; right: 0;
            background: white; border-bottom: 1px solid var(--border);
            padding: 16px 24px; box-shadow: 0 10px 40px rgba(0,0,0,0.08);
        }
        .mobile-menu.open { display: block; }
        .mobile-menu a {
            display: block; padding: 12px 0; text-decoration: none; color: var(--text);
            font-weight: 500; border-bottom: 1px solid var(--border-light);
        }
        .mobile-menu a:last-child { border: none; }

        @media (max-width: 768px) {
            .navbar-links { display: none !important; }
            .mobile-toggle { display: block; }
        }

        /* ── HERO ── */
        .hero {
            position: relative; min-height: 100vh; display: flex; align-items: center;
            overflow: hidden; background: #111;
        }
        .hero-bg {
            position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
            opacity: 0.55;
        }
        .hero-overlay {
            position: absolute; inset: 0;
            background: linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.5) 100%);
        }
        .hero-content {
            position: relative; z-index: 10; max-width: 1200px; margin: 0 auto; padding: 140px 24px 80px;
            width: 100%;
        }
        .hero-badge {
            display: inline-flex; align-items: center; gap: 8px;
            background: rgba(255,255,255,0.12); backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.18);
            padding: 8px 20px; border-radius: 100px;
            color: white; font-size: 0.85rem; font-weight: 600;
            margin-bottom: 24px; letter-spacing: 0.5px;
        }
        .hero h1 {
            font-size: clamp(2.5rem, 6vw, 4.5rem); font-weight: 800; color: white;
            margin-bottom: 20px; max-width: 700px; letter-spacing: -0.02em;
        }
        .hero h1 span { color: var(--accent); }
        .hero p {
            font-size: clamp(1rem, 2vw, 1.25rem); color: rgba(255,255,255,0.8);
            max-width: 560px; margin-bottom: 36px; line-height: 1.7;
        }
        .hero-actions { display: flex; flex-wrap: wrap; gap: 16px; align-items: center; }
        .btn-primary {
            display: inline-flex; align-items: center; gap: 10px;
            background: var(--primary); color: white; padding: 16px 32px; border-radius: 10px;
            text-decoration: none; font-weight: 700; font-size: 1rem;
            transition: all 0.3s; border: none; cursor: pointer;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(var(--primary-rgb), 0.35); }
        .btn-outline {
            display: inline-flex; align-items: center; gap: 10px;
            background: rgba(255,255,255,0.1); backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.25);
            color: white; padding: 16px 32px; border-radius: 10px;
            text-decoration: none; font-weight: 600; font-size: 1rem;
            transition: all 0.3s;
        }
        .btn-outline:hover { background: rgba(255,255,255,0.2); }
        .hero-rating {
            display: inline-flex; align-items: center; gap: 12px;
            margin-top: 40px; color: white;
        }
        .hero-rating-stars { display: flex; gap: 2px; color: #fbbf24; }
        .hero-rating-text { font-size: 0.9rem; color: rgba(255,255,255,0.7); }

        @media (max-width: 768px) {
            .hero { min-height: 85vh; }
            .hero-content { padding: 120px 20px 60px; }
            .hero-actions { flex-direction: column; align-items: stretch; }
            .btn-primary, .btn-outline { justify-content: center; }
        }

        /* ── TRUST BAR ── */
        .trust-bar {
            background: white; border-bottom: 1px solid var(--border);
            padding: 20px 0;
        }
        .trust-bar-inner {
            display: flex; justify-content: center; align-items: center; gap: 48px; flex-wrap: wrap;
        }
        .trust-item {
            display: flex; align-items: center; gap: 10px;
            font-size: 0.9rem; color: var(--text-secondary); font-weight: 500;
        }
        .trust-item i { color: var(--primary); }
        .trust-divider { width: 1px; height: 24px; background: var(--border); }

        @media (max-width: 768px) {
            .trust-bar-inner { gap: 16px; }
            .trust-divider { display: none; }
        }

        /* ── SECTIONS ── */
        .section { padding: 100px 0; }
        .section-alt { background: white; }
        .section-header { text-align: center; margin-bottom: 64px; }
        .section-header h2 {
            font-size: clamp(1.75rem, 4vw, 2.75rem); font-weight: 800; color: var(--text);
            margin-bottom: 16px; letter-spacing: -0.02em;
        }
        .section-header p {
            font-size: 1.1rem; color: var(--text-secondary); max-width: 560px; margin: 0 auto;
        }
        .section-label {
            display: inline-block; font-size: 0.8rem; font-weight: 700; text-transform: uppercase;
            letter-spacing: 2px; color: var(--primary); margin-bottom: 12px;
        }

        /* ── ABOUT ── */
        .about-grid {
            display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;
        }
        .about-image {
            border-radius: 16px; overflow: hidden; position: relative;
        }
        .about-image img {
            width: 100%; height: 420px; object-fit: cover; display: block;
        }
        .about-text h2 {
            font-size: clamp(1.5rem, 3vw, 2.25rem); font-weight: 800; margin-bottom: 20px;
        }
        .about-text p { color: var(--text-secondary); margin-bottom: 24px; font-size: 1.05rem; }
        .about-checks { list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .about-checks li {
            display: flex; align-items: center; gap: 10px; font-weight: 500; font-size: 0.95rem;
        }
        .about-checks i { color: var(--primary); flex-shrink: 0; }

        @media (max-width: 768px) {
            .about-grid { grid-template-columns: 1fr; gap: 40px; }
            .about-image img { height: 280px; }
        }

        /* ── STATS ── */
        .stats {
            background: var(--primary); padding: 60px 0;
            display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; text-align: center;
            color: white;
        }
        .stat-item h3 { font-size: 2.5rem; font-weight: 800; margin-bottom: 4px; font-family: ${headingFont}; }
        .stat-item p { font-size: 0.9rem; opacity: 0.8; font-weight: 500; }

        @media (max-width: 768px) {
            .stats { grid-template-columns: 1fr 1fr; padding: 40px 24px; gap: 24px; }
        }

        /* ── SERVICES ── */
        .services-grid {
            display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
        }
        .service-card {
            background: white; border: 1px solid var(--border); border-radius: 16px;
            padding: 36px 28px; transition: all 0.3s;
        }
        .service-card:hover {
            border-color: var(--primary);
            box-shadow: 0 8px 30px rgba(var(--primary-rgb), 0.08);
            transform: translateY(-4px);
        }
        .service-icon {
            width: 52px; height: 52px; border-radius: 12px;
            background: rgba(var(--primary-rgb), 0.08);
            display: flex; align-items: center; justify-content: center;
            color: var(--primary); margin-bottom: 20px;
        }
        .service-card h3 { font-size: 1.15rem; font-weight: 700; margin-bottom: 8px; }
        .service-card p { color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 16px; }
        .service-features { list-style: none; }
        .service-features li {
            display: flex; align-items: center; gap: 8px;
            font-size: 0.85rem; color: var(--text-secondary); padding: 4px 0;
        }
        .service-features i { color: var(--primary); width: 16px; height: 16px; flex-shrink: 0; }

        @media (max-width: 768px) {
            .services-grid { grid-template-columns: 1fr; }
        }

        /* ── GUARANTEES ── */
        .guarantees-grid {
            display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;
        }
        .guarantee-card {
            text-align: center; padding: 32px 20px; border-radius: 16px;
            background: white; border: 1px solid var(--border);
            transition: all 0.3s;
        }
        .guarantee-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.06); }
        .guarantee-icon {
            width: 56px; height: 56px; border-radius: 50%;
            background: rgba(var(--primary-rgb), 0.08);
            display: flex; align-items: center; justify-content: center;
            color: var(--primary); margin: 0 auto 16px;
        }
        .guarantee-card h3 { font-size: 1rem; font-weight: 700; }

        @media (max-width: 768px) {
            .guarantees-grid { grid-template-columns: 1fr 1fr; }
        }

        /* ── GALLERY ── */
        .gallery-grid {
            display: grid; grid-template-columns: 2fr 1fr 1fr; grid-template-rows: 250px 250px; gap: 12px;
        }
        .gallery-item { border-radius: 12px; overflow: hidden; position: relative; }
        .gallery-item-main { grid-row: 1 / -1; }
        .gallery-item img {
            width: 100%; height: 100%; object-fit: cover; display: block;
            transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .gallery-item:hover img { transform: scale(1.06); }
        @media (max-width: 768px) {
            .gallery-grid { grid-template-columns: 1fr 1fr; grid-template-rows: auto; }
            .gallery-item-main { grid-row: auto; }
            .gallery-item { aspect-ratio: 4/3; }
        }
        @media (max-width: 480px) {
            .gallery-grid { grid-template-columns: 1fr; }
        }

        /* ── TESTIMONIALS ── */
        .testimonials-grid {
            display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
        }
        .testimonial-card {
            background: white; border: 1px solid var(--border); border-radius: 16px;
            padding: 32px; display: flex; flex-direction: column; justify-content: space-between;
            transition: all 0.3s;
        }
        .testimonial-card:hover { box-shadow: 0 8px 30px rgba(0,0,0,0.06); }
        .testimonial-stars { display: flex; gap: 2px; color: #f59e0b; margin-bottom: 16px; }
        .testimonial-text {
            font-size: 1rem; color: var(--text); font-style: italic; line-height: 1.7;
            margin-bottom: 24px; flex-grow: 1;
        }
        .testimonial-author {
            display: flex; align-items: center; gap: 12px;
            border-top: 1px solid var(--border-light); padding-top: 20px;
        }
        .testimonial-avatar {
            width: 44px; height: 44px; border-radius: 50%;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            display: flex; align-items: center; justify-content: center;
            color: white; font-weight: 700; font-size: 1.1rem;
        }
        .testimonial-name { font-weight: 700; font-size: 0.95rem; }
        .testimonial-date { font-size: 0.8rem; color: var(--text-tertiary); }

        @media (max-width: 768px) {
            .testimonials-grid { grid-template-columns: 1fr; }
        }

        /* ── PROCESS ── */
        .process-grid {
            display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px;
            position: relative;
        }
        .process-step { text-align: center; position: relative; }
        .step-number {
            width: 56px; height: 56px; border-radius: 50%;
            border: 2px solid var(--primary); color: var(--primary);
            display: flex; align-items: center; justify-content: center;
            font-weight: 800; font-size: 1.2rem; margin: 0 auto 20px;
            font-family: ${headingFont};
        }
        .process-step h3 { font-size: 1.1rem; font-weight: 700; margin-bottom: 8px; }
        .process-step p { font-size: 0.9rem; color: var(--text-secondary); }

        @media (max-width: 768px) {
            .process-grid { grid-template-columns: 1fr 1fr; gap: 24px; }
        }

        /* ── CTA BANNER ── */
        .cta-banner {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            padding: 80px 0; text-align: center; color: white;
        }
        .cta-banner h2 {
            font-size: clamp(1.5rem, 3.5vw, 2.5rem); font-weight: 800; margin-bottom: 16px;
        }
        .cta-banner p { font-size: 1.1rem; opacity: 0.85; margin-bottom: 32px; max-width: 500px; margin-left: auto; margin-right: auto; }
        .cta-banner .btn-cta {
            display: inline-flex; align-items: center; gap: 10px;
            background: white; color: var(--primary); padding: 16px 36px; border-radius: 10px;
            text-decoration: none; font-weight: 700; font-size: 1rem;
            transition: all 0.3s;
        }
        .cta-banner .btn-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,0,0,0.2); }

        /* ── CONTACT ── */
        .contact-grid {
            display: grid; grid-template-columns: 1fr 1fr; gap: 0;
            border-radius: 16px; overflow: hidden; background: white;
            border: 1px solid var(--border);
        }
        .contact-form-side { padding: 48px; }
        .contact-form-side h3 { font-size: 1.5rem; font-weight: 800; margin-bottom: 8px; }
        .contact-form-side > p { color: var(--text-secondary); margin-bottom: 32px; }
        .form-group { margin-bottom: 20px; }
        .form-control {
            width: 100%; padding: 14px 18px; border-radius: 10px;
            border: 1px solid var(--border); background: var(--bg);
            font-family: 'Inter', sans-serif; font-size: 0.95rem;
            transition: all 0.2s; outline: none;
        }
        .form-control:focus { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.1); background: white; }
        .form-submit {
            width: 100%; padding: 14px; border-radius: 10px; border: none;
            background: var(--primary); color: white; font-weight: 700; font-size: 1rem;
            cursor: pointer; transition: all 0.2s;
            display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .form-submit:hover { opacity: 0.9; }
        .contact-info-side { background: var(--bg); padding: 48px; display: flex; flex-direction: column; gap: 24px; }
        .contact-info-item { display: flex; align-items: flex-start; gap: 14px; }
        .contact-info-icon {
            width: 44px; height: 44px; border-radius: 10px;
            background: rgba(var(--primary-rgb), 0.08);
            display: flex; align-items: center; justify-content: center;
            color: var(--primary); flex-shrink: 0;
        }
        .contact-info-label { font-size: 0.8rem; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 1px; font-weight: 600; }
        .contact-info-value { font-weight: 600; font-size: 0.95rem; margin-top: 2px; }
        .contact-map { border-radius: 12px; overflow: hidden; flex-grow: 1; min-height: 200px; margin-top: auto; }
        .contact-map iframe { width: 100%; height: 100%; min-height: 200px; border: none; }

        @media (max-width: 768px) {
            .contact-grid { grid-template-columns: 1fr; }
            .contact-form-side, .contact-info-side { padding: 32px 24px; }
        }

        /* ── FOOTER ── */
        footer {
            background: var(--text); color: white; padding: 64px 0 32px;
        }
        .footer-grid {
            display: grid; grid-template-columns: 2fr 1fr 1fr 1.5fr; gap: 48px;
            margin-bottom: 48px;
        }
        .footer-brand { font-size: 1.25rem; font-weight: 800; margin-bottom: 12px; font-family: ${headingFont}; }
        .footer-desc { font-size: 0.9rem; color: rgba(255,255,255,0.6); line-height: 1.7; margin-bottom: 20px; }
        .footer-social { display: flex; gap: 12px; }
        .footer-social a {
            width: 36px; height: 36px; border-radius: 8px;
            background: rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center;
            color: white; text-decoration: none; transition: background 0.2s;
        }
        .footer-social a:hover { background: rgba(255,255,255,0.2); }
        .footer-col h4 { font-size: 0.9rem; font-weight: 700; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px; }
        .footer-col ul { list-style: none; }
        .footer-col li { margin-bottom: 10px; }
        .footer-col a { color: rgba(255,255,255,0.6); text-decoration: none; font-size: 0.9rem; transition: color 0.2s; }
        .footer-col a:hover { color: white; }
        .footer-contact-item { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; color: rgba(255,255,255,0.6); font-size: 0.9rem; }
        .footer-contact-item i { color: var(--accent); }
        .footer-bottom {
            border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px;
            text-align: center; font-size: 0.85rem; color: rgba(255,255,255,0.4);
        }

        @media (max-width: 768px) {
            .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
        }
        @media (max-width: 480px) {
            .footer-grid { grid-template-columns: 1fr; }
        }

        /* ── SCROLL ANIMATIONS ── */
        .reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.8s ease, transform 0.8s ease; }
        .reveal.active { opacity: 1; transform: translateY(0); }
        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.2s; }
        .reveal-delay-3 { transition-delay: 0.3s; }
    </style>
</head>
<body>

    <!-- Navbar -->
    <nav class="navbar" id="navbar">
        <div class="navbar-inner">
            <a href="#" class="navbar-brand">
                <div class="navbar-logo">${logoInfo.initials}</div>
                <span class="navbar-name">${logoInfo.text}</span>
            </a>
            <div class="navbar-links">
                <a href="#about">À propos</a>
                <a href="#services">Services</a>
                <a href="#testimonials">Avis</a>
                <a href="#contact">Contact</a>
                ${phone ? `<a href="tel:${cleanPhoneLink}" class="navbar-cta"><i data-lucide="phone" width="16"></i> ${phone}</a>` : ''}
            </div>
            <button class="mobile-toggle" id="mobile-toggle" aria-label="Menu">
                <i data-lucide="menu" width="24" height="24" style="color: var(--text);"></i>
            </button>
        </div>
        <div class="mobile-menu" id="mobile-menu">
            <a href="#about">À propos</a>
            <a href="#services">Services</a>
            <a href="#testimonials">Avis</a>
            <a href="#contact">Contact</a>
            ${phone ? `<a href="tel:${cleanPhoneLink}" style="color: var(--primary); font-weight: 700;">${phone}</a>` : ''}
        </div>
    </nav>

    <!-- Hero -->
    <section class="hero" id="hero">
        <img src="${heroImage}" ${imgErr(0)} alt="${companyName}" class="hero-bg">
        <div class="hero-overlay"></div>
        <div class="hero-content">
            <div class="hero-badge"><i data-lucide="${heroBadge.icon}" width="16"></i> ${heroBadge.text}</div>
            <h1>${heroTitle}</h1>
            <p>${heroSubtitle}</p>
            <div class="hero-actions">
                <a href="#contact" class="btn-primary">${ctaText} <i data-lucide="arrow-right" width="18"></i></a>
                ${phone ? `<a href="tel:${cleanPhoneLink}" class="btn-outline"><i data-lucide="phone" width="18"></i> Nous appeler</a>` : ''}
            </div>
            <div class="hero-rating">
                <div class="hero-rating-stars">
                    <i data-lucide="star" fill="currentColor" width="18"></i>
                    <i data-lucide="star" fill="currentColor" width="18"></i>
                    <i data-lucide="star" fill="currentColor" width="18"></i>
                    <i data-lucide="star" fill="currentColor" width="18"></i>
                    <i data-lucide="star" fill="currentColor" width="18" ${(rating || 0) < 5 ? 'opacity="0.4"' : ''}></i>
                </div>
                <span class="hero-rating-text">${rating}/5 — ${reviews} avis Google</span>
            </div>
        </div>
    </section>

    <!-- Trust Bar -->
    <div class="trust-bar">
        <div class="trust-bar-inner">
            <div class="trust-item"><i data-lucide="star" fill="currentColor" width="16"></i> Note ${rating}/5 sur Google</div>
            <div class="trust-divider"></div>
            <div class="trust-item"><i data-lucide="shield-check" width="16"></i> Professionnel certifié</div>
            <div class="trust-divider"></div>
            <div class="trust-item"><i data-lucide="clock" width="16"></i> Intervention rapide</div>
            <div class="trust-divider"></div>
            <div class="trust-item"><i data-lucide="map-pin" width="16"></i> Basé à ${city || 'votre région'}</div>
        </div>
    </div>

    <!-- About -->
    <section class="section" id="about">
        <div class="container">
            <div class="about-grid">
                <div class="about-image reveal">
                    <img src="${getImg(1)}" ${imgErr(1)} alt="${companyName}">
                </div>
                <div class="about-text reveal">
                    <span class="section-label">Qui sommes-nous</span>
                    <h2>Un professionnel de confiance à votre service</h2>
                    <p>${aboutText}</p>
                    <ul class="about-checks">
                        <li><i data-lucide="check-circle-2" width="18"></i> Expertise reconnue</li>
                        <li><i data-lucide="check-circle-2" width="18"></i> Solutions sur-mesure</li>
                        <li><i data-lucide="check-circle-2" width="18"></i> Devis gratuit</li>
                        <li><i data-lucide="check-circle-2" width="18"></i> Réactivité garantie</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- Stats -->
    <div class="stats">
        <div class="stat-item">
            <h3>${reviews || '100+'}</h3>
            <p>Avis Vérifiés</p>
        </div>
        <div class="stat-item">
            <h3>${rating}/5</h3>
            <p>Note Google</p>
        </div>
        <div class="stat-item">
            <h3>15+</h3>
            <p>Années d'Expérience</p>
        </div>
        <div class="stat-item">
            <h3>100%</h3>
            <p>Satisfaction Client</p>
        </div>
    </div>

    <!-- Services -->
    <section class="section section-alt" id="services">
        <div class="container">
            <div class="section-header reveal">
                <span class="section-label">Nos services</span>
                <h2>Des prestations de qualité</h2>
                <p>Des interventions professionnelles réalisées dans le respect des normes et des délais.</p>
            </div>
            <div class="services-grid">
                ${services.map((s, i) => `
                <div class="service-card reveal reveal-delay-${(i % 3) + 1}">
                    <div class="service-icon"><i data-lucide="${['zap', 'wrench', 'home', 'shield-check', 'settings', 'check-circle'][i % 6]}" width="24"></i></div>
                    <h3>${s.name}</h3>
                    <p>${s.description}</p>
                    <ul class="service-features">
                        ${s.features.map(f => `<li><i data-lucide="check" width="14"></i> ${f}</li>`).join('')}
                    </ul>
                </div>`).join('')}
            </div>
        </div>
    </section>

    <!-- Guarantees -->
    <section class="section">
        <div class="container">
            <div class="section-header reveal">
                <span class="section-label">Nos engagements</span>
                <h2>Nos garanties</h2>
                <p>Les engagements qui font la différence pour votre tranquillité d'esprit.</p>
            </div>
            <div class="guarantees-grid">
                ${template.guarantees.map((g: any, i: number) => `
                <div class="guarantee-card reveal reveal-delay-${(i % 4) + 1}">
                    <div class="guarantee-icon"><i data-lucide="${g.icon}" width="24"></i></div>
                    <h3>${g.title}</h3>
                </div>`).join('')}
            </div>
        </div>
    </section>

    <!-- Gallery -->
    <section class="section section-alt">
        <div class="container">
            <div class="section-header reveal">
                <span class="section-label">Réalisations</span>
                <h2>Nos dernières interventions</h2>
                <p>Découvrez quelques-unes de nos réalisations récentes.</p>
            </div>
            <div class="gallery-grid reveal">
                <div class="gallery-item gallery-item-main">
                    <img src="${getImg(1)}" ${imgErr(1)} alt="Réalisation ${companyName}" loading="lazy">
                </div>
                <div class="gallery-item">
                    <img src="${getImg(2)}" ${imgErr(2)} alt="Réalisation ${companyName}" loading="lazy">
                </div>
                <div class="gallery-item">
                    <img src="${getImg(3)}" ${imgErr(3)} alt="Réalisation ${companyName}" loading="lazy">
                </div>
                <div class="gallery-item">
                    <img src="${getImg(4)}" ${imgErr(4)} alt="Réalisation ${companyName}" loading="lazy">
                </div>
                <div class="gallery-item">
                    <img src="${getImg(5)}" ${imgErr(5)} alt="Réalisation ${companyName}" loading="lazy">
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials -->
    <section class="section" id="testimonials">
        <div class="container">
            <div class="section-header reveal">
                <span class="section-label">Témoignages</span>
                <h2>Ce que disent nos clients</h2>
                <p>Des retours authentiques de clients satisfaits.</p>
            </div>
            <div class="testimonials-grid">
                ${testimonials.map((t, i) => `
                <div class="testimonial-card reveal reveal-delay-${(i % 3) + 1}">
                    <div>
                        <div class="testimonial-stars">${Array(t.rating).fill('<i data-lucide="star" fill="currentColor" width="16"></i>').join('')}</div>
                        <p class="testimonial-text">"${t.text}"</p>
                    </div>
                    <div class="testimonial-author">
                        <div class="testimonial-avatar">${t.author.charAt(0)}</div>
                        <div>
                            <div class="testimonial-name">${t.author}</div>
                            ${t.date ? `<div class="testimonial-date">${t.date}</div>` : ''}
                        </div>
                    </div>
                </div>`).join('')}
            </div>
        </div>
    </section>

    <!-- Process -->
    <section class="section section-alt" id="process">
        <div class="container">
            <div class="section-header reveal">
                <span class="section-label">Notre démarche</span>
                <h2>Comment nous travaillons</h2>
                <p>Un processus clair et transparent en 4 étapes.</p>
            </div>
            <div class="process-grid">
                <div class="process-step reveal">
                    <div class="step-number">1</div>
                    <h3>Prise de contact</h3>
                    <p>Nous étudions votre besoin et définissons les priorités ensemble.</p>
                </div>
                <div class="process-step reveal reveal-delay-1">
                    <div class="step-number">2</div>
                    <h3>Devis détaillé</h3>
                    <p>Un chiffrage précis et transparent, sans aucun frais caché.</p>
                </div>
                <div class="process-step reveal reveal-delay-2">
                    <div class="step-number">3</div>
                    <h3>Réalisation</h3>
                    <p>Intervention par nos experts qualifiés dans les délais convenus.</p>
                </div>
                <div class="process-step reveal reveal-delay-3">
                    <div class="step-number">4</div>
                    <h3>Suivi qualité</h3>
                    <p>Nous nous assurons de votre entière satisfaction après livraison.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Banner -->
    <section class="cta-banner">
        <div class="container reveal">
            <h2>Prêt à démarrer votre projet ?</h2>
            <p>Contactez-nous dès maintenant pour un devis gratuit et personnalisé.</p>
            <a href="#contact" class="btn-cta">${ctaText} <i data-lucide="arrow-right" width="18"></i></a>
        </div>
    </section>

    <!-- Contact -->
    <section class="section" id="contact">
        <div class="container">
            <div class="contact-grid reveal">
                <div class="contact-form-side">
                    <h3>Envoyez-nous un message</h3>
                    <p>Nous vous répondrons dans les plus brefs délais.</p>
                    <form onsubmit="event.preventDefault(); this.querySelector('button').textContent='Message envoyé ✓'; this.querySelector('button').style.background='#16a34a';">
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Votre nom complet" required>
                        </div>
                        <div class="form-group">
                            <input type="email" class="form-control" placeholder="Votre adresse e-mail" required>
                        </div>
                        <div class="form-group">
                            <input type="tel" class="form-control" placeholder="Votre téléphone">
                        </div>
                        <div class="form-group">
                            <textarea class="form-control" rows="4" placeholder="Décrivez votre besoin..." required></textarea>
                        </div>
                        <button type="submit" class="form-submit">
                            <i data-lucide="send" width="18"></i> Envoyer la demande
                        </button>
                    </form>
                </div>
                <div class="contact-info-side">
                    <div class="contact-info-item">
                        <div class="contact-info-icon"><i data-lucide="phone" width="20"></i></div>
                        <div>
                            <div class="contact-info-label">Téléphone</div>
                            <div class="contact-info-value"><a href="tel:${cleanPhoneLink}" style="color: inherit; text-decoration: none;">${phone}</a></div>
                        </div>
                    </div>
                    <div class="contact-info-item">
                        <div class="contact-info-icon"><i data-lucide="mail" width="20"></i></div>
                        <div>
                            <div class="contact-info-label">Email</div>
                            <div class="contact-info-value"><a href="mailto:${email}" style="color: inherit; text-decoration: none;">${email}</a></div>
                        </div>
                    </div>
                    <div class="contact-info-item">
                        <div class="contact-info-icon"><i data-lucide="map-pin" width="20"></i></div>
                        <div>
                            <div class="contact-info-label">Adresse</div>
                            <div class="contact-info-value">${address}</div>
                        </div>
                    </div>
                    <div class="contact-map">
                        <iframe src="https://maps.google.com/maps?q=${mapQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <div class="container">
            <div class="footer-grid">
                <div>
                    <div class="footer-brand">${logoInfo.text}</div>
                    <p class="footer-desc">${aboutText.substring(0, 140)}...</p>
                    <div class="footer-social">
                        <a href="#"><i data-lucide="facebook" width="16"></i></a>
                        <a href="#"><i data-lucide="instagram" width="16"></i></a>
                        <a href="#"><i data-lucide="linkedin" width="16"></i></a>
                    </div>
                </div>
                <div class="footer-col">
                    <h4>Services</h4>
                    <ul>
                        ${services.slice(0, 4).map(s => `<li><a href="#services">${s.name}</a></li>`).join('')}
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Navigation</h4>
                    <ul>
                        <li><a href="#about">À propos</a></li>
                        <li><a href="#testimonials">Avis clients</a></li>
                        <li><a href="#process">Notre démarche</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Contact</h4>
                    ${phone ? `<div class="footer-contact-item"><i data-lucide="phone" width="14"></i> ${phone}</div>` : ''}
                    ${email ? `<div class="footer-contact-item"><i data-lucide="mail" width="14"></i> ${email}</div>` : ''}
                    ${address ? `<div class="footer-contact-item"><i data-lucide="map-pin" width="14"></i> ${address}</div>` : ''}
                </div>
            </div>
            <div class="footer-bottom">
                &copy; ${new Date().getFullYear()} ${companyName}. Tous droits réservés. Propulsé par Services-Siteup.
            </div>
        </div>
    </footer>

    <!-- Scripts -->
    <script>
        lucide.createIcons();

        // Navbar scroll
        window.addEventListener('scroll', () => {
            document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
        });

        // Mobile menu
        const toggle = document.getElementById('mobile-toggle');
        const menu = document.getElementById('mobile-menu');
        toggle.addEventListener('click', () => menu.classList.toggle('open'));
        menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
        document.addEventListener('click', (e) => {
            if (!menu.contains(e.target) && !toggle.contains(e.target)) menu.classList.remove('open');
        });

        // Scroll reveal
        const reveals = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) { entry.target.classList.add('active'); observer.unobserve(entry.target); }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        reveals.forEach(el => observer.observe(el));
    </script>
</body>
</html>`;
}
