import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { articleSchema } from '@/lib/validations'
import { requireUser } from '@/lib/api-guards'

export async function GET() {
  const { response } = await requireUser()
  if (response) return response

  const articles = await prisma.article.findMany({ orderBy: { updatedAt: 'desc' }, include: { author: true } })
  return NextResponse.json(articles)
}

export async function POST(req: NextRequest) {
  const { user, response } = await requireUser()
  if (response) return response

  const json = await req.json().catch(() => null)
  const parsed = articleSchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Formulaire invalide.', issues: parsed.error.flatten() }, { status: 400 })
  }

  const existing = await prisma.article.findUnique({ where: { slug: parsed.data.slug } })
  if (existing) {
    return NextResponse.json({ error: 'Ce slug est déjà utilisé par un autre article.' }, { status: 409 })
  }

  const article = await prisma.article.create({
    data: {
      ...parsed.data,
      coverImage: parsed.data.coverImage || null,
      category: parsed.data.category || null,
      authorId: user!.id,
      publishedAt: parsed.data.status === 'PUBLISHED' ? new Date() : null,
    },
  })

  return NextResponse.json(article, { status: 201 })
}
