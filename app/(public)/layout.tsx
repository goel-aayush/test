import React from 'react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { MobileCtaBar } from '@/components/mobile-cta-bar'
import { OrganizationSchema } from '@/components/seo/organization-schema'
import { getSettingsFromAPI } from '@/lib/api'

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const settings = await getSettingsFromAPI()

  return (
    <>
      <OrganizationSchema settings={settings} />
      <SiteHeader settings={settings} />
      <main className="min-h-screen pb-16 md:pb-0">{children}</main>
      <SiteFooter settings={settings} />
      <MobileCtaBar settings={settings} />
    </>
  )
}
