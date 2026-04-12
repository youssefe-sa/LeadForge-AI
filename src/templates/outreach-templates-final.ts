// ============================================================
// Solutions Web - Templates Email Outreach Agent (Services Siteup Premium)
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

// ============================================================
// 1. TEMPLATES DE VENTE (Tunnel Principal)
// ============================================================
export const salesTemplates: EmailTemplate[] = [
  {
    id: 'email1_presentation',
    name: 'Email 1 - Démo & Premier Contact',
    category: 'sale',
    subject: '🎁 Une surprise pour {{companyName}} : Votre nouveau site est prêt',
    variables: ['firstName', 'companyName', 'websiteLink', 'startProjectLink'],
    htmlContent: `
      <!DOCTYPE html>
      <html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f7f9; color: #333333;">
        <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          <div style="background-color: #D4500A; padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 26px; color: #ffffff; letter-spacing: 1px; font-weight: 800;">SERVICES SITEUP</h1>
            <p style="margin: 5px 0 0 0; color: #ffffff; opacity: 0.9; font-size: 14px; text-transform: uppercase;">Solutions Web Professionnelles</p>
          </div>
          <div style="padding: 40px 30px;">
            <h2 style="margin-top: 0; color: #2c3e50; font-size: 22px;">Bonjour {{firstName}},</h2>
            <p style="font-size: 16px; line-height: 1.6;">J'ai conçu une version modernisée et ultra-performante du site de <strong>{{companyName}}</strong>.</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="{{websiteLink}}" style="display: inline-block; background-color: #2c3e50; color: #ffffff; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold;">🔍 VOIR VOTRE DÉMO EN LIGNE</a>
            </div>
            <div style="background-color: #fff8f5; padding: 30px; border-radius: 12px; border: 2px dashed #D4500A; margin: 30px 0; text-align: center;">
              <h3 style="margin-top: 0; color: #D4500A; font-size: 20px;">🚀 Prêt à passer au niveau supérieur ?</h3>
              <p style="font-size: 15px; margin-bottom: 25px;">Si cette démo vous plaît, nous pouvons l'installer officiellement en moins de 48h.</p>
              <a href="{{startProjectLink}}" style="display: inline-block; background-color: #D4500A; color: #ffffff; padding: 20px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 18px;">DÉMARRER LE PROJET MAINTENANT →</a>
            </div>
          </div>
          <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="margin: 0; font-size: 14px; font-weight: bold; color: #64748b;">Services Siteup</p>
          </div>
        </div>
      </body></html>`,
    textContent: "Bonjour {{firstName}}, j'ai conçu un nouveau site pour {{companyName}}. Voir la démo : {{websiteLink}}. Démarrer ici : {{startProjectLink}}"
  },
  {
    id: 'email2_devis',
    name: 'Email 2 - Devis & Paiement',
    category: 'sale',
    subject: '📄 Votre Devis & Lien de Paiement - {{companyName}}',
    variables: ['firstName', 'companyName', 'devisLink', 'paymentLink'],
    htmlContent: `
      <!DOCTYPE html>
      <html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f7f9; color: #333333;">
        <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          <div style="background-color: #D4500A; padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 26px; color: #ffffff; letter-spacing: 1px; font-weight: 800;">SERVICES SITEUP</h1>
            <p style="margin: 5px 0 0 0; color: #ffffff; opacity: 0.9; font-size: 14px; text-transform: uppercase;">Devis & Paiement</p>
          </div>
          <div style="padding: 40px 30px;">
            <h2 style="margin-top: 0; color: #2c3e50; font-size: 22px;">Ravi de vous accompagner, {{firstName}} !</h2>
            <p style="font-size: 16px;">Voici les documents pour lancer le projet <strong>{{companyName}}</strong> dès aujourd'hui :</p>
            <div style="text-align: center; margin: 30px 0;"><a href="{{devisLink}}" style="display: inline-block; background-color: #f1f5f9; color: #2c3e50; padding: 12px 24px; text-decoration: none; border: 1px solid #e2e8f0; border-radius: 6px; font-weight: bold;">📄 CONSULTER LE DEVIS</a></div>
            <div style="background-color: #fff8f5; padding: 25px; border-radius: 8px; border: 1px solid #ffe7d9;">
              <h3 style="margin-top: 0; color: #D4500A; font-size: 18px;">💳 Validation de la commande</h3>
              <p style="font-size: 15px;">Acompte de <strong>46$</strong> requis pour commencer. Solde de 100$ à la livraison.</p>
              <div style="text-align: center; margin-top: 20px;"><a href="{{paymentLink}}" style="display: inline-block; background-color: #28a745; color: #ffffff; padding: 18px 36px; text-decoration: none; border-radius: 8px; font-weight: bold;">✅ PAYER L'ACOMPTE (46$) →</a></div>
            </div>
          </div>
        </div>
      </body></html>`,
    textContent: "Voici votre devis pour {{companyName}} : {{devisLink}}. Payer l'acompte : {{paymentLink}}"
  },
  {
    id: 'email3_confirmation',
    name: 'Email 3 - Confirmation Dépôt',
    category: 'sale',
    subject: '✅ Confirmation de votre acompte - {{companyName}}',
    variables: ['firstName', 'companyName', 'deliveryDate'],
    htmlContent: `
      <!DOCTYPE html>
      <html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f7f9; color: #333333;">
        <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          <div style="background-color: #D4500A; padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 26px; color: #ffffff; letter-spacing: 1px; font-weight: 800;">SERVICES SITEUP</h1>
          </div>
          <div style="padding: 40px 30px;">
            <h2 style="margin-top: 0; color: #2c3e50; font-size: 22px;">C'est parti, {{firstName}} !</h2>
            <p style="font-size: 16px;">Nous avons reçu votre acompte pour <strong>{{companyName}}</strong>.</p>
            <p style="background: #f0fdf4; padding: 20px; border-radius: 8px; border: 1px solid #dcfce7; color: #166534;">⚙️ <strong>Travaux en cours</strong> : Livraison prévue le <strong>{{deliveryDate}}</strong>.</p>
          </div>
        </div>
      </body></html>`,
    textContent: "Dépôt confirmé pour {{companyName}}. Livraison finale le {{deliveryDate}}."
  },
  {
    id: 'email4_final_payment',
    name: 'Email 4 - Paiement Final',
    category: 'sale',
    subject: '🎉 Votre site {{companyName}} est prêt !',
    variables: ['firstName', 'companyName', 'websiteLink', 'finalPaymentLink'],
    htmlContent: `
      <!DOCTYPE html>
      <html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f7f9; color: #333333;">
        <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          <div style="background-color: #D4500A; padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 26px; color: #ffffff; letter-spacing: 1px; font-weight: 800;">SERVICES SITEUP</h1>
          </div>
          <div style="padding: 40px 30px;">
            <h2 style="margin-top: 0; color: #2c3e50; font-size: 22px;">Bonne nouvelle, {{firstName}} !</h2>
            <p style="font-size: 16px;">Votre site pour <strong>{{companyName}}</strong> est terminé.</p>
            <div style="text-align: center; margin: 30px 0;"><a href="{{websiteLink}}" style="display: inline-block; background-color: #f1f5f9; color: #2c3e50; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">🔍 VOIR VOTRE SITE</a></div>
            <div style="background-color: #fff8f5; padding: 25px; border-radius: 8px; border: 1px solid #ffe7d9; text-align: center;">
              <h3 style="margin-top: 0; color: #D4500A; font-size: 18px;">💳 Dernière étape</h3>
              <p style="font-size: 15px;">Solde de <strong>100$</strong> requis pour la mise en ligne officielle.</p>
              <a href="{{finalPaymentLink}}" style="display: inline-block; background-color: #28a745; color: #ffffff; padding: 18px 36px; text-decoration: none; border-radius: 8px; font-weight: bold;">🚀 PUBLIER LE SITE →</a>
            </div>
          </div>
        </div>
      </body></html>`,
    textContent: "Votre site {{companyName}} est prêt ! Solde de 100$ : {{finalPaymentLink}}"
  },
  {
    id: 'email5_final_payment_confirmation',
    name: 'Email 5 - Confirmation Paiement Final',
    category: 'sale',
    subject: '✅ Paiement reçu ! {{companyName}} est en ligne',
    variables: ['firstName', 'companyName', 'websiteLink'],
    htmlContent: `
      <!DOCTYPE html>
      <html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f7f9; color: #333333;">
        <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          <div style="background-color: #28a745; padding: 30px; text-align: center;"><h1 style="color:white; margin:0;">SITE PUBLIÉ !</h1></div>
          <div style="padding: 40px 30px; text-align: center;">
            <p style="font-size: 18px;">Félicitations {{firstName}} ! Votre site <strong>{{companyName}}</strong> est en ligne :</p>
            <a href="{{websiteLink}}" style="font-size: 20px; color: #D4500A; font-weight: bold;">{{websiteLink}}</a>
          </div>
        </div>
      </body></html>`,
    textContent: "Félicitations ! Votre site {{companyName}} est en ligne : {{websiteLink}}"
  },
  {
    id: 'email6_delivery_documentation',
    name: 'Email 6 - Livraison & Accès',
    category: 'sale',
    subject: '🔐 Vos Accès - {{companyName}}',
    variables: ['firstName', 'companyName', 'adminLink', 'adminUsername', 'adminPassword', 'documentationLink'],
    htmlContent: `
      <!DOCTYPE html>
      <html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f7f9; color: #333333;">
        <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          <div style="background-color: #2c3e50; padding: 30px; text-align: center;"><h1 style="color:white; margin:0;">ACCÈS CLIENT</h1></div>
          <div style="padding: 40px 30px;">
            <h2 style="color: #2c3e50;">Voici vos accès, {{firstName}}</h2>
            <div style="background: #f8fafc; padding: 25px; border-radius: 8px; border: 1px solid #e2e8f0; margin: 20px 0;">
              <p><strong>Admin :</strong> <a href="{{adminLink}}" style="color: #D4500A;">{{adminLink}}</a></p>
              <p><strong>User :</strong> {{adminUsername}}</p>
              <p><strong>Pass :</strong> {{adminPassword}}</p>
            </div>
            <div style="text-align: center;"><a href="{{documentationLink}}" style="display: inline-block; background-color: #D4500A; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold;">📚 VOIR LA DOCUMENTATION</a></div>
          </div>
        </div>
      </body></html>`,
    textContent: "Voici vos accès pour {{companyName}}. Admin: {{adminLink}}, User: {{adminUsername}}, Pass: {{adminPassword}}"
  }
];

// ============================================================
// 2. TEMPLATES DE RAPPEL (Harmonisés)
// ============================================================
export const reminderTemplates: EmailTemplate[] = [
  {
    id: 'reminder1_after_email1',
    name: 'Rappel 1 - Après Email 1',
    category: 'reminder',
    subject: 'Suivi : Votre démo pour {{companyName}}',
    variables: ['firstName', 'companyName', 'websiteLink', 'startProjectLink'],
    htmlContent: `
      <!DOCTYPE html>
      <html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f7f9; color: #333333;">
        <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          <div style="background-color: #D4500A; padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 26px; color: #ffffff; letter-spacing: 1px; font-weight: 800;">SERVICES SITEUP</h1>
          </div>
          <div style="padding: 40px 30px;">
            <h2 style="margin-top: 0; color: #2c3e50;">Bonjour {{firstName}},</h2>
            <p style="font-size: 16px;">Je reviens vers vous concernant la démo du nouveau site pour <strong>{{companyName}}</strong>.</p>
            <div style="text-align: center; margin: 30px 0;"><a href="{{websiteLink}}" style="display: inline-block; background-color: #2c3e50; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">🔍 REVOIR LA DÉMO EN LIGNE</a></div>
            <p style="font-size: 15px;">Nous pouvons lancer les travaux d'installation dès aujourd'hui.</p>
            <div style="text-align: center; margin-top: 25px;"><a href="{{startProjectLink}}" style="display: inline-block; background-color: #D4500A; color: #ffffff; padding: 18px 36px; text-decoration: none; border-radius: 8px; font-weight: bold;">DÉMARRER LE PROJET MAINTENANT →</a></div>
          </div>
        </div>
      </body></html>`,
    textContent: "Bonjour {{firstName}}, avez-vous vu la démo pour {{companyName}} ? Voir ici : {{websiteLink}}. Démarrer ici : {{startProjectLink}}"
  },
  {
    id: 'reminder3_final_payment',
    name: 'Rappel 3 - Paiement Final',
    category: 'reminder',
    subject: '🎉 Votre site {{companyName}} est prêt (Rappel)',
    variables: ['firstName', 'companyName', 'websiteLink', 'finalPaymentLink'],
    htmlContent: `
      <!DOCTYPE html>
      <html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f7f9; color: #333333;">
        <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          <div style="background-color: #D4500A; padding: 30px; text-align: center;"><h1 style="color:white; margin:0;">SERVICES SITEUP</h1></div>
          <div style="padding: 40px 30px;">
            <h2>Bonjour {{firstName}}, votre site est prêt !</h2>
            <p>Le site de <strong>{{companyName}}</strong> attend sa mise en ligne officielle.</p>
            <div style="text-align: center; margin: 30px 0;"><a href="{{finalPaymentLink}}" style="display: inline-block; background-color: #28a745; color: #ffffff; padding: 18px 36px; text-decoration: none; border-radius: 8px; font-weight: bold;">🚀 PAYER LE SOLDE & PUBLIER</a></div>
          </div>
        </div>
      </body></html>`,
    textContent: "Votre site {{companyName}} est prêt ! Pour le publier : {{finalPaymentLink}}"
  }
];

// ============================================================
// 3. EXPORTS & UTILITAIRES
// ============================================================
export const PREMIUM_OUTREACH_TEMPLATES = salesTemplates; // Alias pour compatibilité

export function getTemplateById(id: string): EmailTemplate | undefined {
  const all = [...salesTemplates, ...reminderTemplates];
  return all.find(template => template.id === id);
}

export const allTemplates = [...salesTemplates, ...reminderTemplates];
