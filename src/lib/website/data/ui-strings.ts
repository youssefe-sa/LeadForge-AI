import { UiStrings } from '../types';

const UI_DATA: Record<string, UiStrings> = {
  fr: {
    lang: 'fr', hreflang: 'fr',
    navAbout: 'À propos', navServices: 'Services', navWhy: 'Pourquoi nous', navAvis: 'Avis', navContact: 'Contact',
    heroCall: 'Appeler Maintenant', heroNote: 'Réponse rapide · Sans engagement',
    svcTitle: 'Nos Services', svcDesc: 'Des prestations pensées pour répondre à vos besoins avec soin et expertise.',
    aboutTitle: 'Notre Établissement',
    whyLabel: 'Pourquoi nous choisir ?',
    testTitle: 'Ce que disent nos clients', testDesc: 'La satisfaction de nos clients est notre meilleure carte de visite.', testGoogle: 'sur Google', testBasé: 'Basé sur', testAvis: 'avis vérifiés',
    contactTitle: 'Prenez Contact avec Nous', contactDesc: 'Envoyez-nous un message ou appelez-nous. Nous répondons rapidement.',
    formName: 'Nom complet *', formPhone: 'Téléphone *', formEmail: 'Email', formMsg: 'Décrivez votre besoin *', formSubmit: 'Envoyer ma Demande →',
    footerNav: 'Navigation', footerContact: 'Contact', footerPrivacy: 'Politique de confidentialité',
    hoursTitle: "Horaires d'Ouverture", hoursLunVen: 'Lundi – Vendredi', hoursSam: 'Samedi', hoursDim: 'Dimanche',
    contactCall: 'Nous Appeler', whatsapp: 'WhatsApp',
    privacyTitle: 'Politique de Confidentialité',
  },
  en: {
    lang: 'en', hreflang: 'en',
    navAbout: 'About', navServices: 'Services', navWhy: 'Why Us', navAvis: 'Reviews', navContact: 'Contact',
    heroCall: 'Call Now', heroNote: 'Quick response · No commitment',
    svcTitle: 'Our Services', svcDesc: 'Services designed to meet your needs with care and expertise.',
    aboutTitle: 'Our Business',
    whyLabel: 'Why Choose Us?',
    testTitle: 'What Our Clients Say', testDesc: 'Client satisfaction is our best recommendation.', testGoogle: 'on Google', testBasé: 'Based on', testAvis: 'verified reviews',
    contactTitle: 'Contact Us', contactDesc: 'Send us a message or give us a call. We respond quickly.',
    formName: 'Full Name *', formPhone: 'Phone *', formEmail: 'Email', formMsg: 'Describe your need *', formSubmit: 'Send Request →',
    footerNav: 'Navigation', footerContact: 'Contact', footerPrivacy: 'Privacy Policy',
    hoursTitle: 'Opening Hours', hoursLunVen: 'Monday – Friday', hoursSam: 'Saturday', hoursDim: 'Sunday',
    contactCall: 'Call Us', whatsapp: 'WhatsApp',
    privacyTitle: 'Privacy Policy',
  }
};

export function getUiStrings(lang: 'fr' | 'en'): UiStrings {
  return UI_DATA[lang] || UI_DATA.fr;
}
