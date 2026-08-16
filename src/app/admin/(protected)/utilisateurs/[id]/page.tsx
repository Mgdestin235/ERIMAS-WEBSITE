import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { UserForm } from '@/components/admin/forms/UserForm'
import { getCurrentUser } from '@/lib/auth-helpers'
import { prisma } from '@/lib/db'

export const metadata: Metadata = { title: 'Utilisateur' }

export default async function AdminUserEditPage({ params }: { params: { id: string } }) {
  const currentUser = await getCurrentUser()
  if (!currentUser || currentUser.role !== 'ADMIN') redirect('/admin')

  const isNew = params.id === 'nouveau'
  const user = isNew
    ? null
    : await prisma.user.findUnique({
        where: { id: params.id },
        select: { id: true, name: true, email: true, role: true, isActive: true },
      })

  if (!isNew && !user) notFound()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-cream">{isNew ? 'Nouvel utilisateur' : 'Modifier l’utilisateur'}</h1>
      </div>
      <UserForm initial={user} canDeleteSelf={!isNew && user!.id !== currentUser.id} />
    </div>
  )
}
