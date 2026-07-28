import Link from 'next/link'
import { CalendarDays, Clock, ArrowRight } from 'lucide-react'
import type { BlogPost } from '@/lib/blog'
import { formatPostDate } from '@/lib/blog'

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-md">
      <Link href={`/blog/${post.slug}`} className="block overflow-hidden">
        <img
          src={post.featuredImage || '/placeholder.svg'}
          alt={post.title}
          width={1200}
          height={630}
          loading="lazy"
          className="aspect-[1200/630] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <span className="inline-flex w-fit items-center rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">
          {post.category}
        </span>
        <h3 className="mt-3 text-lg font-semibold leading-snug text-balance text-brand-dark">
          <Link href={`/blog/${post.slug}`} className="hover:text-primary">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="size-3.5 text-primary" aria-hidden="true" />
            {formatPostDate(post.publishDate)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5 text-primary" aria-hidden="true" />
            {post.readingTime} min read
          </span>
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
        >
          Read article
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
          <span className="sr-only">: {post.title}</span>
        </Link>
      </div>
    </article>
  )
}
