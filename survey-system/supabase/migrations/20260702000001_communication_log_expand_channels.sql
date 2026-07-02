-- =============================================================================
-- Expand communication_log channels and statuses
--
-- Adds phone, whatsapp, and in_person channels for manual communication
-- logging by office staff. Adds 'logged' status for manually recorded entries.
-- =============================================================================

-- Expand channel constraint to include phone, whatsapp, in_person
ALTER TABLE public.communication_log
  DROP CONSTRAINT communication_log_channel_check;

ALTER TABLE public.communication_log
  ADD CONSTRAINT communication_log_channel_check
  CHECK (channel IN ('email', 'sms', 'in_app', 'phone', 'whatsapp', 'in_person'));

-- Expand status constraint to include 'logged' for manual entries
ALTER TABLE public.communication_log
  DROP CONSTRAINT communication_log_status_check;

ALTER TABLE public.communication_log
  ADD CONSTRAINT communication_log_status_check
  CHECK (status IN ('sent', 'failed', 'pending', 'delivered', 'bounced', 'logged'));
