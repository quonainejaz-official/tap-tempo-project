"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "taptempo-theme",
}: {
  children: React.ReactNode
  defaultTheme?: string
  storageKey?: string
}) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={defaultTheme}
      storageKey={storageKey}
      enableSystem={false}
    >
      {children}
    </NextThemesProvider>
  )
}
