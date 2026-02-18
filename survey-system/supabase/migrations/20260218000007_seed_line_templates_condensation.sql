-- Migration: Seed costing line templates for CONDENSATION survey type
-- Date: 2026-02-18
-- Source: CONDENSATION_WORKBOOK_ANALYSIS.md Section 3 (Costing Sheet)
-- Depends on: 20260218000005_seed_costing_sections.sql
-- Rollback: DELETE FROM costing_line_templates WHERE section_id IN
--   (SELECT id FROM costing_sections WHERE survey_type = 'condensation');


-- SECTION: PIV - LOFT UNIT (section_key = 'piv_loft')
INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'condensation' AND section_key = 'piv_loft'),
  'va_pozidry_loft_unit_heated',
  'VA Pozidry loft unit - heated',
  'each',
  324.13,
  1.1,
  NULL,
  0.4,
  2.5,
  4.0,
  'standard',
  '{}',
  1
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'condensation' AND section_key = 'piv_loft'),
  'va_pozidry_loft_unit_unheated',
  'VA Pozidry loft unit - unheated',
  'each',
  309.96,
  1.1,
  NULL,
  0.4,
  2.5,
  4.0,
  'standard',
  '{}',
  2
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'condensation' AND section_key = 'piv_loft'),
  'electrical_pack_fused_spur_cable_jb',
  'Electrical Pack - fused spur, cable, JB',
  'each',
  12.46,
  1.1,
  NULL,
  0.3,
  1.5,
  1.0,
  'standard',
  '{}',
  3
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'condensation' AND section_key = 'piv_loft'),
  'sarkvents',
  'Sarkvents',
  'each',
  3.0,
  1.1,
  NULL,
  0.3,
  0.08,
  1.0,
  'standard',
  '{}',
  4
);


-- SECTION: PIV - WALL MOUNTED UNIT (section_key = 'piv_wall')
INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'condensation' AND section_key = 'piv_wall'),
  'va_pozidry_compact_wall_mounted_unit',
  'VA Pozidry Compact wall mounted unit',
  'each',
  273.74,
  1.1,
  NULL,
  0.4,
  4.0,
  3.0,
  'standard',
  '{}',
  5
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'condensation' AND section_key = 'piv_wall'),
  'electrical_pack_fused_spur_cable_jb_piv_wall',
  'Electrical Pack - fused spur, cable, JB',
  'each',
  12.46,
  1.1,
  NULL,
  0.3,
  1.5,
  1.0,
  'standard',
  '{}',
  6
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'condensation' AND section_key = 'piv_wall'),
  'ducting_1m_length',
  'Ducting - 1m length',
  'each',
  3.85,
  1.1,
  NULL,
  0.3,
  0.1,
  1.0,
  'standard',
  '{}',
  7
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'condensation' AND section_key = 'piv_wall'),
  'ducting_round_elbow',
  'Ducting - round elbow',
  'each',
  2.78,
  1.1,
  NULL,
  0.3,
  0.1,
  1.0,
  'standard',
  '{}',
  8
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'condensation' AND section_key = 'piv_wall'),
  'ducting_round_straight_conn',
  'Ducting - round - straight conn',
  'each',
  0.52,
  1.1,
  NULL,
  0.3,
  0.1,
  1.0,
  'standard',
  '{}',
  9
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'condensation' AND section_key = 'piv_wall'),
  'ducting_round_1m',
  'Ducting - round 1m',
  'each',
  3.85,
  1.1,
  NULL,
  0.3,
  0.1,
  1.0,
  'standard',
  '{}',
  10
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'condensation' AND section_key = 'piv_wall'),
  'ducting_flat_to_round_adaptor',
  'Ducting - flat to round adaptor',
  'each',
  1.63,
  1.1,
  NULL,
  0.3,
  0.1,
  1.0,
  'standard',
  '{}',
  11
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'condensation' AND section_key = 'piv_wall'),
  'ducting_flat_straight_connector',
  'Ducting - flat straight connector',
  'each',
  1.14,
  1.1,
  NULL,
  0.3,
  0.1,
  1.0,
  'standard',
  '{}',
  12
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'condensation' AND section_key = 'piv_wall'),
  'ducting_flat_horizontal_bend',
  'Ducting - flat horizontal bend',
  'each',
  3.01,
  1.1,
  NULL,
  0.3,
  0.1,
  1.0,
  'standard',
  '{}',
  13
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'condensation' AND section_key = 'piv_wall'),
  'ducting_flat_vertical_bend',
  'Ducting - flat vertical bend',
  'each',
  3.01,
  1.1,
  NULL,
  0.3,
  0.1,
  1.0,
  'standard',
  '{}',
  14
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'condensation' AND section_key = 'piv_wall'),
  'ducting_flat_1m',
  'Ducting - flat - 1m',
  'each',
  2.87,
  1.1,
  NULL,
  0.3,
  0.1,
  1.0,
  'standard',
  '{}',
  15
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'condensation' AND section_key = 'piv_wall'),
  'ducting_insulated_flexi_3m_length',
  'Ducting - insulated flexi (3m Length)',
  'each',
  2.5,
  1.1,
  NULL,
  0.3,
  0.1,
  1.0,
  'standard',
  '{}',
  16
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'condensation' AND section_key = 'piv_wall'),
  'grille',
  'Grille',
  'each',
  2.42,
  1.1,
  NULL,
  0.3,
  0.1,
  1.0,
  'standard',
  '{}',
  17
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'condensation' AND section_key = 'piv_wall'),
  'diamond_core_107mm_hole',
  'Diamond core 107mm hole',
  'each',
  0.0,
  1.1,
  NULL,
  0.3,
  2.0,
  1.0,
  'standard',
  '{}',
  18
);


-- SECTION: TRICKLE AND BOOST HUMIDISTAT FAN (section_key = 'humidistat_fan')
INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'condensation' AND section_key = 'humidistat_fan'),
  'trickle_and_boost_humidistat_fan_greenwood',
  'Trickle and boost humidistat fan (greenwood)',
  'each',
  70.2,
  1.1,
  NULL,
  0.3,
  1.5,
  1.0,
  'standard',
  '{}',
  19
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'condensation' AND section_key = 'humidistat_fan'),
  'electrical_pack_fused_spur_cable_jb_humidistat_fan',
  'Electrical Pack - fused spur, cable, JB',
  'each',
  12.46,
  1.1,
  NULL,
  0.3,
  1.5,
  1.0,
  'standard',
  '{}',
  20
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'condensation' AND section_key = 'humidistat_fan'),
  'grille_humidistat_fan',
  'Grille',
  'each',
  2.42,
  1.1,
  NULL,
  0.3,
  0.1,
  1.0,
  'standard',
  '{}',
  21
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'condensation' AND section_key = 'humidistat_fan'),
  'diamond_core_107mm_hole_humidistat_fan',
  'Diamond core 107mm hole',
  'each',
  0.0,
  1.1,
  NULL,
  0.3,
  2.0,
  1.0,
  'standard',
  '{}',
  22
);


-- SECTION: DRYAIRE CPASS (PLASMO) INSULATED PULLCORD PASSIVE VENT (section_key = 'passive_vent')
INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'condensation' AND section_key = 'passive_vent'),
  'dryaire_cpass_plasmo_insulated_pullcord_passive_vent',
  'Dryaire Cpass (plasmo) insulated pullcord passive vent',
  'each',
  36.18,
  1.1,
  NULL,
  0.3,
  1.5,
  1.0,
  'standard',
  '{}',
  23
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'condensation' AND section_key = 'passive_vent'),
  'diamond_core_107mm_hole_passive_vent',
  'Diamond core 107mm hole',
  'each',
  0.0,
  1.1,
  NULL,
  0.3,
  2.0,
  1.0,
  'standard',
  '{}',
  24
);


-- SECTION: Dryaire Cvent (section_key = 'dryaire_cvent')
INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'condensation' AND section_key = 'dryaire_cvent'),
  'dryaire_cvent',
  'Dryaire Cvent',
  'each',
  12.5,
  1.1,
  NULL,
  0.3,
  1.5,
  1.0,
  'standard',
  '{}',
  25
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'condensation' AND section_key = 'dryaire_cvent'),
  'diamond_core_107mm_hole_dryaire_cvent',
  'Diamond core 107mm hole',
  'each',
  0.0,
  1.1,
  NULL,
  0.3,
  2.0,
  1.0,
  'standard',
  '{}',
  26
);


-- SECTION: Joinery: Supply and fit boxwork for ducting (section_key = 'joinery_ducting')
INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'condensation' AND section_key = 'joinery_ducting'),
  'joinery_to_box_in_ducting_per_metre_min_charge_24_metres',
  'Joinery to box in ducting (per metre) Min charge 2.4 metres',
  'lm',
  0,
  1.1,
  NULL,
  0.3,
  0.5,
  1.0,
  'fixed_price',
  '{}',
  27
);


-- SECTION: Loft hatch - new hatchwith sturdy fold down ladder with handrail and switched lamp (section_key = 'loft_hatch_new')
INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'condensation' AND section_key = 'loft_hatch_new'),
  'new_loft_hatch_with_sturdy_fold_down_ladder_with_handrail_an',
  'New loft hatch - with sturdy fold down ladder with handrail and switched lamp',
  'each',
  360.0,
  1.1,
  NULL,
  0.3,
  4.0,
  1.0,
  'fixed_price',
  '{}',
  28
);


-- SECTION: Loft Hatch - enlarge current loft hatch (section_key = 'loft_hatch_enlarge')
INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'condensation' AND section_key = 'loft_hatch_enlarge'),
  'existing_loft_hatch_enlarge_loft_hatch',
  'Existing loft hatch - enlarge loft hatch',
  'each',
  45.0,
  1.1,
  NULL,
  0.3,
  4.0,
  1.0,
  'fixed_price',
  '{}',
  29
);


-- SECTION: Mould Treatments (section_key = 'mould_treatment')
INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'condensation' AND section_key = 'mould_treatment'),
  'mould_treatment',
  'Mould treatment',
  'm2',
  0.5,
  1.1,
  NULL,
  0.3,
  0.25,
  1.0,
  'standard',
  '{}',
  30
);


-- SECTION: Asbestos Testing (section_key = 'asbestos_testing')
INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'condensation' AND section_key = 'asbestos_testing'),
  'asbestos_testing',
  'Asbestos Testing',
  'each',
  30.0,
  1.1,
  NULL,
  0.3,
  0.64,
  1.0,
  'fixed_price',
  '{}',
  31
);


-- SECTION: Airbricks (section_key = 'airbricks')
INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'condensation' AND section_key = 'airbricks'),
  'clean_out_airbrickfit_new_face',
  'Clean out airbrick/fit new face',
  'each',
  16.0,
  1.1,
  NULL,
  0.3,
  0.5,
  1.0,
  'standard',
  '{}',
  32
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'condensation' AND section_key = 'airbricks'),
  'liftupgrade_existing_airbrickfit_new_face',
  'Lift/upgrade existing airbrick/fit new face',
  'each',
  16.0,
  1.1,
  NULL,
  0.3,
  0.8,
  1.0,
  'standard',
  '{}',
  33
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'condensation' AND section_key = 'airbricks'),
  'install_additional_airbrick',
  'Install additional  airbrick',
  'each',
  16.0,
  1.1,
  NULL,
  0.3,
  2.0,
  1.0,
  'standard',
  '{}',
  34
);


-- SECTION: Skip hire 8yd (section_key = 'skip_hire')
INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'condensation' AND section_key = 'skip_hire'),
  'rubbish_removal_skips',
  'Rubbish removal skips',
  'each',
  270.0,
  1.1,
  NULL,
  0.3,
  0.0,
  1.0,
  'skip_hire',
  '{}',
  35
);
