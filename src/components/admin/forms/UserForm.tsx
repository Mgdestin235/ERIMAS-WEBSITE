'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, AlertTriangle } from 'lucide-react'
import { FormField, inputClasses } from '@/components/admin/FormField'
import { DeleteButton } from '@/components/admin/DeleteButton'

type UserLite = {
  id: string
  name: string
  email: string
  role: 'ADMIN' | 'EDITOR'
  isActive: boolean
}

export function UserForm({ initial, canDeleteSelf }: { initial: UserLite | null; canDeleteSelf: boolean }) {
  const router = useRouter()
  const isNew = !initial

  const [name, setName] = useState(initial?.name ?? '')
  const [email, setEmail] = useState(initial?.email ?? '')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'ADMIN' | 'EDITOR'>(initial?.role ?? 'EDITOR')
  const [isActive, setIsActive] = useState(initial?.isActive ?? true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    const payload = { name, email, password: password || undefined, role, isActive }
    const endpoint = isNew ? '/api/users' : `/api/users/${initial!.id}`
    const method = isNew ? 'POST' : 'PUT'

    try {
      const res = await fetch(endpoint, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || 'Une erreur est survenue.')
      }
      router.push('/admin/utilisateurs')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.')
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Nom complet" htmlFor="name">
          <input id="name" required className={inputClasses} value={name} onChange={(e) => setName(e.target.value)} />
        </FormField>
        <FormField label="E-mail" htmlFor="email">
          <input id="email" type="email" required className={inputClasses} value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormField>
      </div>

      <FormField label={isNew ? 'Mot de passe' : 'Nouveau mot de passe'} htmlFor="password" hint={isNew ? 'Au moins 8 caractères.' : 'Laisser vide pour ne pas le modifier.'}>
        <input id="password" type="password" className={inputClasses} value={password} onChange={(e) => setPassword(e.target.value)} minLength={isNew ? 8 : undefined} required={isNew} />
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Rôle" htmlFor="role">
          <select id="role" className={inputClasses} value={role} onChange={(e) => setRole(e.target.value as 'ADMIN' | 'EDITOR')}>
            <option value="EDITOR">Éditeur</option>
            <option value="ADMIN">Administrateur</option>
          </select>
        </FormField>
        <label className="flex items-center gap-2.5 self-end pb-2.5 text-sm text-navy-200">
          <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="h-4 w-4 rounded border-navy-600 bg-navy-900 text-mint-500 focus:ring-mint-400" />
          Compte actif
        </label>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-800/60 bg-red-950/30 px-4 py-3 text-sm text-red-300">
          <AlertTriangle size={16} />
          {error}
        </div>
      )}

      <div className="flex items-center justify-between border-t border-navy-800 pt-6">
        {!isNew && canDeleteSelf ? (
          <DeleteButton endpoint={`/api/users/${initial!.id}`} onDeleted={() => router.push('/admin/utilisateurs')} />
        ) : (
          <span />
        )}
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 rounded-full bg-mint-500 px-6 py-3 text-sm font-semibold text-navy-950 transition-transform duration-300 ease-premium hover:-translate-y-0.5 hover:bg-mint-400 disabled:opacity-60"
        >
          {submitting && <Loader2 size={16} className="animate-spin" />}
          {isNew ? 'Créer le compte' : 'Enregistrer'}
        </button>
      </div>
    </form>
  )
}
