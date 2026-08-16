import type { Metadata } from 'next'
import Link from 'next/link'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { DeleteButton } from '@/components/admin/DeleteButton'
import { prisma } from '@/lib/db'

export const metadata: Metadata = { title: 'Témoignages' }

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { order: 'asc' } })

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Témoignages" description="Citations clients affichées sur le site public." newHref="/admin/temoignages/nouveau" />

      <div className="grid gap-4 sm:grid-cols-2">
        {testimonials.length === 0 && <p className="text-navy-500">Aucun témoignage enregistré.</p>}
        {testimonials.map((t) => (
          <div key={t.id} className="rounded-2xl border border-navy-800 bg-navy-900/40 p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium text-cream">{t.authorName}</p>
                <p className="text-xs text-navy-400">
                  {[t.authorRole, t.organization].filter(Boolean).join(', ') || '—'}
                </p>
              </div>
              <span className={t.featured ? 'rounded-full bg-mint-900/40 px-2.5 py-1 text-xs text-mint-300' : 'rounded-full bg-navy-800 px-2.5 py-1 text-xs text-navy-400'}>
                {t.featured ? 'Publié' : 'Masqué'}
              </span>
            </div>
            <p className="mt-3 line-clamp-3 text-sm italic text-navy-300">“{t.quote}”</p>
            <div className="mt-4 flex items-center justify-between border-t border-navy-800 pt-3">
              <Link href={`/admin/temoignages/${t.id}`} className="text-xs font-semibold text-mint-400 hover:text-mint-300">
                Modifier
              </Link>
              <DeleteButton endpoint={`/api/testimonials/${t.id}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
