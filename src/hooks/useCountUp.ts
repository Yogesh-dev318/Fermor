import { useEffect, useRef, useState } from 'react'

/**
 * useCountUp animates a number from 0 to `target` using a cubic ease-out curve.
 * Animation starts once the returned `ref` element scrolls into the viewport.
 * Respects `prefers-reduced-motion` — jumps straight to the final value.
 *
 * Usage:
 *   const { value, ref } = useCountUp<HTMLDivElement>(1200, 1800)
 *   <div ref={ref}>{value}</div>
 */
export function useCountUp<T extends HTMLElement = HTMLDivElement>(
  target: number,
  duration = 1800,
) {
  // Lazy initializer: if the user prefers reduced motion, start at the target
  // immediately so we never need to call setState inside an effect.
  const [value, setValue] = useState<number>(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return target
    }
    return 0
  })

  const ref = useRef<T>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Already at target (reduced motion path) — nothing to animate.
    if (value === target) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          observer.disconnect()

          const startTime = performance.now()
          const tick = (now: number) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            // Cubic ease-out: snappy yet smooth.
            const eased = 1 - Math.pow(1 - progress, 3)
            setValue(Math.round(eased * target))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 },
    )

    observer.observe(el)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration]) // `value` intentionally excluded — only check on mount

  return { value, ref }
}
