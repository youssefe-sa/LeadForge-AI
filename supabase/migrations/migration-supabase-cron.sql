-- ============================================================
-- LeadForge AI - Cron Job Interne via Supabase (pg_cron & pg_net)
-- Pingue l'API Vercel toutes les 30 minutes depuis la base de données
-- ============================================================

-- 1. On s'assure que les extensions requises pour faire des requêtes HTTP et des CRON sont actives
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- 2. Suppression de l'ancienne tâche si elle existe déjà (pour pouvoir relancer le script sans erreur)
SELECT cron.unschedule('leadforge-email-worker')
WHERE EXISTS (
    SELECT 1 FROM cron.job WHERE jobname = 'leadforge-email-worker'
);

-- 3. Programmation de la requête HTTP toutes les 30 minutes
SELECT cron.schedule(
  'leadforge-email-worker', -- Nom de la tâche
  '*/30 * * * *',           -- Fréquence (toutes les 30 minutes)
  $$
    SELECT net.http_post(
        url:='https://www.services-siteup.online/api/cron-emails',
        headers:='{"Content-Type": "application/json"}'::jsonb
    );
  $$
);

SELECT 'Cron Interne Supabase activé ! L''API /api/cron-emails sera appelée toutes les 30 min.' as status;
