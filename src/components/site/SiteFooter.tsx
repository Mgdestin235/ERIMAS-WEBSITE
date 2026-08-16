import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Logo } from '@/components/ui/Logo'
import { COMPANY, NAV_LINKS } from '@/lib/constants'

export function SiteFooter() {
  return (
    <footer className="relative border-t border-navy-800 bg-navy-950">
      <Container className="grid gap-12 py-16 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-navy-300">
            {COMPANY.tagline}, basé à {COMPANY.city}. ERIMAS accompagne les organisations publiques,
            parapubliques, privées et internationales sur l&apos;ensemble du cycle de gestion des ressources
            humaines.
          </p>
        </div>

        <div>
          <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-cream">Navigation</h3>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-navy-300 transition-colors hover:text-mint-300">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-cream">Coordonnées</h3>
          <ul className="mt-4 space-y-3 text-sm text-navy-300">
            <li className="flex gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-mint-400" />
              <span>
                {COMPANY.address}
                <br />
                {COMPANY.addressCity} — {COMPANY.poBox}
              </span>
            </li>
            <li className="flex gap-3">
              <Phone size={18} className="mt-0.5 shrink-0 text-mint-400" />
              <span className="flex flex-col">
                {COMPANY.phones.map((phone) => (
                  <a key={phone} href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-mint-300">
                    {phone}
                  </a>
                ))}
              </span>
            </li>
            <li className="flex gap-3">
              <Mail size={18} className="mt-0.5 shrink-0 text-mint-400" />
              <a href={`mailto:${COMPANY.email}`} className="hover:text-mint-300">
                {COMPANY.email}
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-navy-900">
        <Container className="flex flex-col gap-2 py-6 text-xs text-navy-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {COMPANY.name}. Tous droits réservés.
          </p>
          <p>
            {COMPANY.legalForm} au capital de {COMPANY.capital} — RCCM {COMPANY.rccm}
          </p>
        </Container>
      </div>
    </footer>
  )
}
