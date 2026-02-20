// =============================================================================
// Survey Wizard Data Layer — Supabase Persistence
// Dedicated functions for loading and saving wizard state
// Created: 2026-02-19
// =============================================================================

import { getSupabase } from './supabase-client'
import type {
  SurveyWizardData,
  SurveyRoomRow,
} from '@/types/survey-wizard.types'
import type { Survey } from '@/types/database.types'

// =============================================================================
// Load Wizard Data (survey_data + rooms)
// =============================================================================

/**
 * Load complete wizard state from Supabase
 * Fetches both property-level data (surveys.survey_data) and all rooms
 * @param surveyId - The UUID of the survey (surveys.id)
 * @returns Combined wizard data and rooms array
 */
export async function loadWizardData(
  surveyId: string
): Promise<{ wizardData: SurveyWizardData; rooms: SurveyRoomRow[] }> {
  const supabase = getSupabase()

  if (!supabase) {
    console.error('Supabase client not available')
    return {
      wizardData: { wizard_step: 0, wizard_completed: false },
      rooms: [],
    }
  }

  try {
    // Fetch survey record with survey_data JSONB
    const { data: survey, error: surveyError } = await supabase
      .from('surveys')
      .select('id, survey_data, survey_completed')
      .eq('id', surveyId)
      .single()

    if (surveyError) {
      console.error('Error loading survey:', surveyError)
      throw new Error(`Failed to load survey: ${surveyError.message}`)
    }

    // Extract wizard data from survey_data JSONB (or use defaults)
    const wizardData: SurveyWizardData = {
      wizard_step: 0,
      wizard_completed: survey?.survey_completed || false,
      ...(survey?.survey_data || {}),
    }

    // Fetch all rooms for this survey (ordered by display_order)
    const { data: roomsData, error: roomsError } = await supabase
      .from('survey_rooms')
      .select('*')
      .eq('survey_id', surveyId)
      .order('display_order', { ascending: true })

    if (roomsError) {
      console.error('Error loading survey rooms:', roomsError)
      throw new Error(`Failed to load rooms: ${roomsError.message}`)
    }

    // Map DB rows to SurveyRoomRow interface
    const rooms: SurveyRoomRow[] = (roomsData || []).map((row) => ({
      id: row.id,
      survey_id: row.survey_id,
      name: row.name,
      room_type: row.room_type,
      floor_level: row.floor_level,
      display_order: row.display_order,
      issues_identified: row.issues_identified || [],
      room_data: row.room_data || {},
      findings: row.findings,
      surveyor_notes: row.surveyor_notes,
      recommendations: row.recommendations,
      is_completed: row.is_completed || false,
      created_at: row.created_at,
      updated_at: row.updated_at,
    }))

    return { wizardData, rooms }
  } catch (error) {
    console.error('Error in loadWizardData:', error)
    // Return empty state on error (let wizard start fresh)
    return {
      wizardData: { wizard_step: 0, wizard_completed: false },
      rooms: [],
    }
  }
}

// =============================================================================
// Save Wizard Data (property-level data only)
// =============================================================================

/**
 * Save property-level wizard data to surveys.survey_data JSONB
 * Updates: site_details, external_inspection, additional_works, wizard_step
 * @param surveyId - The UUID of the survey
 * @param wizardData - The wizard data object to save
 */
export async function saveWizardData(
  surveyId: string,
  wizardData: SurveyWizardData
): Promise<void> {
  const supabase = getSupabase()

  if (!supabase) {
    throw new Error('Supabase client not available')
  }

  try {
    const { error } = await supabase
      .from('surveys')
      .update({
        survey_data: wizardData as any,
        survey_completed: wizardData.wizard_completed,
        updated_at: new Date().toISOString(),
      })
      .eq('id', surveyId)

    if (error) {
      console.error('Error saving wizard data:', error)
      throw new Error(`Failed to save wizard data: ${error.message}`)
    }

    console.log('Wizard data saved successfully')
  } catch (error) {
    console.error('Error in saveWizardData:', error)
    throw error
  }
}

// =============================================================================
// Save Single Room
// =============================================================================

/**
 * Save or update a single room
 * If room.id is a temp client UUID (starts with 'room-'), insert new row
 * If room.id is a DB UUID, update existing row
 * @param surveyId - The survey this room belongs to
 * @param room - The room data to save
 * @returns The saved room with DB-assigned ID
 */
export async function saveRoom(
  surveyId: string,
  room: SurveyRoomRow
): Promise<SurveyRoomRow> {
  const supabase = getSupabase()

  if (!supabase) {
    throw new Error('Supabase client not available')
  }

  try {
    // Check if this is a new room (temp client-side ID)
    const isNewRoom = !room.id || room.id.startsWith('room-')

    if (isNewRoom) {
      // Insert new room
      const { data, error } = await supabase
        .from('survey_rooms')
        .insert({
          survey_id: surveyId,
          name: room.name,
          room_type: room.room_type,
          floor_level: room.floor_level,
          display_order: room.display_order,
          issues_identified: room.issues_identified,
          room_data: room.room_data as any,
          findings: room.findings || null,
          surveyor_notes: room.surveyor_notes || null,
          recommendations: room.recommendations || null,
          is_completed: room.is_completed,
        })
        .select()
        .single()

      if (error) {
        console.error('Error creating room:', error)
        throw new Error(`Failed to create room: ${error.message}`)
      }

      return {
        ...room,
        id: data.id,
        survey_id: surveyId,
        created_at: data.created_at,
        updated_at: data.updated_at,
      }
    } else {
      // Update existing room
      const { data, error } = await supabase
        .from('survey_rooms')
        .update({
          name: room.name,
          room_type: room.room_type,
          floor_level: room.floor_level,
          display_order: room.display_order,
          issues_identified: room.issues_identified,
          room_data: room.room_data as any,
          findings: room.findings || null,
          surveyor_notes: room.surveyor_notes || null,
          recommendations: room.recommendations || null,
          is_completed: room.is_completed,
          updated_at: new Date().toISOString(),
        })
        .eq('id', room.id)
        .select()
        .single()

      if (error) {
        console.error('Error updating room:', error)
        throw new Error(`Failed to update room: ${error.message}`)
      }

      return {
        ...room,
        updated_at: data.updated_at,
      }
    }
  } catch (error) {
    console.error('Error in saveRoom:', error)
    throw error
  }
}

// =============================================================================
// Delete Room
// =============================================================================

/**
 * Delete a room by ID
 * @param roomId - The UUID of the room to delete
 */
export async function deleteRoom(roomId: string): Promise<void> {
  const supabase = getSupabase()

  if (!supabase) {
    throw new Error('Supabase client not available')
  }

  // Don't delete temp client-side IDs (they don't exist in DB)
  if (roomId.startsWith('room-')) {
    return
  }

  try {
    const { error } = await supabase
      .from('survey_rooms')
      .delete()
      .eq('id', roomId)

    if (error) {
      console.error('Error deleting room:', error)
      throw new Error(`Failed to delete room: ${error.message}`)
    }

    console.log(`Room ${roomId} deleted successfully`)
  } catch (error) {
    console.error('Error in deleteRoom:', error)
    throw error
  }
}

// =============================================================================
// Save All Rooms (Batch Operation)
// =============================================================================

/**
 * Batch save all rooms and sync DB state
 * - Saves each room (insert if new, update if existing)
 * - Deletes DB rooms that are no longer in the rooms array
 * @param surveyId - The survey these rooms belong to
 * @param rooms - The complete array of rooms to save
 * @returns Updated rooms array with DB-assigned IDs
 */
export async function saveAllRooms(
  surveyId: string,
  rooms: SurveyRoomRow[]
): Promise<SurveyRoomRow[]> {
  const supabase = getSupabase()

  if (!supabase) {
    throw new Error('Supabase client not available')
  }

  try {
    // Step 1: Save each room (insert or update)
    const savedRooms: SurveyRoomRow[] = []
    for (const room of rooms) {
      const savedRoom = await saveRoom(surveyId, room)
      savedRooms.push(savedRoom)
    }

    // Step 2: Find DB rooms that were removed (exist in DB but not in rooms array)
    const { data: dbRooms, error: fetchError } = await supabase
      .from('survey_rooms')
      .select('id')
      .eq('survey_id', surveyId)

    if (fetchError) {
      console.error('Error fetching existing rooms:', fetchError)
      // Continue anyway - we saved the rooms that matter
      return savedRooms
    }

    const savedRoomIds = savedRooms.map((r) => r.id)
    const roomsToDelete = (dbRooms || []).filter(
      (dbRoom) => !savedRoomIds.includes(dbRoom.id)
    )

    // Step 3: Delete removed rooms
    for (const roomToDelete of roomsToDelete) {
      await deleteRoom(roomToDelete.id)
    }

    console.log(`Saved ${savedRooms.length} rooms, deleted ${roomsToDelete.length} rooms`)
    return savedRooms
  } catch (error) {
    console.error('Error in saveAllRooms:', error)
    throw error
  }
}
