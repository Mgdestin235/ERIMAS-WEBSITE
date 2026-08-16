import { Reveal } from '@/components/motion/Reveal'
import { METHODOLOGY_STEPS } from '@/lib/constants'

export function MethodologyTimeline() {
  return (
    <ol className="relative border-l border-navy-700/80 pl-8 sm:pl-10">
      {METHODOLOGY_STEPS.map((step, i) => (
        <Reveal key={step.order} delay={i * 0.09} y={20}>
          <li className="relative pb-12 last:pb-0">
            <span className="absolute -left-[calc(2rem+1px)] top-0 flex h-8 w-8 items-center justify-center rounded-full border border-mint-400/50 bg-navy-950 font-display text-sm font-semibold text-mint-300 sm:-left-[calc(2.5rem+1px)]">
              {String(step.order).padStart(2, '0')}
            </span>
            <h3 className="font-display text-xl font-semibold text-cream">{step.title}</h3>
            <p className="mt-2 max-w-xl text-navy-300">{step.description}</p>
          </li>
        </Reveal>
      ))}
    </ol>
  )
}
