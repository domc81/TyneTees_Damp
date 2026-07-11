-- Full-coverage data fixes: warmline pack price scale, asbestos quantity
-- scaling (was fixed_price; workbook K = F x I x (1+J) scales), dubbing
-- compound components per 2m2 pack. Workbook-derived, harness-gated.
BEGIN;
-- isotherm_tiwi: catalog held the PER-M2 price; engine divides catalog by
-- coverage (3.5625 = half-roll step), so the catalog must hold the
-- half-roll pack price: 196.67/2 = 98.335 -> /3.5625 = 27.6028/m2 exact
UPDATE materials_catalog SET unit_cost = 98.335 WHERE product_key = 'isotherm_tiwi';
-- damp asbestos_testing: workbook scales with quantity (K = F x I x (1+J))
UPDATE costing_line_templates SET cost_formula = 'standard', wastage_factor = 1.0 WHERE id = '0719cf16-fa3b-4a69-bf2b-e77376808c1d';
-- damp dubbing_out_coat: mix per 2m2 pack = 0.25xSBR + 2xsand + 0.5xcement (=13.59), x1.1
UPDATE costing_line_templates SET wastage_factor = 1.1, formula_params = '{"coverage_unit": 2, "components": [{"product_key": "sbr_latex_5ltr", "qty_per_coverage": 0.25}, {"product_key": "building_sand", "qty_per_coverage": 2.0}, {"product_key": "cement_25kg", "qty_per_coverage": 0.5}]}'::jsonb WHERE id = '353d2bed-81ac-40e4-a829-c6ab4898ae20';
-- condensation asbestos_testing: workbook scales with quantity (K = F x I x (1+J))
UPDATE costing_line_templates SET cost_formula = 'standard', wastage_factor = 1.0 WHERE id = '699ac3ee-d1d1-40f9-b001-30b121ee4975';
-- timber dubbing_out_coat_sandcementsbr: mix per 2m2 pack = 0.25xSBR + 2xsand + 0.5xcement (=13.59), x1.1
UPDATE costing_line_templates SET wastage_factor = 1.1, formula_params = '{"coverage_unit": 2, "components": [{"product_key": "sbr_latex_5ltr", "qty_per_coverage": 0.25}, {"product_key": "building_sand", "qty_per_coverage": 2.0}, {"product_key": "cement_25kg", "qty_per_coverage": 0.5}]}'::jsonb WHERE id = '6c5aa1a3-8ad6-4632-987b-a050a1b945bd';
-- damp warmline_iwi_adhesive: workbook x1.1 inside H
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = '954dc174-a219-42b3-b53e-3efb71fc2341';
-- timber warmline_iwi_adhesive: workbook x1.1 inside H
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = 'c88864e1-1794-468c-a88c-005c02c4905e';
-- timber warmline_internal_wall_insulation: workbook x1.1 inside H; labour 1/3 h/m2 (min 2.5h rule in params)
UPDATE costing_line_templates SET wastage_factor = 1.1, labour_rate_per_unit = 0.33333333 WHERE id = 'e5139456-4ace-4bdd-9f0c-7a5bfa2567b6';
-- damp warmline_iwi: workbook x1.1 inside H; labour 1/3 h/m2 (min 2.5h rule in params)
UPDATE costing_line_templates SET wastage_factor = 1.1, labour_rate_per_unit = 0.33333333 WHERE id = 'ef24b002-dfc5-4d7e-88e5-64e75fb1fd73';
COMMIT;
