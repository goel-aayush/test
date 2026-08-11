import type { Metadata } from 'next'
import { Container, Section, SectionHeading } from '@/components/container'
import { PageHero } from '@/components/page-hero'
import { getNoticesFromAPI } from '@/lib/api'
import { getBackendImageUrl } from '@/lib/utils'
import { NoticeListClient } from './notice-list-client'

export const metadata: Metadata = {
  title: 'Notices & Official Circulars',
  description:
    'Stay updated with official examination schedules, admission notices, holiday circulars and PDF downloads from Alok Ranjan Paramedical Institute, Gaya.',
  alternates: { canonical: '/notices' },
}

export default async function NoticesPage() {
  const noticesList = (await getNoticesFromAPI()) || []

  return (
    <>
      <PageHero
        title="Notices & Official Circulars"
        description="Official academic announcements, examination schedules, admission alerts and downloadable PDF notices."
        crumbs={[{ label: 'Notices' }]}
      />

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Latest Updates"
            title="Institute Notices & Downloads"
            description="Browse circulars by category or download official PDF notice documents."
          />

          <div className="mt-10">
            <NoticeListClient initialNotices={noticesList} />
          </div>
        </Container>
      </Section>
    </>
  )
}
