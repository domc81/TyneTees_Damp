#!/usr/bin/env python3
"""FULL-COVERAGE scenario builder — the zero-gaps instrument.

For each workbook, emits a scenario in which EVERY priced input row carries a
non-zero, row-distinct quantity on the ORACLE side, and the WIZARD side sets
every field the platform currently captures with the SAME values. Rows the
platform cannot capture yet fail as "NO ENGINE LINE EMITTED" — that failing
list IS the definitive capture-gap register, and these four scenarios passing
IS the definition of "no gaps, no missed items".

Values are deliberately row-varying (so cross-wired lines can't cancel out)
and deliberately trip every minimum-charge rule in the workbooks
(aquaban <54 m², joinery <2.4 m, warmline <7 m²).

Regenerate after adding capture fields:  python3 parity/scenarios/build_full_coverage.py
"""
import json
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
CELLMAPS = REPO / "parity" / "oracle" / "cellmaps"
OUT = REPO / "parity" / "scenarios"

# Per-row oracle value overrides (row-name → value). Anything not listed gets
# the deterministic default. DE rows get dicts.
OVERRIDES = {
    "damp_v48": {
        "dpc_installation_traditional_r40": {"d": 12, "e": 0.215},
        "dpc_installation_digital_r42": {"d": "Brick", "e": 8},
        "wall_membrane_cm3_1mtr_r44": {"d": 10, "e": 1},
        "wall_membrane_cm3_1_2mtr_r45": {"d": 8, "e": 1.2},
        "wall_membrane_cm3_2mtr_1_r46": {"d": 6, "e": 2},
        "wall_membrane_cm3_2mtr_2_r47": {"d": 0, "e": 2},
        "wall_membrane_cm3_2mtr_3_r48": {"d": 0, "e": 2},
        "overtape_lm_r55": {"d": 6, "e": 0.5},
        "joists_100_x_50_r89": {"d": 3, "e": 2.4}, "joists_125_x_50_r90": {"d": 2, "e": 3},
        "joists_150_x_50_r91": {"d": 4, "e": 3.6}, "joists_175_x_50_r92": {"d": 1, "e": 4.2},
        "joists_200_x_50_r93": {"d": 2, "e": 4.8}, "joists_225_x_50_r94": {"d": 1, "e": 2.4},
        "treat_and_endwrap_joist_r95": {"d": 6, "e": 2.5}, "wall_plate_100x25_r96": {"d": 4, "e": 2},
        "bower_beams_pair_r97": {"d": 1, "e": 1}, "flitch_plates_pair_r98": {"d": 1, "e": 1},
        "warmline_internal_wall_insulation_r79": 5,   # < 7 m² -> minimum-labour rule
        "skimming_walls_multi_finish_plaster_r80": 25,
        "aquaban_water_repellent_system_r128": 30,    # < 54 -> labour minimum
        "strip_wall_paper_r24": 9.6,                  # 4m x 2.4m wall via has_wallpaper
    },
    "condensation_v37": {
        "joinery_to_box_in_ducting_per_metre_min_r62": 1.2,  # < 2.4 -> min charge
        "mould_treatment_r74": 7,                            # non-band free m²
        "new_loft_hatch_with_sturdy_fold_down_lad_r66": 1,   # mapping emits qty 1
        "existing_loft_hatch_enlarge_loft_hatch_r70": 1,     # both rows independent in workbook
    },
    "timber_v33": {
        "wall_membrane_cm3_1mtr_r43": {"d": 9, "e": 1},
        "wall_membrane_cm3_1_2mtr_r44": {"d": 7, "e": 1.2},
        "wall_membrane_cm3_2mtr_1_r45": {"d": 5, "e": 2},
        "wall_membrane_cm3_2mtr_2_r46": {"d": 0, "e": 2},
        "wall_membrane_cm3_2mtr_3_r47": {"d": 0, "e": 2},
        "overtape_lm_r53": {"d": 5, "e": 0.4},
        "joists_100_x_50_r83": {"d": 3, "e": 2.4}, "joists_125_x_50_r84": {"d": 2, "e": 3},
        "joists_150_x_50_r85": {"d": 4, "e": 3.6}, "joists_175_x_50_r86": {"d": 1, "e": 4.2},
        "joists_200_x_50_r87": {"d": 2, "e": 4.8}, "joists_225_x_50_r88": {"d": 1, "e": 2.4},
        "treat_and_endwrap_joist_r89": {"d": 6, "e": 2.5}, "wall_plate_100x25_r90": {"d": 4, "e": 2},
        "bower_beams_pair_r91": {"d": 1, "e": 1}, "flitch_plates_pair_r92": {"d": 1, "e": 1},
        "warmline_internal_wall_insulation_r73": 5,
        "skimming_walls_multi_finish_plaster_r74": 25,
    },
    "woodworm_v26": {
        "joists_timbers_100_x_50_r50": {"d": 3, "e": 2.4}, "joists_timbers_125_x_50_r51": {"d": 2, "e": 3},
        "joists_timbers_150_x_50_r52": {"d": 4, "e": 3.6}, "joists_timbers_175_x_50_r53": {"d": 1, "e": 4.2},
        "joists_timbers_200_x_50_r54": {"d": 2, "e": 4.8}, "joists_timbers_225_x_50_r55": {"d": 1, "e": 2.4},
        "treat_and_endwrap_joist_r56": {"d": 6, "e": 2.5}, "wall_plate_100x25_r57": {"d": 4, "e": 2},
        "bower_beams_pair_r58": {"d": 1, "e": 1}, "flitch_plates_pair_r59": {"d": 1, "e": 1},
        "skimming_walls_multi_finish_plaster_r41": 25,
    },
}

TRAVEL = {"damp_v48": (10, 2), "condensation_v37": (8, 1), "timber_v33": (14, 2), "woodworm_v26": (12, 2)}


def default_value(row):
    return 1 + (row % 8)


# Rows covered by SIBLING scenarios (mutually-exclusive PIV configurations —
# one property has ONE PIV system; coverage = union of scenarios)
SIBLING_ROWS = {
    "condensation_v37": ["va_pozidry_loft_unit_unheated_r22", "va_pozidry_compact_wall_mounted_unit_r28",
                          "electrical_pack_fused_spur_cable_jb_r29", "diamond_core_107mm_hole_r41",
                          "joinery_to_box_in_ducting_per_metre_min_r62"],
}


def oracle_lines(cellmap, wb_id):
    ov = OVERRIDES.get(wb_id, {})
    unknown = set(ov) - set(cellmap["lines"])
    if unknown:
        raise SystemExit(f"{wb_id}: override keys not in cellmap: {sorted(unknown)}")
    out = {}
    for name, e in cellmap["lines"].items():
        if name in SIBLING_ROWS.get(wb_id, []):
            continue
        if e.get("zero_feeder") and name not in ov:
            continue
        if e["input"] == "none":
            continue
        if name in ov:
            v = ov[name]
            if v is None:
                continue
        elif e["input"] == "de":
            v = {"d": 2 + (e["row"] % 4), "e": round(1 + (e["row"] % 3) * 0.5, 2)}
        else:
            v = default_value(e["row"])
        out[name] = v
    return out


# ---------------------------------------------------------------------------
# WIZARD blocks — every field the platform captures TODAY, values matching the
# oracle overrides/defaults above. Rows without fields are oracle-only and
# will fail as NO ENGINE LINE EMITTED (the gap register).
# ---------------------------------------------------------------------------

def damp_wizard():
    return {
        "survey_types": ["damp"],
        "additional_works": {
            "distance_from_office": 10, "num_men_travelling": 2,
            "antinox_board_count": default_value(25),
            "stop_bead_count": default_value(81), "corner_bead_24_count": default_value(82),
            "corner_bead_30_count": default_value(83), "difficulty_hours_plastering": default_value(84),
            "airbrick_clean_count": default_value(112), "airbrick_upgrade_count": default_value(113),
            "airbrick_new_count": default_value(114), "asbestos_test_count": default_value(132),
            "skip_count": default_value(136),
            "aco_drain_length": default_value(123), "french_drain_length": default_value(124),
            "aquaban_area": 30,
            "spray_treatment_area": default_value(118), "spray_difficulty_hours": default_value(119),
        },
        "rooms": [
            {"name": "Lounge (membrane 1m + DPC + prep)", "issues": ["damp"], "damp": {
                "walls": [
                    {"name": "W1", "length": 4, "height": 2.4, "radiator_count": default_value(21),
                     "socket_count": default_value(22), "skirting_length": default_value(23),
                     "has_wallpaper": True, "moisture_readings": []}
                ],
                "dpc_required": True, "dpc_type": "traditional",
                "dpc_wall_length": 12, "dpc_wall_thickness_m": 0.215,
                "wall_treatment": "membrane", "membrane_height": "1m", "membrane_wall_lengths": [10],
                "fillet_joint_length": default_value(53),
                "overtape_length": 6, "overtape_height": 0.5,
                "strip_out_plaster_area": default_value(29), "strip_out_stud_walls_area": default_value(30),
                "strip_out_ceilings_area": default_value(31),
                "floor_treatment": "resin_membrane",
                "resin_topcoat_area": default_value(70), "resin_primer_area": default_value(69),
                "resin_grip_grit_area": default_value(72), "floor_resin_fillet_length": default_value(71),
                "strip_existing_floor": True, "strip_floor_area": default_value(32),
                "sub_floor_area": default_value(33),
                "stud_wall_area": default_value(77), "plasterboard_area": default_value(78),
                "warmline_insulation_area": 5, "skim_area": 25,
                "difficulty_hours": default_value(57),
                "resin_difficulty_hours": default_value(73),
                "joist_entries": [
                    {"size": "4x2", "quantity": 3, "length": 2.4}, {"size": "5x2", "quantity": 2, "length": 3},
                    {"size": "6x2", "quantity": 4, "length": 3.6}, {"size": "7x2", "quantity": 1, "length": 4.2},
                    {"size": "8x2", "quantity": 2, "length": 4.8}, {"size": "9x2", "quantity": 1, "length": 2.4}
                ],
                "endwrap_joists_lm": 15, "wall_plate_lm": 8,
                "bower_beams_count": 1, "flitch_plates_count": 1,
                "flooring_type": "weyrock_18mm", "flooring_area": default_value(101),
                "suspended_floor_insulation_area": default_value(107),
                "joists_difficulty_hours": default_value(99),
                "decking_difficulty_hours": default_value(108)
            }},
            {"name": "Snug (digital DPC)", "issues": ["damp"], "damp": {
                "dpc_required": True, "dpc_type": "digital"
            }},
            {"name": "Pantry (weyrock22)", "issues": ["damp"], "damp": {
                "dpc_required": False, "flooring_type": "weyrock_22mm", "flooring_area": default_value(102)
            }},
            {"name": "Study (std T&G)", "issues": ["damp"], "damp": {
                "dpc_required": False, "flooring_type": "std_tg_floorboards", "flooring_area": default_value(103)
            }},
            {"name": "Landing (victorian T&G)", "issues": ["damp"], "damp": {
                "dpc_required": False, "flooring_type": "victorian_tg_floorboards", "flooring_area": default_value(104)
            }},
            {"name": "WC (engineered)", "issues": ["damp"], "damp": {
                "dpc_required": False, "flooring_type": "engineered_flooring_sheet", "flooring_area": default_value(105)
            }},
            {"name": "Porch (structural engineered)", "issues": ["damp"], "damp": {
                "dpc_required": False, "flooring_type": "structural_engineered_flooring_sheet", "flooring_area": default_value(106)
            }},
            {"name": "Kitchen (membrane 1.2m)", "issues": ["damp"], "damp": {
                "wall_treatment": "membrane", "membrane_height": "1.2m", "membrane_wall_lengths": [8],
                "dpc_required": False
            }},
            {"name": "Hall (membrane 2m)", "issues": ["damp"], "damp": {
                "wall_treatment": "membrane", "membrane_height": "2m", "membrane_wall_lengths": [6],
                "dpc_required": False
            }},
            {"name": "Cellar (tanking)", "issues": ["damp"], "damp": {
                "wall_treatment": "tanking", "tanking_area": default_value(62),
                "dubbing_out_area": default_value(61), "renovating_plaster_area": default_value(63),
                "fillet_joint_length": default_value(64), "tanking_difficulty_hours": default_value(65),
                "dpc_required": False
            }}
        ]
    }


def condensation_wizard():
    return {
        "survey_types": ["condensation"],
        "additional_works": {
            "distance_from_office": 8, "num_men_travelling": 1,
            "skip_count": default_value(88),
            "airbrick_clean_count": default_value(82), "airbrick_upgrade_count": default_value(83),
            "airbrick_new_count": default_value(84), "asbestos_test_count": default_value(78),
            "loft_hatch_new_required": True, "loft_hatch_enlarge_required": True,
            "condensation_piv": {
                "piv_recommended": True, "piv_type": "loft_heated", "piv_unit_count": default_value(21),
                "core_hole_count": 0, "electrical_pack_count": default_value(23),
                "sarkvent_count": default_value(24),
                "ducting_components_as_exists": False, "joinery_ducting_boxwork_lm": 0
            },
            "ducting_components": [
                {"type": "rigid_duct", "count": default_value(30)},
                {"type": "duct_elbow", "count": default_value(31)},
                {"type": "duct_connector", "count": default_value(32)},
                {"type": "round_1m", "count": default_value(33)},
                {"type": "flat_to_round_adaptor", "count": default_value(34)},
                {"type": "flat_straight_connector", "count": default_value(35)},
                {"type": "flat_horizontal_bend", "count": default_value(36)},
                {"type": "flat_vertical_bend", "count": default_value(37)},
                {"type": "flat_1m", "count": default_value(38)},
                {"type": "flexible_duct", "count": default_value(39)},
                {"type": "grille", "count": default_value(40)}
            ]
        },
        "rooms": [
            {"name": "Bathroom (active)", "issues": ["condensation"], "condensation": {
                "black_mould_present": True, "mould_severity": "moderate", "mould_treatment_area": 7,
                "condensation_on_windows": True, "ventilation_adequate": False,
                "extraction_needed": True, "extraction_type": "active",
                "trickle_boost_fan_count": default_value(45), "electrical_pack_count": default_value(46),
                "fan_grille_count": default_value(47), "core_hole_count_active": default_value(48),
                "piv_recommended": False, "fan_recommended": False
            }},
            {"name": "Utility (passive)", "issues": ["condensation"], "condensation": {
                "black_mould_present": False, "condensation_on_windows": False, "ventilation_adequate": False,
                "extraction_needed": True, "extraction_type": "passive",
                "cpass_passive_vent_count": default_value(52),
                "core_hole_required": True, "core_hole_count": default_value(53),
                "dryaire_cvent_count": default_value(57), "cvent_core_hole_count": default_value(58),
                "piv_recommended": False, "fan_recommended": False
            }}
        ]
    }


def timber_wizard():
    return {
        "survey_types": ["timber"],
        "additional_works": {
            "distance_from_office": 14, "num_men_travelling": 2,
            "antinox_board_count": default_value(25), "skip_count": default_value(120),
            "stop_bead_count": default_value(75), "corner_bead_24_count": default_value(76),
            "corner_bead_30_count": default_value(77), "difficulty_hours_plastering": default_value(78),
            "airbrick_clean_count": default_value(114), "airbrick_upgrade_count": default_value(115),
            "airbrick_new_count": default_value(116), "asbestos_test_count": 0
        },
        "rooms": [
            {"name": "Cellar", "issues": ["timber_decay"], "timber_decay": {
                "floor_type": "suspended_timber", "floor_condition": "poor", "floor_access": "good",
                "sub_floor_inspected": True, "timber_replacement_needed": True, "fungal_findings": [],
                "ceiling_affected": True, "ceiling_area": default_value(32),
                "timber_floor_strip_area": default_value(33),
                "flooring_type": "weyrock_18mm", "flooring_area": default_value(94),
                "joist_entries": [
                    {"size": "4x2", "quantity": 3, "length": 2.4}, {"size": "5x2", "quantity": 2, "length": 3},
                    {"size": "6x2", "quantity": 4, "length": 3.6}, {"size": "7x2", "quantity": 1, "length": 4.2},
                    {"size": "8x2", "quantity": 2, "length": 4.8}, {"size": "9x2", "quantity": 1, "length": 2.4}
                ],
                "endwrap_joists_lm": 15, "wall_plate_lm": 8,
                "bower_beams_count": 1, "flitch_plates_count": 1,
                "warmline_insulation_area": default_value(99),
                "fungal_treatment_area": default_value(108),
                "clear_sub_floor_debris_area": default_value(104),
                "grind_back_mortar_area": default_value(35), "wire_scrub_area": default_value(36),
                "masonry_sterilant_area": default_value(105), "protective_treatment_area": default_value(106),
                "staircase_open_rear_steps": default_value(109), "staircase_closed_rear_steps": default_value(110),
                "difficulty_hours": default_value(100),
                "radiator_count": default_value(21), "socket_count": default_value(22),
                "skirting_length": default_value(23), "wallpaper_area": default_value(24),
                "carpet_tiles_area": default_value(29), "wall_plaster_removal_area": default_value(30),
                "stud_walls_removal_area": default_value(31), "scrape_subfloor_area": default_value(34),
                "brunosol_area": default_value(42),
                "wall_treatment": "membrane", "membrane_height": "1m", "membrane_wall_lengths": [9],
                "overtape_length": 5, "overtape_height": 0.4,
                "resin_topcoat_area": default_value(66), "resin_primer_area": default_value(65),
                "resin_grip_grit_area": default_value(67),
                "stud_wall_area": default_value(71), "plasterboard_area": default_value(72),
                "skim_area": 25, "warmline_wall_area": 5,
                "paste_treatment_area": default_value(107)
            }},
            {"name": "Attic (weyrock22)", "issues": ["timber_decay"], "timber_decay": {
                "floor_type": "suspended_timber", "floor_condition": "fair", "floor_access": "good",
                "sub_floor_inspected": False, "timber_replacement_needed": False, "fungal_findings": [],
                "ceiling_affected": False, "timber_floor_strip_area": 0,
                "flooring_type": "weyrock_22mm", "flooring_area": default_value(95)
            }},
            {"name": "Hall (std T&G)", "issues": ["timber_decay"], "timber_decay": {
                "floor_type": "suspended_timber", "floor_condition": "fair", "floor_access": "good",
                "sub_floor_inspected": False, "timber_replacement_needed": False, "fungal_findings": [],
                "ceiling_affected": False, "timber_floor_strip_area": 0,
                "flooring_type": "std_tg_floorboards", "flooring_area": default_value(96)
            }},
            {"name": "Front room (victorian T&G)", "issues": ["timber_decay"], "timber_decay": {
                "floor_type": "suspended_timber", "floor_condition": "fair", "floor_access": "good",
                "sub_floor_inspected": False, "timber_replacement_needed": False, "fungal_findings": [],
                "ceiling_affected": False, "timber_floor_strip_area": 0,
                "flooring_type": "victorian_tg_floorboards", "flooring_area": default_value(97)
            }},
            {"name": "Rear room (engineered)", "issues": ["timber_decay"], "timber_decay": {
                "floor_type": "suspended_timber", "floor_condition": "fair", "floor_access": "good",
                "sub_floor_inspected": False, "timber_replacement_needed": False, "fungal_findings": [],
                "ceiling_affected": False, "timber_floor_strip_area": 0,
                "flooring_type": "engineered_flooring_sheet", "flooring_area": default_value(98)
            }},
            {"name": "Pantry (membrane 1.2m)", "issues": ["timber_decay"], "timber_decay": {
                "floor_type": "suspended_timber", "floor_condition": "fair", "floor_access": "good",
                "sub_floor_inspected": False, "timber_replacement_needed": False, "fungal_findings": [],
                "ceiling_affected": False,
                "wall_treatment": "membrane", "membrane_height": "1.2m", "membrane_wall_lengths": [7]
            }},
            {"name": "Store (membrane 2m)", "issues": ["timber_decay"], "timber_decay": {
                "floor_type": "suspended_timber", "floor_condition": "fair", "floor_access": "good",
                "sub_floor_inspected": False, "timber_replacement_needed": False, "fungal_findings": [],
                "ceiling_affected": False,
                "wall_treatment": "membrane", "membrane_height": "2m", "membrane_wall_lengths": [5]
            }},
            {"name": "Coal store (tanking)", "issues": ["timber_decay"], "timber_decay": {
                "floor_type": "solid_concrete", "floor_condition": "fair", "floor_access": "good",
                "sub_floor_inspected": False, "timber_replacement_needed": False, "fungal_findings": [],
                "ceiling_affected": False,
                "wall_treatment": "tanking", "tanking_area": default_value(59),
                "dubbing_out_area": default_value(58), "renovating_plaster_area": default_value(60),
                "fillet_joint_length": default_value(61)
            }}
        ]
    }


def woodworm_wizard():
    return {
        "survey_types": ["woodworm"],
        "additional_works": {
            "distance_from_office": 12, "num_men_travelling": 2,
            "antinox_board_count": default_value(25), "skip_count": default_value(91),
            "stop_bead_count": default_value(42), "corner_bead_24_count": default_value(43),
            "corner_bead_30_count": default_value(44), "difficulty_hours_plastering": default_value(45),
            "airbrick_clean_count": default_value(85), "airbrick_upgrade_count": default_value(86),
            "airbrick_new_count": default_value(87), "asbestos_test_count": 0
        },
        "rooms": [
            {"name": "Rear bedroom", "issues": ["woodworm"], "woodworm": {
                "species_identified": "common_furniture_beetle", "infestation_status": "active",
                "severity": "moderate", "structural_damage": False,
                "spray_floor_area": default_value(75), "spray_timber_area": default_value(76),
                "paste_treatment_area": default_value(74),
                "staircase_open_rear_steps": default_value(77), "staircase_closed_rear_steps": default_value(78),
                "loft_insulation_area": default_value(80),
                "lifting_area": default_value(79), "relaying_area": default_value(81),
                "difficulty_hours": default_value(68),
                "radiator_count": default_value(21), "socket_count": default_value(22),
                "skirting_length": default_value(23), "wallpaper_area": default_value(24),
                "wall_plaster_removal_area": default_value(29), "stud_walls_removal_area": default_value(30),
                "lath_ceilings_area": default_value(31), "timber_floor_strip_area": default_value(32),
                "scrape_subfloor_area": default_value(33),
                "stud_wall_area": default_value(39), "plasterboard_area": default_value(40), "skim_area": 25,
                "joist_entries": [
                    {"size": "4x2", "quantity": 3, "length": 2.4}, {"size": "5x2", "quantity": 2, "length": 3},
                    {"size": "6x2", "quantity": 4, "length": 3.6}, {"size": "7x2", "quantity": 1, "length": 4.2},
                    {"size": "8x2", "quantity": 2, "length": 4.8}, {"size": "9x2", "quantity": 1, "length": 2.4}
                ],
                "endwrap_joists_lm": 15, "wall_plate_lm": 8, "bower_beams_count": 1, "flitch_plates_count": 1,
                "flooring_type": "weyrock_18mm", "flooring_area": default_value(61),
                "suspended_floor_insulation_area": default_value(67),
                "clear_sub_floor_debris_area": default_value(72), "protective_treatment_area": default_value(73)
            }},
            {"name": "Box room (weyrock22)", "issues": ["woodworm"], "woodworm": {
                "species_identified": "common_furniture_beetle", "infestation_status": "historic",
                "severity": "light", "structural_damage": False,
                "flooring_type": "weyrock_22mm", "flooring_area": default_value(62)
            }},
            {"name": "Hall (std T&G)", "issues": ["woodworm"], "woodworm": {
                "species_identified": "common_furniture_beetle", "infestation_status": "historic",
                "severity": "light", "structural_damage": False,
                "flooring_type": "std_tg_floorboards", "flooring_area": default_value(63)
            }},
            {"name": "Front room (victorian)", "issues": ["woodworm"], "woodworm": {
                "species_identified": "common_furniture_beetle", "infestation_status": "historic",
                "severity": "light", "structural_damage": False,
                "flooring_type": "victorian_tg_floorboards", "flooring_area": default_value(64)
            }},
            {"name": "Rear room (engineered)", "issues": ["woodworm"], "woodworm": {
                "species_identified": "common_furniture_beetle", "infestation_status": "historic",
                "severity": "light", "structural_damage": False,
                "flooring_type": "engineered_flooring_sheet", "flooring_area": default_value(65)
            }},
            {"name": "Kitchen (structural engineered)", "issues": ["woodworm"], "woodworm": {
                "species_identified": "common_furniture_beetle", "infestation_status": "historic",
                "severity": "light", "structural_damage": False,
                "flooring_type": "structural_engineered_flooring_sheet", "flooring_area": default_value(66)
            }}
        ]
    }


WIZARDS = {"damp_v48": damp_wizard, "condensation_v37": condensation_wizard,
           "timber_v33": timber_wizard, "woodworm_v26": woodworm_wizard}


def main():
    for wb_id, wizard_fn in WIZARDS.items():
        cm = json.loads((CELLMAPS / f"{wb_id}.json").read_text())
        dist, men = TRAVEL[wb_id]
        sc = {
            "id": f"full-coverage-{wb_id.split('_')[0]}",
            "title": f"FULL COVERAGE — every priced input row of {cm['workbook_file'].split('/')[-1]}",
            "source": "Zero-gaps instrument: every input row non-zero on the oracle side with row-distinct values (incl. all minimum-charge triggers); wizard side sets every currently-capturable field with matching values. Failing rows = the capture-gap register. This scenario passing = the workbook is fully mapped.",
            "workbook": wb_id,
            "oracle": {"lines": oracle_lines(cm, wb_id), "travel": {"distance_miles": dist, "men": men}},
            "wizard": wizard_fn(),
            "notes": "GENERATED by parity/scenarios/build_full_coverage.py — edit the builder, not this file."
        }
        if wb_id == "woodworm_v26":
            sc["workbook_summation_defects"] = [
                {"line": "strip_wall_paper_r24", "fields": ["hours"],
                 "reason": "Woodworm prep hours subtotal is SUM(O21:O23) — omits wallpaper O24 (money IS included). Workbook understates hours -> days/travel inputs."},
                {"line": "antinox_hd_floor_protection_boards_2_4m_r25", "fields": ["hours"],
                 "reason": "Same O21:O23 subtotal omits antinox O25 hours."},
            ]
        if wb_id == "damp_v48":
            sc["workbook_summation_defects"] = [{
                "line": "asbestos_testing_r132",
                "reason": "Damp workbook K139/O140 omit the asbestos section (K133/O133) from their own subtotals — priced work the customer is never billed for. Platform bills it; deviation reported to Steve."
            }]
        # condensation: verified — its totals DO include asbestos (no defect
        # entry needed, unlike the damp sheet); the -5 PIV-loft dial stays
        # as saved in the master (platform implements the default).
        out = OUT / f"{sc['id']}.json"
        out.write_text(json.dumps(sc, indent=2))
        print(f"wrote {out.name}: {len(sc['oracle']['lines'])} oracle rows")


def sibling_condensation_scenarios():
    """Mutually-exclusive PIV configurations — a property has one PIV system,
    so these rows are covered by sibling scenarios (union = full coverage)."""
    sibs = [
        {
            "id": "full-coverage-condensation-piv-unheated",
            "title": "Coverage sibling: UNHEATED loft PIV (workbook R22)",
            "workbook": "condensation_v37",
            "oracle": {"lines": {"va_pozidry_loft_unit_unheated_r22": default_value(22)},
                        "travel": {"distance_miles": 0, "men": 1}},
            "wizard": {
                "survey_types": ["condensation"],
                "additional_works": {"distance_from_office": 0, "num_men_travelling": 1,
                    "condensation_piv": {"piv_recommended": True, "piv_type": "loft_unheated",
                        "piv_unit_count": default_value(22), "core_hole_count": 0,
                        "electrical_pack_count": 0, "sarkvent_count": 0,
                        "ducting_components_as_exists": True, "joinery_ducting_boxwork_lm": 0}},
                "rooms": [{"name": "Hall", "issues": ["condensation"], "condensation": {
                    "black_mould_present": False, "condensation_on_windows": True,
                    "ventilation_adequate": False, "extraction_needed": False,
                    "piv_recommended": False, "fan_recommended": False}}]
            },
            "notes": "GENERATED by build_full_coverage.py"
        },
        {
            "id": "full-coverage-condensation-piv-wall",
            "title": "Coverage sibling: WALL-MOUNTED PIV + wall elec pack + core hole + joinery min-charge (rows R28/R29/R41/R62)",
            "workbook": "condensation_v37",
            "oracle": {"lines": {
                "va_pozidry_compact_wall_mounted_unit_r28": default_value(28),
                "electrical_pack_fused_spur_cable_jb_r29": default_value(29),
                "diamond_core_107mm_hole_r41": default_value(41),
                "joinery_to_box_in_ducting_per_metre_min_r62": 1.2,
            }, "travel": {"distance_miles": 0, "men": 1}},
            "wizard": {
                "survey_types": ["condensation"],
                "additional_works": {"distance_from_office": 0, "num_men_travelling": 1,
                    "condensation_piv": {"piv_recommended": True, "piv_type": "wall_mounted",
                        "piv_unit_count": default_value(28), "core_hole_count": default_value(41),
                        "electrical_pack_count": default_value(29), "sarkvent_count": 0,
                        "ducting_components_as_exists": True, "joinery_ducting_boxwork_lm": 1.2}},
                "rooms": [{"name": "Hall", "issues": ["condensation"], "condensation": {
                    "black_mould_present": False, "condensation_on_windows": True,
                    "ventilation_adequate": False, "extraction_needed": False,
                    "piv_recommended": False, "fan_recommended": False}}]
            },
            "notes": "GENERATED by build_full_coverage.py. Joinery 1.2 LM exercises the 2.4m minimum charge on both sides."
        },
    ]
    for sc in sibs:
        (OUT / f"{sc['id']}.json").write_text(json.dumps(sc, indent=2))
        print(f"wrote {sc['id']}.json")


if __name__ == "__main__":
    main()
    sibling_condensation_scenarios()
