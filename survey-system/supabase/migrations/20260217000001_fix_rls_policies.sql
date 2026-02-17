-- Migration: Standardise RLS policies for all tables
-- All authenticated users get full CRUD access (internal business tool)
-- Previous surveyors policies required JWT role claims that weren't being set
-- Previous customer_details had 7 overlapping/duplicate policies
-- TODO: Add role-based restrictions before multi-user production deployment
-- STATUS: Already applied to live DB on 17 Feb 2026

-- Drop all existing policies

-- surveyors (4 role-based policies that blocked writes)
DROP POLICY IF EXISTS "Admin full surveyor access" ON surveyors;
DROP POLICY IF EXISTS "Office staff surveyor access" ON surveyors;
DROP POLICY IF EXISTS "Surveyor own profile access" ON surveyors;
DROP POLICY IF EXISTS "Surveyor update own profile" ON surveyors;

-- customer_details (7 overlapping/duplicate policies)
DROP POLICY IF EXISTS "Allow admin users full access to customer details" ON customer_details;
DROP POLICY IF EXISTS "Allow authenticated users to create customer details" ON customer_details;
DROP POLICY IF EXISTS "Allow authenticated users to read customer details" ON customer_details;
DROP POLICY IF EXISTS "Allow authenticated users to update customer details" ON customer_details;
DROP POLICY IF EXISTS "Allow service role full access" ON customer_details;
DROP POLICY IF EXISTS "Service role full access" ON customer_details;
DROP POLICY IF EXISTS "Temporary development access" ON customer_details;

-- All other tables (simple "Allow all" policies)
DROP POLICY IF EXISTS "Allow all" ON enquiries;
DROP POLICY IF EXISTS "Allow all" ON projects;
DROP POLICY IF EXISTS "Allow all" ON survey_rooms;
DROP POLICY IF EXISTS "Allow all" ON moisture_readings;
DROP POLICY IF EXISTS "Allow all" ON defects;
DROP POLICY IF EXISTS "Allow all" ON photos;
DROP POLICY IF EXISTS "Allow all" ON work_sections;
DROP POLICY IF EXISTS "Allow all" ON materials_catalog;
DROP POLICY IF EXISTS "Allow all" ON pricing_items;
DROP POLICY IF EXISTS "Allow all" ON base_rates;
DROP POLICY IF EXISTS "Allow all" ON markup_config;
DROP POLICY IF EXISTS "Allow all" ON project_costing;

-- Create standardised policies for all 14 tables

CREATE POLICY "Authenticated users full access" ON enquiries FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON enquiries FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users full access" ON projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON projects FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users full access" ON survey_rooms FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON survey_rooms FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users full access" ON moisture_readings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON moisture_readings FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users full access" ON defects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON defects FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users full access" ON photos FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON photos FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users full access" ON work_sections FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON work_sections FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users full access" ON materials_catalog FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON materials_catalog FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users full access" ON pricing_items FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON pricing_items FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users full access" ON base_rates FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON base_rates FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users full access" ON markup_config FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON markup_config FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users full access" ON project_costing FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON project_costing FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users full access" ON customer_details FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON customer_details FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users full access" ON surveyors FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON surveyors FOR ALL TO service_role USING (true) WITH CHECK (true);