import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ServiceCard } from '@/components/site/ServiceShowcase'
import { ContactBanner } from '@/components/site/ContactBanner'
import { SERVICE_DOMAINS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Nos services',
  description:
    "Les six domaines d'expertise ERIMAS : conseil & stratégie RH, recrutement, formation, externalisation de personnel, digitalisation & IA, services supports.",
}

export default function ServicesPage() {
  return (
    <>
      <section className="bg-white py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="Nos services"
            title="Un accompagnement complet, du diagnostic à la mise en œuvre"
            description="ERIMAS intervient sur l'ensemble du cycle de gestion des ressources humaines, avec une mise en scène et une méthode propres à chaque domaine."
          />
          <div id="domaines" className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {SERVICE_DOMAINS.map((service, i) => (
              <div key={service.slug} id={service.slug} className="scroll-mt-28">
                <ServiceCard service={service} index={i} detailed />
              </div>
            ))}
          </div>
        </Container>
      </section>
      <ContactBanner />
    </>
  )
}
