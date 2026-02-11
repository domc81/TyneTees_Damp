-- Migration: Photo Storage from Base64 to Supabase Storage
-- Run this to migrate photos from base64 blobs to Supabase Storage buckets

-- 1. Create Supabase Storage bucket for survey photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('survey-photos', 'survey-photos', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Set up storage policies for photo access
-- Note: Using 'public' role with bucket_id check for local development compatibility
-- In production with auth enabled, you may want to use authenticated role instead

-- Public read access (anyone can view photos in public bucket)
CREATE POLICY "Public read access for survey photos" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'survey-photos');

-- Authenticated uploads (users with valid JWT can upload)
CREATE POLICY "Allow authenticated uploads" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'survey-photos');

-- Authenticated updates
CREATE POLICY "Allow authenticated updates" ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'survey-photos')
  WITH CHECK (true);

-- Authenticated deletes
CREATE POLICY "Allow authenticated deletes" ON storage.objects
  FOR DELETE
  USING (bucket_id = 'survey-photos');

-- 3. Alter photos table to add missing fields and fix schema
ALTER TABLE photos
ADD COLUMN IF NOT EXISTS question_id TEXT,
ADD COLUMN IF NOT EXISTS storage_path TEXT,
ADD COLUMN IF NOT EXISTS file_size INTEGER,
ADD COLUMN IF NOT EXISTS mime_type TEXT,
ADD COLUMN IF NOT EXISTS photo_category TEXT,
ADD COLUMN IF NOT EXISTS taken_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS uploaded_by TEXT;

ALTER TABLE photos
ALTER COLUMN file_path DROP NOT NULL;

-- 4. Create index for efficient question-based photo lookup
CREATE INDEX IF NOT EXISTS idx_photos_question_id ON photos(project_id, question_id);

-- 5. Add comments explaining the field usage
COMMENT ON COLUMN photos.file_path IS 'DEPRECATED: Legacy base64 storage. Use storage_path instead.';
COMMENT ON COLUMN photos.storage_path IS 'Path in Supabase Storage bucket (e.g., project-id/question-id/filename.jpg)';
