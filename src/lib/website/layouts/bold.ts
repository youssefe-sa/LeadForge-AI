import { LayoutModule } from '../types';
import { Lead } from '../../supabase-store';
import { getUiStrings } from '../data/ui-strings';
import { renderGallery, renderFAQ, renderHours, renderContactMap, renderWhatsAppFloat, renderStickyCTA, renderTestimonialsCarousel, renderStatsCounter, renderTrustBar } from '../sections';
import { SHARED_STYLES } from '../shared-styles';

export const boldLayout: LayoutModule = {
  id: 'bold',
  name: 'Bold',

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
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;900&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: ${palette.primary};
      --accent: ${palette.accent};
      --bg: #0f0f0f;
      --surface: #1a1a2e;
      --surface2: #16213e;
      --text: #e2e8f0;
      --text-muted: #94a3b8;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); overflow-x: hidden; }
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: var(--primary); border-radius: 4px; }

    nav { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; padding: 1.2rem 2rem; }
    .nav-inner { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
    .logo { font-weight: 900; font-size: 1.3rem; color: white; text-decoration: none; letter-spacing: -0.02em; }
    .nav-links { display: flex; gap: 2rem; list-style: none; }
    .nav-links a { color: var(--text-muted); text-decoration: none; font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; transition: color 0.3s; }
    .nav-links a:hover { color: var(--accent); }

    .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; position: relative; padding: 0 2rem; }
    .hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 0%, var(--surface) 0%, var(--bg) 70%); }
    .hero-content { position: relative; z-index: 2; text-align: center; max-width: 900px; }
    .hero h1 { font-size: clamp(3.5rem, 10vw, 7rem); font-weight: 900; line-height: 0.95; margin-bottom: 1.5rem; background: linear-gradient(135deg, var(--accent) 0%, ${palette.accent} 30%, ${palette.primary} 70%, white 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; letter-spacing: -0.03em; }
    .hero p { font-size: 1.15rem; color: var(--text-muted); max-width: 600px; margin: 0 auto 2.5rem; line-height: 1.7; }
    .hero-cta { display: inline-block; padding: 1rem 2.5rem; background: var(--accent); color: white; text-decoration: none; font-weight: 700; border-radius: 8px; border: none; font-size: 0.95rem; transition: all 0.3s; text-transform: uppercase; letter-spacing: 0.05em; }
    .hero-cta:hover { transform: translateY(-3px); box-shadow: 0 10px 40px rgba(0,0,0,0.4); }

    section { padding: 5rem 2rem; }
    .section-inner { max-width: 1100px; margin: 0 auto; }
    .section-label { color: var(--accent); text-transform: uppercase; letter-spacing: 0.2em; font-size: 0.75rem; font-weight: 700; margin-bottom: 0.5rem; }
    .section-title { font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; letter-spacing: -0.02em; }

    .service-row { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; margin-bottom: 4rem; }
    .service-row.reverse { direction: rtl; }
    .service-row.reverse > * { direction: ltr; }
    .service-visual { aspect-ratio: 4/3; border-radius: 16px; overflow: hidden; background: var(--surface); ${images.hero ? `background-image: url(${escapeHtml(images.hero)}); background-size: cover; background-position: center;` : ''} }
    .service-info h3 { font-size: 1.5rem; margin-bottom: 0.75rem; color: var(--accent); }
    .service-info p { color: var(--text-muted); line-height: 1.7; }
    .service-features { margin-top: 1rem; display: flex; flex-wrap: wrap; gap: 0.5rem; }
    .service-features span { background: var(--surface); padding: 0.35rem 0.75rem; border-radius: 20px; font-size: 0.8rem; border: 1px solid rgba(255,255,255,0.05); }

    .counters { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; margin: 3rem 0; text-align: center; }
    .counter-value { font-size: 3rem; font-weight: 900; color: var(--accent); }
    .counter-label { color: var(--text-muted); font-size: 0.9rem; margin-top: 0.5rem; }

    .quote-card { border-left: 3px solid var(--accent); padding: 2rem; margin-bottom: 2rem; background: var(--surface); border-radius: 0 12px 12px 0; }
    .quote-text { font-size: 1.1rem; line-height: 1.7; font-style: italic; margin-bottom: 1rem; color: var(--text); }
    .quote-author { font-weight: 600; color: var(--accent); }

    .contact-neon { background: var(--surface); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; padding: 3rem; text-align: center; max-width: 600px; margin: 0 auto; box-shadow: 0 0 40px rgba(0,0,0,0.1); }
    .contact-neon h2 { font-size: 2rem; margin-bottom: 1rem; }
    .contact-neon a { color: var(--accent); text-decoration: none; font-size: 1.2rem; font-weight: 600; }
    .contact-neon .cta-glow { display: inline-block; margin-top: 1.5rem; padding: 1rem 3rem; background: linear-gradient(135deg, var(--accent), ${palette.accent}); color: white; border-radius: 8px; text-decoration: none; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; transition: all 0.3s; }
    .contact-neon .cta-glow:hover { transform: scale(1.05); box-shadow: 0 0 30px var(--accent); }

    footer { padding: 3rem 2rem; text-align: center; color: var(--text-muted); border-top: 1px solid rgba(255,255,255,0.05); }

    @media (max-width: 768px) {
      .service-row { grid-template-columns: 1fr; gap: 1.5rem; }
      .service-row.reverse { direction: ltr; }
      .hero h1 { font-size: 2.5rem; }
      section { padding: 3rem 1.5rem; }
      .counters { grid-template-columns: 1fr 1fr; }
    }
    ${SHARED_STYLES}
  </style>
</head>
<body>
  <nav>
    <div class="nav-inner">
      <a href="#home" class="logo">◆ ${escapeHtml(content.heroTitle)}</a>
      <ul class="nav-links">
        <li><a href="#services">${isEn ? 'Services' : 'Services'}</a></li>
        <li><a href="#about">${isEn ? 'About' : 'À propos'}</a></li>
        <li><a href="#testimonials">${isEn ? 'Reviews' : 'Avis'}</a></li>
        <li><a href="#contact">${isEn ? 'Contact' : 'Contact'}</a></li>
      </ul>
    </div>
  </nav>

  <section class="hero" id="home">
    <div class="hero-bg"></div>
    <div class="hero-content">
      <h1>${escapeHtml(content.heroTitle)}</h1>
      <p>${escapeHtml(content.heroSubtitle)}</p>
      <a href="#contact" class="hero-cta">${escapeHtml(content.ctaText)}</a>
    </div>
  </section>

  <section id="services">
    <div class="section-inner">
      <div class="section-label">${isEn ? 'Expertise' : 'Notre Expertise'}</div>
      <h2 class="section-title">${escapeHtml(content.servicesTitle)}</h2>
      ${content.services.map((s, i) => `
        <div class="service-row ${i % 2 === 1 ? 'reverse' : ''}">
          <div class="service-visual"></div>
          <div class="service-info">
            <h3>${escapeHtml(s.name)}</h3>
            <p>${escapeHtml(s.description)}</p>
            ${s.features?.length ? `<div class="service-features">${s.features.map(f => `<span>${escapeHtml(f)}</span>`).join('')}</div>` : ''}
          </div>
        </div>
      `).join('')}
    </div>
  </section>

  <section id="about" style="background:var(--surface)">
    <div class="section-inner">
      <div class="section-label">${isEn ? 'About' : 'À propos'}</div>
      <h2 class="section-title">${escapeHtml(content.aboutTitle)}</h2>
      <p style="color:var(--text-muted);font-size:1.1rem;line-height:1.8;max-width:800px">${escapeHtml(content.aboutText)}</p>
      <div class="counters">
        <div><div class="counter-value">15+</div><div class="counter-label">${isEn ? 'Years Experience' : "Ans d'expérience"}</div></div>
        <div><div class="counter-value">500+</div><div class="counter-label">${isEn ? 'Clients Served' : 'Clients servis'}</div></div>
        <div><div class="counter-value">4.9★</div><div class="counter-label">${isEn ? 'Google Rating' : 'Note Google'}</div></div>
        <div><div class="counter-value">100%</div><div class="counter-label">${isEn ? 'Satisfaction' : 'Satisfaction'}</div></div>
      </div>
    </div>
  </section>

  ${content.testimonials?.length ? `
  <section id="testimonials">
    <div class="section-inner">
      <div class="section-label">${isEn ? 'Testimonials' : 'Témoignages'}</div>
      <h2 class="section-title">${isEn ? 'What Clients Say' : 'Ce que disent nos clients'}</h2>
      ${content.testimonials.slice(0, 4).map(t => `
        <div class="quote-card">
          <div class="quote-text">"${escapeHtml(t.text)}"</div>
          <div class="quote-author">${escapeHtml(t.author)} ★${t.rating}</div>
        </div>
      `).join('')}
    </div>
  </section>` : ''}

  <section id="contact" style="padding-bottom:5rem">
    <div class="section-inner">
      <div class="section-label">${isEn ? 'Contact' : 'Contact'}</div>
      <div class="contact-neon">
        <h2>${isEn ? 'Get in Touch' : 'Contactez-nous'}</h2>
        ${lead.phone ? `<p style="margin:1rem 0;color:var(--text-muted)">${isEn ? 'Call us' : 'Appelez-nous'}</p><a href="tel:${escapeHtml(lead.phone)}">${escapeHtml(lead.phone)}</a>` : ''}
        ${lead.email ? `<p style="margin:0.5rem 0;color:var(--text-muted)">Email</p><a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a>` : ''}
        <br>
        <a href="tel:${escapeHtml(lead.phone || '')}" class="cta-glow">${escapeHtml(content.ctaText)}</a>
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
    <p>&copy; ${new Date().getFullYear()} ${escapeHtml(content.heroTitle)}.</p>
  </footer>

  <script>
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', function(e) {
        e.preventDefault();
        const t = document.querySelector(this.getAttribute('href'));
        if (t) t.scrollIntoView({ behavior: 'smooth' });
      });
    });
    window.addEventListener('scroll', function() {
      document.querySelector('nav').style.background = window.scrollY > 50 ? 'rgba(15,15,15,0.95)' : 'transparent';
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
