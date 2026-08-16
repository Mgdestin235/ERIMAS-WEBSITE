import { cn } from '@/lib/utils'

/**
 * Monogramme ERIMAS provisoire (aucun fichier de logo officiel fourni).
 * [À COMPLÉTER] — remplacer par le logo officiel (SVG) dès qu'il sera transmis ;
 * en attendant, ce monogramme reprend la palette officielle (navy + menthe).
 */
export function Logo({ className, withWordmark = true }: { className?: string; withWordmark?: boolean }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="34" height="34" rx="9" className="fill-navy-800" />
        <path d="M9 9H25V13.4H13.4V19.3H23.3V23.6H13.4V29.5H9V9Z" transform="translate(0 -8)" className="fill-cream" />
        <path d="M10 11H24V14.6H14.2V16.4H22.4V19.8H14.2V21.6H24V25H10V11Z" className="fill-cream" />
        <circle cx="25.5" cy="10.5" r="3.2" className="fill-mint-400" />
      </svg>
      {withWordmark && (
        <span className="font-display text-lg font-semibold tracking-tight text-cream">
          ERIMAS
        </span>
      )}
    </span>
  )
}
