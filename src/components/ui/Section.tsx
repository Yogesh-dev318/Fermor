import type { ReactNode } from 'react'

type SectionProps = {
  children: ReactNode
  /** Vertical padding. Defaults to the design system's section-padding. */
  padded?: boolean
  /** Extra Tailwind classes for the <section> element. */
  className?: string
  /** Background utility, e.g. "bg-ink text-white". */
  background?: string
  id?: string
}

/**
 * Section is the standard page-section wrapper. It centers content inside the
 * 1200px container and applies the design system's section padding.
 */
export function Section({
  children,
  padded = true,
  className = '',
  background = '',
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`${padded ? 'py-section-padding md:py-section-padding-md' : ''} ${background} ${className}`}
    >
      <div className="mx-auto max-w-container px-margin-mobile md:px-gutter">
        {children}
      </div>
    </section>
  )
}
