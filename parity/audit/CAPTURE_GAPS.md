# Capture Gaps & Open Items — workbook rows vs platform fields

Generated from the four-workbook parity extension (11 July 2026). Two kinds of
item: **capture gaps** (workbook rows the survey wizard cannot record yet — the
crew can price these on paper but not on the platform) and **open questions for
Steve**. None of these affect achieved parity: scenarios exercise only
implemented fields; these are the frontier.

## Capture gaps — TIMBER (workbook v33)

| Workbook row | What it prices | Platform status |
|---|---|---|
| R29 Remove carpet/tiles/overlays | strip-out m² | no field |
| R30 Remove plaster/render (Walls) | strip-out m² | no field (ceiling strip now correctly routes to R32) |
| R31 Removal of stud walls | strip-out m² | no field |
| R34 Scrape back/clear sub floors | strip-out m² | no field |
| R42 Apply 2× Brunosol / 1× Wykabor 20:1 | timber treatment m² | no field |
| R43-54 Wall membrane section | full membrane kit | no timber fields (damp-only feature) |
| R58-61 Tanking section | dubbing/slurry/renovating plaster | no timber fields |
| R65-67 Floor resin (WHOLE-PACK model) | see open item 3 | no timber fields |
| R71-78 Plastering section (stud/board/warmline/skim) | room plastering | no timber room fields (only job-level bead counts via shared additional works) |

Bags note: workbook bags = SUM(R29:R34)×2; platform currently drives R32+R33
only (ceiling + floor strip), so bags derive from those two — correct for what
can be captured, short of the paper workflow until the fields above exist.

## Capture gaps — WOODWORM (workbook v26)

| Workbook row | What it prices | Platform status |
|---|---|---|
| R21-25 Preparatory work (radiators/sockets/skirting/wallpaper) | prep counts | no woodworm room fields (damp has them via walls[]) |
| R29-33 Strip-out (plaster walls / stud / lath ceilings / timber floor / scrape) | strip m² | no fields — bags therefore always 0 |
| R39-45 Plastering section | room plastering | no fields (job-level beads only) |
| R50-59 Joists/timbers (6 sizes + endwrap/wall plate/bower/flitch) | replacement timbers | **no woodworm fields** (timber type has them; woodworm mapping emits none) |
| R61-68 Flooring/decking | boards/sheets | no woodworm fields |
| R72 Clear debris from sub floor | m² | no woodworm field (timber has one) |
| R73 Protective treatment to new timbers | m² | no woodworm field |

## Capture gaps — CONDENSATION (workbook v37)

| Item | Status |
|---|---|
| `ducting_components[]` (11 component types, rows R30-39) | mapping reads the array; **no UI writes it** — components currently unpriceable from the wizard |
| Joinery boxing LM (R62) | field exists (`joinery_ducting_boxwork_lm`); min-charge 2.4 m equivalence verified |

## Open questions for Steve

1. **PIV-loft −5% dial:** the condensation MASTER ships with `F25 = -5` (Section
   Price Adjustment on the PIV loft section) — the only non-zero dial in all
   four workbooks. Intended standing pricing, or residue from the last job saved
   into the master? (Parity scenario neutralises it and flags it.)
2. **Mould severity bands:** the platform derives mould-treatment area from
   severity (light=3 / moderate=6 / severe=12 m²); the workbook takes free m².
   Confirm the bands or switch to a free m² field.
3. **Timber floor-resin model:** timber R65-67 price by WHOLE PACKS
   (`ROUNDUP(area/30) × pack price`, markup referenced from J59) — different
   from damp's per-m² CEILING spread. The platform's timber resin templates
   were seeded damp-style: before timber resin fields are added, these three
   templates (plus sterilant/protective/gel R105-107, same whole-pack shape)
   need either a `whole_pack` formula type or template conversion. Currently
   inert (no timber resin capture) but flagged WRONG_RATE in the audit on
   purpose so it cannot be forgotten.
4. **Cross-row markup quirk:** timber resin K-formulas reference `J59`
   (the tanking row's markup cell) rather than their own row — confirm 0.3 is
   the intended markup for those rows (it is 0.3 today).
5. Existing housekeeping list: 6 QUIRK step-vs-divisor representations, timber
   2m-membrane feeder templates + duplicate keys to deactivate/reconcile.

## Follow-up features already queued elsewhere

Warmline as a wall-treatment option (review pt 4), resin difficulty row (damp
F73), airbricks-by-elevation record (pt 5), admin-mileage/crew ownership
(pt 7), internal operational outputs (pt 15), payment staging (pt 16).
