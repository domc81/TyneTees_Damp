-- Migration: Minor fixes from costings audit (MINOR-5 and MINOR-6)
-- Date: 2026-02-28
--
-- Issues addressed:
--   MINOR-5: Technoseal labour rate rounding
--     Workbook uses 1/60 = 0.01667 hrs/LM.
--     DB stored 0.0170 (rounded incorrectly). Corrected to 0.0167 (4dp precision).
--     Affects damp.technoseal and timber.technoseal_lm.
--     Impact: ~£0.61 difference per 30LM treated.
--
--   MINOR-6: Orphaned legacy materials_catalog entry
--     Row id='mursec_eco_unit' (string ID, no product_key) is a legacy record
--     predating the UUID-based catalog. It is NOT referenced by any
--     costing_line_templates formula_params. The pricing engine reads Mursec
--     Eco cost from pricing_config.digital_dpc_base_cost (650.00), not this row.
--     Safe to delete.
--
-- Issues confirmed as already correct (no action):
--   MINOR-1: materials_catalog mursec_eco_unit.unit_cost = 650.00 ✓
--   MINOR-2: costing_sections mould_treatment.is_optional = true ✓
--   MINOR-3: PIV Loft adjustment — handled by section adjustment UI, no DB seed needed
--   MINOR-4: Technoseal wastage_factor = 1.000 ✓
--   MINOR-7: Sub-penny rounding discrepancies — acceptable, no change

-- ============================================================
-- MINOR-5: Technoseal labour rate — 0.0170 → 0.0167 (1/60 hrs/LM)
-- ============================================================

UPDATE costing_line_templates
SET labour_rate_per_unit = 0.0167
WHERE line_key IN ('technoseal', 'technoseal_lm')
  AND labour_rate_per_unit = 0.0170;

-- ============================================================
-- MINOR-6: Delete orphaned legacy materials_catalog entry
-- ============================================================

DELETE FROM materials_catalog
WHERE id = 'mursec_eco_unit';
