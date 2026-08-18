import { NextResponse, type NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db'

/**
 * Initialisation en un clic, pensée pour un déploiement sans terminal :
 * crée les tables (si elles n'existent pas déjà) puis le compte
 * administrateur défini par les variables SEED_ADMIN_*.
 *
 * Protégé par SETUP_TOKEN (à définir dans les variables d'environnement) :
 * sans ce jeton configuré, la route refuse toute requête. Idempotent —
 * peut être appelée plusieurs fois sans risque.
 */
const STATEMENTS = [
  `DO $$ BEGIN CREATE TYPE "Role" AS ENUM ('ADMIN','EDITOR'); EXCEPTION WHEN duplicate_object THEN null; END $$;`,
  `DO $$ BEGIN CREATE TYPE "ContentStatus" AS ENUM ('DRAFT','PUBLISHED'); EXCEPTION WHEN duplicate_object THEN null; END $$;`,
  `DO $$ BEGIN CREATE TYPE "MessageStatus" AS ENUM ('NEW','READ','ARCHIVED'); EXCEPTION WHEN duplicate_object THEN null; END $$;`,
  `CREATE TABLE IF NOT EXISTS "users" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'EDITOR',
    "avatarUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
  );`,
  `CREATE TABLE IF NOT EXISTS "articles" (
    "id" TEXT PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL UNIQUE,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "coverImage" TEXT,
    "category" TEXT,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "publishedAt" TIMESTAMP(3),
    "authorId" TEXT REFERENCES "users"("id") ON DELETE SET NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
  );`,
  `CREATE INDEX IF NOT EXISTS "articles_slug_idx" ON "articles"("slug");`,
  `CREATE INDEX IF NOT EXISTS "articles_status_publishedAt_idx" ON "articles"("status","publishedAt");`,
  `CREATE TABLE IF NOT EXISTS "projects" (
    "id" TEXT PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL UNIQUE,
    "client" TEXT NOT NULL,
    "sector" TEXT,
    "location" TEXT,
    "year" INTEGER,
    "summary" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "coverImage" TEXT,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
  );`,
  `CREATE INDEX IF NOT EXISTS "projects_slug_idx" ON "projects"("slug");`,
  `CREATE INDEX IF NOT EXISTS "projects_status_idx" ON "projects"("status");`,
  `CREATE TABLE IF NOT EXISTS "testimonials" (
    "id" TEXT PRIMARY KEY,
    "authorName" TEXT NOT NULL,
    "authorRole" TEXT,
    "organization" TEXT,
    "quote" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
  );`,
  `CREATE TABLE IF NOT EXISTS "team_members" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "bio" TEXT,
    "photoUrl" TEXT,
    "isFounder" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
  );`,
  `CREATE TABLE IF NOT EXISTS "pages" (
    "id" TEXT PRIMARY KEY,
    "slug" TEXT NOT NULL UNIQUE,
    "title" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
  );`,
  `CREATE TABLE IF NOT EXISTS "contact_messages" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "subject" TEXT,
    "message" TEXT NOT NULL,
    "status" "MessageStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
  );`,
  `CREATE INDEX IF NOT EXISTS "contact_messages_status_idx" ON "contact_messages"("status");`,
  `CREATE TABLE IF NOT EXISTS "media" (
    "id" TEXT PRIMARY KEY,
    "filename" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "alt" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
  );`,
]

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')
  const expected = process.env.SETUP_TOKEN

  if (!expected) {
    return NextResponse.json(
      { error: "SETUP_TOKEN n'est pas défini dans les variables d'environnement. Ajoutez-le avant d'utiliser cette route." },
      { status: 503 }
    )
  }
  if (!token || token !== expected) {
    return NextResponse.json({ error: 'Jeton invalide.' }, { status: 401 })
  }

  const steps: { statement: string; ok: boolean; error?: string }[] = []
  for (const sql of STATEMENTS) {
    try {
      await prisma.$executeRawUnsafe(sql)
      steps.push({ statement: sql.slice(0, 60), ok: true })
    } catch (err) {
      steps.push({ statement: sql.slice(0, 60), ok: false, error: err instanceof Error ? err.message : String(err) })
    }
  }

  const email = (process.env.SEED_ADMIN_EMAIL || 'admin@erimas-tchad.com').toLowerCase().trim()
  const password = process.env.SEED_ADMIN_PASSWORD || 'ChangeMoi#2026'
  const name = process.env.SEED_ADMIN_NAME || 'Administration ERIMAS'

  let adminReady = false
  let adminError: string | null = null
  try {
    const passwordHash = await bcrypt.hash(password, 12)
    await prisma.user.upsert({
      where: { email },
      update: {},
      create: { name, email, passwordHash, role: 'ADMIN' },
    })
    adminReady = true
  } catch (err) {
    adminError = err instanceof Error ? err.message : String(err)
  }

  return NextResponse.json({
    ok: adminReady,
    message: adminReady
      ? `Installation terminée. Connectez-vous sur /admin/connexion avec ${email}.`
      : "Les tables ont été créées mais la création du compte admin a échoué — voir adminError.",
    adminEmail: adminReady ? email : undefined,
    adminError,
    steps,
  })
}
