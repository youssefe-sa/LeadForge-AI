-- Activation RLS sur toutes les tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_leads ENABLE ROW LEVEL SECURITY;

-- Politiques d'accès (usage solo interne — anon key autorisée)
DROP POLICY IF EXISTS "anon_all_leads" ON leads;
CREATE POLICY "anon_all_leads"
  ON leads FOR ALL TO anon USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_all_config" ON api_config;
CREATE POLICY "anon_all_config"
  ON api_config FOR ALL TO anon USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_all_templates" ON email_templates;
CREATE POLICY "anon_all_templates"
  ON email_templates FOR ALL TO anon USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_all_logs" ON email_logs;
CREATE POLICY "anon_all_logs"
  ON email_logs FOR ALL TO anon USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_all_campaigns" ON campaigns;
CREATE POLICY "anon_all_campaigns"
  ON campaigns FOR ALL TO anon USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_all_campaign_leads" ON campaign_leads;
CREATE POLICY "anon_all_campaign_leads"
  ON campaign_leads FOR ALL TO anon USING (true) WITH CHECK (true);
