import { useMemo, useState } from 'react'

type GrowthCalculatorProps = {
  /** Initial monthly savings value in dollars. */
  initialSavings?: number
  /** Annual interest rate used for the projection (e.g. 0.07 = 7%). */
  annualRate?: number
  /** Projection horizon in years. */
  years?: number
}

/** Future value of an ordinary annuity. */
function fv(monthly: number, annualRate: number, years: number) {
  const r = annualRate / 12
  const n = years * 12
  return monthly * ((Math.pow(1 + r, n) - 1) / r)
}

const SPARKLINE_YEARS = [2, 4, 6, 8, 10]

const CURRENCY = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

/**
 * GrowthCalculator is the interactive compound-interest widget shown in the
 * Hero. A slider drives the monthly savings amount; the result and mini
 * sparkline update live.
 */
export function GrowthCalculator({
  initialSavings = 200,
  annualRate = 0.07,
  years = 10,
}: GrowthCalculatorProps) {
  const [monthly, setMonthly] = useState(initialSavings)

  const futureValue = useMemo(() => fv(monthly, annualRate, years), [monthly, annualRate, years])

  const sparklineValues = useMemo(
    () => SPARKLINE_YEARS.map((yr) => fv(monthly, annualRate, yr)),
    [monthly, annualRate],
  )

  const maxSparkline = sparklineValues[sparklineValues.length - 1]

  return (
    <div>
      <h3 className="mb-5 text-title-sm font-semibold text-on-surface">
        Calculate your growth
      </h3>

      {/* Slider */}
      <div className="mb-1 flex justify-between text-sm">
        <span className="text-secondary">Monthly Savings</span>
        <span className="font-semibold text-on-surface tabular-nums">
          ${monthly.toLocaleString()}
        </span>
      </div>
      <input
        type="range"
        min={50}
        max={1000}
        step={50}
        value={monthly}
        onChange={(e) => setMonthly(Number(e.target.value))}
        aria-label="Monthly savings"
        className="mb-5 w-full"
      />

      {/* Sparkline — growth per milestone year */}
      <div className="mb-4 flex items-end gap-1.5" style={{ height: '52px' }}>
        {sparklineValues.map((v, i) => {
          const heightPct = maxSparkline > 0 ? (v / maxSparkline) * 100 : 0
          return (
            <div key={SPARKLINE_YEARS[i]} className="flex flex-1 flex-col items-center gap-1">
              <div
                className="w-full rounded-t-sm bg-primary/20 transition-all duration-500"
                style={{ height: `${heightPct}%` }}
              >
                <div
                  className="h-full w-full rounded-t-sm bg-growth-green transition-all duration-500"
                  style={{ opacity: 0.35 + 0.13 * i }}
                />
              </div>
              <span className="text-[10px] text-secondary">{SPARKLINE_YEARS[i]}y</span>
            </div>
          )
        })}
      </div>

      {/* Result panel */}
      <div className="rounded-xl bg-gradient-to-br from-primary/8 to-primary-fixed/20 p-4 text-center ring-1 ring-primary/10">
        <span className="mb-0.5 block text-xs font-medium uppercase tracking-wider text-secondary">
          In {years} years at {Math.round(annualRate * 100)}% avg. return
        </span>
        <span className="text-3xl font-bold leading-tight text-growth-green tabular-nums">
          {CURRENCY.format(Math.round(futureValue))}
        </span>
      </div>
    </div>
  )
}
