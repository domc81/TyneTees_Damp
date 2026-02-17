-- Tyne Tees Damp Proofing Survey System Schema
-- Migration: 001_initial_schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- ENUMS
-- ============================================================================

CREATE TYPE survey_type AS ENUM ('damp', 'timber', 'woodworm', 'condensation');

CREATE TYPE project_status AS ENUM (
  'draft',
  'in_progress',
  'pending_review',
  'completed',
  'archived'
);

-- ============================================================================
-- USERS & AUTHENTICATION
-- ============================================================================

-- Profiles table (extends Supabase Auth)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'surveyor' CHECK (role IN ('admin', 'surveyor', 'office')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- PROJECTS
-- ============================================================================

CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_number TEXT UNIQUE NOT NULL, -- e.g., "TT-2026-0001"
  client_name TEXT NOT NULL,
  client_email TEXT,
  client_phone TEXT,
  site_address TEXT NOT NULL,
  site_address_line2 TEXT,
  site_city TEXT,
  site_county TEXT,
  site_postcode TEXT NOT NULL,
  survey_type survey_type NOT NULL,
  status project_status DEFAULT 'draft',
  surveyor_id UUID REFERENCES auth.users(id),
  weather_conditions TEXT,
  survey_date DATE,
  completion_date DATE,
  notes TEXT,
  internal_reference TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- PHOTOS
-- ============================================================================

CREATE TABLE photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL, -- Supabase Storage path
  file_name TEXT NOT NULL,
  file_size BIGINT,
  mime_type TEXT,
  description TEXT,
  photo_category TEXT, -- e.g., 'general', 'damp_evidence', 'timber_damage', 'ventilation'
  latitude DECIMAL(9,6),
  longitude DECIMAL(9,6),
  taken_at TIMESTAMPTZ,
  uploaded_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- LINE ITEMS (Costing)
-- ============================================================================

CREATE TABLE sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL, -- e.g., "Preparatory Work", "DPC Installation"
  display_order INTEGER DEFAULT 0,
  markup_percentage DECIMAL(5,2) DEFAULT 0, -- Section-specific markup
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE line_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section_id UUID REFERENCES sections(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  item_name TEXT NOT NULL,
  description TEXT,
  category TEXT, -- 'materials', 'labor', 'equipment', 'subcontractor'
  length DECIMAL(10,2),
  width DECIMAL(10,2),
  height DECIMAL(10,2),
  quantity DECIMAL(10,2), -- Calculated or manual
  uom TEXT, -- 'M2', 'LM', 'Each', 'Bags', etc.
  unit_rate DECIMAL(10,2), -- Base cost per unit
  waste_factor DECIMAL(5,3) DEFAULT 0.10, -- 10% default waste
  hours_per_unit DECIMAL(10,4), -- Labor productivity rate
  is_optional BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE, -- Toggle for inclusion
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- RATES (Configuration)
-- ============================================================================

CREATE TABLE rates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL, -- e.g., "Hourly Rate", "Travel Rate"
  value DECIMAL(10,2) NOT NULL,
  unit TEXT,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  effective_from DATE,
  effective_to DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- QUOTATIONS
-- ============================================================================

CREATE TABLE quotations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  quotation_number TEXT UNIQUE NOT NULL,
  subtotal DECIMAL(12,2) NOT NULL,
  vat_rate DECIMAL(5,2) DEFAULT 20.00,
  vat_amount DECIMAL(12,2) NOT NULL,
  total DECIMAL(12,2) NOT NULL,
  deposit_percentage DECIMAL(5,2) DEFAULT 30.00,
  deposit_amount DECIMAL(12,2),
  validity_days INTEGER DEFAULT 30,
  status TEXT DEFAULT 'draft', -- 'draft', 'sent', 'accepted', 'rejected'
  sent_at TIMESTAMPTZ,
  accepted_at TIMESTAMPTZ,
  notes TEXT,
  terms TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- REPORTS (PDF Generation)
-- ============================================================================

CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  report_type TEXT DEFAULT 'survey', -- 'survey', 'quotation', 'combined'
  version INTEGER DEFAULT 1,
  template_name TEXT DEFAULT 'standard',
  content JSONB, -- Structured report content
  pdf_path TEXT, -- Generated PDF storage path
  generated_at TIMESTAMPTZ,
  generated_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE line_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read their own profile
CREATE POLICY "Users can read own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Profiles: Users can update own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Projects: Authenticated users can view all projects
CREATE POLICY "Authenticated users can view projects" ON projects
  FOR SELECT USING (auth.role() = 'authenticated');

-- Projects: Surveyors can create projects
CREATE POLICY "Surveyors can create projects" ON projects
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Projects: Owners can update projects
CREATE POLICY "Owners can update projects" ON projects
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM projects WHERE id = projects.id AND surveyor_id = auth.uid())
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Photos: Project team can manage photos
CREATE POLICY "Team can manage photos" ON photos
  FOR ALL USING (
    EXISTS (SELECT 1 FROM projects WHERE id = photos.project_id AND surveyor_id = auth.uid())
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'office'))
  );

-- Line Items: Project team can manage
CREATE POLICY "Team can manage line items" ON line_items
  FOR ALL USING (
    EXISTS (SELECT 1 FROM projects WHERE id = line_items.project_id AND surveyor_id = auth.uid())
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'office'))
  );

-- Rates: Admins and office can manage
CREATE POLICY "Admins can manage rates" ON rates
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'office'))
  );

-- ============================================================================
-- INDEXES
-- ============================================================================

CREATE INDEX idx_projects_surveyor ON projects(surveyor_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_postcode ON projects(site_postcode);
CREATE INDEX idx_photos_project ON photos(project_id);
CREATE INDEX idx_photos_category ON photos(photo_category);
CREATE INDEX idx_line_items_section ON line_items(section_id);
CREATE INDEX idx_line_items_project ON line_items(project_id);
CREATE INDEX idx_quotations_project ON quotations(project_id);

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_line_items_updated_at BEFORE UPDATE ON line_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rates_updated_at BEFORE UPDATE ON rates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Auto-generate project number
CREATE OR REPLACE FUNCTION generate_project_number()
RETURNS TRIGGER AS $$
DECLARE
  year_num TEXT;
  seq_num INTEGER;
BEGIN
  year_num := EXTRACT(YEAR FROM COALESCE(NEW.survey_date, NOW()))::TEXT;
  seq_num := COALESCE(
    (SELECT COUNT(*) + 1 FROM projects WHERE project_number LIKE 'TT-' || year_num || '-%'),
    1
  );
  NEW.project_number := 'TT-' || year_num || '-' || LPAD(seq_num::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_project_number BEFORE INSERT ON projects
  FOR EACH ROW EXECUTE FUNCTION generate_project_number();

-- ============================================================================
-- SEED DATA
-- ============================================================================

-- Default rates
INSERT INTO rates (name, value, unit, description) VALUES
  ('Hourly Rate', 30.63, 'GBP/hour', 'Base labor hourly rate'),
  ('Travel Rate', 0.50, 'GBP/km', 'Vehicle cost per kilometer'),
  ('Contractor Hourly', 28.00, 'GBP/hour', 'Subcontractor labor rate'),
  ('Material Markup Default', 35.00, '%', 'Default material markup percentage'),
  ('Labor Markup Default', 25.00, '%', 'Default labor markup percentage'),
  ('VAT Rate', 20.00, '%', 'Standard VAT rate');
