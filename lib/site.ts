export interface SiteAddress {
  line1: string
  line2?: string
  city: string
  state: string
  postalCode: string
  country?: string
}

export interface SiteSocial {
  facebook?: string
  instagram?: string
  youtube?: string
  twitter?: string
  linkedin?: string
}

export interface SiteStat {
  icon: string
  value: string
  label: string
  _id?: string
}

export interface SiteSettings {
  _id?: string
  name: string
  shortName: string
  unit: string
  established: string
  tagline: string
  phone: string
  phoneHref: string
  whatsapp: string
  whatsappHref: string
  email: string
  emailHref: string
  address: SiteAddress
  addressFull: string
  geo: { lat: number; lng: number }
  officeHours: string
  mapEmbed: string
  social: SiteSocial
  stats?: SiteStat[]
}

export const defaultSite: SiteSettings = {
  name: 'Alok Ranjan Paramedical Institute',
  shortName: 'ARPI',
  unit: 'A unit of Digmani Education',
  established: '2021',
  tagline: 'Building healthcare careers in Gaya, Bihar',
  phone: '9341490285',
  phoneHref: 'tel:9341490285',
  whatsapp: '9341490285',
  whatsappHref: 'https://wa.me/919341490285',
  email: 'arpi.gaya.bihar@gmail.com',
  emailHref: 'mailto:arpi.gaya.bihar@gmail.com',
  address: {
    line1: 'ARPI Campus, Near Gaya College',
    line2: 'Gaya, Bihar 823001',
    city: 'Gaya',
    state: 'Bihar',
    postalCode: '823001',
    country: 'IN',
  },
  addressFull: 'ARPI Campus, Near Gaya College, Gaya, Bihar 823001',
  geo: { lat: 24.7955, lng: 85.0002 },
  officeHours: 'Mon–Sat, 9:00 AM – 6:00 PM',
  mapEmbed:
    'https://www.google.com/maps?q=Gaya,Bihar&output=embed',
  social: {
    facebook: '#',
    instagram: '#',
    youtube: '#',
  },
}

export const site = defaultSite

export function formatSiteSettings(data?: any): SiteSettings {
  if (!data) return defaultSite

  const phone = data.phone || defaultSite.phone
  const cleanPhone = (phone || '').replace(/[^0-9+]/g, '')
  const phoneHref = `tel:${cleanPhone}`

  const whatsapp = data.whatsapp || defaultSite.whatsapp
  let cleanWa = (whatsapp || '').replace(/[^0-9]/g, '')
  if (cleanWa.length === 10) {
    cleanWa = `91${cleanWa}`
  }
  const whatsappHref = cleanWa ? `https://wa.me/${cleanWa}` : defaultSite.whatsappHref

  const email = data.email || defaultSite.email
  const emailHref = `mailto:${email}`

  const line1 = data.address?.line1 || defaultSite.address.line1
  const line2 = data.address?.line2 || ''
  const city = data.address?.city || defaultSite.address.city
  const state = data.address?.state || defaultSite.address.state
  const postalCode = data.address?.postalCode || defaultSite.address.postalCode
  const country = data.address?.country || defaultSite.address.country || 'IN'

  const addressFull = [line1, line2, `${city}, ${state} ${postalCode}`]
    .filter(Boolean)
    .join(', ')

  return {
    _id: data._id,
    name: data.name || defaultSite.name,
    shortName: data.shortName || defaultSite.shortName,
    unit: data.unit || defaultSite.unit,
    established: data.established || defaultSite.established,
    tagline: data.tagline || defaultSite.tagline,
    phone,
    phoneHref,
    whatsapp,
    whatsappHref,
    email,
    emailHref,
    address: {
      line1,
      line2,
      city,
      state,
      postalCode,
      country,
    },
    addressFull,
    geo: data.geo || defaultSite.geo,
    officeHours: data.officeHours || defaultSite.officeHours,
    mapEmbed: data.mapEmbedUrl || data.mapEmbed || defaultSite.mapEmbed,
    social: {
      ...defaultSite.social,
      ...(data.social || {}),
    },
    stats: data.stats || defaultSite.stats,
  }
}

export function whatsappLink(message: string, settings?: SiteSettings) {
  const base = settings?.whatsappHref || site.whatsappHref
  return `${base}?text=${encodeURIComponent(message)}`
}

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Courses', href: '/courses' },
  { label: 'Admission', href: '/admission' },
  { label: 'Academics', href: '/academics' },
  { label: 'Notices', href: '/notices' },
  { label: 'Faculty', href: '/faculty' },
  { label: 'Facilities', href: '/facilities' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Scholarship', href: '/scholarship' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]
