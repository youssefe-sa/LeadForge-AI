# Guide d'Installation - Gestion des Bounces Email

## 🎯 Objectif
Configurer la détection automatique des emails en erreur (bounces) pour LeadForge AI.

---

## 📋 Étape 1 : Créer les tables dans Supabase

### Option A : Via l'interface Supabase
1. Allez sur [supabase.com](https://supabase.com)
2. Ouvrez votre projet LeadForge
3. Allez dans **SQL Editor**
4. Copiez-collez le contenu de `migration-bounce-management.sql`
5. Cliquez sur **Run** pour exécuter la migration

### Option B : Via la CLI (si vous l'avez)
```bash
supabase db push
```

---

## 📋 Étape 2 : Configurer le webhook pour les bounces

### Avec Gmail SMTP (recommandé)

Les bounces Gmail sont gérés automatiquement via l'API Gmail. Ajoutez ce code dans votre configuration :

#### 2.1 Créer un endpoint de webhook Gmail
Le fichier `/api/bounce.ts` est déjà créé. Il faut maintenant le connecter à Gmail.

#### 2.2 Configurer la surveillance Gmail
Dans vos paramètres Gmail SMTP, ajoutez ces redirections :

1. **Activer les notifications de rejet** dans les paramètres Gmail
2. **Configurer l'envoi automatique** vers votre endpoint

### Avec un service SMTP externe (SendGrid, Mailgun, etc.)

#### 2.1 Exemple avec SendGrid
```javascript
// Dans votre configuration SendGrid
const webhookUrl = 'https://votre-domaine.vercel.app/api/bounce';

// Types d'événements à envoyer
const events = ['bounce', 'delivered', 'spamreport', 'unsubscribe'];
```

#### 2.2 Format des données attendues par /api/bounce
```json
{
  "email": "contact@exemple.fr",
  "type": "hard", // "hard", "soft", "complaint", "timeout"
  "reason": "Domaine introuvable",
  "leadId": "uuid-du-lead",
  "messageId": "message-id-gmail"
}
```

---

## 📋 Étape 3 : Intégrer l'interface dans la navigation

### 3.1 Ajouter le composant au routing
Modifiez votre fichier de routing principal (généralement `App.tsx` ou `main.tsx`) :

```tsx
import BounceManagement from './components/BounceManagement';

// Ajoutez cette route dans votre système de routing
<Route path="/bounces" element={<BounceManagement />} />
```

### 3.2 Ajouter le lien dans la navigation
Trouvez votre composant de navigation (généralement `Header.tsx` ou `Navigation.tsx`) :

```tsx
// Ajoutez ce lien dans votre menu de navigation
<Link 
  to="/bounces" 
  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
>
  📧 Emails en Erreur
</Link>
```

### 3.3 Si vous utilisez React Router
```tsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <nav>
        {/* Vos liens existants */}
        <Link to="/bounces">Gestion des Bounces</Link>
      </nav>
      <Routes>
        {/* Vos routes existantes */}
        <Route path="/bounces" element={<BounceManagement />} />
      </Routes>
    </Router>
  );
}
```

---

## 📋 Étape 4 : Configuration Gmail spécifique

### 4.1 Activer la surveillance des bounces Gmail
Pour Gmail, vous devez utiliser l'API Gmail Watch :

```javascript
// Dans votre backend ou script d'initialisation
const { google } = require('googleapis');

async function setupGmailWatch() {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: ['https://www.googleapis.com/auth/gmail.readonly']
  });

  const gmail = google.gmail({ version: 'v1', auth });

  const response = await gmail.users.watch({
    userId: 'me',
    requestBody: {
      topicName: 'projects/votre-projet/topics/bounces',
      labelIds: ['INBOX'],
    }
  });

  console.log('Gmail Watch configuré:', response.data);
}
```

### 4.2 Alternative : Script de surveillance manuel
Créez un script qui vérifie périodiquement les bounces :

```javascript
// scripts/check-bounces.js
const { gmail } = require('./gmail-service');

async function checkBounces() {
  const messages = await gmail.search('from:mailer-daemon@google.com OR subject:"delivery status notification"');
  
  for (const message of messages) {
    const content = await gmail.getMessage(message.id);
    const bounceData = parseBounceEmail(content);
    
    if (bounceData) {
      await fetch('https://votre-domaine.vercel.app/api/bounce', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bounceData)
      });
    }
  }
}

// Exécuter toutes les heures
setInterval(checkBounces, 3600000);
```

---

## 📋 Étape 5 : Tester la configuration

### 5.1 Tester l'API endpoint
```bash
curl -X POST https://votre-domaine.vercel.app/api/bounce \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@invalide.fr",
    "type": "hard",
    "reason": "Test de bounce",
    "leadId": "test-lead-id"
  }'
```

### 5.2 Vérifier l'interface
1. Déployez votre application
2. Allez sur `https://votre-domaine.vercel.app/bounces`
3. Vous devriez voir le tableau de bord des bounces

---

## 📋 Étape 6 : Automatisation complète

### 6.1 Script de nettoyage automatique
Créez un cron job pour nettoyer les anciens bounces :

```javascript
// Créez /api/cleanup-bounces.ts
export default async function handler(req, res) {
  const supabase = createClient(url, key);
  
  // Nettoyer les bounces de plus de 90 jours
  const { error } = await supabase
    .from('email_bounces')
    .delete()
    .lt('created_at', new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString());
    
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  
  return res.json({ success: true, message: 'Anciens bounces nettoyés' });
}
```

### 6.2 Planifier avec Vercel Cron Jobs
Dans votre `vercel.json` :
```json
{
  "crons": [
    {
      "path": "/api/cleanup-bounces",
      "schedule": "0 2 * * 0"
    }
  ]
}
```

---

## 🔧 Dépannage

### Problème : L'interface ne s'affiche pas
- Vérifiez que le composant est bien importé
- Vérifiez que la route est correctement configurée
- Regardez la console du navigateur pour les erreurs

### Problème : Les bounces ne sont pas détectés
- Vérifiez que votre endpoint `/api/bounce` est accessible
- Testez avec curl ou Postman
- Vérifiez les logs Vercel

### Problème : Erreur de connexion Supabase
- Vérifiez vos variables d'environnement
- Assurez-vous que la migration a été appliquée
- Vérifiez les permissions RLS

---

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez les logs dans la console Vercel
2. Testez l'API endpoint manuellement
3. Vérifiez que les tables existent dans Supabase

Le système est maintenant prêt à gérer automatiquement tous vos emails en erreur !
