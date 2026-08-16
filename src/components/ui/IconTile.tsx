'use client'

import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Traitement d'icône cohérent sur tout le site : relief (dégradé + ombre
 * portée interne), jamais une icône plate. Micro-interaction au survol/tap.
 */
export function IconTile({
  icon: Icon,
  className,
  size = 'md',
}: {
  icon: LucideIcon
  className?: string
  size?: 'sm' | 'md' | 'lg'
}) {
  const dims = { sm: 'h-10 w-10', md: 'h-14 w-14', lg: 'h-16 w-16' }[size]
  const iconSize = { sm: 18, md: 24, lg: 28 }[size]

  return (
    <motion.div
      whileHover={{ rotateX: -8, rotateY: 10, scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      style={{ transformStyle: 'preserve-3d', perspective: 600 }}
      className={cn(
        dims,
        'relative flex shrink-0 items-center justify-center rounded-2xl',
        'bg-gradient-to-br from-navy-600 via-navy-700 to-navy-900',
        'shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-6px_10px_rgba(0,0,0,0.35),0_10px_20px_-8px_rgba(6,12,24,0.6)]',
        'ring-1 ring-mint-400/10',
        className
      )}
    >
      <Icon size={iconSize} className="text-mint-300 drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]" strokeWidth={1.75} />
    </motion.div>
  )
}
