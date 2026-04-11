-- Colonnes de tracking des clics (erreurs "column not found" en prod)
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS site_clicked BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS payment_clicked BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS devis_clicked BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS invoice_clicked BOOLEAN DEFAULT FALSE;

-- Colonnes Whop (si pas encore présentes)
ALTER TABLE api_config
  ADD COLUMN IF NOT EXISTS whop_deposit_link TEXT,
  ADD COLUMN IF NOT EXISTS whop_final_payment_link TEXT;

-- Colonnes pour fonctionnalités manquantes
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS admin_password TEXT,
  ADD COLUMN IF NOT EXISTS devis_url TEXT,
  ADD COLUMN IF NOT EXISTS invoice_url TEXT;

-- Vérification
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'leads'
ORDER BY ordinal_position;
