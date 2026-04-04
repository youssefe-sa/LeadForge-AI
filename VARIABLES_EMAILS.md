# 📧 Variables des Emails - LeadForge AI

## 🎯 **Résumé complet des variables utilisées dans tous les templates d'emails**

---

## 📋 **Variables principales (utilisées dans tous les emails)**

| Variable | Valeur par défaut | Description | Utilisation |
|----------|-------------------|-------------|-------------|
| `firstName` | `getFirstName(lead.name)` | 2 premiers mots du nom (depuis table leads) | Tous les emails |
| `id` | `getFirstName(lead.name)` | Identifiant (toujours égal à firstName) | Tous les emails |
| `companyName` | `lead.name` | Nom de l'entreprise (depuis table leads) | Tous les emails |
| `websiteLink` | `lead.siteUrl || '#'` | Lien vers le site web (depuis site_url table leads) | Email 1, Rappel 1, Rappel 3, Email 4, Email 5, Email 6 |
| `agentName` | `apiConfig.gmailSmtpFromName || 'Solutions Web'` | Nom de l'agent (depuis Supabase) | Tous les emails |
| `agentEmail` | `apiConfig.gmailSmtpFromEmail || 'contact@leadforge.ai'` | Email de l'agent (depuis Supabase) | Tous les emails |
| `city` | `lead.city || 'votre ville'` | Ville du lead | Tous les emails |
| `sector` | `lead.sector || 'votre secteur'` | Secteur d'activité | Tous les emails |
| `email` | `lead.email || ''` | Email du lead | Tous les emails |

---

## 💰 **Variables de prix et paiement**

| Variable | Valeur par défaut | Description | Utilisation |
|----------|-------------------|-------------|-------------|
| `price` | `'146'` | Prix total en $ | Email 1, Email 2, Rappel 1, Rappel 2 |
| `amount` | `'146'` | Montant total | Variable système |
| `paymentLink` | `apiConfig.whopDepositLink || '#'` | Lien paiement dépôt (46$) | Email 2, Rappel 1, Rappel 2 |
| `finalPaymentLink` | `apiConfig.whopFinalPaymentLink || '#'` | Lien paiement final (100$) | Email 4, Rappel 3 |

---

## 📅 **Variables de dates et délais**

| Variable | Valeur par défaut | Description | Utilisation |
|----------|-------------------|-------------|-------------|
| `validityDays` | `'7'` | Jours de validité de l'offre | Email 2 |
| `deliveryDate` | `Date.now() + 2 jours` | Date de livraison | Email 2, Email 3, Email 4 |
| `expiryDate` | `Date.now() + 7 jours` | Date d'expiration | Email 2 |
| `invoiceDate` | `Date.now()` | Date de facture | Email 3, Email 5 |

---

## 📄 **Variables de documents et liens**

| Variable | Valeur par défaut | Description | Utilisation |
|----------|-------------------|-------------|-------------|
| `devisLink` | `https://siteup-services.vercel.app/devis/${lead.id}` | Lien vers le devis | Email 2 |
| `invoiceLink` | `https://siteup-services.vercel.app/invoice/${lead.id}` | Lien vers la facture | Email 3, Email 5 |
| `invoiceNumber` | `INV-${lead.id}-${timestamp}` | Numéro de facture | Email 3, Email 5 |
| `documentationLink` | `https://siteup-services.vercel.app/docs` | Lien documentation | Email 6 |

---

## 🔐 **Variables d'administration**

| Variable | Valeur par défaut | Description | Utilisation |
|----------|-------------------|-------------|-------------|
| `adminLink` | `https://siteup-services.vercel.app/admin/${lead.id}` | Lien administration | Email 6 |
| `adminUsername` | `lead.name.toLowerCase().replace(/[^a-z0-9]/g, '')` | Nom d'utilisateur admin | Email 6 |
| `adminPassword` | `'TempPassword123!'` | Mot de passe admin | Email 6 |

---

## 📝 **Notes importantes**

- **Toutes les variables utilisent la syntaxe `{{variable}}`**
- **Les liens de sites web affichent "VOTRE SITE WEB ICI" au lieu des URLs directes**
- **La variable `{id}` est toujours égale à `firstName` (2 premiers mots du nom)**
- **Toutes les dates sont formatées en français (fr-FR)**
- **Les liens utilisent le domaine `https://siteup-services.vercel.app`**


---

## 🔧 **Fonction getFirstName**

La variable `{{firstName}}` utilise une fonction personnalisée pour extraire les 2 premiers mots du nom :

```typescript
const getFirstName = (fullName: string): string => {
  if (!fullName) return '';
  const words = fullName.trim().split(/\s+/);
  return words.slice(0, 2).join(' ');
};
```

**Exemples** :
- "Jean Dupont" → "Jean Dupont"
- "Marie Curie Laboratoire" → "Marie Curie"
- "Entreprise ABC Solutions" → "Entreprise ABC"

---

## �� **Total des variables**

**Variables uniques** : 24
**Templates utilisant ces variables** : 9 emails
**Catégories** : Vente (6) + Rappels (3)

---

*Document généré le ${new Date().toLocaleDateString('fr-FR')}*
