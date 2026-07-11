# Golden-Master Parity Harness

Proves — to the penny — that the platform's costing engine reproduces the
original Excel workbooks, which are the **golden master** for all pricing
(client requirement, technical review 11 July 2026). **No costing change is
complete until every scenario in this harness passes** (review "release gate"):
customer prices, labour hours, materials, travel and (when implemented)
subcontractor outputs must all match.

## How it works

```
parity/scenarios/<id>.json          one job, described once, in two dialects:
        │                            oracle: workbook input cells (semantic names)
        │                            wizard: survey_data/room_data the app collects
        ├──► parity/oracle/run_oracle.py
        │      loads the REAL .xlsm (workbook_extraction/workbooks/),
        │      injects inputs, evaluates all formulas via `formulas`,
        │      extracts lines/sections/totals per oracle/cellmaps/<workbook>.json
        │      → results/expected/<id>.json        ← the golden truth
        │
        ├──► survey-system/scripts/parity/run-engine.ts   (npx tsx, from survey-system/)
        │      runs the app's REAL pipeline: generateCostingFromSurvey →
        │      calculateTravelOverhead → replicated page summary math,
        │      against the live TTDP Supabase templates/config
        │      → results/actual/<id>.json          ← what the platform says
        │
        └──► parity/compare.py
               joins lines (via cellmap line_keys) + totals, tolerance ±0.005
               → results/reports/<id>.md + SUMMARY.md, exit 1 on any variance
```

## Running

```bash
# from repo root
python3 parity/oracle/run_oracle.py --all
cd survey-system && npx tsx scripts/parity/run-engine.ts --all && cd ..
python3 parity/compare.py --all
```

Dependencies: `pip install --break-system-packages formulas` (pure-Python Excel
evaluator; installed 2026-07-11). `npx tsx` fetches on demand (same pattern as
`src/lib/__tests__/pricing-engine.smoke.ts`).

## Trust chain — why the oracle is believed

The oracle mechanism was validated before anything else was built: evaluating
the real Damp v48 workbook reproduced the client review's independently stated
benchmarks penny-exact —

| Benchmark (review, completed Damp v47) | Oracle on v48 master |
|---|---|
| DPC 18 LM @ 0.33 m: materials £104.58, 6.3 h, total £490.52 | £104.5794 / 6.3 h / £490.5174 ✅ |
| Floor resin 40 m² top coat only: £182.18 + £98.02 = £280.20 | £182.182 / £98.016 / £280.198 ✅ |

The `docs/workbook-analysis/*.md` extraction docs also match the live workbook —
the historical extraction *documents* were right; the defects arose in the
translation to engine code/templates.

## Layout

- `scenarios/` — one JSON per test job. Committed. Add scenarios per the review's
  regression set (Section 8, items 67–80).
- `oracle/cellmaps/damp_v48.json` — semantic name → row/cell map of the Costing
  sheet, verified against `docs/workbook-analysis/DAMP_WORKBOOK_ANALYSIS.md` §3.
  Cellmaps for condensation/timber/woodworm workbooks: to be added the same way.
- `fixtures/` — snapshot of `costing_line_templates` (220 rows) + `pricing_config`
  (16 keys) taken 2026-07-11 via docker exec. The engine runner reads the LIVE DB
  (what production computes with); fixtures document the data under test and map
  template ids → line_keys.
- `results/expected/` — committed golden outputs (regenerable).
- `results/actual/`, `results/reports/` — gitignored, regenerated per run.

## Known semantic gaps the harness makes visible (do not "fix" the oracle)

- The workbook takes DPC **thickness in metres**; the wizard collects **brick
  courses** (review point 6). Scenarios carry both dialects explicitly.
- The workbook prices only the floor-resin components entered; the platform
  force-bundles primer+topcoat+grip grit from one area (point 14A) — surfaces
  as UNEXPECTED-line failures.
- Workbook labour-hours subtotal (O140) excludes the asbestos section and skips;
  quirks are reproduced, not corrected.
- Subcontractor outputs (workbook columns U/V, rates D155/E155/J155) are in
  `expected/*.json` already; the engine has no subcontractor computation yet
  (review point 15) — the differ will start comparing them once it exists.

## Editing rules

1. Never change a cellmap/oracle to make a test pass — the workbook is right by
   definition. If a workbook quirk looks like a bug, flag it to Steven; only he
   can rule on it.
2. Engine-side fixes live in `survey-system/src/lib/` and must re-run the FULL
   suite (`--all`), not just the failing scenario.
3. The engine runner replicates the costing page's summary block
   (`costing/page.tsx` ~606-660) because that math is trapped in the React
   component. If you touch the page summary, update the runner (or extract a
   shared lib — preferred).
