import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'growth' | 'light'

type ButtonProps = {
  children: ReactNode
  variant?: Variant
  className?: string
  /** When provided, renders an <a> instead of a <button>. */
  href?: string
  /** Click handler — works for both <button> and <a> renders. */
  onClick?: () => void
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'onClick'>

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'text-secondary hover:text-primary transition-colors',
  growth: 'bg-growth-green text-white hover:brightness-110 transition-all',
  light: 'bg-white text-ink hover:bg-gray-100 transition-colors',
}

const BASE_CLASSES =
  'inline-flex items-center justify-center rounded-full font-title-sm text-title-sm px-6 py-3'

export function Button({
  children,
  variant = 'primary',
  href,
  className = '',
  onClick,
  ...rest
}: ButtonProps) {
  const classes = `${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`

  if (href) {
    const anchorProps: AnchorHTMLAttributes<HTMLAnchorElement> = { href, className: classes, onClick }
    return <a {...anchorProps}>{children}</a>
  }

  return (
    <button className={classes} onClick={onClick} {...rest}>
      {children}
    </button>
  )
}
