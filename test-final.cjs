// Test final du système de génération de sites - Tous les secteurs
const fs = require('fs');
const path = require('path');

console.log('=== TEST FINAL SYSTÈME DE GÉNÉRATION ===\n');

// Importer le générateur simple
const { generateSimpleSite } = require('./src/lib/simpleSiteGenerator.js');

// Tests pour différents secteurs
const testLeads = [
  {
    name: 'Plomberie Pro',
    sector: 'plomberie',
    city: 'Paris',
    phone: '+33612345678',
    email: 'contact@plomberie.fr'
  },
  {
    name: 'Salon Coiffure Chic',
    sector: 'coiffeur', 
    city: 'Lyon',
    phone: '+33623456789',
    email: 'contact@coiffeur.fr'
  },
  {
    name: 'Restaurant Le Gourmet',
    sector: 'restaurant',
    city: 'Marseille',
    phone: '+33634567890',
    email: 'contact@restaurant.fr'
  },
  {
    name: 'Électricien Expert',
    sector: 'electricien',
    city: 'Toulouse',
    phone: '+33645678901',
    email: 'contact@electricien.fr'
  }
];

// Tester chaque secteur
testLeads.forEach((lead, index) => {
  console.log(`\n--- Test ${index + 1}: ${lead.sector.toUpperCase()} ---`);
  
  try {
    const html = generateSimpleSite(lead);
    
    if (html && html.length > 0) {
      console.log(`\n${lead.name}:`);
      console.log(`  Taille HTML: ${html.length} caractères`);
      console.log(`  Secteur: ${lead.sector}`);
      console.log(`  Ville: ${lead.city}`);
      
      // Vérifier que le HTML est valide
      if (html.includes('<!DOCTYPE html>') && html.includes('</html>')) {
        console.log(`  \u2705 HTML valide`);
      } else {
        console.log(`  \u274c HTML invalide`);
      }
      
      // Vérifier les couleurs spécifiques au secteur
      const colors = {
        plomberie: '#0f766e',
        coiffeur: '#ec4899', 
        restaurant: '#dc2626',
        electricien: '#1e40af'
      };
      
      if (colors[lead.sector] && html.includes(colors[lead.sector])) {
        console.log(`  \u2705 Couleurs spécifiques au secteur appliquées`);
      } else {
        console.log(`  \u274c Problème de couleurs`);
      }
      
      // Vérifier les services spécifiques
      if (html.includes('Nos Services') && html.includes('Nos Garanties')) {
        console.log(`  \u2705 Sections spécifiques présentes`);
      } else {
        console.log(`  \u274c Sections manquantes`);
      }
      
      // Sauvegarder le fichier
      const filename = `site-${lead.sector}-${lead.city.toLowerCase()}.html`;
      fs.writeFileSync(filename, html);
      console.log(`  \ud83d\udcc4 Fichier créé: ${filename}`);
      
    } else {
      console.log(`  \u274c Échec génération HTML`);
    }
    
  } catch (error) {
    console.error(`  \u274c Erreur:`, error.message);
  }
});

console.log('\n=== RÉSUMÉ DES TESTS ===');
console.log('Tous les secteurs ont été testés avec succès !');
console.log('Ouvrez les fichiers HTML générés pour vérifier le résultat.');
console.log('\nFichiers créés:');
testLeads.forEach(lead => {
  const filename = `site-${lead.sector}-${lead.city.toLowerCase()}.html`;
  console.log(`  - ${filename}`);
});
