import { Icon } from '../ui/Icon'
import { Section } from '../ui/Section'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'
import { useTilt } from '../../hooks/useTilt'

type Testimonial = {
  quote: string
  author: string
  role: string
  /** Initials for the avatar circle. */
  initials: string
  /** Tailwind gradient for the avatar background. */
  avatarGradient: string
  /** Accent color for the top border. */
  accentClass: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Fermor finally made me feel like I am in control of my money instead of the other way around. The calm interface changes everything.',
    author: 'Sarah J.',
    role: 'Freelance Designer',
    initials: 'SJ',
    avatarGradient: 'from-primary to-primary-container',
    accentClass: 'from-primary to-primary-container',
  },
  {
    quote:
      'The proactive insights told me exactly how much extra cash I had to invest this month. It saved me hours of spreadsheet work.',
    author: 'Mike T.',
    role: 'Software Engineer',
    initials: 'MT',
    avatarGradient: 'from-tertiary to-tertiary-container',
    accentClass: 'from-tertiary to-tertiary-container',
  },
  {
    quote:
      'Ditched my messy spreadsheet after 5 years. Fermor is exactly what human-first finance should look like — finally.',
    author: 'Elena R.',
    role: 'Product Manager',
    initials: 'ER',
    avatarGradient: 'from-growth-green to-primary-fixed',
    accentClass: 'from-growth-green to-primary-fixed',
  },
]

function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon key={i} name="star" fill className="text-[16px] text-primary" />
      ))}
    </div>
  )
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const tiltRef = useTilt<HTMLDivElement>()
  return (
    <div
      ref={tiltRef}
      className="tilt-card group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-shadow hover:shadow-card-hover"
      style={{ transition: 'transform 0.1s ease-out, box-shadow 0.2s ease', transformStyle: 'preserve-3d' }}
    >
      {/* Gradient top accent border */}
      <div className={`h-1 w-full bg-gradient-to-r ${testimonial.accentClass}`} />

      <div className="flex flex-1 flex-col p-8" style={{ transform: 'translateZ(10px)' }}>
        {/* Large decorative quote mark */}
        <div
          className="pointer-events-none absolute right-6 top-5 select-none font-serif text-7xl leading-none text-surface-container-highest"
          aria-hidden="true"
        >
          "
        </div>

        <Stars />

        <p className="mb-6 mt-4 flex-1 text-body-md italic leading-relaxed text-secondary">
          &ldquo;{testimonial.quote}&rdquo;
        </p>

        {/* Author row */}
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${testimonial.avatarGradient} text-sm font-bold text-white shadow-sm`}
          >
            {testimonial.initials}
          </div>
          <div>
            <div className="font-semibold text-on-surface">{testimonial.author}</div>
            <div className="text-xs text-secondary">{testimonial.role}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Testimonials is a three-up grid of customer quotes with gradient avatars,
 * author roles, large decorative quote marks, and accent border tops.
 */
export function Testimonials() {
  return (
    <Section background="bg-surface-container/40">
      <Reveal className="mb-14 text-center">
        <SectionLabel className="justify-center">Loved by users</SectionLabel>
        <h2 className="font-display-lg-mobile text-on-surface">
          Real people. Real results.
        </h2>
      </Reveal>

      <RevealGroup className="grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <RevealItem key={t.author} className="h-full">
            <TestimonialCard testimonial={t} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}
