import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ProjectCard } from '@/components/site/ProjectCard'
import { ClientsMarquee } from '@/components/site/ClientsMarquee'
import { ContactBanner } from '@/components/site/ContactBanner'
import { prisma } from '@/lib/db'
import { safeQuery } from '@/lib/safe-query'

export const metadata: Metadata = {
  title: 'Références & clients',
  description: 'Les organisations qui font confiance à ERIMAS pour leurs missions de conseil en ressources humaines au Tchad.',
}

export default async function ReferencesPage() {
  const projects = await safeQuery(
    () => prisma.project.findMany({ where: { status: 'PUBLISHED' }, orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }] }),
    []
  )

  return (
    <>
      <section className="bg-white py-24 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Ils nous font confiance"
            title="Nos références"
            description="ERIMAS intervient auprès d'organisations publiques, parapubliques, privées et internationales."
          />
        </Container>
        <div className="mt-14">
          <ClientsMarquee />
        </div>
      </section>

      <section className="border-t border-navy-100 bg-white py-24 sm:py-28">
        <Container>
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-navy-100 bg-navy-50/60 p-12 text-center">
              <p className="text-navy-600">
                Les fiches de référence détaillées sont en cours de publication depuis le portail admin.
                N&apos;hésitez pas à nous contacter directement pour échanger sur nos missions réalisées.
              </p>
            </div>
          )}
        </Container>
      </section>

      <ContactBanner />
    </>
  )
}
