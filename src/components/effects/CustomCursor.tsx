import { useEffect, useRef } from 'react'

/**
 * CustomCursor renders a small dot that follows the pointer on fine-pointer
 * devices (desktop). It scales up when hovering interactive elements. On
 * touch / coarse pointers it renders nothing.
 *
 * Position is applied to the outer wrapper (set inline by JS); scale is
 * applied to the inner dot via a class so the two transforms don't clobber
 * each other. `mix-blend-difference` keeps the dot visible over any bg.
 */
export function CustomCursor() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const dot = dotRef.current
    if (!wrap || !dot) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const move = (e: MouseEvent) => {
      wrap.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
    }

    const grow = () => dot.classList.add('cursor-grow')
    const shrink = () => dot.classList.remove('cursor-grow')

    document.addEventListener('mousemove', move)
    const interactive = document.querySelectorAll('a, button, input, .tilt-card')
    interactive.forEach((el) => {
      el.addEventListener('mouseenter', grow)
      el.addEventListener('mouseleave', shrink)
    })

    return () => {
      document.removeEventListener('mousemove', move)
      interactive.forEach((el) => {
        el.removeEventListener('mouseenter', grow)
        el.removeEventListener('mouseleave', shrink)
      })
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
      aria-hidden="true"
    >
      <div
        ref={dotRef}
        className="custom-cursor h-4 w-4 rounded-full bg-primary mix-blend-difference transition-transform duration-150 ease-out"
      />
      <style>{`
        .custom-cursor.cursor-grow {
          transform: scale(2);
          background-color: #14151a;
        }
      `}</style>
    </div>
  )
}
