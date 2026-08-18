'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { NAV_LINKS } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b bg-white/95 backdrop-blur-md transition-shadow duration-500 ease-premium',
        scrolled ? 'border-navy-100 shadow-[0_1px_16px_-4px_rgba(21,51,94,0.18)]' : 'border-transparent'
      )}
    >
      <Container>
        <div className="flex h-20 items-center justify-between">
          <Link href="/" data-cursor="link" aria-label="ERIMAS — accueil">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigation principale">
            {NAV_LINKS.slice(1, -1).map((link) => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  data-cursor="link"
                  className={cn(
                    'relative text-sm font-medium transition-colors hover:text-mint-500',
                    active ? 'text-navy-700' : 'text-navy-500'
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.span layoutId="nav-underline" className="absolute -bottom-1.5 left-0 h-px w-full bg-mint-500" />
                  )}
                </Link>
              )
            })}
          </nav>

          <div className="hidden lg:block">
            <Button href="/contact" size="md">
              Nous contacter
            </Button>
          </div>

          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-navy-200 text-navy-700 lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-navy-100 bg-white lg:hidden"
            aria-label="Navigation mobile"
          >
            <Container className="flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'rounded-lg px-3 py-3 text-sm font-medium transition-colors',
                    pathname === link.href ? 'bg-navy-50 text-navy-700' : 'text-navy-500 hover:bg-navy-50'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
