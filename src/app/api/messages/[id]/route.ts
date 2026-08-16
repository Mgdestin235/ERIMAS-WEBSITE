import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { requireUser } from '@/lib/api-guards'

const statusSchema = z.object({ status: z.enum(['NEW', 'READ', 'ARCHIVED']) })

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const { response } = await requireUser()
  if (response) return response

  const message = await prisma.contactMessage.findUnique({ where: { id: params.id } })
  if (!message) return NextResponse.json({ error: 'Message introuvable.' }, { status: 404 })
  return NextResponse.json(message)
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { response } = await requireUser()
  if (response) return response

  const json = await req.json().catch(() => null)
  const parsed = statusSchema.safeParse(json)
  if (!parsed.success) return NextResponse.json({ error: 'Statut invalide.' }, { status: 400 })

  const message = await prisma.contactMessage
    .update({ where: { id: params.id }, data: { status: parsed.data.status } })
    .catch(() => null)

  if (!message) return NextResponse.json({ error: 'Message introuvable.' }, { status: 404 })
  return NextResponse.json(message)
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const { response } = await requireUser()
  if (response) return response

  await prisma.contactMessage.delete({ where: { id: params.id } }).catch(() => null)
  return NextResponse.json({ ok: true })
}
