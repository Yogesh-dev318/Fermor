const PARTNERS = [
  'CHASE',
  'BANK OF AMERICA',
  'WELLS FARGO',
  'CITI',
  'CAPITAL ONE',
  'AMERICAN EXPRESS',
  'CITIBANK',
  'WELLS FARGO',
] as const

/**
 * TrustStrip is an infinite marquee of supported financial institutions.
 * The list is doubled so the `marquee` CSS animation (translateX −50%) loops.
 */
export function TrustStrip() {
  return (
    <section className="overflow-hidden border-y border-surface-variant bg-surface/60 py-8 backdrop-blur-sm">
      {/* Label */}
      <p className="mb-5 text-center text-label-caps uppercase tracking-widest text-secondary/60">
        Works with your bank
      </p>

      <div
        className="flex items-center whitespace-nowrap"
        style={{ width: '200%', animation: 'marquee 28s linear infinite' }}
      >
        {[...PARTNERS, ...PARTNERS].map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="inline-flex items-center gap-8 px-8 text-body-md font-bold uppercase tracking-widest text-secondary/50 transition-colors hover:text-secondary"
          >
            {name}
            {/* Separator dot */}
            <span className="h-1 w-1 rounded-full bg-outline-variant" />
          </span>
        ))}
      </div>
    </section>
  )
}
