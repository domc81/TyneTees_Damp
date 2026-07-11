-- Timber dubbing (v33 R58) is a FLAT 7x1.1 = 7.70/m2 constant — not the
-- damp compound mix (migration 3 wrongly applied damp's model to timber).
BEGIN;
UPDATE costing_line_templates SET cost_formula = 'standard', base_unit_cost = 7.7,
  wastage_factor = 1.0, formula_params = NULL WHERE id = '6c5aa1a3-8ad6-4632-987b-a050a1b945bd';
COMMIT;
