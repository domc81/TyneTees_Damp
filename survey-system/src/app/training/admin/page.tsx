'use client'

import { ProtectedRoute } from '@/components/ProtectedRoute'
import Layout from '@/components/layout'
import { TrainingArticle } from '@/components/training/TrainingArticle'
import { TrainingImage } from '@/components/training/TrainingImage'
import { Tip } from '@/components/training/Tip'
import Link from 'next/link'
import { Shield } from 'lucide-react'

const sections = [
  { id: 'admin-overview', label: '1. Admin Overview' },
  { id: 'team-management', label: '2. Team Management' },
  { id: 'materials-catalogue', label: '3. Materials Catalogue' },
  { id: 'costing-templates', label: '4. Costing Templates' },
  { id: 'pricing-configuration', label: '5. Pricing Configuration' },
  { id: 'surveyor-availability', label: '6. Surveyor Availability' },
  { id: 'surveyor-workload', label: '7. Surveyor Workload' },
  { id: 'company-settings', label: '8. Company Settings' },
  { id: 'notification-settings', label: '9. Notification Settings' },
  { id: 'admin-quick-reference', label: '10. Admin Quick Reference' },
]

export default function AdminGuidePage() {
  return (
    <ProtectedRoute>
      <Layout>
        <TrainingArticle
          title="Administrator Guide"
          subtitle="For users with the Admin role"
          icon={Shield}
          iconColor="text-amber-400"
          iconBg="bg-amber-500/10"
          roles={['admin']}
          sections={sections}
        >
          <p>
            This guide covers the system administration features that only administrators can access. As an admin, you have full access to everything in the system — this guide focuses on the admin-only areas: managing the team, configuring pricing, maintaining the materials catalogue, and system settings.
          </p>

          <Tip variant="note">
            <p><strong>Before reading this guide</strong>, make sure you have completed:</p>
            <ul>
              <li><Link href="/training/getting-started">Getting Started</Link> — Logging in and navigation</li>
              <li><Link href="/training/office-staff">Office Staff Guide</Link> — Leads, customers, calendar, quotations, and reports</li>
            </ul>
            <p>As an admin, you can do everything office staff can do, plus the admin-only features covered here.</p>
          </Tip>

          <hr />

          {/* Section 1 */}
          <section id="admin-overview">
            <h2>1. Admin Overview</h2>

            <p>
              As an administrator, you have access to everything in the system. In addition to all the features available to office staff (leads, customers, calendar, quotations, reports), you can:
            </p>

            <ul>
              <li><strong>Manage the team</strong> — Add, edit, and deactivate team member accounts</li>
              <li><strong>Control pricing</strong> — Set labour rates, markups, VAT, deposit percentages, and survey fees</li>
              <li><strong>Manage materials</strong> — Add, edit, and remove products from the materials catalogue</li>
              <li><strong>Edit costing templates</strong> — Adjust the formulas and parameters that calculate job costs</li>
              <li><strong>Set availability</strong> — Configure surveyor weekly hours and view absence blocks</li>
              <li><strong>Configure settings</strong> — Company profile, logo, terms and conditions, notification preferences</li>
            </ul>

            <h3>The Settings Hub</h3>

            <p>Click <strong>Settings</strong> in the sidebar to see the admin settings hub:</p>

            <TrainingImage src="/images/training/20-settings-hub.png" alt="Settings Hub" caption="Settings Hub" />

            <p>From here you can access:</p>
            <ul>
              <li><strong>Database Admin</strong> (Admin Only) — Materials, pricing, costing sections, and base rates</li>
              <li><strong>Company Profile</strong> — Company name, logo, and contact details</li>
              <li><strong>Notifications</strong> — Email and in-app notification preferences</li>
            </ul>
          </section>

          <hr />

          {/* Section 2 */}
          <section id="team-management">
            <h2>2. Team Management</h2>

            <p>Click <strong>Team</strong> in the sidebar to manage user accounts.</p>

            <TrainingImage src="/images/training/14-team-management.png" alt="Team Management" caption="Team Management" />

            <h3>What You See</h3>

            <p>The team list shows every user account in the system:</p>
            <ul>
              <li><strong>Name</strong></li>
              <li><strong>Email</strong></li>
              <li><strong>Phone</strong></li>
              <li><strong>Role</strong> — Admin, Office, or Surveyor (colour-coded badge)</li>
              <li><strong>Surveyor</strong> — Whether this person can be assigned surveys (Yes/No)</li>
              <li><strong>Status</strong> — Active or Inactive</li>
              <li><strong>Created</strong> — When the account was set up</li>
              <li><strong>Actions</strong> — Buttons to edit, reset password, or manage the account</li>
            </ul>

            <p>Use the <strong>search box</strong> to find someone by name, email, or phone. Use the <strong>role filter dropdown</strong> to show only accounts with a specific role.</p>

            <h3>Adding a New Team Member</h3>

            <ol>
              <li>Click <strong>&quot;+ Add Team Member&quot;</strong> in the top-right corner</li>
              <li>Fill in the form:
                <ul>
                  <li><strong>Display Name</strong> — Their name as it will appear throughout the system</li>
                  <li><strong>Email</strong> — Their login email address (must be unique)</li>
                  <li><strong>Phone</strong> — Contact number</li>
                  <li><strong>Role</strong> — Choose one:
                    <ul>
                      <li><strong>Admin</strong> — Full access to everything</li>
                      <li><strong>Office</strong> — Lead management, calendar, quotations, reports</li>
                      <li><strong>Surveyor</strong> — Survey wizard, own calendar, limited access</li>
                    </ul>
                  </li>
                  <li><strong>Is Surveyor</strong> — Toggle on if this person carries out surveys (this controls whether they appear in the surveyor dropdown when booking). Note: an Admin or Office user can also be flagged as a surveyor if they do both roles</li>
                  <li><strong>Temporary Password</strong> — Set an initial password for them</li>
                </ul>
              </li>
              <li>Click <strong>&quot;Create&quot;</strong></li>
            </ol>

            <p>The new team member will be created with <strong>&quot;Must Change Password&quot;</strong> set — they&apos;ll be asked to choose their own password the first time they log in.</p>

            <h3>Editing a Team Member</h3>

            <p>Click the <strong>edit (pencil) icon</strong> next to any team member to change their details:</p>
            <ul>
              <li>Name, email, phone</li>
              <li>Role</li>
              <li>Is Surveyor flag</li>
              <li>Qualifications (for surveyor profiles — shown in reports)</li>
            </ul>

            <Tip variant="important">
              You cannot change your own role. This prevents accidentally locking yourself out of admin access.
            </Tip>

            <h3>Deactivating an Account</h3>

            <p>If someone leaves the company or no longer needs access:</p>

            <ol>
              <li>Click the edit icon next to their name</li>
              <li>Toggle their status to <strong>Inactive</strong></li>
              <li>Save</li>
            </ol>

            <p>Deactivated accounts:</p>
            <ul>
              <li>Cannot log in</li>
              <li>Are automatically logged out if currently active</li>
              <li>Keep their historical data (surveys, leads, etc.) intact</li>
              <li>Can be reactivated later if needed</li>
            </ul>

            <Tip variant="important">
              You cannot deactivate your own account. This prevents accidentally locking everyone out.
            </Tip>

            <h3>Resetting a Password</h3>

            <p>Click the <strong>password reset icon</strong> next to a team member to set a new temporary password for them. They will be required to change it on their next login.</p>
          </section>

          <hr />

          {/* Section 3 */}
          <section id="materials-catalogue">
            <h2>3. Materials Catalogue</h2>

            <p>
              The materials catalogue is the master list of all products used in costings. Every material, membrane, chemical, and sundry item is listed here with its supplier cost, coverage rate, and category.
            </p>

            <p>
              Click <strong>Materials</strong> in the sidebar to view the catalogue, or go to <strong>Settings → Database Admin</strong> for the full admin view.
            </p>

            <TrainingImage src="/images/training/15-admin-materials.png" alt="Materials Catalogue Admin" caption="Materials Catalogue Admin" />

            <h3>What You See</h3>

            <p>The admin materials view shows a table with:</p>
            <ul>
              <li><strong>Material Name</strong> — Product description</li>
              <li><strong>Category</strong> — What type of product it is (colour-coded badge): DPC, Plastering, Membrane, Condensation, Timber, etc.</li>
              <li><strong>Unit</strong> — How it&apos;s measured (each, per bag, per roll, m2, etc.)</li>
              <li><strong>Supplier Cost</strong> — What we pay for it</li>
              <li><strong>Coverage</strong> — How much area one unit covers (e.g. &quot;4.65 per cartridge&quot;, &quot;2 m2 per bag&quot;)</li>
              <li><strong>Actions</strong> — Edit or delete</li>
            </ul>

            <p>Use the <strong>search box</strong> and <strong>category filter</strong> to find specific materials.</p>

            <h3>Adding a New Material</h3>

            <ol>
              <li>Click <strong>&quot;+ Add Material&quot;</strong></li>
              <li>Fill in:
                <ul>
                  <li><strong>Name</strong> — Full product name (be specific, e.g. &quot;Wykamol CM3 Mesh Membrane - 1.2m&quot;)</li>
                  <li><strong>Category</strong> — Select from the list</li>
                  <li><strong>Unit of Measure</strong> — How this product is sold/measured</li>
                  <li><strong>Supplier Cost</strong> — The price you pay (excluding VAT)</li>
                  <li><strong>Coverage Rate</strong> — How much one unit covers (this is used in costing calculations)</li>
                  <li><strong>Product Key</strong> — An internal reference key used by the costing engine</li>
                </ul>
              </li>
              <li>Click <strong>Save</strong></li>
            </ol>

            <h3>Editing a Material</h3>

            <p>Click the <strong>edit icon</strong> next to any material to change its cost, coverage, or other details. Changes affect all <strong>future</strong> costings — existing quotations are not affected.</p>

            <h3>Deleting a Material</h3>

            <p>Click the <strong>delete icon</strong> to remove a material. Be careful — only delete materials that are no longer used. If a material is referenced by active costing templates, removing it could affect future costing calculations.</p>

            <Tip variant="tip">
              When supplier prices change, update the Supplier Cost here. The next time a survey costing is calculated, it will use the new price automatically.
            </Tip>
          </section>

          <hr />

          {/* Section 4 */}
          <section id="costing-templates">
            <h2>4. Costing Templates</h2>

            <p>
              Costing templates define how the system calculates job costs. Each template is a line item that specifies a formula type, unit cost, labour hours, markup percentages, and wastage factors.
            </p>

            <p>Navigate to <strong>Settings → Database Admin → Costing Templates</strong>, or click <strong>Admin</strong> in the sidebar area.</p>

            <TrainingImage src="/images/training/16-admin-costing.png" alt="Costing Templates" caption="Costing Templates" />

            <h3>Understanding the Layout</h3>

            <p>Templates are organised by <strong>survey type</strong> — tabs at the top let you switch between:</p>
            <ul>
              <li><strong>Damp</strong> (68 templates)</li>
              <li><strong>Condensation</strong> (34 templates)</li>
              <li><strong>Timber</strong> (67 templates)</li>
              <li><strong>Woodworm</strong> (47 templates)</li>
              <li><strong>Site Prep</strong> (4 templates)</li>
            </ul>

            <p>Within each survey type, templates are grouped into <strong>sections</strong> (collapsible):</p>
            <ul>
              <li>Preparatory Work</li>
              <li>Stripping Out</li>
              <li>Walls — DPC Traditional</li>
              <li>Walls — DPC Digital (Mursec)</li>
              <li>Walls — Membrane CM3 System</li>
              <li>Cementitious Tanking System</li>
              <li>Floor — Liquid Resin Membranes</li>
              <li>Plastering &amp; Finishing</li>
              <li>Floor Joists &amp; Floor Decking</li>
              <li>Airbricks</li>
              <li>Spray Treatments</li>
              <li>Drains</li>
              <li>And more...</li>
            </ul>

            <p>Click the <strong>arrow</strong> next to a section name to expand or collapse it. Use <strong>&quot;Expand All&quot;</strong> or <strong>&quot;Collapse All&quot;</strong> buttons to open/close everything.</p>

            <h3>Reading a Template Row</h3>

            <p>Each template line shows:</p>

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
                    <td className="p-2 text-white/70"><strong>Description</strong></td>
                    <td className="p-2 text-white/70">What the line item is (e.g. &quot;Remove radiators &amp; cap valves&quot;)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70"><strong>UOM</strong></td>
                    <td className="p-2 text-white/70">Unit of measure (each, m, m2, etc.)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70"><strong>Formula</strong></td>
                    <td className="p-2 text-white/70">Calculation type (Standard, Ceiling Coverage, DPC Injection, etc.)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70"><strong>Unit Cost</strong></td>
                    <td className="p-2 text-white/70">Material cost per unit</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70"><strong>Labour Hrs</strong></td>
                    <td className="p-2 text-white/70">Hours of labour per unit</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70"><strong>Wastage %</strong></td>
                    <td className="p-2 text-white/70">Extra material ordered to cover waste</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70"><strong>Mat %</strong></td>
                    <td className="p-2 text-white/70">Material markup percentage</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70"><strong>Lab %</strong></td>
                    <td className="p-2 text-white/70">Labour markup percentage</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70"><strong>Coverage</strong></td>
                    <td className="p-2 text-white/70">Coverage rate (for materials that cover an area)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70"><strong>Active</strong></td>
                    <td className="p-2 text-white/70">Green toggle = active (included in costings), grey = inactive</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Editing a Template</h3>

            <ol>
              <li>Click directly on any number in the table to edit it</li>
              <li>Change the value</li>
              <li>Click <strong>&quot;Save Changes&quot;</strong> in the top-right corner</li>
            </ol>

            <Tip variant="warning">
              The yellow banner at the top says: <em>&quot;Changes affect all future costings and quotations. Existing quotations are not affected.&quot;</em> So you can update prices without worrying about changing quotes that have already been sent.
            </Tip>

            <h3>Activating/Deactivating Templates</h3>

            <p>Toggle the <strong>Active</strong> switch on any line to include or exclude it from costings. Inactive templates are greyed out and won&apos;t appear in future costing calculations.</p>

            <h3>Formula Types</h3>

            <p>The system uses 11 different formula types to calculate costs. Most are &quot;Standard&quot; (simple quantity x cost), but some are specialised:</p>

            <div className="overflow-x-auto my-4">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left p-2 text-white/60 border-b border-white/10">Formula</th>
                    <th className="text-left p-2 text-white/60 border-b border-white/10">Used For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">Standard</td>
                    <td className="p-2 text-white/70">Most items — quantity x unit cost for materials, quantity x hours x rate for labour</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">Ceiling Coverage</td>
                    <td className="p-2 text-white/70">Ceiling work — calculates how many units needed to cover an area based on coverage rate</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">DPC Injection</td>
                    <td className="p-2 text-white/70">Damp proof course cream — factors in wall depth</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">Digital DPC</td>
                    <td className="p-2 text-white/70">Digital DPC units — reads the base cost from pricing config</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">Compound Material</td>
                    <td className="p-2 text-white/70">Multi-material mixes (e.g. dubbing coat = SBR + sand + cement)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">Fixed Price</td>
                    <td className="p-2 text-white/70">Flat-rate items (e.g. PIV ventilation units)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">Per Room Fixed</td>
                    <td className="p-2 text-white/70">Fixed cost applied per room</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">Tiered Disposal</td>
                    <td className="p-2 text-white/70">Different rates based on quantity thresholds</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">Bag and Cart</td>
                    <td className="p-2 text-white/70">Per-bag debris removal</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">Skip Hire</td>
                    <td className="p-2 text-white/70">Reads skip cost from pricing config</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">Ancillary Refit</td>
                    <td className="p-2 text-white/70">Ancillary refit items</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <Tip variant="tip">
              If you&apos;re not sure about a formula type, the safest option is to leave it as-is and only change the Unit Cost or Labour Hours.
            </Tip>
          </section>

          <hr />

          {/* Section 5 */}
          <section id="pricing-configuration">
            <h2>5. Pricing Configuration</h2>

            <p>The pricing configuration page controls the base rates that feed into every costing calculation.</p>

            <p>Navigate to <strong>Settings → Database Admin</strong>, or go directly to the pricing rates page.</p>

            <TrainingImage src="/images/training/17-admin-rates.png" alt="Pricing Configuration" caption="Pricing Configuration" />

            <h3>Sections</h3>

            <h4>Labour Rates</h4>
            <ul>
              <li><strong>Base Hourly Rate</strong> — The base cost to the company per hour of labour (currently £30.63)</li>
              <li><strong>Labour Markup</strong> — Percentage markup applied to all labour (currently 100%, meaning the customer pays double the base rate)</li>
              <li>The <strong>Effective Rate</strong> is calculated and shown below: £30.63 x 2.00 = £61.26/hr</li>
            </ul>

            <h4>Contractor &amp; Travel</h4>
            <ul>
              <li><strong>Contractor Hourly Rate</strong> — Rate paid to subcontractors (no markup applied)</li>
              <li><strong>Vehicle Cost per Mile</strong> — Cost per mile for project-specific overhead calculations</li>
            </ul>

            <h4>Markups &amp; Wastage</h4>
            <ul>
              <li><strong>Material Markup</strong> — Percentage markup on supplier material costs (currently 30%)</li>
              <li><strong>Wastage Factor</strong> — Extra material ordered to cover waste (currently 10%)</li>
              <li><strong>VAT Rate</strong> — Currently 20%</li>
            </ul>

            <h4>Fixed Costs</h4>
            <ul>
              <li><strong>Skip Hire — 8yd</strong> — Base cost per skip</li>
              <li><strong>Asbestos Testing</strong> — Cost per sample</li>
              <li><strong>Digital DPC Unit</strong> — Base cost for a Mursec Eco digital DPC unit</li>
            </ul>

            <h4>Deposit Percentages</h4>
            <ul>
              <li><strong>Damp</strong> — 30%</li>
              <li><strong>Condensation</strong> — 50%</li>
              <li><strong>Timber</strong> — 30%</li>
              <li><strong>Woodworm</strong> — 30%</li>
            </ul>

            <p>These control what percentage of the total job value the customer must pay as a deposit when they accept a quotation.</p>

            <h4>Survey Fees</h4>
            <ul>
              <li><strong>Survey Fee Amount</strong> — The fee charged to customers before the survey booking is confirmed (currently £150)</li>
              <li><strong>Payment Expiry Days</strong> — How many days the customer has to pay before the provisional booking is automatically cancelled (currently 3 days)</li>
            </ul>

            <h4>Pricing Summary</h4>
            <p>At the bottom, four summary cards show the key effective rates at a glance:</p>
            <ul>
              <li>Effective Labour Rate</li>
              <li>Contractor Rate</li>
              <li>Material Markup</li>
              <li>Vehicle Cost per mile</li>
            </ul>

            <h3>Making Changes</h3>

            <ol>
              <li>Click on any value to edit it</li>
              <li>Change the number</li>
              <li>Click <strong>&quot;Save Changes&quot;</strong></li>
            </ol>

            <Tip variant="warning">
              Changes affect all <strong>future</strong> costings and quotations. Any quotes that have already been sent to customers will keep their original pricing. This means you can update prices mid-year without worrying about changing existing commitments.
            </Tip>
          </section>

          <hr />

          {/* Section 6 */}
          <section id="surveyor-availability">
            <h2>6. Surveyor Availability</h2>

            <p>Manage each surveyor&apos;s weekly working hours and view their absence blocks.</p>

            <p>Navigate from the Calendar page via <strong>&quot;Manage Availability&quot;</strong>, or from the sidebar.</p>

            <TrainingImage src="/images/training/18-admin-availability.png" alt="Surveyor Availability" caption="Surveyor Availability" />

            <h3>Selecting a Surveyor</h3>

            <p>Use the <strong>Surveyor dropdown</strong> at the top to switch between different surveyors.</p>

            <h3>Standard Weekly Hours</h3>

            <p>The weekly hours table shows each day of the week with:</p>
            <ul>
              <li><strong>Day</strong> — Monday through Sunday</li>
              <li><strong>Status</strong> — &quot;Working&quot; (green badge) or &quot;Day Off&quot; (grey badge)</li>
              <li><strong>Start</strong> — Working day start time</li>
              <li><strong>End</strong> — Working day end time</li>
              <li><strong>Hours</strong> — Total hours for that day</li>
            </ul>

            <p>Click <strong>&quot;Edit Hours&quot;</strong> to change a surveyor&apos;s regular schedule:</p>
            <ul>
              <li>Toggle days on/off</li>
              <li>Set start and end times for each working day</li>
              <li>Save to apply</li>
            </ul>

            <h3>Absence Blocks</h3>

            <p>Below the weekly hours, the <strong>Absence Blocks</strong> section shows any booked time off:</p>
            <ul>
              <li><strong>Type</strong> — Annual Leave, Sickness, Training, or Other (colour-coded)</li>
              <li><strong>Date range</strong> — Start and end dates</li>
              <li><strong>Notes</strong> — Any additional information</li>
              <li><strong>Edit/Delete icons</strong> — To modify or remove</li>
            </ul>

            <p>Click <strong>&quot;+ Add Absence&quot;</strong> to create a new absence block:</p>
            <ol>
              <li>Select the <strong>type</strong></li>
              <li>Choose the <strong>start and end dates</strong></li>
              <li>Add optional <strong>notes</strong> (e.g. &quot;Tenerife&quot; for a holiday)</li>
              <li>Save</li>
            </ol>

            <p>The calendar will show these absence blocks and prevent bookings during those periods.</p>

            <Tip variant="note">
              Surveyors can add their own absence blocks, but only admins can edit weekly hours.
            </Tip>
          </section>

          <hr />

          {/* Section 7 */}
          <section id="surveyor-workload">
            <h2>7. Surveyor Workload</h2>

            <p>The Workload page gives you a quick overview of how busy each surveyor is.</p>

            <TrainingImage src="/images/training/19-admin-workload.png" alt="Surveyor Workload" caption="Surveyor Workload" />

            <h3>What You See</h3>

            <p>A card for each active surveyor showing:</p>
            <ul>
              <li><strong>Name and email</strong></li>
              <li><strong>Three booking counts:</strong>
                <ul>
                  <li><strong>Today</strong> — How many surveys they have today</li>
                  <li><strong>This Week</strong> — Total for the current week</li>
                  <li><strong>Next Week</strong> — Total for next week</li>
                </ul>
              </li>
              <li><strong>Next 7 Days Capacity</strong> — A progress bar showing how much of their available time is booked
                <ul>
                  <li>Shows hours used out of total available hours</li>
                  <li>Percentage utilised</li>
                </ul>
              </li>
              <li><strong>Completed</strong> — Number of completed surveys</li>
              <li><strong>&quot;View in Calendar&quot;</strong> link — Jump directly to that surveyor&apos;s calendar view</li>
            </ul>

            <h3>Using Workload for Scheduling</h3>

            <p>Before assigning a new survey booking:</p>
            <ol>
              <li>Open the Workload page</li>
              <li>Check which surveyors have capacity this week and next</li>
              <li>Assign the survey to the surveyor with the most availability</li>
              <li>Click &quot;View in Calendar&quot; to see their specific schedule and pick a time slot</li>
            </ol>
          </section>

          <hr />

          {/* Section 8 */}
          <section id="company-settings">
            <h2>8. Company Settings</h2>

            <p>
              The Company Profile page controls information that appears on all customer-facing documents — quotations, reports, emails, and the platform interface.
            </p>

            <p>Navigate to <strong>Settings → Company Profile</strong>.</p>

            <TrainingImage src="/images/training/21-settings-company.png" alt="Company Profile" caption="Company Profile" />

            <h3>Sections</h3>

            <h4>Company Logo</h4>
            <ul>
              <li>Upload your company logo (PNG, JPG, SVG, or WebP — max 5MB)</li>
              <li>Recommended size: 300x100px or similar landscape ratio</li>
              <li>Click <strong>&quot;Upload Logo&quot;</strong> to replace, or <strong>&quot;Remove&quot;</strong> to delete</li>
              <li>The logo appears on quotations, reports, and in the sidebar</li>
            </ul>

            <h4>Identity</h4>
            <ul>
              <li><strong>Company Name</strong> — Full legal company name (appears on quotations and reports)</li>
              <li><strong>Trading Name</strong> — Shown in the app sidebar and short references</li>
              <li><strong>Company Registration Number</strong> — Companies House registration</li>
              <li><strong>VAT Number</strong> — VAT registration (if applicable)</li>
              <li><strong>Established Year</strong> — When the company was founded</li>
            </ul>

            <h4>Contact Details</h4>
            <ul>
              <li><strong>Primary Phone</strong> and <strong>Secondary Phone</strong></li>
              <li><strong>Primary Email</strong> and <strong>Secondary Email</strong></li>
              <li><strong>Website</strong></li>
            </ul>

            <h4>Registered Address</h4>
            <ul>
              <li>Full company address (Address Line 1, Line 2, City, County, Postcode)</li>
            </ul>

            <h4>Report &amp; Quotation Content</h4>
            <ul>
              <li><strong>About Us</strong> — The company description text that appears in the &quot;About Us&quot; section of survey reports. Edit this to update the company profile text</li>
              <li><strong>Guarantee Years</strong> — How many years the company guarantee covers (e.g. 25)</li>
              <li><strong>Guarantee Scheme Name</strong> — The name of the insurance-backed guarantee scheme (e.g. &quot;Protected Guarantee&quot;)</li>
              <li><strong>Terms &amp; Conditions</strong> — The full T&amp;C text that appears at the bottom of quotations. Each numbered point is a separate condition</li>
              <li><strong>Default Deposit Note</strong> — Default text for the deposit note on quotations</li>
            </ul>

            <p>After making changes, click <strong>&quot;Save Changes&quot;</strong> at the bottom.</p>

            <Tip variant="important">
              These details appear on every quotation and report sent to customers. Make sure they are correct and up to date, especially the company name, registration number, and contact details.
            </Tip>
          </section>

          <hr />

          {/* Section 9 */}
          <section id="notification-settings">
            <h2>9. Notification Settings</h2>

            <p>Control which events trigger notifications and whether they are sent as in-app alerts, emails, or both.</p>

            <p>Navigate to <strong>Settings → Notifications</strong>.</p>

            <TrainingImage src="/images/training/22-settings-notifications.png" alt="Notification Settings" caption="Notification Settings" />

            <h3>Email Configuration</h3>

            <p>At the top, the <strong>Email Configuration</strong> section controls how emails are sent:</p>
            <ul>
              <li><strong>Platform email</strong> (Recommended) — Uses the platform&apos;s built-in email service. No setup needed</li>
              <li><strong>Custom provider</strong> (Advanced) — Bring your own Resend API key and verified sending domain</li>
            </ul>

            <p>The <strong>sending address</strong> shows which email address notifications come from.</p>

            <p>You can click <strong>&quot;Send test email&quot;</strong> to send a test message to your admin email address to verify everything is working.</p>

            <h3>Notification Preferences</h3>

            <p>Below the email setup, each event type has two toggles:</p>

            <div className="overflow-x-auto my-4">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left p-2 text-white/60 border-b border-white/10">Column</th>
                    <th className="text-left p-2 text-white/60 border-b border-white/10">What it controls</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70"><strong>In-app</strong></td>
                    <td className="p-2 text-white/70">Whether a notification appears in the bell icon (top-right of the screen)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70"><strong>Email</strong></td>
                    <td className="p-2 text-white/70">Whether an email is sent</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70"><strong>Recipient</strong></td>
                    <td className="p-2 text-white/70">Who gets the notification — &quot;Internal&quot; (admin/office staff) or &quot;Customer&quot; (the customer)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>Events are grouped into categories:</p>

            <h4>Bookings</h4>
            <ul>
              <li>Booking cancelled → Customer</li>
              <li>Booking confirmation → Customer</li>
              <li>Upcoming survey reminder → Customer</li>
              <li>Booking rescheduled → Customer</li>
            </ul>

            <h4>Surveys</h4>
            <ul>
              <li>Surveyor assigned to survey → Internal</li>
              <li>Survey wizard completed → Internal</li>
              <li>New survey created → Internal</li>
              <li>Survey status updated → Internal</li>
            </ul>

            <h4>Quotations</h4>
            <ul>
              <li>Customer accepted quotation → Internal</li>
              <li>Customer declined quotation → Internal</li>
              <li>Quotation generated → Internal</li>
              <li>Quotation emailed to customer → Customer</li>
              <li>Customer viewed quotation → Internal</li>
            </ul>

            <h4>Reports</h4>
            <ul>
              <li>Report AI generation complete → Internal</li>
              <li>Report published and emailed → Customer</li>
            </ul>

            <h4>Leads &amp; System</h4>
            <ul>
              <li>New lead received → Internal</li>
              <li>System notification → Internal</li>
            </ul>

            <h3>Making Changes</h3>

            <p>Toggle any switch on or off to enable/disable that notification channel. Click <strong>&quot;Save Settings&quot;</strong> at the bottom to apply.</p>

            <Tip variant="tip">
              Most internal notifications default to in-app only (no email) to avoid inbox overload. Customer-facing notifications default to both in-app and email. Adjust based on what works for your team.
            </Tip>
          </section>

          <hr />

          {/* Section 10 */}
          <section id="admin-quick-reference">
            <h2>10. Admin Quick Reference</h2>

            <h3>Where to Find Admin Features</h3>

            <div className="overflow-x-auto my-4">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left p-2 text-white/60 border-b border-white/10">Feature</th>
                    <th className="text-left p-2 text-white/60 border-b border-white/10">Navigation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">Team management</td>
                    <td className="p-2 text-white/70">Sidebar → Team</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">Materials catalogue (admin)</td>
                    <td className="p-2 text-white/70">Settings → Database Admin, or Sidebar → Materials</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">Costing templates</td>
                    <td className="p-2 text-white/70">Settings → Database Admin → Costing Templates</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">Pricing rates</td>
                    <td className="p-2 text-white/70">Settings → Database Admin → Pricing Configuration</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">Surveyor availability</td>
                    <td className="p-2 text-white/70">Calendar → Manage Availability</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">Surveyor workload</td>
                    <td className="p-2 text-white/70">Sidebar → Workload</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">Company profile</td>
                    <td className="p-2 text-white/70">Settings → Company Profile</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">Notification settings</td>
                    <td className="p-2 text-white/70">Settings → Notifications</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Common Admin Tasks</h3>

            <div className="overflow-x-auto my-4">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left p-2 text-white/60 border-b border-white/10">Task</th>
                    <th className="text-left p-2 text-white/60 border-b border-white/10">Steps</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">Add a new team member</td>
                    <td className="p-2 text-white/70">Team → + Add Team Member → Fill form → Create</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">Deactivate a team member</td>
                    <td className="p-2 text-white/70">Team → Edit (pencil icon) → Toggle status to Inactive → Save</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">Update a material price</td>
                    <td className="p-2 text-white/70">Materials (admin view) → Find material → Edit → Change cost → Save</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">Change labour rates</td>
                    <td className="p-2 text-white/70">Pricing Configuration → Labour Rates → Edit → Save Changes</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">Change deposit percentages</td>
                    <td className="p-2 text-white/70">Pricing Configuration → Deposit Percentages → Edit → Save Changes</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">Change survey fee</td>
                    <td className="p-2 text-white/70">Pricing Configuration → Survey Fees → Edit amount → Save Changes</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">Set surveyor weekly hours</td>
                    <td className="p-2 text-white/70">Availability → Select surveyor → Edit Hours → Set times → Save</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">Add surveyor absence</td>
                    <td className="p-2 text-white/70">Availability → Select surveyor → + Add Absence → Fill details → Save</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">Update company details</td>
                    <td className="p-2 text-white/70">Settings → Company Profile → Edit fields → Save Changes</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">Change notification settings</td>
                    <td className="p-2 text-white/70">Settings → Notifications → Toggle switches → Save Settings</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">Upload a new company logo</td>
                    <td className="p-2 text-white/70">Settings → Company Profile → Company Logo → Upload Logo</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">Update Terms &amp; Conditions</td>
                    <td className="p-2 text-white/70">Settings → Company Profile → Terms &amp; Conditions → Edit text → Save</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Things to Remember</h3>

            <ul>
              <li><strong>Changes to pricing and materials affect future costings only</strong> — existing quotations are never changed retrospectively</li>
              <li><strong>You cannot change your own role or deactivate your own account</strong> — this is a safety feature</li>
              <li><strong>Team members with &quot;Must Change Password&quot; set</strong> will be forced to choose a new password on their next login</li>
              <li><strong>The &quot;Is Surveyor&quot; flag is separate from the role</strong> — an Admin or Office user can also be flagged as a surveyor if they carry out surveys</li>
              <li><strong>Deactivated accounts keep their data</strong> — surveys, leads, and historical records are preserved</li>
              <li><strong>Notification preferences apply system-wide</strong> — they affect all users, not just your own notifications</li>
            </ul>
          </section>
        </TrainingArticle>
      </Layout>
    </ProtectedRoute>
  )
}
