import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageContentForm } from '@/components/admin/forms/PageContentForm'
import { getEditablePageDef } from '@/lib/editable-pages'
import { prisma } from '@/lib/db'

export const metadata: Metadata = { title: 'Modifier la page' }

export default async function AdminPageContentEditPage({ params }: { params: { slug: string } }) {
  const def = getEditablePageDef(params.slug)
  if (!def) notFound()

  const page = await prisma.page.findUnique({ where: { slug: params.slug } })
  const content = (page?.content as Record<string, string>) ?? {}

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-cream">{def.label}</h1>
      </div>
      <PageContentForm def={def} initialTitle={page?.title ?? def.defaultTitle} initialContent={content} />
    </div>
  )
}
