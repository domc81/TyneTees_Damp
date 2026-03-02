# Audit complete. The report is Platform_Interaction_&_Communitcation_Touchpoint_Audit.md.

The platform is a complete communication island. Every customer-facing workflow (quotation sharing, report delivery, booking confirmation) currently requires someone to manually copy a URL and send it via an external channel. The data needed to fix this is almost entirely already in the database — it's just not being used.
─────────────────────────────────────────────────

What the audit found
The only automated communication today:

In-app booking notifications to surveyors via Supabase Realtime (bell icon). Works only when the surveyor is actively logged in — no email backup.
Everything else is manual:

Office manually copies quotation/report URLs and sends them themselves
Customers receive zero confirmation when a survey is booked
The booking_reminder notification type is defined in the codebase but never triggered anywhere
No email or SMS provider is integrated at all
The 5 highest-value communication gaps based on the audit:

#	Gap	Customer Impact
1	No booking confirmation to customer	Customer has no proof of booking
2	No "quotation ready" notification	Office must manually chase — delays conversion
3	No accept/decline on quotation page	Customer cannot formally respond — status stuck at viewed
4	No "report ready" notification	Customer never knows the report exists
5	No 24h reminder before survey	No-shows and missed appointments
The good news: The data infrastructure is largely ready. Customers already have email (required) and phone (required) stored. survey_bookings even snapshots customer_email and customer_phone at booking time — ready to fire a confirmation immediately. The communication module would be additive, not requiring schema surgery.

Ready to design the architecture whenever you are.
------------------------------------------------------------------------------------------------------

------------------------------------------------------------------------------------------------------

# Audit complete. The report is Communication_Infrastructure_Audit.md.

Here's the executive summary of what I found:

Two Critical Bugs Discovered
Realtime notifications are silently broken — The notifications table was never added to the supabase_realtime publication. Zero tables are in the publication. The NotificationBell component subscribes to Realtime events but never receives any. Users must manually open the dropdown to see new notifications.

Double-broken Realtime filter — Even if the publication were fixed, the Realtime filter in NotificationBell uses auth.uid() to match notifications.user_id, but that column stores user_profiles.id (a different UUID). The filter would never match.

Infrastructure State
Email: Completely absent. No SMTP, no SendGrid, no Resend, no email provider of any kind. The send-quotation Edge Function exists as a placeholder with a nice HTML template and commented-out Resend code — showing someone planned to use Resend but never connected it.

SMS: Nothing exists. Phone numbers are stored in UK domestic format (07xxx) without country codes and with inconsistent spacing — they'd need E.164 normalisation before any SMS API could use them.

Auth emails (password reset): Non-functional. SMTP is commented out in config.toml. Since email confirmation is disabled, this hasn't been noticed yet, but forgot-password won't work.

Scheduled tasks: pg_cron is not installed, so database-level scheduling (booking reminders, daily digests) isn't possible. You'd need an external scheduler.

Useful assets: pg_net extension IS installed (can make HTTP calls from SQL triggers), the service role key is configured, and all customer email/phone fields are required and populated.

# Insight ─────────────────────────────────────

The Realtime publication issue is a common self-hosted Supabase gotcha. On Supabase Cloud, tables are automatically added to the supabase_realtime publication when you enable Realtime in the dashboard. On self-hosted instances, you must run ALTER PUBLICATION supabase_realtime ADD TABLE <table> manually. The fact that the notification system appeared to work (because the dropdown still fetches data on open) masked the bug for weeks.

The user_profiles.id vs auth.uid() mismatch is an architectural pattern consequence — this codebase uses a separate user_profiles table with its own PK, and notifications reference that PK. But the auth context only exposes auth.uid(). Any Realtime filter or RLS policy needs to join through user_profiles to bridge this gap.