import { cn } from '@/lib/utils'
import { Reveal } from '@/components/motion/Reveal'

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && (
        <Reveal>
          <p className="font-sans text-sm font-semibold uppercase tracking-[0.28em] text-mint-400">{eyebrow}</p>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <h2 className="mt-3 font-display text-display-md text-cream text-balance">{title}</h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p className="mt-4 text-lg leading-relaxed text-navy-200">{description}</p>
        </Reveal>
      )}
    </div>
  )
}
