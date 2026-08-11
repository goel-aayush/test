'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  BookOpen,
  GraduationCap,
  FileText,
  PhoneCall,
  ArrowLeft,
  Sparkles,
  Compass,
} from 'lucide-react'
import { Container } from '@/components/container'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export default function NotFound() {
  const pathname = usePathname()

  // If inside /admin, render a minimal 404 that doesn't conflict with admin layout
  if (pathname?.startsWith('/admin')) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center p-8">
        <h1 className="text-6xl font-extrabold text-white/80 mb-4">404</h1>
        <p className="text-slate-400 text-sm mb-6">This admin page could not be found.</p>
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-500 transition"
        >
          <Home className="size-4" />
          Back to Dashboard
        </Link>
      </div>
    )
  }

  const quickLinks = [
    {
      title: 'Explore Courses',
      desc: 'Browse DMLT, X-Ray, OT Assistant & Physiotherapy diplomas.',
      href: '/courses',
      icon: BookOpen,
      color: 'from-sky-500/20 to-blue-500/10 border-sky-500/30 text-sky-400',
    },
    {
      title: 'Admissions 2026–27',
      desc: 'Eligibility criteria, seat matrix & online application process.',
      href: '/admission',
      icon: GraduationCap,
      color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400',
    },
    {
      title: 'Official Notices',
      desc: 'Latest exam schedules, holiday circulars & downloadable PDFs.',
      href: '/notices',
      icon: FileText,
      color: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400',
    },
    {
      title: 'Contact & Support',
      desc: 'Talk to admission counsellors or get campus directions in Gaya.',
      href: '/contact',
      icon: PhoneCall,
      color: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-400',
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />

      <main className="flex-1 py-16 sm:py-24 relative overflow-hidden">
        {/* Glowing Background Radial Orbs */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 size-[600px] -translate-x-1/2 rounded-full bg-primary/15 blur-[140px]" />
        <div className="pointer-events-none absolute top-1/3 left-1/4 -z-10 size-[350px] rounded-full bg-accent/10 blur-[100px]" />

        <Container className="max-w-4xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
            <Sparkles className="size-3.5 animate-pulse" aria-hidden="true" />
            <span>404 Error &middot; Page Lost in Transit</span>
          </div>

          {/* Giant 404 Text */}
          <div className="relative mt-6">
            <h1 className="text-8xl sm:text-9xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground via-foreground/80 to-muted-foreground/30 select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Compass className="size-24 sm:size-32 text-primary/20 animate-spin [animation-duration:30s]" />
            </div>
          </div>

          {/* Heading & Subtitle */}
          <h2 className="mt-4 text-2xl font-bold text-balance sm:text-3xl text-foreground">
            Oops! The page you are looking for doesn&apos;t exist.
          </h2>
          <p className="mt-3 max-w-lg mx-auto text-sm leading-relaxed text-muted-foreground">
            The link might be broken, or the page may have been moved. Don&apos;t worry — explore our popular destinations below to get back on track.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Home className="size-4" aria-hidden="true" />
              <span>Back to Homepage</span>
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-all"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              <span>Browse All Courses</span>
            </Link>
          </div>

          {/* Quick Shortcuts Cards Grid */}
          <div className="mt-14 text-left">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground text-center mb-6">
              Popular Pages & Helpful Links
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {quickLinks.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={`group flex items-start gap-4 rounded-2xl border bg-gradient-to-br ${item.color} p-5 transition-all duration-300 hover:scale-[1.01] hover:shadow-md`}
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-background/80 shadow-xs group-hover:scale-110 transition-transform">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </Container>
      </main>

      <SiteFooter />
    </div>
  )
}
