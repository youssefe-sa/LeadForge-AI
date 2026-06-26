import { LayoutModule } from '../types';
import { Lead } from '../../supabase-store';
import { getUiStrings } from '../data/ui-strings';
import { getSectorFallbackReviews } from '../data/fallback-reviews';
import { getProcessSteps } from '../data/process-steps';
import { renderGallery, renderFAQ, renderHours, renderContactMap, renderWhatsAppFloat, renderStickyCTA, renderTestimonialsCarousel, renderStatsCounter, renderTrustBar } from '../sections';
import { SHARED_STYLES } from '../shared-styles';

export const classicLayout: LayoutModule = {
  id: 'classic',
  name: 'Classic',

  render(lead: Lead, content, images, palette): string {
    const lang = detectLanguage(lead);
    const ui = getUiStrings(lang);
    const reviews = content.testimonials.length >= 2 ? content.testimonials : getSectorFallbackReviews(lead.sector).slice(0, 4);
    const steps = getProcessSteps(lead.sector, lang);

    return `<!DOCTYPE html>
<html lang="${ui.lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(content.heroTitle)} - ${escapeHtml(lead.sector || 'Professionnel')}</title>
  <meta name="description" content="${escapeHtml(content.metaDescription)}">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300..700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    :root {
      --primary: ${palette.primary};
      --secondary: ${palette.secondary};
      --accent: ${palette.accent};
      --bg: ${palette.background};
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; background: var(--bg); color: #1f2937; line-height: 1.6; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    header { background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.1); position: sticky; top: 0; z-index: 100; }
    nav { display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; }
    .logo { font-size: 1.5rem; font-weight: bold; color: var(--primary); text-decoration: none; }
    .hero { background: linear-gradient(135deg, var(--primary), var(--secondary)); color: white; padding: 5rem 0; text-align: center; }
    .hero h1 { font-size: 3rem; margin-bottom: 1rem; font-weight: 700; }
    .hero p { font-size: 1.25rem; margin-bottom: 2rem; opacity: 0.9; }
    .cta-btn { display: inline-block; padding: 1rem 2rem; background: white; color: var(--primary); border-radius: 8px; text-decoration: none; font-weight: 600; }
    .section-title { text-align: center; font-size: 2.5rem; color: var(--primary); margin: 3rem 0; }
    .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-bottom: 3rem; }
    .service-card { background: white; padding: 2rem; border-radius: 12px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.05); transition: transform 0.2s; }
    .service-card:hover { transform: translateY(-4px); }
    .guarantees-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-bottom: 3rem; }
    .guarantee-card { text-align: center; padding: 2rem; background: white; border-radius: 12px; }
    .contact { background: var(--primary); color: white; padding: 4rem 0; text-align: center; }
    .contact-info { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin: 2rem 0; }
    .contact-item { background: rgba(255,255,255,0.1); padding: 2rem; border-radius: 12px; }
    footer { background: var(--secondary); color: white; text-align: center; padding: 2rem 0; }
    @media (max-width: 768px) { .hero h1 { font-size: 2rem; } }
    ${SHARED_STYLES}
  </style>
</head>
<body>
  <header>
    <nav class="container">
      <a href="#home" class="logo">${escapeHtml(content.heroTitle)}</a>
      <div>
        <a href="#services" style="color:var(--primary);text-decoration:none;margin:0 1rem">${escapeHtml(ui.navServices)}</a>
        <a href="#about" style="color:var(--primary);text-decoration:none;margin:0 1rem">${escapeHtml(ui.navAbout)}</a>
        <a href="#testimonials" style="color:var(--primary);text-decoration:none;margin:0 1rem">${escapeHtml(ui.navAvis)}</a>
        <a href="#contact" style="color:var(--primary);text-decoration:none;margin:0 1rem">${escapeHtml(ui.navContact)}</a>
      </div>
    </nav>
  </header>

  <section class="hero" id="home">
    <div class="container">
      <h1>${escapeHtml(content.heroTitle)}</h1>
      <p>${escapeHtml(content.heroSubtitle)}</p>
      <a href="#contact" class="cta-btn">${escapeHtml(ui.heroCall)}</a>
    </div>
  </section>

  <section id="services" class="container">
    <h2 class="section-title">${escapeHtml(ui.svcTitle)}</h2>
    <div class="services-grid">
      ${content.services.map(s => `
        <div class="service-card">
          <h3>${escapeHtml(s.name)}</h3>
          <p>${escapeHtml(s.description)}</p>
          ${s.features?.length ? `<div style="margin-top:1rem;text-align:left">
            ${s.features.map(f => `<span style="display:inline-block;background:var(--bg);padding:0.25rem 0.5rem;margin:0.25rem;border-radius:4px;font-size:0.85rem">${escapeHtml(f)}</span>`).join('')}
          </div>` : ''}
        </div>
      `).join('')}
    </div>
  </section>

  <section id="about" class="container">
    <h2 class="section-title">${escapeHtml(content.aboutTitle)}</h2>
    <p style="text-align:center;max-width:800px;margin:0 auto 3rem;font-size:1.1rem">${escapeHtml(content.aboutText)}</p>
  </section>

  ${reviews.length ? `
  <section id="testimonials" style="background:white;padding:3rem 0">
    <div class="container">
      <h2 class="section-title">${escapeHtml(ui.testTitle)}</h2>
      ${reviews.slice(0, 4).map(r => `
        <div style="background:var(--bg);padding:1.5rem;border-radius:12px;margin-bottom:1rem">
          <p style="font-style:italic;margin-bottom:0.5rem">"${escapeHtml(r.text)}"</p>
          <strong>${escapeHtml(r.author)}</strong>
          <span style="color:#f59e0b;margin-left:0.5rem">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</span>
        </div>
      `).join('')}
    </div>
  </section>` : ''}

  <section id="contact" class="contact">
    <div class="container">
      <h2>${escapeHtml(ui.contactTitle)}</h2>
      <div class="contact-info">
        ${lead.phone ? `<div class="contact-item"><h3>${escapeHtml(ui.contactCall)}</h3><a href="tel:${escapeHtml(lead.phone)}" style="color:white;text-decoration:none">${escapeHtml(lead.phone)}</a></div>` : ''}
        ${lead.email ? `<div class="contact-item"><h3>Email</h3><a href="mailto:${escapeHtml(lead.email)}" style="color:white;text-decoration:none">${escapeHtml(lead.email)}</a></div>` : ''}
        ${lead.address ? `<div class="contact-item"><h3>Adresse</h3><p>${escapeHtml(lead.address)}</p></div>` : ''}
      </div>
      <a href="tel:${escapeHtml(lead.phone || '')}" class="cta-btn" style="margin-top:1rem">${escapeHtml(content.ctaText)}</a>
    </div>
  </section>

  ${renderGallery(images, content.galleryTitle || (lang === 'en' ? 'Our Gallery' : 'Nos R\u00e9alisations'))}
  ${renderFAQ(lead.sector, lang)}
  ${renderHours(lang, lead)}
  ${renderStatsCounter(extractYears(lead), lead.googleRating || 4.9, lead.googleReviews || 0, lang)}
  ${renderTestimonialsCarousel(content.testimonials, lang === 'en' ? 'Client Reviews' : 'Avis Clients', lang)}
  ${renderContactMap(lead, ui)}
  ${renderTrustBar(lang)}
  ${renderWhatsAppFloat(lead.phone || '')}
  ${renderStickyCTA(lead.phone || '', content.ctaText)}

  <footer>
    <div class="container">
      <p>&copy; ${new Date().getFullYear()} ${escapeHtml(content.heroTitle)}. ${escapeHtml(ui.footerContact)}</p>
    </div>
  </footer>
</body>
</html>`;
  }
};

function extractYears(lead: Lead): string {
  if (lead.description) {
    const match = lead.description.match(/(\d+)\s*ans?\s+d['']exp[e\u00e9]rience/i);
    if (match) return match[1];
  }
  return '15';
}

function detectLanguage(lead: Lead): 'fr' | 'en' {
  const city = (lead.city || '').toLowerCase();
  const englishCities = ['london', 'new york', 'chicago', 'los angeles', 'miami', 'toronto', 'sydney', 'dubai'];
  const frenchCities = ['paris', 'lyon', 'marseille', 'toulouse', 'nice', 'nantes', 'bordeaux', 'lille', 'strasbourg'];
  if (englishCities.some(c => city.includes(c))) return 'en';
  return 'fr';
}

function escapeHtml(text: string): string {
  if (!text) return '';
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
