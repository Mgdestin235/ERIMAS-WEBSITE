import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { MethodologyTimeline } from '@/components/site/MethodologyTimeline'
import { AmbientOrbs } from '@/components/motion/AmbientOrbs'
import { ContactBanner } from '@/components/site/ContactBanner'

export const metadata: Metadata = {
  title: 'Notre approche',
  description: "La méthodologie d'intervention ERIMAS, en six étapes : écoute, diagnostic, conception, validation, déploiement, suivi.",
}

export default function ApproachPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink py-24 sm:py-32">
        <AmbientOrbs />
        <Container className="relative">
          <SectionHeading
            eyebrow="Notre approche"
            title="Une méthodologie d'intervention en six étapes"
            description="Chaque mission ERIMAS suit un parcours structuré et transparent, du premier échange au transfert de compétences vers les équipes du client."
            tone="dark"
          />
          <div className="mt-16 max-w-3xl">
            <MethodologyTimeline />
          </div>
        </Container>
      </section>
      <ContactBanner />
    </>
  )
}
