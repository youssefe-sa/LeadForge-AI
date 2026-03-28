# 📧 Documentation Gmail SMTP - LeadForge AI

## 🎯 Vue d'ensemble

Cette documentation explique comment configurer et utiliser **Gmail SMTP** pour l'envoi d'emails transactionnels dans LeadForge AI.

**Remplacement de :** Resend, Unsplash, Pexels, Google AI Studio (Gemini)  
**Avantage principal :** 100% gratuit jusqu'à 500 emails/jour avec votre compte Gmail existant

---

## 📋 Configuration requise

### APIs conservées
| API | Statut | Utilisation |
|-----|--------|-------------|
| **Serper.dev** | ✅ Obligatoire | Recherche Google + Google Maps + Images |
| **Groq (Llama)** | ✅ Obligatoire | LLM pour tous les agents IA |
| **Gmail SMTP** | ⚙️ Optionnel mais recommandé | Envoi d'emails transactionnels |

### APIs supprimées
- ❌ Unsplash (remplacé par images Google Maps de Serper)
- ❌ Pexels (remplacé par images Google Maps de Serper)
- ❌ Google AI Studio/Gemini (utilisez OpenRouter comme fallback)
- ❌ Resend (remplacé par Gmail SMTP gratuit)

---

## 🔧 Configuration Gmail SMTP

### Étape 1 : Activer l'authentification à 2 facteurs

1. Allez sur [myaccount.google.com](https://myaccount.google.com)
2. Cliquez sur **Sécurité** dans le menu de gauche
3. Dans la section "Connexion à Google", cliquez sur **Validation en 2 étapes**
4. Suivez les instructions pour activer la 2FA

### Étape 2 : Générer un mot de passe d'application

1. Toujours dans **Sécurité**, recherchez **Mots de passe des applications**
2. Cliquez sur **Mots de passe des applications**
3. Sélectionnez **Courrier** comme application
4. Sélectionnez votre appareil (ex: "Autre")
5. Cliquez sur **Générer**
6. **Copiez le mot de passe à 16 caractères** (format: `xxxx xxxx xxxx xxxx`)

⚠️ **Important :** Ce mot de passe s'affiche UNE SEULE FOIS. Gardez-le en sécurité.

### Étape 3 : Configurer dans LeadForge AI

1. Ouvrez l'application LeadForge AI
2. Allez dans **Paramètres** (⚙️)
3. Section **Gmail SMTP**
4. Remplissez les champs :

| Champ | Valeur | Exemple |
|-------|--------|---------|
| **Email Gmail** | Votre adresse Gmail | `votre.email@gmail.com` |
| **Mot de passe d'application** | Les 16 caractères générés | `abcd efgh ijkl mnop` |
| **Nom d'expéditeur** | Votre nom ou entreprise | `Jean Dupont - Web Agency` |
| **Email d'expéditeur** | Email de réponse (optionnel) | `contact@webagency.com` |

5. Cliquez sur **🧪 Tester** pour valider la configuration
6. Le statut doit passer à ✅ **Actif**

---

## 📊 Limites et quotas

### Gmail SMTP Gratuit
- **500 emails/jour** (limite Gmail standard)
- **100 destinataires par email**
- **Connexion sécurisée TLS** (port 587)

### Comparaison avec les alternatives
| Service | Gratuit | Limite quotidienne | Coût payant |
|---------|---------|-------------------|-------------|
| **Gmail SMTP** | ✅ Oui | 500 emails/jour | Gratuit |
| Resend (ancien) | ✅ Oui | 100 emails/jour | $20/mois |
| SendGrid | ✅ Oui | 100 emails/jour | $19.95/mois |
| Mailgun | ❌ Non | - | $35/mois |

---

## 🚀 Utilisation dans l'Agent Outreach

### Prérequis
- ✅ Configuration Gmail SMTP complète (statut "Actif")
- ✅ Leads avec emails valides
- ✅ Sites web générés pour les leads

### Envoi d'emails

1. Allez dans **Agent 4 : Outreach**
2. Sélectionnez un **template d'email** (Restaurant, Commerce, Générique)
3. Les leads "Prêts à envoyer" s'affichent automatiquement
4. Cliquez sur **📧 Envoyer X emails** pour l'envoi en masse
5. Ou cliquez sur **Envoyer** individuellement par lead

### Fonctionnalités disponibles
- ✅ **Prévisualisation** des emails avant envoi (👁️)
- ✅ **Personnalisation IA** avec Groq (sujet + contenu)
- ✅ **Templates sectoriels** automatiques
- ✅ **Délai de 2 secondes** entre chaque email (respect des limites Gmail)
- ✅ **Journal d'envoi** avec statut de chaque email

---

## 🛠️ Dépannage

### Problème : "Configuration SMTP incomplète"
**Cause :** Email ou mot de passe manquant
**Solution :** Vérifiez que tous les champs sont remplis dans Paramètres > Gmail SMTP

### Problème : "Format email invalide"
**Cause :** L'adresse Gmail n'est pas au bon format
**Solution :** Utilisez un format valide : `nom@gmail.com`

### Problème : "Le mot de passe doit faire 16 caractères"
**Cause :** Mot de passe incorrect ou mal copié
**Solution :** 
1. Retournez sur [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Supprimez l'ancien mot de passe
3. Générez-en un nouveau
4. Copiez exactement les 16 caractères (sans espaces)

### Problème : Échec d'envoi
**Cause 1 :** Limite quotidienne atteinte (500 emails/jour)
**Solution :** Attendez 24h ou utilisez un autre compte Gmail

**Cause 2 :** Authentification à 2 facteurs désactivée
**Solution :** Activez la 2FA sur votre compte Google

**Cause 3 :** Mot de passe d'application révoqué
**Solution :** Générez un nouveau mot de passe d'application

---

## 🔒 Sécurité

### Bonnes pratiques
1. **Ne partagez jamais** votre mot de passe d'application
2. **Utilisez un compte Gmail dédié** (ex: `prospection@votresociete.com`)
3. **Activez toujours la 2FA** sur le compte Gmail utilisé
4. **Révoquez les mots de passe** inutilisés régulièrement
5. **Surveillez l'activité** de connexion sur myaccount.google.com

### Protection des données
- Les credentials SMTP sont stockés **localement** dans le navigateur
- Aucun email ni mot de passe n'est transmis à des serveurs externes
- Les templates d'emails sont générés localement

---

## 📈 Intégration technique

### Architecture
```
LeadForge AI (Frontend)
    ↓
Gmail SMTP Service (Local)
    ↓
Gmail SMTP Servers (Google)
    ↓
Destinataires (Leads)
```

### Service Gmail SMTP
**Fichier :** `src/lib/gmailSmtpService.ts`

**Fonctionnalités :**
- Configuration dynamique SMTP
- Envoi d'emails HTML personnalisés
- Templates sectoriels (Restaurant, Commerce, Générique)
- Validation des credentials
- Gestion des erreurs

### Méthodes principales
```typescript
// Configuration
gmailSmtpService.setConfig(apiConfig);

// Vérification
const isReady = gmailSmtpService.isConfigured();

// Envoi simple
const result = await gmailSmtpService.sendEmail({
  to: 'lead@email.com',
  subject: 'Proposition site web',
  html: '<html>...</html>'
});

// Envoi de séquence
const results = await gmailSmtpService.sendEmailSequence(
  'lead@email.com',
  'Nom du Lead',
  'restaurant-1',
  'https://landing-url.com'
);
```

---

## 🎓 FAQ

**Q : Puis-je utiliser un autre fournisseur SMTP ?**  
R : Oui, modifiez les champs `gmailSmtpHost` et `gmailSmtpPort` dans les paramètres.

**Q : Combien d'emails puis-je envoyer par jour ?**  
R : 500 emails/jour avec Gmail SMTP gratuit.

**Q : Les emails partent-ils vraiment de mon Gmail ?**  
R : Oui, les emails sont envoyés via les serveurs Gmail avec votre adresse.

**Q : Puis-je personnaliser les templates d'emails ?**  
R : Oui, modifiez les méthodes `getRestaurantEmailTemplate`, `getCommerceEmailTemplate`, etc. dans `gmailSmtpService.ts`.

**Q : Que faire si ma limite est atteinte ?**  
R : Attendez 24h, ou configurez un second compte Gmail SMTP en alternance.

---

## 📞 Support

En cas de problème persistant :
1. Vérifiez la [documentation Google](https://support.google.com/accounts/answer/185833)
2. Testez votre configuration sur [Google Account](https://myaccount.google.com)
3. Consultez les logs dans l'Agent Outreach > Journal d'envoi

---

## ✅ Résumé des modifications

| Avant | Après |
|-------|-------|
| Resend API | ✅ Gmail SMTP (gratuit) |
| Unsplash API | ❌ Supprimé (images via Serper) |
| Pexels API | ❌ Supprimé (images via Serper) |
| Gemini API | ❌ Supprimé (utiliser OpenRouter) |
| 4 APIs à configurer | ✅ 3 APIs seulement |

**Économie mensuelle :** ~$20-50 (suppression des abonnements payants)

---

*Documentation mise à jour le : 27 Mars 2026*  
*Version : LeadForge AI v2.0*
