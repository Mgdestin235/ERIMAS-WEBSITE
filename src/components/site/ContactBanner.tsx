import { ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/motion/Reveal'
import { AmbientOrbs } from '@/components/motion/AmbientOrbs'
import { COMPANY } from '@/lib/constants'

export function ContactBanner() {
  return (
    <section className="relative overflow-hidden bg-ink">
      <AmbientOrbs />
      <Container className="relative py-20 sm:py-28">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-display-md text-cream text-balance">
              Parlons de vos enjeux de ressources humaines
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-navy-200">
              Une question, un projet, une mission à confier ? Notre équipe vous répond rapidement.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button href="/contact" size="lg">
                Nous contacter
                <ArrowUpRight size={18} />
              </Button>
              <a href={`mailto:${COMPANY.email}`} className="text-sm font-semibold text-navy-200 hover:text-mint-300">
                {COMPANY.email}
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
