import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticleForm } from '@/components/admin/forms/ArticleForm'
import { prisma } from '@/lib/db'

export const metadata: Metadata = { title: 'Article' }

export default async function AdminArticleEditPage({ params }: { params: { id: string } }) {
  const isNew = params.id === 'nouveau'
  const article = isNew ? null : await prisma.article.findUnique({ where: { id: params.id } })

  if (!isNew && !article) notFound()

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-cream">{isNew ? 'Nouvel article' : 'Modifier l’article'}</h1>
        <p className="mt-1 text-sm text-navy-400">
          {isNew ? 'Rédigez un nouvel article pour le blog ERIMAS.' : article?.title}
        </p>
      </div>
      <ArticleForm initial={article} />
    </div>
  )
}
