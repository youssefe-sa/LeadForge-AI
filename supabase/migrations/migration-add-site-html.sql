-- Ajouter le champ site_html à la table leads
-- Migration pour LeadForge AI

ALTER TABLE leads 
ADD COLUMN site_html TEXT;

-- Commentaire sur la colonne
COMMENT ON COLUMN leads.site_html IS 'HTML généré pour le site web du lead';
