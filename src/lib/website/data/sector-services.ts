export const SECTOR_SERVICES: Record<string, Array<{ name: string; description: string; features: string[] }>> = {
  plomberie: [
    { name: 'Dépannage 24h/24', description: "Intervention d'urgence sur toutes fuites et pannes", features: ['Disponible 7j/7', 'Arrivée sous 1h30', 'Sans surprise tarifaire'] },
    { name: 'Installation Sanitaire', description: 'Pose et remplacement de vos appareils', features: ['Robinetterie', 'Éviers', 'WC', 'Douches'] },
    { name: 'Chauffage & Chaudière', description: 'Installation et réparation chauffage', features: ['Chaudières gaz/fioul', 'Pompes à chaleur', 'Détartrage'] },
    { name: 'Détection de Fuites', description: 'Localisation précise sans casse', features: ['Caméra thermique', 'Gaz traceur', 'Colmatage immédiat'] },
    { name: 'Rénovation Salle de Bain', description: 'Création et rénovation complète', features: ['Devis gratuit', 'Aide au choix', 'Clé en main'] },
    { name: 'Entretien Annuel', description: 'Maintenance préventive', features: ['Contrôle chauffage', 'Détartrage', 'Mise aux normes'] }
  ],
  electricien: [
    { name: 'Mise aux Normes', description: 'Remise à neuf de votre installation électrique', features: ['Norme NFC 15-100', 'Tableau électrique neuf', 'Mise à la terre'] },
    { name: 'Dépannage Électrique', description: 'Pannes, court-circuits, disjonctions', features: ['Intervention rapide', 'Diagnostic complet', 'Réparation durable'] },
    { name: 'Installation Complète', description: 'Construction ou rénovation électrique', features: ['Câblage complet', 'Points de lumière', 'Prises et inters'] },
    { name: 'Domotique & Smart Home', description: 'Maison connectée et automatisée', features: ['Volets roulants', 'Éclairage auto', 'Thermostats'] },
    { name: 'Éclairage LED', description: 'Solutions éclairage économiques', features: ['Spots encastrés', 'Suspensions design', 'Éclairage extérieur'] },
    { name: 'Bornes de Recharge', description: 'Installation bornes véhicule électrique', features: ['Wallbox particulier', 'Borne entreprise', 'Certification IRVE'] }
  ],
  coiffeur: [
    { name: 'Coupes & Styles', description: 'Coupe sur-mesure femme et homme', features: ['Visagisme personnalisé', 'Techniques actuelles', 'Conseil entretien'] },
    { name: 'Barbier Traditionnel', description: 'Rasage et soins barbe', features: ["Rasage à l'ancienne", 'Taille précise', 'Soins barbe'] },
    { name: 'Coloration Expert', description: 'Balayages, ombrés et couleurs', features: ['Coloration végétale', 'Mèches sur mesure', 'Glitter color'] },
    { name: 'Soins Capillaires', description: 'Traitements réparateurs', features: ['Botox capillaire', 'Kératine', 'Massage crânien'] },
    { name: 'Extensions Volume', description: 'Rajouts longueur et épaisseur', features: ['Pose à froid', 'Tape-in', 'Entretien inclus'] },
    { name: 'Chignons & Événements', description: 'Coiffures de cérémonie', features: ['Mariage', 'Sofreh aghd', 'Maquillage combo'] }
  ],
  restaurant: [
    { name: 'Cuisine Maison', description: 'Plats préparés sur place avec des ingrédients frais', features: ['Produits locaux', 'Recettes authentiques', 'Fait minute'] },
    { name: 'Menu du Jour', description: 'Formule déjeuner économique et rapide', features: ['Entrée + Plat + Dessert', 'Produits frais', 'Cuisson minute'] },
    { name: 'Spécialités', description: 'Nos plats signature et créations du chef', features: ['Recettes du terroir', 'Grillades', 'Poissons frais'] },
    { name: 'Événements & Groupes', description: 'Organisation de repas pour toutes occasions', features: ['Menu groupe', 'Salle privative', 'Sur mesure'] },
    { name: 'Service Traiteur', description: 'Livraison et plats à emporter', features: ['Plateaux repas', 'Buffets', 'Livraison pro'] },
    { name: 'Boissons & Vins', description: 'Carte des vins et cocktails maison', features: ['Vins régionaux', 'Cocktails maison', 'Bières artisanales'] }
  ],
  garage: [
    { name: 'Mécanique Générale', description: 'Entretien et réparation toutes marques', features: ['Révisions constructeur', 'Courroies', 'Freins'] },
    { name: 'Diagnostic Auto', description: 'Analyse électronique complète', features: ['Valise multimarque', 'Effacement défauts', 'Paramétrage'] },
    { name: 'Pneumatiques', description: 'Montage, équilibrage, géométrie', features: ['Pneus toutes saisons', 'Pneus run-flat', 'Parallélisme'] },
    { name: 'Climatisation', description: 'Recharge et réparation climatisation', features: ['Recharge gaz', 'Détection fuites', 'Filtre habitacle'] },
    { name: 'Carrosserie', description: 'Réparation et peinture sur tous véhicules', features: ['Débosselage', 'Peinture à la nuance', 'Polissage optique'] },
    { name: 'Contrôle Technique', description: 'Préparation et contre-visite', features: ['Pré-contrôle', 'Réparations conformité', 'Accompagnement'] }
  ],
  nettoyage: [
    { name: 'Nettoyage de Bureaux', description: 'Entretien quotidien de vos locaux professionnels', features: ['Poussière, sols, vitres', 'Produits écolabels', 'Horaires flexibles'] },
    { name: 'Nettoyage Vitres', description: 'Vitres intérieures et extérieures sans traces', features: ['Accès difficile', 'Sans traces garanti', 'Bâtiments R+10'] },
    { name: 'Grand Nettoyage', description: 'Nettoyage en profondeur résidentiel', features: ['Cuisine dégraissée', 'Salle de bain désinfectée', 'Sol ciré'] },
    { name: 'Désinfection', description: 'Traitement anti-bactérien et virucide', features: ['Certifié COVID', 'Produits bio', 'Rapport de traitement'] },
    { name: 'Nettoyage Industriel', description: 'Entrepôts, usines, ateliers', features: ['Monobrosse industrielle', 'Aspirateur eau/poussière', 'Horaires de nuit'] },
    { name: 'Remise en État', description: 'Après travaux ou déménagement', features: ['Évacuation gravats', 'Nettoyage fin', 'Livraison clé en main'] }
  ],
  jardin: [
    { name: 'Création de Jardins', description: 'Aménagement paysager complet sur mesure', features: ['Plan sur mesure', 'Plantations adaptées', 'Gazon en rouleaux'] },
    { name: 'Tonte & Entretien', description: 'Pelouse et massifs entretenus régulièrement', features: ['Tonte régulière', 'Taille haies', 'Désherbage manuel'] },
    { name: 'Élagage & Abattage', description: 'Arbres et arbustes sécurisés', features: ['Élagage raisonné', 'Grimper pro', 'Broyage branches'] },
    { name: 'Terrasses & Clôtures', description: 'Aménagement structure bois', features: ['Terrasse pin/ipé', 'Clôture occultation', 'Pergolas'] },
    { name: 'Arrosage Automatique', description: 'Installation système arrosage connecté', features: ['Goutte à goutte', 'Tuyères enterrées', 'Programmateur connecté'] },
    { name: 'Potager & Verger', description: 'Création et entretien potager', features: ['Bacs surélevés', 'Compostage', 'Taille fruitiers'] }
  ],
  fitness: [
    { name: 'Coaching Personnel', description: 'Accompagnement individuel sur mesure', features: ['Bilan morpho', 'Programme adapté', 'Suivi hebdo'] },
    { name: 'Cours Collectifs', description: 'Groupes dynamiques et motivants', features: ['HIIT', 'Yoga', 'Zumba', 'Musculation guidée'] },
    { name: 'Musculation Libre', description: 'Espace haltères et machines guidées', features: ['Poids libres', 'Machines guidées', 'Cage à squat'] },
    { name: 'Cardio Zone', description: 'Équipements endurance modernes connectés', features: ['Tapis connectés', 'Vélos elliptiques', 'Rameurs'] },
    { name: 'Préparation Physique', description: 'Prépa compétition ou remise en forme', features: ['Tests perf', 'Plan nutrition', 'Récupération'] },
    { name: 'Espace Bien-être', description: 'Détente après effort', features: ['Sauna', 'Douche jets', 'Casiers sécurisés'] }
  ],
  medical: [
    { name: 'Médecine Générale', description: 'Consultations et suivi de santé', features: ['Bilan annuel', 'Vaccinations', 'Certificats'] },
    { name: 'Kinésithérapie', description: 'Rééducation et réadaptation fonctionnelle', features: ['Massages médicaux', 'Rééducation post-op', 'Posturologie'] },
    { name: 'Ostéopathie', description: 'Soins sans médicaments pour tous', features: ['Bébés', 'Femmes enceintes', 'Sportifs'] },
    { name: 'Infirmier à Domicile', description: 'Soins à votre domicile', features: ['Injections', 'Pansements', 'Prélèvements'] },
    { name: 'Analyses Biologiques', description: 'Laboratoire sur place', features: ['Prise de sang', 'Tests rapides', 'Résultats 24h'] },
    { name: 'Télémédecine', description: 'Consultation vidéo 7j/7', features: ['Ordonnance électronique', 'Disponible 7j/7', 'Sans déplacement'] }
  ],
  avocat: [
    { name: 'Droit Civil & Famille', description: 'Divorce, succession, bail', features: ['Divorce amiable/contentieux', 'Régime matrimonial', 'Garde alternée'] },
    { name: 'Droit Pénal', description: 'Défense et assistance aux victimes', features: ['Garde à vue', 'Tribunal correctionnel', 'Victimes préjudice'] },
    { name: 'Droit du Travail', description: 'Licenciement et contentieux prud\'homal', features: ['Rupture conventionnelle', 'Harcèlement', "Prud'hommes"] },
    { name: 'Droit des Affaires', description: 'Conseil entreprises et particuliers', features: ['Création société', 'Contrats commerciaux', 'Recouvrement'] },
    { name: 'Immobilier', description: 'Vente, achat, litiges immobiliers', features: ['Promesse vente', 'Copropriété', 'Malfaisance construction'] },
    { name: 'Droit Routier', description: 'Permis, accidents, infractions', features: ['Retrait permis', 'Excès vitesse', 'Défense pénale'] }
  ],
  default: [
    { name: 'Prestation Sur Mesure', description: 'Services adaptés à vos besoins', features: ['Étude personnalisée', 'Devis détaillé', 'Écoute attentive'] },
    { name: 'Service Professionnel', description: 'Un travail soigné et de qualité', features: ['Matériel adapté', 'Techniques actuelles', 'Respect des normes'] },
    { name: 'Conseil & Accompagnement', description: 'Un accompagnement de A à Z', features: ['Diagnostic complet', 'Solutions pertinentes', 'Suivi personnalisé'] },
    { name: 'Réactivité', description: 'Un service à votre rythme', features: ['Réponse rapide', 'Horaires flexibles', 'Prise en charge efficace'] },
    { name: 'Qualité Garantie', description: 'Un engagement sur le résultat', features: ['Contrôle qualité', 'Corrections incluses', 'SAV réactif'] },
    { name: 'Tarifs Clairs', description: 'Des honoraires transparents', features: ['Devis préalable', 'Pas de surprise', 'Facilités de paiement'] }
  ]
};

export function getSectorServices(sector: string) {
  const s = (sector || '').toLowerCase();
  for (const [key, services] of Object.entries(SECTOR_SERVICES)) {
    if (s.includes(key)) return services;
  }
  return SECTOR_SERVICES.default;
}
