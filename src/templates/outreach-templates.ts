// ============================================================
// LeadForge AI - Templates Email Outreach Agent
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
    subject: 'Votre site web professionnel {{companyName}} est prêt 🚀',
    variables: ['firstName', 'companyName', 'websiteLink', 'price', 'agentName', 'agentEmail'],
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>LeadForge AI - Votre site web</title>
      </head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #D4500A, #E67E22); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">🚀 LeadForge AI</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">Votre présence en ligne moderne</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 30px; border: 1px solid #ddd; border-top: none;">
            <h2 style="color: #333; margin-bottom: 20px;">Bonjour {{firstName}},</h2>
            
            <p style="font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 20px;">
              J'ai le plaisir de vous présenter votre site web personnalisé que nous avons créé spécialement pour {{companyName}} :
            </p>
            
            <!-- Site Preview -->
            <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin: 25px 0; text-align: center; border: 2px solid #e9ecef;">
              <h3 style="color: #D4500A; margin-top: 0; margin-bottom: 15px;">🔗 Votre site est prêt !</h3>
              <p style="margin-bottom: 20px; color: #666;">Découvrez votre nouvelle présence en ligne</p>
              <a href="{{websiteLink}}" 
                 style="background: #D4500A; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold; font-size: 16px;"
                 target="_blank">
                Voir mon site web →
              </a>
            </div>
            
            <!-- Features -->
            <div style="background: #f0f8ff; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #D4500A;">
              <h4 style="color: #333; margin-top: 0; margin-bottom: 15px;">📦 Ce qui est inclus dans notre offre :</h4>
              <ul style="color: #555; line-height: 1.8; margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;">✅ <strong>Design moderne et responsive</strong> - Compatible tous appareils</li>
                <li style="margin-bottom: 8px;">✅ <strong>Optimisation SEO complète</strong> - Meilleur référencement Google</li>
                <li style="margin-bottom: 8px;">✅ <strong>Formation équipe</strong> - 1h de formation incluse</li>
                <li style="margin-bottom: 8px;">✅ <strong>Support 24/7</strong> - Assistance pendant 30 jours</li>
                <li style="margin-bottom: 0;">✅ <strong>Hébergement offert</strong> - Premier mois gratuit</li>
              </ul>
            </div>
            
            <!-- Pricing -->
            <div style="background: #fff3cd; padding: 25px; border-radius: 8px; margin: 25px 0; border: 2px solid #ffeaa7;">
              <h4 style="color: #856404; margin-top: 0; margin-bottom: 15px;">💰 Investissement :</h4>
              <div style="text-align: center;">
                <p style="font-size: 32px; font-weight: bold; color: #D4500A; margin: 15px 0;">
                  {{price}}€ HT
                </p>
                <p style="color: #856404; margin-bottom: 15px; font-size: 14px;">
                  Paiement en 1 ou 3 fois sans frais
                </p>
                <div style="background: #28a745; color: white; padding: 8px 16px; border-radius: 20px; display: inline-block; font-size: 12px;">
                  Économisez 40% par rapport au marché
                </div>
              </div>
            </div>
            
            <!-- CTA -->
            <div style="text-align: center; margin: 35px 0;">
              <p style="color: #666; margin-bottom: 20px; font-size: 16px;">
                Souhaitez-vous en savoir plus sur notre offre ?
              </p>
              <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                <a href="mailto:{{agentEmail}}?subject=Informations site web {{companyName}}&body=Bonjour, je souhaite en savoir plus sur le site web pour {{companyName}}." 
                   style="background: #28a745; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold; font-size: 16px;">
                  📧 Je veux en savoir plus
                </a>
                <a href="tel:+33612345678" 
                   style="background: #007bff; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold; font-size: 16px;">
                  📞 Appelez-moi
                </a>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #f8f9fa; padding: 25px; text-align: center; border-radius: 0 0 10px 10px; border: 1px solid #ddd; border-top: none;">
            <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.5;">
              Cordialement,<br>
              <strong>{{agentName}}</strong><br>
              <span style="color: #D4500A;">LeadForge AI</span> • Votre partenaire digital<br>
              <a href="mailto:{{agentEmail}}" style="color: #D4500A; text-decoration: none;">{{agentEmail}}</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    textContent: `
Bonjour {{firstName}},

J'ai le plaisir de vous présenter votre site web personnalisé que nous avons créé spécialement pour {{companyName}}.

🔗 Votre site est prêt : {{websiteLink}}

Ce qui est inclus dans notre offre :
✅ Design moderne et responsive - Compatible tous appareils
✅ Optimisation SEO complète - Meilleur référencement Google  
✅ Formation équipe - 1h de formation incluse
✅ Support 24/7 - Assistance pendant 30 jours
✅ Hébergement offert - Premier mois gratuit

💰 Investissement : {{price}}€ HT
Paiement en 1 ou 3 fois sans frais

Souhaitez-vous en savoir plus ?
📧 Répondez à cet email ou appelez-nous

Cordialement,
{{agentName}}
LeadForge AI • Votre partenaire digital
{{agentEmail}}
    `
  },

  {
    id: 'email2_devis',
    name: 'Email 2 - Devis et Paiement',
    category: 'sale',
    subject: '📋 Devis et proposition pour votre site web {{companyName}}',
    variables: ['firstName', 'companyName', 'devisLink', 'paymentLink', 'price', 'agentName', 'agentEmail', 'validityDays'],
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>LeadForge AI - Devis Site Web</title>
      </head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #28a745, #20c997); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">📋 Votre Devis Personnalisé</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">Proposition pour {{companyName}}</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 30px; border: 1px solid #ddd; border-top: none;">
            <h2 style="color: #333; margin-bottom: 20px;">Bonjour {{firstName}},</h2>
            
            <p style="font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 25px;">
              Excellente nouvelle ! Suite à notre conversation, voici votre devis personnalisé pour votre site web professionnel.
            </p>
            
            <!-- Devis Download -->
            <div style="background: #e8f5e8; padding: 25px; border-radius: 8px; margin: 25px 0; text-align: center; border: 2px solid #28a745;">
              <h3 style="color: #28a745; margin-top: 0; margin-bottom: 15px;">📄 Votre Devis Détaillé</h3>
              <p style="margin-bottom: 20px; color: #666;">Téléchargez votre devis complet avec toutes les prestations</p>
              <a href="{{devisLink}}" 
                 style="background: #28a745; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold; font-size: 16px;"
                 target="_blank">
                📥 Télécharger le devis PDF →
              </a>
            </div>
            
            <!-- Process Timeline -->
            <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin: 25px 0;">
              <h4 style="color: #333; margin-top: 0; margin-bottom: 20px;">⏱️ Notre Processus de Création</h4>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <div style="text-align: center; flex: 1;">
                  <div style="background: #D4500A; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; font-weight: bold;">1</div>
                  <p style="margin: 0; font-size: 12px; color: #666;">Validation<br/>24h</p>
                </div>
                <div style="flex: 0 0 30px; text-align: center; color: #ddd; font-size: 20px;">→</div>
                <div style="text-align: center; flex: 1;">
                  <div style="background: #D4500A; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; font-weight: bold;">2</div>
                  <p style="margin: 0; font-size: 12px; color: #666;">Design<br/>48h</p>
                </div>
                <div style="flex: 0 0 30px; text-align: center; color: #ddd; font-size: 20px;">→</div>
                <div style="text-align: center; flex: 1;">
                  <div style="background: #D4500A; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; font-weight: bold;">3</div>
                  <p style="margin: 0; font-size: 12px; color: #666;">Intégration<br/>72h</p>
                </div>
                <div style="flex: 0 0 30px; text-align: center; color: #ddd; font-size: 20px;">→</div>
                <div style="text-align: center; flex: 1;">
                  <div style="background: #D4500A; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; font-weight: bold;">4</div>
                  <p style="margin: 0; font-size: 12px; color: #666;">Mise en ligne<br/>96h</p>
                </div>
              </div>
            </div>
            
            <!-- Pricing Summary -->
            <div style="background: #fff3cd; padding: 25px; border-radius: 8px; margin: 25px 0; border: 2px solid #ffeaa7;">
              <h4 style="color: #856404; margin-top: 0; margin-bottom: 15px;">💰 Récapitulatif Financier</h4>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <span style="color: #666; font-size: 16px;">Site web professionnel</span>
                <span style="font-size: 20px; font-weight: bold; color: #D4500A;">{{price}}€ HT</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <span style="color: #666; font-size: 16px;">Hébergement 1 mois</span>
                <span style="font-size: 16px; color: #28a745; font-weight: bold;">OFFERT</span>
              </div>
              <div style="border-top: 2px solid #ddd; padding-top: 15px; margin-top: 15px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 18px; font-weight: bold;">Total</span>
                  <span style="font-size: 24px; font-weight: bold; color: #D4500A;">{{price}}€ HT</span>
                </div>
              </div>
            </div>
            
            <!-- Urgency -->
            <div style="background: #f8d7da; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #dc3545;">
              <h4 style="color: #721c24; margin-top: 0; margin-bottom: 10px;">⏰ Offre Limitée</h4>
              <p style="margin: 0; color: #721c24; font-size: 14px;">
                Cette proposition est valable pendant <strong>{{validityDays}} jours</strong>. 
                Après cette date, les tarifs pourront être révisés.
              </p>
            </div>
            
            <!-- CTA Payment -->
            <div style="text-align: center; margin: 35px 0;">
              <p style="color: #666; margin-bottom: 20px; font-size: 16px;">
                Prêt à lancer votre projet ? Finalisez votre commande en quelques clics :
              </p>
              <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                <a href="{{paymentLink}}" 
                   style="background: #D4500A; color: white; padding: 18px 35px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold; font-size: 18px; box-shadow: 0 4px 6px rgba(212, 80, 10, 0.3);">
                  💳 Payer maintenant →
                </a>
                <a href="mailto:{{agentEmail}}?subject=Questions devis {{companyName}}" 
                   style="background: #6c757d; color: white; padding: 18px 35px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold; font-size: 18px;">
                  ❓ Poser une question
                </a>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #f8f9fa; padding: 25px; text-align: center; border-radius: 0 0 10px 10px; border: 1px solid #ddd; border-top: none;">
            <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.5;">
              Cordialement,<br>
              <strong>{{agentName}}</strong><br>
              <span style="color: #D4500A;">LeadForge AI</span> • Votre partenaire digital<br>
              <a href="mailto:{{agentEmail}}" style="color: #D4500A; text-decoration: none;">{{agentEmail}}</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    textContent: `
Bonjour {{firstName}},

Excellente nouvelle ! Suite à notre conversation, voici votre devis personnalisé pour votre site web professionnel.

📄 Votre Devis Détaillé : {{devisLink}}

⏱️ Notre Processus de Création :
1. Validation du devis (24h)
2. Design initial (48h)  
3. Intégration contenu (72h)
4. Mise en ligne (96h)

💰 Récapitulatif Financier :
Site web professionnel : {{price}}€ HT
Hébergement 1 mois : OFFERT
Total : {{price}}€ HT

⏰ Cette proposition est valable pendant {{validityDays}} jours.

Prêt à lancer votre projet ?
💳 Payer maintenant : {{paymentLink}}

Cordialement,
{{agentName}}
LeadForge AI • Votre partenaire digital
{{agentEmail}}
    `
  },

  {
    id: 'email3_confirmation',
    name: 'Email 3 - Confirmation Paiement',
    category: 'sale',
    subject: '🎉 Confirmation paiement - Votre site web {{companyName}}',
    variables: ['firstName', 'companyName', 'amount', 'invoiceLink', 'clientPortalLink', 'agentName', 'agentEmail', 'deliveryDate'],
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>LeadForge AI - Confirmation Paiement</title>
      </head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #007bff, #0056b3); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">🎉 Paiement Confirmé !</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">Merci pour votre confiance</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 30px; border: 1px solid #ddd; border-top: none;">
            <h2 style="color: #333; margin-bottom: 20px;">Bonjour {{firstName}},</h2>
            
            <p style="font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 25px;">
              <strong>Excellent choix !</strong> Nous avons bien reçu votre paiement de <strong>{{amount}}€</strong>. 
              Votre projet pour {{companyName}} est maintenant officiellement lancé !
            </p>
            
            <!-- Payment Confirmation -->
            <div style="background: #e8f5e8; padding: 25px; border-radius: 8px; margin: 25px 0; text-align: center; border: 2px solid #28a745;">
              <h3 style="color: #28a745; margin-top: 0; margin-bottom: 15px;">✅ Paiement Validé</h3>
              <div style="font-size: 24px; font-weight: bold; color: #28a745; margin-bottom: 10px;">
                {{amount}}€ HT
              </div>
              <p style="margin: 0; color: #666;">Transaction réussie le ${new Date().toLocaleDateString('fr-FR')}</p>
            </div>
            
            <!-- Next Steps -->
            <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin: 25px 0;">
              <h4 style="color: #333; margin-top: 0; margin-bottom: 20px;">🚀 Prochaines Étapes</h4>
              <div style="space-y: 15px;">
                <div style="display: flex; align-items: start; margin-bottom: 20px;">
                  <div style="background: #007bff; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; flex-shrink: 0; font-weight: bold;">1</div>
                  <div>
                    <h5 style="margin: 0 0 5px 0; color: #333;">Contact Designer</h5>
                    <p style="margin: 0; color: #666; font-size: 14px;">Demain matin - Notre designer vous contactera pour discuter de vos préférences</p>
                  </div>
                </div>
                <div style="display: flex; align-items: start; margin-bottom: 20px;">
                  <div style="background: #007bff; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; flex-shrink: 0; font-weight: bold;">2</div>
                  <div>
                    <h5 style="margin: 0 0 5px 0; color: #333;">Design Initial</h5>
                    <p style="margin: 0; color: #666; font-size: 14px;">Dans 48h - Vous recevrez la première maquette de votre site</p>
                  </div>
                </div>
                <div style="display: flex; align-items: start; margin-bottom: 20px;">
                  <div style="background: #007bff; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; flex-shrink: 0; font-weight: bold;">3</div>
                  <div>
                    <h5 style="margin: 0 0 5px 0; color: #333;">Mise en Ligne</h5>
                    <p style="margin: 0; color: #666; font-size: 14px;">Le {{deliveryDate}} - Votre site web sera officiellement en ligne !</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Invoice -->
            <div style="background: #fff3cd; padding: 25px; border-radius: 8px; margin: 25px 0; text-align: center; border: 2px solid #ffeaa7;">
              <h4 style="color: #856404; margin-top: 0; margin-bottom: 15px;">📄 Votre Facture</h4>
              <p style="margin-bottom: 20px; color: #666;">Votre facture détaillée est disponible pour téléchargement</p>
              <a href="{{invoiceLink}}" 
                 style="background: #ffc107; color: #212529; padding: 12px 25px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold; font-size: 14px;"
                 target="_blank">
                📥 Télécharger la facture →
              </a>
            </div>
            
            <!-- Client Portal -->
            <div style="background: #e3f2fd; padding: 25px; border-radius: 8px; margin: 25px 0; text-align: center; border: 2px solid #2196f3;">
              <h4 style="color: #1976d2; margin-top: 0; margin-bottom: 15px;">🔐 Votre Espace Client</h4>
              <p style="margin-bottom: 20px; color: #666;">Suivez l'avancement de votre projet en temps réel</p>
              <a href="{{clientPortalLink}}" 
                 style="background: #2196f3; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold; font-size: 14px;"
                 target="_blank">
                👤 Accéder à mon espace →
              </a>
            </div>
            
            <!-- Support -->
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #007bff;">
              <h4 style="color: #333; margin-top: 0; margin-bottom: 10px;">💬 Besoin d'aide ?</h4>
              <p style="margin: 0; color: #666; font-size: 14px;">
                Notre équipe est à votre disposition 7j/7 pour répondre à toutes vos questions.
              </p>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #f8f9fa; padding: 25px; text-align: center; border-radius: 0 0 10px 10px; border: 1px solid #ddd; border-top: none;">
            <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.5;">
              Cordialement,<br>
              <strong>{{agentName}}</strong><br>
              <span style="color: #D4500A;">LeadForge AI</span> • Votre partenaire digital<br>
              <a href="mailto:{{agentEmail}}" style="color: #D4500A; text-decoration: none;">{{agentEmail}}</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    textContent: `
Bonjour {{firstName}},

Excellent choix ! Nous avons bien reçu votre paiement de {{amount}}€. 
Votre projet pour {{companyName}} est maintenant officiellement lancé !

✅ Paiement Validé : {{amount}}€ HT
Transaction réussie le ${new Date().toLocaleDateString('fr-FR')}

🚀 Prochaines Étapes :
1. Contact Designer - Demain matin
2. Design Initial - Dans 48h
3. Mise en Ligne - Le {{deliveryDate}}

📄 Votre Facture : {{invoiceLink}}
🔐 Votre Espace Client : {{clientPortalLink}}

Notre équipe est à votre disposition 7j/7 pour répondre à toutes vos questions.

Cordialement,
{{agentName}}
LeadForge AI • Votre partenaire digital
{{agentEmail}}
    `
  }
];

// Templates de RAPPEL
export const reminderTemplates: EmailTemplate[] = [
  {
    id: 'reminder1_after_email1',
    name: 'Rappel 1 - Après Email 1 (3 jours)',
    category: 'reminder',
    subject: '📋 Suivi : Votre site web professionnel {{companyName}}',
    variables: ['firstName', 'companyName', 'websiteLink', 'agentName', 'agentEmail'],
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>LeadForge AI - Suivi</title>
      </head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #6c757d, #495057); color: white; padding: 25px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">📋 Suivi Personnalisé</h1>
            <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 14px;">Votre projet {{companyName}}</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 25px; border: 1px solid #ddd; border-top: none;">
            <h2 style="color: #333; margin-bottom: 15px;">Bonjour {{firstName}},</h2>
            
            <p style="font-size: 15px; line-height: 1.6; color: #555; margin-bottom: 20px;">
              Je me permets de vous contacter suite à ma proposition concernant votre site web professionnel pour {{companyName}}.
            </p>
            
            <p style="font-size: 15px; line-height: 1.6; color: #555; margin-bottom: 25px;">
              Avez-vous eu l'occasion de consulter votre site personnalisé ? J'aimerais m'assurer que tout correspond à vos attentes.
            </p>
            
            <!-- Site Reminder -->
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; border: 1px solid #e9ecef;">
              <h4 style="color: #D4500A; margin-top: 0; margin-bottom: 10px;">🔗 Votre Site Web</h4>
              <p style="margin-bottom: 15px; color: #666; font-size: 14px;">Rediscoverez votre présence en ligne</p>
              <a href="{{websiteLink}}" 
                 style="background: #D4500A; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold; font-size: 14px;"
                 target="_blank">
                Voir le site →
              </a>
            </div>
            
            <!-- Questions Help -->
            <div style="background: #e8f4fd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #007bff;">
              <h4 style="color: #007bff; margin-top: 0; margin-bottom: 10px;">❓ Des Questions ?</h4>
              <p style="margin: 0; color: #555; font-size: 14px;">
                N'hésitez pas à me contacter si vous avez la moindre question sur :
                <ul style="margin: 10px 0 0 20px; color: #555; font-size: 14px;">
                  <li>Les fonctionnalités du site</li>
                  <li>Les options de personnalisation</li>
                  <li>Le processus de création</li>
                  <li>Les modalités de paiement</li>
                </ul>
              </p>
            </div>
            
            <!-- CTA -->
            <div style="text-align: center; margin: 25px 0;">
              <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
                <a href="mailto:{{agentEmail}}?subject=Intéressé site web {{companyName}}" 
                   style="background: #28a745; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold; font-size: 14px;">
                  ✅ Je suis intéressé
                </a>
                <a href="mailto:{{agentEmail}}?subject=Questions site web {{companyName}}" 
                   style="background: #007bff; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold; font-size: 14px;">
                  ❓ J'ai des questions
                </a>
                <a href="mailto:{{agentEmail}}?subject=Pas intéressé {{companyName}}" 
                   style="background: #6c757d; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold; font-size: 14px;">
                  ❌ Pas intéressé
                </a>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; border: 1px solid #ddd; border-top: none;">
            <p style="margin: 0; color: #666; font-size: 13px; line-height: 1.4;">
              Cordialement,<br>
              <strong>{{agentName}}</strong><br>
              <span style="color: #D4500A;">LeadForge AI</span><br>
              <a href="mailto:{{agentEmail}}" style="color: #D4500A; text-decoration: none;">{{agentEmail}}</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    textContent: `
Bonjour {{firstName}},

Je me permets de vous contacter suite à ma proposition concernant votre site web professionnel pour {{companyName}}.

Avez-vous eu l'occasion de consulter votre site personnalisé ? 
🔗 Rediscoverez votre site : {{websiteLink}}

❓ Des Questions ?
- Les fonctionnalités du site
- Les options de personnalisation  
- Le processus de création
- Les modalités de paiement

✅ Je suis intéressé
❓ J'ai des questions
❌ Pas intéressé

Répondez simplement à cet email avec votre choix.

Cordialement,
{{agentName}}
LeadForge AI
{{agentEmail}}
    `
  },

  {
    id: 'reminder2_before_expiry',
    name: 'Rappel 2 - Avant Expiration Devis (2 jours avant fin)',
    category: 'reminder',
    subject: '⏰ Dernière chance : Votre devis {{companyName}} expire bientôt',
    variables: ['firstName', 'companyName', 'devisLink', 'paymentLink', 'expiryDate', 'agentName', 'agentEmail'],
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>LeadForge AI - Dernière Chance</title>
      </head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #dc3545, #c82333); color: white; padding: 25px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">⏰ Dernière Chance</h1>
            <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 14px;">Votre offre expire le {{expiryDate}}</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 25px; border: 1px solid #ddd; border-top: none;">
            <h2 style="color: #333; margin-bottom: 15px;">Bonjour {{firstName}},</h2>
            
            <p style="font-size: 15px; line-height: 1.6; color: #555; margin-bottom: 20px;">
              <strong>Attention !</strong> Votre devis personnalisé pour le site web de {{companyName}} expire dans <strong>48 heures</strong>.
            </p>
            
            <p style="font-size: 15px; line-height: 1.6; color: #555; margin-bottom: 25px;">
              Ne manquez pas cette opportunité de bénéficier de nos conditions avantageuses. Après cette date, les tarifs seront révisés à la hausse.
            </p>
            
            <!-- Urgency Box -->
            <div style="background: #f8d7da; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; border: 2px solid #f5c6cb;">
              <h4 style="color: #721c24; margin-top: 0; margin-bottom: 10px;">⚠️ Offre Expirant Bientôt</h4>
              <div style="font-size: 18px; font-weight: bold; color: #dc3545; margin-bottom: 10px;">
                Il reste moins de 48 heures !
              </div>
              <p style="margin: 0; color: #721c24; font-size: 14px;">
                Après le {{expiryDate}}, cette offre ne sera plus disponible
              </p>
            </div>
            
            <!-- Quick Actions -->
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h4 style="color: #333; margin-top: 0; margin-bottom: 15px;">🚀 Actions Rapides</h4>
              <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                <a href="{{paymentLink}}" 
                   style="background: #28a745; color: white; padding: 15px 20px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold; font-size: 14px; text-align: center;">
                  💳 Payer maintenant<br/><small>et bloquer le prix</small>
                </a>
                <a href="{{devisLink}}" 
                   style="background: #007bff; color: white; padding: 15px 20px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold; font-size: 14px; text-align: center;">
                  📄 Voir le devis<br/><small>avant expiration</small>
                </a>
              </div>
            </div>
            
            <!-- Benefits Reminder -->
            <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
              <h4 style="color: #28a745; margin-top: 0; margin-bottom: 10px;">✅ Ce que vous risquez de perdre :</h4>
              <ul style="margin: 0; padding-left: 20px; color: #555; font-size: 14px;">
                <li>Prix actuel garanti (-40% vs marché)</li>
                <li>Hébergement premier mois offert</li>
                <li>Formation équipe incluse</li>
                <li>Support prioritaire 30 jours</li>
                <li>Livraison garantie en 96h</li>
              </ul>
            </div>
            
            <!-- Final CTA -->
            <div style="text-align: center; margin: 25px 0;">
              <p style="color: #666; margin-bottom: 15px; font-size: 15px;">
                <strong>Dernière étape :</strong> Choisissez votre option ci-dessous
              </p>
              <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
                <a href="{{paymentLink}}" 
                   style="background: #D4500A; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold; font-size: 16px;">
                  🚀 Je valide mon projet
                </a>
                <a href="mailto:{{agentEmail}}?subject=Délai devis {{companyName}}" 
                   style="background: #ffc107; color: #212529; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold; font-size: 16px;">
                  ⏰ Je demande un délai
                </a>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; border: 1px solid #ddd; border-top: none;">
            <p style="margin: 0; color: #666; font-size: 13px; line-height: 1.4;">
              Cordialement,<br>
              <strong>{{agentName}}</strong><br>
              <span style="color: #D4500A;">LeadForge AI</span><br>
              <a href="mailto:{{agentEmail}}" style="color: #D4500A; text-decoration: none;">{{agentEmail}}</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    textContent: `
Bonjour {{firstName}},

⚠️ ATTENTION ! Votre devis pour {{companyName}} expire dans 48 heures.

Ne manquez pas cette opportunité de bénéficier de nos conditions avantageuses.

⏰ Offre expirant le {{expiryDate}}

🚀 Actions Rapides :
💳 Payer maintenant et bloquer le prix
📄 Voir le devis avant expiration

✅ Ce que vous risquez de perdre :
- Prix actuel garanti (-40% vs marché)
- Hébergement premier mois offert
- Formation équipe incluse
- Support prioritaire 30 jours
- Livraison garantie en 96h

🚀 Je valide mon projet : {{paymentLink}}
⏰ Je demande un délai : Répondez à cet email

Dernière chance avant expiration !

Cordialement,
{{agentName}}
LeadForge AI
{{agentEmail}}
    `
  }
];

// Export tous les templates
export const allTemplates = [...salesTemplates, ...reminderTemplates];

// Fonctions utilitaires
export function getTemplateById(id: string): EmailTemplate | undefined {
  return allTemplates.find(template => template.id === id);
}

export function getTemplatesByCategory(category: 'sale' | 'reminder'): EmailTemplate[] {
  return allTemplates.filter(template => template.category === category);
}

export function getSalesTemplates(): EmailTemplate[] {
  return salesTemplates;
}

export function getReminderTemplates(): EmailTemplate[] {
  return reminderTemplates;
}
