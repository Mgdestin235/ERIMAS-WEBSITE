import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireUser } from '@/lib/api-guards'

export async function GET() {
  const { response } = await requireUser()
  if (response) return response

  const pages = await prisma.page.findMany({ orderBy: { slug: 'asc' } })
  return NextResponse.json(pages)
}
