-- Migration : ajout de la colonne site_html pour l'hébergement des sites générés
-- À exécuter dans : Supabase Dashboard → SQL Editor

ALTER TABLE leads ADD COLUMN IF NOT EXISTS site_html TEXT;

-- Commentaire : cette colonne stocke le HTML complet du site généré par l'Agent 3.
-- Il est ensuite servi publiquement via la route Vercel GET /api/sites/{id}
