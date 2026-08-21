import { useMemo, useState } from 'react'
import { Icon } from '../ui/Icon'

const CURRENCY = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

/** SIP future value formula: P × (((1+i)^n − 1) / i) × (1+i) */
function sipFutureValue(monthly: number, annualRate: number, years: number) {
  const i = annualRate / 12
  const n = years * 12
  return monthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i)
}

type SliderRowProps = {
  label: string
  value: number
  min: number
  max: number
  step: number
  format: (v: number) => string
  onChange: (v: number) => void
}

function SliderRow({ label, value, min, max, step, format, onChange }: SliderRowProps) {
  return (
    <div className="mb-6">
      <div className="mb-2 flex justify-between text-sm">
        <span className="text-secondary">{label}</span>
        <span className="font-semibold text-on-surface tabular-nums">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="w-full"
      />
    </div>
  )
}

/**
 * SipCalculator is an interactive Systematic Investment Plan calculator.
 * Three sliders (monthly amount, expected return, time period) drive a
 * live future-value projection, broken down into invested vs. returns.
 */
export function SipCalculator() {
  const [monthly, setMonthly] = useState(10000)
  const [rate, setRate] = useState(0.12)
  const [years, setYears] = useState(15)

  const futureValue = useMemo(() => sipFutureValue(monthly, rate, years), [monthly, rate, years])
  const invested = monthly * years * 12
  const returns = Math.max(futureValue - invested, 0)
  const investedPct = futureValue > 0 ? (invested / futureValue) * 100 : 0
  const returnsPct = 100 - investedPct

  return (
    <div className="grid gap-10 rounded-3xl border border-surface-variant bg-white/90 p-8 shadow-card-hover backdrop-blur-sm md:grid-cols-2 md:p-12">
      {/* Inputs */}
      <div>
        <h3 className="mb-6 text-title-sm font-semibold text-on-surface">
          SIP Calculator
        </h3>

        <SliderRow
          label="Monthly investment"
          value={monthly}
          min={500}
          max={100000}
          step={500}
          format={(v) => `$${v.toLocaleString()}`}
          onChange={setMonthly}
        />
        <SliderRow
          label="Expected annual return"
          value={rate}
          min={0.01}
          max={0.25}
          step={0.005}
          format={(v) => `${(v * 100).toFixed(1)}%`}
          onChange={setRate}
        />
        <SliderRow
          label="Time period"
          value={years}
          min={1}
          max={35}
          step={1}
          format={(v) => `${v} yrs`}
          onChange={setYears}
        />
      </div>

      {/* Results */}
      <div className="flex flex-col justify-center rounded-2xl bg-surface-container-low p-6">
        <div className="mb-6 text-center">
          <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-secondary">
            Total value at maturity
          </span>
          <span className="text-3xl font-bold leading-tight text-growth-green tabular-nums md:text-4xl">
            {CURRENCY.format(Math.round(futureValue))}
          </span>
        </div>

        {/* Invested vs returns bar */}
        <div className="mb-4 flex h-3 overflow-hidden rounded-full bg-surface-container">
          <div
            className="h-full bg-secondary transition-all duration-500"
            style={{ width: `${investedPct}%` }}
          />
          <div
            className="h-full bg-growth-green transition-all duration-500"
            style={{ width: `${returnsPct}%` }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-secondary" />
            <div>
              <div className="text-xs text-secondary">Invested</div>
              <div className="text-sm font-bold tabular-nums text-on-surface">
                {CURRENCY.format(Math.round(invested))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-growth-green" />
            <div>
              <div className="text-xs text-secondary">Est. returns</div>
              <div className="text-sm font-bold tabular-nums text-on-surface">
                {CURRENCY.format(Math.round(returns))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2 rounded-lg bg-primary/8 px-3 py-2.5 text-xs text-primary">
          <Icon name="info" className="text-base" />
          Educational estimate only — actual returns vary with market conditions.
        </div>
      </div>
    </div>
  )
}
