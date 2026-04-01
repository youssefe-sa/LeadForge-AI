-- ============================================================
-- LeadForge AI - Migration pour champs enrichis
-- Ajoute les champs manquants pour l'enrichissement des leads
-- ============================================================

-- Ajouter les champs d'enrichissement Google/Serper
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS google_rating REAL,
ADD COLUMN IF NOT EXISTS google_reviews INTEGER,
ADD COLUMN IF NOT EXISTS google_maps_url TEXT,
ADD COLUMN IF NOT EXISTS serper_cid TEXT,
ADD COLUMN IF NOT EXISTS serper_type TEXT,
ADD COLUMN IF NOT EXISTS serper_hours TEXT,
ADD COLUMN IF NOT EXISTS serper_snippets TEXT[], -- Array de snippets
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS logo TEXT,
ADD COLUMN IF NOT EXISTS images TEXT[], -- Array d'URLs d'images
ADD COLUMN IF NOT EXISTS website_images TEXT[], -- Array d'URLs d'images du site
ADD COLUMN IF NOT EXISTS google_reviews_data JSONB, -- Données structurées des avis
ADD COLUMN IF NOT EXISTS temperature TEXT, -- very_hot, hot, warm, cold
ADD COLUMN IF NOT EXISTS stage TEXT DEFAULT 'new', -- new, enriched, site_generated, etc.
ADD COLUMN IF NOT EXISTS tags TEXT[], -- Array de tags
ADD COLUMN IF NOT EXISTS generated_prompt TEXT; -- Prompt pour Agent 3

-- Commentaires pour les nouveaux champs
COMMENT ON COLUMN leads.google_rating IS 'Note Google Maps (0-5)';
COMMENT ON COLUMN leads.google_reviews IS 'Nombre d''avis Google';
COMMENT ON COLUMN leads.google_maps_url IS 'URL Google Maps';
COMMENT ON COLUMN leads.serper_cid IS 'ID unique Google Places (Serper)';
COMMENT ON COLUMN leads.serper_type IS 'Type d''entreprise (Serper)';
COMMENT ON COLUMN leads.serper_hours IS 'Horaires d''ouverture (Serper)';
COMMENT ON COLUMN leads.serper_snippets IS 'Snippets de recherche web (Serper)';
COMMENT ON COLUMN leads.description IS 'Description générée par IA';
COMMENT ON COLUMN leads.logo IS 'URL du logo trouvé';
COMMENT ON COLUMN leads.images IS 'URLs des images trouvées';
COMMENT ON COLUMN leads.website_images IS 'URLs des images du site web';
COMMENT ON COLUMN leads.google_reviews_data IS 'Données structurées des avis Google';
COMMENT ON COLUMN leads.temperature IS 'Score de température (very_hot, hot, warm, cold)';
COMMENT ON COLUMN leads.stage IS 'Étape du lead (new, enriched, site_generated, etc.)';
COMMENT ON COLUMN leads.tags IS 'Tags du lead';
COMMENT ON COLUMN leads.generated_prompt IS 'Prompt généré pour création de site';

-- Mettre à jour les leads existants avec des valeurs par défaut
UPDATE leads 
SET 
    stage = CASE 
        WHEN enriched = TRUE THEN 'enriched'
        WHEN site_generated = TRUE THEN 'site_generated'
        ELSE 'new'
    END,
    temperature = CASE 
        WHEN score >= 80 THEN 'very_hot'
        WHEN score >= 60 THEN 'hot'
        WHEN score >= 40 THEN 'warm'
        ELSE 'cold'
    END
WHERE stage IS NULL OR temperature IS NULL;

-- Index pour optimiser les performances
CREATE INDEX IF NOT EXISTS idx_leads_stage ON leads(stage);
CREATE INDEX IF NOT EXISTS idx_leads_temperature ON leads(temperature);
CREATE INDEX IF NOT EXISTS idx_leads_campaign ON leads(campaign);
CREATE INDEX IF NOT EXISTS idx_leads_score ON leads(score);

-- Résultat
SELECT 'Migration completed successfully - Added 14 new columns to leads table' as status;
