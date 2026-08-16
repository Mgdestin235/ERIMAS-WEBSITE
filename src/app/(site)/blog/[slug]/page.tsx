import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { Reveal } from '@/components/motion/Reveal'
import { ContactBanner } from '@/components/site/ContactBanner'
import { prisma } from '@/lib/db'
import { safeQuery } from '@/lib/safe-query'
import { formatDate } from '@/lib/utils'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await safeQuery(() => prisma.article.findUnique({ where: { slug: params.slug } }), null)
  if (!article) return { title: 'Article' }
  return { title: article.title, description: article.excerpt }
}

export default async function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const article = await safeQuery(
    () => prisma.article.findFirst({ where: { slug: params.slug, status: 'PUBLISHED' }, include: { author: true } }),
    null
  )

  if (!article) notFound()

  return (
    <>
      <article className="bg-ink py-20 sm:py-28">
        <Container className="max-w-3xl">
          <Reveal>
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-300 hover:text-mint-300">
              <ArrowLeft size={15} />
              Retour aux actualités
            </Link>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {article.category && <Badge>{article.category}</Badge>}
              {article.publishedAt && (
                <span className="inline-flex items-center gap-1.5 text-xs text-navy-400">
                  <Calendar size={13} />
                  {formatDate(article.publishedAt)}
                </span>
              )}
              {article.author && <span className="text-xs text-navy-400">Par {article.author.name}</span>}
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <h1 className="mt-4 font-display text-display-md text-cream text-balance">{article.title}</h1>
          </Reveal>

          <Reveal delay={0.22}>
            <div
              className="prose prose-invert mt-10 max-w-none prose-headings:font-display prose-a:text-mint-400"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </Reveal>
        </Container>
      </article>
      <ContactBanner />
    </>
  )
}
