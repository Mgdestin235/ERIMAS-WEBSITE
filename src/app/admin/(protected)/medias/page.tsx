'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Upload, Copy, Check, Loader2, ImageOff } from 'lucide-react'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { DeleteButton } from '@/components/admin/DeleteButton'

type MediaItem = {
  id: string
  filename: string
  url: string
  mimeType: string
  size: number
  createdAt: string
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} o`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} Ko`
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`
}

export default function AdminMediaPage() {
  const [items, setItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const load = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/media')
    if (res.ok) setItems(await res.json())
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return
    setUploading(true)
    setError(null)
    for (const file of Array.from(files)) {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/media', { method: 'POST', body: formData })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        setError(body.error || `Échec de l'envoi de ${file.name}.`)
      }
    }
    await load()
    setUploading(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  function copyUrl(item: MediaItem) {
    navigator.clipboard.writeText(item.url).then(() => {
      setCopiedId(item.id)
      setTimeout(() => setCopiedId(null), 1500)
    })
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Médiathèque" description="Images et documents utilisables dans les articles, projets, témoignages et l'équipe." />

      <label
        className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-navy-700 bg-navy-900/30 px-6 py-10 text-center transition-colors hover:border-mint-400/60"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          handleUpload(e.dataTransfer.files)
        }}
      >
        {uploading ? <Loader2 className="animate-spin text-mint-400" /> : <Upload className="text-mint-400" />}
        <p className="text-sm font-medium text-cream">Glissez-déposez un fichier, ou cliquez pour parcourir</p>
        <p className="text-xs text-navy-500">JPEG, PNG, WEBP, SVG ou PDF — 8 Mo maximum</p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,image/svg+xml,application/pdf"
          className="hidden"
          onChange={(e) => handleUpload(e.target.files)}
        />
      </label>

      {error && <div className="rounded-xl border border-red-800/60 bg-red-950/30 px-4 py-3 text-sm text-red-300">{error}</div>}

      {loading ? (
        <p className="text-navy-500">Chargement…</p>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-navy-800 bg-navy-900/40 p-12 text-center text-navy-500">
          <ImageOff className="mx-auto mb-3 h-8 w-8" />
          Aucun média téléversé pour le moment.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-2xl border border-navy-800 bg-navy-900/40">
              <div className="flex h-32 items-center justify-center bg-navy-950">
                {item.mimeType.startsWith('image/') ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.url} alt={item.filename} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-xs text-navy-500">PDF</span>
                )}
              </div>
              <div className="p-3">
                <p className="truncate text-xs font-medium text-cream" title={item.filename}>
                  {item.filename}
                </p>
                <p className="text-xs text-navy-500">{formatSize(item.size)}</p>
                <div className="mt-3 flex items-center justify-between">
                  <button onClick={() => copyUrl(item)} className="inline-flex items-center gap-1 text-xs font-semibold text-mint-400 hover:text-mint-300">
                    {copiedId === item.id ? <Check size={12} /> : <Copy size={12} />}
                    {copiedId === item.id ? 'Copié' : 'Copier l’URL'}
                  </button>
                  <DeleteButton endpoint={`/api/media/${item.id}`} onDeleted={load} label="" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
