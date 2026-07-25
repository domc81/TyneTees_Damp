/**
 * Customer-facing quotation pages are theme-pinned: `.theme-native` resets
 * every theme token to its original (dark-theme) value, so the page renders
 * identically whether or not the viewing browser has the staff light theme
 * set (globals.css — Theme tokens). Do not remove this wrapper.
 */
export default function QuotationPublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="theme-native">{children}</div>
}
