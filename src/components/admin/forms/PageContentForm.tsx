'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { FormField, inputClasses } from '@/components/admin/FormField'
import type { EditablePageDef } from '@/lib/editable-pages'

export function PageContentForm({
  def,
  initialTitle,
  initialContent,
}: {
  def: EditablePageDef
  initialTitle: string
  initialContent: Record<string, string>
}) {
  const router = useRouter()
  const [title, setTitle] = useState(initialTitle)
  const [values, setValues] = useState<Record<string, string>>(initialContent)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    setSuccess(false)

    try {
      const res = await fetch(`/api/pages/${def.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content: values }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || 'Une erreur est survenue.')
      }
      setSuccess(true)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <FormField label="Titre" htmlFor="title">
        <input id="title" required className={inputClasses} value={title} onChange={(e) => setTitle(e.target.value)} />
      </FormField>

      {def.fields.map((field) => (
        <FormField key={field.key} label={field.label} htmlFor={field.key} hint={field.hint}>
          {field.type === 'textarea' ? (
            <textarea
              id={field.key}
              rows={5}
              className={inputClasses}
              value={values[field.key] ?? ''}
              onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
            />
          ) : (
            <input
              id={field.key}
              className={inputClasses}
              value={values[field.key] ?? ''}
              onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
            />
          )}
        </FormField>
      ))}

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-800/60 bg-red-950/30 px-4 py-3 text-sm text-red-300">
          <AlertTriangle size={16} />
          {error}
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 rounded-xl border border-mint-700/50 bg-mint-900/20 px-4 py-3 text-sm text-mint-300">
          <CheckCircle2 size={16} />
          Modifications enregistrées.
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center gap-2 rounded-full bg-mint-500 px-6 py-3 text-sm font-semibold text-navy-950 transition-transform duration-300 ease-premium hover:-translate-y-0.5 hover:bg-mint-400 disabled:opacity-60"
      >
        {submitting && <Loader2 size={16} className="animate-spin" />}
        Enregistrer
      </button>
    </form>
  )
}
