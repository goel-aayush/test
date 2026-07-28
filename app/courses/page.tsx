import type { Metadata } from 'next'
import { Container } from '@/components/container'
import { PageHero } from '@/components/page-hero'
import { CourseCard } from '@/components/course-card'
import { CtaButton } from '@/components/cta-button'
import { courses } from '@/lib/courses'

export const metadata: Metadata = {
  title: 'Paramedical Courses in Gaya, Bihar',
  description:
    'Explore diploma and certificate paramedical courses at ARPI Gaya — Medical Lab Technician, X-Ray Technician, OT Assistant, Physiotherapy, Medical Dresser and Health Sanitary Inspector.',
  alternates: { canonical: '/courses' },
}

export default function CoursesPage() {
  return (
    <>
      <PageHero
        title="Our Paramedical Courses"
        description="Choose from six job-focused diploma and certificate programs. Each course combines classroom teaching with hands-on practical training."
        crumbs={[{ label: 'Courses' }]}
      />
      <section className="py-14 sm:py-16">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-border bg-secondary p-8 text-center">
            <h2 className="text-xl font-bold text-brand-dark sm:text-2xl">
              Not sure which course is right for you?
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
              Our admission counsellors will help you pick a course based on your qualification and
              career goals.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <CtaButton href="/contact">Get free guidance</CtaButton>
              <CtaButton href="/admission" variant="outline">
                Admission process
              </CtaButton>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
