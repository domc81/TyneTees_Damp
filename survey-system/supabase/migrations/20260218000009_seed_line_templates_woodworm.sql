-- Migration: Seed costing line templates for WOODWORM survey type
-- Date: 2026-02-18
-- Source: WOODWORM_WORKBOOK_ANALYSIS.md Section 3 (Costing Sheet)
-- Depends on: 20260218000005_seed_costing_sections.sql
-- Rollback: DELETE FROM costing_line_templates WHERE section_id IN
--   (SELECT id FROM costing_sections WHERE survey_type = 'woodworm');


-- SECTION: Preparatory work (section_key = 'preparatory_work')
INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'preparatory_work'),
  'remove_radiators_cap_valves',
  'Remove radiators & cap valves',
  'each',
  7.0,
  1.1,
  NULL,
  0.3,
  0,
  1.0,
  'standard',
  '{}',
  1
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'preparatory_work'),
  'remove_socket_fronts_and_isolate',
  'Remove socket fronts and isolate',
  'each',
  2.0,
  1.1,
  NULL,
  0.3,
  0,
  1.0,
  'standard',
  '{}',
  2
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'preparatory_work'),
  'skirting_board_removal_set_aside',
  'Skirting board removal & set aside',
  'lm',
  0.1,
  1.1,
  NULL,
  0.3,
  0.07,
  1.0,
  'standard',
  '{}',
  3
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'preparatory_work'),
  'strip_wall_paper',
  'Strip Wall Paper',
  'm2',
  0.5,
  1.1,
  NULL,
  0.3,
  0.5,
  1.0,
  'standard',
  '{}',
  4
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'preparatory_work'),
  'antinox_hd_floor_protection_boards_24m_x_12m',
  'Antinox HD Floor Protection Boards – 2.4m x 1.2m',
  'm2',
  0,
  1.1,
  NULL,
  0.3,
  0,
  1.0,
  'standard',
  '{}',
  5
);


-- SECTION: Strip out (section_key = 'strip_out')
INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'strip_out'),
  'remove_plasterrender_walls',
  'Remove plaster/render (Walls)',
  'm2',
  0.0,
  1.1,
  NULL,
  0.0,
  0.3,
  1.0,
  'standard',
  '{}',
  6
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'strip_out'),
  'removal_of_stud_walls_etc_bag_cart_away',
  'Removal of stud walls etc (Bag & cart away)',
  'm2',
  0.0,
  1.1,
  NULL,
  0.0,
  0.4,
  1.0,
  'standard',
  '{}',
  7
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'strip_out'),
  'plaster_lath_removal_denail_ceilings',
  'Plaster & lath removal )& de-nail  (Ceilings)',
  'm2',
  0.0,
  1.1,
  NULL,
  0.0,
  0.8,
  1.0,
  'standard',
  '{}',
  8
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'strip_out'),
  'strip_out_existing_timber_floor_gf',
  'Strip out existing timber floor (GF)',
  'm2',
  0.0,
  1.1,
  NULL,
  0.0,
  0.5,
  1.0,
  'standard',
  '{}',
  9
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'strip_out'),
  'scrape_backclear_sub_floors',
  'Scrape back/clear sub floors',
  'm2',
  0.0,
  1.1,
  NULL,
  0.0,
  0.25,
  1.0,
  'standard',
  '{}',
  10
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'strip_out'),
  'bag_up_debris_cart_outside',
  'Bag up debris & cart outside',
  'bags',
  1.0,
  1.1,
  NULL,
  0.3,
  0.01,
  1.0,
  'bag_and_cart',
  '{}',
  11
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'strip_out'),
  'disposal_via_licensed_transfer_agent',
  'Disposal via licensed transfer agent',
  'bags',
  0,
  1.1,
  NULL,
  0.3,
  0.0,
  1.0,
  'tiered_disposal',
  '{}',
  12
);


-- SECTION: Plastering/finishing (section_key = 'plastering')
INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'plastering'),
  'construct_stud_wall_to_perimiter',
  'Construct stud wall to perimiter',
  'm2',
  14.0,
  1.1,
  NULL,
  0.3,
  0.4,
  1.0,
  'standard',
  '{}',
  13
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'plastering'),
  'plasterboarding_inc_dabscrews',
  'Plasterboarding (inc dab/screws)',
  'm2',
  0,
  1.1,
  NULL,
  0.3,
  0.4,
  1.0,
  'standard',
  '{}',
  14
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'plastering'),
  'skimming_walls_multi_finish_plaster',
  'Skimming walls (multi finish plaster)',
  'm2',
  0,
  1.1,
  NULL,
  0.3,
  0,
  1.0,
  'ceiling_coverage',
  '{}',
  15
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'plastering'),
  'plastering_stop_bead_3m_length',
  'Plastering Stop Bead - 3m length',
  'each',
  0,
  1.1,
  NULL,
  0.3,
  0.0,
  1.0,
  'standard',
  '{}',
  16
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'plastering'),
  'plastering_thin_coat_anglecorner_bead_24m_length',
  'Plastering Thin Coat Angle/Corner Bead - 2.4m length',
  'each',
  0,
  1.1,
  NULL,
  0.3,
  0.0,
  1.0,
  'standard',
  '{}',
  17
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'plastering'),
  'plastering_thin_coat_anglecorner_bead_3m_length',
  'Plastering Thin Coat Angle/Corner Bead - 3m length',
  'each',
  0,
  1.1,
  NULL,
  0.3,
  0.0,
  1.0,
  'standard',
  '{}',
  18
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'plastering'),
  'difficulty_hours_fireplace_corners_etc',
  'Difficulty hours (fireplace, corners etc)',
  'hours',
  0.0,
  1.1,
  NULL,
  0.0,
  1.0,
  1.0,
  'standard',
  '{}',
  19
);


-- SECTION: Joists Size (section_key = 'floor_joists_decking')
INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'floor_joists_decking'),
  'joiststimbers_100_x_50',
  'Joists/Timbers, 100 x 50',
  'lm',
  5.46,
  1.1,
  NULL,
  0.3,
  0.25,
  1.0,
  'standard',
  '{}',
  20
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'floor_joists_decking'),
  'joiststimbers_125_x_50',
  'Joists/Timbers, 125 x 50',
  'lm',
  6.5,
  1.1,
  NULL,
  0.3,
  0.25,
  1.0,
  'standard',
  '{}',
  21
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'floor_joists_decking'),
  'joiststimbers_150_x_50',
  'Joists/Timbers, 150 x 50',
  'lm',
  7.7,
  1.1,
  NULL,
  0.3,
  0.25,
  1.0,
  'standard',
  '{}',
  22
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'floor_joists_decking'),
  'joiststimbers_175_x_50',
  'Joists/Timbers, 175 x 50',
  'lm',
  8.0,
  1.1,
  NULL,
  0.3,
  0.3,
  1.0,
  'standard',
  '{}',
  23
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'floor_joists_decking'),
  'joiststimbers_200_x_50',
  'Joists/Timbers, 200 x 50',
  'lm',
  8.9,
  1.1,
  NULL,
  0.3,
  0.3,
  1.0,
  'standard',
  '{}',
  24
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'floor_joists_decking'),
  'joiststimbers_225_x_50',
  'Joists/Timbers, 225 x 50',
  'lm',
  9.5,
  1.1,
  NULL,
  0.3,
  0.4,
  1.0,
  'standard',
  '{}',
  25
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'floor_joists_decking'),
  'treat_and_endwrap_joist',
  'Treat and endwrap joist',
  'each',
  3.0,
  1.1,
  NULL,
  0.3,
  0.15,
  1.0,
  'standard',
  '{}',
  26
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'floor_joists_decking'),
  'wall_plate_100x25',
  'Wall plate 100x25',
  'each',
  4.84,
  1.1,
  NULL,
  0.3,
  0.4,
  1.0,
  'standard',
  '{}',
  27
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'floor_joists_decking'),
  'bower_beams_pair',
  'Bower beams (pair)',
  'pairs',
  36.0,
  1.1,
  NULL,
  0.3,
  1.5,
  1.0,
  'standard',
  '{}',
  28
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'floor_joists_decking'),
  'flitch_plates_pair',
  'Flitch plates (pair)',
  'pairs',
  42.0,
  1.1,
  NULL,
  0.3,
  1.5,
  1.0,
  'standard',
  '{}',
  29
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'floor_joists_decking'),
  'install_weyrock_flooring_18mm_m2',
  'Install Weyrock flooring 18mm (M2)',
  'm2',
  18.0,
  1.1,
  NULL,
  0.3,
  0.4,
  1.0,
  'standard',
  '{}',
  30
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'floor_joists_decking'),
  'install_weyrock_flooring_22mm_m2',
  'Install Weyrock flooring 22mm (M2)',
  'm2',
  22.0,
  1.1,
  NULL,
  0.3,
  0.425,
  1.0,
  'standard',
  '{}',
  31
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'floor_joists_decking'),
  'install_std_tg_floorboards_m2',
  'Install std T&G Floorboards (M2)',
  'm2',
  46.3,
  1.1,
  NULL,
  0.3,
  0.6,
  1.0,
  'standard',
  '{}',
  32
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'floor_joists_decking'),
  'install_victorian_tg_floorboards_m2',
  'Install victorian T&G Floorboards (M2)',
  'm2',
  52.8,
  1.1,
  NULL,
  0.3,
  0.6,
  1.0,
  'standard',
  '{}',
  33
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'floor_joists_decking'),
  'install_engineered_flooring_sheet_m2',
  'Install Engineered Flooring sheet (M2)',
  'm2',
  49.99,
  1.1,
  NULL,
  0.3,
  0.4,
  1.0,
  'standard',
  '{}',
  34
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'floor_joists_decking'),
  'install_structural_engineered_flooring_sheet_m2_onto_joists',
  'Install Structural Engineered Flooring sheet (M2) onto joists',
  'm2',
  52.8,
  1.1,
  NULL,
  0.3,
  0.9,
  1.0,
  'standard',
  '{}',
  35
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'floor_joists_decking'),
  'provide_insulation_to_suspended_flooring',
  'Provide insulation to suspended flooring',
  'm2',
  6.8,
  1.1,
  NULL,
  0.3,
  0.2,
  1.0,
  'standard',
  '{}',
  36
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'floor_joists_decking'),
  'difficulty_hours_additional_hours_if_required',
  'Difficulty hours (additional hours if required)',
  'hours',
  0.0,
  1.1,
  NULL,
  0.3,
  1.0,
  1.0,
  'standard',
  '{}',
  37
);


-- SECTION: Timber treatments (section_key = 'timber_treatments')
INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'timber_treatments'),
  'clear_debris_from_sub_floor',
  'Clear debris from sub floor',
  'm2',
  0.0,
  1.1,
  NULL,
  0.3,
  0.15,
  1.0,
  'standard',
  '{}',
  38
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'timber_treatments'),
  'protective_treatment_to_new_timbers_installation',
  'Protective treatment to new timbers installation',
  'm2',
  0.5,
  1.1,
  NULL,
  0.3,
  0.02,
  1.0,
  'standard',
  '{}',
  39
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'timber_treatments'),
  '401_gel_injection_100mm_centres_plug_with_dowel',
  '40.1 Gel injection @100mm centres, plug with dowel',
  'm2',
  2.22,
  1.1,
  NULL,
  0.3,
  0.25,
  1.0,
  'standard',
  '{}',
  40
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'timber_treatments'),
  'fogging_floor_area',
  'Fogging floor area',
  'm2',
  0.5,
  1.1,
  NULL,
  0.3,
  0.1,
  1.0,
  'standard',
  '{}',
  41
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'timber_treatments'),
  'fogging_boarded_area',
  'Fogging boarded area',
  'm2',
  0.5,
  1.1,
  NULL,
  0.3,
  0,
  1.0,
  'standard',
  '{}',
  42
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'timber_treatments'),
  'fogging_staircase_open_rear_treads_per_step',
  'Fogging staircase - open rear treads Per step',
  'each',
  0.5,
  1.1,
  NULL,
  0.3,
  0.1,
  1.0,
  'standard',
  '{}',
  43
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'timber_treatments'),
  'fogging_staircase_rear_closed_drill_and_plug_per_step',
  'Fogging staircase - rear closed, drill and plug per step',
  'each',
  2.0,
  1.1,
  NULL,
  0.3,
  0.2,
  1.0,
  'standard',
  '{}',
  44
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'timber_treatments'),
  'lifting_loft_insulation',
  'Lifting loft insulation',
  'm2',
  0.0,
  1.1,
  NULL,
  0.3,
  0.05,
  1.0,
  'standard',
  '{}',
  45
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'timber_treatments'),
  'fogging_loft_area_calculated_from_floor_area_of_loft',
  'Fogging loft area (calculated from floor area of loft)',
  'm2',
  0.5,
  1.1,
  NULL,
  0.3,
  0.04,
  1.0,
  'standard',
  '{}',
  46
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'timber_treatments'),
  'relaying_loft_insulation',
  'Relaying loft insulation',
  'm2',
  0.0,
  1.1,
  NULL,
  0.3,
  0.03,
  1.0,
  'standard',
  '{}',
  47
);


-- SECTION: Airbricks (section_key = 'airbricks')
INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'airbricks'),
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
  48
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'airbricks'),
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
  49
);

INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'airbricks'),
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
  50
);


-- SECTION: Skip hire 8yd (section_key = 'skip_hire')
INSERT INTO costing_line_templates (section_id, line_key, description, uom, base_unit_cost, wastage_factor, coverage_rate, material_markup, labour_rate_per_unit, labour_markup, cost_formula, formula_params, display_order)
VALUES (
  (SELECT id FROM costing_sections WHERE survey_type = 'woodworm' AND section_key = 'skip_hire'),
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
  51
);
