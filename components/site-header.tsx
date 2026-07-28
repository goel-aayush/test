'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Phone, MessageCircle, HeartPulse } from 'lucide-react'
import { cn } from '@/lib/utils'
import { site, nav, whatsappLink } from '@/lib/site'
import { Container } from '@/components/container'

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      {/* Top utility bar */}
      <div className="hidden bg-brand-dark text-white md:block">
        <Container className="flex h-9 items-center justify-between text-xs">
          <p className="opacity-90">{site.addressFull}</p>
          <div className="flex items-center gap-4">
            <a href={site.phoneHref} className="flex items-center gap-1.5 hover:opacity-80">
              <Phone className="size-3.5" aria-hidden="true" />
              {site.phone}
            </a>
            <span className="opacity-90">{site.officeHours}</span>
          </div>
        </Container>
      </div>

      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name} home`}>
          <span className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <HeartPulse className="size-6" aria-hidden="true" />
          </span>
          <span className="leading-tight">
            <span className="block text-base font-bold text-brand-dark">{site.shortName}</span>
            <span className="block text-[11px] text-muted-foreground">
              Alok Ranjan Paramedical Institute
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive(item.href)
                  ? 'text-primary'
                  : 'text-foreground/70 hover:bg-muted hover:text-foreground',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappLink(`Hi ${site.shortName}, I want to know about admissions.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:brightness-95 sm:inline-flex"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            Apply Now
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-foreground lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      {open ? (
        <div className="border-t border-border bg-background lg:hidden">
          <Container className="py-3">
            <nav className="grid gap-1" aria-label="Mobile">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'rounded-md px-3 py-2.5 text-sm font-medium',
                    isActive(item.href)
                      ? 'bg-secondary text-primary'
                      : 'text-foreground/80 hover:bg-muted',
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  )
}
