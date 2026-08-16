import type { LucideIcon } from 'lucide-react'

export function StatCard({
  label,
  value,
  icon: Icon,
  hint,
}: {
  label: string
  value: number | string
  icon: LucideIcon
  hint?: string
}) {
  return (
    <div className="rounded-2xl border border-navy-800 bg-navy-900/40 p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-navy-400">{label}</p>
        <Icon size={18} className="text-mint-400" />
      </div>
      <p className="mt-3 font-display text-3xl font-semibold text-cream">{value}</p>
      {hint && <p className="mt-1 text-xs text-navy-500">{hint}</p>}
    </div>
  )
}
