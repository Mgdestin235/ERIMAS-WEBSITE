import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { contactFormSchema } from '@/lib/validations'

export async function POST(req: NextRequest) {
  // Vérification d'origine (protection CSRF basique pour un formulaire public).
  const origin = req.headers.get('origin')
  const host = req.headers.get('host')
  if (origin && host && !origin.includes(host)) {
    return NextResponse.json({ error: 'Origine non autorisée.' }, { status: 403 })
  }

  const json = await req.json().catch(() => null)
  const parsed = contactFormSchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Formulaire invalide.', issues: parsed.error.flatten() }, { status: 400 })
  }

  // Champ "pot de miel" rempli → probable robot, on répond succès sans rien faire.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true })
  }

  const { name, email, phone, subject, message } = parsed.data

  await prisma.contactMessage.create({
    data: {
      name,
      email,
      phone: phone || null,
      subject: subject || null,
      message,
    },
  })

  return NextResponse.json({ ok: true })
}
