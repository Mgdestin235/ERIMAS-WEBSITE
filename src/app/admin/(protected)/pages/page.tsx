import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { EDITABLE_PAGES } from '@/lib/editable-pages'

export const metadata: Metadata = { title: 'Pages du site' }

export default function AdminPagesPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Pages du site"
        description="Blocs de contenu complémentaires, éditables sans intervention d'un développeur."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {EDITABLE_PAGES.map((page) => (
          <Link
            key={page.slug}
            href={`/admin/pages/${page.slug}`}
            className="flex items-center justify-between rounded-2xl border border-navy-800 bg-navy-900/40 p-6 transition-colors hover:border-mint-500/40"
          >
            <div>
              <p className="font-medium text-cream">{page.label}</p>
              <p className="mt-1 text-xs text-navy-500">/{page.slug}</p>
            </div>
            <ArrowUpRight size={16} className="text-mint-400" />
          </Link>
        ))}
      </div>
    </div>
  )
}
