# Website Generator Enrichissement — Plan d'Implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enrichir tous les sites générés avec galerie, FAQ, horaires, WhatsApp, sticky CTA, carousel avis, compteurs stats, cartes glassmorphisme, animations AOS, — en 7 tâches.

**Architecture:** Sections partagées (sections.ts) appelées par chaque layout, CSS partagé (shared-styles.ts), data FAQ (faq.ts), images distinctes (image-engine.ts), contenu enrichi (content-engine.ts).

**Tech Stack:** TypeScript, CSS vanilla avec variables, GLightbox CDN, Swiper.js CDN, Google Maps iframe

## Global Constraints
- Aucun nouveau package npm
- Tous les fichiers dans `src/lib/website/`
- `npx tsc --noEmit` doit compiler sans erreur après chaque tâche
- Pas de dépendances build (CDN uniquement)
- Layouts gardent leur identité visuelle unique

---

### Task 1: Mise à jour types + Data FAQ

**Files:**
- Modify: `src/lib/website/types.ts`
- Create: `src/lib/website/data/faq.ts`

- [ ] **Step 1: Ajouter les types FAQItem et BusinessHours dans `types.ts`**

Après la ligne `export interface UiStrings {` (avant la fermeture), ajouter ces types. Dans `types.ts`, ajouter AVANT `export interface LayoutModule` :

```typescript
export interface FAQItem {
  question: string;
  answer: string;
}

export interface BusinessHours {
  [day: string]: { open: string; close: string } | null;
}
```

- [ ] **Step 2: Créer `src/lib/website/data/faq.ts`**

```typescript
import { FAQItem } from '../types';

const FAQ_DATA: Record<string, FAQItem[]> = {
  plomberie: [
    { question: 'Quels sont vos délais d\'intervention ?', answer: 'Nous intervenons sous 1h30 en moyenne pour les urgences (fuite, chauffe-eau en panne). Pour les travaux programmés (rénovation, installation), nous planifions sous 48h.' },
    { question: 'Proposez-vous un devis gratuit ?', answer: 'Oui, tous nos devis sont gratuits et sans engagement. Nous établissons un diagnostic précis avant de chiffrer, pour éviter toute mauvaise surprise.' },
    { question: 'Êtes-vous assuré et certifié ?', answer: 'Notre entreprise est assurée en responsabilité civile professionnelle et décennale. Nous sommes certifiés RGE (Reconnu Garant de l\'Environnement) pour les travaux d\'économie d\'énergie.' },
    { question: 'Intervenez-vous le week-end ?', answer: 'Oui, nous assurons les interventions d\'urgence 7j/7, jours fériés inclus. Un supplément peut s\'appliquer pour les interventions dominicales.' },
    { question: 'Quelle est la garantie sur vos travaux ?', answer: 'Tous nos travaux sont garantis 2 ans (hors pièces d\'usure). La garantie décennale couvre 10 ans les travaux de gros œuvre et d\'étanchéité.' },
  ],
  electricien: [
    { question: 'Faut-il une mise aux normes obligatoire ?', answer: 'Depuis 2020, toute installation électrique vendue ou louée doit être aux normes NFC 15-100. Nous réalisons un diagnostic complet et effectuons les mises en conformité nécessaires.' },
    { question: 'Proposez-vous un devis avant travaux ?', answer: 'Oui, devis gratuit et détaillé avec le coût des matériaux et de la main-d\'œuvre. Nous vous conseillons sur les solutions les plus adaptées à votre budget.' },
    { question: 'Quels types de garanties offrez-vous ?', answer: 'Garantie décennale sur les installations fixes, garantie 2 ans sur le matériel, et certification Qualifelec pour nos techniciens.' },
    { question: 'Installez-vous des bornes de recharge électrique ?', answer: 'Oui, nous sommes certifiés IRVE pour l\'installation de bornes de recharge. Nous gérons les démarches auprès d\'Enedis si nécessaire.' },
    { question: 'Faites-vous de la domotique ?', answer: 'Nous installons des systèmes domotiques connectés : volets roulants, éclairage intelligent, thermostat connecté, alarmes. Compatible Alexa et Google Home.' },
  ],
  coiffeur: [
    { question: 'Faut-il prendre rendez-vous ?', answer: 'Le rendez-vous est recommandé pour garantir votre créneau. Nous acceptons aussi les clients sans RDV selon disponibilité, avec un temps d\'attente variable.' },
    { question: 'Proposez-vous des forfaits ?', answer: 'Oui, plusieurs formules : coupe + brushing, coloration + soin, ou forfait mariage complet. Demandez notre carte au salon.' },
    { question: 'Utilisez-vous des produits professionnels ?', answer: 'Nous utilisons uniquement des marques professionnelles (L\'Oréal, Kérastase, Redken) et proposons des gammes végétales et sans sulfate.' },
    { question: 'Faites-vous les extensions ?', answer: 'Oui, extensions à froid tape-in et micro-ring. Pose par technicienne spécialisée, entretien inclus.' },
    { question: 'Puis-je venir avec une photo ?', answer: 'Bien sûr ! Une photo est le meilleur moyen de nous montrer le style souhaité. Nous adaptons la coupe à votre morphologie.' },
  ],
  restaurant: [
    { question: 'Faut-il réserver ?', answer: 'La réservation est fortement recommandée, surtout le soir et le week-end. Réservez en ligne ou par téléphone.' },
    { question: 'Proposez-vous des plats sans gluten ?', answer: 'Oui, nous avons des options sans gluten et végétariennes. Prévenez-nous à l\'avance pour que nous adaptions notre préparation.' },
    { question: 'Quels sont vos horaires d\'ouverture ?', answer: 'Service continu de 12h à 14h30 et de 19h à 22h30 du mardi au samedi. Fermé dimanche et lundi.' },
    { question: 'Faites-vous de la livraison ?', answer: 'Oui, livraison via Uber Eats et Deliveroo. Également plats à emporter sur commande téléphonique.' },
    { question: 'Organisez-vous des événements privés ?', answer: 'Nous pouvons privatiser le restaurant pour vos événements (anniversaire, séminaire, repas d\'affaires). Jusqu\'à 40 personnes.' },
  ],
  garage: [
    { question: 'Faites-vous un diagnostic avant réparation ?', answer: 'Oui, nous réalisons un diagnostic complet avec valise électronique multimarque avant toute intervention. Le diagnostic est offert pour toute réparation.' },
    { question: 'Proposez-vous un véhicule de prêt ?', answer: 'Oui, nous mettons à disposition un véhicule de prêt pendant vos réparations, sous réserve de disponibilité. Réservation conseillée.' },
    { question: 'Quels types de garanties ?', answer: 'Garantie 2 ans sur les pièces et la main-d\'œuvre. Garantie constructeur maintenue pour les révisions dans le réseau multimarque.' },
    { question: 'Réparez-vous toutes les marques ?', answer: 'Oui, nous travaillons toutes les marques françaises, allemandes, asiatiques et américaines. Équipement technique adapté à chaque modèle.' },
    { question: 'Faites-vous le contrôle technique ?', answer: 'Nous préparons votre véhicule avant contrôle technique et effectuons les contre-visites. Forfait pré-contrôle disponible.' },
  ],
  nettoyage: [
    { question: 'Proposez-vous des produits écologiques ?', answer: 'Oui, nous utilisons des produits certifiés écolabels (Écolabel Européen, NF Environnement) et des méthodes de nettoyage respectueuses de l\'environnement.' },
    { question: 'Intervenez-vous en soirée ou le week-end ?', answer: 'Oui, nous proposons des horaires flexibles : nettoyage de bureaux en soirée, interventions résidentielles le samedi.' },
    { question: 'Quels types de contrats proposez-vous ?', answer: 'Contrat régulier (hebdomadaire, mensuel), intervention ponctuelle, ou forfait rénovation après travaux. Devis gratuit sans engagement.' },
    { question: 'Votre personnel est-il formé ?', answer: 'Tous nos agents sont formés aux techniques de nettoyage professionnel et certifiés. Contrôle qualité régulier avec rapport photo.' },
    { question: 'Assurez-vous le nettoyage de vitres en hauteur ?', answer: 'Oui, nous intervenons en hauteur avec nacelle ou cordiste selon les besoins. Jusqu\'au R+10, assurance spécifique incluse.' },
  ],
  jardin: [
    { question: 'Proposez-vous un forfait entretien régulier ?', answer: 'Oui, contrat d\'entretien hebdomadaire, bimensuel ou mensuel selon vos besoins. Passage régulier avec tonte, taille haies et désherbage.' },
    { question: 'Faites-vous un plan avant travaux ?', answer: 'Oui, pour tout projet d\'aménagement, nous réalisons un plan paysager avec visualisation 3D et sélection des plantes adaptées à votre exposition.' },
    { question: 'Intervenez-vous toute l\'année ?', answer: 'Oui, entretien toute l\'année : tonte printemps/été, taille automne/hiver, déneigement si besoin.' },
    { question: 'Proposez-vous la pose de gazon synthétique ?', answer: 'Oui, gazon synthétique haute qualité, drainage inclus, garantie 10 ans. Pose sur sol préparé, stabilisé.' },
    { question: 'Éliminez-vous les déchets verts ?', answer: 'Oui, nous évacuons et recyclons tous les déchets verts (branches, feuilles, tontes). Broyage sur place possible.' },
  ],
  fitness: [
    { question: 'Puis-je faire un essai gratuit ?', answer: 'Oui, 1 séance d\'essai gratuite sans engagement. Accès à tous les équipements et cours collectifs.' },
    { question: 'Les coachs sont-ils diplômés ?', answer: 'Tous nos coachs sont diplômés d\'État (BPJEPS, STAPS) et formés en continu aux techniques actuelles.' },
    { question: 'Quels sont vos horaires d\'ouverture ?', answer: 'Ouvert de 6h à 22h du lundi au vendredi, 8h à 20h le samedi, 9h à 14h le dimanche.' },
    { question: 'Y a-t-il des cours collectifs ?', answer: 'Oui, plus de 30 cours par semaine : HIIT, Yoga, Pilates, Zumba, BodyPump, Cycling. Inclus dans l\'abonnement.' },
    { question: 'Proposez-vous un suivi nutritionnel ?', answer: 'Oui, bilan nutritionnel avec notre diététicienne sportive. Plan alimentaire personnalisé selon vos objectifs.' },
  ],
  medical: [
    { question: 'Faut-il une ordonnance pour consulter ?', answer: 'Pour les médecins généralistes et spécialistes, oui. Pour les kinésithérapeutes et ostéopathes, consultation directe possible.' },
    { question: 'Acceptez-vous la carte vitale ?', answer: 'Oui, carte vitale acceptée et tiers payant pour les consultations chez le médecin traitant.' },
    { question: 'Quels sont vos délais de rendez-vous ?', answer: 'Consultation sous 24h pour les urgences, sous 1 semaine pour les rendez-vous programmés. Télémédecine disponible 7j/7.' },
    { question: 'Faites-vous des visites à domicile ?', answer: 'Oui, visites à domicile pour les patients à mobilité réduite. Secteur couvert : 15 km autour du cabinet.' },
    { question: 'Proposez-vous la téléconsultation ?', answer: 'Oui, téléconsultation vidéo 7j/7 avec ordonnance électronique délivrée si nécessaire. Service remboursé par l\'Assurance Maladie.' },
  ],
  avocat: [
    { question: 'Combien coûte une consultation ?', answer: 'La première consultation d\'orientation est à 150€ TTC. Pour les dossiers complexes, nous proposons un forfait selon la nature de l\'affaire.' },
    { question: 'Puis-je bénéficier de l\'aide juridictionnelle ?', answer: 'Oui, nous acceptons l\'aide juridictionnelle sous condition de ressources. Nous vous accompagnons dans les démarches de demande.' },
    { question: 'Quels délais pour mon dossier ?', answer: 'Les délais varient selon la complexité : 1 mois pour un divorce amiable, 3 à 6 mois pour un contentieux prud\'homal.' },
    { question: 'Êtes-vous spécialisé ?', answer: 'Oui, notre cabinet est spécialisé en droit civil, pénal, du travail et des affaires. Chaque associé a sa spécialité.' },
    { question: 'Comment se passe la première consultation ?', answer: 'Entretien confidentiel d\'1h pour analyser votre situation, identifier les options juridiques et définir une stratégie.' },
  ],
  default: [
    { question: 'Proposez-vous un devis gratuit ?', answer: 'Oui, tous nos devis sont gratuits et sans engagement. Nous étudions votre besoin et vous proposons une solution adaptée.' },
    { question: 'Quels sont vos délais d\'intervention ?', answer: 'Nous intervenons sous 48h en moyenne pour les prestations standard. Pour les urgences, contactez-nous directement.' },
    { question: 'Quels modes de paiement acceptez-vous ?', answer: 'Carte bancaire, chèque, virement et espèces. Facilités de paiement possibles selon le montant.' },
    { question: 'Proposez-vous une garantie ?', answer: 'Oui, toutes nos prestations sont garanties. La durée dépend du type de prestation.' },
    { question: 'Intervenez-vous dans toute la région ?', answer: 'Oui, nous couvrons tout le département et les zones limitrophes. Déplacement gratuit selon le secteur.' },
  ],
};

const FAQ_EN: Record<string, FAQItem[]> = {
  plomberie: [
    { question: 'How fast can you respond?', answer: 'We arrive within 90 minutes on average for emergencies (leaks, water heater failure). For scheduled work, we plan within 48 hours.' },
    { question: 'Do you offer free quotes?', answer: 'Yes, all quotes are free with no obligation. We assess before quoting to avoid surprises.' },
    { question: 'Are you insured and certified?', answer: 'We carry full professional and decennial liability insurance. Our team is RGE certified for energy-saving work.' },
    { question: 'Do you work on weekends?', answer: 'Yes, emergency service available 7 days a week, including holidays. A surcharge may apply for Sunday service.' },
    { question: 'What warranty do you offer?', answer: 'All work is guaranteed for 2 years (excluding wear parts). Decennial guarantee covers 10 years for structural work.' },
  ],
  electricien: [
    { question: 'Do I need electrical code upgrade?', answer: 'Since 2020, any installation sold or rented must meet NFC 15-100 standards. We perform full diagnostics and compliance upgrades.' },
    { question: 'Do you provide quotes before work?', answer: 'Yes, detailed free quote with material and labor costs. We advise on the best solutions for your budget.' },
    { question: 'What warranties do you offer?', answer: 'Decennial warranty on fixed installations, 2-year warranty on equipment, and Qualifelec certification for our technicians.' },
    { question: 'Do you install EV charging stations?', answer: 'Yes, we are IRVE certified for EV charger installation. We handle Enedis paperwork if needed.' },
    { question: 'Do you do smart home installation?', answer: 'Yes, connected systems: smart blinds, intelligent lighting, smart thermostats, alarms. Alexa and Google Home compatible.' },
  ],
  default: [
    { question: 'Do you offer free quotes?', answer: 'Yes, all quotes are free with no obligation. We study your needs and propose tailored solutions.' },
    { question: 'How fast can you respond?', answer: 'We typically respond within 48 hours for standard services. Contact us directly for urgent needs.' },
    { question: 'What payment methods do you accept?', answer: 'Credit card, check, wire transfer, and cash. Payment plans available depending on the amount.' },
    { question: 'Do you offer a warranty?', answer: 'Yes, all our services are guaranteed. Duration depends on the type of service.' },
    { question: 'Do you cover the entire region?', answer: 'Yes, we cover the entire department and surrounding areas. Travel is free depending on location.' },
  ],
};

export function getSectorFAQ(sector: string, lang: 'fr' | 'en' = 'fr'): FAQItem[] {
  const s = (sector || '').toLowerCase();
  const source = lang === 'en' ? FAQ_EN : FAQ_DATA;
  for (const [key, faqs] of Object.entries(source)) {
    if (s.includes(key)) return faqs;
  }
  return source.default || FAQ_DATA.default;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/website/types.ts src/lib/website/data/faq.ts
git commit -m "feat(website): add FAQItem/BusinessHours types and sector FAQ data"
```

---

### Task 2: CSS partagé des sections

**Files:**
- Create: `src/lib/website/shared-styles.ts`

- [ ] **Step 1: Créer `src/lib/website/shared-styles.ts`**

```typescript
export const SHARED_STYLES = `
/* === SECTION: Gallery Masonry === */
.gallery-masonry { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin: 2rem 0; }
.gallery-item { position: relative; overflow: hidden; border-radius: 12px; cursor: pointer; aspect-ratio: 4/3; }
.gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
.gallery-item:hover img { transform: scale(1.08); }
.gallery-item .overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.3); opacity: 0; transition: opacity 0.3s; display: flex; align-items: center; justify-content: center; }
.gallery-item:hover .overlay { opacity: 1; }
.gallery-item .overlay span { color: white; font-size: 2rem; }

/* === SECTION: FAQ Accordion === */
.faq-item { border-bottom: 1px solid var(--border, #e2e8f0); padding: 0; }
.faq-question { width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 1.25rem 0; background: none; border: none; cursor: pointer; font-size: 1.05rem; font-weight: 600; color: var(--text, #1f2937); text-align: left; }
.faq-question .icon { width: 24px; height: 24px; position: relative; flex-shrink: 0; margin-left: 1rem; }
.faq-question .icon::before, .faq-question .icon::after { content: ''; position: absolute; background: var(--primary, #2563eb); border-radius: 2px; transition: transform 0.3s; }
.faq-question .icon::before { width: 2px; height: 16px; top: 4px; left: 11px; }
.faq-question .icon::after { width: 16px; height: 2px; top: 11px; left: 4px; }
.faq-item.open .faq-question .icon::before { transform: rotate(90deg); }
.faq-answer { max-height: 0; overflow: hidden; transition: max-height 0.3s ease, padding 0.3s ease; padding: 0; color: var(--text-muted, #6b7280); line-height: 1.7; }
.faq-item.open .faq-answer { max-height: 300px; padding: 0 0 1.25rem 0; }

/* === SECTION: Hours Table === */
.hours-table { width: 100%; max-width: 400px; margin: 0 auto; border-collapse: collapse; }
.hours-table td { padding: 0.75rem 1rem; border-bottom: 1px solid var(--border, #e2e8f0); }
.hours-table td:first-child { font-weight: 600; }
.hours-table .closed { color: #ef4444; font-weight: 500; }
.hours-table .open { color: #22c55e; font-weight: 500; }
.hours-table .today { background: rgba(37,99,235,0.05); }

/* === SECTION: WhatsApp Float === */
.whatsapp-float { position: fixed; bottom: 24px; right: 24px; z-index: 9999; width: 56px; height: 56px; background: #25D366; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 16px rgba(37,211,102,0.4); color: white; text-decoration: none; animation: whatsappPulse 2s infinite; transition: transform 0.3s; }
.whatsapp-float:hover { transform: scale(1.1); }
.whatsapp-float svg { width: 28px; height: 28px; fill: white; }
@keyframes whatsappPulse { 0% { box-shadow: 0 4px 16px rgba(37,211,102,0.4); } 50% { box-shadow: 0 4px 24px rgba(37,211,102,0.7); } 100% { box-shadow: 0 4px 16px rgba(37,211,102,0.4); } }

/* === SECTION: Sticky CTA Mobile === */
.sticky-cta { display: none; position: fixed; bottom: 0; left: 0; right: 0; z-index: 9998; background: white; padding: 0.75rem 1rem; box-shadow: 0 -4px 16px rgba(0,0,0,0.1); }
.sticky-cta .cta-row { display: flex; gap: 0.75rem; }
.sticky-cta .cta-row a { flex: 1; padding: 0.75rem; border-radius: 8px; text-align: center; text-decoration: none; font-weight: 600; font-size: 0.95rem; }
.sticky-cta .cta-call { background: var(--primary, #2563eb); color: white; }
.sticky-cta .cta-whatsapp { background: #25D366; color: white; }
@media (max-width: 768px) { .sticky-cta { display: block; } body { padding-bottom: 72px; } }

/* === SECTION: Testimonials Carousel === */
.testimonials-track { display: flex; gap: 1.5rem; overflow-x: auto; scroll-snap-type: x mandatory; padding: 1rem 0; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
.testimonials-track::-webkit-scrollbar { display: none; }
.testimonial-slide { min-width: 320px; flex-shrink: 0; scroll-snap-align: start; background: var(--surface, white); padding: 1.5rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
.testimonial-slide .text { font-style: italic; line-height: 1.7; margin-bottom: 1rem; color: var(--text-muted, #6b7280); }
.testimonial-slide .author { font-weight: 600; color: var(--text, #1f2937); }
.testimonial-slide .rating { color: #f59e0b; font-size: 0.85rem; }
.testimonial-slide .date { color: var(--text-muted, #94a3b8); font-size: 0.8rem; }
.testimonials-auto { overflow: hidden; }
.testimonials-auto .track-inner { display: flex; animation: scrollTestimonials 30s linear infinite; }
.testimonials-auto .track-inner:hover { animation-play-state: paused; }
@keyframes scrollTestimonials { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

/* === SECTION: Stats Counter === */
.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 2rem; text-align: center; }
.stat-item .stat-icon { font-size: 2rem; margin-bottom: 0.5rem; }
.stat-item .stat-number { font-size: 2.5rem; font-weight: 800; background: linear-gradient(135deg, var(--primary, #2563eb), var(--accent, #f59e0b)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.stat-item .stat-label { font-size: 0.9rem; color: var(--text-muted, #6b7280); margin-top: 0.25rem; }

/* === SECTION: Trust Badges === */
.trust-bar { display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap; margin: 2rem 0; }
.trust-badge { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; background: var(--surface, white); border-radius: 50px; box-shadow: 0 1px 4px rgba(0,0,0,0.06); font-size: 0.85rem; color: var(--text-muted, #6b7280); }
.trust-badge .trust-icon { font-size: 1.2rem; }

/* === SECTION: Contact Map === */
.contact-map-container { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start; }
.contact-details { display: flex; flex-direction: column; gap: 1rem; }
.contact-detail-card { display: flex; align-items: center; gap: 1rem; padding: 1rem; background: var(--surface, white); border-radius: 12px; box-shadow: 0 1px 4px rgba(0,0,0,0.04); }
.contact-detail-card .icon { font-size: 1.5rem; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; background: var(--bg, #f8fafc); border-radius: 10px; }
.contact-detail-card .info { font-size: 0.9rem; }
.contact-detail-card .info strong { display: block; font-size: 0.8rem; color: var(--text-muted, #6b7280); margin-bottom: 0.2rem; }
.contact-detail-card .info a { color: var(--primary, #2563eb); text-decoration: none; }
.contact-map { border-radius: 12px; overflow: hidden; height: 300px; }
.contact-map iframe { width: 100%; height: 100%; border: none; }
@media (max-width: 768px) { .contact-map-container { grid-template-columns: 1fr; } }

/* === ANIMATIONS === */
@keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeInLeft { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
@keyframes fadeInRight { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
@keyframes zoomIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }

/* === GLightbox Overrides === */
.glightbox-container { z-index: 99999 !important; }

/* === Hamburger Menu === */
.hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; background: none; border: none; }
.hamburger span { display: block; width: 24px; height: 2px; background: var(--text, #1f2937); border-radius: 2px; transition: all 0.3s; }
.hamburger.active span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
.hamburger.active span:nth-child(2) { opacity: 0; }
.hamburger.active span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }
.mobile-menu { display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 999; }
.mobile-menu.open { display: block; }
.mobile-menu-inner { background: white; width: 80%; max-width: 320px; height: 100%; padding: 2rem; box-shadow: 2px 0 16px rgba(0,0,0,0.1); }
.mobile-menu-inner a { display: block; padding: 1rem 0; color: var(--text, #1f2937); text-decoration: none; font-weight: 500; border-bottom: 1px solid var(--border, #e2e8f0); }
.mobile-menu-close { position: absolute; top: 1rem; right: 1rem; background: white; border: none; width: 40px; height: 40px; border-radius: 50%; font-size: 1.5rem; cursor: pointer; }
@media (max-width: 768px) { .hamburger { display: flex; } .nav-links { display: none !important; } }

/* === Section Divider Waves === */
.section-wave { position: relative; }
.section-wave::after { content: ''; position: absolute; bottom: -2px; left: 0; right: 0; height: 40px; background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 40'%3E%3Cpath d='M0,20 Q150,0 300,20 T600,20 T900,20 T1200,20 V40 H0Z' fill='%23f8fafc' opacity='0.5'/%3E%3C/svg%3E") repeat-x bottom; background-size: 1200px 40px; }

/* === Glassmorphism === */
.glass-card { background: rgba(255,255,255,0.7); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.3); box-shadow: 0 8px 32px rgba(0,0,0,0.06); }
`;
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/website/shared-styles.ts
git commit -m "feat(website): add shared CSS styles for sections (gallery, FAQ, WhatsApp, etc)"
```

---

### Task 3: Sections module (toutes les sections partagées)

**Files:**
- Create: `src/lib/website/sections.ts`

Ce module exporte 9 fonctions. Chaque fonction prend les paramètres nécessaires et retourne une string HTML.

**Interfaces:**
- Consumes: `Lead` (from `../supabase-store`), `WebsiteContent`, `WebsiteImages`, `Palette`, `UiStrings`, `FAQItem` (from `./types`), `getSectorFAQ` (from `./data/faq`), `getUiStrings` (from `./data/ui-strings`), `SHARED_STYLES` (from `./shared-styles`)
- Produces: 9 fonctions nommées exportées que les layouts appellent

- [ ] **Step 1: Créer `src/lib/website/sections.ts`**

```typescript
import { Lead } from '../supabase-store';
import { WebsiteContent, WebsiteImages, Palette, UiStrings, FAQItem } from './types';
import { getSectorFAQ } from './data/faq';

/* ====== SECTION: Gallery ====== */
export function renderGallery(images: WebsiteImages, title: string, palette: Palette): string {
  const galleryImages = images.gallery.filter(Boolean).slice(0, 6);
  if (!galleryImages.length) return '';

  return `<section id="gallery" style="padding:5rem 0;background:var(--bg,${palette.background})">
    <div class="section-inner" style="max-width:1100px;margin:0 auto;padding:0 2rem">
      <h2 style="text-align:center;font-size:2.2rem;margin-bottom:0.5rem;color:${palette.primary}">${escapeHtml(title)}</h2>
      <p style="text-align:center;color:var(--text-muted,#6b7280);margin-bottom:2rem">${getUiText('galleryDesc')}</p>
      <div class="gallery-masonry">
        ${galleryImages.map((url, i) => `
          <a href="${escapeHtml(url)}" class="glightbox gallery-item" data-gallery="gallery1" style="animation:fadeInUp 0.5s ease ${i * 0.1}s both">
            <img src="${escapeHtml(url)}" alt="Gallery ${i + 1}" loading="lazy">
            <div class="overlay"><span>🔍</span></div>
          </a>
        `).join('')}
      </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/glightbox@3.2.0/dist/js/glightbox.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glightbox@3.2.0/dist/css/glightbox.min.css">
    <script>if(typeof GLightbox!=='undefined'){GLightbox({selector:'.glightbox'});}</script>
  </section>`;
}

/* ====== SECTION: FAQ ====== */
export function renderFAQ(sector: string, lang: 'fr' | 'en'): string {
  const faqs = getSectorFAQ(sector, lang);
  const title = getUiText(lang === 'en' ? 'FAQTitle' : 'FAQTitle');
  const subtitle = getUiText(lang === 'en' ? 'FAQDesc' : 'FAQDesc');
  if (!faqs.length) return '';

  return `<section id="faq" style="padding:5rem 0;background:var(--surface,white)">
    <div style="max-width:800px;margin:0 auto;padding:0 2rem">
      <h2 style="text-align:center;font-size:2.2rem;margin-bottom:0.5rem;color:var(--primary,${getPalettePrimary()})">${escapeHtml(title)}</h2>
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

/* ====== SECTION: Hours ====== */
export function renderHours(lang: 'fr' | 'en', lead?: Lead): string {
  const days = lang === 'en'
    ? ['Monday - Friday', 'Saturday', 'Sunday']
    : ['Lundi - Vendredi', 'Samedi', 'Dimanche'];
  const hours = ['9:00 - 19:00', '9:00 - 12:00', lang === 'en' ? 'Closed' : 'Fermé'];
  const now = new Date();
  const dayIdx = now.getDay(); // 0=Sun
  const todayIdx = dayIdx === 0 ? 2 : dayIdx === 6 ? 1 : 0;
  const title = lang === 'en' ? 'Opening Hours' : 'Horaires d\'Ouverture';

  return `<section id="hours" style="padding:4rem 0;background:var(--bg,#f8fafc)">
    <div style="max-width:600px;margin:0 auto;padding:0 2rem;text-align:center">
      <h2 style="font-size:2rem;margin-bottom:2rem;color:var(--primary)">${title}</h2>
      <table class="hours-table">
        ${days.map((day, i) => `
          <tr${i === todayIdx ? ' class="today"' : ''}>
            <td>${escapeHtml(day)}</td>
            <td class="${hours[i] === 'Fermé' || hours[i] === 'Closed' ? 'closed' : 'open'}">${hours[i] === 'Fermé' || hours[i] === 'Closed' ? escapeHtml(hours[i]) : escapeHtml(hours[i])}</td>
          </tr>
        `).join('')}
      </table>
    </div>
  </section>`;
}

/* ====== SECTION: Contact Map ====== */
export function renderContactMap(lead: Lead, ui: UiStrings): string {
  const lat = 48.8566;
  const lon = 2.3522;
  const mapSrc = `https://maps.google.com/maps?q=${lat},${lon}&z=14&output=embed&hl=${ui.lang}`;

  return `<section id="contact" style="padding:5rem 0">
    <div class="section-inner" style="max-width:1100px;margin:0 auto;padding:0 2rem">
      <h2 style="text-align:center;font-size:2.2rem;margin-bottom:2rem;color:var(--primary)">${escapeHtml(ui.contactTitle)}</h2>
      <div class="contact-map-container">
        <div class="contact-details">
          ${lead.phone ? `<div class="contact-detail-card">
            <div class="icon">📞</div>
            <div class="info"><strong>${escapeHtml(ui.contactCall)}</strong><a href="tel:${escapeHtml(lead.phone)}">${escapeHtml(lead.phone)}</a></div>
          </div>` : ''}
          ${lead.email ? `<div class="contact-detail-card">
            <div class="icon">✉️</div>
            <div class="info"><strong>Email</strong><a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a></div>
          </div>` : ''}
          ${lead.address ? `<div class="contact-detail-card">
            <div class="icon">📍</div>
            <div class="info"><strong>${ui.lang === 'en' ? 'Address' : 'Adresse'}</strong><span>${escapeHtml(lead.address)}</span></div>
          </div>` : ''}
          <div class="contact-detail-card">
            <div class="icon">🕐</div>
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

/* ====== SECTION: WhatsApp Float ====== */
export function renderWhatsAppFloat(phone: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const msg = encodeURIComponent('Bonjour, je souhaite obtenir des informations.');
  return `<a href="https://wa.me/33${cleanPhone.slice(cleanPhone.length > 9 ? cleanPhone.length - 9 : 0)}?text=${msg}" target="_blank" class="whatsapp-float" aria-label="WhatsApp">
    <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  </a>`;
}

/* ====== SECTION: Sticky CTA Mobile ====== */
export function renderStickyCTA(phone: string, ctaText: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const msg = encodeURIComponent('Bonjour, je souhaite obtenir des informations.');
  return `<div class="sticky-cta">
    <div class="cta-row">
      <a href="tel:${escapeHtml(phone)}" class="cta-call">${escapeHtml(ctaText)}</a>
      <a href="https://wa.me/33${cleanPhone.slice(cleanPhone.length > 9 ? cleanPhone.length - 9 : 0)}?text=${msg}" target="_blank" class="cta-whatsapp">WhatsApp</a>
    </div>
  </div>`;
}

/* ====== SECTION: Testimonials Carousel ====== */
export function renderTestimonialsCarousel(testimonials: Array<{ author: string; text: string; rating: number; date?: string }>, title: string, lang: 'fr' | 'en'): string {
  if (!testimonials.length) return '';
  const items = testimonials.slice(0, 8);
  return `<section id="testimonials" style="padding:5rem 0;overflow:hidden">
    <div style="max-width:1100px;margin:0 auto;padding:0 2rem">
      <h2 style="text-align:center;font-size:2.2rem;margin-bottom:0.5rem;color:var(--primary)">${escapeHtml(title)}</h2>
      <p style="text-align:center;color:var(--text-muted,#6b7280);margin-bottom:2rem">${lang === 'en' ? 'What our clients say about us' : 'Ce que nos clients disent de nous'}</p>
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

/* ====== SECTION: Stats Counter ====== */
export function renderStatsCounter(years: string, rating: number, reviewCount: number, lang: 'fr' | 'en'): string {
  const items = [
    { icon: '📅', number: `${years}+`, label: lang === 'en' ? 'Years Experience' : "Ans d'expérience" },
    { icon: '🏆', number: '500+', label: lang === 'en' ? 'Clients Served' : 'Clients servis' },
    { icon: '⭐', number: `${rating}★`, label: lang === 'en' ? 'Google Rating' : 'Note Google' },
    { icon: '💯', number: '100%', label: lang === 'en' ? 'Satisfaction' : 'Satisfaction' },
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

/* ====== SECTION: Trust Bar ====== */
export function renderTrustBar(lang: 'fr' | 'en'): string {
  const badges = lang === 'en'
    ? [
        { icon: '✅', text: 'Certified Professional' },
        { icon: '🛡️', text: 'Fully Insured' },
        { icon: '📋', text: 'Free Quote' },
      ]
    : [
        { icon: '✅', text: 'Professionnel Certifié' },
        { icon: '🛡️', text: 'Assurance Décennale' },
        { icon: '📋', text: 'Devis Gratuit' },
      ];
  return `<div class="trust-bar">
    ${badges.map(b => `<div class="trust-badge"><span class="trust-icon">${b.icon}</span> ${escapeHtml(b.text)}</div>`).join('')}
  </div>`;
}

/* ====== HELPERS ====== */
function escapeHtml(text: string): string {
  if (!text) return '';
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function getUiText(key: string): string {
  const texts: Record<string, string> = {
    galleryDesc: 'Découvrez nos réalisations en images',
    galleryDescEn: 'Discover our work in pictures',
    FAQTitle: 'Questions Fréquentes',
    FAQTitleEn: 'Frequently Asked Questions',
    FAQDesc: 'Tout ce que vous devez savoir avant de nous contacter',
    FAQDescEn: 'Everything you need to know before contacting us',
  };
  return texts[key] || key;
}

function getPalettePrimary(): string { return '#2563eb'; }
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/website/sections.ts
git commit -m "feat(website): add shared sections module (gallery, FAQ, hours, contact, WhatsApp, CTA, testimonials, stats, trust)"
```

---

### Task 4: Image Engine — images distinctes pour hero/gallery/services

**Files:**
- Modify: `src/lib/website/image-engine.ts`

**Objectif :** Au lieu de renvoyer les mêmes images pour hero, gallery et services, `fetchImages` renvoie des images distinctes pour chaque champ.

- [ ] **Step 1: Modifier `fetchImages` dans `image-engine.ts`**

Remplacer la fin de la fonction `fetchImages` (à partir de `const allImages = [...new Set([...`) par :

```typescript
  const allImages = [...new Set([
    ...leadImages,
    ...pexelImages,
    ...filteredStatic
  ])];

  if (allImages.length === 0) {
    return { hero: '', gallery: [], services: [] };
  }

  const offset = leadHash % Math.max(allImages.length, 1);
  const rotated = [...allImages.slice(offset), ...allImages.slice(0, offset)];

  return {
    hero: rotated[0] || '',
    gallery: rotated.slice(1, 7),
    services: rotated.slice(0, Math.min(6, Math.max(1, Math.floor(rotated.length / 2))))
  };
```

- [ ] **Step 2: Vérifier la compilation**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/lib/website/image-engine.ts
git commit -m "feat(website): return distinct hero/gallery/services images"
```

---

### Task 5: Content Engine — contenu sectoriel percutant + LLM retry

**Files:**
- Modify: `src/lib/website/content-engine.ts`

**Objectif :** Remplacer les textes fallback génériques par des textes sectoriels convaincants. Améliorer la résilience LLM avec retry.

- [ ] **Step 1: Remplacer `buildEnrichedContent` textes génériques par textes percutants**

Dans `content-engine.ts`, remplacer la construction des services dans `buildEnrichedContent` :

```typescript
function buildEnrichedContent(lead: Lead, isEn: boolean): WebsiteContent {
  const services = getSectorServices(lead.sector);
  const years = extractYears(lead);

  const enrichedServices = services.map(s => ({
    name: s.name,
    description: s.description,
    features: s.features
  }));

  const googleReviews = (lead.googleReviewsData || [])
    .filter(r => r && r.text)
    .slice(0, 6)
    .map(r => ({
      author: r.author || (isEn ? 'Client' : 'Client satisfait'),
      text: r.text || (isEn ? 'Excellent service!' : 'Excellent service !'),
      rating: r.rating || 5,
      date: r.date || ''
    }));

  const testimonials = googleReviews.length >= 2
    ? googleReviews
    : getSectorFallbackReviews(lead.sector).slice(0, 4);

  const sector = (lead.sector || '').toLowerCase();
  const cityStr = lead.city ? (isEn ? ` in ${lead.city}` : ` à ${lead.city}`) : '';
  const phoneStr = lead.phone ? lead.phone : '';

  let whyChooseUs: string[];
  let aboutText: string;
  let heroSubtitle: string;

  if (sector.includes('plomb')) {
    aboutText = lead.description || `Fuite d'eau ? Chauffe-eau en panne ? Plomberie Express${cityStr} intervient 7j/7, sous 1h30 en moyenne. Plombiers expérimentés, devis gratuit, garantie 2 ans.`;
    heroSubtitle = lead.description || `Plombier professionnel${cityStr} — Intervention urgente 24h/24 · Devis gratuit · 15 ans d'expérience`;
    whyChooseUs = [`+${years} ans d'expérience`, 'Intervention sous 1h30', 'Devis gratuit sans surprise', 'Garantie 2 ans sur tous les travaux'];
  } else if (sector.includes('electric')) {
    aboutText = lead.description || `Votre électricien certifié${cityStr}. Mise aux normes, domotique, dépannage urgent. Techniciens qualifiés Qualifelec, devis gratuit.`;
    heroSubtitle = lead.description || `Électricien certifié${cityStr} — Installation, dépannage, domotique · NFC 15-100 · Devis offert`;
    whyChooseUs = [`+${years} ans d'expérience`, 'Certification Qualifelec', 'Mise aux normes NFC 15-100', 'Devis gratuit personnalisé'];
  } else if (sector.includes('coiff')) {
    aboutText = lead.description || `Salon de coiffure${cityStr} — Coupes modernes, coloration, barbier, extensions. Produits professionnels L'Oréal & Kérastase.`;
    heroSubtitle = lead.description || `Coiffeur${cityStr} — Coupe · Couleur · Barbier · Extensions · Produits pro`;
    whyChooseUs = [`+${years} ans d'expérience`, 'Produits professionnels', 'Visagisme personnalisé', 'Ambiance détente & conviviale'];
  } else if (sector.includes('restaurant')) {
    aboutText = lead.description || `Restaurant${cityStr} — Cuisine maison avec des produits frais et de saison. Service traiteur et salle privatisable.`;
    heroSubtitle = lead.description || `Restaurant${cityStr} — Cuisine maison · Produits frais · Traiteur · Événements`;
    whyChooseUs = [`+${years} ans d'expérience`, 'Produits frais et locaux', 'Cuisine 100% maison', 'Cadre chaleureux et élégant'];
  } else if (sector.includes('garage')) {
    aboutText = lead.description || `Garage${cityStr} — Mécanique toutes marques, diagnostic électronique, carrosserie, pneus. Véhicule de prêt gratuit.`;
    heroSubtitle = lead.description || `Garage${cityStr} — Mécanique · Diagnostic · Carrosserie · Pneus · Véhicule de prêt`;
    whyChooseUs = [`+${years} ans d'expérience`, 'Véhicule de prêt gratuit', 'Garantie 2 ans pièces & main-d\'œuvre', 'Diagnostic offert sur devis'];
  } else if (sector.includes('nettoyage')) {
    aboutText = lead.description || `Nettoyage professionnel${cityStr} — Bureaux, vitres, après travaux. Produits écologiques, équipe formée, contrat sur mesure.`;
    heroSubtitle = lead.description || `Nettoyage pro${cityStr} — Bureaux · Vitres · Après travaux · Produits écolabels`;
    whyChooseUs = [`+${years} ans d'expérience`, 'Produits écologiques certifiés', 'Équipe formée et vérifiée', 'Contrat flexible sans engagement'];
  } else if (sector.includes('jardin')) {
    aboutText = lead.description || `Paysagiste${cityStr} — Création de jardins, élagage, entretien, terrasses. Sur-mesure, devis gratuit.`;
    heroSubtitle = lead.description || `Paysagiste${cityStr} — Création · Entretien · Élagage · Terrasse · Devis offert`;
    whyChooseUs = [`+${years} ans d'expérience`, 'Plan 3D avant travaux', 'Plantes adaptées à votre région', 'Garantie reprise 1 an'];
  } else if (sector.includes('fitness')) {
    aboutText = lead.description || `Salle de sport${cityStr} — Coaching personnel, cours collectifs, musculation, cardio. 1 séance d'essai gratuite.`;
    heroSubtitle = lead.description || `Fitness${cityStr} — Coaching · Cours · Musculation · Cardio · Essai gratuit`;
    whyChooseUs = [`+${years} ans d'expérience`, 'Coachs diplômés d\'État', 'Séance d\'essai gratuite', 'Cours collectifs illimités'];
  } else if (sector.includes('medical') || sector.includes('medecin') || sector.includes('dentiste')) {
    aboutText = lead.description || `Cabinet médical${cityStr} — Consultation, kiné, ostéo, infirmier à domicile. RDV sous 24h, téléconsultation 7j/7.`;
    heroSubtitle = lead.description || `Cabinet médical${cityStr} — Consultation · Kiné · Ostéo · Infirmier · Téléconsultation`;
    whyChooseUs = [`+${years} ans d'expérience`, 'RDV sous 24h', 'Tiers payant accepté', 'Visite à domicile possible'];
  } else if (sector.includes('avocat')) {
    aboutText = lead.description || `Cabinet d'avocats${cityStr} — Droit civil, pénal, travail, affaires. Première consultation d'orientation 150€, aide juridictionnelle acceptée.`;
    heroSubtitle = lead.description || `Avocat${cityStr} — Civil · Pénal · Travail · Affaires · Aide juridictionnelle`;
    whyChooseUs = [`+${years} ans d'expérience`, 'Aide juridictionnelle acceptée', 'Spécialistes reconnus', 'Suivi personnalisé continu'];
  } else {
    aboutText = lead.description || `${lead.name}${cityStr} — Professionnel à votre service. Devis gratuit, intervention rapide, satisfaction garantie.`;
    heroSubtitle = lead.description || `${lead.name}${cityStr} — Service professionnel · Devis gratuit · Intervention rapide`;
    whyChooseUs = [`+${years} ans d'expérience`, 'Service professionnel', 'Devis gratuit', 'Satisfaction garantie'];
  }

  return {
    heroTitle: lead.name,
    heroSubtitle,
    aboutText,
    aboutTitle: isEn ? 'About Us' : 'À Propos',
    services: enrichedServices,
    servicesTitle: isEn ? 'Our Services' : 'Nos Services',
    whyChooseUs,
    testimonials,
    ctaText: isEn ? 'Call Us' : 'Contactez-nous',
    metaDescription: `${lead.name} — ${lead.sector || 'Professionnel'}${cityStr}. ${lead.description || ''}`.substring(0, 160),
    galleryTitle: isEn ? 'Our Gallery' : 'Nos Réalisations',
    processSteps: undefined
  };
}
```

- [ ] **Step 2: Améliorer `generateContent` avec LLM retry**

Remplacer la fonction `generateContent` :

```typescript
export async function generateContent(lead: Lead, apiConfig: ApiConfig): Promise<WebsiteContent> {
  const isEn = detectLanguage(lead) === 'en';
  const hasLLM = !!(apiConfig.groqKey || apiConfig.geminiKey || apiConfig.nvidiaKey || apiConfig.openrouterKey);

  if (!hasLLM) {
    return buildEnrichedContent(lead, isEn);
  }

  const prompt = buildLlmPrompt(lead, isEn);
  const system = isEn
    ? 'You are a professional web copywriter for local businesses. Return ONLY valid JSON, no markdown, no explanations.'
    : 'Tu es un copywriter web professionnel pour artisans et commerçants. Retourne UNIQUEMENT du JSON valide, sans markdown ni explications.';

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await callLLM(apiConfig, prompt, system);
      if (!response) continue;

      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) continue;

      const parsed = JSON.parse(jsonMatch[0]);
      if (!parsed.heroTitle || !parsed.heroSubtitle) continue;

      const enriched = buildEnrichedContent(lead, isEn);
      return {
        ...enriched,
        ...parsed,
        services: Array.isArray(parsed.services) && parsed.services.length >= 3 ? parsed.services : enriched.services,
        testimonials: Array.isArray(parsed.testimonials) && parsed.testimonials.length >= 2 ? parsed.testimonials : enriched.testimonials,
        whyChooseUs: Array.isArray(parsed.whyChooseUs) && parsed.whyChooseUs.length >= 2 ? parsed.whyChooseUs : enriched.whyChooseUs,
      };
    } catch {
      // Retry on failure
    }
  }

  return buildEnrichedContent(lead, isEn);
}
```

- [ ] **Step 3: Vérifier la compilation**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/lib/website/content-engine.ts
git commit -m "feat(website): enriched sector content + LLM retry with validation"
```

---

### Task 6: Layouts enrichis (classic, modern, bold, magazine)

**Files:**
- Modify: `src/lib/website/layouts/classic.ts`
- Modify: `src/lib/website/layouts/modern.ts`
- Modify: `src/lib/website/layouts/bold.ts`
- Modify: `src/lib/website/layouts/magazine.ts`

**Objectif :** Chaque layout importe et appelle les sections partagées après son contenu existant.

Modifications communes à tous les layouts :
1. Ajouter `import { renderGallery, renderFAQ, renderHours, renderContactMap, renderWhatsAppFloat, renderStickyCTA, renderTestimonialsCarousel, renderStatsCounter, renderTrustBar } from '../sections';`
2. Ajouter `import { SHARED_STYLES } from '../shared-styles';`
3. Dans le template HTML, concaténer SHARED_STYLES dans le bloc `<style>`
4. Après la section contact, appeler les sections restantes

- [ ] **Step 1a: Modifier `classic.ts`**

Ajouter les imports en haut :
```typescript
import { renderGallery, renderFAQ, renderHours, renderContactMap, renderWhatsAppFloat, renderStickyCTA, renderTestimonialsCarousel, renderStatsCounter, renderTrustBar } from '../sections';
import { SHARED_STYLES } from '../shared-styles';
```

Dans le `<style>`, après les styles existants et avant `</style>` (ligne ~53), ajouter :
```
    ${SHARED_STYLES}
```

Après la ligne `</section>` du contact (actuellement ligne 121), avant `<footer>`, ajouter les sections enrichies :
```typescript
      ${renderGallery(images, content.galleryTitle || (lang === 'en' ? 'Our Gallery' : 'Nos Réalisations'), palette)}
      ${renderFAQ(lead.sector, lang)}
      ${renderHours(lang, lead)}
      ${renderStatsCounter(extractYears(lead), lead.googleRating || 4.9, lead.googleReviews || 0, lang)}
      ${renderTestimonialsCarousel(reviews, lang === 'en' ? 'Client Reviews' : 'Avis Clients', lang)}
      ${renderContactMap(lead, ui)}
      ${renderTrustBar(lang)}
      ${renderWhatsAppFloat(lead.phone || '')}
      ${renderStickyCTA(lead.phone || '', content.ctaText)}
```

- [ ] **Step 1b: Ajouter `extractYears` helper dans `classic.ts`**

Ajouter avant `function detectLanguage` (ligne 133) :
```typescript
function extractYears(lead: Lead): string {
  if (lead.description) {
    const match = lead.description.match(/(\d+)\s*ans?\s+d['']exp[eé]rience/i);
    if (match) return match[1];
  }
  return '15';
}
```

- [ ] **Step 1c: Passer les bonnes valeurs aux sections**

Dans `classic.ts`, dans la fonction `render`, les variables existantes `lang`, `ui`, `reviews` sont déjà définies. Ajouter les appels de sections après la section contact (avant le footer).

- [ ] **Step 2: Modifier `modern.ts`**

Ajouter imports + SHARED_STYLES dans `<style>` + sections après contact (avant footer).

Ajouter helper `extractYears` et importer `Lead` depuis `../../supabase-store` si pas déjà fait.

- [ ] **Step 3: Modifier `bold.ts`**

Ajouter imports + SHARED_STYLES dans `<style>` + sections après contact (avant footer).
Ajouter helper `extractYears`.

- [ ] **Step 4: Modifier `magazine.ts`**

Ajouter imports + SHARED_STYLES dans `<style>` + sections après contact (avant footer).
Ajouter helper `extractYears`.

- [ ] **Step 5: Vérifier la compilation**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 6: Commit**

```bash
git add src/lib/website/layouts/classic.ts src/lib/website/layouts/modern.ts src/lib/website/layouts/bold.ts src/lib/website/layouts/magazine.ts
git commit -m "feat(website): enrich all 4 layouts with shared sections (gallery, FAQ, WhatsApp, etc)"
```

---

### Task 7: Nettoyage + Vérification finale

**Files:**
- Vérification globale

- [ ] **Step 1: Vérifier la compilation finale**

Run: `npx tsc --noEmit`
Expected: No errors, no warnings

- [ ] **Step 2: Vérifier le mapping des layouts (diversité)**

Run: `npx tsx -e "
const { selectLayout } = require('./src/lib/website/layout-engine');
['plomberie','electricien','coiffeur','restaurant','garage','avocat','medecin','fitness','jardin','nettoyage'].forEach(s => {
  console.log(s + ' -> ' + selectLayout({id:'t',name:'T',sector:s}).id);
})"`
Expected: Chaque secteur a son layout attribué, sans erreur

- [ ] **Step 3: Nettoyer les fichiers de test temporaires**

```bash
Remove-Item -LiteralPath "test-*.ts" -Force -ErrorAction Ignore
Remove-Item -LiteralPath "test-*.html" -Force -ErrorAction Ignore
```

- [ ] **Step 4: Commit final**

```bash
git add -A
git commit -m "chore: final verification and cleanup"
```
