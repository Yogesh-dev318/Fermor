import type { CSSProperties } from 'react'

/**
 * Icon renders a Google Material Symbols Outlined glyph.
 * Uses the `material-symbols-outlined` font family loaded in index.css.
 */
type IconProps = {
  /** Material Symbols glyph name, e.g. "check", "trending_up". */
  name: string
  /** Optional Tailwind classes for sizing / color. */
  className?: string
  /** Whether the glyph should be filled (vs. outlined). */
  fill?: boolean
  /** Optional inline styles (e.g. custom fontSize). */
  style?: CSSProperties
}

export function Icon({ name, className = '', fill = false, style }: IconProps) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{ fontVariationSettings: `'FILL' ${fill ? 1 : 0}`, ...style }}
      aria-hidden="true"
    >
      {name}
    </span>
  )
}
