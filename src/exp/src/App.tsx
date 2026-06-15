import { useEffect, useRef, useState } from "react";

/* ─── CONSTANTS ─── */
const PHONE = "+33 6 61 83 51 65";
const EMAIL = "sahabyoussef@gmail.com";
const ADDRESS = "99 Rue Saint-Maur, 75011 Paris";
const COMPANY = "Plomberie Daniel Paris 11";

const NAV_ITEMS = [
  { label: "Accueil", href: "#accueil" },
  { label: "Services", href: "#services" },
  { label: "À Propos", href: "#apropos" },
  { label: "Démarches", href: "#demarches" },
  { label: "Galerie", href: "#galerie" },
  { label: "Témoignages", href: "#temoignages" },
  { label: "Contact", href: "#contact" },
];

const TICKER_ITEMS = [
  "✦ Intervention rapide 7j/7",
  "✦ Devis gratuit sans engagement",
  "✦ Plombier certifié Paris 11",
  "✦ Urgence 24h disponible",
  "✦ 15 ans d'expérience",
  "✦ Satisfaction garantie",
  "✦ Travaux soignés & durables",
  "✦ Artisan de confiance",
  "✦ Intervention rapide 7j/7",
  "✦ Devis gratuit sans engagement",
  "✦ Plombier certifié Paris 11",
  "✦ Urgence 24h disponible",
  "✦ 15 ans d'expérience",
  "✦ Satisfaction garantie",
  "✦ Travaux soignés & durables",
  "✦ Artisan de confiance",
];

const SERVICES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-8 h-8">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"/>
        <path d="M12 8v4l3 3"/>
        <path d="M8 12H4M20 12h-4M12 4V2M12 22v-2"/>
      </svg>
    ),
    title: "Dépannage d'Urgence",
    desc: "Fuite, canalisation bouchée, coupure d'eau — nous intervenons en urgence sur Paris 11 et alentours dans les plus brefs délais.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-8 h-8">
        <path d="M3 20h18M5 20V10l7-7 7 7v10"/>
        <path d="M9 20v-5h6v5"/>
        <path d="M9 10h6"/>
      </svg>
    ),
    title: "Installation Sanitaire",
    desc: "Installation complète de salle de bain, douche, WC, lavabo et équipements sanitaires avec finitions impeccables.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-8 h-8">
        <path d="M20 14.66V20a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h5.34"/>
        <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"/>
      </svg>
    ),
    title: "Réparation & Rénovation",
    desc: "Remplacement de robinetterie, réparation de canalisations, rénovation complète de plomberie ancienne.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-8 h-8">
        <path d="M17 8C8 10 5.9 16.17 3.82 19.82a1 1 0 001.71 1.05C7 19 7 19 9 18c2 0 4 2 8 2 4.42 0 7-2.24 7-5.77 0-4.27-4.5-5.54-7-6.23z"/>
      </svg>
    ),
    title: "Détection de Fuites",
    desc: "Diagnostic précis par inspection caméra et détection acoustique pour localiser et réparer les fuites invisibles.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-8 h-8">
        <path d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/>
        <circle cx="12" cy="12" r="1"/>
      </svg>
    ),
    title: "Débouchage Canalisations",
    desc: "Débouchage professionnel par hydrocurage haute pression, furet motorisé pour WC, évier, douche et égouts.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-8 h-8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "Entretien & Maintenance",
    desc: "Contrats d'entretien préventif, vérification annuelle de l'installation, garantie longue durée sur tous nos travaux.",
  },
];

const STEPS = [
  { num: "01", title: "Contact", desc: "Appelez-nous ou envoyez un message. Nous répondons sous 30 minutes." },
  { num: "02", title: "Diagnostic", desc: "Déplacement gratuit, diagnostic précis et évaluation de l'intervention nécessaire." },
  { num: "03", title: "Devis", desc: "Devis détaillé, transparent et sans surprise, soumis pour approbation." },
  { num: "04", title: "Intervention", desc: "Réalisation des travaux dans les règles de l'art, avec matériaux de qualité." },
  { num: "05", title: "Garantie", desc: "Réception des travaux et suivi post-intervention avec garantie écrite." },
];

const STATS = [
  { value: 15, suffix: "+", label: "Ans d'Expérience" },
  { value: 850, suffix: "+", label: "Chantiers Réalisés" },
  { value: 98, suffix: "%", label: "Clients Satisfaits" },
  { value: 30, suffix: "min", label: "Délai d'Intervention" },
];

const TESTIMONIALS = [
  {
    name: "Marie Leclerc",
    role: "Résidente Paris 11",
    text: "Intervention rapide suite à une fuite importante. Daniel est arrivé en moins d'une heure, professionnel, soigné et prix honnête. Je recommande vivement !",
    stars: 5,
    img: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=80&w=80",
  },
  {
    name: "Thomas Girard",
    role: "Propriétaire Paris 11",
    text: "Rénovation complète de salle de bain réalisée avec soin. Travail impeccable, respect des délais et communication excellente tout au long du projet.",
    stars: 5,
    img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=80&w=80",
  },
  {
    name: "Sophie Martin",
    role: "Locataire Paris 12",
    text: "Débouchage urgent réalisé un dimanche. Très professionnel, propre et efficace. Le problème n'est pas revenu. Merci pour la réactivité !",
    stars: 5,
    img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=80&w=80",
  },
];

const GALLERY = [
  {
    url: "https://images.pexels.com/photos/6419128/pexels-photo-6419128.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700",
    label: "Installation tuyauterie",
  },
  {
    url: "https://images.pexels.com/photos/6238612/pexels-photo-6238612.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700",
    label: "Salle de bain rénovée",
  },
  {
    url: "https://images.pexels.com/photos/29226620/pexels-photo-29226620.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700",
    label: "Raccordement radiateur",
  },
  {
    url: "https://images.pexels.com/photos/12196323/pexels-photo-12196323.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700",
    label: "Robinetterie haut de gamme",
  },
  {
    url: "https://images.pexels.com/photos/7227641/pexels-photo-7227641.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700",
    label: "Rénovation salle de bain",
  },
  {
    url: "https://images.pexels.com/photos/7545775/pexels-photo-7545775.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700",
    label: "Pose double vasque",
  },
];

/* ─── HOOKS ─── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function useCountUp(target: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, active]);
  return count;
}

/* ─── COMPONENTS ─── */
function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-[#C8922A]" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const count = useCountUp(value, active);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center reveal">
      <div className="text-5xl font-bold text-[#C8922A] mb-2">
        {count}
        <span className="text-3xl">{suffix}</span>
      </div>
      <div className="text-sm uppercase tracking-widest text-slate-500 font-medium">{label}</div>
    </div>
  );
}

/* ─── NAVBAR ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      {/* Top ticker bar */}
      <div className="bg-[#C8922A] text-white text-xs font-medium overflow-hidden" style={{ height: 34 }}>
        <div className="ticker-track h-full flex items-center gap-12 whitespace-nowrap">
          {TICKER_ITEMS.map((item, i) => (
            <span key={i} className="shrink-0 px-4">{item}</span>
          ))}
        </div>
      </div>

      {/* Main navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0f1630] shadow-xl py-3"
            : "bg-[#0f1630]/95 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#accueil" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#C8922A] flex items-center justify-center rounded">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5">
                <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
              </svg>
            </div>
            <div>
              <div className="text-white font-bold text-base leading-tight">Plomberie Daniel</div>
              <div className="text-[#C8922A] text-[10px] font-semibold uppercase tracking-widest">Paris 11 · Expert</div>
            </div>
          </a>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-7">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="nav-link text-sm">{item.label}</a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href={`tel:${PHONE}`}
            className="hidden lg:flex items-center gap-2 btn-gold px-5 py-2.5 rounded text-sm"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.82a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.13 1 .37 1.97.72 2.9a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.18-1.18a2 2 0 012.11-.45c.93.35 1.9.59 2.9.72A2 2 0 0122 14.92z"/>
            </svg>
            {PHONE}
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-white p-2"
            aria-label="Menu"
          >
            <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}/>
            <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}/>
            <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}/>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-[#0f1630]/97 flex flex-col pt-24 px-8 gap-6">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-white text-xl font-semibold border-b border-white/10 pb-3"
            >
              {item.label}
            </a>
          ))}
          <a
            href={`tel:${PHONE}`}
            className="btn-gold px-6 py-3 rounded text-center mt-4"
          >
            Appeler maintenant
          </a>
        </div>
      )}
    </>
  );
}

/* ─── HERO ─── */
function Hero() {
  return (
    <section id="accueil" className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* BG Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/6419128/pexels-photo-6419128.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600"
          alt="Plombier professionnel Paris"
          className="w-full h-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* Decorative vertical line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#C8922A] opacity-70" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left content */}
        <div>
          <div className="inline-flex items-center gap-2 bg-[#C8922A]/20 border border-[#C8922A]/40 text-[#C8922A] text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded mb-6 animate-fadeInUp">
            <span className="w-2 h-2 rounded-full bg-[#C8922A] animate-pulse"/>
            Artisan Certifié · Paris 11
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-fadeInUp" style={{ animationDelay: "0.15s" }}>
            Expert en Plomberie<br />
            <span className="text-[#C8922A]">Fiable & Réactif</span>
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-lg animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
            Interventions d'urgence, installations sanitaires et rénovations complètes à Paris 11 et ses environs. Disponible 7j/7, devis gratuit et travaux garantis.
          </p>
          <div className="flex flex-wrap gap-4 animate-fadeInUp" style={{ animationDelay: "0.45s" }}>
            <a href={`tel:${PHONE}`} className="btn-gold px-7 py-3.5 rounded text-sm flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.82a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.13 1 .37 1.97.72 2.9a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.18-1.18a2 2 0 012.11-.45c.93.35 1.9.59 2.9.72A2 2 0 0122 14.92z"/>
              </svg>
              Appeler Maintenant
            </a>
            <a href="#contact" className="btn-dark px-7 py-3.5 rounded text-sm border border-white/20">
              Demander un Devis
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-6 mt-10 animate-fadeInUp" style={{ animationDelay: "0.6s" }}>
            {["Devis Gratuit", "Intervention Express", "Garantie Travaux"].map((b) => (
              <div key={b} className="flex items-center gap-2 text-white text-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="#C8922A" strokeWidth="2.5" className="w-4 h-4 shrink-0">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                {b}
              </div>
            ))}
          </div>
        </div>

        {/* Right info card */}
        <div className="hidden lg:block">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 float-badge">
            <div className="text-[#C8922A] text-xs font-bold uppercase tracking-widest mb-4">Horaires & Urgences</div>
            <div className="space-y-4">
              {[
                { label: "Lun – Ven", val: "09h00 – 18h00" },
                { label: "Samedi", val: "09h00 – 16h00" },
                { label: "Urgences", val: "Disponible 24h/24" },
              ].map(({ label, val }) => (
                <div key={label} className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span className="text-slate-300 text-sm">{label}</span>
                  <span className="text-white font-semibold text-sm">{val}</span>
                </div>
              ))}
            </div>
            <a
              href={`tel:${PHONE}`}
              className="mt-6 block text-center btn-gold px-4 py-3 rounded-lg text-sm"
            >
              {PHONE}
            </a>
            <p className="text-center text-slate-400 text-xs mt-3">Appel gratuit · Devis immédiat</p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 text-xs animate-bounce">
        <span>Défiler</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </div>
    </section>
  );
}

/* ─── FEATURES STRIP ─── */
function FeaturesStrip() {
  const features = [
    { icon: "🛡", title: "Artisan Agréé", sub: "Qualibat certifié" },
    { icon: "⚡", title: "Intervention Rapide", sub: "Sous 60 minutes" },
    { icon: "📋", title: "Devis Transparent", sub: "Sans frais cachés" },
    { icon: "🔧", title: "Travaux Garantis", sub: "Garantie décennale" },
  ];
  return (
    <section className="bg-white border-b border-slate-100 py-0">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-slate-100">
          {features.map(({ icon, title, sub }) => (
            <div key={title} className="flex items-center gap-4 px-6 py-6 reveal">
              <span className="text-3xl">{icon}</span>
              <div>
                <div className="font-bold text-[#0f1630] text-sm">{title}</div>
                <div className="text-slate-500 text-xs">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SERVICES ─── */
function Services() {
  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#C8922A] text-xs font-bold uppercase tracking-widest mb-3 reveal">Ce que nous faisons</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f1630] accent-line-center reveal">Nos Prestations</h2>
          <p className="text-slate-500 mt-6 max-w-xl mx-auto text-sm leading-relaxed reveal">
            De la réparation d'urgence à la rénovation complète, nous prenons en charge tous vos besoins en plomberie avec professionnalisme et rigueur.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="bg-white rounded-xl p-8 card-hover border border-slate-100 group reveal"
            >
              <div className="w-14 h-14 bg-slate-50 border border-slate-100 group-hover:bg-[#0f1630] group-hover:border-[#0f1630] rounded-lg flex items-center justify-center text-[#C8922A] mb-5 transition-all duration-300">
                {s.icon}
              </div>
              <h3 className="font-bold text-[#0f1630] text-base mb-2">{s.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              <div className="mt-5 flex items-center gap-1 text-[#C8922A] text-xs font-semibold group-hover:gap-2 transition-all">
                En savoir plus
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── ABOUT ─── */
function About() {
  return (
    <section id="apropos" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Images */}
        <div className="relative reveal-left">
          <div className="grid grid-cols-2 gap-4">
            <div className="img-zoom rounded-xl overflow-hidden h-72">
              <img
                src="https://images.pexels.com/photos/29226620/pexels-photo-29226620.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=500"
                alt="Plombier au travail"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="img-zoom rounded-xl overflow-hidden h-72 mt-10">
              <img
                src="https://images.pexels.com/photos/6474460/pexels-photo-6474460.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=500"
                alt="Technicien professionnel"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          {/* Floating badge */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#C8922A] text-white text-center px-6 py-4 rounded-xl shadow-xl float-badge">
            <div className="text-3xl font-bold">15+</div>
            <div className="text-xs font-semibold uppercase tracking-wide mt-0.5">Ans d'Expérience</div>
          </div>
        </div>

        {/* Text */}
        <div className="reveal-right">
          <p className="text-[#C8922A] text-xs font-bold uppercase tracking-widest mb-3">À propos de nous</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f1630] mb-2 accent-line">
            Artisan de Confiance au Cœur de Paris
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed mt-6 mb-4">
            Plomberie Daniel Paris 11 est une entreprise artisanale fondée sur l'excellence, la réactivité et l'honnêteté. Basés au cœur du 11e arrondissement, nous intervenons sur tout Paris et la petite couronne.
          </p>
          <p className="text-slate-500 text-sm leading-relaxed mb-8">
            Chaque intervention est réalisée avec des matériaux de qualité, dans le respect des normes en vigueur, et avec un souci constant de la satisfaction client. Notre réputation s'est construite sur des années de travail sérieux et de bouche-à-oreille.
          </p>

          <div className="space-y-4 mb-8">
            {[
              "Intervention d'urgence 7j/7, y compris jours fériés",
              "Devis gratuit détaillé, sans engagement",
              "Matériaux certifiés et garantie sur tous les travaux",
              "Respect rigoureux des délais convenus",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm text-slate-600">
                <span className="w-5 h-5 rounded-full bg-[#C8922A]/15 text-[#C8922A] flex items-center justify-center shrink-0 mt-0.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3 h-3">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </span>
                {item}
              </div>
            ))}
          </div>

          <a href="#contact" className="btn-gold px-7 py-3.5 rounded text-sm inline-block">
            Demander un Devis Gratuit
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── WHY US ─── */
function WhyUs() {
  return (
    <section className="bg-[#0f1630] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="reveal-left">
          <p className="text-[#C8922A] text-xs font-bold uppercase tracking-widest mb-3">Pourquoi nous choisir ?</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 accent-line">
            La Différence d'un Vrai Professionnel
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed mt-6 mb-8">
            Nous ne nous contentons pas de réparer — nous conseillons, nous anticipons et nous garantissons. Notre approche artisanale alliée à des équipements modernes nous permet d'offrir un service sans compromis.
          </p>

          <div className="grid grid-cols-2 gap-5">
            {[
              { num: "24h", label: "Service urgence" },
              { num: "100%", label: "Devis honnêtes" },
              { num: "NF", label: "Normes respectées" },
              { num: "0€", label: "Frais de déplacement*" },
            ].map(({ num, label }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors">
                <div className="text-[#C8922A] text-2xl font-bold mb-1">{num}</div>
                <div className="text-slate-300 text-sm">{label}</div>
              </div>
            ))}
          </div>
          <p className="text-slate-600 text-xs mt-3">*Sous conditions, dans Paris intra-muros</p>
        </div>

        <div className="relative reveal-right">
          <div className="img-zoom rounded-2xl overflow-hidden">
            <img
              src="https://images.pexels.com/photos/34938442/pexels-photo-34938442.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800"
              alt="Expert plomberie Paris"
              className="w-full h-80 object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -right-5 bg-[#C8922A] text-white p-6 rounded-xl shadow-2xl">
            <div className="text-4xl font-bold">98%</div>
            <div className="text-xs font-semibold uppercase tracking-wide mt-1">Satisfaction Client</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── STATS ─── */
function Stats() {
  return (
    <section className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 divide-x divide-slate-100">
          {STATS.map((s) => (
            <StatCard key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── DEMARCHES ─── */
function Demarches() {
  return (
    <section id="demarches" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#C8922A] text-xs font-bold uppercase tracking-widest mb-3 reveal">Comment ça marche</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f1630] accent-line-center reveal">
            Nos Démarches en 5 Étapes
          </h2>
          <p className="text-slate-500 mt-6 max-w-xl mx-auto text-sm reveal">
            Un processus clair et transparent du premier contact à la livraison finale, pour une expérience sereine.
          </p>
        </div>

        {/* Steps desktop */}
        <div className="hidden md:grid grid-cols-5 gap-0 relative">
          {/* Connecting line */}
          <div className="absolute top-10 left-[10%] right-[10%] h-px bg-slate-200 z-0" />
          {STEPS.map((step, i) => (
            <div key={step.num} className="relative z-10 flex flex-col items-center text-center px-3 reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="w-20 h-20 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center mb-5 shadow-md group-hover:border-[#C8922A] transition-colors">
                <span className="text-[#C8922A] text-xl font-bold">{step.num}</span>
              </div>
              <h3 className="font-bold text-[#0f1630] text-sm mb-2">{step.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Steps mobile */}
        <div className="md:hidden space-y-5">
          {STEPS.map((step, i) => (
            <div key={step.num} className="flex items-start gap-5 bg-white rounded-xl p-5 shadow-sm reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="w-12 h-12 rounded-full bg-[#C8922A] flex items-center justify-center text-white font-bold shrink-0">
                {step.num}
              </div>
              <div>
                <h3 className="font-bold text-[#0f1630] text-sm mb-1">{step.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14 reveal">
          <a href="#contact" className="btn-gold px-8 py-3.5 rounded text-sm inline-block">
            Démarrer une Demande
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── GALLERY ─── */
function Gallery() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <section id="galerie" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#C8922A] text-xs font-bold uppercase tracking-widest mb-3 reveal">Nos Réalisations</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f1630] accent-line-center reveal">Galerie de Projets</h2>
          <p className="text-slate-500 mt-6 max-w-xl mx-auto text-sm reveal">
            Découvrez quelques-unes de nos réalisations récentes — chaque projet reflète notre engagement pour la qualité et le soin du détail.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 stagger">
          {GALLERY.map((img, i) => (
            <div
              key={i}
              className="img-zoom rounded-xl overflow-hidden cursor-pointer relative group reveal"
              style={{ transitionDelay: `${i * 0.08}s` }}
              onClick={() => setActive(img.url)}
            >
              <img
                src={img.url}
                alt={img.label}
                className="w-full h-56 object-cover"
              />
              <div className="absolute inset-0 bg-[#0f1630]/0 group-hover:bg-[#0f1630]/50 transition-all duration-300 flex items-center justify-center">
                <span className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#C8922A] px-4 py-2 rounded">
                  {img.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          <img src={active} alt="Galerie" className="max-w-4xl w-full max-h-[85vh] object-contain rounded-xl" />
          <button
            className="absolute top-6 right-6 text-white bg-white/20 hover:bg-white/40 w-10 h-10 rounded-full flex items-center justify-center"
            onClick={() => setActive(null)}
          >
            ✕
          </button>
        </div>
      )}
    </section>
  );
}

/* ─── TESTIMONIALS ─── */
function Testimonials() {
  return (
    <section id="temoignages" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#C8922A] text-xs font-bold uppercase tracking-widest mb-3 reveal">Avis Clients</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f1630] accent-line-center reveal">Ce que disent nos clients</h2>
          <p className="text-slate-500 mt-6 max-w-xl mx-auto text-sm reveal">
            La satisfaction de nos clients est notre meilleure carte de visite. Voici ce qu'ils disent de notre travail.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 stagger">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className="bg-white rounded-xl p-7 shadow-sm border border-slate-100 card-hover reveal"
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <StarRating count={t.stars} />
              <p className="text-slate-600 text-sm leading-relaxed mt-4 mb-6 italic">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <img src={t.img} alt={t.name} className="w-11 h-11 rounded-full object-cover" />
                <div>
                  <div className="font-bold text-[#0f1630] text-sm">{t.name}</div>
                  <div className="text-slate-400 text-xs">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google rating badge */}
        <div className="flex justify-center mt-12 reveal">
          <div className="inline-flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-6 py-3 shadow-sm">
            <div className="text-3xl">⭐</div>
            <div>
              <div className="font-bold text-[#0f1630] text-sm">4.9/5 sur Google</div>
              <div className="text-slate-400 text-xs">Basé sur 120+ avis vérifiés</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT ─── */
function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "", type: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", phone: "", email: "", message: "", type: "" });
  }

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#C8922A] text-xs font-bold uppercase tracking-widest mb-3 reveal">Nous contacter</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f1630] accent-line-center reveal">Demandez votre Devis Gratuit</h2>
          <p className="text-slate-500 mt-6 max-w-xl mx-auto text-sm reveal">
            Remplissez le formulaire ci-dessous ou appelez-nous directement. Nous vous répondons sous 30 minutes.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Info */}
          <div className="lg:col-span-2 space-y-6 reveal-left">
            {/* Hours */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
              <h3 className="font-bold text-[#0f1630] text-sm mb-4 flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="#C8922A" strokeWidth="2" className="w-4 h-4">
                  <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                </svg>
                Horaires d'Ouverture
              </h3>
              {[
                { j: "Lundi – Vendredi", h: "09h00 – 18h00" },
                { j: "Samedi", h: "09h00 – 16h00" },
                { j: "Dimanche", h: "Urgences uniquement" },
              ].map(({ j, h }) => (
                <div key={j} className="flex justify-between py-2 border-b border-slate-200 last:border-0 text-sm">
                  <span className="text-slate-600">{j}</span>
                  <span className="font-semibold text-[#0f1630]">{h}</span>
                </div>
              ))}
            </div>

            {/* Contact info */}
            <div className="bg-[#0f1630] rounded-xl p-6 space-y-4">
              {[
                {
                  icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.82a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.13 1 .37 1.97.72 2.9a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.18-1.18a2 2 0 012.11-.45c.93.35 1.9.59 2.9.72A2 2 0 0122 14.92z"/></svg>,
                  label: "Téléphone",
                  val: PHONE,
                  href: `tel:${PHONE}`,
                },
                {
                  icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
                  label: "Email",
                  val: EMAIL,
                  href: `mailto:${EMAIL}`,
                },
                {
                  icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
                  label: "Adresse",
                  val: ADDRESS,
                  href: `https://maps.google.com/?q=${encodeURIComponent(ADDRESS)}`,
                },
              ].map(({ icon, label, val, href }) => (
                <a key={label} href={href} className="flex items-start gap-3 group">
                  <span className="text-[#C8922A] mt-0.5">{icon}</span>
                  <div>
                    <div className="text-slate-400 text-xs mb-0.5">{label}</div>
                    <div className="text-white text-sm font-medium group-hover:text-[#C8922A] transition-colors">{val}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 reveal-right">
            <form onSubmit={handleSubmit} className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
              {sent && (
                <div className="mb-6 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-lg flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  Message envoyé ! Nous vous répondrons dans les plus brefs délais.
                </div>
              )}
              <div className="grid md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Nom complet *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-[#C8922A] focus:ring-1 focus:ring-[#C8922A] transition-all"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Téléphone *</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-[#C8922A] focus:ring-1 focus:ring-[#C8922A] transition-all"
                    placeholder="06 XX XX XX XX"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-[#C8922A] focus:ring-1 focus:ring-[#C8922A] transition-all"
                    placeholder="votre@email.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Type d'intervention</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-[#C8922A] focus:ring-1 focus:ring-[#C8922A] transition-all text-slate-600"
                  >
                    <option value="">-- Sélectionner --</option>
                    <option>Dépannage urgent</option>
                    <option>Détection de fuite</option>
                    <option>Installation sanitaire</option>
                    <option>Débouchage</option>
                    <option>Rénovation complète</option>
                    <option>Autre</option>
                  </select>
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Décrivez votre besoin *</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-[#C8922A] focus:ring-1 focus:ring-[#C8922A] transition-all resize-none"
                  placeholder="Décrivez le problème ou les travaux souhaités..."
                />
              </div>
              <button type="submit" className="w-full btn-gold py-3.5 rounded-lg text-sm">
                Envoyer ma Demande →
              </button>
              <p className="text-center text-slate-400 text-xs mt-3">
                Réponse garantie sous 30 minutes · Devis gratuit & sans engagement
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── MAP SECTION ─── */
function MapSection() {
  return (
    <section className="bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 reveal">
          <iframe
            title="Localisation Plomberie Daniel Paris 11"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9923684087395!2d2.3757!3d48.8619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e671d4a31d9a89%3A0x1b4a92c9c0b98e2d!2s99%20Rue%20Saint-Maur%2C%2075011%20Paris%2C%20France!5e0!3m2!1sfr!2sfr!4v1699000000000!5m2!1sfr!2sfr"
            width="100%"
            height="320"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="bg-[#0a0f25] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-[#C8922A] flex items-center justify-center rounded">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5">
                <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
              </svg>
            </div>
            <div>
              <div className="font-bold text-sm">Plomberie Daniel</div>
              <div className="text-[#C8922A] text-[10px] uppercase tracking-widest">Paris 11 · Expert</div>
            </div>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed mb-5">
            Artisan plombier certifié basé à Paris 11. Interventions rapides, devis gratuits et travaux garantis sur tout Paris.
          </p>
          <div className="text-xs text-slate-500">
            SIRET : 000 000 000 00000<br/>
            Qualibat certifié RGE
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#C8922A] mb-4">Nos Services</h4>
          <ul className="space-y-2">
            {["Dépannage Urgence", "Installation Sanitaire", "Réparation & Rénovation", "Détection de Fuites", "Débouchage", "Entretien & Maintenance"].map((s) => (
              <li key={s}>
                <a href="#services" className="text-slate-400 text-xs hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#C8922A]"/>
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#C8922A] mb-4">Navigation</h4>
          <ul className="space-y-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="text-slate-400 text-xs hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#C8922A]"/>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#C8922A] mb-4">Contact Rapide</h4>
          <div className="space-y-3">
            <a href={`tel:${PHONE}`} className="flex items-center gap-2 text-slate-400 hover:text-white text-xs transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="#C8922A" strokeWidth="2" className="w-3.5 h-3.5 shrink-0">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.82a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.13 1 .37 1.97.72 2.9a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.18-1.18a2 2 0 012.11-.45c.93.35 1.9.59 2.9.72A2 2 0 0122 14.92z"/>
              </svg>
              {PHONE}
            </a>
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 text-slate-400 hover:text-white text-xs transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="#C8922A" strokeWidth="2" className="w-3.5 h-3.5 shrink-0">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              {EMAIL}
            </a>
            <div className="flex items-start gap-2 text-slate-400 text-xs">
              <svg viewBox="0 0 24 24" fill="none" stroke="#C8922A" strokeWidth="2" className="w-3.5 h-3.5 shrink-0 mt-0.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              {ADDRESS}
            </div>
          </div>

          <div className="mt-6">
            <a href={`tel:${PHONE}`} className="block text-center btn-gold px-4 py-2.5 rounded text-xs">
              Appel Urgent 24h/24
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 py-5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} {COMPANY}. Tous droits réservés.
          </p>
          <div className="flex gap-5 text-xs text-slate-600">
            <button className="hover:text-white transition-colors">Mentions Légales</button>
            <button className="hover:text-white transition-colors">Politique de Confidentialité</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── FLOATING CTA ─── */
function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <a
      href={`tel:${PHONE}`}
      className={`fixed bottom-6 right-6 z-50 btn-gold px-5 py-3.5 rounded-full shadow-2xl text-sm flex items-center gap-2 transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      }`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.82a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.13 1 .37 1.97.72 2.9a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.18-1.18a2 2 0 012.11-.45c.93.35 1.9.59 2.9.72A2 2 0 0122 14.92z"/>
      </svg>
      Appel Urgent
    </a>
  );
}

/* ─── APP ─── */
export default function App() {
  useReveal();
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturesStrip />
      <Services />
      <About />
      <WhyUs />
      <Stats />
      <Demarches />
      <Gallery />
      <Testimonials />
      <Contact />
      <MapSection />
      <Footer />
      <FloatingCTA />
    </div>
  );
}
