import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'

type NavItem = {
  label: string
  to: string
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Calculators', to: '/calculators' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

/**
 * TopNavBar is the fixed, blurred-glass navigation bar.
 * - Gains a stronger shadow once the user scrolls past the hero.
 * - Uses React Router NavLink for active state.
 * - Collapses to an animated hamburger panel on mobile that closes
 *   automatically when a link is tapped.
 *
 * Note: Layout remounts this component (via a `key={pathname}` prop) on every
 * route change, which naturally resets `mobileOpen` to false — no effect needed.
 */
export function TopNavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const closeMobile = () => setMobileOpen(false)

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? 'bg-surface/90 shadow-[0_4px_24px_rgba(20,21,26,0.06)] backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-container items-center justify-between px-margin-mobile md:px-gutter">
        {/* Wordmark */}
        <Link to="/" className="text-headline-md-mobile font-bold text-on-surface" onClick={closeMobile}>
          Fermor
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `text-body-md transition-colors duration-200 hover:text-primary ${
                  isActive
                    ? 'border-b-2 border-primary pb-0.5 font-bold text-primary'
                    : 'text-secondary'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            to="/contact"
            className="text-body-md text-secondary transition-colors hover:text-primary"
          >
            Log in
          </Link>
          <Button href="#get-started" variant="primary" className="px-5 py-2 text-[15px]">
            Get started
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex items-center justify-center rounded-lg p-2 text-on-surface transition-colors hover:bg-surface-container md:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <Icon name={mobileOpen ? 'close' : 'menu'} className="text-2xl" />
        </button>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-surface-variant px-margin-mobile md:hidden"
          >
            <div className="flex flex-col gap-1 pt-4">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={closeMobile}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-3 text-body-md font-medium transition-colors hover:bg-surface-container hover:text-primary ${
                      isActive ? 'text-primary' : 'text-secondary'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-3 pb-6">
              <Link
                to="/contact"
                onClick={closeMobile}
                className="rounded-full border border-ink py-3 text-center text-body-md font-medium text-ink"
              >
                Log in
              </Link>
              <Button
                href="#get-started"
                variant="primary"
                className="w-full justify-center py-3"
                onClick={closeMobile}
              >
                Get started free
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
