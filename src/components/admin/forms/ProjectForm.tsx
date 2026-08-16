'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, AlertTriangle } from 'lucide-react'
import type { Project } from '@prisma/client'
import { FormField, inputClasses } from '@/components/admin/FormField'
import { RichTextEditor } from '@/components/admin/RichTextEditor'
import { DeleteButton } from '@/components/admin/DeleteButton'
import { slugify } from '@/lib/utils'

export function ProjectForm({ initial }: { initial: Project | null }) {
  const router = useRouter()
  const isNew = !initial

  const [title, setTitle] = useState(initial?.title ?? '')
  const [slug, setSlug] = useState(initial?.slug ?? '')
  const [slugTouched, setSlugTouched] = useState(!isNew)
  const [client, setClient] = useState(initial?.client ?? '')
  const [sector, setSector] = useState(initial?.sector ?? '')
  const [location, setLocation] = useState(initial?.location ?? '')
  const [year, setYear] = useState(initial?.year?.toString() ?? '')
  const [summary, setSummary] = useState(initial?.summary ?? '')
  const [content, setContent] = useState(initial?.content ?? '')
  const [coverImage, setCoverImage] = useState(initial?.coverImage ?? '')
  const [featured, setFeatured] = useState(initial?.featured ?? false)
  const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED'>(initial?.status ?? 'DRAFT')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    const payload = {
      title,
      slug,
      client,
      sector,
      location,
      year: year ? Number(year) : undefined,
      summary,
      content,
      coverImage,
      featured,
      status,
    }
    const endpoint = isNew ? '/api/projects' : `/api/projects/${initial!.id}`
    const method = isNew ? 'POST' : 'PUT'

    try {
      const res = await fetch(endpoint, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || 'Une erreur est survenue.')
      }
      router.push('/admin/projets')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.')
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-5 lg:grid-cols-2">
        <FormField label="Titre de la fiche" htmlFor="title" hint="Ex : « Mission — Coopération Suisse au Tchad »">
          <input
            id="title"
            required
            className={inputClasses}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              if (!slugTouched) setSlug(slugify(e.target.value))
            }}
          />
        </FormField>
        <FormField label="Slug (URL)" htmlFor="slug" hint="Utilisé dans l'adresse /projets/…">
          <input
            id="slug"
            required
            className={inputClasses}
            value={slug}
            onChange={(e) => {
              setSlug(slugify(e.target.value))
              setSlugTouched(true)
            }}
          />
        </FormField>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <FormField label="Client" htmlFor="client">
          <input id="client" required className={inputClasses} value={client} onChange={(e) => setClient(e.target.value)} />
        </FormField>
        <FormField label="Secteur" htmlFor="sector">
          <input id="sector" className={inputClasses} value={sector ?? ''} onChange={(e) => setSector(e.target.value)} />
        </FormField>
        <FormField label="Année" htmlFor="year">
          <input id="year" type="number" className={inputClasses} value={year} onChange={(e) => setYear(e.target.value)} />
        </FormField>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <FormField label="Localisation" htmlFor="location">
          <input id="location" className={inputClasses} value={location ?? ''} onChange={(e) => setLocation(e.target.value)} />
        </FormField>
        <FormField label="Image de couverture (URL)" htmlFor="coverImage">
          <input id="coverImage" className={inputClasses} value={coverImage ?? ''} onChange={(e) => setCoverImage(e.target.value)} placeholder="/uploads/…" />
        </FormField>
      </div>

      <FormField label="Résumé" htmlFor="summary" hint="Affiché dans les listes (max 400 caractères).">
        <textarea id="summary" required rows={2} maxLength={400} className={inputClasses} value={summary} onChange={(e) => setSummary(e.target.value)} />
      </FormField>

      <FormField label="Description détaillée" htmlFor="content">
        <RichTextEditor value={content} onChange={setContent} placeholder="Décrivez la mission, son périmètre, ses résultats…" />
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Statut de publication" htmlFor="status">
          <select id="status" className={inputClasses} value={status} onChange={(e) => setStatus(e.target.value as 'DRAFT' | 'PUBLISHED')}>
            <option value="DRAFT">Brouillon</option>
            <option value="PUBLISHED">Publié</option>
          </select>
        </FormField>
        <label className="flex items-center gap-2.5 self-end pb-2.5 text-sm text-navy-200">
          <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="h-4 w-4 rounded border-navy-600 bg-navy-900 text-mint-500 focus:ring-mint-400" />
          Mettre en avant sur la page Références
        </label>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-800/60 bg-red-950/30 px-4 py-3 text-sm text-red-300">
          <AlertTriangle size={16} />
          {error}
        </div>
      )}

      <div className="flex items-center justify-between border-t border-navy-800 pt-6">
        {!isNew ? <DeleteButton endpoint={`/api/projects/${initial!.id}`} onDeleted={() => router.push('/admin/projets')} label="Supprimer le projet" /> : <span />}
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 rounded-full bg-mint-500 px-6 py-3 text-sm font-semibold text-navy-950 transition-transform duration-300 ease-premium hover:-translate-y-0.5 hover:bg-mint-400 disabled:opacity-60"
        >
          {submitting && <Loader2 size={16} className="animate-spin" />}
          {isNew ? 'Créer le projet' : 'Enregistrer les modifications'}
        </button>
      </div>
    </form>
  )
}
