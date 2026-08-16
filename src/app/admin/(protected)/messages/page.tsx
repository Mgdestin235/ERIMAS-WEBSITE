import type { Metadata } from 'next'
import Link from 'next/link'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { prisma } from '@/lib/db'
import { formatDate, cn } from '@/lib/utils'

export const metadata: Metadata = { title: 'Messages' }

const STATUS_LABEL: Record<string, string> = { NEW: 'Nouveau', READ: 'Lu', ARCHIVED: 'Archivé' }

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Messages" description="Demandes reçues depuis le formulaire de contact du site." />

      <div className="overflow-x-auto rounded-2xl border border-navy-800 bg-navy-900/40">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-navy-800 text-xs uppercase tracking-wider text-navy-500">
              <th className="px-5 py-3 font-medium">Contact</th>
              <th className="px-5 py-3 font-medium">Objet</th>
              <th className="px-5 py-3 font-medium">Statut</th>
              <th className="px-5 py-3 font-medium">Reçu le</th>
            </tr>
          </thead>
          <tbody>
            {messages.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-navy-500">
                  Aucun message reçu pour le moment.
                </td>
              </tr>
            )}
            {messages.map((m) => (
              <tr key={m.id} className="border-b border-navy-800/60 last:border-0">
                <td className="px-5 py-3.5">
                  <Link href={`/admin/messages/${m.id}`} className="font-medium text-cream hover:text-mint-300">
                    {m.name}
                  </Link>
                  <p className="text-xs text-navy-500">{m.email}</p>
                </td>
                <td className="px-5 py-3.5 text-navy-400">{m.subject || '—'}</td>
                <td className="px-5 py-3.5">
                  <span
                    className={cn(
                      'rounded-full px-2.5 py-1 text-xs',
                      m.status === 'NEW' && 'bg-mint-900/40 text-mint-300',
                      m.status === 'READ' && 'bg-navy-800 text-navy-300',
                      m.status === 'ARCHIVED' && 'bg-navy-900 text-navy-500'
                    )}
                  >
                    {STATUS_LABEL[m.status]}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-navy-400">{formatDate(m.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
