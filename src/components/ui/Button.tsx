import Link from 'next/link'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'md' | 'lg'

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 ease-premium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50'

const variants: Record<Variant, string> = {
  primary:
    'bg-mint-500 text-navy-950 shadow-glow hover:-translate-y-0.5 hover:bg-mint-400 active:translate-y-0',
  secondary:
    'border border-navy-600 text-cream hover:-translate-y-0.5 hover:border-mint-400 hover:text-mint-300 active:translate-y-0',
  ghost: 'text-cream hover:text-mint-300',
}

const sizes: Record<Size, string> = {
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

type ButtonProps = {
  variant?: Variant
  size?: Size
  className?: string
  children: React.ReactNode
} & (
  | ({ href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'className'>)
  | ({ href?: undefined } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'>)
)

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', className, children, href, ...rest },
  ref
) {
  const classes = cn(base, variants[variant], sizes[size], className)

  if (href) {
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        data-cursor="link"
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    )
  }

  return (
    <button ref={ref as React.Ref<HTMLButtonElement>} className={classes} data-cursor="link" {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  )
})
