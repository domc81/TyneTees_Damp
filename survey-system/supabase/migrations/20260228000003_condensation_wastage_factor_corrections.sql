-- =============================================================================
-- Wastage Factor Corrections — ALL Condensation templates
--
-- Problem: The seed data applied wastage_factor=1.100 (10% wastage) to ALL
-- 35 condensation templates as a blanket default. But the Condensation workbook
-- does NOT apply wastage in the TT pricing columns (K11 = qty × adjusted_cost
-- × (1+markup)). The ×1.1 factor only exists in Column U (Contractor Materials)
-- which is a separate subcontractor costing track, not the customer-facing price.
--
-- Impact: Every standard-formula condensation item overcharges materials by 10%.
-- For a typical PIV loft install + extraction fan + mould treatment scenario,
-- this adds ~£63 in overcharges to a ~£1,665 job.
--
-- Fix: Set wastage_factor=1.000 for ALL condensation templates.
-- - 27 standard items: directly affected (10% overcharge removed)
-- - 3 fixed_price items: engine ignores wastage, data integrity fix
-- - 1 skip_hire item: engine ignores wastage, data integrity fix
--
-- Verification: With wastage_factor=1.000, engine output matches workbook
-- exactly for all traced line items (see audit in commit message).
--
-- Reference: Condensation workbook v37 Costing sheet R21-R88
-- =============================================================================

BEGIN;

-- ─────────────────────────────────────────────────────────────────────────────
-- Bulk fix: ALL condensation templates → wastage_factor = 1.000
-- Covers all 35 templates across 12 sections.
-- ─────────────────────────────────────────────────────────────────────────────

UPDATE costing_line_templates clt
SET wastage_factor = 1.000
FROM costing_sections cs
WHERE clt.section_id = cs.id
AND cs.survey_type = 'condensation'
AND clt.wastage_factor != 1.000;

COMMIT;
