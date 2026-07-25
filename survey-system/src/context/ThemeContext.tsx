'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { Toaster } from 'sonner'

export type Theme = 'dark' | 'light'

const THEME_STORAGE_KEY = 'ttdp-theme'

interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  toggleTheme: () => {},
})

/**
 * Theme state for the internal app. Dark is the default; 'light' is persisted
 * in localStorage and applied as data-theme="light" on <html>, which drives
 * the --tt-* token overrides in globals.css.
 *
 * The attribute is set BEFORE first paint by the inline script in
 * app/layout.tsx, so initial state is read back from the DOM (never from
 * localStorage here) to stay consistent with what is already rendered.
 * Public customer pages are unaffected: they are wrapped in .theme-native,
 * which pins every token to its dark-theme (original) value.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document !== 'undefined' && document.documentElement.dataset.theme === 'light') {
      return 'light'
    }
    return 'dark'
  })

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.dataset.theme = 'light'
    } else {
      delete document.documentElement.dataset.theme
    }
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      // Storage unavailable (private mode) — theme still applies this session.
    }
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
      <Toaster richColors position="top-right" theme={theme} />
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
