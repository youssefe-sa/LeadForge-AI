-- Ajouter les colonnes pour les liens de paiement Whop
-- Migration pour les paiements : 46$ (dépôt) et 100$ (paiement final)

ALTER TABLE api_config 
ADD COLUMN IF NOT EXISTS whop_deposit_link TEXT,
ADD COLUMN IF NOT EXISTS whop_final_payment_link TEXT;

COMMENT ON COLUMN api_config.whop_deposit_link IS 'Lien de paiement Whop pour le dépôt de 46$';
COMMENT ON COLUMN api_config.whop_final_payment_link IS 'Lien de paiement Whop pour le paiement final de 100$';
