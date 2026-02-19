-- Migration: Seed costing line templates for DAMP survey type
-- Survey System - Database Schema v6
-- Contains 71 line items across all DAMP costing sections

-- SECTION: PREPARATORY WORK (section_key = 'preparatory_work')
INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'preparatory_work'),
  'remove_radiators_valves',
  'Remove radiators & cap valves',
  'each',
  7.00,
  1.10,
  NULL,
  0.30,
  0.333,
  1.00,
  'standard',
  NULL,
  1
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'preparatory_work'),
  'remove_socket_fronts',
  'Remove socket fronts and isolate',
  'each',
  2.00,
  1.10,
  NULL,
  0.30,
  0.200,
  1.00,
  'standard',
  NULL,
  2
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'preparatory_work'),
  'skirting_board_removal',
  'Skirting board removal & set aside',
  'lm',
  0.10,
  1.10,
  NULL,
  0.30,
  0.070,
  1.00,
  'standard',
  NULL,
  3
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'preparatory_work'),
  'strip_wallpaper',
  'Strip Wall Paper',
  'm2',
  0.50,
  1.10,
  NULL,
  0.30,
  0.500,
  1.00,
  'standard',
  NULL,
  4
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'preparatory_work'),
  'floor_protection_boards',
  'Antinox HD Floor Protection Boards 2.4m x 1.2m',
  'each',
  4.576,
  1.10,
  NULL,
  0.30,
  0.033,
  1.00,
  'standard',
  NULL,
  5
);

-- SECTION: STRIP OUT (section_key = 'strip_out')
INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'strip_out'),
  'remove_plaster_walls',
  'Remove plaster/render (Walls)',
  'm2',
  0.00,
  1.10,
  NULL,
  0.00,
  0.300,
  1.00,
  'standard',
  NULL,
  6
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'strip_out'),
  'remove_stud_walls',
  'Removal of stud walls etc (Bag & cart away)',
  'm2',
  0.00,
  1.10,
  NULL,
  0.00,
  0.400,
  1.00,
  'standard',
  NULL,
  7
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'strip_out'),
  'plaster_removal_ceilings',
  'Plaster & stud Removal (Ceilings)',
  'm2',
  0.00,
  1.10,
  NULL,
  0.00,
  0.800,
  1.00,
  'standard',
  NULL,
  8
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'strip_out'),
  'strip_timber_floor_gf',
  'Strip out existing timber floor (GF)',
  'm2',
  0.00,
  1.10,
  NULL,
  0.00,
  0.500,
  1.00,
  'standard',
  NULL,
  9
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'strip_out'),
  'scrape_subfloors',
  'Scrape back/clear sub floors',
  'm2',
  0.00,
  1.10,
  NULL,
  0.00,
  0.250,
  1.00,
  'standard',
  NULL,
  10
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'strip_out'),
  'bag_cart_debris',
  'Bag up debris & cart outside',
  'bags',
  1.00,
  1.10,
  NULL,
  0.30,
  0.010,
  1.00,
  'bag_and_cart',
  '{"auto_from": "strip_out_areas", "multiplier": 2}',
  11
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'strip_out'),
  'licensed_disposal',
  'Disposal via licensed transfer agent',
  'bags',
  0.00,
  1.10,
  NULL,
  0.30,
  0.000,
  1.00,
  'tiered_disposal',
  '{"min_charge": 40, "threshold": 20, "per_bag_over": 2}',
  12
);

-- SECTION: DPC TRADITIONAL (section_key = 'dpc_traditional')
INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'dpc_traditional'),
  'dpc_injection_traditional',
  'DPC Installation - Traditional',
  'lm',
  0.00,
  1.10,
  NULL,
  0.30,
  0.350,
  1.00,
  'dpc_injection',
  '{"base_cream_cost": 13.93, "cream_divisor": 1.15, "drill_cost": 4.29, "holes_per_meter": 6}',
  13
);

-- SECTION: DPC DIGITAL (section_key = 'dpc_digital')
INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'dpc_digital'),
  'dpc_installation_digital',
  'DPC Installation - Digital (Mursec Eco)',
  'each',
  650.00,
  1.10,
  NULL,
  0.154,
  1.000,
  1.00,
  'digital_dpc',
  '{"base_unit_cost": 650}',
  14
);

-- SECTION: WALL MEMBRANE (section_key = 'wall_membrane')
INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'wall_membrane'),
  'wall_membrane_1m',
  'Wall membrane CM3 - 1m',
  'm2',
  0.00,
  1.10,
  5.00,
  0.30,
  0.300,
  1.00,
  'ceiling_coverage',
  '{"coverage_rate": 5, "cost_per_coverage_unit": 4.166}',
  15
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'wall_membrane'),
  'wall_membrane_1_2m',
  'Wall membrane CM3 - 1.2m',
  'm2',
  0.00,
  1.10,
  5.00,
  0.30,
  0.300,
  1.00,
  'ceiling_coverage',
  '{"coverage_rate": 5, "cost_per_coverage_unit": 4.445}',
  16
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'wall_membrane'),
  'wall_membrane_2m',
  'Wall membrane CM3 - 2m',
  'm2',
  0.00,
  1.10,
  5.00,
  0.30,
  0.300,
  1.00,
  'ceiling_coverage',
  '{"coverage_rate": 5, "cost_per_coverage_unit": 4.417}',
  17
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'wall_membrane'),
  'membrane_plugs',
  'Membrane plugs',
  'm2',
  0.00,
  1.10,
  2.00,
  0.30,
  0.250,
  1.00,
  'ceiling_coverage',
  '{"coverage_rate": 2, "cost_per_coverage_unit": 0.933}',
  18
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'wall_membrane'),
  'sealing_tape',
  'Sealing Tape',
  'lm',
  0.00,
  1.10,
  22.00,
  0.30,
  0.100,
  1.00,
  'ceiling_coverage',
  '{"coverage_rate": 22, "cost_per_coverage_unit": 0.871}',
  19
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'wall_membrane'),
  'technoseal',
  'Technoseal',
  'lm',
  1.00,
  1.10,
  NULL,
  0.30,
  0.017,
  1.00,
  'standard',
  NULL,
  20
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'wall_membrane'),
  'wall_floor_fillet_joint',
  'Wall/floor fillet joint',
  'lm',
  0.00,
  1.10,
  12.00,
  0.30,
  0.300,
  1.00,
  'ceiling_coverage',
  '{"coverage_rate": 12, "cost_per_coverage_unit": 2.043}',
  21
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'wall_membrane'),
  'overtape',
  'Overtape',
  'lm',
  0.00,
  1.10,
  5.00,
  0.30,
  0.100,
  1.00,
  'ceiling_coverage',
  '{"coverage_rate": 5, "cost_per_coverage_unit": 2.166}',
  22
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'wall_membrane'),
  'fixing_rope',
  'Fixing Rope',
  'lm',
  0.00,
  1.10,
  5.00,
  0.30,
  0.100,
  1.00,
  'ceiling_coverage',
  '{"coverage_rate": 5, "cost_per_coverage_unit": 2.066}',
  23
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'wall_membrane'),
  'difficulty_hours_walls',
  'Difficulty hours (walls)',
  'hours',
  0.00,
  1.10,
  NULL,
  0.00,
  1.000,
  1.00,
  'standard',
  NULL,
  24
);

-- SECTION: CEMENTITIOUS TANKING (section_key = 'cementitious_tanking')
INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'cementitious_tanking'),
  'dubbing_out_coat',
  'Dubbing out coat (sand/cement/SBR)',
  'm2',
  0.00,
  1.10,
  NULL,
  0.30,
  0.300,
  1.00,
  'compound_material',
  '{"components": [{"product_key": "sbr_primer", "cost": 16.66, "per_unit": 8}, {"product_key": "sharp_sand", "cost": 2.79, "per_unit": 4}, {"product_key": "cement", "cost": 7.69, "per_unit": 4}], "coverage_unit": 2}',
  25
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'cementitious_tanking'),
  'tankingslurry_2coat',
  '2 coat tanking slurry',
  'm2',
  0.00,
  1.10,
  7.00,
  0.30,
  0.350,
  1.00,
  'ceiling_coverage',
  '{"coverage_rate": 7, "cost_per_coverage_unit": 3.100}',
  26
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'cementitious_tanking'),
  'renovating_plaster',
  'Renovating plaster',
  'm2',
  0.00,
  1.10,
  3.00,
  0.30,
  0.300,
  1.00,
  'ceiling_coverage',
  '{"coverage_rate": 3, "cost_per_coverage_unit": 5.417}',
  27
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'cementitious_tanking'),
  'wall_floor_fillet_tanking',
  'Wall/floor fillet joint (tanking)',
  'lm',
  0.00,
  1.10,
  12.00,
  0.30,
  0.300,
  1.00,
  'ceiling_coverage',
  '{"coverage_rate": 12, "cost_per_coverage_unit": 2.043}',
  28
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'cementitious_tanking'),
  'difficulty_hours_tanking',
  'Difficulty hours (tanking)',
  'hours',
  0.00,
  1.10,
  NULL,
  0.00,
  1.000,
  1.00,
  'standard',
  NULL,
  29
);

-- SECTION: FLOOR RESIN (section_key = 'floor_resin')
INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'floor_resin'),
  'resin_primer_ep40',
  'EP40 2 Pack resin Primer',
  'm2',
  0.00,
  1.10,
  30.00,
  0.30,
  0.040,
  1.00,
  'ceiling_coverage',
  '{"coverage_rate": 30, "cost_per_coverage_unit": 1.890}',
  30
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'floor_resin'),
  'resin_topcoat_ep40',
  'EP40 2 Pack resin top coat',
  'm2',
  0.00,
  1.10,
  30.00,
  0.30,
  0.040,
  1.00,
  'ceiling_coverage',
  '{"coverage_rate": 30, "cost_per_coverage_unit": 2.123}',
  31
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'floor_resin'),
  'wall_floor_fillet_resin',
  'Wall/floor fillet joint (resin)',
  'lm',
  0.00,
  1.10,
  12.00,
  0.30,
  0.300,
  1.00,
  'ceiling_coverage',
  '{"coverage_rate": 12, "cost_per_coverage_unit": 2.043}',
  32
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'floor_resin'),
  'grip_grit',
  'Grip grit',
  'm2',
  0.00,
  1.10,
  25.00,
  0.30,
  0.010,
  1.00,
  'ceiling_coverage',
  '{"coverage_rate": 25, "cost_per_coverage_unit": 0.083}',
  33
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'floor_resin'),
  'difficulty_hours_resin',
  'Difficulty hours (resin)',
  'hours',
  0.00,
  1.10,
  NULL,
  0.00,
  1.000,
  1.00,
  'standard',
  NULL,
  34
);

-- SECTION: PLASTERING (section_key = 'plastering')
INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'plastering'),
  'construct_stud_wall',
  'Construct stud wall to perimeter',
  'm2',
  14.00,
  1.10,
  NULL,
  0.30,
  0.400,
  1.00,
  'standard',
  NULL,
  35
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'plastering'),
  'plaster_boarding',
  'Plaster boarding (inc dab/screws)',
  'm2',
  9.76,
  1.10,
  NULL,
  0.30,
  0.400,
  1.00,
  'standard',
  NULL,
  36
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'plastering'),
  'warmline_iwi',
  'Warmline Internal Wall Insulation',
  'm2',
  0.00,
  1.10,
  3.56,
  0.30,
  0.000,
  1.00,
  'ceiling_coverage',
  '{"coverage_rate": 3.5625, "cost_per_coverage_unit": 27.60}',
  37
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'plastering'),
  'skimming_walls',
  'Skimming walls (multi finish plaster)',
  'm2',
  0.00,
  1.10,
  10.00,
  0.30,
  0.000,
  1.00,
  'ceiling_coverage',
  '{"coverage_rate": 10, "cost_per_coverage_unit": 1.208}',
  38
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'plastering'),
  'plastering_stop_bead',
  'Plastering Stop Bead 3m',
  'each',
  1.10,
  1.10,
  NULL,
  0.30,
  0.000,
  1.00,
  'standard',
  NULL,
  39
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'plastering'),
  'thin_coat_angle_2_4m',
  'Thin Coat Angle/Corner Bead 2.4m',
  'each',
  1.826,
  1.10,
  NULL,
  0.30,
  0.000,
  1.00,
  'standard',
  NULL,
  40
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'plastering'),
  'thin_coat_angle_3m',
  'Thin Coat Angle/Corner Bead 3m',
  'each',
  2.75,
  1.10,
  NULL,
  0.30,
  0.000,
  1.00,
  'standard',
  NULL,
  41
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'plastering'),
  'difficulty_hours_plastering',
  'Difficulty hours (plastering)',
  'hours',
  0.00,
  1.10,
  NULL,
  0.00,
  1.000,
  1.00,
  'standard',
  NULL,
  42
);

-- SECTION: FLOOR JOISTS & DECKING (section_key = 'floor_joists_decking')
INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'floor_joists_decking'),
  'joists_100x50',
  'Joists 100x50',
  'lm',
  5.46,
  1.10,
  NULL,
  0.30,
  0.250,
  1.00,
  'standard',
  NULL,
  43
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'floor_joists_decking'),
  'joists_125x50',
  'Joists 125x50',
  'lm',
  6.50,
  1.10,
  NULL,
  0.30,
  0.250,
  1.00,
  'standard',
  NULL,
  44
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'floor_joists_decking'),
  'joists_150x50',
  'Joists 150x50',
  'lm',
  7.70,
  1.10,
  NULL,
  0.30,
  0.250,
  1.00,
  'standard',
  NULL,
  45
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'floor_joists_decking'),
  'joists_175x50',
  'Joists 175x50',
  'lm',
  8.00,
  1.10,
  NULL,
  0.30,
  0.300,
  1.00,
  'standard',
  NULL,
  46
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'floor_joists_decking'),
  'joists_200x50',
  'Joists 200x50',
  'lm',
  8.90,
  1.10,
  NULL,
  0.30,
  0.300,
  1.00,
  'standard',
  NULL,
  47
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'floor_joists_decking'),
  'joists_225x50',
  'Joists 225x50',
  'lm',
  9.50,
  1.10,
  NULL,
  0.30,
  0.400,
  1.00,
  'standard',
  NULL,
  48
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'floor_joists_decking'),
  'treat_endwrap_joist',
  'Treat and endwrap joist',
  'each',
  3.00,
  1.10,
  NULL,
  0.30,
  0.150,
  1.00,
  'standard',
  NULL,
  49
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'floor_joists_decking'),
  'wall_plate_100x25',
  'Wall plate 100x25',
  'each',
  4.84,
  1.10,
  NULL,
  0.30,
  0.400,
  1.00,
  'standard',
  NULL,
  50
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'floor_joists_decking'),
  'bower_beams',
  'Bower beams (pair)',
  'pairs',
  36.00,
  1.10,
  NULL,
  0.30,
  1.500,
  1.00,
  'standard',
  NULL,
  51
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'floor_joists_decking'),
  'flitch_plates',
  'Flitch plates (pair)',
  'pairs',
  42.00,
  1.10,
  NULL,
  0.30,
  1.500,
  1.00,
  'standard',
  NULL,
  52
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'floor_joists_decking'),
  'difficulty_hours_joists',
  'Difficulty hours (joists)',
  'hours',
  0.00,
  1.10,
  NULL,
  0.00,
  1.000,
  1.00,
  'standard',
  NULL,
  53
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'floor_joists_decking'),
  'weyrock_flooring_18mm',
  'Weyrock flooring 18mm',
  'm2',
  18.00,
  1.10,
  NULL,
  0.30,
  0.400,
  1.00,
  'standard',
  NULL,
  54
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'floor_joists_decking'),
  'weyrock_flooring_22mm',
  'Weyrock flooring 22mm',
  'm2',
  22.00,
  1.10,
  NULL,
  0.30,
  0.425,
  1.00,
  'standard',
  NULL,
  55
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'floor_joists_decking'),
  'std_tongue_groove_floorboards',
  'Std T&G Floorboards',
  'm2',
  46.30,
  1.10,
  NULL,
  0.30,
  0.600,
  1.00,
  'standard',
  NULL,
  56
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'floor_joists_decking'),
  'victorian_tongue_groove_floorboards',
  'Victorian T&G Floorboards',
  'm2',
  52.80,
  1.10,
  NULL,
  0.30,
  0.600,
  1.00,
  'standard',
  NULL,
  57
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'floor_joists_decking'),
  'engineered_flooring_sheet',
  'Engineered Flooring sheet',
  'm2',
  49.99,
  1.10,
  NULL,
  0.30,
  0.400,
  1.00,
  'standard',
  NULL,
  58
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'floor_joists_decking'),
  'structural_engineered_flooring_sheet',
  'Structural Engineered Flooring sheet',
  'm2',
  52.80,
  1.10,
  NULL,
  0.30,
  0.900,
  1.00,
  'standard',
  NULL,
  59
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'floor_joists_decking'),
  'insulation_suspended_flooring',
  'Insulation to suspended flooring',
  'm2',
  6.80,
  1.10,
  NULL,
  0.30,
  0.200,
  1.00,
  'standard',
  NULL,
  60
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'floor_joists_decking'),
  'difficulty_hours_decking',
  'Difficulty hours (decking)',
  'hours',
  0.00,
  1.10,
  NULL,
  0.00,
  1.000,
  1.00,
  'standard',
  NULL,
  61
);

-- SECTION: AIRBRICKS (section_key = 'airbricks')
INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'airbricks'),
  'clean_out_airbrick',
  'Clean out airbrick/fit new face',
  'each',
  16.00,
  1.10,
  NULL,
  0.30,
  0.500,
  1.00,
  'standard',
  NULL,
  62
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'airbricks'),
  'lift_upgrade_airbrick',
  'Lift/upgrade existing airbrick',
  'each',
  16.00,
  1.10,
  NULL,
  0.30,
  0.800,
  1.00,
  'standard',
  NULL,
  63
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'airbricks'),
  'install_additional_airbrick',
  'Install additional airbrick',
  'each',
  16.00,
  1.10,
  NULL,
  0.30,
  2.000,
  1.00,
  'standard',
  NULL,
  64
);

-- SECTION: SPRAY TREATMENTS (section_key = 'spray_treatments')
INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'spray_treatments'),
  'fog_subfloor_antifungal',
  'Fog sub floor void with anti fungal treatment',
  'm2',
  0.00,
  1.10,
  100.00,
  0.30,
  0.200,
  1.00,
  'ceiling_coverage',
  '{"coverage_rate": 100, "cost_per_coverage_unit": 0.210}',
  65
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'spray_treatments'),
  'difficulty_hours_spray',
  'Difficulty hours (spray)',
  'hours',
  0.00,
  1.10,
  NULL,
  0.00,
  1.000,
  1.00,
  'standard',
  NULL,
  66
);

-- SECTION: DRAINS (section_key = 'drains')
INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'drains'),
  'aco_drain_lm',
  'Aco Drain per linear meter',
  'lm',
  8.00,
  1.10,
  NULL,
  0.30,
  1.000,
  1.00,
  'standard',
  NULL,
  67
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'drains'),
  'french_drain_lm',
  'French Drain per linear meter',
  'lm',
  2.41,
  1.10,
  NULL,
  0.30,
  0.667,
  1.00,
  'standard',
  NULL,
  68
);

-- SECTION: AQUABAN (section_key = 'aquaban')
INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'aquaban'),
  'aquaban_system',
  'Aquaban water repellent system',
  'm2',
  0.00,
  1.10,
  25.00,
  0.30,
  0.050,
  1.00,
  'ceiling_coverage',
  '{"coverage_rate": 25, "cost_per_coverage_unit": 0.500}',
  69
);

-- SECTION: ASBESTOS TESTING (section_key = 'asbestos_testing')
INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'asbestos_testing'),
  'asbestos_testing',
  'Asbestos Testing',
  'each',
  30.00,
  1.10,
  NULL,
  0.30,
  0.640,
  1.00,
  'fixed_price',
  NULL,
  70
);

-- SECTION: SKIP HIRE (section_key = 'skip_hire')
INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'damp' AND section_key = 'skip_hire'),
  'skip_hire',
  'Rubbish removal skips',
  'each',
  270.00,
  1.10,
  NULL,
  0.30,
  0.000,
  1.00,
  'skip_hire',
  NULL,
  71
);
