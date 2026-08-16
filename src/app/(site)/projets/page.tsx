import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ProjectCard } from '@/components/site/ProjectCard'
import { ContactBanner } from '@/components/site/ContactBanner'
import { prisma } from '@/lib/db'
import { safeQuery } from '@/lib/safe-query'

export const metadata: Metadata = {
  title: 'Projets',
  description: 'Études de cas et missions conduites par ERIMAS pour ses clients au Tchad.',
}

export default async function ProjectsPage() {
  const projects = await safeQuery(
    () => prisma.project.findMany({ where: { status: 'PUBLISHED' }, orderBy: { createdAt: 'desc' } }),
    []
  )

  return (
    <>
      <section className="bg-ink py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="Projets"
            title="Nos missions, présentées comme des études de cas"
            description="Un aperçu de la diversité des missions conduites par ERIMAS auprès de ses clients."
          />
          <div className="mt-14">
            {projects.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-navy-800 bg-navy-900/40 p-12 text-center">
                <p className="text-navy-300">
                  Aucune étude de cas publiée pour le moment. Les projets apparaîtront ici dès leur publication
                  depuis le portail admin.
                </p>
              </div>
            )}
          </div>
        </Container>
      </section>
      <ContactBanner />
    </>
  )
}
