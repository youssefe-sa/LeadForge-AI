// ============================================================
// Solutions Web - Templates Email Outreach Agent (Services Siteup Premium - Version Utilisateur)
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

const LOGO_BOX = `
  <div style="background-color: #D4500A; width: 48px; height: 48px; border-radius: 12px; display: inline-block; vertical-align: middle; text-align: center; line-height: 48px; color: white; font-family: Arial, sans-serif; font-weight: 900; font-size: 22px;">ST</div>
`;

const HEADER_HTML = `
  <div style="margin-bottom: 25px;">
    <div style="display: table;">
      <div style="display: table-cell; vertical-align: middle;">${LOGO_BOX}</div>
      <div style="display: table-cell; vertical-align: middle; padding-left: 12px;">
        <div style="font-family: Arial; font-weight: bold; font-size: 20px; color: #1a202c; line-height: 1.2;">Services-Siteup</div>
        <div style="font-size: 11px; color: #718096; font-style: italic;">Propulsez votre présence en ligne avec excellence</div>
      </div>
    </div>
  </div>
`;

export const salesTemplates: EmailTemplate[] = [
  {
    id: 'step-1-presentation',
    name: '1. Présentation Site Web',
    category: 'sale',
    subject: '🎁 Une surprise pour {{companyName}} : Votre nouveau site est prêt',
    variables: ['firstName', 'companyName', 'websiteLink', 'startProjectLink'],
    htmlContent: `<div style="font-family: -apple-system, sans-serif; color: #1a202c; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #edf2f7; border-radius: 10px; background: #ffffff;">
      ${HEADER_HTML}
      <p>Bonjour <strong>{{firstName}}</strong>,</p>
      <p style="font-size: 15px;">J’ai pris l’initiative de créer une <strong>version professionnelle complète de site web</strong> pour <strong>{{companyName}}</strong>.</p>
      <div style="text-align: center; margin: 25px 0;">
        <a href="{{websiteLink}}" style="background: #D4500A; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">VOIR VOTRE SITE →</a>
      </div>
      <div style="background: #f7fafc; padding: 15px; border-radius: 8px; margin-top: 20px; font-size: 14px;">
        <strong>💰 Activation : 46$ pour démarrer / 100$ à la livraison</strong>
      </div>
      <div style="text-align: center; margin-top: 25px;">
        <a href="{{startProjectLink}}" style="background: #1a202c; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">CONFIRMER ET ACTIVER →</a>
      </div>
      <p style="margin-top: 40px; border-top: 1px solid #edf2f7; padding-top: 20px; font-size: 13px; color: #4a5568;">Cordialement,<br>Consultant Digital | Services-Siteup</p>
    </div>`,
    textContent: "Email 1 : {{websiteLink}}"
  },
  {
    id: 'step-2-devis',
    name: '2. Devis & Paiement',
    category: 'sale',
    subject: '📄 Confirmation & Devis Officiel - {{companyName}}',
    variables: ['firstName', 'companyName', 'devisLink', 'paymentLink'],
    htmlContent: `<div style="font-family: -apple-system, sans-serif; color: #1a202c; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #edf2f7;">
      ${HEADER_HTML}
      <h2 style="font-size: 18px; border-bottom: 2px solid #D4500A; padding-bottom: 10px;">CONFIRMATION & DEVIS OFFICIEL</h2>
      <div style="background: #fffaf0; padding: 20px; border: 1px solid #fbd38d; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0; font-weight: bold;">💰 Investissement total : 146$</p>
      </div>
      <div style="text-align: center; margin: 25px 0;">
        <a href="{{devisLink}}" style="color: #D4500A; text-decoration: underline; font-weight: bold; margin-right: 20px;">📄 Voir le devis</a>
        <a href="{{paymentLink}}" style="background: #28a745; color: white; padding: 14px 22px; text-decoration: none; border-radius: 6px; font-weight: bold;">💳 PAYER 46$ ET DÉMARRER</a>
      </div>
      <p style="margin-top: 25px; border-top: 1px solid #edf2f7; padding-top: 15px; font-size: 13px; color: #4a5568;">Cordialement,<br>Consultant Digital | Services-Siteup</p>
    </div>`,
    textContent: "Email 2 : {{devisLink}}"
  },
  {
    id: 'step-3-depot',
    name: '3. Confirmation Acompte',
    category: 'sale',
    subject: '✅ Confirmation de votre acompte - {{companyName}}',
    variables: ['firstName', 'companyName', 'invoiceLink', 'deliveryDate'],
    htmlContent: `<div style="font-family: -apple-system, sans-serif; color: #1a202c; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #edf2f7;">
      ${HEADER_HTML}
      <h2 style="font-size: 18px; border-bottom: 2px solid #D4500A; padding-bottom: 10px;">CONFIRMATION D’ACOMPTE</h2>
      <p>Bonjour <strong>{{firstName}}</strong>, votre acompte de <strong>46$</strong> a bien été reçu.</p>
      <div style="background: #f7fafc; padding: 15px; border-radius: 6px; margin-top: 15px;"><strong>📅 Livraison prévue : {{deliveryDate}}</strong></div>
      <div style="margin-top: 25px; text-align: center;"><a href="{{invoiceLink}}" style="background: #f8fafc; color: #1a202c; padding: 10px 20px; border: 1px solid #edf2f7; text-decoration: none; border-radius: 6px; font-size: 13px;">📄 Facture d'acompte (PDF)</a></div>
      <p style="margin-top: 35px; border-top: 1px solid #edf2f7; padding-top: 15px; font-size: 13px; color: #4a5568;">Cordialement,<br>Consultant Digital | Services-Siteup</p>
    </div>`,
    textContent: "Email 3"
  },
  {
    id: 'step-4-paiement',
    name: '4. Paiement Final',
    category: 'sale',
    subject: '🎉 Votre site {{companyName}} est prêt !',
    variables: ['firstName', 'companyName', 'websiteLink', 'finalPaymentLink'],
    htmlContent: `<div style="font-family: -apple-system, sans-serif; color: #1a202c; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #edf2f7;">
      ${HEADER_HTML}
      <h2 style="font-size: 18px; border-bottom: 2px solid #D4500A; padding-bottom: 10px;">FINALISATION DE VOTRE SITE WEB</h2>
      <p>👉 Consulter ici : <a href="{{websiteLink}}" style="color: #D4500A; font-weight: bold;">Voir le rendu final</a></p>
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
    subject: '✅ Paiement reçu ! {{companyName}} est activé',
    variables: ['firstName', 'companyName', 'invoiceLink'],
    htmlContent: `<div style="font-family: -apple-system, sans-serif; color: #1a202c; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #edf2f7;">
      ${HEADER_HTML}
      <h2 style="font-size: 18px; border-bottom: 2px solid #D4500A; padding-bottom: 10px;">CONFIRMATION FINALE</h2>
      <div style="text-align: center; margin: 30px 0;"><a href="{{invoiceLink}}" style="background: #f8fafc; color: #1a202c; padding: 10px 20px; border: 1px solid #edf2f7; text-decoration: none; border-radius: 6px; font-size: 13px;">📄 Facture finale (PDF)</a></div>
      <p style="margin-top: 35px; border-top: 1px solid #edf2f7; padding-top: 15px; font-size: 13px; color: #4a5568;">Cordialement,<br>Consultant Digital | Services-Siteup</p>
    </div>`,
    textContent: "Email 5"
  },
  {
    id: 'step-6-livraison',
    name: '6. Accès Admin',
    category: 'sale',
    subject: '🔐 Vos Accès Administrateur - {{companyName}}',
    variables: ['firstName', 'companyName', 'adminLink', 'adminUsername', 'adminPassword', 'documentationLink'],
    htmlContent: `<div style="font-family: -apple-system, sans-serif; color: #1a202c; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #edf2f7;">
      ${HEADER_HTML}
      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; font-family: monospace; font-size: 13px;">
        <strong>🔐 Connexion :</strong><br><br>
        <strong>URL Admin :</strong> <a href="{{adminLink}}" style="color: #D4500A;">{{adminLink}}</a><br>
        <strong>User :</strong> {{adminUsername}}<br>
        <strong>Pass :</strong> {{adminPassword}}
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
    subject: 'Suivi : Votre site web pour {{companyName}}',
    variables: ['firstName', 'companyName', 'websiteLink', 'startProjectLink'],
    htmlContent: `<div style="font-family: -apple-system, sans-serif; color: #1a202c; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #edf2f7; border-radius: 8px; background: #ffffff;">
      ${HEADER_HTML}
      <p>Bonjour <strong>{{firstName}}</strong>,</p>
      <p>Avez-vous eu l’occasion de consulter la version que nous avons conçue pour <strong>{{companyName}}</strong> ?</p>
      <div style="text-align: center; margin: 30px 0;"><a href="{{websiteLink}}" style="background: #1a202c; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">🔍 VOIR VOTRE SITE</a></div>
      <div style="text-align: center; margin: 25px 0;"><a href="{{startProjectLink}}" style="background: #D4500A; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">🚀 CONFIRMER ET ACTIVER</a></div>
      <p style="margin-top: 40px; border-top: 1px solid #edf2f7; padding-top: 20px; font-size: 13px; color: #4a5568;">Cordialement,<br>Consultant Digital | Services-Siteup</p>
    </div>`,
    textContent: "Rappel 1"
  },
  {
    id: 'reminder2_after_devis',
    name: 'Rappel 2 - Relance Devis',
    category: 'reminder',
    subject: 'Dernière étape pour {{companyName}}',
    variables: ['firstName', 'companyName', 'devisLink', 'paymentLink'],
    htmlContent: `<div style="font-family: -apple-system, sans-serif; color: #1a202c; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #edf2f7; border-radius: 8px; background: #ffffff;">
      ${HEADER_HTML}
      <p>Bonjour <strong>{{firstName}}</strong>,</p>
      <p>Le devis ainsi que la version de votre site pour <strong>{{companyName}}</strong> sont toujours disponibles.</p>
      <div style="text-align: center; margin: 25px 0;"><a href="{{devisLink}}" style="color: #D4500A; text-decoration: underline; font-weight: bold;">📄 Consulter le devis</a></div>
      <p style="margin-top: 20px; font-size: 14px;">Votre créneau de production est actuellement réservé, mais il pourrait être libéré prochainement.</p>
      <div style="text-align: center; margin: 30px 0;"><a href="{{paymentLink}}" style="background: #28a745; color: white; padding: 16px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">💳 PAYER 46$ ET DÉMARRER</a></div>
      <p style="margin-top: 40px; border-top: 1px solid #edf2f7; padding-top: 20px; font-size: 13px; color: #4a5568;">Cordialement,<br>Consultant Digital | Services-Siteup</p>
    </div>`,
    textContent: "Rappel 2"
  },
  {
    id: 'reminder3_final_payment',
    name: 'Rappel 3 - Solde Final',
    category: 'reminder',
    subject: '⚡ Activation urgente : Votre site {{companyName}}',
    variables: ['firstName', 'companyName', 'websiteLink', 'finalPaymentLink'],
    htmlContent: `<div style="font-family: -apple-system, sans-serif; color: #1a202c; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #edf2f7; border-radius: 8px; background: #ffffff;">
      ${HEADER_HTML}
      <h2 style="font-size: 18px; border-bottom: 2px solid #D4500A; padding-bottom: 10px;">DERNIÈRE ÉTAPE — ACTIVATION</h2>
      <p>Bonjour {{firstName}}, votre site est prêt et en attente d’activation finale.</p>
      <div style="background: #fff5f5; padding: 15px; border: 1px solid #fed7d7; border-radius: 6px; margin-top: 20px; color: #742a2a;">
        ⚠️ Votre projet est en attente. Sans confirmation, il sera archivé.
      </div>
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
