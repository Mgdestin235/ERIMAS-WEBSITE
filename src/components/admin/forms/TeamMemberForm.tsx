'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, AlertTriangle } from 'lucide-react'
import type { TeamMember } from '@prisma/client'
import { FormField, inputClasses } from '@/components/admin/FormField'
import { DeleteButton } from '@/components/admin/DeleteButton'

export function TeamMemberForm({ initial }: { initial: TeamMember | null }) {
  const router = useRouter()
  const isNew = !initial

  const [name, setName] = useState(initial?.name ?? '')
  const [role, setRole] = useState(initial?.role ?? '')
  const [bio, setBio] = useState(initial?.bio ?? '')
  const [photoUrl, setPhotoUrl] = useState(initial?.photoUrl ?? '')
  const [isFounder, setIsFounder] = useState(initial?.isFounder ?? false)
  const [order, setOrder] = useState(initial?.order?.toString() ?? '0')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    const payload = { name, role, bio, photoUrl, isFounder, order: Number(order) || 0 }
    const endpoint = isNew ? '/api/team' : `/api/team/${initial!.id}`
    const method = isNew ? 'POST' : 'PUT'

    try {
      const res = await fetch(endpoint, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || 'Une erreur est survenue.')
      }
      router.push('/admin/equipe')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.')
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Nom complet" htmlFor="name">
          <input id="name" required className={inputClasses} value={name} onChange={(e) => setName(e.target.value)} />
        </FormField>
        <FormField label="Fonction" htmlFor="role">
          <input id="role" required className={inputClasses} value={role} onChange={(e) => setRole(e.target.value)} />
        </FormField>
      </div>

      <FormField label="Biographie" htmlFor="bio">
        <textarea id="bio" rows={4} className={inputClasses} value={bio ?? ''} onChange={(e) => setBio(e.target.value)} />
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Photo (URL)" htmlFor="photoUrl">
          <input id="photoUrl" className={inputClasses} value={photoUrl ?? ''} onChange={(e) => setPhotoUrl(e.target.value)} placeholder="/uploads/…" />
        </FormField>
        <FormField label="Ordre d'affichage" htmlFor="order">
          <input id="order" type="number" className={inputClasses} value={order} onChange={(e) => setOrder(e.target.value)} />
        </FormField>
      </div>

      <label className="flex items-center gap-2.5 text-sm text-navy-200">
        <input type="checkbox" checked={isFounder} onChange={(e) => setIsFounder(e.target.checked)} className="h-4 w-4 rounded border-navy-600 bg-navy-900 text-mint-500 focus:ring-mint-400" />
        Associé(e) fondateur/trice
      </label>

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-800/60 bg-red-950/30 px-4 py-3 text-sm text-red-300">
          <AlertTriangle size={16} />
          {error}
        </div>
      )}

      <div className="flex items-center justify-between border-t border-navy-800 pt-6">
        {!isNew ? <DeleteButton endpoint={`/api/team/${initial!.id}`} onDeleted={() => router.push('/admin/equipe')} /> : <span />}
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 rounded-full bg-mint-500 px-6 py-3 text-sm font-semibold text-navy-950 transition-transform duration-300 ease-premium hover:-translate-y-0.5 hover:bg-mint-400 disabled:opacity-60"
        >
          {submitting && <Loader2 size={16} className="animate-spin" />}
          {isNew ? 'Créer' : 'Enregistrer'}
        </button>
      </div>
    </form>
  )
}
