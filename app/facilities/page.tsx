import type { Metadata } from 'next'
import Image from 'next/image'
import { Container, Section, SectionHeading } from '@/components/container'
import { PageHero } from '@/components/page-hero'
import { facilities } from '@/lib/content'
import { CtaButton } from '@/components/cta-button'

export const metadata: Metadata = {
  title: 'Campus & Facilities',
  description:
    'Explore the campus infrastructure at ARPI Gaya — medical labs, radiology unit, hostel, library, transport and smart classrooms.',
  alternates: { canonical: '/facilities' },
}

export default function FacilitiesPage() {
  return (
    <>
      <PageHero
        title="Campus Infrastructure & Facilities"
        description="Designed to support interactive learning, practical clinical training, and a comfortable student life."
        crumbs={[{ label: 'Facilities' }]}
      />

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Modern Learning Environment"
            title="Everything You Need for Effective Training"
            description="Our campus features modern diagnostic equipment, well-stocked library resources, and secure student accommodations."
          />

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((f) => (
              <div key={f.title} className="group overflow-hidden rounded-xl border border-border bg-card shadow-xs transition-shadow hover:shadow-md">
                <div className="relative aspect-16/10 w-full overflow-hidden bg-muted">
                  <Image
                    src={f.image}
                    alt={f.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-brand-dark">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-muted/40">
        <Container>
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <span className="text-xs font-semibold tracking-wider text-primary uppercase">Student Life</span>
              <h2 className="mt-2 text-2xl font-bold text-brand-dark sm:text-3xl">Safe Hostel & Campus Environment</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                We understand that coming from nearby districts and rural regions requires safe, hygienic living conditions. Our hostels provide 24/7 security, nutritious mess meals, clean drinking water, and quiet study areas.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <CtaButton href="/contact">Book Campus Visit</CtaButton>
                <CtaButton href="/admission" variant="outline">Admission Details</CtaButton>
              </div>
            </div>
            <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-border">
              <Image
                src="/images/facility-hostel.png"
                alt="ARPI Student Hostel Accommodation"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
