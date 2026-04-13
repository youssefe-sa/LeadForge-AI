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

const PREMIUM_STYLE = `
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f7f9; color: #333333; }
    .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); border: 1px solid #e1e8ed; }
    .header { background-color: #D4500A; padding: 30px; text-align: center; color: #ffffff; }
    .content { padding: 40px 35px; line-height: 1.6; font-size: 16px; }
    .footer { background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #edf2f7; color: #718096; font-size: 12px; }
    .btn { display: inline-block; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; color: #ffffff !important; margin: 20px 0; }
    .btn-primary { background-color: #D4500A; }
    .btn-success { background-color: #28a745; }
    .btn-dark { background-color: #2d3748; }
    .highlight-box { background-color: #f8f9fa; padding: 25px; border-radius: 10px; border-left: 5px solid #D4500A; margin: 25px 0; }
  </style>
`;

const LOGO_HTML = `
  <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; display: inline-block; margin-bottom: 15px;">
    <svg width="180" height="40" viewBox="0 0 280 60" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="5" width="50" height="50" rx="14" fill="#D4500A" />
      <text x="25" y="41" font-family="Arial" font-weight="900" font-size="28" fill="white" text-anchor="middle">ST</text>
      <text x="62" y="32" font-family="Arial" font-weight="bold" font-size="24" fill="#1a202c">Services-Siteup</text>
    </svg>
  </div>
`;

export const salesTemplates: EmailTemplate[] = [
  {
    id: 'step-1-start',
    name: 'Email 1 - Démo & Premier Contact',
    category: 'sale',
    subject: '🎁 Une surprise pour {{companyName}} : Votre nouveau site est prêt',
    variables: ['firstName', 'companyName', 'websiteLink', 'startProjectLink'],
    htmlContent: `<!DOCTYPE html><html><head>${PREMIUM_STYLE}</head><body>
      <div class="container">
        <div class="header">${LOGO_HTML}<h1>VOTRE SITE EST PRÊT !</h1></div>
        <div class="content">
          <h2>Bonjour {{firstName}},</h2>
          <p>J'ai conçu une version modernisée et ultra-performante du site de <strong>{{companyName}}</strong>.</p>
          <div style="text-align: center;"><a href="{{websiteLink}}" class="btn btn-dark">🔍 VOIR VOTRE DÉMO EN LIGNE</a></div>
          <div class="highlight-box">
            <h3>🚀 Installation Express</h3>
            <p>Si cette démo vous plaît, nous pouvons l'installer officiellement en moins de 48h sur votre propre domaine.</p>
            <div style="text-align: center;"><a href="{{startProjectLink}}" class="btn btn-primary">DÉMARRER LE PROJET →</a></div>
          </div>
        </div>
        <div class="footer"><p>Services-Siteup &copy; 2026 | siteup.services@gmail.com</p></div>
      </div>
    </body></html>`,
    textContent: "Bonjour {{firstName}}, votre site {{companyName}} est prêt. Voir : {{websiteLink}}"
  },
  {
    id: 'step-2-devis',
    name: 'Email 2 - Devis & Paiement',
    category: 'sale',
    subject: '📄 Votre Devis & Lien de Paiement - {{companyName}}',
    variables: ['firstName', 'companyName', 'devisLink', 'paymentLink'],
    htmlContent: `<!DOCTYPE html><html><head>${PREMIUM_STYLE}</head><body>
      <div class="container">
        <div class="header">${LOGO_HTML}<h1>DEVIS & PAIEMENT</h1></div>
        <div class="content">
          <h2>Ravi de vous accompagner, {{firstName}} !</h2>
          <p>Voici les documents pour lancer le projet <strong>{{companyName}}</strong> dès aujourd'hui :</p>
          <div style="text-align: center;"><a href="{{devisLink}}" class="btn btn-dark">📄 CONSULTER LE DEVIS (PDF)</a></div>
          <div class="highlight-box">
            <h3 style="color: #D4500A;">💳 Lancement du projet</h3>
            <p>Un acompte de <strong>46€</strong> est requis pour commencer la production. Le solde sera dû à la livraison.</p>
            <div style="text-align: center;"><a href="{{paymentLink}}" class="btn btn-success">RÉGLER L'ACOMPTE (46€) →</a></div>
          </div>
        </div>
        <div class="footer"><p>Services-Siteup | Excellence Digitale</p></div>
      </div>
    </body></html>`,
    textContent: "Voici votre devis : {{devisLink}}. Payer : {{paymentLink}}"
  },
  {
    id: 'step-3-depot',
    name: 'Email 3 - Confirmation Dépôt',
    category: 'sale',
    subject: '✅ Confirmation de votre acompte - Services-Siteup',
    variables: ['firstName', 'companyName', 'invoiceLink'],
    htmlContent: `<!DOCTYPE html><html><head>${PREMIUM_STYLE}</head><body>
      <div class="container">
        <div class="header">${LOGO_HTML}<h1>PAIEMENT VALIDÉ !</h1></div>
        <div class="content">
          <h2>C'est parti, {{firstName}} !</h2>
          <p>Nous avons bien reçu votre acompte pour <strong>{{companyName}}</strong>. Votre projet est entré en phase de production finale.</p>
          <div class="highlight-box" style="text-align: center; border-left: 5px solid #28a745;">
            <p style="font-weight: bold;">Votre facture d'acompte est prête :</p>
            <a href="{{invoiceLink}}" class="btn btn-success">📄 TÉLÉCHARGER MA FACTURE</a>
          </div>
          <p>Livraison prévue sous 2 jours ouvrés.</p>
        </div>
        <div class="footer"><p>L'équipe Services-Siteup</p></div>
      </div>
    </body></html>`,
    textContent: "Acompte reçu pour {{companyName}}. Facture : {{invoiceLink}}"
  },
  {
    id: 'step-4-paiement',
    name: 'Email 4 - Paiement Final',
    category: 'sale',
    subject: '✨ Votre site est prêt ! (Dernière étape)',
    variables: ['firstName', 'companyName', 'websiteLink', 'finalPaymentLink'],
    htmlContent: `<!DOCTYPE html><html><head>${PREMIUM_STYLE}</head><body>
      <div class="container">
        <div class="header">${LOGO_HTML}<h1>SITE TERMINÉ !</h1></div>
        <div class="content">
          <h2>Bonne nouvelle {{firstName}}, votre site est prêt !</h2>
          <p>Pour mettre votre site pour <strong>{{companyName}}</strong> en ligne sur votre domaine final, merci de régler le solde de 100€ :</p>
          <div style="text-align: center;"><a href="{{websiteLink}}" class="btn btn-dark">🔍 VOIR LA VERSION FINALE</a></div>
          <div class="highlight-box" style="text-align: center;">
            <a href="{{finalPaymentLink}}" class="btn btn-success">🚀 RÉGLER LE SOLDE (100€)</a>
          </div>
        </div>
      </div>
    </body></html>`,
    textContent: "Votre site {{companyName}} est prêt. Payer le solde : {{finalPaymentLink}}"
  },
  {
    id: 'step-5-confirmation',
    name: 'Email 5 - Confirmation Paiement Final',
    category: 'sale',
    subject: '🎉 Félicitations ! Votre paiement est validé',
    variables: ['firstName', 'companyName', 'invoiceLink'],
    htmlContent: `<!DOCTYPE html><html><head>${PREMIUM_STYLE}</head><body>
      <div class="container">
        <div class="header">${LOGO_HTML}<h1>BIENVENUE CHEZ VOUS !</h1></div>
        <div class="content">
          <h2>Félicitations {{firstName}} !</h2>
          <p>Nous avons bien reçu votre paiement final pour <strong>{{companyName}}</strong>. Vous êtes maintenant l'unique propriétaire de votre site web professionnel.</p>
          <div class="highlight-box" style="text-align: center; border-left: 5px solid #28a745;">
            <p style="font-weight: bold;">Voici votre facture finale :</p>
            <a href="{{invoiceLink}}" class="btn btn-success">📄 TÉLÉCHARGER LA FACTURE</a>
          </div>
          <p>Vos accès de connexion arrivent dans quelques minutes.</p>
        </div>
      </div>
    </body></html>`,
    textContent: "Paiement final reçu pour {{companyName}}. Facture : {{invoiceLink}}"
  },
  {
    id: 'step-6-livraison',
    name: 'Email 6 - Livraison & Accès',
    category: 'sale',
    subject: '🔐 Vos Accès Administrateur - {{companyName}}',
    variables: ['firstName', 'companyName', 'adminLink', 'adminUsername', 'adminPassword', 'documentationLink'],
    htmlContent: `<!DOCTYPE html><html><head>${PREMIUM_STYLE}</head><body>
      <div class="container">
        <div class="header">${LOGO_HTML}<h1>VOS ACCÈS</h1></div>
        <div class="content">
          <h2>Voici vos accès, {{firstName}}</h2>
          <div class="highlight-box">
             <p><strong>Lien d'administration :</strong> <br><a href="{{adminLink}}" style="color: #D4500A;">{{adminLink}}</a></p>
             <p><strong>Identifiant :</strong> {{adminUsername}}</p>
             <p><strong>Mot de passe :</strong> {{adminPassword}}</p>
          </div>
          <div style="text-align: center;"><a href="{{documentationLink}}" class="btn btn-dark">📚 VOIR LA DOCUMENTATION</a></div>
        </div>
      </div>
    </body></html>`,
    textContent: "Accès {{companyName}}. User: {{adminUsername}}, Pass: {{adminPassword}}"
  }
];

export const reminderTemplates: EmailTemplate[] = [
  {
    id: 'reminder1_after_email1',
    name: 'Rappel 1 - Après Email 1',
    category: 'reminder',
    subject: 'Suivi : Votre démo pour {{companyName}}',
    variables: ['firstName', 'companyName', 'websiteLink', 'startProjectLink'],
    htmlContent: `<!DOCTYPE html><html><head>${PREMIUM_STYLE}</head><body>
      <div class="container">
        <div class="header">${LOGO_HTML}<h1>SUIVI PROJET</h1></div>
        <div class="content">
          <h2>Bonjour {{firstName}},</h2>
          <p>Je reviens vers vous concernant la démo du nouveau site pour <strong>{{companyName}}</strong>.</p>
          <div style="text-align: center;"><a href="{{websiteLink}}" class="btn btn-dark">🔍 REVOIR LA DÉMO</a></div>
          <div style="text-align: center;"><a href="{{startProjectLink}}" class="btn btn-primary">DÉMARRER LE PROJET MAINTENANT →</a></div>
        </div>
      </div>
    </body></html>`,
    textContent: "Avez-vous vu la démo pour {{companyName}} ? {{websiteLink}}"
  }
];

export const PREMIUM_OUTREACH_TEMPLATES = salesTemplates;

export function getTemplateById(id: string): EmailTemplate | undefined {
  const all = [...salesTemplates, ...reminderTemplates];
  return all.find(template => template.id === id);
}

export const allTemplates = [...salesTemplates, ...reminderTemplates];
