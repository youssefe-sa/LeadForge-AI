import { Lead } from '../supabase-store';

export interface WebsiteContent {
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  aboutTitle: string;
  services: Array<{ name: string; description: string; features: string[] }>;
  servicesTitle: string;
  whyChooseUs: string[];
  testimonials: Array<{ author: string; text: string; rating: number; date?: string }>;
  ctaText: string;
  ctaSubtext?: string;
  metaDescription: string;
  galleryTitle?: string;
  processSteps?: Array<{ title: string; desc: string }>;
}

export interface WebsiteImages {
  hero: string;
  gallery: string[];
  services: string[];
  logo?: string;
  logoInitials?: string;
  logoWord1?: string;
  logoWord2?: string;
}

export interface Palette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  "on-primary": string;
  "on-accent": string;
}

export interface LayoutModule {
  id: string;
  name: string;
  render(lead: Lead, content: WebsiteContent, images: WebsiteImages, palette: Palette): string;
}

export interface UiStrings {
  lang: string; hreflang: string;
  navAbout: string; navServices: string; navWhy: string; navAvis: string; navContact: string;
  heroCall: string; heroNote: string;
  svcTitle: string; svcDesc: string;
  aboutTitle: string;
  whyLabel: string;
  testTitle: string; testDesc: string; testGoogle: string; testBasé: string; testAvis: string;
  contactTitle: string; contactDesc: string;
  formName: string; formPhone: string; formEmail: string; formMsg: string; formSubmit: string;
  footerNav: string; footerContact: string; footerPrivacy: string;
  hoursTitle: string; hoursLunVen: string; hoursSam: string; hoursDim: string;
  contactCall: string; whatsapp: string;
  privacyTitle: string;
}


