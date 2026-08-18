'use client'

import dynamic from 'next/dynamic'
import { useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

const Hero3DCanvas = dynamic(() => import('@/components/three/Hero3DCanvas'), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-gradient-to-br from-navy-800/60 to-navy-950/60" />,
})

/**
 * Enveloppe le rendu 3D : chargement différé (le bundle Three.js n'est
 * jamais envoyé au premier rendu), et repli statique sobre si l'utilisateur
 * préfère des animations réduites — pas de WebGL monté dans ce cas.
 */
export function Hero3D({ className }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return (
      <div
        className={cn('bg-navy-900', className)}
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(circle at 32% 28%, rgba(91,154,160,0.25), transparent 58%), radial-gradient(circle at 72% 68%, rgba(112,153,194,0.35), transparent 60%)',
        }}
      />
    )
  }

  return (
    <div className={className} aria-hidden="true">
      <Hero3DCanvas />
    </div>
  )
}
