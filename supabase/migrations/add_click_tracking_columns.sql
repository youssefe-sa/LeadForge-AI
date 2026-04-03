-- Ajouter les colonnes de tracking des clics pour les leads
-- Migration pour ajouter siteClicked, paymentClicked, devisClicked, invoiceClicked

ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS site_clicked BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS payment_clicked BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS devis_clicked BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS invoice_clicked BOOLEAN DEFAULT FALSE;

-- Mettre à jour les leads existants avec des valeurs par défaut
UPDATE leads 
SET site_clicked = FALSE, 
    payment_clicked = FALSE, 
    devis_clicked = FALSE, 
    invoice_clicked = FALSE
WHERE site_clicked IS NULL 
   OR payment_clicked IS NULL 
   OR devis_clicked IS NULL 
   OR invoice_clicked IS NULL;

-- Commentaire pour documentation
COMMENT ON COLUMN leads.site_clicked IS 'Track if user clicked on website link';
COMMENT ON COLUMN leads.payment_clicked IS 'Track if user clicked on payment link';
COMMENT ON COLUMN leads.devis_clicked IS 'Track if user clicked on quote link';
COMMENT ON COLUMN leads.invoice_clicked IS 'Track if user clicked on invoice link';
