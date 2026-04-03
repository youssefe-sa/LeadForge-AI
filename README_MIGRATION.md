# 🗄️ Migration Required - Click Tracking Columns

## 🚨 **Problem Identified**
The application is trying to update columns that don't exist in Supabase:
- `siteClicked` → `site_clicked`
- `paymentClicked` → `payment_clicked` 
- `devisClicked` → `devis_clicked`
- `invoiceClicked` → `invoice_clicked`

## 📋 **Solution Steps**

### **1. Run SQL Migration**
Execute this SQL in your Supabase SQL Editor:

```sql
-- Ajouter les colonnes de tracking des clics pour les leads
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS site_clicked BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS payment_clicked BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS devis_clicked BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS invoice_clicked BOOLEAN DEFAULT FALSE;

-- Mettre à jour les leads existants
UPDATE leads 
SET site_clicked = FALSE, 
    payment_clicked = FALSE, 
    devis_clicked = FALSE, 
    invoice_clicked = FALSE
WHERE site_clicked IS NULL 
   OR payment_clicked IS NULL 
   OR devis_clicked IS NULL 
   OR invoice_clicked IS NULL;
```

### **2. Supabase Dashboard Steps**
1. Go to Supabase Dashboard
2. Select your project
3. Go to SQL Editor
4. Paste and run the SQL above
5. Verify columns were added in Table Editor

### **3. Restart Application**
After migration, restart your development server:
```bash
npm run dev
```

## ✅ **Expected Result**
- No more "column not found" errors
- Click tracking working properly
- Statistics displaying correctly

## 🔍 **Verification**
Check that these columns exist in your `leads` table:
- `site_clicked` 
- `payment_clicked`
- `devis_clicked`
- `invoice_clicked`
