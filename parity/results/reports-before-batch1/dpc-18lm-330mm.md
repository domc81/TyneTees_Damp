# Parity report — `dpc-18lm-330mm`

**Verdict: FAIL — 11 variance(s)**

- Golden master: `workbook_extraction/workbooks/Copy of Damp Costing v48 CF - 220126.xlsm` (evaluated live)
- Engine: live pipeline: generateCostingFromSurvey + calculateTravelOverhead + replicated page summary

| Level | Item | Workbook (expected) | Platform (actual) | Δ | Status |
|---|---|---:|---:|---:|---|
| line | dpc_traditional [dpc_injection_traditional] materials | 104.5794 | 1,027.4838 | +922.9044 | ❌ |
| line | dpc_traditional [dpc_injection_traditional] hours | 6.3000 | 0.5250 | -5.7750 | ❌ |
| line | dpc_traditional [dpc_injection_traditional] labour | 385.9380 | 32.1615 | -353.7765 | ❌ |
| line | dpc_traditional [dpc_injection_traditional] total | 490.5174 | 1,059.6453 | +569.1279 | ❌ |
| total | Materials subtotal | 104.5794 | 1,027.4838 | +922.9044 | ❌ |
| total | Labour subtotal | 385.9380 | 32.1615 | -353.7765 | ❌ |
| total | Labour hours | 6.3000 | 0.5250 | -5.7750 | ❌ |
| total | Days on site | 1.0000 | 0.0000 | -1.0000 | ❌ |
| total | Subtotal ex VAT | 490.5174 | 1,059.6453 | +569.1279 | ❌ |
| total | VAT | 98.1035 | 211.9291 | +113.8256 | ❌ |
| total | Total inc VAT | 588.6209 | 1,271.5744 | +682.9535 | ❌ |
