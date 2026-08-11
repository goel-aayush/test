import type { Metadata } from 'next'
import { Container } from '@/components/container'
import { PageHero } from '@/components/page-hero'
import { BlogList } from '@/components/blog-list'
import type { BlogPost } from '@/lib/blog'
import { getBlogsFromAPI } from '@/lib/api'

export const metadata: Metadata = {
  title: 'Blog — Career Guidance & Course Info',
  description:
    'Career guidance, course information, admission tips and student success stories for paramedical students in Gaya, Bihar — from Alok Ranjan Paramedical Institute.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'ARPI Blog — Paramedical Career Guidance & Course Info',
    description:
      'Salary guides, career scope, admission tips and student success stories for paramedical students in Bihar.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'ARPI Blog' }],
  },
}

export default async function BlogPage() {
  const posts: BlogPost[] = (await getBlogsFromAPI()) || [];

  return (
    <>
      <PageHero
        eyebrow="ARPI Blog"
        title="Paramedical career guidance & course insights"
        description="Honest salary guides, career scope, admission tips and student success stories to help you choose and grow in a paramedical career."
        crumbs={[{ label: 'Blog' }]}
      />
      <section className="py-12 sm:py-16">
        <Container>
          <BlogList posts={posts} />
        </Container>
      </section>
    </>
  )
}
