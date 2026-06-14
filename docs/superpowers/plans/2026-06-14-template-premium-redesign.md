# Template Premium Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task.

**Goal:** Transform auto-generated basic HTML template into a professional, modern, sector-adapted website.

**Architecture:** Single-file template (`ultimateTemplate.ts`, 4485 lines) containing CSS, HTML, and dynamic generators. Changes split into CSS architecture, HTML section redesign, dynamic generators update, SEO, and content handling.

**Tech Stack:** TypeScript, TailwindCSS CDN, Plus Jakarta Sans (Google Fonts), Lucide Icons, JSON-LD structured data.

---

### Task 1: Sector Color Palette + CSS Variables

**Files:**
- Modify: `src/lib/ultimateTemplate.ts:2850-2870`

Add sector-based color palette mapping in `buildUltimateHTML` before the template string. Detect sector from `content.sector`.

```typescript
// ── SECTOR COLOR PALETTE ──
const SECTOR_PALETTES: Record<string, { primary: string; accent: string; heroBg: string }> = {
  plomberie:    { primary: '#1D9E75', accent: '#0EA5E9', heroBg: '#0d1117' },
  electricien:  { primary: '#1D9E75', accent: '#0EA5E9', heroBg: '#0d1117' },
  restaurant:   { primary: '#D97706', accent: '#DC2626', heroBg: '#1a0f00' },
  boulangerie:  { primary: '#D97706', accent: '#DC2626', heroBg: '#1a0f00' },
  traiteur:     { primary: '#D97706', accent: '#DC2626', heroBg: '#1a0f00' },
  avocat:       { primary: '#1E3A5F', accent: '#B8860B', heroBg: '#0f1923' },
  notaire:      { primary: '#1E3A5F', accent: '#B8860B', heroBg: '#0f1923' },
  'expert-comptable': { primary: '#1E3A5F', accent: '#B8860B', heroBg: '#0f1923' },
  conseiller:   { primary: '#1E3A5F', accent: '#B8860B', heroBg: '#0f1923' },
  coiffeur:     { primary: '#9D4EDD', accent: '#EC4899', heroBg: '#1a0a2e' },
  esthetique:   { primary: '#9D4EDD', accent: '#EC4899', heroBg: '#1a0a2e' },
  spa:          { primary: '#9D4EDD', accent: '#EC4899', heroBg: '#1a0a2e' },
  medecin:      { primary: '#0EA5E9', accent: '#10B981', heroBg: '#030f1c' },
  dentiste:     { primary: '#0EA5E9', accent: '#10B981', heroBg: '#030f1c' },
  kine:         { primary: '#0EA5E9', accent: '#10B981', heroBg: '#030f1c' },
  coach:        { primary: '#7C3AED', accent: '#F59E0B', heroBg: '#0d0a1a' },
  formateur:    { primary: '#7C3AED', accent: '#F59E0B', heroBg: '#0d0a1a' },
  consultant:   { primary: '#7C3AED', accent: '#F59E0B', heroBg: '#0d0a1a' },
  immobilier:   { primary: '#1E3A5F', accent: '#C8956C', heroBg: '#0a0f1a' },
  architecture: { primary: '#1E3A5F', accent: '#C8956C', heroBg: '#0a0f1a' },
  garage:       { primary: '#DC2626', accent: '#F59E0B', heroBg: '#0d0d0d' },
  mecanique:    { primary: '#DC2626', accent: '#F59E0B', heroBg: '#0d0d0d' },
  transport:    { primary: '#DC2626', accent: '#F59E0B', heroBg: '#0d0d0d' },
  artisan:      { primary: '#92400E', accent: '#D97706', heroBg: '#1a1008' },
  menuisier:    { primary: '#92400E', accent: '#D97706', heroBg: '#1a1008' },
  macon:        { primary: '#92400E', accent: '#D97706', heroBg: '#1a1008' },
  sport:        { primary: '#16A34A', accent: '#EF4444', heroBg: '#050f05' },
  salledesport: { primary: '#16A34A', accent: '#EF4444', heroBg: '#050f05' },
};

function getSectorPalette(sector: string) {
  const s = (sector || '').toLowerCase();
  for (const [key, palette] of Object.entries(SECTOR_PALETTES)) {
    if (s.includes(key)) return palette;
  }
  return { primary: '#1D9E75', accent: '#0EA5E9', heroBg: '#0d1117' };
}
```

Then after template colors are loaded, compute:
```typescript
const sectorPalette = getSectorPalette(content.sector);
const heroBg = sectorPalette.heroBg;
// Override primary/accent if template colors are generic
if (template.primary === '#3B82F6') {
  template.primary = sectorPalette.primary;
}
```

- [ ] **Step 1: Add SECTOR_PALETTES map**
- [ ] **Step 2: Add getSectorPalette function**
- [ ] **Step 3: Override generic template colors with sector palette**
- [ ] **Step 4: Verify TypeScript compiles**

---

### Task 2: Typography — Plus Jakarta Sans

**Files:**
- Modify: `src/lib/ultimateTemplate.ts:2948-2953` (Google Fonts link)
- Modify: `src/lib/ultimateTemplate.ts:3225,3233,3257,3323,3480,3502,3525` (font-family references)

```
Remove: Outfit, Inter, Lexend references
Add:    Plus Jakarta Sans as primary font
Result: fontPair always 1, or just use Plus Jakarta Sans for all
```

Change the font loading:
```typescript
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

Replace all `font-family: 'Outfit'` → `font-family: 'Plus Jakarta Sans'`
Replace all `font-family: 'Inter'` → `font-family: 'Plus Jakarta Sans'`
Replace all `font-family: 'Lexend'` → `font-family: 'Plus Jakarta Sans'`

Font sizes:
- H1: 52px → clamp(2.25rem, 4vw, 3.25rem)
- H2: 32px → clamp(1.75rem, 3vw, 2.25rem)
- Body: 16px → 1rem
- line-height: 1.7 body, 1.2 headings
- letter-spacing: -0.02em on H1 and H2

- [ ] **Step 1: Replace Google Fonts link with Plus Jakarta Sans only**
- [ ] **Step 2: Replace all 'Outfit' → 'Plus Jakarta Sans'**
- [ ] **Step 3: Replace all 'Inter' → 'Plus Jakarta Sans'** (check: in CSS, HTML inline styles, dynamic generators)
- [ ] **Step 4: Update CSS H1/H2/body font sizes**
- [ ] **Step 5: Update line-height and letter-spacing**
- [ ] **Step 6: Verify TypeScript compiles**

---

### Task 3: CSS Architecture — Spacing, Cards, Mobile

**Files:**
- Modify: `src/lib/ultimateTemplate.ts:3100-3885` (main `<style>` block)

Replace the entire CSS block with a premium version:

**Spacing:**
- Section padding (`.container`): `96px 5vw` desktop, `56px 20px` mobile
- H2 → paragraph gap: `16px`
- Card grid gap: `24px`
- Card internal padding: `28px`

**Cards (`.card`, `.valeur-card`, `.step-card`, `.testimonial-card`):**
- border-radius: `16px`
- border: `1px solid rgba(0,0,0,0.07)`
- padding: `28px`
- hover: `translateY(-4px)` transition `0.2s ease`
- box-shadow: `0 4px 20px rgba(0,0,0,0.06)`
- Remove: radial gradient overlay, brutal shadows

**Card icons (`.card-icon`, `.valeur-icon`):**
- width: `44px`, height: `44px`
- border-radius: `10px`
- background: accent at 10% opacity
- No clipart PNG, no emojis

**Buttons (`.btn-cta`):**
- height: `48px`
- border-radius: `8px`
- font-weight: `600`
- padding: `0 24px`
- max 5 words (CSS: `white-space: nowrap`)

**Section alternating backgrounds:**
- `.bg-alternate`: `#f8fafc` (not `#f1f5f9`)
- Remove harsh section borders

**Remove:**
- `.anim-shape` (too decorative)
- `.pattern-waves` (too complex)
- `.glass` (glassmorphism is dated)
- `.card::before` radial gradient
- `.blob`, `.bg-blobs` (abstract shapes)

**Keep:**
- Navigation styles
- Marquee styles
- Footer styles
- Modal styles
- Floating widgets
- Layout variants
- Mobile responsive

- [ ] **Step 1: Replace spacing values (container, sections, gaps)**
- [ ] **Step 2: Standardize card styling**
- [ ] **Step 3: Update icon sizes**
- [ ] **Step 4: Update button styling**
- [ ] **Step 5: Remove decorative bloat (blobs, glass, patterns)**
- [ ] **Step 6: Update section backgrounds**
- [ ] **Step 7: Verify TypeScript compiles**

---

### Task 4: Hero Section Redesign

**Files:**
- Modify: `src/lib/ultimateTemplate.ts:3265-3341` (CSS)
- Modify: `src/lib/ultimateTemplate.ts:3940-3997` (HTML)

**CSS changes:**
```css
.hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 120px 5vw 80px;
    position: relative;
    background-color: var(--hero-bg);
    overflow: hidden;
}

/* Dark overlay for readability */
.hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%);
    z-index: 0;
}

.hero-centered .hero-content {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    position: relative;
    z-index: 1;
}

.hero-centered .hero-content h1 {
    color: #ffffff;
    font-size: clamp(2.25rem, 4vw, 3.25rem);
    font-weight: 800;
    line-height: 1.2;
    letter-spacing: -0.02em;
    margin-bottom: 1rem;
}

.hero-centered .hero-content p {
    color: #94a3b8;
    font-size: 1.125rem;
    line-height: 1.7;
    max-width: 600px;
    margin: 0 auto 2rem;
}

.eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--accent);
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 1.5rem;
    padding: 0.375rem 0.75rem;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 100px;
    background: rgba(255,255,255,0.05);
}
```

**Hero image**: 
- Remove inline decorative elements (bg patterns, dot grids)
- Keep the hero image as a background with overlay

**Trust badges** (after CTAs):
```html
<div class="trust-badges">
    <div class="trust-badge">
        <i data-lucide="star" class="w-4 h-4" fill="currentColor"></i>
        <span>${rating}/5 — ${reviews} avis</span>
    </div>
    <div class="trust-badge">
        <i data-lucide="clock" class="w-4 h-4"></i>
        <span>Disponible 24/7</span>
    </div>
    <div class="trust-badge">
        <i data-lucide="shield-check" class="w-4 h-4"></i>
        <span>Assuré et certifié</span>
    </div>
</div>
```

**CSS for badges:**
```css
.trust-badges {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 2rem;
}
.trust-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    color: #94a3b8;
    font-size: 0.8rem;
    white-space: nowrap;
}
.trust-badge i { color: var(--accent); }
```

**CTA buttons**: Two variants:
```html
<a href="tel:${cleanPhoneLink}" class="btn-primary">
    <i data-lucide="phone" class="w-4 h-4"></i> ${ctaText}
</a>
<a href="#contact" class="btn-secondary">
    Demander un devis <i data-lucide="arrow-right" class="w-4 h-4"></i>
</a>
```

CSS:
```css
.btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    height: 48px;
    padding: 0 24px;
    background: var(--primary);
    color: #fff;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.95rem;
    border: none;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s;
}
.btn-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}
.btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    height: 48px;
    padding: 0 24px;
    background: transparent;
    color: #fff;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.95rem;
    border: 1px solid rgba(255,255,255,0.2);
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s;
}
.btn-secondary:hover {
    border-color: rgba(255,255,255,0.4);
    background: rgba(255,255,255,0.05);
}
```

**Layout variant 1 & 3 (split hero):** same dark bg, left text, right image column.

- [ ] **Step 1: Update hero CSS (dark bg, overlay, dark text)**
- [ ] **Step 2: Add eyebrow, 2 CTA buttons, trust badges HTML**
- [ ] **Step 3: Add trust-badges CSS**
- [ ] **Step 4: Add btn-primary, btn-secondary CSS**
- [ ] **Step 5: Update split hero variant**
- [ ] **Step 6: Remove decorative elements from hero HTML**
- [ ] **Step 7: Verify TypeScript compiles**

---

### Task 5: Dynamic Section Generators Update

**Files:**
- Modify: `src/lib/ultimateTemplate.ts:2075-2850`

Update all section generators with new card styles, typography, spacing, and sector-aware colors.

#### `generateMenuSection` (restaurant)
Replace card styles to match new card standard. Use `template.primary` for header color.

#### `generateBrandsSection` (garage)
Same card standard.

#### `generateGallerySection` (coiffeur/restaurant)
Keep masonry layout but update spacing.

#### `generateEmergencySection` (plomberie)
```html
<section id="emergency" class="py-24 px-[5vw] bg-gradient-to-br from-red-600 to-red-700 text-white">
```
Update padding to match new spacing standard.

#### `generatePricingSection` (nettoyage)
Card standard + luxury styling.

#### `generateServicesSection`
Update to use new card standard, icon container (44px, bg: accent at 10%).

#### `generateStandardAboutSection`
Update typography (Plus Jakarta Sans), spacing, colors.

#### `generateStandardTestimonialsSection`
Use new card standard, star color `#f59e0b`.

#### `generateStandardContactSection`
Dark gradient bg, Plus Jakarta Sans, updated form styling.

- [ ] **Step 1: Update services section generator (cards, icons, spacing)**
- [ ] **Step 2: Update about section generator (typo, spacing)**
- [ ] **Step 3: Update testimonials section generator (cards, spacing)**
- [ ] **Step 4: Update contact section generator (typo, spacing)**
- [ ] **Step 5: Update sector-specific generators (menu, brands, gallery, emergency, pricing)**
- [ ] **Step 6: Verify TypeScript compiles**

---

### Task 6: Hero Background Image

**Files:**
- Modify: `src/lib/ultimateTemplate.ts:3940-3997`

Hero sections need a full-bleed background image from `allImages`.

```html
<section class="hero hero-centered" style="background-image: url('${getImg(0)}'); background-size: cover; background-position: center;">
```

With a dark overlay for readability. The hero-split variant keeps the image on the right side, so the `hero-visual` div gets `background-image` instead.

- [ ] **Step 1: Add background image to hero-centered section**
- [ ] **Step 2: Add background image to hero-split section**
- [ ] **Step 3: Ensure dark overlay works with any image**
- [ ] **Step 4: Verify TypeScript compiles**

---

### Task 7: SEO — JSON-LD, Meta, Alt, Phone Links

**Files:**
- Modify: `src/lib/ultimateTemplate.ts:2919-2985` (head section)

**Title tag:**
```html
<title>${content.sector} ${city} — ${companyName} | ${services[0]?.name || 'Services Professionnels'}</title>
```

**Meta description (155 chars max):**
```html
<meta name="description" content="${companyName}, ${content.sector} à ${city}. ${services[0]?.name || 'Interventions rapides'} — Contactez-nous au ${phone}. ${heroSubtitle.substring(0, 60)}">
```

**JSON-LD enhanced:**
```html
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "${companyName}",
    "description": "${heroSubtitle}",
    "image": "${heroImage}",
    "telephone": "${phone}",
    "email": "${email}",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "${address}",
        "addressLocality": "${city}",
        "postalCode": "",
        "addressCountry": "FR"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": "",
        "longitude": ""
    },
    "url": "${website || '#'}",
    "priceRange": "€€",
    "openingHours": "Mo-Fr 09:00-18:00",
    "sameAs": ["", ""]
}
</script>
```

**Alt text on all images:** Add `alt="${companyName} — ${content.sector} à ${city}"` to all `<img>` tags.

**Phone links:** Ensure all phone numbers use `<a href="tel:+33XXXXXXXXX">` format.

**Google Maps link in footer:** Add clickable map link.

- [ ] **Step 1: Update title tag with sector-city format**
- [ ] **Step 2: Update meta description (155 chars)**
- [ ] **Step 3: Enhanced JSON-LD with geo, url, openingHours**
- [ ] **Step 4: Add alt text to all img tags**
- [ ] **Step 5: Ensure phone links use tel: format everywhere**
- [ ] **Step 6: Add Google Maps link in footer**
- [ ] **Step 7: Verify TypeScript compiles**

---

### Task 8: Content — Avis Clients, Images, Empty Words

**Files:**
- Modify: `src/lib/ultimateTemplate.ts` (template HTML)

**Avis clients:** In the testimonials section generator:
```typescript
function generateStandardTestimonialsSection(content: UltimateContent, template: any): string {
  const { testimonials, rating, reviews } = content;
  
  // If no real reviews (IA-generated or empty), show placeholder
  if (!testimonials || testimonials.length === 0 || testimonials[0].author === 'Client satisfait') {
    return `<!-- SECTION AVIS : à remplir avec les vrais avis Google du client -->`;
  }
  
  // Real reviews → show them
  // ...
}
```

**Images:** In hero and section generators, add comment when using fallback:
```html
<!-- REMPLACER PAR : [description précise adaptée au secteur] -->
```

**Remove empty words** in hardcoded sections (about, valeurs, etc.):
Filter: "Excellence", "Passion", "Professionnalisme", "De qualité", "À votre service", "Expertise reconnue", "Satisfaction totale", "Nous sommes convaincus", "Solutions sur-mesure"

Replace with concrete facts from `content.aboutText`, `content.services`, etc.

**Deduplicate garanties sections:**
- The hardcoded section "Garanties & Assurances" (line 4070+) duplicates the "Nos garanties" section (line 4033+)
- Remove the "Garanties & Assurances" section, merge content into "Nos garanties"

- [ ] **Step 1: Add IA-generated avis detection in testimonials generator**
- [ ] **Step 2: Add image placeholder comments**
- [ ] **Step 3: Filter empty words from hardcoded text**
- [ ] **Step 4: Merge duplicate garanties sections**
- [ ] **Step 5: Verify TypeScript compiles**

---

### Task 9: Mobile — Sticky Bottom CTA

**Files:**
- Modify: `src/lib/ultimateTemplate.ts` (CSS + HTML)

**CSS:**
```css
.mobile-sticky-cta {
    display: none;
}
@media (max-width: 768px) {
    .mobile-sticky-cta {
        display: flex;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 56px;
        background: var(--primary);
        color: white;
        z-index: 999;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        font-weight: 600;
        font-size: 1rem;
        text-decoration: none;
        border: none;
        cursor: pointer;
    }
}
```

**HTML** (at end of body, before `</body>`):
```html
<a href="tel:${cleanPhoneLink}" class="mobile-sticky-cta">
    <i data-lucide="phone" class="w-5 h-5"></i>
    Appeler — ${phone}
</a>
```

Also ensure: all grids → 1 column on mobile; font-size min 15px body / 36px H1; 44px minimum clickable areas.

- [ ] **Step 1: Add mobile sticky CTA CSS**
- [ ] **Step 2: Add mobile sticky CTA HTML at end of body**
- [ ] **Step 3: Verify mobile grid colapse**
- [ ] **Step 4: Verify min font sizes**
- [ ] **Step 5: Verify TypeScript compiles**

---

### Task 10: Navigation Updates

**Files:**
- Modify: `src/lib/ultimateTemplate.ts:3887-3938`

Update navigation to be cleaner:
- Remove `bg-blobs` background decorations
- Navigation font: Plus Jakarta Sans
- Add `#contact` link in desktop menu
- Clean up inline styles

- [ ] **Step 1: Update nav fonts and links**
- [ ] **Step 2: Remove bg-blobs from body**
- [ ] **Step 3: Verify TypeScript compiles**

---

### Task 11: Final Verification

**Files:**
- Modify: none (run tests)

- [ ] **Step 1: Run `npx tsc --noEmit` — 0 errors expected**
- [ ] **Step 2: Run `npx vite-node test_generate.mjs` — all checks pass**
- [ ] **Step 3: Review test_output.html in browser for visual issues**
- [ ] **Step 4: Check HTML for 10 categories of changes**
