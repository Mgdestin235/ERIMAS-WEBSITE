import Link from 'next/link'
import { Plus } from 'lucide-react'

export function AdminPageHeader({
  title,
  description,
  newHref,
  newLabel = 'Nouveau',
}: {
  title: string
  description?: string
  newHref?: string
  newLabel?: string
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="font-display text-2xl font-semibold text-cream">{title}</h1>
        {description && <p className="mt-1 text-sm text-navy-400">{description}</p>}
      </div>
      {newHref && (
        <Link
          href={newHref}
          className="inline-flex items-center gap-2 self-start rounded-full bg-mint-500 px-5 py-2.5 text-sm font-semibold text-navy-950 transition-transform duration-300 ease-premium hover:-translate-y-0.5 hover:bg-mint-400"
        >
          <Plus size={16} />
          {newLabel}
        </Link>
      )}
    </div>
  )
}
