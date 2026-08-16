import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { testimonialSchema } from '@/lib/validations'
import { requireUser } from '@/lib/api-guards'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const { response } = await requireUser()
  if (response) return response

  const testimonial = await prisma.testimonial.findUnique({ where: { id: params.id } })
  if (!testimonial) return NextResponse.json({ error: 'Témoignage introuvable.' }, { status: 404 })
  return NextResponse.json(testimonial)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { response } = await requireUser()
  if (response) return response

  const json = await req.json().catch(() => null)
  const parsed = testimonialSchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Formulaire invalide.', issues: parsed.error.flatten() }, { status: 400 })
  }

  const testimonial = await prisma.testimonial
    .update({
      where: { id: params.id },
      data: {
        ...parsed.data,
        authorRole: parsed.data.authorRole || null,
        organization: parsed.data.organization || null,
        avatarUrl: parsed.data.avatarUrl || null,
        featured: parsed.data.featured ?? true,
        order: parsed.data.order ?? 0,
      },
    })
    .catch(() => null)

  if (!testimonial) return NextResponse.json({ error: 'Témoignage introuvable.' }, { status: 404 })
  return NextResponse.json(testimonial)
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const { response } = await requireUser()
  if (response) return response

  await prisma.testimonial.delete({ where: { id: params.id } }).catch(() => null)
  return NextResponse.json({ ok: true })
}
