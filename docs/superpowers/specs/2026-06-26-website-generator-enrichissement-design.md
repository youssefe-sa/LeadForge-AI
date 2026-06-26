# Spec : Enrichissement des sites web LeadForge AI

## Problème
Sites générés trop basiques : pas de galerie, pas de FAQ, pas d'images dans les layouts,
contenu générique, aucun effet visuel, pas de WhatsApp, pas de carte Google Maps, pas de barre CTA mobile.

## Solution : Sections partagées + Layouts enrichis + Pipeline contenu/images

### Architecture

```
                    ┌─ sections.ts (9 sections réutilisables)
                    │
types.ts ── layout-engine ── layouts/*.ts ── render() ── HTML complet
                                            (inclut sections)
                    ▲
                    │
content-engine ── fallback sectoriel percutant
                ── LLM retry + validation
                    │
image-engine ── hero distinct + gallery 6 images + services 6 images
```

### Fichiers à créer

#### `src/lib/website/data/faq.ts`
5 questions/réponses par secteur (fr/en), exemples pour plomberie :
- "Quels sont vos délais d'intervention ?" — réponse rassurante
- "Proposez-vous un devis gratuit ?" — réponse engageante
- "Êtes-vous assuré et certifié ?" — réponse confiance
- "Intervenez-vous le week-end ?" — réponse disponibilité
- "Quelle est la garantie sur vos travaux ?" — réponse engagement

#### `src/lib/website/sections.ts`
9 fonctions exportées, chaque section :
- Prend en paramètres les données nécessaires (lead, content, images, palette, ui strings)
- Retourne une string HTML encapsulée (ex: `<section id="gallery" class="...">...</section>`)
- Utilise les CSS variables `--primary`, `--accent`, `--bg`, `--surface`, `--text`, `--text-muted` définies par le layout

Détail des sections :

| Section | Fonction | Contenu |
|---------|----------|---------|
| Gallery | `renderGallery(images, title, palette)` | Grille 3×2 masonry + GLightbox (CDN). Fallback : icônes si pas d'images |
| FAQ | `renderFAQ(faqs, lang)` | Accordéon plein écran, animation slide, icône +/- |
| Hours | `renderHours(lang, leadHours?)` | Tableau horaires responsive, statut "Ouvert/Fermé" |
| Contact Map | `renderContactMap(lead, ui)` | Infos contact + iframe Google Maps (lat/lon par défaut selon ville ou France) |
| WhatsApp Float | `renderWhatsAppFloat(phone)` | Bouton vert flottant en bas à droite, lien `wa.me`, pulse animation |
| Sticky CTA | `renderStickyCTA(phone, ctaText)` | Barre collante en bas sur mobile, bouton d'appel + WhatsApp |
| Testimonials | `renderTestimonialsCarousel(testimonials, title)` | Carousel Swiper.js, boucle infinie, défilement automatique |
| Stats Counter | `renderStatsCounter(years, rating, reviews)` | 4 compteurs animés : années expérience (15+), clients (500+), note Google (4.9★), satisfaction (100%) |
| Trust Bar | `renderTrustBar(lang)` | 3 badges : "Certifié", "Assuré", "Devis gratuit" avec icônes |

#### `src/lib/website/shared-styles.ts`
CSS partagé pour les sections ci-dessus (~300 lignes) :
- Animations AOS : `@keyframes fadeInUp`, `fadeInLeft`, `fadeInRight`, `zoomIn`
- Glassmorphisme : `backdrop-filter: blur(12px)`, fond semi-transparent
- Keyframes : `@keyframes float (3s infinite)`, `@keyframes pulse`, `@keyframes glow`
- SVG waves : séparateurs via `::before` / `::after`
- Hamburger menu : 3 barres animées en X sur mobile
- Swiper.js styles (via import CDN)
- Transition hover sur toutes les cards : `transform: translateY(-4px); box-shadow`

### Fichiers à modifier

#### `src/lib/website/types.ts`
- Ajouter `FAQItem { question: string; answer: string }`
- Ajouter `BusinessHours { [day: string]: { open: string; close: string } | null }`

#### `src/lib/website/image-engine.ts`
- `fetchImages` renvoie maintenant des images distinctes :
  - `hero` : la meilleure image (portrait, nette, représentative)
  - `gallery` : les 6 images suivantes (paysage)
  - `services` : une image par service (seed-based pour varier)
- Améliorer Pexels avec pagination et fallback vers galerie si pas assez
- Plus de duplication entre gallery et services

#### `src/lib/website/content-engine.ts`
- `buildEnrichedContent` : textes sectoriels convaincants au lieu de "Prestation adaptée à vos besoins"
  - Ex plomberie : "Fuite d'eau ? Chauffage en panne ? Nos plombiers experts interviennent chez vous en 1h30 maximum, 7j/7."
  - Ex electricien : "Installation aux normes, dépannage urgent, domotique... Votre électricien certifié près de chez vous."
  - Ex garage : "Votre voiture mérite un pro. Diagnostic gratuit, réparations garanties, véhicule de prêt disponible."
- LLM : retry automatisé (max 2 tentatives), parsing JSON robuste, fallback enrichi en cas d'échec

#### Layouts (classic.ts, modern.ts, bold.ts, magazine.ts)
Chaque layout conserve son thème visuel (hero, polices, couleurs) et importe `sections.ts` pour le reste :
- **classic** : hero centré dégradé → services glassmorphisme → gallery → about → stats → FAQ → hours → testimonials carousel → contact map → footer
- **modern** : hero full-screen image overlay → services cards → gallery → about → stats → FAQ → hours → testimonials → contact map → footer
- **bold** : hero dark gradient text → services row alterné → gallery → about counters → FAQ → hours → testimonials → contact neon → footer
- **magazine** : hero split-screen → services magazine grid → gallery → about → FAQ → hours → testimonials sidebar → contact → footer

Chaque layout inclut `shared-styles.ts` pour le CSS des sections.

### Notes d'implémentation
- GLightbox et Swiper.js chargés depuis CDN dans `<head>`
- Google Maps iframe avec coordonnées par défaut (Paris 48.8566, 2.3522) ou ville du lead
- Pas de nouveaux packages npm
- Pas de dépendances build
- Tous les layouts passent `npx tsc --noEmit` sans erreur
- Tests : vérifier que chaque section produit du HTML valide, que gallery/FAQ/hours s'affichent correctement
