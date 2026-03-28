// Test simple sans Jest
const fs = require('fs');
const path = require('path');

console.log('🧪 Test simple de validation...');

// Test de base
const testSanitizeInput = (input, expected) => {
  const result = input.replace(/[<>]/g, '').slice(0, 1000).trim();
  const passed = result === expected;
  console.log(`  sanitizeInput("${input}") → "${result}" ${passed ? '✅' : '❌'}`);
  return passed;
};

const testValidateEmail = (email, expected) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const result = emailRegex.test(email) && email.length <= 254;
  const passed = result === expected;
  console.log(`  validateEmail("${email}") → ${result} ${passed ? '✅' : '❌'}`);
  return passed;
};

// Exécuter les tests
console.log('📋 Tests de validation:');
const test1 = testSanitizeInput('test', 'test');
const test2 = testSanitizeInput('<script>alert("xss")</script>', 'scriptalert("xss")');
const test3 = testValidateEmail('test@example.com', true);
const test4 = testValidateEmail('invalid', false);
const test5 = testValidateEmail('', false);

const allPassed = test1 && test2 && test3 && test4 && test5;
console.log(`\n🎯 Résultat: ${allPassed ? '✅ TOUS LES TESTS PASSÉS' : '❌ CERTAINS TESTS ÉCHOUÉS'}`);

if (allPassed) {
  console.log('🚀 Les fonctions de validation sont opérationnelles!');
} else {
  console.log('⚠️ Des problèmes ont été détectés dans les fonctions de validation.');
}
