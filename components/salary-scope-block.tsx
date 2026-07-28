import { Wallet, Briefcase, Building2, TrendingUp, Info } from 'lucide-react'
import type { Course } from '@/lib/courses'
import { formatSalaryRange } from '@/lib/courses'

export function SalaryScopeBlock({ course }: { course: Course }) {
  const { careerScope, salaryRange } = course

  return (
    <section aria-labelledby="salary-scope-heading" className="mt-10">
      <h2 id="salary-scope-heading" className="text-xl font-bold text-foreground">
        Salary &amp; Career Scope
      </h2>

      {/* Salary range — visually scannable, up top */}
      <div className="mt-4 rounded-xl border border-primary/20 bg-secondary p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Wallet className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Estimated starting salary
              </p>
              <p className="text-2xl font-bold text-foreground">
                {formatSalaryRange(salaryRange)}
              </p>
            </div>
          </div>
        </div>
        <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
          <Info className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
          {salaryRange.note}
        </p>
      </div>

      {/* Career scope details */}
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2">
            <Briefcase className="size-4 text-primary" aria-hidden="true" />
            <h3 className="text-sm font-semibold text-foreground">Job roles you qualify for</h3>
          </div>
          <ul className="mt-3 space-y-2">
            {careerScope.roles.map((role) => (
              <li key={role} className="flex items-start gap-2 text-sm text-foreground/90">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                {role}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2">
            <Building2 className="size-4 text-primary" aria-hidden="true" />
            <h3 className="text-sm font-semibold text-foreground">Where graduates get hired</h3>
          </div>
          <ul className="mt-3 space-y-2">
            {careerScope.employers.map((employer) => (
              <li key={employer} className="flex items-start gap-2 text-sm text-foreground/90">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                {employer}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5 flex items-start gap-3 rounded-xl border border-border bg-muted p-5">
        <TrendingUp className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
        <div>
          <h3 className="text-sm font-semibold text-foreground">Growth path</h3>
          <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
            {careerScope.growthPath}
          </p>
        </div>
      </div>
    </section>
  )
}
