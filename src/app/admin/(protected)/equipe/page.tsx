import type { Metadata } from 'next'
import Link from 'next/link'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { DeleteButton } from '@/components/admin/DeleteButton'
import { prisma } from '@/lib/db'

export const metadata: Metadata = { title: 'Équipe' }

export default async function AdminTeamPage() {
  const members = await prisma.teamMember.findMany({ orderBy: { order: 'asc' } })

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Équipe" description="Fiches affichées sur la page « Qui sommes-nous »." newHref="/admin/equipe/nouveau" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {members.length === 0 && <p className="text-navy-500">Aucun membre enregistré.</p>}
        {members.map((m) => (
          <div key={m.id} className="rounded-2xl border border-navy-800 bg-navy-900/40 p-5">
            <p className="font-medium text-cream">{m.name}</p>
            <p className="text-xs text-mint-400">{m.role}</p>
            {m.isFounder && <span className="mt-2 inline-block rounded-full bg-navy-800 px-2.5 py-0.5 text-xs text-navy-300">Fondateur/trice</span>}
            <div className="mt-4 flex items-center justify-between border-t border-navy-800 pt-3">
              <Link href={`/admin/equipe/${m.id}`} className="text-xs font-semibold text-mint-400 hover:text-mint-300">
                Modifier
              </Link>
              <DeleteButton endpoint={`/api/team/${m.id}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
