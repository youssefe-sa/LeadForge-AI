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
