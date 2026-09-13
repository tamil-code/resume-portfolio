import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { flushSync } from "react-dom"

type Theme = "dark" | "light" | "system"
type ResolvedTheme = "dark" | "light"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeOrigin = {
  x: number
  y: number
}

type ThemeProviderState = {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
  toggleTheme: (origin?: ThemeOrigin) => void
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined)

function readSystemTheme(): ResolvedTheme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function resolveTheme(theme: Theme): ResolvedTheme {
  if (theme === "system") return readSystemTheme()
  return theme
}

function applyDomTheme(resolved: ResolvedTheme) {
  const root = window.document.documentElement
  root.classList.remove("light", "dark")
  root.classList.add(resolved)
}

function setRevealOrigin(origin?: ThemeOrigin) {
  const root = window.document.documentElement
  const x = origin?.x ?? window.innerWidth - 36
  const y = origin?.y ?? 36
  const maxX = Math.max(x, window.innerWidth - x)
  const maxY = Math.max(y, window.innerHeight - y)
  const radius = Math.hypot(maxX, maxY) * 1.15
  root.style.setProperty("--vt-x", `${x}px`)
  root.style.setProperty("--vt-y", `${y}px`)
  root.style.setProperty("--vt-r", `${radius}px`)
}

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "vite-ui-theme",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  )

  const resolvedTheme = useMemo(() => resolveTheme(theme), [theme])

  useEffect(() => {
    applyDomTheme(resolvedTheme)
  }, [resolvedTheme])

  const commitTheme = (next: Theme) => {
    localStorage.setItem(storageKey, next)
    applyDomTheme(resolveTheme(next))
    setThemeState(next)
  }

  const toggleTheme = (origin?: ThemeOrigin) => {
    const next: Theme = resolvedTheme === "dark" ? "light" : "dark"
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const startViewTransition = document.startViewTransition?.bind(document)

    if (reduced || !startViewTransition) {
      commitTheme(next)
      return
    }

    setRevealOrigin(origin)
    startViewTransition(() => {
      flushSync(() => {
        commitTheme(next)
      })
    })
  }

  const value: ThemeProviderState = {
    theme,
    resolvedTheme,
    setTheme: commitTheme,
    toggleTheme,
  }

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  return context
}
