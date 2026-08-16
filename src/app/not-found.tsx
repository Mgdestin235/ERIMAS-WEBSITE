import Link from 'next/link'
import { COMPANY } from '@/lib/constants'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 text-center text-cream">
      <p className="font-sans text-sm font-semibold uppercase tracking-[0.3em] text-mint-400">Page introuvable</p>
      <h1 className="mt-4 font-display text-display-lg text-cream">
        Cette page a changé d’adresse.
      </h1>
      <p className="mx-auto mt-4 max-w-md text-navy-200">
        Le contenu que vous cherchez n’existe plus ou a été déplacé. Revenez à l’accueil ou explorez
        nos domaines d’expertise.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="rounded-full bg-mint-500 px-6 py-3 text-sm font-semibold text-navy-950 transition-transform duration-300 ease-premium hover:-translate-y-0.5 hover:bg-mint-400"
        >
          Retour à l’accueil
        </Link>
        <Link
          href="/contact"
          className="rounded-full border border-navy-600 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:border-mint-400 hover:text-mint-300"
        >
          Nous contacter
        </Link>
      </div>
      <p className="mt-16 text-xs text-navy-400">{COMPANY.name} · {COMPANY.city}, {COMPANY.country}</p>
    </main>
  )
}
