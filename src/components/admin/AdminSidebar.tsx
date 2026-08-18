'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Newspaper,
  Briefcase,
  Quote,
  Users2,
  FileText,
  Mail,
  Image as ImageIcon,
  UserCog,
  X,
  type LucideIcon,
} from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { cn } from '@/lib/utils'

type NavItem = { href: string; label: string; icon: LucideIcon; exact?: boolean }

const NAV: NavItem[] = [
  { href: '/admin', label: 'Tableau de bord', icon: LayoutDashboard, exact: true },
  { href: '/admin/articles', label: 'Articles', icon: Newspaper },
  { href: '/admin/projets', label: 'Projets & références', icon: Briefcase },
  { href: '/admin/temoignages', label: 'Témoignages', icon: Quote },
  { href: '/admin/equipe', label: 'Équipe', icon: Users2 },
  { href: '/admin/pages', label: 'Pages du site', icon: FileText },
  { href: '/admin/messages', label: 'Messages', icon: Mail },
  { href: '/admin/medias', label: 'Médiathèque', icon: ImageIcon },
]

const ADMIN_ONLY_NAV: NavItem[] = [{ href: '/admin/utilisateurs', label: 'Utilisateurs', icon: UserCog }]

export function AdminSidebar({
  role,
  mobileOpen,
  onClose,
}: {
  role: 'ADMIN' | 'EDITOR'
  mobileOpen: boolean
  onClose: () => void
}) {
  const pathname = usePathname()
  const items = role === 'ADMIN' ? [...NAV, ...ADMIN_ONLY_NAV] : NAV

  const content = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-5 py-6">
        <Link href="/admin">
          <Logo tone="white" />
        </Link>
        <button onClick={onClose} className="rounded-lg p-1.5 text-navy-400 hover:text-cream lg:hidden" aria-label="Fermer le menu">
          <X size={18} />
        </button>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-6">
        {items.map((item) => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                active ? 'bg-mint-500/10 text-mint-300' : 'text-navy-300 hover:bg-navy-800 hover:text-cream'
              )}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          )
        })}
      </nav>
      <div className="border-t border-navy-800 px-5 py-4">
        <Link href="/" target="_blank" className="text-xs text-navy-500 hover:text-mint-300">
          ↗ Voir le site public
        </Link>
      </div>
    </div>
  )

  return (
    <>
      <aside className="hidden w-72 shrink-0 border-r border-navy-800 bg-navy-950 lg:block">{content}</aside>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={onClose} />
          <aside className="absolute inset-y-0 left-0 w-72 bg-navy-950">{content}</aside>
        </div>
      )}
    </>
  )
}
