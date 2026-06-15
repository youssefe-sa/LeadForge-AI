// Test file pour générer un exemple de site premium
import { generatePremiumSite } from './src/lib/premiumTemplate';

// Lead de test pour un plombier
const testLead = {
  id: 'test-001',
  name: 'Plomberie Pro Paris',
  sector: 'Plomberie',
  city: 'Paris',
  description: 'Plombier chauffagiste certifié RGE. Intervention rapide 24/7 sur Paris et Île-de-France. Spécialiste en dépannage urgence, installation sanitaire et chauffage.',
  phone: '01 23 45 67 89',
  email: 'contact@plomberiepro-paris.fr',
  address: '15 Rue de la Plomberie, 75001 Paris',
  website: 'https://plomberiepro-paris.fr',
  googleRating: 4.8,
  googleReviews: 127,
  googleReviewsData: [
    { author: 'Marc Dupont', text: 'Intervention rapide à minuit pour une fuite. Arrivé en 30 minutes, travail impeccable. Tarifs corrects.', rating: 5, date: 'Il y a 1 semaine' },
    { author: 'Sophie Martin', text: 'Installation complète de notre salle de bain. Travail soigné, respect des délais. Je recommande vivement.', rating: 5, date: 'Il y a 2 semaines' },
    { author: 'Pierre Leroy', text: 'Dépannage chauffage en plein hiver. Problème résolu en 1h. Très professionnel.', rating: 5, date: 'Il y a 3 semaines' }
  ],
  images: [],
  websiteImages: []
};

// Lead de test pour un restaurant
const testRestaurant = {
  id: 'test-002',
  name: 'Le Gourmet Marseillais',
  sector: 'Restaurant',
  city: 'Marseille',
  description: 'Restaurant gastronomique depuis 2009. Cuisine authentique provençale avec produits frais du marché. Ambiance raffinée et service impeccable.',
  phone: '04 91 23 45 67',
  email: 'reservation@legourmet-marseille.fr',
  address: '22 Rue du Vieux Port, 13002 Marseille',
  website: 'https://legourmet-marseille.fr',
  googleRating: 4.6,
  googleReviews: 89,
  googleReviewsData: [
    { author: 'Antoine Durand', text: 'Menu dégustation exceptionnel. Chaque plat était une découverte, les accords mets-vins parfaits.', rating: 5, date: 'Il y a 1 semaine' },
    { author: 'Isabelle Moreau', text: 'Service traiteur pour notre mariage. 120 convives ravis. Cuisine raffinée à prix raisonnable.', rating: 5, date: 'Il y a 2 semaines' },
    { author: 'Philippe Bernard', text: 'Brunch du dimanche formidable. Produits frais, portions généreuses et ambiance conviviale.', rating: 5, date: 'Il y a 3 semaines' }
  ],
  images: [],
  websiteImages: []
};

// Lead de test pour un coiffeur
const testCoiffeur = {
  id: 'test-003',
  name: 'Salon de Coiffure Élégance',
  sector: 'Coiffeur',
  city: 'Lyon',
  description: 'Salon de coiffure premium depuis 2010. Visagisme personnalisé, colorations végétales et soins capillaires haut de gamme. Équipe de stylistes expérimentés.',
  phone: '04 78 91 23 45',
  email: 'rdv@elegance-lyon.fr',
  address: '8 Rue de la République, 69002 Lyon',
  website: 'https://elegance-lyon.fr',
  googleRating: 4.7,
  googleReviews: 156,
  googleReviewsData: [
    { author: 'Camille Simon', text: 'Enfin un coiffeur qui comprend ce que je veux ! Visagisme parfait, coupe exactement comme je l\'imaginais.', rating: 5, date: 'Il y a 1 semaine' },
    { author: 'Thomas Lefebvre', text: 'Rasage traditionnel exceptionnel. Serviette chaude, mousse de qualité, massage... Un vrai moment de détente.', rating: 5, date: 'Il y a 2 semaines' },
    { author: 'Marie-Hélène Petit', text: 'Balayage sublime ! Des reflets naturels et une brillance incroyable. Mes cheveux n\'ont jamais été aussi beaux.', rating: 5, date: 'Il y a 3 semaines' }
  ],
  images: [],
  websiteImages: []
};

async function generateTestSites() {
  console.log('🚀 Génération des sites de test premium...\n');
  
  try {
    // Générer le site plomberie
    console.log('📝 Génération du site plomberie...');
    const plomberieHtml = await generatePremiumSite(testLead);
    console.log('✅ Site plomberie généré avec succès');
    
    // Sauvegarder dans un fichier
    const fs = require('fs');
    fs.writeFileSync('site-premium-plomberie.html', plomberieHtml);
    console.log('💾 Sauvegardé: site-premium-plomberie.html\n');
    
    // Générer le site restaurant
    console.log('📝 Génération du site restaurant...');
    const restaurantHtml = await generatePremiumSite(testRestaurant);
    console.log('✅ Site restaurant généré avec succès');
    
    fs.writeFileSync('site-premium-restaurant.html', restaurantHtml);
    console.log('💾 Sauvegardé: site-premium-restaurant.html\n');
    
    // Générer le site coiffeur
    console.log('📝 Génération du site coiffeur...');
    const coiffeurHtml = await generatePremiumSite(testCoiffeur);
    console.log('✅ Site coiffeur généré avec succès');
    
    fs.writeFileSync('site-premium-coiffeur.html', coiffeurHtml);
    console.log('💾 Sauvegardé: site-premium-coiffeur.html\n');
    
    console.log('🎉 Tous les sites premium ont été générés avec succès !');
    console.log('📂 Ouvrez les fichiers HTML pour voir le résultat.');
    
  } catch (error) {
    console.error('❌ Erreur lors de la génération:', error);
  }
}

// Exécuter la génération
generateTestSites();
