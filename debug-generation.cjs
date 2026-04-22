// Test de débogage pour la génération de sites
const { generateUltimateSite } = require('./src/lib/ultimateTemplate.ts');

async function testGeneration() {
  console.log('=== Test de génération de sites ===\n');
  
  // Test avec différents secteurs
  const testLeads = [
    {
      name: 'Salon Coiffure Paris',
      sector: 'coiffeur',
      city: 'Paris',
      phone: '0123456789',
      email: 'test@coiffeur.fr'
    },
    {
      name: 'Plomberie Express Lyon',
      sector: 'plomberie', 
      city: 'Lyon',
      phone: '0412345678',
      email: 'test@plomberie.fr'
    },
    {
      name: 'Restaurant Le Gourmet',
      sector: 'restaurant',
      city: 'Marseille',
      phone: '0612345678',
      email: 'test@restaurant.fr'
    }
  ];

  for (const lead of testLeads) {
    console.log(`\n--- Test: ${lead.name} (${lead.sector}) ---`);
    
    try {
      const html = generateUltimateSite(lead);
      
      if (html && html.length > 0) {
        console.log(`\u2705 Succès: HTML généré (${html.length} caractères)`);
        
        // Vérifier si le HTML contient des éléments de base
        const hasDoctype = html.includes('<!DOCTYPE html>');
        const hasTitle = html.includes('<title>');
        const hasBody = html.includes('<body>');
        
        console.log(`   - Doctype: ${hasDoctype ? '\u2705' : '\u274c'}`);
        console.log(`   - Title: ${hasTitle ? '\u2705' : '\u274c'}`);
        console.log(`   - Body: ${hasBody ? '\u2705' : '\u274c'}`);
        
        // Afficher les 500 premiers caractères
        console.log(`   - Aperçu: ${html.substring(0, 200)}...`);
        
      } else {
        console.log('\u274c Échec: HTML vide ou null');
      }
      
    } catch (error) {
      console.log(`\u274c Erreur: ${error.message}`);
      console.log(`   Stack: ${error.stack?.split('\n')[1] || 'N/A'}`);
    }
  }
}

testGeneration().catch(console.error);
