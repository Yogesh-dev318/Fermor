import { useEffect, useRef } from 'react'

/**
 * useTilt applies a subtle 3D perspective tilt to an element based on the
 * pointer position. The inner content (marked with `.tilt-inner`) can use
 * `translateZ` to lift off the card plane.
 *
 * Usage:
 *   const ref = useTilt<HTMLDivElement>()
 *   <div ref={ref} className="tilt-card">...</div>
 */
export function useTilt<T extends HTMLElement = HTMLDivElement>(maxTilt = 10) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const card = ref.current
    if (!card) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const handleMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = ((y - centerY) / centerY) * -maxTilt
      const rotateY = ((x - centerX) / centerX) * maxTilt
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    }

    const handleLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)'
    }

    card.addEventListener('mousemove', handleMove)
    card.addEventListener('mouseleave', handleLeave)
    return () => {
      card.removeEventListener('mousemove', handleMove)
      card.removeEventListener('mouseleave', handleLeave)
    }
  }, [maxTilt])

  return ref
}
