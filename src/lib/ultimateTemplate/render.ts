import { generateSections } from './sections';
import { UltimateContent, ProcessedImage, dedupeImages, optimizeImageUrl, selectBestImages } from './utils';
import { getUltimateTemplate, TemplateStyle } from './templates';

const BASE_STYLES = `
  :root {
    color-scheme: light;
  }
  body {
    margin: 0;
    font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: linear-gradient(180deg, #ffffff 0%, #f7f7f7 100%);
    color: #2f2f2f;
    overflow-x: hidden;
  }
  * {
    box-sizing: border-box;
  }
  .container {
    width: min(1200px, calc(100% - 2rem));
    margin-inline: auto;
  }
  .rounded-2xl { border-radius: 1.5rem; }
  .rounded-3xl { border-radius: 2rem; }
  .shadow-lg { box-shadow: 0 20px 45px rgba(15, 23, 42, 0.12); }
  .shadow-xl { box-shadow: 0 25px 60px rgba(15, 23, 42, 0.14); }
  .bg-white { background: #ffffff; }
  .bg-gray-50 { background: #f9fafb; }
  .bg-blue-50 { background: #eff6ff; }
  .bg-purple-50 { background: #f5f3ff; }
  .bg-orange-50 { background: #fff7ed; }
  .bg-red-600 { background: #dc2626; }
  .text-white { color: #ffffff; }
  .text-gray-600 { color: #4b5563; }
  .text-gray-700 { color: #374151; }
  .text-gray-900 { color: #111827; }
  .text-center { text-align: center; }
  .py-20 { padding-top: 5rem; padding-bottom: 5rem; }
  .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
  .mt-6 { margin-top: 1.5rem; }
  .mt-12 { margin-top: 3rem; }
  .mb-4 { margin-bottom: 1rem; }
  .mb-6 { margin-bottom: 1.5rem; }
  .mb-8 { margin-bottom: 2rem; }
  .gap-6 { gap: 1.5rem; }
  .grid { display: grid; }
  .flex { display: flex; }
  .items-center { align-items: center; }
  .justify-center { justify-content: center; }
  .rounded-full { border-radius: 9999px; }
  .overflow-hidden { overflow: hidden; }
  .object-cover { object-fit: cover; }
  .aspect-square { aspect-ratio: 1 / 1; }
  .btn-primary {
    padding: 1rem 1.75rem;
    border: none;
    border-radius: 9999px;
    color: white;
    font-weight: 700;
    cursor: pointer;
  }
  .section-header h2 {
    font-size: clamp(2.5rem, 4vw, 4rem);
    line-height: 1.05;
    margin: 0 0 1rem;
  }
  .section-header p {
    color: #52525b;
    max-width: 42rem;
    margin: 0 auto;
    line-height: 1.75;
  }
  .testimonial-card {
    background: rgba(255, 255, 255, 0.84);
    border: 1px solid rgba(148, 163, 184, 0.18);
  }
  .stars {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  .glass {
    backdrop-filter: blur(16px);
  }
  .contact-grid {
    display: grid;
    gap: 2rem;
  }
  .contact-form-side { padding: 2rem; }
  .form-group { margin-bottom: 1.25rem; }
  .form-control {
    width: 100%;
    padding: 1rem 1.15rem;
    border-radius: 1rem;
    border: 1px solid #d1d5db;
    font-size: 1rem;
  }
  .btn-cta {
    width: 100%;
    padding: 1rem 1.5rem;
    border-radius: 9999px;
    border: none;
    background-color: #1d4ed8;
    color: white;
    font-weight: 700;
    cursor: pointer;
  }
  .map-side iframe {
    width: 100%;
    min-height: 420px;
    border: 0;
    border-radius: 1.5rem;
  }
  @media (min-width: 768px) {
    .md\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .md\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .lg\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
    .lg\:grid-cols-6 { grid-template-columns: repeat(6, minmax(0, 1fr)); }
    .md\:text-5xl { font-size: 3rem; }
    .md\:grid-cols-2 .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .md\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
  @media (min-width: 1024px) {
    .lg\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
    .lg\:grid-cols-6 { grid-template-columns: repeat(6, minmax(0, 1fr)); }
  }
`;

export interface UltimateRenderOptions {
  variants?: string[];
  addSeed?: boolean;
}

function buildHeroSection(content: UltimateContent, template: TemplateStyle, images: ProcessedImage[]): string {
  const firstImage = images.find(img => img.type === 'banner') || images[0];
  const heroImage = firstImage?.url || content.heroImage || '';
  const badge = template.styleName || 'Service professionnel';

  return `
    <section id="hero" class="py-20 bg-white">
      <div class="container mx-auto px-6 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div>
          <span class="inline-flex items-center gap-3 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 mb-6" style="background: rgba(248, 250, 252, 0.95);">
            <span class="h-2.5 w-2.5 rounded-full" style="background: ${template.primary};"></span>
            ${badge}
          </span>
          <h1 class="text-5xl font-bold tracking-tight leading-tight mb-6" style="color: ${template.primary};">
            ${content.heroTitle}
          </h1>
          <p class="text-xl text-gray-700 max-w-2xl mb-8">${content.heroSubtitle}</p>
          <div class="flex flex-wrap gap-4">
            <a href="#contact" class="btn-primary" style="background: ${template.primary};">${content.ctaText}</a>
            <a href="#services" class="inline-flex items-center justify-center rounded-full border border-slate-300 px-7 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition">Nos services</a>
          </div>
        </div>
        <div class="relative rounded-[2rem] overflow-hidden shadow-xl border border-slate-200">
          <img src="${heroImage}" alt="${content.companyName}" loading="lazy" style="width:100%; height:100%; object-fit:cover; min-height:420px;" />
        </div>
      </div>
    </section>
  `;
}

function buildStatCards(content: UltimateContent, template: TemplateStyle): string {
  const cards = [
    { title: 'Clients satisfaits', value: '1,200+' },
    { title: 'Interventions rapides', value: '24h' },
    { title: 'Avis 5 étoiles', value: content.rating ? `${content.rating.toFixed(1)}/5` : '5/5' }
  ];
  return `
    <section id="stats" class="py-12 bg-gray-100">
      <div class="container mx-auto px-6 grid gap-6 lg:grid-cols-3">
        ${cards.map(card => `
          <div class="bg-white rounded-3xl p-8 text-center shadow-lg">
            <div class="text-4xl font-bold mb-4" style="color: ${template.primary};">${card.value}</div>
            <p class="text-gray-600">${card.title}</p>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

export function renderUltimateTemplate(content: UltimateContent, images: ProcessedImage[], options: UltimateRenderOptions = {}): string {
  const template = getUltimateTemplate(content.sector, content.city);
  const variation = options.variants?.includes('premium') ? 'premium' : 'fresh';
  // Optimize and select a limited set of images to keep HTML payload small
  const selectedImages = selectBestImages(images, 6).map(img => ({ ...img, url: optimizeImageUrl(img.url, img.type === 'banner' ? 1600 : 900) }));
  const sectionHtml = generateSections(content, template, selectedImages.map(i => i.url));
  const hero = buildHeroSection(content, template, selectedImages);
  const stats = buildStatCards(content, template);
  const header = `
    <header class="bg-white border-b border-slate-200 py-6">
      <div class="container mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
        <a href="#hero" class="font-bold text-xl" style="color: ${template.primary};">${content.companyName}</a>
        <nav class="flex gap-6 text-sm text-slate-600">
          <a href="#services">Services</a>
          <a href="#about">À propos</a>
          <a href="#testimonials">Avis</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  `;
  const footer = `
    <footer class="bg-slate-950 text-white py-12">
      <div class="container mx-auto px-6 grid gap-6 md:grid-cols-3">
        <div>
          <h3 class="font-semibold text-lg mb-3">${content.companyName}</h3>
          <p class="text-sm text-slate-300">${content.description}</p>
        </div>
        <div>
          <h4 class="font-semibold text-sm uppercase tracking-[0.2em] mb-3 text-slate-400">Contact</h4>
          <p class="text-sm text-slate-300">${content.phone || ''}</p>
          <p class="text-sm text-slate-300">${content.email || ''}</p>
          <p class="text-sm text-slate-300">${content.address || ''}</p>
        </div>
        <div>
          <h4 class="font-semibold text-sm uppercase tracking-[0.2em] mb-3 text-slate-400">Restez informé</h4>
          <p class="text-sm text-slate-300">Des offres et conseils exclusifs chaque mois.</p>
        </div>
      </div>
    </footer>
  `;
  const cssInHead = minifyCss(BASE_STYLES);

  const html = `
    <!doctype html>
    <html lang="fr">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${content.companyName} | ${content.sector}</title>
        <meta name="description" content="${content.description}" />
        <style>${cssInHead}</style>
      </head>
      <body class="template-${variation}">
        ${header}
        ${hero}
        ${stats}
        ${sectionHtml}
        ${footer}
      </body>
    </html>
  `;
  return minifyHtml(html);
}

function minifyHtml(input: string): string {
  if (!input) return '';
  // Remove repeated whitespace and collapse >   <
  return input.replace(/>\s+</g, '><').replace(/\s{2,}/g, ' ').replace(/\n+/g, '').trim();
}

function minifyCss(css: string): string {
  if (!css) return '';
  // Remove comments
  let out = css.replace(/\/\*[\s\S]*?\*\//g, '');
  // Collapse whitespace
  out = out.replace(/\s{2,}/g, ' ').replace(/\n+/g, ' ');
  // Remove spaces around symbols
  out = out.replace(/\s*([{}:,;>])\s*/g, '$1');
  return out.trim();
}

