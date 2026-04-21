// Test simple pour vérifier les templates sectoriels
const fs = require('fs');
const path = require('path');

// Charger le fichier ultimateTemplate.ts
const templatePath = path.join(__dirname, 'src/lib/ultimateTemplate.ts');
const content = fs.readFileSync(templatePath, 'utf8');

console.log('=== VÉRIFICATION DES TEMPLATES SECTORIELS ===\n');

// Test des secteurs
const testSectors = ['plombier', 'electricien', 'coiffeur', 'restaurant', 'garage', 'nettoyage', 'jardin', 'fitness', 'medical', 'avocat'];

testSectors.forEach(sector => {
  console.log(`--- ${sector.toUpperCase()} ---`);
  
  // Vérifier si le template existe
  const templateKey = sector === 'electricien' ? 'electricien' : sector;
  const templatePattern = new RegExp(`${templateKey}:\\s*{[^}]*primary:\\s*'#[0-9a-fA-F]{6}'`);
  const match = content.match(templatePattern);
  
  if (match) {
    const colorMatch = match[0].match(/#[0-9a-fA-F]{6}/);
    console.log(`  Template: TROUVÉ`);
    console.log(`  Couleur: ${colorMatch ? colorMatch[0] : 'NON TROUVÉE'}`);
  } else {
    console.log(`  Template: NON TROUVÉ`);
  }
  
  // Vérifier les images
  const imagesPattern = new RegExp(`${templateKey}:\\s*\\[[\\s\\S]*?\\]`);
  const imagesMatch = content.match(imagesPattern);
  if (imagesMatch) {
    const imageCount = (imagesMatch[0].match(/https:\/\/images\.unsplash\.com/g) || []).length;
    console.log(`  Images: ${imageCount} trouvées`);
  } else {
    console.log(`  Images: NON TROUVÉES`);
  }
  
  console.log('');
});

// Vérifier la fonction getUltimateTemplate
console.log('=== VÉRIFICATION DE LA FONCTION getUltimateTemplate ===');
const functionPattern = /function getUltimateTemplate\(sector: string\)[\s\S]*?return SECTOR_ULTIMATE_TEMPLATES\.default;/;
const functionMatch = content.match(functionPattern);
console.log('Fonction getUltimateTemplate:', functionMatch ? 'TROUVÉE' : 'NON TROUVÉE');

// Vérifier l'appel dans generateUltimateSite
console.log('\n=== VÉRIFICATION DE L\'APPEL DANS generateUltimateSite ===');
const callPattern = /const template = getUltimateTemplate\(lead\.sector\);/;
const callMatch = content.match(callPattern);
console.log('Appel getUltimateTemplate:', callMatch ? 'TROUVÉ' : 'NON TROUVÉ');

// Vérifier l'utilisation des couleurs dans le CSS
console.log('\n=== VÉRIFICATION UTILISATION COULEURS DANS CSS ===');
const cssPattern = /--primary: \${primaryColor}/;
const cssMatch = content.match(cssPattern);
console.log('Variable CSS primary:', cssMatch ? 'TROUVÉE' : 'NON TROUVÉE');

const bgPattern = /--bg-base: \${template\.background}/;
const bgMatch = content.match(bgPattern);
console.log('Variable CSS background:', bgMatch ? 'TROUVÉE' : 'NON TROUVÉE');
