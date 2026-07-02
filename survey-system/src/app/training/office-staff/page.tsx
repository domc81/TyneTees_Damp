'use client'

import { ProtectedRoute } from '@/components/ProtectedRoute'
import Layout from '@/components/layout'
import { TrainingArticle } from '@/components/training/TrainingArticle'
import { TrainingImage } from '@/components/training/TrainingImage'
import { Tip } from '@/components/training/Tip'
import Link from 'next/link'
import { Inbox } from 'lucide-react'

const sections = [
  { id: 'your-dashboard', label: '1. Your Dashboard' },
  { id: 'the-enquiry-pipeline', label: '2. The Enquiry Pipeline' },
  { id: 'managing-customers', label: '3. Managing Customers' },
  { id: 'the-survey-list', label: '4. The Survey List' },
  { id: 'the-survey-detail-page', label: '5. The Survey Detail Page' },
  { id: 'the-calendar', label: '6. The Calendar' },
  { id: 'quotations', label: '7. Quotations' },
  { id: 'reports', label: '8. Reports' },
  { id: 'payments', label: '9. Payments' },
  { id: 'quick-reference', label: '10. Quick Reference' },
]

export default function OfficeStaffGuidePage() {
  return (
    <ProtectedRoute>
      <Layout>
        <TrainingArticle
          title="Office Staff Guide"
          subtitle="For users with the Office or Admin role"
          icon={Inbox}
          iconColor="text-purple-400"
          iconBg="bg-purple-500/10"
          roles={['admin', 'office']}
          sections={sections}
        >
          <p>
            This guide covers everything you need to know to manage the day-to-day running of the business through the survey system. You will learn how to handle enquiries from first contact through to a completed job, manage customers, book surveys, and send quotations and reports.
          </p>

          <Tip variant="note">
            <strong>Before reading this guide</strong>, make sure you have completed the <Link href="/training/getting-started">Getting Started</Link> guide and can log in comfortably.
          </Tip>

          <hr />

          {/* ── Section 1: Your Dashboard ── */}
          <section id="your-dashboard">
            <h2>1. Your Dashboard</h2>

            <TrainingImage src="/images/training/01-dashboard-admin.png" alt="Office Dashboard" caption="Office Dashboard" />

            <p>When you log in, your dashboard shows you a snapshot of everything at a glance:</p>

            <h3>Enquiry Pipeline Summary</h3>

            <p>At the top of the dashboard is the <strong>Enquiry Pipeline</strong> bar. This is a coloured strip that shows how many enquiries are at each stage:</p>

            <ul>
              <li><strong>New</strong> (blue) — Enquiries that have just come in and haven&apos;t been assigned yet</li>
              <li><strong>Assigned</strong> (purple) — Assigned to a surveyor but not yet surveyed</li>
              <li><strong>Surveyed</strong> (green) — Survey completed, waiting for a quotation</li>
              <li><strong>Quoted</strong> (orange) — Quotation sent to the customer</li>
              <li><strong>Accepted</strong> (teal) — Customer has accepted the quotation</li>
            </ul>

            <p>Below the bar, you&apos;ll see four summary cards:</p>

            <ul>
              <li><strong>Active</strong> — Total active enquiries across all stages</li>
              <li><strong>Pipeline Value</strong> — Estimated total value of all active enquiries</li>
              <li><strong>Attention Needed</strong> — Enquiries that are overdue on their SLA (service level agreement)</li>
              <li><strong>Conversion</strong> — The percentage of enquiries that have converted to accepted jobs</li>
            </ul>

            <p>Click <strong>&quot;View Pipeline&quot;</strong> to go to the full Enquiry Pipeline board.</p>

            <h3>Key Statistics</h3>

            <p>Four stat cards below the pipeline:</p>

            <ul>
              <li><strong>Active Surveys</strong> — Surveys currently in progress</li>
              <li><strong>Completed</strong> — Total completed surveys</li>
              <li><strong>Won This Month</strong> — Jobs won this month and their total value</li>
              <li><strong>Total Projects</strong> — All-time total</li>
            </ul>

            <h3>Recent Activity</h3>

            <p>Shows the latest actions across all enquiries — new enquiries created, status changes, notes added, and so on. This helps you keep track of what&apos;s been happening, especially if you&apos;ve been away.</p>

            <h3>Recent Projects</h3>

            <p>A list of the most recent surveys showing the customer name, address, status, quotation status, date, and survey type. Click any row to open that survey&apos;s detail page.</p>
          </section>

          <hr />

          {/* ── Section 2: The Enquiry Pipeline ── */}
          <section id="the-enquiry-pipeline">
            <h2>2. The Enquiry Pipeline</h2>

            <p>The Enquiry Pipeline is the heart of the office workflow. It&apos;s where you track every potential job from the moment a customer calls through to completion.</p>

            <h3>Opening the Pipeline</h3>

            <p>Click <strong>Enquiries</strong> in the sidebar to open the pipeline.</p>

            <TrainingImage src="/images/training/03-enquiry-pipeline.png" alt="Enquiry Pipeline" caption="Enquiry Pipeline" />

            <h3>Understanding the Board</h3>

            <p>The pipeline is a <strong>Kanban board</strong> — a board with columns, where each column represents a stage in the process. Enquiry cards sit in the column that matches their current stage.</p>

            <p>The columns are:</p>

            <div className="overflow-x-auto my-4">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left p-2 text-white/60 border-b border-white/10">Column</th>
                    <th className="text-left p-2 text-white/60 border-b border-white/10">What it means</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70"><strong>New</strong></td>
                    <td className="p-2 text-white/70">A new enquiry has come in — needs to be reviewed and assigned</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70"><strong>Assigned</strong></td>
                    <td className="p-2 text-white/70">Assigned to a surveyor — waiting for the survey to happen</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70"><strong>Surveyed</strong></td>
                    <td className="p-2 text-white/70">The survey is complete — a quotation needs to be generated and sent</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70"><strong>Quoted</strong></td>
                    <td className="p-2 text-white/70">A quotation has been sent to the customer — waiting for their response</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70"><strong>Accepted</strong></td>
                    <td className="p-2 text-white/70">The customer has accepted — the job is confirmed</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70"><strong>Completed</strong></td>
                    <td className="p-2 text-white/70">The job is fully done (deposit paid)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>There are also <strong>Declined</strong> and <strong>On Hold</strong> statuses, but these are hidden by default. Use the <strong>&quot;Show declined &amp; on hold&quot;</strong> toggle at the top to reveal them.</p>

            <p>Each column shows a count badge (e.g. &quot;2&quot;) telling you how many enquiries are in that stage.</p>

            <h3>Reading an Enquiry Card</h3>

            <p>Each card on the board shows:</p>

            <ul>
              <li><strong>Customer name</strong> — In bold at the top</li>
              <li><strong>Reference number</strong> — e.g. CF-DAMP-2026-0001</li>
              <li><strong>Address</strong> — The property address</li>
              <li><strong>Survey type badge</strong> — Colour-coded: Damp, Condensation, Timber, or Woodworm</li>
              <li><strong>Priority indicator</strong> — A coloured dot (red = urgent, amber = medium, green = low)</li>
              <li><strong>SLA indicator</strong> — Shows if the enquiry is within or overdue on its target response time</li>
              <li><strong>Quick action icons</strong> — Small icons at the bottom for phone, email, and other quick actions</li>
            </ul>

            <h3>Creating a New Enquiry</h3>

            <p>When a customer calls or emails to enquire about a survey:</p>

            <ol>
              <li>Click the <strong>&quot;+ New Enquiry&quot;</strong> button in the top-right corner</li>
              <li>The New Enquiry form opens with three steps:</li>
            </ol>

            <TrainingImage src="/images/training/05-new-enquiry-form.png" alt="New Enquiry Form" caption="New Enquiry Form" />

            <p><strong>Step 1 — Client:</strong></p>

            <ul>
              <li><strong>Client Name</strong> (required) — The customer&apos;s name</li>
              <li><strong>Email</strong> — Their email address</li>
              <li><strong>Phone Number</strong> — Their phone number</li>
              <li>Click <strong>Continue</strong> to move to the next step</li>
            </ul>

            <p><strong>Step 2 — Site:</strong></p>

            <ul>
              <li>Enter the <strong>property address</strong> where the survey will take place</li>
              <li>Select the <strong>survey type</strong> (Damp, Condensation, Timber, or Woodworm)</li>
              <li>Add any <strong>notes</strong> about the enquiry</li>
              <li>Click <strong>Continue</strong></li>
            </ul>

            <p><strong>Step 3 — Booking:</strong></p>

            <ul>
              <li>Optionally assign a <strong>surveyor</strong> and pick a <strong>date/time</strong></li>
              <li>Or leave this blank and assign later</li>
              <li>Click <strong>Create Enquiry</strong> to save</li>
            </ul>

            <p>The new enquiry will appear in the <strong>New</strong> column on the pipeline board.</p>

            <h3>Moving Enquiries Between Columns</h3>

            <p>You can drag and drop enquiry cards between columns:</p>

            <ol>
              <li>Click and hold on an enquiry card</li>
              <li>Drag it to the appropriate column</li>
              <li>Release to drop it</li>
            </ol>

            <p>The system will update the enquiry&apos;s status automatically. Some moves will trigger additional actions — for example, moving an enquiry to &quot;Assigned&quot; will ask you to select a surveyor.</p>

            <Tip variant="tip">
              The system also moves cards automatically when certain things happen. For example, when a survey is completed, the enquiry will move to &quot;Surveyed&quot; on its own.
            </Tip>

            <h3>Opening an Enquiry Detail</h3>

            <p>Click on any enquiry card to open the <strong>detail drawer</strong> — a panel that slides in from the right side of the screen. The drawer has tabs:</p>

            <ul>
              <li><strong>Details</strong> — All the enquiry information (customer, address, type, priority, assigned surveyor, dates)</li>
              <li><strong>Activity</strong> — A timeline of everything that&apos;s happened with this enquiry</li>
              <li><strong>Notes</strong> — Internal notes (only visible to staff, not the customer)</li>
            </ul>

            <p>You can edit most fields directly from the drawer — click on a field value to change it.</p>

            <h3>Putting an Enquiry On Hold</h3>

            <p>If a customer asks to delay or you&apos;re waiting for information:</p>

            <ol>
              <li>Open the enquiry</li>
              <li>Change the status to <strong>On Hold</strong></li>
              <li>Select a reason from the template list (or write a custom reason)</li>
              <li>Optionally send the customer an email explaining the hold</li>
            </ol>

            <p>On-hold enquiries are hidden from the main board by default. Toggle &quot;Show declined &amp; on hold&quot; to see them.</p>

            <h3>Convert and Book</h3>

            <p>When you&apos;re ready to convert an enquiry into a proper survey booking:</p>

            <ol>
              <li>Open the enquiry</li>
              <li>Click <strong>Convert &amp; Book</strong></li>
              <li>
                The system will:
                <ul>
                  <li>Create a <strong>customer record</strong> (if one doesn&apos;t exist)</li>
                  <li>Create a <strong>survey</strong> linked to that customer</li>
                  <li>Create a <strong>provisional booking</strong> on the calendar</li>
                  <li>Create a <strong>survey fee payment</strong> record</li>
                </ul>
              </li>
              <li>You can then send the customer a payment link for the survey fee</li>
            </ol>

            <p>The booking stays <strong>provisional</strong> until the customer pays the survey fee. Once paid, it automatically confirms to <strong>scheduled</strong>.</p>

            <h3>Filters and Search</h3>

            <p>At the top of the pipeline board:</p>

            <ul>
              <li><strong>Search box</strong> — Search by name, address, or reference number</li>
              <li><strong>Assignee filter</strong> — Show only enquiries assigned to a specific surveyor</li>
              <li><strong>Type filter</strong> — Show only a specific survey type (Damp, Condensation, etc.)</li>
            </ul>
          </section>

          <hr />

          {/* ── Section 3: Managing Customers ── */}
          <section id="managing-customers">
            <h2>3. Managing Customers</h2>

            <h3>Viewing the Customer List</h3>

            <p>Click <strong>Customers</strong> in the sidebar.</p>

            <TrainingImage src="/images/training/06-customers-list.png" alt="Customer List" caption="Customer List" />

            <p>The customer list shows all customers in the system, sorted by most recently created. Each row shows:</p>

            <ul>
              <li><strong>Name</strong> — With coloured initials badge</li>
              <li><strong>Email</strong></li>
              <li><strong>Phone</strong></li>
              <li><strong>Postcode</strong></li>
              <li><strong>Surveys</strong> — How many surveys this customer has</li>
              <li><strong>Created</strong> — When the customer was added</li>
            </ul>

            <p>Use the <strong>search box</strong> at the top to find a customer by name, email, phone, or postcode.</p>

            <p>Click any row to open the <strong>customer detail page</strong>.</p>

            <h3>Creating a New Customer</h3>

            <ol>
              <li>Click the <strong>&quot;+ Add Customer&quot;</strong> button in the top-right corner</li>
              <li>Fill in the form:</li>
            </ol>

            <TrainingImage src="/images/training/07-new-customer-form.png" alt="New Customer Form" caption="New Customer Form" />

            <p><strong>Personal Information:</strong></p>

            <ul>
              <li><strong>Title</strong> — Mr, Mrs, Ms, etc. (dropdown)</li>
              <li><strong>First Name</strong> (required)</li>
              <li><strong>Last Name</strong> (required)</li>
            </ul>

            <p><strong>Contact Information:</strong></p>

            <ul>
              <li><strong>Email Address</strong> (required)</li>
              <li><strong>Phone Number</strong> (required)</li>
              <li><strong>Mobile</strong> (optional)</li>
            </ul>

            <p><strong>Address:</strong></p>

            <ul>
              <li><strong>Address Line 1</strong> (required)</li>
              <li><strong>Address Line 2</strong> (optional)</li>
              <li><strong>City</strong> (required)</li>
              <li><strong>County</strong></li>
              <li><strong>Postcode</strong> (required)</li>
            </ul>

            <p><strong>Notes:</strong></p>

            <ul>
              <li>Any additional notes about this customer</li>
            </ul>

            <ol start={3}>
              <li>Click <strong>&quot;Create Customer&quot;</strong> to save</li>
            </ol>

            <Tip variant="tip">
              You don&apos;t always need to create customers manually. When you use Convert &amp; Book on an enquiry, a customer record is created automatically from the enquiry details.
            </Tip>

            <h3>Customer Detail Page</h3>

            <p>Click on any customer in the list to see their full details:</p>

            <ul>
              <li><strong>Contact information</strong> — Name, email, phone, address</li>
              <li><strong>Survey history</strong> — All surveys linked to this customer</li>
              <li><strong>Communication log</strong> — A record of all emails, calls, and messages related to this customer</li>
            </ul>

            <h3>Logging a Communication</h3>

            <p>On the customer detail page, you can log communications manually:</p>

            <ol>
              <li>Click <strong>&quot;Log Communication&quot;</strong></li>
              <li>Select the <strong>channel</strong> — Phone, WhatsApp, In Person, Email, or SMS</li>
              <li>Add your <strong>notes</strong> about what was discussed</li>
              <li>Click <strong>Save</strong></li>
            </ol>

            <p>This creates a permanent record that the whole team can see. System-generated communications (like emails sent through the platform) are logged automatically.</p>
          </section>

          <hr />

          {/* ── Section 4: The Survey List ── */}
          <section id="the-survey-list">
            <h2>4. The Survey List</h2>

            <p>Click <strong>Surveys</strong> in the sidebar to see all surveys.</p>

            <TrainingImage src="/images/training/08-surveys-list.png" alt="Survey List" caption="Survey List" />

            <p>Surveys are shown as <strong>cards</strong> in a grid layout. Each card shows:</p>

            <ul>
              <li><strong>Customer name</strong></li>
              <li><strong>Reference number</strong> (e.g. TT-2026-0025)</li>
              <li><strong>Address</strong></li>
              <li><strong>Status badge</strong> — Completed, In Progress, etc.</li>
              <li><strong>Survey type</strong> — Damp, Condensation, Timber, or Woodworm</li>
              <li><strong>Date</strong></li>
            </ul>

            <p>Use the filters at the top to narrow the view:</p>

            <ul>
              <li><strong>Search</strong> — By customer name or reference</li>
              <li><strong>Status filter</strong> — All Status, In Progress, Completed, etc.</li>
              <li><strong>Type filter</strong> — All Types, Damp, Condensation, etc.</li>
            </ul>

            <p>Click any survey card to open the <strong>survey detail page</strong>.</p>
          </section>

          <hr />

          {/* ── Section 5: The Survey Detail Page ── */}
          <section id="the-survey-detail-page">
            <h2>5. The Survey Detail Page</h2>

            <TrainingImage src="/images/training/09-survey-detail.png" alt="Survey Detail" caption="Survey Detail" />

            <p>The survey detail page is the central hub for a single survey. Everything related to that survey is accessible from here.</p>

            <h3>What You See</h3>

            <ul>
              <li><strong>Header</strong> — Reference number, survey type badge, completion status, and customer name</li>
              <li><strong>Survey Appointment</strong> — The surveyor assigned, date, time, and booking status</li>
              <li><strong>Client Details</strong> — Customer name, email, and phone</li>
              <li><strong>Site Address</strong> — The property address</li>
              <li><strong>Survey Details</strong> — Inspection date, weather, reference, and report status</li>
              <li><strong>Notes</strong> — Any internal notes about the survey</li>
              <li><strong>Quotation</strong> — If a quotation has been generated, it shows the reference, total value, date, and how many times the customer has viewed it</li>
            </ul>

            <h3>Action Buttons</h3>

            <p>At the bottom of the page, you&apos;ll see action buttons:</p>

            <ul>
              <li><strong>Continue Survey</strong> — Opens the survey wizard (the surveyor uses this on-site)</li>
              <li><strong>View Costing</strong> — See the detailed cost breakdown</li>
              <li><strong>View Report</strong> — See the generated report</li>
              <li><strong>Installer Info</strong> — Site information for the installation team</li>
            </ul>

            <h3>The Costing Page</h3>

            <p>Click <strong>View Costing</strong> to see the full cost breakdown for a survey:</p>

            <TrainingImage src="/images/training/11-survey-costing.png" alt="Survey Costing" caption="Survey Costing" />

            <p>The costing page shows:</p>

            <ol>
              <li><strong>Project Specific Overheads</strong> — Travel costs, working days, vehicle mileage</li>
              <li>
                <strong>Job Cost Summary</strong> — A breakdown of:
                <ul>
                  <li>Mandatory Works total</li>
                  <li>Optional Works total</li>
                  <li>Combined Works total</li>
                  <li>Project Specific Overheads</li>
                  <li>Subtotal (excluding VAT)</li>
                  <li>VAT (20%)</li>
                  <li><strong>Grand Total (including VAT)</strong></li>
                  <li>Deposit required (as a percentage)</li>
                </ul>
              </li>
              <li>
                <strong>Section-by-Section Breakdown</strong> — Each section (e.g. Wall Membrane, Replastering) shows:
                <ul>
                  <li>Individual line items with quantities</li>
                  <li>Material costs</li>
                  <li>Labour costs (with hours)</li>
                  <li>Line totals</li>
                  <li>Section subtotal</li>
                  <li>Section Adjustment % (for manual price adjustments)</li>
                </ul>
              </li>
              <li>
                <strong>Action Buttons</strong> at the bottom:
                <ul>
                  <li><strong>Generate Report</strong> — Creates the AI-generated survey report</li>
                  <li><strong>Download CF CSV</strong> — Exports the costing data</li>
                  <li><strong>Regenerate Quotation</strong> — Creates or updates the quotation from the costing</li>
                </ul>
              </li>
            </ol>

            <Tip variant="important">
              The costing is calculated automatically from the survey data. You don&apos;t need to enter costs manually — the system works them out based on the measurements and materials recorded during the survey.
            </Tip>
          </section>

          <hr />

          {/* ── Section 6: The Calendar ── */}
          <section id="the-calendar">
            <h2>6. The Calendar</h2>

            <p>Click <strong>Calendar</strong> in the sidebar to see the booking calendar.</p>

            <TrainingImage src="/images/training/12-calendar-admin.png" alt="Calendar" caption="Calendar" />

            <h3>What You See</h3>

            <p>The calendar shows all survey bookings across all surveyors:</p>

            <ul>
              <li><strong>Surveyor filter buttons</strong> — At the top, click to show/hide individual surveyors or click &quot;All&quot; to see everyone</li>
              <li><strong>Legend</strong> — Colour-coded by surveyor, with grey for cancelled and green for completed</li>
              <li><strong>View buttons</strong> — Switch between Week, Day, or Month views</li>
              <li><strong>Navigation arrows</strong> — Move forward or back through dates</li>
              <li><strong>Today button</strong> — Jump back to the current date/week</li>
            </ul>

            <h3>Booking Status Colours</h3>

            <p>Bookings appear as coloured blocks on the calendar:</p>

            <ul>
              <li><strong>Coloured by surveyor</strong> — Each surveyor has their own colour</li>
              <li><strong>Grey</strong> — Cancelled bookings</li>
              <li><strong>Green</strong> — Completed bookings</li>
            </ul>

            <h3>Viewing a Booking</h3>

            <p>Click on any booking to open the <strong>booking detail modal</strong>:</p>

            <ul>
              <li>Customer name and contact details</li>
              <li>Property address</li>
              <li>Survey type</li>
              <li>Booking status (Provisional, Scheduled, Completed, etc.)</li>
              <li>Quick action buttons (call, email, get directions)</li>
            </ul>

            <h3>Managing Booking Status</h3>

            <p>From the booking modal, you can:</p>

            <ul>
              <li><strong>Confirm</strong> a provisional booking — changes status to Scheduled</li>
              <li><strong>Mark as Paid</strong> — confirms the survey fee payment and moves to Scheduled</li>
              <li><strong>Reschedule</strong> — Opens the slot picker to choose a new date/time</li>
              <li><strong>Cancel</strong> — Cancels the booking (with confirmation dialog)</li>
              <li><strong>Mark as Completed</strong> — Records the survey as done</li>
              <li><strong>Mark as No Show</strong> — Records that the customer didn&apos;t attend</li>
            </ul>

            <Tip variant="important">
              Bookings follow a set path. A provisional booking can become scheduled or cancelled. A scheduled booking can become completed, no show, or cancelled. Completed, cancelled, and no show are final — they can&apos;t be changed.
            </Tip>

            <h3>Managing Availability</h3>

            <p>Click <strong>&quot;Manage Availability&quot;</strong> (top-right of the calendar) to set surveyor availability:</p>

            <ul>
              <li>Set weekly working hours for each surveyor</li>
              <li>Add absence blocks (annual leave, sickness, training)</li>
            </ul>
          </section>

          <hr />

          {/* ── Section 7: Quotations ── */}
          <section id="quotations">
            <h2>7. Quotations</h2>

            <p>Quotations are generated from survey costings and sent to customers.</p>

            <h3>How Quotations Are Created</h3>

            <ol>
              <li>A surveyor completes a survey using the wizard</li>
              <li>The system calculates the costing automatically</li>
              <li>From the costing page, click <strong>&quot;Regenerate Quotation&quot;</strong></li>
              <li>The system creates a quotation with all the line items, grouped by section</li>
            </ol>

            <h3>Viewing a Quotation</h3>

            <p>From the survey detail page, you&apos;ll see the Quotation section showing:</p>

            <ul>
              <li>Reference number (e.g. QT-2026-0032)</li>
              <li>Total value including VAT</li>
              <li>Date generated</li>
              <li>Validity period</li>
              <li>How many times the customer has viewed it</li>
            </ul>

            <p>Click <strong>&quot;View Quotation&quot;</strong> to see the full quotation.</p>

            <h3>Sending a Quotation to the Customer</h3>

            <ol>
              <li>Open the quotation</li>
              <li>Click <strong>&quot;Send Quotation&quot;</strong></li>
              <li>The system sends an email to the customer with a link to view the quotation online</li>
              <li>The customer can view the quotation, then <strong>Accept</strong> or <strong>Decline</strong> it directly</li>
            </ol>

            <p>When the customer accepts:</p>

            <ul>
              <li>They provide an electronic signature</li>
              <li>A <strong>deposit payment</strong> record is automatically created</li>
              <li>The enquiry moves towards the &quot;Accepted&quot; stage</li>
            </ul>

            <h3>Copying the Customer Link</h3>

            <p>Click <strong>&quot;Copy Customer Link&quot;</strong> on the survey detail page to copy the public quotation URL. You can paste this into a message or email to send to the customer manually.</p>

            <h3>Downloading as PDF</h3>

            <p>Quotations can also be downloaded as PDF documents for printing or email attachment.</p>
          </section>

          <hr />

          {/* ── Section 8: Reports ── */}
          <section id="reports">
            <h2>8. Reports</h2>

            <p>Survey reports are AI-generated documents that summarise the survey findings.</p>

            <h3>How Reports Are Created</h3>

            <ol>
              <li>After a survey is completed and the costing is reviewed</li>
              <li>From the costing page, click <strong>&quot;Generate Report&quot;</strong></li>
              <li>The system uses AI to write a professional narrative report based on the survey data</li>
              <li>The report goes through a status workflow: <strong>Draft &rarr; Generated &rarr; Reviewed &rarr; Finalised &rarr; Published</strong></li>
            </ol>

            <h3>Reviewing and Editing a Report</h3>

            <ol>
              <li>From the survey detail page, click <strong>&quot;View Report&quot;</strong></li>
              <li>
                The report editor shows each section:
                <ul>
                  <li>Cover page</li>
                  <li>Executive summary</li>
                  <li>Property details</li>
                  <li>External inspection findings</li>
                  <li>Room-by-room findings</li>
                  <li>Scope of works</li>
                  <li>Treatment methodology</li>
                  <li>About the company</li>
                </ul>
              </li>
              <li>Click on any section to edit the text</li>
              <li>Once you&apos;re happy, progress the report through each status stage</li>
            </ol>

            <h3>Sending a Report</h3>

            <ol>
              <li>When the report status is <strong>Published</strong></li>
              <li>Click <strong>&quot;Send Report&quot;</strong></li>
              <li>The customer receives an email with a link to view the report online</li>
              <li>You can track how many times the customer has viewed it</li>
            </ol>

            <Tip variant="note">
              Customer-facing reports deliberately hide technical measurements (square metres, volumes, etc.). The internal version retains all measurements, but the customer only sees the written descriptions and recommendations.
            </Tip>
          </section>

          <hr />

          {/* ── Section 9: Payments ── */}
          <section id="payments">
            <h2>9. Payments</h2>

            <p>The system tracks two types of payment:</p>

            <h3>Survey Fee</h3>

            <ul>
              <li>Created when you use <strong>Convert &amp; Book</strong> on an enquiry</li>
              <li>The customer receives a payment link by email</li>
              <li>They pay online via the <strong>Pay</strong> page</li>
              <li>Once paid, the provisional booking automatically confirms to &quot;Scheduled&quot;</li>
              <li>If the customer doesn&apos;t pay within the expiry period, the provisional booking is automatically cancelled</li>
            </ul>

            <h3>Deposit</h3>

            <ul>
              <li>Created automatically when a customer <strong>accepts a quotation</strong></li>
              <li>The deposit amount is calculated as a percentage of the job total (set in pricing configuration)</li>
              <li>Office staff <strong>mark the deposit as paid</strong> manually once received</li>
              <li>When the deposit is marked as paid, the enquiry status updates to &quot;Won&quot; and moves to the Completed column</li>
            </ul>

            <h3>Sending a Payment Link</h3>

            <p>From the survey detail page or the enquiry, click <strong>&quot;Send Payment Link&quot;</strong> to email the customer their survey fee payment link.</p>

            <h3>Marking a Payment as Paid</h3>

            <p>If a customer pays by another method (bank transfer, cash, etc.):</p>

            <ol>
              <li>Open the booking from the calendar, or find it in the survey detail</li>
              <li>Click <strong>&quot;Mark as Paid&quot;</strong></li>
              <li>The system records the payment and updates the booking status</li>
            </ol>
          </section>

          <hr />

          {/* ── Section 10: Quick Reference ── */}
          <section id="quick-reference">
            <h2>10. Quick Reference</h2>

            <h3>Daily Routine Checklist</h3>

            <ol>
              <li><strong>Check the Dashboard</strong> — Look at the pipeline summary and recent activity</li>
              <li><strong>Review the Pipeline</strong> — Check for new enquiries that need assigning</li>
              <li><strong>Check the Calendar</strong> — See today&apos;s and tomorrow&apos;s bookings</li>
              <li><strong>Follow up</strong> — Check for overdue SLAs (red indicators on the pipeline)</li>
              <li><strong>Process completed surveys</strong> — Generate quotations and send to customers</li>
            </ol>

            <h3>Common Tasks — Where to Find Them</h3>

            <div className="overflow-x-auto my-4">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left p-2 text-white/60 border-b border-white/10">Task</th>
                    <th className="text-left p-2 text-white/60 border-b border-white/10">Where to go</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">Log a new enquiry</td>
                    <td className="p-2 text-white/70">Enquiries &rarr; + New Enquiry</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">Add a new customer</td>
                    <td className="p-2 text-white/70">Customers &rarr; + Add Customer</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">Assign a surveyor to an enquiry</td>
                    <td className="p-2 text-white/70">Enquiry card &rarr; Detail drawer &rarr; Assign</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">Book a survey</td>
                    <td className="p-2 text-white/70">Enquiry &rarr; Convert &amp; Book</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">See today&apos;s bookings</td>
                    <td className="p-2 text-white/70">Calendar &rarr; Day view</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">Send a quotation</td>
                    <td className="p-2 text-white/70">Survey detail &rarr; View Quotation &rarr; Send</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">Send a report</td>
                    <td className="p-2 text-white/70">Survey detail &rarr; View Report &rarr; Send</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">Mark a payment as received</td>
                    <td className="p-2 text-white/70">Calendar &rarr; Click booking &rarr; Mark as Paid</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">Log a phone call</td>
                    <td className="p-2 text-white/70">Customers &rarr; Customer detail &rarr; Log Communication</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">Search for a customer</td>
                    <td className="p-2 text-white/70">Customers &rarr; Search box</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">Search for a survey</td>
                    <td className="p-2 text-white/70">Surveys &rarr; Search box</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Status Meanings at a Glance</h3>

            <div className="overflow-x-auto my-4">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left p-2 text-white/60 border-b border-white/10">Status</th>
                    <th className="text-left p-2 text-white/60 border-b border-white/10">Meaning</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70"><strong>New</strong></td>
                    <td className="p-2 text-white/70">Enquiry just received, nobody assigned</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70"><strong>Assigned</strong></td>
                    <td className="p-2 text-white/70">Surveyor assigned, survey not yet done</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70"><strong>Surveyed</strong></td>
                    <td className="p-2 text-white/70">Survey complete, needs quotation</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70"><strong>Quoted</strong></td>
                    <td className="p-2 text-white/70">Quotation sent, waiting for customer</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70"><strong>Accepted</strong></td>
                    <td className="p-2 text-white/70">Customer accepted the quotation</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70"><strong>Completed</strong></td>
                    <td className="p-2 text-white/70">Deposit paid, job confirmed</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70"><strong>On Hold</strong></td>
                    <td className="p-2 text-white/70">Paused — waiting for customer or information</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70"><strong>Declined</strong></td>
                    <td className="p-2 text-white/70">Customer said no</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Booking Status Meanings</h3>

            <div className="overflow-x-auto my-4">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left p-2 text-white/60 border-b border-white/10">Status</th>
                    <th className="text-left p-2 text-white/60 border-b border-white/10">Meaning</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70"><strong>Provisional</strong></td>
                    <td className="p-2 text-white/70">Booked but waiting for survey fee payment</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70"><strong>Scheduled</strong></td>
                    <td className="p-2 text-white/70">Confirmed — survey fee paid, appointment set</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70"><strong>Completed</strong></td>
                    <td className="p-2 text-white/70">Survey has been done</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70"><strong>No Show</strong></td>
                    <td className="p-2 text-white/70">Customer didn&apos;t attend</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70"><strong>Cancelled</strong></td>
                    <td className="p-2 text-white/70">Booking was cancelled</td>
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
