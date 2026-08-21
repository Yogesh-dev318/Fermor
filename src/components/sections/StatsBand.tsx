import { useGsapCounter } from '../../hooks/useGsapCounter'

type StatDef = {
  countTarget: number
  divisor?: number
  decimals?: number
  prefix?: string
  suffix: string
  label: string
  sub: string
}

const STATS: StatDef[] = [
  {
    countTarget: 5,
    prefix: '$',
    suffix: 'B+',
    label: 'Assets tracked securely',
    sub: 'Across 10,000+ institutions',
  },
  {
    countTarget: 12,
    divisor: 10,
    decimals: 1,
    suffix: 'M',
    label: 'Financial insights delivered',
    sub: 'Every month, on autopilot',
  },
  {
    countTarget: 49,
    divisor: 10,
    decimals: 1,
    suffix: '/5',
    label: 'Average user rating',
    sub: 'From 50,000+ verified reviews',
  },
]

type StatItemProps = { stat: StatDef; isLast: boolean }

function StatItem({ stat, isLast }: StatItemProps) {
  const { value, ref } = useGsapCounter<HTMLDivElement>(stat.countTarget, stat.decimals ?? 0)

  const display = stat.divisor
    ? (value / stat.divisor).toFixed(stat.decimals ?? 1)
    : value.toString()

  return (
    <div className="relative text-center">
      <div ref={ref} className="mb-1 text-5xl font-bold tabular-nums text-primary md:text-6xl">
        {stat.prefix ?? ''}{display}{stat.suffix}
      </div>
      <div className="font-medium text-white/90">{stat.label}</div>
      <div className="mt-1 text-sm text-gray-500">{stat.sub}</div>

      {!isLast && (
        <div className="absolute right-0 top-1/2 hidden h-16 w-px -translate-y-1/2 bg-white/10 md:block" />
      )}
    </div>
  )
}

/**
 * StatsBand is a dark ink-colored band of headline metrics with GSAP-powered
 * count-up animation. Numbers animate from 0 once they scroll into view.
 */
export function StatsBand() {
  return (
    <section className="bg-ink py-24 text-white">
      <div className="mx-auto max-w-container px-margin-mobile md:px-gutter">
        <p className="mb-10 text-center text-label-caps uppercase tracking-widest text-gray-500">
          Trusted at scale
        </p>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {STATS.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} isLast={i === STATS.length - 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
