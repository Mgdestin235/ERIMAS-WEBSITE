'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, AlertTriangle } from 'lucide-react'
import type { Testimonial } from '@prisma/client'
import { FormField, inputClasses } from '@/components/admin/FormField'
import { DeleteButton } from '@/components/admin/DeleteButton'

export function TestimonialForm({ initial }: { initial: Testimonial | null }) {
  const router = useRouter()
  const isNew = !initial

  const [authorName, setAuthorName] = useState(initial?.authorName ?? '')
  const [authorRole, setAuthorRole] = useState(initial?.authorRole ?? '')
  const [organization, setOrganization] = useState(initial?.organization ?? '')
  const [quote, setQuote] = useState(initial?.quote ?? '')
  const [avatarUrl, setAvatarUrl] = useState(initial?.avatarUrl ?? '')
  const [featured, setFeatured] = useState(initial?.featured ?? true)
  const [order, setOrder] = useState(initial?.order?.toString() ?? '0')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    const payload = { authorName, authorRole, organization, quote, avatarUrl, featured, order: Number(order) || 0 }
    const endpoint = isNew ? '/api/testimonials' : `/api/testimonials/${initial!.id}`
    const method = isNew ? 'POST' : 'PUT'

    try {
      const res = await fetch(endpoint, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || 'Une erreur est survenue.')
      }
      router.push('/admin/temoignages')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.')
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Nom de l'auteur" htmlFor="authorName">
          <input id="authorName" required className={inputClasses} value={authorName} onChange={(e) => setAuthorName(e.target.value)} />
        </FormField>
        <FormField label="Fonction" htmlFor="authorRole">
          <input id="authorRole" className={inputClasses} value={authorRole ?? ''} onChange={(e) => setAuthorRole(e.target.value)} />
        </FormField>
      </div>

      <FormField label="Organisation" htmlFor="organization">
        <input id="organization" className={inputClasses} value={organization ?? ''} onChange={(e) => setOrganization(e.target.value)} />
      </FormField>

      <FormField label="Citation" htmlFor="quote">
        <textarea id="quote" required rows={4} maxLength={1000} className={inputClasses} value={quote} onChange={(e) => setQuote(e.target.value)} />
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Photo (URL)" htmlFor="avatarUrl">
          <input id="avatarUrl" className={inputClasses} value={avatarUrl ?? ''} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="/uploads/…" />
        </FormField>
        <FormField label="Ordre d'affichage" htmlFor="order">
          <input id="order" type="number" className={inputClasses} value={order} onChange={(e) => setOrder(e.target.value)} />
        </FormField>
      </div>

      <label className="flex items-center gap-2.5 text-sm text-navy-200">
        <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="h-4 w-4 rounded border-navy-600 bg-navy-900 text-mint-500 focus:ring-mint-400" />
        Publier ce témoignage sur le site public
      </label>

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-800/60 bg-red-950/30 px-4 py-3 text-sm text-red-300">
          <AlertTriangle size={16} />
          {error}
        </div>
      )}

      <div className="flex items-center justify-between border-t border-navy-800 pt-6">
        {!isNew ? <DeleteButton endpoint={`/api/testimonials/${initial!.id}`} onDeleted={() => router.push('/admin/temoignages')} /> : <span />}
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
