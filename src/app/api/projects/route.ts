import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { projectSchema } from '@/lib/validations'
import { requireUser } from '@/lib/api-guards'

export async function GET() {
  const { response } = await requireUser()
  if (response) return response

  const projects = await prisma.project.findMany({ orderBy: { updatedAt: 'desc' } })
  return NextResponse.json(projects)
}

export async function POST(req: NextRequest) {
  const { response } = await requireUser()
  if (response) return response

  const json = await req.json().catch(() => null)
  const parsed = projectSchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Formulaire invalide.', issues: parsed.error.flatten() }, { status: 400 })
  }

  const existing = await prisma.project.findUnique({ where: { slug: parsed.data.slug } })
  if (existing) return NextResponse.json({ error: 'Ce slug est déjà utilisé par un autre projet.' }, { status: 409 })

  const project = await prisma.project.create({
    data: {
      ...parsed.data,
      sector: parsed.data.sector || null,
      location: parsed.data.location || null,
      coverImage: parsed.data.coverImage || null,
      year: parsed.data.year ?? null,
      featured: parsed.data.featured ?? false,
    },
  })

  return NextResponse.json(project, { status: 201 })
}
