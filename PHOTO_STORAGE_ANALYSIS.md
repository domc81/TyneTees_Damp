# Photo Storage Architecture Analysis

## 🔍 Current State (Main Branch)

### Database Schema

**Correct Schema** (from `001_complete_schema.sql`):
```sql
CREATE TABLE photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  room_inspection_id UUID REFERENCES room_inspections(id) ON DELETE SET NULL,

  storage_path TEXT NOT NULL,  -- ✅ Supabase Storage path/URL
  file_name TEXT NOT NULL,
  file_size BIGINT,
  mime_type TEXT,

  category TEXT NOT NULL,      -- damp_evidence, timber_damage, etc.
  description TEXT,

  latitude DECIMAL(10,8),      -- GPS coordinates
  longitude DECIMAL(10,8),

  taken_at TIMESTAMPTZ,
  uploaded_by UUID REFERENCES auth_users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### TypeScript Types (database.types.ts)

**Photo Interface** (lines 44-58):
```typescript
export interface Photo {
  id: string
  project_id: string
  storage_path: string        // ✅ Matches database schema
  file_name: string
  file_size?: number
  mime_type?: string
  description?: string
  photo_category?: string
  latitude?: number
  longitude?: number
  taken_at?: string
  uploaded_by?: string
  created_at: string
}
```

### Data Layer (supabase-data.ts)

**Mismatch Found** (lines 175-184):
```typescript
export interface Photo {
  id: string
  project_id: string
  room_id: string | null
  file_path: string           // ❌ WRONG - should be storage_path
  file_name: string
  category: string
  description: string | null
  created_at: string
}
```

### Current Implementation Issues

1. **❌ No Supabase Storage Integration**
   - Photos page (`survey/[projectId]/photos/page.tsx`) uses mock data only
   - No actual upload/download functionality
   - Console.log placeholders: "Would upload to Supabase Storage here" (line 58)

2. **❌ Data Layer Type Mismatch**
   - `supabase-data.ts` Photo interface uses `file_path` instead of `storage_path`
   - Doesn't match database schema or main types file
   - Missing fields: `file_size`, `mime_type`, `latitude`, `longitude`, `taken_at`, `uploaded_by`

3. **❌ No Photo Capture in Structured Survey**
   - Survey form (`structured-survey-form.tsx`) has no photo capture UI
   - Only handles text/number/select inputs
   - No camera integration

4. **❌ No Supabase Storage Buckets Created**
   - No bucket configuration in migrations
   - No bucket policies defined
   - Storage not initialized

---

## ✅ Correct Architecture Design

### Supabase Storage Bucket Strategy

**Recommended Bucket Structure:**

```
survey-photos/              (Main bucket)
├── {project_id}/
│   ├── evidence/          (Damp evidence, defects)
│   ├── general/           (Overview shots)
│   ├── timber/            (Timber damage)
│   ├── thermal/           (Thermal/insulation)
│   └── exterior/          (Property exterior)
```

**Or Multiple Buckets:**

```
photo-evidence/            (Primary findings)
photo-general/             (General documentation)
photo-thermal/             (Thermal imaging if used)
```

### Storage Bucket Policies

```sql
-- Create storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('survey-photos', 'survey-photos', false);

-- Allow authenticated users to upload
CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'survey-photos');

-- Allow authenticated users to read their project photos
CREATE POLICY "Allow project photo access"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'survey-photos');

-- Allow users to delete their uploads
CREATE POLICY "Allow authenticated deletes"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'survey-photos');
```

### Photo Upload Flow

```
1. User captures photo (camera or file upload)
   ↓
2. Client-side: Generate unique filename
   Format: {project_id}/{category}/{timestamp}_{uuid}.jpg
   ↓
3. Upload to Supabase Storage
   const { data, error } = await supabase.storage
     .from('survey-photos')
     .upload(filePath, file, {
       cacheControl: '3600',
       upsert: false
     })
   ↓
4. Get public/signed URL
   const { data: urlData } = supabase.storage
     .from('survey-photos')
     .getPublicUrl(filePath)
   ↓
5. Insert record into photos table
   INSERT INTO photos (
     project_id,
     storage_path,
     file_name,
     file_size,
     mime_type,
     category,
     description,
     taken_at
   ) VALUES (...)
   ↓
6. Store only the storage_path in database (NOT base64!)
```

### File Naming Convention

```typescript
const generatePhotoPath = (
  projectId: string,
  category: string,
  originalFileName: string
): string => {
  const timestamp = Date.now()
  const uuid = crypto.randomUUID().substring(0, 8)
  const ext = originalFileName.split('.').pop()
  return `${projectId}/${category}/${timestamp}_${uuid}.${ext}`
}

// Example: "proj-001/damp_evidence/1707756234567_a3f2c1d5.jpg"
```

---

## 🚨 What's Wrong with Current Approach

### If storing base64 in database tables:

1. **Massive Database Bloat**
   - 1 photo = ~500KB raw → ~670KB base64 encoded (+33% overhead)
   - 100 photos = 67MB of TEXT data in database rows
   - PostgreSQL row size limit = 1GB (but performance degrades long before)

2. **Slow Query Performance**
   - Fetching projects with photos = loading MBs of base64 strings
   - Joins become incredibly slow
   - Indexes don't help (can't index TEXT efficiently)

3. **Backup/Replication Issues**
   - Database backups include massive binary blobs as text
   - Replication lag increases dramatically
   - Backup storage costs skyrocket

4. **No CDN/Caching Benefits**
   - Can't use Supabase CDN for image delivery
   - Can't leverage browser caching
   - No image optimization/resizing

5. **API Response Size**
   - Every API call fetching photos returns MBs of data
   - Mobile data usage explodes
   - Slow page loads

### Correct Approach: Storage Buckets + URLs

1. **Database stores only URL/path** (~50-100 bytes)
2. **Images served from Supabase CDN** (fast, cached, optimized)
3. **Database queries remain fast** (small rows, efficient joins)
4. **Separate concerns** (data vs. files)
5. **Easy to add image transformations** (thumbnails, compression)

---

## 📝 Implementation Checklist

### Phase 1: Fix Data Layer
- [ ] Update `supabase-data.ts` Photo interface to match schema
- [ ] Change `file_path` → `storage_path`
- [ ] Add missing fields: `file_size`, `mime_type`, `latitude`, `longitude`, `taken_at`, `uploaded_by`

### Phase 2: Create Storage Bucket
- [ ] Create migration for `survey-photos` bucket
- [ ] Set up storage policies (upload, read, delete)
- [ ] Configure CORS if needed
- [ ] Test bucket access

### Phase 3: Photo Upload Service
- [ ] Create `lib/photo-upload.ts` utility
  - [ ] File validation (size, type)
  - [ ] Generate unique paths
  - [ ] Upload to Supabase Storage
  - [ ] Create database record
  - [ ] Error handling
- [ ] Add photo deletion function
- [ ] Add photo retrieval function

### Phase 4: Update Photos Page
- [ ] Replace mock data with real Supabase queries
- [ ] Implement file upload with Supabase Storage
- [ ] Display photos from storage URLs
- [ ] Add delete functionality
- [ ] Handle loading/error states

### Phase 5: Integrate with Survey Form
- [ ] Add camera/photo capture UI to QuestionRenderer
- [ ] Add photo upload on question-level
- [ ] Link photos to survey answers (new linking strategy needed)
- [ ] Display captured photos in survey form

### Phase 6: Testing
- [ ] Test upload with various image types/sizes
- [ ] Test deletion and cleanup
- [ ] Test permissions/RLS policies
- [ ] Test offline scenarios
- [ ] Test mobile camera integration

---

## 🎯 Files That Need Changes

### 1. Database Migration (NEW)
**File:** `supabase/migrations/002_storage_setup.sql`
- Create storage bucket
- Set up policies
- Initialize bucket permissions

### 2. Data Layer
**File:** `src/lib/supabase-data.ts`
- Fix Photo interface (line 175-184)
- Add photo upload function
- Add photo deletion function

### 3. Photo Upload Service (NEW)
**File:** `src/lib/photo-service.ts`
- Upload photos to Storage
- Generate unique paths
- Create database records
- Handle errors

### 4. Photos Page
**File:** `src/app/survey/[projectId]/photos/page.tsx`
- Remove mock data (line 33-38)
- Implement real Supabase queries
- Add actual upload logic (line 54-60)
- Display photos from storage URLs

### 5. Structured Survey Form (Optional Phase 5)
**File:** `src/components/structured-survey-form.tsx`
- Add photo capture component
- Integrate with photo service
- Link photos to questions

### 6. Type Definitions
**File:** `src/types/database.types.ts`
- Already correct! No changes needed

---

## 📊 Storage Size Estimates

### Per Photo:
- Original JPEG: ~500KB
- Stored in bucket: 500KB
- Database record: ~200 bytes (just metadata + URL)

### 100 Photos:
- Storage bucket: 50MB
- Database: 20KB

### 1000 Photos:
- Storage bucket: 500MB
- Database: 200KB

**Compare to base64 in database:**
- Database: 670MB
- Query to fetch 100 photos: 67MB transferred!

---

## 🔐 Security Considerations

1. **Authentication Required**
   - Only authenticated users can upload
   - Use RLS policies to restrict access

2. **File Validation**
   - Validate file type (only images)
   - Validate file size (max 10MB per photo)
   - Validate mime type on server

3. **Signed URLs**
   - For private photos, use signed URLs with expiration
   - Don't expose permanent public URLs if sensitive

4. **Storage Quotas**
   - Monitor storage usage per project
   - Implement cleanup for deleted projects
   - Archive old project photos

---

## 💡 Recommendations

1. **Start with single bucket** (`survey-photos`)
   - Simpler to manage
   - Use folder structure for categories
   - Can split later if needed

2. **Add image optimization**
   - Consider Supabase Image Transformation
   - Generate thumbnails for gallery view
   - Compress uploads client-side before upload

3. **Implement lazy loading**
   - Load photo metadata first
   - Load actual images on-demand
   - Use intersection observer for gallery

4. **Add photo metadata extraction**
   - Extract EXIF data (GPS, timestamp)
   - Store in database for searchability
   - Strip sensitive EXIF before storage

5. **Consider offline support**
   - Use IndexedDB for offline photos
   - Sync when connection restored
   - Show upload queue status
