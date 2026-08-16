import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, MapPin, Calendar, Building2 } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { Reveal } from '@/components/motion/Reveal'
import { ContactBanner } from '@/components/site/ContactBanner'
import { prisma } from '@/lib/db'
import { safeQuery } from '@/lib/safe-query'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = await safeQuery(() => prisma.project.findUnique({ where: { slug: params.slug } }), null)
  if (!project) return { title: 'Projet' }
  return {
    title: project.title,
    description: project.summary,
  }
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await safeQuery(
    () => prisma.project.findFirst({ where: { slug: params.slug, status: 'PUBLISHED' } }),
    null
  )

  if (!project) notFound()

  return (
    <>
      <article className="bg-ink py-20 sm:py-28">
        <Container className="max-w-3xl">
          <Reveal>
            <Link href="/projets" className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-300 hover:text-mint-300">
              <ArrowLeft size={15} />
              Retour aux projets
            </Link>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.sector && <Badge>{project.sector}</Badge>}
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <h1 className="mt-4 font-display text-display-md text-cream">{project.title}</h1>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-6 flex flex-wrap gap-6 text-sm text-navy-300">
              <span className="inline-flex items-center gap-2">
                <Building2 size={16} className="text-mint-400" />
                {project.client}
              </span>
              {project.location && (
                <span className="inline-flex items-center gap-2">
                  <MapPin size={16} className="text-mint-400" />
                  {project.location}
                </span>
              )}
              {project.year && (
                <span className="inline-flex items-center gap-2">
                  <Calendar size={16} className="text-mint-400" />
                  {project.year}
                </span>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.26}>
            <div
              className="prose prose-invert mt-10 max-w-none prose-headings:font-display prose-a:text-mint-400"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: project.content }}
            />
          </Reveal>
        </Container>
      </article>
      <ContactBanner />
    </>
  )
}
