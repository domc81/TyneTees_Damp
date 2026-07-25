/**
 * Customer-facing report pages (and the staff Customer Preview, which must
 * show the exact customer rendering) are theme-pinned: `.theme-native`
 * resets every theme token to its original (dark-theme) value, so the page
 * renders identically whether or not the viewing browser has the staff
 * light theme set (globals.css — Theme tokens). Do not remove this wrapper.
 */
export default function ReportPublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="theme-native">{children}</div>
}
