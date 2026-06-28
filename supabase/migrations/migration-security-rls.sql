-- ==============================================================================
-- MIGRATION DE SÉCURITÉ : ACTIVATION DES POLITIQUES RLS (Row Level Security)
-- ==============================================================================

-- 1. Activation de la sécurité au niveau des lignes pour vos tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE scheduled_emails ENABLE ROW LEVEL SECURITY;

-- 2. Création des politiques "Seuls les utilisateurs authentifiés ont accès"
-- Table: leads
CREATE POLICY "Auth All Leads" 
ON leads 
FOR ALL 
USING (auth.uid() IS NOT NULL);

-- Table: api_config
CREATE POLICY "Auth All Config" 
ON api_config 
FOR ALL 
USING (auth.uid() IS NOT NULL);

-- Table: scheduled_emails
CREATE POLICY "Auth All Emails" 
ON scheduled_emails 
FOR ALL 
USING (auth.uid() IS NOT NULL);

-- ==============================================================================
-- INFO : Dès l'application de ce script, l'accès public (visiteurs sans compte)
-- sera totalement rejeté (ERREUR 403 / Ligne non trouvée). Vos clés d'API
-- seront enfin invisibles depuis Google Chrome pour les non-admin.
-- ==============================================================================
