-- =============================================================================
-- CRITICAL-2 Fix: Populate zero-value Timber/Woodworm costing templates
--
-- Problem: The seed data (00000000000001_seed_data.sql) copied Timber/Woodworm
-- section templates from the Damp equivalents but left material costs and
-- labour rates at 0.00 for ~14 line items. The equivalent Damp templates had
-- correct non-zero values.
--
-- This migration enforces the correct final values using section_key + line_key
-- matching (not UUIDs) so it is portable across environments and idempotent.
--
-- Values sourced from:
--   - COSTINGS_AUDIT_REPORT.md (CRITICAL-2 section)
--   - Timber workbook v33: Costing sheet column H (material cost/unit),
--     column I (labour hours/unit)
--   - Woodworm workbook v26: same columns
--   - Equivalent Damp templates (already correct in seed data)
--
-- NOTE: The original CRITICAL-2 fixes were applied via migration
-- 20260227000002_costings_data_corrections.sql (UUID-based) and subsequently
-- refined by 20260228000001_formula_type_corrections.sql (ceiling_coverage
-- alignment). This migration re-states those fixes in portable form.
--
-- Ceiling_coverage items (EP40s, renovating plaster):
--   For these items base_unit_cost=0 is CORRECT — the material cost is stored
--   in formula_params.cost_per_coverage_unit. Setting the formula_params here
--   ensures the correct per-coverage-unit cost even if a prior migration is
--   missing or re-run in isolation.
--
-- Standard formula items:
--   base_unit_cost stores the workbook H8 value (pre-markup, incl. any
--   ×1.1 wastage baked into the workbook figure).
--   wastage_factor for these items is 1.000 (see migration 20260228000002).
-- =============================================================================

BEGIN;

-- ─────────────────────────────────────────────────────────────────────────────
-- SECTION: preparatory_work — Timber + Woodworm
-- Items had labour_rate_per_unit=0.0000 in seed; Damp equivalents were correct.
-- ─────────────────────────────────────────────────────────────────────────────

-- Remove radiators & cap valves
-- Workbook: base_unit_cost=7.00 (consumables), labour=0.333 hrs/radiator
UPDATE costing_line_templates
SET base_unit_cost        = 7.0000,
    labour_rate_per_unit  = 0.3330
WHERE section_id IN (
  SELECT id FROM costing_sections
  WHERE survey_type IN ('timber', 'woodworm')
    AND section_key = 'preparatory_work'
)
AND line_key = 'remove_radiators_cap_valves';

-- Remove socket fronts & isolate
-- Workbook: base_unit_cost=2.00 (blanking plates), labour=0.200 hrs/socket
UPDATE costing_line_templates
SET base_unit_cost        = 2.0000,
    labour_rate_per_unit  = 0.2000
WHERE section_id IN (
  SELECT id FROM costing_sections
  WHERE survey_type IN ('timber', 'woodworm')
    AND section_key = 'preparatory_work'
)
AND line_key = 'remove_socket_fronts_and_isolate';

-- Antinox HD Floor Protection Boards 2.4m × 1.2m
-- Workbook: base_unit_cost=4.576 (per board), labour=0.033 hrs/board
UPDATE costing_line_templates
SET base_unit_cost        = 4.5760,
    labour_rate_per_unit  = 0.0330
WHERE section_id IN (
  SELECT id FROM costing_sections
  WHERE survey_type IN ('timber', 'woodworm')
    AND section_key = 'preparatory_work'
)
AND line_key = 'antinox_hd_floor_protection_boards_24m_x_12m';


-- ─────────────────────────────────────────────────────────────────────────────
-- SECTION: strip_out — Timber only
-- Remove carpet/tiles/overlays: labour-only item (no material purchase).
-- base_unit_cost=0 is correct; labour was missing.
-- ─────────────────────────────────────────────────────────────────────────────

-- Remove carpet/tiles/overlays (Timber only — Woodworm does not have this)
-- Workbook: labour=0.167 hrs/m²
UPDATE costing_line_templates
SET labour_rate_per_unit = 0.1670
WHERE section_id IN (
  SELECT id FROM costing_sections
  WHERE survey_type = 'timber'
    AND section_key = 'strip_out'
)
AND line_key = 'remove_carpettilesoverlays';


-- ─────────────────────────────────────────────────────────────────────────────
-- SECTION: cementitious_tanking — Timber only
-- Dubbing out coat: Timber uses standard formula with pre-computed per-m² cost.
-- (Damp uses compound_material; Timber workbook gives H8=7.70/m².)
-- ─────────────────────────────────────────────────────────────────────────────

-- Dubbing out coat (sand/cement/SBR) — Timber
-- Workbook: H8=7.70/m² (pre-computed blended material cost), labour=0.300 hrs/m²
UPDATE costing_line_templates
SET base_unit_cost        = 7.7000,
    labour_rate_per_unit  = 0.3000
WHERE section_id IN (
  SELECT id FROM costing_sections
  WHERE survey_type = 'timber'
    AND section_key = 'cementitious_tanking'
)
AND line_key = 'dubbing_out_coat_sandcementsbr';

-- Renovating plaster — Timber (ceiling_coverage formula)
-- cost_per_coverage_unit = £16.25 per 20 kg bag / 3 m² coverage = £5.417/m²
-- base_unit_cost=0 is CORRECT for ceiling_coverage (cost lives in formula_params)
UPDATE costing_line_templates
SET base_unit_cost   = 0.0000,
    coverage_rate    = 3.0000,
    formula_params   = '{"coverage_rate": 3, "cost_per_coverage_unit": 5.417}'::jsonb,
    cost_formula     = 'ceiling_coverage'
WHERE section_id IN (
  SELECT id FROM costing_sections
  WHERE survey_type = 'timber'
    AND section_key = 'cementitious_tanking'
)
AND line_key = 'renovating_plaster';


-- ─────────────────────────────────────────────────────────────────────────────
-- SECTION: floor_resin — Timber only
-- EP40 items: ceiling_coverage formula, cost in formula_params.
-- Workbook: ROUNDUP(area/30, 0) tins × tin price ÷ 30 m² per tin.
-- base_unit_cost=0 is CORRECT for ceiling_coverage.
-- ─────────────────────────────────────────────────────────────────────────────

-- EP40 2 Pack Resin Primer — Timber
-- Tin price=£56.70, coverage=30 m² → cost_per_coverage_unit=1.890/m²
UPDATE costing_line_templates
SET base_unit_cost   = 0.0000,
    coverage_rate    = 30.0000,
    formula_params   = '{"coverage_rate": 30, "cost_per_coverage_unit": 1.890}'::jsonb,
    cost_formula     = 'ceiling_coverage'
WHERE section_id IN (
  SELECT id FROM costing_sections
  WHERE survey_type = 'timber'
    AND section_key = 'floor_resin'
)
AND line_key = 'ep40_2_pack_resin_primer';

-- EP40 2 Pack Resin Top Coat — Timber
-- Tin price=£63.70, coverage=30 m² → cost_per_coverage_unit=2.123/m²
UPDATE costing_line_templates
SET base_unit_cost   = 0.0000,
    coverage_rate    = 30.0000,
    formula_params   = '{"coverage_rate": 30, "cost_per_coverage_unit": 2.123}'::jsonb,
    cost_formula     = 'ceiling_coverage'
WHERE section_id IN (
  SELECT id FROM costing_sections
  WHERE survey_type = 'timber'
    AND section_key = 'floor_resin'
)
AND line_key = 'ep40_2_pack_resin_top_coat';


-- ─────────────────────────────────────────────────────────────────────────────
-- SECTION: plastering — Timber + Woodworm
-- Plasterboarding had base_unit_cost=0.00; stop_bead and angle beads had
-- base_unit_cost=0.00. Labour for stop/angle beads is 0.00 by design
-- (workbook includes bead fitting labour in skimming rate).
-- ─────────────────────────────────────────────────────────────────────────────

-- Plasterboarding (inc dab/screws)
-- Workbook: H8=9.76/m² (board + dab + screws), labour=0.400 hrs/m²
UPDATE costing_line_templates
SET base_unit_cost        = 9.7600,
    labour_rate_per_unit  = 0.4000
WHERE section_id IN (
  SELECT id FROM costing_sections
  WHERE survey_type IN ('timber', 'woodworm')
    AND section_key = 'plastering'
)
AND line_key = 'plasterboarding_inc_dabscrews';

-- Plastering Stop Bead 3m length
-- Workbook: H8=1.10/length, labour=0.000 (included in skimming rate)
UPDATE costing_line_templates
SET base_unit_cost        = 1.1000,
    labour_rate_per_unit  = 0.0000
WHERE section_id IN (
  SELECT id FROM costing_sections
  WHERE survey_type IN ('timber', 'woodworm')
    AND section_key = 'plastering'
)
AND line_key = 'plastering_stop_bead_3m_length';

-- Plastering Thin Coat Angle/Corner Bead 2.4m length
-- Workbook: H8=1.83/length, labour=0.000 (included in skimming rate)
UPDATE costing_line_templates
SET base_unit_cost        = 1.8300,
    labour_rate_per_unit  = 0.0000
WHERE section_id IN (
  SELECT id FROM costing_sections
  WHERE survey_type IN ('timber', 'woodworm')
    AND section_key = 'plastering'
)
AND line_key = 'plastering_thin_coat_anglecorner_bead_24m_length';

-- Plastering Thin Coat Angle/Corner Bead 3m length
-- Workbook: H8=2.75/length, labour=0.000 (included in skimming rate)
UPDATE costing_line_templates
SET base_unit_cost        = 2.7500,
    labour_rate_per_unit  = 0.0000
WHERE section_id IN (
  SELECT id FROM costing_sections
  WHERE survey_type IN ('timber', 'woodworm')
    AND section_key = 'plastering'
)
AND line_key = 'plastering_thin_coat_anglecorner_bead_3m_length';


-- ─────────────────────────────────────────────────────────────────────────────
-- SECTION: wall_membrane — Timber only
-- Technoseal: had both base_unit_cost=0 and labour=0 in seed.
-- ─────────────────────────────────────────────────────────────────────────────

-- Technoseal LM — Timber
-- Workbook: H8=1.00/LM (per linear metre of membrane), labour=0.017 hrs/LM
UPDATE costing_line_templates
SET base_unit_cost        = 1.0000,
    labour_rate_per_unit  = 0.0170
WHERE section_id IN (
  SELECT id FROM costing_sections
  WHERE survey_type = 'timber'
    AND section_key = 'wall_membrane'
)
AND line_key = 'technoseal_lm';


-- ─────────────────────────────────────────────────────────────────────────────
-- SECTION: timber_treatments — Woodworm only
-- Fogging boarded area: had labour=0 in seed.
-- ─────────────────────────────────────────────────────────────────────────────

-- Fogging boarded area — Woodworm only
-- Workbook: base_unit_cost=0.50/m² (chemical cost), labour=0.023 hrs/m²
UPDATE costing_line_templates
SET base_unit_cost        = 0.5000,
    labour_rate_per_unit  = 0.0230
WHERE section_id IN (
  SELECT id FROM costing_sections
  WHERE survey_type = 'woodworm'
    AND section_key = 'timber_treatments'
)
AND line_key = 'fogging_boarded_area';


COMMIT;
