-- Migration: Seed costing sections for all 4 survey types
-- Date: 2026-02-18
-- Source: Workbook forensic analysis (Costing sheets, all 4 workbooks)
-- Depends on: 20260218000003_new_costing_engine.sql
-- Rollback: DELETE FROM costing_sections;

-- ============================================================
-- DAMP SECTIONS (16 sections)
-- ============================================================

INSERT INTO costing_sections (survey_type, section_key, section_name, display_order, is_optional) VALUES
  ('damp', 'preparatory_work', 'Preparatory Work', 1, false),
  ('damp', 'strip_out', 'Stripping Out', 2, false),
  ('damp', 'dpc_traditional', 'Walls — DPC Traditional', 3, false),
  ('damp', 'dpc_digital', 'Walls — DPC Digital (Mursec)', 4, true),
  ('damp', 'wall_membrane', 'Walls — Membrane CM3 System', 5, false),
  ('damp', 'cementitious_tanking', 'Cementitious Tanking System', 6, false),
  ('damp', 'floor_resin', 'Floor — Liquid Resin Membranes', 7, false),
  ('damp', 'plastering', 'Plastering & Finishing', 8, false),
  ('damp', 'floor_joists_decking', 'Floor Joists & Floor Decking', 9, false),
  ('damp', 'airbricks', 'Airbricks', 10, false),
  ('damp', 'spray_treatments', 'Spray Treatments', 11, false),
  ('damp', 'drains', 'Drains', 12, true),
  ('damp', 'aquaban', 'External Wall — Aquaban Water Repellent', 13, true),
  ('damp', 'asbestos_testing', 'Asbestos Testing', 14, true),
  ('damp', 'skip_hire', 'Skip Hire', 15, false),
  ('damp', 'project_overheads', 'Project Specific Overheads', 16, false);

-- ============================================================
-- CONDENSATION SECTIONS (12 sections)
-- ============================================================

INSERT INTO costing_sections (survey_type, section_key, section_name, display_order, is_optional) VALUES
  ('condensation', 'piv_loft', 'PIV Loft Dryaire System', 1, false),
  ('condensation', 'piv_wall', 'PIV Wall Mounted Dryaire System', 2, false),
  ('condensation', 'humidistat_fan', 'Trickle & Boost Humidistat Fan', 3, false),
  ('condensation', 'passive_vent', 'Dryaire Cpass Passive Vent', 4, false),
  ('condensation', 'dryaire_cvent', 'Dryaire CVent', 5, false),
  ('condensation', 'joinery_ducting', 'Joinery — Ducting Boxwork', 6, true),
  ('condensation', 'loft_hatch_new', 'New Loft Hatch & Ladder', 7, true),
  ('condensation', 'loft_hatch_enlarge', 'Enlarge Existing Loft Hatch', 8, true),
  ('condensation', 'mould_treatment', 'Mould Treatment', 9, false),
  ('condensation', 'asbestos_testing', 'Asbestos Testing', 10, true),
  ('condensation', 'airbricks', 'Airbricks', 11, false),
  ('condensation', 'skip_hire', 'Skip Hire', 12, false);

-- ============================================================
-- TIMBER SECTIONS (10 sections)
-- ============================================================

INSERT INTO costing_sections (survey_type, section_key, section_name, display_order, is_optional) VALUES
  ('timber', 'preparatory_work', 'Preparatory Work', 1, false),
  ('timber', 'strip_out', 'Stripping Out', 2, false),
  ('timber', 'wall_membrane', 'Walls — Membrane CM3 System', 3, false),
  ('timber', 'cementitious_tanking', 'Cementitious Tanking System', 4, false),
  ('timber', 'floor_resin', 'Floor — Liquid Resin Membranes', 5, false),
  ('timber', 'plastering', 'Plastering & Finishing', 6, false),
  ('timber', 'floor_joists_decking', 'Floor Joists & Floor Decking', 7, false),
  ('timber', 'timber_treatments', 'Timber Treatments', 8, false),
  ('timber', 'airbricks', 'Airbricks', 9, false),
  ('timber', 'skip_hire', 'Skip Hire', 10, false);

-- ============================================================
-- WOODWORM SECTIONS (6 sections)
-- ============================================================

INSERT INTO costing_sections (survey_type, section_key, section_name, display_order, is_optional) VALUES
  ('woodworm', 'preparatory_work', 'Preparatory Work', 1, false),
  ('woodworm', 'strip_out', 'Stripping Out', 2, false),
  ('woodworm', 'plastering', 'Plastering & Finishing', 3, false),
  ('woodworm', 'floor_joists_decking', 'Floor Joists & Floor Decking', 4, false),
  ('woodworm', 'timber_treatments', 'Timber Treatments', 5, false),
  ('woodworm', 'airbricks', 'Airbricks', 6, false),
  ('woodworm', 'skip_hire', 'Skip Hire', 7, false);