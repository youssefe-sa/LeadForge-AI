-- ============================================================
-- Migration: Mise à jour des templates email Outreach Agent v2
-- Date: 2026-04-11
-- Description: Partie 2 - Insertion des templates Email 4-6
-- ============================================================

-- Email 4 - Paiement Final
INSERT INTO email_templates (id, name, sector, subject, body, created_at, updated_at) VALUES (
  'email4_final_payment',
  'Email 4 - Paiement Final',
  'sale',
  '🎉 Votre site {{companyName}} est prêt - Paiement final',
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
        <p style="font-size: 16px; margin-bottom: 20px; color: #0c5460;">Nous avons le plaisir de vous annoncer que le développement de votre site web pour {{companyName}} est maintenant terminé.</p>
        <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: 500;">Découvrez votre site :</p>
        <p style="margin: 0; font-size: 14px; color: #007bff;"><a href="{{websiteLink}}" style="color: #007bff; text-decoration: underline; font-weight: 600;">{{websiteLink}}</a></p>
      </div>
      <div style="background-color: #fff3cd; padding: 25px; margin: 0 0 30px 0; border: 1px solid #ffeaa7; border-radius: 8px;">
        <h3 style="color: #856404; margin-top: 0; margin-bottom: 15px; font-size: 18px;">💰 Paiement final requis</h3>
        <p style="font-size: 16px; margin-bottom: 20px; color: #856404;">Pour finaliser la mise en ligne de votre site, le paiement final de <strong>100€</strong> est requis.</p>
        <div style="background: #f8f9fa; padding: 15px; border-radius: 6px; margin: 15px 0;">
          <p style="margin: 0; font-size: 16px; font-weight: 600; color: #2c3e50;">Total projet : 146€ HT (46€ déjà payés + 100€ restants)</p>
        </div>
        <div style="text-align: center; margin: 20px 0;">
          <a href="{{finalPaymentLink}}" style="background: #007bff; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold; font-size: 16px;" target="_blank">💳 Payer 100€ - Finaliser le projet →</a>
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

-- Email 5 - Confirmation Paiement Final
INSERT INTO email_templates (id, name, sector, subject, body, created_at, updated_at) VALUES (
  'email5_final_payment_confirmation',
  'Email 5 - Confirmation Paiement Final',
  'sale',
  '✅ Paiement final confirmé - Votre site {{companyName}} est en ligne !',
  '<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Solutions Web - Paiement Final Confirmé</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #ffffff; color: #333333; line-height: 1.6;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="text-align: center; margin-bottom: 40px; padding-bottom: 30px; border-bottom: 1px solid #e0e0e0;">
      <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #28a745;">✅ Paiement final confirmé !</h1>
      <p style="margin: 8px 0 0 0; font-size: 14px; color: #7f8c8d;">Votre site {{companyName}} est maintenant en ligne</p>
    </div>
    <div style="margin-bottom: 30px;">
      <h2 style="color: #2c3e50; margin-bottom: 15px; font-size: 20px;">Bonjour {{firstName}},</h2>
      <div style="background-color: #d4edda; padding: 25px; margin: 0 0 30px 0; border: 1px solid #c3e6cb; border-radius: 8px;">
        <h3 style="color: #155724; margin-top: 0; margin-bottom: 15px; font-size: 18px;">🎉 Projet complété avec succès !</h3>
        <p style="font-size: 16px; margin-bottom: 20px; color: #155724;">Nous vous confirmons la bonne réception de votre paiement final de <strong>100€</strong>. Votre site web {{companyName}} est maintenant officiellement en ligne.</p>
        <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: 500;">Découvrez votre site en ligne :</p>
        <p style="margin: 0; font-size: 14px; color: #007bff;"><a href="{{websiteLink}}" style="color: #007bff; text-decoration: underline; font-weight: 600;">{{websiteLink}}</a></p>
      </div>
      <div style="background-color: #fff3cd; padding: 25px; margin: 0 0 30px 0; border: 1px solid #ffeaa7; border-radius: 8px;">
        <h3 style="color: #856404; margin-top: 0; margin-bottom: 15px; font-size: 18px;">📄 Votre facture finale</h3>
        <p style="font-size: 16px; margin-bottom: 20px; color: #856404;">Une facture pour le paiement final de 100€ est disponible :</p>
        <p style="margin: 0; font-size: 14px; color: #007bff;"><a href="{{invoiceLink}}" style="color: #007bff; text-decoration: underline;">{{invoiceLink}}</a></p>
      </div>
      <div style="margin-bottom: 30px;">
        <h3 style="color: #2c3e50; margin-bottom: 15px; font-size: 18px;">📋 Prochaines étapes</h3>
        <ul style="font-size: 16px; line-height: 1.8; margin: 0; padding-left: 20px;">
          <li>Vous recevrez très prochainement un email avec vos accès administrateur</li>
          <li>📚 La documentation complète</li>
          <li>🛠️ Les guides de gestion</li>
        </ul>
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

-- Email 6 - Livraison et Documentation
INSERT INTO email_templates (id, name, sector, subject, body, created_at, updated_at) VALUES (
  'email6_delivery_documentation',
  'Email 6 - Livraison et Documentation',
  'sale',
  '🔐 Accès et documentation pour votre site {{companyName}}',
  '<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Solutions Web - Livraison et Documentation</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #ffffff; color: #333333; line-height: 1.6;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="text-align: center; margin-bottom: 40px; padding-bottom: 30px; border-bottom: 1px solid #e0e0e0;">
      <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #007bff;">🔐 Livraison complète</h1>
      <p style="margin: 8px 0 0 0; font-size: 16px; color: #7f8c8d;">Accès et documentation pour {{companyName}}</p>
    </div>
    <div style="margin-bottom: 30px;">
      <h2 style="color: #2c3e50; margin-bottom: 15px; font-size: 20px;">Bonjour {{firstName}},</h2>
      <div style="background-color: #d1ecf1; padding: 25px; margin: 0 0 30px 0; border: 1px solid #bee5eb; border-radius: 8px;">
        <h3 style="color: #0c5460; margin-top: 0; margin-bottom: 15px; font-size: 18px;">🔑 Vos accès administrateur</h3>
        <p style="font-size: 16px; margin-bottom: 20px; color: #0c5460;">Voici vos identifiants pour gérer votre site {{companyName}} :</p>
        <div style="background: #f8f9fa; padding: 15px; border-radius: 6px; margin-bottom: 15px;">
          <p style="margin: 0 0 8px 0; font-size: 14px; color: #666;"><strong>URL d''administration :</strong></p>
          <p style="margin: 0 0 15px 0; font-size: 14px; color: #007bff;"><a href="{{adminLink}}" style="color: #007bff; text-decoration: underline; font-weight: 600;">{{adminLink}}</a></p>
          <p style="margin: 0 0 8px 0; font-size: 14px; color: #666;"><strong>Nom d''utilisateur :</strong></p>
          <p style="margin: 0 0 15px 0; font-size: 14px; font-weight: 600; color: #2c3e50;">{{adminUsername}}</p>
          <p style="margin: 0 0 8px 0; font-size: 14px; color: #666;"><strong>Mot de passe :</strong></p>
          <p style="margin: 0; font-size: 14px; font-weight: 600; color: #2c3e50;">{{adminPassword}}</p>
        </div>
        <p style="margin: 0; font-size: 12px; color: #0c5460;">🔒 Conservez ces identifiants en sécurité et changez le mot de passe lors de votre première connexion</p>
      </div>
      <div style="background-color: #fff3cd; padding: 20px; margin: 0 0 30px 0; border: 1px solid #ffeaa7; border-radius: 8px;">
        <h3 style="color: #856404; margin-top: 0; margin-bottom: 10px; font-size: 16px;">📚 Documentation complète</h3>
        <p style="margin: 0 0 10px 0; font-size: 14px; color: #856404;">Accédez à notre documentation détaillée pour gérer votre site :</p>
        <p style="margin: 0; font-size: 14px; color: #007bff;"><a href="{{documentationLink}}" style="color: #007bff; text-decoration: underline; font-weight: 600;">Consulter la documentation</a></p>
      </div>
      <div style="background-color: #d4edda; padding: 20px; margin: 0 0 30px 0; border: 1px solid #c3e6cb; border-radius: 8px;">
        <h3 style="color: #155724; margin-top: 0; margin-bottom: 10px; font-size: 16px;">🌐 Votre site en ligne</h3>
        <p style="margin: 0 0 10px 0; font-size: 14px; color: #155724;">Votre site est accessible à l''adresse : <a href="{{websiteLink}}" style="color: #007bff; text-decoration: underline; font-weight: 600;">{{websiteLink}}</a></p>
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
