import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ArticleCard } from '@/components/site/ArticleCard'
import { ContactBanner } from '@/components/site/ContactBanner'
import { prisma } from '@/lib/db'
import { safeQuery } from '@/lib/safe-query'

export const metadata: Metadata = {
  title: 'Actualités',
  description: "Les actualités et analyses du cabinet ERIMAS sur les ressources humaines au Tchad.",
}

export default async function BlogPage() {
  const articles = await safeQuery(
    () => prisma.article.findMany({ where: { status: 'PUBLISHED' }, orderBy: { publishedAt: 'desc' } }),
    []
  )

  return (
    <>
      <section className="bg-ink py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="Actualités"
            title="Le regard ERIMAS sur les ressources humaines"
            description="Analyses, actualités réglementaires et retours d'expérience de nos consultants."
          />
          <div className="mt-14">
            {articles.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {articles.map((article, i) => (
                  <ArticleCard key={article.id} article={article} index={i} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-navy-800 bg-navy-900/40 p-12 text-center">
                <p className="text-navy-300">
                  Aucun article publié pour le moment. Revenez bientôt, ou suivez nos actualités directement en
                  nous contactant.
                </p>
              </div>
            )}
          </div>
        </Container>
      </section>
      <ContactBanner />
    </>
  )
}
