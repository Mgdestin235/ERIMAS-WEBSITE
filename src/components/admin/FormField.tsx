import { cn } from '@/lib/utils'

export const inputClasses =
  'w-full rounded-xl border border-navy-700 bg-navy-900/60 px-4 py-2.5 text-sm text-cream placeholder:text-navy-500 transition-colors focus:border-mint-400 focus:outline-none focus:ring-2 focus:ring-mint-400/30'

export function FormField({
  label,
  htmlFor,
  hint,
  error,
  children,
  className,
}: {
  label: string
  htmlFor: string
  hint?: string
  error?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-navy-200">
        {label}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-navy-500">{hint}</p>}
      {error && <p className={cn('mt-1.5 text-xs text-red-400')}>{error}</p>}
    </div>
  )
}
