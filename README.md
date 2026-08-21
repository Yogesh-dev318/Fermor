# Fermor

A polished, multi-page React + TypeScript finance website inspired by [fermor.in](https://fermor.in). Built with Vite, Tailwind CSS, GSAP, and Framer Motion.

## Tech stack

- **React 19** + **TypeScript**
- **Vite** for dev/build
- **Tailwind CSS v3** for styling
- **React Router DOM** for multi-page routing
- **Framer Motion** for scroll reveals, tab transitions, accordions, and toggle animations
- **GSAP** for the hero entrance timeline and stat count-up animations
- **Material Symbols** + **Inter** font

## Getting started

```bash
# install dependencies
npm install

# start the dev server (http://localhost:5173)
npm run dev

# type-check + production build
npm run build

# preview the production build
npm run preview

# lint
npm run lint
```

Requires Node 18+.

## Project structure

```
src/
  components/
    effects/     # ShaderBackground, CustomCursor
    layout/      # Layout, TopNavBar, Footer, ScrollToTop
    sections/    # Hero, GoalExplorer, LifeStages, MoneyDecisions, PlanWisely,
                 # FeatureDeepDive, Framework, StatsBand, ComparisonTable,
                 # Testimonials, Pricing, FAQ, Resources, FinalCTA, TrustStrip
    ui/          # Reveal, Section, SectionLabel, Button, Icon, MagneticButton
    widgets/     # SipCalculator, GrowthCalculator
  hooks/         # useGsapHeroTimeline, useGsapCounter, useCountUp, useTilt, useMagnetic
  pages/         # HomePage, CalculatorsPage, AboutPage, ContactPage
  App.tsx        # Router + routes
  main.tsx       # App entry
  index.css      # Tailwind layers + design tokens
```

## Pages

- **Home** — hero, goal explorer, life stages, money decisions tabs, plan wisely, features, framework, stats, comparison, testimonials, pricing, FAQ, journal, final CTA
- **Calculators** — interactive SIP calculator + filterable grid of 18 calculators
- **About** — mission, values, timeline, team
- **Contact** — contact methods + validated form with animated success state

## Key decisions

- **Framer Motion for visibility, GSAP for timelines.** Scroll reveals use Framer Motion's `whileInView` (via the reusable `Reveal` / `RevealGroup` / `RevealItem` components) because it reliably resolves to the visible state. GSAP `from` animations could leave sections stuck hidden if ScrollTrigger measurements went stale on route changes. GSAP is retained only for the hero entrance timeline and numeric count-ups, where it's reliable.
- **Persistent `Layout` wrapper.** A single `Layout` renders the shader background, custom cursor, nav, footer, and scroll-to-top around React Router's `<Outlet />`. `TopNavBar` is keyed by pathname so it remounts on route changes and resets mobile-menu state without a state-setting effect (avoids the `react-hooks/set-state-in-effect` lint rule).
- **Hash scrolling.** `ScrollToTop` smooth-scrolls to `#hash` targets after navigation, with a `requestAnimationFrame` retry for late-painted elements. The `#get-started` anchor on `FinalCTA` is the target of nav CTAs.
- **Reduced-motion support.** Framer Motion respects `prefers-reduced-motion` automatically; the count-up hooks initialize to their target value when reduced motion is enabled.
- **Design tokens** (from the original Fermor template): warm paper background `#faf9f6`, ink text `#1a1c1a`, primary green `#126a3a`, growth green `#3E8E5A`, Inter font, 1200px max container, 8px base spacing, 8px/16px radii, soft card shadows.
- **Lint-friendly `Button`.** Forwards `onClick` to both `<button>` and `<a>` renders so anchor-buttons (e.g. mobile nav CTAs) can close menus.
