const REFERENCES = ['Coopération Suisse au Tchad', 'Expertise France', 'Lumen Expertise']

/**
 * Bandeau de références clients. Répété une fois pour créer une boucle
 * continue en CSS (aucune dépendance JS) ; s'arrête en prefers-reduced-motion
 * via la règle globale sur .marquee-track.
 */
export function ClientsMarquee() {
  const items = [...REFERENCES, ...REFERENCES]
  return (
    <div className="overflow-hidden border-y border-navy-800 bg-navy-950/60 py-8">
      <div className="flex w-max animate-marquee gap-16">
        {items.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="whitespace-nowrap font-display text-xl font-medium text-navy-400/80 sm:text-2xl"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  )
}
