import { Hero } from '../components/sections/Hero'
import { TrustStrip } from '../components/sections/TrustStrip'
import { GoalExplorer } from '../components/sections/GoalExplorer'
import { Framework } from '../components/sections/Framework'
import { LifeStages } from '../components/sections/LifeStages'
import { FeatureDeepDive } from '../components/sections/FeatureDeepDive'
import { MoneyDecisions } from '../components/sections/MoneyDecisions'
import { PlanWisely } from '../components/sections/PlanWisely'
import { StatsBand } from '../components/sections/StatsBand'
import { ComparisonTable } from '../components/sections/ComparisonTable'
import { Testimonials } from '../components/sections/Testimonials'
import { Pricing } from '../components/sections/Pricing'
import { FAQ } from '../components/sections/FAQ'
import { Resources } from '../components/sections/Resources'
import { FinalCTA } from '../components/sections/FinalCTA'

/**
 * HomePage composes every marketing section for the "/" route, in narrative
 * order: hero hook → trust → goal exploration → framework → life stages →
 * feature deep dive → money decisions → planning → proof → conversion.
 */
export function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <GoalExplorer />
      <Framework />
      <LifeStages />
      <FeatureDeepDive />
      <MoneyDecisions />
      <PlanWisely />
      <StatsBand />
      <ComparisonTable />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Resources />
      <FinalCTA />
    </>
  )
}
