'use client'

import { useState } from 'react'
import { CheckCircle2, Loader2, MessageCircle, Clock } from 'lucide-react'
import { courses } from '@/lib/courses'
import { site, whatsappLink } from '@/lib/site'
import { cn } from '@/lib/utils'

type Status = 'idle' | 'submitting' | 'success'

const field =
  'w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40'

export function EnquiryForm({ defaultCourse }: { defaultCourse?: string }) {
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({
    name: '',
    phone: '',
    course: defaultCourse ?? '',
    message: '',
  })

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('submitting')

    // TODO: connect to backend API / server action to persist the lead + notify staff.
    // Simulated submission for now.
    await new Promise((r) => setTimeout(r, 800))
    setStatus('success')
  }

  const waMessage = `Hi ${site.shortName}, I am ${form.name || '[name]'}. I'm interested in ${
    form.course || 'a paramedical course'
  }. My number is ${form.phone || '[phone]'}.`

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-secondary text-primary">
          <CheckCircle2 className="size-7" aria-hidden="true" />
        </span>
        <h3 className="mt-4 text-lg font-semibold text-foreground">Thank you for your enquiry!</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Our admission counsellor will contact you within 24 hours. For a faster response, message
          us on WhatsApp.
        </p>
        <a
          href={whatsappLink(waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:brightness-95"
        >
          <MessageCircle className="size-4" aria-hidden="true" /> Chat on WhatsApp
        </a>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-border bg-card p-6 sm:p-8"
      aria-label="Admission enquiry form"
    >
      <div className="mb-5 flex items-center gap-2 rounded-lg bg-secondary px-3 py-2 text-xs font-medium text-secondary-foreground">
        <Clock className="size-4 text-primary" aria-hidden="true" />
        We respond to every enquiry within 24 hours.
      </div>

      <div className="grid gap-4">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            required
            value={form.name}
            onChange={update('name')}
            placeholder="Your name"
            className={field}
          />
        </div>

        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-foreground">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            pattern="[0-9+ ]{8,15}"
            value={form.phone}
            onChange={update('phone')}
            placeholder="e.g. 90000 00000"
            className={field}
          />
        </div>

        <div>
          <label htmlFor="course" className="mb-1.5 block text-sm font-medium text-foreground">
            Course Interested In
          </label>
          <select
            id="course"
            name="course"
            required
            value={form.course}
            onChange={update('course')}
            className={cn(field, 'appearance-none')}
          >
            <option value="" disabled>
              Select a course
            </option>
            {courses.map((c) => (
              <option key={c.slug} value={c.name}>
                {c.shortName}
              </option>
            ))}
            <option value="Not sure yet">Not sure yet — need guidance</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
            Message <span className="text-muted-foreground">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            value={form.message}
            onChange={update('message')}
            placeholder="Tell us your qualification or any question"
            className={field}
          />
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="mt-1 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-dark disabled:opacity-70"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" /> Submitting…
            </>
          ) : (
            'Submit Enquiry'
          )}
        </button>
        <p className="text-center text-xs text-muted-foreground">
          By submitting, you agree to be contacted about admissions.
        </p>
      </div>
    </form>
  )
}
