'use client'

import { useState, useRef } from 'react'
import { Camera, Upload, X, Trash2 } from 'lucide-react'
import { getSupabase } from '@/lib/supabase-client'
import { compressImage } from '@/lib/survey-photo-service'
import type { InstallerPhoto } from '@/types/installer-info.types'

interface InstallerPhotoUploadProps {
  surveyId: string
  category: string
  photos: InstallerPhoto[]
  onPhotosChange: (photos: InstallerPhoto[]) => void
  disabled?: boolean
  maxPhotos?: number
}

export default function InstallerPhotoUpload({
  surveyId,
  category,
  photos,
  onPhotosChange,
  disabled = false,
  maxPhotos = 10,
}: InstallerPhotoUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const canAddMore = photos.length < maxPhotos && !disabled

  async function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    // Reset input so the same file can be re-selected
    e.target.value = ''

    setIsUploading(true)
    setError(null)

    try {
      const supabase = getSupabase()
      if (!supabase) throw new Error('Supabase not initialized')

      // Compress
      const compressed = await compressImage(file)

      // Upload to storage
      const timestamp = Date.now()
      const randomId = Math.random().toString(36).substring(2, 9)
      const fileName = `${timestamp}-${randomId}.jpg`
      const storagePath = `${surveyId}/installer-info/${category}/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('survey-photos')
        .upload(storagePath, compressed, { contentType: 'image/jpeg', cacheControl: '3600' })

      if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`)

      const newPhoto: InstallerPhoto = {
        id: `iph_${timestamp}_${randomId}`,
        storage_path: storagePath,
        file_name: fileName,
        caption: '',
        created_at: new Date().toISOString(),
      }

      onPhotosChange([...photos, newPhoto])
    } catch (err: unknown) {
      console.error('Installer photo upload failed:', err)
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setIsUploading(false)
    }
  }

  async function handleDelete(photo: InstallerPhoto) {
    try {
      const supabase = getSupabase()
      if (supabase) {
        await supabase.storage.from('survey-photos').remove([photo.storage_path])
      }
    } catch {
      // Storage deletion is best-effort
    }
    onPhotosChange(photos.filter(p => p.id !== photo.id))
  }

  function handleCaptionChange(photoId: string, caption: string) {
    onPhotosChange(photos.map(p => p.id === photoId ? { ...p, caption } : p))
  }

  function getPhotoUrl(storagePath: string): string {
    const supabase = getSupabase()
    if (!supabase) return ''
    const { data } = supabase.storage.from('survey-photos').getPublicUrl(storagePath)
    return data.publicUrl
  }

  return (
    <div className="space-y-3">
      {/* Existing photos */}
      {photos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {photos.map(photo => (
            <div key={photo.id} className="relative group rounded-xl overflow-hidden bg-white/5 border border-white/10">
              <img
                src={getPhotoUrl(photo.storage_path)}
                alt={photo.caption || 'Installer photo'}
                className="w-full h-32 object-cover"
              />
              {!disabled && (
                <button
                  onClick={() => handleDelete(photo)}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Delete photo"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
              <input
                type="text"
                value={photo.caption}
                onChange={e => handleCaptionChange(photo.id, e.target.value)}
                placeholder="Add caption..."
                disabled={disabled}
                className="w-full px-3 py-2 text-xs bg-transparent border-t border-white/10 text-white/80 placeholder-white/30 focus:outline-none focus:bg-white/5"
              />
            </div>
          ))}
        </div>
      )}

      {/* Upload button */}
      {canAddMore && (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileSelected}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="flex items-center gap-2 px-4 py-2 text-sm rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50"
          >
            {isUploading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white animate-spin rounded-full" />
                Uploading...
              </>
            ) : (
              <>
                <Camera className="w-4 h-4" />
                Add Photo
              </>
            )}
          </button>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}

      {photos.length >= maxPhotos && (
        <p className="text-xs text-white/40">Maximum {maxPhotos} photos reached</p>
      )}
    </div>
  )
}
