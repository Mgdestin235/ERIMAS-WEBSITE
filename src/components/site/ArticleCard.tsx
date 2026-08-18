import Link from 'next/link'
import { ArrowUpRight, Calendar } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { Badge } from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'

export type ArticleCardData = {
  slug: string
  title: string
  excerpt: string
  coverImage: string | null
  category: string | null
  publishedAt: Date | null
}

export function ArticleCard({ article, index = 0 }: { article: ArticleCardData; index?: number }) {
  return (
    <Reveal delay={(index % 3) * 0.1}>
      <Link
        href={`/blog/${article.slug}`}
        data-cursor="link"
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-mint-400/60 hover:shadow-card-hover"
      >
        <div className="relative h-44 w-full overflow-hidden bg-gradient-to-br from-navy-500 to-navy-800">
          {article.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={article.coverImage} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          ) : (
            <div className="flex h-full items-center justify-center font-display text-3xl text-white/70">ERIMAS</div>
          )}
        </div>
        <div className="flex flex-1 flex-col p-6">
          <div className="flex flex-wrap items-center gap-3">
            {article.category && <Badge>{article.category}</Badge>}
            {article.publishedAt && (
              <span className="inline-flex items-center gap-1.5 text-xs text-navy-400">
                <Calendar size={13} />
                {formatDate(article.publishedAt)}
              </span>
            )}
          </div>
          <h3 className="mt-3 font-display text-lg font-semibold text-navy-900">{article.title}</h3>
          <p className="mt-2 line-clamp-2 flex-1 text-sm text-navy-600">{article.excerpt}</p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-mint-600 transition-colors group-hover:text-mint-500">
            Lire l&apos;article
            <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    </Reveal>
  )
}
