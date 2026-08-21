import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Icon } from '../ui/Icon'
import { Section } from '../ui/Section'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'
import { useTilt } from '../../hooks/useTilt'

type Plan = {
  name: string
  monthlyPrice: number
  annualMonthlyPrice: number
  cadence: string
  description: string
  features: string[]
  cta: { label: string; href: string }
  theme: 'light' | 'dark'
  badge?: string
}

const PLANS: Plan[] = [
  {
    name: 'Fermor Basic',
    monthlyPrice: 0,
    annualMonthlyPrice: 0,
    cadence: '/mo',
    description: 'Everything you need to get a clear view of your finances.',
    features: [
      'Up to 3 connected accounts',
      'Basic net worth tracking',
      '1 active goal',
      'Manual CSV export',
    ],
    cta: { label: 'Get Started Free', href: '#get-started' },
    theme: 'light',
  },
  {
    name: 'Fermor Plus',
    monthlyPrice: 8,
    annualMonthlyPrice: 6.4,
    cadence: '/mo',
    description: 'Advanced insights and unlimited tracking for serious growth.',
    features: [
      'Unlimited connected accounts',
      'Smart Insight Feed recommendations',
      'Unlimited goal tracking',
      'Custom categories & rules',
      'Priority support',
    ],
    cta: { label: 'Start 14-Day Free Trial', href: '#trial' },
    theme: 'dark',
    badge: 'Most Popular',
  },
]

/** Toggle switch for monthly / annual billing with a spring-animated knob. */
function BillingToggle({
  isAnnual,
  onChange,
}: {
  isAnnual: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="mt-6 flex items-center justify-center gap-3">
      <button
        onClick={() => onChange(false)}
        aria-pressed={!isAnnual}
        className={`text-sm font-medium transition-colors ${
          !isAnnual ? 'text-on-surface' : 'text-secondary'
        }`}
      >
        Monthly
      </button>

      <button
        onClick={() => onChange(!isAnnual)}
        role="switch"
        aria-checked={isAnnual}
        aria-label="Toggle annual billing"
        className={`relative h-6 w-12 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
          isAnnual ? 'bg-primary' : 'bg-surface-container-highest'
        }`}
      >
        <motion.span
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute top-1 h-4 w-4 rounded-full bg-white shadow"
          style={{ left: isAnnual ? 'calc(100% - 1.25rem)' : '0.25rem' }}
        />
      </button>

      <button
        onClick={() => onChange(true)}
        aria-pressed={isAnnual}
        className={`text-sm font-medium transition-colors ${
          isAnnual ? 'text-on-surface' : 'text-secondary'
        }`}
      >
        Annual
        <span className="ml-1.5 rounded-full bg-growth-green/15 px-1.5 py-0.5 text-xs font-bold text-growth-green">
          Save 20%
        </span>
      </button>
    </div>
  )
}

function PlanCard({ plan, isAnnual }: { plan: Plan; isAnnual: boolean }) {
  const tiltRef = useTilt<HTMLDivElement>()
  const isDark = plan.theme === 'dark'
  const price = isAnnual ? plan.annualMonthlyPrice : plan.monthlyPrice
  const priceStr = price === 0 ? '$0' : `$${price.toFixed(price % 1 === 0 ? 0 : 2)}`

  return (
    <div
      ref={tiltRef}
      className={`tilt-card relative flex h-full flex-col overflow-hidden rounded-2xl p-6 sm:p-8 md:p-10 ${
        isDark
          ? 'bg-ink shadow-cta'
          : 'border border-surface-variant bg-white/90 card-shadow backdrop-blur-sm'
      }`}
      style={{ transition: 'transform 0.1s ease-out', transformStyle: 'preserve-3d' }}
    >
      {/* Glow blob on dark card */}
      {isDark && (
        <div className="absolute right-0 top-0 h-40 w-40 rounded-bl-full bg-primary/20 blur-3xl" />
      )}

      <div className="flex h-full flex-col" style={{ transform: 'translateZ(20px)' }}>
        {/* Header */}
        <div className="mb-3 flex items-start justify-between">
          <h3
            className={`text-headline-md-mobile font-semibold ${
              isDark ? 'text-white' : 'text-on-surface'
            }`}
          >
            {plan.name}
          </h3>
          {plan.badge && (
            <span className="rounded-full bg-white px-3 py-1 text-label-caps uppercase text-ink shadow-sm">
              {plan.badge}
            </span>
          )}
        </div>

        {/* Price */}
        <div className="mb-1 flex items-end gap-1">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={priceStr}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className={`text-4xl font-bold leading-none tabular-nums sm:text-display-lg ${
                isDark ? 'text-white' : 'text-on-surface'
              }`}
            >
              {priceStr}
            </motion.span>
          </AnimatePresence>
          <span className={`mb-1 text-body-md ${isDark ? 'text-gray-400' : 'text-secondary'}`}>
            {plan.cadence}
          </span>
        </div>

        {/* Annual savings callout */}
        <AnimatePresence initial={false}>
          {isDark && isAnnual && plan.annualMonthlyPrice > 0 && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="mb-4 text-xs font-medium text-primary-fixed-dim"
            >
              Billed ${(plan.annualMonthlyPrice * 12).toFixed(2)} / year — you save $
              {((plan.monthlyPrice - plan.annualMonthlyPrice) * 12).toFixed(2)}
            </motion.p>
          )}
        </AnimatePresence>

        <p
          className={`mb-8 mt-3 text-body-md ${
            isDark ? 'text-gray-300' : 'text-secondary'
          }`}
        >
          {plan.description}
        </p>

        {/* Feature list */}
        <ul className="mb-10 flex-1 space-y-3.5">
          {plan.features.map((feature) => (
            <li
              key={feature}
              className={`flex items-center gap-3 text-body-md ${
                isDark ? 'text-gray-100' : 'text-on-surface'
              }`}
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-growth-green/15">
                <Icon name="check" className="text-growth-green" style={{ fontSize: '14px' }} />
              </span>
              {feature}
            </li>
          ))}
        </ul>

        {/* CTA */}
        {isDark ? (
          <a
            href={plan.cta.href}
            className="block w-full rounded-full bg-white py-4 text-center text-title-sm font-semibold text-ink transition-all hover:bg-primary-fixed hover:shadow-glow"
          >
            {plan.cta.label}
          </a>
        ) : (
          <a
            href={plan.cta.href}
            className="btn-secondary block w-full rounded-full py-4 text-center text-title-sm"
          >
            {plan.cta.label}
          </a>
        )}
      </div>
    </div>
  )
}

/**
 * Pricing presents two plans side-by-side with an annual/monthly billing toggle.
 * Switching to annual shows the discounted price and a savings callout.
 */
export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <Section id="pricing">
      <div className="mb-16 text-center">
        <Reveal>
          <SectionLabel className="justify-center">Pricing</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mb-4 font-display-lg-mobile text-on-surface md:font-display-lg">
            Simple, transparent pricing.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-body-lg text-secondary">
            Start for free. Upgrade when you're ready to grow faster.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <BillingToggle isAnnual={isAnnual} onChange={setIsAnnual} />
        </Reveal>
      </div>

      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        {PLANS.map((plan, i) => (
          <Reveal key={plan.name} delay={0.1 + i * 0.1}>
            <PlanCard plan={plan} isAnnual={isAnnual} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
