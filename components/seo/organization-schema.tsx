import { site, type SiteSettings } from '@/lib/site'

export function OrganizationSchema({ settings }: { settings?: SiteSettings }) {
  const currentSite = settings || site
  const data = {
    '@context': 'https://schema.org',
    '@type': ['EducationalOrganization', 'LocalBusiness'],
    name: currentSite.name,
    alternateName: currentSite.shortName,
    url: 'https://alokranjanparamedicalinstitute.in',
    telephone: currentSite.phone,
    email: currentSite.email,
    foundingDate: currentSite.established,
    address: {
      '@type': 'PostalAddress',
      streetAddress: currentSite.address.line1,
      addressLocality: currentSite.address.city,
      addressRegion: currentSite.address.state,
      postalCode: currentSite.address.postalCode,
      addressCountry: currentSite.address.country || 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: currentSite.geo?.lat || 24.7955,
      longitude: currentSite.geo?.lng || 85.0002,
    },
    openingHours: 'Mo-Sa 09:00-18:00',
    areaServed: 'Gaya, Bihar',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
