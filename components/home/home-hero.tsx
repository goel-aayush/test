import { Phone, ShieldCheck, MapPin, CheckCircle2 } from 'lucide-react'
import { Container } from '@/components/container'
import { CtaButton } from '@/components/cta-button'
import { site, whatsappLink, type SiteSettings } from '@/lib/site'
import { getBackendImageUrl } from '@/lib/utils'
import { SafeImage } from '@/components/safe-image'

const points = ['Government-aligned curriculum', 'Hands-on lab training', 'Placement assistance']

export function HomeHero({ settings }: { settings?: SiteSettings }) {
  const currentSite = settings || site

  return (
    <section className="relative overflow-hidden bg-brand-dark text-white">
      <Container className="grid items-center gap-10 py-12 lg:grid-cols-2 lg:py-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium">
            <MapPin className="size-3.5" aria-hidden="true" />
            Gaya, Bihar &middot; Est. {currentSite.established}
          </span>
          <h1 className="mt-5 text-3xl font-bold text-balance sm:text-4xl lg:text-5xl">
            Launch your healthcare career at {currentSite.name}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-pretty text-white/85">
            {currentSite.tagline || 'Job-focused diploma and certificate courses in lab technology, radiology, physiotherapy and more — taught by experienced faculty with real practical training.'}
          </p>

          <ul className="mt-6 grid gap-2 sm:grid-cols-3">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-2 text-sm text-white/90">
                <CheckCircle2 className="size-4 shrink-0 text-accent" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <CtaButton href="/admission" variant="accent">
              Apply Now
            </CtaButton>
            <a
              href={currentSite.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/20"
            >
              <Phone className="size-4" aria-hidden="true" /> Talk to a Counsellor
            </a>
          </div>

          <p className="mt-5 flex items-center gap-2 text-xs text-white/70">
            <ShieldCheck className="size-4 text-accent" aria-hidden="true" />
            Trusted by 1,200+ students and families across Bihar.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl border border-white/15 shadow-2xl">
            <SafeImage
              src={getBackendImageUrl('/uploads/general/hero-campus.png')}
              alt="Paramedical students training in the ARPI medical laboratory"
              width={720}
              height={560}
              priority
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-4 left-4 right-4 rounded-xl border border-border bg-card p-4 text-foreground shadow-lg sm:left-6 sm:right-auto sm:w-64">
            <p className="text-xs font-medium text-muted-foreground">Admissions 2026–27</p>
            <p className="mt-1 text-sm font-semibold text-foreground">
              Limited seats open. Enquire today.
            </p>
            <a
              href={whatsappLink(`Hi ${currentSite.shortName}, I want 2026-27 admission details.`, currentSite)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm font-semibold text-primary hover:underline"
            >
              Get details &rarr;
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}
