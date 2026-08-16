'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { cn } from '@/lib/utils'

export type TestimonialItem = {
  id: string
  authorName: string
  authorRole: string | null
  organization: string | null
  quote: string
}

export function TestimonialsCarousel({ items }: { items: TestimonialItem[] }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || items.length <= 1) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % items.length), 6500)
    return () => clearInterval(timer)
  }, [paused, items.length])

  if (items.length === 0) return null

  const current = items[index]

  return (
    <div
      className="relative mx-auto max-w-3xl rounded-3xl border border-navy-700/60 bg-navy-900/50 p-10 text-center shadow-card sm:p-14"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Quote className="mx-auto h-10 w-10 text-mint-500/70" aria-hidden="true" />
      <div className="relative mt-6 min-h-[9rem]">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={current.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-balance font-display text-xl italic leading-relaxed text-cream sm:text-2xl">
              “{current.quote}”
            </p>
            <footer className="mt-6 text-sm text-navy-300">
              <span className="font-semibold text-cream">{current.authorName}</span>
              {current.authorRole && <span> — {current.authorRole}</span>}
              {current.organization && <span>, {current.organization}</span>}
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      {items.length > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setIndex(i)}
              aria-label={`Témoignage ${i + 1}`}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                i === index ? 'w-8 bg-mint-400' : 'w-2 bg-navy-600 hover:bg-navy-500'
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}
