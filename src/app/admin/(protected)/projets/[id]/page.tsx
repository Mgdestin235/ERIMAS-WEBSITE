import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProjectForm } from '@/components/admin/forms/ProjectForm'
import { prisma } from '@/lib/db'

export const metadata: Metadata = { title: 'Projet' }

export default async function AdminProjectEditPage({ params }: { params: { id: string } }) {
  const isNew = params.id === 'nouveau'
  const project = isNew ? null : await prisma.project.findUnique({ where: { id: params.id } })

  if (!isNew && !project) notFound()

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-cream">{isNew ? 'Nouveau projet' : 'Modifier le projet'}</h1>
        <p className="mt-1 text-sm text-navy-400">{isNew ? 'Ajoutez une mission ou une référence client.' : project?.title}</p>
      </div>
      <ProjectForm initial={project} />
    </div>
  )
}
