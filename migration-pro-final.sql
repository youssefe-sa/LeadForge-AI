-- ============================================================
-- LeadForge AI - Migration Ultra-Professionnelle Finale
-- Synchronise le schéma avec le code et active le tracking
-- ============================================================

-- 1. Table api_config : Ajout des colonnes manquantes pour le support LLM et Media
ALTER TABLE api_config
  ADD COLUMN IF NOT EXISTS gemini_key TEXT,
  ADD COLUMN IF NOT EXISTS nvidia_key TEXT,
  ADD COLUMN IF NOT EXISTS default_llm TEXT DEFAULT 'groq',
  ADD COLUMN IF NOT EXISTS unsplash_key TEXT,
  ADD COLUMN IF NOT EXISTS pexels_key TEXT,
  ADD COLUMN IF NOT EXISTS whop_deposit_link TEXT,
  ADD COLUMN IF NOT EXISTS whop_final_payment_link TEXT;

COMMENT ON COLUMN api_config.gemini_key IS 'Clé API Google Gemini (1M TPM)';
COMMENT ON COLUMN api_config.nvidia_key IS 'Clé API NVIDIA NIM (Llama 3.1)';
COMMENT ON COLUMN api_config.default_llm IS 'LLM par défaut utilisé par le système';
COMMENT ON COLUMN api_config.whop_deposit_link IS 'Lien de paiement Whop pour le dépôt (46$)';
COMMENT ON COLUMN api_config.whop_final_payment_link IS 'Lien de paiement Whop pour le solde (100$)';

-- 2. Table leads : Support complet de l'enrichissement, des sites et du tracking
ALTER TABLE leads
  -- Champs d'enrichissement de base (si manquants)
  ADD COLUMN IF NOT EXISTS google_rating REAL,
  ADD COLUMN IF NOT EXISTS google_reviews INTEGER,
  ADD COLUMN IF NOT EXISTS google_maps_url TEXT,
  ADD COLUMN IF NOT EXISTS serper_cid TEXT,
  ADD COLUMN IF NOT EXISTS serper_type TEXT,
  ADD COLUMN IF NOT EXISTS serper_hours TEXT,
  ADD COLUMN IF NOT EXISTS serper_snippets TEXT[],
  ADD COLUMN IF NOT EXISTS description TEXT,
  ADD COLUMN IF NOT EXISTS logo TEXT,
  ADD COLUMN IF NOT EXISTS images TEXT[],
  ADD COLUMN IF NOT EXISTS website_images TEXT[],
  ADD COLUMN IF NOT EXISTS google_reviews_data JSONB,
  ADD COLUMN IF NOT EXISTS temperature TEXT,
  ADD COLUMN IF NOT EXISTS stage TEXT DEFAULT 'new',
  ADD COLUMN IF NOT EXISTS tags TEXT[],
  ADD COLUMN IF NOT EXISTS generated_prompt TEXT,
  
  -- Champ CRITIQUE pour le stockage du site
  ADD COLUMN IF NOT EXISTS site_html TEXT,
  
  -- Champs de TRACKING (Prospection Professionnelle)
  ADD COLUMN IF NOT EXISTS site_clicked BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS payment_clicked BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS devis_clicked BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS invoice_clicked BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS revenue REAL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS follow_ups INTEGER DEFAULT 0;

-- 3. Indexation pour la performance (Clé pour le CRM)
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_stage ON leads(stage);
CREATE INDEX IF NOT EXISTS idx_leads_campaign ON leads(campaign);
CREATE INDEX IF NOT EXISTS idx_leads_score ON leads(score);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);

-- 4. Nettoyage et Initialisation
-- S'assurer que le status correspond à la nouvelle nomenclature
UPDATE leads 
SET 
    stage = CASE 
        WHEN enriched = TRUE AND stage = 'new' THEN 'enriched'
        WHEN site_generated = TRUE AND (stage = 'new' OR stage = 'enriched') THEN 'site_generated'
        WHEN email_sent = TRUE AND stage != 'converted' THEN 'email_sent'
        ELSE stage
    END
WHERE stage IS NOT NULL;

-- 5. Rappel sur RLS (Sécurité)
-- NOTE: Pour un projet pro, réactivez RLS et configurez des politiques d'accès.
-- ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Allow all for authenticated" ON leads FOR ALL TO authenticated USING (true);

-- Résumé
SELECT 'Migration terminée : Schéma synchronisé et colonnes de tracking ajoutées.' as status;
