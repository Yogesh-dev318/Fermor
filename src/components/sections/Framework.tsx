import { Icon } from '../ui/Icon'
import { Section } from '../ui/Section'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'
import { useTilt } from '../../hooks/useTilt'

type Step = {
  number: string
  icon: string
  title: string
  description: string
  detail: string
  /** Tailwind classes for the card background tint. */
  cardClass: string
  /** Tailwind classes for the icon badge. */
  badgeClass: string
  /** Icon color class. */
  iconClass: string
  /** Large bg number color. */
  numberClass: string
}

const STEPS: Step[] = [
  {
    number: '01',
    icon: 'visibility',
    title: 'Understand',
    description: 'See your whole financial picture in one place.',
    detail:
      'Connect every account — checking, savings, investments, and debt. No jargon, just a clear snapshot of where you actually stand.',
    cardClass: 'bg-white/80',
    badgeClass: 'bg-surface-container-high',
    iconClass: 'text-on-surface',
    numberClass: 'text-surface-container-highest',
  },
  {
    number: '02',
    icon: 'bolt',
    title: 'Act',
    description: 'Get the exact next step to take with your money.',
    detail:
      'Fermor surfaces personalized insights — pay down this debt, shift this amount to savings — so you never wonder what to do next.',
    cardClass: 'bg-white/80',
    badgeClass: 'bg-primary/10',
    iconClass: 'text-primary',
    numberClass: 'text-primary/10',
  },
  {
    number: '03',
    icon: 'trending_up',
    title: 'Grow',
    description: 'Watch consistent progress compound over time.',
    detail:
      'Set real goals, track milestones, and see your net worth climb. Growth becomes something you see every week, not just dream about.',
    cardClass: 'bg-gradient-to-br from-primary/5 to-primary-fixed/20',
    badgeClass: 'bg-growth-green/15',
    iconClass: 'text-growth-green',
    numberClass: 'text-growth-green/10',
  },
]

function StepConnector() {
  return (
    <div className="hidden items-center justify-center md:flex" aria-hidden="true">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-container">
        <Icon name="chevron_right" className="text-outline text-base" />
      </div>
    </div>
  )
}

function FrameworkCard({ step, delay }: { step: Step; delay: number }) {
  const tiltRef = useTilt<HTMLDivElement>()

  return (
    <Reveal delay={delay * 0.1}>
      <div
        ref={tiltRef}
        className={`tilt-card group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl p-8 ${step.cardClass} border border-white/60 shadow-card backdrop-blur-sm transition-shadow hover:shadow-card-hover`}
        style={{ transition: 'transform 0.1s ease-out, box-shadow 0.2s ease', transformStyle: 'preserve-3d' }}
      >
        {/* Large step number in background */}
        <span
          className={`pointer-events-none absolute -top-2 right-4 select-none text-[96px] font-bold leading-none ${step.numberClass} transition-transform duration-500 group-hover:scale-110`}
          aria-hidden="true"
        >
          {step.number}
        </span>

        {/* Icon badge */}
        <div
          className={`mb-1 flex h-12 w-12 items-center justify-center rounded-xl ${step.badgeClass}`}
          style={{ transform: 'translateZ(20px)' }}
        >
          <Icon name={step.icon} className={`text-xl ${step.iconClass}`} />
        </div>

        {/* Text */}
        <div style={{ transform: 'translateZ(20px)' }}>
          <h3 className="mb-2 text-headline-md-mobile font-semibold text-on-surface">
            {step.title}
          </h3>
          <p className="mb-3 font-medium text-on-surface/80">{step.description}</p>
          <p className="text-body-md text-secondary">{step.detail}</p>
        </div>
      </div>
    </Reveal>
  )
}

/**
 * Framework presents the three-step "Understand → Act → Grow" methodology.
 */
export function Framework() {
  return (
    <Section id="framework" className="relative">
      <Reveal className="mb-16 text-center">
        <SectionLabel className="justify-center">Our Approach</SectionLabel>
        <h2 className="mb-4 font-display-lg-mobile text-on-surface md:font-display-lg">
          Three simple steps.
          <br />
          One clear path forward.
        </h2>
        <p className="mx-auto max-w-xl text-body-lg text-secondary">
          We cut through the noise so you can focus on building a genuinely
          healthy relationship with your money.
        </p>
      </Reveal>

      {/* Cards with arrow connectors on desktop */}
      <div className="grid items-start gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
        <FrameworkCard step={STEPS[0]} delay={0} />
        <StepConnector />
        <FrameworkCard step={STEPS[1]} delay={1} />
        <StepConnector />
        <FrameworkCard step={STEPS[2]} delay={2} />
      </div>
    </Section>
  )
}
