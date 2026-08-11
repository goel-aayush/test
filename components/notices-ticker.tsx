import { Megaphone, FileText } from 'lucide-react'
import { type Notice } from '@/lib/content'
import { getNoticesFromAPI } from '@/lib/api'
import { getBackendImageUrl } from '@/lib/utils'
import { Container } from '@/components/container'

export async function NoticesTicker() {
  const noticeList: Notice[] = (await getNoticesFromAPI()) || [];

  return (
    <div className="border-y border-border bg-secondary">
      <Container className="flex items-center gap-3 py-2.5">
        <span className="flex shrink-0 items-center gap-1.5 rounded-md bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground">
          <Megaphone className="size-3.5" aria-hidden="true" />
          Latest
        </span>
        <div className="group relative flex-1 overflow-hidden">
          <ul className="flex w-max animate-[marquee_28s_linear_infinite] gap-10 group-hover:[animation-play-state:paused]">
            {[...noticeList, ...noticeList].map((n: any, i) => {
              const pdfLink = n.pdfUrl || n.link;
              return (
                <li
                  key={i}
                  className="flex items-center gap-2 text-sm whitespace-nowrap text-secondary-foreground"
                >
                  <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                  {pdfLink ? (
                    <a
                      href={getBackendImageUrl(pdfLink)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary underline flex items-center gap-1 font-medium"
                    >
                      <span>{n.title}</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-primary/20 text-primary uppercase font-bold flex items-center gap-0.5">
                        <FileText className="size-3" /> PDF
                      </span>
                    </a>
                  ) : (
                    <span>{n.title}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </div>
  )
}
