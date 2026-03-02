// =============================================================================
// Calendar System — Type Definitions
// Maps to surveyor_availability, availability_blocks, survey_bookings, and
// notifications tables created in 20260302000004.
// =============================================================================

// --- Union types matching CHECK constraints ---

export type BlockType = 'annual_leave' | 'sickness' | 'training' | 'other'

export type BookingStatus = 'scheduled' | 'completed' | 'cancelled' | 'no_show'

export type NotificationType =
  | 'booking_created'
  | 'booking_updated'
  | 'booking_cancelled'
  | 'booking_reminder'

// --- Table types (snake_case matching database columns) ---

export interface SurveyorAvailability {
  id: string
  surveyor_id: string
  day_of_week: number // 0 = Sunday … 6 = Saturday
  start_time: string  // TIME as "HH:MM:SS"
  end_time: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface AvailabilityBlock {
  id: string
  surveyor_id: string
  start_date: string // DATE as "YYYY-MM-DD"
  end_date: string
  block_type: BlockType
  reason?: string | null
  created_by: string
  created_at: string
}

export interface SurveyBooking {
  id: string
  survey_id?: string | null
  surveyor_id: string
  customer_name: string
  customer_phone?: string | null
  customer_email?: string | null
  customer_address?: string | null
  booking_date: string // DATE as "YYYY-MM-DD"
  start_time: string
  end_time: string
  status: BookingStatus
  notes?: string | null
  created_by: string
  created_at: string
  updated_at: string
  // Joined data (populated by queries with joins, not stored in DB)
  surveyor_name?: string | null
}

export interface Notification {
  id: string
  user_id: string
  type: NotificationType
  title: string
  message: string
  booking_id?: string | null
  read: boolean
  created_at: string
}

// --- Composite types for UI ---

export interface SurveyorWithAvailability {
  id: string
  display_name: string
  email: string
  phone?: string | null
  availability: SurveyorAvailability[]
  blocks: AvailabilityBlock[]
  bookings: SurveyBooking[]
}

export interface TimeSlot {
  date: string      // "YYYY-MM-DD"
  startTime: string // "HH:MM"
  endTime: string   // "HH:MM"
}

export interface BookingFormData {
  surveyId?: string | null
  surveyorId: string
  customerName: string
  customerPhone?: string | null
  customerEmail?: string | null
  customerAddress?: string | null
  bookingDate: string // "YYYY-MM-DD"
  startTime: string   // "HH:MM"
  endTime: string     // "HH:MM"
  notes?: string | null
  createdBy: string
}

// --- Input types for availability management ---

export interface AvailabilitySlotInput {
  dayOfWeek: number
  startTime: string
  endTime: string
  isActive: boolean
}
