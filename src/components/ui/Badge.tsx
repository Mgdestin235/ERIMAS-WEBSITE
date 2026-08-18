import { cn } from '@/lib/utils'

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-mint-200 bg-mint-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-mint-700',
        className
      )}
    >
      {children}
    </span>
  )
}
