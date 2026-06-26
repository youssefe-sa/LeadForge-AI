const SECTOR_FALLBACK_REVIEWS: Record<string, Array<{ author: string; text: string; rating: number; date: string }>> = {
  plomberie: [
    { author: 'M. Dupont', text: "Intervention rapide pour une fuite d'eau en pleine nuit. Plombier professionnel et tarifs justes. Je recommande !", rating: 5, date: 'Il y a 1 semaine' },
    { author: 'Mme Martin', text: "Chauffage réparé en 1h, impeccable. Un vrai pro qui connait son métier.", rating: 5, date: 'Il y a 2 semaines' },
    { author: 'Pierre L.', text: "Remplacement complet de la salle de bain. Travail soigné, respect des délais.", rating: 5, date: 'Il y a 3 semaines' },
    { author: 'Sophie R.', text: "Détection de fuite sans casse. Technologie au top et prix raisonnable.", rating: 5, date: 'Il y a 1 mois' },
    { author: 'Jean-Claude B.', text: "Entretien annuel de la chaudière. Consciencieux et sympathique.", rating: 5, date: 'Il y a 1 mois' },
    { author: 'Marie T.', text: "Débouchage d'urgence. Arrivé en 45min, problème résolu. Merci !", rating: 5, date: 'Il y a 2 mois' }
  ],
  electricien: [
    { author: 'Sylvie M.', text: "Mise aux normes complète de ma maison ancienne. Travail propre et conforme.", rating: 5, date: 'Il y a 1 semaine' },
    { author: 'Marc D.', text: "Installation de ma borne de recharge voiture électrique. Parfait !", rating: 5, date: 'Il y a 2 semaines' },
    { author: 'Nathalie P.', text: "Domotique installée dans toute la maison. Un vrai confort au quotidien.", rating: 5, date: 'Il y a 3 semaines' },
    { author: 'Philippe R.', text: "Court-circuit réparé en urgence. Intervention rapide et efficace.", rating: 5, date: 'Il y a 1 mois' },
    { author: 'Isabelle G.', text: "Éclairage LED dans tout l'appartement. Économies d'énergie garanties.", rating: 5, date: 'Il y a 1 mois' },
    { author: 'François L.', text: "Diagnostic complet avant achat immobilier. Rassurant et professionnel.", rating: 5, date: 'Il y a 2 mois' }
  ],
  coiffeur: [
    { author: 'Sophie L.', text: "Coupe parfaite, exactement ce que je voulais. Le visagisme fait toute la différence !", rating: 5, date: 'Il y a 1 semaine' },
    { author: 'Thomas H.', text: "Barbier au top, rasage à l'ancienne de qualité. Ambiance masculine garantie.", rating: 5, date: 'Il y a 2 semaines' },
    { author: 'Camille D.', text: "Coloration balayage magnifique. Des compliments tous les jours !", rating: 5, date: 'Il y a 3 semaines' },
    { author: 'Laura M.', text: "Soins kératine pour mes cheveux abîmés. Résultat spectaculaire.", rating: 5, date: 'Il y a 1 mois' },
    { author: 'Emma B.', text: "Chignon de mariage exceptionnel. Tenu toute la journée et la nuit.", rating: 5, date: 'Il y a 1 mois' },
    { author: 'Nicolas P.', text: "Extensions naturelles, on ne voit pas la différence. Super travail.", rating: 5, date: 'Il y a 2 mois' }
  ],
  restaurant: [
    { author: 'Julie M.', text: "Menu dégustation exceptionnel. Une explosion de saveurs à chaque plat !", rating: 5, date: 'Il y a 1 semaine' },
    { author: 'Antoine D.', text: "Service impeccable et cadre magnifique. Parfait pour les occasions spéciales.", rating: 5, date: 'Il y a 2 semaines' },
    { author: 'Sarah K.', text: "Produits locaux et cuisine créative. Une belle découverte gastronomique.", rating: 5, date: 'Il y a 3 semaines' },
    { author: 'David L.', text: "Brunch de qualité, copieux et fait maison. On reviendra !", rating: 5, date: 'Il y a 1 mois' },
    { author: 'Claire P.', text: "Accueil chaleureux comme à la maison. Une cuisine avec du cœur.", rating: 5, date: 'Il y a 1 mois' },
    { author: 'Romain G.', text: "Carte des vins excellente et conseils avisés. Soirée parfaite.", rating: 5, date: 'Il y a 2 mois' }
  ],
  garage: [
    { author: 'Stéphane B.', text: "Réparation moteur complexe résolue en 2 jours. Mécanicien de talent !", rating: 5, date: 'Il y a 1 semaine' },
    { author: 'Aurélie M.', text: "Pneus changés et géométrie faite. Prix compétitif et rapide.", rating: 5, date: 'Il y a 2 semaines' },
    { author: 'Christophe L.', text: "Diagnostic électronique précis. Enfin un garage honnête !", rating: 5, date: 'Il y a 3 semaines' },
    { author: 'Marie-Jeanne T.', text: "Carrosserie réparée impeccablement. On ne voit plus la rayure.", rating: 5, date: 'Il y a 1 mois' },
    { author: 'Pierre D.', text: "Révision complète à prix juste. Pas de travaux inutiles proposés.", rating: 5, date: 'Il y a 1 mois' },
    { author: 'Sandrine H.', text: "Climatisation rechargée et nettoyée. Parfait pour l'été.", rating: 5, date: 'Il y a 2 mois' }
  ],
  nettoyage: [
    { author: 'Mme Bernard', text: "Appartement rendu impeccable après déménagement. Propreté impeccable !", rating: 5, date: 'Il y a 1 semaine' },
    { author: 'M. Leroy', text: "Bureaux entreprise nettoyés tous les soirs. Service fiable et discret.", rating: 5, date: 'Il y a 2 semaines' },
    { author: 'Famille Dubois', text: "Nettoyage après travaux. Poussière et débris partout enlevés. Bravo !", rating: 5, date: 'Il y a 3 semaines' },
    { author: 'Mme Petit', text: "Canapé et moquettes nettoyés à domicile. Comme neuf, odeurs disparues.", rating: 5, date: 'Il y a 1 mois' },
    { author: 'M. Moreau', text: "Vitres immeuble 4 étages sans traces. Équipe courageuse !", rating: 5, date: 'Il y a 1 mois' },
    { author: 'Mme Roux', text: "Désinfection complète post-covid. Rassurant et professionnel.", rating: 5, date: 'Il y a 2 mois' }
  ],
  jardin: [
    { author: 'M. Fontaine', text: "Jardin totalement transformé. Un vrai havre de paix maintenant !", rating: 5, date: 'Il y a 1 semaine' },
    { author: 'Mme Chevalier', text: "Taille de haies millimétrée. Géométrie parfaite et nettoyé.", rating: 5, date: 'Il y a 2 semaines' },
    { author: 'M. Lambert', text: "Terrasse bois rénovée et traitée. Protégée pour des années.", rating: 5, date: 'Il y a 3 semaines' },
    { author: 'Mme Simon', text: "Massif fleuri créé de A à Z. Plantes parfaitement adaptées.", rating: 5, date: 'Il y a 1 mois' },
    { author: 'M. Roussel', text: "Pelouse semée et arrosage automatique installé. Zéro entretien !", rating: 5, date: 'Il y a 1 mois' },
    { author: 'Mme Garnier', text: "Élagage dangereux d'un grand chêne. Pro sans risques.", rating: 5, date: 'Il y a 2 mois' }
  ],
  fitness: [
    { author: 'Nicolas V.', text: "Programme perte de poids efficace -8kg en 3 mois. Coach motivant !", rating: 5, date: 'Il y a 1 semaine' },
    { author: 'Caroline M.', text: "Remise en forme post-grossesse adaptée. Exercices sur mesure.", rating: 5, date: 'Il y a 2 semaines' },
    { author: 'Alexandre K.', text: "Préparation marathon réussie. Temps visé atteint grâce au suivi.", rating: 5, date: 'Il y a 3 semaines' },
    { author: 'Émilie R.', text: "Cours collectifs dynamiques. Ambiance top et résultats garantis.", rating: 5, date: 'Il y a 1 mois' },
    { author: 'Julien B.', text: "Nutrition + sport = résultats durables. Accompagnement complet.", rating: 5, date: 'Il y a 1 mois' },
    { author: 'Sophie G.', text: "Musculation sans blessure grâce aux conseils techniques.", rating: 5, date: 'Il y a 2 mois' }
  ],
  medical: [
    { author: 'M. Durand', text: "Consultation à l'écoute et diagnostic précis. Enfin un médecin disponible !", rating: 5, date: 'Il y a 1 semaine' },
    { author: 'Mme Lefebvre', text: "Kiné compétente pour ma rééducation genou. Progrès rapides.", rating: 5, date: 'Il y a 2 semaines' },
    { author: 'M. Michel', text: "Dentiste doux et patient. Phobie du dentiste vaincue !", rating: 5, date: 'Il y a 3 semaines' },
    { author: 'Mme Fournier', text: "Infirmière à domicile régulière et professionnelle. Rassurante.", rating: 5, date: 'Il y a 1 mois' },
    { author: 'M. Girard', text: "Pédicure soignante pour diabétique. Extrêmement précautionneuse.", rating: 5, date: 'Il y a 1 mois' },
    { author: 'Mme Bonnet', text: "Ostéo qui soulage enfin mes maux de dos chroniques. Un soulagement !", rating: 5, date: 'Il y a 2 mois' }
  ],
  avocat: [
    { author: 'M. Lemaire', text: "Divorce compliqué géré avec professionnalisme et empathie.", rating: 5, date: 'Il y a 1 semaine' },
    { author: 'Mme Duval', text: "Succès en appel pour mon licenciement abusif. Défense exemplaire !", rating: 5, date: 'Il y a 2 semaines' },
    { author: 'M. Bernard', text: "Contrat commercial rédigé avec précision. Zéro zone grise.", rating: 5, date: 'Il y a 3 semaines' },
    { author: 'Mme Morin', text: "Succession familiale débloquée rapidement. Fin des conflits.", rating: 5, date: 'Il y a 1 mois' },
    { author: 'M. Petit', text: "Conseil fiscal pertinent qui m'a fait économiser beaucoup.", rating: 5, date: 'Il y a 1 mois' },
    { author: 'Mme Giraud', text: "Défense pénale efficace. Acquittement obtenu. Excellence !", rating: 5, date: 'Il y a 2 mois' }
  ],
  default: [
    { author: 'Emma L.', text: "Une expérience tout simplement majestueuse...", rating: 5, date: 'Il y a 1 semaine' },
    { author: 'Arthur D.', text: "Service d'excellence du début à la fin...", rating: 5, date: 'Il y a 2 semaines' },
    { author: 'Sophie M.', text: "Je recommande vivement cette entreprise...", rating: 5, date: 'Il y a 3 semaines' },
    { author: 'Lucas P.', text: "Professionnalisme et expertise remarquables...", rating: 5, date: 'Il y a 1 mois' },
    { author: 'Marie B.', text: "Un service client irréprochable...", rating: 5, date: 'Il y a 1 mois' },
    { author: 'Thomas R.', text: "Excellence et qualité au rendez-vous...", rating: 5, date: 'Il y a 2 mois' }
  ]
};

export function getSectorFallbackReviews(sector: string): Array<{ author: string; text: string; rating: number; date: string }> {
  const normalizedSector = (sector || '').toLowerCase();
  for (const [key, reviews] of Object.entries(SECTOR_FALLBACK_REVIEWS)) {
    if (normalizedSector.includes(key)) return reviews;
  }
  return SECTOR_FALLBACK_REVIEWS.default;
}
