import { Container } from '@/components/container'
import { Breadcrumbs, type Crumb } from '@/components/breadcrumbs'

export function PageHero({
  title,
  description,
  eyebrow,
  crumbs,
}: {
  title: string
  description?: string
  eyebrow?: string
  crumbs?: Crumb[]
}) {
  return (
    <section className="bg-brand-dark py-10 sm:py-14 text-white">
      <Container>
        {crumbs && crumbs.length > 0 ? <Breadcrumbs items={crumbs} /> : null}
        {eyebrow ? (
          <p className="text-sm font-semibold tracking-wider text-accent uppercase mb-2">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-3xl font-bold text-balance sm:text-4xl">{title}</h1>
        {description ? (
          <p className="mt-3 max-w-2xl leading-relaxed text-pretty text-white/80">{description}</p>
        ) : null}
      </Container>
    </section>
  )
}

