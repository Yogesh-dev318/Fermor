import { useState } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Section } from '../ui/Section'
import { SectionLabel } from '../ui/SectionLabel'
import { Icon } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'

type TabId = 'investing' | 'banking' | 'tax' | 'retirement'

type TabContent = {
  id: TabId
  label: string
  icon: string
  heading: string
  body: string
  bullets: string[]
  visual: ReactNode
}

/* ── Mini visuals ───────────────────────────────────────────────────────── */

function InvestingVisual() {
  const allocation = [
    { name: 'Equity funds', pct: 62, color: 'bg-primary' },
    { name: 'Gold & SGB', pct: 14, color: 'bg-growth-green' },
    { name: 'Debt funds', pct: 24, color: 'bg-secondary' },
  ]
  return (
    <div className="w-full max-w-[300px]">
      <div className="mb-3 flex items-baseline justify-between">
        <span className="text-sm text-secondary">Invest portfolio</span>
        <span className="text-xs text-growth-green">↑ 8.6% all time</span>
      </div>
      <div className="mb-4 text-2xl font-bold tabular-nums text-on-surface">$6,84,210</div>
      {allocation.map((a) => (
        <div key={a.name} className="mb-2.5">
          <div className="mb-1 flex justify-between text-xs">
            <span className="text-secondary">{a.name}</span>
            <span className="font-medium tabular-nums text-on-surface">{a.pct}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-surface-container">
            <div className={`h-full rounded-full ${a.color}`} style={{ width: `${a.pct}%` }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function BankingVisual() {
  const accounts = [
    { name: 'Savings Account', rate: '4.0%', badge: 'Liquid' },
    { name: 'Fixed Deposit', rate: '7.1%', badge: 'Best' },
    { name: 'Recurring Deposit', rate: '6.8%', badge: 'Auto' },
  ]
  return (
    <div className="w-full max-w-[300px] space-y-2">
      <p className="mb-3 text-label-caps uppercase tracking-wider text-secondary">
        Compare rates
      </p>
      {accounts.map((a) => (
        <div
          key={a.name}
          className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-[0_1px_4px_rgba(20,21,26,0.06)]"
        >
          <div>
            <div className="text-sm font-medium text-on-surface">{a.name}</div>
            <div className="text-xs text-secondary">{a.badge}</div>
          </div>
          <span className="text-lg font-bold tabular-nums text-growth-green">{a.rate}</span>
        </div>
      ))}
    </div>
  )
}

function TaxVisual() {
  const regimes = [
    { name: 'Old regime', tax: '$84,200', note: 'With 80C deductions' },
    { name: 'New regime', tax: '$72,500', note: 'Lower slab, no deductions' },
  ]
  return (
    <div className="w-full max-w-[300px] space-y-3">
      <p className="mb-3 text-label-caps uppercase tracking-wider text-secondary">
        Tax regime comparison
      </p>
      {regimes.map((r, i) => (
        <div
          key={r.name}
          className={`rounded-xl p-4 ${
            i === 1
              ? 'border-2 border-growth-green/30 bg-growth-green/5'
              : 'bg-white shadow-[0_1px_4px_rgba(20,21,26,0.06)]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-on-surface">{r.name}</span>
            {i === 1 && (
              <span className="rounded-full bg-growth-green/15 px-2 py-0.5 text-xs font-bold text-growth-green">
                Save $11,700
              </span>
            )}
          </div>
          <div className="mt-1 text-xl font-bold tabular-nums text-on-surface">{r.tax}</div>
          <div className="text-xs text-secondary">{r.note}</div>
        </div>
      ))}
    </div>
  )
}

function RetirementVisual() {
  const pillars = [
    { name: 'NPS', amount: '$4.2L', pct: 46, color: 'bg-primary' },
    { name: 'PPF', amount: '$2.8L', pct: 30, color: 'bg-growth-green' },
    { name: 'EPF', amount: '$1.6L', pct: 18, color: 'bg-secondary' },
    { name: 'Annuity', amount: '$0.6L', pct: 6, color: 'bg-tertiary' },
  ]
  return (
    <div className="w-full max-w-[300px]">
      <p className="mb-3 text-label-caps uppercase tracking-wider text-secondary">
        Retirement corpus
      </p>
      <div className="mb-4 text-2xl font-bold tabular-nums text-on-surface">$9.2L</div>
      {pillars.map((p) => (
        <div key={p.name} className="mb-2.5">
          <div className="mb-1 flex justify-between text-xs">
            <span className="text-secondary">{p.name}</span>
            <span className="font-medium tabular-nums text-on-surface">{p.amount}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-surface-container">
            <div className={`h-full rounded-full ${p.color}`} style={{ width: `${p.pct}%` }} />
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Tab data ───────────────────────────────────────────────────────────── */

const TABS: TabContent[] = [
  {
    id: 'investing',
    label: 'Investing',
    icon: 'trending_up',
    heading: 'Understand before you invest.',
    body: 'SIPs, mutual funds, stocks — Fermor projects returns, compares categories, and explains the why before you commit a single rupee.',
    bullets: ['SIP & lumpsum projections', 'Fund category comparison', 'Risk-adjusted returns'],
    visual: <InvestingVisual />,
  },
  {
    id: 'banking',
    label: 'Banking',
    icon: 'account_balance',
    heading: 'Find the best home for your cash.',
    body: 'Compare savings, FD, and RD rates across banks in real time. Know exactly where your idle cash earns the most.',
    bullets: ['Live FD/RD rate comparison', 'Savings account analyzer', 'Auto-liquidation rules'],
    visual: <BankingVisual />,
  },
  {
    id: 'tax',
    label: 'Tax & Salary',
    icon: 'receipt_long',
    heading: 'Pay only the tax you owe.',
    body: 'Compare old vs new regimes, decode your CTC, and find every deduction you qualify for — without spreadsheets or guesswork.',
    bullets: ['Old vs new regime', 'CTC breakdown analyzer', '80C deduction finder'],
    visual: <TaxVisual />,
  },
  {
    id: 'retirement',
    label: 'Retirement',
    icon: 'elderly',
    heading: 'Retire with a real plan.',
    body: 'NPS, PPF, EPF — Fermor brings every retirement pillar into one view and projects your corpus decades ahead.',
    bullets: ['NPS / PPF / EPF tracker', 'Corpus projection', 'Withdrawal strategy planner'],
    visual: <RetirementVisual />,
  },
]

const TAB_LABELS: { id: TabId; label: string; icon: string }[] = TABS.map((t) => ({
  id: t.id,
  label: t.label,
  icon: t.icon,
}))

/**
 * MoneyDecisions is a tabbed showcase inspired by fermor.in's "Every money
 * decision, covered" section. Tabs swap heading, copy, bullets, and a
 * realistic mini dashboard visual with a fade transition.
 */
export function MoneyDecisions() {
  const [active, setActive] = useState<TabId>('investing')
  const content = TABS.find((t) => t.id === active) ?? TABS[0]

  return (
    <Section id="decisions">
      <div className="mb-10 text-center">
        <Reveal>
          <SectionLabel className="justify-center">One platform</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display-lg-mobile text-on-surface md:font-display-lg">
            Every money decision, covered.
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

      {/* Panel with animated crossfade */}
      <div className="overflow-hidden rounded-3xl border border-surface-variant bg-white/80 shadow-2xl backdrop-blur-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="flex flex-col items-center gap-8 p-6 md:flex-row md:gap-16 md:p-12"
          >
            <div className="md:w-1/2">
              <h3 className="mb-4 font-display-lg-mobile text-on-surface md:font-display-lg">{content.heading}</h3>
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
              <Link
                to="/calculators"
                className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                Open calculator
                <Icon name="arrow_forward" className="text-base" />
              </Link>
            </div>

            <div className="flex w-full items-center justify-center rounded-2xl bg-surface-container-low px-6 py-8 md:w-1/2" style={{ minHeight: '280px' }}>
              {content.visual}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  )
}
