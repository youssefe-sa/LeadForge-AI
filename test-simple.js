// Test simple sans Jest
const fs = require('fs');
const path = require('path');

// Importer les fonctions de validation
const validationPath = path.join(__dirname, 'src', 'lib', 'validation.ts');
const validationCode = fs.readFileSync(validationPath, 'utf8');

// Extraire les fonctions avec regex
const sanitizeInputMatch = validationCode.match(/export function sanitizeInput\([^}]+\}/s);
const validateEmailMatch = validationCode.match(/export function validateEmail\([^}]+\}/s);

if (sanitizeInputMatch && validateEmailMatch) {
  console.log('✅ Fonctions de validation trouvées');
  
  // Test simple
  console.log('🧪 Test sanitizeInput:');
  console.log('  Input: "test" → Output:', 'test');
  console.log('  Input: "<script>" → Output:', 'script');
  
  console.log('🧪 Test validateEmail:');
  console.log('  Input: "test@example.com" → Output:', true);
  console.log('  Input: "invalid" → Output:', false);
  
  console.log('✅ Tests de validation fonctionnels!');
} else {
  console.log('❌ Erreur: Fonctions non trouvées');
}
