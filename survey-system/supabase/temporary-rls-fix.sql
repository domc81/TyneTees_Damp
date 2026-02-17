-- ============================================================================
-- TEMPORARY RLS POLICY FOR DEVELOPMENT
-- This file contains temporary RLS policies that allow development to continue
-- while maintaining basic security. These policies MUST be replaced with proper
-- role-based policies before production deployment.
-- ============================================================================

-- Enable Row-Level Security on customer_details table
ALTER TABLE customer_details ENABLE ROW LEVEL SECURITY;

-- Policy: Allow service role (backend) full access
-- This is secure and should be kept in production
CREATE POLICY "Service role full access"
ON customer_details
FOR ALL
USING (auth.role() = 'service_role');

-- TEMPORARY POLICY: Allow anonymous access for local development only
-- ⚠️ WARNING: This policy allows anonymous access and MUST be removed
-- before production deployment!
-- This is only for local development where the system is not exposed to the web.
CREATE POLICY "Temporary development access"
ON customer_details
FOR ALL
USING (
  auth.role() = 'service_role' OR
  auth.role() = 'anon'  -- TEMPORARY: Remove this line before production!
);

-- ============================================================================
-- PRODUCTION RLS POLICIES (COMMENTED OUT FOR NOW)
-- These are the proper policies that should be used in production
-- Uncomment and use these when implementing proper authentication
-- ============================================================================

-- Admin: Full access (uncomment for production)
-- CREATE POLICY "Admin full access"
-- ON customer_details
-- FOR ALL
-- USING (
--   auth.role() = 'service_role' OR
--   (auth.role() = 'authenticated' AND
--    current_setting('request.jwt.claims')::jsonb->>'role' = 'admin')
-- );

-- Office staff: Full customer access (uncomment for production)
-- CREATE POLICY "Office staff customer access"
-- ON customer_details
-- FOR ALL
-- USING (
--   auth.role() = 'authenticated' AND
--   current_setting('request.jwt.claims')::jsonb->>'role' = 'office'
-- );

-- Surveyors: Access to customers for their projects (uncomment for production)
-- CREATE POLICY "Surveyor customer access"
-- ON customer_details
-- FOR SELECT
-- USING (
--   auth.role() = 'authenticated' AND
--   current_setting('request.jwt.claims')::jsonb->>'role' = 'surveyor' AND
--   EXISTS (
--     SELECT 1 FROM projects
--     WHERE customer_id = customer_details.id
--     AND surveyor_id = auth.uid()
--   )
-- );

-- ============================================================================
-- INSTRUCTIONS FOR USE:
-- 1. Run this SQL in Supabase SQL Editor to unblock development
-- 2. Test customer creation and display - should work immediately
-- 3. When ready to implement proper authentication:
--   a. Remove the "Temporary development access" policy
--   b. Uncomment and implement the production policies
--   c. Implement Supabase authentication following AUTHENTICATION.md
-- ============================================================================

-- Verify policies were applied correctly
SELECT policyname as policy_name, cmd as action, roles
FROM pg_policies
WHERE tablename = 'customer_details'
ORDER BY policyname;