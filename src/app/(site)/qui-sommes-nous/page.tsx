import type { Metadata } from 'next'
import { Handshake, Award, Lock, Users2, Sparkles } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { IconTile } from '@/components/ui/IconTile'
import { ICON_TILE_PX } from '@/lib/icon-sizes'
import { Reveal } from '@/components/motion/Reveal'
import { AmbientOrbs } from '@/components/motion/AmbientOrbs'
import { ContactBanner } from '@/components/site/ContactBanner'
import { COMPANY } from '@/lib/constants'
import { prisma } from '@/lib/db'
import { safeQuery } from '@/lib/safe-query'

export const metadata: Metadata = {
  title: 'Qui sommes-nous',
  description:
    "ERIMAS SARL, cabinet conseil en ressources humaines basé à N'Djamena, Tchad — présentation, valeurs et gouvernance.",
}

const VALUES = [
  { icon: Award, title: 'Excellence', description: "Un niveau d'exigence constant dans chaque mission, quelle que soit son ampleur." },
  { icon: Lock, title: 'Confidentialité', description: 'Un traitement rigoureux et discret des informations sensibles de nos clients.' },
  { icon: Handshake, title: 'Intégrité', description: 'Des recommandations honnêtes, fondées sur les faits et l’intérêt du client.' },
  { icon: Users2, title: 'Proximité', description: 'Une écoute attentive du contexte propre à chaque organisation accompagnée.' },
  { icon: Sparkles, title: 'Impact', description: 'Des interventions orientées vers des résultats concrets et durables.' },
]

export default async function AboutPage() {
  const [teamMembers, page] = await Promise.all([
    safeQuery(() => prisma.teamMember.findMany({ orderBy: { order: 'asc' } }), []),
    safeQuery(() => prisma.page.findUnique({ where: { slug: 'qui-sommes-nous' } }), null),
  ])

  const extraIntro = (page?.content as { intro?: string } | null)?.intro

  return (
    <>
      {/* INTRO — bleu marine */}
      <section className="relative overflow-hidden bg-ink py-24 sm:py-32">
        <AmbientOrbs />
        <Container className="relative">
          <SectionHeading
            eyebrow="Qui sommes-nous"
            title="Un cabinet conseil en ressources humaines, pensé pour le Tchad"
            tone="dark"
          />
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal delay={0.1}>
              <div className="space-y-5 text-lg leading-relaxed text-white/80">
                <p>
                  {COMPANY.name} est un cabinet conseil en ressources humaines basé à {COMPANY.city}, au Tchad,
                  constitué sous la forme d&apos;une {COMPANY.legalForm} au capital de {COMPANY.capital}
                  (RCCM {COMPANY.rccm}).
                </p>
                <p>
                  Le cabinet accompagne des organisations publiques, parapubliques, privées et internationales sur
                  l&apos;ensemble du cycle de gestion des ressources humaines : conseil &amp; stratégie RH,
                  recrutement, formation, externalisation de personnel, digitalisation &amp; IA, et services
                  supports.
                </p>
                {extraIntro && <p>{extraIntro}</p>}
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="rounded-2xl border border-white/15 bg-white/5 p-8 backdrop-blur-sm">
                <h3 className="font-display text-lg font-semibold text-white">Identité du cabinet</h3>
                <dl className="mt-5 space-y-4 text-sm">
                  <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                    <dt className="text-white/60">Forme juridique</dt>
                    <dd className="text-right text-white">{COMPANY.legalForm}</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                    <dt className="text-white/60">RCCM</dt>
                    <dd className="text-right text-white">{COMPANY.rccm}</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                    <dt className="text-white/60">Capital social</dt>
                    <dd className="text-right text-white">{COMPANY.capital}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-white/60">Siège</dt>
                    <dd className="text-right text-white">
                      {COMPANY.city}, {COMPANY.country}
                    </dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* VALEURS — blanc */}
      <section className="bg-white py-24 sm:py-32">
        <Container>
          <SectionHeading eyebrow="Nos valeurs" title="Ce qui guide chacune de nos interventions" align="center" />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {VALUES.map((value, i) => (
              <Reveal key={value.title} delay={i * 0.08}>
                <div className="flex h-full flex-col items-center rounded-2xl border border-navy-100 bg-white p-6 text-center shadow-card">
                  <IconTile size="sm">
                    <value.icon size={ICON_TILE_PX.sm} className="text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]" strokeWidth={1.75} />
                  </IconTile>
                  <h3 className="mt-4 font-display text-base font-semibold text-navy-900">{value.title}</h3>
                  <p className="mt-2 text-sm text-navy-600">{value.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* GOUVERNANCE — blanc */}
      <section className="border-t border-navy-100 bg-white py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="Gouvernance"
            title={`Un cabinet fondé par ${COMPANY.founderCount} associés`}
            description={`ERIMAS a été formalisé en ${COMPANY.foundingYear} par ses associés fondateurs.`}
          />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.length > 0 ? (
              teamMembers.map((member, i) => (
                <Reveal key={member.id} delay={i * 0.08}>
                  <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
                    <div className="h-16 w-16 overflow-hidden rounded-full bg-navy-100">
                      {member.photoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={member.photoUrl} alt={member.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center font-display text-xl text-navy-500">
                          {member.name.trim().charAt(0) || '?'}
                        </div>
                      )}
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold text-navy-900">{member.name}</h3>
                    <p className="text-sm text-mint-600">{member.role}</p>
                    {member.bio && <p className="mt-2 text-sm text-navy-600">{member.bio}</p>}
                  </div>
                </Reveal>
              ))
            ) : (
              <p className="text-navy-500">
                Les fiches de l&apos;équipe dirigeante seront publiées ici depuis le portail admin.
              </p>
            )}
          </div>
        </Container>
      </section>

      <ContactBanner />
    </>
  )
}
