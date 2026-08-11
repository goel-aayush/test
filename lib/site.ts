export const site = {
  name: 'Alok Ranjan Paramedical Institute',
  shortName: 'ARPI',
  unit: 'A unit of Digmani Education',
  established: '2021',
  tagline: 'Building healthcare careers in Gaya, Bihar',
  phone: '+91 90000 00000',
  phoneHref: 'tel:+919000000000',
  whatsapp: '919000000000',
  whatsappHref: 'https://wa.me/919000000000',
  email: 'admissions@alokranjanparamedicalinstitute.in',
  emailHref: 'mailto:admissions@alokranjanparamedicalinstitute.in',
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

export function whatsappLink(message: string) {
  return `${site.whatsappHref}?text=${encodeURIComponent(message)}`
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
