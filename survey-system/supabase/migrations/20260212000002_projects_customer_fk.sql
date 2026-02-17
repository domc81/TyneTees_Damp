-- Migration: Modify projects table to use customer_id foreign key
-- This removes denormalized client fields and adds proper foreign key relationship

-- Step 1: Add customer_id column
ALTER TABLE projects
ADD COLUMN IF NOT EXISTS customer_id UUID REFERENCES customer_details(id) ON DELETE SET NULL;

-- Step 2: Remove denormalized client fields that are now in customer_details
ALTER TABLE projects
DROP COLUMN IF EXISTS client_name,
DROP COLUMN IF EXISTS client_email,
DROP COLUMN IF EXISTS client_phone;

-- Step 3: Add index for customer lookup
CREATE INDEX IF NOT EXISTS idx_projects_customer ON projects (customer_id);

-- Step 4: Add comments
COMMENT ON COLUMN projects.customer_id IS 'Foreign key to customer_details table';
COMMENT ON INDEX idx_projects_customer IS 'Index for fast customer lookup in projects';