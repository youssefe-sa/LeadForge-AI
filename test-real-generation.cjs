// Test réel de génération avec la fonction generateUltimateSite
const fs = require('fs');
const path = require('path');

// Simuler l'import de la fonction (simplifié)
console.log('=== TEST RÉEL DE GÉNÉRATION ===\n');

// Test leads
const testLeads = [
  { id: '1', name: 'Plomberie Pro', sector: 'plombier', city: 'Paris', phone: '+33612345678', email: 'contact@plomberie.fr' },
  { id: '2', name: 'Électricien Express', sector: 'electricien', city: 'Lyon', phone: '+33687654321', email: 'contact@electricien.fr' }
];

testLeads.forEach((lead, index) => {
  console.log(`--- TEST ${index + 1}: ${lead.name} (${lead.sector}) ---`);
  
  // Simuler la logique de generateUltimateSite
  const templatePath = path.join(__dirname, 'src/lib/ultimateTemplate.ts');
  const content = fs.readFileSync(templatePath, 'utf8');
  
  // Extraire la fonction getUltimateTemplate
  const getUltimateTemplateMatch = content.match(/function getUltimateTemplate\(sector: string\)[\s\S]*?return SECTOR_ULTIMATE_TEMPLATES\.default;/);
  
  if (getUltimateTemplateMatch) {
    // Simuler la sélection de template
    const normalizedSector = (lead.sector || '').toLowerCase();
    let templateKey = 'default';
    
    if (normalizedSector.includes('plomb') || normalizedSector.includes('plomberie') || normalizedSector.includes('plombier')) templateKey = 'plomberie';
    else if (normalizedSector.includes('électricien') || normalizedSector.includes('electricien') || normalizedSector.includes('electric')) templateKey = 'electricien';
    else if (normalizedSector.includes('coiff') || normalizedSector.includes('barb') || normalizedSector.includes('salon')) templateKey = 'coiffeur';
    else if (normalizedSector.includes('restaurant') || normalizedSector.includes('cuisin') || normalizedSector.includes('traiteur')) templateKey = 'restaurant';
    else if (normalizedSector.includes('garage') || normalizedSector.includes('mécan') || normalizedSector.includes('auto') || normalizedSector.includes('carrosserie')) templateKey = 'garage';
    else if (normalizedSector.includes('nettoyag') || normalizedSector.includes('propreté') || normalizedSector.includes('ménage')) templateKey = 'nettoyage';
    else if (normalizedSector.includes('jardin') || normalizedSector.includes('paysag') || normalizedSector.includes('espaces verts')) templateKey = 'jardin';
    else if (normalizedSector.includes('coach') || normalizedSector.includes('sport') || normalizedSector.includes('fitness') || normalizedSector.includes('salle')) templateKey = 'fitness';
    else if (normalizedSector.includes('médec') || normalizedSector.includes('clinique') || normalizedSector.includes('dentiste') || normalizedSector.includes('santé')) templateKey = 'medical';
    else if (normalizedSector.includes('avocat') || normalizedSector.includes('notaire') || normalizedSector.includes('juridi') || normalizedSector.includes('droit')) templateKey = 'avocat';
    
    console.log(`Template sélectionné: ${templateKey}`);
    
    // Extraire les couleurs du template
    const templatePattern = new RegExp(`${templateKey}:\\s*{([^}]*)}`, 's');
    const templateMatch = content.match(templatePattern);
    
    if (templateMatch) {
      const templateContent = templateMatch[1];
      const primaryMatch = templateContent.match(/primary:\s*'#[0-9a-fA-F]{6}'/);
      const secondaryMatch = templateContent.match(/secondary:\s*'#[0-9a-fA-F]{6}'/);
      const accentMatch = templateContent.match(/accent:\s*'#[0-9a-fA-F]{6}'/);
      const backgroundMatch = templateContent.match(/background:\s*'#[0-9a-fA-F]{6}'/);
      
      console.log(`  Primary: ${primaryMatch ? primaryMatch[0].replace(/primary:\s*'/, '').replace("'", "") : 'NON'}`);
      console.log(`  Secondary: ${secondaryMatch ? secondaryMatch[0].replace(/secondary:\s*'/, '').replace("'", "") : 'NON'}`);
      console.log(`  Accent: ${accentMatch ? accentMatch[0].replace(/accent:\s*'/, '').replace("'", "") : 'NON'}`);
      console.log(`  Background: ${backgroundMatch ? backgroundMatch[0].replace(/background:\s*'/, '').replace("'", "") : 'NON'}`);
      
      // Extraire les images sectorielles
      const imagesPattern = new RegExp(`${templateKey}:\\s*\\[([\\s\\S]*?)\\]`);
      const imagesMatch = content.match(imagesPattern);
      
      if (imagesMatch) {
        const imagesContent = imagesMatch[1];
        const imageUrls = imagesContent.match(/https:\/\/images\.unsplash\.com[^'"]+/g);
        console.log(`  Images sectorielles: ${imageUrls ? imageUrls.length : 0} trouvées`);
        
        if (imageUrls && imageUrls.length > 0) {
          console.log(`  Hero image: ${imageUrls[0]}`);
        }
      }
    } else {
      console.log(`  Template ${templateKey} NON TROUVÉ`);
    }
  } else {
    console.log('  Fonction getUltimateTemplate NON TROUVÉE');
  }
  
  console.log('');
});

// Vérifier si le problème vient de l'export
console.log('=== VÉRIFICATION EXPORT ===');
const exportMatch = content.match(/export function generateUltimateSite/);
console.log('Export generateUltimateSite:', exportMatch ? 'TROUVÉ' : 'NON TROUVÉ');
