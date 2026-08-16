import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { teamMemberSchema } from '@/lib/validations'
import { requireUser } from '@/lib/api-guards'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const { response } = await requireUser()
  if (response) return response

  const member = await prisma.teamMember.findUnique({ where: { id: params.id } })
  if (!member) return NextResponse.json({ error: 'Membre introuvable.' }, { status: 404 })
  return NextResponse.json(member)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { response } = await requireUser()
  if (response) return response

  const json = await req.json().catch(() => null)
  const parsed = teamMemberSchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Formulaire invalide.', issues: parsed.error.flatten() }, { status: 400 })
  }

  const member = await prisma.teamMember
    .update({
      where: { id: params.id },
      data: {
        ...parsed.data,
        bio: parsed.data.bio || null,
        photoUrl: parsed.data.photoUrl || null,
        isFounder: parsed.data.isFounder ?? false,
        order: parsed.data.order ?? 0,
      },
    })
    .catch(() => null)

  if (!member) return NextResponse.json({ error: 'Membre introuvable.' }, { status: 404 })
  return NextResponse.json(member)
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const { response } = await requireUser()
  if (response) return response

  await prisma.teamMember.delete({ where: { id: params.id } }).catch(() => null)
  return NextResponse.json({ ok: true })
}
