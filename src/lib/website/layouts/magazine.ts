import { LayoutModule } from '../types';
import { Lead } from '../../supabase-store';
import { getUiStrings } from '../data/ui-strings';
import { renderGallery, renderFAQ, renderHours, renderContactMap, renderWhatsAppFloat, renderStickyCTA, renderTestimonialsCarousel, renderStatsCounter, renderTrustBar } from '../sections';
import { SHARED_STYLES } from '../shared-styles';

export const magazineLayout: LayoutModule = {
  id: 'magazine',
  name: 'Magazine',

  render(lead, content, images, palette) {
    const isEn = ['london', 'new york', 'chicago', 'los angeles'].some(c => (lead.city || '').toLowerCase().includes(c));
    const lang = isEn ? 'en' : 'fr';

    return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(content.heroTitle)}</title>
  <meta name="description" content="${escapeHtml(content.metaDescription)}">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: ${palette.primary};
      --accent: ${palette.accent};
      --bg: ${palette.background};
      --surface: white;
      --text: #1a1a2e;
      --text-muted: #64748b;
      --border: #e2e8f0;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; color: var(--text); background: white; line-height: 1.6; }

    nav { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; padding: 1rem 2rem; background: rgba(255,255,255,0.9); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); }
    .nav-inner { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
    .logo { font-family: 'Playfair Display', serif; font-size: 1.4rem; font-weight: 700; color: var(--primary); text-decoration: none; }
    .nav-links { display: flex; gap: 2rem; list-style: none; }
    .nav-links a { color: var(--text-muted); text-decoration: none; font-size: 0.85rem; font-weight: 500; transition: color 0.3s; }
    .nav-links a:hover { color: var(--primary); }

    .hero { display: grid; grid-template-columns: 1fr 1fr; min-height: 90vh; margin-top: 60px; }
    .hero-visual { background: var(--bg); display: flex; align-items: center; justify-content: center; overflow: hidden; }
    .hero-visual img { width: 100%; height: 100%; object-fit: cover; }
    .hero-text { display: flex; flex-direction: column; justify-content: center; padding: 4rem; }
    .hero-label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--accent); font-weight: 600; margin-bottom: 0.5rem; }
    .hero h1 { font-family: 'Playfair Display', serif; font-size: clamp(2.5rem, 5vw, 4rem); line-height: 1.1; margin-bottom: 1.5rem; }
    .hero p { color: var(--text-muted); font-size: 1.05rem; line-height: 1.7; margin-bottom: 2rem; }
    .hero-cta { display: inline-block; padding: 0.9rem 2rem; background: var(--primary); color: white; text-decoration: none; font-weight: 600; border-radius: 6px; font-size: 0.9rem; align-self: flex-start; }

    section { padding: 5rem 2rem; }
    .section-inner { max-width: 1200px; margin: 0 auto; }

    .magazine-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 3rem; }
    .magazine-main h2 { font-family: 'Playfair Display', serif; font-size: 2rem; margin-bottom: 2rem; }
    .service-entry { border-bottom: 1px solid var(--border); padding: 1.5rem 0; }
    .service-entry:last-child { border-bottom: none; }
    .service-entry h3 { font-size: 1.2rem; margin-bottom: 0.5rem; color: var(--primary); }
    .service-entry p { color: var(--text-muted); line-height: 1.6; }
    .magazine-sidebar { background: var(--bg); padding: 2rem; border-radius: 12px; }
    .magazine-sidebar h3 { font-family: 'Playfair Display', serif; font-size: 1.2rem; margin-bottom: 1.5rem; padding-bottom: 0.75rem; border-bottom: 2px solid var(--primary); }
    .sidebar-item { margin-bottom: 1.25rem; }
    .sidebar-item strong { display: block; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); margin-bottom: 0.25rem; }
    .sidebar-item span { font-size: 1rem; }

    .about-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
    .about-layout h2 { font-family: 'Playfair Display', serif; font-size: 2rem; margin-bottom: 1rem; }
    .about-layout p { color: var(--text-muted); line-height: 1.8; }

    .testimonial-side { border-left: 2px solid var(--accent); padding-left: 1.5rem; margin-bottom: 2rem; }
    .testimonial-side p { font-style: italic; color: var(--text-muted); line-height: 1.7; margin-bottom: 0.75rem; }
    .testimonial-side .author { font-weight: 600; color: var(--primary); }
    .testimonial-side .rating { color: #f59e0b; font-size: 0.85rem; }

    .contact-simple { max-width: 600px; margin: 0 auto; text-align: center; }
    .contact-simple h2 { font-family: 'Playfair Display', serif; font-size: 2.5rem; margin-bottom: 1.5rem; }
    .contact-row { display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap; margin: 2rem 0; }
    .contact-row a { color: var(--primary); text-decoration: none; font-weight: 500; }
    .contact-row a:hover { text-decoration: underline; }

    footer { padding: 3rem 2rem; text-align: center; color: var(--text-muted); border-top: 1px solid var(--border); font-size: 0.9rem; }

    @media (max-width: 768px) {
      .hero { grid-template-columns: 1fr; min-height: auto; }
      .hero-visual { min-height: 300px; }
      .hero-text { padding: 2rem; }
      .magazine-grid { grid-template-columns: 1fr; }
      .about-layout { grid-template-columns: 1fr; gap: 2rem; }
      section { padding: 3rem 1.5rem; }
    }
    ${SHARED_STYLES}
  </style>
</head>
<body>
  <nav>
    <div class="nav-inner">
      <a href="#home" class="logo">${escapeHtml(content.heroTitle)}</a>
      <ul class="nav-links">
        <li><a href="#services">${isEn ? 'Services' : 'Services'}</a></li>
        <li><a href="#about">${isEn ? 'About' : 'À propos'}</a></li>
        <li><a href="#reviews">${isEn ? 'Reviews' : 'Avis'}</a></li>
        <li><a href="#contact">${isEn ? 'Contact' : 'Contact'}</a></li>
      </ul>
    </div>
  </nav>

  <div class="hero" id="home">
    <div class="hero-visual">
      ${images.hero ? `<img src="${escapeHtml(images.hero)}" alt="">` : `<div style="font-size:4rem;color:var(--accent);opacity:0.3">◆</div>`}
    </div>
    <div class="hero-text">
      <div class="hero-label">${escapeHtml(content.heroTitle)}</div>
      <h1>${escapeHtml(content.heroTitle)}</h1>
      <p>${escapeHtml(content.heroSubtitle)}</p>
      <a href="#contact" class="hero-cta">${escapeHtml(content.ctaText)}</a>
    </div>
  </div>

  <section id="services">
    <div class="section-inner">
      <div class="magazine-grid">
        <div class="magazine-main">
          <h2>${escapeHtml(content.servicesTitle)}</h2>
          ${content.services.map(s => `
            <div class="service-entry">
              <h3>${escapeHtml(s.name)}</h3>
              <p>${escapeHtml(s.description)}</p>
              ${s.features?.length ? `<div style="display:flex;flex-wrap:wrap;gap:0.4rem;margin-top:0.5rem">${s.features.map(f => `<span style="background:var(--bg);padding:0.2rem 0.6rem;border-radius:4px;font-size:0.8rem;color:var(--text-muted)">${escapeHtml(f)}</span>`).join('')}</div>` : ''}
            </div>
          `).join('')}
        </div>
        <div class="magazine-sidebar">
          <h3>${isEn ? 'Contact Info' : 'Informations'}</h3>
          ${lead.phone ? `<div class="sidebar-item"><strong>${isEn ? 'Phone' : 'Téléphone'}</strong><span>${escapeHtml(lead.phone)}</span></div>` : ''}
          ${lead.email ? `<div class="sidebar-item"><strong>Email</strong><span>${escapeHtml(lead.email)}</span></div>` : ''}
          ${lead.address ? `<div class="sidebar-item"><strong>${isEn ? 'Address' : 'Adresse'}</strong><span>${escapeHtml(lead.address)}</span></div>` : ''}
          <div class="sidebar-item"><strong>${isEn ? 'Hours' : 'Horaires'}</strong><span>${isEn ? 'Mon-Fri: 9:00-19:00' : 'Lun-Ven: 9h-19h'}</span></div>
          ${content.whyChooseUs?.length ? `<div style="margin-top:2rem"><h3 style="font-family:'Playfair Display',serif;font-size:1.1rem;margin-bottom:1rem">${isEn ? 'Why Us' : 'Pourquoi nous'}</h3>${content.whyChooseUs.slice(0, 3).map(w => `<div style="margin-bottom:0.75rem;font-size:0.9rem;color:var(--text-muted)">› ${escapeHtml(w)}</div>`).join('')}</div>` : ''}
        </div>
      </div>
    </div>
  </section>

  <section id="about" style="background:var(--bg)">
    <div class="section-inner">
      <div class="about-layout">
        <div>
          <h2>${escapeHtml(content.aboutTitle)}</h2>
          <p>${escapeHtml(content.aboutText)}</p>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
          ${(content.whyChooseUs || []).slice(0, 4).map(w => `
            <div style="background:white;padding:1.5rem;border-radius:8px;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,0.04)">
              <div style="font-size:1.5rem;color:var(--accent);margin-bottom:0.5rem">✦</div>
              <div style="font-size:0.9rem;color:var(--text-muted)">${escapeHtml(w)}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  </section>

  ${content.testimonials?.length ? `
  <section id="reviews">
    <div class="section-inner">
      <h2 style="font-family:'Playfair Display',serif;font-size:2rem;margin-bottom:2rem;text-align:center">${isEn ? 'Client Reviews' : 'Avis Clients'}</h2>
      <div style="max-width:700px;margin:0 auto">
        ${content.testimonials.slice(0, 4).map(t => `
          <div class="testimonial-side">
            <p>"${escapeHtml(t.text)}"</p>
            <span class="author">${escapeHtml(t.author)}</span>
            <span class="rating"> ${'★'.repeat(t.rating)}${'☆'.repeat(5 - t.rating)}</span>
          </div>
        `).join('')}
      </div>
    </div>
  </section>` : ''}

  <section id="contact" style="background:var(--bg)">
    <div class="section-inner">
      <div class="contact-simple">
        <h2>${isEn ? 'Get in Touch' : 'Contactez-nous'}</h2>
        <p style="color:var(--text-muted);margin-bottom:2rem">${isEn ? "We'd love to hear from you" : 'Nous serions ravis de vous entendre'}</p>
        <div class="contact-row">
          ${lead.phone ? `<a href="tel:${escapeHtml(lead.phone)}">📞 ${escapeHtml(lead.phone)}</a>` : ''}
          ${lead.email ? `<a href="mailto:${escapeHtml(lead.email)}">✉️ ${escapeHtml(lead.email)}</a>` : ''}
        </div>
        ${lead.address ? `<p style="color:var(--text-muted);margin-top:1rem">📍 ${escapeHtml(lead.address)}</p>` : ''}
      </div>
    </div>
  </section>

  ${renderGallery(images, content.galleryTitle || (lang === 'en' ? 'Our Gallery' : 'Nos R\u00e9alisations'))}
  ${renderFAQ(lead.sector, lang)}
  ${renderHours(lang, lead)}
  ${renderStatsCounter(extractYears(lead), lead.googleRating || 4.9, lead.googleReviews || 0, lang)}
  ${renderTestimonialsCarousel(content.testimonials, lang === 'en' ? 'Client Reviews' : 'Avis Clients', lang)}
  ${renderContactMap(lead, getUiStrings(lang))}
  ${renderTrustBar(lang)}
  ${renderWhatsAppFloat(lead.phone || '')}
  ${renderStickyCTA(lead.phone || '', content.ctaText)}

  <footer>
    <p>&copy; ${new Date().getFullYear()} ${escapeHtml(content.heroTitle)}. ${isEn ? 'All rights reserved.' : 'Tous droits réservés.'}</p>
  </footer>

  <script>
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', function(e) {
        e.preventDefault();
        const t = document.querySelector(this.getAttribute('href'));
        if (t) t.scrollIntoView({ behavior: 'smooth' });
      });
    });
  </script>
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

function escapeHtml(text: string): string {
  if (!text) return '';
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
