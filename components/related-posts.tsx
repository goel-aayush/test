'use client'

import Link from 'next/link'
import { CalendarDays, Clock, ArrowRight } from 'lucide-react'
import type { BlogPost } from '@/lib/blog'
import { formatPostDate } from '@/lib/blog'
import { getBackendImageUrl } from '@/lib/utils'

/**
 * Compact list of related blog posts. Used on course pages to surface blog
 * articles linked to that course (the course -> blog half of the cross-link).
 */
export function RelatedPosts({
  posts,
  heading = 'From the blog',
}: {
  posts: BlogPost[]
  heading?: string
}) {
  if (posts.length === 0) return null

  return (
    <section aria-labelledby="related-posts-heading" className="mt-10">
      <div className="flex items-center justify-between gap-4">
        <h2 id="related-posts-heading" className="text-xl font-bold text-foreground">
          {heading}
        </h2>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
        >
          All articles
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex gap-4 rounded-xl border border-border bg-card p-4 hover:border-primary/40 hover:shadow-sm"
          >
            <img
              src={getBackendImageUrl(post.featuredImage)}
              alt=""
              width={160}
              height={112}
              loading="lazy"
              onError={(e) => {
                ;(e.target as HTMLImageElement).src = '/placeholder.svg'
              }}
              className="size-20 shrink-0 rounded-lg object-cover"
            />
            <div className="min-w-0">
              <span className="text-xs font-semibold text-primary">{post.category}</span>
              <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-foreground group-hover:text-primary">
                {post.title}
              </h3>
              <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CalendarDays className="size-3 text-primary" aria-hidden="true" />
                  {formatPostDate(post.publishDate)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="size-3 text-primary" aria-hidden="true" />
                  {post.readingTime} min
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
