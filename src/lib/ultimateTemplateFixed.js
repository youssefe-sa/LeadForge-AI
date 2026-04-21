// Template ULTIME - Version finale corrigée et fonctionnelle
// Résout définitivement tous les problèmes de génération de sites web

// Templates sectoriels avec couleurs et contenus spécifiques
const SECTOR_CONFIGS = {
  plomberie: {
    primary: '#0f766e',
    secondary: '#115e59',
    accent: '#14b8a6',
    background: '#f0fdfa',
    title: 'Plombier Qualifié',
    subtitle: 'Intervention rapide et travail garanti',
    services: ['Dépannage Urgence', 'Installation Sanitaire', 'Chauffage & Climatisation', 'Diagnostic Fuites', 'Rénovation Complète'],
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
  },
  garage: {
    primary: '#ea580c',
    secondary: '#c2410c',
    accent: '#f97316',
    background: '#fff7ed',
    title: 'Garage Automobile',
    subtitle: 'Entretien et réparation tous véhicules',
    services: ['Entretien', 'Réparation Moteur', 'Carrosserie', 'Contrôle Technique', 'Pneus', 'Vidange'],
    guarantees: ['Diagnostic Expert', 'Pièces d\'Origine', 'Garantie 2 ans', 'Service Rapide']
  },
  fitness: {
    primary: '#7c3aed',
    secondary: '#6d28d9',
    accent: '#8b5cf6',
    background: '#faf5ff',
    title: 'Club de Fitness',
    subtitle: 'Votre bien-être est notre priorité',
    services: ['Musculation', 'Cardio', 'Cours Collectifs', 'Coach Personnel', 'Salle de Sport', 'Spa'],
    guarantees: ['Équipements Modernes', 'Coachs Diplômés', 'Programmes Sur-mesure', 'Ambiance Motivante']
  },
  medical: {
    primary: '#0891b2',
    secondary: '#0e7490',
    accent: '#06b6d4',
    background: '#f0fdfa',
    title: 'Cabinet Médical',
    subtitle: 'Votre santé, notre engagement',
    services: ['Consultations', 'Urgences', 'Examens', 'Vaccinations', 'Ordonnances', 'Suivi'],
    guarantees: ['Médecins Qualifiés', 'Confidentialité', 'Disponibilité', 'Équipements Modernes']
  },
  avocat: {
    primary: '#4338ca',
    secondary: '#3730a3',
    accent: '#6366f1',
    background: '#eef2ff',
    title: 'Cabinet d\'Avocats',
    subtitle: 'Conseil juridique et représentation',
    services: ['Consultation', 'Droit Civil', 'Droit Pénal', 'Droit des Affaires', 'Médiation', 'Assistance'],
    guarantees: ['Expertise Reconnue', 'Confidentialité', 'Stratégie Sur-mesure', 'Résultats Garantis']
  },
  nettoyage: {
    primary: '#059669',
    secondary: '#047857',
    accent: '#10b981',
    background: '#f0fdf4',
    title: 'Service de Nettoyage',
    subtitle: 'Propreté et hygiène professionnelles',
    services: ['Nettoyage Bureau', 'Ménage Domicile', 'Fenêtres', 'Revêtements', 'Désinfection', 'Entretien'],
    guarantees: ['Produits Écologiques', 'Personnel Formé', 'Garantie Satisfaction', 'Flexibilité Horaires']
  },
  jardin: {
    primary: '#16a34a',
    secondary: '#15803d',
    accent: '#22c55e',
    background: '#f0fdf4',
    title: 'Paysagiste Jardinier',
    subtitle: 'Création et entretien d\'espaces verts',
    services: ['Création Jardin', 'Entretien', 'Arboriculture', 'Clôture', 'Irrigation', 'Élagage'],
    guarantees: ['Expertise Végétale', 'Matériaux Qualité', 'Conseil Aménagement', 'Saison Garantie']
  }
};

// Images sectorielles
const SECTOR_IMAGES = {
  plomberie: [
    'https://images.unsplash.com/photo-1584309983831-3c8e2e4df5b2?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1603732552814-84b0f2e5a7d2?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1584622650111-993a445fb15c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1548839140-29a7b1bf16af?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1603732562041-f3e0e5fe5b80?w=800&h=600&fit=crop'
  ],
  coiffeur: [
    'https://images.unsplash.com/photo-1560066984-9d7308940ddd?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1490366850594-52f7a99e0c4f?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1522336572468-24b0eae66878?w=800&h=600&fit=crop'
  ],
  restaurant: [
    'https://images.unsplash.com/photo-1414235070428-f2b63ada7c0a?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1555396273-367c4d0ed2cf?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1577189265742-5c2e1b6c5c1c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&h=600&fit=crop'
  ],
  electricien: [
    'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1628627876849-6d4d6b31b4b0?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1603732552814-84b0f2e5a7d2?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop'
  ],
  garage: [
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop'
  ]
};

// Obtenir la configuration pour un secteur
function getSectorConfig(sector) {
  const normalizedSector = sector.toLowerCase();
  return SECTOR_CONFIGS[normalizedSector] || SECTOR_CONFIGS.plomberie;
}

// Obtenir les images pour un secteur
function getSectorImages(sector) {
  const normalizedSector = sector.toLowerCase();
  return SECTOR_IMAGES[normalizedSector] || SECTOR_IMAGES.plomberie;
}

// Rotation des images basée sur le nom de l'entreprise
function rotateImages(images, companyName) {
  let hash = 0;
  for (let i = 0; i < companyName.length; i++) {
    hash += companyName.charCodeAt(i);
  }
  const startIndex = hash % images.length;
  
  const rotated = [];
  for (let i = 0; i < images.length; i++) {
    rotated.push(images[(startIndex + i) % images.length]);
  }
  return rotated;
}

// Génération HTML principale
function generateUltimateSiteFixed(lead, aiContent, apiConfig) {
  const config = getSectorConfig(lead.sector);
  const images = rotateImages(getSectorImages(lead.sector), lead.name);
  
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${lead.name} - ${config.title} à ${lead.city}</title>
    <meta name="description" content="${lead.description || config.subtitle}">
    <meta property="og:title" content="${lead.name} - ${config.title}">
    <meta property="og:description" content="${lead.description || config.subtitle}">
    <meta property="og:image" content="${images[0]}">
    
    <style>
        :root {
            --primary: ${config.primary};
            --secondary: ${config.secondary};
            --accent: ${config.accent};
            --background: ${config.background};
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
        
        /* Header */
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
        
        /* Hero Section */
        .hero {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white;
            padding: 4rem 0;
            position: relative;
            overflow: hidden;
        }
        
        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('${images[0]}') center/cover;
            opacity: 0.1;
            z-index: 0;
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
        
        /* Services Section */
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
        
        /* Gallery Section */
        .gallery {
            padding: 4rem 0;
            background: var(--background);
        }
        
        .gallery-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1rem;
        }
        
        .gallery-item {
            position: relative;
            border-radius: 12px;
            overflow: hidden;
            height: 250px;
        }
        
        .gallery-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s;
        }
        
        .gallery-item:hover img {
            transform: scale(1.05);
        }
        
        /* Guarantees Section */
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
        
        /* Contact Section */
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
        
        /* Footer */
        footer {
            background: var(--secondary);
            color: white;
            text-align: center;
            padding: 2rem 0;
        }
        
        /* Responsive */
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
                <h1>${config.title}</h1>
                <p>${config.subtitle} à ${lead.city}</p>
                <a href="tel:${lead.phone}" class="cta-button">Contacter maintenant</a>
            </div>
        </div>
    </section>

    <section class="services">
        <div class="container">
            <h2 class="section-title">Nos Services</h2>
            <div class="services-grid">
                ${config.services.map(service => `
                    <div class="service-card">
                        <h3>${service}</h3>
                        <p>Service professionnel de qualité</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    <section class="gallery">
        <div class="container">
            <h2 class="section-title">Nos Réalisations</h2>
            <div class="gallery-grid">
                ${images.map(img => `
                    <div class="gallery-item">
                        <img src="${img}" alt="Réalisation ${lead.name}" />
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    <section class="guarantees">
        <div class="container">
            <h2 class="section-title">Nos Garanties</h2>
            <div class="guarantees-grid">
                ${config.guarantees.map(guarantee => `
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

// Export pour CommonJS
exports.generateUltimateSiteFixed = generateUltimateSiteFixed;
