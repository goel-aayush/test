import type { Metadata } from 'next'
import { Container, Section, SectionHeading } from '@/components/container'
import { PageHero } from '@/components/page-hero'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { EnquiryForm } from '@/components/enquiry-form'
import { FAQAccordion } from '@/components/faq-accordion'
import { FAQSchema } from '@/components/seo/faq-schema'
import { courses } from '@/lib/courses'
import { site } from '@/lib/site'
import { admissionFaqs } from '@/lib/content'
import { CheckCircle2, FileText, Phone, ClipboardCheck, GraduationCap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Admission 2026–27',
  description:
    'Admissions are open at Alok Ranjan Paramedical Institute, Gaya. Learn the simple 4-step admission process, eligibility and documents required for paramedical diploma and certificate courses.',
  alternates: { canonical: '/admission' },
}

const steps = [
  {
    icon: Phone,
    title: 'Enquire',
    text: 'Call us or submit the enquiry form. Our counsellor will guide you on the right course for your goals.',
  },
  {
    icon: FileText,
    title: 'Submit Documents',
    text: 'Provide your marksheets, ID proof and photographs to complete your application.',
  },
  {
    icon: ClipboardCheck,
    title: 'Counselling',
    text: 'Attend a short counselling session to confirm eligibility, fees and batch timing.',
  },
  {
    icon: GraduationCap,
    title: 'Confirm & Enroll',
    text: 'Pay the admission fee, collect your ID card and join your batch. Welcome to ARPI!',
  },
]

const documents = [
  '10th & 12th marksheets and certificates',
  'Transfer / school leaving certificate',
  'Aadhaar card (or valid photo ID)',
  '4 recent passport-size photographs',
  'Caste / income certificate (if applying for scholarship)',
  'Migration certificate (if applicable)',
]

export default function AdmissionPage() {
  return (
    <>
      <PageHero
        eyebrow="Admissions Open 2026–27"
        title="Start your healthcare career in 4 simple steps"
        description="Admission at ARPI is straightforward and student-friendly. No entrance exam for most courses — just meet the eligibility and enroll before seats fill up."
      />
      <Container>
        <Breadcrumbs items={[{ label: 'Admission' }]} />
      </Container>

      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="relative rounded-xl border border-border bg-card p-6"
              >
                <span className="absolute right-4 top-4 text-4xl font-bold text-muted/60 font-serif">
                  {i + 1}
                </span>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <step.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-muted/40">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-foreground md:text-3xl text-balance">
                Eligibility by course
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Eligibility is kept accessible so students from all backgrounds can build a career
                in healthcare. Fee details are shared during counselling.
              </p>
              <div className="mt-6 overflow-hidden rounded-xl border border-border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-secondary text-secondary-foreground">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Course</th>
                      <th className="px-4 py-3 font-semibold">Duration</th>
                      <th className="px-4 py-3 font-semibold">Eligibility</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-card">
                    {courses.map((c) => (
                      <tr key={c.slug}>
                        <td className="px-4 py-3 font-medium text-foreground">{c.shortName}</td>
                        <td className="px-4 py-3 text-muted-foreground">{c.duration}</td>
                        <td className="px-4 py-3 text-muted-foreground">{c.eligibility}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground md:text-3xl text-balance">
                Documents required
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Keep the following ready to make your admission quick and hassle-free.
              </p>
              <ul className="mt-6 space-y-3">
                {documents.map((doc) => (
                  <li key={doc} className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span className="text-foreground">{doc}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-xl border border-border bg-card p-5">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Need help choosing a course? Call{' '}
                  <a href={site.phoneHref} className="font-semibold text-primary hover:underline">
                    {site.phone}
                  </a>{' '}
                  and speak to our admissions counsellor. {site.officeHours}.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-foreground md:text-3xl text-balance">
              Apply for admission
            </h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Fill in your details and our team will reach out to guide you through the process.
            </p>
          </div>
          <div className="mx-auto mt-8 max-w-2xl">
            <EnquiryForm />
          </div>
        </Container>
      </Section>

      <Section className="bg-muted/40">
        <Container>
          <FAQSchema items={admissionFaqs} />
          <SectionHeading
            eyebrow="Admission Help"
            title="Admission FAQs"
            description="Got questions about applying, documents or batch timing? Here are answers to common admission queries."
          />
          <div className="mx-auto mt-8 max-w-3xl">
            <FAQAccordion items={admissionFaqs} />
          </div>
        </Container>
      </Section>
    </>
  )
}
