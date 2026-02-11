// Complete Tyne Tees Survey System - Database Schema
// Full Enquiry → Survey → Costing → Materials → Report workflow

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

CREATE TYPE defect_type AS ENUM (
  'rising_damp',
  'penetrating_damp',
  'wet_rot',
  'dry_rot',
  'woodworm',
  'condensation',
  'mould',
  'wall_tie_failure',
  'asbestos_suspected',
  'structural_movement',
  'other'
);

CREATE TYPE work_type AS ENUM (
  'damp_proofing',
  'timber_treatment',
  'structural_repair',
  'ventilation_install',
  'asbestos_survey',
  'general_inspection'
);

CREATE TYPE room_type AS ENUM (
  'living_room',
  'bedroom',
  'kitchen',
  'bathroom',
  'dining_room',
  'hallway',
  'staircase',
  'basement',
  'garage',
  'utility',
  'loft',
  'external',
  'other'
);

CREATE TYPE floor_level AS ENUM (
  'ground',
  'first',
  'second',
  'basement',
  'lower_ground',
  'loft'
);

-- ============================================================================
-- CORE TABLES
-- ============================================================================

-- Enquiries (Office Admin Entry Point)
CREATE TABLE enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enquiry_number TEXT UNIQUE NOT NULL, -- e.g., "CF-Damp-2026-0001"
  internal_reference TEXT UNIQUE, -- e.g., "SMITH-001"

  -- Client Info
  client_name TEXT NOT NULL,
  client_email TEXT,
  client_phone TEXT,

  -- Site Address
  site_address_1 TEXT NOT NULL,
  site_address_2 TEXT,
  site_address_3 TEXT,
  site_city TEXT,
  site_county TEXT,
  site_postcode TEXT NOT NULL,

  -- Booking Info
  surveyor_id UUID REFERENCES auth_users(id),
  enquiry_date DATE DEFAULT CURRENT_DATE,
  proposed_survey_date DATE,
  actual_survey_date DATE,
  status enquiry_status DEFAULT 'new',

  -- Admin Notes
  source TEXT, -- e.g., "Website", "Phone", "Email"
  notes TEXT,
  follow_up_date DATE,

  -- Audit
  created_by UUID REFERENCES auth_users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects (Links Enquiry to Survey + Costing)
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enquiry_id UUID REFERENCES enquiries(id) ON DELETE CASCADE,
  project_number TEXT UNIQUE NOT NULL, -- e.g., "TT-2026-0001"

  -- Survey Details
  survey_type survey_type NOT NULL,
  weather_conditions TEXT,
  property_type TEXT, -- e.g., "Detached House", "Flat", "Terrace"
  property_age TEXT, -- e.g., "Victorian", "1930s", "Modern"
  construction_type TEXT, -- e.g., "Solid Wall", "Cavity Wall"

  -- Site Access
  access_instructions TEXT,
  parking_available BOOLEAN,
  parking_notes TEXT,

  -- Status
  status TEXT DEFAULT 'draft', -- draft, in_progress, pending_review, completed

  -- Survey Data
  survey_completed_at TIMESTAMPTZ,
  surveyor_id UUID REFERENCES auth_users(id),

  -- Costing
  total_cost DECIMAL(12,2),
  deposit_amount DECIMAL(12,2),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- SURVEY DATA TABLES
-- ============================================================================

-- Room Inspections
CREATE TABLE room_inspections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,

  room_name TEXT NOT NULL,
  room_type room_type NOT NULL,
  floor_level floor_level NOT NULL,
  order_num INTEGER DEFAULT 0,

  -- Dimensions
  length DECIMAL(6,2),
  width DECIMAL(6,2),
  height DECIMAL(6,2),

  -- Defects Found
  defects JSONB, -- Array of {type, severity, description, location}

  -- Moisture Readings
  moisture_readings JSONB, -- Array of {location, reading_percent, notes}

  -- Timber Condition (if applicable)
  timber_condition TEXT,
  decay_type TEXT, -- wet_rot, dry_rot, none
  severity_rating INTEGER, -- 1-5 scale

  -- Recommendations
  recommendations TEXT,
  recommended_works TEXT,

  -- Photos
  photo_ids UUID[],

  -- Flags for conditional logic
  needs_asbestos_assessment BOOLEAN DEFAULT FALSE,
  needs_structural_assessment BOOLEAN DEFAULT FALSE,
  timber_at_risk BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Defect Templates (Pre-defined defect types)
CREATE TABLE defect_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  survey_type survey_type NOT NULL,
  defect_type defect_type NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  severity_default INTEGER DEFAULT 2,
  triggers_work_section TEXT, -- Links to costing section
  triggers_material_ids UUID[], -- Links to materials
  requires_asbestos_check BOOLEAN DEFAULT FALSE,
  requires_timber_assessment BOOLEAN DEFAULT FALSE,
  recommended_works_template TEXT
);

-- ============================================================================
-- COSTING ENGINE TABLES
-- ============================================================================

-- Cost Sections (Main work categories)
CREATE TABLE cost_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,

  section_name TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,

  -- Pricing
  markup_percentage DECIMAL(5,2) DEFAULT 0,
  is_optional BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,

  -- Section Totals (cached)
  materials_total DECIMAL(12,2) DEFAULT 0,
  labor_total DECIMAL(12,2) DEFAULT 0,
  subcontractor_total DECIMAL(12,2) DEFAULT 0,
  section_total DECIMAL(12,2) DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Line Items
CREATE TABLE line_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID REFERENCES cost_sections(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,

  item_name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL, -- EQUIP, LBR, MTL, Other, SUB

  -- Quantities
  length DECIMAL(8,2),
  width DECIMAL(8,2),
  height DECIMAL(8,2),
  quantity DECIMAL(10,2), -- Can be manual or calculated
  uom TEXT NOT NULL, -- Each, M2, M3, LM, Hours, Bags

  -- Unit Costs
  unit_rate DECIMAL(10,2) DEFAULT 0, -- Base cost
  waste_factor DECIMAL(5,3) DEFAULT 0.10, -- 10% default

  -- Labor
  hours_per_unit DECIMAL(8,4),
  hourly_rate DECIMAL(8,2) DEFAULT 30.63,

  -- Markups
  markup_percentage DECIMAL(5,2) DEFAULT 35, -- Default material markup
  labor_markup_percentage DECIMAL(5,2) DEFAULT 100, -- Default labor markup

  -- Calculations (cached)
  material_cost DECIMAL(12,2) DEFAULT 0,
  labor_cost DECIMAL(12,2) DEFAULT 0,
  line_total DECIMAL(12,2) DEFAULT 0,

  -- Flags
  is_optional BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Section Price Adjustments (Row-level adjustments)
CREATE TABLE section_adjustments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  section_id UUID REFERENCES cost_sections(id) ON DELETE CASCADE,

  adjustment_name TEXT NOT NULL,
  adjustment_percentage DECIMAL(5,2), -- Can be % or fixed amount
  is_percentage BOOLEAN DEFAULT TRUE,
  applies_to TEXT, -- 'materials', 'labor', 'both', 'subcontractor'

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- MATERIALS & PRODUCTS
-- ============================================================================

-- Materials Catalog
CREATE TABLE materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  product_code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT, -- Damp Proofing, Timber Treatment, etc.

  -- Pricing
  unit_cost DECIMAL(10,2) NOT NULL,
  unit_of_measure TEXT NOT NULL, -- Each, M2, LM, etc.

  -- Usage
  coverage_per_unit DECIMAL(8,2),
  coverage_unit TEXT,

  -- Links
  supplier_name TEXT,
  supplier_url TEXT,

  -- Preset defaults
  default_waste_factor DECIMAL(5,3) DEFAULT 0.10,
  default_markup DECIMAL(5,2) DEFAULT 35,

  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Materials List (Project-specific procurement)
CREATE TABLE materials_list (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,

  material_id UUID REFERENCES materials(id),
  quantity_required DECIMAL(10,2) NOT NULL,
  uom TEXT NOT NULL,

  -- Costing
  unit_cost DECIMAL(10,2) NOT NULL,
  total_cost DECIMAL(12,2) NOT NULL,

  -- Status
  ordered BOOLEAN DEFAULT FALSE,
  ordered_date DATE,
  delivery_date DATE,

  notes TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- SUBCONTRACTOR COSTS
-- ============================================================================

CREATE TABLE subcontractors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  trade TEXT NOT NULL, -- e.g., "Plastering", "Electrical", "Builder"
  contact_name TEXT,
  phone TEXT,
  email TEXT,
  hourly_rate DECIMAL(8,2),
  day_rate DECIMAL(8,2),
  notes TEXT,
  is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE subcontractor_costs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,

  subcontractor_id UUID REFERENCES subcontractors(id),
  work_description TEXT NOT NULL,

  quantity DECIMAL(10,2),
  uom TEXT,
  unit_cost DECIMAL(10,2),
  total_cost DECIMAL(12,2),

  projected_hours DECIMAL(8,2),
  notes TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- PHOTOS & MEDIA
-- ============================================================================

CREATE TABLE photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  room_inspection_id UUID REFERENCES room_inspections(id) ON DELETE SET NULL,

  storage_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size BIGINT,
  mime_type TEXT,

  -- Categorization
  category TEXT NOT NULL, -- damp_evidence, timber_damage, general, etc.
  description TEXT,

  -- Location
  latitude DECIMAL(10,8),
  longitude DECIMAL(10,8),

  -- Metadata
  taken_at TIMESTAMPTZ,
  uploaded_by UUID REFERENCES auth_users(id),

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- QUOTATIONS & REPORTS
-- ============================================================================

CREATE TABLE quotations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,

  quotation_number TEXT UNIQUE NOT NULL, -- e.g., "Q-TT-2026-0001"

  -- Pricing
  subtotal DECIMAL(12,2) NOT NULL,
  vat_rate DECIMAL(5,2) DEFAULT 20,
  vat_amount DECIMAL(12,2) NOT NULL,
  total DECIMAL(12,2) NOT NULL,

  -- Deposit
  deposit_percentage DECIMAL(5,2) DEFAULT 30,
  deposit_amount DECIMAL(12,2),

  -- Terms
  validity_days INTEGER DEFAULT 30,
  valid_until DATE,

  -- Status
  status TEXT DEFAULT 'draft', -- draft, sent, viewed, accepted, rejected
  sent_at TIMESTAMPTZ,
  viewed_at TIMESTAMPTZ,
  accepted_at TIMESTAMPTZ,

  -- Customer Acceptance
  customer_signature JSONB, -- {name, date, ip_address}

  notes TEXT,
  terms_conditions TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,

  report_type TEXT NOT NULL, -- survey, quotation, combined, inspection
  version INTEGER DEFAULT 1,

  -- Content (JSON-based structure)
  content JSONB NOT NULL, -- Full report structure

  -- PDF
  pdf_path TEXT,
  pdf_generated_at TIMESTAMPTZ,

  -- Generated By
  generated_by UUID REFERENCES auth_users(id),

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- EMAIL TEMPLATES
-- ============================================================================

CREATE TABLE email_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  template_name TEXT UNIQUE NOT NULL,
  template_type TEXT NOT NULL, -- access_permission, quotation, follow_up, etc.

  subject_template TEXT NOT NULL,
  body_template TEXT NOT NULL, -- HTML or plain text with {{variables}}

  variables JSONB, -- Available {{variable}} names and descriptions

  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE sent_emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  template_id UUID REFERENCES email_templates(id),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,

  recipient_email TEXT NOT NULL,
  recipient_name TEXT,

  subject TEXT NOT NULL,
  body TEXT NOT NULL,

  sent_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'sent', -- sent, delivered, opened, bounced
  opened_at TIMESTAMPTZ
);

-- ============================================================================
-- RATES & CONFIGURATION
-- ============================================================================

CREATE TABLE rates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  rate_name TEXT UNIQUE NOT NULL, -- "Hourly Rate", "Travel Rate", etc.
  rate_type TEXT NOT NULL, -- "hourly", "km", "percentage"
  value DECIMAL(10,2) NOT NULL,
  unit TEXT,
  description TEXT,

  effective_from DATE,
  effective_to DATE,
  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- RLS POLICIES
-- ============================================================================

ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_inspections ENABLE ROW LEVEL SECURITY;
ALTER TABLE cost_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE line_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Basic policies (expand as needed)
CREATE POLICY "Team can view enquiries" ON enquiries FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Office can manage enquiries" ON enquiries FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'office'))
);

-- Similar policies for other tables...

-- ============================================================================
-- INDEXES
-- ============================================================================

CREATE INDEX idx_enquiries_status ON enquiries(status);
CREATE INDEX idx_enquiries_postcode ON enquiries(site_postcode);
CREATE INDEX idx_projects_surveyor ON projects(surveyor_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_room_inspections_project ON room_inspections(project_id);
CREATE INDEX idx_line_items_project ON line_items(project_id);
CREATE INDEX idx_line_items_section ON line_items(section_id);

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Auto-generate enquiry number
CREATE OR REPLACE FUNCTION generate_enquiry_number()
RETURNS TRIGGER AS $$
DECLARE
  year_num TEXT;
  prefix TEXT;
  count_num INTEGER;
BEGIN
  year_num := EXTRACT(YEAR FROM COALESCE(NEW.enquiry_date, NOW()))::TEXT;
  prefix := 'CF-' || UPPER(NEW.survey_type::TEXT) || '-' || year_num || '-';
  count_num := COALESCE(
    (SELECT COUNT(*) + 1 FROM enquiries WHERE enquiry_number LIKE prefix || '%'),
    1
  );
  NEW.enquiry_number := prefix || LPAD(count_num::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Auto-generate internal reference
CREATE OR REPLACE FUNCTION generate_internal_reference()
RETURNS TRIGGER AS $$
DECLARE
  surname TEXT;
BEGIN
  surname := COALESCE(SPLIT_PART(NEW.client_name, ' ', -1), 'PROJECT');
  NEW.internal_reference := UPPER(SUBSTRING(surname FROM 1 FOR 5)) || '-' ||
    LPAD((SELECT COUNT(*) + 1 FROM enquiries WHERE internal_reference IS NOT NULL)::TEXT, 3, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Calculate line item totals
CREATE OR REPLACE FUNCTION calculate_line_item_total()
RETURNS TRIGGER AS $$
DECLARE
  qty DECIMAL;
  mat_cost DECIMAL;
  lab_cost DECIMAL;
  hourly_rate DECIMAL;
BEGIN
  -- Calculate quantity
  IF NEW.quantity > 0 THEN
    qty := NEW.quantity;
  ELSIF NEW.length > 0 AND NEW.width > 0 THEN
    qty := NEW.length * NEW.width;
  ELSE
    qty := 0;
  END IF;

  -- Get hourly rate from rates table
  hourly_rate := COALESCE(
    (SELECT value FROM rates WHERE rate_name = 'Hourly Rate' AND is_active LIMIT 1),
    30.63
  );

  -- Calculate material cost
  mat_cost := qty * NEW.unit_rate * (1 + COALESCE(NEW.waste_factor, 0)) * (1 + NEW.markup_percentage / 100);

  -- Calculate labor cost
  lab_cost := qty * COALESCE(NEW.hours_per_unit, 0) * hourly_rate * (1 + NEW.labor_markup_percentage / 100);

  NEW.material_cost := ROUND(mat_cost::numeric, 2);
  NEW.labor_cost := ROUND(lab_cost::numeric, 2);
  NEW.line_total := ROUND((mat_cost + lab_cost)::numeric, 2);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calculate_line_item_total
  BEFORE INSERT OR UPDATE ON line_items
  FOR EACH ROW
  EXECUTE FUNCTION calculate_line_item_total();

-- ============================================================================
-- SEED DATA
-- ============================================================================

-- Default Rates
INSERT INTO rates (rate_name, rate_type, value, unit, description) VALUES
  ('Hourly Rate', 'hourly', 30.63, 'GBP/hr', 'Base labor rate'),
  ('Travel Rate', 'km', 0.50, 'GBP/km', 'Vehicle cost per km'),
  ('Contractor Hourly', 'hourly', 28.00, 'GBP/hr', 'Subcontractor labor rate'),
  ('Material Markup Default', 'percentage', 35.00, '%', 'Default material markup'),
  ('Labor Markup Default', 'percentage', 100.00, '%', 'Default labor markup (100% = double)'),
  ('VAT Rate', 'percentage', 20.00, '%', 'Standard VAT rate');

-- Default Email Templates
INSERT INTO email_templates (template_name, template_type, subject_template, body_template, variables) VALUES
  ('Access Permission Request', 'access_permission',
   'RE: Creation of Access Points for Further Inspection',
   'Dear {{client_name}},<br><br>We have carried out a survey of your property at {{site_address}}.<br><br>During the survey it was not possible for the surveyor to inspect certain areas. To complete the survey, permission is needed to access sub-floor voids etc.<br><br>The cost of any re-fitting/repair/replacement will have to be borne by yourself.<br><br>Kind Regards,<br>Tyne Tees Damp Proofing Ltd',
   '{"client_name": "Client name", "site_address": "Full site address"}');

-- Default Materials
INSERT INTO materials (product_code, name, category, unit_cost, unit_of_measure, default_waste_factor) VALUES
  ('MTL-001', 'Antinox HD Floor Protection', 'Damp Proofing', 4.16, 'Each', 0.10),
  ('MTL-002', 'Wykamol CM3 Mesh Membrane', 'Damp Proofing', 18.35, 'M2', 0.10),
  ('MTL-003', 'Creamline 8 DPC', 'Damp Proofing', 13.93, 'LM', 0.10),
  ('MTL-004', 'EP40 2 Pack Resin Top Coat', 'Damp Proofing', 25.00, 'M2', 0.10),
  ('MTL-005', 'Renovating Plaster 25kg', 'Plastering', 22.50, 'Bags', 0.15),
  ('MTL-006', 'Plastering Stop Bead 3m', 'Plastering', 3.20, 'Each', 0.10),
  ('MTL-007', 'Airbrick (110mm)', 'Ventilation', 8.50, 'Each', 0.10);

-- Default Sections Template
INSERT INTO cost_sections (section_name, display_order, markup_percentage) VALUES
  ('Stripping out of items as required', 1, 0),
  ('Walls (Install membrane system)', 2, 0),
  ('Cementitious tanking system', 3, 0),
  ('Floor - Liquid Resin Floor Membranes', 4, 0),
  ('Plastering & finishing', 5, 0),
  ('Warmline Internal Wall Insulation', 6, 0),
  ('Floor Joists & Floor Decking', 7, 0),
  ('Airbricks', 8, 0),
  ('Spray treatments', 9, 0),
  ('Drains', 10, 0),
  ('External Wall - Aquaban Water Repellant Treatments', 11, 0),
  ('Asbestos Testing', 12, 0);
