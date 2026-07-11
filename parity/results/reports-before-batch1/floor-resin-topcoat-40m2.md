# Parity report — `floor-resin-topcoat-40m2`

**Verdict: FAIL — 11 variance(s)**

- Golden master: `workbook_extraction/workbooks/Copy of Damp Costing v48 CF - 220126.xlsm` (evaluated live)
- Engine: live pipeline: generateCostingFromSurvey + calculateTravelOverhead + replicated page summary

| Level | Item | Workbook (expected) | Platform (actual) | Δ | Status |
|---|---|---:|---:|---:|---|
| line | resin_topcoat [resin_topcoat_ep40] materials | 182.1820 | 165.6200 | -16.5620 | ❌ |
| line | resin_topcoat [resin_topcoat_ep40] hours | 1.6000 | 1.6000 | +0.0000 | ✅ |
| line | resin_topcoat [resin_topcoat_ep40] labour | 98.0160 | 98.0160 | +0.0000 | ✅ |
| line | resin_topcoat [resin_topcoat_ep40] total | 280.1980 | 263.6360 | -16.5620 | ❌ |
| line | UNEXPECTED engine line resin_primer_ep40 (floor_resin) total | 0.0000 | 245.4360 | +245.4360 | ❌ engine emitted a line the golden master does not |
| line | UNEXPECTED engine line grip_grit (floor_resin) total | 0.0000 | 29.9120 | +29.9120 | ❌ engine emitted a line the golden master does not |
| total | Materials subtotal | 182.1820 | 318.4480 | +136.2660 | ❌ |
| total | Labour subtotal | 98.0160 | 220.5360 | +122.5200 | ❌ |
| total | Labour hours | 1.6000 | 3.6000 | +2.0000 | ❌ |
| total | Days on site | 1.0000 | 0.0000 | -1.0000 | ❌ |
| total | Subtotal ex VAT | 280.1980 | 538.9840 | +258.7860 | ❌ |
| total | VAT | 56.0396 | 107.7968 | +51.7572 | ❌ |
| total | Total inc VAT | 336.2376 | 646.7808 | +310.5432 | ❌ |
