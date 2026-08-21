import { Link } from 'react-router-dom'
import { Icon } from '../ui/Icon'

type FooterColumn = {
  title: string
  links: { label: string; to: string }[]
}

const COLUMNS: FooterColumn[] = [
  {
    title: 'Product',
    links: [
      { label: 'Calculators', to: '/calculators' },
      { label: 'Pricing', to: '/#pricing' },
      { label: 'Security', to: '/about' },
      { label: 'Changelog', to: '/about' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Careers', to: '/about' },
      { label: 'Blog', to: '/#journal' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', to: '/about' },
      { label: 'Terms of Service', to: '/about' },
      { label: 'Cookie Policy', to: '/about' },
    ],
  },
]

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L2.25 2.25h6.775l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

/**
 * Footer includes the brand blurb, navigation columns, social links, and
 * a copyright line on a soft blurred surface.
 */
export function Footer() {
  return (
    <footer className="border-t border-surface-variant bg-surface/80 backdrop-blur-md">
      <div className="mx-auto max-w-container px-margin-mobile py-section-padding md:px-gutter md:py-section-padding-md">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          {/* Brand */}
          <div className="flex max-w-xs flex-col gap-5">
            <Link to="/" className="text-headline-md-mobile font-bold text-on-surface">
              Fermor
            </Link>
            <p className="text-sm leading-relaxed text-secondary">
              We believe understanding your money should feel calm, clear, and
              empowering. Human-first finance for everyone.
            </p>

            {/* Social links */}
            <div className="flex gap-3">
              {[
                { href: 'https://twitter.com', icon: <XIcon />, label: 'Follow on X' },
                {
                  href: 'https://linkedin.com',
                  icon: <LinkedInIcon />,
                  label: 'Connect on LinkedIn',
                },
                {
                  href: '/contact',
                  icon: <Icon name="mail" className="text-[18px]" />,
                  label: 'Newsletter',
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-surface-variant bg-surface-container text-secondary transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <p className="text-xs text-secondary/60">© 2024 Fermor Finance, Inc.</p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:flex md:flex-wrap md:gap-16">
            {COLUMNS.map((col) => (
              <div key={col.title} className="flex flex-col gap-3">
                <h5 className="text-sm font-bold text-on-surface">{col.title}</h5>
                {col.links.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="text-sm text-secondary transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
