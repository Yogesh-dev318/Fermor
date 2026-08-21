import { Icon } from '../ui/Icon'
import { Section } from '../ui/Section'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'

type CellStatus = 'yes' | 'no' | 'partial'

type FeatureRow = {
  feature: string
  description: string
  spreadsheets: CellStatus
  otherApps: CellStatus
  fermor: CellStatus
}

const ROWS: FeatureRow[] = [
  {
    feature: 'Automated Syncing',
    description: 'Live connection to your bank',
    spreadsheets: 'no',
    otherApps: 'partial',
    fermor: 'yes',
  },
  {
    feature: 'Proactive Insights',
    description: 'Tells you what to do next',
    spreadsheets: 'no',
    otherApps: 'no',
    fermor: 'yes',
  },
  {
    feature: 'Ad-free Experience',
    description: 'No sponsored content or upsells',
    spreadsheets: 'yes',
    otherApps: 'no',
    fermor: 'yes',
  },
  {
    feature: 'Goal Tracking',
    description: 'Set targets and monitor progress',
    spreadsheets: 'partial',
    otherApps: 'partial',
    fermor: 'yes',
  },
]

const COLUMNS: { key: Exclude<keyof FeatureRow, 'feature' | 'description'>; label: string }[] = [
  { key: 'spreadsheets', label: 'Spreadsheets' },
  { key: 'otherApps', label: 'Other Apps' },
  { key: 'fermor', label: 'Fermor' },
]

function StatusCell({ status, isFermor }: { status: CellStatus; isFermor?: boolean }) {
  const icon = status === 'yes' ? 'check' : status === 'partial' ? 'remove' : 'close'
  const colorClass =
    status === 'yes'
      ? 'text-growth-green'
      : status === 'partial'
        ? 'text-secondary'
        : 'text-error'

  return (
    <td className={`p-5 text-center ${isFermor ? 'bg-primary/5' : ''}`}>
      <span
        className={`flex items-center justify-center ${colorClass}`}
      >
        <Icon name={icon} className="text-[20px]" />
      </span>
    </td>
  )
}

/**
 * ComparisonTable positions Fermor against spreadsheets and "other apps".
 * The Fermor column has a green accent bar at the top and a tinted background.
 */
export function ComparisonTable() {
  return (
    <Section background="bg-surface-container-lowest">
      <Reveal className="mb-12 text-center">
        <SectionLabel className="justify-center">Why Fermor</SectionLabel>
        <h2 className="font-display-lg-mobile text-on-surface md:font-display-lg">
          Built different by design.
        </h2>
      </Reveal>

      <div className="overflow-x-auto -mx-margin-mobile px-margin-mobile md:mx-0 md:px-0">
        <table className="w-full min-w-[500px] overflow-hidden rounded-2xl border border-surface-variant bg-white/80 text-left shadow-card backdrop-blur-sm sm:min-w-[600px]">
          <thead className="text-secondary">
            <tr>
              <th className="w-1/3 border-b border-surface-variant bg-surface-container-low p-6 text-title-sm font-semibold">
                Features
              </th>
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className={`border-b p-6 text-center text-title-sm font-semibold ${
                    col.key === 'fermor'
                      ? 'relative border-b-primary/30 bg-primary/5 text-primary'
                      : 'border-b-surface-variant bg-surface-container-low'
                  }`}
                >
                  {/* Green accent top bar on Fermor column */}
                  {col.key === 'fermor' && (
                    <div className="absolute left-0 right-0 top-0 h-0.5 bg-gradient-to-r from-primary to-primary-container" />
                  )}
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, idx) => (
              <tr
                key={row.feature}
                className={`transition-colors hover:bg-surface-container-low/50 ${
                  idx < ROWS.length - 1 ? 'border-b border-surface-variant/40' : ''
                }`}
              >
                <td className="p-5">
                  <div className="font-medium text-on-surface">{row.feature}</div>
                  <div className="mt-0.5 text-xs text-secondary">{row.description}</div>
                </td>
                <StatusCell status={row.spreadsheets} />
                <StatusCell status={row.otherApps} />
                <StatusCell status={row.fermor} isFermor />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  )
}
