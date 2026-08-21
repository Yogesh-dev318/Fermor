import { Outlet, useLocation } from 'react-router-dom'
import { ShaderBackground } from '../effects/ShaderBackground'
import { CustomCursor } from '../effects/CustomCursor'
import { TopNavBar } from './TopNavBar'
import { Footer } from './Footer'
import { ScrollToTop } from './ScrollToTop'

/**
 * Layout is the shared page shell: background effects, nav, footer, and the
 * routed page content via <Outlet />. Rendered once at the router root so
 * effects (shader, cursor) persist across navigations instead of remounting.
 */
export function Layout() {
  const { pathname } = useLocation()

  return (
    <div className="relative min-h-screen text-on-surface">
      <ScrollToTop />
      <ShaderBackground />
      <CustomCursor />

      {/* Keying by pathname remounts the nav on navigation, which resets its
          local `mobileOpen` state for free — no effect required. */}
      <TopNavBar key={pathname} />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
