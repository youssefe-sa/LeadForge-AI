// Test simple pour vérifier que la génération fonctionne
const fs = require('fs');
const path = require('path');

console.log('=== TEST GÉNÉRATION SIMPLE ===\n');

// Test lead simple
const testLead = {
  id: 'test-123',
  name: 'Plomberie Pro',
  sector: 'plomberie',
  city: 'Paris',
  phone: '+33612345678',
  email: 'test@plomberie.fr'
};

// Test avec l'ancien système pour voir si ça fonctionne
try {
  const { generateUltimateSite } = require('./src/lib/ultimateTemplate.ts');
  
  console.log('Génération avec ancien système...');
  const html = generateUltimateSite(testLead);
  
  if (html && html.length > 0) {
    console.log('✅ HTML généré avec succès');
    console.log('Taille HTML:', html.length, 'caractères');
    
    // Vérifier qu'il y a du contenu HTML valide
    if (html.includes('<!DOCTYPE html>') && html.includes('</html>')) {
      console.log('✅ HTML valide');
    } else {
      console.log('❌ HTML invalide');
    }
    
    // Sauvegarder pour test
    fs.writeFileSync('test-output.html', html);
    console.log('📄 Fichier test-output.html créé');
    
  } else {
    console.log('❌ Échec génération HTML');
  }
  
} catch (error) {
  console.error('❌ Erreur:', error.message);
  console.error('Stack:', error.stack);
}
