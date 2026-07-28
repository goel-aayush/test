import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  Clock,
  GraduationCap,
  IndianRupee,
  Users,
  BadgeCheck,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'
import { Container } from '@/components/container'
import { PageHero } from '@/components/page-hero'
import { CourseIcon } from '@/components/course-icon'
import { CtaButton } from '@/components/cta-button'
import { EnquiryForm } from '@/components/enquiry-form'
import { SalaryScopeBlock } from '@/components/salary-scope-block'
import { RelatedPosts } from '@/components/related-posts'
import { courses, getCourse } from '@/lib/courses'
import { getPostsByCourse } from '@/lib/blog'
import { site } from '@/lib/site'

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const course = getCourse(slug)
  if (!course) return {}
  const title = `${course.name} in Gaya, Bihar`
  return {
    title,
    description: `${course.name} at ARPI Gaya — ${course.duration}, eligibility: ${course.eligibility}. ${course.tagline} Apply for admission.`,
    alternates: { canonical: `/courses/${course.slug}` },
    openGraph: {
      title,
      description: course.tagline,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: title }],
    },
  }
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const course = getCourse(slug)
  if (!course) notFound()

  const related = courses.filter((c) => c.slug !== course.slug).slice(0, 3)
  const relatedPosts = getPostsByCourse(course.slug)

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.name,
    description: course.overview,
    provider: {
      '@type': 'EducationalOrganization',
      name: site.name,
      sameAs: 'https://alokranjanparamedicalinstitute.in',
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.address.line1,
        addressLocality: site.address.city,
        addressRegion: site.address.state,
        postalCode: site.address.postalCode,
        addressCountry: site.address.country,
      },
    },
    educationalCredentialAwarded: course.name,
    timeRequired: course.duration,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'onsite',
      location: {
        '@type': 'Place',
        name: site.name,
        address: {
          '@type': 'PostalAddress',
          addressLocality: site.address.city,
          addressRegion: site.address.state,
          postalCode: site.address.postalCode,
          addressCountry: site.address.country,
        },
      },
    },
  }

  const quickFacts = [
    { icon: Clock, label: 'Duration', value: course.duration },
    { icon: GraduationCap, label: 'Eligibility', value: course.eligibility },
    { icon: IndianRupee, label: 'Fees', value: course.fee },
    { icon: Users, label: 'Intake', value: course.seats },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <PageHero
        title={course.name}
        description={course.tagline}
        crumbs={[{ label: 'Courses', href: '/courses' }, { label: course.shortName }]}
      />

      <section className="py-12 sm:py-16">
        <Container className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <span className="flex size-12 items-center justify-center rounded-lg bg-secondary text-primary">
                <CourseIcon name={course.icon} />
              </span>
              <h2 className="text-xl font-bold text-brand-dark">Course Overview</h2>
            </div>
            <p className="mt-4 leading-relaxed text-foreground/90">{course.overview}</p>

            {/* Quick facts */}
            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              {quickFacts.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card p-4"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                    <f.icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <dt className="text-xs text-muted-foreground">{f.label}</dt>
                    <dd className="text-sm font-semibold text-brand-dark">{f.value}</dd>
                  </div>
                </div>
              ))}
            </dl>

            {/* Curriculum */}
            <div className="mt-10">
              <h2 className="text-xl font-bold text-brand-dark">Curriculum &amp; Subjects</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {course.subjects.map((s) => (
                  <li key={s} className="flex items-start gap-2.5 text-sm text-foreground/90">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Salary & career scope */}
            <SalaryScopeBlock course={course} />

            {/* Recognition */}
            <div className="mt-8 flex items-start gap-3 rounded-xl border border-primary/20 bg-secondary p-5">
              <BadgeCheck className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-brand-dark">Recognition</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{course.recognition}</p>
              </div>
            </div>

            {/* Related blog posts — the course -> blog half of the cross-link */}
            <RelatedPosts posts={relatedPosts} heading="Read more about this career" />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-28">
              <div className="mb-5 rounded-xl border border-border bg-brand-dark p-6 text-white">
                <p className="text-sm text-white/80">Apply for</p>
                <p className="mt-1 font-semibold">{course.shortName}</p>
                <p className="mt-3 text-xs text-white/70">
                  Seats are limited for the current batch. Enquire now to reserve yours.
                </p>
                <CtaButton
                  href="/admission"
                  variant="accent"
                  className="mt-4 w-full"
                >
                  Apply for this course
                </CtaButton>
              </div>
              <EnquiryForm defaultCourse={course.name} />
            </div>
          </aside>
        </Container>
      </section>

      {/* Related courses */}
      <section className="border-t border-border bg-muted py-14">
        <Container>
          <h2 className="text-xl font-bold text-brand-dark">Related courses</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {related.map((c) => (
              <Link
                key={c.slug}
                href={`/courses/${c.slug}`}
                className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-5 hover:border-primary/40 hover:shadow-sm"
              >
                <span className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary">
                    <CourseIcon name={c.icon} className="size-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-brand-dark">
                      {c.shortName}
                    </span>
                    <span className="block text-xs text-muted-foreground">{c.duration}</span>
                  </span>
                </span>
                <ArrowRight
                  className="size-4 text-primary transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
