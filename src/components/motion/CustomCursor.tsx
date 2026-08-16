'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/**
 * Curseur personnalisé desktop uniquement : discret, réagit au survol des
 * éléments interactifs ([data-cursor="link"], a, button). Ne s'active
 * jamais sur tactile, ni en mode animations réduites.
 */
export function CustomCursor() {
  const shouldReduceMotion = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)
  const frameRef = useRef<number>(0)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { damping: 28, stiffness: 320, mass: 0.4 })
  const springY = useSpring(y, { damping: 28, stiffness: 320, mass: 0.4 })

  useEffect(() => {
    if (shouldReduceMotion) return
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    setEnabled(isFinePointer)
  }, [shouldReduceMotion])

  useEffect(() => {
    if (!enabled) return
    document.body.classList.add('custom-cursor-active')

    function handleMove(e: MouseEvent) {
      setVisible(true)
      cancelAnimationFrame(frameRef.current)
      frameRef.current = requestAnimationFrame(() => {
        x.set(e.clientX)
        y.set(e.clientY)
      })
      const target = (e.target as HTMLElement)?.closest('a, button, [data-cursor="link"]')
      setHovering(Boolean(target))
    }
    function handleLeave() {
      setVisible(false)
    }

    window.addEventListener('mousemove', handleMove)
    document.documentElement.addEventListener('mouseleave', handleLeave)
    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', handleMove)
      document.documentElement.removeEventListener('mouseleave', handleLeave)
      cancelAnimationFrame(frameRef.current)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
      style={{ x: springX, y: springY, opacity: visible ? 1 : 0 }}
    >
      <motion.div
        className="rounded-full bg-cream"
        animate={{
          width: hovering ? 52 : 14,
          height: hovering ? 52 : 14,
          x: hovering ? -26 : -7,
          y: hovering ? -26 : -7,
        }}
        transition={{ type: 'spring', damping: 24, stiffness: 320 }}
      />
    </motion.div>
  )
}
