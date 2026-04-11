-- ============================================================
-- Migration: Mise à jour des templates email Outreach Agent v2
-- Date: 2026-04-11
-- Description: Remplace les anciens templates par les 9 nouveaux templates
-- PARTIE 1: Suppression des anciens templates + Insertion des 3 premiers templates
-- ============================================================

-- 1. Supprimer les anciens templates
DELETE FROM email_templates WHERE id IN (
  'email1_presentation',
  'email2_devis',
  'email3_confirmation',
  'email4_final_payment',
  'email5_final_payment_confirmation',
  'email6_delivery_documentation',
  'reminder1_after_email1',
  'reminder2_after_email2',
  'reminder3_final_payment'
);

-- 2. Insérer les nouveaux templates (Partie 1: Email 1-3)

-- Email 1 - Présentation Site Web
INSERT INTO email_templates (id, name, sector, subject, body, created_at, updated_at) VALUES (
  'email1_presentation',
  'Email 1 - Présentation Site Web',
  'sale',
  '🚀 {{companyName}} - Votre site web professionnel est prêt',
  '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>Solutions Web - Votre site web</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #ffffff; color: #333333; line-height: 1.6;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
    <div style="text-align: center; margin-bottom: 40px; padding-bottom: 30px; border-bottom: 1px solid #e0e0e0;">
      <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #2c3e50;">{{agentName}}</h1>
      <p style="margin: 8px 0 0 0; font-size: 14px; color: #7f8c8d;">Solutions web professionnelles</p>
    </div>
    <div style="margin-bottom: 30px;">
      <h2 style="color: #2c3e50; margin-bottom: 15px; font-size: 20px;">Bonjour {{firstName}},</h2>
      <div style="background-color: #f8f9fa; padding: 25px; margin: 0 0 30px 0; border: 1px solid #e9ecef;">
        <h3 style="color: #2c3e50; margin-top: 0; margin-bottom: 15px; font-size: 18px;">Notre proposition pour {{companyName}}</h3>
        <p style="font-size: 16px; margin-bottom: 20px;">Nous avons finalisé le développement de votre site web professionnel pour <strong>{{companyName}}</strong>.</p>
        <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: 500;">Votre site web est prêt :</p>
        <p style="margin: 0 0 20px 0; font-size: 14px; color: #007bff;"><a href="{{websiteLink}}" style="color: #007bff; text-decoration: underline; font-weight: 600;">{{websiteLink}}</a></p>
      </div>
      <div style="margin-bottom: 30px;">
        <p style="font-size: 16px; margin-bottom: 15px;"><strong>Qui sommes-nous ?</strong> {{agentName}} est une agence web spécialisée dans la création de sites web professionnels.</p>
      </div>
      <div style="background-color: #fff3cd; padding: 25px; margin: 30px 0; border: 1px solid #ffeaa7;">
        <h3 style="color: #856404; margin-top: 0; margin-bottom: 15px; font-size: 18px;">💰 Modalités de paiement</h3>
        <p style="font-size: 18px; font-weight: 600; margin: 10px 0; color: #2c3e50;">Paiement en 2 étapes - Total : 146€ HT</p>
        <div style="background: #f8f9fa; padding: 15px; border-radius: 6px; margin: 15px 0;">
          <div style="margin-bottom: 10px;"><span style="font-weight: 600; color: #28a745;">🚀 Étape 1 - Dépôt pour commencer</span> <span style="font-weight: bold; color: #28a745; font-size: 16px;">46€</span></div>
          <div><span style="font-weight: 600; color: #007bff;">🎯 Étape 2 - Paiement final à la livraison</span> <span style="font-weight: bold; color: #007bff; font-size: 16px;">100€</span></div>
        </div>
      </div>
      <div style="text-align: center; margin: 40px 0;">
        <a href="mailto:{{agentEmail}}?subject=Démarrage projet {{companyName}}" style="display: inline-block; background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: 500;">Démarrer le projet</a>
      </div>
    </div>
    <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid #e0e0e0;">
      <p style="margin: 0 0 10px 0; font-size: 14px; color: #7f8c8d;">Prêt à transformer votre présence en ligne professionnelle ?</p>
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

-- Email 2 - Devis
INSERT INTO email_templates (id, name, sector, subject, body, created_at, updated_at) VALUES (
  'email2_devis',
  'Email 2 - Devis',
  'sale',
  '📋 Devis personnalisé pour {{companyName}}',
  '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>Devis personnalisé</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #ffffff; color: #333333; line-height: 1.6;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
    <div style="text-align: center; margin-bottom: 40px; padding-bottom: 30px; border-bottom: 1px solid #e0e0e0;">
      <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #2c3e50;">Devis personnalisé</h1>
      <p style="margin: 8px 0 0 0; font-size: 14px; color: #7f8c8d;">Proposition pour {{companyName}}</p>
    </div>
    <div style="margin-bottom: 30px;">
      <h2 style="color: #2c3e50; margin-bottom: 15px; font-size: 20px;">Bonjour {{firstName}},</h2>
      <div style="background-color: #f8f9fa; padding: 25px; margin: 30px 0; border: 1px solid #e9ecef;">
        <h3 style="color: #2c3e50; margin-top: 0; margin-bottom: 15px; font-size: 18px;">Votre projet sur mesure</h3>
        <p style="font-size: 16px; margin-bottom: 20px;">Suite à nos échanges, voici votre devis détaillé pour la création de votre site web professionnel.</p>
        <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: 500;">Votre devis complet :</p>
        <p style="margin: 0 0 20px 0; font-size: 14px; color: #007bff;"><a href="{{devisLink}}" style="color: #007bff; text-decoration: underline;">{{devisLink}}</a></p>
      </div>
      <div style="background-color: #fff3cd; padding: 25px; margin: 30px 0; border: 1px solid #ffeaa7;">
        <h3 style="color: #856404; margin-top: 0; margin-bottom: 15px; font-size: 18px;">💰 Modalités de paiement</h3>
        <p style="font-size: 18px; font-weight: 600; margin: 10px 0; color: #2c3e50;">Paiement en 2 étapes - Total : 146€ HT</p>
        <div style="background: #f8f9fa; padding: 15px; border-radius: 6px; margin: 15px 0;">
          <div style="margin-bottom: 10px;"><span style="font-weight: 600; color: #28a745;">🚀 Étape 1 - Dépôt pour commencer</span> <span style="font-weight: bold; color: #28a745; font-size: 16px;">46€</span></div>
          <div><span style="font-weight: 600; color: #007bff;">🎯 Étape 2 - Paiement final à la livraison</span> <span style="font-weight: bold; color: #007bff; font-size: 16px;">100€</span></div>
        </div>
        <p style="margin: 15px 0 0 0; font-size: 14px; color: #856404;">Offre valide {{validityDays}} jours.</p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="{{paymentLink}}" style="background: #28a745; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold; font-size: 16px;" target="_blank">💳 Payer 46€ pour commencer →</a>
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

-- Email 3 - Confirmation Dépôt
INSERT INTO email_templates (id, name, sector, subject, body, created_at, updated_at) VALUES (
  'email3_confirmation',
  'Email 3 - Confirmation Dépôt',
  'sale',
  '🚀 Dépôt confirmé - Votre projet {{companyName}} démarre !',
  '<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Solutions Web - Dépôt Confirmé</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #ffffff; color: #333333; line-height: 1.6;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="text-align: center; margin-bottom: 40px; padding-bottom: 30px; border-bottom: 1px solid #e0e0e0;">
      <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #28a745;">🚀 Dépôt confirmé !</h1>
      <p style="margin: 8px 0 0 0; font-size: 14px; color: #7f8c8d;">Votre projet {{companyName}} démarre maintenant</p>
    </div>
    <div style="margin-bottom: 30px;">
      <h2 style="color: #2c3e50; margin-bottom: 15px; font-size: 20px;">Bonjour {{firstName}},</h2>
      <div style="background-color: #d4edda; padding: 25px; margin: 0 0 30px 0; border: 1px solid #c3e6cb; border-radius: 8px;">
        <h3 style="color: #155724; margin-top: 0; margin-bottom: 15px; font-size: 18px;">✅ Dépôt de 46€ reçu</h3>
        <p style="font-size: 16px; margin-bottom: 20px; color: #155724;">Nous vous confirmons la bonne réception de votre dépôt de <strong>46€</strong> pour votre projet {{companyName}}.</p>
        <p style="margin: 0; font-size: 14px; color: #155724;"><strong>Reste à payer :</strong> 100€ (à la livraison)</p>
      </div>
      <div style="background-color: #f8f9fa; padding: 25px; margin: 0 0 30px 0; border: 1px solid #e9ecef; border-radius: 8px;">
        <h3 style="color: #2c3e50; margin-top: 0; margin-bottom: 15px; font-size: 18px;">📅 Votre calendrier de projet</h3>
        <p style="font-size: 16px; margin-bottom: 15px; color: #2c3e50;"><strong>Livraison prévue le {{deliveryDate}}</strong></p>
      </div>
      <div style="background-color: #fff3cd; padding: 25px; margin: 0 0 30px 0; border: 1px solid #ffeaa7; border-radius: 8px;">
        <h3 style="color: #856404; margin-top: 0; margin-bottom: 15px; font-size: 18px;">📄 Votre facture de dépôt</h3>
        <p style="font-size: 16px; margin-bottom: 20px; color: #856404;">Une facture pour votre dépôt de 46€ est disponible :</p>
        <p style="margin: 0; font-size: 14px; color: #007bff;"><a href="{{invoiceLink}}" style="color: #007bff; text-decoration: underline;">{{invoiceLink}}</a></p>
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
