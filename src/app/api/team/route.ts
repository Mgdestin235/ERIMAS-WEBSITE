import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { teamMemberSchema } from '@/lib/validations'
import { requireUser } from '@/lib/api-guards'

export async function GET() {
  const { response } = await requireUser()
  if (response) return response

  const members = await prisma.teamMember.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(members)
}

export async function POST(req: NextRequest) {
  const { response } = await requireUser()
  if (response) return response

  const json = await req.json().catch(() => null)
  const parsed = teamMemberSchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Formulaire invalide.', issues: parsed.error.flatten() }, { status: 400 })
  }

  const member = await prisma.teamMember.create({
    data: {
      ...parsed.data,
      bio: parsed.data.bio || null,
      photoUrl: parsed.data.photoUrl || null,
      isFounder: parsed.data.isFounder ?? false,
      order: parsed.data.order ?? 0,
    },
  })

  return NextResponse.json(member, { status: 201 })
}
