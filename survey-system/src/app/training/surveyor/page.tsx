'use client'

import { ProtectedRoute } from '@/components/ProtectedRoute'
import Layout from '@/components/layout'
import { TrainingArticle } from '@/components/training/TrainingArticle'
import { TrainingImage } from '@/components/training/TrainingImage'
import { Tip } from '@/components/training/Tip'
import Link from 'next/link'
import { ClipboardList } from 'lucide-react'

const sections = [
  { id: 'your-dashboard', label: '1. Your Dashboard' },
  { id: 'your-daily-schedule', label: '2. Your Daily Schedule' },
  { id: 'before-you-leave-the-office', label: '3. Before You Leave the Office' },
  { id: 'starting-a-survey', label: '4. Starting a Survey' },
  { id: 'the-survey-wizard', label: '5. The Survey Wizard' },
  { id: 'taking-photos', label: '6. Taking Photos' },
  { id: 'using-voice-recording', label: '7. Using Voice Recording' },
  { id: 'saving-your-work', label: '8. Saving Your Work' },
  { id: 'completing-the-survey', label: '9. Completing the Survey' },
  { id: 'after-the-survey', label: '10. After the Survey' },
  { id: 'your-availability', label: '11. Your Availability' },
  { id: 'quick-reference', label: '12. Quick Reference' },
]

export default function SurveyorGuidePage() {
  return (
    <ProtectedRoute>
      <Layout>
        <TrainingArticle
          title="Surveyor Guide"
          subtitle="For users with the Surveyor role"
          icon={ClipboardList}
          iconColor="text-emerald-400"
          iconBg="bg-emerald-500/10"
          roles={['surveyor']}
          sections={sections}
        >
          <p>
            This guide covers everything you need as a surveyor. You'll learn how to check your daily schedule, carry out a full survey using the step-by-step wizard on your phone or tablet, record findings with photos and voice notes, and mark surveys as complete.
          </p>

          <Tip variant="note">
            <strong>Before reading this guide</strong>, make sure you have completed the{' '}
            <Link href="/training/getting-started">Getting Started</Link> guide and can log in comfortably.
          </Tip>

          <hr />

          {/* ------------------------------------------------------------ */}
          {/* 1. Your Dashboard                                            */}
          {/* ------------------------------------------------------------ */}
          <section id="your-dashboard">
            <h2>1. Your Dashboard</h2>

            <TrainingImage
              src="/images/training/30-dashboard-surveyor.png"
              alt="Surveyor Dashboard"
              caption="Surveyor Dashboard"
            />

            <p>Your dashboard is your home screen. It shows:</p>

            <ul>
              <li><strong>No create buttons</strong> — new jobs are set up by the office as leads in the pipeline; your surveys arrive as bookings on your calendar</li>
              <li><strong>Four stat cards</strong> — Active Surveys, Completed, Won This Month, Total Projects</li>
              <li><strong>Recent Projects</strong> — A list of your most recent surveys, showing the customer name, address, status, quotation status, date, and survey type</li>
            </ul>

            <p>Click on any survey in the Recent Projects list to go straight to that survey's detail page.</p>

            <h3>What You Won't See</h3>

            <p>
              As a surveyor, your dashboard does <strong>not</strong> show the Lead Pipeline or the Recent Activity feed. These are managed by the office team. Your sidebar menu also does not include &ldquo;Leads&rdquo; or &ldquo;Workload&rdquo;. This is completely normal — the system only shows you what you need for your role.
            </p>
          </section>

          <hr />

          {/* ------------------------------------------------------------ */}
          {/* 2. Your Daily Schedule                                       */}
          {/* ------------------------------------------------------------ */}
          <section id="your-daily-schedule">
            <h2>2. Your Daily Schedule</h2>

            <p>Click <strong>Calendar</strong> in the sidebar to see your schedule.</p>

            <TrainingImage
              src="/images/training/31-calendar-surveyor.png"
              alt="Surveyor Calendar"
              caption="Surveyor Calendar"
            />

            <h3>How Your Calendar Works</h3>

            <p>Your calendar is different from what the office team sees:</p>

            <ul>
              <li><strong>It shows only your bookings</strong> — you cannot see other surveyors' schedules</li>
              <li><strong>It defaults to Day view</strong> — showing today's appointments. You can switch to Week or Month using the buttons in the top-right</li>
              <li><strong>&ldquo;Today's Agenda&rdquo;</strong> — A summary panel at the top showing today's bookings in a simple list format. If you have no surveys today, it will say &ldquo;No surveys scheduled for today&rdquo;</li>
            </ul>

            <h3>Navigating Dates</h3>

            <ul>
              <li>Click the <strong>left/right arrows</strong> to move to the previous or next day</li>
              <li>Click <strong>&ldquo;today&rdquo;</strong> to jump back to today</li>
              <li>Use the <strong>week</strong> or <strong>month</strong> buttons to see a wider view</li>
            </ul>

            <h3>Viewing a Booking</h3>

            <p>Click on any booking in the calendar to see its details:</p>

            <ul>
              <li>Customer name and contact details</li>
              <li>Property address</li>
              <li>Survey type</li>
              <li>Time slot</li>
              <li>Quick action buttons — call the customer, get email address, or get directions</li>
            </ul>

            <h3>Marking a Survey</h3>

            <p>From the booking detail, you can:</p>

            <ul>
              <li><strong>Mark as Completed</strong> — When you've finished the survey on-site</li>
              <li><strong>Mark as No Show</strong> — If the customer wasn't there</li>
            </ul>

            <Tip variant="note">
              Only office staff can reschedule or cancel bookings. If a survey needs rescheduling, contact the office.
            </Tip>
          </section>

          <hr />

          {/* ------------------------------------------------------------ */}
          {/* 3. Before You Leave the Office                               */}
          {/* ------------------------------------------------------------ */}
          <section id="before-you-leave-the-office">
            <h2>3. Before You Leave the Office</h2>

            <p>Before heading out to a survey:</p>

            <ol>
              <li><strong>Check your calendar</strong> — Make sure you know the time and address</li>
              <li><strong>Open the survey</strong> — From the calendar or from Surveys in the sidebar</li>
              <li><strong>Check the customer details</strong> — Name, phone number, and any notes</li>
              <li><strong>Make sure your phone/tablet is charged</strong> — You'll need it for the wizard, photos, and voice notes</li>
              <li><strong>Check your internet connection</strong> — The system needs an internet connection to save data. Mobile data works fine</li>
            </ol>
          </section>

          <hr />

          {/* ------------------------------------------------------------ */}
          {/* 4. Starting a Survey                                         */}
          {/* ------------------------------------------------------------ */}
          <section id="starting-a-survey">
            <h2>4. Starting a Survey</h2>

            <p>There are two ways to open a survey:</p>

            <h3>From the Calendar</h3>

            <ol>
              <li>Click on the booking in your calendar</li>
              <li>The booking detail shows the survey information</li>
              <li>Navigate to the survey detail page</li>
            </ol>

            <h3>From the Surveys List</h3>

            <ol>
              <li>Click <strong>Surveys</strong> in the sidebar</li>
              <li>Find the survey you need (use the search box if needed)</li>
              <li>Click on the survey card</li>
            </ol>

            <h3>The Survey Detail Page</h3>

            <TrainingImage
              src="/images/training/09-survey-detail.png"
              alt="Survey Detail"
              caption="Survey Detail"
            />

            <p>The survey detail page shows everything about a specific survey:</p>

            <ul>
              <li><strong>Customer and site details</strong> — Name, address, contact info</li>
              <li><strong>Survey appointment</strong> — Date, time, surveyor, status</li>
              <li><strong>Survey details</strong> — Inspection date, weather, reference number</li>
              <li><strong>Notes</strong> — Any notes from the office</li>
              <li><strong>Quotation</strong> — If one has been generated</li>
              <li><strong>Action buttons</strong> at the bottom</li>
            </ul>

            <p>To start or continue the survey wizard, click the <strong>&ldquo;Continue Survey&rdquo;</strong> button.</p>
          </section>

          <hr />

          {/* ------------------------------------------------------------ */}
          {/* 5. The Survey Wizard — Step by Step                          */}
          {/* ------------------------------------------------------------ */}
          <section id="the-survey-wizard">
            <h2>5. The Survey Wizard — Step by Step</h2>

            <p>
              The survey wizard guides you through the entire on-site inspection in 5 steps. You can see the steps at the top of the screen — each step lights up with a green tick when it's complete.
            </p>

            <TrainingImage
              src="/images/training/10-wizard-step1.png"
              alt="Wizard Steps"
              caption="Wizard Steps"
            />

            <p>The five steps are:</p>

            <ol>
              <li><strong>Site Details</strong> — Property and inspection information</li>
              <li><strong>External Inspection</strong> — Outside of the building</li>
              <li><strong>Room Inspection</strong> — Room by room, the main part of the survey</li>
              <li><strong>Additional Works</strong> — Whole-property items like ventilation, skips, and travel</li>
              <li><strong>Review</strong> — Check everything before submitting</li>
            </ol>

            <p>Let's go through each one.</p>

            <hr />

            {/* Step 1: Site Details */}
            <h3>Step 1: Site Details</h3>

            <p>This step captures basic information about the property and the inspection conditions.</p>

            <h4>Property Photo</h4>

            <ul>
              <li>Take a photo of the front of the property (street view)</li>
              <li>This is the first thing you do — tap the camera button and take the photo</li>
            </ul>

            <h4>Inspection Information</h4>

            <ul>
              <li><strong>Inspection Date</strong> — Today's date (auto-filled, but you can change it)</li>
              <li><strong>Weather Conditions</strong> — Select from the dropdown (Sunny, Cloudy, Overcast, Rain, etc.)</li>
              <li><strong>Temperature</strong> — Enter the current temperature in degrees Celsius</li>
            </ul>

            <h4>Property Details</h4>

            <ul>
              <li><strong>Property Type</strong> — Select from: Detached House, Semi-Detached, Terrace, Flat, Bungalow, etc.</li>
              <li><strong>Floor Number</strong> — Only appears if you selected &ldquo;Flat&rdquo; — which floor is the flat on?</li>
              <li><strong>Construction Type</strong> — Select: Solid Brick, Cavity Wall, Stone, Timber Frame, etc.</li>
              <li><strong>Approximate Build Year</strong> — Type the approximate date, e.g. &ldquo;1930s&rdquo; or &ldquo;Pre-1900&rdquo;</li>
            </ul>

            <p>When you've filled everything in, tap <strong>Next</strong> to move to Step 2.</p>

            <hr />

            {/* Step 2: External Inspection */}
            <h3>Step 2: External Inspection</h3>

            <p>Walk around the outside of the building and record what you find.</p>

            <h4>Building Defects</h4>

            <ul>
              <li>Toggle <strong>&ldquo;Were building defects noted?&rdquo;</strong> to Yes or No</li>
              <li>If Yes, a checklist of common defects appears — tick each one you can see</li>
              <li>For each defect you tick, you can take up to 2 photos of that specific defect</li>
              <li>Select the <strong>urgency level</strong>: Immediate, Short term (3 months), Medium term (6 months), Long term (12 months)</li>
            </ul>

            <h4>Specific Concerns</h4>

            <ul>
              <li><strong>Wall Tie Concern</strong> — Toggle on if you suspect wall tie issues</li>
              <li><strong>Cracking Concern</strong> — Toggle on if you notice structural cracking</li>
            </ul>

            <h4>External Inspection Observations</h4>

            <ul>
              <li>Type your observations in the text box, or use the <strong>voice recording</strong> button (see <a href="#using-voice-recording">Using Voice Recording</a> below)</li>
              <li>After recording, you can tap <strong>&ldquo;Polish&rdquo;</strong> to tidy up the text using AI — it keeps the meaning but makes the language more professional</li>
              <li>If you don't like the polished version, tap <strong>&ldquo;Undo&rdquo;</strong> to get your original text back</li>
            </ul>

            <p>Tap <strong>Next</strong> to move to Step 3.</p>

            <hr />

            {/* Step 3: Room Inspection */}
            <h3>Step 3: Room Inspection</h3>

            <p>This is the main part of the survey. You inspect the property <strong>room by room</strong>.</p>

            <h4>Adding a Room</h4>

            <ol>
              <li>Tap <strong>&ldquo;Add Room&rdquo;</strong></li>
              <li>Choose from the quick-select list: Living Room, Kitchen, Hallway, Bedroom 1, Bedroom 2, Bedroom 3, Bathroom, Dining Room, Study, Basement, Utility Room, Landing</li>
              <li>Or type a custom room name</li>
              <li>Select the <strong>floor level</strong>: Ground, 1st, 2nd, 3rd, 4th+</li>
            </ol>

            <p>Each room you add appears as a tab at the top. Tap between tabs to switch rooms.</p>

            <h4>For Each Room</h4>

            <p>Once you're in a room, work through these sections:</p>

            <ol>
              <li>
                <strong>Room ID Photo</strong> — Take a photo showing the room (helps identify which room this is later)
              </li>
              <li>
                <strong>Relative Humidity</strong> — Enter the RH reading (0-100%) if you have a hygrometer
              </li>
              <li>
                <p><strong>Issues Identified</strong> — This is the key part. Tick which issues you've found in this room:</p>
                <ul>
                  <li><strong>Damp</strong> (blue water droplet icon)</li>
                  <li><strong>Condensation</strong> (grey wind icon)</li>
                  <li><strong>Timber Decay</strong> (brown tree icon)</li>
                  <li><strong>Woodworm</strong> (red bug icon)</li>
                </ul>
                <p>You can tick multiple issues — a room might have both damp and timber decay, for example. Only tick what you actually find.</p>
              </li>
              <li>
                <strong>Room Observations</strong> — Type or voice-record your findings for this room. Use the Polish button to clean up voice transcriptions.
              </li>
              <li>
                <strong>Defect Evidence Photos</strong> — Take photos of the problems you've found (up to 15 per room). Add a short description of each photo, e.g. &ldquo;Left wall below window — rising damp staining to 1m height&rdquo;
              </li>
              <li>
                <p><strong>Issue-Specific Fields</strong> — Based on which issues you ticked, extra sections appear:</p>
              </li>
            </ol>

            {/* If You Ticked "Damp" */}
            <h4>If You Ticked &ldquo;Damp&rdquo;</h4>

            <p>You'll see fields for:</p>

            <ul>
              <li><strong>Affected Walls</strong> — Add each affected wall with its name, length, height, moisture readings, and details like radiator count, socket count, and whether wallpaper is present</li>
              <li><strong>DPC Treatment</strong> — Is a damp proof course needed? If yes, choose Traditional or Digital, and enter the wall length and depth</li>
              <li>
                <strong>Wall Treatment</strong> — Choose Membrane, Tanking, or None:
                <ul>
                  <li>For Membrane: select the height (1m, 1.2m, or 2m) and enter wall lengths</li>
                  <li>For Tanking: enter the area in square metres</li>
                </ul>
              </li>
              <li><strong>Strip-Out</strong> — Areas of plaster, stud walls, or ceilings to remove</li>
              <li><strong>Floor Treatment</strong> — Choose Resin Membrane, New Joists, or None, with area measurements</li>
              <li><strong>Plastering</strong> — Areas for stud walls, plasterboard, and skim coat</li>
            </ul>

            {/* If You Ticked "Condensation" */}
            <h4>If You Ticked &ldquo;Condensation&rdquo;</h4>

            <p>You'll see:</p>

            <ul>
              <li><strong>Evidence</strong> — Toggle on/off: condensation on windows, black mould present (with severity: light/moderate/severe), ventilation adequate</li>
              <li><strong>Humidity Reading</strong> — Enter the RH percentage</li>
              <li>
                <strong>Extraction</strong> — Is extraction needed? Choose Passive or Active ventilation:
                <ul>
                  <li>Passive: how many passive vents and core holes</li>
                  <li>Active: how many fans, electrical packs, grilles</li>
                </ul>
              </li>
            </ul>

            {/* If You Ticked "Timber Decay" */}
            <h4>If You Ticked &ldquo;Timber Decay&rdquo;</h4>

            <p>You'll see:</p>

            <ul>
              <li><strong>Floor Inspection</strong> — Floor type, condition, access level, sub-floor ventilation</li>
              <li><strong>Fungal Findings</strong> — Select from: None, Dry Rot, Wet Rot, Cellar Fungus, White Pore Fungus (multiple can be selected). Enter the treatment area</li>
              <li><strong>Timber Replacement</strong> — Toggle on if joists or flooring need replacing. Enter joist sizes, quantities, lengths, and flooring type and area. Includes accessories like endwrap, wall plates, and insulation</li>
              <li><strong>Masonry Preparation</strong> — Areas for debris clearance, mortar grinding, wire scrubbing, sterilant, and protective treatment</li>
            </ul>

            {/* If You Ticked "Woodworm" */}
            <h4>If You Ticked &ldquo;Woodworm&rdquo;</h4>

            <p>You'll see:</p>

            <ul>
              <li><strong>Infestation Details</strong> — Species (Common Furniture Beetle, Deathwatch Beetle, etc.), status (Active, Historic, Uncertain), severity (Light, Moderate, Severe), and whether there's structural damage</li>
              <li><strong>Treatment Areas</strong> — Spray floor area, spray timber area, paste treatment area</li>
              <li><strong>Fogging</strong> — Loft insulation area (with options for lifting and relaying insulation), staircase step counts</li>
            </ul>

            <h4>Marking a Room Complete</h4>

            <p>
              When you've finished inspecting a room, tap the <strong>&ldquo;Mark Complete&rdquo;</strong> checkbox at the top of the room. A green tick will appear on that room's tab.
            </p>

            <h4>Deleting a Room</h4>

            <p>
              If you added a room by mistake, tap the <strong>delete button</strong> on the room and confirm. Be careful — this removes all the data for that room.
            </p>

            <Tip variant="important">
              You must add and complete at least 1 room before you can move to Step 4. The system will not let you proceed with zero rooms.
            </Tip>

            <p>Tap <strong>Next</strong> to move to Step 4.</p>

            <hr />

            {/* Step 4: Additional Works */}
            <h3>Step 4: Additional Works</h3>

            <p>This step covers whole-property items that don't belong to a specific room.</p>

            <h4>Condensation Equipment (only appears if you identified condensation in any room)</h4>

            <ul>
              <li>Is a PIV (Positive Input Ventilation) unit recommended?</li>
              <li>If yes, choose the type (Loft Heated, Loft Unheated, or Wall Mounted) and enter quantities for units, electrical packs, and related components</li>
              <li>For loft-mounted PIV, you can also note if a new loft hatch and ladder is needed</li>
            </ul>

            <h4>Floor Protection</h4>

            <ul>
              <li>How many Antinox HD floor protection boards are needed? (each board is 2.4m x 1.2m)</li>
            </ul>

            <h4>Plastering Extras</h4>

            <ul>
              <li>Stop beads, corner beads, and difficulty hours for plastering work</li>
            </ul>

            <h4>Airbricks</h4>

            <ul>
              <li>How many to clean, upgrade, or install new</li>
            </ul>

            <h4>Spray Treatment</h4>

            <ul>
              <li>Total spray treatment area and difficulty hours</li>
            </ul>

            <h4>Optional Items</h4>

            <ul>
              <li>ACO drains, French drains, Aquaban, asbestos tests — these are items the customer can choose whether to include</li>
            </ul>

            <h4>Waste &amp; Logistics (required)</h4>

            <ul>
              <li><strong>Skip Count</strong> — How many skips are needed</li>
              <li><strong>Distance from Office</strong> — How far is this property from the office (in miles)</li>
              <li><strong>Men Travelling</strong> — How many people are travelling to the site</li>
            </ul>

            <p>Tap <strong>Next</strong> to move to Step 5.</p>

            <hr />

            {/* Step 5: Review */}
            <h3>Step 5: Review</h3>

            <TrainingImage
              src="/images/training/10-wizard-step1.png"
              alt="Review Step"
              caption="Review Step"
            />

            <p>
              The Review step shows you everything you've recorded across all the previous steps. This is your chance to check the data before submitting.
            </p>

            <p>The review shows:</p>

            <ul>
              <li><strong>Summary cards</strong> — Rooms inspected, total issues, affected walls, total wall area</li>
              <li><strong>Issues by Type</strong> — How many rooms had each issue (Damp, Condensation, Timber, Woodworm)</li>
              <li><strong>Site Details</strong> — Inspection date, weather, temperature, property type, construction, build year</li>
              <li><strong>External Inspection</strong> — Defects found, concerns noted</li>
              <li><strong>Room List</strong> — Each room with its issues and completion status</li>
              <li><strong>Logistics</strong> — Distance, men travelling, skips required</li>
              <li><strong>Surveyor's Additional Comments</strong> — A text box where you can add any extra notes or observations that don't fit elsewhere. These will appear in the generated report</li>
            </ul>

            <p>If anything looks wrong, tap <strong>&ldquo;Back&rdquo;</strong> to go back to the relevant step and fix it.</p>

            <p>When everything looks right, tap the <strong>&ldquo;Complete Survey&rdquo;</strong> button.</p>
          </section>

          <hr />

          {/* ------------------------------------------------------------ */}
          {/* 6. Taking Photos                                             */}
          {/* ------------------------------------------------------------ */}
          <section id="taking-photos">
            <h2>6. Taking Photos</h2>

            <p>Photos are a crucial part of the survey. The system makes it easy to take and organise them.</p>

            <h3>How to Take a Photo</h3>

            <p>Whenever you see a camera button or a &ldquo;Take Photo&rdquo; option:</p>

            <ol>
              <li>Tap the camera button</li>
              <li>Your phone's camera will open — take the photo</li>
              <li>Add a short <strong>description</strong> of what the photo shows (e.g. &ldquo;Damp staining on north wall, below window&rdquo;)</li>
              <li>The photo is uploaded and attached to the right part of the survey</li>
            </ol>

            <h3>Tips for Good Photos</h3>

            <ul>
              <li><strong>Get close enough</strong> to show the problem clearly</li>
              <li><strong>Include context</strong> — show enough of the wall/floor/ceiling so someone can identify the location</li>
              <li><strong>Take photos in good light</strong> — use your phone's flash if needed</li>
              <li><strong>Describe each photo</strong> — the description helps the report writer understand what they're looking at</li>
            </ul>

            <h3>Photo Limits</h3>

            <ul>
              <li>Street view photo: 1 per survey (Step 1)</li>
              <li>Defect photos on external inspection: 2 per defect (Step 2)</li>
              <li>Room ID photo: 1 per room (Step 3)</li>
              <li>Defect evidence photos: up to 15 per room (Step 3)</li>
            </ul>

            <h3>Upload Issues</h3>

            <p>If a photo fails to upload (poor signal, for example):</p>

            <ul>
              <li>The system will automatically retry up to 2 times</li>
              <li>You'll see a progress indicator while it's uploading</li>
              <li>If it still fails, try again when you have a better connection — the rest of your survey data is saved separately</li>
            </ul>

            <Tip variant="tip">
              <strong>Supported formats:</strong> JPG, PNG, or WebP. Maximum file size: 15MB per photo.
            </Tip>
          </section>

          <hr />

          {/* ------------------------------------------------------------ */}
          {/* 7. Using Voice Recording                                     */}
          {/* ------------------------------------------------------------ */}
          <section id="using-voice-recording">
            <h2>7. Using Voice Recording</h2>

            <p>
              Instead of typing observations, you can speak them. This is especially useful on-site when your hands are busy or when you want to record detailed observations quickly.
            </p>

            <h3>How to Record</h3>

            <ol>
              <li>Find the <strong>&ldquo;Record Voice Note&rdquo;</strong> button (it appears in the observations text box areas on Steps 2 and 3)</li>
              <li>Tap the button — recording starts immediately</li>
              <li><strong>Speak clearly</strong> and describe what you see</li>
              <li>You can record for up to <strong>2 minutes</strong> per clip</li>
              <li>Tap <strong>&ldquo;Stop&rdquo;</strong> when finished</li>
              <li>The system transcribes your speech into text and adds it to the observations box</li>
            </ol>

            <h3>After Recording</h3>

            <ul>
              <li><strong>Read the transcription</strong> — check it makes sense. Voice-to-text isn't perfect, especially with technical terms</li>
              <li><strong>Tap &ldquo;Polish&rdquo;</strong> — the AI will clean up the text, fixing grammar and making it sound more professional while keeping the meaning the same</li>
              <li><strong>Tap &ldquo;Undo&rdquo;</strong> — if the polished version changed something you didn't want changed, tap Undo to get the original transcription back</li>
              <li>You can always edit the text manually as well</li>
            </ul>

            <h3>Tips for Voice Recording</h3>

            <ul>
              <li>Speak at a normal pace — rushing makes transcription less accurate</li>
              <li>Say full sentences — &ldquo;There is rising damp on the north wall to a height of approximately one metre&rdquo; works better than &ldquo;north wall, damp, one metre&rdquo;</li>
              <li>Avoid background noise if possible — the system has noise suppression, but a quiet environment helps</li>
              <li>Your phone screen will stay on during recording (the system prevents it from sleeping)</li>
            </ul>
          </section>

          <hr />

          {/* ------------------------------------------------------------ */}
          {/* 8. Saving Your Work                                          */}
          {/* ------------------------------------------------------------ */}
          <section id="saving-your-work">
            <h2>8. Saving Your Work</h2>

            <p>The survey wizard <strong>auto-saves</strong> your work as you go. You do not need to manually save.</p>

            <h3>How Auto-Save Works</h3>

            <ul>
              <li>Every time you move between steps (Next or Back), your data is saved</li>
              <li>Every time you add or complete a room, your data is saved</li>
              <li>Photos are uploaded individually as you take them</li>
              <li>If you lose your internet connection temporarily, the data will save when you reconnect</li>
            </ul>

            <h3>Leaving and Coming Back</h3>

            <p>You can close the browser or leave the wizard at any time. When you come back:</p>

            <ol>
              <li>Go to the survey (from your calendar, surveys list, or dashboard)</li>
              <li>Click <strong>&ldquo;Continue Survey&rdquo;</strong></li>
              <li>You'll be taken back to where you left off, with all your previous data intact</li>
            </ol>

            <h3>The Save Button</h3>

            <p>
              There's also a manual <strong>&ldquo;Save&rdquo;</strong> button in the top-right corner of the wizard. You can tap this at any time for peace of mind, but it's not strictly necessary — the auto-save handles it.
            </p>
          </section>

          <hr />

          {/* ------------------------------------------------------------ */}
          {/* 9. Completing the Survey                                     */}
          {/* ------------------------------------------------------------ */}
          <section id="completing-the-survey">
            <h2>9. Completing the Survey</h2>

            <p>When you've finished all 5 steps and reviewed your data:</p>

            <ol>
              <li>
                <p>On the Review step (Step 5), check that:</p>
                <ul>
                  <li>All rooms are marked as complete (green ticks)</li>
                  <li>The summary data looks correct</li>
                  <li>You've added any additional comments</li>
                </ul>
              </li>
              <li>Tap <strong>&ldquo;Complete Survey&rdquo;</strong></li>
              <li>
                <p>The system will:</p>
                <ul>
                  <li>Save all your data</li>
                  <li>Calculate the costing automatically (based on everything you recorded)</li>
                  <li>Mark the survey status as &ldquo;Completed&rdquo;</li>
                </ul>
              </li>
            </ol>

            <h3>What Happens Next</h3>

            <p>After you complete the survey:</p>

            <ul>
              <li>The office team will see the completed survey with its calculated costing</li>
              <li>They can generate a quotation and report from the costing data</li>
              <li>You can still view the survey and its costing, but you typically won't need to make changes</li>
            </ul>

            <h3>Marking the Booking</h3>

            <p>Don't forget to also mark the booking as complete in your calendar:</p>

            <ol>
              <li>Go to <strong>Calendar</strong></li>
              <li>Tap on today's booking</li>
              <li>Tap <strong>&ldquo;Mark as Completed&rdquo;</strong></li>
            </ol>
          </section>

          <hr />

          {/* ------------------------------------------------------------ */}
          {/* 10. After the Survey                                         */}
          {/* ------------------------------------------------------------ */}
          <section id="after-the-survey">
            <h2>10. After the Survey</h2>

            <h3>Viewing Your Completed Surveys</h3>

            <p>
              Click <strong>Surveys</strong> in the sidebar to see all your surveys. You can filter by status to see only completed ones.
            </p>

            <h3>Viewing the Costing</h3>

            <p>
              From any survey's detail page, click <strong>&ldquo;View Costing&rdquo;</strong> to see the cost breakdown that the system calculated from your data. This shows:
            </p>

            <ul>
              <li>Overhead costs (travel, vehicle mileage)</li>
              <li>Material costs for every item</li>
              <li>Labour costs</li>
              <li>Section subtotals</li>
              <li>Grand total with VAT</li>
            </ul>

            <Tip variant="note">
              You don't need to enter any costs — the system works them out automatically from the measurements and materials you recorded. If something looks wrong with the costing, speak to the office team.
            </Tip>

            <h3>Installer Information</h3>

            <p>
              Click <strong>&ldquo;Installer Info&rdquo;</strong> on the survey detail page to add site information that the installation team will need:
            </p>

            <ul>
              <li>Access notes</li>
              <li>Special requirements</li>
              <li>Site photos for the installation crew</li>
            </ul>
          </section>

          <hr />

          {/* ------------------------------------------------------------ */}
          {/* 11. Your Availability                                        */}
          {/* ------------------------------------------------------------ */}
          <section id="your-availability">
            <h2>11. Your Availability</h2>

            <p>
              Click <strong>Calendar</strong> in the sidebar, or navigate to your availability settings to manage when you're available for surveys.
            </p>

            <TrainingImage
              src="/images/training/33-availability-surveyor.png"
              alt="Surveyor Availability"
              caption="Surveyor Availability"
            />

            <h3>What You Can Do</h3>

            <ul>
              <li><strong>View your weekly hours</strong> — See what hours are set for each day of the week (these are set by the admin)</li>
              <li>
                <strong>Add absence blocks</strong> — Book time off:
                <ul>
                  <li><strong>Annual Leave</strong> — Holiday</li>
                  <li><strong>Sickness</strong> — Sick days</li>
                  <li><strong>Training</strong> — Training courses</li>
                  <li><strong>Other</strong> — Any other reason</li>
                </ul>
              </li>
            </ul>

            <h3>Adding an Absence Block</h3>

            <ol>
              <li>Go to your availability page</li>
              <li>Click <strong>&ldquo;Add Absence&rdquo;</strong> or similar</li>
              <li>Select the type (Annual Leave, Sickness, Training, Other)</li>
              <li>Choose the start and end dates</li>
              <li>Add a note if needed</li>
              <li>Save</li>
            </ol>

            <p>The office team and admin can see your absence blocks and won't book surveys during those periods.</p>

            <Tip variant="note">
              You cannot change your own weekly working hours — this is managed by the administrator. If your regular hours need changing, speak to your admin.
            </Tip>
          </section>

          <hr />

          {/* ------------------------------------------------------------ */}
          {/* 12. Quick Reference                                          */}
          {/* ------------------------------------------------------------ */}
          <section id="quick-reference">
            <h2>12. Quick Reference</h2>

            <h3>Your Daily Routine</h3>

            <ol>
              <li><strong>Log in</strong> and check your <strong>Dashboard</strong> for any updates</li>
              <li>Open the <strong>Calendar</strong> to see today's appointments</li>
              <li>
                <p>For each survey:</p>
                <ul>
                  <li>Check the customer and site details before leaving</li>
                  <li>On-site: open the survey wizard and work through all 5 steps</li>
                  <li>Take photos at every opportunity</li>
                  <li>Use voice recording for detailed observations</li>
                  <li>Complete the survey wizard</li>
                  <li>Mark the booking as completed in your calendar</li>
                </ul>
              </li>
              <li><strong>Log out</strong> when you're done for the day</li>
            </ol>

            <h3>The 5 Wizard Steps at a Glance</h3>

            <div className="overflow-x-auto my-4">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left p-2 text-white/60 border-b border-white/10">Step</th>
                    <th className="text-left p-2 text-white/60 border-b border-white/10">Name</th>
                    <th className="text-left p-2 text-white/60 border-b border-white/10">What You Do</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">1</td>
                    <td className="p-2 text-white/70">Site Details</td>
                    <td className="p-2 text-white/70">Property photo, date, weather, property type, construction</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">2</td>
                    <td className="p-2 text-white/70">External Inspection</td>
                    <td className="p-2 text-white/70">Walk around outside, note defects, take photos, record observations</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">3</td>
                    <td className="p-2 text-white/70">Room Inspection</td>
                    <td className="p-2 text-white/70">Room by room — issues, measurements, photos, observations</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">4</td>
                    <td className="p-2 text-white/70">Additional Works</td>
                    <td className="p-2 text-white/70">Ventilation, skips, travel distance, extras</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">5</td>
                    <td className="p-2 text-white/70">Review</td>
                    <td className="p-2 text-white/70">Check everything, add final comments, complete survey</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Issue Types Explained</h3>

            <div className="overflow-x-auto my-4">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left p-2 text-white/60 border-b border-white/10">Issue</th>
                    <th className="text-left p-2 text-white/60 border-b border-white/10">Icon</th>
                    <th className="text-left p-2 text-white/60 border-b border-white/10">What It Covers</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70"><strong>Damp</strong></td>
                    <td className="p-2 text-white/70">Water droplet (blue)</td>
                    <td className="p-2 text-white/70">Rising damp, penetrating damp — DPC, membranes, tanking, strip-out, plastering</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70"><strong>Condensation</strong></td>
                    <td className="p-2 text-white/70">Wind (grey)</td>
                    <td className="p-2 text-white/70">Mould, humidity, ventilation — PIV units, fans, passive vents</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70"><strong>Timber Decay</strong></td>
                    <td className="p-2 text-white/70">Tree (brown)</td>
                    <td className="p-2 text-white/70">Wet rot, dry rot — floor condition, joists, treatment, replacement</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70"><strong>Woodworm</strong></td>
                    <td className="p-2 text-white/70">Bug (red)</td>
                    <td className="p-2 text-white/70">Beetle infestation — species, severity, spray/paste treatment, fogging</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Troubleshooting</h3>

            <div className="overflow-x-auto my-4">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left p-2 text-white/60 border-b border-white/10">Problem</th>
                    <th className="text-left p-2 text-white/60 border-b border-white/10">What to Do</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">Can't log in</td>
                    <td className="p-2 text-white/70">Check your email and password. Try &ldquo;Forgot password?&rdquo; if stuck</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">Photo won't upload</td>
                    <td className="p-2 text-white/70">Check your internet connection. The system retries automatically. Try again later</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">Voice recording not working</td>
                    <td className="p-2 text-white/70">Make sure you've allowed microphone access in your browser. Check your phone isn't on silent</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">Data seems to have disappeared</td>
                    <td className="p-2 text-white/70">Don't panic — it auto-saves. Try refreshing the page (pull down on mobile). Check you're looking at the right survey</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">Can't move to the next step</td>
                    <td className="p-2 text-white/70">Check that all required fields are filled in. For Step 3, you need at least 1 room</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">Booking doesn't show in calendar</td>
                    <td className="p-2 text-white/70">Check the date — use the navigation arrows. If it's still missing, contact the office</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">Can't see Leads in the menu</td>
                    <td className="p-2 text-white/70">This is normal — the Leads section is only for office staff</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </TrainingArticle>
      </Layout>
    </ProtectedRoute>
  )
}
