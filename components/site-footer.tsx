import Link from 'next/link'
import { Phone, MessageCircle, Mail, MapPin, HeartPulse } from 'lucide-react'
import { site, nav, whatsappLink } from '@/lib/site'
import { courses } from '@/lib/courses'
import { Container } from '@/components/container'

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-brand-dark text-white">
      {/* CTA band */}
      <div className="border-b border-white/10 bg-primary">
        <Container className="flex flex-col items-center justify-between gap-4 py-8 text-center md:flex-row md:text-left">
          <div>
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              Ready to start your healthcare career?
            </h2>
            <p className="mt-1 text-sm text-white/85">
              Talk to our admission counsellor today. We respond within 24 hours.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={site.phoneHref}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-primary hover:bg-white/90"
            >
              <Phone className="size-4" aria-hidden="true" /> Call Now
            </a>
            <a
              href={whatsappLink(`Hi ${site.shortName}, I want admission details.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:brightness-95"
            >
              <MessageCircle className="size-4" aria-hidden="true" /> WhatsApp
            </a>
          </div>
        </Container>
      </div>

      <Container className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex size-10 items-center justify-center rounded-lg bg-white/10">
              <HeartPulse className="size-6" aria-hidden="true" />
            </span>
            <span className="font-bold">{site.shortName}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/75">
            {site.name} — training the next generation of paramedical professionals in Gaya, Bihar.
            Established {site.established}.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {nav.slice(0, 6).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Courses</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {courses.map((c) => (
              <li key={c.slug}>
                <Link href={`/courses/${c.slug}`} className="hover:text-white">
                  {c.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/75">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>{site.addressFull}</span>
            </li>
            <li>
              <a href={site.phoneHref} className="flex items-center gap-2.5 hover:text-white">
                <Phone className="size-4 shrink-0" aria-hidden="true" />
                {site.phone}
              </a>
            </li>
            <li>
              <a href={site.emailHref} className="flex items-center gap-2.5 hover:text-white">
                <Mail className="size-4 shrink-0" aria-hidden="true" />
                <span className="break-all">{site.email}</span>
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/60 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>NAAC-aligned curriculum &middot; Gaya, Bihar</p>
        </Container>
      </div>
    </footer>
  )
}
