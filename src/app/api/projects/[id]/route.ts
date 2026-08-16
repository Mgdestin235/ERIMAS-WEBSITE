import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { projectSchema } from '@/lib/validations'
import { requireUser } from '@/lib/api-guards'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const { response } = await requireUser()
  if (response) return response

  const project = await prisma.project.findUnique({ where: { id: params.id } })
  if (!project) return NextResponse.json({ error: 'Projet introuvable.' }, { status: 404 })
  return NextResponse.json(project)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { response } = await requireUser()
  if (response) return response

  const json = await req.json().catch(() => null)
  const parsed = projectSchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Formulaire invalide.', issues: parsed.error.flatten() }, { status: 400 })
  }

  const existing = await prisma.project.findUnique({ where: { id: params.id } })
  if (!existing) return NextResponse.json({ error: 'Projet introuvable.' }, { status: 404 })

  const slugTaken = await prisma.project.findFirst({ where: { slug: parsed.data.slug, NOT: { id: params.id } } })
  if (slugTaken) return NextResponse.json({ error: 'Ce slug est déjà utilisé par un autre projet.' }, { status: 409 })

  const project = await prisma.project.update({
    where: { id: params.id },
    data: {
      ...parsed.data,
      sector: parsed.data.sector || null,
      location: parsed.data.location || null,
      coverImage: parsed.data.coverImage || null,
      year: parsed.data.year ?? null,
      featured: parsed.data.featured ?? false,
    },
  })

  return NextResponse.json(project)
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const { response } = await requireUser()
  if (response) return response

  await prisma.project.delete({ where: { id: params.id } }).catch(() => null)
  return NextResponse.json({ ok: true })
}
