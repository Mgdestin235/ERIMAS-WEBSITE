import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { getCurrentUser } from '@/lib/auth-helpers'
import { prisma } from '@/lib/db'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = { title: 'Utilisateurs' }

export default async function AdminUsersPage() {
  const currentUser = await getCurrentUser()
  if (!currentUser || currentUser.role !== 'ADMIN') redirect('/admin')

  const users = await prisma.user.findMany({ orderBy: { createdAt: 'asc' } })

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Utilisateurs" description="Comptes ayant accès au portail admin." newHref="/admin/utilisateurs/nouveau" />

      <div className="overflow-x-auto rounded-2xl border border-navy-800 bg-navy-900/40">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-navy-800 text-xs uppercase tracking-wider text-navy-500">
              <th className="px-5 py-3 font-medium">Nom</th>
              <th className="px-5 py-3 font-medium">Rôle</th>
              <th className="px-5 py-3 font-medium">Statut</th>
              <th className="px-5 py-3 font-medium">Dernière connexion</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-navy-800/60 last:border-0">
                <td className="px-5 py-3.5">
                  <Link href={`/admin/utilisateurs/${u.id}`} className="font-medium text-cream hover:text-mint-300">
                    {u.name}
                  </Link>
                  <p className="text-xs text-navy-500">{u.email}</p>
                </td>
                <td className="px-5 py-3.5 text-navy-400">{u.role === 'ADMIN' ? 'Administrateur' : 'Éditeur'}</td>
                <td className="px-5 py-3.5">
                  <span className={u.isActive ? 'rounded-full bg-mint-900/40 px-2.5 py-1 text-xs text-mint-300' : 'rounded-full bg-navy-800 px-2.5 py-1 text-xs text-navy-400'}>
                    {u.isActive ? 'Actif' : 'Désactivé'}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-navy-400">{u.lastLoginAt ? formatDate(u.lastLoginAt) : 'Jamais'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
