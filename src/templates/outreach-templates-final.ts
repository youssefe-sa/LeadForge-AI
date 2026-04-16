// ============================================================
// Solutions Web - Templates Email Outreach Agent (Services Siteup Premium - MIROIR SUPABASE)
// ============================================================

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  htmlContent: string;
  textContent: string;
  variables: string[];
  category: 'sale' | 'reminder';
  language: 'FR' | 'US';
}

import { usSalesTemplates } from './outreach-templates-us';

const LOGO_SVG = `
    <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="50" height="50" rx="14" fill="#D4500A" />
      <text x="25" y="33" font-family="Arial" font-weight="900" font-size="24" fill="white" text-anchor="middle">ST</text>
    </svg>
`;

const HEADER_HTML = `
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 25px;">
    ${LOGO_SVG}
    <div>
      <div style="font-family: Arial; font-weight: bold; font-size: 20px; color: #1a202c;">Services-Siteup</div>
      <div style="font-size: 11px; color: #718096; font-style: italic;">Propulsez votre présence en ligne avec excellence</div>
    </div>
  </div>
`;

export const salesTemplates: EmailTemplate[] = [
  ...usSalesTemplates,
  {
    id: 'step-1-start',
    name: '1. Présentation Site Web',
    category: 'sale',
    language: 'FR',
    subject: '🎁 Une surprise pour {{companyName}} : Votre nouveau site est prêt',
    variables: ['firstName', 'companyName', 'websiteLink', 'startProjectLink'],
    htmlContent: `<div style="font-family: -apple-system, sans-serif; color: #1a202c; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #edf2f7; border-radius: 10px; background: #ffffff;">
  ${HEADER_HTML}
  <p>Bonjour <strong>{{firstName}}</strong>,</p>
  <p style="font-size: 15px;">J’ai pris l’initiative de créer une <strong>version professionnelle complète de site web</strong> pour <strong>{{companyName}}</strong>.</p>
  <p style="font-size: 14px;">L’objectif est simple : vous aider à <strong>générer plus de clients locaux grâce à une présence en ligne optimisée et professionnelle</strong>.</p>
  <div style="text-align: center; margin: 25px 0;">
    <a href="{{websiteLink}}" style="background: #D4500A; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 15px; display: inline-block;">VOIR VOTRE SITE →</a>
  </div>
  <p style="text-align: center; font-size: 13px; color: #718096; margin-top: -10px;">⏱️ 30 secondes suffisent pour comprendre son potentiel commercial</p>
  <p style="margin-top: 25px;">Ce site est conçu pour :</p>
  <ul style="padding-left: 18px; font-size: 14px; line-height: 1.6;">
    <li>📞 Générer plus d’appels clients automatiquement</li>
    <li>📱 Être parfaitement optimisé pour mobile (priorité clients locaux)</li>
    <li>💬 Intégrer WhatsApp, formulaire de contact et chatbot intelligent</li>
    <li>🚀 Être visible sur Google grâce à un SEO local optimisé</li>
  </ul>
  <p style="margin-top: 20px; font-size: 14px;">Aujourd’hui, la présence en ligne d’une entreprise est devenue un facteur décisif dans la confiance et la prise de décision des clients.</p>
  <div style="background: #f7fafc; padding: 15px; border-radius: 8px; margin-top: 20px; font-size: 14px;">
    <strong>💰 Activation du projet :</strong><br><br>
    • {{deposit}} pour démarrer<br>
    • {{balance}} à la livraison finale<br><br>
    ✔ Hébergement + domaine inclus (1 an)<br>
    ✔ Support et maintenance inclus<br>
  </div>
  <p style="margin-top: 25px; font-size: 15px;">Si vous souhaitez activer ce site pour votre entreprise, il suffit de confirmer.</p>
  <div style="text-align: center; margin-top: 15px;">
    <a href="{{startProjectLink}}" style="background: #1a202c; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 14px; display: inline-block;">CONFIRMER ET ACTIVER →</a>
  </div>
  <p style="text-align:center; font-size:13px; color:#718096; margin-top:10px;">👉 En cliquant, vous lancez officiellement la création de votre site, et vous recevrez immédiatement un devis détaillé ainsi que le lien de paiement pour activer le projet.</p>
  <p style="margin-top: 20px; font-size: 13px; color: #4a5568;">Si vous avez des questions ou besoin de précisions, il vous suffit de répondre directement à cet email. Nous vous répondrons sous un délai maximum de 2 heures.</p>
  <p style="margin-top: 35px; border-top: 1px solid #edf2f7; padding-top: 20px; font-size: 13px; color: #4a5568;">Cordialement,<br>Consultant Digital | Services-Siteup</p>
</div>`,
    textContent: "Email 1"
  },
  {
    id: 'step-2-devis',
    name: '2. Devis & Paiement',
    category: 'sale',
    language: 'FR',
    subject: '📄 Confirmation & Devis Officiel - {{companyName}}',
    variables: ['firstName', 'companyName', 'devisLink', 'paymentLink'],
    htmlContent: `<div style="font-family: -apple-system, sans-serif; color: #1a202c; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #edf2f7;">
  ${HEADER_HTML}
  <h2 style="font-size: 18px; border-bottom: 2px solid #D4500A; padding-bottom: 10px;">CONFIRMATION & DEVIS OFFICIEL</h2>
  <p>Bonjour <strong>{{firstName}}</strong>,</p>
  <p style="font-size: 14px;">Suite à votre intérêt, nous avons préparé une solution complète pour <strong>{{companyName}}</strong>.</p>
  <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 13px;">
    <tr style="background: #f8fafc;"><td style="padding: 10px; border: 1px solid #edf2f7;">🌐 <b>Site Pro Complet</b></td><td style="padding: 10px; border: 1px solid #edf2f7;">Design sur mesure, responsive mobile, chatbot</td></tr>
    <tr><td style="padding: 10px; border: 1px solid #edf2f7;">🚀 <b>Performance</b></td><td style="padding: 10px; border: 1px solid #edf2f7;">SEO Google local, vitesse optimisée, sécurité SSL</td></tr>
    <tr style="background: #f8fafc;"><td style="padding: 10px; border: 1px solid #edf2f7;">📞 <b>Conversion clients</b></td><td style="padding: 10px; border: 1px solid #edf2f7;">WhatsApp intégré + formulaire + appels directs</td></tr>
    <tr><td style="padding: 10px; border: 1px solid #edf2f7;">🏆 <b>Garanties</b></td><td style="padding: 10px; border: 1px solid #edf2f7;">Satisfait ou remboursé sous 15 jours</td></tr>
  </table>
  <div style="background: #fffaf0; padding: 20px; border: 1px solid #fbd38d; border-radius: 8px;">
    <p style="margin: 0; font-weight: bold;">💰 Investissement total : {{price}}</p>
    <p style="margin-top: 10px; font-size: 13px;">✔ {{deposit}} aujourd’hui pour démarrer la création<br>✔ {{balance}} à la livraison finale</p>
  </div>
  <div style="text-align: center; margin: 25px 0;">
    <a href="{{devisLink}}" style="color: #D4500A; text-decoration: underline; font-weight: bold; margin-right: 20px;">📄 Voir le devis</a>
    <a href="{{paymentLink}}" style="background: #28a745; color: white; padding: 14px 22px; text-decoration: none; border-radius: 6px; font-weight: bold;">💳 PAYER 46$ ET DÉMARRER</a>
  </div>
  <p style="margin-top: 25px; border-top: 1px solid #edf2f7; padding-top: 15px; font-size: 13px; color: #4a5568;">Cordialement,<br>Consultant Digital | Services-Siteup</p>
</div>`,
    textContent: "Email 2"
  },
  {
    id: 'step-3-depot',
    name: '3. Confirmation Acompte',
    category: 'sale',
    language: 'FR',
    subject: '✅ Confirmation de votre acompte - {{companyName}}',
    variables: ['firstName', 'companyName', 'invoiceLink', 'deliveryDate'],
    htmlContent: `<div style="font-family: -apple-system, sans-serif; color: #1a202c; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #edf2f7;">
  ${HEADER_HTML}
  <h2 style="font-size: 18px; border-bottom: 2px solid #D4500A; padding-bottom: 10px;">CONFIRMATION D’ACOMPTE</h2>
  <p>Bonjour <strong>{{firstName}}</strong>,</p>
  <p style="font-size: 14px;">Nous vous confirmons que votre acompte de <strong>{{deposit}}</strong> a bien été reçu.</p>
  <p style="font-size: 14px;">Votre projet pour <strong>{{companyName}}</strong> est désormais officiellement <strong>en cours de production</strong>.</p>
  <div style="background: #f0fff4; padding: 15px; border: 1px solid #c6f6d5; border-radius: 6px; color: #22543d; margin-top: 15px;">
    <strong>📦 Statut du projet :</strong><br><br>✔ Analyse terminée<br>✔ Création en cours<br>✔ Optimisation du site en préparation
  </div>
  <div style="background: #f7fafc; padding: 15px; border-radius: 6px; margin-top: 15px;">
    <strong>📅 Livraison prévue :</strong> <b>{{deliveryDate}}</b><br><br>Votre site sera livré avec toutes les optimisations et fonctionnalités prêtes à l’utilisation.
  </div>
  <div style="margin-top: 25px; text-align: center;">
    <a href="{{invoiceLink}}" style="background: #f8fafc; color: #1a202c; padding: 10px 20px; border: 1px solid #edf2f7; text-decoration: none; border-radius: 6px; font-size: 13px;">📄 Facture d'acompte (PDF)</a>
  </div>
  <p style="margin-top: 35px; border-top: 1px solid #edf2f7; padding-top: 15px; font-size: 13px; color: #4a5568;">Cordialement,<br>Consultant Digital | Services-Siteup</p>
</div>`,
    textContent: "Email 3"
  },
  {
    id: 'step-4-paiement',
    name: '4. Paiement Final',
    category: 'sale',
    language: 'FR',
    subject: '🎉 Votre site {{companyName}} est prêt !',
    variables: ['firstName', 'companyName', 'websiteLink', 'finalPaymentLink'],
    htmlContent: `<div style="font-family: -apple-system, sans-serif; color: #1a202c; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #edf2f7;">
  ${HEADER_HTML}
  <h2 style="font-size: 18px; border-bottom: 2px solid #D4500A; padding-bottom: 10px;">FINALISATION DE VOTRE SITE WEB</h2>
  <p>Bonjour <strong>{{firstName}}</strong>,</p>
  <p style="font-size: 14px;">Excellente nouvelle 🎉 votre site pour <strong>{{companyName}}</strong> est maintenant entièrement prêt.</p>
  <p style="font-size: 14px;">👉 Vous pouvez le consulter ici : <a href="{{websiteLink}}" style="color: #D4500A; font-weight: bold;">Voir le rendu final</a></p>
  <ul style="font-size: 14px; padding-left: 18px; line-height: 1.6;">
    <li>📞 Générer des appels clients automatiquement</li>
    <li>📱 Convertir vos visiteurs sur mobile</li>
    <li>🚀 Être visible sur Google localement</li>
    <li>💬 Recevoir des demandes via WhatsApp et formulaire</li>
  </ul>
  <div style="background: #fffaf0; padding: 18px; border: 1px solid #fbd38d; border-radius: 8px; margin-top: 15px;">
    <strong>💰 Solde restant :</strong> {{balance}}
  </div>
  <div style="text-align: center; margin: 30px 0;">
    <a href="{{finalPaymentLink}}" style="background: #28a745; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">💰 RÉGLER LE SOLDE & ACTIVER</a>
  </div>
  <p style="margin-top: 35px; border-top: 1px solid #edf2f7; padding-top: 15px; font-size: 13px; color: #4a5568;">Cordialement,<br>Consultant Digital | Services-Siteup</p>
</div>`,
    textContent: "Email 4"
  },
  {
    id: 'step-5-confirmation',
    name: '5. Confirmation Finale',
    category: 'sale',
    language: 'FR',
    subject: '✅ Paiement reçu ! {{companyName}} est activé',
    variables: ['firstName', 'companyName', 'finalInvoiceLink'],
    htmlContent: `<div style="font-family: -apple-system, sans-serif; color: #1a202c; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #edf2f7;">
  ${HEADER_HTML}
  <h2 style="font-size: 18px; border-bottom: 2px solid #D4500A; padding-bottom: 10px;">CONFIRMATION FINALE DE VOTRE PROJET</h2>
  <p>Bonjour <strong>{{firstName}}</strong>,</p>
  <p style="font-size: 14px;">Nous vous confirmons que le paiement du solde de <strong>{{balance}}</strong> a bien été reçu.</p>
  <p style="font-size: 14px;">Votre projet pour <strong>{{companyName}}</strong> est maintenant <strong>100% finalisé et activé</strong>.</p>
  <div style="text-align: center; margin: 30px 0;">
    <a href="{{finalInvoiceLink}}" style="background: #f8fafc; color: #1a202c; padding: 10px 20px; border: 1px solid #edf2f7; text-decoration: none; border-radius: 6px; font-size: 13px;">📄 Facture finale (PDF)</a>
  </div>
  <p style="margin-top: 35px; border-top: 1px solid #edf2f7; padding-top: 15px; font-size: 13px; color: #4a5568;">Cordialement,<br>Consultant Digital | Services-Siteup</p>
</div>`,
    textContent: "Email 5"
  },
  {
    id: 'step-6-livraison',
    name: '6. Accès Admin',
    category: 'sale',
    language: 'FR',
    subject: '🔐 Vos Accès Administrateur - {{companyName}}',
    variables: ['firstName', 'companyName', 'adminLink', 'adminUsername', 'adminPassword', 'documentationLink'],
    htmlContent: `<div style="font-family: -apple-system, sans-serif; color: #1a202c; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #edf2f7;">
  ${HEADER_HTML}
  <h2 style="font-size: 18px; border-bottom: 2px solid #D4500A; padding-bottom: 10px;">ACCÈS À VOTRE SITE WEB</h2>
  <div style="background: #f8fafc; padding: 20px; border-radius: 8px; font-family: monospace; font-size: 13px;">
    <strong>🔐 Informations de connexion :</strong><br><br>
    <strong>URL Admin :</strong> <a href="{{adminLink}}" style="color: #D4500A;">{{adminLink}}</a><br><br>
    <strong>Utilisateur :</strong> {{adminUsername}}<br>
    <strong>Mot de passe :</strong> {{adminPassword}}
  </div>
  <div style="text-align: center; margin-top: 20px;">
    <a href="{{documentationLink}}" style="color: #1a202c; font-weight: bold; text-decoration: underline;">📚 Accéder à la documentation complète</a>
  </div>
  <p style="margin-top: 35px; border-top: 1px solid #edf2f7; padding-top: 15px; font-size: 13px; color: #4a5568;">Cordialement,<br>Consultant Digital | Services-Siteup</p>
</div>`,
    textContent: "Email 6"
  }
];

export const reminderTemplates: EmailTemplate[] = [
  {
    id: 'reminder1_after_email1',
    name: 'Rappel 1 - Après Email 1',
    category: 'reminder',
    language: 'FR',
    subject: 'Suivi : Votre site web pour {{companyName}}',
    variables: ['firstName', 'companyName', 'websiteLink', 'startProjectLink'],
    htmlContent: `<div style="font-family: -apple-system, sans-serif; color: #1a202c; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #edf2f7; border-radius: 8px; background: #ffffff;">
  ${HEADER_HTML}
  <p>Bonjour <strong>{{firstName}}</strong>,</p>
  <p style="font-size: 14px;">Je me permets de revenir vers vous concernant le site web que nous avons préparé pour <strong>{{companyName}}</strong>.</p>
  <div style="text-align: center; margin: 30px 0;">
    <a href="{{websiteLink}}" style="background: #1a202c; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">🔍 VOIR VOTRE SITE</a>
  </div>
  <div style="text-align: center; margin: 25px 0;">
    <a href="{{startProjectLink}}" style="background: #D4500A; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">🚀 CONFIRMER ET ACTIVER</a>
  </div>
  <p style="margin-top: 40px; border-top: 1px solid #edf2f7; padding-top: 20px; font-size: 13px; color: #4a5568;">Cordialement,<br>Consultant Digital | Services-Siteup</p>
</div>`,
    textContent: "Rappel 1"
  },
  {
    id: 'reminder2_after_devis',
    name: 'Rappel 2 - Relance Devis',
    category: 'reminder',
    language: 'FR',
    subject: 'Dernière étape pour {{companyName}}',
    variables: ['firstName', 'companyName', 'devisLink', 'paymentLink'],
    htmlContent: `<div style="font-family: -apple-system, sans-serif; color: #1a202c; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #edf2f7; border-radius: 8px; background: #ffffff;">
  ${HEADER_HTML}
  <p>Bonjour <strong>{{firstName}}</strong>,</p>
  <p style="font-size: 14px;">Le devis ainsi que la version de votre site pour <strong>{{companyName}}</strong> sont toujours disponibles.</p>
  <div style="text-align: center; margin: 25px 0;"><a href="{{devisLink}}" style="color: #D4500A; text-decoration: underline; font-weight: bold;">📄 Consulter le devis</a></div>
  <div style="text-align: center; margin: 30px 0;"><a href="{{paymentLink}}" style="background: #28a745; color: white; padding: 16px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">💳 PAYER {{deposit}} ET DÉMARRER</a></div>
  <p style="margin-top: 40px; border-top: 1px solid #edf2f7; padding-top: 20px; font-size: 13px; color: #4a5568;">Cordialement,<br>Consultant Digital | Services-Siteup</p>
</div>`,
    textContent: "Rappel 2"
  },
  {
    id: 'reminder3_final_payment',
    name: 'Rappel 3 - Solde Final',
    category: 'reminder',
    language: 'FR',
    subject: '⚡ Activation urgente : Votre site {{companyName}}',
    variables: ['firstName', 'companyName', 'websiteLink', 'finalPaymentLink'],
    htmlContent: `<div style="font-family: -apple-system, sans-serif; color: #1a202c; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #edf2f7; border-radius: 8px; background: #ffffff;">
  ${HEADER_HTML}
  <h2 style="font-size: 18px; border-bottom: 2px solid #D4500A; padding-bottom: 10px;">DERNIÈRE ÉTAPE — ACTIVATION</h2>
  <p>Bonjour {{firstName}}, votre site est prêt et en attente d’activation finale.</p>
  <div style="text-align: center; margin: 30px 0;"><a href="{{finalPaymentLink}}" style="background: #e53e3e; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">⚡ ACTIVER MON SITE MAINTENANT</a></div>
  <p style="margin-top: 40px; border-top: 1px solid #edf2f7; padding-top: 20px; font-size: 13px; color: #4a5568;">Cordialement,<br>Consultant Digital | Services-Siteup</p>
</div>`,
    textContent: "Rappel 3"
  }
];

export function getTemplateById(id: string): EmailTemplate | undefined {
  const all = [...salesTemplates, ...reminderTemplates];
  return all.find(template => template.id === id);
}

export const allTemplates = [...salesTemplates, ...reminderTemplates];
