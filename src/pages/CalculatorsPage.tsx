import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Section } from '../components/ui/Section'
import { SectionLabel } from '../components/ui/SectionLabel'
import { Icon } from '../components/ui/Icon'
import { Reveal } from '../components/ui/Reveal'
import { SipCalculator } from '../components/widgets/SipCalculator'

type Category = 'All' | 'Investing' | 'Loans' | 'Tax' | 'Retirement' | 'Other'

type CalculatorDef = {
  name: string
  description: string
  icon: string
  category: Category
  badgeClass: string
  iconClass: string
}

const CALCULATORS: CalculatorDef[] = [
  { name: 'SIP Calculator', description: 'Project your mutual fund SIP growth over time.', icon: 'trending_up', category: 'Investing', badgeClass: 'bg-primary/10', iconClass: 'text-primary' },
  { name: 'Lumpsum Calculator', description: 'Estimate returns on a one-time investment.', icon: 'paid', category: 'Investing', badgeClass: 'bg-primary/10', iconClass: 'text-primary' },
  { name: 'Capital Gains Calculator', description: 'Calculate tax on your investment profits.', icon: 'candlestick_chart', category: 'Investing', badgeClass: 'bg-primary/10', iconClass: 'text-primary' },
  { name: 'Goal Planning Calculator', description: 'Work out the monthly SIP for any goal.', icon: 'flag', category: 'Investing', badgeClass: 'bg-primary/10', iconClass: 'text-primary' },
  { name: 'EMI Calculator', description: 'Break down your loan EMI, interest, and tenure.', icon: 'account_balance', category: 'Loans', badgeClass: 'bg-tertiary/10', iconClass: 'text-tertiary' },
  { name: 'Home Loan Calculator', description: 'Plan your down payment and monthly EMI.', icon: 'home', category: 'Loans', badgeClass: 'bg-tertiary/10', iconClass: 'text-tertiary' },
  { name: 'Car Loan Calculator', description: 'Estimate your car loan EMI instantly.', icon: 'directions_car', category: 'Loans', badgeClass: 'bg-tertiary/10', iconClass: 'text-tertiary' },
  { name: 'Mortgage Calculator', description: 'Compare mortgage terms and total interest.', icon: 'real_estate_agent', category: 'Loans', badgeClass: 'bg-tertiary/10', iconClass: 'text-tertiary' },
  { name: 'In-Hand Salary Calculator', description: 'Decode your CTC into real take-home pay.', icon: 'payments', category: 'Tax', badgeClass: 'bg-secondary/10', iconClass: 'text-secondary' },
  { name: 'GST Calculator', description: 'Quickly compute GST-inclusive or exclusive amounts.', icon: 'receipt_long', category: 'Tax', badgeClass: 'bg-secondary/10', iconClass: 'text-secondary' },
  { name: 'Old vs New Regime', description: 'Compare tax regimes and find your best fit.', icon: 'balance', category: 'Tax', badgeClass: 'bg-secondary/10', iconClass: 'text-secondary' },
  { name: 'PPF Calculator', description: 'Project your Public Provident Fund maturity value.', icon: 'savings', category: 'Retirement', badgeClass: 'bg-growth-green/10', iconClass: 'text-growth-green' },
  { name: 'NPS Calculator', description: 'Estimate your National Pension System corpus.', icon: 'elderly', category: 'Retirement', badgeClass: 'bg-growth-green/10', iconClass: 'text-growth-green' },
  { name: 'SWP Calculator', description: 'Plan a systematic withdrawal in retirement.', icon: 'account_balance_wallet', category: 'Retirement', badgeClass: 'bg-growth-green/10', iconClass: 'text-growth-green' },
  { name: 'Gratuity Calculator', description: 'Calculate your gratuity payout on exit.', icon: 'card_giftcard', category: 'Retirement', badgeClass: 'bg-growth-green/10', iconClass: 'text-growth-green' },
  { name: 'FD Calculator', description: 'Compute maturity value of a fixed deposit.', icon: 'lock_clock', category: 'Other', badgeClass: 'bg-outline/10', iconClass: 'text-on-surface' },
  { name: 'SSY Calculator', description: 'Plan Sukanya Samriddhi Yojana contributions.', icon: 'child_care', category: 'Other', badgeClass: 'bg-outline/10', iconClass: 'text-on-surface' },
  { name: 'Percentage Calculator', description: 'Quick percentage, increase and decrease math.', icon: 'percent', category: 'Other', badgeClass: 'bg-outline/10', iconClass: 'text-on-surface' },
]

const CATEGORIES: Category[] = ['All', 'Investing', 'Loans', 'Tax', 'Retirement', 'Other']

function CalculatorCard({ calc }: { calc: CalculatorDef }) {
  return (
    <button
      className="group flex flex-col items-start gap-4 rounded-2xl border border-surface-variant bg-white/80 p-6 text-left shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-primary/20 hover:shadow-card-hover"
    >
      <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${calc.badgeClass} transition-transform duration-200 group-hover:scale-110`}>
        <Icon name={calc.icon} className={`text-xl ${calc.iconClass}`} />
      </span>
      <div>
        <h3 className="mb-1 text-title-sm font-semibold text-on-surface transition-colors group-hover:text-primary">
          {calc.name}
        </h3>
        <p className="text-sm leading-relaxed text-secondary">{calc.description}</p>
      </div>
      <span className="mt-auto flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
        Open calculator
        <Icon name="arrow_forward" className="text-sm" />
      </span>
    </button>
  )
}

/**
 * CalculatorsPage lists every financial calculator grouped and filterable
 * by category, and features a fully interactive SIP calculator at the top.
 */
export function CalculatorsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All')

  const filtered = useMemo(
    () =>
      activeCategory === 'All'
        ? CALCULATORS
        : CALCULATORS.filter((c) => c.category === activeCategory),
    [activeCategory],
  )

  return (
    <>
      {/* Header */}
      <Section className="pt-36 pb-12">
        <div className="text-center">
          <Reveal>
            <SectionLabel className="justify-center">25+ free tools</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mb-4 font-display-lg-mobile text-on-surface md:font-display-lg">
              Every calculator you need,
              <br />
              in one place.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto max-w-xl text-body-lg text-secondary">
              Independent, unbiased, and always free. Run the math before you make
              any financial decision.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Featured SIP calculator */}
      <Section padded={false} className="pb-section-padding">
        <SipCalculator />
      </Section>

      {/* Filterable grid */}
      <Section background="bg-surface-container-low/50">
        <Reveal className="mb-10 flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-ink text-white shadow-md'
                  : 'border border-surface-variant bg-white/80 text-secondary hover:border-ink/40 hover:text-on-surface'
              }`}
            >
              {cat}
            </button>
          ))}
        </Reveal>

        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((calc) => (
              <motion.div
                key={calc.name}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <CalculatorCard calc={calc} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Section>
    </>
  )
}
