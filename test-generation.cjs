// Test complet de génération pour vérifier l'application des templates
const fs = require('fs');
const path = require('path');

// Simuler un lead pour test
const testLead = {
  id: 'test-123',
  name: 'Test Plombier',
  sector: 'plombier',
  city: 'Paris',
  phone: '+33612345678',
  email: 'test@plombier.fr'
};

console.log('=== TEST GÉNÉRATION COMPLÈTE ===\n');
console.log(`Lead test: ${testLead.name} - Secteur: ${testLead.sector}`);

// Simuler la logique de getUltimateTemplate
const normalizedSector = (testLead.sector || '').toLowerCase();
let templateFound = 'default';

if (normalizedSector.includes('nettoyag') || normalizedSector.includes('propreté') || normalizedSector.includes('ménage')) templateFound = 'nettoyage';
else if (normalizedSector.includes('jardin') || normalizedSector.includes('paysag') || normalizedSector.includes('espaces verts')) templateFound = 'jardin';
else if (normalizedSector.includes('coach') || normalizedSector.includes('sport') || normalizedSector.includes('fitness') || normalizedSector.includes('salle')) templateFound = 'fitness';
else if (normalizedSector.includes('médec') || normalizedSector.includes('clinique') || normalizedSector.includes('dentiste') || normalizedSector.includes('santé')) templateFound = 'medical';
else if (normalizedSector.includes('avocat') || normalizedSector.includes('notaire') || normalizedSector.includes('juridi') || normalizedSector.includes('droit')) templateFound = 'avocat';
else if (normalizedSector.includes('électricien') || normalizedSector.includes('electricien') || normalizedSector.includes('electric')) templateFound = 'electricien';
else if (normalizedSector.includes('plomb') || normalizedSector.includes('plomberie') || normalizedSector.includes('plombier') || normalizedSector.includes('chauffage') || normalizedSector.includes('clim')) templateFound = 'plomberie';
else if (normalizedSector.includes('coiff') || normalizedSector.includes('barb') || normalizedSector.includes('salon')) templateFound = 'coiffeur';
else if (normalizedSector.includes('restaurant') || normalizedSector.includes('cuisin') || normalizedSector.includes('traiteur')) templateFound = 'restaurant';
else if (normalizedSector.includes('garage') || normalizedSector.includes('mécan') || normalizedSector.includes('auto') || normalizedSector.includes('carrosserie')) templateFound = 'garage';

console.log(`Template sélectionné: ${templateFound}`);

// Charger le fichier pour vérifier les couleurs
const templatePath = path.join(__dirname, 'src/lib/ultimateTemplate.ts');
const content = fs.readFileSync(templatePath, 'utf8');

// Extraire les couleurs du template
const templatePattern = new RegExp(`${templateFound}:\\s*{([^}]*)}`, 's');
const templateMatch = content.match(templatePattern);

if (templateMatch) {
  const templateContent = templateMatch[1];
  const primaryMatch = templateContent.match(/primary:\s*'#[0-9a-fA-F]{6}'/);
  const secondaryMatch = templateContent.match(/secondary:\s*'#[0-9a-fA-F]{6}'/);
  const accentMatch = templateContent.match(/accent:\s*'#[0-9a-fA-F]{6}'/);
  const backgroundMatch = templateContent.match(/background:\s*'#[0-9a-fA-F]{6}'/);
  
  console.log('\n--- COULEURS DU TEMPLATE ---');
  console.log(`Primary: ${primaryMatch ? primaryMatch[0].replace(/primary:\s*'/, '').replace("'", "") : 'NON TROUVÉE'}`);
  console.log(`Secondary: ${secondaryMatch ? secondaryMatch[0].replace(/secondary:\s*'/, '').replace("'", "") : 'NON TROUVÉE'}`);
  console.log(`Accent: ${accentMatch ? accentMatch[0].replace(/accent:\s*'/, '').replace("'", "") : 'NON TROUVÉE'}`);
  console.log(`Background: ${backgroundMatch ? backgroundMatch[0].replace(/background:\s*'/, '').replace("'", "") : 'NON TROUVÉE'}`);
  
  // Simuler la génération HTML
  console.log('\n--- SIMULATION GÉNÉRATION HTML ---');
  
  const primaryColor = primaryMatch ? primaryMatch[0].replace(/primary:\s*'/, '').replace("'", "") : '#1e40af';
  const secondaryColor = secondaryMatch ? secondaryMatch[0].replace(/secondary:\s*'/, '').replace("'", "") : '#1e3a8a';
  const accentColor = accentMatch ? accentMatch[0].replace(/accent:\s*'/, '').replace("'", "") : '#3b82f6';
  const backgroundColor = backgroundMatch ? backgroundMatch[0].replace(/background:\s*'/, '').replace("'", "") : '#f8fafc';
  
  // Simuler le CSS
  const simulatedCSS = `
:root {
    --primary: ${primaryColor};
    --secondary: ${secondaryColor};
    --accent: ${accentColor};
    --bg-base: ${backgroundColor};
}`;
  
  console.log('CSS généré:');
  console.log(simulatedCSS);
  
  // Vérifier si les couleurs sont différentes du default
  const defaultPrimary = '#1e293b';
  const defaultBackground = '#f8fafc';
  
  console.log('\n--- VÉRIFICATION DIFFÉRENCES ---');
  console.log(`Primary différent du default: ${primaryColor !== defaultPrimary ? 'OUI' : 'NON'}`);
  console.log(`Background différent du default: ${backgroundColor !== defaultBackground ? 'OUI' : 'NON'}`);
  
} else {
  console.log(`Template ${templateFound} NON TROUVÉ dans le fichier`);
}
