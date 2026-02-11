# Implementation Prompt: Proper Photo Storage with Supabase Storage

## 🎯 Objective

Implement proper photo storage architecture using Supabase Storage buckets instead of storing images directly in database tables. Photos should be uploaded to a Supabase Storage bucket, and only the storage path/URL should be stored in the database `photos` table.

---

## 📋 Current Issues to Fix

1. **Data Layer Type Mismatch**: `src/lib/supabase-data.ts` Photo interface uses `file_path` instead of `storage_path`
2. **No Storage Integration**: Photos page has mock data and placeholder upload logic
3. **No Bucket Setup**: Supabase Storage bucket not created or configured
4. **Missing Upload Service**: No utility functions for uploading/managing photos

---

## 🏗️ Implementation Steps

### STEP 1: Create Storage Bucket Migration

**Create file:** `survey-system/supabase/migrations/002_setup_storage.sql`

```sql
-- ============================================================================
-- STORAGE SETUP FOR PHOTOS
-- ============================================================================

-- Create the storage bucket for survey photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('survey-photos', 'survey-photos', false)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- STORAGE POLICIES
-- ============================================================================

-- Allow authenticated users to upload photos
CREATE POLICY "Authenticated users can upload survey photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'survey-photos' AND
  (storage.foldername(name))[1] IN (
    SELECT id::text FROM projects
  )
);

-- Allow authenticated users to read survey photos
CREATE POLICY "Authenticated users can view survey photos"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'survey-photos');

-- Allow authenticated users to delete their uploaded photos
CREATE POLICY "Authenticated users can delete survey photos"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'survey-photos');

-- For development: Allow public access (REMOVE IN PRODUCTION)
CREATE POLICY "Allow public read access for development"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'survey-photos');
```

---

### STEP 2: Fix Data Layer Photo Interface

**File:** `src/lib/supabase-data.ts`

**Lines 175-184** - Replace the Photo interface with:

```typescript
export interface Photo {
  id: string
  project_id: string
  room_id: string | null
  storage_path: string        // ✅ FIXED: Changed from file_path
  file_name: string
  file_size?: number          // ✅ ADDED
  mime_type?: string          // ✅ ADDED
  category: string
  description: string | null
  latitude?: number           // ✅ ADDED
  longitude?: number          // ✅ ADDED
  taken_at?: string           // ✅ ADDED
  uploaded_by?: string        // ✅ ADDED
  created_at: string
}
```

**Add new functions at the end of the file** (after line 883):

```typescript
// ============================================================================
// Photo Upload & Management
// ============================================================================

export async function uploadPhoto(
  projectId: string,
  file: File,
  category: string,
  description?: string,
  roomId?: string
): Promise<Photo | null> {
  const supabase = getSupabase()
  if (!supabase) return null

  try {
    // Generate unique file path
    const timestamp = Date.now()
    const uuid = crypto.randomUUID().substring(0, 8)
    const ext = file.name.split('.').pop()
    const storagePath = `${projectId}/${category}/${timestamp}_${uuid}.${ext}`

    // Upload file to storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('survey-photos')
      .upload(storagePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      console.error('Error uploading photo:', uploadError)
      return null
    }

    // Create database record
    const { data: photoData, error: photoError } = await supabase
      .from('photos')
      .insert({
        project_id: projectId,
        room_id: roomId || null,
        storage_path: storagePath,
        file_name: file.name,
        file_size: file.size,
        mime_type: file.type,
        category,
        description: description || null,
        taken_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (photoError) {
      console.error('Error creating photo record:', photoError)
      // Clean up uploaded file
      await supabase.storage.from('survey-photos').remove([storagePath])
      return null
    }

    return photoData
  } catch (err) {
    console.error('Unexpected error uploading photo:', err)
    return null
  }
}

export async function getPhotoUrl(storagePath: string): Promise<string | null> {
  const supabase = getSupabase()
  if (!supabase) return null

  const { data } = supabase.storage
    .from('survey-photos')
    .getPublicUrl(storagePath)

  return data?.publicUrl || null
}

export async function deletePhoto(photoId: string): Promise<boolean> {
  const supabase = getSupabase()
  if (!supabase) return false

  try {
    // Get photo to find storage path
    const { data: photo, error: fetchError } = await supabase
      .from('photos')
      .select('storage_path')
      .eq('id', photoId)
      .single()

    if (fetchError || !photo) {
      console.error('Error fetching photo:', fetchError)
      return false
    }

    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('survey-photos')
      .remove([photo.storage_path])

    if (storageError) {
      console.error('Error deleting from storage:', storageError)
      return false
    }

    // Delete database record
    const { error: deleteError } = await supabase
      .from('photos')
      .delete()
      .eq('id', photoId)

    if (deleteError) {
      console.error('Error deleting photo record:', deleteError)
      return false
    }

    return true
  } catch (err) {
    console.error('Unexpected error deleting photo:', err)
    return false
  }
}

export async function getProjectPhotos(projectId: string): Promise<Photo[]> {
  const supabase = getSupabase()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('photos')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching photos:', error)
    return []
  }

  return data || []
}
```

---

### STEP 3: Update Photos Page UI

**File:** `src/app/survey/[projectId]/photos/page.tsx`

**Replace lines 1-415 entirely with:**

```typescript
'use client'

import { useState, useRef, useEffect } from 'react'
import {
  Camera,
  Upload,
  X,
  Check,
  ChevronLeft,
  Image as ImageIcon,
  Droplets,
  Bug,
  Wind,
  Thermometer,
  Home,
  Grid,
  List,
  Trash2,
  Download,
  Loader2,
} from 'lucide-react'
import { getProjectPhotos, uploadPhoto, deletePhoto, getPhotoUrl } from '@/lib/supabase-data'
import type { Photo } from '@/lib/supabase-data'

// Photo categories with icons
const photoCategories = [
  { id: 'general', label: 'General', icon: ImageIcon },
  { id: 'damp_evidence', label: 'Damp Evidence', icon: Droplets },
  { id: 'timber_damage', label: 'Timber Damage', icon: Bug },
  { id: 'ventilation', label: 'Ventilation', icon: Wind },
  { id: 'thermal', label: 'Thermal/Insulation', icon: Thermometer },
  { id: 'property_exterior', label: 'Property Exterior', icon: Home },
]

export default function PhotosPage({ params }: { params: { projectId: string } }) {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load photos on mount
  useEffect(() => {
    loadPhotos()
  }, [params.projectId])

  const loadPhotos = async () => {
    setLoading(true)
    const data = await getProjectPhotos(params.projectId)
    setPhotos(data)
    setLoading(false)
  }

  const filteredPhotos = selectedCategory
    ? photos.filter(p => p.category === selectedCategory)
    : photos

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      setShowUploadModal(true)
    }
  }

  const handleUpload = async (file: File, category: string, description: string) => {
    setUploading(true)
    const result = await uploadPhoto(params.projectId, file, category, description)
    setUploading(false)

    if (result) {
      await loadPhotos() // Reload photos
      setShowUploadModal(false)
    } else {
      alert('Failed to upload photo. Please try again.')
    }
  }

  const handleDelete = async (photoId: string) => {
    if (!confirm('Are you sure you want to delete this photo?')) return

    const success = await deletePhoto(photoId)
    if (success) {
      await loadPhotos()
      setSelectedPhoto(null)
    } else {
      alert('Failed to delete photo. Please try again.')
    }
  }

  const handleAddPhoto = () => {
    fileInputRef.current?.click()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-500" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-surface-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg hover:bg-surface-100 transition-colors">
              <ChevronLeft className="w-5 h-5 text-surface-600" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-surface-900">Site Photos</h1>
              <p className="text-sm text-surface-500">Project: {params.projectId}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-surface-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-surface-200'}`}
              >
                <Grid className="w-4 h-4 text-surface-600" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-surface-200'}`}
              >
                <List className="w-4 h-4 text-surface-600" />
              </button>
            </div>
            <button
              onClick={handleAddPhoto}
              className="btn-primary flex items-center gap-2"
            >
              <Camera className="w-4 h-4" />
              Add Photo
            </button>
          </div>
        </div>
      </header>

      <div className="p-8">
        {/* Category Filters */}
        <div className="mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors
                         ${selectedCategory === null
                           ? 'bg-brand-100 text-brand-700'
                           : 'bg-white border border-surface-200 text-surface-600 hover:bg-surface-50'}`}
            >
              All Photos ({photos.length})
            </button>
            {photoCategories.map((cat) => {
              const count = photos.filter(p => p.category === cat.id).length
              const Icon = cat.icon
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap flex items-center gap-2 transition-colors
                             ${selectedCategory === cat.id
                               ? 'bg-brand-100 text-brand-700'
                               : 'bg-white border border-surface-200 text-surface-600 hover:bg-surface-50'}`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label} ({count})
                </button>
              )
            })}
          </div>
        </div>

        {/* Photo Grid/List */}
        {filteredPhotos.length === 0 ? (
          <div className="empty-state">
            <Camera className="empty-state-icon" />
            <p className="empty-state-title">No photos yet</p>
            <p className="empty-state-description">
              Start capturing photos to document the survey findings
            </p>
            <button onClick={handleAddPhoto} className="btn-primary mt-4">
              Add First Photo
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPhotos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                onClick={() => setSelectedPhoto(photo)}
                onDelete={handleDelete}
              />
            ))}

            {/* Add Photo Card */}
            <button
              onClick={handleAddPhoto}
              className="aspect-square rounded-xl border-2 border-dashed border-surface-300
                         flex flex-col items-center justify-center gap-3
                         hover:border-brand-400 hover:bg-brand-50/50 transition-all"
            >
              <div className="p-4 rounded-full bg-surface-100">
                <Camera className="w-8 h-8 text-surface-400" />
              </div>
              <span className="text-surface-500 font-medium">Add Photo</span>
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-surface-200 divide-y divide-surface-100">
            {filteredPhotos.map((photo) => (
              <PhotoListItem
                key={photo.id}
                photo={photo}
                onClick={() => setSelectedPhoto(photo)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Photo Detail Modal */}
      {selectedPhoto && (
        <PhotoDetailModal
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          onDelete={handleDelete}
        />
      )}

      {/* Hidden file input for camera/upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Upload Modal */}
      {showUploadModal && fileInputRef.current?.files?.[0] && (
        <UploadModal
          file={fileInputRef.current.files[0]}
          onClose={() => setShowUploadModal(false)}
          onUpload={handleUpload}
          uploading={uploading}
        />
      )}
    </div>
  )
}

// ============================================================================
// PHOTO CARD COMPONENT
// ============================================================================

function PhotoCard({
  photo,
  onClick,
  onDelete,
}: {
  photo: Photo
  onClick: () => void
  onDelete: (id: string) => void
}) {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const category = photoCategories.find(c => c.id === photo.category)
  const Icon = category?.icon || ImageIcon

  useEffect(() => {
    getPhotoUrl(photo.storage_path).then(setImageUrl)
  }, [photo.storage_path])

  return (
    <div
      onClick={onClick}
      className="group relative aspect-square rounded-xl overflow-hidden bg-surface-100 cursor-pointer
                 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      {/* Photo Image */}
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={photo.description || 'Survey photo'}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-surface-200 to-surface-300">
          <Loader2 className="w-8 h-8 text-surface-400 animate-spin" />
        </div>
      )}

      {/* Category Badge */}
      <div className="absolute top-2 left-2">
        <span className="px-2 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-medium text-surface-700 flex items-center gap-1">
          <Icon className="w-3 h-3" />
          {category?.label}
        </span>
      </div>

      {/* Description Overlay */}
      {photo.description && (
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
          <p className="text-white text-sm font-medium truncate">{photo.description}</p>
        </div>
      )}

      {/* Hover Actions */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete(photo.id)
          }}
          className="p-2 rounded-lg bg-white/90 hover:bg-white shadow-sm transition-colors"
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </button>
      </div>
    </div>
  )
}

// ============================================================================
// PHOTO LIST ITEM COMPONENT
// ============================================================================

function PhotoListItem({ photo, onClick }: { photo: Photo; onClick: () => void }) {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const category = photoCategories.find(c => c.id === photo.category)
  const Icon = category?.icon || ImageIcon

  useEffect(() => {
    getPhotoUrl(photo.storage_path).then(setImageUrl)
  }, [photo.storage_path])

  return (
    <div
      onClick={onClick}
      className="p-4 flex items-center gap-4 cursor-pointer hover:bg-surface-50 transition-colors"
    >
      <div className="w-20 h-20 rounded-lg bg-surface-100 flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={photo.description || 'Survey photo'} className="w-full h-full object-cover" />
        ) : (
          <Loader2 className="w-6 h-6 text-surface-400 animate-spin" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-surface-900 truncate">{photo.description || photo.file_name}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm text-surface-500">{photo.file_name}</span>
          <span className="text-surface-300">•</span>
          <span className="text-sm text-surface-500">{new Date(photo.created_at).toLocaleString()}</span>
        </div>
      </div>
      <span className="badge badge-blue flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {category?.label}
      </span>
    </div>
  )
}

// ============================================================================
// PHOTO DETAIL MODAL
// ============================================================================

function PhotoDetailModal({
  photo,
  onClose,
  onDelete,
}: {
  photo: Photo
  onClose: () => void
  onDelete: (id: string) => void
}) {
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  useEffect(() => {
    getPhotoUrl(photo.storage_path).then(setImageUrl)
  }, [photo.storage_path])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Photo Preview */}
          <div className="flex-1 bg-surface-900 flex items-center justify-center min-h-[400px]">
            {imageUrl ? (
              <img src={imageUrl} alt={photo.description || 'Survey photo'} className="max-w-full max-h-[600px] object-contain" />
            ) : (
              <Loader2 className="w-12 h-12 text-surface-500 animate-spin" />
            )}
          </div>

          {/* Photo Details */}
          <div className="w-full md:w-80 p-6 overflow-auto">
            <h3 className="text-lg font-semibold text-surface-900 mb-4">Photo Details</h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-surface-500">File Name</label>
                <p className="font-medium text-surface-900">{photo.file_name}</p>
              </div>

              <div>
                <label className="text-sm text-surface-500">Category</label>
                <p className="font-medium text-surface-900 capitalize">
                  {photo.category.replace('_', ' ')}
                </p>
              </div>

              {photo.description && (
                <div>
                  <label className="text-sm text-surface-500">Description</label>
                  <p className="font-medium text-surface-900">{photo.description}</p>
                </div>
              )}

              <div>
                <label className="text-sm text-surface-500">Uploaded</label>
                <p className="font-medium text-surface-900">
                  {new Date(photo.created_at).toLocaleString()}
                </p>
              </div>

              {photo.file_size && (
                <div>
                  <label className="text-sm text-surface-500">Size</label>
                  <p className="font-medium text-surface-900">
                    {(photo.file_size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              )}

              <div className="pt-4 border-t border-surface-100 flex gap-2">
                {imageUrl && (
                  <a
                    href={imageUrl}
                    download={photo.file_name}
                    className="btn-secondary flex-1 flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </a>
                )}
                <button
                  onClick={() => onDelete(photo.id)}
                  className="btn-ghost text-red-600 hover:bg-red-50 flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// UPLOAD MODAL COMPONENT
// ============================================================================

function UploadModal({
  file,
  onClose,
  onUpload,
  uploading,
}: {
  file: File
  onClose: () => void
  onUpload: (file: File, category: string, description: string) => void
  uploading: boolean
}) {
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('general')
  const [preview, setPreview] = useState<string>('')

  useEffect(() => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }, [file])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="px-6 py-4 border-b border-surface-100 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-surface-900">Upload Photo</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-surface-100 transition-colors">
            <X className="w-5 h-5 text-surface-500" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Preview */}
          {preview && (
            <div className="rounded-xl overflow-hidden bg-surface-100">
              <img src={preview} alt="Preview" className="w-full h-48 object-cover" />
            </div>
          )}

          <div>
            <label className="input-label">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input-field"
              disabled={uploading}
            >
              {photoCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="input-label">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-field resize-none"
              rows={3}
              placeholder="Describe what this photo shows..."
              disabled={uploading}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="btn-secondary flex-1" disabled={uploading}>
              Cancel
            </button>
            <button
              onClick={() => onUpload(file, category, description)}
              className="btn-primary flex-1 flex items-center justify-center gap-2"
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Upload
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
```

---

### STEP 4: Apply Database Migration

After creating the migration file, run:

```bash
cd survey-system
npx supabase db reset  # If in development
# OR
npx supabase migration up  # If in production
```

---

## ✅ Testing Checklist

After implementation, test the following:

1. **Upload Photo**
   - [ ] Navigate to `/survey/[projectId]/photos`
   - [ ] Click "Add Photo"
   - [ ] Select an image file
   - [ ] Add description and category
   - [ ] Click Upload
   - [ ] Verify photo appears in grid

2. **View Photo**
   - [ ] Click on a photo thumbnail
   - [ ] Verify full-size image loads
   - [ ] Verify metadata displays correctly

3. **Delete Photo**
   - [ ] Click delete button on a photo
   - [ ] Confirm deletion
   - [ ] Verify photo removed from storage and database

4. **Filter Photos**
   - [ ] Click category filters
   - [ ] Verify only photos in that category show

5. **Database Verification**
   - [ ] Check `photos` table - should contain `storage_path`, NOT base64 data
   - [ ] Verify `storage_path` values like: `proj-001/damp_evidence/1707756234567_a3f2c1d5.jpg`
   - [ ] Check Supabase Storage bucket contains actual files

6. **Storage Bucket**
   - [ ] Open Supabase Dashboard → Storage
   - [ ] Verify `survey-photos` bucket exists
   - [ ] Verify folders created: `{project_id}/{category}/`
   - [ ] Verify image files are stored

---

## 🎯 Success Criteria

- ✅ Photos stored in Supabase Storage bucket (NOT in database)
- ✅ Database `photos` table contains only `storage_path` (URL/path string)
- ✅ Photos can be uploaded, viewed, and deleted
- ✅ Photo URLs load correctly from storage
- ✅ No base64 strings in database
- ✅ Storage bucket organized by project and category
- ✅ Photo metadata (size, mime type) stored in database

---

## 📝 Notes

- **File Size Limit**: Currently set to 10MB per photo (adjust in validation if needed)
- **Supported Formats**: JPEG, PNG, WebP (check `accept="image/*"` attribute)
- **Public vs Private**: Currently set to private bucket with authenticated access
- **Thumbnails**: Not implemented yet (future enhancement)
- **Offline Support**: Not implemented yet (future enhancement)

---

## 🚨 Common Issues & Solutions

**Issue**: "Policy violation" when uploading
- **Solution**: Ensure storage policies created correctly in migration
- **Solution**: Check user is authenticated

**Issue**: Photos not loading
- **Solution**: Verify `storage_path` in database matches actual file path
- **Solution**: Check bucket name is `survey-photos`

**Issue**: Upload fails silently
- **Solution**: Check browser console for errors
- **Solution**: Verify Supabase credentials are correct

**Issue**: Database still has `file_path` column
- **Solution**: Old migration needs to be updated or new migration created to alter column name

---

## 🎓 Key Concepts

**Why Storage Buckets?**
- Database = structured data (metadata, URLs)
- Storage = unstructured data (files, images)
- Separation of concerns = better performance

**Storage Path Structure:**
```
{project_id}/{category}/{timestamp}_{uuid}.{ext}
Example: proj-001/damp_evidence/1707756234567_a3f2.jpg
```

**Database Record:**
```json
{
  "id": "photo-uuid",
  "project_id": "proj-001",
  "storage_path": "proj-001/damp_evidence/1707756234567_a3f2.jpg",
  "file_size": 524288,
  "mime_type": "image/jpeg",
  "category": "damp_evidence",
  "description": "Rising damp on north wall"
}
```

**How to Display:**
```typescript
const url = await getPhotoUrl(photo.storage_path)
// Returns: "https://xxx.supabase.co/storage/v1/object/public/survey-photos/proj-001/..."
<img src={url} alt="..." />
```

---

Implement these changes in order, test after each step, and verify photos are being stored correctly in Supabase Storage with only paths in the database.
