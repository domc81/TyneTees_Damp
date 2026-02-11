-- Tyne Tees Damp Proofing Survey System - Complete Database Schema
-- For Supabase PostgreSQL
-- Version: 1.0.0

-- ============================================================================
-- ENUMS
-- ============================================================================

CREATE TYPE enquiry_status AS ENUM (
  'new',
  'assigned',
  'surveyed',
  'quoted',
  'accepted',
  'declined',
  'on_hold',
  'completed'
);

CREATE TYPE survey_type AS ENUM (
  'damp',
  'timber',
  'woodworm',
  'condensation',
  'structural',
  'comprehensive'
);

CREATE TYPE project_status AS ENUM (
  'draft',
  'in_progress',
  'pending_review',
  'completed',
  'archived'
);

CREATE TYPE defect_severity AS ENUM (
  'minor',
  'moderate',
  'significant',
  'severe',
  'critical'
);

CREATE TYPE item_type AS ENUM (
  'MTL',  -- Materials
  'LBR',  -- Labour
  'SUB',  -- Subcontractor
  'OVR',  -- Overheads
  'TRA'   -- Travel
);

-- ============================================================================
-- CORE TABLES
-- ============================================================================

-- Enquiries (initial customer contact)
CREATE TABLE enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enquiry_number TEXT UNIQUE NOT NULL,
  internal_reference TEXT,

  -- Client info
  client_name TEXT NOT NULL,
  client_email TEXT,
  client_phone TEXT,

  -- Site address
  site_address_1 TEXT NOT NULL,
  site_address_2 TEXT,
  site_city TEXT NOT NULL,
  site_county TEXT,
  site_postcode TEXT NOT NULL,

  -- Enquiry details
  survey_type survey_type NOT NULL DEFAULT 'damp',
  status enquiry_status NOT NULL DEFAULT 'new',
  source TEXT,
  enquiry_date DATE NOT NULL DEFAULT CURRENT_DATE,
  proposed_survey_date DATE,
  notes TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Projects (surveys in progress)
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enquiry_id UUID REFERENCES enquiries(id) ON DELETE SET NULL,
  project_number TEXT UNIQUE NOT NULL,

  -- Survey details
  survey_type survey_type NOT NULL DEFAULT 'damp',
  status project_status NOT NULL DEFAULT 'draft',
  survey_date DATE,
  weather_conditions TEXT,

  -- Client info (denormalized for speed)
  client_name TEXT NOT NULL,
  site_address TEXT NOT NULL,
  site_postcode TEXT NOT NULL,

  -- Survey notes
  notes TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Rooms surveyed in a project
CREATE TABLE survey_rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,

  -- Room info
  name TEXT NOT NULL,
  room_type TEXT NOT NULL,
  floor_level TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,

  -- Construction details
  wall_type TEXT,
  plaster_type TEXT,
  floor_type TEXT,

  -- Survey findings
  findings TEXT,
  recommendations TEXT,
  surveyor_notes TEXT,

  -- Completion status
  is_completed BOOLEAN NOT NULL DEFAULT FALSE,
  completed_at TIMESTAMPTZ,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Moisture readings for rooms
CREATE TABLE moisture_readings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID NOT NULL REFERENCES survey_rooms(id) ON DELETE CASCADE,

  location TEXT NOT NULL,
  reading DECIMAL(5,2) NOT NULL,
  unit TEXT NOT NULL DEFAULT 'percentage',
  material TEXT,
  notes TEXT,

  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Defects observed
CREATE TABLE defects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID NOT NULL REFERENCES survey_rooms(id) ON DELETE CASCADE,

  defect_type TEXT NOT NULL,
  severity defect_severity NOT NULL DEFAULT 'moderate',
  location TEXT NOT NULL,
  description TEXT,
  photo_id UUID,
  recommendation TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Photo records
CREATE TABLE photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  room_id UUID REFERENCES survey_rooms(id) ON DELETE SET NULL,

  file_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  description TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- PRICING TABLES
-- ============================================================================

-- Work sections (categories for pricing)
CREATE TABLE work_sections (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  is_optional BOOLEAN NOT NULL DEFAULT FALSE,
  display_order INTEGER NOT NULL DEFAULT 0,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Materials catalog (supplier pricing)
CREATE TABLE materials_catalog (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  supplier TEXT,
  supplier_url TEXT,
  unit_cost DECIMAL(10,2) NOT NULL DEFAULT 0,
  unit TEXT NOT NULL,
  coverage TEXT,
  category TEXT NOT NULL,
  default_quantity INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Pricing items (work items with costs)
CREATE TABLE pricing_items (
  id TEXT PRIMARY KEY,
  section_id TEXT NOT NULL REFERENCES work_sections(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  unit TEXT NOT NULL,
  material_cost DECIMAL(10,2) NOT NULL DEFAULT 0,
  labor_hours DECIMAL(6,4) NOT NULL DEFAULT 0,
  item_type item_type NOT NULL DEFAULT 'MTL',
  is_mandatory BOOLEAN NOT NULL DEFAULT FALSE,
  markup_override DECIMAL(6,2),
  contractor_cost DECIMAL(10,2),

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Base rates configuration
CREATE TABLE base_rates (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  rate_name TEXT NOT NULL,
  rate_value DECIMAL(10,4) NOT NULL,
  description TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Markup configurations
CREATE TABLE markup_config (
  id TEXT PRIMARY KEY,
  item_type item_type NOT NULL UNIQUE,
  percentage DECIMAL(6,2) NOT NULL DEFAULT 0,
  name TEXT NOT NULL,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- PROJECT COSTING TABLES
-- ============================================================================

-- Project costing (calculated costs for a project)
CREATE TABLE project_costing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,

  -- Selected items as JSONB for flexibility
  selected_items JSONB NOT NULL DEFAULT '{}',
  selected_optional_items TEXT[] NOT NULL DEFAULT '{}',

  -- Travel
  travel_miles INTEGER NOT NULL DEFAULT 0,

  -- Notes
  notes TEXT,

  -- Calculated totals (denormalized for speed)
  material_subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
  labor_subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
  optional_extras DECIMAL(10,2) NOT NULL DEFAULT 0,
  travel_cost DECIMAL(10,2) NOT NULL DEFAULT 0,
  subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
  vat_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  total_inc_vat DECIMAL(10,2) NOT NULL DEFAULT 0,
  deposit_amount DECIMAL(10,2) NOT NULL DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- One costing per project
  UNIQUE(project_id)
);

-- ============================================================================
-- INDEXES
-- ============================================================================

CREATE INDEX idx_enquiries_status ON enquiries(status);
CREATE INDEX idx_enquiries_survey_type ON enquiries(survey_type);
CREATE INDEX idx_enquiries_created_at ON enquiries(created_at DESC);

CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_survey_type ON projects(survey_type);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);

CREATE INDEX idx_survey_rooms_project ON survey_rooms(project_id);
CREATE INDEX idx_moisture_readings_room ON moisture_readings(room_id);
CREATE INDEX idx_defects_room ON defects(room_id);
CREATE INDEX idx_photos_project ON photos(project_id);

CREATE INDEX idx_pricing_items_section ON pricing_items(section_id);
CREATE INDEX idx_materials_catalog_category ON materials_catalog(category);

-- ============================================================================
-- UPDATED_AT TRIGGER
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at
CREATE TRIGGER set_enquiries_updated_at BEFORE UPDATE ON enquiries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_survey_rooms_updated_at BEFORE UPDATE ON survey_rooms
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_work_sections_updated_at BEFORE UPDATE ON work_sections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_materials_catalog_updated_at BEFORE UPDATE ON materials_catalog
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_pricing_items_updated_at BEFORE UPDATE ON pricing_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_base_rates_updated_at BEFORE UPDATE ON base_rates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_markup_config_updated_at BEFORE UPDATE ON markup_config
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_project_costing_updated_at BEFORE UPDATE ON project_costing
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE moisture_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE defects ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE materials_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE base_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE markup_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_costing ENABLE ROW LEVEL SECURITY;

-- For now, allow all operations (we'll add proper policies with auth)
CREATE POLICY "Allow all" ON enquiries FOR ALL USING (true);
CREATE POLICY "Allow all" ON projects FOR ALL USING (true);
CREATE POLICY "Allow all" ON survey_rooms FOR ALL USING (true);
CREATE POLICY "Allow all" ON moisture_readings FOR ALL USING (true);
CREATE POLICY "Allow all" ON defects FOR ALL USING (true);
CREATE POLICY "Allow all" ON photos FOR ALL USING (true);
CREATE POLICY "Allow all" ON work_sections FOR ALL USING (true);
CREATE POLICY "Allow all" ON materials_catalog FOR ALL USING (true);
CREATE POLICY "Allow all" ON pricing_items FOR ALL USING (true);
CREATE POLICY "Allow all" ON base_rates FOR ALL USING (true);
CREATE POLICY "Allow all" ON markup_config FOR ALL USING (true);
CREATE POLICY "Allow all" ON project_costing FOR ALL USING (true);
