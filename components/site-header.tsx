'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Phone, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { site, nav, whatsappLink } from '@/lib/site'
import { Container } from '@/components/container'
import { ThemeToggle } from '@/components/theme-toggle'

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

      <Container className="max-w-[1400px] flex h-16 items-center justify-between gap-2">
        <Link href="/" className="flex items-center gap-3 shrink-0 py-1" aria-label={`${site.name} home`}>
          <Image
            src="/icon.svg"
            alt="Alok Ranjan Paramedical Institute Logo"
            width={48}
            height={48}
            className="size-11 shrink-0 object-contain"
            priority
          />
          <div className="leading-tight">
            <span className="block text-base font-extrabold tracking-tight text-[#0E4B75] dark:text-[#38BDF8]">
              Alok Ranjan
            </span>
            <span className="block text-xs font-bold text-[#EF7218] dark:text-[#F59E0B] whitespace-nowrap">
              Paramedical Institute
            </span>
            <span className="block text-[10px] font-semibold text-[#C0392B] dark:text-[#F87171] whitespace-nowrap">
              {site.unit}
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'rounded-md px-2 py-1.5 text-xs font-medium transition-colors 2xl:px-3 2xl:text-sm',
                isActive(item.href)
                  ? 'text-primary font-bold'
                  : 'text-foreground/70 hover:bg-muted hover:text-foreground',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={whatsappLink(`Hi ${site.shortName}, I want to know about admissions.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 whitespace-nowrap rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:brightness-95 sm:inline-flex"
          >
            <MessageCircle className="size-4 shrink-0" aria-hidden="true" />
            <span>Apply Now</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-foreground xl:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      {open ? (
        <div className="border-t border-border bg-background xl:hidden">
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
