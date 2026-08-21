import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from './revealVariants'

type RevealProps = {
  children: ReactNode
  className?: string
  /** Delay before the animation starts, in seconds. */
  delay?: number
  /** Slide-up distance in px. */
  y?: number
  /** Render as a different element via motion (defaults to div). */
  as?: 'div' | 'section' | 'span' | 'li'
}

/**
 * Reveal fades + slides its content into view when it enters the viewport.
 * Built on framer-motion's `whileInView`, which reliably resolves to the
 * visible state (unlike raw GSAP ScrollTrigger, which can leave elements
 * stuck hidden if layout measurements go stale on route changes / lazy load).
 *
 * Respects reduced-motion automatically via framer-motion's reducedMotion.
 */
export function Reveal({ children, className = '', delay = 0, y = 28, as = 'div' }: RevealProps) {
  const MotionTag = motion[as]
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  )
}

/**
 * RevealGroup wraps a set of RevealItem children and staggers their entrance
 * when the group scrolls into view.
 */
export function RevealGroup({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  )
}

/** A single staggered item — must be a descendant of RevealGroup. */
export function RevealItem({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div variants={staggerItem} className={className}>
      {children}
    </motion.div>
  )
}
