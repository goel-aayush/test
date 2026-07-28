import type { Metadata } from 'next'
import Image from 'next/image'
import { Container, Section, SectionHeading } from '@/components/container'
import { PageHero } from '@/components/page-hero'
import { gallery } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Photo & Video Gallery',
  description:
    'Browse photos of ARPI Gaya campus, laboratory practical sessions, student events, and clinical training sessions.',
  alternates: { canonical: '/gallery' },
}

export default function GalleryPage() {
  return (
    <>
      <PageHero
        title="Institute Gallery"
        description="Take a visual tour of our campus, practical labs, student activities and events."
        crumbs={[{ label: 'Gallery' }]}
      />

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Campus Highlights"
            title="Life & Learning at ARPI"
            description="Real moments from our practical sessions, campus infrastructure and student events."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((item, index) => (
              <div
                key={index}
                className="group relative aspect-4/3 overflow-hidden rounded-xl border border-border bg-muted shadow-xs transition-shadow hover:shadow-md"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-4">
                  <p className="text-sm font-medium text-white">{item.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
