'use client'

import { useState } from 'react'
import type { BlogPost, BlogCategory } from '@/lib/blog'
import { blogCategories } from '@/lib/blog'
import { BlogCard } from '@/components/blog-card'
import { cn } from '@/lib/utils'

type Filter = 'All' | BlogCategory

export function BlogList({ posts }: { posts: BlogPost[] }) {
  const [active, setActive] = useState<Filter>('All')

  const filters: Filter[] = ['All', ...blogCategories]
  const visible = active === 'All' ? posts : posts.filter((p) => p.category === active)

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter articles by category"
        className="flex flex-wrap gap-2.5"
      >
        {filters.map((f) => {
          const isActive = f === active
          const count = f === 'All' ? posts.length : posts.filter((p) => p.category === f).length
          return (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(f)}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                isActive
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-foreground/80 hover:border-primary/40 hover:text-primary',
              )}
            >
              {f}
              <span
                className={cn(
                  'rounded-full px-1.5 text-xs',
                  isActive ? 'bg-primary-foreground/20' : 'bg-muted text-muted-foreground',
                )}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {visible.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="mt-8 rounded-xl border border-border bg-muted p-8 text-center text-sm text-muted-foreground">
          No articles in this category yet. Check back soon.
        </p>
      )}
    </div>
  )
}
