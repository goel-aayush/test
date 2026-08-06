import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CalendarDays, Clock, ArrowRight, ArrowLeft } from 'lucide-react'
import { Container } from '@/components/container'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { CourseIcon } from '@/components/course-icon'
import { CtaButton } from '@/components/cta-button'
import { PostBody } from '@/components/post-body'
import { BlogCard } from '@/components/blog-card'
import { getPost as getFallbackPost, getAllPosts as getFallbackAllPosts, formatPostDate, BlogPost } from '@/lib/blog'
import { getCourse as getFallbackCourse } from '@/lib/courses'
import { site } from '@/lib/site'
import { getBlogsFromAPI, getBlogBySlugFromAPI, getCoursesFromAPI } from '@/lib/api'

const SITE_URL = 'https://alokranjanparamedicalinstitute.in'

export async function generateStaticParams() {
  let list = getFallbackAllPosts();
  try {
    const apiBlogs = await getBlogsFromAPI();
    if (apiBlogs && apiBlogs.length > 0) list = apiBlogs;
  } catch (e) {}
  return list.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  let post: BlogPost | null = getFallbackPost(slug) || null;
  try {
    const apiPost = await getBlogBySlugFromAPI(slug);
    if (apiPost) post = apiPost;
  } catch (e) {}

  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      publishedTime: new Date(post.publishDate).toISOString(),
      authors: [post.author],
      images: [{ url: post.featuredImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  let post: BlogPost | null = getFallbackPost(slug) || null;
  let allPosts = getFallbackAllPosts();
  let allCourses = [];

  try {
    const apiPost = await getBlogBySlugFromAPI(slug);
    if (apiPost) post = apiPost;
    const apiBlogs = await getBlogsFromAPI();
    if (apiBlogs && apiBlogs.length > 0) allPosts = apiBlogs;
    allCourses = await getCoursesFromAPI();
  } catch (e) {}

  if (!post) notFound()

  const relatedCourse = post.relatedCourseSlug 
    ? (allCourses.find((c: any) => c.slug === post.relatedCourseSlug) || getFallbackCourse(post.relatedCourseSlug)) 
    : undefined;

  // More posts: prefer same category, then fill with recent, excluding current.
  const morePosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => {
      const aSame = a.category === post.category ? 0 : 1
      const bSame = b.category === post.category ? 0 : 1
      return aSame - bSame
    })
    .slice(0, 3)

  const postSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: `${SITE_URL}${post.featuredImage}`,
    datePublished: post.publishDate,
    dateModified: post.publishDate,
    author: { '@type': 'Organization', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/og-image.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${post.slug}` },
    articleSection: post.category,
    ...(relatedCourse
      ? {
          about: {
            '@type': 'Course',
            name: relatedCourse.name,
            url: `${SITE_URL}/courses/${relatedCourse.slug}`,
          },
        }
      : {}),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postSchema) }}
      />

      {/* Article header */}
      <section className="bg-brand-dark py-10 text-white sm:py-14">
        <Container className="max-w-3xl">
          <Breadcrumbs
            items={[{ label: 'Blog', href: '/blog' }, { label: post.category }]}
          />
          <span className="inline-flex w-fit items-center rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
            {post.category}
          </span>
          <h1 className="mt-3 text-3xl font-bold text-balance sm:text-4xl">{post.title}</h1>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-white/80">
            <span className="flex items-center gap-2">
              <img
                src={post.authorPhoto || '/placeholder.svg'}
                alt=""
                width={32}
                height={32}
                className="size-8 rounded-full object-cover"
              />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays className="size-4 text-accent" aria-hidden="true" />
              {formatPostDate(post.publishDate)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-4 text-accent" aria-hidden="true" />
              {post.readingTime || 3} min read
            </span>
          </div>
        </Container>
      </section>

      <article className="py-12 sm:py-16">
        <Container className="max-w-3xl">
          <img
            src={post.featuredImage || '/placeholder.svg'}
            alt={post.title}
            width={1200}
            height={630}
            className="aspect-[1200/630] w-full rounded-2xl border border-border object-cover"
          />

          <p className="mt-8 text-lg leading-relaxed text-pretty text-foreground/90">
            {post.excerpt}
          </p>

          <PostBody blocks={post.body} />

          {/* Related course CTA — the blog -> course half of the cross-link */}
          {relatedCourse ? (
            <aside className="mt-12 rounded-2xl border border-primary/20 bg-secondary p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                Related course
              </p>
              <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <CourseIcon name={relatedCourse.icon} />
                  </span>
                  <div>
                    <h2 className="text-lg font-bold text-foreground">{relatedCourse.name}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{relatedCourse.tagline}</p>
                  </div>
                </div>
                <CtaButton
                  href={`/courses/${relatedCourse.slug}`}
                  variant="accent"
                  className="shrink-0"
                >
                  Explore course
                </CtaButton>
              </div>
            </aside>
          ) : null}

          <div className="mt-10 border-t border-border pt-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back to all articles
            </Link>
          </div>
        </Container>
      </article>

      {/* More articles */}
      {morePosts.length > 0 ? (
        <section className="border-t border-border bg-muted py-14">
          <Container>
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-foreground">More articles</h2>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
              >
                View all
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {morePosts.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  )
}
