# LeadForge AI - Guide de Déploiement Vercel

## ✅ Prérequis

- Compte Vercel : https://vercel.com
- Compte GitHub avec le repo LeadForge-AI
- Compte Supabase : https://supabase.com

## 🔧 Configuration du Projet

### 1. Variables d'environnement Vercel

Dans le dashboard Vercel, ajoutez ces variables :

**Obligatoires :**
```
SUPABASE_URL=https://votre-projet.supabase.co
SUPABASE_ANON_KEY=votre-cle-anon-supabase
```

**APIs (côté serveur uniquement) :**
```
GROQ_API_KEY=gsk_...
SERPER_API_KEY=...
OPENROUTER_API_KEY=sk-or-...
UNSPLASH_ACCESS_KEY=...
PEXELS_API_KEY=...
```

**Email SMTP :**
```
GMAIL_SMTP_USER=votre-email@gmail.com
GMAIL_SMTP_PASSWORD=votre-mdp-app
GMAIL_SMTP_FROM_NAME=Votre Nom
GMAIL_SMTP_FROM_EMAIL=votre-email@gmail.com
```

### 2. Structure du Projet

```
LeadForge-AI/
├── api/              # Serverless Functions (Vercel)
│   ├── email/        # Routes email
│   ├── leads/        # Routes leads
│   ├── campaigns/    # Routes campagnes
│   └── _lib/         # Librairies partagées
├── src/              # Frontend React
├── dist/             # Build output
├── vercel.json       # Configuration Vercel
└── package.json      # Scripts npm
```

### 3. Fichier vercel.json

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "installCommand": "npm install",
  "env": {
    "PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD": "1",
    "PLAYWRIGHT_BROWSERS_PATH": "0"
  },
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/$1" },
    { "source": "/((?!api).*)", "destination": "/index.html" }
  ]
}
```

## 🚀 Commandes de Déploiement

### Développement local :
```bash
npm install
npm run dev          # Démarre le frontend
npm run server       # Démarre le serveur email (localhost:3001)
```

### Build test :
```bash
npm run build        # Vérifie que le build fonctionne
```

### Déploiement Vercel :
```bash
# Option 1 : CLI Vercel
vercel --prod

# Option 2 : Git Integration
# Push sur main → Déploiement auto
```

## 📋 Checklist Pré-Déploiement

- [ ] Toutes les variables d'environnement sont configurées dans Vercel
- [ ] Le build local (`npm run build`) fonctionne sans erreur
- [ ] Les tests passent (`npm test`)
- [ ] Les routes API fonctionnent en local
- [ ] Le frontend se connecte correctement à Supabase

## 🔍 Résolution de Problèmes

### Erreur "Permission denied" sur vite :
✅ Déjà corrigé : `package.json` utilise `npx vite build`

### Erreur 404 sur les routes API :
Vérifiez que les fichiers sont dans `api/` et exportent une fonction par défaut.

### Variables d'environnement non reconnues :
Redéployez après avoir ajouté les variables dans Vercel Dashboard.

### Erreur Supabase :
Vérifiez `SUPABASE_URL` et `SUPABASE_ANON_KEY` dans les variables Vercel.

## 🌐 URL après déploiement

- **Frontend** : `https://leadforge-ai.vercel.app`
- **API** : `https://leadforge-ai.vercel.app/api/*`

---

**Besoin d'aide ?** Vérifiez les logs dans Vercel Dashboard > Deployments > [Deployment] > Functions
