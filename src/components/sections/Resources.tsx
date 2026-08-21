import { Icon } from '../ui/Icon'
import { Section } from '../ui/Section'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'

type Resource = {
  category: string
  categoryClasses: string
  thumbnailFrom: string
  thumbnailTo: string
  icon: string
  iconClass: string
  title: string
  excerpt: string
  readTime: string
}

const RESOURCES: Resource[] = [
  {
    category: 'Mindset',
    categoryClasses: 'bg-tertiary/10 text-tertiary',
    thumbnailFrom: 'from-tertiary/20',
    thumbnailTo: 'to-secondary-container/60',
    icon: 'psychology',
    iconClass: 'text-tertiary/40',
    title: 'The emotional cost of budgeting',
    excerpt:
      'Why strict rules consistently fail — and the gentler approach that actually works for long-term financial health.',
    readTime: '5 min read',
  },
  {
    category: 'Planning',
    categoryClasses: 'bg-primary/10 text-primary',
    thumbnailFrom: 'from-primary/15',
    thumbnailTo: 'to-primary-fixed/30',
    icon: 'savings',
    iconClass: 'text-primary/40',
    title: 'Emergency funds re-imagined',
    excerpt:
      'How much cushion do you actually need in 2024? The answer is more nuanced than the classic "3–6 months" advice.',
    readTime: '7 min read',
  },
  {
    category: 'Growth',
    categoryClasses: 'bg-growth-green/10 text-growth-green',
    thumbnailFrom: 'from-growth-green/15',
    thumbnailTo: 'to-primary-fixed/40',
    icon: 'trending_up',
    iconClass: 'text-growth-green/40',
    title: 'Automating your net worth',
    excerpt:
      'Set it once, forget it, and watch the number climb. A practical guide to putting your savings on autopilot.',
    readTime: '4 min read',
  },
]

function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <article className="group cursor-pointer">
      {/* Thumbnail */}
      <div
        className={`mb-5 flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${resource.thumbnailFrom} ${resource.thumbnailTo} transition-transform duration-300 group-hover:scale-[1.02]`}
      >
        <Icon
          name={resource.icon}
          className={`${resource.iconClass} transition-transform duration-300 group-hover:scale-110`}
          style={{ fontSize: '72px' }}
        />
      </div>

      {/* Meta row */}
      <div className="mb-2 flex items-center gap-3">
        <span
          className={`rounded-full px-2.5 py-0.5 text-label-caps uppercase ${resource.categoryClasses}`}
        >
          {resource.category}
        </span>
        <span className="text-xs text-secondary">{resource.readTime}</span>
      </div>

      {/* Title */}
      <h4 className="mb-2 text-title-sm font-bold text-on-surface transition-colors group-hover:text-primary">
        {resource.title}
      </h4>

      <p className="mb-3 text-sm leading-relaxed text-secondary">{resource.excerpt}</p>

      {/* Read link */}
      <span className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        Read article
        <Icon name="arrow_forward" className="text-base" />
      </span>
    </article>
  )
}

/**
 * Resources is a three-up grid of journal/blog post previews with colored
 * gradient thumbnails, category chips, read times, and hover reveal effects.
 */
export function Resources() {
  return (
    <Section id="journal">
      <Reveal className="mb-12 flex items-end justify-between">
        <div>
          <SectionLabel>Journal</SectionLabel>
          <h2 className="font-display-lg-mobile text-on-surface">
            Latest from our journal
          </h2>
        </div>
        <a
          href="#journal"
          className="hidden items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80 md:flex"
        >
          View all articles
          <Icon name="arrow_forward" className="text-base" />
        </a>
      </Reveal>

      <RevealGroup className="grid gap-8 md:grid-cols-3">
        {RESOURCES.map((r) => (
          <RevealItem key={r.title}>
            <ResourceCard resource={r} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}
