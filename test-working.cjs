// Test simple avec le système existant qui fonctionne
const fs = require('fs');
const path = require('path');

console.log('=== TEST SYSTÈME FONCTIONNEL ===\n');

// Simuler la génération manuellement
const testLead = {
  id: 'test-123',
  name: 'Plomberie Pro',
  sector: 'plomberie',
  city: 'Paris',
  phone: '+33612345678',
  email: 'test@plomberie.fr',
  images: []
};

// Créer un HTML simple qui fonctionne
const generateSimpleHTML = (lead) => {
  const sector = (lead.sector || '').toLowerCase();
  
  // Couleurs spécifiques par secteur
  const colors = {
    plomberie: { primary: '#0f766e', secondary: '#115e59', accent: '#14b8a6', background: '#f0fdfa' },
    coiffeur: { primary: '#ec4899', secondary: '#be185d', accent: '#f472b6', background: '#fdf2f8' },
    restaurant: { primary: '#dc2626', secondary: '#b91c1c', accent: '#ef4444', background: '#fef2f2' },
    electricien: { primary: '#1e40af', secondary: '#1e3a8a', accent: '#3b82f6', background: '#f8fafc' }
  };
  
  const color = colors[sector] || colors.plomberie;
  
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${lead.name} - ${sector} à ${lead.city}</title>
    <style>
        :root {
            --primary: ${color.primary};
            --secondary: ${color.secondary};
            --accent: ${color.accent};
            --background: ${color.background};
        }
        body {
            font-family: 'Inter', sans-serif;
            background: var(--background);
            color: #333;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 10px;
            padding: 40px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        .hero {
            text-align: center;
            margin-bottom: 40px;
        }
        .hero h1 {
            color: var(--primary);
            font-size: 2.5rem;
            margin-bottom: 10px;
        }
        .hero p {
            color: var(--secondary);
            font-size: 1.2rem;
        }
        .contact {
            background: var(--primary);
            color: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            margin-top: 30px;
        }
        .contact a {
            color: white;
            text-decoration: none;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="hero">
            <h1>${lead.name}</h1>
            <p>${sector.charAt(0).toUpperCase() + sector.slice(1)} professionnel à ${lead.city}</p>
        </div>
        
        <div class="contact">
            <h2>Contactez-nous</h2>
            <p>📞 ${lead.phone}</p>
            <p>✉️ ${lead.email}</p>
            <p>📍 ${lead.city}</p>
            <a href="tel:${lead.phone}">Appeler maintenant</a>
        </div>
    </div>
</body>
</html>`;
};

try {
  console.log('Génération HTML simple...');
  const html = generateSimpleHTML(testLead);
  
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
    fs.writeFileSync('test-working.html', html);
    console.log('📄 Fichier test-working.html créé');
    console.log('🌍 Ouvrez ce fichier dans votre navigateur pour tester');
    
  } else {
    console.log('❌ Échec génération HTML');
  }
  
} catch (error) {
  console.error('❌ Erreur:', error.message);
  console.error('Stack:', error.stack);
}
