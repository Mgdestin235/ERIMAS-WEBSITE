import Link from 'next/link'
import { ArrowUpRight, ShieldCheck } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/motion/Reveal'
import { AmbientOrbs } from '@/components/motion/AmbientOrbs'
import { Hero3D } from '@/components/three/Hero3D'
import { StatsCounters } from '@/components/site/StatsCounters'
import { ServiceCard } from '@/components/site/ServiceShowcase'
import { MethodologyTimeline } from '@/components/site/MethodologyTimeline'
import { ClientsMarquee } from '@/components/site/ClientsMarquee'
import { TestimonialsCarousel } from '@/components/site/TestimonialsCarousel'
import { ContactBanner } from '@/components/site/ContactBanner'
import { SERVICE_DOMAINS, COMPANY } from '@/lib/constants'
import { prisma } from '@/lib/db'
import { safeQuery } from '@/lib/safe-query'

export default async function HomePage() {
  const testimonials = await safeQuery(
    () => prisma.testimonial.findMany({ where: { featured: true }, orderBy: { order: 'asc' }, take: 6 }),
    []
  )

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <Hero3D className="h-full w-full" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/10 via-ink/40 to-ink" />

        <Container className="relative">
          <div className="max-w-3xl">
            <Reveal>
              <p className="font-sans text-sm font-semibold uppercase tracking-[0.3em] text-mint-400">
                {COMPANY.tagline} · {COMPANY.city}, {COMPANY.country}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-5 font-display text-display-xl text-cream text-balance">
                L&apos;expertise RH au service des organisations qui construisent le Tchad de demain.
              </h1>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-200">
                ERIMAS accompagne les organisations publiques, parapubliques, privées et internationales sur
                l&apos;ensemble du cycle de gestion des ressources humaines — du conseil stratégique à
                l&apos;externalisation de personnel.
              </p>
            </Reveal>
            <Reveal delay={0.34}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button href="/contact" size="lg">
                  Discuter de votre projet
                  <ArrowUpRight size={18} />
                </Button>
                <Button href="/nos-services" variant="secondary" size="lg">
                  Découvrir nos services
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* CHIFFRES CLÉS */}
      <section className="border-y border-navy-800 bg-navy-950 py-16">
        <Container>
          <StatsCounters />
        </Container>
      </section>

      {/* DOMAINES D'EXPERTISE */}
      <section className="relative bg-ink py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="Nos domaines d'expertise"
            title="Six domaines, une seule ambition : la performance humaine de vos organisations"
            description="Du conseil stratégique aux services supports, ERIMAS couvre l'ensemble du cycle de gestion des ressources humaines."
          />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICE_DOMAINS.map((service, i) => (
              <ServiceCard key={service.slug} service={service} index={i} />
            ))}
          </div>
        </Container>
      </section>

      {/* MÉTHODOLOGIE */}
      <section className="relative overflow-hidden bg-navy-950 py-24 sm:py-32">
        <AmbientOrbs />
        <Container className="relative">
          <div className="grid gap-16 lg:grid-cols-[0.85fr_1fr]">
            <div>
              <SectionHeading
                eyebrow="Notre approche"
                title="Une méthodologie d'intervention rigoureuse, en six étapes"
                description="Chaque mission ERIMAS suit un parcours structuré, du cadrage initial au transfert de compétences."
              />
              <Reveal delay={0.2}>
                <Link
                  href="/notre-approche"
                  className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-mint-400 hover:text-mint-300"
                >
                  Voir le détail de notre approche
                  <ArrowUpRight size={15} />
                </Link>
              </Reveal>
            </div>
            <MethodologyTimeline />
          </div>
        </Container>
      </section>

      {/* SÉCURITÉ JURIDIQUE — bandeau court */}
      <section className="bg-ink py-16">
        <Container>
          <Reveal>
            <div className="flex flex-col items-start gap-6 rounded-2xl border border-navy-700/60 bg-navy-900/40 p-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <ShieldCheck className="mt-1 h-9 w-9 shrink-0 text-mint-400" />
                <div>
                  <h3 className="font-display text-lg font-semibold text-cream">Une sécurité juridique à chaque mission</h3>
                  <p className="mt-1.5 max-w-xl text-sm text-navy-300">
                    Code du travail tchadien, conventions collectives, obligations CNPS et droit OHADA : chaque
                    recommandation ERIMAS s&apos;inscrit dans un cadre légal maîtrisé.
                  </p>
                </div>
              </div>
              <Button href="/securite-juridique" variant="secondary">
                En savoir plus
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* RÉFÉRENCES / CLIENTS */}
      <section className="bg-navy-950 py-20">
        <div className="mb-10">
          <Container>
            <SectionHeading eyebrow="Ils nous font confiance" title="Nos références" align="center" />
          </Container>
        </div>
        <ClientsMarquee />
      </section>

      {/* TÉMOIGNAGES */}
      {testimonials.length > 0 && (
        <section className="bg-ink py-24 sm:py-32">
          <Container>
            <TestimonialsCarousel
              items={testimonials.map((t) => ({
                id: t.id,
                authorName: t.authorName,
                authorRole: t.authorRole,
                organization: t.organization,
                quote: t.quote,
              }))}
            />
          </Container>
        </section>
      )}

      <ContactBanner />
    </>
  )
}
