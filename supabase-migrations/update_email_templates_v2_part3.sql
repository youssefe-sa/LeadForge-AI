-- ============================================================
-- Migration: Mise à jour des templates email Outreach Agent v2
-- Date: 2026-04-11
-- Description: Partie 3 - Insertion des templates de rappel (Reminder 1-3)
-- ============================================================

-- Reminder 1 - Après Email 1
INSERT INTO email_templates (id, name, sector, subject, body, created_at, updated_at) VALUES (
  'reminder1_after_email1',
  'Rappel 1 - Après Email 1',
  'reminder',
  'Suivi : Votre site web {{companyName}} vous attend',
  '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>Solutions Web - Suivi</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #ffffff; color: #333333; line-height: 1.6;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
    <div style="text-align: center; margin-bottom: 40px; padding-bottom: 30px; border-bottom: 1px solid #e0e0e0;">
      <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #2c3e50;">{{agentName}}</h1>
      <p style="margin: 4px 0 0 0; font-size: 14px; color: #7f8c8d;">Solutions Web - Votre partenaire web</p>
      <p style="margin: 4px 0 0 0; font-size: 14px; color: #7f8c8d;">{{agentEmail}}</p>
    </div>
    <div style="margin-bottom: 30px;">
      <h2 style="color: #2c3e50; margin-bottom: 15px; font-size: 20px;">Bonjour {{firstName}},</h2>
      <div style="margin-bottom: 30px;">
        <p style="font-size: 16px; margin-bottom: 15px;"><strong>Notre engagement pour votre succès</strong> : Chez {{agentName}}, nous ne considérons pas que notre travail se termine avec l''envoi d''une proposition.</p>
      </div>
      <div style="background-color: #f8f9fa; padding: 25px; margin: 30px 0; border: 1px solid #e9ecef;">
        <h3 style="color: #2c3e50; margin-top: 0; margin-bottom: 15px; font-size: 18px;">Votre site web vous attend</h3>
        <p style="font-size: 16px; margin-bottom: 20px;">Je fais suite à notre précédent email concernant votre site web professionnel pour {{companyName}}.</p>
        <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: 500;">Découvrez votre futur site :</p>
        <p style="margin: 0 0 20px 0; font-size: 14px; color: #007bff;"><a href="{{websiteLink}}" style="color: #007bff; text-decoration: underline; font-weight: 600;">{{websiteLink}}</a></p>
      </div>
      <div style="margin: 30px 0;">
        <h3 style="color: #2c3e50; margin-bottom: 20px; font-size: 18px;">Pourquoi choisir {{agentName}} ?</h3>
        <div style="margin-bottom: 25px;">
          <h4 style="color: #2c3e50; margin-bottom: 10px; font-size: 16px;">💰 Paiement en 2 étapes - Total : 146€ HT</h4>
          <ul style="padding-left: 20px; margin: 0;">
            <li style="margin-bottom: 12px;"><strong>Dépôt pour commencer</strong> : Seulement 46€ pour lancer votre projet</li>
            <li style="margin-bottom: 12px;"><strong>Paiement final à la livraison</strong> : 100€ lorsque votre site est prêt</li>
            <li style="margin-bottom: 0;"><strong>Pas de frais cachés</strong> : Hébergement et domaine inclus la première année</li>
          </ul>
        </div>
        <div style="margin-bottom: 25px;">
          <h4 style="color: #2c3e50; margin-bottom: 10px; font-size: 16px;">⚡ Livraison express 2 jours</h4>
          <ul style="padding-left: 20px; margin: 0;">
            <li style="margin-bottom: 12px;"><strong>Rapidité exceptionnelle</strong> : Site web prêt en 2 jours ouvrés</li>
            <li style="margin-bottom: 0;"><strong>Processus optimisé</strong> : Méthodologie éprouvée sans compromis sur la qualité</li>
          </ul>
        </div>
      </div>
      <div style="text-align: center; margin: 40px 0;">
        <p style="margin-bottom: 20px; font-size: 16px;">Prêt à démarrer votre projet ?</p>
        <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
          <a href="{{paymentLink}}" style="display: inline-block; background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: 500;" target="_blank">Commencer avec 46€</a>
          <a href="mailto:{{agentEmail}}?subject=Questions {{companyName}}" style="display: inline-block; background-color: #6c757d; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: 500;">Discuter du projet</a>
        </div>
      </div>
    </div>
    <div style="margin-top: 30px; text-align: left;">
      <p style="margin: 0; font-size: 16px; font-weight: 600; color: #2c3e50;">{{agentName}}</p>
      <p style="margin: 4px 0 0 0; font-size: 14px; color: #7f8c8d;">Solutions Web - Votre partenaire web</p>
      <p style="margin: 4px 0 0 0; font-size: 14px; color: #7f8c8d;">{{agentEmail}}</p>
    </div>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>',
  NOW(),
  NOW()
);

-- Reminder 2 - Après Email 2
INSERT INTO email_templates (id, name, sector, subject, body, created_at, updated_at) VALUES (
  'reminder2_after_email2',
  'Rappel 2 - Après Email 2',
  'reminder',
  '📋 Devis en attente - Votre projet {{companyName}}',
  '<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Solutions Web - Devis en attente</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #ffffff; color: #333333; line-height: 1.6;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="text-align: center; margin-bottom: 40px; padding-bottom: 30px; border-bottom: 1px solid #e0e0e0;">
      <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #ffc107;">📋 Devis en attente</h1>
      <p style="margin: 8px 0 0 0; font-size: 14px; color: #7f8c8d;">Votre projet {{companyName}}</p>
    </div>
    <div style="margin-bottom: 30px;">
      <h2 style="color: #2c3e50; margin-bottom: 15px; font-size: 20px;">Bonjour {{firstName}},</h2>
      <div style="background-color: #fff3cd; padding: 25px; margin: 0 0 30px 0; border: 1px solid #ffeaa7; border-radius: 8px;">
        <h3 style="color: #856404; margin-top: 0; margin-bottom: 15px; font-size: 18px;">📋 Votre devis vous attend</h3>
        <p style="font-size: 16px; margin-bottom: 20px; color: #856404;">Nous vous avons envoyé un devis détaillé pour votre projet {{companyName}}. Avez-vous eu l''occasion de le consulter ?</p>
        <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: 500;">Votre devis complet :</p>
        <p style="margin: 0 0 20px 0; font-size: 14px; color: #007bff;"><a href="{{devisLink}}" style="color: #007bff; text-decoration: underline;">{{devisLink}}</a></p>
      </div>
      <div style="background-color: #f8f9fa; padding: 25px; margin: 0 0 30px 0; border: 1px solid #e9ecef; border-radius: 8px;">
        <h3 style="color: #2c3e50; margin-top: 0; margin-bottom: 15px; font-size: 18px;">💰 Détails du projet</h3>
        <p style="font-size: 16px; margin-bottom: 15px; color: #2c3e50;">Paiement en 2 étapes - Total : 146€ HT</p>
        <div style="background: #e9ecef; padding: 15px; border-radius: 6px; margin: 15px 0;">
          <div style="margin-bottom: 10px;"><span style="font-weight: 600; color: #28a745;">🚀 Étape 1 - Dépôt pour commencer</span> <span style="font-weight: bold; color: #28a745; font-size: 16px;">46€</span></div>
          <div><span style="font-weight: 600; color: #007bff;">🎯 Étape 2 - Paiement final à la livraison</span> <span style="font-weight: bold; color: #007bff; font-size: 16px;">100€</span></div>
        </div>
      </div>
      <div style="text-align: center; margin: 40px 0;">
        <p style="margin-bottom: 20px; font-size: 16px;">Prêt à démarrer votre projet ?</p>
        <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
          <a href="{{paymentLink}}" style="display: inline-block; background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: 500;" target="_blank">Payer 46€ pour commencer</a>
          <a href="mailto:{{agentEmail}}?subject=Questions devis {{companyName}}" style="display: inline-block; background-color: #6c757d; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: 500;">Des questions ?</a>
        </div>
      </div>
    </div>
    <div style="margin-top: 30px; text-align: left;">
      <p style="margin: 0; font-size: 16px; font-weight: 600; color: #2c3e50;">{{agentName}}</p>
      <p style="margin: 4px 0 0 0; font-size: 14px; color: #7f8c8d;">Solutions Web - Votre partenaire web</p>
      <p style="margin: 4px 0 0 0; font-size: 14px; color: #7f8c8d;">{{agentEmail}}</p>
    </div>
  </div>
</body>
</html>',
  NOW(),
  NOW()
);

-- Reminder 3 - Paiement Final
INSERT INTO email_templates (id, name, sector, subject, body, created_at, updated_at) VALUES (
  'reminder3_final_payment',
  'Rappel 3 - Paiement Final',
  'reminder',
  '🎉 Votre site {{companyName}} est prêt - Finalisation',
  '<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Solutions Web - Site Prêt</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #ffffff; color: #333333; line-height: 1.6;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="text-align: center; margin-bottom: 40px; padding-bottom: 30px; border-bottom: 1px solid #e0e0e0;">
      <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #007bff;">🎉 Votre site est prêt !</h1>
      <p style="margin: 8px 0 0 0; font-size: 14px; color: #7f8c8d;">{{companyName}} - Prêt pour la mise en ligne</p>
    </div>
    <div style="margin-bottom: 30px;">
      <h2 style="color: #2c3e50; margin-bottom: 15px; font-size: 20px;">Bonjour {{firstName}},</h2>
      <div style="background-color: #d1ecf1; padding: 25px; margin: 0 0 30px 0; border: 1px solid #bee5eb; border-radius: 8px;">
        <h3 style="color: #0c5460; margin-top: 0; margin-bottom: 15px; font-size: 18px;">🎯 Site web terminé !</h3>
        <p style="font-size: 16px; margin-bottom: 20px; color: #0c5460;">Le développement de votre site web pour {{companyName}} est terminé.</p>
        <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: 500;">Découvrez votre site :</p>
        <p style="margin: 0; font-size: 14px; color: #007bff;"><a href="{{websiteLink}}" style="color: #007bff; text-decoration: underline; font-weight: 600;">{{websiteLink}}</a></p>
      </div>
      <div style="background-color: #fff3cd; padding: 25px; margin: 0 0 30px 0; border: 1px solid #ffeaa7; border-radius: 8px;">
        <h3 style="color: #856404; margin-top: 0; margin-bottom: 15px; font-size: 18px;">💰 Paiement final requis</h3>
        <p style="font-size: 16px; margin-bottom: 20px; color: #856404;">Le paiement final de <strong>100€</strong> est requis pour la mise en ligne.</p>
        <div style="background: #f8f9fa; padding: 15px; border-radius: 6px; margin: 15px 0;">
          <p style="margin: 0; font-size: 16px; font-weight: 600; color: #2c3e50;">Total : 146€ HT (46€ payés + 100€ restants)</p>
        </div>
        <div style="text-align: center; margin: 20px 0;">
          <a href="{{finalPaymentLink}}" style="background: #007bff; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold; font-size: 16px;" target="_blank">💳 Payer 100€ →</a>
        </div>
      </div>
    </div>
    <div style="margin-top: 30px; text-align: left;">
      <p style="margin: 0; font-size: 16px; font-weight: 600; color: #2c3e50;">{{agentName}}</p>
      <p style="margin: 4px 0 0 0; font-size: 14px; color: #7f8c8d;">Solutions Web - Votre partenaire web</p>
      <p style="margin: 4px 0 0 0; font-size: 14px; color: #7f8c8d;">{{agentEmail}}</p>
    </div>
  </div>
</body>
</html>',
  NOW(),
  NOW()
);
