import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { TeamMemberForm } from '@/components/admin/forms/TeamMemberForm'
import { prisma } from '@/lib/db'

export const metadata: Metadata = { title: 'Membre de l’équipe' }

export default async function AdminTeamMemberEditPage({ params }: { params: { id: string } }) {
  const isNew = params.id === 'nouveau'
  const member = isNew ? null : await prisma.teamMember.findUnique({ where: { id: params.id } })

  if (!isNew && !member) notFound()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-cream">{isNew ? 'Nouveau membre' : 'Modifier le membre'}</h1>
      </div>
      <TeamMemberForm initial={member} />
    </div>
  )
}
