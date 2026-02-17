-- ============================================================================
-- SUPABASE AUTHENTICATION SETUP
-- This file sets up the authentication system with a super admin user
-- and proper RLS policies for production use
-- ============================================================================

-- ============================================================================
-- STEP 1: REMOVE TEMPORARY RLS POLICIES
-- Remove the temporary development policies
-- ============================================================================

DROP POLICY IF EXISTS "Temporary development access" ON customer_details;

-- ============================================================================
-- STEP 2: CREATE PROPER RLS POLICIES FOR PRODUCTION
-- Role-based access control policies
-- ============================================================================

-- Enable RLS if not already enabled
ALTER TABLE customer_details ENABLE ROW LEVEL SECURITY;

-- Policy: Allow admin users full access
CREATE POLICY "Admin full access"
ON customer_details 
FOR ALL 
USING (
  auth.role() = 'service_role' OR
  (auth.role() = 'authenticated' AND 
   current_setting('request.jwt.claims')::jsonb->>'role' = 'admin')
);

-- Policy: Allow office staff full customer access
CREATE POLICY "Office staff customer access"
ON customer_details 
FOR ALL 
USING (
  auth.role() = 'authenticated' AND
  current_setting('request.jwt.claims')::jsonb->>'role' = 'office'
);

-- Policy: Allow surveyors to access customers for their projects
CREATE POLICY "Surveyor customer access"
ON customer_details
FOR SELECT
USING (
  auth.role() = 'authenticated' AND
  current_setting('request.jwt.claims')::jsonb->>'role' = 'surveyor' AND
  EXISTS (
    SELECT 1 FROM projects
    JOIN surveyors ON projects.surveyor_id = surveyors.id
    WHERE customer_id = customer_details.id
    AND surveyors.user_id = auth.uid()
  )
);

-- ============================================================================
-- STEP 3: CREATE SUPER ADMIN USER
-- Create Dominic Clauzel as super admin
-- ============================================================================

-- Insert super admin user (use Supabase Auth API or dashboard)
-- This would normally be done through the Supabase dashboard or auth API
-- SQL below shows what the resulting profile should look like

INSERT INTO profiles (id, email, full_name, role, avatar_url)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'dominicclauzel@gmail.com'),
  'dominicclauzel@gmail.com',
  'Dominic Clauzel',
  'admin',
  'https://avatar.vercel.sh/dominicclauzel'
) 
ON CONFLICT (id) DO UPDATE 
SET email = EXCLUDED.email, 
    full_name = EXCLUDED.full_name, 
    role = EXCLUDED.role, 
    avatar_url = EXCLUDED.avatar_url;

-- ============================================================================
-- STEP 4: UPDATE PROJECTS TABLE RLS POLICIES
-- ============================================================================

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Admin: Full access
CREATE POLICY "Admin project access"
ON projects 
FOR ALL 
USING (
  auth.role() = 'service_role' OR
  (auth.role() = 'authenticated' AND 
   current_setting('request.jwt.claims')::jsonb->>'role' = 'admin')
);

-- Office staff: Full project access
CREATE POLICY "Office staff project access"
ON projects 
FOR ALL 
USING (
  auth.role() = 'authenticated' AND
  current_setting('request.jwt.claims')::jsonb->>'role' = 'office'
);

-- Surveyors: Access to their own projects
CREATE POLICY "Surveyor project access"
ON projects
FOR ALL
USING (
  auth.role() = 'authenticated' AND (
    current_setting('request.jwt.claims')::jsonb->>'role' = 'surveyor' AND
    EXISTS (
      SELECT 1 FROM surveyors
      WHERE surveyors.id = projects.surveyor_id
      AND surveyors.user_id = auth.uid()
    ) OR projects.surveyor_id IS NULL
  )
);

-- ============================================================================
-- STEP 4.5: CREATE RLS POLICIES FOR SURVEYORS TABLE
-- ============================================================================

-- Enable RLS for the surveyors table
ALTER TABLE surveyors ENABLE ROW LEVEL SECURITY;

-- Policy: Allow admin users full access to surveyors
CREATE POLICY "Admin full surveyor access"
ON surveyors
FOR ALL
USING (
  auth.role() = 'service_role' OR
  (auth.role() = 'authenticated' AND
   current_setting('request.jwt.claims')::jsonb->>'role' = 'admin')
);

-- Policy: Allow office staff full access to surveyors
CREATE POLICY "Office staff surveyor access"
ON surveyors
FOR ALL
USING (
  auth.role() = 'authenticated' AND
  current_setting('request.jwt.claims')::jsonb->>'role' = 'office'
);

-- Policy: Allow surveyors to view their own profile
CREATE POLICY "Surveyor own profile access"
ON surveyors
FOR SELECT
USING (
  auth.role() = 'authenticated' AND
  current_setting('request.jwt.claims')::jsonb->>'role' = 'surveyor' AND
  user_id = auth.uid()
);

-- Policy: Allow surveyors to update their own profile
CREATE POLICY "Surveyor update own profile"
ON surveyors
FOR UPDATE
USING (
  auth.role() = 'authenticated' AND
  current_setting('request.jwt.claims')::jsonb->>'role' = 'surveyor' AND
  user_id = auth.uid()
);

-- ============================================================================
-- STEP 5: VERIFY POLICIES
-- ============================================================================

SELECT
  tablename as table_name,
  policyname as policy_name,
  cmd as action
FROM pg_policies
WHERE tablename IN ('customer_details', 'projects', 'surveyors')
ORDER BY tablename, policyname;

-- ============================================================================
-- IMPLEMENTATION NOTES:
-- ============================================================================

-- 1. Create the super admin user through Supabase dashboard:
--    - Go to Authentication → Users
--    - Add user: dominicclauzel@gmail.com with password #Marcel21!
--    - Mark email as verified
--    - Set custom claims: {"role": "admin"}

-- 2. For other users, implement an invite system:
--    - Create an invites table
--    - Generate invite links with expiration
--    - Allow users to set their own password
--    - Assign roles based on invite type

-- 3. Update the application to use proper authentication:
--    - Add login/logout functionality
--    - Protect routes based on authentication state
--    - Display user role in UI
--    - Implement role-based feature access

-- 4. Remove temporary development policies before deployment

-- ============================================================================
-- INVITE SYSTEM SCHEMA (OPTIONAL)
-- Uncomment to create invite system
-- ============================================================================

-- CREATE TABLE invites (
--   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--   email TEXT NOT NULL UNIQUE,
--   role TEXT NOT NULL CHECK (role IN ('admin', 'office', 'surveyor')),
--   invite_token TEXT NOT NULL UNIQUE,
--   expires_at TIMESTAMPTZ NOT NULL,
--   created_at TIMESTAMPTZ DEFAULT NOW(),
--   created_by UUID REFERENCES profiles(id)
-- );

-- CREATE INDEX idx_invites_email ON invites(email);
-- CREATE INDEX idx_invites_token ON invites(invite_token);
-- CREATE INDEX idx_invites_expires ON invites(expires_at);

-- ============================================================================
-- SECURITY REMINDER:
-- ============================================================================

-- ⚠️ IMPORTANT: After applying these policies:
-- 1. Only authenticated users with proper roles can access data
-- 2. The temporary anonymous access is removed
-- 3. Super admin user must be created through Supabase dashboard
-- 4. Test all functionality with different user roles
-- 5. Implement proper error handling for auth failures

-- ============================================================================
-- END OF AUTHENTICATION SETUP
-- ============================================================================