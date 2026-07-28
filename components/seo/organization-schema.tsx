import { site } from '@/lib/site'

export function OrganizationSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': ['EducationalOrganization', 'LocalBusiness'],
    name: site.name,
    alternateName: site.shortName,
    url: 'https://alokranjanparamedicalinstitute.in',
    telephone: site.phone,
    email: site.email,
    foundingDate: site.established,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.line1,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.lat,
      longitude: site.geo.lng,
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
