import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Icon } from '../ui/Icon'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'

type QA = {
  question: string
  answer: string
}

const FAQS: QA[] = [
  {
    question: 'Is my data secure?',
    answer:
      'Yes. We use bank-level 256-bit AES encryption in transit and at rest. We never store your login credentials — access is read-only via certified partners like Plaid and MX.',
  },
  {
    question: 'Do you sell my data?',
    answer:
      'Never. Fermor\'s business model is built entirely on subscription revenue. Your financial data is yours — we will never sell, rent, or monetize it to third parties.',
  },
  {
    question: 'Which banks do you support?',
    answer:
      'We integrate with over 10,000 financial institutions across the US, UK, Canada, and Australia through our secure banking data partners. If your bank is online, it\'s almost certainly supported.',
  },
  {
    question: 'Can I cancel at any time?',
    answer:
      'Yes, you can cancel your Fermor Plus subscription at any time from your account settings. There are no contracts, no cancellation fees, and your data remains accessible on the free plan.',
  },
  {
    question: 'How does the free trial work?',
    answer:
      'The 14-day free trial gives you full access to every Fermor Plus feature, no credit card required. At the end of the trial, you choose whether to subscribe or continue on the free Basic plan.',
  },
]

function AccordionItem({
  qa,
  isOpen,
  onToggle,
}: {
  qa: QA
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border transition-colors duration-200 ${
        isOpen
          ? 'border-primary/20 bg-white shadow-card'
          : 'border-surface-variant bg-white/60 hover:border-outline-variant hover:bg-white'
      }`}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between px-6 py-5 text-left"
      >
        <h4
          className={`pr-4 text-title-sm font-semibold transition-colors ${
            isOpen ? 'text-primary' : 'text-on-surface'
          }`}
        >
          {qa.question}
        </h4>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${
            isOpen
              ? 'border-primary/20 bg-primary/10 text-primary'
              : 'border-surface-variant bg-surface-container text-secondary'
          }`}
        >
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="flex items-center justify-center"
          >
            <Icon name={isOpen ? 'remove' : 'add'} className="text-[18px]" />
          </motion.span>
        </span>
      </button>

      {/* Answer — animated height with AnimatePresence */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-body-md leading-relaxed text-secondary">{qa.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * FAQ is an animated accordion. Only one item is open at a time.
 * The first item opens by default.
 */
export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  const toggle = (i: number) => setOpenIdx((prev) => (prev === i ? null : i))

  return (
    <section className="bg-surface-container-low/60 py-section-padding">
      <div className="mx-auto max-w-3xl px-margin-mobile md:px-gutter">
        <div className="mb-12 text-center">
          <Reveal>
            <SectionLabel className="justify-center">FAQ</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display-lg-mobile text-on-surface">
              Frequently asked questions
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="space-y-3">
            {FAQS.map((qa, i) => (
              <AccordionItem
                key={qa.question}
                qa={qa}
                isOpen={openIdx === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
