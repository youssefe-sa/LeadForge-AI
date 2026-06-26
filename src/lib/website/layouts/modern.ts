import { LayoutModule } from '../types';

export const modernLayout: LayoutModule = {
  id: 'modern',
  name: 'Modern',

  render(lead, content, images, palette) {
    const isEn = lead.city ? ['london', 'new york', 'chicago', 'los angeles'].some(c => (lead.city || '').toLowerCase().includes(c)) : false;
    const lang = isEn ? 'en' : 'fr';

    return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(content.heroTitle)}</title>
  <meta name="description" content="${escapeHtml(content.metaDescription)}">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: ${palette.primary};
      --primary-dark: ${palette.secondary};
      --accent: ${palette.accent};
      --bg: ${palette.background};
      --text: #1a1a2e;
      --text-light: #6b7280;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; color: var(--text); background: white; overflow-x: hidden; }
    
    nav { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; padding: 1.5rem 2rem; transition: all 0.3s ease; background: transparent; }
    nav.scrolled { background: rgba(255,255,255,0.95); backdrop-filter: blur(20px); box-shadow: 0 1px 10px rgba(0,0,0,0.05); }
    .nav-inner { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
    .logo { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 700; color: white; text-decoration: none; transition: color 0.3s; }
    nav.scrolled .logo { color: var(--primary); }
    .nav-links { display: flex; gap: 2rem; list-style: none; }
    .nav-links a { color: white; text-decoration: none; font-weight: 500; font-size: 0.9rem; opacity: 0.8; transition: opacity 0.3s; }
    nav.scrolled .nav-links a { color: var(--text); }
    .nav-links a:hover { opacity: 1; }
    
    .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
    .hero-bg { position: absolute; inset: 0; background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 50%, var(--accent) 100%); }
    .hero-bg img { width: 100%; height: 100%; object-fit: cover; opacity: 0.3; mix-blend-mode: overlay; }
    .hero-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)); }
    .hero-content { position: relative; z-index: 2; text-align: center; max-width: 800px; padding: 0 2rem; }
    .hero h1 { font-family: 'Playfair Display', serif; font-size: clamp(3rem, 8vw, 5rem); color: white; line-height: 1.1; margin-bottom: 1.5rem; }
    .hero p { font-size: 1.2rem; color: rgba(255,255,255,0.85); line-height: 1.6; margin-bottom: 2.5rem; }
    .hero-cta { display: inline-block; padding: 1rem 2.5rem; background: white; color: var(--primary); border-radius: 50px; text-decoration: none; font-weight: 600; transition: all 0.3s; }
    .hero-cta:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
    
    section { padding: 6rem 2rem; }
    .section-inner { max-width: 1100px; margin: 0 auto; }
    .section-label { text-transform: uppercase; letter-spacing: 0.15em; font-size: 0.8rem; color: var(--accent); font-weight: 600; margin-bottom: 0.5rem; }
    .section-title { font-family: 'Playfair Display', serif; font-size: 2.8rem; margin-bottom: 1rem; line-height: 1.2; }
    .section-desc { color: var(--text-light); font-size: 1.1rem; max-width: 600px; line-height: 1.7; }
    
    .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem; margin-top: 3rem; }
    .service-card { background: white; padding: 2.5rem; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); transition: all 0.3s; border: 1px solid rgba(0,0,0,0.04); }
    .service-card:hover { transform: translateY(-6px); box-shadow: 0 12px 40px rgba(0,0,0,0.1); border-color: var(--accent); }
    .service-card h3 { font-size: 1.3rem; margin-bottom: 1rem; color: var(--primary); }
    .service-card p { color: var(--text-light); line-height: 1.6; }
    
    .stats { background: var(--primary); color: white; padding: 4rem 2rem; }
    .stats-grid { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; text-align: center; }
    .stat-value { font-size: 2.5rem; font-weight: 700; font-family: 'Playfair Display', serif; }
    .stat-label { opacity: 0.8; font-size: 0.95rem; margin-top: 0.5rem; }
    
    .testimonials-carousel { display: flex; gap: 2rem; overflow-x: auto; padding: 2rem 0; scroll-snap-type: x mandatory; }
    .testimonial-card { min-width: 350px; flex-shrink: 0; scroll-snap-align: start; background: var(--bg); padding: 2rem; border-radius: 16px; }
    .testimonial-text { font-style: italic; line-height: 1.7; margin-bottom: 1.5rem; }
    .testimonial-author { font-weight: 600; }
    .testimonial-rating { color: #f59e0b; }
    
    .contact-section { background: var(--bg); }
    .contact-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-top: 2rem; }
    .contact-item { padding: 1.5rem; background: white; border-radius: 12px; text-align: center; }
    .contact-item a { color: var(--primary); text-decoration: none; font-weight: 500; }
    
    footer { padding: 3rem 2rem; text-align: center; color: var(--text-light); border-top: 1px solid #eee; }
    
    @media (max-width: 768px) {
      nav { padding: 1rem; }
      .nav-links { gap: 1rem; }
      .hero-content h1 { font-size: 2.5rem; }
      section { padding: 4rem 1.5rem; }
      .section-title { font-size: 2rem; }
      .services-grid { grid-template-columns: 1fr; }
      .testimonial-card { min-width: 280px; }
    }
  </style>
</head>
<body>
  <nav id="navbar">
    <div class="nav-inner">
      <a href="#home" class="logo">${escapeHtml(content.heroTitle)}</a>
      <ul class="nav-links">
        <li><a href="#services">${isEn ? 'Services' : 'Services'}</a></li>
        <li><a href="#about">${isEn ? 'About' : 'À propos'}</a></li>
        <li><a href="#testimonials">${isEn ? 'Reviews' : 'Avis'}</a></li>
        <li><a href="#contact">${isEn ? 'Contact' : 'Contact'}</a></li>
      </ul>
    </div>
  </nav>

  <section class="hero" id="home">
    <div class="hero-bg">
      ${images.hero ? `<img src="${escapeHtml(images.hero)}" alt="">` : ''}
    </div>
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <h1>${escapeHtml(content.heroTitle)}</h1>
      <p>${escapeHtml(content.heroSubtitle)}</p>
      <a href="#contact" class="hero-cta">${escapeHtml(content.ctaText)}</a>
    </div>
  </section>

  <section id="services">
    <div class="section-inner">
      <div class="section-label">${isEn ? 'What We Offer' : 'Notre Expertise'}</div>
      <h2 class="section-title">${escapeHtml(content.servicesTitle)}</h2>
      <p class="section-desc">${escapeHtml(content.heroSubtitle.substring(0, 120))}</p>
      <div class="services-grid">
        ${content.services.map(s => `
          <div class="service-card">
            <h3>${escapeHtml(s.name)}</h3>
            <p>${escapeHtml(s.description)}</p>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  ${content.whyChooseUs?.length ? `
  <section class="stats">
    <div class="stats-grid">
      ${content.whyChooseUs.slice(0, 4).map(w => `
        <div>
          <div class="stat-value">✓</div>
          <div class="stat-label">${escapeHtml(w)}</div>
        </div>
      `).join('')}
    </div>
  </section>` : ''}

  <section id="about">
    <div class="section-inner">
      <div class="section-label">${isEn ? 'About' : 'À propos'}</div>
      <h2 class="section-title">${escapeHtml(content.aboutTitle)}</h2>
      <p style="font-size:1.1rem;line-height:1.8;color:var(--text-light);max-width:800px">${escapeHtml(content.aboutText)}</p>
    </div>
  </section>

  ${content.testimonials?.length ? `
  <section id="testimonials" style="background:var(--bg)">
    <div class="section-inner">
      <div class="section-label">${isEn ? 'Client Reviews' : 'Avis Clients'}</div>
      <h2 class="section-title">${isEn ? 'What Our Clients Say' : 'Ce que disent nos clients'}</h2>
      <div class="testimonials-carousel">
        ${content.testimonials.slice(0, 6).map(t => `
          <div class="testimonial-card">
            <div class="testimonial-text">"${escapeHtml(t.text)}"</div>
            <div class="testimonial-author">${escapeHtml(t.author)}</div>
            <div class="testimonial-rating">${'★'.repeat(t.rating)}${'☆'.repeat(5 - t.rating)}</div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>` : ''}

  <section class="contact-section" id="contact">
    <div class="section-inner">
      <div class="section-label">${isEn ? 'Get in Touch' : 'Contact'}</div>
      <h2 class="section-title">${isEn ? 'Contact Us' : 'Contactez-nous'}</h2>
      <div class="contact-grid">
        ${lead.phone ? `<div class="contact-item"><h3 style="color:var(--primary);margin-bottom:0.5rem">${isEn ? 'Phone' : 'Téléphone'}</h3><a href="tel:${escapeHtml(lead.phone)}">${escapeHtml(lead.phone)}</a></div>` : ''}
        ${lead.email ? `<div class="contact-item"><h3 style="color:var(--primary);margin-bottom:0.5rem">Email</h3><a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a></div>` : ''}
        ${lead.address ? `<div class="contact-item"><h3 style="color:var(--primary);margin-bottom:0.5rem">${isEn ? 'Address' : 'Adresse'}</h3><p>${escapeHtml(lead.address)}</p></div>` : ''}
      </div>
    </div>
  </section>

  <footer>
    <p>&copy; ${new Date().getFullYear()} ${escapeHtml(content.heroTitle)}. ${isEn ? 'All rights reserved.' : 'Tous droits réservés.'}</p>
  </footer>

  <script>
    window.addEventListener('scroll', function() {
      document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 100);
    });
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

function escapeHtml(text: string): string {
  if (!text) return '';
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
