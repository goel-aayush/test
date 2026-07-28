import { Megaphone } from 'lucide-react'
import { notices } from '@/lib/content'
import { Container } from '@/components/container'

export function NoticesTicker() {
  return (
    <div className="border-y border-border bg-secondary">
      <Container className="flex items-center gap-3 py-2.5">
        <span className="flex shrink-0 items-center gap-1.5 rounded-md bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground">
          <Megaphone className="size-3.5" aria-hidden="true" />
          Latest
        </span>
        <div className="group relative flex-1 overflow-hidden">
          <ul className="flex w-max animate-[marquee_28s_linear_infinite] gap-10 group-hover:[animation-play-state:paused]">
            {[...notices, ...notices].map((n, i) => (
              <li
                key={i}
                className="flex items-center gap-2 text-sm whitespace-nowrap text-secondary-foreground"
              >
                <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                {n.title}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </div>
  )
}
