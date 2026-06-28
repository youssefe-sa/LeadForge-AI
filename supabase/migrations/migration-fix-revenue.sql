-- Add revenue column if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'leads' AND column_name = 'revenue'
    ) THEN
        ALTER TABLE leads ADD COLUMN revenue REAL DEFAULT 0;
    END IF;
END $$;

-- Fix revenue for already converted leads
UPDATE leads 
SET revenue = 146 
WHERE stage = 'converted' 
AND (revenue IS NULL OR revenue = 0);

-- Verify the update
SELECT COUNT(*) as updated_count, 
       SUM(revenue) as total_revenue 
FROM leads 
WHERE stage = 'converted';
