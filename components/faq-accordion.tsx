'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FAQItem } from '@/components/seo/faq-schema'

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="divide-y divide-border rounded-2xl border border-border bg-card shadow-xs">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <div key={index} className="transition-colors">
            <button
              type="button"
              onClick={() => toggle(index)}
              className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold text-foreground transition hover:text-primary sm:p-6"
              aria-expanded={isOpen}
            >
              <span className="text-base sm:text-lg">{item.question}</span>
              <span
                className={cn(
                  'flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-primary transition-transform duration-200',
                  isOpen && 'rotate-180 bg-primary text-white'
                )}
              >
                <ChevronDown className="size-4" />
              </span>
            </button>

            {isOpen && (
              <div className="px-5 pb-5 pt-0 sm:px-6 sm:pb-6">
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
