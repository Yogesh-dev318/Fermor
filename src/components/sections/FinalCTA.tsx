import { motion } from 'framer-motion'
import { Icon } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'

type TrustBadge = {
  icon: string
  label: string
}

const TRUST_BADGES: TrustBadge[] = [
  { icon: 'lock', label: '256-bit encryption' },
  { icon: 'verified_user', label: 'SOC 2 compliant' },
  { icon: 'visibility_off', label: 'Read-only access' },
  { icon: 'cancel_schedule_send', label: 'No spam, ever' },
]

/**
 * FinalCTA is the closing conversion section. It pairs a compelling headline
 * with an email capture form and trust badges to reduce last-mile anxiety.
 * The `id="get-started"` anchor is referenced by nav CTAs throughout the site.
 */
export function FinalCTA() {
  return (
    <section
      id="get-started"
      className="relative overflow-hidden bg-primary py-28 text-center text-white"
    >
      {/* Layered mesh blobs for depth */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 right-0 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.06) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-2xl px-margin-mobile md:px-gutter">
        {/* Eyebrow */}
        <Reveal>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-label-caps uppercase tracking-widest text-white/80 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-primary-fixed" />
            Join 1.2M+ users
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mb-5 font-display-lg-mobile md:font-display-lg">
            Ready for financial clarity?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mb-10 text-lg leading-relaxed text-primary-fixed-dim">
            Start free in 2 minutes. Connect your accounts, understand your money,
            and take the next right step — today.
          </p>
        </Reveal>

        {/* Email form */}
        <Reveal delay={0.15}>
          <form
            className="mx-auto mb-8 flex max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Email address"
              className="flex-1 rounded-full border-none bg-white px-6 py-4 text-ink placeholder-secondary/60 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="whitespace-nowrap rounded-full bg-ink px-8 py-4 font-bold text-white shadow-lg transition-all hover:bg-gray-800 hover:shadow-xl active:scale-95"
            >
              Get Started Free
            </button>
          </form>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mb-10 text-sm text-primary-fixed-dim">
            No credit card required &middot; 14-day free trial &middot; Cancel anytime
          </p>
        </Reveal>

        {/* Trust badges */}
        <Reveal delay={0.25}>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {TRUST_BADGES.map((badge) => (
              <motion.div
                key={badge.label}
                whileHover={{ y: -2 }}
                className="flex items-center gap-2 text-sm text-white/60"
              >
                <Icon name={badge.icon} className="text-[18px] text-primary-fixed/80" />
                <span>{badge.label}</span>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
