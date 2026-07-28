import Link from 'next/link'
import { Clock, GraduationCap, ArrowRight } from 'lucide-react'
import type { Course } from '@/lib/courses'
import { CourseIcon } from '@/components/course-icon'

export function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-md"
    >
      <span className="flex size-12 items-center justify-center rounded-lg bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <CourseIcon name={course.icon} />
      </span>
      <h3 className="mt-4 text-lg font-semibold text-brand-dark">{course.shortName}</h3>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{course.tagline}</p>

      <dl className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Clock className="size-3.5 text-primary" aria-hidden="true" />
          <dt className="sr-only">Duration</dt>
          <dd>{course.duration}</dd>
        </div>
        <div className="flex items-center gap-1.5">
          <GraduationCap className="size-3.5 text-primary" aria-hidden="true" />
          <dt className="sr-only">Eligibility</dt>
          <dd>{course.eligibility}</dd>
        </div>
      </dl>

      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
        View Details
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  )
}
