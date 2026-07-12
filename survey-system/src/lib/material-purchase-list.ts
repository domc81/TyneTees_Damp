// =============================================================================
// Material purchase list — the damp workbook's `Material-List` sheet.
//
// The workbook (v48) is the golden master: every rule below is a direct
// transcription of a Material-List Qty cell (column E), converting the Costing
// sheet's job quantities (F/D input cells == our engine line quantities, which
// are parity-gated) into WHOLE PURCHASABLE UNITS — packs, rolls, bags, tubs —
// with the sheet's own rounding. The parity harness evaluates the real Excel
// cells and diffs them against this module for every damp scenario; a rule
// change is not complete until `run_oracle.py → run-engine.ts → compare.py`
// passes. NEVER tweak a rule to make a test pass — investigate.
//
// Scope: the damp workbook is the ONLY one with purchase rules. Timber v33 and
// woodworm v26 have a "Sub Contractor Mats" sheet whose body is literally
// "TBC"; condensation v37 has none. Non-damp lines therefore surface as job
// measurements (with UOM), not invented pack counts — extending the rules to
// other survey types is Steven's call, not ours.
//
// The sheet's own exclusions apply here too: no joinery (joists, stud work,
// flooring), no ACO drains, no strip-out/disposal/skip, no asbestos.
// =============================================================================

import type { CalculatedLine, CalculationResult } from './pricing-data'

export interface PurchaseItem {
  /** Stable key — parity cellmap `material_list` items use the same keys */
  sku: string
  /** Workbook group header (e.g. "Walls - Membrane") */
  group: string
  /** Workbook product name (Material-List column D) */
  product: string
  /** Workbook UOM text (column F) */
  uom: string
  /** Workbook usage/logic note (column I) */
  usageNote?: string
  /** Supplier product link (column J, preservationshop.co.uk) */
  productUrl?: string
  /** Purchase quantity per the workbook rule */
  quantity: number
  /** Display decimals — workbook E-cell number format (0 or 0.0) */
  precision: 0 | 1
}

export interface MeasurementItem {
  sectionKey: string
  description: string
  quantity: number
  uom: string
}

// --- Excel function semantics (positive domain — quantities are never negative)
const roundUp = (x: number, digits = 0): number => {
  const f = Math.pow(10, digits)
  return Math.ceil(x * f) / f
}
const ceilingMath = (x: number, significance: number): number =>
  Math.ceil(x / significance) * significance

interface RuleInputs {
  /** Sum of engine line inputQuantity per template line_key */
  q: (lineKey: string) => number
  /** DPC volume — workbook F40 = LM × wall thickness (m) */
  dpcVolume: number
}

interface SkuRule {
  sku: string
  group: string
  product: string
  uom: string
  usageNote?: string
  productUrl?: string
  precision: 0 | 1
  /** Transcription of the Material-List E-cell formula */
  compute: (i: RuleInputs) => number
}

const PS = 'https://www.preservationshop.co.uk/product'

// Workbook row order preserved (Material-List rows 13–59).
const DAMP_SKU_RULES: SkuRule[] = [
  {
    sku: 'antinox_boards', group: 'Prep Work',
    product: 'Antinox Heavy Duty Floor Protection Boards – 2.4m x 1.2m',
    uom: 'Per sheet', usageNote: 'As specified on the cost sheet',
    productUrl: `${PS}/antinox-heavy-duty-floor-protection-boards-2-4m-x-1-2m/`,
    precision: 0,
    compute: (i) => i.q('floor_protection_boards'), // E13 = Costing!F25
  },
  {
    sku: 'dpc_cream_cartridges', group: 'Walls - DPC',
    product: 'Wykamol Ultracure Damp Proofing Cream',
    uom: '1ltr Cartridge',
    usageNote: '10 linear metres at a 115mm brick thickness = 1.15 volume per tube',
    productUrl: `${PS}/wykamol-ultracure-damp-proofing-cream/`,
    precision: 0,
    // E16: IF(F40=0,0, IF(F40/(10*0.115)*1.1<0.5, 1,
    //        IF(MOD(F40/(10*0.115),1)>=0.5, ROUNDUP(F40/(10*0.115),0),
    //                                       ROUNDDOWN(F40/(10*0.115),0))))
    // The ×1.1 appears ONLY in the minimum-of-one check; the tube count itself
    // rounds to NEAREST — asymmetry reproduced from the sheet, flagged to Steven.
    compute: (i) => {
      const vol = i.dpcVolume
      if (vol === 0) return 0
      const base = vol / (10 * 0.115)
      if (base * 1.1 < 0.5) return 1
      return base % 1 >= 0.5 ? Math.ceil(base) : Math.floor(base)
    },
  },
  {
    sku: 'dpc_drill_plugs', group: 'Walls - DPC',
    product: 'Drill Plugs 12mm – Grey or Black',
    uom: 'Each (rounded to multiples of 50)', usageNote: '50 plugs to every 6LM',
    productUrl: `${PS}/12mm-drill-plugs-grey-for-dpc-injection/`,
    precision: 0,
    compute: (i) => {
      const lm = i.q('dpc_injection_traditional') // workbook D40
      return lm === 0 ? 0 : ceilingMath((lm / 6) * 50, 50) // E17
    },
  },
  {
    sku: 'mursec_eco_unit', group: 'Walls - DPC',
    product: 'Mursec Eco Unit (digital DPC)',
    uom: 'Each', usageNote: 'As specified on the cost sheet',
    precision: 0,
    compute: (i) => i.q('dpc_installation_digital'), // E18 = Costing!F42 (0/1 flag)
  },
  {
    sku: 'cm3_membrane_1m', group: 'Walls - Membrane',
    product: 'Wykamol CM3 Mesh Cavity Drain Membrane - 1 mtr',
    uom: 'M2', usageNote: 'Round to lengths of 5mtrs as we cut the rolls in multiples of 5',
    productUrl: `${PS}/wykamol-cm3-mesh-cavity-drain-membrane/`,
    precision: 0,
    compute: (i) => (i.q('wall_membrane_1m') === 0 ? 0 : ceilingMath(i.q('wall_membrane_1m'), 5)), // E21
  },
  {
    sku: 'cm3_membrane_1_2m', group: 'Walls - Membrane',
    product: 'Wykamol CM3 Mesh Cavity Drain Membrane - 1.2mtr',
    uom: 'M2', usageNote: 'Round to lengths of 5mtrs as we cut the rolls in multiples of 5',
    productUrl: `${PS}/wykamol-cm3-mesh-cavity-drain-membrane/`,
    precision: 0,
    compute: (i) => (i.q('wall_membrane_1_2m') === 0 ? 0 : ceilingMath(i.q('wall_membrane_1_2m'), 5)), // E22
  },
  {
    sku: 'cm3_membrane_2m', group: 'Walls - Membrane',
    product: 'Wykamol CM3 Mesh Cavity Drain Membrane - 2mtr',
    uom: 'M2', usageNote: 'Round to lengths of 5mtrs as we cut the rolls in multiples of 5',
    productUrl: `${PS}/wykamol-cm3-mesh-cavity-drain-membrane/`,
    precision: 0,
    compute: (i) => (i.q('wall_membrane_2m') === 0 ? 0 : ceilingMath(i.q('wall_membrane_2m'), 5)), // E23 (F49 subtotal)
  },
  {
    sku: 'membrane_fixing_plugs', group: 'Walls - Membrane',
    product: 'Cavity Membrane Fixing Plugs – 50mm',
    uom: 'Each (rounded to multiples of 20)', usageNote: 'Based on 10 plugs per m2',
    productUrl: `${PS}/cavity-membrane-fixing-plugs-50mm/`,
    precision: 0,
    // E24 = CEILING(SUM(F44:F48)*10, 20); our 2m line IS the F49 subtotal of F46:F48
    compute: (i) => {
      const area = i.q('wall_membrane_1m') + i.q('wall_membrane_1_2m') + i.q('wall_membrane_2m')
      return area === 0 ? 0 : ceilingMath(area * 10, 20)
    },
  },
  {
    sku: 'membrane_sealing_tape', group: 'Walls - Membrane',
    product: 'Wykamol Membrane Sealing Tape – 28mm x 22m',
    uom: 'Roll x 22 mtrs', usageNote: 'Round to rolls of 22mtrs as we sell in rolls of 22mtr minimum',
    productUrl: `${PS}/wykamol-membrane-sealing-tape-28mm-x-22m/`,
    precision: 0,
    compute: (i) => roundUp(i.q('sealing_tape') / 22), // E25 = ROUNDUP(F51/22,0)
  },
  {
    sku: 'technoseal_dpm', group: 'Walls - Membrane',
    product: 'Wykamol Technoseal Liquid Damp Proofing Membrane 5ltr (DPM)',
    uom: '5ltr Container', usageNote: 'Estimated usage is 80LM per 5ltr container',
    productUrl: `${PS}/wykamol-technoseal-liquid-damp-proofing-membrane-dpm/`,
    precision: 1,
    compute: (i) => roundUp(i.q('technoseal') / 80, 1), // E26 = ROUNDUP(F52/80,1)
  },
  {
    sku: 'universal_mortar', group: 'Walls - Membrane',
    product: 'Wykamol – Universal Mortar',
    uom: '25kg Bag',
    usageNote: 'Estimated usage is 12 LM per 25kg bag — covers all fillet seal for the whole costing',
    productUrl: `${PS}/wykamol-universal-mortar/`,
    precision: 0,
    // E27 = ROUNDUP((F53+F64+F71)/12,0) — membrane + tanking + resin fillet joints
    compute: (i) =>
      roundUp(
        (i.q('wall_floor_fillet_joint') + i.q('wall_floor_fillet_tanking') + i.q('wall_floor_fillet_resin')) / 12
      ),
  },
  {
    sku: 'fleece_tape', group: 'Walls - Membrane',
    product: 'Wykamol Membrane Fibre/Fleece Tape – 115mm X 5m',
    uom: 'Roll x 5 mtrs', usageNote: 'Round to rolls of 5mtrs as we sell in rolls of 5mtr minimum',
    productUrl: `${PS}/wykamol-fibre-tape/`,
    precision: 0,
    compute: (i) => roundUp(i.q('overtape') / 5), // E28 = ROUNDUP(F55/5,0)
  },
  {
    sku: 'fixing_rope', group: 'Walls - Membrane',
    product: 'Wykamol Rope 10mm x 5m',
    uom: 'Roll x 5 mtrs', usageNote: 'Round to rolls of 5mtrs as we sell in rolls of 5mtr minimum',
    productUrl: `${PS}/wykamol-rope-10mm-x-5m/`,
    precision: 0,
    compute: (i) => roundUp(i.q('fixing_rope') / 5), // E29 = ROUNDUP(F56/5,0)
  },
  {
    sku: 'sbr_latex', group: 'Cementitious tanking system',
    product: 'Wykamol SBR Latex – 5ltr',
    uom: '5ltr Container',
    usageNote: 'Dubbing out coat: 4 metres uses 4 bags sand, 1 bag cement, 0.5 tub SBR',
    productUrl: `${PS}/wykamol-sbr-latex-5l/`,
    precision: 0,
    compute: (i) => roundUp(i.q('dubbing_out_coat') / 8), // E32 = ROUNDUP(F61/8,0)
  },
  {
    sku: 'building_sand', group: 'Cementitious tanking system',
    product: 'Building Sand',
    uom: 'Per bag', usageNote: 'Dubbing out coat — 1 bag per metre',
    precision: 0,
    compute: (i) => roundUp(i.q('dubbing_out_coat')), // E33 = ROUNDUP(F61,0)
  },
  {
    sku: 'cement_25kg', group: 'Cementitious tanking system',
    product: 'Cement 25kg',
    uom: 'Per bag', usageNote: 'Dubbing out coat — 1 bag per 4 metres',
    productUrl: `${PS}/cement/`,
    precision: 0,
    compute: (i) => roundUp(i.q('dubbing_out_coat') / 4), // E34 = ROUNDUP(F61/4,0)
  },
  {
    sku: 'hydradry_slurry', group: 'Cementitious tanking system',
    product: 'Wykamol Hydradry Tanking Slurry – 20kg',
    uom: '20kg Container', usageNote: '7 mtrs coverage per tub',
    productUrl: `${PS}/hydradry-tanking-slurry/`,
    precision: 0,
    compute: (i) => roundUp(i.q('tankingslurry_2coat') / 7), // E35 = ROUNDUP(F62/7,0)
  },
  {
    sku: 'renovating_plaster', group: 'Cementitious tanking system',
    product: 'Wykamol Renovating Plaster – 20kg Bag',
    uom: '20kg Bag', usageNote: 'Wykamol suggest 3 m² / 20kg bag at 10mm thickness',
    productUrl: `${PS}/renovating-plaster/`,
    precision: 0,
    compute: (i) => roundUp(i.q('renovating_plaster') / 3), // E36 = ROUNDUP(F63/3,0)
  },
  {
    sku: 'ep40_primer', group: 'Floor - Liquid Resin Floor Membranes',
    product: 'EP40 2 Pack resin Primer',
    uom: '5ltr Container', usageNote: '30 mtrs coverage per tub',
    productUrl: `${PS}/ep40-primer-coat/`,
    precision: 0,
    compute: (i) => roundUp(i.q('resin_primer_ep40') / 30), // E39 = ROUNDUP(F69/30,0)
  },
  {
    sku: 'ep40_topcoat', group: 'Floor - Liquid Resin Floor Membranes',
    product: 'EP40 2 Pack resin top coat',
    uom: '5ltr Container', usageNote: '30 mtrs coverage per tub',
    productUrl: `${PS}/wykamol-ep40-epoxy-floor-coating-5l-grey/`,
    precision: 0,
    compute: (i) => roundUp(i.q('resin_topcoat_ep40') / 30), // E40 = ROUNDUP(F70/30,0)
  },
  {
    sku: 'grip_grit', group: 'Floor - Liquid Resin Floor Membranes',
    product: 'Grip grit',
    uom: 'Bag', usageNote: '25 mtrs coverage per bag',
    productUrl: `${PS}/grip-grit/`,
    precision: 0,
    compute: (i) => roundUp((i.q('grip_grit') / 30) * 1.1), // E41 = ROUNDUP((F72/30)*1.1,0)
  },
  {
    sku: 'plasterboards', group: 'Plastering & finishing',
    product: 'Plasterboards, 1220mm x 900mm x 9.5mm',
    uom: 'Each', usageNote: '1 board covers 1.098 m2',
    precision: 0,
    compute: (i) => roundUp(i.q('plaster_boarding') / 1.098), // E44 = ROUNDUP(F78/1.098,0)
  },
  {
    sku: 'stop_bead_3m', group: 'Plastering & finishing',
    product: 'Plastering Stop Bead - 3m length',
    uom: 'Each', usageNote: 'As specified on the cost sheet',
    precision: 0,
    compute: (i) => i.q('plastering_stop_bead'), // E45 = Costing!F81
  },
  {
    sku: 'corner_bead_2_4m', group: 'Plastering & finishing',
    product: 'Plastering Thin Coat Angle/Corner Bead - 2.4m length',
    uom: 'Each', usageNote: 'As specified on the cost sheet',
    precision: 0,
    compute: (i) => i.q('thin_coat_angle_2_4m'), // E46 = Costing!F82
  },
  {
    sku: 'corner_bead_3m', group: 'Plastering & finishing',
    product: 'Plastering Thin Coat Angle/Corner Bead - 3m length',
    uom: 'Each', usageNote: 'As specified on the cost sheet',
    precision: 0,
    compute: (i) => i.q('thin_coat_angle_3m'), // E47 = Costing!F83
  },
  {
    sku: 'multi_finish_plaster', group: 'Plastering & finishing',
    product: 'Multi Finish Plaster – 25kg Bag (British Gypsum Thistle)',
    uom: '25kg Bag', usageNote: '1 bag does approx. 10m2',
    productUrl: `${PS}/multi-finish-plaster-25kg-bag-british-gypsum-thistle/`,
    precision: 0,
    compute: (i) => roundUp(i.q('skimming_walls') / 10), // E48 = ROUNDUP(F80/10,0)
  },
  {
    sku: 'tiwi_rolls', group: 'Plastering & finishing',
    product: 'Wykamol ISO-THERM – Thin Internal Wall Insulation (TIWI) – 0.95m x 7.5m',
    uom: 'Rolls (7.125 m2 per roll)', usageNote: '1 roll does 7.125 m2',
    productUrl: `${PS}/wykamol-iso-therm-thin-internal-wall-insulation-tiwi-1m-x-7-5m/`,
    precision: 1,
    compute: (i) => (i.q('warmline_iwi') === 0 ? 0 : ceilingMath(i.q('warmline_iwi') / 7.125, 0.5)), // E49
  },
  {
    sku: 'tiwi_adhesive', group: 'Plastering & finishing',
    product: 'Wykamol ISO-THERM Adhesive For Thin Internal Wall Insulation (TIWI)',
    uom: 'Per 15kg tub', usageNote: '1 tub does 7.125 m2',
    productUrl: `${PS}/wykamol-iso-therm-adhesive-for-thin-internal-wall-insulation-tiwi/`,
    precision: 0,
    compute: (i) => roundUp(i.q('warmline_iwi') / 7.125), // E50 = ROUNDUP(F79/7.125,0)
  },
  {
    sku: 'plastic_airbricks', group: 'Airbricks',
    product: 'Plastic Airbrick 9 x 3 (Beige, Black or Terracotta)',
    uom: 'Each', usageNote: '2 plastic airbricks make 1 actual installed airbrick',
    productUrl: `${PS}/plastic-air-brick-9-x-3/`,
    precision: 0,
    // E53 = (F112+F113+F114)*2
    compute: (i) =>
      (i.q('clean_out_airbrick') + i.q('lift_upgrade_airbrick') + i.q('install_additional_airbrick')) * 2,
  },
  {
    sku: 'microtech_concentrate', group: 'Spray Treatments',
    product: 'Wykamol Microtech Dual Purpose Concentrate - 400g',
    uom: '400g bottle', usageNote: '400g makes up to 25 litres — 100m2 coverage',
    productUrl: `${PS}/wykamol-microtech-dual-purpose-concentrate/`,
    precision: 0,
    compute: (i) => roundUp(i.q('fog_subfloor_antifungal') / 100), // E56 = ROUNDUP(F118/100,0)
  },
  {
    sku: 'enviroseal_repellent', group: 'External Wall - Aquaban Water Repellent Treatments',
    product: 'Wykamol Enviroseal Liquid Water Repellent - 5ltr',
    uom: '5ltr Container', usageNote: 'Based on 25 m2 per 5ltr container',
    productUrl: `${PS}/wykamol-enviroseal-liquid-water-repellent/`,
    precision: 0,
    compute: (i) => roundUp(i.q('aquaban_system') / 25), // E59 = ROUNDUP(F128/25,0)
  },
]

/** The Material-List sheet's own header caveat — display verbatim. */
export const MATERIAL_LIST_CAVEAT =
  'Does not contain any joinery materials (joists, stud work, flooring) or ACO drains'

/**
 * The lines that feed the damp Material-List: the damp survey type PLUS the
 * shared site_preparation type (the workbook's Costing rows 21-36 — Antinox
 * etc. — live there in our model). Empty when the job has no damp component:
 * the Material-List is a damp-workbook output.
 */
export function dampPurchaseSourceLines(
  results: Record<string, CalculationResult>
): CalculatedLine[] {
  if (!results['damp']) return []
  return [...results['damp'].lines, ...(results['site_preparation']?.lines ?? [])]
}

/**
 * Build the workbook Material-List purchase quantities from the DAMP survey
 * type's calculated lines. Pass lines already filtered for section inclusion.
 * Returns items with quantity > 0, in workbook row order.
 */
export function buildDampPurchaseList(dampLines: CalculatedLine[]): PurchaseItem[] {
  const qty = new Map<string, number>()
  let dpcVolume = 0
  for (const line of dampLines) {
    if (!line.lineKey) continue
    qty.set(line.lineKey, (qty.get(line.lineKey) ?? 0) + line.input.inputQuantity)
    if (line.lineKey === 'dpc_injection_traditional') {
      // Workbook F40 = D40 × E40 (LM × thickness m)
      dpcVolume += line.input.inputQuantity * (line.input.inputDimension ?? 0)
    }
  }
  const inputs: RuleInputs = {
    q: (lineKey) => qty.get(lineKey) ?? 0,
    dpcVolume,
  }
  const items: PurchaseItem[] = []
  for (const rule of DAMP_SKU_RULES) {
    const quantity = rule.compute(inputs)
    if (quantity <= 0) continue
    items.push({
      sku: rule.sku,
      group: rule.group,
      product: rule.product,
      uom: rule.uom,
      usageNote: rule.usageNote,
      productUrl: rule.productUrl,
      quantity,
      precision: rule.precision,
    })
  }
  return items
}

/**
 * ALL damp purchase quantities including zeros — the parity runner emits this
 * so the differ can catch a rule that wrongly produces zero.
 */
export function computeDampPurchaseQuantities(dampLines: CalculatedLine[]): Record<string, number> {
  const withZeros: Record<string, number> = {}
  const qty = new Map<string, number>()
  let dpcVolume = 0
  for (const line of dampLines) {
    if (!line.lineKey) continue
    qty.set(line.lineKey, (qty.get(line.lineKey) ?? 0) + line.input.inputQuantity)
    if (line.lineKey === 'dpc_injection_traditional') {
      dpcVolume += line.input.inputQuantity * (line.input.inputDimension ?? 0)
    }
  }
  const inputs: RuleInputs = { q: (k) => qty.get(k) ?? 0, dpcVolume }
  for (const rule of DAMP_SKU_RULES) withZeros[rule.sku] = rule.compute(inputs)
  return withZeros
}

/**
 * Job-measurement list for survey types WITHOUT workbook purchase rules
 * (timber/woodworm: "Sub Contractor Mats" is TBC in the workbooks;
 * condensation has no materials sheet). Shows the engine line quantity with
 * the template's UOM — honest measurements, not invented pack counts.
 */
export function buildMeasurementList(lines: CalculatedLine[]): MeasurementItem[] {
  const items: MeasurementItem[] = []
  for (const line of lines) {
    if (line.result.materialAdjustedCost <= 0) continue
    items.push({
      // Same display split as contractor sections: the workbook's subcontractor
      // tab lists Warmline as its own row
      sectionKey: line.lineKey?.startsWith('warmline') ? 'warmline_iwi' : line.sectionKey,
      description: line.templateDescription,
      quantity: line.input.inputQuantity,
      uom: line.uom ?? '',
    })
  }
  return items
}
