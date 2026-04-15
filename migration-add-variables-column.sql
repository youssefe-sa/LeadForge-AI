-- Migration pour ajouter la colonne 'variables' à la table 'email_templates'
-- Date: 2026-04-15
-- Description: Ajout de la colonne pour stocker les variables extraites des templates

-- Ajout de la colonne 'variables' de type JSONB pour stocker un tableau de variables
ALTER TABLE email_templates 
ADD COLUMN variables JSONB;

-- Ajout d'un commentaire pour décrire la colonne
COMMENT ON COLUMN email_templates.variables IS 'Tableau des variables utilisées dans le template (ex: ["firstName", "companyName", "price"])';

-- Mise à jour des templates existants pour extraire et stocker les variables
UPDATE email_templates 
SET variables = (
  SELECT COALESCE(
    jsonb_agg(DISTINCT var_name),
    '[]'::jsonb
  )
  FROM (
    SELECT regexp_matches[1] as var_name
    FROM (
      SELECT regexp_matches(body, '\{\{([a-zA-Z_][a-zA-Z0-9_]*)\}\}', 'g') as regexp_matches
      FROM email_templates et
      WHERE et.id = email_templates.id
    ) matches
    WHERE regexp_matches[1] IS NOT NULL
  ) vars
  WHERE var_name IS NOT NULL
)
WHERE body IS NOT NULL;

-- Création d'un index pour optimiser les recherches sur les variables
CREATE INDEX idx_email_templates_variables ON email_templates USING GIN (variables);

-- Validation : s'assurer que toutes les lignes ont une valeur pour variables (tableau vide par défaut)
ALTER TABLE email_templates 
ALTER COLUMN variables SET DEFAULT '[]'::jsonb;

UPDATE email_templates 
SET variables = '[]'::jsonb 
WHERE variables IS NULL;

ALTER TABLE email_templates 
ALTER COLUMN variables SET NOT NULL;
