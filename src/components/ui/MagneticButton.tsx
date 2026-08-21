import type { ReactNode } from 'react'
import { useMagnetic } from '../../hooks/useMagnetic'

type MagneticButtonProps = {
  children: ReactNode
  className?: string
}

/**
 * MagneticButton wraps its children in a magnetic-hover container. The child
 * should be a Button (or <a>/<button>) — it will drift toward the cursor.
 */
export function MagneticButton({ children, className = '' }: MagneticButtonProps) {
  const ref = useMagnetic<HTMLDivElement>()
  return (
    <div ref={ref} className={`inline-block ${className}`}>
      {children}
    </div>
  )
}
