'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'

type RevealProps = {
  children: React.ReactNode
  delay?: number
  y?: number
  scale?: number
  className?: string
  as?: 'div' | 'span'
  once?: boolean
}

/**
 * Bloc d'entrée au scroll : fondu + translation + léger scale, orchestré
 * via des délais explicites plutôt qu'un fade-in uniforme partout. Respecte
 * strictement prefers-reduced-motion (contenu affiché sans mouvement).
 */
export function Reveal({ children, delay = 0, y = 28, scale = 0.98, className, once = true }: RevealProps) {
  const shouldReduceMotion = useReducedMotion()

  const variants: Variants = shouldReduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y, scale },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
        },
      }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-10% 0px -10% 0px' }}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}

