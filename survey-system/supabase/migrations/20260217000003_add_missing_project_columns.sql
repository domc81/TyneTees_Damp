-- Add missing columns back to projects table
-- These were dropped by a previous migration but the frontend still uses them

ALTER TABLE projects ADD COLUMN IF NOT EXISTS client_name TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS site_address_line2 TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS site_city VARCHAR(100);
ALTER TABLE projects ADD COLUMN IF NOT EXISTS site_county VARCHAR(100);

-- Comments
COMMENT ON COLUMN projects.client_name IS 'Denormalised from customers table for display. Set on project creation/customer change.';
COMMENT ON COLUMN projects.site_address_line2 IS 'Second line of site address';
COMMENT ON COLUMN projects.site_city IS 'Site city/town';
COMMENT ON COLUMN projects.site_county IS 'Site county';