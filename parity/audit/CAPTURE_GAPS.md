# Capture Gaps — RESOLVED (11 July 2026)

Superseded: every workbook row is now capturable (see GAP_REGISTER.md and the
full-coverage scenarios). This file records what REMAINS by design:

## Documented workbook defects (platform deliberately deviates — for Steve)
1. **Damp sheet omits its asbestos section from its own totals** (K139/O140
   skip K133): priced work the customer is never billed for. Platform bills it.
2. **Woodworm prep hours subtotal omits wallpaper + antinox hours**
   (SUM(O21:O23) ignores rows 24-25; the money IS included) — understates
   hours → days/travel on affected jobs. Platform counts them.
Both are declared per-scenario as `workbook_summation_defects` in the harness.

## Retained legacy behaviours (old surveys only; new fields always win)
- DPC courses × 0.215m fallback; resin floor_area→top-coat-only; tanking
  three-coat bundle; mould severity bands (3/6/12 m²); loft lift/relay from
  toggles; condensation legacy PIV/fan flat-field bundles.

## Known small items
- Digital DPC radius/construction dropdowns (workbook D42/E42) are not yet
  captured as record fields — pricing is flat and correct; capture is
  cosmetic for reports.
- 6 QUIRK pack-representation rows (CEILING step ≠ price divisor) are exact
  via rescaled catalog prices; a `price_divisor` param would let the catalog
  carry true supplier prices.
- 18 audit SPECIAL rows are bespoke formulas the static audit cannot
  value-check — all are now exercised dynamically by the scenario suite
  (DPC, dubbing compound, warmline pair + minimum, aquaban <54 m² labour
  minimum, joinery <2.4 m minimum, disposal tiers, whole-pack rows).
- 7 materials_catalog rows deactivated as no-ops (ADMIN_AUDIT.md) — proper
  supplier-price wiring is the documented follow-up.
