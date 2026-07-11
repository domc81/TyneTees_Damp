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


def oracle_lines(cellmap, wb_id):
    ov = OVERRIDES.get(wb_id, {})
    unknown = set(ov) - set(cellmap["lines"])
    if unknown:
        raise SystemExit(f"{wb_id}: override keys not in cellmap: {sorted(unknown)}")
    out = {}
    for name, e in cellmap["lines"].items():
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
                "difficulty_hours": default_value(57)
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
                "fillet_joint_length": default_value(64), "dpc_required": False
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
            "loft_hatch_new_required": True, "loft_hatch_enlarge_required": False,
            "condensation_piv": {
                "piv_recommended": True, "piv_type": "loft_heated", "piv_unit_count": default_value(21),
                "core_hole_count": 0, "electrical_pack_count": default_value(23),
                "sarkvent_count": default_value(24),
                "ducting_components_as_exists": False, "joinery_ducting_boxwork_lm": 1.2
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
                "black_mould_present": True, "mould_severity": "moderate",
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
                "difficulty_hours": default_value(100)
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
                "include_lifting_loft_insulation": True, "include_relaying_loft_insulation": True,
                "difficulty_hours": default_value(68)
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
        if wb_id == "condensation_v37":
            # workbook master ships with -5 saved on the PIV-loft dial; keep it
            # (platform must implement the default) — do NOT neutralise here.
            pass
        out = OUT / f"{sc['id']}.json"
        out.write_text(json.dumps(sc, indent=2))
        print(f"wrote {out.name}: {len(sc['oracle']['lines'])} oracle rows")


if __name__ == "__main__":
    main()
