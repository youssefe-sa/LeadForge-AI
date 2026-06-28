-- ============================================================
-- LeadForge AI - Migration: Scheduled Emails (File d'attente)
-- Remplace les "setTimeout" par une file d'attente pro
-- ============================================================

CREATE TABLE IF NOT EXISTS scheduled_emails (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id TEXT REFERENCES leads(id) ON DELETE CASCADE,
  template_id TEXT NOT NULL,
  scheduled_for TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'sent', 'failed')),
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour accélérer la recherche des emails à envoyer
CREATE INDEX IF NOT EXISTS idx_scheduled_emails_status_date ON scheduled_emails(status, scheduled_for);

-- Politique RLS (par défaut, on autorise comme le reste du système)
ALTER TABLE scheduled_emails ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Accès total anon scheduled_emails" ON scheduled_emails;
CREATE POLICY "Accès total anon scheduled_emails" ON scheduled_emails 
  FOR ALL 
  TO anon 
  USING (true) 
  WITH CHECK (true);

SELECT 'Migration Scheduled Emails terminée.' as status;
