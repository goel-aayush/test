import { CheckCircle2 } from 'lucide-react'
import type { ContentBlock } from '@/lib/blog'

export function PostBody({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="mt-8 space-y-6">
      {blocks.map((block, i) => {
        if (block.type === 'heading') {
          return (
            <h2 key={i} className="text-xl font-bold text-foreground sm:text-2xl">
              {block.text}
            </h2>
          )
        }
        if (block.type === 'paragraph') {
          return (
            <p key={i} className="leading-relaxed text-foreground/90">
              {block.text}
            </p>
          )
        }
        if (block.type === 'list') {
          return (
            <ul key={i} className="grid gap-2.5">
              {block.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-foreground/90">
                  <CheckCircle2
                    className="mt-1 size-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          )
        }
        if (block.type === 'quote') {
          return (
            <blockquote
              key={i}
              className="rounded-xl border-l-4 border-primary bg-secondary p-5 text-foreground/90"
            >
              <p className="text-pretty italic leading-relaxed">{block.text}</p>
              {block.cite ? (
                <cite className="mt-2 block text-sm not-italic font-semibold text-muted-foreground">
                  — {block.cite}
                </cite>
              ) : null}
            </blockquote>
          )
        }
        return null
      })}
    </div>
  )
}
