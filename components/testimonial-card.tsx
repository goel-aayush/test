import { Quote, Star } from 'lucide-react'
import { getBackendImageUrl } from '@/lib/utils'
import { SafeImage } from '@/components/safe-image'

export type Testimonial = {
  name: string
  course: string
  quote: string
  image: string
}

export function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-xl border border-border bg-card p-6">
      <Quote className="size-7 text-primary/30" aria-hidden="true" />
      <div className="mt-2 flex gap-0.5" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="size-4 fill-accent text-accent" aria-hidden="true" />
        ))}
      </div>
      <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-foreground/90">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
        <SafeImage
          src={getBackendImageUrl(t.image)}
          alt={`${t.name}, ${t.course} student`}
          width={44}
          height={44}
          className="size-11 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-semibold text-foreground">{t.name}</p>
          <p className="text-xs text-muted-foreground">{t.course}</p>
        </div>
      </figcaption>
    </figure>
  )
}
