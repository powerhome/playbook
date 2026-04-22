import React from "react"
import { useRouteLoaderData } from "react-router-dom"

import HomepageHero from "components/HomepageHero"
import Footer from "../../layouts/Footer"
import HpSolutionsSection from "./sections/HpSolutionsSection"
import HpSocialProofSections from "./sections/HpSocialProofSections"
import NewestFromPlaybookSection from "./sections/NewestFromPlaybookSection"
import type { LandingPost } from "./sections/NewestFromPlaybookSection"

type BetaLoaderData = {
  landing_posts?: LandingPost[]
}

/**
 * Beta shell home: marketing sections aligned with `/` (`home.html.erb`).
 */
export default function BetaHome() {
  const { landing_posts = [] } = useRouteLoaderData("beta-site") as BetaLoaderData

  return (
    <div className="landing-page">
      <HomepageHero beta />
      <HpSolutionsSection />
      <HpSocialProofSections />
      <NewestFromPlaybookSection posts={landing_posts} />
      <Footer />
    </div>
  )
}
