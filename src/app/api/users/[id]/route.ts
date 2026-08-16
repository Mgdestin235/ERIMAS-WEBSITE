import { NextResponse, type NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db'
import { userSchema } from '@/lib/validations'
import { requireAdminUser } from '@/lib/api-guards'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const { response } = await requireAdminUser()
  if (response) return response

  const user = await prisma.user.findUnique({
    where: { id: params.id },
    select: { id: true, name: true, email: true, role: true, isActive: true, lastLoginAt: true, createdAt: true },
  })
  if (!user) return NextResponse.json({ error: 'Utilisateur introuvable.' }, { status: 404 })
  return NextResponse.json(user)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { response } = await requireAdminUser()
  if (response) return response

  const json = await req.json().catch(() => null)
  const parsed = userSchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Formulaire invalide.', issues: parsed.error.flatten() }, { status: 400 })
  }

  const data: Record<string, unknown> = {
    name: parsed.data.name,
    email: parsed.data.email.toLowerCase(),
    role: parsed.data.role,
    isActive: parsed.data.isActive ?? true,
  }
  if (parsed.data.password) {
    data.passwordHash = await bcrypt.hash(parsed.data.password, 12)
  }

  const user = await prisma.user
    .update({
      where: { id: params.id },
      data,
      select: { id: true, name: true, email: true, role: true, isActive: true },
    })
    .catch(() => null)

  if (!user) return NextResponse.json({ error: 'Utilisateur introuvable.' }, { status: 404 })
  return NextResponse.json(user)
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const { user: currentUser, response } = await requireAdminUser()
  if (response) return response

  if (currentUser!.id === params.id) {
    return NextResponse.json({ error: 'Vous ne pouvez pas supprimer votre propre compte.' }, { status: 400 })
  }

  const target = await prisma.user.findUnique({ where: { id: params.id } })
  if (!target) return NextResponse.json({ error: 'Utilisateur introuvable.' }, { status: 404 })

  if (target.role === 'ADMIN') {
    const adminCount = await prisma.user.count({ where: { role: 'ADMIN' } })
    if (adminCount <= 1) {
      return NextResponse.json({ error: 'Impossible de supprimer le dernier compte administrateur.' }, { status: 400 })
    }
  }

  await prisma.user.delete({ where: { id: params.id } })
  return NextResponse.json({ ok: true })
}
