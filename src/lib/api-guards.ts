import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth-helpers'

type Guarded = { user: Awaited<ReturnType<typeof getCurrentUser>>; response: NextResponse | null }

/** Toute personne connectée (admin ou éditeur) peut poursuivre. */
export async function requireUser(): Promise<Guarded> {
  const user = await getCurrentUser()
  if (!user) return { user: null, response: NextResponse.json({ error: 'Non authentifié.' }, { status: 401 }) }
  return { user, response: null }
}

/** Réservé aux administrateurs (gestion des utilisateurs, actions sensibles). */
export async function requireAdminUser(): Promise<Guarded> {
  const user = await getCurrentUser()
  if (!user) return { user: null, response: NextResponse.json({ error: 'Non authentifié.' }, { status: 401 }) }
  if (user.role !== 'ADMIN') {
    return { user: null, response: NextResponse.json({ error: 'Accès réservé aux administrateurs.' }, { status: 403 }) }
  }
  return { user, response: null }
}
