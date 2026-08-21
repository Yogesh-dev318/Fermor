import { useState } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Icon } from '../ui/Icon'
import { Section } from '../ui/Section'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'
import { useTilt } from '../../hooks/useTilt'

type TabId = 'net-worth' | 'spending' | 'goals'

type TabContent = {
  id: TabId
  heading: string
  body: string
  bullets: string[]
  visual: ReactNode
}

/* ── Mini dashboard visuals ─────────────────────────────────────────────── */

function NetWorthVisual() {
  const accounts = [
    { name: 'Chase Checking', amount: '+$12,400', positive: true },
    { name: 'Vanguard 401k', amount: '+$218,500', positive: true },
    { name: 'High-Yield Savings', amount: '+$45,200', positive: true },
    { name: 'Student Loan', amount: '−$32,800', positive: false },
  ]
  return (
    <div className="w-full max-w-[300px] space-y-2">
      <p className="mb-3 text-label-caps uppercase tracking-wider text-secondary">
        Account Summary
      </p>
      {accounts.map((a) => (
        <div
          key={a.name}
          className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-[0_1px_4px_rgba(20,21,26,0.06)]"
        >
          <span className="text-sm text-on-surface">{a.name}</span>
          <span
            className={`text-sm font-semibold tabular-nums ${
              a.positive ? 'text-growth-green' : 'text-error'
            }`}
          >
            {a.amount}
          </span>
        </div>
      ))}
      <div className="mt-2 flex items-center justify-between rounded-xl bg-primary/8 px-4 py-3">
        <span className="text-sm font-bold text-on-surface">Total Net Worth</span>
        <span className="text-lg font-bold tabular-nums text-on-surface">$342,900</span>
      </div>
    </div>
  )
}

function SpendingVisual() {
  const categories = [
    { name: 'Housing', amount: 1200, pct: 80, color: 'bg-primary' },
    { name: 'Food & Dining', amount: 640, pct: 53, color: 'bg-growth-green' },
    { name: 'Transport', amount: 280, pct: 37, color: 'bg-secondary' },
    { name: 'Entertainment', amount: 180, pct: 24, color: 'bg-tertiary' },
  ]
  return (
    <div className="w-full max-w-[300px]">
      <p className="mb-3 text-label-caps uppercase tracking-wider text-secondary">
        June Spending
      </p>
      {categories.map((c) => (
        <div key={c.name} className="mb-3.5">
          <div className="mb-1 flex justify-between text-sm">
            <span className="text-secondary">{c.name}</span>
            <span className="font-medium tabular-nums text-on-surface">
              ${c.amount.toLocaleString()}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-surface-container">
            <div
              className={`h-full rounded-full ${c.color} transition-all duration-700`}
              style={{ width: `${c.pct}%` }}
            />
          </div>
        </div>
      ))}
      <div className="mt-1 rounded-lg bg-surface-container-low px-3 py-2 text-center">
        <span className="text-xs text-secondary">Total this month: </span>
        <span className="text-sm font-bold text-on-surface">$2,300</span>
      </div>
    </div>
  )
}

function GoalsVisual() {
  const goals = [
    { name: 'Emergency Fund', current: 8400, target: 12000, pct: 70, color: 'bg-primary' },
    { name: 'Europe Trip ✈️', current: 2100, target: 5000, pct: 42, color: 'bg-growth-green' },
    { name: 'New Car 🚗', current: 6500, target: 8000, pct: 81, color: 'bg-primary-container' },
  ]
  return (
    <div className="w-full max-w-[300px] space-y-3">
      <p className="mb-3 text-label-caps uppercase tracking-wider text-secondary">
        Active Goals
      </p>
      {goals.map((g) => (
        <div
          key={g.name}
          className="rounded-xl bg-white px-4 py-3.5 shadow-[0_1px_4px_rgba(20,21,26,0.06)]"
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-on-surface">{g.name}</span>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
              {g.pct}%
            </span>
          </div>
          <div className="mb-1.5 h-1.5 overflow-hidden rounded-full bg-surface-container">
            <div
              className={`h-full rounded-full ${g.color} transition-all duration-700`}
              style={{ width: `${g.pct}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-secondary tabular-nums">
            <span>${g.current.toLocaleString()}</span>
            <span>${g.target.toLocaleString()}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Tab data ───────────────────────────────────────────────────────────── */

const TABS: TabContent[] = [
  {
    id: 'net-worth',
    heading: 'Your whole financial picture, instantly.',
    body: 'Connect all your accounts in seconds. Fermor organizes the chaos into a calming dashboard so you never have to guess your net worth again.',
    bullets: ['Auto-sync 10,000+ banks', 'Real-time asset valuation', 'Historical trend tracking'],
    visual: <NetWorthVisual />,
  },
  {
    id: 'spending',
    heading: 'Spending that finally makes sense.',
    body: 'Every transaction auto-categorized. See exactly where your money goes each month, with trends that help you course-correct before it matters.',
    bullets: ['Automatic categorization', 'Monthly trend comparisons', 'Custom category rules'],
    visual: <SpendingVisual />,
  },
  {
    id: 'goals',
    heading: 'Goals you will actually reach.',
    body: 'Set a target, pick a timeline, and we will tell you exactly how much to save each month — then track your progress with calm, clear visuals.',
    bullets: ['Smart monthly targets', 'Progress milestones', 'Unlimited active goals'],
    visual: <GoalsVisual />,
  },
]

const TAB_LABELS: { id: TabId; label: string; icon: string }[] = [
  { id: 'net-worth', label: 'Net Worth', icon: 'account_balance_wallet' },
  { id: 'spending', label: 'Spending', icon: 'bar_chart' },
  { id: 'goals', label: 'Goals', icon: 'flag' },
]

/**
 * FeatureDeepDive is a tabbed showcase of Fermor's core feature areas.
 * Each tab swaps the heading, copy, bullets, and a realistic dashboard visual.
 * Tab transitions use a CSS fade-in-up animation (key={active} forces remount).
 */
export function FeatureDeepDive() {
  const [active, setActive] = useState<TabId>('net-worth')
  const tiltRef = useTilt<HTMLDivElement>()
  const content = TABS.find((t) => t.id === active) ?? TABS[0]

  return (
    <Section id="product">
      <div className="mb-4 text-center">
        <Reveal>
          <SectionLabel className="justify-center">Features</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mb-12 font-display-lg-mobile text-on-surface md:font-display-lg">
            Everything you need, nothing you don't.
          </h2>
        </Reveal>
      </div>

      {/* Tabs */}
      <Reveal delay={0.1} className="mb-10 flex flex-wrap justify-center gap-3">
        {TAB_LABELS.map((tab) => {
          const isActive = tab.id === active
          return (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              aria-pressed={isActive}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-body-md font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-ink text-white shadow-md'
                  : 'border border-surface-variant bg-white/80 text-secondary hover:border-ink/40 hover:text-on-surface'
              }`}
            >
              <Icon name={tab.icon} className="text-[18px]" />
              {tab.label}
            </button>
          )
        })}
      </Reveal>

      {/* Panel */}
      <div
        ref={tiltRef}
        className="tilt-card overflow-hidden rounded-3xl border border-surface-variant bg-white/80 shadow-2xl backdrop-blur-md"
        style={{ transition: 'transform 0.1s ease-out', transformStyle: 'preserve-3d' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="flex flex-col items-center gap-10 p-8 md:flex-row md:gap-16 md:p-12"
          >
            <div className="md:w-1/2" style={{ transform: 'translateZ(20px)' }}>
              <h3 className="mb-4 font-display-lg-mobile text-on-surface">
                {content.heading}
              </h3>
              <p className="mb-6 text-body-lg text-secondary">{content.body}</p>
              <ul className="space-y-3">
                {content.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                      <Icon name="check" className="text-primary" style={{ fontSize: '16px' }} />
                    </span>
                    <span className="text-secondary">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="flex w-full items-center justify-center rounded-2xl bg-surface-container-low px-6 py-8 md:w-1/2"
              style={{ transform: 'translateZ(20px)', minHeight: '280px' }}
            >
              {content.visual}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  )
}
