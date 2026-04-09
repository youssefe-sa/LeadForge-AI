// ── TEMPLATE ULTIME 2026 - REFONTE TOTALE HAUTE COUTURE ──

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

const CURATED: Record<string, string[]> = {
  restaurant: [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&fit=crop",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&fit=crop",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&fit=crop"
  ],
  coiffeur: [
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&fit=crop",
    "https://images.unsplash.com/photo-1521590832167-7228fcb8c1b5?w=800&fit=crop",
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&fit=crop"
  ],
  garage: [
    "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&fit=crop",
    "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&fit=crop",
    "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=800&fit=crop"
  ],
  plomberie: [
    "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800&fit=crop",
    "https://images.unsplash.com/photo-1607472586893-edb57cb64e2c?w=800&fit=crop",
    "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&fit=crop"
  ],
  default: [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&fit=crop",
    "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&fit=crop",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&fit=crop"
  ]
};

// ── FONCTIONS UTILITAIRES POUR LOGO ET THEMES ──

function getLogoName(fullName: string): string {
  const skip = ['le', 'la', 'les', 'de', 'du', 'des', "l'", 'à', 'a'];
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

// Génère une couleur unique (HSL) basée sur le nom pour éviter que tous les sites inclassables se ressemblent
function stringToHslColor(str: string, saturation: number, lightness: number) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash % 360);
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

// Convertisseur HSL vers HEX pour unifier le rendu
function HSLToHex(h: number, s: number, l: number) {
  s /= 100; l /= 100;
  let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - c/2,
      r = 0, g = 0, b = 0;
  if (0 <= h && h < 60) { r = c; g = x; b = 0; }
  else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
  else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
  else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
  else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
  else if (300 <= h && h < 360) { r = c; g = 0; b = x; }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}

function generateDynamicTheme(companyName: string) {
  let hash = 0;
  for (let i = 0; i < companyName.length; i++) hash = companyName.charCodeAt(i) + ((hash << 5) - hash);
  const hue = Math.abs(hash % 360);
  const primary = HSLToHex(hue, 80, 50);
  const secondary = HSLToHex((hue + 30) % 360, 90, 40);
  
  // 50% de chance d'avoir un fond clair ou sombre pour casser la linéarité
  const isDark = (hash % 2 === 0);
  
  const theme = isDark ? {
    bgBase: '#050505', bgSurface: '#111111', textMain: '#f8fafc', textMuted: '#a1a1aa',
    glassCode: 'background: rgba(17, 17, 17, 0.7); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.08); box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);'
  } : {
    bgBase: '#fdfdfd', bgSurface: '#ffffff', textMain: '#0a0a0a', textMuted: '#52525b',
    glassCode: 'background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(20px); border: 1px solid rgba(0, 0, 0, 0.04); box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04);'
  };

  return { theme, primary, secondary };
}

const PREDEFINED_THEMES = {
  restaurant: {
    theme: { bgBase: '#0c0a09', bgSurface: '#1c1917', textMain: '#fafaf9', textMuted: '#a8a29e', glassCode: 'background: rgba(28, 25, 23, 0.8); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.05);' },
    primary: '#f97316', secondary: '#c2410c'
  },
  plomberie: {
    theme: { bgBase: '#f0f9ff', bgSurface: '#ffffff', textMain: '#082f49', textMuted: '#0284c7', glassCode: 'background: #ffffff; border: 1px solid #e0f2fe; box-shadow: 0 10px 30px rgba(2, 132, 199, 0.08);' },
    primary: '#0ea5e9', secondary: '#0369a1'
  },
  electricien: {
    theme: { bgBase: '#020617', bgSurface: '#0f172a', textMain: '#f8fafc', textMuted: '#94a3b8', glassCode: 'background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1);' },
    primary: '#eab308', secondary: '#b45309'
  },
  coiffeur: {
    theme: { bgBase: '#fdf4ff', bgSurface: '#ffffff', textMain: '#4a044e', textMuted: '#a21caf', glassCode: 'background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(12px); border: 1px solid #fae8ff; box-shadow: 0 10px 30px rgba(162, 28, 175, 0.05);' },
    primary: '#c026d3', secondary: '#86198f'
  }
};

function getUltimateTemplate(sector: string, name: string) {
  const norm = (sector || '').toLowerCase();
  for (const [key, tpl] of Object.entries(PREDEFINED_THEMES)) {
    if (norm.includes(key)) return tpl;
  }
  return generateDynamicTheme(name || 'LeadForge');
}

// 🎯 GENERATEUR PRINCIPAL
export function generateUltimateSite(lead: any, aiContent?: any): string {
  const template = getUltimateTemplate(lead.sector, lead.name);
  const companyName = lead.name || 'Entreprise Premium';
  const logoName = getLogoName(companyName);
  const city = lead.city || 'votre ville';
  const phone = lead.phone || '01 23 45 67 89';
  const email = lead.email || 'contact@site.fr';
  const address = lead.address || `Avenue du centre, ${city}`;
  
  // Note de base excellente si aucune info
  const rating = lead.googleRating && lead.googleRating > 0 ? lead.googleRating : 4.9;
  const reviews = lead.googleReviews && lead.googleReviews > 0 ? lead.googleReviews : 134;
  
  // Utiliser le contenu IA
  const description = aiContent?.aboutText || lead.description || `L'exigence au service de votre satisfaction. Nous réunissons les meilleurs talents pour vous livrer une prestation exceptionnelle à ${city}.`;
  
  const heroSubtitle = aiContent?.heroSubtitle || "Nous combinons savoir-faire d'exception et service client haut de gamme pour des résultats garantis.";
  const ctaText = aiContent?.cta || "Obtenir un devis gratuit";
  
  // Services
  let finalServices = [
    { name: 'Expertise Sur Mesure', description: 'Une approche 100% personnalisée pour répondre à vos attentes.', features: ['Devis détaillé gratuit', 'Planification précise'] },
    { name: 'Exécution Parfaite', description: 'Une réalisation soignée par nos équipes hautement qualifiées.', features: ['Matériaux premium', 'Finition irréprochable'] },
    { name: 'Assistance & Garanti', description: "Un suivi complet même après l'intervention pour votre tranquillité.", features: ['Service réactif', 'Garanties solides'] }
  ];
  if (aiContent?.services && Array.isArray(aiContent.services) && aiContent.services.length >= 3) {
    finalServices = aiContent.services.slice(0, 6).map((s: any) => ({
      name: s.name || 'Service Premium',
      description: s.description || '',
      features: ['Qualité supérieure', 'Intervention rapide']
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
  const images = [...rawImgs, ...CURATED.default]; // Fallback if lack of images

  // Avis VIP
  let testimonials = (lead.googleReviewsData || []).slice(0, 4).map((r: any) => ({
    author: r.author || 'Client VIP', text: r.text || 'Une expérience magnifique et incroyablement fluide, je recommande chaudement.', rating: r.rating || 5
  }));
  if (testimonials.length === 0) {
    testimonials = [
      { author: 'Emma L.', text: "Une prestation parfaite ! L'équipe a été très à l'écoute.", rating: 5 },
      { author: 'Thomas J.', text: "Qualité exceptionnelle et délais respectés. Je suis ravi.", rating: 5 },
      { author: 'Marie D.', text: "Hautement professionnel ! Une des meilleures expériences que j'ai eues.", rating: 5 }
    ];
  }

  const content: UltimateContent = {
    companyName, sector: lead.sector || 'Expert', city, description, phone, email, address, website: lead.website || '',
    rating, reviews, services: finalServices, testimonials, heroTitle: logoName, heroSubtitle, aboutText: description, ctaText, images
  };

  return buildUltimateHTML(content, template);
}

function buildUltimateHTML(content: UltimateContent, template: any): string {
  const { companyName, heroTitle, heroSubtitle, aboutText, ctaText, services, testimonials, phone, email, address, images, rating, reviews } = content;
  const th = template.theme;
  const initials = getInitials(companyName);
  const waPhone = phone.replace(/[^0-9]/g, '');

  return `<!DOCTYPE html>
<html lang="fr" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${heroTitle} | Excellence & Expertise</title>
    
    <!-- Polices 2026 : Syne (Titres Premium) et Inter (Corps) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Syne:wght@500;700;800&display=swap" rel="stylesheet">
    
    <!-- Icônes -->
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
            font-family: 'Inter', sans-serif;
            background-color: var(--bg-base);
            color: var(--text-main);
            overflow-x: hidden;
            line-height: 1.6;
        }

        h1, h2, h3, .brand-font {
            font-family: 'Syne', sans-serif;
            font-weight: 800;
        }

        /* ── BACKGROUNDS ANIMÉS AVANCÉS ── */
        .decor-mesh {
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            z-index: -1; opacity: 0.4; overflow: hidden; pointer-events: none;
            background-image: radial-gradient(var(--secondary) 1px, transparent 1px);
            background-size: 40px 40px;
        }
        .decor-blob {
            position: absolute; filter: blur(140px); opacity: 0.6;
            animation: breathe 25s ease-in-out infinite alternate;
            border-radius: 50%;
        }
        .decor-blob.b1 { background: var(--primary); width: 60vw; height: 60vw; top: -20vh; left: -10vw; }
        .decor-blob.b2 { background: var(--secondary); width: 40vw; height: 40vw; bottom: -10vh; right: -10vw; animation-delay: -10s; }
        @keyframes breathe {
            0% { transform: scale(1) translate(0, 0); }
            100% { transform: scale(1.1) translate(5vw, 5vh); }
        }

        /* ── ANIMATIONS TENDANCE 2026 ── */
        @keyframes revealUp {
            0% { opacity: 0; transform: translateY(40px); }
            100% { opacity: 1; transform: translateY(0); }
        }
        .reveal { opacity: 0; animation-duration: 1s; animation-fill-mode: both; animation-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1); }
        .reveal.active { animation-name: revealUp; }
        
        .pulse-btn {
            animation: pulse-ring 2s infinite;
        }
        @keyframes pulse-ring {
            0% { box-shadow: 0 0 0 0 rgba(var(--primary), 0.7); }
            70% { box-shadow: 0 0 0 15px rgba(var(--primary), 0); }
            100% { box-shadow: 0 0 0 0 rgba(var(--primary), 0); }
        }

        /* ── HEADER & MARQUEE ── */
        .marquee {
            background: linear-gradient(90deg, var(--primary), var(--secondary)); color: #fff;
            padding: 8px 0; font-size: 0.85rem; font-weight: 500; font-family: 'Syne'; letter-spacing: 0.5px;
            white-space: nowrap; overflow: hidden; position: relative; z-index: 100;
        }
        .marquee span { display: inline-block; animation: scroll-left 25s linear infinite; padding-left: 100%; }
        @keyframes scroll-left { 0% { transform: translateX(0); } 100% { transform: translateX(-100%); } }

        nav {
            position: sticky; top: 0; z-index: 90; padding: 1.5rem; transition: 0.4s;
            border-bottom: 1px solid rgba(128,128,128,0.1);
            ${th.glassCode} border-left: none; border-right: none; border-top: none;
        }
        nav.shrunk { padding: 0.7rem 1.5rem; }
        .nav-c { max-width: 1400px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
        .logo { display:flex; align-items:center; gap: 15px; font-size:1.8rem; text-decoration:none; color:var(--text-main); }
        .logo-mark {
            width: 48px; height: 48px; border-radius: 14px;
            background: linear-gradient(135deg, var(--primary), var(--secondary)); color:#fff;
            display:flex; align-items:center; justify-content:center; box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
        .nav-btn {
            background: var(--text-main); color: var(--bg-base); padding: 0.8rem 1.5rem;
            border-radius: 100px; font-weight: 600; text-decoration: none; transition: 0.3s;
        }
        .nav-btn:hover { transform: translateY(-2px); opacity: 0.9; }

        /* ── SECTION HERO "Magazine" Split Screen ── */
        .hero {
            max-width: 1400px; margin: 4rem auto; padding: 0 2rem;
            display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 4rem; align-items: center; min-height: 70vh;
        }
        @media (max-width: 1000px) { .hero { grid-template-columns: 1fr; margin: 2rem auto; } }
        .hero-left h1 {
            font-size: clamp(3.5rem, 8vw, 6rem); line-height: 0.95; margin-bottom: 1.5rem;
            letter-spacing: -2px; padding-bottom: 10px;
            background: linear-gradient(135deg, var(--text-main) 0%, var(--primary) 150%);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .hero-stars { display: flex; align-items: center; gap: 12px; margin-bottom: 2rem; font-size: 1.1rem; font-weight: 600; }
        .stars-svg { color: #eab308; display: flex; }
        .stars-svg svg { fill: #eab308; }
        .hero-left p { font-size: 1.3rem; color: var(--text-muted); margin-bottom: 3rem; max-width: 600px; line-height: 1.5; }
        .hero-img {
            position: relative; width: 100%; height: 600px; border-radius: 30px; overflow: hidden;
            box-shadow: 0 30px 60px rgba(0,0,0,0.15);
        }
        .hero-img img { width: 100%; height: 100%; object-fit: cover; }
        .hero-badge {
            position: absolute; bottom: 30px; left: -30px;
            ${th.glassCode} padding: 1.5rem; border-radius: 20px; display: flex; align-items: center; gap: 15px;
        }
        .icon-circle { width: 50px; height: 50px; border-radius: 50%; background: var(--primary); display:flex; align-items:center; justify-content:center; color:#fff; }

        .btn-call {
            background: var(--primary); color: #fff; text-decoration: none;
            padding: 1rem 2rem; border-radius: 100px; font-weight: 600; font-size: 1.1rem;
            display: inline-flex; align-items: center; gap: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); transition: 0.3s;
        }
        .btn-call:hover { transform: translateY(-4px); filter: brightness(1.1); }

        /* ── SECTION "NOTRE ENGAGEMENT" ── */
        .about-section {
            background: var(--bg-surface); padding: 8rem 2rem; border-top: 1px solid rgba(128,128,128,0.1); border-bottom: 1px solid rgba(128,128,128,0.1);
        }
        .about-grid {
            max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center;
        }
        @media (max-width: 1000px) { .about-grid { grid-template-columns: 1fr; } }
        .about-images { position: relative; height: 600px; }
        .img-main { position: absolute; top:0; left:0; width: 80%; height: 80%; border-radius: 24px; object-fit: cover; z-index: 1; }
        .img-sub { position: absolute; bottom:0; right:0; width: 60%; height: 60%; border-radius: 24px; object-fit: cover; z-index: 2; border: 8px solid var(--bg-surface); }
        .about-content h2 { font-size: clamp(2.5rem, 5vw, 4rem); margin-bottom: 1.5rem; line-height: 1.1; }
        .about-content p { font-size: 1.2rem; color: var(--text-muted); margin-bottom: 2rem; }
        .checklist { list-style: none; display: flex; flex-direction: column; gap: 1rem; }
        .checklist li { display: flex; align-items: center; gap: 12px; font-size: 1.1rem; font-weight: 500; }
        .checklist i { color: var(--primary); }

        /* ── SERVICES BENTO ── */
        .services-section { padding: 8rem 2rem; max-width: 1400px; margin: 0 auto; }
        .grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem; }
        .srv-card {
            ${th.glassCode} padding: 3rem; border-radius: 30px; transition: 0.3s;
            position: relative; overflow: hidden;
        }
        .srv-card:hover { transform: translateY(-10px); border-color: var(--primary); }
        .srv-icon { width: 60px; height: 60px; border-radius: 16px; background: rgba(128,128,128,0.1); color: var(--primary); display:flex; align-items:center; justify-content:center; margin-bottom: 2rem; }
        .srv-card h3 { font-size: 1.8rem; margin-bottom: 1rem; }
        .srv-card p { color: var(--text-muted); margin-bottom: 1.5rem; }

        /* ── CONTACT & MAPS COMPACT ── */
        .contact-wrap {
            max-width: 1400px; margin: 0 auto 4rem; padding: 4rem;
            background: linear-gradient(to right, var(--bg-surface), var(--bg-base));
            border-radius: 40px; border: 1px solid rgba(128,128,128,0.1);
            display: grid; grid-template-columns: 1fr 1fr; gap: 4rem;
        }
        @media (max-width: 900px) { .contact-wrap { grid-template-columns: 1fr; padding: 2rem; } }
        .map-box { height: 100%; min-height: 400px; border-radius: 20px; overflow: hidden; }

        /* ── FOOTER ── */
        footer { padding: 4rem 2rem; text-align: center; border-top: 1px solid rgba(128,128,128,0.2); margin-top: 4rem; }

        /* Widgets */
        .wa-float { position: fixed; bottom: 25px; left: 25px; background: #25D366; color: white; width: 65px; height: 65px; border-radius: 50%; display:flex; align-items:center; justify-content:center; z-index: 1000; box-shadow: 0 10px 30px rgba(37,211,102,0.4); transition:0.3s; }
        .wa-float:hover { transform: scale(1.1); }
    </style>
</head>
<body>
    <div class="decor-mesh"></div>
    <div class="decor-blob b1"></div>
    <div class="decor-blob b2"></div>

    <div class="marquee">
        <span>INFO VIP : <i data-lucide="phone" size="14"></i> ${phone} &nbsp;|&nbsp; <i data-lucide="mail" size="14"></i> ${email} &nbsp;|&nbsp; <i data-lucide="map-pin" size="14"></i> ${address} &nbsp;|&nbsp; <i data-lucide="clock" size="14"></i> OUVRE ET REÇOIT AUJOURD'HUI.</span>
    </div>

    <nav id="nav">
        <div class="nav-c">
            <a href="#" class="logo">
                <div class="logo-mark brand-font">${initials}</div>
                <span class="brand-font">${heroTitle}</span>
            </a>
            <a href="#contact" class="nav-btn">Lancer votre projet</a>
        </div>
    </nav>

    <section class="hero">
        <div class="hero-left reveal" style="animation-delay: 0.1s;">
            <div class="hero-stars">
                <div class="stars-svg">${'<i data-lucide="star"></i>'.repeat(Math.floor(rating))}</div>
                <span style="color:var(--text-main)">${rating} / 5</span> 
                <span style="color:var(--text-muted)">(${reviews} avis vérifiés Google)</span>
            </div>
            <h1>${heroTitle}</h1>
            <p>${heroSubtitle}</p>
            <a href="tel:${phone.replace(/\s/g, '')}" class="btn-call pulse-btn">
                <i data-lucide="phone"></i> Appeler le ${phone}
            </a>
        </div>
        <div class="hero-img reveal" style="animation-delay: 0.3s;">
            <img src="${images[images.length - 1] || 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&fit=crop'}" alt="Presentation">
            <div class="hero-badge">
                <div class="icon-circle"><i data-lucide="check-circle-2"></i></div>
                <div>
                    <div style="font-family:'Syne'; font-weight:700; color:var(--text-main);">Certifié Premium</div>
                    <div style="font-size:0.9rem; color:var(--text-muted);">Savoir-Faire Garanti</div>
                </div>
            </div>
        </div>
    </section>

    <!-- SECTION A PROPOS REFAITE -->
    <section class="about-section">
        <div class="about-grid">
            <div class="about-images reveal">
                <img src="${images[0]}" class="img-main" alt="Atelier/Bureau">
                <img src="${images[1] || images[0]}" class="img-sub" alt="Équipe">
            </div>
            <div class="about-content reveal" style="animation-delay: 0.3s;">
                <h2>Notre Engagement.<br><span style="color:var(--primary);">Votre Succès.</span></h2>
                <p>${aboutText} Nous plaçons la perfection au c&oelig;ur de chaque détail pour vous offrir un résultat indiscutable.</p>
                <ul class="checklist">
                    <li><i data-lucide="check-circle"></i> Service exclusif et personnalisé de A à Z</li>
                    <li><i data-lucide="check-circle"></i> Intervention maîtrisée, propre et ponctuelle</li>
                    <li><i data-lucide="check-circle"></i> Devis transparent sans aucun frais caché</li>
                    <li><i data-lucide="check-circle"></i> Finitions ultra haut de gamme garanties</li>
                </ul>
            </div>
        </div>
    </section>

    <section class="services-section" id="services">
        <div style="text-align:center; margin-bottom:5rem;" class="reveal">
            <h2 style="font-size: clamp(2.5rem, 5vw, 4rem); margin-bottom:1rem;">Prestations d'Excellence</h2>
            <p style="color:var(--text-muted); font-size:1.2rem; max-width:600px; margin:0 auto;">Une expertise de pointe pour réaliser vos envies les plus exigeantes.</p>
        </div>
        <div class="grid-3">
            ${services.map((s, i) => `
            <div class="srv-card reveal" style="animation-delay: ${(i%3)*0.1}s;">
                <div class="srv-icon"><i data-lucide="${['shield','zap','award','briefcase','layers','star'][i%6]}"></i></div>
                <h3>${s.name}</h3>
                <p>${s.description}</p>
                <div style="border-top:1px solid rgba(128,128,128,0.2); padding-top:1rem; margin-top:1rem;">
                    ${s.features.map(f => `<div style="display:flex;align-items:center;gap:8px;font-size:0.9rem;margin-bottom:6px;"><i data-lucide="check" size="14" style="color:var(--primary)"></i>${f}</div>`).join('')}
                </div>
            </div>`).join('')}
        </div>
    </section>

    <div class="contact-wrap reveal" id="contact">
        <div>
            <h2 style="font-size: 3rem; margin-bottom:1.5rem; line-height:1;">Passez à<br>l'action.</h2>
            <p style="color:var(--text-muted); font-size:1.1rem; margin-bottom:3rem;">Remplissez rapidement ce formulaire ou contactez-nous directement pour démarrer une collaboration d'excellence.</p>
            <form onsubmit="event.preventDefault(); alert('Devis envoyé !');">
                <input type="text" placeholder="Nom complet" required style="width:100%; padding:1.2rem; border-radius:16px; margin-bottom:1rem; border:1px solid rgba(128,128,128,0.2); background:var(--bg-base); color:var(--text-main);">
                <input type="tel" placeholder="Téléphone direct" required style="width:100%; padding:1.2rem; border-radius:16px; margin-bottom:1rem; border:1px solid rgba(128,128,128,0.2); background:var(--bg-base); color:var(--text-main);">
                <textarea rows="4" placeholder="Votre projet..." required style="width:100%; padding:1.2rem; border-radius:16px; margin-bottom:1.5rem; border:1px solid rgba(128,128,128,0.2); background:var(--bg-base); color:var(--text-main);"></textarea>
                <button class="nav-btn" style="width:100%; padding:1.2rem; border:none; cursor:pointer;">${ctaText}</button>
            </form>
        </div>
        <div class="map-box">
             <iframe width="100%" height="100%" style="border:0;" loading="lazy" allowfullscreen src="https://www.google.com/maps?q=${encodeURIComponent(companyName + ' ' + address)}&output=embed"></iframe>
        </div>
    </div>

    <footer>
        <h2 class="brand-font" style="font-size: 2rem; margin-bottom:1rem;">${heroTitle}</h2>
        <p style="color:var(--text-muted); margin-bottom: 2rem;">${address} — ${phone}</p>
        <p style="font-size: 0.9rem; color: rgba(128,128,128,0.5);">© 2026 Tous droits réservés. Création IA Ultra-Premium.</p>
    </footer>

    <!-- WIDGET WHATSAPP -->
    <a href="https://wa.me/${waPhone}" target="_blank" class="wa-float"><i data-lucide="message-circle" size="32"></i></a>

    <script>
        lucide.createIcons();
        window.addEventListener('scroll', () => document.getElementById('nav').classList.toggle('shrunk', window.scrollY > 50));
        
        const observer = new IntersectionObserver(e => e.forEach(entry => {
            if(entry.isIntersecting) entry.target.classList.add('active');
        }), { threshold: 0.1 });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    </script>
</body>
</html>`;
}
