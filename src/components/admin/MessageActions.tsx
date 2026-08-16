'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { DeleteButton } from '@/components/admin/DeleteButton'
import type { MessageStatus } from '@prisma/client'

export function MessageActions({ id, status }: { id: string; status: MessageStatus }) {
  const router = useRouter()
  const [loading, setLoading] = useState<MessageStatus | null>(null)

  async function setStatus(next: MessageStatus) {
    setLoading(next)
    await fetch(`/api/messages/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: next }),
    })
    router.refresh()
    setLoading(null)
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {status !== 'READ' && (
        <button
          onClick={() => setStatus('READ')}
          disabled={loading !== null}
          className="inline-flex items-center gap-1.5 rounded-full border border-navy-700 px-4 py-2 text-xs font-semibold text-navy-200 hover:border-mint-400 hover:text-mint-300"
        >
          {loading === 'READ' && <Loader2 size={12} className="animate-spin" />}
          Marquer comme lu
        </button>
      )}
      {status !== 'ARCHIVED' && (
        <button
          onClick={() => setStatus('ARCHIVED')}
          disabled={loading !== null}
          className="inline-flex items-center gap-1.5 rounded-full border border-navy-700 px-4 py-2 text-xs font-semibold text-navy-200 hover:border-mint-400 hover:text-mint-300"
        >
          {loading === 'ARCHIVED' && <Loader2 size={12} className="animate-spin" />}
          Archiver
        </button>
      )}
      <DeleteButton endpoint={`/api/messages/${id}`} onDeleted={() => router.push('/admin/messages')} />
    </div>
  )
}
