import { Link } from 'react-router-dom'
import { Section } from '../components/ui/Section'
import { SectionLabel } from '../components/ui/SectionLabel'
import { Icon } from '../components/ui/Icon'
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal'

type Value = {
  icon: string
  title: string
  description: string
}

const VALUES: Value[] = [
  {
    icon: 'verified',
    title: 'Independent & unbiased',
    description: 'We never take commission from banks, funds, or lenders. Our only job is to run the math honestly.',
  },
  {
    icon: 'block',
    title: 'No commission, ever',
    description: 'Recommendations are based on what fits your numbers — never on which product pays us the most.',
  },
  {
    icon: 'flag',
    title: 'Built for real life',
    description: 'Every tool speaks plain English. No jargon, no fine print you need a lawyer to read.',
  },
  {
    icon: 'lock',
    title: 'Privacy by default',
    description: 'Your data is never sold. Bank-level encryption and read-only access, always.',
  },
]

type TeamMember = {
  name: string
  role: string
  initials: string
  gradient: string
}

const TEAM: TeamMember[] = [
  { name: 'Ananya Rao', role: 'Co-founder & CEO', initials: 'AR', gradient: 'from-primary to-primary-container' },
  { name: 'Karan Mehta', role: 'Co-founder & CTO', initials: 'KM', gradient: 'from-tertiary to-tertiary-container' },
  { name: 'Priya Nair', role: 'Head of Product', initials: 'PN', gradient: 'from-growth-green to-primary-fixed' },
  { name: 'Devika Iyer', role: 'Head of Research', initials: 'DI', gradient: 'from-secondary to-secondary-container' },
]

const MILESTONES = [
  { year: '2021', label: 'Fermor founded in Bengaluru' },
  { year: '2022', label: '100,000 calculators run' },
  { year: '2023', label: 'Expanded to 12 money categories' },
  { year: '2024', label: '1.2M+ users trust Fermor' },
]

/**
 * AboutPage tells the Fermor origin story: mission, values, timeline, and team.
 */
export function AboutPage() {
  return (
    <>
      {/* Header */}
      <Section className="pt-28 pb-12 md:pt-36 md:pb-16">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <SectionLabel className="justify-center">About Fermor</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mb-6 font-display-lg-mobile text-on-surface md:font-display-lg">
              Financial clarity, without an agenda.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-body-lg text-secondary">
              Fermor was built on a simple idea: everyone deserves clear,
              unbiased tools to understand their money — free of sales pitches,
              commissions, or confusing jargon.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Mission statement panel */}
      <Section padded={false} className="pb-section-padding md:pb-section-padding-md">
        <Reveal y={20}>
          <div className="rounded-3xl border border-surface-variant bg-gradient-to-br from-primary/5 to-primary-fixed/20 p-8 text-center md:p-16">
            <Icon name="format_quote" className="mx-auto mb-4 text-4xl text-primary/40" />
            <p className="mx-auto max-w-2xl text-headline-md-mobile leading-snug text-on-surface md:text-headline-md">
              "Most financial products are sold, not chosen. We wanted to build
              the tools that help you choose — clearly, and on your own terms."
            </p>
            <p className="mt-6 text-sm font-medium text-secondary">
              — Ananya Rao, Co-founder & CEO
            </p>
          </div>
        </Reveal>
      </Section>

      {/* Values */}
      <Section background="bg-surface-container-low/50">
        <Reveal className="mb-12 text-center">
          <h2 className="font-display-lg-mobile text-on-surface md:font-display-lg">
            What we stand for.
          </h2>
        </Reveal>
        <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value) => (
            <RevealItem key={value.title} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-surface-variant bg-white/80 p-6 shadow-card">
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                  <Icon name={value.icon} className="text-xl text-primary" />
                </span>
                <h3 className="mb-2 text-title-sm font-semibold text-on-surface">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-secondary">{value.description}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Timeline */}
      <Section>
        <div className="mb-12 text-center">
          <Reveal>
            <SectionLabel className="justify-center">Our journey</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display-lg-mobile text-on-surface md:font-display-lg">
              From idea to 1.2M+ users.
            </h2>
          </Reveal>
        </div>
        <RevealGroup className="grid gap-6 md:grid-cols-4">
          {MILESTONES.map((m) => (
            <RevealItem key={m.year} className="h-full">
              <div className="rounded-2xl border border-surface-variant bg-white/80 p-6 text-center shadow-card">
                <div className="mb-2 text-3xl font-bold text-primary">{m.year}</div>
                <p className="text-sm text-secondary">{m.label}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Team */}
      <Section background="bg-surface-container-low/50">
        <div className="mb-12 text-center">
          <Reveal>
            <SectionLabel className="justify-center">The team</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display-lg-mobile text-on-surface md:font-display-lg">
              Built by people who care about your money.
            </h2>
          </Reveal>
        </div>
        <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member) => (
            <RevealItem key={member.name} className="h-full">
              <div className="flex h-full flex-col items-center gap-3 rounded-2xl border border-surface-variant bg-white/80 p-8 text-center shadow-card">
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${member.gradient} text-lg font-bold text-white shadow-sm`}
                >
                  {member.initials}
                </div>
                <div>
                  <div className="font-semibold text-on-surface">{member.name}</div>
                  <div className="text-sm text-secondary">{member.role}</div>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* CTA */}
      <Section className="text-center">
        <Reveal>
          <h2 className="mb-4 font-display-lg-mobile text-on-surface md:font-display-lg">
            Ready to see it for yourself?
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mx-auto mb-8 max-w-xl text-body-lg text-secondary">
            Explore our free calculators — no sign-up required to start.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <Link
            to="/calculators"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 text-title-sm font-semibold text-white transition-all hover:shadow-glow"
          >
            Explore free calculators
            <Icon name="arrow_forward" className="text-base" />
          </Link>
        </Reveal>
      </Section>
    </>
  )
}
