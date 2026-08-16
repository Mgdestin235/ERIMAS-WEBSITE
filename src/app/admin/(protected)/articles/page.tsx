import type { Metadata } from 'next'
import Link from 'next/link'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { DeleteButton } from '@/components/admin/DeleteButton'
import { prisma } from '@/lib/db'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = { title: 'Articles' }

export default async function AdminArticlesPage() {
  const articles = await prisma.article.findMany({ orderBy: { updatedAt: 'desc' }, include: { author: true } })

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Articles" description="Gérez les actualités publiées sur le blog." newHref="/admin/articles/nouveau" />

      <div className="overflow-x-auto rounded-2xl border border-navy-800 bg-navy-900/40">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-navy-800 text-xs uppercase tracking-wider text-navy-500">
              <th className="px-5 py-3 font-medium">Titre</th>
              <th className="px-5 py-3 font-medium">Statut</th>
              <th className="px-5 py-3 font-medium">Auteur</th>
              <th className="px-5 py-3 font-medium">Mis à jour</th>
              <th className="px-5 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {articles.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-navy-500">
                  Aucun article. Créez le premier depuis le bouton « Nouveau ».
                </td>
              </tr>
            )}
            {articles.map((article) => (
              <tr key={article.id} className="border-b border-navy-800/60 last:border-0">
                <td className="px-5 py-3.5">
                  <Link href={`/admin/articles/${article.id}`} className="font-medium text-cream hover:text-mint-300">
                    {article.title}
                  </Link>
                </td>
                <td className="px-5 py-3.5">
                  <span
                    className={
                      article.status === 'PUBLISHED'
                        ? 'rounded-full bg-mint-900/40 px-2.5 py-1 text-xs text-mint-300'
                        : 'rounded-full bg-navy-800 px-2.5 py-1 text-xs text-navy-300'
                    }
                  >
                    {article.status === 'PUBLISHED' ? 'Publié' : 'Brouillon'}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-navy-400">{article.author?.name ?? '—'}</td>
                <td className="px-5 py-3.5 text-navy-400">{formatDate(article.updatedAt)}</td>
                <td className="px-5 py-3.5 text-right">
                  <DeleteButton endpoint={`/api/articles/${article.id}`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
