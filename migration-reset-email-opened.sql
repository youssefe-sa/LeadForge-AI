-- Réinitialiser email_opened à false pour tous les leads
-- Ce script corrige le bug où les emails étaient marqués comme ouverts automatiquement

UPDATE leads 
SET email_opened = false 
WHERE email_opened = true;
