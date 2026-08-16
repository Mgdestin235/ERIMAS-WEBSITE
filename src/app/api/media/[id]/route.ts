import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { requireUser } from '@/lib/api-guards'
import { getStorageAdapter } from '@/lib/storage'

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const { response } = await requireUser()
  if (response) return response

  const media = await prisma.media.findUnique({ where: { id: params.id } })
  if (!media) return NextResponse.json({ error: 'Média introuvable.' }, { status: 404 })

  const storage = getStorageAdapter()
  await storage.remove(media.url).catch(() => null)
  await prisma.media.delete({ where: { id: params.id } })

  return NextResponse.json({ ok: true })
}
