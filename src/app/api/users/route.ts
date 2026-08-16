import { NextResponse, type NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db'
import { userSchema } from '@/lib/validations'
import { requireAdminUser } from '@/lib/api-guards'

export async function GET() {
  const { response } = await requireAdminUser()
  if (response) return response

  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'asc' },
    select: { id: true, name: true, email: true, role: true, isActive: true, lastLoginAt: true, createdAt: true },
  })
  return NextResponse.json(users)
}

export async function POST(req: NextRequest) {
  const { response } = await requireAdminUser()
  if (response) return response

  const json = await req.json().catch(() => null)
  const parsed = userSchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Formulaire invalide.', issues: parsed.error.flatten() }, { status: 400 })
  }
  if (!parsed.data.password) {
    return NextResponse.json({ error: 'Un mot de passe est requis à la création.' }, { status: 400 })
  }

  const existing = await prisma.user.findUnique({ where: { email: parsed.data.email.toLowerCase() } })
  if (existing) return NextResponse.json({ error: 'Un compte existe déjà avec cet e-mail.' }, { status: 409 })

  const passwordHash = await bcrypt.hash(parsed.data.password, 12)
  const user = await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email.toLowerCase(),
      role: parsed.data.role,
      isActive: parsed.data.isActive ?? true,
      passwordHash,
    },
    select: { id: true, name: true, email: true, role: true, isActive: true },
  })

  return NextResponse.json(user, { status: 201 })
}
