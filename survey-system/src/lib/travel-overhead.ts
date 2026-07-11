// =============================================================================
// Travel & Overhead Calculation — Post-Processing Step
// Calculates project-specific overheads (travel labour + vehicle mileage)
// after the pricing engine has produced all section costs.
//
// This CANNOT be a pricing engine line item because it depends on the
// total labour hours from ALL other line items — a value that only
// exists after the pricing engine run completes.
//
// Formula (identical across all 4 survey types):
//   labour_days    = ROUNDUP(total_labour_hours / 6.5 / num_men, 0)
//   travel_hours   = labour_days × (distance × 2 / 30) × num_men
//   travel_labour  = travel_hours × hourly_labour_rate
//   vehicle_cost   = labour_days × (distance × 2) × vehicle_cost_per_mile
//   total_overhead = travel_labour + vehicle_cost
//
// Constants (editable at /admin/rates since 2026-07-11):
//   productive_hours_per_day (default 6.5) = productive hours per man per day
//   travel_speed_mph        (default 30)   = average speed, miles → hours
//   ONE vehicle always, regardless of crew size
// =============================================================================

/** Input parameters for travel overhead calculation */
export interface TravelOverheadInput {
  /** Sum of all labour hours from the pricing engine output */
  totalLabourHours: number
  /** One-way distance from office in miles */
  distanceFromOffice: number
  /** Number of men travelling (crew size) */
  numMenTravelling: number
  /** Hourly labour rate from pricing_config (e.g. 30.63) */
  hourlyLabourRate: number
  /** Vehicle cost per mile from pricing_config (e.g. 0.50) */
  vehicleCostPerMile: number
  /** Productive hours per man per day from pricing_config (workbook 6.5) */
  productiveHoursPerDay?: number
  /** Average travel speed in mph from pricing_config (workbook 30) */
  travelSpeedMph?: number
}

/** Breakdown of travel overhead costs */
export interface TravelOverheadResult {
  /** Working days needed = ROUNDUP(total_hours / 6.5 / num_men) */
  labourDays: number
  /** Total travel hours = days × (distance × 2 / 30) × num_men */
  travelHours: number
  /** Travel labour cost = travel_hours × hourly_rate */
  travelLabourCost: number
  /** Vehicle mileage cost = days × round_trip_miles × cost_per_mile */
  vehicleMileageCost: number
  /** Combined total = travel labour + vehicle mileage */
  totalOverheadCost: number
}

const DEFAULT_PRODUCTIVE_HOURS_PER_DAY = 6.5
const DEFAULT_TRAVEL_SPEED_MPH = 30

/**
 * Calculate travel and vehicle overhead costs for a survey project.
 *
 * Must be called AFTER the pricing engine, using the total labour hours
 * from its output. The result appears on customer documents as
 * "Project Specific Overheads" — never itemised as travel/mileage.
 */
export function calculateTravelOverhead(
  input: TravelOverheadInput
): TravelOverheadResult {
  const {
    totalLabourHours,
    distanceFromOffice,
    numMenTravelling,
    hourlyLabourRate,
    vehicleCostPerMile,
  } = input

  // Config-driven constants — fall back to the workbook values if the config
  // keys are missing or nonsensical (zero/negative would divide by zero)
  const productiveHours = input.productiveHoursPerDay && input.productiveHoursPerDay > 0
    ? input.productiveHoursPerDay
    : DEFAULT_PRODUCTIVE_HOURS_PER_DAY
  const travelSpeed = input.travelSpeedMph && input.travelSpeedMph > 0
    ? input.travelSpeedMph
    : DEFAULT_TRAVEL_SPEED_MPH

  // Default to at least 1 man — a job with 0 crew still has someone travelling
  const effectiveMen = Math.max(1, numMenTravelling || 1)

  // Working days = ROUNDUP(total_hours / 6.5 / num_men) — workbook R146.
  // Computed regardless of distance: the workbook derives days from labour
  // hours alone, and days feed time-on-site outputs even when travel is free.
  const labourDays = Math.ceil(
    totalLabourHours / productiveHours / effectiveMen
  )

  // No distance = no travel costs (but days on site still apply)
  if (distanceFromOffice <= 0) {
    return {
      labourDays,
      travelHours: 0,
      travelLabourCost: 0,
      vehicleMileageCost: 0,
      totalOverheadCost: 0,
    }
  }

  // Round trip miles
  const roundTripMiles = distanceFromOffice * 2

  // Travel hours = days × (round_trip_miles / speed) × num_men
  const travelHours =
    labourDays * (roundTripMiles / travelSpeed) * effectiveMen

  // Travel labour cost
  const travelLabourCost = travelHours * hourlyLabourRate

  // Vehicle mileage cost — ONE vehicle, regardless of crew size
  const vehicleMileageCost = labourDays * roundTripMiles * vehicleCostPerMile

  // Total overhead
  const totalOverheadCost = travelLabourCost + vehicleMileageCost

  return {
    labourDays,
    travelHours,
    travelLabourCost,
    vehicleMileageCost,
    totalOverheadCost,
  }
}
