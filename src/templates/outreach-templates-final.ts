// ============================================================
// Solutions Web - Templates Email Outreach Agent (Version Minimaliste Professionnelle)
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
        <title>Solutions Web - Votre site web</title>
      </head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; color: #333333; line-height: 1.6;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%); color: white; padding: 40px 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; font-weight: 600;">{{agentName}}</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Solutions web professionnelles</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <h2 style="color: #2c3e50; margin-bottom: 20px; font-size: 22px;">Bonjour {{firstName}},</h2>
            
            <!-- Site Preview -->
            <div style="background-color: #f8f9fa; padding: 30px; margin: 30px 0; border-radius: 8px; border: 1px solid #e9ecef;">
              <h3 style="color: #2c3e50; margin-top: 0; margin-bottom: 15px; font-size: 18px;">🚀 Votre site web est prêt</h3>
              <p style="font-size: 16px; margin-bottom: 20px; color: #555;">
                Nous avons finalisé le développement de votre site web professionnel pour <strong>{{companyName}}</strong>.
              </p>
              <div style="text-align: center; margin: 25px 0;">
                <a href="{{websiteLink}}" 
                   style="display: inline-block; background-color: #007bff; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;"
                   target="_blank">
                  Voir mon site web →
                </a>
              </div>
            </div>
            
            <!-- Features Grid -->
            <div style="margin: 30px 0;">
              <h3 style="color: #2c3e50; margin-bottom: 20px; font-size: 18px;">Ce qui est inclus :</h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div style="background: #f8f9fa; padding: 15px; border-radius: 6px;">
                  <strong style="color: #2c3e50;">🌐 Design sur mesure</strong>
                  <p style="margin: 5px 0 0 0; font-size: 13px; color: #666;">Adapté à votre image</p>
                </div>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 6px;">
                  <strong style="color: #2c3e50;">📱 Responsive</strong>
                  <p style="margin: 5px 0 0 0; font-size: 13px; color: #666;">Mobile & desktop</p>
                </div>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 6px;">
                  <strong style="color: #2c3e50;">🔍 SEO optimisé</strong>
                  <p style="margin: 5px 0 0 0; font-size: 13px; color: #666;">Référencement Google</p>
                </div>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 6px;">
                  <strong style="color: #2c3e50;">⚡ Performance</strong>
                  <p style="margin: 5px 0 0 0; font-size: 13px; color: #666;">Chargement rapide</p>
                </div>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 6px;">
                  <strong style="color: #2c3e50;">🔒 Sécurité SSL</strong>
                  <p style="margin: 5px 0 0 0; font-size: 13px; color: #666;">Certificat HTTPS inclus</p>
                </div>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 6px;">
                  <strong style="color: #2c3e50;">📊 Analytics</strong>
                  <p style="margin: 5px 0 0 0; font-size: 13px; color: #666;">Statistiques incluses</p>
                </div>
              </div>
            </div>
            
            <!-- Pricing -->
            <div style="background-color: #fff3cd; padding: 30px; margin: 30px 0; border-radius: 8px; border: 1px solid #ffeaa7;">
              <h3 style="color: #856404; margin-top: 0; margin-bottom: 20px; font-size: 18px;">💰 Modalités de paiement</h3>
              <p style="font-size: 24px; font-weight: 700; margin: 15px 0; color: #2c3e50; text-align: center;">
                {{price}}€ HT
              </p>
              <div style="background: white; padding: 20px; border-radius: 6px; margin: 20px 0;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #eee;">
                  <span style="font-weight: 600; color: #28a745;">🚀 Étape 1 - Dépôt</span>
                  <span style="font-weight: bold; color: #28a745; font-size: 18px;">46€</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-weight: 600; color: #007bff;">🎯 Étape 2 - Livraison</span>
                  <span style="font-weight: bold; color: #007bff; font-size: 18px;">100€</span>
                </div>
              </div>
              <p style="margin: 15px 0 0 0; font-size: 14px; color: #856404; text-align: center;">
                <strong>Commencez avec 46€</strong> - Livraison en 2 jours ouvrés
              </p>
              <ul style="margin: 20px 0 0 20px; font-size: 14px; color: #856404;">
                <li>Hébergement 1 an inclus</li>
                <li>Nom de domaine inclus</li>
                <li>3 mois de maintenance</li>
              </ul>
            </div>
            
            <!-- CTA Buttons -->
            <div style="text-align: center; margin: 40px 0;">
              <p style="margin-bottom: 25px; font-size: 16px; color: #555;">Souhaitez-vous démarrer votre projet ?</p>
              <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                <a href="mailto:{{agentEmail}}?subject=Démarrage projet {{companyName}}&body=Bonjour, je souhaite démarrer le projet pour {{companyName}}. Pouvez-vous me donner les prochaines étapes ?" 
                   style="display: inline-block; background-color: #28a745; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
                  🚀 Démarrer le projet
                </a>
                <a href="mailto:{{agentEmail}}?subject=Questions projet {{companyName}}&body=Bonjour {{agentName}}, j'ai quelques questions sur le projet pour {{companyName}}." 
                   style="display: inline-block; background-color: #6c757d; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
                  ❓ Plus de questions
                </a>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
            <p style="margin: 0 0 15px 0; font-size: 16px; font-weight: 600; color: #2c3e50;">{{agentName}}</p>
            <p style="margin: 0 0 5px 0; font-size: 14px; color: #7f8c8d;">Solutions Web - Votre partenaire web</p>
            <p style="margin: 0; font-size: 14px; color: #7f8c8d;">
              <a href="mailto:{{agentEmail}}" style="color: #007bff; text-decoration: none;">{{agentEmail}}</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    textContent: `
Bonjour {{firstName}},

🚀 Votre site web est prêt

Nous avons finalisé le développement de votre site web professionnel pour {{companyName}}.

Voir votre site : {{websiteLink}}

Ce qui est inclus :
🌐 Design sur mesure - Adapté à votre image
📱 Responsive - Mobile & desktop
� SEO optimisé - Référencement Google
⚡ Performance - Chargement rapide
🔒 Sécurité SSL - Certificat HTTPS inclus
📊 Analytics - Statistiques incluses

💰 Modalités de paiement
Total : {{price}}€ HT
🚀 Étape 1 - Dépôt : 46€
🎯 Étape 2 - Livraison : 100€

Commencez avec 46€ - Livraison en 2 jours ouvrés
Inclus : Hébergement 1 an, Nom de domaine, 3 mois maintenance

Souhaitez-vous démarrer votre projet ?
🚀 Démarrer le projet
❓ Plus de questions

Cordialement,
{{agentName}}
Solutions Web - Votre partenaire web
{{agentEmail}}
    `
  },

  {
    id: 'email2_devis',
    name: 'Email 2 - Devis et Paiement',
    category: 'sale',
    subject: '📋 Devis détaillé pour votre site web {{companyName}}',
    variables: ['firstName', 'companyName', 'devisLink', 'paymentLink', 'price', 'agentName', 'agentEmail', 'validityDays', 'deliveryDate'],
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Solutions Web - Devis Site Web</title>
      </head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; color: #333333; line-height: 1.6;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 40px 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; font-weight: 600;">📋 Devis Personnalisé</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Proposition pour {{companyName}}</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <h2 style="color: #2c3e50; margin-bottom: 20px; font-size: 22px;">Bonjour {{firstName}},</h2>
            
            <!-- Devis Download -->
            <div style="background-color: #f8f9fa; padding: 30px; margin: 30px 0; border-radius: 8px; border: 1px solid #e9ecef; text-align: center;">
              <h3 style="color: #2c3e50; margin-top: 0; margin-bottom: 15px; font-size: 18px;">📄 Votre devis détaillé</h3>
              <p style="font-size: 16px; margin-bottom: 20px; color: #555;">
                Voici votre devis complet pour la création de votre site web professionnel.
              </p>
              <a href="{{devisLink}}" 
                 style="display: inline-block; background-color: #007bff; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;"
                 target="_blank">
                📥 Télécharger le devis PDF →
              </a>
            </div>
            
            <!-- Process Timeline -->
            <div style="margin: 30px 0;">
              <h3 style="color: #2c3e50; margin-bottom: 20px; font-size: 18px;">⏱️ Notre processus en 2 jours ouvrables</h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div style="background: #f8f9fa; padding: 15px; border-radius: 6px;">
                  <strong style="color: #10b981;">📋 Jour 1</strong>
                  <p style="margin: 5px 0 0 0; font-size: 13px; color: #666;">Validation & Maquette</p>
                </div>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 6px;">
                  <strong style="color: #007bff;">💻 Jour 2</strong>
                  <p style="margin: 5px 0 0 0; font-size: 13px; color: #666;">Développement & Mise en ligne</p>
                </div>
              </div>
              <p style="margin: 15px 0 0 0; font-size: 14px; color: #666;">
                <strong>Livraison prévue :</strong> {{deliveryDate}}
              </p>
            </div>
            
            <!-- Guarantees -->
            <div style="margin: 30px 0;">
              <h3 style="color: #2c3e50; margin-bottom: 15px; font-size: 18px;">🏆 Nos garanties</h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div style="background: #f8f9fa; padding: 15px; border-radius: 6px;">
                  <strong style="color: #2c3e50;">✅ Garantie 30 jours</strong>
                  <p style="margin: 5px 0 0 0; font-size: 13px; color: #666;">Remboursement complet</p>
                </div>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 6px;">
                  <strong style="color: #2c3e50;">🚀 Livraison garantie</strong>
                  <p style="margin: 5px 0 0 0; font-size: 13px; color: #666;">Respect des délais</p>
                </div>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 6px;">
                  <strong style="color: #2c3e50;">💰 Prix fixe</strong>
                  <p style="margin: 5px 0 0 0; font-size: 13px; color: #666;">Pas de frais cachés</p>
                </div>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 6px;">
                  <strong style="color: #2c3e50;">🔐 Propriété totale</strong>
                  <p style="margin: 5px 0 0 0; font-size: 13px; color: #666;">100% votre code</p>
                </div>
              </div>
            </div>
            
            <!-- Pricing -->
            <div style="background-color: #fff3cd; padding: 30px; margin: 30px 0; border-radius: 8px; border: 1px solid #ffeaa7;">
              <h3 style="color: #856404; margin-top: 0; margin-bottom: 20px; font-size: 18px;">💰 Modalités de paiement</h3>
              <p style="font-size: 24px; font-weight: 700; margin: 15px 0; color: #2c3e50; text-align: center;">
                {{price}}€ HT
              </p>
              <div style="background: white; padding: 20px; border-radius: 6px; margin: 20px 0;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #eee;">
                  <span style="font-weight: 600; color: #28a745;">🚀 Étape 1 - Dépôt</span>
                  <span style="font-weight: bold; color: #28a745; font-size: 18px;">46€</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-weight: 600; color: #007bff;">🎯 Étape 2 - Livraison</span>
                  <span style="font-weight: bold; color: #007bff; font-size: 18px;">100€</span>
                </div>
              </div>
              <p style="margin: 15px 0 0 0; font-size: 14px; color: #856404; text-align: center;">
                Offre valide {{validityDays}} jours • Paiement sécurisé
              </p>
              <div style="text-align: center; margin: 25px 0;">
                <a href="{{paymentLink}}" 
                   style="display: inline-block; background-color: #28a745; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;"
                   target="_blank">
                  💳 Payer 46€ pour commencer →
                </a>
              </div>
            </div>
            
            <!-- CTA Buttons -->
            <div style="text-align: center; margin: 40px 0;">
              <p style="margin-bottom: 25px; font-size: 16px; color: #555;">Des questions sur votre devis ?</p>
              <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                <a href="mailto:{{agentEmail}}?subject=Questions devis {{companyName}}&body=Bonjour, j'ai quelques questions sur le devis pour {{companyName}}." 
                   style="display: inline-block; background-color: #6c757d; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
                  ❓ Poser une question
                </a>
                <a href="mailto:{{agentEmail}}?subject=Validation maquette {{companyName}}&body=Bonjour, je valide la maquette pour {{companyName}}. Continuons le projet." 
                   style="display: inline-block; background-color: #28a745; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
                  ✅ Valider la maquette
                </a>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
            <p style="margin: 0 0 15px 0; font-size: 16px; font-weight: 600; color: #2c3e50;">{{agentName}}</p>
            <p style="margin: 0 0 5px 0; font-size: 14px; color: #7f8c8d;">Solutions Web - Votre partenaire web</p>
            <p style="margin: 0; font-size: 14px; color: #7f8c8d;">
              <a href="mailto:{{agentEmail}}" style="color: #007bff; text-decoration: none;">{{agentEmail}}</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    textContent: `
Bonjour {{firstName}},

📄 Votre devis détaillé

Voici votre devis complet pour la création de votre site web professionnel.

Télécharger le devis : {{devisLink}}

⏱️ Notre processus en 2 jours ouvrables
📋 Jour 1 : Validation & Maquette
💻 Jour 2 : Développement & Mise en ligne
Livraison prévue : {{deliveryDate}}

🏆 Nos garanties
✅ Garantie 30 jours - Remboursement complet
🚀 Livraison garantie - Respect des délais
💰 Prix fixe - Pas de frais cachés
🔐 Propriété totale - 100% votre code

💰 Modalités de paiement
Total : {{price}}€ HT
🚀 Étape 1 - Dépôt : 46€
🎯 Étape 2 - Livraison : 100€

Offre valide {{validityDays}} jours • Paiement sécurisé
Payer maintenant : {{paymentLink}}

Des questions sur votre devis ?
❓ Poser une question
✅ Valider la maquette

Cordialement,
{{agentName}}
Solutions Web - Votre partenaire web
{{agentEmail}}
    `
  },

  {
    id: 'email3_confirmation',
    name: 'Email 3 - Confirmation Dépôt',
    category: 'sale',
    subject: '🚀 Dépôt confirmé - Votre projet {{companyName}} démarre !',
    variables: ['firstName', 'companyName', 'invoiceLink', 'price', 'agentName', 'agentEmail', 'deliveryDate'],
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Solutions Web - Dépôt Confirmé</title>
      </head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; color: #333333; line-height: 1.6;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 40px 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; font-weight: 600;">🚀 Dépôt confirmé !</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Votre projet {{companyName}} démarre maintenant</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <h2 style="color: #2c3e50; margin-bottom: 20px; font-size: 22px;">Bonjour {{firstName}},</h2>
            
            <!-- Confirmation -->
            <div style="background-color: #d4edda; padding: 30px; margin: 30px 0; border-radius: 8px; border: 1px solid #c3e6cb;">
              <h3 style="color: #155724; margin-top: 0; margin-bottom: 15px; font-size: 18px;">✅ Dépôt de 46€ reçu</h3>
              <p style="font-size: 16px; margin-bottom: 15px; color: #155724;">
                Nous confirmons la bonne réception de votre dépôt pour le projet {{companyName}}.
              </p>
              <p style="margin: 0; font-size: 16px; color: #155724;">
                <strong>Reste à payer :</strong> 100€ (à la livraison)
              </p>
            </div>
            
            <!-- Timeline -->
            <div style="margin: 30px 0;">
              <h3 style="color: #2c3e50; margin-bottom: 20px; font-size: 18px;">📅 Calendrier de projet</h3>
              <p style="font-size: 16px; margin-bottom: 15px; color: #2c3e50;">
                <strong>Livraison prévue :</strong> {{deliveryDate}}
              </p>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div style="background: #f8f9fa; padding: 15px; border-radius: 6px;">
                  <strong style="color: #28a745;">📋 Phase 1</strong>
                  <p style="margin: 5px 0 0 0; font-size: 13px; color: #666;">Développement (2 jours)</p>
                </div>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 6px;">
                  <strong style="color: #007bff;">🚀 Phase 2</strong>
                  <p style="margin: 5px 0 0 0; font-size: 13px; color: #666;">Livraison (Jour J)</p>
                </div>
              </div>
            </div>
            
            <!-- Invoice -->
            <div style="background-color: #fff3cd; padding: 30px; margin: 30px 0; border-radius: 8px; border: 1px solid #ffeaa7; text-align: center;">
              <h3 style="color: #856404; margin-top: 0; margin-bottom: 15px; font-size: 18px;">📄 Votre facture de dépôt</h3>
              <p style="margin-bottom: 20px; font-size: 14px; color: #856404;">
                Téléchargez votre facture pour le dépôt de 46€
              </p>
              <a href="{{invoiceLink}}" 
                 style="display: inline-block; background-color: #007bff; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;"
                 target="_blank">
                📥 Télécharger la facture →
              </a>
            </div>
            
            <!-- Support -->
            <div style="text-align: center; margin: 40px 0;">
              <p style="margin-bottom: 25px; font-size: 16px; color: #555;">Besoin d'aide pendant le développement ?</p>
              <a href="mailto:{{agentEmail}}?subject=Support projet {{companyName}}&body=Bonjour, j'ai besoin d'aide pour mon projet {{companyName}}." 
                 style="display: inline-block; background-color: #6c757d; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
                💬 Contacter le support
              </a>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
            <p style="margin: 0 0 15px 0; font-size: 16px; font-weight: 600; color: #2c3e50;">{{agentName}}</p>
            <p style="margin: 0 0 5px 0; font-size: 14px; color: #7f8c8d;">Solutions Web - Votre partenaire web</p>
            <p style="margin: 0; font-size: 14px; color: #7f8c8d;">
              <a href="mailto:{{agentEmail}}" style="color: #007bff; text-decoration: none;">{{agentEmail}}</a>
            </p>
          </div>
        </div>
      </body>
      </html>
   `,
    textContent: `
Bonjour {{firstName}},

🚀 Dépôt confirmé ! Votre projet {{companyName}} démarre maintenant

✅ Dépôt de 46€ reçu
Nous confirmons la bonne réception de votre dépôt pour le projet {{companyName}}.
Reste à payer : 100€ (à la livraison)

📅 Calendrier de projet
Livraison prévue : {{deliveryDate}}

📋 Phase 1 : Développement (2 jours)
🚀 Phase 2 : Livraison (Jour J)

📄 Votre facture de dépôt
Télécharger votre facture : {{invoiceLink}}

Besoin d'aide pendant le développement ?
💬 Contacter le support par email

Cordialement,
{{agentName}}
Solutions Web - Votre partenaire web
{{agentEmail}}
   `
  },

  {
    id: 'email4_final_payment',
    name: 'Email 4 - Paiement Final',
    category: 'sale',
    subject: '🎉 Votre site {{companyName}} est prêt - Paiement final de 100€',
    variables: ['firstName', 'companyName', 'websiteLink', 'finalPaymentLink', 'agentName', 'agentEmail', 'deliveryDate'],
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Solutions Web - Votre site est prêt</title>
      </head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; color: #333333; line-height: 1.6;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #ffc107 0%, #ff9800 100%); color: white; padding: 40px 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; font-weight: 600;">🎉 Votre site est prêt !</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">{{companyName}} - Livraison prévue le {{deliveryDate}}</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <h2 style="color: #2c3e50; margin-bottom: 20px; font-size: 22px;">Bonjour {{firstName}},</h2>
            
            <!-- Site Ready -->
            <div style="background-color: #d4edda; padding: 30px; margin: 30px 0; border-radius: 8px; border: 1px solid #c3e6cb;">
              <h3 style="color: #155724; margin-top: 0; margin-bottom: 15px; font-size: 18px;">🚀 Votre site est terminé</h3>
              <p style="font-size: 16px; margin-bottom: 20px; color: #155724;">
                Votre site web professionnel pour <strong>{{companyName}}</strong> est prêt !
              </p>
              <a href="{{websiteLink}}" 
                 style="display: inline-block; background-color: #007bff; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;"
                 target="_blank">
                Voir mon site →
              </a>
            </div>
            
            <!-- Final Payment -->
            <div style="background-color: #fff3cd; padding: 30px; margin: 30px 0; border-radius: 8px; border: 1px solid #ffeaa7;">
              <h3 style="color: #856404; margin-top: 0; margin-bottom: 20px; font-size: 18px;">💳 Paiement final</h3>
              <p style="font-size: 24px; font-weight: 700; margin: 15px 0; color: #2c3e50; text-align: center;">
                100€
              </p>
              <p style="margin-bottom: 20px; font-size: 14px; color: #856404; text-align: center;">
                Finalisez pour débloquer l'accès complet
              </p>
              <div style="text-align: center;">
                <a href="{{finalPaymentLink}}" 
                   style="display: inline-block; background-color: #28a745; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;"
                   target="_blank">
                  💳 Payer 100€ →
                </a>
              </div>
            </div>
            
            <!-- After Payment -->
            <div style="margin: 30px 0;">
              <h3 style="color: #2c3e50; margin-bottom: 15px; font-size: 18px;">📦 Après paiement</h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div style="background: #f8f9fa; padding: 15px; border-radius: 6px;">
                  <strong style="color: #2c3e50;">🚀 Mise en ligne</strong>
                  <p style="margin: 5px 0 0 0; font-size: 13px; color: #666;">Immédiate</p>
                </div>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 6px;">
                  <strong style="color: #2c3e50;">🔐 Accès admin</strong>
                  <p style="margin: 5px 0 0 0; font-size: 13px; color: #666;">Envoyé par email</p>
                </div>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 6px;">
                  <strong style="color: #2c3e50;">📚 Documentation</strong>
                  <p style="margin: 5px 0 0 0; font-size: 13px; color: #666;">Complète</p>
                </div>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 6px;">
                  <strong style="color: #2c3e50;">🛡️ Support</strong>
                  <p style="margin: 5px 0 0 0; font-size: 13px; color: #666;">3 mois inclus</p>
                </div>
              </div>
            </div>
            
            <!-- Support -->
            <div style="text-align: center; margin: 40px 0;">
              <p style="margin-bottom: 25px; font-size: 16px; color: #555;">Questions sur votre site ?</p>
              <a href="mailto:{{agentEmail}}?subject=Questions site {{companyName}}&body=Bonjour, j'ai des questions sur mon site {{companyName}}." 
                 style="display: inline-block; background-color: #6c757d; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
                💬 Contacter le support
              </a>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
            <p style="margin: 0 0 15px 0; font-size: 16px; font-weight: 600; color: #2c3e50;">{{agentName}}</p>
            <p style="margin: 0 0 5px 0; font-size: 14px; color: #7f8c8d;">Solutions Web - Votre partenaire web</p>
            <p style="margin: 0; font-size: 14px; color: #7f8c8d;">
              <a href="mailto:{{agentEmail}}" style="color: #007bff; text-decoration: none;">{{agentEmail}}</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    textContent: `
Bonjour {{firstName}},

🎉 Votre site web professionnel pour {{companyName}} est maintenant terminé !

Voir votre site : {{websiteLink}}

💳 Paiement final : 100€
Finalisez pour débloquer l'accès complet
Payer maintenant : {{finalPaymentLink}}

📦 Après paiement
🚀 Mise en ligne immédiate
� Accès admin envoyé
📚 Documentation complète
🛡️ Support 3 mois inclus

Questions sur votre site ?
💬 Contacter le support par email

Cordialement,
{{agentName}}
Solutions Web - Votre partenaire web
{{agentEmail}}
    `
  },

  {
    id: 'email5_final_payment_confirmation',
    name: 'Email 5 - Confirmation Paiement Final',
    category: 'sale',
    subject: '✅ Paiement final confirmé - Votre site {{companyName}} est maintenant en ligne !',
    variables: ['firstName', 'companyName', 'websiteLink', 'invoiceLink', 'agentName', 'agentEmail'],
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Solutions Web - Paiement Final Confirmé</title>
      </head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; color: #333333; line-height: 1.6;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 40px 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; font-weight: 600;">✅ Paiement final confirmé !</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Votre site {{companyName}} est maintenant en ligne</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <h2 style="color: #2c3e50; margin-bottom: 20px; font-size: 22px;">Bonjour {{firstName}},</h2>
            
            <!-- Confirmation -->
            <div style="background-color: #d4edda; padding: 30px; margin: 30px 0; border-radius: 8px; border: 1px solid #c3e6cb;">
              <h3 style="color: #155724; margin-top: 0; margin-bottom: 15px; font-size: 18px;">🎉 Projet complété avec succès !</h3>
              <p style="font-size: 16px; margin-bottom: 20px; color: #155724;">
                Paiement final reçu. Votre site web {{companyName}} est officiellement en ligne !
              </p>
              <a href="{{websiteLink}}" 
                 style="display: inline-block; background-color: #007bff; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;"
                 target="_blank">
                Voir mon site →
              </a>
            </div>
            
            <!-- Invoice -->
            <div style="background-color: #fff3cd; padding: 30px; margin: 30px 0; border-radius: 8px; border: 1px solid #ffeaa7; text-align: center;">
              <h3 style="color: #856404; margin-top: 0; margin-bottom: 15px; font-size: 18px;">📄 Votre facture finale</h3>
              <p style="margin-bottom: 20px; font-size: 14px; color: #856404;">
                Téléchargez votre facture pour le paiement final
              </p>
              <a href="{{invoiceLink}}" 
                 style="display: inline-block; background-color: #007bff; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;"
                 target="_blank">
                📥 Télécharger la facture →
              </a>
            </div>
            
            <!-- Next Steps -->
            <div style="margin: 30px 0;">
              <h3 style="color: #2c3e50; margin-bottom: 15px; font-size: 18px;">📋 Prochaines étapes</h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div style="background: #f8f9fa; padding: 15px; border-radius: 6px;">
                  <strong style="color: #2c3e50;">🔐 Accès admin</strong>
                  <p style="margin: 5px 0 0 0; font-size: 13px; color: #666;">Envoyé par email</p>
                </div>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 6px;">
                  <strong style="color: #2c3e50;">� Documentation</strong>
                  <p style="margin: 5px 0 0 0; font-size: 13px; color: #666;">Complète</p>
                </div>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 6px;">
                  <strong style="color: #2c3e50;">🛠️ Guides</strong>
                  <p style="margin: 5px 0 0 0; font-size: 13px; color: #666;">De gestion</p>
                </div>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 6px;">
                  <strong style="color: #2c3e50;">🛡️ Support</strong>
                  <p style="margin: 5px 0 0 0; font-size: 13px; color: #666;">3 mois inclus</p>
                </div>
              </div>
            </div>
            
            <!-- Support -->
            <div style="text-align: center; margin: 40px 0;">
              <p style="margin-bottom: 25px; font-size: 16px; color: #555;">Besoin d'aide ?</p>
              <a href="mailto:{{agentEmail}}?subject=Support {{companyName}}&body=Bonjour, j'ai besoin d'aide pour mon site {{companyName}}." 
                 style="display: inline-block; background-color: #6c757d; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
                💬 Contacter le support
              </a>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
            <p style="margin: 0 0 15px 0; font-size: 16px; font-weight: 600; color: #2c3e50;">{{agentName}}</p>
            <p style="margin: 0 0 5px 0; font-size: 14px; color: #7f8c8d;">Solutions Web - Votre partenaire web</p>
            <p style="margin: 0; font-size: 14px; color: #7f8c8d;">
              <a href="mailto:{{agentEmail}}" style="color: #007bff; text-decoration: none;">{{agentEmail}}</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    textContent: `
Bonjour {{firstName}},

✅ Paiement final confirmé ! Votre site {{companyName}} est maintenant en ligne

🎉 Projet complété avec succès !
Paiement final reçu. Votre site web est officiellement en ligne !

Voir votre site : {{websiteLink}}

📄 Votre facture finale
Télécharger : {{invoiceLink}}

📋 Prochaines étapes
🔐 Accès admin envoyé
📚 Documentation complète
🛠️ Guides de gestion
�️ Support 3 mois inclus

Besoin d'aide ?
💬 Contacter le support par email

Félicitations ! Votre présence en ligne professionnelle est active

Cordialement,
{{agentName}}
Solutions Web - Votre partenaire web
{{agentEmail}}
    `
  },

  {
    id: 'email6_delivery_documentation',
    name: 'Email 6 - Livraison et Documentation',
    category: 'sale',
    subject: '🔐 Accès et documentation pour votre site {{companyName}}',
    variables: ['firstName', 'companyName', 'websiteLink', 'adminLink', 'adminUsername', 'adminPassword', 'documentationLink', 'agentName', 'agentEmail'],
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Solutions Web - Livraison et Documentation</title>
      </head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; color: #333333; line-height: 1.6;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #007bff 0%, #0056b3 100%); color: white; padding: 40px 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; font-weight: 600;">🔐 Livraison complète</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Accès et documentation pour {{companyName}}</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <h2 style="color: #2c3e50; margin-bottom: 20px; font-size: 22px;">Bonjour {{firstName}},</h2>
            
            <!-- Admin Access -->
            <div style="background-color: #d1ecf1; padding: 30px; margin: 30px 0; border-radius: 8px; border: 1px solid #bee5eb;">
              <h3 style="color: #0c5460; margin-top: 0; margin-bottom: 15px; font-size: 18px;">🔑 Vos accès administrateur</h3>
              <div style="background: white; padding: 20px; border-radius: 6px; margin-bottom: 15px;">
                <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;"><strong>URL :</strong></p>
                <p style="margin: 0 0 15px 0; font-size: 14px; color: #007bff;">
                  <a href="{{adminLink}}" style="color: #007bff; text-decoration: none; font-weight: 600;">{{adminLink}}</a>
                </p>
                <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;"><strong>Utilisateur :</strong></p>
                <p style="margin: 0 0 15px 0; font-size: 14px; font-weight: 600; color: #2c3e50;">{{adminUsername}}</p>
                <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;"><strong>Mot de passe :</strong></p>
                <p style="margin: 0; font-size: 14px; font-weight: 600; color: #2c3e50;">{{adminPassword}}</p>
              </div>
              <p style="margin: 0; font-size: 12px; color: #0c5460;">
                🔒 Changez le mot de passe lors de votre première connexion
              </p>
            </div>
            
            <!-- Documentation -->
            <div style="background-color: #fff3cd; padding: 30px; margin: 30px 0; border-radius: 8px; border: 1px solid #ffeaa7; text-align: center;">
              <h3 style="color: #856404; margin-top: 0; margin-bottom: 15px; font-size: 18px;">📚 Documentation complète</h3>
              <p style="margin-bottom: 20px; font-size: 14px; color: #856404;">
                Guides pour gérer votre site
              </p>
              <a href="{{documentationLink}}" 
                 style="display: inline-block; background-color: #007bff; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;"
                 target="_blank">
                📥 Télécharger la documentation →
              </a>
            </div>
            
            <!-- Support -->
            <div style="text-align: center; margin: 40px 0;">
              <p style="margin-bottom: 25px; font-size: 16px; color: #555;">Besoin d'aide ?</p>
              <a href="mailto:{{agentEmail}}?subject=Support {{companyName}}&body=Bonjour, j'ai besoin d'aide pour mon site {{companyName}}." 
                 style="display: inline-block; background-color: #6c757d; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
                💬 Contacter le support
              </a>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
            <p style="margin: 0 0 15px 0; font-size: 16px; font-weight: 600; color: #2c3e50;">{{agentName}}</p>
            <p style="margin: 0 0 5px 0; font-size: 14px; color: #7f8c8d;">Solutions Web - Votre partenaire web</p>
            <p style="margin: 0; font-size: 14px; color: #7f8c8d;">
              <a href="mailto:{{agentEmail}}" style="color: #007bff; text-decoration: none;">{{agentEmail}}</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    textContent: `
Bonjour {{firstName}},

🔐 Livraison complète - Accès et documentation pour {{companyName}}

� Vos accès administrateur
URL : {{adminLink}}
Utilisateur : {{adminUsername}}
Mot de passe : {{adminPassword}}

🔒 Changez le mot de passe lors de votre première connexion

� Documentation complète
Télécharger : {{documentationLink}}

Besoin d'aide ?
💬 Contacter le support par email

Cordialement,
{{agentName}}
Solutions Web - Votre partenaire web
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
    variables: ['firstName', 'companyName', 'websiteLink', 'paymentLink', 'price', 'agentName', 'agentEmail'],
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Solutions Web - Suivi</title>
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
                <a href="{{websiteLink}}" style="color: #007bff; text-decoration: underline;">VOTRE SITE WEB ICI</a>
              </p>
            </div>
            
            <!-- Valeurs différenciantes -->
            <div style="margin: 30px 0;">
              <h3 style="color: #2c3e50; margin-bottom: 20px; font-size: 18px;">Pourquoi choisir {{agentName}} ?</h3>
              
              <div style="margin-bottom: 25px;">
                <h4 style="color: #2c3e50; margin-bottom: 10px; font-size: 16px;">💰 Paiement en 2 étapes - Total : 146$</h4>
                <ul style="padding-left: 20px; margin: 0;">
                  <li style="margin-bottom: 12px;"><strong>Dépôt pour commencer</strong> : Seulement 46$ pour lancer votre projet</li>
                  <li style="margin-bottom: 12px;"><strong>Paiement final à la livraison</strong> : 100$ lorsque votre site est prêt</li>
                  <li style="margin-bottom: 0;"><strong>Pas de frais cachés</strong> : Hébergement et domaine inclus la première année</li>
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
                  "Solutions Web a transformé notre présence en ligne. Site professionnel, rapide, et surtout abordable. 
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
              <p style="margin-bottom: 20px; font-size: 16px;">Prêt à démarrer votre projet ?</p>
              <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                <a href="{{paymentLink}}" 
                   style="display: inline-block; background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: 500;"
                   target="_blank">
                  Commencer avec 46$
                </a>
                <a href="mailto:{{agentEmail}}?subject=Questions {{companyName}}" 
                   style="display: inline-block; background-color: #6c757d; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: 500;">
                  Discuter du projet
                </a>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid #e0e0e0;">
            <p style="margin: 0 0 10px 0; font-size: 14px; color: #7f8c8d;">
              Votre projet professionnel vous attend - Commencez avec seulement 46$
            </p>
            <p style="margin: 0; font-size: 14px; color: #7f8c8d;">
              Nous sommes là pour répondre à toutes vos questions
            </p>
          </div>
          
          <!-- Signature -->
          <div style="margin-top: 30px; text-align: left;">
            <p style="margin: 0; font-size: 16px; font-weight: 600; color: #2c3e50;">{{agentName}}</p>
            <p style="margin: 4px 0 0 0; font-size: 14px; color: #7f8c8d;">Solutions Web - Votre partenaire web</p>
            <p style="margin: 4px 0 0 0; font-size: 14px; color: #7f8c8d;">{{agentEmail}}</p>
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

Découvrez votre futur site : <a href="{{websiteLink}}" style="color: #007bff; text-decoration: underline; font-weight: 600;">{{websiteLink}}</a>

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
"Solutions Web a transformé notre présence en ligne. Site professionnel, rapide, et surtout abordable. 
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

💰 Paiement en 2 étapes - Total : 146$
🚀 Étape 1 - Dépôt pour commencer : 46$
🎯 Étape 2 - Paiement final à la livraison : 100$
Commencez maintenant avec seulement 46$ - Le reste sera dû à la livraison de votre site

Questions fréquentes :
"Que se passe-t-il après le paiement ?"
Nous vous contactons sous 24h pour valider les détails, puis nous commençons immédiatement le développement selon notre processus 4 étapes.

"Puis-je modifier mon site après la livraison ?"
Absolument ! Nous vous formons pendant 2 heures et vous fournissons un accès complet pour gérer votre site en autonomie.

"Et si je ne suis pas satisfait ?"
Notre garantie satisfaction 30 jours vous protège : remboursement complet sans condition si vous n'êtes pas satisfait.

Prêt à démarrer votre projet ?
• Commencer avec 46$
• Discuter du projet

Votre projet professionnel vous attend - Commencez avec seulement 46$
Nous sommes là pour répondre à toutes vos questions

Cordialement,
{{agentName}}
Solutions Web
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
        <title>Solutions Web - Dernière Chance</title>
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
          <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid #e0e0e0;">
            <p style="margin: 0 0 10px 0; font-size: 14px; color: #7f8c8d;">
              Cette offre exceptionnelle expire bientôt - Agissez maintenant
            </p>
            <p style="margin: 0; font-size: 14px; color: #7f8c8d;">
              Votre projet professionnel mérite cette opportunité unique
            </p>
          </div>
          
          <!-- Signature -->
          <div style="margin-top: 30px; text-align: left;">
            <p style="margin: 0; font-size: 16px; font-weight: 600; color: #2c3e50;">{{agentName}}</p>
            <p style="margin: 4px 0 0 0; font-size: 14px; color: #7f8c8d;">Solutions Web - Votre partenaire web</p>
            <p style="margin: 4px 0 0 0; font-size: 14px; color: #7f8c8d;">{{agentEmail}}</p>
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
Solutions Web
{{agentEmail}}
    `
  },

  {
    id: 'reminder3_final_payment',
    name: 'Rappel 3 - Paiement Final',
    category: 'reminder',
    subject: '🎉 Votre site {{companyName}} est prêt - Finalisez avec le paiement de 100$',
    variables: ['firstName', 'companyName', 'websiteLink', 'finalPaymentLink', 'agentName', 'agentEmail'],
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Solutions Web - Paiement Final</title>
      </head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #ffffff; color: #333333; line-height: 1.6;">
        <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 40px; padding-bottom: 30px; border-bottom: 1px solid #e0e0e0;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #007bff;">🎉 Votre site est prêt !</h1>
            <p style="margin: 8px 0 0 0; font-size: 14px; color: #7f8c8d;">{{companyName}} - Dernière étape avant la mise en ligne</p>
          </div>
          
          <!-- Content -->
          <div style="margin-bottom: 30px;">
            <h2 style="color: #2c3e50; margin-bottom: 15px; font-size: 20px;">Bonjour {{firstName}},</h2>
            
            <!-- Bonne nouvelle -->
            <div style="background-color: #d4edda; padding: 25px; margin: 0 0 30px 0; border: 1px solid #c3e6cb; border-radius: 8px;">
              <h3 style="color: #155724; margin-top: 0; margin-bottom: 15px; font-size: 18px;">🚀 Excellente nouvelle !</h3>
              <p style="font-size: 16px; margin-bottom: 20px; color: #155724;">
                Votre site web professionnel pour <strong>{{companyName}}</strong> est maintenant terminé et prêt à être mis en ligne !
              </p>
              <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: 500; color: #155724;">Découvrez votre site :</p>
              <p style="margin: 0 0 20px 0; font-size: 14px; color: #007bff;">
                <a href="{{websiteLink}}" style="color: #007bff; text-decoration: underline; font-weight: 600;">{{websiteLink}}</a>
              </p>
            </div>
            
            <!-- Paiement final -->
            <div style="background-color: #fff3cd; padding: 25px; margin: 0 0 30px 0; border: 1px solid #ffeaa7; border-radius: 8px;">
              <h3 style="color: #856404; margin-top: 0; margin-bottom: 15px; font-size: 18px;">💳 Dernière étape : Paiement final</h3>
              <p style="font-size: 16px; margin-bottom: 20px; color: #856404;">
                Pour finaliser la livraison et débloquer l'accès complet à votre site, 
                il vous reste le paiement final de <strong>100$</strong>.
              </p>
              <p style="margin: 0 0 20px 0; font-size: 14px; color: #856404;">
                Une fois le paiement effectué, votre site sera immédiatement mis en ligne et accessible à vos clients.
              </p>
              <div style="text-align: center; margin: 25px 0;">
                <a href="{{finalPaymentLink}}" 
                   style="background: #28a745; color: white; padding: 18px 35px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold; font-size: 18px; box-shadow: 0 4px 6px rgba(40, 167, 69, 0.3);"
                   target="_blank">
                  💳 Payer 100$ - Finaliser le projet →
                </a>
              </div>
            </div>
            
            <!-- Ce que vous recevrez -->
            <div style="margin-bottom: 30px;">
              <h3 style="color: #2c3e50; margin-bottom: 15px; font-size: 18px;">📦 Après le paiement</h3>
              <p style="font-size: 16px; margin-bottom: 15px;">
                Dès que votre paiement sera confirmé :
              </p>
              <ul style="font-size: 15px; line-height: 1.8; margin: 0; padding-left: 20px;">
                <li>🚀 Votre site sera mis en ligne immédiatement</li>
                <li>📧 Vous recevrez les accès administrateur</li>
                <li>📚 Documentation complète fournie</li>
                <li>🛡️ Support technique 3 mois inclus</li>
              </ul>
            </div>
            
            <!-- Urgence -->
            <div style="background-color: #f8d7da; padding: 20px; margin: 30px 0; border: 1px solid #f5c6cb; border-radius: 8px;">
              <p style="margin: 0; font-size: 15px; color: #721c24; text-align: center;">
                <strong>⏰ Votre site est prêt - Finalisez maintenant pour la livraison immédiate !</strong>
              </p>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid #e0e0e0;">
            <p style="margin: 0 0 10px 0; font-size: 14px; color: #7f8c8d;">
              Votre présence en ligne professionnelle est à un clic de distance
            </p>
            <p style="margin: 0; font-size: 14px; color: #7f8c8d;">
              Finalisez maintenant et soyez en ligne dans les 24h
            </p>
          </div>
          
          <!-- Signature -->
          <div style="margin-top: 30px; text-align: left;">
            <p style="margin: 0; font-size: 16px; font-weight: 600; color: #2c3e50;">{{agentName}}</p>
            <p style="margin: 4px 0 0 0; font-size: 14px; color: #7f8c8d;">Solutions Web - Votre partenaire web</p>
            <p style="margin: 4px 0 0 0; font-size: 14px; color: #7f8c8d;">{{agentEmail}}</p>
          </div>
        </div>
      </body>
      </html>
    `,
    textContent: `
Bonjour {{firstName}},

🎉 Votre site est prêt ! {{companyName}} - Dernière étape avant la mise en ligne

🚀 Excellente nouvelle !
Votre site web professionnel pour {{companyName}} est maintenant terminé et prêt à être mis en ligne !

Découvrez votre site : <a href="{{websiteLink}}" style="color: #007bff; text-decoration: underline; font-weight: 600;">{{websiteLink}}</a>

💳 Dernière étape : Paiement final
Pour finaliser la livraison et débloquer l'accès complet à votre site, 
il vous reste le paiement final de 100$.

Payer maintenant : {{finalPaymentLink}}

Une fois le paiement effectué, votre site sera immédiatement mis en ligne et accessible à vos clients.

📦 Après le paiement
Dès que votre paiement sera confirmé :
🚀 Votre site sera mis en ligne immédiatement
📧 Vous recevrez les accès administrateur
📚 Documentation complète fournie
🛡️ Support technique 3 mois inclus

⏰ Votre site est prêt - Finalisez maintenant pour la livraison immédiate !

Votre présence en ligne professionnelle est à un clic de distance
Finalisez maintenant et soyez en ligne dans les 24h

Cordialement,
{{agentName}}
Solutions Web
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
