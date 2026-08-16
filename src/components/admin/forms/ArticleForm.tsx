'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, AlertTriangle } from 'lucide-react'
import type { Article } from '@prisma/client'
import { FormField, inputClasses } from '@/components/admin/FormField'
import { RichTextEditor } from '@/components/admin/RichTextEditor'
import { DeleteButton } from '@/components/admin/DeleteButton'
import { slugify } from '@/lib/utils'

export function ArticleForm({ initial }: { initial: Article | null }) {
  const router = useRouter()
  const isNew = !initial

  const [title, setTitle] = useState(initial?.title ?? '')
  const [slug, setSlug] = useState(initial?.slug ?? '')
  const [slugTouched, setSlugTouched] = useState(!isNew)
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? '')
  const [content, setContent] = useState(initial?.content ?? '')
  const [coverImage, setCoverImage] = useState(initial?.coverImage ?? '')
  const [category, setCategory] = useState(initial?.category ?? '')
  const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED'>(initial?.status ?? 'DRAFT')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    const payload = { title, slug, excerpt, content, coverImage, category, status }
    const endpoint = isNew ? '/api/articles' : `/api/articles/${initial!.id}`
    const method = isNew ? 'POST' : 'PUT'

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || 'Une erreur est survenue.')
      }
      router.push('/admin/articles')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.')
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-5 lg:grid-cols-2">
        <FormField label="Titre" htmlFor="title">
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
        <FormField label="Slug (URL)" htmlFor="slug" hint="Utilisé dans l'adresse /blog/…">
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

      <FormField label="Extrait" htmlFor="excerpt" hint="Résumé court affiché dans les listes (max 400 caractères).">
        <textarea id="excerpt" required rows={2} maxLength={400} className={inputClasses} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
      </FormField>

      <div className="grid gap-5 lg:grid-cols-2">
        <FormField label="Image de couverture (URL)" htmlFor="coverImage" hint="Copiez l'URL depuis la médiathèque.">
          <input id="coverImage" className={inputClasses} value={coverImage ?? ''} onChange={(e) => setCoverImage(e.target.value)} placeholder="/uploads/…" />
        </FormField>
        <FormField label="Catégorie" htmlFor="category">
          <input id="category" className={inputClasses} value={category ?? ''} onChange={(e) => setCategory(e.target.value)} placeholder="Ex : Réglementation" />
        </FormField>
      </div>

      <FormField label="Contenu" htmlFor="content">
        <RichTextEditor value={content} onChange={setContent} placeholder="Rédigez l'article…" />
      </FormField>

      <FormField label="Statut de publication" htmlFor="status">
        <select id="status" className={inputClasses} value={status} onChange={(e) => setStatus(e.target.value as 'DRAFT' | 'PUBLISHED')}>
          <option value="DRAFT">Brouillon</option>
          <option value="PUBLISHED">Publié</option>
        </select>
      </FormField>

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-800/60 bg-red-950/30 px-4 py-3 text-sm text-red-300">
          <AlertTriangle size={16} />
          {error}
        </div>
      )}

      <div className="flex items-center justify-between border-t border-navy-800 pt-6">
        {!isNew ? <DeleteButton endpoint={`/api/articles/${initial!.id}`} onDeleted={() => router.push('/admin/articles')} label="Supprimer l'article" /> : <span />}
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 rounded-full bg-mint-500 px-6 py-3 text-sm font-semibold text-navy-950 transition-transform duration-300 ease-premium hover:-translate-y-0.5 hover:bg-mint-400 disabled:opacity-60"
        >
          {submitting && <Loader2 size={16} className="animate-spin" />}
          {isNew ? "Créer l'article" : 'Enregistrer les modifications'}
        </button>
      </div>
    </form>
  )
}
