'use client'

import React, { useState, useEffect } from 'react'
import { Calendar, FileText, ExternalLink, Search, Bell } from 'lucide-react'
import { getBackendImageUrl } from '@/lib/utils'
import { getNoticesFromAPI } from '@/lib/api'

interface NoticeItem {
  _id?: string
  title: string
  date?: string
  pdfUrl?: string
  link?: string
  tag?: string
  isActive?: boolean
}

export function NoticeListClient({ initialNotices }: { initialNotices: NoticeItem[] }) {
  const [notices, setNotices] = useState<NoticeItem[]>(initialNotices)
  const [selectedTag, setSelectedTag] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')

  useEffect(() => {
    getNoticesFromAPI()
      .then((data) => {
        if (data && data.length > 0) {
          setNotices(data)
        }
      })
      .catch((err) => console.error('Error fetching live notices:', err))
  }, [])

  const categories = ['All', 'Admission', 'Exam', 'Event', 'Notice', 'General']

  const filteredNotices = notices.filter((n) => {
    const matchesTag =
      selectedTag === 'All' ||
      (n.tag && n.tag.toLowerCase() === selectedTag.toLowerCase())

    const matchesSearch =
      !searchQuery ||
      n.title.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesTag && matchesSearch
  })

  return (
    <div className="space-y-8">
      {/* Search & Filter Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-border bg-card p-4 shadow-xs">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isActive = selectedTag === cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedTag(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'bg-muted text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search notices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-border bg-background pl-9 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      {/* Notices List */}
      {filteredNotices.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border p-12 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <Bell className="size-6" />
          </div>
          <h3 className="mt-4 text-base font-semibold text-foreground">No notices found</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Try adjusting your search query or selecting a different category filter.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredNotices.map((notice, idx) => {
            const docLink = notice.pdfUrl || notice.link || (notice as any).url || (notice as any).fileUrl
            const formattedDate = notice.date
              ? new Date(notice.date).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })
              : 'Recent'

            return (
              <div
                key={notice._id || idx}
                className="group flex flex-col gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                      <Calendar className="size-3.5 text-primary" />
                      {formattedDate}
                    </span>
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary uppercase tracking-wide">
                      {notice.tag || 'Notice'}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
                    {notice.title}
                  </h3>
                </div>

                {docLink && docLink.trim() !== '' ? (
                  <a
                    href={getBackendImageUrl(docLink)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-xs transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <FileText className="size-4" />
                    <span>View Notice (PDF)</span>
                    <ExternalLink className="size-3.5" />
                  </a>
                ) : (
                  <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-muted-foreground bg-muted px-3 py-1.5 rounded-lg">
                    Official Notice
                  </span>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
