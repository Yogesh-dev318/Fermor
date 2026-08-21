import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * useGsapCounter animates a number from 0 to `target` when the referenced
 * element scrolls into view. Uses GSAP's ticker for smooth 60fps animation.
 * Respects `prefers-reduced-motion`.
 *
 * Usage:
 *   const { value, ref } = useGsapCounter<HTMLDivElement>(12500, 2)
 *   <div ref={ref}>{value}</div>
 *
 * @param target   Final number to count to.
 * @param decimals Number of decimal places in the displayed value.
 */
export function useGsapCounter<T extends HTMLElement = HTMLDivElement>(
  target: number,
  decimals = 0,
) {
  // Lazy initializer: if the user prefers reduced motion, start at the target
  // immediately so we never need to call setState inside the effect body.
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

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Already at target (reduced motion path) — nothing to animate.
    if (value === target) return

    const obj = { val: 0 }
    const ctx = gsap.context(() => {
      const tween = gsap.to(obj, {
        val: target,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
        onUpdate() {
          setValue(parseFloat(obj.val.toFixed(decimals)))
        },
      })
      // Keep ScrollTrigger in sync after route changes
      ScrollTrigger.refresh()
      return tween
    }, el)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, decimals]) // `value` intentionally excluded — only check on mount

  return { value, ref }
}
