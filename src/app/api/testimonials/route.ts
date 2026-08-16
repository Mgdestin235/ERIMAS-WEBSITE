import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { testimonialSchema } from '@/lib/validations'
import { requireUser } from '@/lib/api-guards'

export async function GET() {
  const { response } = await requireUser()
  if (response) return response

  const testimonials = await prisma.testimonial.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(testimonials)
}

export async function POST(req: NextRequest) {
  const { response } = await requireUser()
  if (response) return response

  const json = await req.json().catch(() => null)
  const parsed = testimonialSchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Formulaire invalide.', issues: parsed.error.flatten() }, { status: 400 })
  }

  const testimonial = await prisma.testimonial.create({
    data: {
      ...parsed.data,
      authorRole: parsed.data.authorRole || null,
      organization: parsed.data.organization || null,
      avatarUrl: parsed.data.avatarUrl || null,
      featured: parsed.data.featured ?? true,
      order: parsed.data.order ?? 0,
    },
  })

  return NextResponse.json(testimonial, { status: 201 })
}
