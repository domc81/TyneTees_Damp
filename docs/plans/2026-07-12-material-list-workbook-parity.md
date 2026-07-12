# Material list — workbook parity (Operations view)

**Date:** 2026-07-12 · **Trigger:** Dominic's review of the Operations tab: quantities showed raw engine
inputs at forced 2dp with no units. Decision: the material list must match the workbook's own output.

## Golden master

The damp workbook (v48) has a dedicated **`Material-List` sheet** — the only one ever built
(timber v33 / woodworm v26 have a `Sub Contractor Mats` sheet whose body is literally "TBC";
condensation v37 has none). It is a procurement sheet: per purchasable SKU, a Qty cell with an
explicit purchase-rounding formula over the Costing sheet's F/D input cells, a UOM text column,
usage-logic notes, and preservationshop.co.uk product links. Display formats: Qty is integer (`0`)
except TIWI rolls (0.5-roll steps, `0.0`) and Technoseal (0.1-tub steps, `0.0`).

The companion **`Sub Contractor Costs` sheet** (all four workbooks) shows per-section **pay (V) +
projected hours (O, 1dp)** only — no quantities, no materials money — with Warmline split out of
Plastering as its own row (`D15 = Costing!V85 − D16`).

## Scope

1. **`src/lib/material-purchase-list.ts`** — the 27 damp SKU rules transcribed exactly from
   Material-List E-cells, keyed by template `line_key`, evaluated over the engine's calculated
   lines. Non-damp survey types get a measurement list (template UOM shown) — matching the
   workbook, which has no purchase rules for them.
2. **`pricing-data.ts`** — thread `line_key` + `uom` onto `CalculatedLine` (additive).
3. **Parity gate** — `damp_v48.json` cellmap gains a `material_list` block; `run_oracle.py`
   evaluates the actual Material-List sheet cells; `run-engine.ts` emits our purchase quantities;
   `compare.py` diffs them. Every SKU rule is verified against live Excel evaluation.
4. **Operations UI** — material list card rebuilt workbook-style (grouped, Item/Qty/UOM, usage
   notes, product links, the "no joinery materials" caveat, per-SKU display precision);
   contractor sections split Warmline into its own row (workbook tab behaviour); print
   work-instruction measurements gain units.

## SKU rules (workbook cell → rule)

| SKU | Workbook Qty formula | Inputs (line_key) |
|---|---|---|
| Antinox boards | `=F25` | floor_protection_boards |
| DPC cream 1ltr | `IF(F40=0,0, IF(F40/1.15×1.1<0.5, 1, MOD≥0.5?ROUNDUP:ROUNDDOWN(F40/1.15)))` | dpc_injection_traditional (F40 = LM × thickness) |
| Drill plugs 12mm | `CEILING(D40/6×50, 50)` | dpc_injection_traditional (D40 = LM) |
| Mursec Eco unit | `=F42` (0/1 flag) | dpc_installation_digital |
| CM3 membrane 1m / 1.2m / 2m | `CEILING(F, 5)` each | wall_membrane_1m / _1_2m / _2m |
| Membrane fixing plugs | `CEILING(Σmembrane×10, 20)` | the three membrane lines |
| Sealing tape 22m rolls | `ROUNDUP(F51/22)` | sealing_tape |
| Technoseal 5ltr | `ROUNDUP(F52/80, 1)` | technoseal |
| Universal Mortar 25kg | `ROUNDUP((F53+F64+F71)/12)` | wall_floor_fillet_joint + _tanking + _resin |
| Fibre/fleece tape 5m rolls | `ROUNDUP(F55/5)` | overtape |
| Rope 5m rolls | `ROUNDUP(F56/5)` | fixing_rope |
| SBR latex / sand / cement | `ROUNDUP(F61/8)` / `ROUNDUP(F61)` / `ROUNDUP(F61/4)` | dubbing_out_coat |
| Hydradry 20kg | `ROUNDUP(F62/7)` | tankingslurry_2coat |
| Renovating plaster 20kg | `ROUNDUP(F63/3)` | renovating_plaster |
| EP40 primer / top coat | `ROUNDUP(F/30)` | resin_primer_ep40 / resin_topcoat_ep40 |
| Grip grit | `ROUNDUP(F72/30×1.1)` | grip_grit |
| Plasterboards | `ROUNDUP(F78/1.098)` | plaster_boarding |
| Multi finish 25kg | `ROUNDUP(F80/10)` | skimming_walls |
| TIWI rolls | `CEILING(F79/7.125, 0.5)` | warmline_iwi |
| TIWI adhesive tubs | `ROUNDUP(F79/7.125)` | warmline_iwi |
| Stop/corner beads | `=F81/F82/F83` | plastering_stop_bead, thin_coat_angle_2_4m, thin_coat_angle_3m |
| Plastic airbricks | `(F112+F113+F114)×2` | the three airbrick lines |
| Microtech 400g | `ROUNDUP(F118/100)` | fog_subfloor_antifungal |
| Enviroseal 5ltr | `ROUNDUP(F128/25)` | aquaban_system |

Excluded by the workbook itself (do not add): joinery (joists, stud work, flooring), ACO drains,
strip-out/disposal/skip rows, asbestos, difficulty hours. The sheet's caveat banner is reproduced.

## Decisions for Steven

- Timber/woodworm purchase rules do not exist in the workbooks ("TBC") — the platform shows
  honest measurement quantities for those types until he specifies rules. Not invented.
- The workbook's DPC-cream rounding is asymmetric (×1.1 only in the minimum-of-one check,
  round-to-nearest on the tube count) — reproduced faithfully, worth confirming intent.
