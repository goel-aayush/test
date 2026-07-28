import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { MobileCtaBar } from '@/components/mobile-cta-bar'
import { OrganizationSchema } from '@/components/seo/organization-schema'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://alokranjanparamedicalinstitute.in'),
  title: {
    default: 'Alok Ranjan Paramedical Institute (ARPI) | Paramedical Courses in Gaya, Bihar',
    template: '%s | ARPI Gaya',
  },
  description:
    'Alok Ranjan Paramedical Institute (ARPI) in Gaya, Bihar offers diploma and certificate paramedical courses — Lab Technician, X-Ray Technician, OT Assistant, Physiotherapy and more. Apply for admission today.',
  keywords: [
    'paramedical institute in Gaya',
    'paramedical course Bihar',
    'medical lab technician course Gaya',
    'x-ray technician course Bihar',
    'ARPI Gaya',
  ],
  generator: 'v0.app',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Alok Ranjan Paramedical Institute',
    title: 'Alok Ranjan Paramedical Institute (ARPI) | Gaya, Bihar',
    description:
      'Build a healthcare career with government-aligned paramedical diploma and certificate courses in Gaya, Bihar.',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#0F7A8C',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} bg-background`}>
      <body className="font-sans antialiased">
        <OrganizationSchema />
        <SiteHeader />
        <main className="min-h-screen pb-16 md:pb-0">{children}</main>
        <SiteFooter />
        <MobileCtaBar />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
