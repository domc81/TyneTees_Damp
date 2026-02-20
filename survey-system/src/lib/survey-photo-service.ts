// =============================================================================
// Survey Photo Service — Photo Capture, Compression, Upload & Management
// Handles all photo operations for the survey wizard
// Photos are stored in surveys.survey_data JSONB under "photos" key
// Storage bucket: "survey-photos"
// =============================================================================

import { getSupabase } from './supabase-client'
import type { SurveyPhoto, PhotoCapture } from '@/types/survey-photo.types'

// Geolocation cache to avoid repeated permission prompts
let geolocationCache: {
  coords: { latitude: number; longitude: number }
  timestamp: number
} | null = null

const GEOLOCATION_CACHE_TTL = 5 * 60 * 1000 // 5 minutes

/**
 * Compress an image file using canvas API
 * Targets: Large phone photos (4000+ px, 5MB+) -> ~200-500KB
 */
export async function compressImage(
  file: File,
  maxWidth: number = 1920,
  quality: number = 0.8
): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const reader = new FileReader()

    reader.onload = (e) => {
      img.src = e.target?.result as string
    }

    reader.onerror = () => {
      reject(new Error('Failed to read image file'))
    }

    img.onload = () => {
      try {
        // Calculate new dimensions while maintaining aspect ratio
        let { width, height } = img
        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }

        // Create canvas and draw resized image
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')

        if (!ctx) {
          reject(new Error('Failed to get canvas context'))
          return
        }

        // Draw image with good quality
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'
        ctx.drawImage(img, 0, 0, width, height)

        // Convert to JPEG blob
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to compress image'))
              return
            }

            // Create new File object from blob
            const compressedFile = new File([blob], file.name.replace(/\.\w+$/, '.jpg'), {
              type: 'image/jpeg',
              lastModified: Date.now(),
            })

            console.log(
              `Image compressed: ${(file.size / 1024).toFixed(0)}KB -> ${(compressedFile.size / 1024).toFixed(0)}KB`
            )

            resolve(compressedFile)
          },
          'image/jpeg',
          quality
        )
      } catch (error) {
        reject(error)
      }
    }

    img.onerror = () => {
      reject(new Error('Failed to load image'))
    }

    reader.readAsDataURL(file)
  })
}

/**
 * Get device geolocation (non-blocking)
 * Returns null if denied or unavailable
 * Caches result for 5 minutes
 */
export async function getGeolocation(): Promise<{
  latitude: number
  longitude: number
} | null> {
  // Check cache first
  if (geolocationCache) {
    const age = Date.now() - geolocationCache.timestamp
    if (age < GEOLOCATION_CACHE_TTL) {
      return geolocationCache.coords
    }
  }

  // Not available in browser
  if (!navigator.geolocation) {
    return null
  }

  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      resolve(null) // Don't block on slow GPS
    }, 5000)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        clearTimeout(timeout)
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }
        // Update cache
        geolocationCache = {
          coords,
          timestamp: Date.now(),
        }
        resolve(coords)
      },
      (error) => {
        clearTimeout(timeout)
        console.warn('Geolocation denied or unavailable:', error.message)
        resolve(null)
      },
      {
        enableHighAccuracy: false, // Faster, less battery
        timeout: 5000,
        maximumAge: 300000, // 5 minutes
      }
    )
  })
}

/**
 * Get image dimensions from a File
 */
async function getImageDimensions(
  file: File
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const reader = new FileReader()

    reader.onload = (e) => {
      img.src = e.target?.result as string
    }

    reader.onerror = () => {
      reject(new Error('Failed to read image file'))
    }

    img.onload = () => {
      resolve({ width: img.width, height: img.height })
    }

    img.onerror = () => {
      reject(new Error('Failed to load image'))
    }

    reader.readAsDataURL(file)
  })
}

/**
 * Upload a photo to the survey
 * Compresses, gets geolocation, uploads to storage, stores metadata in survey_data
 */
export async function uploadSurveyPhoto(
  surveyId: string,
  capture: PhotoCapture
): Promise<SurveyPhoto> {
  const supabase = getSupabase()
  if (!supabase) {
    throw new Error('Supabase not initialized')
  }

  try {
    // Step 1: Compress the image
    console.log('Compressing image...')
    const compressedFile = await compressImage(capture.file)

    // Step 2: Get image dimensions from compressed file
    const dimensions = await getImageDimensions(compressedFile)

    // Step 3: Get geolocation (non-blocking — don't wait if slow)
    const geoPromise = getGeolocation()

    // Step 4: Generate storage path and filename
    const timestamp = Date.now()
    const randomId = Math.random().toString(36).substring(2, 9)
    const fileName = `${timestamp}-${randomId}.jpg`
    const storagePath = `${surveyId}/${capture.step}/${fileName}`

    // Step 5: Upload to Supabase Storage
    console.log('Uploading to storage:', storagePath)
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('survey-photos')
      .upload(storagePath, compressedFile, {
        contentType: 'image/jpeg',
        cacheControl: '3600',
      })

    if (uploadError) {
      throw new Error(`Upload failed: ${uploadError.message}`)
    }

    // Step 6: Wait for geolocation (if it hasn't resolved yet)
    const geo = await geoPromise

    // Step 7: Create photo metadata object
    const photoId = `photo_${timestamp}_${randomId}`
    const newPhoto: SurveyPhoto = {
      id: photoId,
      survey_id: surveyId,
      room_id: capture.room_id,
      step: capture.step,
      category: capture.category,
      description: capture.description,
      storage_path: uploadData.path,
      file_name: fileName,
      file_size: compressedFile.size,
      mime_type: 'image/jpeg',
      width: dimensions.width,
      height: dimensions.height,
      taken_at: new Date().toISOString(),
      latitude: geo?.latitude,
      longitude: geo?.longitude,
      created_at: new Date().toISOString(),
    }

    // Step 8: Load existing survey data
    const { data: survey, error: fetchError } = await supabase
      .from('surveys')
      .select('survey_data')
      .eq('id', surveyId)
      .single()

    if (fetchError) {
      console.error('Failed to load survey for photo metadata:', fetchError)
      // Rollback: delete uploaded file
      await supabase.storage.from('survey-photos').remove([uploadData.path])
      throw new Error(`Failed to load survey: ${fetchError.message}`)
    }

    // Step 9: Add photo to survey_data.photos array
    const surveyData = survey.survey_data || {}
    const photos = Array.isArray(surveyData.photos) ? surveyData.photos : []
    photos.push(newPhoto)

    // Step 10: Update survey_data with new photos array
    console.log(`Saving photo metadata for ${photoId}...`)
    const { data: updateData, error: updateError } = await supabase
      .from('surveys')
      .update({
        survey_data: {
          ...surveyData,
          photos,
        },
      })
      .eq('id', surveyId)
      .select()

    if (updateError) {
      console.error('Failed to save photo metadata:', updateError)
      // Rollback: delete uploaded file
      await supabase.storage.from('survey-photos').remove([uploadData.path])
      throw new Error(`Failed to save photo metadata: ${updateError.message}`)
    }

    if (!updateData || updateData.length === 0) {
      console.error('Survey update returned no data - metadata may not have been saved')
      // Don't rollback here as the update might have succeeded
      // This is a warning scenario
    } else {
      console.log('Photo metadata saved successfully:', photoId)
    }

    console.log('Photo uploaded successfully:', photoId)
    return newPhoto
  } catch (error) {
    console.error('Photo upload failed:', error)
    throw error
  }
}

/**
 * Load all photos for a survey
 * Returns photos sorted by taken_at (newest first)
 * If metadata is missing, attempts to reconstruct from storage files
 */
export async function loadSurveyPhotos(surveyId: string): Promise<SurveyPhoto[]> {
  const supabase = getSupabase()
  if (!supabase) {
    throw new Error('Supabase not initialized')
  }

  try {
    const { data: survey, error } = await supabase
      .from('surveys')
      .select('survey_data')
      .eq('id', surveyId)
      .single()

    if (error) {
      throw new Error(`Failed to load survey: ${error.message}`)
    }

    let photos = survey?.survey_data?.photos || []

    // If no metadata exists, try to reconstruct from storage
    if (photos.length === 0) {
      console.log('No photo metadata found, attempting recovery from storage...')
      photos = await recoverPhotosFromStorage(surveyId)

      // If photos were recovered, save them back to survey_data
      if (photos.length > 0) {
        console.log(`Recovered ${photos.length} photos, saving metadata...`)
        await supabase
          .from('surveys')
          .update({
            survey_data: {
              ...(survey?.survey_data || {}),
              photos,
            },
          })
          .eq('id', surveyId)
      }
    }

    // Sort by taken_at descending (newest first)
    return photos.sort((a: SurveyPhoto, b: SurveyPhoto) => {
      return new Date(b.taken_at).getTime() - new Date(a.taken_at).getTime()
    })
  } catch (error) {
    console.error('Failed to load photos:', error)
    return []
  }
}

/**
 * Recover photo metadata from storage files when metadata is missing
 * This is a recovery mechanism for photos uploaded before the bug fix
 */
async function recoverPhotosFromStorage(surveyId: string): Promise<SurveyPhoto[]> {
  const supabase = getSupabase()
  if (!supabase) {
    return []
  }

  try {
    // List all folders (steps) in the survey directory
    const { data: folders, error: foldersError } = await supabase.storage
      .from('survey-photos')
      .list(surveyId, {
        limit: 100,
      })

    if (foldersError) {
      console.error('Failed to list storage folders:', foldersError)
      return []
    }

    const recoveredPhotos: SurveyPhoto[] = []

    // Iterate through each folder (step)
    for (const folder of folders || []) {
      // List files in this step folder
      const { data: files, error: filesError } = await supabase.storage
        .from('survey-photos')
        .list(`${surveyId}/${folder.name}`, {
          limit: 100,
          sortBy: { column: 'created_at', order: 'desc' },
        })

      if (filesError || !files) {
        console.error(`Failed to list files in ${folder.name}:`, filesError)
        continue
      }

      for (const file of files) {
        // Skip non-image files
        if (!file.name.endsWith('.jpg') && !file.name.endsWith('.jpeg')) {
          continue
        }

        const step = folder.name as any
        const fileName = file.name

        // Extract timestamp from filename (format: {timestamp}-{randomId}.jpg)
        const timestampMatch = fileName.match(/^(\d+)-/)
        const timestamp = timestampMatch ? parseInt(timestampMatch[1]) : Date.now()

        // Infer category from step
        let category = 'general'
        if (step === 'site_details') category = 'building_exterior'
        if (step === 'external_inspection') category = 'building_defect'
        if (step === 'room_inspection') category = 'damp_evidence'

        // Create photo metadata
        const photo: SurveyPhoto = {
          id: `photo_${timestamp}_recovered`,
          survey_id: surveyId,
          step,
          category,
          description: `Recovered photo from ${step.replace('_', ' ')}`,
          storage_path: `${surveyId}/${folder.name}/${fileName}`,
          file_name: fileName,
          file_size: file.metadata?.size || 0,
          mime_type: 'image/jpeg',
          width: 1920, // Default assumption
          height: 1080, // Default assumption
          taken_at: new Date(timestamp).toISOString(),
          created_at: file.created_at || new Date(timestamp).toISOString(),
        }

        recoveredPhotos.push(photo)
      }
    }

    console.log(`Recovered ${recoveredPhotos.length} photos from storage`)
    return recoveredPhotos
  } catch (error) {
    console.error('Photo recovery failed:', error)
    return []
  }
}

/**
 * Delete a photo from the survey
 * Removes from storage and survey_data
 */
export async function deleteSurveyPhoto(
  surveyId: string,
  photo: SurveyPhoto
): Promise<void> {
  const supabase = getSupabase()
  if (!supabase) {
    throw new Error('Supabase not initialized')
  }

  try {
    // Step 1: Delete from storage
    const { error: storageError } = await supabase.storage
      .from('survey-photos')
      .remove([photo.storage_path])

    if (storageError) {
      console.warn('Failed to delete from storage:', storageError.message)
      // Continue anyway — metadata cleanup is more important
    }

    // Step 2: Load existing survey data
    const { data: survey, error: fetchError } = await supabase
      .from('surveys')
      .select('survey_data')
      .eq('id', surveyId)
      .single()

    if (fetchError) {
      throw new Error(`Failed to load survey: ${fetchError.message}`)
    }

    // Step 3: Remove photo from photos array
    const surveyData = survey.survey_data || {}
    const photos = (surveyData.photos || []).filter(
      (p: SurveyPhoto) => p.id !== photo.id
    )

    // Step 4: Update survey_data
    const { error: updateError } = await supabase
      .from('surveys')
      .update({
        survey_data: {
          ...surveyData,
          photos,
        },
      })
      .eq('id', surveyId)

    if (updateError) {
      throw new Error(`Failed to update survey data: ${updateError.message}`)
    }

    console.log('Photo deleted successfully:', photo.id)
  } catch (error) {
    console.error('Photo deletion failed:', error)
    throw error
  }
}

/**
 * Get public URL for a photo from storage
 */
export function getPhotoUrl(storagePath: string): string {
  const supabase = getSupabase()
  if (!supabase) {
    return ''
  }

  const { data } = supabase.storage.from('survey-photos').getPublicUrl(storagePath)
  return data.publicUrl
}

/**
 * Filter photos by step, category, or room
 */
export function filterPhotos(
  photos: SurveyPhoto[],
  filters: {
    step?: string
    category?: string
    room_id?: string
  }
): SurveyPhoto[] {
  return photos.filter((photo) => {
    if (filters.step && photo.step !== filters.step) return false
    if (filters.category && photo.category !== filters.category) return false
    if (filters.room_id !== undefined && photo.room_id !== filters.room_id) return false
    return true
  })
}
