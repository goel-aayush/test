import Image from 'next/image'
import {
  CalendarDays,
  BookOpen,
  Users,
  Briefcase,
  ClipboardList,
  PhoneCall,
  FileCheck2,
  GraduationCap,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import { Container, SectionHeading } from '@/components/container'
import { HomeHero } from '@/components/home/home-hero'
import { NoticesTicker } from '@/components/notices-ticker'
import { CourseCard } from '@/components/course-card'
import { StatCard } from '@/components/stat-card'
import { TestimonialCard } from '@/components/testimonial-card'
import { CtaButton } from '@/components/cta-button'
import { courses } from '@/lib/courses'
import { testimonials, stats } from '@/lib/content'

const statIcons: Record<string, LucideIcon> = {
  CalendarDays,
  BookOpen,
  Users,
  Briefcase,
}

const steps = [
  {
    icon: PhoneCall,
    title: 'Enquire',
    text: 'Call, WhatsApp or fill the enquiry form. Our counsellor helps you choose the right course.',
  },
  {
    icon: FileCheck2,
    title: 'Submit Documents',
    text: 'Provide your marksheet, ID proof and photos to confirm eligibility.',
  },
  {
    icon: ClipboardList,
    title: 'Confirm Admission',
    text: 'Complete the admission formalities and fee process to reserve your seat.',
  },
  {
    icon: GraduationCap,
    title: 'Start Learning',
    text: 'Begin classes with hands-on training and step towards your healthcare career.',
  },
]

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <NoticesTicker />

      {/* Stats */}
      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((s) => (
              <StatCard
                key={s.label}
                icon={statIcons[s.icon] ?? Users}
                value={s.value}
                label={s.label}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Why ARPI */}
      <section className="bg-muted py-14 sm:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-border">
            <Image
              src="/images/students-group.png"
              alt="ARPI paramedical students together on campus"
              width={640}
              height={480}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <SectionHeading
              align="left"
              eyebrow="Why ARPI"
              title="A trusted place to build a paramedical career"
              description="We focus on practical, job-ready skills — not just theory. Small batches, experienced faculty and real lab exposure help students from Gaya and nearby regions succeed."
            />
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                'Experienced medical faculty',
                'Fully equipped practical labs',
                'Placement & career guidance',
                'Affordable fees & scholarships',
                'Hostel & transport facilities',
                'Recognised course curriculum',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-foreground/90">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-7">
              <CtaButton href="/about" variant="outline">
                More about us
                <ArrowRight className="size-4" aria-hidden="true" />
              </CtaButton>
            </div>
          </div>
        </Container>
      </section>

      {/* Courses */}
      <section className="py-14 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Our Courses"
            title="Paramedical courses that lead to real jobs"
            description="Diploma and certificate programs designed around healthcare hiring needs in Bihar and beyond."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <CtaButton href="/courses">View all courses</CtaButton>
          </div>
        </Container>
      </section>

      {/* Admission process */}
      <section className="bg-brand-dark py-14 text-white sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Simple Process"
            title="Admission in 4 easy steps"
            description="Getting started at ARPI is straightforward. Here's how."
            className="[&_h2]:text-white [&_p]:text-white/80"
          />
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="relative rounded-xl border border-white/15 bg-white/5 p-6"
              >
                <span className="flex size-11 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <step.icon className="size-5" aria-hidden="true" />
                </span>
                <span className="absolute right-5 top-5 text-2xl font-bold text-white/15">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-semibold text-white">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/75">{step.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 text-center">
            <CtaButton href="/admission" variant="accent">
              Start your application
            </CtaButton>
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-14 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Student Voices"
            title="What our students say"
            description="Real stories from students who trained at ARPI and started their careers."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
