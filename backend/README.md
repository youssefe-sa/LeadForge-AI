# 🚀 LeadForge AI - Backend Documentation

## 📋 Architecture Complète Backend

### Structure du projet
```
backend/
├── src/
│   ├── db/
│   │   └── index.ts          # Configuration SQLite
│   ├── routes/
│   │   ├── leads.ts          # API Leads CRUD
│   │   ├── config.ts         # API Configuration
│   │   ├── email.ts          # API Envoi d'emails
│   │   ├── templates.ts      # API Templates
│   │   └── campaigns.ts      # API Campagnes
│   └── server.ts             # Point d'entrée Express
├── data/                     # Base de données SQLite
├── package.json
├── tsconfig.json
└── .env                      # Variables d'environnement
```

### 🛠️ Technologies utilisées
- **Node.js** + **Express** - Serveur HTTP
- **TypeScript** - Typage sécurisé
- **SQLite** - Base de données légère
- **Nodemailer** - Envoi d'emails SMTP
- **Zod** - Validation des données
- **UUID** - Génération d'IDs uniques

---

## 🚀 Installation et Démarrage

### 1. Installation des dépendances
```bash
cd backend
npm install
```

### 2. Configuration
Créez un fichier `.env` dans le dossier `backend/` :
```env
PORT=3001
NODE_ENV=development
```

### 3. Démarrage en mode développement
```bash
npm run dev
```

Le serveur démarre sur `http://localhost:3001`

### 4. Démarrage en production
```bash
npm run build
npm start
```

---

## 📡 API Endpoints

### Health Check
```
GET /health
```

### Leads (`/api/leads`)
```
GET    /api/leads              - Liste tous les leads
GET    /api/leads/:id          - Récupère un lead
POST   /api/leads              - Crée un lead
PUT    /api/leads/:id          - Met à jour un lead
DELETE /api/leads/:id          - Supprime un lead
POST   /api/leads/bulk         - Crée plusieurs leads
```

### Configuration (`/api/config`)
```
GET  /api/config               - Récupère la config
POST /api/config               - Met à jour la config
POST /api/config/test-smtp     - Teste la connexion SMTP
```

### Emails (`/api/email`)
```
POST /api/email/send           - Envoie un email
POST /api/email/send-batch     - Envoie plusieurs emails
GET  /api/email/logs           - Récupère les logs
```

### Templates (`/api/templates`)
```
GET    /api/templates          - Liste les templates
GET    /api/templates/:id      - Récupère un template
POST   /api/templates          - Crée un template
PUT    /api/templates/:id      - Met à jour un template
DELETE /api/templates/:id      - Supprime un template
```

### Campagnes (`/api/campaigns`)
```
GET    /api/campaigns              - Liste les campagnes
GET    /api/campaigns/:id          - Récupère une campagne
POST   /api/campaigns              - Crée une campagne
POST   /api/campaigns/:id/start   - Démarre une campagne
POST   /api/campaigns/:id/complete  - Termine une campagne
DELETE /api/campaigns/:id          - Supprime une campagne
```

---

## 📧 Envoi d'Emails avec Gmail SMTP

### Configuration requise
Le backend utilise **Nodemailer** pour l'envoi d'emails via Gmail SMTP.

### 1. Configurer Gmail SMTP
```bash
POST /api/config
{
  "gmailSmtpHost": "smtp.gmail.com",
  "gmailSmtpPort": 587,
  "gmailSmtpUser": "votre.email@gmail.com",
  "gmailSmtpPassword": "votre_mot_de_passe_16_caracteres",
  "gmailSmtpFromName": "Votre Nom",
  "gmailSmtpFromEmail": "votre.email@gmail.com",
  "gmailSmtpSecure": true
}
```

### 2. Tester la connexion SMTP
```bash
POST /api/config/test-smtp
```

### 3. Envoyer un email
```bash
POST /api/email/send
{
  "to": "client@email.com",
  "toName": "Nom du Client",
  "subject": "Proposition site web",
  "html": "<html>...</html>",
  "text": "Version texte...",
  "leadId": "uuid-du-lead"
}
```

### 4. Envoi en masse (batch)
```bash
POST /api/email/send-batch
{
  "emails": [
    {
      "to": "client1@email.com",
      "subject": "...",
      "html": "...",
      "leadId": "..."
    }
  ],
  "delayMs": 2000
}
```

---

## 🗄️ Schéma de Base de Données

### Tables principales

#### `leads` - Prospects
- `id` (TEXT PRIMARY KEY)
- `name`, `email`, `phone`, `website`
- `address`, `city`, `sector`
- `rating`, `reviews_count`, `has_website`
- `status` (new/prospect/qualified/contacted)
- `enriched`, `score`, `source`
- `site_generated`, `site_url`, `landing_url`
- `email_sent`, `email_sent_date`, `email_opened`, `email_clicked`
- `created_at`, `updated_at`

#### `api_config` - Configuration APIs
- `id` (INTEGER PRIMARY KEY = 1)
- `groq_key`, `openrouter_key`, `serper_key`
- `gmail_smtp_*` (tous les champs SMTP)

#### `email_templates` - Templates d'emails
- `id`, `name`, `sector`, `subject`, `body`
- `created_at`, `updated_at`

#### `email_logs` - Logs d'envoi
- `id`, `lead_id`, `to_email`, `subject`, `body`
- `status`, `sent_at`, `error_message`

#### `campaigns` - Campagnes d'emails
- `id`, `name`, `status` (draft/running/completed)
- `template_id`, `leads_count`, `sent_count`
- `created_at`, `started_at`, `completed_at`

#### `campaign_leads` - Liaison campagnes/leads
- `campaign_id`, `lead_id`, `status`, `sent_at`

---

## 🔗 Intégration Frontend

### 1. Créer un client API
```typescript
// src/lib/api.ts
const API_BASE = 'http://localhost:3001/api';

export const api = {
  async getLeads() {
    const res = await fetch(`${API_BASE}/leads`);
    return res.json();
  },
  
  async createLead(data: any) {
    const res = await fetch(`${API_BASE}/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  
  async sendEmail(data: any) {
    const res = await fetch(`${API_BASE}/email/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  }
};
```

### 2. Configurer le proxy Vite
```typescript
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
});
```

---

## 🚀 Déploiement

### Option 1: VPS/Cloud (Node.js)
```bash
# Build
cd backend
npm run build

# Start with PM2
npm install -g pm2
pm2 start dist/server.js --name leadforge-backend
```

### Option 2: Railway/Render/Heroku
1. Pousser le code sur GitHub
2. Connecter Railway/Render à votre repo
3. Définir les variables d'environnement
4. Déployer automatiquement

### Option 3: Docker
```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "start"]
```

---

## 🔒 Sécurité

### Mesures implémentées
- ✅ **Helmet** - Headers de sécurité HTTP
- ✅ **CORS** - Configuration stricte
- ✅ **Input validation** - Zod schemas
- ✅ **SQL Injection protection** - Requêtes paramétrées
- ✅ **Password masking** - Mots de passe masqués dans les réponses

### Recommandations production
- [ ] Utiliser HTTPS (Let's Encrypt)
- [ ] Ajouter authentification JWT
- [ ] Rate limiting sur les endpoints
- [ ] Logging et monitoring
- [ ] Backup régulier de la base SQLite

---

## 📝 Notes

### Limites Gmail SMTP
- **500 emails/jour** (limite Gmail)
- **100 destinataires max** par email
- Nécessite mot de passe d'application

### Pour augmenter les limites
Passer à un service SMTP professionnel :
- **SendGrid** - 100 emails/jour gratuit
- **Mailgun** - Payant mais fiable
- **AWS SES** - Très économique

---

## 🆘 Support

### Logs
Les logs sont affichés dans la console avec Morgan :
```
GET /api/leads 200 45.234 ms - 1234
POST /api/email/send 200 1234.567 ms - 56
```

### Debugging
```bash
# Mode debug
DEBUG=* npm run dev

# Vérifier la base de données
sqlite3 data/leadforge.db ".tables"
sqlite3 data/leadforge.db "SELECT * FROM leads LIMIT 5;"
```

---

**Backend prêt à l'emploi !** 🎉

Pour commencer :
1. `cd backend && npm install`
2. `npm run dev`
3. Ouvrez `http://localhost:3001/health`
