'use client'

import { ProtectedRoute } from '@/components/ProtectedRoute'
import Layout from '@/components/layout'
import { TrainingArticle } from '@/components/training/TrainingArticle'
import { TrainingImage } from '@/components/training/TrainingImage'
import { Tip } from '@/components/training/Tip'
import Link from 'next/link'
import { PlayCircle } from 'lucide-react'

const sections = [
  { id: 'what-is', label: 'What is the Survey System?' },
  { id: 'logging-in', label: 'Logging In' },
  { id: 'changing-password', label: 'Changing Your Password' },
  { id: 'forgot-password', label: 'Forgot Your Password?' },
  { id: 'dashboard', label: 'The Dashboard' },
  { id: 'sidebar', label: 'The Sidebar' },
  { id: 'notification-bell', label: 'The Notification Bell' },
  { id: 'understanding-role', label: 'Understanding Your Role' },
  { id: 'logging-out', label: 'Logging Out' },
  { id: 'quick-reference', label: 'Quick Reference' },
  { id: 'whats-next', label: "What's Next?" },
]

export default function GettingStartedPage() {
  return (
    <ProtectedRoute>
      <Layout>
        <TrainingArticle
          title="Getting Started"
          subtitle="For all staff: Admin, Office, and Surveyors"
          icon={PlayCircle}
          iconColor="text-blue-400"
          iconBg="bg-blue-500/10"
          roles={['admin', 'office', 'surveyor']}
          sections={sections}
        >
          <p>
            Welcome to the Tyne Tees Damp Proofing Survey System. This guide will walk you through
            your first login, show you how to find your way around, and explain what each part of the
            screen does. By the end of this guide, you will be comfortable logging in, navigating the
            system, and understanding your dashboard.
          </p>

          <hr />

          {/* What is the Survey System? */}
          <section id="what-is">
            <h2>What is the Survey System?</h2>
            <p>
              The Survey System is the company&apos;s online platform for managing the entire customer
              journey, from the first phone call through to a completed survey and quotation. It
              replaces the old paper-based and spreadsheet processes with one central system that
              everyone in the team uses.
            </p>
            <p>Depending on your role, you will use it to:</p>
            <ul>
              <li>
                <strong>Office staff</strong> — Log new enquiries, manage the pipeline, book surveys,
                send quotations and reports
              </li>
              <li>
                <strong>Surveyors</strong> — View your daily schedule, carry out surveys on-site using
                the step-by-step wizard, record findings with photos and voice notes
              </li>
              <li>
                <strong>Administrators</strong> — All of the above, plus manage team members, pricing,
                materials, and company settings
              </li>
            </ul>
            <p>
              Everything is accessed through a web browser — there is nothing to install. It works on
              your computer, tablet, or phone.
            </p>
          </section>

          <hr />

          {/* Logging In */}
          <section id="logging-in">
            <h2>Logging In</h2>
            <p>Open your web browser and go to:</p>
            <p>
              <strong>https://ttdp.dc81.io</strong>
            </p>
            <p>You will see the login screen:</p>
            <TrainingImage
              src="/images/training/00-login-page.png"
              alt="Login Page"
              caption="Login Page"
            />
            <ol>
              <li>
                Type your <strong>email address</strong> in the Email box
              </li>
              <li>
                Type your <strong>password</strong> in the Password box
              </li>
              <li>
                Click the blue <strong>Sign In</strong> button
              </li>
            </ol>
            <p>
              If your email and password are correct, you will be taken straight to your Dashboard.
            </p>
            <Tip variant="note">
              <strong>Don&apos;t have an account?</strong> You cannot create your own account. Your
              administrator will set one up for you and give you your initial login details.
            </Tip>
          </section>

          <hr />

          {/* Changing Your Password (First Login) */}
          <section id="changing-password">
            <h2>Changing Your Password (First Login)</h2>
            <p>
              The first time you log in, the system will ask you to change your password. This is for
              security — your administrator set a temporary password for you, and you need to choose
              your own.
            </p>
            <ol>
              <li>
                You will be taken to a <strong>Change Password</strong> screen automatically
              </li>
              <li>
                Type a new password of your choice — make it something memorable but secure
              </li>
              <li>Confirm the new password by typing it again</li>
              <li>
                Click <strong>Update Password</strong>
              </li>
            </ol>
            <p>
              You will then be taken to the Dashboard and can start using the system normally.
            </p>
            <Tip variant="tip">
              Choose a password that is at least 8 characters long and includes a mix of letters and
              numbers. Write it down somewhere safe if you need to.
            </Tip>
          </section>

          <hr />

          {/* Forgot Your Password? */}
          <section id="forgot-password">
            <h2>Forgot Your Password?</h2>
            <p>
              If you forget your password, don&apos;t worry — you can reset it yourself.
            </p>
            <ol>
              <li>
                On the login screen, click <strong>Forgot password?</strong> (just below the password
                box)
              </li>
            </ol>
            <TrainingImage
              src="/images/training/00-forgot-password.png"
              alt="Forgot Password"
              caption="Forgot Password"
            />
            <ol start={2}>
              <li>Enter your email address</li>
              <li>Click the reset button</li>
              <li>Check your email inbox for a password reset link</li>
              <li>Click the link and follow the instructions to set a new password</li>
            </ol>
            <p>
              If you don&apos;t receive the email within a few minutes, check your spam/junk folder.
              If it still doesn&apos;t arrive, contact your administrator.
            </p>
          </section>

          <hr />

          {/* The Dashboard — Your Home Screen */}
          <section id="dashboard">
            <h2>The Dashboard — Your Home Screen</h2>
            <p>
              After logging in, you land on the <strong>Dashboard</strong>. This is your home screen
              and gives you a quick overview of what&apos;s happening.
            </p>

            <h3>What Admin and Office Staff See</h3>
            <TrainingImage
              src="/images/training/01-dashboard-admin.png"
              alt="Admin/Office Dashboard"
              caption="Admin/Office Dashboard"
            />
            <p>The dashboard shows:</p>
            <ol>
              <li>
                <strong>Welcome message</strong> — &quot;Welcome back, [your name]&quot; at the top
              </li>
              <li>
                <strong>Quick action buttons</strong> — In the top-right corner:
                <ul>
                  <li>
                    <strong>+ New Survey</strong> (blue button) — Start a new survey
                  </li>
                  <li>
                    <strong>Create Customer</strong> — Add a new customer to the system
                  </li>
                </ul>
              </li>
              <li>
                <strong>Enquiry Pipeline summary</strong> — A coloured bar showing how many enquiries
                are at each stage (New, Assigned, Surveyed, Quoted, Accepted). Click &quot;View
                Pipeline&quot; to go to the full pipeline board
              </li>
              <li>
                <strong>Key statistics</strong> — Four cards showing:
                <ul>
                  <li>
                    <strong>Active Surveys</strong> — How many surveys are currently in progress
                  </li>
                  <li>
                    <strong>Completed</strong> — Total surveys finished
                  </li>
                  <li>
                    <strong>Won This Month</strong> — Jobs won this month and their value
                  </li>
                  <li>
                    <strong>Total Projects</strong> — All-time total
                  </li>
                </ul>
              </li>
              <li>
                <strong>Recent Activity</strong> — A feed showing the latest things that have happened
                across all enquiries
              </li>
              <li>
                <strong>Recent Projects</strong> — A list of your most recent surveys with their
                status, quotation status, date, and type
              </li>
            </ol>

            <h3>What Surveyors See</h3>
            <TrainingImage
              src="/images/training/30-dashboard-surveyor.png"
              alt="Surveyor Dashboard"
              caption="Surveyor Dashboard"
            />
            <p>
              The surveyor dashboard is simpler — it focuses on what matters to you in the field:
            </p>
            <ol>
              <li>
                <strong>Quick action buttons</strong> — Same as above (+ New Survey, Create Customer)
              </li>
              <li>
                <strong>Key statistics</strong> — The same four stat cards
              </li>
              <li>
                <strong>Recent Projects</strong> — Your recent surveys, taking up the full width of
                the screen
              </li>
            </ol>
            <p>
              Surveyors do <strong>not</strong> see the Enquiry Pipeline summary or the Recent Activity
              feed. These are managed by office staff.
            </p>
          </section>

          <hr />

          {/* Finding Your Way Around — The Sidebar */}
          <section id="sidebar">
            <h2>Finding Your Way Around — The Sidebar</h2>
            <p>
              On the left side of every screen is the <strong>sidebar menu</strong>. This is how you
              move between different parts of the system.
            </p>
            <TrainingImage
              src="/images/training/02-sidebar-navigation.png"
              alt="Sidebar Navigation"
              caption="Sidebar Navigation"
            />
            <p>The sidebar shows these menu items:</p>
            <div className="overflow-x-auto my-4">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left p-2 text-white/60 border-b border-white/10">
                      Menu Item
                    </th>
                    <th className="text-left p-2 text-white/60 border-b border-white/10">
                      What it does
                    </th>
                    <th className="text-left p-2 text-white/60 border-b border-white/10">
                      Who can see it
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">
                      <strong>Dashboard</strong>
                    </td>
                    <td className="p-2 text-white/70">
                      Your home screen with stats and recent activity
                    </td>
                    <td className="p-2 text-white/70">Everyone</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">
                      <strong>Surveys</strong>
                    </td>
                    <td className="p-2 text-white/70">
                      List of all surveys — view, create, or continue
                    </td>
                    <td className="p-2 text-white/70">Everyone</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">
                      <strong>Customers</strong>
                    </td>
                    <td className="p-2 text-white/70">
                      List of all customers — view, create, or edit
                    </td>
                    <td className="p-2 text-white/70">Everyone</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">
                      <strong>Enquiries</strong>
                    </td>
                    <td className="p-2 text-white/70">
                      The pipeline board for managing enquiries
                    </td>
                    <td className="p-2 text-white/70">Admin and Office only</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">
                      <strong>Materials</strong>
                    </td>
                    <td className="p-2 text-white/70">Browse the materials catalogue</td>
                    <td className="p-2 text-white/70">Everyone</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">
                      <strong>Team</strong>
                    </td>
                    <td className="p-2 text-white/70">View and manage team members</td>
                    <td className="p-2 text-white/70">Everyone (editing is Admin only)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">
                      <strong>Calendar</strong>
                    </td>
                    <td className="p-2 text-white/70">Survey bookings calendar</td>
                    <td className="p-2 text-white/70">Everyone</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">
                      <strong>Workload</strong>
                    </td>
                    <td className="p-2 text-white/70">Surveyor workload dashboard</td>
                    <td className="p-2 text-white/70">Admin and Office only</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2 text-white/70">
                      <strong>Settings</strong>
                    </td>
                    <td className="p-2 text-white/70">System settings and your profile</td>
                    <td className="p-2 text-white/70">Everyone</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>At the bottom of the sidebar, you can see:</p>
            <ul>
              <li>
                <strong>Your name and role</strong> — Shows which account you are logged in as
              </li>
              <li>
                <strong>Sign out button</strong> — The arrow icon next to your name logs you out
              </li>
            </ul>
            <Tip variant="note">
              <strong>Note for surveyors:</strong> You will not see the &quot;Enquiries&quot; or
              &quot;Workload&quot; items in your sidebar. These are only for office staff and
              administrators. This is normal — the system only shows you what you need.
            </Tip>
          </section>

          <hr />

          {/* The Notification Bell */}
          <section id="notification-bell">
            <h2>The Notification Bell</h2>
            <p>
              In the top-right corner of every screen, you will see a <strong>bell icon</strong>. This
              is your notification centre.
            </p>
            <p>
              When something important happens that involves you — for example, a new survey is booked
              for you, or a quotation has been viewed — a red badge will appear on the bell showing how
              many unread notifications you have.
            </p>
            <p>Click the bell to see your notifications. Each notification shows:</p>
            <ul>
              <li>What happened</li>
              <li>When it happened</li>
              <li>A link to take you to the relevant page</li>
            </ul>
            <p>
              Notifications update in real time — you don&apos;t need to refresh the page.
            </p>
          </section>

          <hr />

          {/* Understanding Your Role */}
          <section id="understanding-role">
            <h2>Understanding Your Role</h2>
            <p>
              The system has three roles, and your role determines what you can see and do:
            </p>

            <h3>Admin</h3>
            <p>
              Full access to everything. Admins can manage team members, set pricing, configure company
              settings, and do everything that office staff and surveyors can do.
            </p>

            <h3>Office</h3>
            <p>
              Access to enquiry management, customer management, the calendar (all surveyors), and the
              ability to send quotations and reports. Cannot change pricing, manage the team, or access
              system settings.
            </p>

            <h3>Surveyor</h3>
            <p>
              Access to surveys, customers, and your own calendar. You can carry out surveys using the
              wizard, take photos, record voice notes, and review costings. You cannot access the
              enquiry pipeline or change system settings.
            </p>
            <p>Your role is shown at the bottom of the sidebar, underneath your name.</p>
          </section>

          <hr />

          {/* Logging Out */}
          <section id="logging-out">
            <h2>Logging Out</h2>
            <p>To log out of the system:</p>
            <ol>
              <li>Look at the bottom of the sidebar</li>
              <li>Find your name and role</li>
              <li>
                Click the <strong>sign-out arrow</strong> icon next to your name
              </li>
            </ol>
            <p>You will be returned to the login screen.</p>
            <Tip variant="tip">
              If you&apos;re using a shared computer, always log out when you&apos;re finished. If
              you&apos;re using your own device, you can stay logged in — the system will keep your
              session active.
            </Tip>
          </section>

          <hr />

          {/* Quick Reference — Keyboard & Browser Tips */}
          <section id="quick-reference">
            <h2>Quick Reference — Keyboard &amp; Browser Tips</h2>
            <ul>
              <li>
                <strong>Going back:</strong> Use your browser&apos;s back button, or click the
                &quot;Back&quot; link at the top of most pages
              </li>
              <li>
                <strong>Refreshing:</strong> If something looks stuck, press F5 (or Ctrl+R on Windows,
                Cmd+R on Mac) to refresh
              </li>
              <li>
                <strong>On a phone or tablet:</strong> The sidebar collapses into a menu button — tap
                it to open the navigation
              </li>
              <li>
                <strong>Bookmarking:</strong> You can bookmark https://ttdp.dc81.io in your browser
                for quick access
              </li>
            </ul>
          </section>

          <hr />

          {/* What's Next? */}
          <section id="whats-next">
            <h2>What&apos;s Next?</h2>
            <p>
              Now that you know how to log in and find your way around, read the guide for your
              specific role:
            </p>
            <ul>
              <li>
                <strong>Office Staff</strong> — Read{' '}
                <Link href="/training/office-staff">Office Staff Guide</Link>
              </li>
              <li>
                <strong>Surveyors</strong> — Read{' '}
                <Link href="/training/surveyor">Surveyor Guide</Link>
              </li>
              <li>
                <strong>Administrators</strong> — Read{' '}
                <Link href="/training/admin">Admin Guide</Link>
              </li>
            </ul>
            <p>
              If you get stuck at any point, ask your administrator for help. The system is designed to
              be straightforward — if something doesn&apos;t look right, it&apos;s more likely a
              permissions issue (your role doesn&apos;t have access) than a problem with the system
              itself.
            </p>
          </section>
        </TrainingArticle>
      </Layout>
    </ProtectedRoute>
  )
}
