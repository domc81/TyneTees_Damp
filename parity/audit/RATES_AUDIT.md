# Rates Audit — workbooks vs platform templates

Workbook formulas read directly from the .xlsm files; platform values follow the
engine's own precedence (catalog → params → base, × wastage_factor).

| Workbook | line rows | matched to templates | labour rate | contractor | vehicle/mile |
|---|---:|---:|---:|---:|---:|
| damp | 74 | 71 | 30.63 | 28.0 | 0.5 |
| condensation | 35 | 35 | 30.63 | 28.0 | 0.5 |
| timber | 70 | 67 | 30.63 | 28.0 | 0.5 |
| woodworm | 51 | 51 | 30.63 | 28.0 | 0.5 |

| Class | Count |
|---|---:|
| WRONG_RATE | 0 |
| MODEL_MISMATCH | 0 |
| MISSING_WASTAGE | 0 |
| EXTRA_WASTAGE | 0 |
| WRONG_COVERAGE | 0 |
| MARKUP | 0 |
| TRUNCATED | 0 |
| QUIRK | 6 |
| SPECIAL | 18 |
| UNMATCHED workbook lines | 0 |
| UNMATCHED platform templates | 3 |

## QUIRK (6)

| Workbook line | Template | Field | Workbook | Platform | Note |
|---|---|---|---|---|---|
| R45 Wall membrane CM3  - 1.2mtr | damp/wall_membrane/wall_membrane_1_2m | pack_div_vs_step | 5.0 | 6.0 | workbook CEILING step differs from price divisor — verify representation |
| R49 Wall membrane CM3 - Subtotals for above 3 li | damp/wall_membrane/wall_membrane_2m | pack_div_vs_step | 5.0 | 10.0 | workbook CEILING step differs from price divisor — verify representation |
| R50 Membrane plugs for m2 listed | damp/wall_membrane/membrane_plugs | pack_div_vs_step | 2.0 | 10.0 | workbook CEILING step differs from price divisor — verify representation |
| R44 Wall membrane CM3  - 1.2mtr | timber/wall_membrane/wall_membrane_cm3_12mtr | pack_div_vs_step | 5.0 | 6.0 | workbook CEILING step differs from price divisor — verify representation |
| R48 Wall membrane CM3 - Subtotals for above 3 li | timber/wall_membrane/wall_membrane_cm3_subtotals_for_above_3_lines | pack_div_vs_step | 5.0 | 10.0 | workbook CEILING step differs from price divisor — verify representation |
| R49 Membrane plugs for m2 listed | timber/wall_membrane/membrane_plugs_for_m2_listed | pack_div_vs_step | 2.0 | 10.0 | workbook CEILING step differs from price divisor — verify representation |

## SPECIAL (18)

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
| R67 Grip grit | timber/floor_resin/grip_grit | labour_formula | {'o_formula': '=F67*0.01', 'n_value': None} | 0.01 | bespoke workbook labour — needs manual/code-track verification |
| R73 Warmline Internal Wall Insulation | timber/*/warmline_internal_wall_insulation+warmline_iwi_adhesive | multi_template_formula | =IF(F73=0,0,((CEILING.MATH(F73,3.5625)*((196.67/7.125)*1.1))/F73)+((CEILING.MATH | warmline_internal_wall_insulation+warmline_iwi_adhesive | bespoke formula split across templates — verify via parity scenario |
| R120 Rubbish removal skips | site_preparation/skip_hire/skip_hire | labour_formula | {'o_formula': '0', 'n_value': 0.0} | 0.0 | bespoke workbook labour — needs manual/code-track verification |
| R35 Disposal via licensed transfer agent | site_preparation/strip_out_disposal/licensed_disposal | material_formula | =IF(F35=0,0,IF(F35<=20,40/F35,2)) | tiered_disposal | bespoke workbook formula — needs manual/code-track verification |
| R35 Disposal via licensed transfer agent | site_preparation/strip_out_disposal/licensed_disposal | labour_formula | {'o_formula': '0', 'n_value': 0.0} | 0.0 | bespoke workbook labour — needs manual/code-track verification |

## Unmatched platform templates (3) — no workbook line matched

| Template | Description | Formula |
|---|---|---|
| timber/wall_membrane/wall_membrane_cm3_2mtr_1 | Wall membrane CM3  - 2mtr #1 | standard |
| timber/wall_membrane/wall_membrane_cm3_2mtr_3 | Wall membrane CM3  - 2mtr #3 | standard |
| timber/wall_membrane/wall_membrane_cm3_2mtr_2 | Wall membrane CM3  - 2mtr #2 | standard |
