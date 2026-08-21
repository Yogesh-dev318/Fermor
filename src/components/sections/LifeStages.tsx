import { Link } from 'react-router-dom'
import { Section } from '../ui/Section'
import { SectionLabel } from '../ui/SectionLabel'
import { Icon } from '../ui/Icon'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'

type Stage = {
  icon: string
  title: string
  subtitle: string
  description: string
  gradientFrom: string
  gradientTo: string
}

const STAGES: Stage[] = [
  {
    icon: 'rocket_launch',
    title: 'Just started earning',
    subtitle: 'Build the basics',
    description: 'Set up your first budget, start a SIP, and build habits that compound for decades.',
    gradientFrom: 'from-primary/10',
    gradientTo: 'to-primary-fixed/20',
  },
  {
    icon: 'home',
    title: 'Buying a home',
    subtitle: 'Plan the down payment',
    description: 'Compare loan options, plan your EMI, and know exactly how much you can afford.',
    gradientFrom: 'from-tertiary/10',
    gradientTo: 'to-tertiary-container/30',
  },
  {
    icon: 'family_restroom',
    title: 'Growing a family',
    subtitle: 'Protect what matters',
    description: 'Term insurance, health cover, and education planning — all in plain English.',
    gradientFrom: 'from-growth-green/10',
    gradientTo: 'to-primary-fixed/30',
  },
  {
    icon: 'beach_access',
    title: 'Near retirement',
    subtitle: 'Make it last',
    description: 'Plan your withdrawal strategy, optimize NPS and PPF, and retire with confidence.',
    gradientFrom: 'from-secondary/10',
    gradientTo: 'to-surface-container-high/40',
  },
]

/**
 * LifeStages is a grid of life-stage cards inspired by fermor.in's
 * "Tools for every stage of your money journey" section.
 */
export function LifeStages() {
  return (
    <Section background="bg-surface-container-low/50">
      <div className="mb-12 text-center">
        <Reveal>
          <SectionLabel className="justify-center">Every stage of life</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display-lg-mobile text-on-surface md:font-display-lg">
            Tools for every stage of your money journey.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-4 max-w-xl text-body-lg text-secondary">
            Wherever you are, Fermor's tools and guides help you understand your
            options and reach your goals — one clear decision at a time.
          </p>
        </Reveal>
      </div>

      <RevealGroup className="grid gap-6 md:grid-cols-4">
        {STAGES.map((stage) => (
          <RevealItem key={stage.title} className="h-full">
            <Link
              to="/calculators"
              className={`group flex h-full flex-col gap-4 rounded-2xl bg-gradient-to-br ${stage.gradientFrom} ${stage.gradientTo} p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover`}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 shadow-sm transition-transform duration-200 group-hover:scale-110">
                <Icon name={stage.icon} className="text-xl text-on-surface" />
              </span>
              <div>
                <p className="text-label-caps uppercase tracking-wider text-secondary">
                  {stage.subtitle}
                </p>
                <h3 className="mt-1 text-headline-md-mobile font-semibold text-on-surface">
                  {stage.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-secondary">{stage.description}</p>
              <span className="mt-auto flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Explore tools
                <Icon name="arrow_forward" className="text-base" />
              </span>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}
