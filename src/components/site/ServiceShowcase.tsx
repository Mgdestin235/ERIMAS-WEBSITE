'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Building2, Compass, Cpu, GraduationCap, LifeBuoy, Users, ArrowUpRight, type LucideIcon } from 'lucide-react'
import { IconTile } from '@/components/ui/IconTile'
import { ICON_TILE_PX } from '@/lib/icon-sizes'
import { Reveal } from '@/components/motion/Reveal'
import type { ServiceDomain } from '@/lib/constants'

const ICONS: Record<string, LucideIcon> = {
  'conseil-strategie-rh': Compass,
  recrutement: Users,
  formation: GraduationCap,
  'externalisation-personnel': Building2,
  'digitalisation-ia': Cpu,
  'services-supports': LifeBuoy,
}

export function ServiceCard({ service, index, detailed = false }: { service: ServiceDomain; index: number; detailed?: boolean }) {
  const Icon = ICONS[service.slug] ?? Compass

  return (
    <Reveal delay={(index % 3) * 0.1}>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className="group h-full rounded-2xl border border-navy-700/70 bg-navy-900/40 p-7 shadow-card transition-colors duration-300 hover:border-mint-500/40 hover:shadow-card-hover"
      >
        <IconTile>
          <Icon size={ICON_TILE_PX.md} className="text-mint-300 drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]" strokeWidth={1.75} />
        </IconTile>
        <h3 className="mt-6 font-display text-xl font-semibold text-cream">{service.title}</h3>
        <p className="mt-2.5 text-sm leading-relaxed text-navy-300">
          {detailed ? service.description : service.shortDescription}
        </p>

        {detailed && (
          <ul className="mt-5 space-y-2">
            {service.points.map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm text-navy-300">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-mint-400" />
                {point}
              </li>
            ))}
          </ul>
        )}

        {!detailed && (
          <Link
            href={`/nos-services#${service.slug}`}
            data-cursor="link"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-mint-400 transition-colors group-hover:text-mint-300"
          >
            En savoir plus
            <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        )}
      </motion.div>
    </Reveal>
  )
}
