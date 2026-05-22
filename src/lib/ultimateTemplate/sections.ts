import { UltimateContent } from './utils';
import { TemplateStyle, getSectorLayout } from './templates';

export function generateMenuSection(content: UltimateContent, template: TemplateStyle): string {
  const { companyName, services, email } = content;
  const cleanEmail = email || 'contact@example.com';
  const formSubmitEndpoint = `https://formsubmit.co/${cleanEmail.replace(/[^a-zA-Z0-9@.]/g, '')}`;

  return `
    <!-- MENU SECTION -->
    <section id="menu" class="py-20 bg-gradient-to-br from-stone-50 to-white">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-4" style="color: ${template.primary}">
            Notre Carte
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez nos créations culinaires préparées avec des produits frais et locaux.
          </p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${services.map((service, index) => `
            <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div class="h-48 bg-gradient-to-br from-${template.primary}/20 to-${template.accent}/20 flex items-center justify-center">
                <div class="text-center">
                  <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style="background-color: ${template.primary}">
                    <i data-lucide="utensils" class="w-8 h-8 text-white"></i>
                  </div>
                  <h3 class="text-2xl font-bold" style="color: ${template.primary}">${service.name}</h3>
                </div>
              </div>
              <div class="p-6">
                <p class="text-gray-600 mb-4">${service.description}</p>
                <div class="space-y-2">
                  ${service.features.map(feature => `
                    <div class="flex items-center text-sm text-gray-700">
                      <i data-lucide="check" class="w-4 h-4 mr-2 text-green-500"></i>
                      ${feature}
                    </div>
                  `).join('')}
                </div>
                <div class="mt-6">
                  <span class="text-2xl font-bold" style="color: ${template.primary}">${15 + index * 5}€</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="text-center mt-12">
          <button class="px-8 py-4 rounded-full text-white font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105" style="background-color: ${template.primary}">
            <i data-lucide="download" class="w-5 h-5 mr-2"></i>
            Télécharger la carte complète
          </button>
        </div>
      </div>
    </section>
    <section id="reservation" class="py-20 bg-gradient-to-br from-orange-50 to-amber-50">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-4" style="color: ${template.primary}">
            Réserver une Table
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Réservez votre table en quelques clics et recevez une confirmation immédiate.
          </p>
        </div>
        <div class="max-w-2xl mx-auto">
          <form class="bg-white rounded-2xl shadow-xl p-8" action="${formSubmitEndpoint}" method="POST" target="_blank">
            <input type="text" name="_honey" style="display:none;" />
            <input type="hidden" name="_subject" value="Nouvelle réservation - ${companyName}" />
            <input type="hidden" name="_template" value="box" />
            <input type="hidden" name="type_demande" value="reservation" />
            <input type="hidden" name="restaurant" value="${companyName}" />
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Nom complet *</label>
                <input type="text" name="name" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" placeholder="Votre nom" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Téléphone *</label>
                <input type="tel" name="phone" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" placeholder="Votre téléphone" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                <input type="date" name="date" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Heure *</label>
                <input type="time" name="time" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Nombre de personnes *</label>
                <select name="personnes" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                  <option value="">Choisir...</option>
                  <option value="1">1 personne</option>
                  <option value="2">2 personnes</option>
                  <option value="3">3 personnes</option>
                  <option value="4">4 personnes</option>
                  <option value="5">5 personnes</option>
                  <option value="6">6 personnes</option>
                  <option value="7+">7+ personnes</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input type="email" name="email" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" placeholder="votre@email.com" />
              </div>
            </div>
            <div class="mt-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">Préférences alimentaires</label>
              <textarea name="preferences" rows="3" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" placeholder="Allergies, régime végétarien, etc."></textarea>
            </div>
            <button type="submit" class="w-full mt-6 px-8 py-4 rounded-full text-white font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105" style="background-color: ${template.primary}">
              <i data-lucide="calendar" class="w-5 h-5 mr-2"></i>
              Confirmer la réservation
            </button>
          </form>
        </div>
      </div>
    </section>
  `;
}

export function generateBrandsSection(content: UltimateContent, template: TemplateStyle): string {
  const brands = [
    { name: 'Renault', logo: '🚗' },
    { name: 'Peugeot', logo: '🚙' },
    { name: 'Citroën', logo: '🚐' },
    { name: 'Volkswagen', logo: '🏎️' },
    { name: 'BMW', logo: '🚘' },
    { name: 'Mercedes', logo: '🚛' }
  ];

  return `
    <!-- BRANDS SECTION -->
    <section id="brands" class="py-20 bg-gray-50">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-4" style="color: ${template.primary}">
            Marques Traitées
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Nous intervenons sur toutes les marques avec des pièces d\'origine et des garanties constructeur.
          </p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          ${brands.map(brand => `
            <div class="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div class="text-4xl mb-4">${brand.logo}</div>
              <h3 class="font-semibold text-gray-800">${brand.name}</h3>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
    <section id="appointment" class="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-4" style="color: ${template.primary}">
            Prendre Rendez-vous
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Réservez votre créneau horaire pour un diagnostic ou une intervention.
          </p>
        </div>
        <div class="max-w-2xl mx-auto">
          <form class="bg-white rounded-2xl shadow-xl p-8" action="https://formsubmit.co/${content.email?.replace(/[^a-zA-Z0-9@.]/g, '') || 'contact@example.com'}" method="POST" target="_blank">
            <input type="text" name="_honey" style="display:none;" />
            <input type="hidden" name="_subject" value="Nouveau RDV Garage - ${content.companyName}" />
            <input type="hidden" name="_template" value="box" />
            <input type="hidden" name="type_demande" value="rdv_garage" />
            <input type="hidden" name="garage" value="${content.companyName}" />
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Nom complet *</label>
                <input type="text" name="name" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Votre nom" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Téléphone *</label>
                <input type="tel" name="phone" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Votre téléphone" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input type="email" name="email" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="votre@email.com" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Marque du véhicule *</label>
                <select name="marque" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Choisir...</option>
                  <option value="Renault">Renault</option>
                  <option value="Peugeot">Peugeot</option>
                  <option value="Citroën">Citroën</option>
                  <option value="Volkswagen">Volkswagen</option>
                  <option value="BMW">BMW</option>
                  <option value="Mercedes">Mercedes</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Modèle *</label>
                <input type="text" name="modele" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Ex: Clio, 208, Golf" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Année *</label>
                <input type="number" name="annee" required min="1990" max="2024" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Ex: 2018" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Date souhaitée *</label>
                <input type="date" name="date" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Heure souhaitée *</label>
                <input type="time" name="time" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
            </div>
            <div class="mt-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">Type d'intervention *</label>
              <select name="type_intervention" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Choisir...</option>
                <option value="diagnostic">Diagnostic</option>
                <option value="entretien">Entretien</option>
                <option value="reparation">Réparation</option>
                <option value="controle_technique">Contrôle technique</option>
                <option value="urgence">Urgence</option>
                <option value="autre">Autre</option>
              </select>
            </div>
            <div class="mt-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">Description du problème</label>
              <textarea name="description" rows="3" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Décrivez le problème ou l'intervention souhaitée..."></textarea>
            </div>
            <button type="submit" class="w-full mt-6 px-8 py-4 rounded-full text-white font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105" style="background-color: ${template.primary}">
              <i data-lucide="wrench" class="w-5 h-5 mr-2"></i>
              Confirmer le rendez-vous
            </button>
          </form>
        </div>
      </div>
    </section>
  `;
}

export function generateGallerySection(content: UltimateContent, template: TemplateStyle, allImages: string[]): string {
  const galleryImages = allImages.length > 0 ? allImages.slice(0, 8) : [];
  return `
    <!-- GALLERY SECTION -->
    <section id="gallery" class="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-4" style="color: ${template.primary}">
            Nos Réalisations
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Inspirez-vous de nos dernières créations et tendances.
          </p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          ${galleryImages.map((img, index) => `
            <div class="relative group overflow-hidden rounded-xl aspect-square">
              <img src="${img}" alt="Réalisation ${index + 1}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" loading="lazy" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="absolute bottom-4 left-4 text-white">
                  <p class="text-sm font-semibold">Style ${['Classique', 'Moderne', 'Tendance', 'Avant-gardiste'][index % 4]}</p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="text-center mt-12">
          <button class="px-8 py-4 rounded-full text-white font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105" style="background-color: ${template.primary}">
            <i data-lucide="instagram" class="w-5 h-5 mr-2"></i>
            Voir plus sur Instagram
          </button>
        </div>
      </div>
    </section>
  `;
}

export function generateEmergencySection(content: UltimateContent, template: TemplateStyle): string {
  const { phone } = content;
  return `
    <!-- EMERGENCY SECTION -->
    <section id="emergency" class="py-20 bg-red-600 text-white">
      <div class="container mx-auto px-6">
        <div class="text-center">
          <div class="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
            <i data-lucide="alert-triangle" class="w-10 h-10"></i>
          </div>
          <h2 class="text-4xl md:text-5xl font-bold mb-4">
            Urgence Plomberie
          </h2>
          <p class="text-xl mb-8 max-w-2xl mx-auto">
            Fuite d'eau, panne de chauffage, obstruction ? Nous intervenons 24h/24 et 7j/7.
          </p>
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto">
            <div class="flex items-center justify-center mb-6">
              <i data-lucide="phone" class="w-8 h-8 mr-3"></i>
              <span class="text-3xl font-bold">${phone || 'Nous contacter'}</span>
            </div>
            <p class="text-lg mb-4">Intervention sous 1h30 garantie.</p>
            <button class="w-full px-8 py-4 bg-white text-red-600 rounded-full font-bold hover:bg-gray-100 transition-colors duration-300">
              Appeler d'urgence
            </button>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function generateCertificationsSection(content: UltimateContent, template: TemplateStyle): string {
  const certifications = [
    { name: 'Qualifelec', desc: 'Certification qualité électricité' },
    { name: 'Consuel', desc: 'Attestation de conformité' },
    { name: 'RGE', desc: 'Reconnu Garant de l\'Environnement' },
    { name: 'Norme NFC 15-100', desc: 'Mise aux normes électriques' }
  ];

  return `
    <!-- CERTIFICATIONS SECTION -->
    <section id="certifications" class="py-20 bg-blue-50">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-4" style="color: ${template.primary}">
            Nos Certifications
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Toutes nos interventions sont réalisées selon les normes en vigueur et certifiées.
          </p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          ${certifications.map(cert => `
            <div class="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style="background-color: ${template.primary}">
                <i data-lucide="award" class="w-8 h-8 text-white"></i>
              </div>
              <h3 class="font-bold text-lg mb-2" style="color: ${template.primary}">${cert.name}</h3>
              <p class="text-gray-600 text-sm">${cert.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

export function generatePricingSection(content: UltimateContent, template: TemplateStyle): string {
  const packages = [
    { name: 'Forfait Standard', price: '89€', features: ['2 pièces', 'Nettoyage complet', 'Produits écologiques'] },
    { name: 'Forfait Confort', price: '149€', features: ['3-4 pièces', 'Vitres comprises', 'Débarrassage inclus'] },
    { name: 'Forfait Premium', price: '229€', features: ['5+ pièces', 'Tout inclus', 'Fréquence adaptable'] }
  ];

  return `
    <!-- PRICING SECTION -->
    <section id="pricing" class="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-4" style="color: ${template.primary}">
            Nos Tarifs
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Des formules adaptées à tous les besoins et tous les budgets.
          </p>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
          ${packages.map((pkg, index) => `
            <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${index === 1 ? 'ring-4 ring-' + template.primary + '/20' : ''}">
              ${index === 1 ? `
                <div class="text-center py-4" style="background-color: ${template.primary};">
                  <span class="text-white font-semibold">PLUS POPULAIRE</span>
                </div>
              ` : ''}
              <div class="p-8">
                <h3 class="text-2xl font-bold mb-4">${pkg.name}</h3>
                <div class="text-4xl font-bold mb-6" style="color: ${template.primary};">${pkg.price}</div>
                <ul class="space-y-3 mb-8">
                  ${pkg.features.map(feature => `
                    <li class="flex items-center text-gray-700">
                      <i data-lucide="check" class="w-5 h-5 mr-3 text-green-500"></i>
                      ${feature}
                    </li>
                  `).join('')}
                </ul>
                <button class="w-full px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105" style="${index === 1 ? 'background-color: ' + template.primary + '; color: white;' : 'border: 2px solid ' + template.primary + '; color: ' + template.primary + ';'}">
                  Choisir ce forfait
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

export function generateStandardServicesSection(content: UltimateContent, template: TemplateStyle): string {
  const { services } = content;
  return `
    <!-- SERVICES SECTION -->
    <section id="services" class="py-20 bg-gray-50">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-4" style="color: ${template.primary}">
            Nos Services
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Des solutions professionnelles adaptées à vos besoins.
          </p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${services.map(service => `
            <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div class="w-16 h-16 rounded-full flex items-center justify-center mb-6" style="background: linear-gradient(135deg, ${template.primary} 0%, ${template.accent} 100%);">
                <i data-lucide="wrench" class="w-8 h-8 text-white"></i>
              </div>
              <h3 class="text-2xl font-bold mb-4" style="color: ${template.primary}">${service.name}</h3>
              <p class="text-gray-600 mb-6">${service.description}</p>
              <ul class="space-y-3">
                ${service.features.map(feature => `
                  <li class="flex items-center text-sm text-gray-700">
                    <i data-lucide="check" class="w-4 h-4 mr-2 text-green-500"></i>
                    ${feature}
                  </li>
                `).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

export function generateStandardAboutSection(content: UltimateContent, template: TemplateStyle): string {
  const { companyName, aboutText, city } = content;
  return `
    <!-- ABOUT SECTION -->
    <section id="about" class="py-20 bg-white">
      <div class="container mx-auto px-6">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div class="section-header">
              <h2>À propos de ${companyName}</h2>
              <p>Découvrez notre histoire et notre approche dédiée à ${city || 'votre région'}.</p>
            </div>
            <p class="text-gray-600 leading-relaxed">${aboutText}</p>
          </div>
          <div class="rounded-[2rem] overflow-hidden shadow-2xl">
            <img src="${content.heroImage}" alt="À propos de ${companyName}" loading="lazy" class="w-full h-full object-cover min-h-[380px]" />
          </div>
        </div>
      </div>
    </section>
  `;
}

export function generateStandardTestimonialsSection(content: UltimateContent, template: TemplateStyle): string {
  return `
    <!-- TESTIMONIALS SECTION -->
    <section id="testimonials" class="py-20 bg-gray-50">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-4" style="color: ${template.primary}">
            Ils nous recommandent
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Témoignages authentiques de clients satisfaits.
          </p>
        </div>
        <div class="grid md:grid-cols-2 gap-8">
          ${content.testimonials.map(testimonial => `
            <div class="testimonial-card glass rounded-3xl p-8 shadow-lg">
              <div class="stars">
                ${'<i data-lucide="star" class="w-5 h-5"></i>'.repeat(Math.min(testimonial.rating || 5, 5))}
              </div>
              <p class="text-gray-700 leading-relaxed mb-6">"${testimonial.text}"</p>
              <div class="font-semibold text-gray-900">${testimonial.author}</div>
              <div class="text-sm text-gray-500">${testimonial.date || 'Client satisfait'}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

export function generateStandardContactSection(content: UltimateContent, template: TemplateStyle): string {
  const cleanPhoneLink = content.phone ? content.phone.replace(/[^0-9+]/g, '') : '';
  const mapQuery = encodeURIComponent(`${content.address || content.city || 'France'}`);
  return `
    <!-- CONTACT SECTION -->
    <section id="contact" class="py-20 bg-white">
      <div class="container mx-auto px-6">
        <div class="section-header">
          <h2>Contactez-nous</h2>
          <p>Parlez-nous de votre projet, nous sommes là pour vous répondre rapidement.</p>
        </div>
        <div class="contact-grid">
          <div class="contact-form-side">
            <form class="space-y-6">
              <div class="form-group">
                <label class="font-medium text-gray-700">Nom</label>
                <input class="form-control" placeholder="Votre nom" />
              </div>
              <div class="form-group">
                <label class="font-medium text-gray-700">Email</label>
                <input class="form-control" placeholder="votre@email.com" />
              </div>
              <div class="form-group">
                <label class="font-medium text-gray-700">Téléphone</label>
                <input class="form-control" placeholder="06 12 34 56 78" />
              </div>
              <div class="form-group">
                <label class="font-medium text-gray-700">Message</label>
                <textarea class="form-control" rows="5" placeholder="Expliquez votre besoin..."></textarea>
              </div>
              <button type="submit" class="btn-cta">Envoyer ma demande</button>
            </form>
          </div>
          <div class="map-side">
            <iframe src="https://www.google.com/maps?q=${mapQuery}&output=embed" loading="lazy"></iframe>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function generateSections(content: UltimateContent, template: TemplateStyle, allImages: string[]): string {
  const sectorLayout = getSectorLayout(content.sector);
  let sectionsHTML = '';
  sectorLayout.sections.forEach(sectionType => {
    switch (sectionType) {
      case 'menu': sectionsHTML += generateMenuSection(content, template); break;
      case 'brands': sectionsHTML += generateBrandsSection(content, template); break;
      case 'gallery': sectionsHTML += generateGallerySection(content, template, allImages); break;
      case 'emergency': sectionsHTML += generateEmergencySection(content, template); break;
      case 'certifications': sectionsHTML += generateCertificationsSection(content, template); break;
      case 'pricing': sectionsHTML += generatePricingSection(content, template); break;
      case 'services': sectionsHTML += generateStandardServicesSection(content, template); break;
      case 'about': sectionsHTML += generateStandardAboutSection(content, template); break;
      case 'testimonials': sectionsHTML += generateStandardTestimonialsSection(content, template); break;
      case 'contact': sectionsHTML += generateStandardContactSection(content, template); break;
      default: break;
    }
  });
  return sectionsHTML;
}
