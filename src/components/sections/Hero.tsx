import { Link } from 'react-router-dom'
import { Button } from '../ui/Button'
import { MagneticButton } from '../ui/MagneticButton'
import { Icon } from '../ui/Icon'
import { SectionLabel } from '../ui/SectionLabel'
import { useTilt } from '../../hooks/useTilt'
import { useGsapHeroTimeline } from '../../hooks/useGsapHeroTimeline'
import { GrowthCalculator } from '../widgets/GrowthCalculator'

type FloatingBadge = {
  icon: string
  value: string
  sub: string
  pos: React.CSSProperties
  animationDelay: string
}

const FLOATING_BADGES: FloatingBadge[] = [
  {
    icon: 'trending_up',
    value: '+12.4%',
    sub: 'Portfolio this month',
    pos: { top: '-14px', right: '-10px' },
    animationDelay: '0s',
  },
  {
    icon: 'savings',
    value: '$2,400',
    sub: 'Saved toward goal',
    pos: { bottom: '72px', left: '-18px' },
    animationDelay: '1.8s',
  },
]

const AVATAR_COLORS = ['#126a3a', '#3e8e5a', '#338350', '#87d89d', '#00522a']

/**
 * Hero is the first section the user sees. It combines the brand promise,
 * floating metric badges, an interactive GrowthCalculator, and social proof.
 * Uses GSAP for the entrance timeline animation.
 */
export function Hero() {
  const heroRef = useGsapHeroTimeline<HTMLDivElement>()
  const tiltRef = useTilt<HTMLDivElement>()

  return (
    <header
      id="top"
      ref={heroRef}
      className="relative mx-auto max-w-container overflow-visible px-margin-mobile pt-36 pb-28 md:px-gutter"
    >
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute -top-24 left-1/4 -z-10 h-[480px] w-[480px] rounded-full bg-primary/10 blur-[100px]" />
      <div className="pointer-events-none absolute top-16 right-0 -z-10 h-72 w-72 rounded-full bg-primary-fixed/30 blur-3xl" />

      <div className="grid min-h-[680px] items-center gap-12 md:grid-cols-12">
        {/* ── Copy ── */}
        <div className="z-10 flex flex-col gap-6 md:col-span-6">
          <div data-hero>
            <SectionLabel>Human-First Finance</SectionLabel>
          </div>

          <h1 data-hero className="text-on-surface font-display-lg-mobile md:font-display-lg">
            Understand your money.
            <br />
            Act with confidence.
            <br />
            <span className="gradient-text">Watch it grow.</span>
          </h1>

          <p data-hero className="max-w-[460px] text-body-lg text-secondary">
            Fermor connects your accounts, spending, and goals in one calm
            view — so you always know exactly what to do with your money.
          </p>

          {/* CTAs */}
          <div data-hero className="mt-2 flex flex-col gap-4 sm:flex-row">
            <MagneticButton>
              <Button
                href="#get-started"
                variant="primary"
                className="px-8 py-3.5 text-[15px] shadow-glow"
              >
                Get started free
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Link
                to="/calculators"
                className="btn-secondary inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-[15px] text-ink"
              >
                Explore tools
                <Icon name="arrow_forward" className="text-base" />
              </Link>
            </MagneticButton>
          </div>

          {/* Social proof */}
          <div data-hero className="mt-1 flex items-center gap-3">
            <div className="flex -space-x-2">
              {AVATAR_COLORS.map((color, i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full border-2 border-white ring-1 ring-surface-container"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <p className="text-sm text-secondary">
              <span className="font-semibold text-on-surface">1.2M+ users</span>{' '}
              already growing their wealth
            </p>
          </div>
        </div>

        {/* ── Widget ── */}
        <div data-hero className="relative mt-12 flex flex-col items-center justify-center md:col-span-6 md:mt-0">
          <div className="absolute inset-0 -z-10 scale-110 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative w-full max-w-sm">
            {/* Floating metric badges */}
            {FLOATING_BADGES.map((badge) => (
              <div
                key={badge.value}
                className="absolute z-20 flex items-center gap-2.5 rounded-xl border border-surface-variant bg-white/95 px-4 py-2.5 shadow-card-hover backdrop-blur-sm"
                style={{
                  ...badge.pos,
                  animation: `float 4s ease-in-out ${badge.animationDelay} infinite`,
                }}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <Icon name={badge.icon} className="text-base text-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold leading-tight text-on-surface">
                    {badge.value}
                  </div>
                  <div className="text-[11px] leading-tight text-secondary">
                    {badge.sub}
                  </div>
                </div>
              </div>
            ))}

            {/* Main calculator card */}
            <div
              ref={tiltRef}
              className="tilt-card w-full rounded-2xl border border-surface-variant bg-white/92 p-6 shadow-xl backdrop-blur-sm"
              style={{ transition: 'transform 0.1s ease-out', transformStyle: 'preserve-3d' }}
            >
              <div style={{ transform: 'translateZ(20px)' }}>
                <GrowthCalculator />
              </div>
            </div>
          </div>

          {/* Scroll cue */}
          <div className="mt-12 flex animate-bounce-slow flex-col items-center gap-1 text-secondary">
            <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
            <Icon name="keyboard_arrow_down" className="text-xl" />
          </div>
        </div>
      </div>
    </header>
  )
}
