# Rates Audit — workbooks vs platform templates

Workbook formulas read directly from the .xlsm files; platform values follow the
engine's own precedence (catalog → params → base, × wastage_factor).

| Workbook | line rows | matched to templates | labour rate | contractor | vehicle/mile |
|---|---:|---:|---:|---:|---:|
| damp | 74 | 71 | 30.63 | 28.0 | 0.5 |
| condensation | 35 | 35 | 30.63 | 28.0 | 0.5 |
| timber | 64 | 61 | 30.63 | 28.0 | 0.5 |
| woodworm | 51 | 51 | 30.63 | 28.0 | 0.5 |

| Class | Count |
|---|---:|
| WRONG_RATE | 0 |
| MODEL_MISMATCH | 0 |
| MISSING_WASTAGE | 27 |
| EXTRA_WASTAGE | 43 |
| WRONG_COVERAGE | 0 |
| MARKUP | 0 |
| TRUNCATED | 16 |
| QUIRK | 6 |
| SPECIAL | 17 |
| UNMATCHED workbook lines | 0 |
| UNMATCHED platform templates | 9 |

## MISSING_WASTAGE (27)

| Workbook line | Template | Field | Workbook | Platform | Note |
|---|---|---|---|---|---|
| R44 Wall membrane CM3  - 1mtr | damp/wall_membrane/wall_membrane_1m | material_unit_cost | 4.5826 | 4.1659999999999995 | platform = workbook /1.1 (wastage_factor=1.0, catalog[cm3_membrane_1m]=20.83/5) |
| R45 Wall membrane CM3  - 1.2mtr | damp/wall_membrane/wall_membrane_1_2m | material_unit_cost | 4.889500000000001 | 4.446 | platform = workbook /1.1 (wastage_factor=1.0, catalog[cm3_membrane_1_2m]=22.23/5) |
| R49 Wall membrane CM3 - Subtotals for above 3 li | damp/wall_membrane/wall_membrane_2m | material_unit_cost | 4.8587 | 4.418 | platform = workbook /1.1 (wastage_factor=1.0, catalog[cm3_membrane_2m]=22.09/5) |
| R50 Membrane plugs for m2 listed | damp/wall_membrane/membrane_plugs | material_unit_cost | 1.0263000000000002 | 0.935 | platform = workbook /1.1 (wastage_factor=1.0, catalog[membrane_fixing_plugs_50mm]=1.87/2) |
| R51 Sealing Tape Lm | damp/wall_membrane/sealing_tape | material_unit_cost | 0.9580000000000002 | 0.870909090909091 | platform = workbook /1.1 (wastage_factor=1.0, catalog[membrane_sealing_tape]=19.16/22) |
| R53 Wall/floor fillet joint | damp/wall_membrane/wall_floor_fillet_joint | material_unit_cost | 2.24675 | 2.0425 | platform = workbook /1.1 (wastage_factor=1.0, catalog[universal_mortar]=24.51/12) |
| R55 Overtape Lm | damp/wall_membrane/overtape | material_unit_cost | 2.3826 | 2.166 | platform = workbook /1.1 (wastage_factor=1.0, catalog[fibre_fleece_tape]=10.83/5) |
| R56 Fixing Rope Lm | damp/wall_membrane/fixing_rope | material_unit_cost | 2.2726 | 2.066 | platform = workbook /1.1 (wastage_factor=1.0, catalog[rope_10mm]=10.33/5) |
| R62 2 coat tanking slurry | damp/cementitious_tanking/tankingslurry_2coat | material_unit_cost | 3.4100000000000006 | 3.1 | platform = workbook /1.1 (wastage_factor=1.0, catalog[hydradry_tanking_slurry]=21.7/7) |
| R63 Renovating plaster | damp/cementitious_tanking/renovating_plaster | material_unit_cost | 5.958333333333334 | 5.416666666666667 | platform = workbook /1.1 (wastage_factor=1.0, catalog[renovating_plaster]=16.25/3) |
| R64 Wall/floor fillet joint | damp/cementitious_tanking/wall_floor_fillet_tanking | material_unit_cost | 2.24675 | 2.0425 | platform = workbook /1.1 (wastage_factor=1.0, catalog[universal_mortar]=24.51/12) |
| R69 EP40 2 Pack resin Primer | damp/floor_resin/resin_primer_ep40 | material_unit_cost | 2.079 | 1.8900000000000001 | platform = workbook /1.1 (wastage_factor=1.0, catalog[ep40_primer]=56.7/30) |
| R70 EP40 2 Pack resin top coat | damp/floor_resin/resin_topcoat_ep40 | material_unit_cost | 2.335666666666667 | 2.1233333333333335 | platform = workbook /1.1 (wastage_factor=1.0, catalog[ep40_topcoat]=63.7/30) |
| R71 Wall/floor fillet joint | damp/floor_resin/wall_floor_fillet_resin | material_unit_cost | 2.24675 | 2.0425 | platform = workbook /1.1 (wastage_factor=1.0, catalog[universal_mortar]=24.51/12) |
| R72 Grip grit | damp/floor_resin/grip_grit | material_unit_cost | 0.09152 | 0.0832 | platform = workbook /1.1 (wastage_factor=1.0, catalog[grip_grit]=2.08/25) |
| R80 Skimming walls (multi finish plaster) | damp/plastering/skimming_walls | material_unit_cost | 1.3288 | 1.208 | platform = workbook /1.1 (wastage_factor=1.0, catalog[multi_finish_plaster_25kg]=12.08/10) |
| R118 Fog sub floor void with anti fungal treatmen | damp/spray_treatments/fog_subfloor_antifungal | material_unit_cost | 0.23076900000000003 | 0.2097 | platform = workbook /1.1 (wastage_factor=1.0, catalog[microtech_concentrate]=20.97/100) |
| R128 Aquaban water repellent system | damp/aquaban/aquaban_system | material_unit_cost | 0.55 | 0.5 | platform = workbook /1.1 (wastage_factor=1.0, catalog[enviroseal_water_repellent]=12.5/25) |
| R43 Wall membrane CM3  - 1mtr | timber/wall_membrane/wall_membrane_cm3_1mtr | material_unit_cost | 4.5826 | 4.1659999999999995 | platform = workbook /1.1 (wastage_factor=1.0, catalog[cm3_membrane_1m]=20.83/5) |
| R44 Wall membrane CM3  - 1.2mtr | timber/wall_membrane/wall_membrane_cm3_12mtr | material_unit_cost | 4.889500000000001 | 4.446 | platform = workbook /1.1 (wastage_factor=1.0, catalog[cm3_membrane_1_2m]=22.23/5) |
| R48 Wall membrane CM3 - Subtotals for above 3 li | timber/wall_membrane/wall_membrane_cm3_subtotals_for_above_3_lines | material_unit_cost | 4.8587 | 4.418 | platform = workbook /1.1 (wastage_factor=1.0, catalog[cm3_membrane_2m]=22.09/5) |
| R49 Membrane plugs for m2 listed | timber/wall_membrane/membrane_plugs_for_m2_listed | material_unit_cost | 1.0263000000000002 | 0.935 | platform = workbook /1.1 (wastage_factor=1.0, catalog[membrane_fixing_plugs_50mm]=1.87/2) |
| R50 Sealing Tape Lm | timber/wall_membrane/sealing_tape_lm | material_unit_cost | 0.9580000000000002 | 0.870909090909091 | platform = workbook /1.1 (wastage_factor=1.0, catalog[membrane_sealing_tape]=19.16/22) |
| R53 Overtape Lm | timber/wall_membrane/overtape_lm | material_unit_cost | 2.3826 | 2.166 | platform = workbook /1.1 (wastage_factor=1.0, catalog[fibre_fleece_tape]=10.83/5) |
| R54 Fixing Rope Lm | timber/wall_membrane/fixing_rope_lm | material_unit_cost | 2.2726 | 2.066 | platform = workbook /1.1 (wastage_factor=1.0, catalog[rope_10mm]=10.33/5) |
| R74 Skimming walls (multi finish plaster) | timber/plastering/skimming_walls_multi_finish_plaster | material_unit_cost | 1.3288 | 1.208 | platform = workbook /1.1 (wastage_factor=1.0, catalog[multi_finish_plaster_25kg]=12.08/10) |
| R41 Skimming walls (multi finish plaster) | woodworm/plastering/skimming_walls_multi_finish_plaster | material_unit_cost | 1.3288 | 1.208 | platform = workbook /1.1 (wastage_factor=1.0, catalog[multi_finish_plaster_25kg]=12.08/10) |

## EXTRA_WASTAGE (43)

| Workbook line | Template | Field | Workbook | Platform | Note |
|---|---|---|---|---|---|
| R21 Remove radiators & cap valves | damp/preparatory_work/remove_radiators_valves | material_unit_cost | 7.0 | 7.700000000000001 | platform = workbook x1.1 (wastage_factor=1.1) |
| R22 Remove socket fronts and isolate | damp/preparatory_work/remove_socket_fronts | material_unit_cost | 2.0 | 2.2 | platform = workbook x1.1 (wastage_factor=1.1) |
| R23 Skirting board removal & set aside | damp/preparatory_work/skirting_board_removal | material_unit_cost | 0.1 | 0.11000000000000001 | platform = workbook x1.1 (wastage_factor=1.1) |
| R24 Strip Wall Paper | damp/preparatory_work/strip_wallpaper | material_unit_cost | 0.5 | 0.55 | platform = workbook x1.1 (wastage_factor=1.1) |
| R25 Antinox HD Floor Protection Boards – 2.4m x  | site_preparation/preparatory_work/floor_protection_boards | material_unit_cost | 4.5760000000000005 | 5.0336 | platform = workbook x1.1 (wastage_factor=1.1) |
| R34 Bag up debris & cart outside | site_preparation/strip_out_disposal/bag_cart_debris | material_unit_cost | 1.0 | 1.1 | platform = workbook x1.1 (wastage_factor=1.1) |
| R77 Construct stud wall to perimeter | damp/plastering/construct_stud_wall | material_unit_cost | 14.0 | 15.400000000000002 | platform = workbook x1.1 (wastage_factor=1.1) |
| R78 Plaster boarding (inc dab/screws) | damp/plastering/plaster_boarding | material_unit_cost | 9.75591985428051 | 10.736 | platform = workbook x1.1 (wastage_factor=1.1) |
| R81 Plastering Stop Bead - 3m length | damp/plastering/plastering_stop_bead | material_unit_cost | 1.1 | 1.2100000000000002 | platform = workbook x1.1 (wastage_factor=1.1) |
| R82 Plastering Thin Coat Angle/Corner Bead - 2.4 | damp/plastering/thin_coat_angle_2_4m | material_unit_cost | 1.826 | 2.0086000000000004 | platform = workbook x1.1 (wastage_factor=1.1) |
| R83 Plastering Thin Coat Angle/Corner Bead - 3m  | damp/plastering/thin_coat_angle_3m | material_unit_cost | 2.75 | 3.0250000000000004 | platform = workbook x1.1 (wastage_factor=1.1) |
| R89 Joists, 100 x 50 | damp/floor_joists_decking/joists_100x50 | material_unit_cost | 5.46 | 6.006 | platform = workbook x1.1 (wastage_factor=1.1) |
| R90 Joists, 125 x 50 | damp/floor_joists_decking/joists_125x50 | material_unit_cost | 6.5 | 7.15 | platform = workbook x1.1 (wastage_factor=1.1) |
| R91 Joists, 150 x 50 | damp/floor_joists_decking/joists_150x50 | material_unit_cost | 7.7 | 8.47 | platform = workbook x1.1 (wastage_factor=1.1) |
| R92 Joists, 175 x 50 | damp/floor_joists_decking/joists_175x50 | material_unit_cost | 8.0 | 8.8 | platform = workbook x1.1 (wastage_factor=1.1) |
| R93 Joists, 200 x 50 | damp/floor_joists_decking/joists_200x50 | material_unit_cost | 8.9 | 9.790000000000001 | platform = workbook x1.1 (wastage_factor=1.1) |
| R94 Joists, 225 x 50 | damp/floor_joists_decking/joists_225x50 | material_unit_cost | 9.5 | 10.450000000000001 | platform = workbook x1.1 (wastage_factor=1.1) |
| R95 Treat and endwrap joist | damp/floor_joists_decking/treat_endwrap_joist | material_unit_cost | 3.0 | 3.3000000000000003 | platform = workbook x1.1 (wastage_factor=1.1) |
| R96 Wall plate 100x25 | damp/floor_joists_decking/wall_plate_100x25 | material_unit_cost | 4.84 | 5.324 | platform = workbook x1.1 (wastage_factor=1.1) |
| R97 Bower beams (pair) | damp/floor_joists_decking/bower_beams | material_unit_cost | 36.0 | 39.6 | platform = workbook x1.1 (wastage_factor=1.1) |
| R98 Flitch plates (pair) | damp/floor_joists_decking/flitch_plates | material_unit_cost | 42.0 | 46.2 | platform = workbook x1.1 (wastage_factor=1.1) |
| R101 Install Weyrock flooring 18mm (M2) | damp/floor_joists_decking/weyrock_flooring_18mm | material_unit_cost | 18.0 | 19.8 | platform = workbook x1.1 (wastage_factor=1.1) |
| R102 Install Weyrock flooring 22mm (M2) | damp/floor_joists_decking/weyrock_flooring_22mm | material_unit_cost | 22.0 | 24.200000000000003 | platform = workbook x1.1 (wastage_factor=1.1) |
| R103 Install std T&G Floorboards (M2) | damp/floor_joists_decking/std_tongue_groove_floorboards | material_unit_cost | 46.3 | 50.93 | platform = workbook x1.1 (wastage_factor=1.1) |
| R104 Install Victorian T&G Floorboards (M2) | damp/floor_joists_decking/victorian_tongue_groove_floorboards | material_unit_cost | 52.8 | 58.08 | platform = workbook x1.1 (wastage_factor=1.1) |
| R105 Install Engineered Flooring sheet (M2) | damp/floor_joists_decking/engineered_flooring_sheet | material_unit_cost | 49.99 | 54.989000000000004 | platform = workbook x1.1 (wastage_factor=1.1) |
| R106 Install Structural Engineered Flooring sheet | damp/floor_joists_decking/structural_engineered_flooring_sheet | material_unit_cost | 52.8 | 58.08 | platform = workbook x1.1 (wastage_factor=1.1) |
| R107 Provide insulation to suspended flooring | damp/floor_joists_decking/insulation_suspended_flooring | material_unit_cost | 6.8 | 7.48 | platform = workbook x1.1 (wastage_factor=1.1) |
| R112 Clean out airbrick/fit new face | damp/airbricks/clean_out_airbrick | material_unit_cost | 16.0 | 17.6 | platform = workbook x1.1 (wastage_factor=1.1) |
| R113 Lift / upgrade existing airbrick/fit new fac | damp/airbricks/lift_upgrade_airbrick | material_unit_cost | 16.0 | 17.6 | platform = workbook x1.1 (wastage_factor=1.1) |
| R114 Install additional  airbrick | damp/airbricks/install_additional_airbrick | material_unit_cost | 16.0 | 17.6 | platform = workbook x1.1 (wastage_factor=1.1) |
| R123 Aco Drain per linear meter | damp/drains/aco_drain_lm | material_unit_cost | 8.0 | 8.8 | platform = workbook x1.1 (wastage_factor=1.1) |
| R124 French Drain per linear meter | damp/drains/french_drain_lm | material_unit_cost | 2.41 | 2.6510000000000002 | platform = workbook x1.1 (wastage_factor=1.1) |
| R132 Asbestos Testing | damp/asbestos_testing/asbestos_testing | material_unit_cost | 30.0 | 33.0 | platform = workbook x1.1 (wastage_factor=1.1) |
| R136 Rubbish removal skips | site_preparation/skip_hire/skip_hire | material_unit_cost | 270.0 | 297.0 | platform = workbook x1.1 (wastage_factor=1.1) |
| R88 Rubbish removal skips | site_preparation/skip_hire/skip_hire | material_unit_cost | 270.0 | 297.0 | platform = workbook x1.1 (wastage_factor=1.1) |
| R25 Antinox HD Floor Protection Boards – 2.4m x  | site_preparation/preparatory_work/floor_protection_boards | material_unit_cost | 4.5760000000000005 | 5.0336 | platform = workbook x1.1 (wastage_factor=1.1) |
| R37 Bag up debris & cart outside | site_preparation/strip_out_disposal/bag_cart_debris | material_unit_cost | 1.0 | 1.1 | platform = workbook x1.1 (wastage_factor=1.1) |
| R61 Wall/floor fillet joint | timber/cementitious_tanking/wallfloor_fillet_joint | material_unit_cost | 2.0 | 2.2 | platform = workbook x1.1 (wastage_factor=1.1) |
| R120 Rubbish removal skips | site_preparation/skip_hire/skip_hire | material_unit_cost | 270.0 | 297.0 | platform = workbook x1.1 (wastage_factor=1.1) |
| R25 Antinox HD Floor Protection Boards – 2.4m x  | site_preparation/preparatory_work/floor_protection_boards | material_unit_cost | 4.5760000000000005 | 5.0336 | platform = workbook x1.1 (wastage_factor=1.1) |
| R34 Bag up debris & cart outside | site_preparation/strip_out_disposal/bag_cart_debris | material_unit_cost | 1.0 | 1.1 | platform = workbook x1.1 (wastage_factor=1.1) |
| R91 Rubbish removal skips | site_preparation/skip_hire/skip_hire | material_unit_cost | 270.0 | 297.0 | platform = workbook x1.1 (wastage_factor=1.1) |

## TRUNCATED (16)

| Workbook line | Template | Field | Workbook | Platform | Note |
|---|---|---|---|---|---|
| R21 Remove radiators & cap valves | damp/preparatory_work/remove_radiators_valves | labour_rate_per_unit | 0.3333333333333333 | 0.333 |  |
| R25 Antinox HD Floor Protection Boards – 2.4m x  | site_preparation/preparatory_work/floor_protection_boards | labour_rate_per_unit | 0.03333333333333333 | 0.033 |  |
| R52 Technoseal Lm | damp/wall_membrane/technoseal | labour_rate_per_unit | 0.016666666666666666 | 0.0167 |  |
| R124 French Drain per linear meter | damp/drains/french_drain_lm | labour_rate_per_unit | 0.6666666666666666 | 0.667 |  |
| R21 Remove radiators & cap valves | timber/preparatory_work/remove_radiators_cap_valves | labour_rate_per_unit | 0.3333333333333333 | 0.333 |  |
| R25 Antinox HD Floor Protection Boards – 2.4m x  | site_preparation/preparatory_work/floor_protection_boards | labour_rate_per_unit | 0.03333333333333333 | 0.033 |  |
| R29 Remove carpet/tiles/overlays | timber/strip_out/remove_carpettilesoverlays | labour_rate_per_unit | 0.16666666666666666 | 0.167 |  |
| R51 Technoseal Lm | timber/wall_membrane/technoseal_lm | labour_rate_per_unit | 0.016666666666666666 | 0.0167 |  |
| R60 Renovating plaster | timber/cementitious_tanking/renovating_plaster | material_unit_cost | 5.958333333333334 | 5.958 | base_unit_cost |
| R72 Plasterboarding (inc dab/screws) | timber/plastering/plasterboarding_inc_dabscrews | material_unit_cost | 9.75591985428051 | 9.76 | base_unit_cost |
| R76 Plastering Thin Coat Angle/Corner Bead - 2.4 | timber/plastering/plastering_thin_coat_anglecorner_bead_24m_length | material_unit_cost | 1.826 | 1.83 | base_unit_cost |
| R21 Remove radiators & cap valves | woodworm/preparatory_work/remove_radiators_cap_valves | labour_rate_per_unit | 0.3333333333333333 | 0.333 |  |
| R25 Antinox HD Floor Protection Boards – 2.4m x  | site_preparation/preparatory_work/floor_protection_boards | labour_rate_per_unit | 0.03333333333333333 | 0.033 |  |
| R40 Plasterboarding (inc dab/screws) | woodworm/plastering/plasterboarding_inc_dabscrews | material_unit_cost | 9.75591985428051 | 9.76 | base_unit_cost |
| R43 Plastering Thin Coat Angle/Corner Bead - 2.4 | woodworm/plastering/plastering_thin_coat_anglecorner_bead_24m_length | material_unit_cost | 1.826 | 1.83 | base_unit_cost |
| R76 Fogging boarded area | woodworm/timber_treatments/fogging_boarded_area | labour_rate_per_unit | 0.023255813953488372 | 0.023 |  |

## QUIRK (6)

| Workbook line | Template | Field | Workbook | Platform | Note |
|---|---|---|---|---|---|
| R45 Wall membrane CM3  - 1.2mtr | damp/wall_membrane/wall_membrane_1_2m | pack_div_vs_step | 5.0 | 6.0 | workbook CEILING step differs from price divisor — verify representation |
| R49 Wall membrane CM3 - Subtotals for above 3 li | damp/wall_membrane/wall_membrane_2m | pack_div_vs_step | 5.0 | 10.0 | workbook CEILING step differs from price divisor — verify representation |
| R50 Membrane plugs for m2 listed | damp/wall_membrane/membrane_plugs | pack_div_vs_step | 2.0 | 10.0 | workbook CEILING step differs from price divisor — verify representation |
| R44 Wall membrane CM3  - 1.2mtr | timber/wall_membrane/wall_membrane_cm3_12mtr | pack_div_vs_step | 5.0 | 6.0 | workbook CEILING step differs from price divisor — verify representation |
| R48 Wall membrane CM3 - Subtotals for above 3 li | timber/wall_membrane/wall_membrane_cm3_subtotals_for_above_3_lines | pack_div_vs_step | 5.0 | 10.0 | workbook CEILING step differs from price divisor — verify representation |
| R49 Membrane plugs for m2 listed | timber/wall_membrane/membrane_plugs_for_m2_listed | pack_div_vs_step | 2.0 | 10.0 | workbook CEILING step differs from price divisor — verify representation |

## SPECIAL (17)

| Workbook line | Template | Field | Workbook | Platform | Note |
|---|---|---|---|---|---|
| R35 Disposal via licensed transfer agent | site_preparation/strip_out_disposal/licensed_disposal | material_formula | =IF(F35=0,0,IF(F35<=20,40/F35,2)) | tiered_disposal | bespoke workbook formula — needs manual/code-track verification |
| R35 Disposal via licensed transfer agent | site_preparation/strip_out_disposal/licensed_disposal | labour_formula | {'o_formula': '0', 'n_value': 0.0} | 0.0 | bespoke workbook labour — needs manual/code-track verification |
| R40 DPC Installation - Traditional | damp/dpc_traditional/dpc_injection_traditional | material_formula | =IF(D40+E40=0,0,(13.93/1.15)+(6/D40*4.29)) | dpc_injection | bespoke workbook formula — needs manual/code-track verification |
| R40 DPC Installation - Traditional | damp/dpc_traditional/dpc_injection_traditional | labour_formula | {'o_formula': '=D40*N40', 'n_value': 0.35} | 0.35 | bespoke workbook labour — needs manual/code-track verification |
| R61 Dubbing out coat (sand/cement/SBR) | damp/cementitious_tanking/dubbing_out_coat | material_formula | =IF(F61=0,0,CEILING.MATH(F61,2)*(((1*16.66/8)+(4*2.79/4)+(1*7.69/4))*1.1)/F61) | compound_material | bespoke workbook formula — needs manual/code-track verification |
| R79 Warmline Internal Wall Insulation | damp/*/warmline_iwi+warmline_iwi_adhesive | multi_template_formula | =IF(F79=0,0,((CEILING.MATH(F79,3.5625)*((196.67/7.125)*1.1))/F79)+((CEILING.MATH | warmline_iwi+warmline_iwi_adhesive | bespoke formula split across templates — verify via parity scenario |
| R128 Aquaban water repellent system | damp/aquaban/aquaban_system | labour_formula | {'o_formula': '=IF(F128=0,0,IF(F128=0,0,IF(F128<54,(N128*54),(N128*F128))))', 'n_value': 0.05} | 0.05 | bespoke workbook labour — needs manual/code-track verification |
| R136 Rubbish removal skips | site_preparation/skip_hire/skip_hire | labour_formula | {'o_formula': '0', 'n_value': 0.0} | 0.0 | bespoke workbook labour — needs manual/code-track verification |
| R62 Joinery to box in ducting (per metre) Min ch | condensation/joinery_ducting/joinery_to_box_in_ducting_per_metre_min_charge_24_metres | material_formula | =IF(F62=0,0,IF(F62<2.4,(15*2.4)/F62,15)) | standard | bespoke workbook formula — needs manual/code-track verification |
| R62 Joinery to box in ducting (per metre) Min ch | condensation/joinery_ducting/joinery_to_box_in_ducting_per_metre_min_charge_24_metres | labour_formula | {'o_formula': '=IF(F62=0,0,IF(F62=0,0,IF(F62<2.4,(N62*2.4),(N62*F62))))', 'n_value': 0.5} | 0.5 | bespoke workbook labour — needs manual/code-track verification |
| R88 Rubbish removal skips | site_preparation/skip_hire/skip_hire | labour_formula | {'o_formula': '0', 'n_value': 0.0} | 0.0 | bespoke workbook labour — needs manual/code-track verification |
| R38 Disposal via licensed transfer agent | site_preparation/strip_out_disposal/licensed_disposal | material_formula | =IF(F38=0,0,IF(F38<=20,40/F38,2)) | tiered_disposal | bespoke workbook formula — needs manual/code-track verification |
| R38 Disposal via licensed transfer agent | site_preparation/strip_out_disposal/licensed_disposal | labour_formula | {'o_formula': '0', 'n_value': 0.0} | 0.0 | bespoke workbook labour — needs manual/code-track verification |
| R73 Warmline Internal Wall Insulation | timber/*/warmline_internal_wall_insulation+warmline_iwi_adhesive | multi_template_formula | =IF(F73=0,0,((CEILING.MATH(F73,3.5625)*((196.67/7.125)*1.1))/F73)+((CEILING.MATH | warmline_internal_wall_insulation+warmline_iwi_adhesive | bespoke formula split across templates — verify via parity scenario |
| R120 Rubbish removal skips | site_preparation/skip_hire/skip_hire | labour_formula | {'o_formula': '0', 'n_value': 0.0} | 0.0 | bespoke workbook labour — needs manual/code-track verification |
| R35 Disposal via licensed transfer agent | site_preparation/strip_out_disposal/licensed_disposal | material_formula | =IF(F35=0,0,IF(F35<=20,40/F35,2)) | tiered_disposal | bespoke workbook formula — needs manual/code-track verification |
| R35 Disposal via licensed transfer agent | site_preparation/strip_out_disposal/licensed_disposal | labour_formula | {'o_formula': '0', 'n_value': 0.0} | 0.0 | bespoke workbook labour — needs manual/code-track verification |

## Unmatched platform templates (9) — no workbook line matched

| Template | Description | Formula |
|---|---|---|
| timber/floor_resin/grip_grit | Grip grit | ceiling_coverage |
| timber/floor_resin/ep40_2_pack_resin_top_coat | EP40 2 Pack resin top coat | ceiling_coverage |
| timber/timber_treatments/401_gel_injection_100mm_centres_plug_with_dowel | 40.1 Gel injection @100mm centres, plug with dowel | ceiling_coverage |
| timber/wall_membrane/wall_membrane_cm3_2mtr_1 | Wall membrane CM3  - 2mtr #1 | standard |
| timber/floor_resin/ep40_2_pack_resin_primer | EP40 2 Pack resin Primer | ceiling_coverage |
| timber/wall_membrane/wall_membrane_cm3_2mtr_3 | Wall membrane CM3  - 2mtr #3 | standard |
| timber/timber_treatments/masonry_sterilant_wyakbor_20_brush_applied | Masonry sterilant (Wyakbor 20) - brush applied | ceiling_coverage |
| timber/timber_treatments/protective_treatment_following_new_timbers_installation_dp_o | Protective treatment following new timbers installation (DP  | ceiling_coverage |
| timber/wall_membrane/wall_membrane_cm3_2mtr_2 | Wall membrane CM3  - 2mtr #2 | standard |
