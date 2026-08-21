import { useState } from 'react'
import type { FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Section } from '../components/ui/Section'
import { SectionLabel } from '../components/ui/SectionLabel'
import { Icon } from '../components/ui/Icon'
import { Reveal } from '../components/ui/Reveal'

type ContactMethod = {
  icon: string
  label: string
  value: string
  href: string
}

const CONTACT_METHODS: ContactMethod[] = [
  { icon: 'mail', label: 'Email us', value: 'hello@fermor.in', href: 'mailto:hello@fermor.in' },
  { icon: 'chat', label: 'Live chat', value: 'Mon–Fri, 9am–6pm IST', href: '#chat' },
  { icon: 'location_on', label: 'Office', value: 'Bengaluru, India', href: '#map' },
]

type FormState = {
  name: string
  email: string
  subject: string
  message: string
}

const EMPTY_FORM: FormState = { name: '', email: '', subject: '', message: '' }

/**
 * ContactPage presents contact methods plus a validated message form.
 * Validation is client-side only; on success it shows a confirmation state.
 */
export function ContactPage() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [submitted, setSubmitted] = useState(false)

  const update = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const validate = (): boolean => {
    const next: Partial<FormState> = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email address.'
    if (!form.subject.trim()) next.subject = 'Please add a subject.'
    if (form.message.trim().length < 10) next.message = 'Message should be at least 10 characters.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitted(true)
  }

  return (
    <>
      {/* Header */}
      <Section className="pt-36 pb-16">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <SectionLabel className="justify-center">Get in touch</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mb-6 font-display-lg-mobile text-on-surface md:font-display-lg">
              We'd love to hear from you.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-body-lg text-secondary">
              Questions, feedback, or partnership ideas — reach out and our team
              will get back to you within one business day.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section padded={false} className="pb-section-padding">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          {/* Contact methods */}
          <div className="flex flex-col gap-4">
            {CONTACT_METHODS.map((method, i) => (
              <Reveal key={method.label} delay={i * 0.08}>
                <a
                  href={method.href}
                  className="group flex items-center gap-4 rounded-2xl border border-surface-variant bg-white/80 p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-card-hover"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-transform group-hover:scale-110">
                    <Icon name={method.icon} className="text-xl text-primary" />
                  </span>
                  <div>
                    <div className="text-sm text-secondary">{method.label}</div>
                    <div className="font-semibold text-on-surface">{method.value}</div>
                  </div>
                </a>
              </Reveal>
            ))}

            <Reveal delay={0.3}>
              <div className="mt-2 rounded-2xl bg-gradient-to-br from-primary/8 to-primary-fixed/20 p-6">
                <Icon name="verified_user" className="mb-3 text-2xl text-primary" />
                <p className="text-sm leading-relaxed text-secondary">
                  We never ask for your bank credentials or OTPs over email,
                  chat, or phone. Stay safe.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.15}>
            <div className="rounded-3xl border border-surface-variant bg-white/90 p-8 shadow-card-hover backdrop-blur-sm md:p-10">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="flex flex-col items-center py-12 text-center"
                  >
                    <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-growth-green/10">
                      <Icon name="check_circle" className="text-4xl text-growth-green" />
                    </span>
                    <h3 className="mb-2 text-headline-md-mobile font-semibold text-on-surface">
                      Message sent!
                    </h3>
                    <p className="mb-6 max-w-sm text-secondary">
                      Thanks for reaching out, {form.name.split(' ')[0]}. We'll reply
                      to {form.email} within one business day.
                    </p>
                    <button
                      onClick={() => { setForm(EMPTY_FORM); setSubmitted(false) }}
                      className="btn-secondary rounded-full px-6 py-3 text-title-sm"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleSubmit}
                    noValidate
                    className="flex flex-col gap-5"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-on-surface">
                          Full name
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={form.name}
                          onChange={update('name')}
                          placeholder="Jane Doe"
                          aria-invalid={!!errors.name}
                          className={`w-full rounded-xl border px-4 py-3 text-on-surface placeholder-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                            errors.name ? 'border-error' : 'border-surface-variant'
                          }`}
                        />
                        {errors.name && <p className="mt-1 text-xs text-error">{errors.name}</p>}
                      </div>

                      <div>
                        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-on-surface">
                          Email address
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={form.email}
                          onChange={update('email')}
                          placeholder="jane@example.com"
                          aria-invalid={!!errors.email}
                          className={`w-full rounded-xl border px-4 py-3 text-on-surface placeholder-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                            errors.email ? 'border-error' : 'border-surface-variant'
                          }`}
                        />
                        {errors.email && <p className="mt-1 text-xs text-error">{errors.email}</p>}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-on-surface">
                        Subject
                      </label>
                      <input
                        id="subject"
                        type="text"
                        value={form.subject}
                        onChange={update('subject')}
                        placeholder="How can we help?"
                        aria-invalid={!!errors.subject}
                        className={`w-full rounded-xl border px-4 py-3 text-on-surface placeholder-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                          errors.subject ? 'border-error' : 'border-surface-variant'
                        }`}
                      />
                      {errors.subject && <p className="mt-1 text-xs text-error">{errors.subject}</p>}
                    </div>

                    <div>
                      <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-on-surface">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        value={form.message}
                        onChange={update('message')}
                        placeholder="Tell us a bit more..."
                        aria-invalid={!!errors.message}
                        className={`w-full resize-none rounded-xl border px-4 py-3 text-on-surface placeholder-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                          errors.message ? 'border-error' : 'border-surface-variant'
                        }`}
                      />
                      {errors.message && <p className="mt-1 text-xs text-error">{errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      className="btn-primary mt-2 rounded-full py-4 text-title-sm"
                    >
                      Send message
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
