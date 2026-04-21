// Test précis pour déboguer la logique de correspondance
const fs = require('fs');
const path = require('path');

// Charger le fichier ultimateTemplate.ts
const templatePath = path.join(__dirname, 'src/lib/ultimateTemplate.ts');
const content = fs.readFileSync(templatePath, 'utf8');

console.log('=== DÉBOGAGE CORRESPONDANCE SECTEURS ===\n');

// Test spécifique pour plombier
const testSector = 'plombier';
const normalizedSector = testSector.toLowerCase();

console.log(`Test avec secteur: "${testSector}"`);
console.log(`Normalisé: "${normalizedSector}"`);

// Simuler la logique exacte de getUltimateTemplate
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

console.log(`Template trouvé: "${templateFound}"`);

// Vérifier si le template existe
const templatePattern = new RegExp(`${templateFound}:\\s*{[^}]*primary:\\s*'#[0-9a-fA-F]{6}'`);
const match = content.match(templatePattern);

if (match) {
  const colorMatch = match[0].match(/#[0-9a-fA-F]{6}/);
  console.log(`Template existe: OUI`);
  console.log(`Couleur primaire: ${colorMatch ? colorMatch[0] : 'NON TROUVÉE'}`);
} else {
  console.log(`Template existe: NON`);
}

// Test avec d'autres secteurs problématiques
console.log('\n=== TEST AUTRES SECTEURS ===');

const testSectors = ['plombier', 'plombier paris', 'artisan plombier', 'plomberie'];

testSectors.forEach(sector => {
  const normalized = sector.toLowerCase();
  let found = 'default';
  
  if (normalized.includes('plomb') || normalized.includes('plomberie') || normalized.includes('plombier') || normalized.includes('chauffage') || normalized.includes('clim')) found = 'plomberie';
  
  console.log(`"${sector}" -> "${found}"`);
});
