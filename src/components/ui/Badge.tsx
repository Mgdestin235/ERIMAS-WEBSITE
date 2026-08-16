import { cn } from '@/lib/utils'

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-mint-700/60 bg-mint-900/30 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-mint-300',
        className
      )}
    >
      {children}
    </span>
  )
}
