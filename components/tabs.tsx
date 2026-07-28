'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

export type TabItem = {
  id: string
  label: string
  content: React.ReactNode
}

export function Tabs({ items }: { items: TabItem[] }) {
  const [active, setActive] = useState(items[0]?.id)

  return (
    <div>
      <div
        role="tablist"
        aria-label="Sections"
        className="flex flex-wrap gap-2 border-b border-border"
      >
        {items.map((item) => (
          <button
            key={item.id}
            role="tab"
            id={`tab-${item.id}`}
            aria-selected={active === item.id}
            aria-controls={`panel-${item.id}`}
            onClick={() => setActive(item.id)}
            className={cn(
              '-mb-px rounded-t-lg border-b-2 px-4 py-2.5 text-sm font-medium transition-colors',
              active === item.id
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground',
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`panel-${item.id}`}
          aria-labelledby={`tab-${item.id}`}
          hidden={active !== item.id}
          className="pt-8"
        >
          {active === item.id ? item.content : null}
        </div>
      ))}
    </div>
  )
}
