const PROCESS_STEPS_FR: Record<string, Array<{ title: string; desc: string }>> = {
  restaurant: [
    { title: 'Réservation', desc: 'Réservez votre table en ligne ou par téléphone.' },
    { title: 'Accueil', desc: 'Un cadre chaleureux et un service attentionné vous attendent.' },
    { title: 'Dégustation', desc: 'Savourez nos plats préparés avec des produits frais et de saison.' },
    { title: 'Service', desc: 'Notre équipe veille à votre confort tout au long du repas.' },
    { title: 'Satisfait', desc: 'Un moment culinaire dont vous aurez envie de revenir.' }
  ],
  coiffeur: [
    { title: 'RDV', desc: 'Prenez rendez-vous en ligne quand ça vous convient.' },
    { title: 'Consultation', desc: 'Un diagnostic capillaire personnalisé et des conseils sur-mesure.' },
    { title: 'Coiffage', desc: 'Laissez faire notre expertise pour un résultat à votre image.' },
    { title: 'Conseils', desc: 'Des recommandations pour entretenir votre style au quotidien.' },
    { title: 'Résultat', desc: 'Un look qui vous ressemble, pour briller à chaque occasion.' }
  ],
  garage: [
    { title: 'RDV', desc: 'Planifiez votre passage selon votre emploi du temps.' },
    { title: 'Diagnostic', desc: 'Un contrôle complet de votre véhicule avec équipement moderne.' },
    { title: 'Devis', desc: 'Une estimation claire et détaillée avant toute intervention.' },
    { title: 'Réparation', desc: 'Un travail soigné par des techniciens qualifiés et certifiés.' },
    { title: 'Livraison', desc: 'Votre véhicule vous est restitué impeccable, prêt à rouler.' }
  ],
  avocat: [
    { title: 'Contact', desc: "Exposez-nous votre situation lors d'un premier échange." },
    { title: 'Consultation', desc: 'Une analyse approfondie de votre dossier et de vos options.' },
    { title: 'Stratégie', desc: 'Une ligne de conduite claire, adaptée à vos objectifs.' },
    { title: 'Action', desc: 'Nous défendons vos intérêts avec rigueur et détermination.' },
    { title: 'Suivi', desc: "Un accompagnement continu jusqu'à la résolution de votre dossier." }
  ],
  medical: [
    { title: 'RDV', desc: 'Prenez rendez-vous en quelques clics.' },
    { title: 'Consultation', desc: 'Un examen attentif et un diagnostic personnalisé.' },
    { title: 'Traitement', desc: 'Un plan de soins adapté à votre situation.' },
    { title: 'Suivi', desc: 'Un accompagnement régulier pour votre bien-être.' },
    { title: 'Résultat', desc: 'Retrouvez une meilleure qualité de vie.' }
  ],
  fitness: [
    { title: 'Bilan', desc: 'Un assessment complet de votre condition physique.' },
    { title: 'Programme', desc: "Un plan d'entraînement sur mesure adapté à vos objectifs." },
    { title: 'Entraînement', desc: 'Des séances encadrées par nos coaches diplômés.' },
    { title: 'Suivi', desc: 'Un suivi régulier pour mesurer vos progrès.' },
    { title: 'Objectif', desc: 'Atteignez vos objectifs et dépassez vos limites.' }
  ],
  nettoyage: [
    { title: 'Devis', desc: 'Un chiffrage précis adapté à vos besoins.' },
    { title: 'Planification', desc: "Un planning flexible qui s'adapte à vos contraintes." },
    { title: 'Intervention', desc: 'Nos équipes formées interviennent avec rigueur.' },
    { title: 'Contrôle', desc: 'Un contrôle qualité systématique après chaque passage.' },
    { title: 'Régulier', desc: 'Un entretien maintenu pour des espaces toujours impeccables.' }
  ],
  jardin: [
    { title: 'Visite', desc: 'Un rendez-vous sur site pour analyser votre espace.' },
    { title: 'Conception', desc: 'Un projet paysager personnalisé avec plans et visualisation.' },
    { title: 'Réalisation', desc: 'La mise en œuvre par notre équipe de jardiniers qualifiés.' },
    { title: 'Entretien', desc: 'Un suivi saisonnier pour maintenir la beauté de votre jardin.' },
    { title: 'Évolution', desc: 'Des ajustements au fil des saisons et de vos envies.' }
  ],
  default: [
    { title: 'Contact', desc: 'Échangez avec nous pour nous exposer votre besoin.' },
    { title: 'Analyse', desc: 'Nous étudions votre demande et identifions la meilleure solution.' },
    { title: 'Proposition', desc: 'Recevez une offre claire, adaptée à votre budget et vos attentes.' },
    { title: 'Réalisation', desc: 'Notre équipe intervient avec soin et professionnalisme.' },
    { title: 'Suivi', desc: 'Nous assurons un suivi qualité pour votre entière satisfaction.' }
  ]
};

const PROCESS_STEPS_EN: Record<string, Array<{ title: string; desc: string }>> = {
  restaurant: [
    { title: 'Reservation', desc: 'Book your table online or by phone.' },
    { title: 'Welcome', desc: 'A warm setting and attentive service await you.' },
    { title: 'Dining', desc: 'Savor our dishes prepared with fresh, seasonal ingredients.' },
    { title: 'Service', desc: 'Our team ensures your comfort throughout your meal.' },
    { title: 'Satisfaction', desc: "A culinary experience you'll want to return to." }
  ],
  coiffeur: [
    { title: 'Booking', desc: 'Schedule your appointment online at your convenience.' },
    { title: 'Consultation', desc: 'A personalized hair diagnosis and tailored advice.' },
    { title: 'Styling', desc: 'Let our expertise create a look that suits you.' },
    { title: 'Advice', desc: 'Recommendations to maintain your style every day.' },
    { title: 'Result', desc: "A look that's uniquely yours, for every occasion." }
  ],
  garage: [
    { title: 'Booking', desc: 'Schedule your visit around your timetable.' },
    { title: 'Diagnosis', desc: 'A complete vehicle check with modern equipment.' },
    { title: 'Quote', desc: 'A clear, detailed estimate before any work.' },
    { title: 'Repair', desc: 'Quality work by qualified, certified technicians.' },
    { title: 'Delivery', desc: 'Your vehicle returned spotless, ready to drive.' }
  ],
  avocat: [
    { title: 'Contact', desc: 'Tell us about your situation in an initial exchange.' },
    { title: 'Consultation', desc: 'A thorough analysis of your case and options.' },
    { title: 'Strategy', desc: 'A clear course of action, tailored to your goals.' },
    { title: 'Action', desc: 'We defend your interests with rigor and determination.' },
    { title: 'Follow-up', desc: 'Ongoing support until your case is resolved.' }
  ],
  medical: [
    { title: 'Appointment', desc: 'Book your visit in just a few clicks.' },
    { title: 'Consultation', desc: 'A careful examination and personalized diagnosis.' },
    { title: 'Treatment', desc: 'A care plan tailored to your situation.' },
    { title: 'Follow-up', desc: 'Regular monitoring for your well-being.' },
    { title: 'Results', desc: 'Rediscover a better quality of life.' }
  ],
  fitness: [
    { title: 'Assessment', desc: 'A complete fitness evaluation.' },
    { title: 'Program', desc: 'A personalized training plan for your goals.' },
    { title: 'Training', desc: 'Sessions led by our certified coaches.' },
    { title: 'Tracking', desc: 'Regular follow-up to measure your progress.' },
    { title: 'Goals', desc: 'Reach your goals and push your limits.' }
  ],
  nettoyage: [
    { title: 'Quote', desc: 'An accurate estimate tailored to your needs.' },
    { title: 'Planning', desc: 'A flexible schedule that fits your constraints.' },
    { title: 'Service', desc: 'Our trained teams work with precision.' },
    { title: 'Quality Check', desc: 'Systematic quality control after every visit.' },
    { title: 'Maintenance', desc: 'Ongoing upkeep for consistently pristine spaces.' }
  ],
  jardin: [
    { title: 'Visit', desc: 'An on-site meeting to assess your space.' },
    { title: 'Design', desc: 'A customized landscape project with plans and visuals.' },
    { title: 'Creation', desc: "Implementation by our team of qualified gardeners." },
    { title: 'Maintenance', desc: "Seasonal upkeep to preserve your garden's beauty." },
    { title: 'Evolution', desc: "Adjustments through the seasons and your preferences." }
  ],
  default: [
    { title: 'Contact', desc: 'Reach out to share your needs with us.' },
    { title: 'Analysis', desc: 'We study your request and identify the best solution.' },
    { title: 'Proposal', desc: 'Receive a clear offer, tailored to your budget.' },
    { title: 'Delivery', desc: 'Our team works with care and professionalism.' },
    { title: 'Follow-up', desc: 'We ensure quality follow-up for your satisfaction.' }
  ]
};

function findSteps(steps: Record<string, Array<{ title: string; desc: string }>>, sector: string) {
  const s = (sector || '').toLowerCase();
  const keys = ['restaurant', 'coiffeur', 'garage', 'avocat', 'medical', 'fitness', 'nettoyage', 'jardin'];
  for (const key of keys) {
    if (s.includes(key)) return steps[key];
  }
  return steps.default;
}

export function getProcessSteps(sector: string, lang: 'fr' | 'en' = 'fr'): Array<{ title: string; desc: string }> {
  if (lang === 'en') return findSteps(PROCESS_STEPS_EN, sector);
  return findSteps(PROCESS_STEPS_FR, sector);
}
