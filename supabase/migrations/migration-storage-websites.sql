-- ============================================================
-- LeadForge AI - Migration Storage
-- Création du bucket 'websites' pour héberger les sites générés
-- ============================================================

-- Crée un bucket public appelé "websites"
INSERT INTO storage.buckets (id, name, public) 
VALUES ('websites', 'websites', true)
ON CONFLICT (id) DO NOTHING;

-- Autoriser l'accès public en LECTURE
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING ( bucket_id = 'websites' );

-- Autoriser l'insertion pour l'API / le client authentifié
CREATE POLICY "Anon Upload Access" 
ON storage.objects FOR INSERT 
WITH CHECK ( bucket_id = 'websites' );

CREATE POLICY "Anon Update Access" 
ON storage.objects FOR UPDATE 
WITH CHECK ( bucket_id = 'websites' );

SELECT 'Migration Storage terminée : Bucket "websites" créé et prêt.' as status;
