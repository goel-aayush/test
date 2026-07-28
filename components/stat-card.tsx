import type { LucideIcon } from 'lucide-react'

export function StatCard({
  icon: Icon,
  value,
  label,
}: {
  icon: LucideIcon
  value: string
  label: string
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 text-center">
      <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-secondary text-primary">
        <Icon className="size-6" aria-hidden="true" />
      </span>
      <p className="mt-3 text-3xl font-bold text-brand-dark">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  )
}
