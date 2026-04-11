# Migration des Templates Email Outreach Agent v2

## Description
Cette migration remplace les anciens templates email par les 9 nouveaux templates corrigés pour l'Outreach Agent.

## Structure de la table email_templates

La table email_templates a la structure suivante :
- `id` (TEXT PRIMARY KEY)
- `name` (TEXT NOT NULL)
- `sector` (TEXT NOT NULL) - Utilisé pour catégoriser les templates (sale/reminder)
- `subject` (TEXT NOT NULL)
- `body` (TEXT NOT NULL) - Contenu HTML du template
- `created_at` (TIMESTAMPTZ)
- `updated_at` (TIMESTAMPTZ)

## Templates mis à jour

### Templates de VENTE (6 templates)
1. **email1_presentation** - Email 1 - Présentation Site Web
2. **email2_devis** - Email 2 - Devis
3. **email3_confirmation** - Email 3 - Confirmation Dépôt
4. **email4_final_payment** - Email 4 - Paiement Final
5. **email5_final_payment_confirmation** - Email 5 - Confirmation Paiement Final
6. **email6_delivery_documentation** - Email 6 - Livraison et Documentation

### Templates de RAPPEL (3 templates)
7. **reminder1_after_email1** - Rappel 1 - Après Email 1
8. **reminder2_after_email2** - Rappel 2 - Après Email 2
9. **reminder3_final_payment** - Rappel 3 - Paiement Final

## Corrections apportées

- ✅ Correction des devises : $ → € (146€ HT, 46€, 100€)
- ✅ Correction du lien website : "VOTRE SITE WEB ICI" → {{websiteLink}}
- ✅ Ajout des variables manquantes : finalPaymentLink, adminLink, adminUsername, adminPassword, documentationLink
- ✅ Cohérence totale entre tous les templates (prix, délais, contenu)
- ✅ Structure SQL adaptée à la table existante (sector au lieu de category, body au lieu de html_content/text_content)

## Instructions d'exécution

### Option 1 : Via Supabase Dashboard (SQL Editor)

1. Connectez-vous à votre projet Supabase
2. Allez dans **SQL Editor**
3. Exécutez les fichiers dans l'ordre :
   - `update_email_templates_v2_part1.sql` (Suppression + Email 1-3)
   - `update_email_templates_v2_part2.sql` (Email 4-6)
   - `update_email_templates_v2_part3.sql` (Reminder 1-3)

### Option 2 : Via CLI Supabase

```bash
# Exécuter les migrations dans l'ordre
supabase db execute --file supabase-migrations/update_email_templates_v2_part1.sql
supabase db execute --file supabase-migrations/update_email_templates_v2_part2.sql
supabase db execute --file supabase-migrations/update_email_templates_v2_part3.sql
```

### Option 3 : Via psql (PostgreSQL CLI)

```bash
# Exécuter les migrations dans l'ordre
psql -h db.xxx.supabase.co -U postgres -d postgres -f supabase-migrations/update_email_templates_v2_part1.sql
psql -h db.xxx.supabase.co -U postgres -d postgres -f supabase-migrations/update_email_templates_v2_part2.sql
psql -h db.xxx.supabase.co -U postgres -d postgres -f supabase-migrations/update_email_templates_v2_part3.sql
```

## Vérification

Après l'exécution, vérifiez que les templates sont correctement mis à jour :

```sql
SELECT id, name, sector, subject 
FROM email_templates 
WHERE id IN (
  'email1_presentation',
  'email2_devis',
  'email3_confirmation',
  'email4_final_payment',
  'email5_final_payment_confirmation',
  'email6_delivery_documentation',
  'reminder1_after_email1',
  'reminder2_after_email2',
  'reminder3_final_payment'
)
ORDER BY sector, id;
```

## Variables disponibles dans les templates

Les templates utilisent les variables suivantes qui seront remplacées dynamiquement :

- `firstName` - Prénom du contact
- `companyName` - Nom de l'entreprise
- `websiteLink` - URL du site web
- `price` - Prix (146€ HT)
- `agentName` - Nom de l'agent
- `agentEmail` - Email de l'agent
- `amount` - Montant (146€ HT)
- `validityDays` - Validité du devis (7 jours)
- `deliveryDate` - Date de livraison
- `expiryDate` - Date d'expiration
- `devisLink` - Lien vers le devis PDF
- `paymentLink` - Lien de paiement Whop
- `invoiceLink` - Lien vers la facture PDF
- `finalPaymentLink` - Lien de paiement final Whop
- `adminLink` - URL d'administration du site
- `adminUsername` - Nom d'utilisateur admin
- `adminPassword` - Mot de passe admin
- `documentationLink` - Lien vers la documentation
- `invoiceNumber` - Numéro de facture
- `invoiceDate` - Date de facture
- `sector` - Secteur d'activité
- `city` - Ville

## Rollback (Annulation)

En cas de problème, vous pouvez restaurer les anciens templates en exécutant :

```sql
DELETE FROM email_templates WHERE id IN (
  'email1_presentation',
  'email2_devis',
  'email3_confirmation',
  'email4_final_payment',
  'email5_final_payment_confirmation',
  'email6_delivery_documentation',
  'reminder1_after_email1',
  'reminder2_after_email2',
  'reminder3_final_payment'
);
```

Puis réinsérez vos anciens templates si vous en avez une sauvegarde.

## Notes importantes

- Les templates HTML sont optimisés pour la compatibilité avec les clients email
- Les prix sont en euros (€) et non en dollars ($)
- Les liens de paiement utilisent Whop
- Les documents (devis/facture) sont générés automatiquement via Supabase Storage
- La logique de planification utilise maintenant les jours ouvrables (exclut samedi/dimanche)
- La table email_templates utilise `sector` au lieu de `category` et `body` au lieu de `html_content`/`text_content`
