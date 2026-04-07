-- ============================================================
-- LeadForge AI - Migration Sécurité RLS Pro
-- Active la sécurité Row Level Security et les politiques d'accès
-- ============================================================

-- 1. Activation de RLS sur toutes les tables sensibles
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;

-- 2. Politiques pour la table 'leads'
-- Permettre l'accès public (anon) pour le moment (requis pour le fonctionnement actuel)
-- En production, remplacez par des politiques basées sur l'authentification
DROP POLICY IF EXISTS "Accès total anon leads" ON leads;
CREATE POLICY "Accès total anon leads" ON leads 
  FOR ALL 
  TO anon 
  USING (true) 
  WITH CHECK (true);

-- 3. Politiques pour la table 'api_config'
DROP POLICY IF EXISTS "Accès total anon config" ON api_config;
CREATE POLICY "Accès total anon config" ON api_config 
  FOR ALL 
  TO anon 
  USING (true) 
  WITH CHECK (true);

-- 4. Politiques pour 'campaigns' et 'logs'
DROP POLICY IF EXISTS "Accès total anon campaigns" ON campaigns;
CREATE POLICY "Accès total anon campaigns" ON campaigns 
  FOR ALL 
  TO anon 
  USING (true) 
  WITH CHECK (true);

DROP POLICY IF EXISTS "Accès total anon email_logs" ON email_logs;
CREATE POLICY "Accès total anon email_logs" ON email_logs 
  FOR ALL 
  TO anon 
  USING (true) 
  WITH CHECK (true);

-- 5. Politique spécifique pour le tracking (Optionnel mais recommandé)
-- Permettre uniquement l'UPDATE de certains champs pour le tracking public
-- Déjà inclus dans la politique "Accès total" ci-dessus.

-- NOTE PROFESSIONNELLE :
-- Pour verrouiller réellement le système, vous devriez :
-- 1. Utiliser Supabase Auth (Login/Password).
-- 2. Remplacer 'TO anon' par 'TO authenticated'.
-- 3. Utiliser (auth.uid() = user_id) si vous avez plusieurs utilisateurs.

SELECT 'Migration RLS terminée : Sécurité activée avec politiques permissives par défaut.' as status;
