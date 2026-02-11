import type { LineItem, Section, CostSummary, Rate } from '@/types/database.types'

// Default rates (would come from database in production)
const DEFAULT_RATES: Record<string, number> = {
  hourlyRate: 30.63,
  contractorHourly: 28.00,
  travelRate: 0.50,
  defaultMaterialMarkup: 35.0,
  defaultLaborMarkup: 25.0,
  vatRate: 20.0,
}

/**
 * Calculate quantity from dimensions
 * If quantity is provided directly, use it
 * Otherwise calculate from length × width × height
 */
export function calculateQuantity(
  length?: number,
  width?: number,
  height?: number,
  manualQuantity?: number
): number {
  if (manualQuantity && manualQuantity > 0) {
    return manualQuantity
  }

  const l = length || 0
  const w = width || 0
  const h = height || 1 // Default height to 1 if not specified

  return Math.max(0, l * w * h)
}

/**
 * Calculate material cost for a line item
 * Formula: quantity × unit_rate × (1 + waste_factor) × (1 + markup)
 */
export function calculateMaterialCost(
  quantity: number,
  unitRate: number,
  wasteFactor: number = 0.10,
  markupPercentage: number = DEFAULT_RATES.defaultMaterialMarkup
): number {
  if (quantity <= 0 || unitRate <= 0) return 0

  const costWithWaste = quantity * unitRate * (1 + wasteFactor)
  const costWithMarkup = costWithWaste * (1 + markupPercentage / 100)

  return Math.round(costWithMarkup * 100) / 100
}

/**
 * Calculate labor cost for a line item
 * Formula: quantity × hours_per_unit × hourly_rate × (1 + labor_markup)
 */
export function calculateLaborCost(
  quantity: number,
  hoursPerUnit: number,
  hourlyRate: number = DEFAULT_RATES.hourlyRate,
  laborMarkupPercentage: number = DEFAULT_RATES.defaultLaborMarkup
): number {
  if (quantity <= 0 || hoursPerUnit <= 0) return 0

  const totalHours = quantity * hoursPerUnit
  const costWithMarkup = totalHours * hourlyRate * (1 + laborMarkupPercentage / 100)

  return Math.round(costWithMarkup * 100) / 100
}

/**
 * Calculate total cost for a line item
 */
export function calculateLineItemTotal(item: any, rates: Partial<Rate>[] = []): {
  quantity: number
  materialCost: number
  laborCost: number
  total: number
} {
  const hourlyRate = rates.find(r => r.name === 'Hourly Rate')?.value || DEFAULT_RATES.hourlyRate
  const materialMarkup = rates.find(r => r.name === 'Material Markup Default')?.value || DEFAULT_RATES.defaultMaterialMarkup
  const laborMarkup = rates.find(r => r.name === 'Labor Markup Default')?.value || DEFAULT_RATES.defaultLaborMarkup

  const quantity = calculateQuantity(item.length, item.width, item.height, item.quantity)

  const materialCost = calculateMaterialCost(
    quantity,
    item.unit_rate || 0,
    item.waste_factor,
    materialMarkup
  )

  const laborCost = calculateLaborCost(
    quantity,
    item.hours_per_unit || 0,
    hourlyRate,
    laborMarkup
  )

  const total = item.is_active !== false ? materialCost + laborCost : 0

  return {
    quantity,
    materialCost: Math.round(materialCost * 100) / 100,
    laborCost: Math.round(laborCost * 100) / 100,
    total: Math.round(total * 100) / 100,
  }
}

/**
 * Calculate section totals
 */
export function calculateSectionTotal(
  section: Section,
  lineItems: LineItem[],
  rates: Partial<Rate>[]
): {
  materialsTotal: number
  laborTotal: number
  total: number
} {
  const sectionItems = lineItems.filter(
    item => item.section_id === section.id && item.is_active !== false
  )

  const result = sectionItems.reduce(
    (acc, item) => {
      const calculated = calculateLineItemTotal(item, rates)
      return {
        materialsTotal: acc.materialsTotal + calculated.materialCost,
        laborTotal: acc.laborTotal + calculated.laborCost,
        total: acc.total + calculated.total,
      }
    },
    { materialsTotal: 0, laborTotal: 0, total: 0 }
  )

  // Apply section markup
  const markupMultiplier = 1 + (section.markup_percentage || 0) / 100

  return {
    materialsTotal: Math.round(result.materialsTotal * markupMultiplier * 100) / 100,
    laborTotal: Math.round(result.laborTotal * markupMultiplier * 100) / 100,
    total: Math.round(result.total * markupMultiplier * 100) / 100,
  }
}

/**
 * Calculate complete project cost summary
 */
export function calculateProjectCostSummary(
  sections: Section[],
  lineItems: LineItem[],
  travelHours: number = 0,
  travelDistance: number = 0,
  rates: Partial<Rate>[] = []
): CostSummary {
  const hourlyRate = rates.find(r => r.name === 'Hourly Rate')?.value || DEFAULT_RATES.hourlyRate
  const travelRate = rates.find(r => r.name === 'Travel Rate')?.value || DEFAULT_RATES.travelRate
  const vatRate = rates.find(r => r.name === 'VAT Rate')?.value || DEFAULT_RATES.vatRate

  // Calculate section totals
  const sectionTotals = sections.map(section => ({
    ...calculateSectionTotal(section, lineItems, rates),
    name: section.name,
  }))

  // Sum all materials and labor
  const materialsTotal = sectionTotals.reduce((sum, s) => sum + s.materialsTotal, 0)
  const laborTotal = sectionTotals.reduce((sum, s) => sum + s.laborTotal, 0)

  // Calculate travel cost
  const travelCost = travelHours * hourlyRate + travelDistance * travelRate

  // Calculate subtotal
  const subtotal = materialsTotal + laborTotal + travelCost

  // Calculate VAT
  const vatAmount = subtotal * (vatRate / 100)

  // Total
  const total = subtotal + vatAmount

  // Deposit (30%)
  const deposit_30_percent = Math.round(total * 0.3 * 100) / 100

  return {
    materials_total: Math.round(materialsTotal * 100) / 100,
    labor_total: Math.round(laborTotal * 100) / 100,
    travel_cost: Math.round(travelCost * 100) / 100,
    subtotal: Math.round(subtotal * 100) / 100,
    vat_amount: Math.round(vatAmount * 100) / 100,
    total: Math.round(total * 100) / 100,
    deposit_30_percent,
  }
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(amount)
}

/**
 * Format percentage for display
 */
export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`
}

/**
 * Validate line item data
 */
export function validateLineItem(item: Partial<LineItem>): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (!item.item_name) {
    errors.push('Item name is required')
  }

  if (item.quantity === undefined || item.quantity <= 0) {
    if (!item.length || !item.width) {
      errors.push('Either quantity or dimensions (length × width) must be specified')
    }
  }

  if (!item.uom) {
    errors.push('Unit of measure is required')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}
