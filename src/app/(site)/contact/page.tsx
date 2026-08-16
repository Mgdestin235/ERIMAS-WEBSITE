import type { Metadata } from 'next'
import { Mail, MapPin, Phone, Clock } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/motion/Reveal'
import { ContactForm } from '@/components/site/ContactForm'
import { COMPANY } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Contactez ERIMAS SARL à ${COMPANY.city}, Tchad — ${COMPANY.email}.`,
}

export default function ContactPage() {
  const mapQuery = encodeURIComponent(`${COMPANY.address}, ${COMPANY.addressCity}, ${COMPANY.country}`)

  return (
    <section className="bg-ink py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Contact"
          title="Discutons de votre projet"
          description="Une question, un besoin de conseil, une mission à confier ? Notre équipe vous répond rapidement."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal delay={0.1}>
            <div className="space-y-8">
              <div className="rounded-2xl border border-navy-800 bg-navy-900/40 p-7">
                <ul className="space-y-5 text-sm">
                  <li className="flex gap-3">
                    <MapPin size={20} className="mt-0.5 shrink-0 text-mint-400" />
                    <span className="text-navy-200">
                      {COMPANY.address}
                      <br />
                      {COMPANY.addressCity}, {COMPANY.country} — {COMPANY.poBox}
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Phone size={20} className="mt-0.5 shrink-0 text-mint-400" />
                    <span className="flex flex-col gap-1 text-navy-200">
                      {COMPANY.phones.map((phone) => (
                        <a key={phone} href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-mint-300">
                          {phone}
                        </a>
                      ))}
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Mail size={20} className="mt-0.5 shrink-0 text-mint-400" />
                    <a href={`mailto:${COMPANY.email}`} className="text-navy-200 hover:text-mint-300">
                      {COMPANY.email}
                    </a>
                  </li>
                  <li className="flex gap-3">
                    <Clock size={20} className="mt-0.5 shrink-0 text-mint-400" />
                    <span className="text-navy-200">[À COMPLÉTER — horaires d&apos;ouverture du cabinet]</span>
                  </li>
                </ul>
              </div>

              <div className="overflow-hidden rounded-2xl border border-navy-800">
                <iframe
                  title="Localisation ERIMAS SARL"
                  src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                  className="h-64 w-full grayscale invert-[0.92] contrast-[1.1] sm:h-80"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="rounded-2xl border border-navy-800 bg-navy-900/40 p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
