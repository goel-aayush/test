import Link from 'next/link'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'accent' | 'outline' | 'ghost-light'

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'

const variants: Record<Variant, string> = {
  primary: 'bg-primary text-primary-foreground hover:bg-brand-dark',
  accent: 'bg-accent text-accent-foreground hover:brightness-95 shadow-sm',
  outline: 'border border-border bg-background text-foreground hover:bg-muted',
  'ghost-light': 'border border-white/30 bg-white/10 text-white hover:bg-white/20',
}

export function CtaButton({
  href,
  variant = 'primary',
  className,
  children,
  external,
  ...props
}: {
  href: string
  variant?: Variant
  className?: string
  children: React.ReactNode
  external?: boolean
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const classes = cn(base, variants[variant], className)
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  )
}
