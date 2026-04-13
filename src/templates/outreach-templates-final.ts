// ============================================================
// Solutions Web - Templates Email Outreach Agent (Services Siteup Premium - Version Institutionnelle)
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

const PREMIUM_STYLE = `
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #f7f9fc; color: #1a202c; }
    .wrapper { background-color: #f7f9fc; padding: 40px 20px; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e1e8ed; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
    .header { padding: 30px; text-align: left; border-bottom: 1px solid #edf2f7; }
    .content { padding: 40px 35px; line-height: 1.6; font-size: 15px; }
    .footer { padding: 25px; text-align: center; color: #718096; font-size: 12px; border-top: 1px solid #edf2f7; background: #f8fafc; }
    .btn { display: inline-block; padding: 14px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px; transition: opacity 0.2s; }
    .btn-green { background-color: #28a745; color: #ffffff !important; }
    .btn-orange { background-color: #D4500A; color: #ffffff !important; }
    .btn-dark { background-color: #2d3748; color: #ffffff !important; }
    .table-price { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px; }
    .table-price td { padding: 12px; border: 1px solid #edf2f7; }
    .step-box { display: inline-block; width: 45%; padding: 15px; border-radius: 8px; text-align: center; vertical-align: top; }
    .admin-block { background-color: #1a202c; color: #ffffff; padding: 25px; border-radius: 8px; margin: 20px 0; }
    .signature { margin-top: 30px; padding-top: 20px; border-top: 1px solid #edf2f7; font-size: 13px; color: #4a5568; }
  </style>
`;

const LOGO_BAR = `
  <div class="header">
    <table width="100%">
      <tr>
        <td>
          <svg width="220" height="40" viewBox="0 0 280 60" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="5" width="50" height="50" rx="14" fill="#D4500A" />
            <text x="25" y="41" font-family="Arial" font-weight="900" font-size="28" fill="white" text-anchor="middle">ST</text>
            <text x="62" y="32" font-family="Arial" font-weight="bold" font-size="24" fill="#1a202c">Services-Siteup</text>
          </svg>
          <div style="font-size: 10px; color: #718096; margin-left: 62px; margin-top: -12px; font-style: italic;">Propulsez votre présence en ligne avec excellence</div>
        </td>
      </tr>
    </table>
  </div>
`;

const SIGNATURE = `
  <div class="signature">
    <strong>L'équipe Services-Siteup</strong><br>
    <a href="mailto:siteup.services@gmail.com" style="color: #D4500A; text-decoration: none;">siteup.services@gmail.com</a><br>
    <span style="font-size: 11px; color: #a0aec0;">Expertise digitale | Présence en ligne | Performance</span>
  </div>
`;

export const salesTemplates: EmailTemplate[] = [
  {
    id: 'step-1-start',
    name: 'Email 1 - Présentation',
    category: 'sale',
    subject: '🎁 Une surprise pour {{companyName}} : Votre nouveau site est prêt',
    variables: ['firstName', 'companyName', 'websiteLink', 'startProjectLink'],
    htmlContent: `<!DOCTYPE html><html><head>${PREMIUM_STYLE}</head><body><div class="wrapper"><div class="container">${LOGO_BAR}
      <div class="content">
        <p>Bonjour {{firstName}},</p>
        <p>J'ai le plaisir de vous informer que j'ai conçu une première version modernisée pour <strong>{{companyName}}</strong>.</p>
        <div style="text-align: center; margin: 30px 0;"><a href="{{websiteLink}}" class="btn btn-orange">👀 VOIR VOTRE SITE</a></div>
        <p><strong>Nos 5 avantages exclusifs :</strong></p>
        <ul style="padding-left: 20px;">
          <li>Propriété totale de votre site et domaine</li>
          <li>Design unique et responsive (mobile, tablette, PC)</li>
          <li>Optimisation SEO pour apparaître sur Google</li>
          <li>WhatsApp et Chatbot intelligent intégrés</li>
          <li>Livraison ultra-rapide sous 48h</li>
        </ul>
        <p><strong>Investissement direct : 146€</strong> tout inclus.<br>Le règlement s'effectue en 2 étapes simples (Acompte 46€ / Solde 100€).</p>
        ${SIGNATURE}
      </div>
      <div class="footer">Services-Siteup &copy; 2026</div>
    </div></div></body></html>`,
    textContent: "Bonjour {{firstName}}, votre site {{companyName}} est prêt. Voir ici : {{websiteLink}}"
  },
  {
    id: 'step-2-devis',
    name: 'Email 2 - Devis & Paiement',
    category: 'sale',
    subject: '📄 Votre Devis & Lancement du projet - {{companyName}}',
    variables: ['firstName', 'companyName', 'devisLink', 'paymentLink', 'expiryDate'],
    htmlContent: `<!DOCTYPE html><html><head>${PREMIUM_STYLE}</head><body><div class="wrapper"><div class="container">${LOGO_BAR}
      <div class="content">
        <h2>Ravi de vous accompagner, {{firstName}} !</h2>
        <p>Pour lancer officiellement le projet pour <strong>{{companyName}}</strong>, veuillez trouver ci-dessous votre devis et le lien de démarrage :</p>
        <div style="text-align: center; margin: 25px 0;"><a href="{{devisLink}}" class="btn btn-green">📄 CONSULTER LE DEVIS</a></div>
        <table class="table-price">
          <tr style="background: #f8fafc; font-weight: bold;"><td>Prestation</td><td align="right">Montant</td></tr>
          <tr><td>Création & Installation Site Web Pro</td><td align="right">146€</td></tr>
        </table>
        <div style="margin: 20px 0; text-align: center;">
          <div class="step-box" style="background: #f0fdf4; border: 1px solid #dcfce7; color: #166534;"><strong>ÉTAPE 1</strong><br>Acompte : 46€</div>
          <div class="step-box" style="background: #f7fafc; border: 1px solid #edf2f7; color: #718096; margin-left: 5%;"><strong>ÉTAPE 2</strong><br>Solde : 100€</div>
        </div>
        <div style="text-align: center; margin-top: 30px;"><a href="{{paymentLink}}" class="btn btn-orange">💳 RÉGLER L'ACOMPTE (46€)</a></div>
        <p style="font-size: 11px; color: #a0aec0; margin-top: 30px; text-align: center;">Ce devis est valable jusqu'au {{expiryDate}}.</p>
        ${SIGNATURE}
      </div>
      <div class="footer">Services-Siteup | Excellence Digitale</div>
    </div></div></body></html>`,
    textContent: "Consultez votre devis pour {{companyName}} : {{devisLink}}. Régler l'acompte : {{paymentLink}}"
  },
  {
    id: 'step-3-depot',
    name: 'Email 3 - Confirmation Dépôt',
    category: 'sale',
    subject: '✅ Confirmation de votre acompte - Projet Lancé !',
    variables: ['firstName', 'companyName', 'invoiceLink', 'deliveryDate'],
    htmlContent: `<!DOCTYPE html><html><head>${PREMIUM_STYLE}</head><body><div class="wrapper"><div class="container">${LOGO_BAR}
      <div class="content">
        <h2 style="color: #28a745;"><span style="font-size: 24px;">✓</span> Paiement Confirmé</h2>
        <p>Bonjour {{firstName}}, nous avons bien reçu votre acompte pour <strong>{{companyName}}</strong>.</p>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #edf2f7; margin: 20px 0;">
          <p style="margin: 0; font-size: 13px;"><strong>Récapitulatif de paiement :</strong></p>
          <p style="margin: 5px 0; font-size: 14px;">Montant perçu : 46€<br>État : Validé<br>Livraison prévue : {{deliveryDate}}</p>
          <div style="margin-top: 15px;"><a href="{{invoiceLink}}" class="btn btn-dark" style="padding: 10px 20px; font-size: 12px;">📄 TÉLÉCHARGER LE REÇU</a></div>
        </div>
        <p><strong>Nos prochaines étapes :</strong></p>
        <ol style="padding-left: 20px; font-size: 14px;">
          <li>Mise en conformité technique</li>
          <li>Optimisation SEO et Performance</li>
          <li>Installation du Chatbot & WhatsApp</li>
          <li>Livraison de vos accès (E6)</li>
        </ol>
        ${SIGNATURE}
      </div>
    </div></div></body></html>`,
    textContent: "Paiement de 46€ confirmé pour {{companyName}}. Livraison prévue le {{deliveryDate}}."
  },
  {
    id: 'step-4-paiement',
    name: 'Email 4 - Paiement Final',
    category: 'sale',
    subject: '✨ Votre site est prêt ! (Action requise)',
    variables: ['firstName', 'companyName', 'websiteLink', 'finalPaymentLink'],
    htmlContent: `<!DOCTYPE html><html><head>${PREMIUM_STYLE}</head><body><div class="wrapper"><div class="container">${LOGO_BAR}
      <div class="content">
        <h2>Félicitations {{firstName}}, votre site est prêt !</h2>
        <p>Nous avons terminé la configuration pour <strong>{{companyName}}</strong>. Vous pouvez visualiser le résultat final ici :</p>
        <div style="text-align: center; margin: 25px 0;"><a href="{{websiteLink}}" class="btn btn-dark">🔍 VOIR LA VERSION FINALE</a></div>
        <div style="border: 1px solid #feb2b2; background: #fff5f5; padding: 25px; border-radius: 8px; text-align: center; border-left: 5px solid #f56565;">
          <p style="margin: 0; color: #c53030; font-weight: bold; font-size: 18px;">Reste à régler : 100€</p>
          <p style="margin: 5px 0; font-size: 12px; color: #742a2a;">Montant total projet : 146€</p>
          <a href="{{finalPaymentLink}}" class="btn btn-orange" style="margin-bottom: 0;">🚀 PAYER LE SOLDE & PUBLIER</a>
        </div>
        ${SIGNATURE}
      </div>
    </div></div></body></html>`,
    textContent: "Votre site {{companyName}} est prêt. Solde restant : 100€. Régler ici : {{finalPaymentLink}}"
  },
  {
    id: 'step-5-confirmation',
    name: 'Email 5 - Confirmation Finale',
    category: 'sale',
    subject: '🎉 Bienvenue en ligne ! Confirmation de paiement final',
    variables: ['firstName', 'companyName', 'websiteLink', 'invoiceLink'],
    htmlContent: `<!DOCTYPE html><html><head>${PREMIUM_STYLE}</head><body><div class="wrapper"><div class="container">${LOGO_BAR}
      <div class="content">
        <h2 style="text-align: center;">Célébration 🎉</h2>
        <p>Bonjour {{firstName}}, nous avons bien reçu votre paiement final. Vous êtes désormais 100% propriétaire de votre présence digitale.</p>
        <div style="text-align: center; margin: 30px 0;"><a href="{{websiteLink}}" class="btn btn-green">🌐 VOIR MON SITE EN LIGNE</a></div>
        <table class="table-price">
          <tr style="background: #f8fafc; font-weight: bold;"><td>Document</td><td align="right">Status</td></tr>
          <tr><td>Facture Finale Services-Siteup</td><td align="right" style="color: #28a745;">ACQUITTÉE ✅</td></tr>
        </table>
        <div style="text-align: center;"><a href="{{invoiceLink}}" class="btn btn-dark" style="padding: 10px 20px; font-size: 12px;">📄 TÉLÉCHARGER LA FACTURE</a></div>
        ${SIGNATURE}
      </div>
    </div></div></body></html>`,
    textContent: "Paiement final reçu pour {{companyName}}. Votre site est en ligne : {{websiteLink}}"
  },
  {
    id: 'step-6-livraison',
    name: 'Email 6 - Livraison & Accès',
    category: 'sale',
    subject: '🔐 Vos Accès Administrateur - {{companyName}}',
    variables: ['firstName', 'companyName', 'adminLink', 'adminUsername', 'adminPassword', 'documentationLink', 'websiteLink'],
    htmlContent: `<!DOCTYPE html><html><head>${PREMIUM_STYLE}</head><body><div class="wrapper"><div class="container">${LOGO_BAR}
      <div class="content">
        <h2>Vos accès officiels</h2>
        <p>Bonjour {{firstName}}, voici vos informations pour gérer <strong>{{companyName}}</strong> en toute autonomie :</p>
        <div class="admin-block">
          <p style="margin-top: 0; border-bottom: 1px solid #4a5568; padding-bottom: 10px;">🛡️ ESPACE ADMINISTRATION</p>
          <p><strong>Lien :</strong> <a href="{{adminLink}}" style="color: #48bb78;">{{adminLink}}</a></p>
          <p><strong>Identifiant :</strong> <span style="color: #48bb78;">{{adminUsername}}</span></p>
          <p><strong>Mot de passe :</strong> <span style="color: #48bb78;">{{adminPassword}}</span></p>
        </div>
        <p style="font-size: 12px; color: #c53030;">🚨 <strong>Alerte Confidentialité :</strong> Ne partagez jamais ces accès avec des tiers non autorisés.</p>
        <div style="display: flex; gap: 10px; margin-top: 25px;">
          <a href="{{websiteLink}}" class="btn btn-orange" style="flex: 1; text-align: center; margin: 0;">VISITER LE SITE</a>
          <a href="{{documentationLink}}" class="btn btn-dark" style="flex: 1; text-align: center; margin: 0;">DOCUMENTATION</a>
        </div>
        <p style="margin-top: 30px; font-size: 13px;">📞 <strong>Support :</strong> Besoin d'aide ? Répondez simplement à cet email.</p>
        ${SIGNATURE}
      </div>
    </div></div></body></html>`,
    textContent: "Voici vos accès pour {{companyName}}. User: {{adminUsername}}, Pass: {{adminPassword}}"
  }
];

export const reminderTemplates: EmailTemplate[] = [
  {
    id: 'reminder1_after_email1',
    name: 'Rappel 1 - Après Email 1',
    category: 'reminder',
    subject: 'Suivi : Votre démo pour {{companyName}}',
    variables: ['firstName', 'companyName', 'websiteLink', 'startProjectLink'],
    htmlContent: `<!DOCTYPE html><html><head>${PREMIUM_STYLE}</head><body><div class="wrapper"><div class="container">${LOGO_BAR}
      <div class="content">
        <h2>Bonjour {{firstName}},</h2>
        <p>Je reviens vers vous concernant la démo du nouveau site pour <strong>{{companyName}}</strong>. L'avez-vous consultée ?</p>
        <div style="text-align: center; margin: 30px 0;"><a href="{{websiteLink}}" class="btn btn-dark">🔍 REVOIR LA DÉMO</a></div>
        <p>Nous pouvons lancer les travaux d'installation dès aujourd'hui.</p>
        <div style="text-align: center; margin-top: 25px;"><a href="{{startProjectLink}}" class="btn btn-orange">DÉMARRER LE PROJET MAINTENANT →</a></div>
        ${SIGNATURE}
      </div>
    </div></div></body></html>`,
    textContent: "Avez-vous vu la démo pour {{companyName}} ? {{websiteLink}}"
  }
];

export const PREMIUM_OUTREACH_TEMPLATES = salesTemplates;

export function getTemplateById(id: string): EmailTemplate | undefined {
  const all = [...salesTemplates, ...reminderTemplates];
  return all.find(template => template.id === id);
}

export const allTemplates = [...salesTemplates, ...reminderTemplates];
