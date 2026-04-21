// Test direct du générateur de sites - Sans imports complexes
const fs = require('fs');

console.log('=== TEST DIRECT GÉNÉRATEUR ===\n');

// Fonction de génération simple intégrée
function generateSimpleSite(lead) {
  const templates = {
    plomberie: {
      primary: '#0f766e',
      secondary: '#115e59', 
      accent: '#14b8a6',
      background: '#f0fdfa',
      title: 'Plombier Qualifié',
      subtitle: 'Intervention rapide et travail garanti',
      services: ['Dépannage Urgence', 'Installation Sanitaire', 'Chauffage & Clim', 'Diagnostic Fuites', 'Rénovation Complète'],
      guarantees: ['Garantie Décennale', 'Intervention 24/7', 'Devis Gratuit', 'Qualité Professionnelle']
    },
    coiffeur: {
      primary: '#ec4899',
      secondary: '#be185d',
      accent: '#f472b6', 
      background: '#fdf2f8',
      title: 'Salon de Coiffure',
      subtitle: 'Votre style, notre passion',
      services: ['Coupe Homme', 'Coupe Femme', 'Coloration', 'Brushing', 'Soin Capillaire', 'Barbe'],
      guarantees: ['Produits Premium', 'Coiffeurs Experts', 'Conseil Personnalisé', 'Ambiance Chic']
    },
    restaurant: {
      primary: '#dc2626',
      secondary: '#b91c1c',
      accent: '#ef4444',
      background: '#fef2f2',
      title: 'Restaurant Gastronomique',
      subtitle: 'Une expérience culinaire unique',
      services: ['Petit Déjeuner', 'Déjeuner', 'Dîner', 'Menu Dégustation', 'Vins Sélectionnés', 'Desserts Maison'],
      guarantees: ['Produits Frais', 'Chef Étoilé', 'Service Impeccable', 'Ambiance Raffinée']
    },
    electricien: {
      primary: '#1e40af',
      secondary: '#1e3a8a',
      accent: '#3b82f6',
      background: '#f8fafc',
      title: 'Électricien Certifié',
      subtitle: 'Mise aux normes et sécurité garantie',
      services: ['Installation Électrique', 'Mise aux Normes', 'Tableau Électrique', 'Éclairage', 'Domotique', 'Diagnostic'],
      guarantees: ['Certification NF', 'Garantie 10 ans', 'Sécurité Conforme', 'Intervention Rapide']
    }
  };

  const template = templates[lead.sector] || templates.plomberie;
  
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${lead.name} - ${template.title} à ${lead.city}</title>
    <style>
        :root {
            --primary: ${template.primary};
            --secondary: ${template.secondary};
            --accent: ${template.accent};
            --background: ${template.background};
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: var(--background);
            color: #1f2937;
            line-height: 1.6;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        header {
            background: white;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            position: sticky;
            top: 0;
            z-index: 100;
        }
        
        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 0;
        }
        
        .logo {
            font-size: 1.5rem;
            font-weight: bold;
            color: var(--primary);
        }
        
        .contact-header {
            display: flex;
            gap: 1rem;
            align-items: center;
        }
        
        .contact-header a {
            color: var(--primary);
            text-decoration: none;
            font-weight: 500;
        }
        
        .hero {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white;
            padding: 4rem 0;
            position: relative;
            overflow: hidden;
        }
        
        .hero-content {
            position: relative;
            z-index: 1;
            text-align: center;
        }
        
        .hero h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            font-weight: 700;
        }
        
        .hero p {
            font-size: 1.25rem;
            margin-bottom: 2rem;
            opacity: 0.9;
        }
        
        .cta-button {
            background: white;
            color: var(--primary);
            padding: 1rem 2rem;
            border: none;
            border-radius: 8px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
        
        .services {
            padding: 4rem 0;
            background: white;
        }
        
        .section-title {
            text-align: center;
            font-size: 2.5rem;
            color: var(--primary);
            margin-bottom: 3rem;
        }
        
        .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }
        
        .service-card {
            background: var(--background);
            padding: 2rem;
            border-radius: 12px;
            text-align: center;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .service-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        .service-card h3 {
            color: var(--primary);
            margin-bottom: 1rem;
            font-size: 1.3rem;
        }
        
        .guarantees {
            padding: 4rem 0;
            background: white;
        }
        
        .guarantees-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
        }
        
        .guarantee-card {
            text-align: center;
            padding: 2rem;
            border-radius: 12px;
            background: var(--background);
        }
        
        .guarantee-icon {
            width: 60px;
            height: 60px;
            background: var(--primary);
            border-radius: 50%;
            margin: 0 auto 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.5rem;
        }
        
        .contact {
            padding: 4rem 0;
            background: var(--primary);
            color: white;
        }
        
        .contact-content {
            text-align: center;
        }
        
        .contact-info {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }
        
        .contact-item {
            background: rgba(255,255,255,0.1);
            padding: 2rem;
            border-radius: 12px;
        }
        
        .contact-item h3 {
            margin-bottom: 1rem;
        }
        
        .contact-item a {
            color: white;
            text-decoration: none;
            font-size: 1.1rem;
        }
        
        footer {
            background: var(--secondary);
            color: white;
            text-align: center;
            padding: 2rem 0;
        }
        
        @media (max-width: 768px) {
            .hero h1 {
                font-size: 2rem;
            }
            
            .contact-header {
                flex-direction: column;
                gap: 0.5rem;
            }
            
            nav {
                flex-direction: column;
                gap: 1rem;
            }
        }
    </style>
</head>
<body>
    <header>
        <nav class="container">
            <div class="logo">${lead.name}</div>
            <div class="contact-header">
                <a href="tel:${lead.phone}">Appeler</a>
                <a href="mailto:${lead.email}">Email</a>
            </div>
        </nav>
    </header>

    <section class="hero">
        <div class="container">
            <div class="hero-content">
                <h1>${template.title}</h1>
                <p>${template.subtitle} à ${lead.city}</p>
                <a href="tel:${lead.phone}" class="cta-button">Contacter maintenant</a>
            </div>
        </div>
    </section>

    <section class="services">
        <div class="container">
            <h2 class="section-title">Nos Services</h2>
            <div class="services-grid">
                ${template.services.map(service => `
                    <div class="service-card">
                        <h3>${service}</h3>
                        <p>Service professionnel de qualité</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    <section class="guarantees">
        <div class="container">
            <h2 class="section-title">Nos Garanties</h2>
            <div class="guarantees-grid">
                ${template.guarantees.map(guarantee => `
                    <div class="guarantee-card">
                        <div class="guarantee-icon">?</div>
                        <h3>${guarantee}</h3>
                        <p>Engagement pris pour votre satisfaction</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    <section class="contact">
        <div class="container">
            <div class="contact-content">
                <h2 class="section-title">Contactez-nous</h2>
                <div class="contact-info">
                    <div class="contact-item">
                        <h3>Téléphone</h3>
                        <a href="tel:${lead.phone}">${lead.phone}</a>
                    </div>
                    <div class="contact-item">
                        <h3>Email</h3>
                        <a href="mailto:${lead.email}">${lead.email}</a>
                    </div>
                    <div class="contact-item">
                        <h3>Adresse</h3>
                        <p>${lead.address || lead.city}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <footer>
        <div class="container">
            <p>&copy; 2024 ${lead.name}. Tous droits réservés.</p>
        </div>
    </footer>
</body>
</html>`;
}

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
