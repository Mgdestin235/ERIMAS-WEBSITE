/**
 * Données d'amorçage — compte administrateur de démonstration + contenu
 * minimal pour que le portail visiteur ne soit jamais vide.
 *
 * Contrainte respectée : aucune donnée factuelle non fournie par ERIMAS
 * n'est inventée. Tout ce qui manque (noms des associés, témoignages
 * réels, détails de mission) est semé sous forme de brouillon explicitement
 * marqué [À COMPLÉTER], à corriger depuis le portail admin avant mise en ligne.
 */
import { PrismaClient, Role, ContentStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@erimas-tchad.com'
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'ChangeMoi#2026'
  const adminName = process.env.SEED_ADMIN_NAME || 'Administration ERIMAS'

  const passwordHash = await bcrypt.hash(adminPassword, 12)

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: adminName,
      email: adminEmail,
      passwordHash,
      role: Role.ADMIN,
    },
  })
  console.log(`✔ Compte administrateur prêt : ${admin.email}`)

  // --- Équipe / gouvernance --------------------------------------------
  const founders = [
    { name: '[À COMPLÉTER — nom du 1er associé fondateur]', role: 'Associé(e) fondateur/trice', order: 1 },
    { name: '[À COMPLÉTER — nom du 2e associé fondateur]', role: 'Associé(e) fondateur/trice', order: 2 },
    { name: '[À COMPLÉTER — nom du 3e associé fondateur]', role: 'Associé(e) fondateur/trice', order: 3 },
  ]
  for (const f of founders) {
    const existing = await prisma.teamMember.findFirst({ where: { name: f.name } })
    if (!existing) {
      await prisma.teamMember.create({
        data: {
          name: f.name,
          role: f.role,
          bio: '[À COMPLÉTER — parcours et expertise à renseigner depuis le portail admin]',
          isFounder: true,
          order: f.order,
        },
      })
    }
  }
  console.log('✔ 3 fiches associés fondateurs (brouillon) créées')

  // --- Références clients (noms réels fournis, détails à compléter) ----
  const references: Array<{ client: string; sector: string; slug: string }> = [
    { client: 'Coopération Suisse au Tchad', sector: 'Coopération internationale', slug: 'cooperation-suisse-au-tchad' },
    { client: 'Expertise France', sector: 'Coopération internationale', slug: 'expertise-france' },
    { client: 'Lumen Expertise', sector: 'Conseil', slug: 'lumen-expertise' },
  ]
  for (const ref of references) {
    await prisma.project.upsert({
      where: { slug: ref.slug },
      update: {},
      create: {
        title: `Mission — ${ref.client}`,
        slug: ref.slug,
        client: ref.client,
        sector: ref.sector,
        location: "N'Djamena, Tchad",
        summary: '[À COMPLÉTER — résumé de la mission à renseigner par ERIMAS]',
        content: '[À COMPLÉTER — description détaillée de la mission, du périmètre et des résultats à renseigner depuis le portail admin]',
        status: ContentStatus.DRAFT,
        featured: true,
      },
    })
  }
  console.log('✔ 3 fiches de référence client (brouillon) créées')

  // --- Témoignage — emplacement réservé, aucune citation inventée -------
  const testimonialCount = await prisma.testimonial.count()
  if (testimonialCount === 0) {
    await prisma.testimonial.create({
      data: {
        authorName: '[À COMPLÉTER]',
        authorRole: '[À COMPLÉTER — fonction]',
        organization: '[À COMPLÉTER — organisation]',
        quote: '[À COMPLÉTER — citation réelle du client à recueillir et publier depuis le portail admin]',
        featured: false,
        order: 1,
      },
    })
    console.log('✔ Emplacement de témoignage (brouillon) créé')
  }

  // --- Article de démonstration (brouillon, non publié) ------------------
  await prisma.article.upsert({
    where: { slug: 'exemple-article-a-remplacer' },
    update: {},
    create: {
      title: '[Exemple] Bienvenue sur le blog ERIMAS',
      slug: 'exemple-article-a-remplacer',
      excerpt: "Ceci est un article de démonstration. Remplacez-le par vos propres actualités depuis le portail admin.",
      content:
        '<p>Cet article est un exemple généré automatiquement afin de vérifier le bon fonctionnement du blog. ' +
        "Il n'est pas publié sur le site public (statut « brouillon ») et peut être modifié ou supprimé librement depuis le portail admin.</p>",
      status: ContentStatus.DRAFT,
      authorId: admin.id,
    },
  })
  console.log('✔ Article de démonstration (brouillon) créé')

  // --- Pages de contenu éditable -----------------------------------------
  await prisma.page.upsert({
    where: { slug: 'qui-sommes-nous' },
    update: {},
    create: {
      slug: 'qui-sommes-nous',
      title: 'Qui sommes-nous',
      content: {
        intro: '[À COMPLÉTER — texte de présentation complémentaire du cabinet, si besoin d\'aller au-delà du contenu institutionnel déjà intégré]',
      },
    },
  })
  console.log('✔ Bloc de contenu éditable "Qui sommes-nous" créé')

  console.log('\nAmorçage terminé.')
  console.log(`Connexion admin → ${adminEmail} / (mot de passe défini via SEED_ADMIN_PASSWORD)`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
