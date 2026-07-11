# Parity report — `dpc-resin-travel-20mi-2men`

**Verdict: FAIL — 14 variance(s)**

- Golden master: `workbook_extraction/workbooks/Copy of Damp Costing v48 CF - 220126.xlsm` (evaluated live)
- Engine: live pipeline: generateCostingFromSurvey + calculateTravelOverhead + replicated page summary

| Level | Item | Workbook (expected) | Platform (actual) | Δ | Status |
|---|---|---:|---:|---:|---|
| line | dpc_traditional [dpc_injection_traditional] materials | 104.5794 | 1,027.4838 | +922.9044 | ❌ |
| line | dpc_traditional [dpc_injection_traditional] hours | 6.3000 | 0.5250 | -5.7750 | ❌ |
| line | dpc_traditional [dpc_injection_traditional] labour | 385.9380 | 32.1615 | -353.7765 | ❌ |
| line | dpc_traditional [dpc_injection_traditional] total | 490.5174 | 1,059.6453 | +569.1279 | ❌ |
| line | resin_topcoat [resin_topcoat_ep40] materials | 182.1820 | 165.6200 | -16.5620 | ❌ |
| line | resin_topcoat [resin_topcoat_ep40] hours | 1.6000 | 1.6000 | +0.0000 | ✅ |
| line | resin_topcoat [resin_topcoat_ep40] labour | 98.0160 | 98.0160 | +0.0000 | ✅ |
| line | resin_topcoat [resin_topcoat_ep40] total | 280.1980 | 263.6360 | -16.5620 | ❌ |
| line | UNEXPECTED engine line resin_primer_ep40 (floor_resin) total | 0.0000 | 245.4360 | +245.4360 | ❌ engine emitted a line the golden master does not |
| line | UNEXPECTED engine line grip_grit (floor_resin) total | 0.0000 | 29.9120 | +29.9120 | ❌ engine emitted a line the golden master does not |
| total | Materials subtotal | 286.7614 | 1,345.9318 | +1,059.1704 | ❌ |
| total | Labour subtotal | 483.9540 | 252.6975 | -231.2565 | ❌ |
| total | Labour hours | 7.9000 | 4.1250 | -3.7750 | ❌ |
| total | Travel (PSO) | 101.6800 | 101.6800 | +0.0000 | ✅ |
| total | Travel hours | 2.6667 | 2.6667 | +0.0000 | ✅ |
| total | Days on site | 1.0000 | 1.0000 | +0.0000 | ✅ |
| total | Subtotal ex VAT | 872.3954 | 1,700.3093 | +827.9139 | ❌ |
| total | VAT | 174.4791 | 340.0619 | +165.5828 | ❌ |
| total | Total inc VAT | 1,046.8745 | 2,040.3712 | +993.4967 | ❌ |
