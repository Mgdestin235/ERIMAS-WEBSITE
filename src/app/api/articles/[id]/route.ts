import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { articleSchema } from '@/lib/validations'
import { requireUser } from '@/lib/api-guards'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const { response } = await requireUser()
  if (response) return response

  const article = await prisma.article.findUnique({ where: { id: params.id } })
  if (!article) return NextResponse.json({ error: 'Article introuvable.' }, { status: 404 })
  return NextResponse.json(article)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { response } = await requireUser()
  if (response) return response

  const json = await req.json().catch(() => null)
  const parsed = articleSchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Formulaire invalide.', issues: parsed.error.flatten() }, { status: 400 })
  }

  const existing = await prisma.article.findUnique({ where: { id: params.id } })
  if (!existing) return NextResponse.json({ error: 'Article introuvable.' }, { status: 404 })

  const slugTaken = await prisma.article.findFirst({ where: { slug: parsed.data.slug, NOT: { id: params.id } } })
  if (slugTaken) return NextResponse.json({ error: 'Ce slug est déjà utilisé par un autre article.' }, { status: 409 })

  const article = await prisma.article.update({
    where: { id: params.id },
    data: {
      ...parsed.data,
      coverImage: parsed.data.coverImage || null,
      category: parsed.data.category || null,
      publishedAt: parsed.data.status === 'PUBLISHED' ? existing.publishedAt ?? new Date() : existing.publishedAt,
    },
  })

  return NextResponse.json(article)
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const { response } = await requireUser()
  if (response) return response

  await prisma.article.delete({ where: { id: params.id } }).catch(() => null)
  return NextResponse.json({ ok: true })
}
