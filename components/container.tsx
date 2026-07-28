import { cn } from '@/lib/utils'

export function Container({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return <div className={cn('mx-auto w-full max-w-6xl px-4 sm:px-6', className)}>{children}</div>
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  align?: 'center' | 'left'
  className?: string
}) {
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-2 text-sm font-semibold tracking-wide text-primary uppercase">{eyebrow}</p>
      ) : null}
      <h2 className="text-2xl font-bold text-balance text-brand-dark sm:text-3xl">{title}</h2>
      {description ? (
        <p className="mt-3 leading-relaxed text-pretty text-muted-foreground">{description}</p>
      ) : null}
    </div>
  )
}

export function Section({
  className,
  children,
  id,
}: {
  className?: string
  children: React.ReactNode
  id?: string
}) {
  return (
    <section id={id} className={cn('py-12 sm:py-16', className)}>
      {children}
    </section>
  )
}

