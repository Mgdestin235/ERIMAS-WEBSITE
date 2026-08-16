'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Bouton de suppression à double confirmation en ligne (pas de modale) :
 * un premier clic arme la confirmation pendant quelques secondes, un
 * second clic déclenche réellement la suppression.
 */
export function DeleteButton({ endpoint, onDeleted, label = 'Supprimer' }: { endpoint: string; onDeleted?: () => void; label?: string }) {
  const router = useRouter()
  const [armed, setArmed] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    if (!armed) {
      setArmed(true)
      setTimeout(() => setArmed(false), 3500)
      return
    }
    setLoading(true)
    try {
      const res = await fetch(endpoint, { method: 'DELETE' })
      if (!res.ok) throw new Error('delete-failed')
      if (onDeleted) onDeleted()
      else router.refresh()
    } finally {
      setLoading(false)
      setArmed(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors',
        armed ? 'bg-red-500 text-white' : 'text-navy-400 hover:bg-red-950/40 hover:text-red-300'
      )}
    >
      {loading ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
      {armed ? 'Confirmer ?' : label}
    </button>
  )
}
