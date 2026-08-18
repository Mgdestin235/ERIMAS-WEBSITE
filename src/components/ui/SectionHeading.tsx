import { cn } from '@/lib/utils'
import { Reveal } from '@/components/motion/Reveal'

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'light',
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  /** "light" = section à fond blanc (titre bleu marine) ; "dark" = section à fond bleu marine (titre blanc). */
  tone?: 'light' | 'dark'
  className?: string
}) {
  const titleColor = tone === 'dark' ? 'text-white' : 'text-navy-900'
  const descriptionColor = tone === 'dark' ? 'text-white/75' : 'text-navy-600'

  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && (
        <Reveal>
          <p className="font-sans text-sm font-semibold uppercase tracking-[0.28em] text-mint-500">{eyebrow}</p>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <h2 className={cn('mt-3 font-display text-display-md text-balance', titleColor)}>{title}</h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p className={cn('mt-4 text-lg leading-relaxed', descriptionColor)}>{description}</p>
        </Reveal>
      )}
    </div>
  )
}
