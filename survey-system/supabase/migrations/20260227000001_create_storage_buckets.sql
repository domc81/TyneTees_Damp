-- ============================================
-- Create storage bucket: survey-photos
-- ============================================
-- Single bucket for all photo uploads:
--   - Survey inspection photos ({surveyId}/site_details/*, external_inspection/*, room_inspection/*)
--   - Installer info photos ({surveyId}/installer-info/{category}/*)
--   - Legacy photos ({projectId}/{questionId}/*)

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'survey-photos',
  'survey-photos',
  true,
  10485760,  -- 10MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']
)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- RLS Policies for storage.objects
-- ============================================

-- Authenticated users can read files
CREATE POLICY "Authenticated users can read survey photos"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'survey-photos');

-- Authenticated users can upload files
CREATE POLICY "Authenticated users can upload survey photos"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'survey-photos');

-- Authenticated users can update file metadata
CREATE POLICY "Authenticated users can update survey photos"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'survey-photos')
  WITH CHECK (bucket_id = 'survey-photos');

-- Only admin and surveyor roles can delete files
CREATE POLICY "Admin and surveyor can delete survey photos"
  ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'survey-photos'
    AND EXISTS (
      SELECT 1 FROM public.user_profiles
      WHERE user_profiles.user_id = auth.uid()
        AND user_profiles.role IN ('admin', 'surveyor')
        AND user_profiles.is_active = true
    )
  );

-- Public read for getPublicUrl() (bucket is public)
CREATE POLICY "Public read access for survey photos"
  ON storage.objects FOR SELECT TO anon
  USING (bucket_id = 'survey-photos');
