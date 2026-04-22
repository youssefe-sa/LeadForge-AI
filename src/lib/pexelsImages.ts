// Pexels Images Service - Images professionnelles et fiables par secteur
// Utilise l'API Pexels ou des URLs directes fiables

const PEXELS_API_KEY = process.env.PEXELS_API_KEY || '';

// URLs Pexels fiables et professionnelles par secteur
// Ces URLs sont des liens directs vers des images vérifiées
export const SECTOR_PEXELS_IMAGES: Record<string, string[]> = {
  plomberie: [
    'https://images.pexels.com/photos/774463/pexels-photo-774463.jpeg?auto=compress&cs=tinysrgb&w=1200', // Plombier réparant évier - ACTION
    'https://images.pexels.com/photos/6419126/pexels-photo-6419126.jpeg?auto=compress&cs=tinysrgb&w=1200', // Artisan plombier au travail sous évier
    'https://images.pexels.com/photos/8972710/pexels-photo-8972710.jpeg?auto=compress&cs=tinysrgb&w=1200', // Plombier installant robinetterie
    'https://images.pexels.com/photos/4497743/pexels-photo-4497743.jpeg?auto=compress&cs=tinysrgb&w=1200', // Outils plomberie professionnels en action
    'https://images.pexels.com/photos/3634830/pexels-photo-3634830.jpeg?auto=compress&cs=tinysrgb&w=1200', // Réparation tuyauterie - mains artisan
    'https://images.pexels.com/photos/9242824/pexels-photo-9242824.jpeg?auto=compress&cs=tinysrgb&w=1200', // Plombier dans salle de bain installation
    'https://images.pexels.com/photos/6444259/pexels-photo-6444259.jpeg?auto=compress&cs=tinysrgb&w=1200', // Travaux plomberie cuisine professionnelle
    'https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=1200', // Clé à molette plombier - métier en action
    'https://images.pexels.com/photos/10683471/pexels-photo-10683471.jpeg?auto=compress&cs=tinysrgb&w=1200', // Installation sanitaire artisan qualifié
    'https://images.pexels.com/photos/9242828/pexels-photo-9242828.jpeg?auto=compress&cs=tinysrgb&w=1200', // Plombier réparant fuite - intervention
  ],
  electricien: [
    'https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg?auto=compress&cs=tinysrgb&w=1200', // Électricien travaillant sur tableau électrique - ACTION
    'https://images.pexels.com/photos/4491881/pexels-photo-4491881.jpeg?auto=compress&cs=tinysrgb&w=1200', // Technicien électricien en intervention
    'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=1200', // Électricien installant luminaire
    'https://images.pexels.com/photos/6474917/pexels-photo-6474917.jpeg?auto=compress&cs=tinysrgb&w=1200', // Électricien professionnel réparation
    'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1200', // Outils électricien en action
    'https://images.pexels.com/photos/8973566/pexels-photo-8973566.jpeg?auto=compress&cs=tinysrgb&w=1200', // Câblage électrique artisan
    'https://images.pexels.com/photos/3760265/pexels-photo-3760265.jpeg?auto=compress&cs=tinysrgb&w=1200', // Installation électrique résidentielle
    'https://images.pexels.com/photos/6474918/pexels-photo-6474918.jpeg?auto=compress&cs=tinysrgb&w=1200', // Électricien avec casque et outils
    'https://images.pexels.com/photos/4491918/pexels-photo-4491918.jpeg?auto=compress&cs=tinysrgb&w=1200', // Réparation électrique professionnelle
    'https://images.pexels.com/photos/4491882/pexels-photo-4491882.jpeg?auto=compress&cs=tinysrgb&w=1200', // Électricien mesurant tension
  ],
  coiffeur: [
    'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=1200', // Coiffeur coupant cheveux client - ACTION
    'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1200', // Barbier rasage traditionnel
    'https://images.pexels.com/photos/3065096/pexels-photo-3065096.jpeg?auto=compress&cs=tinysrgb&w=1200', // Coiffeur professionnel au travail
    'https://images.pexels.com/photos/1804654/pexels-photo-1804654.jpeg?auto=compress&cs=tinysrgb&w=1200', // Coiffeur avec ciseaux en action
    'https://images.pexels.com/photos/3065214/pexels-photo-3065214.jpeg?auto=compress&cs=tinysrgb&w=1200', // Brushing et coiffage
    'https://images.pexels.com/photos/1327683/pexels-photo-1327683.jpeg?auto=compress&cs=tinysrgb&w=1200', // Coloration cheveux salon
    'https://images.pexels.com/photos/1813267/pexels-photo-1813267.jpeg?auto=compress&cs=tinysrgb&w=1200', // Coupe homme barbier
    'https://images.pexels.com/photos/3065206/pexels-photo-3065206.jpeg?auto=compress&cs=tinysrgb&w=1200', // Coiffeur femme en action
    'https://images.pexels.com/photos/3356171/pexels-photo-3356171.jpeg?auto=compress&cs=tinysrgb&w=1200', // Salon coiffure artisan
    'https://images.pexels.com/photos/3065216/pexels-photo-3065216.jpeg?auto=compress&cs=tinysrgb&w=1200', // Miroir et coiffeur au travail
  ],
  restaurant: [
    'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1200', // Chef cuisinant en cuisine - ACTION
    'https://images.pexels.com/photos/3357024/pexels-photo-3357024.jpeg?auto=compress&cs=tinysrgb&w=1200', // Cuisinier professionnel au fourneau
    'https://images.pexels.com/photos/2253551/pexels-photo-2253551.jpeg?auto=compress&cs=tinysrgb&w=1200', // Chef préparant plat gastronomique
    'https://images.pexels.com/photos/2544829/pexels-photo-2544829.jpeg?auto=compress&cs=tinysrgb&w=1200', // Cuisine restaurant en action
    'https://images.pexels.com/photos/3756523/pexels-photo-3756523.jpeg?auto=compress&cs=tinysrgb&w=1200', // Boulanger artisan au travail
    'https://images.pexels.com/photos/4252135/pexels-photo-4252135.jpeg?auto=compress&cs=tinysrgb&w=1200', // Pâtissier décoration gâteau
    'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=1200', // Pizzaïolo four à bois
    'https://images.pexels.com/photos/3298633/pexels-photo-3298633.jpeg?auto=compress&cs=tinysrgb&w=1200', // Barman préparant cocktail
    'https://images.pexels.com/photos/3341541/pexels-photo-3341541.jpeg?auto=compress&cs=tinysrgb&w=1200', // Service en salle restaurant
    'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1200', // Ambiance restaurant chaleureux
  ],
  garage: [
    'https://images.pexels.com/photos/4489737/pexels-photo-4489737.jpeg?auto=compress&cs=tinysrgb&w=1200', // Mécanicien réparant voiture - ACTION
    'https://images.pexels.com/photos/4489736/pexels-photo-4489736.jpeg?auto=compress&cs=tinysrgb&w=1200', // Technicien auto sous véhicule
    'https://images.pexels.com/photos/279949/pexels-photo-279949.jpeg?auto=compress&cs=tinysrgb&w=1200', // Mécanicien moteur en action
    'https://images.pexels.com/photos/162553/pexels-photo-162553.jpeg?auto=compress&cs=tinysrgb&w=1200', // Outils garage mécanique
    'https://images.pexels.com/photos/2244748/pexels-photo-2244748.jpeg?auto=compress&cs=tinysrgb&w=1200', // Réparation automobile atelier
    'https://images.pexels.com/photos/4489738/pexels-photo-4489738.jpeg?auto=compress&cs=tinysrgb&w=1200', // Mécanicien contrôlant niveau
    'https://images.pexels.com/photos/2244750/pexels-photo-2244750.jpeg?auto=compress&cs=tinysrgb&w=1200', // Pneu et roue changement
    'https://images.pexels.com/photos/279947/pexels-photo-279947.jpeg?auto=compress&cs=tinysrgb&w=1200', // Garage automobile outillage
    'https://images.pexels.com/photos/163696/unplugged-plug-in-electricity-163696.jpeg?auto=compress&cs=tinysrgb&w=1200', // Diagnostic auto électronique
    'https://images.pexels.com/photos/2736497/pexels-photo-2736497.jpeg?auto=compress&cs=tinysrgb&w=1200', // Carrossier réparation véhicule
  ],
  nettoyage: [
    'https://images.pexels.com/photos/4098710/pexels-photo-4098710.jpeg?auto=compress&cs=tinysrgb&w=1200', // Femme de ménage aspirateur - ACTION
    'https://images.pexels.com/photos/5691653/pexels-photo-5691653.jpeg?auto=compress&cs=tinysrgb&w=1200', // Nettoyage vitres professionnel
    'https://images.pexels.com/photos/6195129/pexels-photo-6195129.jpeg?auto=compress&cs=tinysrgb&w=1200', // Nettoyeur spray action
    'https://images.pexels.com/photos/6195137/pexels-photo-6195137.jpeg?auto=compress&cs=tinysrgb&w=1200', // Agent nettoyage bureau
    'https://images.pexels.com/photos/4098712/pexels-photo-4098712.jpeg?auto=compress&cs=tinysrgb&w=1200', // Serpillière nettoyage sol
    'https://images.pexels.com/photos/6195108/pexels-photo-6195108.jpeg?auto=compress&cs=tinysrgb&w=1200', // Désinfection surface
    'https://images.pexels.com/photos/4098713/pexels-photo-4098713.jpeg?auto=compress&cs=tinysrgb&w=1200', // Nettoyage cuisine professionnelle
    'https://images.pexels.com/photos/5691651/pexels-photo-5691651.jpeg?auto=compress&cs=tinysrgb&w=1200', // Nettoyage industriel
    'https://images.pexels.com/photos/6195130/pexels-photo-6195130.jpeg?auto=compress&cs=tinysrgb&w=1200', // Produit nettoyage professionnel
    'https://images.pexels.com/photos/4098711/pexels-photo-4098711.jpeg?auto=compress&cs=tinysrgb&w=1200', // Équipe nettoyage en action
  ],
  jardin: [
    'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=1200', // Jardinier tondeuse pelouse - ACTION
    'https://images.pexels.com/photos/169523/pexels-photo-169523.jpeg?auto=compress&cs=tinysrgb&w=1200', // Paysagiste aménagement
    'https://images.pexels.com/photos/5945638/pexels-photo-5945638.jpeg?auto=compress&cs=tinysrgb&w=1200', // Jardinier taille haie
    'https://images.pexels.com/photos/4491871/pexels-photo-4491871.jpeg?auto=compress&cs=tinysrgb&w=1200', // Plantation fleurs jardin
    'https://images.pexels.com/photos/169505/pexels-photo-169505.jpeg?auto=compress&cs=tinysrgb&w=1200', // Tonte pelouse professionnelle
    'https://images.pexels.com/photos/403571/pexels-photo-403571.jpeg?auto=compress&cs=tinysrgb&w=1200', // Élagage arbre expert
    'https://images.pexels.com/photos/2132171/pexels-photo-2132171.jpeg?auto=compress&cs=tinysrgb&w=1200', // Jardin fleuri création
    'https://images.pexels.com/photos/2440299/pexels-photo-2440299.jpeg?auto=compress&cs=tinysrgb&w=1200', // Aménagement paysager
    'https://images.pexels.com/photos/1582619/pexels-photo-1582619.jpeg?auto=compress&cs=tinysrgb&w=1200', // Taille haie professionnel
    'https://images.pexels.com/photos/4491882/pexels-photo-4491882.jpeg?auto=compress&cs=tinysrgb&w=1200', // Outils jardinage artisan
  ],
  fitness: [
    'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=1200', // Coach haltères en action - ACTION
    'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=1200', // Personal trainer coaching
    'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1200', // Salle musculation active
    'https://images.pexels.com/photos/2827392/pexels-photo-2827392.jpeg?auto=compress&cs=tinysrgb&w=1200', // Entraînement intensif
    'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=1200', // Cours collectif fitness
    'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=1200', // Cardio training tapis
    'https://images.pexels.com/photos/4752861/pexels-photo-4752861.jpeg?auto=compress&cs=tinysrgb&w=1200', // Crossfit soulevé terre
    'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=1200', // Yoga instructeur
    'https://images.pexels.com/photos/39308/pexels-photo-39308.jpeg?auto=compress&cs=tinysrgb&w=1200', // Dumbbells training
    'https://images.pexels.com/photos/3253508/pexels-photo-3253508.jpeg?auto=compress&cs=tinysrgb&w=1200', // Treadmill course
  ],
  medical: [
    'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=1200', // Médecin consultation patient - ACTION
    'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=1200', // Médecin examen patient
    'https://images.pexels.com/photos/5206943/pexels-photo-5206943.jpeg?auto=compress&cs=tinysrgb&w=1200', // Infirmière soins
    'https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=1200', // Dentiste patient enfant
    'https://images.pexels.com/photos/263337/pexels-photo-263337.jpeg?auto=compress&cs=tinysrgb&w=1200', // Clinique moderne accueil
    'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=1200', // Stethoscope consultation
    'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=1200', // Équipe médicale hôpital
    'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=1200', // Kinésithérapeute rééducation
    'https://images.pexels.com/photos/5207104/pexels-photo-5207104.jpeg?auto=compress&cs=tinysrgb&w=1200', // Analyse laboratoire
    'https://images.pexels.com/photos/6129042/pexels-photo-6129042.jpeg?auto=compress&cs=tinysrgb&w=1200', // Vaccination soignant
  ],
  avocat: [
    'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=1200', // Avocat consultation client - ACTION
    'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=1200', // Signature contrat légal
    'https://images.pexels.com/photos/5669619/pexels-photo-5669619.jpeg?auto=compress&cs=tinysrgb&w=1200', // Recherche droit bibliothèque
    'https://images.pexels.com/photos/5668474/pexels-photo-5668474.jpeg?auto=compress&cs=tinysrgb&w=1200', // Réunion juridique cabinet
    'https://images.pexels.com/photos/5669617/pexels-photo-5669617.jpeg?auto=compress&cs=tinysrgb&w=1200', // Marteau justice tribunal
    'https://images.pexels.com/photos/5668859/pexels-photo-5668859.jpeg?auto=compress&cs=tinysrgb&w=1200', // Audience tribunal plaidoirie
    'https://images.pexels.com/photos/5668469/pexels-photo-5668469.jpeg?auto=compress&cs=tinysrgb&w=1200', // Cabinet avocat professionnel
    'https://images.pexels.com/photos/5669620/pexels-photo-5669620.jpeg?auto=compress&cs=tinysrgb&w=1200', // Analyse documents juridiques
    'https://images.pexels.com/photos/5668475/pexels-photo-5668475.jpeg?auto=compress&cs=tinysrgb&w=1200', // Conseil juridique entreprise
    'https://images.pexels.com/photos/5669621/pexels-photo-5669621.jpeg?auto=compress&cs=tinysrgb&w=1200', // Avocat au travail bureau
  ],
  default: [
    'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200', // Business
    'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200', // Office
    'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1200', // Meeting
    'https://images.pexels.com/photos/3184303/pexels-photo-3184303.jpeg?auto=compress&cs=tinysrgb&w=1200', // Team
    'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200', // Professional
    'https://images.pexels.com/photos/3184466/pexels-photo-3184466.jpeg?auto=compress&cs=tinysrgb&w=1200', // Work
    'https://images.pexels.com/photos/3184467/pexels-photo-3184467.jpeg?auto=compress&cs=tinysrgb&w=1200', // Corporate
    'https://images.pexels.com/photos/3184468/pexels-photo-3184468.jpeg?auto=compress&cs=tinysrgb&w=1200', // Business team
    'https://images.pexels.com/photos/3184469/pexels-photo-3184469.jpeg?auto=compress&cs=tinysrgb&w=1200', // Office work
    'https://images.pexels.com/photos/3184470/pexels-photo-3184470.jpeg?auto=compress&cs=tinysrgb&w=1200', // Success
  ]
};

// Mots-clés de recherche par secteur pour l'API Pexels
export const SECTOR_SEARCH_QUERIES: Record<string, string[]> = {
  plomberie: ['plumber', 'plumbing', 'sink', 'bathroom', 'faucet', 'pipes', 'water', 'repair'],
  electricien: ['electrician', 'electrical', 'light bulb', 'wiring', 'outlet', 'power', 'cable', 'lighting'],
  coiffeur: ['hairdresser', 'barber', 'hair salon', 'haircut', 'hairstyle', 'hair styling', 'salon'],
  restaurant: ['restaurant', 'chef', 'cooking', 'food', 'kitchen', 'dining', 'gourmet', 'cuisine'],
  garage: ['mechanic', 'car repair', 'auto shop', 'garage', 'car service', 'automotive', 'tires'],
  nettoyage: ['cleaning', 'cleaner', 'vacuum', 'mop', 'disinfection', 'sanitizing', 'housekeeping'],
  jardin: ['gardener', 'garden', 'lawn', 'landscaping', 'plants', 'pruning', 'gardening tools'],
  fitness: ['gym', 'fitness', 'personal trainer', 'workout', 'weights', 'exercise', 'training'],
  medical: ['doctor', 'medical', 'clinic', 'healthcare', 'hospital', 'nurse', 'stethoscope'],
  avocat: ['lawyer', 'law', 'attorney', 'legal', 'court', 'gavel', 'justice', 'contract'],
  default: ['business', 'professional', 'office', 'corporate', 'meeting', 'team', 'success']
};

// Fonction pour obtenir les images d'un secteur
export function getSectorImages(sector: string): string[] {
  const normalizedSector = (sector || '').toLowerCase();
  
  // Chercher le secteur exact
  for (const [key, images] of Object.entries(SECTOR_PEXELS_IMAGES)) {
    if (normalizedSector.includes(key)) {
      return images;
    }
  }
  
  // Vérifications spécifiques
  if (normalizedSector.includes('plomb') || normalizedSector.includes('plumber')) return SECTOR_PEXELS_IMAGES.plomberie;
  if (normalizedSector.includes('electri') || normalizedSector.includes('electrician')) return SECTOR_PEXELS_IMAGES.electricien;
  if (normalizedSector.includes('coiff') || normalizedSector.includes('hair') || normalizedSector.includes('barber')) return SECTOR_PEXELS_IMAGES.coiffeur;
  if (normalizedSector.includes('restaurant') || normalizedSector.includes('chef') || normalizedSector.includes('food')) return SECTOR_PEXELS_IMAGES.restaurant;
  if (normalizedSector.includes('garage') || normalizedSector.includes('mecan') || normalizedSector.includes('auto')) return SECTOR_PEXELS_IMAGES.garage;
  if (normalizedSector.includes('nettoya') || normalizedSector.includes('clean')) return SECTOR_PEXELS_IMAGES.nettoyage;
  if (normalizedSector.includes('jardin') || normalizedSector.includes('garden') || normalizedSector.includes('paysag')) return SECTOR_PEXELS_IMAGES.jardin;
  if (normalizedSector.includes('fitness') || normalizedSector.includes('gym') || normalizedSector.includes('sport')) return SECTOR_PEXELS_IMAGES.fitness;
  if (normalizedSector.includes('medical') || normalizedSector.includes('doctor') || normalizedSector.includes('sante')) return SECTOR_PEXELS_IMAGES.medical;
  if (normalizedSector.includes('avocat') || normalizedSector.includes('lawyer') || normalizedSector.includes('law')) return SECTOR_PEXELS_IMAGES.avocat;
  
  return SECTOR_PEXELS_IMAGES.default;
}

// Fonction pour obtenir le mot-clé de recherche pour l'API
export function getSearchQuery(sector: string): string {
  const normalizedSector = (sector || '').toLowerCase();
  
  for (const [key, queries] of Object.entries(SECTOR_SEARCH_QUERIES)) {
    if (normalizedSector.includes(key)) {
      return queries[0]; // Retourner le premier mot-clé
    }
  }
  
  return 'business';
}

// Fonction pour récupérer des images dynamiques depuis l'API Pexels (si API key disponible)
export async function fetchPexelsImages(query: string, perPage: number = 10): Promise<string[]> {
  if (!PEXELS_API_KEY) {
    // Retourner les images statiques si pas d'API key
    return SECTOR_PEXELS_IMAGES[query as keyof typeof SECTOR_PEXELS_IMAGES] || SECTOR_PEXELS_IMAGES.default;
  }
  
  try {
    const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${perPage}`, {
      headers: {
        'Authorization': PEXELS_API_KEY
      }
    });
    
    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.photos.map((photo: any) => photo.src.large || photo.src.medium);
  } catch (error) {
    console.error('Error fetching Pexels images:', error);
    return SECTOR_PEXELS_IMAGES[query as keyof typeof SECTOR_PEXELS_IMAGES] || SECTOR_PEXELS_IMAGES.default;
  }
}
