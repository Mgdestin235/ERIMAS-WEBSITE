import { Reveal } from '@/components/motion/Reveal'
import { AnimatedCounter } from '@/components/motion/AnimatedCounter'
import { STATS } from '@/lib/constants'

export function StatsCounters() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
      {STATS.map((stat, i) => (
        <Reveal key={stat.label} delay={i * 0.12}>
          <div className="text-center sm:text-left">
            <p className="font-display text-5xl font-semibold text-cream sm:text-6xl">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-2 text-sm uppercase tracking-wider text-navy-300">{stat.label}</p>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
