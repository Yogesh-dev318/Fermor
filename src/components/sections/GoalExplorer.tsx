import { Link } from 'react-router-dom'
import { Section } from '../ui/Section'
import { SectionLabel } from '../ui/SectionLabel'
import { Icon } from '../ui/Icon'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'

type Goal = {
  icon: string
  label: string
  to: string
  badgeClass: string
  iconClass: string
}

const GOALS: Goal[] = [
  { icon: 'shield', label: 'Insurance', to: '/calculators', badgeClass: 'bg-tertiary/10', iconClass: 'text-tertiary' },
  { icon: 'credit_card', label: 'Credit Cards', to: '/calculators', badgeClass: 'bg-primary/10', iconClass: 'text-primary' },
  { icon: 'account_balance', label: 'Loans', to: '/calculators', badgeClass: 'bg-secondary/10', iconClass: 'text-secondary' },
  { icon: 'savings', label: 'Banking', to: '/calculators', badgeClass: 'bg-growth-green/10', iconClass: 'text-growth-green' },
  { icon: 'trending_up', label: 'Investing', to: '/calculators', badgeClass: 'bg-primary/10', iconClass: 'text-primary' },
  { icon: 'receipt_long', label: 'Taxes', to: '/calculators', badgeClass: 'bg-tertiary/10', iconClass: 'text-tertiary' },
  { icon: 'credit_score', label: 'Credit Score', to: '/calculators', badgeClass: 'bg-secondary/10', iconClass: 'text-secondary' },
  { icon: 'work', label: 'Career & Salary', to: '/calculators', badgeClass: 'bg-growth-green/10', iconClass: 'text-growth-green' },
  { icon: 'elderly', label: 'Retirement', to: '/calculators', badgeClass: 'bg-primary/10', iconClass: 'text-primary' },
  { icon: 'home', label: 'Real Estate', to: '/calculators', badgeClass: 'bg-tertiary/10', iconClass: 'text-tertiary' },
  { icon: 'paid', label: 'SIP Calculator', to: '/calculators', badgeClass: 'bg-growth-green/10', iconClass: 'text-growth-green' },
  { icon: 'apps', label: 'Tools & more', to: '/calculators', badgeClass: 'bg-secondary/10', iconClass: 'text-secondary' },
]

/**
 * GoalExplorer is a fermor.in-inspired grid of financial goal categories.
 * Each chip links to the calculators page. Hover scales the icon badge.
 */
export function GoalExplorer() {
  return (
    <Section className="relative">
      <div className="text-center">
        <Reveal>
          <SectionLabel className="justify-center">Start anywhere</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mb-4 font-display-lg-mobile text-on-surface md:font-display-lg">
            What are you planning?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mb-12 max-w-xl text-body-lg text-secondary">
            Pick a goal and Fermor runs the math, compares your options, and shows
            you the clear next step — no jargon, no commission.
          </p>
        </Reveal>

        {/* Goal grid */}
        <RevealGroup className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {GOALS.map((goal) => (
            <RevealItem key={goal.label}>
              <Link
                to={goal.to}
                className="group flex h-full flex-col items-center gap-3 rounded-2xl border border-surface-variant bg-white/80 p-5 shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-primary/20 hover:shadow-card-hover"
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${goal.badgeClass} transition-transform duration-200 group-hover:scale-110`}
                >
                  <Icon name={goal.icon} className={`text-xl ${goal.iconClass}`} />
                </span>
                <span className="text-sm font-medium text-on-surface">{goal.label}</span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  )
}
