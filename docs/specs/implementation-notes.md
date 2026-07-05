# Implementation notes — retry/timeout behaviour, storage layouts, UI mechanics

Reference detail relocated from CLAUDE.md (2026-07-05). These are stable implementation facts that only matter when working on the specific feature — check here before re-deriving behaviour from code.

## Resilience & timing

- **Deepgram transcription** retries up to 2 times on 429/503 with exponential backoff (2s, 4s). LLM polish-observation has a 30-second `AbortController` timeout.
- **Wizard auto-save** fires on forward navigation, back navigation, and step clicks alike. Room Inspection (step 2) requires at least 1 room before the surveyor can proceed.
- **Wake Lock API** is held during voice recording (`AudioRecorder.tsx`) to prevent phone sleep; released on stop.
- **NotificationBell reconnection:** the Supabase realtime channel auto-reconnects 5s after `CHANNEL_ERROR`/`TIMED_OUT` via a `reconnectKey` state counter that forces the subscription useEffect to re-run.

## Storage layouts

- **Traffic light urgency** (`FindingUrgency`: `green | amber | red`) is stored per-issue per-room in `room_data.{issue_type}.urgency`, plus `ExternalInspection.urgency`. The report generator computes overall urgency (highest severity wins) into the `executive_summary` section's `data.overall_urgency` + `data.urgency_counts`; room sub-sections get `data.urgency` from the room's highest issue urgency. `UrgencySelector` is shared across all 4 wizard field components + external inspection.
- **Photo visibility** (`PhotoVisibility`: `customer | technician | office`) defaults to `customer` when unset (backwards compatible). The public report filters out photos where `visibility` is set and ≠ `customer`. Selector lives in the PhotoCapture modal.
- **Proposal quick-select** stores selected item IDs in `surveys.survey_data.proposal_items` (string array); 13 predefined items in `src/lib/proposal-items.ts` (id, label, full text, category); free text via `survey_data.proposal_comments`.
- **Limitations quick-select** stores IDs in `surveys.survey_data.limitations`; 12 predefined items in `proposal-items.ts`. Records what could not be inspected (company protection).
- **Sketch plan uploads** land in the `survey-photos` bucket under `{surveyId}/sketch/{timestamp}-{randomId}.{ext}` (JPEG/PNG/PDF, ≤10MB); metadata appended to `survey_data.photos` via `serializeWrite()`; photo IDs linked to the `sketch_plan` report section via `updateReportSectionPhotos()`. Public report: images full-width with lightbox, PDFs via `<object>` embed with download fallback.
- **Installer info** "Special Instructions for Workmen" field (renamed from "General Notes") is the `notes` column on `survey_installer_info`; used in the handover pack job summary text.

## Report rendering

- **Completeness validation** (`src/lib/report-validation.ts`) checks: front + rear elevation photos, sketch plan, rooms with issues, urgency per finding, room photos, external inspection, proposal items, limitations. Inline amber/red panel in the report editor while status ≠ `published`.
- **Branding constants:** navy gradient `#09283f → #103a58 → #125a71` with Tyne Bridge SVG watermark on the cover; header shows all 4 regional numbers; footer is a dark navy 3-column layout (registered office Company No. 09747364, regional contacts, report reference). Print CSS preserves backgrounds via `print-color-adjust: exact`.
