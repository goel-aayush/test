import type { Metadata } from 'next'
import { Container, Section, SectionHeading } from '@/components/container'
import { PageHero } from '@/components/page-hero'
import { EnquiryForm } from '@/components/enquiry-form'
import { CheckCircle2, Award, FileText, IndianRupee, HelpCircle } from 'lucide-react'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Scholarships & Fee Support',
  description:
    'Learn about scholarship schemes, fee concessions, and financial support options for paramedical students at ARPI Gaya.',
  alternates: { canonical: '/scholarship' },
}

const scholarshipSchemes = [
  {
    title: 'Merit-Based Scholarship',
    icon: Award,
    description: 'Special fee concessions for high-performing students who achieved 75%+ marks in 10th or 12th board exams.',
  },
  {
    title: 'Category & Reserved Aid',
    icon: FileText,
    description: 'Assistance for SC/ST/OBC and economically weaker section (EWS) candidates as per state welfare guidelines.',
  },
  {
    title: 'Easy Installment Plan',
    icon: IndianRupee,
    description: 'Flexible semester-wise and monthly fee payment plans to reduce financial burden on families.',
  },
]

export default function ScholarshipPage() {
  return (
    <>
      <PageHero
        title="Scholarships & Financial Assistance"
        description="We believe financial constraints should never stop a deserving student from pursuing a healthcare career."
        crumbs={[{ label: 'Scholarship' }]}
      />

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Financial Support"
            title="Scholarship Schemes & Concessions"
            description="Explore financial support schemes designed to make quality paramedical education accessible to all."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {scholarshipSchemes.map((scheme) => (
              <div key={scheme.title} className="rounded-xl border border-border bg-card p-6 shadow-xs">
                <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <scheme.icon className="size-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{scheme.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{scheme.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-muted/40">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">How to Apply for Scholarship</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Follow these simple steps during your admission process to claim eligible concessions:
              </p>

              <ol className="mt-6 space-y-4">
                {[
                  'Mention your scholarship request in the admission enquiry form.',
                  'Submit your 10th / 12th marksheets alongside caste/income certificates (if applicable).',
                  'Meet our scholarship committee during counselling for document verification.',
                  'Get your updated fee breakdown with approved concessions before enrollment.',
                ].map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                      {idx + 1}
                    </span>
                    <span className="text-sm font-medium text-foreground">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs">
              <h3 className="text-xl font-bold text-foreground">Apply for Scholarship Guidance</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Fill in your details and our admission officer will call you back with scholarship eligibility details.
              </p>
              <div className="mt-6">
                <EnquiryForm />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
