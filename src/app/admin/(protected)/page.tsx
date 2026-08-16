import type { Metadata } from 'next'
import Link from 'next/link'
import { Newspaper, Briefcase, Mail, Quote, Users2, ArrowUpRight } from 'lucide-react'
import { StatCard } from '@/components/admin/StatCard'
import { ContentBreakdownChart } from '@/components/admin/DashboardCharts'
import { prisma } from '@/lib/db'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = { title: 'Tableau de bord' }

export default async function AdminDashboardPage() {
  const [
    articlesTotal,
    articlesPublished,
    projectsTotal,
    testimonialsTotal,
    teamTotal,
    newMessages,
    recentMessages,
    recentArticles,
  ] = await Promise.all([
    prisma.article.count(),
    prisma.article.count({ where: { status: 'PUBLISHED' } }),
    prisma.project.count(),
    prisma.testimonial.count(),
    prisma.teamMember.count(),
    prisma.contactMessage.count({ where: { status: 'NEW' } }),
    prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
    prisma.article.findMany({ orderBy: { updatedAt: 'desc' }, take: 5 }),
  ])

  const chartData = [
    { name: 'Articles', total: articlesTotal },
    { name: 'Projets', total: projectsTotal },
    { name: 'Témoignages', total: testimonialsTotal },
    { name: 'Équipe', total: teamTotal },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold text-cream">Tableau de bord</h1>
        <p className="mt-1 text-sm text-navy-400">Vue d&apos;ensemble du contenu et de l&apos;activité récente.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard label="Articles publiés" value={articlesPublished} icon={Newspaper} hint={`${articlesTotal} au total`} />
        <StatCard label="Projets & références" value={projectsTotal} icon={Briefcase} />
        <StatCard label="Témoignages" value={testimonialsTotal} icon={Quote} />
        <StatCard label="Membres de l'équipe" value={teamTotal} icon={Users2} />
        <StatCard label="Nouveaux messages" value={newMessages} icon={Mail} hint="non lus" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-2xl border border-navy-800 bg-navy-900/40 p-6">
          <h2 className="font-display text-lg font-semibold text-cream">Contenu par type</h2>
          <div className="mt-4">
            <ContentBreakdownChart data={chartData} />
          </div>
        </div>

        <div className="rounded-2xl border border-navy-800 bg-navy-900/40 p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-cream">Derniers messages</h2>
            <Link href="/admin/messages" className="text-xs font-semibold text-mint-400 hover:text-mint-300">
              Tout voir
            </Link>
          </div>
          <ul className="mt-4 space-y-4">
            {recentMessages.length === 0 && <p className="text-sm text-navy-500">Aucun message reçu pour le moment.</p>}
            {recentMessages.map((m) => (
              <li key={m.id} className="border-b border-navy-800 pb-3 last:border-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-cream">{m.name}</p>
                  <span className="text-xs text-navy-500">{formatDate(m.createdAt)}</span>
                </div>
                <p className="mt-1 line-clamp-1 text-xs text-navy-400">{m.message}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-2xl border border-navy-800 bg-navy-900/40 p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-cream">Articles récemment modifiés</h2>
          <Link href="/admin/articles" className="inline-flex items-center gap-1 text-xs font-semibold text-mint-400 hover:text-mint-300">
            Gérer les articles <ArrowUpRight size={13} />
          </Link>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-navy-800 text-xs uppercase tracking-wider text-navy-500">
                <th className="pb-2 pr-4 font-medium">Titre</th>
                <th className="pb-2 pr-4 font-medium">Statut</th>
                <th className="pb-2 font-medium">Dernière modification</th>
              </tr>
            </thead>
            <tbody>
              {recentArticles.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-4 text-navy-500">
                    Aucun article pour le moment.
                  </td>
                </tr>
              )}
              {recentArticles.map((a) => (
                <tr key={a.id} className="border-b border-navy-800/60 last:border-0">
                  <td className="py-3 pr-4 text-cream">
                    <Link href={`/admin/articles/${a.id}`} className="hover:text-mint-300">
                      {a.title}
                    </Link>
                  </td>
                  <td className="py-3 pr-4">
                    <span
                      className={
                        a.status === 'PUBLISHED'
                          ? 'rounded-full bg-mint-900/40 px-2.5 py-1 text-xs text-mint-300'
                          : 'rounded-full bg-navy-800 px-2.5 py-1 text-xs text-navy-300'
                      }
                    >
                      {a.status === 'PUBLISHED' ? 'Publié' : 'Brouillon'}
                    </span>
                  </td>
                  <td className="py-3 text-navy-400">{formatDate(a.updatedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
