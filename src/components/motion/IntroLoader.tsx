'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Logo } from '@/components/ui/Logo'

/**
 * Séquence de chargement courte (≈1s) avant révélation du hero : le
 * monogramme se compose puis s'efface. Ne s'affiche qu'une fois par
 * session pour ne jamais gêner la navigation interne, et se neutralise
 * en mode animations réduites.
 */
export function IntroLoader() {
  const shouldReduceMotion = useReducedMotion()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (shouldReduceMotion) return
    const alreadyShown = sessionStorage.getItem('erimas-intro-shown')
    if (alreadyShown) return

    setVisible(true)
    document.body.style.overflow = 'hidden'
    const timer = setTimeout(() => {
      setVisible(false)
      document.body.style.overflow = ''
      sessionStorage.setItem('erimas-intro-shown', '1')
    }, 1100)

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = ''
    }
  }, [shouldReduceMotion])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.1 } }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Logo className="scale-125" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
