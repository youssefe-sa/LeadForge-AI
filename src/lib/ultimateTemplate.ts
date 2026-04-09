// ── TEMPLATE ULTIME 2026 - MULTI-THÈMES, COMPLET & INTELLIGENT ──

export interface UltimateContent {
  companyName: string;
  sector: string;
  city: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  website: string;
  rating: number;
  reviews: number;
  services: Array<{ name: string; description: string; features: string[] }>;
  testimonials: Array<{ author: string; text: string; rating: number; date?: string }>;
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  ctaText: string;
  images: string[];
}

// ── BANQUE D'IMAGES CURÉES (2026) ──
const CURATED: Record<string, string[]> = {
  restaurant: [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&fit=crop",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&fit=crop",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&fit=crop",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&fit=crop"
  ],
  coiffeur: [
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&fit=crop",
    "https://images.unsplash.com/photo-1521590832167-7228fcb8c1b5?w=800&fit=crop",
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&fit=crop",
    "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=800&fit=crop"
  ],
  garage: [
    "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&fit=crop",
    "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&fit=crop",
    "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=800&fit=crop",
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&fit=crop"
  ],
  plomberie: [
    "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800&fit=crop",
    "https://images.unsplash.com/photo-1607472586893-edb57cb64e2c?w=800&fit=crop",
    "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&fit=crop",
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&fit=crop"
  ],
  default: [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&fit=crop",
    "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&fit=crop",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&fit=crop",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&fit=crop"
  ]
};

// ── THEMES MULTIPLES POUR EVITER DE SE REPETER ──
const THEMES = {
  modernLight: { 
    bgBase: '#f8fafc', bgSurface: '#ffffff', textMain: '#0f172a', textMuted: '#64748b', 
    glassCode: 'background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.4); box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);'
  },
  premiumDark: {
    bgBase: '#020617', bgSurface: '#0f172a', textMain: '#f8fafc', textMuted: '#94a3b8',
    glassCode: 'background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.05); box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);'
  },
  neonCyber: {
    bgBase: '#09090b', bgSurface: '#18181b', textMain: '#fafafa', textMuted: '#a1a1aa',
    glassCode: 'background: rgba(24, 24, 27, 0.6); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.1); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);'
  },
  natureBento: {
    bgBase: '#fdfbf7', bgSurface: '#ffffff', textMain: '#1c1917', textMuted: '#78716c',
    glassCode: 'background: #ffffff; border-radius: 24px; border: 1px solid #e7e5e4; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);'
  }
};

const SECTOR_ULTIMATE_TEMPLATES = {
  plomberie: { theme: THEMES.modernLight, primary: '#0ea5e9', secondary: '#0284c7', bgTexture: 'water' },
  electricien: { theme: THEMES.premiumDark, primary: '#f59e0b', secondary: '#d97706', bgTexture: 'grid' },
  coiffeur: { theme: THEMES.natureBento, primary: '#ec4899', secondary: '#be185d', bgTexture: 'soft' },
  restaurant: { theme: THEMES.premiumDark, primary: '#ef4444', secondary: '#b91c1c', bgTexture: 'grain' },
  garage: { theme: THEMES.neonCyber, primary: '#3b82f6', secondary: '#1d4ed8', bgTexture: 'grid' },
  default: { theme: THEMES.modernLight, primary: '#6366f1', secondary: '#4f46e5', bgTexture: 'soft' }
};

// ── FONCTIONS UTILITAIRES ──
function getLogoName(fullName: string): string {
  const skip = ['le', 'la', 'les', 'de', 'du', 'des', "l'"];
  const words = (fullName || 'Entreprise').trim().toLowerCase().split(/\s+/);
  const filtered = words.filter(w => !skip.includes(w));
  if (filtered.length === 0) return 'Logo';
  return filtered.slice(0, 2).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function getInitials(fullName: string): string {
  const words = getLogoName(fullName).split(' ');
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return fullName.substring(0, 2).toUpperCase();
}

function getUltimateTemplate(sector: string) {
  const normalizedSector = (sector || '').toLowerCase();
  for (const [key, template] of Object.entries(SECTOR_ULTIMATE_TEMPLATES)) {
    if (normalizedSector.includes(key)) return template;
  }
  if (normalizedSector.includes('médec') || normalizedSector.includes('cliniq')) {
    return { theme: THEMES.modernLight, primary: '#14b8a6', secondary: '#0d9488', bgTexture: 'soft' };
  }
  if (normalizedSector.includes('avocat') || normalizedSector.includes('notaire')) {
    return { theme: THEMES.natureBento, primary: '#b45309', secondary: '#92400e', bgTexture: 'grain' };
  }
  return SECTOR_ULTIMATE_TEMPLATES.default;
}

// 🎯 GENERATEUR PRINCIPAL
export function generateUltimateSite(lead: any, aiContent?: any): string {
  const template = getUltimateTemplate(lead.sector);
  const companyName = lead.name || 'Entreprise Premium';
  const city = lead.city || 'votre ville';
  const phone = lead.phone || '01 23 45 67 89';
  const email = lead.email || 'contact@' + (lead.website ? lead.website.replace('https://', '').replace('http://', '').replace(/\/.*$/, '') : 'site.fr');
  const address = lead.address || `Centre-ville, ${city}`;
  const website = lead.website || '';
  const rating = lead.googleRating || 5;
  const reviews = lead.googleReviews || 124;
  
  // Utiliser le contenu IA
  const description = aiContent?.aboutText || lead.description || `Expertise professionnelle reconnue à ${city}. Nous vous accompagnons dans tous vos projets avec passion et rigueur.`;
  const heroTitle = aiContent?.heroTitle || `L'excellence professionnelle à ${city}`;
  const heroSubtitle = aiContent?.heroSubtitle || "Nous combinons savoir-faire d'exception et service client haut de gamme pour des résultats garantis.";
  const ctaText = aiContent?.cta || "Contactez-nous aujourd'hui";
  
  // Services
  let finalServices = [
    { name: 'Consultation Sur Mesure', description: 'Une approche 100% personnalisée pour comprendre et répondre à vos attentes exactes.', features: ['Devis gratuit', 'Diagnostic complet', 'Écoute active'] },
    { name: 'Intervention Rapide', description: 'Une réactivité sans faille pour traiter vos demandes dans les meilleurs délais possibles.', features: ['Disponibilité 7j/7', 'Service prioritaire', 'Délais respectés'] },
    { name: 'Garantie Qualité', description: "Des finitions impeccables et des garanties solides pour votre totale tranquillité d'esprit.", features: ['Matériaux premium', 'Garantie décennale', 'Suivi rigoureux'] }
  ];
  if (aiContent?.services && Array.isArray(aiContent.services) && aiContent.services.length >= 3) {
    finalServices = aiContent.services.slice(0, 6).map((s: any) => ({
      name: s.name || 'Service Premium',
      description: s.description || 'Description du service',
      features: ['Qualité supérieure', 'Intervention rapide', 'Satisfaction garantie']
    }));
  }

  // Images (Lead ou Curées)
  let rawImgs = lead.images || lead.websiteImages || [];
  if (!Array.isArray(rawImgs) || rawImgs.length === 0) {
    const s = (lead.sector || '').toLowerCase();
    rawImgs = CURATED.default;
    for (const k of Object.keys(CURATED)) {
      if (s.includes(k)) { rawImgs = CURATED[k]; break; }
    }
  }
  const images = rawImgs.slice(0, 6);

  // Avis
  let testimonials = (lead.googleReviewsData || []).slice(0, 4).map((r: any) => ({
    author: r.author || 'Client Vérifié', text: r.text || 'Service magnifique et très professionnel. Je recommande vivement !', rating: r.rating || 5, date: r.date || ''
  }));
  if (testimonials.length === 0) {
    testimonials = [
      { author: 'Sophie M.', text: "Un travail vraiment remarquable. L'équipe a été très à l'écoute et le résultat dépasse mes attentes.", rating: 5 },
      { author: 'Thomas J.', text: "Je suis entièrement satisfait de la prestation. Rapidité, efficacité et professionnalisme de bout en bout.", rating: 5 },
      { author: 'Marie D.', text: "Excellent rapport qualité/prix. Des artisans qui connaissent vraiment leur métier.", rating: 5 }
    ];
  }

  const content: UltimateContent = {
    companyName, sector: lead.sector || 'Expert', city, description, phone, email, address, website,
    rating, reviews, services: finalServices, testimonials, heroTitle, heroSubtitle, aboutText: description, ctaText, images
  };

  return buildUltimateHTML(content, template);
}

function buildUltimateHTML(content: UltimateContent, template: any): string {
  const { companyName, heroTitle, heroSubtitle, aboutText, ctaText, services, testimonials, phone, email, address, images, rating, reviews } = content;
  const th = template.theme;
  const logoName = getLogoName(companyName);
  const initials = getInitials(companyName);
  const waPhone = phone.replace(/[^0-9]/g, '');

  return `<!DOCTYPE html>
<html lang="fr" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${companyName} - ${content.sector} ${content.city ? 'à '+content.city : ''}</title>
    
    <!-- Polices 2026 : Outfit (Titres) et Plus Jakarta Sans (Corps de texte) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Icônes Lucide -->
    <script src="https://unpkg.com/lucide@latest"></script>

    <style>
        :root {
            --primary: ${template.primary};
            --secondary: ${template.secondary};
            --bg-base: ${th.bgBase};
            --bg-surface: ${th.bgSurface};
            --text-main: ${th.textMain};
            --text-muted: ${th.textMuted};
            --glass: ${th.glassCode};
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: var(--bg-base);
            color: var(--text-main);
            line-height: 1.7;
            overflow-x: hidden;
        }

        h1, h2, h3, h4, h5, h6, .brand-font {
            font-family: 'Outfit', sans-serif;
            font-weight: 700;
        }

        /* ── MARQUEE TOP BAR ── */
        .top-bar {
            background-color: var(--primary);
            color: #fff;
            padding: 8px 0;
            font-size: 0.85rem;
            font-weight: 600;
            overflow: hidden;
            white-space: nowrap;
            position: relative;
            z-index: 100;
        }
        .marquee-content {
            display: inline-block;
            animation: marquee 30s linear infinite;
        }
        .marquee-content span { margin-right: 40px; display: inline-flex; align-items: center; gap: 6px; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

        /* ── NAVBAR ── */
        nav {
            position: sticky;
            top: 0;
            width: 100%;
            z-index: 90;
            padding: 1rem 0;
            transition: all 0.3s;
            ${th.glassCode}
            border-top: none; border-left: none; border-right: none;
            border-radius: 0;
        }
        .nav-container {
            max-width: 1300px; margin: 0 auto; padding: 0 2rem;
            display: flex; justify-content: space-between; align-items: center;
        }
        .brand {
            display: flex; align-items: center; gap: 12px;
            font-size: 1.5rem; color: var(--text-main); text-decoration: none; font-weight: 800;
        }
        .logo-svg {
            width: 44px; height: 44px;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white; border-radius: 12px;
            display: flex; align-items: center; justify-content: center;
            font-size: 1.2rem; box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        .nav-links { display: flex; gap: 2rem; }
        .nav-links a { color: var(--text-main); text-decoration: none; font-weight: 600; font-size: 0.95rem; }
        .nav-links a:hover { color: var(--primary); }
        
        .btn-primary {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: #fff; padding: 0.8rem 1.8rem; border-radius: 100px;
            font-weight: 600; text-decoration: none; border: none; cursor: pointer;
            display: inline-flex; align-items: center; gap: 8px;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.15); }

        /* ── HERO ── */
        .hero {
            padding: 8rem 2rem 5rem;
            text-align: center;
            position: relative;
        }
        .hero h1 {
            font-size: clamp(2.5rem, 6vw, 4.5rem);
            line-height: 1.1; margin-bottom: 1.5rem; letter-spacing: -1px;
            background: linear-gradient(135deg, var(--text-main), var(--text-muted));
            -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .hero p {
            font-size: clamp(1.1rem, 2vw, 1.25rem); color: var(--text-muted);
            max-width: 700px; margin: 0 auto 2.5rem;
        }
        .hero-actions { display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; }

        /* ── CONTAINERS & SECTIONS ── */
        .section { padding: 6rem 2rem; }
        .container { max-width: 1300px; margin: 0 auto; }
        .section-header { text-align: center; margin-bottom: 4rem; }
        .section-header h2 { font-size: clamp(2rem, 4vw, 3rem); margin-bottom: 1rem; }
        
        /* ── CARDS (Services) ── */
        .grid-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem; }
        .card {
            padding: 2.5rem;
            ${th.glassCode}
            border-radius: 24px;
            transition: transform 0.3s;
            height: 100%; display: flex; flex-direction: column;
        }
        .card:hover { transform: translateY(-8px); border-color: var(--primary); }
        .card-icon {
            width: 50px; height: 50px; border-radius: 14px;
            background: rgba(var(--primary), 0.1); color: var(--primary);
            display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem;
        }
        
        /* ── GALLERY / BENTO ── */
        .bento-gallery {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
        }
        .bento-item {
            border-radius: 24px; overflow: hidden; position: relative;
            height: 300px;
        }
        .bento-item img {
            width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s;
        }
        .bento-item:hover img { transform: scale(1.05); }

        /* ── MAP & CONTACT FORM ── */
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: start; }
        @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr; } }
        .map-container { border-radius: 24px; overflow: hidden; height: 100%; min-height: 400px; }
        .form-container { ${th.glassCode}; padding: 3rem; border-radius: 24px; }
        .input-group { margin-bottom: 1.5rem; }
        .input-group label { display: block; margin-bottom: 0.5rem; font-weight: 600; font-size: 0.9rem; }
        .input-group input, .input-group textarea {
            width: 100%; padding: 1rem; border-radius: 12px;
            background: var(--bg-base); border: 1px solid var(--text-muted); color: var(--text-main);
            font-family: inherit;
        }

        /* ── FOOTER ── */
        footer {
            background: #0f172a; color: #94a3b8;
            padding: 5rem 2rem 2rem; border-top: 1px solid #1e293b;
        }
        .footer-grid {
            max-width: 1300px; margin: 0 auto; display: grid;
            grid-template-columns: 2fr 1fr 1fr 1fr; gap: 4rem; margin-bottom: 4rem;
        }
        @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr; gap: 2rem; } }
        @media (max-width: 500px) { .footer-grid { grid-template-columns: 1fr; } }
        
        .footer-logo { color: #fff; font-size: 1.5rem; font-weight: 800; font-family: 'Outfit'; margin-bottom: 1rem; display: block; }
        .footer-title { color: #fff; font-weight: 700; margin-bottom: 1.5rem; font-family: 'Outfit'; }
        .footer-links { list-style: none; }
        .footer-links li { margin-bottom: 0.75rem; }
        .footer-links a { color: #94a3b8; text-decoration: none; transition: color 0.2s; }
        .footer-links a:hover { color: #fff; }
        
        /* ── WHATSAPP & BOT WIDGETS ── */
        .bot-widget {
            position: fixed; bottom: 20px; right: 20px; z-index: 999;
            width: 60px; height: 60px; border-radius: 50%;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white; display: flex; align-items: center; justify-content: center;
            cursor: pointer; box-shadow: 0 10px 25px rgba(0,0,0,0.2); transition: transform 0.3s;
        }
        .bot-widget:hover { transform: scale(1.1); }
        .wa-widget {
            position: fixed; bottom: 95px; right: 20px; z-index: 999;
            width: 60px; height: 60px; border-radius: 50%;
            background: #25D366; color: white; display: flex; align-items: center; justify-content: center;
            cursor: pointer; box-shadow: 0 10px 25px rgba(0,0,0,0.2); transition: transform 0.3s; text-decoration: none;
        }
        .wa-widget:hover { transform: scale(1.1); }

        /* Window Chat */
        .chat-window {
            position: fixed; bottom: 90px; right: 20px; width: 350px; max-width: calc(100vw - 40px);
            background: var(--bg-surface); border-radius: 20px; overflow: hidden;
            box-shadow: 0 15px 40px rgba(0,0,0,0.2); z-index: 1000;
            display: none; flex-direction: column; border: 1px solid var(--text-muted);
        }
        .chat-window.active { display: flex; }
        .chat-header { background: var(--primary); color: #fff; padding: 15px 20px; font-weight: 600; display: flex; justify-content: space-between; }
        .chat-body { padding: 20px; height: 300px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; }
        .msg { padding: 10px 15px; border-radius: 12px; max-width: 85%; font-size: 0.9rem; }
        .msg.bot { background: rgba(var(--primary), 0.1); color: var(--text-main); align-self: flex-start; border-bottom-left-radius: 0; }
        .msg.user { background: var(--primary); color: #fff; align-self: flex-end; border-bottom-right-radius: 0; }
        .chat-input { display: flex; padding: 10px; border-top: 1px solid var(--text-muted); }
        .chat-input input { flex: 1; padding: 10px; border: none; background: transparent; color: var(--text-main); outline: none; }
        .chat-input button { background: transparent; border: none; color: var(--primary); cursor: pointer; padding: 0 10px; }

        .reveal { opacity: 0; transform: translateY(30px); transition: 0.8s ease-out; }
        .reveal.active { opacity: 1; transform: translateY(0); }
    </style>
</head>
<body>

    <!-- MARQUEE -->
    <div class="top-bar">
        <div class="marquee-content">
            <!-- Double pour effet infini -->
            <span><i data-lucide="mail" size="14"></i> ${email}</span>
            <span><i data-lucide="phone" size="14"></i> ${phone}</span>
            <span><i data-lucide="map-pin" size="14"></i> ${address}</span>
            <span><i data-lucide="clock" size="14"></i> Ouvert aujourd'hui 09:00 - 18:00</span>
            <span><i data-lucide="mail" size="14"></i> ${email}</span>
            <span><i data-lucide="phone" size="14"></i> ${phone}</span>
            <span><i data-lucide="map-pin" size="14"></i> ${address}</span>
            <span><i data-lucide="clock" size="14"></i> Ouvert aujourd'hui 09:00 - 18:00</span>
        </div>
    </div>

    <!-- NAVBAR -->
    <nav>
        <div class="nav-container">
            <a href="#" class="brand">
                <div class="logo-svg brand-font">${initials}</div>
                <span class="brand-font">${logoName}</span>
            </a>
            <div class="nav-links">
                <a href="#services">Services</a>
                <a href="#galerie">Réalisations</a>
                <a href="#avis">Avis</a>
            </div>
            <a href="#contact" class="btn-primary" style="padding: 0.6rem 1.2rem; font-size: 0.9rem;">
                Devis Gratuit
            </a>
        </div>
    </nav>

    <!-- HERO -->
    <section class="hero reveal active">
        <h1>${heroTitle}</h1>
        <p>${heroSubtitle}</p>
        <div class="hero-actions">
            <a href="#contact" class="btn-primary">
                ${ctaText} <i data-lucide="arrow-right"></i>
            </a>
            <a href="tel:${phone.replace(/\s/g, '')}" class="btn-primary" style="background: transparent; color: var(--text-main); border: 1px solid var(--text-muted); box-shadow: none;">
                <i data-lucide="phone"></i> ${phone}
            </a>
        </div>
        
        <div style="margin-top: 4rem; display: flex; justify-content: center; gap: 2rem; color: var(--text-muted); font-size: 0.9rem; font-weight: 600;">
            <span style="display:flex;align-items:center;gap:6px"><i data-lucide="check-circle-2" style="color:var(--primary)"></i> ${(rating || 0) > 0 ? `${rating}/5 Note Générale` : '100% Satisfaction'}</span>
            <span style="display:flex;align-items:center;gap:6px"><i data-lucide="shield-check" style="color:var(--primary)"></i> Professionnel Confirmé</span>
        </div>
    </section>

    <!-- A PROPOS -->
    <section class="section" style="background: rgba(0,0,0,0.02);">
        <div class="container" style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;">
            <div class="reveal">
                <h2 class="brand-font">Notre Engagement Professionnel</h2>
                <p style="font-size: 1.1rem; margin-bottom: 2rem;">${aboutText}</p>
                <a href="#contact" style="color: var(--primary); font-weight: 700; text-decoration: none; display: flex; align-items: center; gap: 8px;">
                    En savoir plus <i data-lucide="arrow-right" size="18"></i>
                </a>
            </div>
            <div class="reveal" style="position:relative; height: 400px; border-radius: 24px; overflow: hidden;">
                <img src="${images[0] || 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&fit=crop'}" alt="A propos" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
        </div>
    </section>

    <!-- SERVICES -->
    <section class="section container" id="services">
        <div class="section-header reveal">
            <h2 class="brand-font">Nos Domaines d'Expertise</h2>
            <p>Découvrez l'ensemble de nos prestations conçues pour répondre à vos exigences.</p>
        </div>
        <div class="grid-cards">
            ${services.map((s, i) => `
            <div class="card reveal" style="transition-delay: ${(i%3) * 100}ms">
                <div class="card-icon"><i data-lucide="${['briefcase','layers','check-square','trending-up','star','shield'][i%6]}"></i></div>
                <h3 style="margin-bottom: 1rem;">${s.name}</h3>
                <p style="flex-grow: 1;">${s.description}</p>
            </div>
            `).join('')}
        </div>
    </section>

    <!-- GALERIE -->
    ${images.length > 1 ? `
    <section class="section container" id="galerie">
        <div class="section-header reveal">
            <h2 class="brand-font">Nos Réalisations</h2>
            <p>Un aperçu concret de notre savoir-faire en images.</p>
        </div>
        <div class="bento-gallery">
            ${images.slice(1, 5).map((img, i) => `
            <div class="bento-item reveal" style="transition-delay: ${i * 100}ms">
                <img src="${img}" alt="Réalisation ${i+1}" loading="lazy">
            </div>
            `).join('')}
        </div>
    </section>` : ''}

    <!-- AVIS / FAQ -->
    <section class="section" id="avis" style="background: var(--bg-surface); border-top: 1px solid var(--text-muted); border-bottom: 1px solid var(--text-muted);">
        <div class="container">
            <div class="section-header reveal">
                <h2 class="brand-font">Ce qu'ils pensent de nous</h2>
            </div>
            <div class="grid-cards">
                ${testimonials.map((t, i) => `
                <div class="card reveal" style="transition-delay: ${i * 100}ms">
                    <div style="display:flex; gap: 4px; color:#f59e0b; margin-bottom:1rem;">${'<i data-lucide="star" style="fill:#f59e0b"></i>'.repeat(t.rating)}</div>
                    <p style="font-style: italic; margin-bottom: 1.5rem; flex-grow:1;">"${t.text}"</p>
                    <div style="font-weight:700;">${t.author}</div>
                </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- CONTACT & MAPS -->
    <section class="section container" id="contact">
        <div class="contact-grid">
            <div class="reveal">
                <h2 class="brand-font" style="font-size: 2.5rem; margin-bottom: 1.5rem;">Prêt à avancer ensemble ?</h2>
                <p style="margin-bottom: 3rem;">Remplissez le formulaire ci-dessous ou venez nous rendre visite directement. Notre équipe vous répondra sous 24h ouvrées.</p>
                
                <div style="display:flex; flex-direction:column; gap:1.5rem; margin-bottom: 3rem;">
                    <div style="display:flex; align-items:center; gap:1rem;">
                        <span class="card-icon" style="margin:0;width:40px;height:40px;"><i data-lucide="phone" size="18"></i></span>
                        <span style="font-weight:600;">${phone}</span>
                    </div>
                    <div style="display:flex; align-items:center; gap:1rem;">
                        <span class="card-icon" style="margin:0;width:40px;height:40px;"><i data-lucide="mail" size="18"></i></span>
                        <span style="font-weight:600;">${email}</span>
                    </div>
                    <div style="display:flex; align-items:center; gap:1rem;">
                        <span class="card-icon" style="margin:0;width:40px;height:40px;"><i data-lucide="map-pin" size="18"></i></span>
                        <span style="font-weight:600;">${address}</span>
                    </div>
                </div>
                
                <!-- Google Maps (Embarqué dynamique) -->
                <div class="map-container">
                    <iframe 
                        width="100%" 
                        height="100%" 
                        style="border:0;" 
                        loading="lazy" 
                        allowfullscreen 
                        src="https://www.google.com/maps?q=${encodeURIComponent(companyName + ' ' + address)}&output=embed">
                    </iframe>
                </div>
            </div>
            
            <div class="form-container reveal" style="transition-delay: 200ms;">
                <h3 class="brand-font" style="margin-bottom: 2rem;">Demander un contact</h3>
                <form onsubmit="event.preventDefault(); alert('Message envoyé avec succès ! Nous vous recontacterons très vite.');">
                    <div class="input-group">
                        <label>Votre nom complet</label>
                        <input type="text" required placeholder="Jean Dupont">
                    </div>
                    <div class="input-group">
                        <label>Numéro de téléphone</label>
                        <input type="tel" required placeholder="06 00 00 00 00">
                    </div>
                    <div class="input-group">
                        <label>Adresse Email</label>
                        <input type="email" required placeholder="jean@email.com">
                    </div>
                    <div class="input-group">
                        <label>Votre message ou demande détaillée</label>
                        <textarea rows="4" required placeholder="Bonjour, j'aimerais obtenir un devis pour..."></textarea>
                    </div>
                    <button type="submit" class="btn-primary" style="width: 100%; justify-content: center; margin-top: 1rem;">
                        Envoyer ma demande
                    </button>
                </form>
            </div>
        </div>
    </section>

    <!-- FOOTER PROFESSIONNEL -->
    <footer>
        <div class="footer-grid">
            <div>
                <a href="#" class="footer-logo">${companyName}</a>
                <p style="margin-bottom: 1.5rem; max-width: 300px;">${aboutText.substring(0, 120)}...</p>
                <div style="display:flex; gap:15px;">
                    <a href="#" style="color:#94a3b8;"><i data-lucide="facebook"></i></a>
                    <a href="#" style="color:#94a3b8;"><i data-lucide="instagram"></i></a>
                    <a href="#" style="color:#94a3b8;"><i data-lucide="linkedin"></i></a>
                </div>
            </div>
            <div>
                <div class="footer-title">Liens Rapides</div>
                <ul class="footer-links">
                    <li><a href="#">Accueil</a></li>
                    <li><a href="#services">Nos Services</a></li>
                    <li><a href="#galerie">Réalisations</a></li>
                    <li><a href="#avis">Témoignages</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </div>
            <div>
                <div class="footer-title">Légal</div>
                <ul class="footer-links">
                    <li><a href="#">Mentions Légales</a></li>
                    <li><a href="#">Politique de confidentialité</a></li>
                    <li><a href="#">CGV / CGU</a></li>
                    <li><a href="#">Cookies</a></li>
                </ul>
            </div>
            <div>
                <div class="footer-title">Horaires</div>
                <ul class="footer-links">
                    <li><strong style="color:#fff">Lundi - Vendredi:</strong><br>09:00 - 18:00</li>
                    <li><strong style="color:#fff">Samedi:</strong><br>10:00 - 16:00</li>
                    <li><strong style="color:#fff">Dimanche:</strong><br>Fermé</li>
                </ul>
            </div>
        </div>
        <div style="text-align:center; padding-top:2rem; border-top:1px solid #1e293b; color:#64748b; font-size:0.9rem;">
            &copy; 2026 ${companyName}. Tous droits réservés. Créé par LeadForge AI.
        </div>
    </footer>

    <!-- WIDGETS FLOTTANTS (WHATSAPP & CHATBOT) -->
    <a href="https://wa.me/${waPhone}" target="_blank" class="wa-widget" aria-label="WhatsApp">
        <i data-lucide="message-circle" size="28"></i>
    </a>
    
    <div class="bot-widget" onclick="toggleChat()" aria-label="Chatbot IA">
        <i data-lucide="bot" size="28"></i>
    </div>

    <!-- FENETRE DU CHATBOT -->
    <div class="chat-window" id="chatWindow">
        <div class="chat-header">
            <span style="display:flex;align-items:center;gap:8px;"><i data-lucide="bot" size="18"></i> Assistant ${logoName}</span>
            <i data-lucide="x" style="cursor:pointer;" onclick="toggleChat()"></i>
        </div>
        <div class="chat-body" id="chatBody">
            <div class="msg bot">Bonjour ! Je suis l'assistant virtuel de ${companyName}. Comment puis-je vous aider aujourd'hui ? (Adresse, horaires, devis...)</div>
        </div>
        <form class="chat-input" onsubmit="handleChatSubmit(event)">
            <input type="text" id="chatInput" placeholder="Posez votre question..." required>
            <button type="submit"><i data-lucide="send" size="20"></i></button>
        </form>
    </div>

    <!-- SCRIPTS INTERACTIFS -->
    <script>
        // Init Icônes
        lucide.createIcons();

        // Animation au défilement
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('active');
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        // CHATBOT LOGIC (VANILLA JS INTELLIGENT)
        const chatWindow = document.getElementById('chatWindow');
        const chatBody = document.getElementById('chatBody');
        const chatInput = document.getElementById('chatInput');
        
        // Données d'entreprise pour le bot
        const botKnowledge = {
            address: "${address.replace(/"/g, '')}",
            phone: "${phone}",
            email: "${email}",
            services: \`Nous proposons les services suivants : ${services.map(s => s.name).join(', ')}.\`,
            about: "${aboutText.replace(/"/g, '').substring(0, 200)}..."
        };

        function toggleChat() {
            chatWindow.classList.toggle('active');
            if(chatWindow.classList.contains('active')) chatInput.focus();
        }

        function handleChatSubmit(e) {
            e.preventDefault();
            const text = chatInput.value.trim();
            if(!text) return;
            
            // Message Utilisateur
            appendMessage(text, 'user');
            chatInput.value = '';
            
            // Simulation temps de réflexion
            setTimeout(() => {
                const answer = generateBotResponse(text.toLowerCase());
                appendMessage(answer, 'bot');
            }, 800);
        }

        function appendMessage(text, type) {
            const div = document.createElement('div');
            div.className = 'msg ' + type;
            div.textContent = text;
            chatBody.appendChild(div);
            // Auto-scroll to bottom
            chatBody.scrollTop = chatBody.scrollHeight;
        }

        function generateBotResponse(q) {
            if(q.includes('adresse') || q.includes('ou') || q.includes('local')) 
                return "Nous sommes situés à l'adresse suivante : " + botKnowledge.address;
            if(q.includes('prix') || q.includes('devis') || q.includes('tarif')) 
                return "Chaque projet étant unique, le mieux est de demander un devis gratuit via le formulaire sur cette page ou de nous appeler au " + botKnowledge.phone;
            if(q.includes('service') || q.includes('fait') || q.includes('prestation')) 
                return botKnowledge.services;
            if(q.includes('horaire') || q.includes('ouvert') || q.includes('heure')) 
                return "Nous sommes ouverts du lundi au vendredi de 09h00 à 18h00, et le samedi de 10h00 à 16h00.";
            if(q.includes('contact') || q.includes('tel') || q.includes('mail')) 
                return "Vous pouvez nous joindre au " + botKnowledge.phone + " ou par email à " + botKnowledge.email;
            
            return "Merci pour votre message. Pour une réponse précise, je vous invite à remplir le formulaire de contact ou à nous appeler directement. Puis-je vous aider avec autre chose (horaires, adresse, services...) ?";
        }
    </script>
</body>
</html>`;
}
