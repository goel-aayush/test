'use client'

import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'
import { cn } from '@/lib/utils'

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className={cn(
          'inline-flex size-10 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-muted',
          className
        )}
      >
        <Sun className="size-4 opacity-0" aria-hidden="true" />
      </button>
    )
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'inline-flex size-10 items-center justify-center rounded-lg border border-border bg-background text-foreground transition-all duration-200 hover:bg-muted hover:text-primary active:scale-95',
        className
      )}
    >
      {isDark ? (
        <Sun className="size-4.5 text-amber-400 transition-transform duration-300 rotate-0 scale-100" aria-hidden="true" />
      ) : (
        <Moon className="size-4.5 text-sky-600 transition-transform duration-300 rotate-0 scale-100" aria-hidden="true" />
      )}
    </button>
  )
}
