// Test simple pour générer un site premium
const { generatePremiumSite } = require('./dist/lib/premiumTemplate');

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

async function generateTestSite() {
  console.log('🚀 Génération du site premium de test...\n');
  
  try {
    const html = await generatePremiumSite(testLead);
    console.log('✅ Site premium généré avec succès');
    
    const fs = require('fs');
    fs.writeFileSync('site-premium-demo.html', html);
    console.log('💾 Sauvegardé: site-premium-demo.html');
    console.log('🎉 Ouvrez le fichier pour voir le résultat !');
    
  } catch (error) {
    console.error('❌ Erreur lors de la génération:', error);
  }
}

generateTestSite();
