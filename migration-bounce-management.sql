-- Migration pour la gestion des bounces emails
-- Date: 2026-04-21
-- Description: Ajout des tables et colonnes pour gérer les emails en erreur

-- 1. Table pour enregistrer les bounces
CREATE TABLE IF NOT EXISTS email_bounces (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  email TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('hard', 'soft', 'complaint', 'timeout')),
  reason TEXT,
  lead_id TEXT REFERENCES leads(id) ON DELETE SET NULL,
  message_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Index pour optimiser les recherches
CREATE INDEX IF NOT EXISTS idx_email_bounces_email ON email_bounces(email);
CREATE INDEX IF NOT EXISTS idx_email_bounces_type ON email_bounces(type);
CREATE INDEX IF NOT EXISTS idx_email_bounces_created_at ON email_bounces(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_email_bounces_lead_id ON email_bounces(lead_id);

-- 3. Ajouter des colonnes à la table leads pour le suivi des bounces
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS email_status TEXT DEFAULT 'valid' CHECK (email_status IN ('valid', 'invalid', 'soft_bounce', 'complaint', 'unsubscribed'));

ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS email_bounced BOOLEAN DEFAULT FALSE;

ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS email_bounce_type TEXT CHECK (email_bounce_type IN ('hard', 'soft', 'complaint'));

ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS email_bounce_date TIMESTAMPTZ;

ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS email_complained BOOLEAN DEFAULT FALSE;

ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS email_complaint_date TIMESTAMPTZ;

-- 4. Index pour les nouvelles colonnes de leads
CREATE INDEX IF NOT EXISTS idx_leads_email_status ON leads(email_status);
CREATE INDEX IF NOT EXISTS idx_leads_email_bounced ON leads(email_bounced);
CREATE INDEX IF NOT EXISTS idx_leads_email_bounce_date ON leads(email_bounce_date DESC);

-- 5. Trigger pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_email_bounces_updated_at 
    BEFORE UPDATE ON email_bounces 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 6. Commentaires
COMMENT ON TABLE email_bounces IS 'Table pour enregistrer tous les bounces et erreurs de livraison d''emails';
COMMENT ON COLUMN email_bounces.type IS 'Type de bounce: hard (email invalide), soft (temporaire), complaint (spam), timeout (délai dépassé)';
COMMENT ON COLUMN email_bounces.reason IS 'Raison détaillée du bounce fournie par le serveur SMTP';
COMMENT ON COLUMN leads.email_status IS 'Statut actuel de l''email du lead';
COMMENT ON COLUMN leads.email_bounced IS 'Indique si l''email a déjà bounce au moins une fois';
COMMENT ON COLUMN leads.email_bounce_type IS 'Dernier type de bounce enregistré pour ce lead';

-- 7. Vue pour les statistiques de bounces
CREATE OR REPLACE VIEW bounce_stats AS
SELECT 
  COUNT(*) as total_bounces,
  COUNT(CASE WHEN type = 'hard' THEN 1 END) as hard_bounces,
  COUNT(CASE WHEN type = 'soft' THEN 1 END) as soft_bounces,
  COUNT(CASE WHEN type = 'complaint' THEN 1 END) as complaints,
  COUNT(CASE WHEN type = 'timeout' THEN 1 END) as timeouts,
  COUNT(DISTINCT email) as unique_emails_bounced,
  DATE_TRUNC('day', created_at) as bounce_date
FROM email_bounces
GROUP BY DATE_TRUNC('day', created_at)
ORDER BY bounce_date DESC;

-- 8. Fonction pour nettoyer les anciens bounces (optionnel)
CREATE OR REPLACE FUNCTION cleanup_old_bounces(days_to_keep INTEGER DEFAULT 90)
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM email_bounces 
  WHERE created_at < NOW() - INTERVAL '1 day' * days_to_keep;
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Validation
SELECT 'Migration bounce management completed successfully' as status;
