import type { Metadata } from 'next'
import Image from 'next/image'
import { Container, Section } from '@/components/container'
import { PageHero } from '@/components/page-hero'
import { Tabs } from '@/components/tabs'
import { faculty, nonTeaching } from '@/lib/content'
import { UserCheck, GraduationCap, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Faculty & Support Staff',
  description:
    'Meet the experienced doctors, lecturers and administrative team at Alok Ranjan Paramedical Institute (ARPI), Gaya.',
  alternates: { canonical: '/faculty' },
}

export default function FacultyPage() {
  const tabs = [
    {
      id: 'teaching',
      label: 'Teaching Faculty',
      content: (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {faculty.map((member) => (
            <div key={member.name} className="overflow-hidden rounded-xl border border-border bg-card shadow-xs">
              <div className="relative aspect-4/3 w-full bg-muted">
                <Image
                  src={member.image}
                  alt={`${member.name} - ${member.role}`}
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-foreground text-lg">{member.name}</h3>
                <p className="text-sm font-medium text-primary mt-0.5">{member.role}</p>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed flex items-start gap-1.5">
                  <GraduationCap className="size-4 shrink-0 text-muted-foreground/70" />
                  {member.qualification}
                </p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'non-teaching',
      label: 'Support & Admin Staff',
      content: (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {nonTeaching.map((staff) => (
            <div key={staff.name} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                <UserCheck className="size-5" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{staff.name}</h4>
                <p className="text-xs text-muted-foreground">{staff.role}</p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ]

  return (
    <>
      <PageHero
        title="Our Faculty & Leadership"
        description="Guided by experienced doctors, senior technologists and dedicated administrators committed to healthcare education."
        crumbs={[{ label: 'Faculty' }]}
      />

      <Section>
        <Container>
          <div className="mb-10 max-w-2xl">
            <span className="text-xs font-semibold tracking-wider text-primary uppercase">Experienced Educators</span>
            <h2 className="mt-1 text-2xl font-bold text-foreground sm:text-3xl">Learn from Healthcare Professionals</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Our faculty members bring decades of clinical and academic experience, ensuring students receive practical insights beyond textbook theory.
            </p>
          </div>
          <Tabs items={tabs} />
        </Container>
      </Section>
    </>
  )
}
