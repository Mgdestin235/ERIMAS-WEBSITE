import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { requireUser } from '@/lib/api-guards'
import { getStorageAdapter, ACCEPTED_MEDIA_TYPES, MAX_UPLOAD_SIZE_BYTES } from '@/lib/storage'

export async function GET() {
  const { response } = await requireUser()
  if (response) return response

  const media = await prisma.media.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(media)
}

export async function POST(req: NextRequest) {
  const { response } = await requireUser()
  if (response) return response

  const formData = await req.formData().catch(() => null)
  const file = formData?.get('file')

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: 'Aucun fichier reçu.' }, { status: 400 })
  }
  if (!ACCEPTED_MEDIA_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'Type de fichier non autorisé (images ou PDF uniquement).' }, { status: 415 })
  }
  if (file.size > MAX_UPLOAD_SIZE_BYTES) {
    return NextResponse.json({ error: 'Fichier trop volumineux (8 Mo maximum).' }, { status: 413 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const storage = getStorageAdapter()
  const { url } = await storage.upload({ buffer, filename: file.name, mimeType: file.type })

  const media = await prisma.media.create({
    data: { filename: file.name, url, mimeType: file.type, size: file.size },
  })

  return NextResponse.json(media, { status: 201 })
}
