-- Harmoniser les variables des templates email
-- Remplacer {name} et {landingUrl} par {{firstName}} et {{websiteLink}}

UPDATE email_templates
SET body = REPLACE(
             REPLACE(body, '{name}', '{{firstName}}'),
             '{landingUrl}', '{{websiteLink}}'
           )
WHERE body LIKE '%{name}%'
   OR body LIKE '%{landingUrl}%';

UPDATE email_templates
SET subject = REPLACE(subject, '{name}', '{{companyName}}')
WHERE subject LIKE '%{name}%';

-- Vérification
SELECT id, name, subject FROM email_templates;
