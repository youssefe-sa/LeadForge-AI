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

  const enrichedServices = services.map(s => ({
    name: s.name,
    description: isEn
      ? `${s.name} - Professional ${lead.sector || 'service'} tailored to your needs.`
      : `${s.name} — Prestation ${lead.sector || 'professionnelle'} adaptée à vos besoins.`,
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

  const whyChooseUs = isEn
    ? [`Over ${years} years of experience`, 'Professional certified team', 'Free quote and consultation', 'Satisfaction guaranteed']
    : [`Plus de ${years} ans d'expérience`, 'Équipe professionnelle certifiée', 'Devis gratuit et sans engagement', 'Satisfaction garantie'];

  const cityStr = lead.city ? (isEn ? ` in ${lead.city}` : ` à ${lead.city}`) : '';
  const aboutText = lead.description
    ? lead.description
    : isEn
      ? `${lead.name} is a ${lead.sector || 'professional business'}${cityStr}. Our team is committed to delivering quality service.`
      : `${lead.name} est ${lead.sector || 'un établissement'}${cityStr}. Notre équipe met un point d'honneur à offrir un service de qualité.`;

  return {
    heroTitle: lead.name,
    heroSubtitle: lead.description || (isEn
      ? `Professional ${lead.sector || 'service'}${cityStr} — Discover our expertise`
      : `${lead.sector || 'Professionnel'}${cityStr} — Découvrez notre savoir-faire`),
    aboutText,
    aboutTitle: isEn ? 'About Us' : 'À Propos',
    services: enrichedServices,
    servicesTitle: isEn ? 'Our Services' : 'Nos Services',
    whyChooseUs,
    testimonials,
    ctaText: isEn ? 'Contact Us' : 'Contactez-nous',
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

  try {
    const prompt = buildLlmPrompt(lead, isEn);
    const system = isEn
      ? 'You are a French web copywriter. Return ONLY valid JSON, no markdown.'
      : 'Tu es un copywriter web expert français. Retourne UNIQUEMENT du JSON valide sans markdown.';

    const response = await callLLM(apiConfig, prompt, system);

    const jsonMatch = response?.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      const enriched = buildEnrichedContent(lead, isEn);
      return {
        ...enriched,
        ...parsed,
        services: parsed.services || enriched.services,
        testimonials: parsed.testimonials || enriched.testimonials,
        whyChooseUs: parsed.whyChooseUs || enriched.whyChooseUs,
      };
    }
  } catch {
  }

  return buildEnrichedContent(lead, isEn);
}
