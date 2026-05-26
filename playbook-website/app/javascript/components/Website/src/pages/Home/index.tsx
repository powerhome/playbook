import React from "react"
import { useRouteLoaderData } from "react-router-dom"

import HomepageHero from "components/HomepageHero"
import Footer from "../../layouts/Footer"
import HpSolutionsSection from "./sections/HpSolutionsSection"
import HpSocialProofSections from "./sections/HpSocialProofSections"
import NewestFromPlaybookSection from "./sections/NewestFromPlaybookSection"
import type { LandingPost } from "./sections/NewestFromPlaybookSection"

type LoaderData = {
  landing_posts?: LandingPost[]
}

export default function Home() {
  const { landing_posts = [] } = useRouteLoaderData("site") as LoaderData

  return (
    <div className="landing-page">
      <HomepageHero />
      <HpSolutionsSection />
      <HpSocialProofSections />
      <NewestFromPlaybookSection posts={landing_posts} />
      <Footer />
    </div>
  )
}
