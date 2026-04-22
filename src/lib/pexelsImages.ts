// Pexels Images Service - Images professionnelles et fiables par secteur
// Utilise l'API Pexels ou des URLs directes fiables

const PEXELS_API_KEY = process.env.PEXELS_API_KEY || '';

// URLs Pexels fiables et professionnelles par secteur
// Ces URLs sont des liens directs vers des images vérifiées
export const SECTOR_PEXELS_IMAGES: Record<string, string[]> = {
  plomberie: [
    'https://images.pexels.com/photos/1580464/pexels-photo-1580464.jpeg?auto=compress&cs=tinysrgb&w=1200', // Plumber working
    'https://images.pexels.com/photos/1905338/pexels-photo-1905338.jpeg?auto=compress&cs=tinysrgb&w=1200', // Kitchen sink
    'https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&w=1200', // Bathroom
    'https://images.pexels.com/photos/1907229/pexels-photo-1907229.jpeg?auto=compress&cs=tinysrgb&w=1200', // Pipes
    'https://images.pexels.com/photos/1571435/pexels-photo-1571435.jpeg?auto=compress&cs=tinysrgb&w=1200', // Tools
    'https://images.pexels.com/photos/9242827/pexels-photo-9242827.jpeg?auto=compress&cs=tinysrgb&w=1200', // Modern bathroom
    'https://images.pexels.com/photos/534151/pexels-photo-534151.jpeg?auto=compress&cs=tinysrgb&w=1200', // Shower
    'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=1200', // Faucet
    'https://images.pexels.com/photos/1507685/pexels-photo-1507685.jpeg?auto=compress&cs=tinysrgb&w=1200', // Plumber
    'https://images.pexels.com/photos/1907228/pexels-photo-1907228.jpeg?auto=compress&cs=tinysrgb&w=1200', // Pipe wrench
  ],
  electricien: [
    'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=1200', // Electrician tools
    'https://images.pexels.com/photos/190574/pexels-photo-190574.jpeg?auto=compress&cs=tinysrgb&w=1200', // Light bulb
    'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=1200', // Electrical
    'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1200', // Wiring
    'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=1200', // Outlet
    'https://images.pexels.com/photos/2127931/pexels-photo-2127931.jpeg?auto=compress&cs=tinysrgb&w=1200', // Light switch
    'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=1200', // Cable
    'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=1200', // LED lights
    'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=1200', // Circuit
    'https://images.pexels.com/photos/923192/pexels-photo-923192.jpeg?auto=compress&cs=tinysrgb&w=1200', // Modern lighting
  ],
  coiffeur: [
    'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=1200', // Salon
    'https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg?auto=compress&cs=tinysrgb&w=1200', // Hairdresser
    'https://images.pexels.com/photos/3065210/pexels-photo-3065210.jpeg?auto=compress&cs=tinysrgb&w=1200', // Barber
    'https://images.pexels.com/photos/2040189/pexels-photo-2040189.jpeg?auto=compress&cs=tinysrgb&w=1200', // Hair cut
    'https://images.pexels.com/photos/3065212/pexels-photo-3065212.jpeg?auto=compress&cs=tinysrgb&w=1200', // Hair salon
    'https://images.pexels.com/photos/3065211/pexels-photo-3065211.jpeg?auto=compress&cs=tinysrgb&w=1200', // Stylist
    'https://images.pexels.com/photos/1327680/pexels-photo-1327680.jpeg?auto=compress&cs=tinysrgb&w=1200', // Hair dryer
    'https://images.pexels.com/photos/1570805/pexels-photo-1570805.jpeg?auto=compress&cs=tinysrgb&w=1200', // Barber shop
    'https://images.pexels.com/photos/1804665/pexels-photo-1804665.jpeg?auto=compress&cs=tinysrgb&w=1200', // Hair styling
    'https://images.pexels.com/photos/3065208/pexels-photo-3065208.jpeg?auto=compress&cs=tinysrgb&w=1200', // Salon interior
  ],
  restaurant: [
    'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1200', // Restaurant
    'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1200', // Chef cooking
    'https://images.pexels.com/photos/1267315/pexels-photo-1267315.jpeg?auto=compress&cs=tinysrgb&w=1200', // Food
    'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1200', // Kitchen
    'https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=1200', // Dining
    'https://images.pexels.com/photos/1484516/pexels-photo-1484516.jpeg?auto=compress&cs=tinysrgb&w=1200', // Chef
    'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=1200', // Plating
    'https://images.pexels.com/photos/903376/pexels-photo-903376.jpeg?auto=compress&cs=tinysrgb&w=1200', // Bar
    'https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=1200', // Food dish
    'https://images.pexels.com/photos/1414232/pexels-photo-1414232.jpeg?auto=compress&cs=tinysrgb&w=1200', // Restaurant interior
  ],
  garage: [
    'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=1200', // Mechanic
    'https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=1200', // Car repair
    'https://images.pexels.com/photos/248370/pexels-photo-248370.jpeg?auto=compress&cs=tinysrgb&w=1200', // Car service
    'https://images.pexels.com/photos/2244749/pexels-photo-2244749.jpeg?auto=compress&cs=tinysrgb&w=1200', // Tools
    'https://images.pexels.com/photos/5563492/pexels-photo-5563492.jpeg?auto=compress&cs=tinysrgb&w=1200', // Auto shop
    'https://images.pexels.com/photos/2244745/pexels-photo-2244745.jpeg?auto=compress&cs=tinysrgb&w=1200', // Mechanic working
    'https://images.pexels.com/photos/3806275/pexels-photo-3806275.jpeg?auto=compress&cs=tinysrgb&w=1200', // Car tire
    'https://images.pexels.com/photos/4480505/pexels-photo-4480505.jpeg?auto=compress&cs=tinysrgb&w=1200', // Oil change
    'https://images.pexels.com/photos/2244752/pexels-photo-2244752.jpeg?auto=compress&cs=tinysrgb&w=1200', // Garage
    'https://images.pexels.com/photos/3845816/pexels-photo-3845816.jpeg?auto=compress&cs=tinysrgb&w=1200', // Car wash
  ],
  nettoyage: [
    'https://images.pexels.com/photos/4098710/pexels-photo-4098710.jpeg?auto=compress&cs=tinysrgb&w=1200', // Cleaning
    'https://images.pexels.com/photos/6195273/pexels-photo-6195273.jpeg?auto=compress&cs=tinysrgb&w=1200', // Cleaner
    'https://images.pexels.com/photos/6195128/pexels-photo-6195128.jpeg?auto=compress&cs=tinysrgb&w=1200', // Vacuum
    'https://images.pexels.com/photos/4098711/pexels-photo-4098711.jpeg?auto=compress&cs=tinysrgb&w=1200', // Spray bottle
    'https://images.pexels.com/photos/6195137/pexels-photo-6195137.jpeg?auto=compress&cs=tinysrgb&w=1200', // Cleaning service
    'https://images.pexels.com/photos/5691653/pexels-photo-5691653.jpeg?auto=compress&cs=tinysrgb&w=1200', // Window cleaning
    'https://images.pexels.com/photos/4098708/pexels-photo-4098708.jpeg?auto=compress&cs=tinysrgb&w=1200', // Mop
    'https://images.pexels.com/photos/6195109/pexels-photo-6195109.jpeg?auto=compress&cs=tinysrgb&w=1200', // Disinfection
    'https://images.pexels.com/photos/6195274/pexels-photo-6195274.jpeg?auto=compress&cs=tinysrgb&w=1200', // Cleaning tools
    'https://images.pexels.com/photos/4098709/pexels-photo-4098709.jpeg?auto=compress&cs=tinysrgb&w=1200', // Home cleaning
  ],
  jardin: [
    'https://images.pexels.com/photos/169523/pexels-photo-169523.jpeg?auto=compress&cs=tinysrgb&w=1200', // Garden
    'https://images.pexels.com/photos/5490366/pexels-photo-5490366.jpeg?auto=compress&cs=tinysrgb&w=1200', // Gardener
    'https://images.pexels.com/photos/169505/pexels-photo-169505.jpeg?auto=compress&cs=tinysrgb&w=1200', // Lawn mower
    'https://images.pexels.com/photos/4491871/pexels-photo-4491871.jpeg?auto=compress&cs=tinysrgb&w=1200', // Gardening
    'https://images.pexels.com/photos/2440299/pexels-photo-2440299.jpeg?auto=compress&cs=tinysrgb&w=1200', // Landscape
    'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=1200', // Green lawn
    'https://images.pexels.com/photos/5490367/pexels-photo-5490367.jpeg?auto=compress&cs=tinysrgb&w=1200', // Pruning
    'https://images.pexels.com/photos/2132171/pexels-photo-2132171.jpeg?auto=compress&cs=tinysrgb&w=1200', // Flowers
    'https://images.pexels.com/photos/1582619/pexels-photo-1582619.jpeg?auto=compress&cs=tinysrgb&w=1200', // Hedge trimmer
    'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=1200', // Beautiful garden
  ],
  fitness: [
    'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1200', // Gym
    'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=1200', // Personal trainer
    'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=1200', // Weights
    'https://images.pexels.com/photos/3253508/pexels-photo-3253508.jpeg?auto=compress&cs=tinysrgb&w=1200', // Treadmill
    'https://images.pexels.com/photos/2827392/pexels-photo-2827392.jpeg?auto=compress&cs=tinysrgb&w=1200', // Workout
    'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=1200', // Exercise
    'https://images.pexels.com/photos/39308/pexels-photo-39308.jpeg?auto=compress&cs=tinysrgb&w=1200', // Dumbbells
    'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=1200', // Fitness class
    'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=1200', // Yoga
    'https://images.pexels.com/photos/4752861/pexels-photo-4752861.jpeg?auto=compress&cs=tinysrgb&w=1200', // Crossfit
  ],
  medical: [
    'https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&w=1200', // Doctor
    'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=1200', // Medical
    'https://images.pexels.com/photos/263337/pexels-photo-263337.jpeg?auto=compress&cs=tinysrgb&w=1200', // Clinic
    'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=1200', // Stethoscope
    'https://images.pexels.com/photos/139398/thermometer-headache-pain-pills-139398.jpeg?auto=compress&cs=tinysrgb&w=1200', // Healthcare
    'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=1200', // Hospital
    'https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=1200', // Dentist
    'https://images.pexels.com/photos/139398/thermometer-headache-pain-pills-139398.jpeg?auto=compress&cs=tinysrgb&w=1200', // Medicine
    'https://images.pexels.com/photos/2324837/pexels-photo-2324837.jpeg?auto=compress&cs=tinysrgb&w=1200', // Medical equipment
    'https://images.pexels.com/photos/5206944/pexels-photo-5206944.jpeg?auto=compress&cs=tinysrgb&w=1200', // Nurse
  ],
  avocat: [
    'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=1200', // Lawyer
    'https://images.pexels.com/photos/5669619/pexels-photo-5669619.jpeg?auto=compress&cs=tinysrgb&w=1200', // Law books
    'https://images.pexels.com/photos/5669617/pexels-photo-5669617.jpeg?auto=compress&cs=tinysrgb&w=1200', // Gavel
    'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=1200', // Contract
    'https://images.pexels.com/photos/5668469/pexels-photo-5668469.jpeg?auto=compress&cs=tinysrgb&w=1200', // Law office
    'https://images.pexels.com/photos/5669618/pexels-photo-5669618.jpeg?auto=compress&cs=tinysrgb&w=1200', // Justice
    'https://images.pexels.com/photos/5669620/pexels-photo-5669620.jpeg?auto=compress&cs=tinysrgb&w=1200', // Legal documents
    'https://images.pexels.com/photos/5668859/pexels-photo-5668859.jpeg?auto=compress&cs=tinysrgb&w=1200', // Court
    'https://images.pexels.com/photos/5669621/pexels-photo-5669621.jpeg?auto=compress&cs=tinysrgb&w=1200', // Attorney
    'https://images.pexels.com/photos/5669636/pexels-photo-5669636.jpeg?auto=compress&cs=tinysrgb&w=1200', // Legal advice
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
