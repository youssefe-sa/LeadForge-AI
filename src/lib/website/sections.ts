import { Lead } from '../supabase-store';
import { WebsiteContent, WebsiteImages, Palette, UiStrings, FAQItem } from './types';
import { getSectorFAQ } from './data/faq';

export function renderGallery(images: WebsiteImages, title: string): string {
  const galleryImages = images.gallery.filter(Boolean).slice(0, 6);
  if (!galleryImages.length) return '';

  return `<section id="gallery" style="padding:5rem 0;background:var(--bg,#f8fafc)">
    <div style="max-width:1100px;margin:0 auto;padding:0 2rem">
      <h2 style="text-align:center;font-size:2.2rem;margin-bottom:0.5rem;color:var(--primary,#2563eb)">${escapeHtml(title)}</h2>
      <p style="text-align:center;color:var(--text-muted,#6b7280);margin-bottom:2rem">D\u00e9couvrez nos r\u00e9alisations en images</p>
      <div class="gallery-masonry">
        ${galleryImages.map((url, i) => `
          <a href="${escapeHtml(url)}" class="glightbox gallery-item" data-gallery="gallery1" style="animation:fadeInUp 0.5s ease ${i * 0.1}s both">
            <img src="${escapeHtml(url)}" alt="Gallery ${i + 1}" loading="lazy">
            <div class="overlay"><span>\uD83D\uDD0D</span></div>
          </a>
        `).join('')}
      </div>
    </div>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glightbox@3.2.0/dist/css/glightbox.min.css">
    <script src="https://cdn.jsdelivr.net/npm/glightbox@3.2.0/dist/js/glightbox.min.js"></script>
    <script>if(typeof GLightbox!=='undefined'){GLightbox({selector:'.glightbox'});}</script>
  </section>`;
}

export function renderFAQ(sector: string, lang: 'fr' | 'en'): string {
  const faqs = getSectorFAQ(sector, lang);
  const title = lang === 'en' ? 'Frequently Asked Questions' : 'Questions Fr\u00e9quentes';
  const subtitle = lang === 'en' ? 'Everything you need to know before contacting us' : 'Tout ce que vous devez savoir avant de nous contacter';
  if (!faqs.length) return '';

  return `<section id="faq" style="padding:5rem 0;background:var(--surface,white)">
    <div style="max-width:800px;margin:0 auto;padding:0 2rem">
      <h2 style="text-align:center;font-size:2.2rem;margin-bottom:0.5rem;color:var(--primary,#2563eb)">${escapeHtml(title)}</h2>
      <p style="text-align:center;color:var(--text-muted,#6b7280);margin-bottom:2.5rem">${escapeHtml(subtitle)}</p>
      ${faqs.map((faq, i) => `
        <div class="faq-item${i === 0 ? ' open' : ''}">
          <button class="faq-question" onclick="this.parentElement.classList.toggle('open')">
            ${escapeHtml(faq.question)}
            <span class="icon"></span>
          </button>
          <div class="faq-answer">${escapeHtml(faq.answer)}</div>
        </div>
      `).join('')}
    </div>
  </section>`;
}

export function renderHours(lang: 'fr' | 'en', lead?: Lead): string {
  const days = lang === 'en'
    ? ['Monday \u2013 Friday', 'Saturday', 'Sunday']
    : ['Lundi \u2013 Vendredi', 'Samedi', 'Dimanche'];
  const hours = ['9:00 \u2013 19:00', '9:00 \u2013 12:00', lang === 'en' ? 'Closed' : 'Ferm\u00e9'];
  const now = new Date();
  const dayIdx = now.getDay();
  const todayIdx = dayIdx === 0 ? 2 : dayIdx === 6 ? 1 : 0;
  const title = lang === 'en' ? 'Opening Hours' : 'Horaires d\'Ouverture';

  return `<section id="hours" style="padding:4rem 0;background:var(--bg,#f8fafc)">
    <div style="max-width:600px;margin:0 auto;padding:0 2rem;text-align:center">
      <h2 style="font-size:2rem;margin-bottom:2rem;color:var(--primary,#2563eb)">${title}</h2>
      <table class="hours-table">
        ${days.map((day, i) => `
          <tr${i === todayIdx ? ' class="today"' : ''}>
            <td>${escapeHtml(day)}</td>
            <td class="${hours[i] === 'Ferm\u00e9' || hours[i] === 'Closed' ? 'closed' : 'open'}">${escapeHtml(hours[i])}</td>
          </tr>
        `).join('')}
      </table>
    </div>
  </section>`;
}

export function renderContactMap(lead: Lead, ui: UiStrings): string {
  const lat = 48.8566;
  const lon = 2.3522;
  const mapSrc = `https://maps.google.com/maps?q=${lat},${lon}&z=14&output=embed&hl=${ui.lang}`;

  return `<section id="contact" style="padding:5rem 0">
    <div style="max-width:1100px;margin:0 auto;padding:0 2rem">
      <h2 style="text-align:center;font-size:2.2rem;margin-bottom:2rem;color:var(--primary,#2563eb)">${escapeHtml(ui.contactTitle)}</h2>
      <div class="contact-map-container">
        <div class="contact-details">
          ${lead.phone ? `<div class="contact-detail-card">
            <div class="icon">\uD83D\uDCDE</div>
            <div class="info"><strong>${escapeHtml(ui.contactCall)}</strong><a href="tel:${escapeHtml(lead.phone)}">${escapeHtml(lead.phone)}</a></div>
          </div>` : ''}
          ${lead.email ? `<div class="contact-detail-card">
            <div class="icon">\u2709\uFE0F</div>
            <div class="info"><strong>Email</strong><a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a></div>
          </div>` : ''}
          ${lead.address ? `<div class="contact-detail-card">
            <div class="icon">\uD83D\uDCCD</div>
            <div class="info"><strong>${ui.lang === 'en' ? 'Address' : 'Adresse'}</strong><span>${escapeHtml(lead.address)}</span></div>
          </div>` : ''}
          <div class="contact-detail-card">
            <div class="icon">\uD83D\uDD50</div>
            <div class="info"><strong>${ui.lang === 'en' ? 'Opening Hours' : 'Horaires'}</strong><span>${ui.lang === 'en' ? 'Mon-Fri 9:00-19:00' : 'Lun-Ven 9h-19h'}</span></div>
          </div>
        </div>
        <div class="contact-map">
          <iframe src="${escapeHtml(mapSrc)}" allowfullscreen loading="lazy"></iframe>
        </div>
      </div>
    </div>
  </section>`;
}

export function renderWhatsAppFloat(phone: string): string {
  if (!phone) return '';
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const digits = cleanPhone.length > 9 ? cleanPhone.slice(cleanPhone.length - 9) : cleanPhone;
  const msg = encodeURIComponent('Bonjour, je souhaite obtenir des informations.');
  return `<a href="https://wa.me/33${digits}?text=${msg}" target="_blank" class="whatsapp-float" aria-label="WhatsApp">
    <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  </a>`;
}

export function renderStickyCTA(phone: string, ctaText: string): string {
  if (!phone) return '';
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const digits = cleanPhone.length > 9 ? cleanPhone.slice(cleanPhone.length - 9) : cleanPhone;
  const msg = encodeURIComponent('Bonjour, je souhaite obtenir des informations.');
  return `<div class="sticky-cta">
    <div class="cta-row">
      <a href="tel:${escapeHtml(phone)}" class="cta-call">${escapeHtml(ctaText)}</a>
      <a href="https://wa.me/33${digits}?text=${msg}" target="_blank" class="cta-whatsapp">WhatsApp</a>
    </div>
  </div>`;
}

export function renderTestimonialsCarousel(testimonials: Array<{ author: string; text: string; rating: number; date?: string }>, title: string, lang: 'fr' | 'en'): string {
  if (!testimonials.length) return '';
  const items = testimonials.slice(0, 8);
  const subtitle = lang === 'en' ? 'What our clients say about us' : 'Ce que nos clients disent de nous';
  return `<section id="testimonials" style="padding:5rem 0;overflow:hidden">
    <div style="max-width:1100px;margin:0 auto;padding:0 2rem">
      <h2 style="text-align:center;font-size:2.2rem;margin-bottom:0.5rem;color:var(--primary,#2563eb)">${escapeHtml(title)}</h2>
      <p style="text-align:center;color:var(--text-muted,#6b7280);margin-bottom:2rem">${escapeHtml(subtitle)}</p>
      <div class="testimonials-auto">
        <div class="track-inner">
          ${[...items, ...items].map(t => `
            <div class="testimonial-slide" style="min-width:300px;margin:0 0.75rem">
              <div class="text">"${escapeHtml(t.text)}"</div>
              <div class="author">${escapeHtml(t.author)}</div>
              <div class="rating">${'★'.repeat(t.rating)}${'☆'.repeat(5 - t.rating)}</div>
              ${t.date ? `<div class="date">${escapeHtml(t.date)}</div>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  </section>`;
}

export function renderStatsCounter(years: string, rating: number, reviewCount: number, lang: 'fr' | 'en'): string {
  const items = [
    { icon: '\uD83D\uDCC5', number: `${years}+`, label: lang === 'en' ? 'Years Experience' : "Ans d'exp\u00e9rience" },
    { icon: '\uD83C\uDFC6', number: '500+', label: lang === 'en' ? 'Clients Served' : 'Clients servis' },
    { icon: '\u2B50', number: `${rating}\u2605`, label: lang === 'en' ? 'Google Rating' : 'Note Google' },
    { icon: '\uD83D\uDCAF', number: '100%', label: lang === 'en' ? 'Satisfaction' : 'Satisfaction' },
  ];
  return `<section style="padding:4rem 0;background:var(--bg,#f8fafc)">
    <div style="max-width:900px;margin:0 auto;padding:0 2rem">
      <div class="stats-grid">
        ${items.map(item => `
          <div class="stat-item">
            <div class="stat-icon">${item.icon}</div>
            <div class="stat-number">${item.number}</div>
            <div class="stat-label">${escapeHtml(item.label)}</div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>`;
}

export function renderTrustBar(lang: 'fr' | 'en'): string {
  const badges = lang === 'en'
    ? [
        { icon: '\u2705', text: 'Certified Professional' },
        { icon: '\uD83D\uDEE1\uFE0F', text: 'Fully Insured' },
        { icon: '\uD83D\uDCCB', text: 'Free Quote' },
      ]
    : [
        { icon: '\u2705', text: 'Professionnel Certifi\u00e9' },
        { icon: '\uD83D\uDEE1\uFE0F', text: 'Assurance D\u00e9cennale' },
        { icon: '\uD83D\uDCCB', text: 'Devis Gratuit' },
      ];
  return `<div class="trust-bar">
    ${badges.map(b => `<div class="trust-badge"><span class="trust-icon">${b.icon}</span> ${escapeHtml(b.text)}</div>`).join('')}
  </div>`;
}

export function renderHeroNav(lead: Lead, lang: 'fr' | 'en'): string {
  const links = [
    { href: '#services', label: lang === 'en' ? 'Services' : 'Services' },
    { href: '#about', label: lang === 'en' ? 'About' : '\u00c0 propos' },
    { href: '#testimonials', label: lang === 'en' ? 'Reviews' : 'Avis' },
    { href: '#contact', label: lang === 'en' ? 'Contact' : 'Contact' },
  ];
  return `<nav style="position:fixed;top:0;left:0;right:0;z-index:1000;padding:1rem 2rem;background:rgba(255,255,255,0.95);backdrop-filter:blur(12px);box-shadow:0 1px 10px rgba(0,0,0,0.05)" id="navbar">
    <div style="max-width:1200px;margin:0 auto;display:flex;justify-content:space-between;align-items:center">
      <a href="#home" style="font-weight:700;font-size:1.3rem;color:var(--primary,#2563eb);text-decoration:none">${escapeHtml(lead.name)}</a>
      <button class="hamburger" onclick="this.classList.toggle('active');document.getElementById('mobileMenu').classList.toggle('open')">
        <span></span><span></span><span></span>
      </button>
      <ul style="display:flex;gap:2rem;list-style:none" class="nav-links">
        ${links.map(l => `<li><a href="${l.href}" style="color:var(--text-muted,#6b7280);text-decoration:none;font-size:0.9rem;font-weight:500;transition:color 0.3s">${l.label}</a></li>`).join('')}
      </ul>
    </div>
    <div class="mobile-menu" id="mobileMenu">
      <button class="mobile-menu-close" onclick="this.parentElement.classList.remove('open');document.querySelector('.hamburger').classList.remove('active')">\u00D7</button>
      <div class="mobile-menu-inner">
        ${links.map(l => `<a href="${l.href}" onclick="document.getElementById('mobileMenu').classList.remove('open');document.querySelector('.hamburger').classList.remove('active')">${l.label}</a>`).join('')}
      </div>
    </div>
  </nav>`;
}

function escapeHtml(text: string): string {
  if (!text) return '';
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
