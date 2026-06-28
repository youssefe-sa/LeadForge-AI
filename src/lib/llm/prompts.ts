// ============================================================
// LeadForge AI — LLM Prompts
// ============================================================

import { Lead } from '../types';
import { safeStr, safeNum } from '../utils';

export function generateWebsitePrompt(lead: Lead): string {
  const reviews = (lead.googleReviewsData || [])
    .filter(r => r && typeof r.text === 'string')
    .map(r => `  - "${r.text}" — ${safeStr(r.author)} (${safeNum(r.rating)}★${r.date ? `, ${safeStr(r.date)}` : ''})`)
    .join('\n');

  const allImages = [...(lead.images || [])].filter(u => typeof u === 'string' && u.startsWith('http'));
  const imageList = allImages.length > 0
    ? allImages.map((url, i) => `  ${i + 1}. ${url}`).join('\n')
    : '  No images found — use sector-appropriate stock photos';

  const wsImages = (lead.websiteImages || []).filter(u => typeof u === 'string' && u.startsWith('http'));
  const wsImageList = wsImages.length > 0
    ? wsImages.map((url, i) => `  ${i + 1}. ${url}`).join('\n')
    : '';

  return `Create a modern theme website for "${lead.name}" with a premium and stylish design. The website should include a strong hero section with logo, headline, short description, and a "Book Appointment" button, and pages like Home, Services, Gallery, About, and Book Appointment.
Appointments should be booked in two ways: users can either fill a complete booking form with service, date, and contact details, or connect directly with the business through a WhatsApp button.

Now use the following "${lead.name}" details to generate the website:

Business Information:
- Business Name: ${lead.name}
- Sector/Category: ${lead.sector || 'Non spécifié'}
- City: ${lead.city || 'Non spécifiée'}
- Full Address: ${lead.address || 'Non renseignée'}
- Phone: ${lead.phone || 'Non renseigné'}
- Email: ${lead.email || 'Non renseigné'}
- Current Website: ${lead.website || 'No existing website'}
- Google Maps: ${lead.googleMapsUrl || 'Non renseigné'}

Google Presence:
- Rating: ${lead.googleRating > 0 ? `${lead.googleRating}/5` : 'Not rated'}
- Total Reviews: ${lead.googleReviews || 0}
${reviews ? `\nReal Customer Reviews:\n${reviews}` : ''}

Operating Hours: ${lead.hours || lead.serperHours || 'Not specified'}

Business Description:
${lead.description || 'No description available — generate an appropriate one based on the business name, sector, and location.'}

Available Visual Assets:
- Logo: ${lead.logo || 'Not identified — create a text-based logo using the business name'}
- Photos:
${imageList}
${wsImageList ? `- Original Website Images:\n${wsImageList}` : ''}`;
}
