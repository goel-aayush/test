import React from 'react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { MobileCtaBar } from '@/components/mobile-cta-bar'
import { OrganizationSchema } from '@/components/seo/organization-schema'

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <OrganizationSchema />
      <SiteHeader />
      <main className="min-h-screen pb-16 md:pb-0">{children}</main>
      <SiteFooter />
      <MobileCtaBar />
    </>
  )
}
