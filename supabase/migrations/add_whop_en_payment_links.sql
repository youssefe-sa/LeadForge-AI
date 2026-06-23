-- Migration: Ajouter les colonnes pour les liens de paiement Whop en anglais (USD)
-- Exécuter ce script dans l'éditeur SQL de Supabase Dashboard

ALTER TABLE api_config 
ADD COLUMN IF NOT EXISTS whop_deposit_link_en TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS whop_final_payment_link_en TEXT DEFAULT '';
