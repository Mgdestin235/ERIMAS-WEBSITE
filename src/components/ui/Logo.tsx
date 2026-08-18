import { cn } from '@/lib/utils'

/**
 * Logo ERIMAS — pictogramme (cycle de développement des personnes) +
 * mot-symbole "ERIMAS", recréé en SVG à partir du logo officiel fourni.
 * Les teintes sont estimées visuellement (bleu marine + vert sauge) faute
 * d'outil d'extraction de pixels dans cet environnement ; à ajuster avec
 * les codes hexadécimaux exacts de la charte si nécessaire.
 *
 * `tone="navy"` (par défaut) pour un fond clair, `tone="white"` pour un
 * fond bleu marine (footer, pied de page admin, écrans plein bleu).
 */
export function Logo({
  className,
  withWordmark = true,
  tone = 'navy',
}: {
  className?: string
  withWordmark?: boolean
  tone?: 'navy' | 'white'
}) {
  const wordmarkColor = tone === 'white' ? 'text-white' : 'text-navy-700'
  const personColor = tone === 'white' ? '#ffffff' : '#15335e'

  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* Anneau — cycle de développement */}
        <circle
          cx="20"
          cy="20"
          r="15"
          stroke="#5b9aa0"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="70.5 24.6"
          transform="rotate(-38 20 20)"
        />
        {/* Pointe de flèche */}
        <polygon points="32.5,10.3 38,8.7 35.7,14" fill="#5b9aa0" />
        {/* Silhouette (personne) */}
        <circle cx="17" cy="17.5" r="3.6" fill={personColor} />
        <path d="M9.5 28a7.5 7.5 0 0 1 15 0z" fill={personColor} />
      </svg>
      {withWordmark && (
        <span className={cn('font-display text-lg font-semibold tracking-tight', wordmarkColor)}>ERIMAS</span>
      )}
    </span>
  )
}
