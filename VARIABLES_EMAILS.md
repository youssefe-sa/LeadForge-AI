# 📧 Variables des Emails - LeadForge AI

## 🎯 **Résumé complet des variables utilisées dans tous les templates d'emails**

---

## 📋 **Variables principales (utilisées dans tous les emails)**

| Variable | Valeur par défaut | Description | Utilisation |
|----------|-------------------|-------------|-------------|
| `firstName` | `getFirstName(lead.name)` | 2 premiers mots du nom (depuis table leads) | Tous les emails |
| `companyName` | `lead.name` | Nom de l'entreprise (depuis table leads) | Tous les emails |
| `websiteLink` | `lead.siteUrl || '#'` | Lien vers le site web (depuis site_url table leads) | Email 1, Rappel 1, Rappel 3, Email 4, Email 5, Email 6 |
| `agentName` | `apiConfig.gmailSmtpFromName || 'Solutions Web'` | Nom de l'agent (depuis Supabase) | Tous les emails |
| `agentEmail` | `apiConfig.gmailSmtpFromEmail || 'contact@leadforge.ai'` | Email de l'agent (depuis Supabase) | Tous les emails |

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
| `expiryDate` | `Date.now() + 7 jours` | Date d'expiration | Rappel 2 |

---

## 📄 **Variables de documents**

| Variable | Valeur par défaut | Description | Utilisation |
|----------|-------------------|-------------|-------------|
| `devisLink` | `devisLinks[lead.id] || '#'` | Lien vers le devis PDF | Email 2, Rappel 2 |
| `invoiceLink` | `invoiceLinks[lead.id] || '#'` | Lien vers la facture PDF | Email 3, Email 5 |
| `invoiceNumber` | `INV-${lead.id}-${timestamp}` | Numéro de facture | Email 3, Email 5 |
| `invoiceDate` | `Date.now() format fr-FR` | Date de facture | Email 3, Email 5 |

---

## 🔐 **Variables d'accès administrateur**

| Variable | Valeur par défaut | Description | Utilisation |
|----------|-------------------|-------------|-------------|
| `adminLink` | `lead.landingUrl || lead.siteUrl || '#'` | Lien accès admin | Email 6 |
| `adminUsername` | `lead.name` | Nom d'utilisateur admin | Email 6 |
| `adminPassword` | `Généré aléatoirement` | Mot de passe admin | Email 6 |
| `documentationLink` | `lead.landingUrl || lead.siteUrl || '#'` | Lien documentation | Email 6 |

---

## 🏢 **Variables de localisation**

| Variable | Valeur par défaut | Description | Utilisation |
|----------|-------------------|-------------|-------------|
| `sector` | `lead.sector || 'votre secteur'` | Secteur d'activité | Email 1, Email 6 |
| `city` | `lead.city || 'votre ville'` | Ville de l'entreprise | Email 1, Email 6 |

---

## 📧 **Utilisation par Email**

### **Email 1 - Présentation Site Web**
- `firstName`, `companyName`, `websiteLink`, `price`, `agentName`, `agentEmail`, `sector`, `city`

### **Email 2 - Devis et Paiement**
- `firstName`, `companyName`, `devisLink`, `paymentLink`, `price`, `agentName`, `agentEmail`, `validityDays`, `deliveryDate`

### **Email 3 - Confirmation Dépôt**
- `firstName`, `companyName`, `invoiceLink`, `price`, `agentName`, `agentEmail`, `deliveryDate`

### **Email 4 - Paiement Final**
- `firstName`, `companyName`, `websiteLink`, `finalPaymentLink`, `agentName`, `agentEmail`, `deliveryDate`

### **Email 5 - Confirmation Paiement Final**
- `firstName`, `companyName`, `websiteLink`, `invoiceLink`, `agentName`, `agentEmail`

### **Email 6 - Livraison et Documentation**
- `firstName`, `companyName`, `websiteLink`, `adminLink`, `adminUsername`, `adminPassword`, `documentationLink`, `agentName`, `agentEmail`

### **Rappel 1 - Après Email 1**
- `firstName`, `companyName`, `websiteLink`, `paymentLink`, `price`, `agentName`, `agentEmail`

### **Rappel 2 - Dernière Chance**
- `firstName`, `companyName`, `devisLink`, `paymentLink`, `price`, `agentName`, `agentEmail`, `expiryDate`

### **Rappel 3 - Paiement Final**
- `firstName`, `companyName`, `websiteLink`, `finalPaymentLink`, `agentName`, `agentEmail`

---

## 🔗 **Système de paiement Whop**

### **Paiement en 2 étapes**
1. **Dépôt** : `paymentLink` → 46$
2. **Final** : `finalPaymentLink` → 100$
3. **Total** : 146$

### **Configuration requise**
- `apiConfig.whopDepositLink` : Lien de paiement dépôt
- `apiConfig.whopFinalPaymentLink` : Lien de paiement final

---

## � **Fonction getFirstName**

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
