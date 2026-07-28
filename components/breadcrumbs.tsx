import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export type Crumb = { label: string; href?: string }

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ label: 'Home', href: '/' }, ...items]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: c.href ? `https://alokranjanparamedicalinstitute.in${c.href}` : undefined,
    })),
  }

  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex flex-wrap items-center gap-1.5 text-white/80">
        {all.map((c, i) => (
          <li key={c.label} className="flex items-center gap-1.5">
            {c.href && i < all.length - 1 ? (
              <Link href={c.href} className="hover:text-white">
                {c.label}
              </Link>
            ) : (
              <span className="text-white" aria-current="page">
                {c.label}
              </span>
            )}
            {i < all.length - 1 ? (
              <ChevronRight className="size-3.5 opacity-60" aria-hidden="true" />
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  )
}
