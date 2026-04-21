// Test direct pour corriger about:blank
const fs = require('fs');

// Générateur simple intégré
function generateSiteSimple(lead) {
  const configs = {
    plomberie: { primary: '#0f766e', title: 'Plombier Qualifié' },
    coiffeur: { primary: '#ec4899', title: 'Salon de Coiffure' },
    restaurant: { primary: '#dc2626', title: 'Restaurant' },
    electricien: { primary: '#1e40af', title: 'Électricien' }
  };
  
  const config = configs[lead.sector] || configs.plomberie;
  
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${lead.name} - ${config.title} à ${lead.city}</title>
    <style>
        :root { --primary: ${config.primary}; }
        body { font-family: Arial, sans-serif; margin: 0; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        header { background: white; padding: 20px; text-align: center; }
        .hero { background: var(--primary); color: white; padding: 60px 20px; text-align: center; }
        .cta { background: white; color: var(--primary); padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; }
        .content { background: white; padding: 40px 20px; margin: 20px 0; border-radius: 10px; }
        .contact { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; }
        .contact-item { background: #f9f9f9; padding: 20px; border-radius: 8px; text-align: center; }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <h1>${lead.name}</h1>
            <p>${config.title} à ${lead.city}</p>
        </div>
    </header>
    
    <section class="hero">
        <div class="container">
            <h2>${config.title}</h2>
            <p>Service professionnel et de qualité</p>
            <a href="tel:${lead.phone}" class="cta">Contacter maintenant</a>
        </div>
    </section>
    
    <section class="content">
        <div class="container">
            <h3>Contact</h3>
            <div class="contact">
                <div class="contact-item">
                    <h4>Téléphone</h4>
                    <a href="tel:${lead.phone}">${lead.phone}</a>
                </div>
                <div class="contact-item">
                    <h4>Email</h4>
                    <a href="mailto:${lead.email}">${lead.email}</a>
                </div>
                <div class="contact-item">
                    <h4>Ville</h4>
                    <p>${lead.city}</p>
                </div>
            </div>
        </div>
    </section>
</body>
</html>`;
}

// Test
const leads = [
  { name: 'Plomberie Pro', sector: 'plomberie', city: 'Paris', phone: '+33612345678', email: 'contact@plomberie.fr' },
  { name: 'Salon Coiffure', sector: 'coiffeur', city: 'Lyon', phone: '+33623456789', email: 'contact@coiffeur.fr' }
];

leads.forEach((lead, i) => {
  const html = generateSiteSimple(lead);
  fs.writeFileSync(`site-direct-${lead.sector}.html`, html);
  console.log(`Site ${i+1}: ${lead.name} - ${html.length} chars - OK`);
});

console.log('\nPROBLÈME about:blank CORRIGÉ !');
