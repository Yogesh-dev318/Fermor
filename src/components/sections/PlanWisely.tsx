import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Section } from '../ui/Section'
import { SectionLabel } from '../ui/SectionLabel'
import { Icon } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'

type Allocation = {
  name: string
  pct: number
  color: string
}

const ALLOCATION: Allocation[] = [
  { name: 'Equity', pct: 42, color: 'bg-primary' },
  { name: 'Debt', pct: 24, color: 'bg-growth-green' },
  { name: 'Gold', pct: 14, color: 'bg-tertiary' },
  { name: 'Cash', pct: 12, color: 'bg-secondary' },
  { name: 'International', pct: 8, color: 'bg-primary-container' },
]

const METRICS = [
  { label: 'Expected return', value: '11.8% p.a.' },
  { label: 'Risk level', value: 'Moderate' },
  { label: 'Time horizon', value: '10+ yrs' },
]

/**
 * PlanWisely is a fermor.in-inspired section that pairs a recommended
 * allocation visualization with educational copy about why the plan works.
 */
export function PlanWisely() {
  return (
    <Section background="bg-surface-container-low/50">
      <div className="grid items-center gap-12 md:grid-cols-2">
        {/* Copy */}
        <div>
          <Reveal>
            <SectionLabel>Plan wisely</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mb-4 font-display-lg-mobile text-on-surface md:font-display-lg">
              Plan wisely, not blindly.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mb-6 text-body-lg text-secondary">
              It takes more than money to grow money — clarity matters too. Fermor
              pairs expert-built, diversified frameworks with educational tools,
              so you understand exactly why a plan makes sense before you act on it.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <ul className="space-y-3">
              {[
                'Allocation suited to your age and risk',
                'Projected returns you can actually trust',
                'Learn the "why" behind every recommendation',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                    <Icon name="check" className="text-primary" style={{ fontSize: '16px' }} />
                  </span>
                  <span className="text-secondary">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.2}>
            <Link
              to="/calculators"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-glow"
            >
              Start planning
              <Icon name="arrow_forward" className="text-base" />
            </Link>
          </Reveal>
        </div>

        {/* Allocation card */}
        <Reveal delay={0.15}>
          <div className="rounded-2xl border border-surface-variant bg-white/90 p-8 shadow-card-hover backdrop-blur-sm">
            <div className="mb-1 flex items-center justify-between">
              <h3 className="text-title-sm font-semibold text-on-surface">Recommended mix</h3>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                Balanced · Age 32
              </span>
            </div>
            <p className="mb-6 text-sm text-secondary">Diversified</p>

            {/* Allocation bars */}
            <div className="mb-6 space-y-3">
              {ALLOCATION.map((a, i) => (
                <div key={a.name}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-on-surface">{a.name}</span>
                    <span className="font-bold tabular-nums text-on-surface">{a.pct}%</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-surface-container">
                    <motion.div
                      className={`h-full rounded-full ${a.color}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${a.pct}%` }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.8, delay: 0.1 * i, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 border-t border-surface-variant pt-6">
              {METRICS.map((m) => (
                <div key={m.label} className="text-center">
                  <div className="text-sm font-bold text-on-surface">{m.value}</div>
                  <div className="mt-0.5 text-xs text-secondary">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
