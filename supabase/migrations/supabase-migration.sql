-- ============================================================
-- LeadForge AI - Supabase Migration
-- Copiez et collez ce script dans Supabase > SQL Editor > Run
-- ============================================================

-- 1. Table leads
CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  website TEXT,
  address TEXT,
  city TEXT,
  sector TEXT,
  rating REAL,
  reviews_count INTEGER,
  has_website BOOLEAN DEFAULT FALSE,
  enriched BOOLEAN DEFAULT FALSE,
  score INTEGER DEFAULT 0,
  status TEXT DEFAULT 'new',
  source TEXT,
  notes TEXT,
  site_generated BOOLEAN DEFAULT FALSE,
  site_url TEXT,
  landing_url TEXT,
  email_sent BOOLEAN DEFAULT FALSE,
  email_sent_date TEXT,
  email_opened BOOLEAN DEFAULT FALSE,
  email_clicked BOOLEAN DEFAULT FALSE,
  last_contact TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Table api_config (single row id=1)
CREATE TABLE IF NOT EXISTS api_config (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  groq_key TEXT,
  openrouter_key TEXT,
  serper_key TEXT,
  gmail_smtp_host TEXT DEFAULT 'smtp.gmail.com',
  gmail_smtp_port INTEGER DEFAULT 587,
  gmail_smtp_user TEXT,
  gmail_smtp_password TEXT,
  gmail_smtp_from_name TEXT,
  gmail_smtp_from_email TEXT,
  gmail_smtp_secure BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Table email_templates
CREATE TABLE IF NOT EXISTS email_templates (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  sector TEXT NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Table email_logs
CREATE TABLE IF NOT EXISTS email_logs (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  lead_id TEXT REFERENCES leads(id) ON DELETE SET NULL,
  to_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  body TEXT,
  status TEXT DEFAULT 'pending',
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  error_message TEXT
);

-- 5. Table campaigns
CREATE TABLE IF NOT EXISTS campaigns (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  status TEXT DEFAULT 'draft',
  template_id TEXT REFERENCES email_templates(id) ON DELETE SET NULL,
  leads_count INTEGER DEFAULT 0,
  sent_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ
);

-- 6. Table campaign_leads
CREATE TABLE IF NOT EXISTS campaign_leads (
  campaign_id TEXT REFERENCES campaigns(id) ON DELETE CASCADE,
  lead_id TEXT REFERENCES leads(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending',
  sent_at TIMESTAMPTZ,
  PRIMARY KEY (campaign_id, lead_id)
);

-- 7. Désactiver RLS (Row Level Security) pour les tables
ALTER TABLE leads DISABLE ROW LEVEL SECURITY;
ALTER TABLE api_config DISABLE ROW LEVEL SECURITY;
ALTER TABLE email_templates DISABLE ROW LEVEL SECURITY;
ALTER TABLE email_logs DISABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns DISABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_leads DISABLE ROW LEVEL SECURITY;

-- 8. Templates par défaut
INSERT INTO email_templates (id, name, sector, subject, body) VALUES
  ('restaurant-1', 'Restaurant Prospection', 'restaurant',
   'Un site web professionnel pour {name}',
   E'Bonjour {name},\n\nJe me permets de vous contacter car j''ai remarqué que {name} pourrait bénéficier d''une présence en ligne professionnelle.\n\nJ''ai créé une maquette de site web spécialement pour votre restaurant : {landingUrl}\n\nCe site inclut :\n✅ Menu en ligne avec photos\n✅ Réservation en ligne\n✅ Avis Google intégrés\n✅ Optimisé pour Google (SEO local)\n✅ Responsive mobile\n\nLe site est prêt à être mis en ligne. Si cela vous intéresse, répondez simplement à cet email.\n\nBonne journée,\nVotre consultant digital'),

  ('commerce-1', 'Commerce Prospection', 'commerce',
   'Votre boutique {name} mérite un site web moderne',
   E'Bonjour {name},\n\nJe vous contacte car j''ai vu que {name} pourrait bénéficier d''un site web moderne pour attirer plus de clients.\n\nJ''ai créé un site web professionnel pour votre commerce : {landingUrl}\n\nFonctionnalités :\n✅ Catalogue produits\n✅ Horaires et localisation Google Maps\n✅ Visible sur Google Search\n✅ Design professionnel\n✅ Mobile-friendly\n\nLe site est prêt à être mis en ligne immédiatement. Répondez à cet email pour en discuter.\n\nCordialement,\nVotre consultant digital'),

  ('generic-1', 'Générique Prospection', 'generic',
   'Proposition de site web pour {name}',
   E'Bonjour {name},\n\nJe me permets de vous contacter au sujet de {name}.\n\nJ''ai remarqué que vous pourriez bénéficier d''un site web professionnel pour développer votre activité en ligne.\n\nJ''ai préparé une maquette de site web pour vous : {landingUrl}\n\nAvantages :\n✅ Présence en ligne professionnelle\n✅ Visible sur Google\n✅ Design moderne et responsive\n✅ Prêt en 48h\n\nSi cela vous intéresse, répondez simplement à cet email.\n\nBien cordialement,\nVotre consultant digital')
ON CONFLICT (id) DO NOTHING;

-- 9. Ajouter les champs de campagne à la table leads
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS campaign TEXT,
ADD COLUMN IF NOT EXISTS campaign_date TIMESTAMP WITH TIME ZONE;

-- Commentaire sur les nouveaux champs
COMMENT ON COLUMN leads.campaign IS 'Nom de la campagne d''importation';
COMMENT ON COLUMN leads.campaign_date IS 'Date de la campagne d''importation';
