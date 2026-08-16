import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Mail, Phone } from 'lucide-react'
import { prisma } from '@/lib/db'
import { formatDate } from '@/lib/utils'
import { MessageActions } from '@/components/admin/MessageActions'

export const metadata: Metadata = { title: 'Message' }

export default async function AdminMessageDetailPage({ params }: { params: { id: string } }) {
  const message = await prisma.contactMessage.findUnique({ where: { id: params.id } })
  if (!message) notFound()

  if (message.status === 'NEW') {
    await prisma.contactMessage.update({ where: { id: message.id }, data: { status: 'READ' } })
  }

  return (
    <div className="max-w-2xl space-y-6">
      <Link href="/admin/messages" className="inline-flex items-center gap-1.5 text-sm text-navy-400 hover:text-mint-300">
        <ArrowLeft size={15} />
        Retour aux messages
      </Link>

      <div className="rounded-2xl border border-navy-800 bg-navy-900/40 p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-xl font-semibold text-cream">{message.name}</h1>
            <p className="mt-1 text-sm text-navy-400">{formatDate(message.createdAt)}</p>
          </div>
          <MessageActions id={message.id} status={message.status} />
        </div>

        <div className="mt-5 flex flex-wrap gap-5 border-y border-navy-800 py-4 text-sm text-navy-300">
          <a href={`mailto:${message.email}`} className="inline-flex items-center gap-2 hover:text-mint-300">
            <Mail size={15} /> {message.email}
          </a>
          {message.phone && (
            <a href={`tel:${message.phone}`} className="inline-flex items-center gap-2 hover:text-mint-300">
              <Phone size={15} /> {message.phone}
            </a>
          )}
        </div>

        {message.subject && <p className="mt-5 text-sm font-medium text-cream">Objet : {message.subject}</p>}
        <p className="mt-3 whitespace-pre-wrap text-navy-200">{message.message}</p>
      </div>
    </div>
  )
}
