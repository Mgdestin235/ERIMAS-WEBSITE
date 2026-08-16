import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { requireUser } from '@/lib/api-guards'

const pageSchema = z.object({
  title: z.string().trim().min(2).max(200),
  content: z.record(z.string(), z.any()),
})

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  const { response } = await requireUser()
  if (response) return response

  const page = await prisma.page.findUnique({ where: { slug: params.slug } })
  if (!page) return NextResponse.json({ error: 'Page introuvable.' }, { status: 404 })
  return NextResponse.json(page)
}

export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
  const { response } = await requireUser()
  if (response) return response

  const json = await req.json().catch(() => null)
  const parsed = pageSchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Formulaire invalide.', issues: parsed.error.flatten() }, { status: 400 })
  }

  const page = await prisma.page.upsert({
    where: { slug: params.slug },
    update: { title: parsed.data.title, content: parsed.data.content },
    create: { slug: params.slug, title: parsed.data.title, content: parsed.data.content },
  })

  return NextResponse.json(page)
}
