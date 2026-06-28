-- Correction des politiques de sécurité du Storage
-- Autorise de forcer la mise à jour (upload avec upsert=true)

DROP POLICY IF EXISTS "Anon Upload Access" ON storage.objects;
DROP POLICY IF EXISTS "Anon Update Access" ON storage.objects;
DROP POLICY IF EXISTS "Public Access" ON storage.objects;

-- On remplace par une politique qui autorise tout sur ce bucket pour que le script marche 100% du temps
CREATE POLICY "Full Access Websites Bucket" 
ON storage.objects FOR ALL 
USING ( bucket_id = 'websites' )
WITH CHECK ( bucket_id = 'websites' );

SELECT 'Politiques de sécurité Storage mises à jour avec succès.' as status;
