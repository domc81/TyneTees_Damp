-- Migration: Survey type-specific extension tables
-- Date: 2026-02-18
-- Reason: Each survey type captures fundamentally different report data.
--         Class Table Inheritance: base surveys + type-specific extensions.
-- Depends on: 20260218000001_rename_projects_to_surveys.sql
-- Rollback: DROP all tables created here in reverse order

-- ============================================================
-- DAMP SURVEY EXTENSIONS
-- ============================================================

CREATE TABLE survey_damp_report (
  survey_id       UUID PRIMARY KEY REFERENCES surveys(id) ON DELETE CASCADE,

  -- DPC Observations
  existing_dpc_found          BOOLEAN,
  existing_dpc_type           TEXT,
  ground_level_issue          BOOLEAN,
  ground_level_details        TEXT,

  -- Internal findings
  internal_tanking_observed   BOOLEAN,

  -- Solid Floor
  solid_floor_type            TEXT,
  solid_floor_membrane_found  BOOLEAN,

  -- Wall Ties
  wall_ties_issue             BOOLEAN,
  wall_ties_details           TEXT,

  -- Drains
  drain_issue                 BOOLEAN,
  drain_details               TEXT,

  -- External
  external_aquaban_required   BOOLEAN,

  -- Digital DPC upsell
  digital_dpc_offered         BOOLEAN DEFAULT false,
  digital_dpc_type            TEXT,
  digital_dpc_radius          DECIMAL(4,1),

  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE survey_damp_wall_readings (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  survey_id       UUID NOT NULL REFERENCES surveys(id) ON DELETE CASCADE,
  wall_location   TEXT NOT NULL,
  room_name       TEXT,
  reading_value   DECIMAL(5,1),
  reading_unit    TEXT DEFAULT 'WME',
  height_mm       INTEGER,
  notes           TEXT,
  display_order   INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_damp_wall_readings_survey ON survey_damp_wall_readings(survey_id);

-- ============================================================
-- CONDENSATION SURVEY EXTENSIONS
-- ============================================================

CREATE TABLE survey_condensation_report (
  survey_id       UUID PRIMARY KEY REFERENCES surveys(id) ON DELETE CASCADE,

  -- Internal findings (bullet toggles from Report sheet)
  condensation_on_windows     BOOLEAN DEFAULT false,
  low_temp_dew_points         BOOLEAN DEFAULT false,
  black_spot_mould            BOOLEAN DEFAULT false,
  lack_of_ventilation         BOOLEAN DEFAULT false,

  -- Ventilation system recommendation
  piv_recommended             BOOLEAN DEFAULT false,
  piv_type                    TEXT,
  trickle_vents_adequate      BOOLEAN,
  airbricks_adequate          BOOLEAN,

  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE survey_condensation_rooms (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  survey_id       UUID NOT NULL REFERENCES surveys(id) ON DELETE CASCADE,
  room_name       TEXT NOT NULL,
  has_mould       BOOLEAN DEFAULT false,
  mould_severity  TEXT,
  has_condensation BOOLEAN DEFAULT false,
  ventilation_notes TEXT,
  detailed_findings JSONB DEFAULT '{}',
  display_order   INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_condensation_rooms_survey ON survey_condensation_rooms(survey_id);

-- ============================================================
-- TIMBER SURVEY EXTENSIONS
-- ============================================================

CREATE TABLE survey_timber_report (
  survey_id       UUID PRIMARY KEY REFERENCES surveys(id) ON DELETE CASCADE,

  non_guaranteed_work_note    BOOLEAN DEFAULT false,
  party_wall_letter_required  BOOLEAN DEFAULT false,

  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE survey_timber_rooms (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  survey_id       UUID NOT NULL REFERENCES surveys(id) ON DELETE CASCADE,
  room_number     INTEGER NOT NULL CHECK (room_number BETWEEN 1 AND 9),
  room_name       TEXT,
  is_visible      BOOLEAN DEFAULT false,

  -- Floor
  floor_type      TEXT,
  floor_condition TEXT,

  -- Joist inspection
  joist_accessible            BOOLEAN,
  joist_condition             TEXT,
  joist_moisture_reading      DECIMAL(5,1),

  -- Fungal findings
  fungal_attack_found         BOOLEAN DEFAULT false,
  fungal_type                 TEXT,
  fungal_details              TEXT,

  -- Insect findings
  insect_attack_found         BOOLEAN DEFAULT false,
  insect_type                 TEXT,
  insect_status               TEXT,
  insect_details              TEXT,

  -- Treatment
  treatment_required          BOOLEAN DEFAULT false,
  treatment_notes             TEXT,

  -- Catch-all for the ~62 fields per room not modelled as columns
  detailed_findings           JSONB DEFAULT '{}',

  display_order               INTEGER DEFAULT 0,
  created_at                  TIMESTAMPTZ DEFAULT now(),
  updated_at                  TIMESTAMPTZ DEFAULT now(),

  UNIQUE(survey_id, room_number)
);

CREATE INDEX idx_timber_rooms_survey ON survey_timber_rooms(survey_id);

-- ============================================================
-- WOODWORM SURVEY EXTENSIONS
-- ============================================================

CREATE TABLE survey_woodworm_report (
  survey_id       UUID PRIMARY KEY REFERENCES surveys(id) ON DELETE CASCADE,

  infestation_status          TEXT NOT NULL DEFAULT 'none',
  beetle_species              TEXT DEFAULT 'anobium_punctatum',

  -- Affected areas
  ground_floor_affected       BOOLEAN DEFAULT false,
  first_floor_affected        BOOLEAN DEFAULT false,
  loft_affected               BOOLEAN DEFAULT false,
  ground_floor_rooms          TEXT,
  first_floor_rooms           TEXT,
  loft_details                TEXT,

  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- SURVEY IMAGES (shared, replaces/extends photos table)
-- ============================================================

CREATE TABLE survey_images (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  survey_id       UUID NOT NULL REFERENCES surveys(id) ON DELETE CASCADE,
  section_key     TEXT NOT NULL,
  image_url       TEXT NOT NULL,
  description     TEXT,
  display_order   INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_survey_images_survey ON survey_images(survey_id);
CREATE INDEX idx_survey_images_section ON survey_images(survey_id, section_key);

-- ============================================================
-- RLS POLICIES
-- ============================================================

ALTER TABLE survey_damp_report ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_damp_wall_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_condensation_report ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_condensation_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_timber_report ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_timber_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_woodworm_report ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_images ENABLE ROW LEVEL SECURITY;

-- All type extension tables: authenticated users get full access
DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOR tbl IN SELECT unnest(ARRAY[
    'survey_damp_report', 'survey_damp_wall_readings',
    'survey_condensation_report', 'survey_condensation_rooms',
    'survey_timber_report', 'survey_timber_rooms',
    'survey_woodworm_report', 'survey_images'
  ])
  LOOP
    EXECUTE format('CREATE POLICY "Authenticated read %s" ON %I FOR SELECT TO authenticated USING (true)', tbl, tbl);
    EXECUTE format('CREATE POLICY "Authenticated insert %s" ON %I FOR INSERT TO authenticated WITH CHECK (true)', tbl, tbl);
    EXECUTE format('CREATE POLICY "Authenticated update %s" ON %I FOR UPDATE TO authenticated USING (true) WITH CHECK (true)', tbl, tbl);
    EXECUTE format('CREATE POLICY "Authenticated delete %s" ON %I FOR DELETE TO authenticated USING (true)', tbl, tbl);
    EXECUTE format('CREATE POLICY "Service role %s" ON %I FOR ALL TO service_role USING (true) WITH CHECK (true)', tbl, tbl);
  END LOOP;
END $$;