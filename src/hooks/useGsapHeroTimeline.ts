import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * useGsapHeroTimeline plays a sequenced entrance animation for hero elements
 * on mount. Selects children with `[data-hero]` inside the container and
 * staggers their fade-in-up.
 *
 * Respects `prefers-reduced-motion`.
 *
 * Usage:
 *   const ref = useGsapHeroTimeline<HTMLDivElement>()
 *   <header ref={ref}>
 *     <span data-hero>Label</span>
 *     <h1 data-hero>Headline</h1>
 *     <p data-hero>Body</p>
 *   </header>
 */
export function useGsapHeroTimeline<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const targets = el.querySelectorAll<HTMLElement>('[data-hero]')
    if (targets.length === 0) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      gsap.set(targets, { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from(targets, {
        opacity: 0,
        y: 24,
        duration: 0.9,
        stagger: 0.15,
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return ref
}
