'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { IconTileSize } from '@/lib/icon-sizes'

/**
 * Traitement d'icône cohérent sur tout le site : relief (dégradé + ombre
 * portée interne + reflet), jamais une icône plate. Légère respiration 3D
 * au repos, micro-interaction plus marquée au survol/tap. Neutralisé en
 * prefers-reduced-motion (seul le relief statique reste).
 *
 * Reçoit l'icône déjà rendue en `children` (et non une référence de
 * composant) : les Server Components ne peuvent pas transmettre une
 * référence de fonction/composant à un Client Component à travers la
 * frontière RSC — seul du JSX déjà rendu peut traverser cette frontière.
 */
export function IconTile({
  children,
  className,
  size = 'md',
}: {
  children: React.ReactNode
  className?: string
  size?: IconTileSize
}) {
  const shouldReduceMotion = useReducedMotion()
  const dims = { sm: 'h-10 w-10', md: 'h-14 w-14', lg: 'h-16 w-16' }[size]

  return (
    <motion.div
      animate={
        shouldReduceMotion
          ? undefined
          : {
              rotateZ: [0, 2.5, 0, -2.5, 0],
              y: [0, -2, 0, 2, 0],
              transition: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
            }
      }
      whileHover={{
        rotateX: -10,
        rotateY: 14,
        scale: 1.08,
        transition: { type: 'spring', stiffness: 260, damping: 18 },
      }}
      whileTap={{ scale: 0.95, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
      style={{ transformStyle: 'preserve-3d', perspective: 700 }}
      className={cn(
        dims,
        'relative flex shrink-0 items-center justify-center rounded-2xl',
        'bg-gradient-to-br from-navy-400 via-navy-600 to-navy-800',
        'shadow-[inset_0_1.5px_0_rgba(255,255,255,0.35),inset_0_-8px_14px_rgba(0,0,0,0.4),0_14px_28px_-10px_rgba(6,12,24,0.65)]',
        'ring-1 ring-white/10',
        className
      )}
    >
      <span className="pointer-events-none absolute inset-x-1.5 top-1 h-1/3 rounded-full bg-white/15 blur-[3px]" />
      {children}
    </motion.div>
  )
}
