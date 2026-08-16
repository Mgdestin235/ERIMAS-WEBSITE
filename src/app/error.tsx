'use client'

import { useEffect } from 'react'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 text-center text-cream">
      <p className="font-sans text-sm font-semibold uppercase tracking-[0.3em] text-mint-400">
        Incident technique
      </p>
      <h1 className="mt-4 font-display text-display-lg text-cream">
        Un imprévu s’est produit.
      </h1>
      <p className="mx-auto mt-4 max-w-md text-navy-200">
        Nos équipes techniques en ont été informées. Vous pouvez réessayer, ou revenir un peu plus tard.
      </p>
      <button
        onClick={reset}
        className="mt-8 rounded-full bg-mint-500 px-6 py-3 text-sm font-semibold text-navy-950 transition-transform duration-300 ease-premium hover:-translate-y-0.5 hover:bg-mint-400"
      >
        Réessayer
      </button>
    </main>
  )
}
