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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      </head>
      <body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f8fafc; line-height: 1.6;">
        <div style="max-width: 650px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          
          <!-- Header Premium -->
          <div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); color: white; padding: 40px 30px; text-align: center;">
            <div style="margin-bottom: 20px;">
              <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #3b82f6, #8b5cf6); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto; font-size: 24px; font-weight: bold;">
                LF
              </div>
            </div>
            <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">LeadForge AI</h1>
            <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 16px; font-weight: 400;">Solutions digitales sur mesure</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <div style="margin-bottom: 30px;">
              <h2 style="color: #1e293b; margin-bottom: 12px; font-size: 24px; font-weight: 600;">Bonjour {{firstName}},</h2>
              <div style="width: 50px; height: 3px; background: linear-gradient(90deg, #3b82f6, #8b5cf6); border-radius: 2px; margin-bottom: 25px;"></div>
            </div>
            
            <p style="font-size: 17px; line-height: 1.7; color: #475569; margin-bottom: 30px;">
              J'ai le plaisir de vous présenter le site web professionnel que nous avons développé spécialement pour <strong style="color: #1e293b;">{{companyName}}</strong>. Notre équipe a créé une présence en ligne moderne, performante et optimisée pour convertir vos visiteurs en clients.
            </p>
            
            <!-- Site Preview -->
            <div style="background: linear-gradient(135deg, #f0f9ff, #e0f2fe); padding: 35px; border-radius: 16px; margin: 35px 0; text-align: center; border: 1px solid #bae6fd;">
              <div style="margin-bottom: 20px;">
                <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #3b82f6, #8b5cf6); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto; font-size: 32px;">
                  🚀
                </div>
              </div>
              <h3 style="color: #1e293b; margin-top: 0; margin-bottom: 15px; font-size: 20px; font-weight: 600;">Votre site est prêt !</h3>
              <p style="margin-bottom: 25px; color: #64748b; font-size: 16px;">Découvrez votre nouvelle présence en ligne professionnelle</p>
              <a href="{{websiteLink}}" 
                 style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 16px; transition: transform 0.2s; box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3);"
                 target="_blank">
                Voir mon site web →
              </a>
            </div>
            
            <!-- Value Proposition -->
            <div style="background: #ffffff; padding: 35px; border-radius: 16px; margin: 35px 0; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);">
              <h4 style="color: #1e293b; margin-top: 0; margin-bottom: 25px; font-size: 20px; font-weight: 600;">🎯 Ce qui vous distingue de la concurrence :</h4>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
                  <div style="background: #10b981; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; flex-shrink: 0; font-size: 12px; font-weight: bold;">✓</div>
                  <div>
                    <strong style="color: #1e293b; font-size: 15px;">Design Premium & Responsive</strong>
                    <p style="margin: 4px 0 0 0; color: #64748b; font-size: 14px;">Adapté sur tous les appareils</p>
                  </div>
                </div>
                <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
                  <div style="background: #10b981; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; flex-shrink: 0; font-size: 12px; font-weight: bold;">✓</div>
                  <div>
                    <strong style="color: #1e293b; font-size: 15px;">SEO Optimisé</strong>
                    <p style="margin: 4px 0 0 0; color: #64748b; font-size: 14px;">Positionnement Google garanti</p>
                  </div>
                </div>
                <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
                  <div style="background: #10b981; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; flex-shrink: 0; font-size: 12px; font-weight: bold;">✓</div>
                  <div>
                    <strong style="color: #1e293b; font-size: 15px;">Performance Optimale</strong>
                    <p style="margin: 4px 0 0 0; color: #64748b; font-size: 14px;">Chargement ultra-rapide</p>
                  </div>
                </div>
                <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
                  <div style="background: #10b981; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; flex-shrink: 0; font-size: 12px; font-weight: bold;">✓</div>
                  <div>
                    <strong style="color: #1e293b; font-size: 15px;">Support Premium</strong>
                    <p style="margin: 4px 0 0 0; color: #64748b; font-size: 14px;">Assistance 7j/7, 24h/24</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Pricing -->
            <div style="background: linear-gradient(135deg, #fef3c7, #fde68a); padding: 35px; border-radius: 16px; margin: 35px 0; border: 1px solid #fbbf24;">
              <div style="text-align: center;">
                <h4 style="color: #92400e; margin-top: 0; margin-bottom: 20px; font-size: 20px; font-weight: 600;">💰 Investissement Stratégique</h4>
                <div style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 20px;">
                  <p style="font-size: 36px; font-weight: 700; color: #1e293b; margin: 0 0 8px 0;">
                    {{price}}€<span style="font-size: 18px; color: #64748b; font-weight: 400;"> HT</span>
                  </p>
                  <p style="color: #64748b; margin: 0; font-size: 15px;">
                    Paiement en 1, 3 ou 6 fois sans frais • Économisez 40% vs agence traditionnelle
                  </p>
                </div>
                <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
                  <span style="background: #10b981; color: white; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 500;">✅ Garantie 30 jours</span>
                  <span style="background: #3b82f6; color: white; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 500;">🚀 Livraison 7 jours</span>
                  <span style="background: #8b5cf6; color: white; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 500;">🎯 Résultats garantis</span>
                </div>
              </div>
            </div>
            
            <!-- CTA -->
            <div style="text-align: center; margin: 40px 0;">
              <p style="color: #475569; margin-bottom: 25px; font-size: 17px; font-weight: 500;">
                Prêt à transformer votre présence en ligne ?
              </p>
              <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                <a href="mailto:{{agentEmail}}?subject=Démarrer projet {{companyName}}&body=Bonjour, je souhaite démarrer le projet pour {{companyName}}. Pouvez-vous m'expliquer les prochaines étapes ?" 
                   style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.3);">
                  🚀 Démarrer le projet
                </a>
                <a href="tel:+33612345678" 
                   style="background: #ffffff; color: #3b82f6; padding: 16px 32px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 16px; border: 2px solid #3b82f6;">
                  📞 Appeler un expert
                </a>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
            <div style="margin-bottom: 20px;">
              <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #3b82f6, #8b5cf6); border-radius: 8px; display: flex; align-items: center; justify-content: center; margin: 0 auto; font-size: 16px; font-weight: bold; color: white;">
                LF
              </div>
            </div>
            <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.6; margin-bottom: 15px;">
              Cordialement,<br>
              <strong style="color: #1e293b; font-size: 16px;">{{agentName}}</strong><br>
              <span style="color: #3b82f6; font-weight: 600;">LeadForge AI</span> • Votre partenaire digital<br>
              <a href="mailto:{{agentEmail}}" style="color: #3b82f6; text-decoration: none; font-weight: 500;">{{agentEmail}}</a>
            </p>
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                Cet email vous a été envoyé car vous avez montré de l'intérêt pour nos services. 
                <a href="#" style="color: #94a3b8; text-decoration: underline;">Se désinscrire</a>
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
    textContent: `
Bonjour {{firstName}},

J'ai le plaisir de vous présenter le site web professionnel que nous avons développé spécialement pour {{companyName}}. Notre équipe a créé une présence en ligne moderne, performante et optimisée pour convertir vos visiteurs en clients.

🔗 Découvrez votre site : {{websiteLink}}

🎯 Ce qui vous distingue de la concurrence :
✅ Design Premium & Responsive - Adapté sur tous les appareils
✅ SEO Optimisé - Positionnement Google garanti
✅ Performance Optimale - Chargement ultra-rapide
✅ Support Premium - Assistance 7j/7, 24h/24

💰 Investissement Stratégique : {{price}}€ HT
• Paiement en 1, 3 ou 6 fois sans frais
• Économisez 40% vs agence traditionnelle
• Garantie 30 jours
• Livraison 7 jours
• Résultats garantis

Prêt à transformer votre présence en ligne ?
📧 Répondez à cet email pour démarrer
📞 Appelez-nous pour parler à un expert

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
    subject: '📋 Devis détaillé et proposition pour {{companyName}}',
    variables: ['firstName', 'companyName', 'devisLink', 'paymentLink', 'price', 'agentName', 'agentEmail', 'validityDays', 'deliveryDate'],
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>LeadForge AI - Devis Site Web</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      </head>
      <body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f8fafc; line-height: 1.6;">
        <div style="max-width: 650px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 40px 30px; text-align: center;">
            <div style="margin-bottom: 20px;">
              <div style="width: 60px; height: 60px; background: rgba(255, 255, 255, 0.2); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto; font-size: 28px;">
                📋
              </div>
            </div>
            <h1 style="margin: 0; font-size: 32px; font-weight: 700;">Devis Personnalisé</h1>
            <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 16px;">Proposition pour {{companyName}}</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <h2 style="color: #1e293b; margin-bottom: 20px; font-size: 24px; font-weight: 600;">Bonjour {{firstName}},</h2>
            
            <p style="font-size: 17px; line-height: 1.7; color: #475569; margin-bottom: 30px;">
              Excellente nouvelle ! Suite à notre conversation, voici votre devis personnalisé pour votre site web professionnel. Nous avons préparé une offre complète adaptée à vos besoins spécifiques.
            </p>
            
            <!-- Devis Download -->
            <div style="background: linear-gradient(135deg, #ecfdf5, #d1fae5); padding: 35px; border-radius: 16px; margin: 35px 0; text-align: center; border: 1px solid #10b981;">
              <div style="margin-bottom: 20px;">
                <div style="width: 80px; height: 80px; background: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto; font-size: 32px; color: white;">
                  📄
                </div>
              </div>
              <h3 style="color: #064e3b; margin-top: 0; margin-bottom: 15px; font-size: 20px; font-weight: 600;">Votre Devis Détaillé</h3>
              <p style="margin-bottom: 25px; color: #047857; font-size: 16px;">Téléchargez votre devis complet avec toutes les prestations et garanties</p>
              <a href="{{devisLink}}" 
                 style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.3);"
                 target="_blank">
                📥 Télécharger le devis PDF →
              </a>
            </div>
            
            <!-- Process Timeline -->
            <div style="background: #ffffff; padding: 35px; border-radius: 16px; margin: 35px 0; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);">
              <h4 style="color: #1e293b; margin-top: 0; margin-bottom: 25px; font-size: 20px; font-weight: 600;">⏱️ Notre Processus de Création</h4>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; position: relative;">
                <div style="position: absolute; top: 20px; left: 50px; right: 50px; height: 2px; background: #e2e8f0; z-index: 0;"></div>
                <div style="text-align: center; flex: 1; position: relative; z-index: 1;">
                  <div style="background: #10b981; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; font-weight: bold; box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.3);">1</div>
                  <p style="margin: 0; font-size: 12px; color: #64748b; font-weight: 500;">Validation<br/>24h</p>
                </div>
                <div style="text-align: center; flex: 1; position: relative; z-index: 1;">
                  <div style="background: #10b981; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; font-weight: bold; box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.3);">2</div>
                  <p style="margin: 0; font-size: 12px; color: #64748b; font-weight: 500;">Design<br/>48h</p>
                </div>
                <div style="text-align: center; flex: 1; position: relative; z-index: 1;">
                  <div style="background: #10b981; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; font-weight: bold; box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.3);">3</div>
                  <p style="margin: 0; font-size: 12px; color: #64748b; font-weight: 500;">Développement<br/>72h</p>
                </div>
                <div style="text-align: center; flex: 1; position: relative; z-index: 1;">
                  <div style="background: #10b981; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; font-weight: bold; box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.3);">4</div>
                  <p style="margin: 0; font-size: 12px; color: #64748b; font-weight: 500;">Livraison<br/>{{deliveryDate}}</p>
                </div>
              </div>
            </div>
            
            <!-- Payment Section -->
            <div style="background: linear-gradient(135deg, #fef3c7, #fde68a); padding: 35px; border-radius: 16px; margin: 35px 0; border: 1px solid #fbbf24;">
              <h4 style="color: #92400e; margin-top: 0; margin-bottom: 25px; font-size: 20px; font-weight: 600;">💳 Finaliser votre projet</h4>
              <div style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 20px;">
                <div style="text-align: center; margin-bottom: 20px;">
                  <p style="font-size: 32px; font-weight: 700; color: #1e293b; margin: 0 0 8px 0;">
                    {{price}}€<span style="font-size: 18px; color: #64748b; font-weight: 400;"> HT</span>
                  </p>
                  <p style="color: #64748b; margin: 0; font-size: 14px;">
                    Offre valable {{validityDays}} jours • Économisez 40% vs marché
                  </p>
                </div>
                <a href="{{paymentLink}}" 
                   style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 16px; width: 100%; text-align: center; box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3);"
                   target="_blank">
                  💳 Payer maintenant →
                </a>
                <div style="margin-top: 15px; text-align: center;">
                  <p style="margin: 0; color: #64748b; font-size: 13px;">
                    <strong>Paiement sécurisé</strong> • 1x, 3x ou 6x sans frais • Garantie 30 jours
                  </p>
                </div>
              </div>
            </div>
            
            <!-- Contact -->
            <div style="text-align: center; margin: 40px 0;">
              <p style="color: #475569; margin-bottom: 25px; font-size: 17px; font-weight: 500;">
                Des questions sur votre devis ?
              </p>
              <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                <a href="mailto:{{agentEmail}}?subject=Questions devis {{companyName}}&body=Bonjour, j'ai quelques questions sur le devis pour {{companyName}}." 
                   style="background: #ffffff; color: #10b981; padding: 16px 32px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 16px; border: 2px solid #10b981;">
                  📧 Poser une question
                </a>
                <a href="tel:+33612345678" 
                   style="background: #10b981; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 16px;">
                  📞 Appeler un expert
                </a>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.6; margin-bottom: 15px;">
              Cordialement,<br>
              <strong style="color: #1e293b; font-size: 16px;">{{agentName}}</strong><br>
              <span style="color: #10b981; font-weight: 600;">LeadForge AI</span> • Votre partenaire digital<br>
              <a href="mailto:{{agentEmail}}" style="color: #10b981; text-decoration: none; font-weight: 500;">{{agentEmail}}</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    textContent: `
Bonjour {{firstName}},

Excellente nouvelle ! Suite à notre conversation, voici votre devis personnalisé pour votre site web professionnel. Nous avons préparé une offre complète adaptée à vos besoins spécifiques.

📄 Votre devis détaillé : {{devisLink}}

⏱️ Notre processus de création :
1. Validation (24h) → 2. Design (48h) → 3. Développement (72h) → 4. Livraison ({{deliveryDate}})

💳 Finaliser votre projet :
Montant : {{price}}€ HT
• Offre valable {{validityDays}} jours
• Économisez 40% vs marché
• Paiement sécurisé : 1x, 3x ou 6x sans frais
• Garantie 30 jours

Payer maintenant : {{paymentLink}}

Des questions sur votre devis ?
📧 Répondez à cet email
📞 Appelez-nous pour parler à un expert

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
    subject: '🎉 Paiement confirmé - Votre projet {{companyName}} démarre !',
    variables: ['firstName', 'companyName', 'invoiceLink', 'paymentLink', 'price', 'agentName', 'agentEmail', 'clientPortalLink', 'deliveryDate'],
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>LeadForge AI - Paiement Confirmé</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      </head>
      <body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f8fafc; line-height: 1.6;">
        <div style="max-width: 650px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          
          <!-- Header Success -->
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 40px 30px; text-align: center;">
            <div style="margin-bottom: 20px;">
              <div style="width: 80px; height: 80px; background: rgba(255, 255, 255, 0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto; font-size: 40px;">
                🎉
              </div>
            </div>
            <h1 style="margin: 0; font-size: 32px; font-weight: 700;">Paiement Confirmé !</h1>
            <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 16px;">Bienvenue dans l'aventure LeadForge AI</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <h2 style="color: #1e293b; margin-bottom: 20px; font-size: 24px; font-weight: 600;">Bonjour {{firstName}},</h2>
            
            <p style="font-size: 17px; line-height: 1.7; color: #475569; margin-bottom: 30px;">
              Félicitations ! Votre paiement de <strong style="color: #1e293b;">{{price}}€ HT</strong> a été reçu avec succès. Votre projet pour <strong style="color: #1e293b;">{{companyName}}</strong> est maintenant officiellement lancé !
            </p>
            
            <!-- Success Message -->
            <div style="background: linear-gradient(135deg, #ecfdf5, #d1fae5); padding: 35px; border-radius: 16px; margin: 35px 0; text-align: center; border: 1px solid #10b981;">
              <div style="margin-bottom: 20px;">
                <div style="width: 80px; height: 80px; background: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto; font-size: 32px; color: white;">
                  ✓
                </div>
              </div>
              <h3 style="color: #064e3b; margin-top: 0; margin-bottom: 15px; font-size: 20px; font-weight: 600;">Projet Activé</h3>
              <p style="margin-bottom: 25px; color: #047857; font-size: 16px;">Votre espace client est prêt. Accédez à toutes les informations de votre projet.</p>
              <a href="{{clientPortalLink}}" 
                 style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.3);"
                 target="_blank">
                🚀 Accéder à mon espace client →
              </a>
            </div>
            
            <!-- Next Steps -->
            <div style="background: #ffffff; padding: 35px; border-radius: 16px; margin: 35px 0; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);">
              <h4 style="color: #1e293b; margin-top: 0; margin-bottom: 25px; font-size: 20px; font-weight: 600;">📋 Prochaines Étapes</h4>
              <div style="space-y: 15px;">
                <div style="display: flex; align-items: flex-start; margin-bottom: 20px;">
                  <div style="background: #3b82f6; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; flex-shrink: 0; font-weight: bold;">1</div>
                  <div>
                    <strong style="color: #1e293b; font-size: 16px;">Validation des besoins</strong>
                    <p style="margin: 4px 0 0 0; color: #64748b; font-size: 14px;">Nous vous contacterons dans les 24h pour valider les détails</p>
                  </div>
                </div>
                <div style="display: flex; align-items: flex-start; margin-bottom: 20px;">
                  <div style="background: #3b82f6; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; flex-shrink: 0; font-weight: bold;">2</div>
                  <div>
                    <strong style="color: #1e293b; font-size: 16px;">Design et maquette</strong>
                    <p style="margin: 4px 0 0 0; color: #64748b; font-size: 14px;">Création de la maquette visuelle (48h)</p>
                  </div>
                </div>
                <div style="display: flex; align-items: flex-start; margin-bottom: 20px;">
                  <div style="background: #3b82f6; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; flex-shrink: 0; font-weight: bold;">3</div>
                  <div>
                    <strong style="color: #1e293b; font-size: 16px;">Développement</strong>
                    <p style="margin: 4px 0 0 0; color: #64748b; font-size: 14px;">Intégration technique et fonctionnalités (72h)</p>
                  </div>
                </div>
                <div style="display: flex; align-items: flex-start;">
                  <div style="background: #10b981; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; flex-shrink: 0; font-weight: bold;">✓</div>
                  <div>
                    <strong style="color: #1e293b; font-size: 16px;">Livraison finale</strong>
                    <p style="margin: 4px 0 0 0; color: #64748b; font-size: 14px;">Mise en ligne et formation ({{deliveryDate}})</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Invoice Download -->
            <div style="background: linear-gradient(135deg, #f0f9ff, #e0f2fe); padding: 35px; border-radius: 16px; margin: 35px 0; text-align: center; border: 1px solid #3b82f6;">
              <h4 style="color: #1e3a8a; margin-top: 0; margin-bottom: 15px; font-size: 20px; font-weight: 600;">📄 Votre Facture</h4>
              <p style="margin-bottom: 25px; color: #1e40af; font-size: 16px;">Téléchargez votre facture pour vos archives comptables</p>
              <a href="{{invoiceLink}}" 
                 style="background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3);"
                 target="_blank">
                📥 Télécharger la facture →
              </a>
            </div>
            
            <!-- Support -->
            <div style="text-align: center; margin: 40px 0;">
              <p style="color: #475569; margin-bottom: 25px; font-size: 17px; font-weight: 500;">
                Besoin d'aide ? Notre équipe est là pour vous !
              </p>
              <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                <a href="mailto:{{agentEmail}}?subject=Support projet {{companyName}}&body=Bonjour, j'ai besoin d'aide pour mon projet {{companyName}}." 
                   style="background: #ffffff; color: #3b82f6; padding: 16px 32px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 16px; border: 2px solid #3b82f6;">
                  📧 Contacter le support
                </a>
                <a href="tel:+33612345678" 
                   style="background: #3b82f6; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 16px;">
                  📞 Appeler un expert
                </a>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.6; margin-bottom: 15px;">
              Merci de votre confiance,<br>
              <strong style="color: #1e293b; font-size: 16px;">{{agentName}}</strong><br>
              <span style="color: #10b981; font-weight: 600;">LeadForge AI</span> • Votre partenaire digital<br>
              <a href="mailto:{{agentEmail}}" style="color: #10b981; text-decoration: none; font-weight: 500;">{{agentEmail}}</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    textContent: `
Bonjour {{firstName}},

Félicitations ! Votre paiement de {{price}}€ HT a été reçu avec succès. Votre projet pour {{companyName}} est maintenant officiellement lancé !

🎉 Projet Activé
Accédez à votre espace client : {{clientPortalLink}}

📋 Prochaines Étapes :
1. Validation des besoins - Nous vous contacterons dans les 24h
2. Design et maquette - Création visuelle (48h)
3. Développement - Intégration technique (72h)
4. Livraison finale - Mise en ligne et formation ({{deliveryDate}})

📄 Votre facture : {{invoiceLink}}

Besoin d'aide ? Notre équipe est là pour vous !
📧 Contacter le support
📞 Appeler un expert

Merci de votre confiance,
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
    name: 'Rappel 1 - Après Email 1',
    category: 'reminder',
    subject: 'Suivi : Votre site web {{companyName}} vous attend 🚀',
    variables: ['firstName', 'companyName', 'websiteLink', 'agentName', 'agentEmail'],
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>LeadForge AI - Suivi</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      </head>
      <body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f8fafc; line-height: 1.6;">
        <div style="max-width: 650px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; padding: 40px 30px; text-align: center;">
            <div style="margin-bottom: 20px;">
              <div style="width: 60px; height: 60px; background: rgba(255, 255, 255, 0.2); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto; font-size: 28px;">
                🔄
              </div>
            </div>
            <h1 style="margin: 0; font-size: 32px; font-weight: 700;">Suivi Personnalisé</h1>
            <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 16px;">Votre projet {{companyName}}</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <h2 style="color: #1e293b; margin-bottom: 20px; font-size: 24px; font-weight: 600;">Bonjour {{firstName}},</h2>
            
            <p style="font-size: 17px; line-height: 1.7; color: #475569; margin-bottom: 30px;">
              Je reviens vers vous concernant votre site web professionnel que nous avons préparé pour <strong style="color: #1e293b;">{{companyName}}</strong>. J'espère que vous avez eu l'occasion de consulter notre proposition.
            </p>
            
            <!-- Quick Reminder -->
            <div style="background: linear-gradient(135deg, #f0f9ff, #e0f2fe); padding: 35px; border-radius: 16px; margin: 35px 0; text-align: center; border: 1px solid #3b82f6;">
              <div style="margin-bottom: 20px;">
                <div style="width: 80px; height: 80px; background: #3b82f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto; font-size: 32px; color: white;">
                  🔗
                </div>
              </div>
              <h3 style="color: #1e3a8a; margin-top: 0; margin-bottom: 15px; font-size: 20px; font-weight: 600;">Votre site vous attend</h3>
              <p style="margin-bottom: 25px; color: #1e40af; font-size: 16px;">Découvrez ou redécouvrez votre présence en ligne professionnelle</p>
              <a href="{{websiteLink}}" 
                 style="background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3);"
                 target="_blank">
                🚀 Voir mon site web →
              </a>
            </div>
            
            <!-- Value Reminder -->
            <div style="background: #ffffff; padding: 35px; border-radius: 16px; margin: 35px 0; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);">
              <h4 style="color: #1e293b; margin-top: 0; margin-bottom: 25px; font-size: 20px; font-weight: 600;">💡 Pourquoi choisir LeadForge AI :</h4>
              <div style="space-y: 15px;">
                <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
                  <div style="background: #10b981; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; flex-shrink: 0; font-size: 12px; font-weight: bold;">✓</div>
                  <div>
                    <strong style="color: #1e293b; font-size: 15px;">Économie de 40%</strong>
                    <p style="margin: 4px 0 0 0; color: #64748b; font-size: 14px;">vs agences traditionnelles</p>
                  </div>
                </div>
                <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
                  <div style="background: #10b981; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; flex-shrink: 0; font-size: 12px; font-weight: bold;">✓</div>
                  <div>
                    <strong style="color: #1e293b; font-size: 15px;">Livraison 7 jours</strong>
                    <p style="margin: 4px 0 0 0; color: #64748b; font-size: 14px;">vs 3-4 semaines standard</p>
                  </div>
                </div>
                <div style="display: flex; align-items: flex-start;">
                  <div style="background: #10b981; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; flex-shrink: 0; font-size: 12px; font-weight: bold;">✓</div>
                  <div>
                    <strong style="color: #1e293b; font-size: 15px;">Garantie 30 jours</strong>
                    <p style="margin: 4px 0 0 0; color: #64748b; font-size: 14px;">satisfaction ou remboursement</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- CTA -->
            <div style="text-align: center; margin: 40px 0;">
              <p style="color: #475569; margin-bottom: 25px; font-size: 17px; font-weight: 500;">
                Prêt à discuter de votre projet ?
              </p>
              <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                <a href="mailto:{{agentEmail}}?subject=Suite proposition {{companyName}}&body=Bonjour, je souhaite discuter du projet pour {{companyName}}." 
                   style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.3);">
                  💬 Discuter du projet
                </a>
                <a href="tel:+33612345678" 
                   style="background: #ffffff; color: #3b82f6; padding: 16px 32px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 16px; border: 2px solid #3b82f6;">
                  📞 Appeler un expert
                </a>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.6; margin-bottom: 15px;">
              Cordialement,<br>
              <strong style="color: #1e293b; font-size: 16px;">{{agentName}}</strong><br>
              <span style="color: #3b82f6; font-weight: 600;">LeadForge AI</span> • Votre partenaire digital<br>
              <a href="mailto:{{agentEmail}}" style="color: #3b82f6; text-decoration: none; font-weight: 500;">{{agentEmail}}</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    textContent: `
Bonjour {{firstName}},

Je reviens vers vous concernant votre site web professionnel que nous avons préparé pour {{companyName}}. J'espère que vous avez eu l'occasion de consulter notre proposition.

🔗 Votre site vous attend : {{websiteLink}}

💡 Pourquoi choisir LeadForge AI :
✓ Économie de 40% vs agences traditionnelles
✓ Livraison 7 jours vs 3-4 semaines standard
✓ Garantie 30 jours satisfaction ou remboursement

Prêt à discuter de votre projet ?
💬 Répondez à cet email pour discuter
📞 Appelez-nous pour parler à un expert

Cordialement,
{{agentName}}
LeadForge AI • Votre partenaire digital
{{agentEmail}}
    `
  },

  {
    id: 'reminder2_before_expiry',
    name: 'Rappel 2 - Dernière Chance',
    category: 'reminder',
    subject: '⏰ Dernière chance : Votre offre spéciale expire bientôt !',
    variables: ['firstName', 'companyName', 'devisLink', 'paymentLink', 'price', 'agentName', 'agentEmail', 'expiryDate'],
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>LeadForge AI - Dernière Chance</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      </head>
      <body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f8fafc; line-height: 1.6;">
        <div style="max-width: 650px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          
          <!-- Header Urgent -->
          <div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 40px 30px; text-align: center;">
            <div style="margin-bottom: 20px;">
              <div style="width: 60px; height: 60px; background: rgba(255, 255, 255, 0.2); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto; font-size: 28px;">
                ⏰
              </div>
            </div>
            <h1 style="margin: 0; font-size: 32px; font-weight: 700;">Dernière Chance</h1>
            <p style="margin: 8px 0 0 0; opacity: 0.9; font-size: 16px;">Offre spéciale expirant le {{expiryDate}}</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <h2 style="color: #1e293b; margin-bottom: 20px; font-size: 24px; font-weight: 600;">Bonjour {{firstName}},</h2>
            
            <p style="font-size: 17px; line-height: 1.7; color: #475569; margin-bottom: 30px;">
              C'est votre dernière opportunité ! Notre offre spéciale pour votre site web <strong style="color: #1e293b;">{{companyName}}</strong> expire dans quelques jours. Ne manquez pas cette chance d'économiser 40% sur votre présence en ligne professionnelle.
            </p>
            
            <!-- Urgency Box -->
            <div style="background: linear-gradient(135deg, #fef2f2, #fee2e2); padding: 35px; border-radius: 16px; margin: 35px 0; text-align: center; border: 1px solid #dc2626;">
              <div style="margin-bottom: 20px;">
                <div style="width: 80px; height: 80px; background: #dc2626; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto; font-size: 32px; color: white; animation: pulse 2s infinite;">
                  ⏰
                </div>
              </div>
              <h3 style="color: #991b1b; margin-top: 0; margin-bottom: 15px; font-size: 20px; font-weight: 600;">Offre expire le {{expiryDate}}</h3>
              <p style="margin-bottom: 25px; color: #b91c1c; font-size: 16px;">Finalisez maintenant pour bénéficier de -40% sur le tarif normal</p>
              <a href="{{paymentLink}}" 
                 style="background: linear-gradient(135deg, #dc2626, #b91c1c); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px -1px rgba(220, 38, 38, 0.3);"
                 target="_blank">
                🚀 Finaliser maintenant →
              </a>
            </div>
            
            <!-- What You Lose -->
            <div style="background: #ffffff; padding: 35px; border-radius: 16px; margin: 35px 0; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);">
              <h4 style="color: #1e293b; margin-top: 0; margin-bottom: 25px; font-size: 20px; font-weight: 600;">⚠️ Ce que vous risquez de perdre :</h4>
              <div style="space-y: 15px;">
                <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
                  <div style="background: #dc2626; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; flex-shrink: 0; font-size: 12px; font-weight: bold;">!</div>
                  <div>
                    <strong style="color: #1e293b; font-size: 15px;">Économie de 40%</strong>
                    <p style="margin: 4px 0 0 0; color: #64748b; font-size: 14px;">Plus de {{price}}€ d'économies perdues</p>
                  </div>
                </div>
                <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
                  <div style="background: #dc2626; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; flex-shrink: 0; font-size: 12px; font-weight: bold;">!</div>
                  <div>
                    <strong style="color: #1e293b; font-size: 15px;">Livraison express</strong>
                    <p style="margin: 4px 0 0 0; color: #64748b; font-size: 14px;">Attente de 3-4 semaines au lieu de 7 jours</p>
                  </div>
                </div>
                <div style="display: flex; align-items: flex-start;">
                  <div style="background: #dc2626; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; flex-shrink: 0; font-size: 12px; font-weight: bold;">!</div>
                  <div>
                    <strong style="color: #1e293b; font-size: 15px;">Garantie 30 jours</strong>
                    <p style="margin: 4px 0 0 0; color: #64748b; font-size: 14px;">Protection satisfaction perdue</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Final CTA -->
            <div style="text-align: center; margin: 40px 0;">
              <p style="color: #475569; margin-bottom: 25px; font-size: 17px; font-weight: 500;">
                Ne laissez pas cette opportunité vous échapper !
              </p>
              <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                <a href="{{paymentLink}}" 
                   style="background: linear-gradient(135deg, #dc2626, #b91c1c); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px -1px rgba(220, 38, 38, 0.3);">
                  💳 Payer maintenant
                </a>
                <a href="mailto:{{agentEmail}}?subject=Urgence {{companyName}}&body=Bonjour, je souhaite finaliser mon projet avant l'expiration de l'offre." 
                   style="background: #ffffff; color: #dc2626; padding: 16px 32px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 16px; border: 2px solid #dc2626;">
                  📞 Contacter d'urgence
                </a>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.6; margin-bottom: 15px;">
              Cordialement,<br>
              <strong style="color: #1e293b; font-size: 16px;">{{agentName}}</strong><br>
              <span style="color: #dc2626; font-weight: 600;">LeadForge AI</span> • Votre partenaire digital<br>
              <a href="mailto:{{agentEmail}}" style="color: #dc2626; text-decoration: none; font-weight: 500;">{{agentEmail}}</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    textContent: `
Bonjour {{firstName}},

C'est votre dernière opportunité ! Notre offre spéciale pour votre site web {{companyName}} expire le {{expiryDate}}. Ne manquez pas cette chance d'économiser 40% sur votre présence en ligne professionnelle.

⏰ Offre expire le {{expiryDate}}
Finalisez maintenant pour bénéficier de -40% sur le tarif normal

⚠️ Ce que vous risquez de perdre :
! Économie de 40% - Plus de {{price}}€ d'économies perdues
! Livraison express - Attente de 3-4 semaines au lieu de 7 jours
! Garantie 30 jours - Protection satisfaction perdue

Ne laissez pas cette opportunité vous échapper !
💳 Payer maintenant : {{paymentLink}}
📞 Contacter d'urgence : {{agentEmail}}

Cordialement,
{{agentName}}
LeadForge AI • Votre partenaire digital
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
