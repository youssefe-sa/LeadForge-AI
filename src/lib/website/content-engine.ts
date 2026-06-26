import { Lead, ApiConfig, callLLM } from '../supabase-store';
import { WebsiteContent } from './types';
import { getSectorServices } from './data/sector-services';
import { getSectorFallbackReviews } from './data/fallback-reviews';

function detectLanguage(lead: Lead): 'fr' | 'en' {
  const city = (lead.city || '').toLowerCase();
  const englishCities = ['london', 'new york', 'chicago', 'los angeles', 'san francisco', 'miami', 'toronto', 'sydney', 'dubai'];
  const frenchCities = ['paris', 'lyon', 'marseille', 'toulouse', 'nice', 'nantes', 'bordeaux', 'lille', 'strasbourg'];
  if (englishCities.some(c => city.includes(c))) return 'en';
  if (frenchCities.some(c => city.includes(c))) return 'fr';
  return 'fr';
}

function extractYears(lead: Lead): string {
  if (lead.description) {
    const match = lead.description.match(/(\d+)\s*ans?\s+d['']exp[eé]rience/i);
    if (match) return match[1];
  }
  return '15';
}

function buildEnrichedContent(lead: Lead, isEn: boolean): WebsiteContent {
  const services = getSectorServices(lead.sector);
  const years = extractYears(lead);
  const sector = (lead.sector || '').toLowerCase();
  const cityStr = lead.city ? (isEn ? ` in ${lead.city}` : ` à ${lead.city}`) : '';

  const enrichedServices = services.map(s => ({
    name: s.name,
    description: s.description,
    features: s.features
  }));

  const googleReviews = (lead.googleReviewsData || [])
    .filter(r => r && r.text)
    .slice(0, 6)
    .map(r => ({
      author: r.author || (isEn ? 'Client' : 'Client satisfait'),
      text: r.text || (isEn ? 'Excellent service!' : 'Excellent service !'),
      rating: r.rating || 5,
      date: r.date || ''
    }));

  const testimonials = googleReviews.length >= 2
    ? googleReviews
    : getSectorFallbackReviews(lead.sector).slice(0, 4);

  let whyChooseUs: string[];
  let aboutText: string;
  let heroSubtitle: string;

  if (sector.includes('plomb')) {
    aboutText = lead.description || `Fuite d'eau ? Chauffe-eau en panne ? Plomberie Express${cityStr} intervient 7j/7, sous 1h30 en moyenne. Plombiers expérimentés, devis gratuit, garantie 2 ans.`;
    heroSubtitle = lead.description || `Plombier professionnel${cityStr} — Intervention urgente 24h/24 · Devis gratuit · ${years} ans d'expérience`;
    whyChooseUs = [`+${years} ans d'expérience`, 'Intervention sous 1h30', 'Devis gratuit sans surprise', 'Garantie 2 ans sur tous les travaux'];
  } else if (sector.includes('electric')) {
    aboutText = lead.description || `Votre électricien certifié${cityStr}. Mise aux normes NFC 15-100, domotique, dépannage urgent. Techniciens Qualifelec, devis gratuit.`;
    heroSubtitle = lead.description || `Électricien certifié${cityStr} — Installation · Dépannage · Domotique · NFC 15-100 · Devis offert`;
    whyChooseUs = [`+${years} ans d'expérience`, 'Certification Qualifelec', 'Mise aux normes NFC 15-100', 'Devis gratuit personnalisé'];
  } else if (sector.includes('coiff')) {
    aboutText = lead.description || `Salon de coiffure${cityStr} — Coupes modernes, coloration, barbier, extensions. Produits professionnels L'Oréal & Kérastase.`;
    heroSubtitle = lead.description || `Coiffeur${cityStr} — Coupe · Couleur · Barbier · Extensions · Produits pro`;
    whyChooseUs = [`+${years} ans d'expérience`, 'Produits professionnels', 'Visagisme personnalisé', 'Ambiance détente & conviviale'];
  } else if (sector.includes('restaurant')) {
    aboutText = lead.description || `Restaurant${cityStr} — Cuisine maison avec des produits frais et de saison. Service traiteur et salle privatisable.`;
    heroSubtitle = lead.description || `Restaurant${cityStr} — Cuisine maison · Produits frais · Traiteur · Événements`;
    whyChooseUs = [`+${years} ans d'expérience`, 'Produits frais et locaux', 'Cuisine 100% maison', 'Cadre chaleureux et élégant'];
  } else if (sector.includes('garage')) {
    aboutText = lead.description || `Garage${cityStr} — Mécanique toutes marques, diagnostic électronique, carrosserie, pneus. Véhicule de prêt gratuit.`;
    heroSubtitle = lead.description || `Garage${cityStr} — Mécanique · Diagnostic · Carrosserie · Pneus · Véhicule de prêt`;
    whyChooseUs = [`+${years} ans d'expérience`, 'Véhicule de prêt gratuit', 'Garantie 2 ans pièces & main-d\'œuvre', 'Diagnostic offert sur devis'];
  } else if (sector.includes('nettoyage')) {
    aboutText = lead.description || `Nettoyage professionnel${cityStr} — Bureaux, vitres, après travaux. Produits écologiques, équipe formée, contrat sur mesure.`;
    heroSubtitle = lead.description || `Nettoyage pro${cityStr} — Bureaux · Vitres · Après travaux · Produits écolabels`;
    whyChooseUs = [`+${years} ans d'expérience`, 'Produits écologiques certifiés', 'Équipe formée et vérifiée', 'Contrat flexible sans engagement'];
  } else if (sector.includes('jardin')) {
    aboutText = lead.description || `Paysagiste${cityStr} — Création de jardins, élagage, entretien, terrasses. Sur-mesure, devis gratuit.`;
    heroSubtitle = lead.description || `Paysagiste${cityStr} — Création · Entretien · Élagage · Terrasse · Devis offert`;
    whyChooseUs = [`+${years} ans d'expérience`, 'Plan 3D avant travaux', 'Plantes adaptées à votre région', 'Garantie reprise 1 an'];
  } else if (sector.includes('fitness')) {
    aboutText = lead.description || `Salle de sport${cityStr} — Coaching personnel, cours collectifs, musculation, cardio. 1 séance d'essai gratuite.`;
    heroSubtitle = lead.description || `Fitness${cityStr} — Coaching · Cours · Musculation · Cardio · Essai gratuit`;
    whyChooseUs = [`+${years} ans d'expérience`, 'Coachs diplômés d\'État', 'Séance d\'essai gratuite', 'Cours collectifs illimités'];
  } else if (sector.includes('medical') || sector.includes('medecin') || sector.includes('dentiste')) {
    aboutText = lead.description || `Cabinet médical${cityStr} — Consultation, kiné, ostéo, infirmier à domicile. RDV sous 24h, téléconsultation 7j/7.`;
    heroSubtitle = lead.description || `Cabinet médical${cityStr} — Consultation · Kiné · Ostéo · Infirmier · Téléconsultation`;
    whyChooseUs = [`+${years} ans d'expérience`, 'RDV sous 24h', 'Tiers payant accepté', 'Visite à domicile possible'];
  } else if (sector.includes('avocat')) {
    aboutText = lead.description || `Cabinet d'avocats${cityStr} — Droit civil, pénal, travail, affaires. Première consultation d'orientation, aide juridictionnelle acceptée.`;
    heroSubtitle = lead.description || `Avocat${cityStr} — Civil · Pénal · Travail · Affaires · Aide juridictionnelle`;
    whyChooseUs = [`+${years} ans d'expérience`, 'Aide juridictionnelle acceptée', 'Spécialistes reconnus', 'Suivi personnalisé continu'];
  } else {
    aboutText = lead.description || `${lead.name}${cityStr} — Professionnel à votre service. Devis gratuit, intervention rapide, satisfaction garantie.`;
    heroSubtitle = lead.description || `${lead.sector || 'Professionnel'}${cityStr} — Service professionnel · Devis gratuit · Intervention rapide`;
    whyChooseUs = [`+${years} ans d'expérience`, 'Service professionnel', 'Devis gratuit', 'Satisfaction garantie'];
  }

  return {
    heroTitle: lead.name,
    heroSubtitle,
    aboutText,
    aboutTitle: isEn ? 'About Us' : 'À Propos',
    services: enrichedServices,
    servicesTitle: isEn ? 'Our Services' : 'Nos Services',
    whyChooseUs,
    testimonials,
    ctaText: isEn ? 'Call Us' : 'Contactez-nous',
    metaDescription: `${lead.name} — ${lead.sector || 'Professionnel'}${cityStr}. ${lead.description || ''}`.substring(0, 160),
    galleryTitle: isEn ? 'Our Gallery' : 'Nos Réalisations',
    processSteps: undefined
  };
}

function buildLlmPrompt(lead: Lead, isEn: boolean): string {
  const lang = isEn ? 'en' : 'fr';
  const sector = lead.sector || 'professional';
  const city = lead.city || '';
  const years = extractYears(lead);
  const reviews = (lead.googleReviewsData || []).slice(0, 4)
    .map(r => `"${r.text}" — ${r.author} (${r.rating}★)`)
    .join('\n');

  return `Generate unique website content for "${lead.name}" (${sector}${city ? ` in ${city}` : ''}).
${reviews ? `\nCustomer reviews:\n${reviews}` : ''}

Return valid JSON only with these fields:
- heroTitle: string (company name or variant)
- heroSubtitle: string (tagline with ${sector} and ${city} context)
- aboutText: string (company description, ${years}+ years experience)
- aboutTitle: string
- services: array of { name, description, features: string[] } (6 services specific to ${sector})
- servicesTitle: string
- whyChooseUs: string[] (4 reasons including ${years} years experience)
- ctaText: string
- metaDescription: string (max 160 chars)
- testimonials: array of { author, text, rating, date } (use provided reviews or generate plausible ones)

Language: ${lang === 'fr' ? 'French' : 'English'}
ONLY return the JSON object, no markdown.`;
}

export async function generateContent(lead: Lead, apiConfig: ApiConfig): Promise<WebsiteContent> {
  const isEn = detectLanguage(lead) === 'en';
  const hasLLM = !!(apiConfig.groqKey || apiConfig.geminiKey || apiConfig.nvidiaKey || apiConfig.openrouterKey);

  if (!hasLLM) {
    return buildEnrichedContent(lead, isEn);
  }

  const prompt = buildLlmPrompt(lead, isEn);
  const system = isEn
    ? 'You are a professional web copywriter for local businesses. Return ONLY valid JSON, no markdown, no explanations.'
    : 'Tu es un copywriter web professionnel pour artisans et commerçants. Retourne UNIQUEMENT du JSON valide, sans markdown ni explications.';

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await callLLM(apiConfig, prompt, system);
      if (!response) continue;

      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) continue;

      const parsed = JSON.parse(jsonMatch[0]);
      if (!parsed.heroTitle || !parsed.heroSubtitle) continue;

      const enriched = buildEnrichedContent(lead, isEn);
      return {
        ...enriched,
        ...parsed,
        services: Array.isArray(parsed.services) && parsed.services.length >= 3 ? parsed.services : enriched.services,
        testimonials: Array.isArray(parsed.testimonials) && parsed.testimonials.length >= 2 ? parsed.testimonials : enriched.testimonials,
        whyChooseUs: Array.isArray(parsed.whyChooseUs) && parsed.whyChooseUs.length >= 2 ? parsed.whyChooseUs : enriched.whyChooseUs,
      };
    } catch {
      // Retry on failure
    }
  }

  return buildEnrichedContent(lead, isEn);
}
