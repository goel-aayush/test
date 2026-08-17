import type { Metadata } from 'next'
import { Container, Section } from '@/components/container'
import { PageHero } from '@/components/page-hero'
import { EnquiryForm } from '@/components/enquiry-form'
import { site } from '@/lib/site'
import { getSettingsFromAPI } from '@/lib/api'
import { MapPin, Phone, Mail, Clock, MessageSquare } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us & Location',
  description:
    'Contact Alok Ranjan Paramedical Institute, Gaya. Visit our campus, call our admission helpline, or send an enquiry.',
  alternates: { canonical: '/contact' },
}

export default async function ContactPage() {
  const settings = await getSettingsFromAPI()
  const currentSite = settings || site

  return (
    <>
      <PageHero
        title={`Contact ${currentSite.shortName} Gaya`}
        description="Have questions about admissions, fees or courses? Get in touch with our admissions team today."
        crumbs={[{ label: 'Contact' }]}
      />

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <span className="text-xs font-semibold tracking-wider text-primary uppercase">Get In Touch</span>
              <h2 className="mt-1 text-2xl font-bold text-foreground sm:text-3xl">We are here to help you</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Visit our campus in {currentSite.address.city} during working hours or connect with us via phone, email or WhatsApp.
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Campus Address</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {currentSite.addressFull}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Phone className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Admission Helpline</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      <a href={currentSite.phoneHref} className="font-medium text-primary hover:underline">
                        {currentSite.phone}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MessageSquare className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">WhatsApp Enquiry</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      <a
                        href={currentSite.whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-emerald-600 hover:underline"
                      >
                        Chat on WhatsApp
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Mail className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Email</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      <a href={currentSite.emailHref} className="font-medium text-primary hover:underline">
                        {currentSite.email}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Clock className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Office Hours</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{currentSite.officeHours}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs">
              <h2 className="text-xl font-bold text-foreground">Send an Enquiry</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Fill out this form and our admission counsellor will respond within 24 hours.
              </p>
              <div className="mt-6">
                <EnquiryForm />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-muted/40 py-12">
        <Container>
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xs">
            <div className="p-4 bg-muted border-b border-border">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <MapPin className="size-4 text-primary" />
                Location Map – {currentSite.address.city} Campus
              </h3>
            </div>
            <div className="h-96 w-full">
              <iframe
                title={`${currentSite.shortName} Location Map`}
                src={currentSite.mapEmbed || 'https://www.google.com/maps?q=Gaya,Bihar&output=embed'}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
