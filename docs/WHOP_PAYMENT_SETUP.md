# Configuration des Paiements Whop

## Vue d'ensemble

LeadForge AI intègre maintenant un système de paiement en deux étapes via Whop :
- **46$** : Paiement de dépôt pour commencer
- **100$** : Paiement final à la livraison

## Configuration

### 1. Créer les produits sur Whop

1. Allez sur [whop.com/dashboard](https://whop.com/dashboard)
2. Créez deux produits :
   - **Produit 1** : "Site Web - Dépôt" - 46$
   - **Produit 2** : "Site Web - Paiement Final" - 100$

### 2. Configurer les liens dans LeadForge

1. Allez dans **Paramètres API** → **Whop Paiements**
2. Copiez les liens de vos produits Whop :
   - **Lien paiement 46$ (dépôt)** : URL du produit de 46$
   - **Lien paiement 100$ (final)** : URL du produit de 100$

### 3. Validation

Les liens doivent commencer par `https://whop.com/products/`

## Utilisation dans les emails

Les variables suivantes sont maintenant disponibles dans les templates email :

- `{{paymentLink}}` : Lien de paiement 46$ (dépôt)
- `{{finalPaymentLink}}` : Lien de paiement 100$ (final)

## Migration SQL

Pour ajouter les colonnes à la base de données :

```sql
ALTER TABLE api_config 
ADD COLUMN IF NOT EXISTS whop_deposit_link TEXT,
ADD COLUMN IF NOT EXISTS whop_final_payment_link TEXT;
```

## Sécurité

- Les liens sont masqués dans l'interface pour éviter les erreurs de copie
- Validation automatique du format des URLs
- Les liens sont sauvegardés de manière sécurisée dans Supabase

## Support

En cas de problème avec les liens de paiement :
1. Vérifiez que les URLs sont valides
2. Testez les liens manuellement dans votre navigateur
3. Contactez le support Whop si un produit ne fonctionne pas
