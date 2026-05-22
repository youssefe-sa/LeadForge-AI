// Thin coordinator for ultimate template rendering.
// This file keeps `generateUltimateSiteAsync` as the public entrypoint and
// delegates rendering and helpers to the modular files under
// `src/lib/ultimateTemplate/` (render, templates, utils).

import { getImagesForLead } from './pexelsApi';
import { renderUltimateTemplate } from './ultimateTemplate/render';
import { getUltimateTemplate, getSectorImagesFallback } from './ultimateTemplate/templates';
import {
  UltimateContent,
  validateLeadData,
  validateAndCategorizeImages,
  generateAboutText,
  generateFeaturesFromService,
  extractAndValidateRealReviews,
  buildCompleteTestimonialList
} from './ultimateTemplate/utils';

// Public async generator used by WebsiteGenerator
export async function generateUltimateSiteAsync(lead: any, aiContent?: any): Promise<string> {
  const validationResult = validateLeadData(lead);
  if (!validationResult.isValid) {
    console.error(`? Erreur validation donn�es pour ${lead.name}:`, validationResult.errors);
  }
  if (validationResult.warnings.length > 0) {
    console.warn(`?? Avertissements pour ${lead.name}:`, validationResult.warnings);
  }

  const template = getUltimateTemplate(lead.sector || '');
  const companyName = lead.name || 'Entreprise Premium';
  const city = lead.city || '';
  const phone = lead.phone || '+33 6 12 34 56 78';
  const email = lead.email || 'contact@entreprise.fr';
  const address = lead.address || (city ? `Centre Ville, ${city}` : 'France');
  const website = lead.website || '';
  const rating = lead.googleRating || 5;
  const reviews = lead.googleReviews || 42;

  const rawDescription = aiContent?.aboutText || lead.description || template.aboutText;
  const description = generateAboutText(rawDescription, lead);
  const heroTitle = aiContent?.heroTitle || template.heroTitle || '';
  const heroSubtitle = aiContent?.heroSubtitle || `${template.heroSubtitle || ''}${city ? ' � ' + city : ''}`;

  // Load images: try Pexels API, fallback to sector images
  let combinedImages: string[] = [];
  try {
    combinedImages = await getImagesForLead(lead, 6);
  } catch (err) {
    console.warn('Erreur r�cup�ration images Pexels, fallback sector', err);
    combinedImages = getSectorImagesFallback(lead.sector || '');
  }

  // Prepare services
  let finalServices = template.services || [];
  if (aiContent?.services && Array.isArray(aiContent.services) && aiContent.services.length > 0) {
    finalServices = aiContent.services.map((s: any, idx: number) => ({
      name: s.name || `Service ${idx + 1}`,
      description: s.description || '',
      features: (s.features && s.features.length > 0) ? s.features.slice(0, 3) : generateFeaturesFromService(s.name, s.description, lead.sector)
    }));
  }

  // Reviews
  const realReviews = extractAndValidateRealReviews(lead.googleReviewsData || [], lead);
  const finalTestimonials = buildCompleteTestimonialList(realReviews, lead.sector, 6);

  const ctaText = (aiContent?.cta || template.ctaText || 'Demander un devis').substring(0, 50);

  const content: UltimateContent = {
    companyName,
    sector: lead.sector || 'Professionnel',
    city,
    description,
    phone,
    email,
    address,
    website,
    rating,
    reviews,
    services: finalServices,
    testimonials: finalTestimonials,
    heroTitle,
    heroSubtitle,
    aboutText: description,
    ctaText,
    slogan: aiContent?.slogan || template.heroTitle || '',
    heroImage: combinedImages[0] || '',
    allImages: combinedImages
  };

  const processedImages = validateAndCategorizeImages(combinedImages, false);
  return renderUltimateTemplate(content, processedImages);
}

