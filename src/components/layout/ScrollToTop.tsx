import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * ScrollToTop resets the window scroll position whenever the route changes.
 *
 * - On a new pathname, scrolls to the top.
 * - If the destination has a hash (e.g. `/about#team` or `#get-started`),
 *   waits for the target element to mount, then smoothly scrolls to it.
 *
 * Without this, React Router preserves scroll position between page
 * navigations, which feels broken for a multi-page site.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
      // Element not yet painted — retry on the next frame.
      const raf = requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
      return () => cancelAnimationFrame(raf)
    }

    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])

  return null
}
