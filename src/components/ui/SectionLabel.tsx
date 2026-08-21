import type { ReactNode } from 'react'

type SectionLabelProps = {
  children: ReactNode
  className?: string
}

/**
 * SectionLabel renders a small pill chip above section headings.
 * It uses the `section-label` component class defined in index.css.
 *
 * Usage:
 *   <SectionLabel>Why Fermor</SectionLabel>
 *   <h2>The headline goes here</h2>
 */
export function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <div className={`section-label mb-4 ${className}`}>
      {/* Dot indicator */}
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      {children}
    </div>
  )
}
