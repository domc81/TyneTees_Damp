-- Migration: Rename customer_details to customers and add title column
-- STATUS: Already applied to live DB on 17 Feb 2026

-- Drop FK before rename
ALTER TABLE projects DROP CONSTRAINT IF EXISTS projects_customer_id_fkey;

-- Rename table
ALTER TABLE customer_details RENAME TO customers;

-- Add title column
ALTER TABLE customers
ADD COLUMN IF NOT EXISTS title VARCHAR(20)
CHECK (title IN ('Mr', 'Mrs', 'Miss', 'Ms', 'Dr', 'Other'));

-- Re-add FK to new table name
ALTER TABLE projects
ADD CONSTRAINT projects_customer_id_fkey
FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL;

-- Rename indexes
ALTER INDEX IF EXISTS idx_customer_details_email RENAME TO idx_customers_email;
ALTER INDEX IF EXISTS idx_customer_details_name RENAME TO idx_customers_name;
ALTER INDEX IF EXISTS idx_customer_details_postcode RENAME TO idx_customers_postcode;

-- Recreate RLS policies on renamed table
DROP POLICY IF EXISTS "Authenticated users full access" ON customers;
DROP POLICY IF EXISTS "Service role full access" ON customers;

CREATE POLICY "Authenticated users full access"
ON customers FOR ALL TO authenticated
USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access"
ON customers FOR ALL TO service_role
USING (true) WITH CHECK (true);

-- Fix updated_at trigger
DROP TRIGGER IF EXISTS set_customer_details_updated_at ON customers;

CREATE TRIGGER set_customers_updated_at
BEFORE UPDATE ON customers
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

COMMENT ON TABLE customers IS 'Customer contact and billing information. Renamed from customer_details.';