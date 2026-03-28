import sqlite3 from 'sqlite3';
import { mkdir } from 'fs/promises';
import path from 'path';

const DB_DIR = path.join(process.cwd(), 'data');
const DB_PATH = path.join(DB_DIR, 'leadforge.db');

export const initDatabase = async (): Promise<sqlite3.Database> => {
  await mkdir(DB_DIR, { recursive: true });

  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        console.error('Error opening database:', err);
        reject(err);
      } else {
        console.log('✅ Connected to SQLite database');
        resolve(db);
      }
    });
  });
};

// Run queries sequentially
const runQuery = (db: sqlite3.Database, sql: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run(sql, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

export const createTables = async (db: sqlite3.Database): Promise<void> => {
  const createTableQueries = [
    `CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT,
      phone TEXT,
      website TEXT,
      address TEXT,
      city TEXT,
      sector TEXT,
      rating REAL,
      reviews_count INTEGER,
      has_website BOOLEAN DEFAULT 0,
      enriched BOOLEAN DEFAULT 0,
      score INTEGER DEFAULT 0,
      status TEXT DEFAULT 'new',
      source TEXT,
      notes TEXT,
      site_generated BOOLEAN DEFAULT 0,
      site_url TEXT,
      landing_url TEXT,
      email_sent BOOLEAN DEFAULT 0,
      email_sent_date TEXT,
      email_opened BOOLEAN DEFAULT 0,
      email_clicked BOOLEAN DEFAULT 0,
      last_contact TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )`,

    `CREATE TABLE IF NOT EXISTS api_config (
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
      gmail_smtp_secure BOOLEAN DEFAULT 1,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )`,

    `CREATE TABLE IF NOT EXISTS email_templates (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      sector TEXT NOT NULL,
      subject TEXT NOT NULL,
      body TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )`,

    `CREATE TABLE IF NOT EXISTS email_logs (
      id TEXT PRIMARY KEY,
      lead_id TEXT,
      to_email TEXT NOT NULL,
      subject TEXT NOT NULL,
      body TEXT,
      status TEXT DEFAULT 'pending',
      sent_at TEXT,
      error_message TEXT,
      FOREIGN KEY (lead_id) REFERENCES leads(id)
    )`,

    `CREATE TABLE IF NOT EXISTS campaigns (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      status TEXT DEFAULT 'draft',
      template_id TEXT,
      leads_count INTEGER DEFAULT 0,
      sent_count INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      started_at TEXT,
      completed_at TEXT,
      FOREIGN KEY (template_id) REFERENCES email_templates(id)
    )`,

    `CREATE TABLE IF NOT EXISTS campaign_leads (
      campaign_id TEXT,
      lead_id TEXT,
      status TEXT DEFAULT 'pending',
      sent_at TEXT,
      PRIMARY KEY (campaign_id, lead_id),
      FOREIGN KEY (campaign_id) REFERENCES campaigns(id),
      FOREIGN KEY (lead_id) REFERENCES leads(id)
    )`
  ];

  // Create tables sequentially
  for (const query of createTableQueries) {
    await runQuery(db, query);
  }
  console.log('✅ Database tables created successfully');

  // Insert default templates
  const insertQuery = `INSERT OR IGNORE INTO email_templates (id, name, sector, subject, body) VALUES
    ('restaurant-1', 'Restaurant Prospection', 'restaurant', 
     'Un site web professionnel pour {name}', 
     'Bonjour {name},\n\nJe me permets de vous contacter car j ai remarque que {name} pourrait beneficier d une presence en ligne professionnelle.\n\nJ ai cree une maquette de site web specialement pour votre restaurant : {landingUrl}\n\nCe site inclut :\n✅ Menu en ligne avec photos\n✅ Reservation en ligne\n✅ Avis Google integres\n✅ Optimise pour Google (SEO local)\n✅ Responsive mobile\n\nLe site est pret a etre mis en ligne. Si cela vous interesse, repondez simplement a cet email.\n\nBonne journee,\nVotre consultant digital'),
    
    ('commerce-1', 'Commerce Prospection', 'commerce',
     'Votre boutique {name} merite un site web moderne',
     'Bonjour {name},\n\nJe vous contacte car j ai vu que {name} pourrait beneficier d un site web moderne pour attirer plus de clients.\n\nJ ai cree un site web professionnel pour votre commerce : {landingUrl}\n\nFonctionnalites :\n✅ Catalogue produits\n✅ Horaires et localisation Google Maps\n✅ Visible sur Google Search\n✅ Design professionnel\n✅ Mobile-friendly\n\nLe site est pret a etre mis en ligne immediatement. Repondez a cet email pour en discuter.\n\nCordialement,\nVotre consultant digital'),
    
    ('generic-1', 'Generique Prospection', 'generic',
     'Proposition de site web pour {name}',
     'Bonjour {name},\n\nJe me permets de vous contacter au sujet de {name}.\n\nJ ai remarque que vous pourriez beneficier d un site web professionnel pour developper votre activite en ligne.\n\nJ ai prepare une maquette de site web pour vous : {landingUrl}\n\nAvantages :\n✅ Presence en ligne professionnelle\n✅ Visible sur Google\n✅ Design moderne et responsive\n✅ Pret en 48h\n\nSi cela vous interesse, repondez simplement a cet email.\n\nBien cordialement,\nVotre consultant digital')`;

  await runQuery(db, insertQuery);
  console.log('✅ Default templates inserted');
};

export const dbPromise = initDatabase().then(async (db) => {
  await createTables(db);
  return db;
});

export default dbPromise;
