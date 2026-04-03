// ============================================================
// LeadForge AI - Templates Email Outreach Agent (Version Minimaliste Professionnelle)
// ============================================================

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  htmlContent: string;
  textContent: string;
  variables: string[];
  category: 'sale' | 'reminder';
}

// Templates de VENTE
export const salesTemplates: EmailTemplate[] = [
  {
    id: 'email1_presentation',
    name: 'Email 1 - Présentation Site Web',
    category: 'sale',
    subject: '🚀 {{companyName}} - Votre site web professionnel est prêt',
    variables: ['firstName', 'companyName', 'websiteLink', 'price', 'agentName', 'agentEmail'],
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>LeadForge AI - Votre site web</title>
      </head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #ffffff; color: #333333; line-height: 1.6;">
        <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          
          <!-- Header Simple -->
          <div style="text-align: center; margin-bottom: 40px; padding-bottom: 30px; border-bottom: 1px solid #e0e0e0;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #2c3e50;">{{agentName}}</h1>
            <p style="margin: 8px 0 0 0; font-size: 14px; color: #7f8c8d;">Solutions web professionnelles</p>
          </div>
          
          <!-- Content -->
          <div style="margin-bottom: 30px;">
            <h2 style="color: #2c3e50; margin-bottom: 15px; font-size: 20px;">Bonjour {{firstName}},</h2>
            
            <!-- L'offre - Positionnée en haut pour donner de la valeur -->
            <div style="background-color: #f8f9fa; padding: 25px; margin: 0 0 30px 0; border: 1px solid #e9ecef;">
              <h3 style="color: #2c3e50; margin-top: 0; margin-bottom: 15px; font-size: 18px;">Notre proposition pour {{companyName}}</h3>
              <p style="font-size: 16px; margin-bottom: 20px;">
                Nous avons finalisé le développement de votre site web professionnel pour <strong>{{companyName}}</strong>. 
                Notre équipe a créé une présence en ligne optimisée pour générer des conversions.
              </p>
              <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: 500;">Votre site web est prêt :</p>
              <p style="margin: 0 0 20px 0; font-size: 14px; color: #007bff;">
                <a href="{{websiteLink}}" style="color: #007bff; text-decoration: underline;">{{websiteLink}}</a>
              </p>
            </div>
            
            <!-- Introduction de notre service -->
            <div style="margin-bottom: 30px;">
              <p style="font-size: 16px; margin-bottom: 15px;">
                <strong>Qui sommes-nous ?</strong> {{agentName}} est une agence web spécialisée dans la création de sites web professionnels 
                pour les entreprises qui souhaitent se développer en ligne. Notre mission est de rendre le web accessible 
                à tous les entrepreneurs avec des solutions performantes et abordables.
              </p>
              <p style="font-size: 16px; margin-bottom: 15px;">
                <strong>Pourquoi cette initiative ?</strong> Nous avons remarqué que de nombreuses entreprises comme la vôtre 
                méritent une présence en ligne professionnelle mais sont souvent découragées par les coûts élevés des agences 
                traditionnelles. C'est pourquoi nous avons créé une solution adaptée : des sites web de qualité professionnelle 
                à un prix accessible, avec un accompagnement personnalisé.
              </p>
              <p style="font-size: 16px; margin-bottom: 25px;">
                <strong>Notre approche</strong> : Nous analysons votre marché, comprenons vos objectifs, et créons un site web 
                qui non seulement représente votre entreprise mais surtout qui génère des résultats concrets.
              </p>
            </div>
            
            <!-- Notre proposition détaillée -->
            <div style="margin: 30px 0;">
              <h3 style="color: #2c3e50; margin-bottom: 20px; font-size: 18px;">Notre proposition inclut :</h3>
              
              <div style="margin-bottom: 25px;">
                <h4 style="color: #2c3e50; margin-bottom: 10px; font-size: 16px;">🌐 Site Web Professionnel Complet</h4>
                <ul style="padding-left: 20px; margin: 0;">
                  <li style="margin-bottom: 12px;"><strong>Design sur mesure</strong> : Création unique adaptée à votre image et votre secteur d'activité</li>
                  <li style="margin-bottom: 12px;"><strong>Responsive design</strong> : Affichage parfait sur ordinateur, tablette et smartphone</li>
                  <li style="margin-bottom: 12px;"><strong>Pages essentielles</strong> : Accueil, Présentation, Services, Contact...</li>
                  <li style="margin-bottom: 12px;"><strong>Formulaire de contact</strong> : Vos clients peuvent vous contacter directement depuis le site</li>
                  <li style="margin-bottom: 12px;"><strong>WhatsApp intégré</strong> : Vos clients peuvent vous contacter directement via WhatsApp</li>
                  <li style="margin-bottom: 0;"><strong>Chatbot intelligent</strong> : Assistant 24/7 pour répondre aux questions de vos visiteurs</li>
                </ul>
              </div>
              
              <div style="margin-bottom: 25px;">
                <h4 style="color: #2c3e50; margin-bottom: 10px; font-size: 16px;">🚀 Optimisation et Performance</h4>
                <ul style="padding-left: 20px; margin: 0;">
                  <li style="margin-bottom: 12px;"><strong>SEO optimisé</strong> : Référencement naturel pour apparaître dans Google</li>
                  <li style="margin-bottom: 12px;"><strong>Performance rapide</strong> : Temps de chargement optimisé pour meilleure expérience utilisateur</li>
                  <li style="margin-bottom: 12px;"><strong>Sécurité SSL</strong> : Certificat HTTPS inclus pour la sécurité de vos visiteurs</li>
                  <li style="margin-bottom: 0;"><strong>Analytics intégré</strong> : Suivi des visiteurs et statistiques de performance</li>
                </ul>
              </div>
              
              <div style="margin-bottom: 25px;">
                <h4 style="color: #2c3e50; margin-bottom: 10px; font-size: 16px;">🎯 Formation et Support</h4>
                <ul style="padding-left: 20px; margin: 0;">
                  <li style="margin-bottom: 12px;"><strong>Documentation complète</strong> : Guides détaillés pour toutes les fonctionnalités</li>
                  <li style="margin-bottom: 12px;"><strong>Support prioritaire</strong> : Assistance par email et téléphone pendant 3 mois</li>
                  <li style="margin-bottom: 0;"><strong>Mises à jour incluses</strong> : Maintenance et sécurité garanties</li>
                </ul>
              </div>
              
              <div style="margin-bottom: 0;">
                <h4 style="color: #2c3e50; margin-bottom: 10px; font-size: 16px;">🏆 Avantages Exclusifs</h4>
                <ul style="padding-left: 20px; margin: 0;">
                  <li style="margin-bottom: 12px;"><strong>Garantie satisfaction</strong> : Remboursement complet si pas satisfait sous 30 jours</li>
                  <li style="margin-bottom: 12px;"><strong>Livraison rapide</strong> : Site web prêt en 2 jours ouvrés</li>
                  <li style="margin-bottom: 12px;"><strong>Économie garantie</strong> : 40% moins cher que les agences traditionnelles</li>
                  <li style="margin-bottom: 0;"><strong>Propriété totale</strong> : Vous êtes 100% propriétaire de votre site et domaine</li>
                </ul>
              </div>
            </div>
            
            <!-- Tarification -->
            <div style="background-color: #fff3cd; padding: 25px; margin: 30px 0; border: 1px solid #ffeaa7;">
              <h3 style="color: #856404; margin-top: 0; margin-bottom: 15px; font-size: 18px;">Investissement</h3>
              <div style="margin-bottom: 20px;">
                <p style="font-size: 20px; font-weight: 600; margin: 10px 0; color: #2c3e50;">146€ HT - Paiement unique</p>
                <p style="margin: 5px 0 0 0; font-size: 14px; color: #856404;">
                  La création de votre site web professionnel est payée une seule fois.
                </p>
                <p style="margin: 10px 0 0 0; font-size: 14px; color: #856404; font-weight: 500;">
                  Inclut :
                </p>
                <ul style="margin: 5px 0 0 20px; font-size: 14px; color: #856404;">
                  <li>1. Hébergement professionnel 1 an inclus</li>
                  <li>2. Nom de domaine professionnel 1 an inclus</li>
                  <li>3. mois gratuits de suivi et maintenance</li>
                </ul>
              </div>
              <div style="padding-top: 15px; border-top: 1px solid #ffeaa7;">
                <p style="font-size: 16px; font-weight: 500; margin: 0 0 5px 0; color: #856404;">À partir de la 2ème année :</p>
                <p style="font-size: 18px; font-weight: 600; margin: 0; color: #2c3e50;">46€ HT par an</p>
                <p style="margin: 5px 0 0 0; font-size: 14px; color: #856404;">
                  Pour l'hébergement ET le nom de domaine
                </p>
              </div>
            </div>
            
            <!-- Appel à l'action -->
            <div style="text-align: center; margin: 40px 0;">
              <p style="margin-bottom: 20px; font-size: 16px;">Souhaitez-vous démarrer votre projet ?</p>
              <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                <a href="mailto:{{agentEmail}}?subject=Démarrage projet {{companyName}}&body=Bonjour, je souhaite démarrer le projet pour {{companyName}}." 
                   style="display: inline-block; background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: 500;">
                  Démarrer le projet
                </a>
                <a href="mailto:{{agentEmail}}?subject=Questions projet {{companyName}}&body=Bonjour, j'ai quelques questions sur le projet pour {{companyName}}." 
                   style="display: inline-block; background-color: #6c757d; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: 500;">
                  Plus de questions
                </a>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="text-align: center; padding-top: 30px; border-top: 1px solid #e0e0e0; font-size: 14px; color: #7f8c8d;">
            <p style="margin: 0;">
              Cordialement,<br>
              <strong>{{agentName}}</strong><br>
              {{agentName}}<br>
              <a href="mailto:{{agentEmail}}" style="color: #007bff; text-decoration: none;">{{agentEmail}}</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    textContent: `
Bonjour {{firstName}},

Notre proposition pour {{companyName}}

Nous avons finalisé le développement de votre site web professionnel pour {{companyName}}. Notre équipe a créé une présence en ligne optimisée pour générer des conversions.

Votre site web est prêt :
{{websiteLink}}

Qui sommes-nous ? {{agentName}} est une agence web spécialisée dans la création de sites web professionnels pour les entreprises qui souhaitent se développer en ligne. Notre mission est de rendre le web accessible à tous les entrepreneurs avec des solutions performantes et abordables.

Pourquoi cette initiative ? Nous avons remarqué que de nombreuses entreprises comme la vôtre méritent une présence en ligne professionnelle mais sont souvent découragées par les coûts élevés des agences traditionnelles. C'est pourquoi nous avons créé une solution adaptée : des sites web de qualité professionnelle à un prix accessible, avec un accompagnement personnalisé.

Notre approche : Nous analysons votre marché, comprenons vos objectifs, et créons un site web qui non seulement représente votre entreprise mais surtout qui génère des résultats concrets.

Notre proposition inclut :

🌐 Site Web Professionnel Complet
• Design sur mesure : Création unique adaptée à votre image et votre secteur d'activité
• Responsive design : Affichage parfait sur ordinateur, tablette et smartphone
• Pages essentielles : Accueil, Présentation, Services, Contact...
• Formulaire de contact : Vos clients peuvent vous contacter directement depuis le site
• WhatsApp intégré : Vos clients peuvent vous contacter directement via WhatsApp
• Chatbot intelligent : Assistant 24/7 pour répondre aux questions de vos visiteurs

🚀 Optimisation et Performance
• SEO optimisé : Référencement naturel pour apparaître dans Google
• Performance rapide : Temps de chargement optimisé pour meilleure expérience utilisateur
• Sécurité SSL : Certificat HTTPS inclus pour la sécurité de vos visiteurs
• Analytics intégré : Suivi des visiteurs et statistiques de performance

🎯 Formation et Support
• Documentation complète : Guides détaillés pour toutes les fonctionnalités
• Support prioritaire : Assistance par email et téléphone pendant 3 mois
• Mises à jour incluses : Maintenance et sécurité garanties

🏆 Avantages Exclusifs
• Garantie satisfaction : Remboursement complet si pas satisfait sous 30 jours
• Livraison rapide : Site web prêt en 2 jours ouvrés
• Économie garantie : 40% moins cher que les agences traditionnelles
• Propriété totale : Vous êtes 100% propriétaire de votre site et domaine

Investissement
146€ HT - Paiement unique
La création de votre site web professionnel est payée une seule fois.

Inclut :
1. Hébergement professionnel 1 an inclus
2. Nom de domaine professionnel 1 an inclus
3. mois gratuits de suivi et maintenance

À partir de la 2ème année :
46€ HT par an
Pour l'hébergement ET le nom de domaine

Souhaitez-vous démarrer votre projet ?
• Démarrer le projet
• Plus de questions

Cordialement,
{{agentName}}
LeadForge AI
{{agentEmail}}
    `
  },

  {
    id: 'email2_devis',
    name: 'Email 2 - Devis et Paiement',
    category: 'sale',
    subject: 'Devis détaillé pour votre site web {{companyName}}',
    variables: ['firstName', 'companyName', 'devisLink', 'paymentLink', 'price', 'agentName', 'agentEmail', 'validityDays', 'deliveryDate'],
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>LeadForge AI - Devis Site Web</title>
      </head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #ffffff; color: #333333; line-height: 1.6;">
        <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 40px; padding-bottom: 30px; border-bottom: 1px solid #e0e0e0;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #2c3e50;">Devis personnalisé</h1>
            <p style="margin: 8px 0 0 0; font-size: 14px; color: #7f8c8d;">Proposition pour {{companyName}}</p>
          </div>
          
          <!-- Content -->
          <div style="margin-bottom: 30px;">
            <h2 style="color: #2c3e50; margin-bottom: 15px; font-size: 20px;">Bonjour {{firstName}},</h2>
            
            <!-- Contexte et approche -->
            <div style="margin-bottom: 30px;">
              <p style="font-size: 16px; margin-bottom: 15px;">
                <strong>Notre démarche personnalisée</strong> : Chez {{agentName}}, nous croyons que chaque entreprise mérite 
                une présence en ligne qui reflète véritablement son identité et ses ambitions. Après avoir écouté attentivement 
                vos besoins pour {{companyName}}, nous avons préparé une proposition sur mesure qui combine expertise technique 
                et compréhension de vos objectifs business.
              </p>
              <p style="font-size: 16px; margin-bottom: 25px;">
                <strong>Pourquoi un devis détaillé ?</strong> La transparence est au cœur de notre relation client. 
                Ce devis n'est pas seulement un document financier, c'est notre engagement clair sur ce que nous allons 
                livrer, quand nous allons le livrer, et comment nous allons garantir votre satisfaction.
              </p>
            </div>
            
            <!-- Proposition principale -->
            <div style="background-color: #f8f9fa; padding: 25px; margin: 30px 0; border: 1px solid #e9ecef;">
              <h3 style="color: #2c3e50; margin-top: 0; margin-bottom: 15px; font-size: 18px;">Votre projet sur mesure</h3>
              <p style="font-size: 16px; margin-bottom: 20px;">
                Suite à nos échanges, voici votre devis détaillé pour la création de votre site web professionnel. 
                Nous avons analysé vos besoins spécifiques pour créer une solution parfaitement adaptée à {{companyName}}.
              </p>
              <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: 500;">Votre devis complet :</p>
              <p style="margin: 0 0 20px 0; font-size: 14px; color: #007bff;">
                <a href="{{devisLink}}" style="color: #007bff; text-decoration: underline;">{{devisLink}}</a>
              </p>
            </div>
            
            <!-- Processus détaillé -->
            <div style="margin: 30px 0;">
              <h3 style="color: #2c3e50; margin-bottom: 20px; font-size: 18px;">Notre processus de réalisation en 2 jours ouvrables</h3>
              
              <div style="margin-bottom: 25px;">
                <h4 style="color: #2c3e50; margin-bottom: 10px; font-size: 16px;">📋 Jour 1 - Phase 1 & 2</h4>
                <ul style="padding-left: 20px; margin: 0;">
                  <li style="margin-bottom: 12px;"><strong>Validation rapide</strong> : Analyse de vos besoins et validation du cahier des charges</li>
                  <li style="margin-bottom: 12px;"><strong>Validation maquette</strong> : La maquette visuelle est déjà prête (envoyée dans l'email 1), juste besoin de votre validation</li>
                  <li style="margin-bottom: 0;"><strong>Demandes de modifications</strong> : Si besoin, nous ajustons la maquette selon vos retours</li>
                </ul>
              </div>
              
              <div style="margin-bottom: 25px;">
                <h4 style="color: #2c3e50; margin-bottom: 10px; font-size: 16px;">💻 Jour 2 - Phase 3 & 4</h4>
                <ul style="padding-left: 20px; margin: 0;">
                  <li style="margin-bottom: 12px;"><strong>Développement rapide</strong> : Intégration technique et fonctionnalités principales</li>
                  <li style="margin-bottom: 12px;"><strong>Optimisation SEO</strong> : Intégration des meilleures pratiques de référencement</li>
                  <li style="margin-bottom: 12px;"><strong>Tests et validation</strong> : Vérification sur tous appareils</li>
                  <li style="margin-bottom: 0;"><strong>Mise en ligne</strong> : Déploiement immédiat du site</li>
                </ul>
              </div>
              
              <div style="margin-bottom: 0;">
                <h4 style="color: #2c3e50; margin-bottom: 10px; font-size: 16px;">🚀 Après Livraison - Support ({{deliveryDate}})</h4>
                <ul style="padding-left: 20px; margin: 0;">
                  <li style="margin-bottom: 12px;"><strong>Documentation complète</strong> : Guides détaillés pour gérer votre site</li>
                  <li style="margin-bottom: 12px;"><strong>Support prioritaire</strong> : Assistance par email et téléphone pendant 3 mois</li>
                  <li style="margin-bottom: 0;"><strong>Monitoring</strong> : Suivi des performances et optimisation continue</li>
                </ul>
              </div>
            </div>
            
            <!-- Garanties et avantages -->
            <div style="margin: 30px 0;">
              <h3 style="color: #2c3e50; margin-bottom: 20px; font-size: 18px;">Nos garanties exclusives</h3>
              <ul style="padding-left: 20px; margin: 0;">
                <li style="margin-bottom: 12px;"><strong>Garantie satisfaction 30 jours</strong> : Remboursement complet si pas satisfait</li>
                <li style="margin-bottom: 12px;"><strong>Livraison garantie</strong> : Respect des délais ou compensation</li>
                <li style="margin-bottom: 12px;"><strong>Prix fixe garanti</strong> : Pas de frais cachés ni surprises</li>
                <li style="margin-bottom: 12px;"><strong>Propriété totale</strong> : Vous êtes 100% propriétaire du code et du domaine</li>
                <li style="margin-bottom: 0;"><strong>Support prioritaire</strong> : Assistance dédiée pendant 3 mois</li>
              </ul>
            </div>
            
            <!-- Paiement détaillé -->
            <div style="background-color: #fff3cd; padding: 25px; margin: 30px 0; border: 1px solid #ffeaa7;">
              <h3 style="color: #856404; margin-top: 0; margin-bottom: 15px; font-size: 18px;">Finaliser votre projet</h3>
              <div style="margin-bottom: 20px;">
                <p style="font-size: 20px; font-weight: 600; margin: 10px 0; color: #2c3e50;">146€ HT - Paiement unique</p>
                <p style="margin: 5px 0 0 0; font-size: 14px; color: #856404;">
                  Investissement unique pour la création complète incluant :
                </p>
                <ul style="margin: 10px 0 0 20px; font-size: 14px; color: #856404;">
                  <li>Toutes les phases de développement</li>
                  <li>Hébergement professionnel 1 an</li>
                  <li>Nom de domaine professionnel 1 an</li>
                  <li>Suivie et mantenance 3 mois</li>
                </ul>
              </div>
                            <div style="padding-top: 15px; border-top: 1px solid #ffeaa7; margin-top: 15px;">
                <p style="margin: 0 0 15px 0; font-size: 14px; color: #856404;">
                  Offre valide {{validityDays}} jours. Paiement 100% sécurisé.
                </p>
                <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: 500;">Finaliser votre projet :</p>
                <p style="margin: 0 0 20px 0; font-size: 14px; color: #007bff;">
                  <a href="{{paymentLink}}" style="color: #007bff; text-decoration: underline;">{{paymentLink}}</a>
                </p>
              </div>
            </div>
            
            <!-- Appel à l'action -->
            <div style="text-align: center; margin: 40px 0;">
              <p style="margin-bottom: 20px; font-size: 16px;">Des questions sur votre devis ?</p>
              <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                <a href="mailto:{{agentEmail}}?subject=Questions devis {{companyName}}" 
                   style="display: inline-block; background-color: #6c757d; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: 500;">
                  Demander de changement
                </a>
                <a href="mailto:{{agentEmail}}?subject=Validation maquette {{companyName}}" 
                   style="display: inline-block; background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: 500;">
                  Valider La maquette
                </a>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="text-align: center; padding-top: 30px; border-top: 1px solid #e0e0e0; font-size: 14px; color: #7f8c8d;">
            <p style="margin: 0;">
              Cordialement,<br>
              <strong>{{agentName}}</strong><br>
              {{agentName}}<br>
              <a href="mailto:{{agentEmail}}" style="color: #007bff; text-decoration: none;">{{agentEmail}}</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    textContent: `
Bonjour {{firstName}},

Notre démarche personnalisée :
Chez {{agentName}}, nous croyons que chaque entreprise mérite 
une présence en ligne qui reflète véritablement son identité et ses ambitions. Après avoir écouté attentivement 
vos besoins pour {{companyName}}, nous avons préparé une proposition sur mesure qui combine expertise technique 
et compréhension de vos objectifs business.

Pourquoi un devis détaillé ?
La transparence est au cœur de notre relation client. 
Ce devis n'est pas seulement un document financier, c'est notre engagement clair sur ce que nous allons 
livrer, quand nous allons le livrer, et comment nous allons garantir votre satisfaction.

Votre projet sur mesure
Suite à nos échanges, voici votre devis détaillé pour la création de votre site web professionnel. 
Nous avons analysé vos besoins spécifiques pour créer une solution parfaitement adaptée à {{companyName}}.

Votre devis complet : {{devisLink}}

Notre processus de réalisation en 2 jours ouvrables :

📋 Jour 1 - Phase 1 & 2
• Validation rapide : Analyse de vos besoins et validation du cahier des charges
• Validation maquette : La maquette visuelle est déjà prête (envoyée dans l'email 1), juste besoin de votre validation
• Demandes de modifications : Si besoin, nous ajustons la maquette selon vos retours

💻 Jour 2 - Phase 3 & 4
• Développement rapide : Intégration technique et fonctionnalités principales
• Optimisation SEO : Intégration des meilleures pratiques de référencement
• Tests et validation : Vérification sur tous appareils
• Mise en ligne : Déploiement immédiat du site

🚀 Après Livraison - Support ({{deliveryDate}})
• Documentation complète : Guides détaillés pour gérer votre site
• Support prioritaire : Assistance par email et téléphone pendant 3 mois
• Monitoring : Suivi des performances et optimisation continue

Nos garanties exclusives :
• Garantie satisfaction 30 jours : Remboursement complet si pas satisfait
• Livraison garantie : Respect des délais ou compensation
• Prix fixe garanti : Pas de frais cachés ni surprises
• Propriété totale : Vous êtes 100% propriétaire du code et du domaine
• Support prioritaire : Assistance dédiée pendant 3 mois

Finaliser votre projet
146€ HT - Paiement unique
Investissement unique pour la création complète incluant :
• Toutes les phases de développement
{{agentName}}
LeadForge AI
{{agentEmail}}
    `
  },

  {
    id: 'email3_confirmation',
    name: 'Email 3 - Confirmation Paiement',
    category: 'sale',
    subject: 'Paiement confirmé - Votre projet {{companyName}} démarre',
    variables: ['firstName', 'companyName', 'invoiceLink', 'paymentLink', 'price', 'agentName', 'agentEmail', 'clientPortalLink', 'deliveryDate'],
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>LeadForge AI - Paiement Confirmé</title>
      </head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #ffffff; color: #333333; line-height: 1.6;">
        <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 40px; padding-bottom: 30px; border-bottom: 1px solid #e0e0e0;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #28a745;">Paiement confirmé</h1>
            <p style="margin: 8px 0 0 0; font-size: 14px; color: #7f8c8d;">Bienvenue chez {{agentName}}</p>
          </div>
          
          <!-- Content -->
          <div style="margin-bottom: 30px;">
            <h2 style="color: #2c3e50; margin-bottom: 15px; font-size: 20px;">Bonjour {{firstName}},</h2>
            
            <!-- Introduction et remerciement -->
            <div style="margin-bottom: 30px;">
              <p style="font-size: 16px; margin-bottom: 15px;">
                <strong>Merci de votre confiance !</strong> Nous sommes particulièrement honorés que vous ayez choisi 
                {{agentName}} pour la création de votre site web professionnel {{companyName}}. Votre décision 
                témoigne de la confiance que vous placez dans notre expertise et notre engagement qualité.
              </p>
              <p style="font-size: 16px; margin-bottom: 25px;">
                <strong>Qu'est-ce que cela signifie pour vous ?</strong> Votre paiement de 146€ HT vient d'être confirmé, 
                et nous vous confirmons que votre projet est maintenant officiellement en production. 
                Notre équipe va immédiatement commencer à travailler sur votre présence en ligne professionnelle.
              </p>
            </div>
            
            <!-- Confirmation paiement -->
            <div style="background-color: #f8f9fa; padding: 25px; margin: 30px 0; border: 1px solid #e9ecef;">
              <h3 style="color: #2c3e50; margin-top: 0; margin-bottom: 15px; font-size: 18px;">Confirmation de votre investissement</h3>
              <p style="font-size: 16px; margin-bottom: 20px;">
                Nous vous confirmons la bonne réception de votre paiement de 146€ HT pour votre projet {{companyName}}. 
                Votre site web est maintenant officiellement en production avec notre équipe dédiée.
              </p>
                          
            <!-- Facture et documents -->
            <div style="background-color: #d1ecf1; padding: 25px; margin: 30px 0; border: 1px solid #bee5eb;">
              <h3 style="color: #0c5460; margin-top: 0; margin-bottom: 15px; font-size: 18px;">Vos documents officiels</h3>
              <div style="margin-bottom: 20px;">
                <p style="font-size: 16px; font-weight: 500; margin: 0 0 10px 0;">Votre facture est disponible :</p>
                <p style="margin: 0 0 15px 0; font-size: 14px; color: #007bff;">
                  <a href="{{invoiceLink}}" style="color: #007bff; text-decoration: underline;">{{invoiceLink}}</a>
                </p>
                <p style="margin: 0; font-size: 14px; color: #0c5460;">
                  Facture N°{{invoiceNumber}} - Montant : 146€ HT - Date : {{invoiceDate}}
                </p>
              </div>
                          </div>
          <div style="text-align: center; padding-top: 30px; border-top: 1px solid #e0e0e0; font-size: 14px; color: #7f8c8d;">
            <p style="margin: 0;">
              Merci de votre confiance,<br>
              <strong>{{agentName}}</strong><br>
              {{agentName}}<br>
              <a href="mailto:{{agentEmail}}" style="color: #007bff; text-decoration: none;">{{agentEmail}}</a>
            </p>
          </div>
        </div>
      </body>
      </html>
   `,
    textContent: `
Bonjour {{firstName}},

Merci de votre confiance !
Nous sommes particulièrement honorés que vous ayez choisi 
{{agentName}} pour la création de votre site web professionnel {{companyName}}. Votre décision 
témoigne de la confiance que vous placez dans notre expertise et notre engagement qualité.

Qu'est-ce que cela signifie pour vous ?
Votre paiement de 146€ HT vient d'être confirmé, 
et nous vous confirmons que votre projet est maintenant officiellement en production. 
Notre équipe va immédiatement commencer à travailler sur votre présence en ligne professionnelle.

Confirmation de votre investissement
Nous vous confirmons la bonne réception de votre paiement de 146€ HT pour votre projet {{companyName}}. 
Votre site web est maintenant officiellement en production avec notre équipe dédiée.


Votre calendrier de projet - 2 jours ouvrables :

📋 Étape 1 - Développement
• Intégration technique : Développement des fonctionnalités principales
• Optimisation SEO : Intégration des meilleures pratiques
• Tests et validation : Vérification sur tous appareils

🚀 Étape 2 - Livraison
• Mise en ligne : Déploiement du site sur serveur
• Documentation : Guides pour gérer votre site
• Support 3 mois : Assistance prioritaire incluse
• Support actif : Assistance pendant 90 jours

Vos documents officiels
Votre facture est disponible : {{invoiceLink}}
Facture N°{{invoiceNumber}} - Montant : 146€ HT - Date : {{invoiceDate}}

Besoin d'aide ou d'informations ?
• Contacter le support

Merci de votre confiance,
{{agentName}}
LeadForge AI
{{agentEmail}}
    `
  }
];

// Templates de RAPPEL
export const reminderTemplates: EmailTemplate[] = [
  {
    id: 'reminder1_after_email1',
    name: 'Rappel 1 - Après Email 1',
    category: 'reminder',
    subject: 'Suivi : Votre site web {{companyName}} vous attend',
    variables: ['firstName', 'companyName', 'websiteLink', 'agentName', 'agentEmail'],
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>LeadForge AI - Suivi</title>
      </head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #ffffff; color: #333333; line-height: 1.6;">
        <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 40px; padding-bottom: 30px; border-bottom: 1px solid #e0e0e0;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #2c3e50;">Suivi personnalisé</h1>
            <p style="margin: 8px 0 0 0; font-size: 14px; color: #7f8c8d;">Votre projet {{companyName}}</p>
          </div>
          
          <!-- Content -->
          <div style="margin-bottom: 30px;">
            <h2 style="color: #2c3e50; margin-bottom: 15px; font-size: 20px;">Bonjour {{firstName}},</h2>
            
            <!-- Introduction et contexte -->
            <div style="margin-bottom: 30px;">
              <p style="font-size: 16px; margin-bottom: 15px;">
                <strong>Notre engagement pour votre succès</strong> : Chez {{agentName}}, nous ne considérons pas que notre travail 
                se termine avec l'envoi d'une proposition. Votre projet {{companyName}} mérite une attention particulière, 
                et nous voulons nous assurer que vous disposez de toutes les informations pour prendre la meilleure décision pour votre entreprise.
              </p>
              <p style="font-size: 16px; margin-bottom: 25px;">
                <strong>Pourquoi ce suivi ?</strong> Nous comprenons que lancer un site web est une décision importante. 
                C'est un investissement dans votre avenir digital, et nous voulons répondre à toutes vos questions, 
                partager notre expérience, et vous montrer concrètement comment nous allons transformer votre présence en ligne.
              </p>
            </div>
            
            <!-- Proposition principale -->
            <div style="background-color: #f8f9fa; padding: 25px; margin: 30px 0; border: 1px solid #e9ecef;">
              <h3 style="color: #2c3e50; margin-top: 0; margin-bottom: 15px; font-size: 18px;">Votre site web vous attend</h3>
              <p style="font-size: 16px; margin-bottom: 20px;">
                Je fais suite à notre précédent email concernant votre site web professionnel pour {{companyName}}. 
                J'espère que vous avez eu l'occasion de consulter notre proposition détaillée.
              </p>
              <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: 500;">Découvrez votre futur site :</p>
              <p style="margin: 0 0 20px 0; font-size: 14px; color: #007bff;">
                <a href="{{websiteLink}}" style="color: #007bff; text-decoration: underline;">{{websiteLink}}</a>
              </p>
            </div>
            
            <!-- Valeurs différenciantes -->
            <div style="margin: 30px 0;">
              <h3 style="color: #2c3e50; margin-bottom: 20px; font-size: 18px;">Pourquoi choisir {{agentName}} ?</h3>
              
              <div style="margin-bottom: 25px;">
                <h4 style="color: #2c3e50; margin-bottom: 10px; font-size: 16px;">💰 Économie de 40% garantie</h4>
                <ul style="padding-left: 20px; margin: 0;">
                  <li style="margin-bottom: 12px;"><strong>Prix transparent</strong> : 146€ HT contre 350€ HT minimum chez les agences traditionnelles</li>
                  <li style="margin-bottom: 12px;"><strong>Pas de frais cachés</strong> : Hébergement et domaine inclus la première année</li>
                  <li style="margin-bottom: 0;"><strong>Maintenance économique</strong> : 46€ HT par an uniquement pour l'hébergement</li>
                </ul>
              </div>
              
              <div style="margin-bottom: 25px;">
                <h4 style="color: #2c3e50; margin-bottom: 10px; font-size: 16px;">⚡ Livraison express 2 jours</h4>
                <ul style="padding-left: 20px; margin: 0;">
                  <li style="margin-bottom: 12px;"><strong>Rapidité exceptionnelle</strong> : Site web prêt en 2 jours ouvrés</li>
                  <li style="margin-bottom: 12px;"><strong>Processus optimisé</strong> : Méthodologie éprouvée sans compromis sur la qualité</li>
                  <li style="margin-bottom: 0;"><strong>Avantage concurrentiel</strong> : Soyez en ligne avant vos concurrents</li>
                </ul>
              </div>
              
              <div style="margin-bottom: 0;">
                <h4 style="color: #2c3e50; margin-bottom: 10px; font-size: 16px;">🛡️ Garantie satisfaction 30 jours</h4>
                <ul style="padding-left: 20px; margin: 0;">
                  <li style="margin-bottom: 12px;"><strong>Remboursement complet</strong> : Si pas satisfait, nous vous remboursons intégralement</li>
                  <li style="margin-bottom: 12px;"><strong>Zéro risque</strong> : Testez notre service sans engagement financier</li>
                  <li style="margin-bottom: 0;"><strong>Confiance mutuelle</strong> : Notre réputation repose sur votre satisfaction</li>
                </ul>
              </div>
            </div>
            
            <!-- Témoignages et preuve sociale -->
            <div style="margin: 30px 0;">
              <h3 style="color: #2c3e50; margin-bottom: 20px; font-size: 18px;">Ce que nos clients disent</h3>
              <div style="background-color: #f8f9fa; padding: 20px; margin: 15px 0; border-left: 4px solid #007bff;">
                <p style="margin: 0 0 10px 0; font-style: italic; font-size: 14px;">
                  "LeadForge AI a transformé notre présence en ligne. Site professionnel, rapide, et surtout abordable. 
                  Nous avons économisé plus de 150€ par rapport aux autres devis !"
                </p>
                <p style="margin: 0; font-size: 12px; color: #7f8c8d;">- Marie T., Boutique en ligne</p>
              </div>
              <div style="background-color: #f8f9fa; padding: 20px; margin: 15px 0; border-left: 4px solid #007bff;">
                <p style="margin: 0 0 10px 0; font-style: italic; font-size: 14px;">
                  "Livraison en 6 jours exactement comme promis. Le site est magnifique et nous a déjà apporté 
                  de nouveaux clients. Service exceptionnel !"
                </p>
                <p style="margin: 0; font-size: 12px; color: #7f8c8d;">- Thomas L., Artisan</p>
              </div>
            </div>
            
            <!-- Questions fréquentes -->
            <div style="margin: 30px 0;">
              <h3 style="color: #2c3e50; margin-bottom: 20px; font-size: 18px;">Questions fréquentes</h3>
              <div style="margin-bottom: 20px;">
                <p style="margin: 0 0 10px 0; font-weight: 500; font-size: 14px;">"Que se passe-t-il après le paiement ?"</p>
                <p style="margin: 0; font-size: 14px; color: #666;">Nous vous contactons sous 24h pour valider les détails, puis nous commençons immédiatement le développement selon notre processus 4 étapes.</p>
              </div>
              <div style="margin-bottom: 20px;">
                <p style="margin: 0 0 10px 0; font-weight: 500; font-size: 14px;">"Puis-je modifier mon site après la livraison ?"</p>
                <p style="margin: 0; font-size: 14px; color: #666;">Absolument ! Nous vous formons pendant 2 heures et vous fournissons un accès complet pour gérer votre site en autonomie.</p>
              </div>
              <div style="margin-bottom: 0;">
                <p style="margin: 0 0 10px 0; font-weight: 500; font-size: 14px;">"Et si je ne suis pas satisfait ?"</p>
                <p style="margin: 0; font-size: 14px; color: #666;">Notre garantie satisfaction 30 jours vous protège : remboursement complet sans condition si vous n'êtes pas satisfait.</p>
              </div>
            </div>
            
            <!-- Appel à l'action -->
            <div style="text-align: center; margin: 40px 0;">
              <p style="margin-bottom: 20px; font-size: 16px;">Prêt à discuter de votre projet ?</p>
              <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                <a href="mailto:{{agentEmail}}?subject=Questions {{companyName}}" 
                   style="display: inline-block; background-color: #6c757d; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: 500;">
                  Discuter du projet
                </a>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="text-align: center; padding-top: 30px; border-top: 1px solid #e0e0e0; font-size: 14px; color: #7f8c8d;">
            <p style="margin: 0;">
              Cordialement,<br>
              <strong>{{agentName}}</strong><br>
              {{agentName}}<br>
              <a href="mailto:{{agentEmail}}" style="color: #007bff; text-decoration: none;">{{agentEmail}}</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    textContent: `
Bonjour {{firstName}},

Notre engagement pour votre succès :
Chez {{agentName}}, nous ne considérons pas que notre travail 
se termine avec l'envoi d'une proposition. Votre projet {{companyName}} mérite une attention particulière, 
et nous voulons nous assurer que vous disposez de toutes les informations pour prendre la meilleure décision pour votre entreprise.

Pourquoi ce suivi ?
Nous comprenons que lancer un site web est une décision importante. 
C'est un investissement dans votre avenir digital, et nous voulons répondre à toutes vos questions, 
partager notre expérience, et vous montrer concrètement comment nous allons transformer votre présence en ligne.

Votre site web vous attend
Je fais suite à notre précédent email concernant votre site web professionnel pour {{companyName}}. 
J'espère que vous avez eu l'occasion de consulter notre proposition détaillée.

Découvrez votre futur site : {{websiteLink}}

Pourquoi choisir {{agentName}} ?

💰 Économie de 40% garantie
• Prix transparent : 146€ HT contre 350€ HT minimum chez les agences traditionnelles
• Pas de frais cachés : Hébergement et domaine inclus la première année
• Maintenance économique : 46€ HT par an uniquement pour l'hébergement

⚡ Livraison express 2 jours
• Rapidité exceptionnelle : Site web prêt en 2 jours ouvrés
• Processus optimisé : Méthodologie éprouvée sans compromis sur la qualité
• Avantage concurrentiel : Soyez en ligne avant vos concurrents

🛡️ Garantie satisfaction 30 jours
• Remboursement complet : Si pas satisfait, nous vous remboursons intégralement
• Zéro risque : Testez notre service sans engagement financier
• Confiance mutuelle : Notre réputation repose sur votre satisfaction

Ce que nos clients disent :
"LeadForge AI a transformé notre présence en ligne. Site professionnel, rapide, et surtout abordable. 
Nous avons économisé plus de 150€ par rapport aux autres devis !"
- Marie T., Boutique en ligne

"Livraison en 6 jours exactement comme promis. Le site est magnifique et nous a déjà apporté 
de nouveaux clients. Service exceptionnel !"
- Thomas L., Artisan

Questions fréquentes :
"Que se passe-t-il après le paiement ?"
Nous vous contactons sous 24h pour valider les détails, puis nous commençons immédiatement le développement selon notre processus 4 étapes.

"Puis-je modifier mon site après la livraison ?"
Absolument ! Nous vous formons pendant 2 heures et vous fournissons un accès complet pour gérer votre site en autonomie.

"Et si je ne suis pas satisfait ?"
Notre garantie satisfaction 30 jours vous protège : remboursement complet sans condition si vous n'êtes pas satisfait.

Prêt à discuter de votre projet ?
• Discuter du projet

Cordialement,
{{agentName}}
LeadForge AI
{{agentEmail}}
    `
  },

  {
    id: 'reminder2_before_expiry',
    name: 'Rappel 2 - Dernière Chance',
    category: 'reminder',
    subject: 'Dernière chance : Votre offre spéciale expire bientôt',
    variables: ['firstName', 'companyName', 'devisLink', 'paymentLink', 'price', 'agentName', 'agentEmail', 'expiryDate'],
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>LeadForge AI - Dernière Chance</title>
      </head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #ffffff; color: #333333; line-height: 1.6;">
        <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 40px; padding-bottom: 30px; border-bottom: 1px solid #e0e0e0;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #dc3545;">Dernière chance</h1>
            <p style="margin: 8px 0 0 0; font-size: 14px; color: #7f8c8d;">Offre spéciale expirant le {{expiryDate}}</p>
          </div>
          
          <!-- Content -->
          <div style="margin-bottom: 30px;">
            <h2 style="color: #2c3e50; margin-bottom: 15px; font-size: 20px;">Bonjour {{firstName}},</h2>
            
            <!-- Introduction urgente -->
            <div style="margin-bottom: 30px;">
              <p style="font-size: 16px; margin-bottom: 15px;">
                <strong>Un message important pour votre entreprise</strong> : Je vous écris aujourd'hui avec un certain sentiment d'urgence, 
                car nous sommes à un moment décisif pour votre projet {{companyName}}. Les opportunités exceptionnelles sont rares, 
                et celle que nous vous avons proposée est sur le point de disparaître définitivement.
              </p>
              <p style="font-size: 16px; margin-bottom: 25px;">
                <strong>Pourquoi cette insistance ?</strong> Parce que nous avons constaté que trop d'entreprises manquent 
                leur chance de se développer en ligne à cause d'hésitations ou de procrastination. Votre présence digitale 
                n'est pas une option, c'est une nécessité stratégique pour votre croissance future.
              </p>
            </div>
            
            <!-- Avertissement urgence -->
            <div style="background-color: #f8d7da; padding: 25px; margin: 30px 0; text-align: center; border: 1px solid #f5c6cb;">
              <h3 style="color: #721c24; margin-top: 0; margin-bottom: 15px; font-size: 18px;">⚠️ Offre expire le {{expiryDate}}</h3>
              <p style="font-size: 16px; margin-bottom: 20px; color: #721c24;">
                C'est votre dernière opportunité ! Notre offre spéciale pour votre site web {{companyName}} expire dans quelques jours. 
                Ne manquez pas cette chance d'économiser 40% sur votre présence en ligne professionnelle.
              </p>
              <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: 500; color: #721c24;">Finaliser maintenant :</p>
              <p style="margin: 0 0 20px 0; font-size: 14px; color: #dc3545;">
                <a href="{{paymentLink}}" style="color: #dc3545; text-decoration: underline; font-weight: 600;">{{paymentLink}}</a>
              </p>
            </div>
            
            <!-- Impact détaillé de la perte -->
            <div style="margin: 30px 0;">
              <h3 style="color: #2c3e50; margin-bottom: 20px; font-size: 18px;">Ce que vous risquez de perdre concrètement</h3>
              
              <div style="margin-bottom: 25px;">
                <h4 style="color: #dc3545; margin-bottom: 10px; font-size: 16px;">💸 Impact financier immédiat</h4>
                <ul style="padding-left: 20px; margin: 0;">
                  <li style="margin-bottom: 12px;"><strong>Perte de 204€</strong> : Le même site coûtera 350€ HT au lieu de 146€ HT après expiration</li>
                  <li style="margin-bottom: 12px;"><strong>Hébergement payant</strong> : Plus d'hébergement gratuit la première année (+60€)</li>
                  <li style="margin-bottom: 0;"><strong>Domaine facturé</strong> : Le nom de domaine ne sera plus inclus (+20€)</li>
                </ul>
              </div>
              
              <div style="margin-bottom: 25px;">
n                <h4 style="color: #dc3545; margin-bottom: 10px; font-size: 16px;">⏰ Impact temporel</h4>
                <ul style="padding-left: 20px; margin: 0;">
                  <li style="margin-bottom: 12px;"><strong>Attente 3-4 semaines</strong> : Au lieu de 2 jours avec notre offre express</li>
                  <li style="margin-bottom: 12px;"><strong>Perte d'opportunités</strong> : Chaque semaine sans site = clients potentiels perdus</li>
                  <li style="margin-bottom: 0;"><strong>Concurrence avancée</strong> : Vos concurrents pourraient déjà être en ligne</li>
                </ul>
              </div>
              
              <div style="margin-bottom: 0;">
                <h4 style="color: #dc3545; margin-bottom: 10px; font-size: 16px;">🛡️ Impact sur la sécurité</h4>
                <ul style="padding-left: 20px; margin: 0;">
                  <li style="margin-bottom: 12px;"><strong>Garantie perdue</strong> : Plus de garantie satisfaction 30 jours</li>
                  <li style="margin-bottom: 12px;"><strong>Risque financier</strong> : Engagement sans possibilité de remboursement</li>
                  <li style="margin-bottom: 0;"><strong>Support limité</strong> : Assistance standard au lieu du support prioritaire</li>
                </ul>
              </div>
            </div>
            
            <!-- Comparaison avant/après -->
            <div style="margin: 30px 0;">
              <h3 style="color: #2c3e50; margin-bottom: 20px; font-size: 18px;">Comparaison : Maintenant vs Plus tard</h3>
              <div style="background-color: #f8f9fa; padding: 20px; margin: 15px 0; border: 1px solid #e9ecef;">
                <p style="margin: 0 0 10px 0; font-weight: 500; color: #28a745;">✅ AVEC L'OFFRE ACTUELLE (expire le {{expiryDate}})</p>
                <ul style="margin: 0; padding-left: 20px; font-size: 14px;">
                  <li>Investissement : 146€ HT (économie de 204€)</li>
                  <li>Livraison : 2 jours ouvrés</li>
                  <li>Hébergement : 1 an gratuit</li>
                  <li>Domaine : Inclus gratuitement</li>
                  <li>Garantie : 30 jours satisfaction</li>
                  <li>Support : Prioritaire 3 mois</li>
                </ul>
              </div>
              <div style="background-color: #fff3cd; padding: 20px; margin: 15px 0; border: 1px solid #ffeaa7;">
                <p style="margin: 0 0 10px 0; font-weight: 500; color: #856404;">❌ APRÈS EXPIRATION (à partir du {{expiryDate}})</p>
                <ul style="margin: 0; padding-left: 20px; font-size: 14px;">
                  <li>Investissement : 350€ HT minimum</li>
                  <li>Livraison : 3-4 semaines standard</li>
                  <li>Hébergement : 60€ HT par an</li>
                  <li>Domaine : 20€ HT par an</li>
                  <li>Garantie : Standard 14 jours</li>
                  <li>Support : Standard 30 jours</li>
                </ul>
              </div>
            </div>
            
            <!-- Témoignage d'urgence -->
            <div style="margin: 30px 0;">
              <div style="background-color: #f8f9fa; padding: 20px; border-left: 4px solid #dc3545;">
                <p style="margin: 0 0 10px 0; font-style: italic; font-size: 14px;">
                  "J'ai hésité et perdu l'offre spéciale. J'ai dû payer 150€ de plus pour le même site, 
                  et attendre 3 semaines au lieu de 2 jours. Ne faites pas ma même erreur !"
                </p>
                <p style="margin: 0; font-size: 12px; color: #7f8c8d;">- Alexandre P., Restaurant (regrette son attente)</p>
              </div>
            </div>
            
            <!-- Appel à l'action final -->
            <div style="text-align: center; margin: 40px 0;">
              <p style="margin-bottom: 20px; font-size: 16px; font-weight: 500;">Ne laissez pas cette opportunité vous échapper !</p>
              <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                <a href="{{paymentLink}}" 
                   style="display: inline-block; background-color: #dc3545; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: 500;">
                  Payer maintenant
                </a>
                <a href="mailto:{{agentEmail}}?subject=Urgence {{companyName}}" 
                   style="display: inline-block; background-color: #6c757d; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: 500;">
                  Contacter d'urgence
                </a>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="text-align: center; padding-top: 30px; border-top: 1px solid #e0e0e0; font-size: 14px; color: #7f8c8d;">
            <p style="margin: 0;">
              Cordialement,<br>
              <strong>{{agentName}}</strong><br>
              {{agentName}}<br>
              <a href="mailto:{{agentEmail}}" style="color: #007bff; text-decoration: none;">{{agentEmail}}</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    textContent: `
Bonjour {{firstName}},

Un message important pour votre entreprise :
Je vous écris aujourd'hui avec un certain sentiment d'urgence, 
parce que nous sommes à un moment décisif pour votre projet {{companyName}}. Les opportunités exceptionnelles sont rares, 
et celle que nous vous avons proposée est sur le point de disparaître définitivement.

Pourquoi cette insistance ?
Parce que nous avons constaté que trop d'entreprises manquent 
leur chance de se développer en ligne à cause d'hésitations ou de procrastination. Votre présence digitale 
n'est pas une option, c'est une nécessité stratégique pour votre croissance future.

⚠️ Offre expire le {{expiryDate}}
C'est votre dernière opportunité ! Notre offre spéciale pour votre site web {{companyName}} expire dans quelques jours. 
Ne manquez pas cette chance d'économiser 40% sur votre présence en ligne professionnelle.

Finaliser maintenant : {{paymentLink}}

Ce que vous risquez de perdre concrètement :

💸 Impact financier immédiat
• Perte de 204€ : Le même site coûtera 350€ HT au lieu de 146€ HT après expiration
• Hébergement payant : Plus d'hébergement gratuit la première année (+60€)
• Domaine facturé : Le nom de domaine ne sera plus inclus (+20€)

⏰ Impact temporel
• Attente 3-4 semaines : Au lieu de 7 jours avec notre offre express
• Perte d'opportunités : Chaque semaine sans site = clients potentiels perdus
• Concurrence avancée : Vos concurrents pourraient déjà être en ligne

🛡️ Impact sur la sécurité
• Garantie perdue : Plus de garantie satisfaction 30 jours
• Risque financier : Engagement sans possibilité de remboursement
• Support limité : Assistance standard au lieu du support prioritaire

Comparaison : Maintenant vs Plus tard

✅ AVEC L'OFFRE ACTUELLE (expire le {{expiryDate}})
• Investissement : 146€ HT (économie de 204€)
• Livraison : 2 jours ouvrés
• Hébergement : 1 an gratuit
• Domaine : Inclus gratuitement
• Garantie : 30 jours satisfaction
• Support : Prioritaire 3 mois

❌ APRÈS EXPIRATION (à partir du {{expiryDate}})
• Investissement : 350€ HT minimum
• Livraison : 3-4 semaines standard
• Hébergement : 60€ HT par an
• Domaine : 20€ HT par an
• Garantie : Standard 14 jours
• Support : Standard 30 jours

Témoignage d'urgence :
"J'ai hésité et perdu l'offre spéciale. J'ai dû payer 150€ de plus pour le même site, 
et attendre 3 semaines au lieu de 7 jours. Ne faites pas ma même erreur !"
- Alexandre P., Restaurant (regrette son attente)

Ne laissez pas cette opportunité vous échapper !
• Payer maintenant
• Contacter d'urgence

Cordialement,
{{agentName}}
LeadForge AI
{{agentEmail}}
    `
  }
];

// Fonction utilitaire pour récupérer un template par ID
export function getTemplateById(id: string): EmailTemplate | undefined {
  const allTemplates = [...salesTemplates, ...reminderTemplates];
  return allTemplates.find(template => template.id === id);
}

// Exporter tous les templates
export const allTemplates = [...salesTemplates, ...reminderTemplates];
