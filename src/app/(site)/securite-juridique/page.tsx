import type { Metadata } from 'next'
import { Scale } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { IconTile } from '@/components/ui/IconTile'
import { ICON_TILE_PX } from '@/lib/icon-sizes'
import { Reveal } from '@/components/motion/Reveal'
import { ContactBanner } from '@/components/site/ContactBanner'
import { LEGAL_FRAMEWORK } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Sécurité juridique',
  description:
    "Le cadre légal des interventions ERIMAS : Code du travail tchadien, convention collective générale, convention sectorielle pétrolière, obligations CNPS et fiscales, droit OHADA.",
}

export default function LegalSecurityPage() {
  return (
    <>
      <section className="bg-ink py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="Sécurité juridique"
            title="Un cadre légal maîtrisé, à chaque recommandation"
            description="ERIMAS inscrit chacune de ses interventions dans le respect strict du droit du travail applicable au Tchad et des cadres régionaux qui s'y rattachent."
          />

          <div className="mt-16 space-y-6">
            {LEGAL_FRAMEWORK.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="flex flex-col gap-5 rounded-2xl border border-navy-800 bg-navy-900/40 p-7 sm:flex-row sm:items-start">
                  <IconTile>
                    <Scale size={ICON_TILE_PX.md} className="text-mint-300 drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]" strokeWidth={1.75} />
                  </IconTile>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-cream">{item.title}</h3>
                    <p className="mt-2 text-navy-300">{item.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <p className="mt-12 max-w-2xl text-sm text-navy-400">
              Les informations ci-dessus présentent le cadre général de référence. Pour toute analyse juridique
              précise applicable à votre situation, contactez le cabinet : chaque dossier fait l&apos;objet d&apos;une
              étude spécifique. [À COMPLÉTER — mentions juridiques détaillées supplémentaires à intégrer par ERIMAS
              si nécessaire.]
            </p>
          </Reveal>
        </Container>
      </section>
      <ContactBanner />
    </>
  )
}
