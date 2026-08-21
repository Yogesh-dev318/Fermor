import { useEffect, useRef } from 'react'

/**
 * useMagnetic wraps a button/link so it drifts slightly toward the cursor
 * while hovered, creating a "magnetic" pull effect. The ref should be attached
 * to the wrapper element; the first child <a>/<button> is the moved target.
 *
 * Usage:
 *   const ref = useMagnetic<HTMLDivElement>()
 *   <div ref={ref} className="inline-block"><Button>...</Button></div>
 */
export function useMagnetic<T extends HTMLElement = HTMLDivElement>(strength = 0.3) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const wrap = ref.current
    if (!wrap) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const btn = wrap.querySelector('a, button') as HTMLElement | null
    if (!btn) return

    const handleMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      btn.style.transition = 'none'
      btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`
    }

    const handleEnter = () => {
      btn.style.transition = 'none'
    }

    const handleLeave = () => {
      btn.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
      btn.style.transform = 'translate(0px, 0px)'
    }

    wrap.addEventListener('mousemove', handleMove)
    wrap.addEventListener('mouseenter', handleEnter)
    wrap.addEventListener('mouseleave', handleLeave)
    return () => {
      wrap.removeEventListener('mousemove', handleMove)
      wrap.removeEventListener('mouseenter', handleEnter)
      wrap.removeEventListener('mouseleave', handleLeave)
    }
  }, [strength])

  return ref
}
