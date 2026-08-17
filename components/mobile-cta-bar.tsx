import { Phone, MessageCircle } from 'lucide-react'
import { site, whatsappLink, type SiteSettings } from '@/lib/site'

export function MobileCtaBar({ settings }: { settings?: SiteSettings }) {
  const currentSite = settings || site

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-border bg-background md:hidden">
      <a
        href={currentSite.phoneHref}
        className="flex items-center justify-center gap-2 border-r border-border py-3.5 text-sm font-semibold text-primary"
      >
        <Phone className="size-4" aria-hidden="true" /> Call
      </a>
      <a
        href={whatsappLink(`Hi ${currentSite.shortName}, I want admission details.`, currentSite)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-accent py-3.5 text-sm font-semibold text-accent-foreground"
      >
        <MessageCircle className="size-4" aria-hidden="true" /> WhatsApp
      </a>
    </div>
  )
}
