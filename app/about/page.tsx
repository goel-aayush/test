import type { Metadata } from 'next'
import Image from 'next/image'
import { Target, Eye, Heart } from 'lucide-react'
import { Container } from '@/components/container'
import { PageHero } from '@/components/page-hero'
import { Tabs } from '@/components/tabs'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Alok Ranjan Paramedical Institute (ARPI), Gaya — our history, mission, vision and the leadership guiding paramedical education in Bihar.',
  alternates: { canonical: '/about' },
}

function MessageBlock({
  image,
  name,
  role,
  paragraphs,
}: {
  image: string
  name: string
  role: string
  paragraphs: string[]
}) {
  return (
    <div className="grid gap-8 md:grid-cols-[220px_1fr]">
      <div>
        <div className="overflow-hidden rounded-xl border border-border">
          <Image
            src={image}
            alt={`${name}, ${role} of ${site.shortName}`}
            width={220}
            height={260}
            className="h-full w-full object-cover"
          />
        </div>
        <p className="mt-3 font-semibold text-brand-dark">{name}</p>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
      <div className="space-y-4 leading-relaxed text-foreground/90">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </div>
  )
}

export default function AboutPage() {
  const tabs = [
    {
      id: 'history',
      label: 'Our History',
      content: (
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="space-y-4 leading-relaxed text-foreground/90">
            <p>
              Alok Ranjan Paramedical Institute was established in {site.established} with a simple
              goal — to make quality paramedical education accessible to students in Gaya and the
              surrounding regions of Bihar.
            </p>
            <p>
              What began as a small institute has grown into a trusted name, training over 1,200
              students in healthcare skills that lead to real employment. We believe practical,
              hands-on learning is what sets our graduates apart.
            </p>
            <p>
              Today, ARPI offers six diploma and certificate courses, supported by modern
              laboratories, experienced faculty and dedicated placement guidance.
            </p>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <Image
              src="/images/campus-building.png"
              alt="ARPI campus building in Gaya"
              width={560}
              height={420}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      ),
    },
    {
      id: 'mission',
      label: 'Mission & Vision',
      content: (
        <div className="grid gap-5 sm:grid-cols-2">
          {[
            {
              icon: Target,
              title: 'Our Mission',
              text: 'To deliver affordable, practical paramedical training that prepares students for immediate employment and meaningful contribution to healthcare.',
            },
            {
              icon: Eye,
              title: 'Our Vision',
              text: 'To be the most trusted paramedical institute in Bihar, recognised for skilled graduates and a genuine commitment to student success.',
            },
            {
              icon: Heart,
              title: 'Our Values',
              text: 'Integrity, hands-on excellence, and care — for our students, our patients-to-be, and the communities we serve.',
            },
            {
              icon: Target,
              title: 'Our Promise',
              text: 'Small batches, real lab practice, and personal guidance so every student gets the attention they deserve.',
            },
          ].map((c) => (
            <div key={c.title} className="rounded-xl border border-border bg-card p-6">
              <span className="flex size-11 items-center justify-center rounded-lg bg-secondary text-primary">
                <c.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-semibold text-brand-dark">{c.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'director',
      label: "Director's Message",
      content: (
        <MessageBlock
          image="/images/faculty-director.png"
          name="Dr. Alok Ranjan"
          role="Director"
          paragraphs={[
            'Healthcare needs skilled hands as much as it needs qualified doctors. Paramedical professionals are the backbone of every hospital, lab and clinic — and that is exactly who we train here at ARPI.',
            'My vision for this institute has always been to give students from our region a genuine, affordable path into healthcare careers, without having to leave home for a big city. I am proud of every graduate who has gone on to serve patients with skill and compassion.',
            'If you are considering a career in the medical field, I invite you to visit our campus and see for yourself.',
          ]}
        />
      ),
    },
    {
      id: 'principal',
      label: "Principal's Message",
      content: (
        <MessageBlock
          image="/images/faculty-principal.png"
          name="Mr. Sanjeev Kumar"
          role="Principal"
          paragraphs={[
            'At ARPI, we focus on what matters most — practical competence. Our students spend real time in the lab, with real equipment, because that is what employers look for.',
            'Our faculty are approachable and invested in every student. We keep batch sizes small so no one is left behind, and we support students right up to placement.',
            'I warmly welcome you to become part of the ARPI family and take your first confident step towards a rewarding healthcare career.',
          ]}
        />
      ),
    },
  ]

  return (
    <>
      <PageHero
        title="About Alok Ranjan Paramedical Institute"
        description="A trusted paramedical institute in Gaya, Bihar, committed to practical, job-ready healthcare education since 2021."
        crumbs={[{ label: 'About' }]}
      />
      <section className="py-12 sm:py-16">
        <Container>
          <Tabs items={tabs} />
        </Container>
      </section>
    </>
  )
}
