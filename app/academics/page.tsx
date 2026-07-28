import type { Metadata } from 'next'
import { Container, Section, SectionHeading } from '@/components/container'
import { PageHero } from '@/components/page-hero'
import { CtaButton } from '@/components/cta-button'
import { BookOpen, Calendar, Award, FileCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Academics & Curriculum',
  description:
    'Explore the academic structure, exam patterns, clinical rotation system, and practical curriculum at Alok Ranjan Paramedical Institute, Gaya.',
  alternates: { canonical: '/academics' },
}

const highlights = [
  {
    icon: BookOpen,
    title: 'Practical-First Curriculum',
    description: '70% practical exposure in fully functional diagnostic labs, radiology units, and simulated OTs.',
  },
  {
    icon: Calendar,
    title: 'Structured Semester System',
    description: 'Bi-annual exams with regular internal evaluations, weekly viva, and practical assessments.',
  },
  {
    icon: Award,
    title: 'Government-Aligned Norms',
    description: 'Syllabus designed in accordance with standard paramedical council frameworks.',
  },
  {
    icon: FileCheck,
    title: 'Clinical Rotations',
    description: 'Hands-on hospital attachments and diagnostic center internships before course completion.',
  },
]

const academicCalendar = [
  { term: 'Admission & Orientation', period: 'July – August', details: 'Student registration, document verification, induction program' },
  { term: 'First Semester Classes', period: 'September – December', details: 'Core theory modules, basic anatomy, physiology & lab safety' },
  { term: 'Mid-Term Practicals', period: 'January', details: 'Internal practical evaluation & lab viva' },
  { term: 'Second Semester & Rotations', period: 'February – May', details: 'Advanced subject specialization & hospital training' },
  { term: 'Final Examinations', period: 'June', details: 'Annual theory & practical board examinations' },
]

export default function AcademicsPage() {
  return (
    <>
      <PageHero
        title="Academics & Practical Curriculum"
        description="Combining rigorous medical fundamentals with real-world clinical experience so every student is job-ready."
        crumbs={[{ label: 'Academics' }]}
      />

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Academic Excellence"
            title="How We Train Paramedical Professionals"
            description="Our academic framework is structured to turn high-school graduates into competent healthcare technicians."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-card p-6 shadow-xs">
                <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <item.icon className="size-6" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-muted/40">
        <Container>
          <SectionHeading
            eyebrow="Schedule"
            title="Academic Calendar (2026–27)"
            description="A well-organized academic schedule ensures timely syllabus completion and ample revision."
          />
          <div className="mt-8 overflow-hidden rounded-xl border border-border bg-card">
            <div className="divide-y divide-border">
              {academicCalendar.map((item) => (
                <div key={item.term} className="grid p-4 sm:grid-cols-[200px_160px_1fr] sm:p-5 items-center gap-3">
                  <div className="font-semibold text-foreground">{item.term}</div>
                  <div className="text-sm font-medium text-primary">{item.period}</div>
                  <div className="text-sm text-muted-foreground">{item.details}</div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="rounded-2xl bg-brand-dark p-8 text-white text-center sm:p-12">
            <h2 className="text-2xl font-bold sm:text-3xl">Want to know more about our syllabus?</h2>
            <p className="mt-3 text-white/80 max-w-xl mx-auto text-pretty">
              Download our detailed prospectus or speak directly with our academic advisor for course details.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <CtaButton href="/admission" variant="accent">
                Apply for Admission
              </CtaButton>
              <CtaButton href="/contact" variant="ghost-light">
                Contact Academic Cell
              </CtaButton>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
