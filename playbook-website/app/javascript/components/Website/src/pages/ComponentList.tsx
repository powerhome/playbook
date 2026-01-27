import { useState, useEffect } from "react"
import { NavLink, Outlet, useLoaderData, useOutlet } from "react-router-dom"
import { Body, Flex } from 'playbook-ui'

import { KitCard } from "../components/KitCard"
import { Hero } from "../components/Hero"
import { KitGrid } from "../components/KitGrid"
import { PageContainer } from "../components/PageContainer"
import { CategoryTitle } from "../components/CategoryTitle"
import { usePlatform } from "../contexts/PlatformContext"

export type Kit = {
  id?: any
  title?: any
  status?: string
  name?: string
  category: string;
  components: {
    name: string;
    description: string;
    platforms: string[];
    status: "stable" | "beta";
  }[];
  description: string;
  parent?: string;
};

export type Kits = Kit[];

export interface Component {
  status: string;
}

const description =
  "Components are the reusable building blocks of our design system. Each component meets a specific interaction or UI need, and has been specifically created to work together to create patterns and intuitive user experiences."

export default function ComponentList() {
  const outlet = useOutlet()
  const { kits } = useLoaderData()
  const [kitsToShow, setKitsToShow] = useState(kits)
  const { platform } = usePlatform()

  // Filter kits based on platform
  useEffect(() => {
    const filtered = kits.map((kit: Kit) => {
      const filteredComponents = kit.components.filter(component => 
        component.platforms?.includes(platform)
      )
      return { ...kit, components: filteredComponents }
    }).filter((kit: Kit) => kit.components.length > 0)
    
    setKitsToShow(filtered)
  }, [platform, kits])

  return (
    <>
      {!outlet && (
        <>
          <Hero description={description} title="Components" />

          <PageContainer>
            {kitsToShow.filter(({ components }: {components: Component[] }) => 
            components.some((component: Component) => component.status === "stable")).length === 0 ? (
              <Flex
                justify="center"
                orientation="row"
              >
                <Body
                  text="No Results, Try Again"
                />
              </Flex>
            ) : (
              kitsToShow.map(({ category, components }: Kit, index: number) => (
                <section
                  className="category mb_xl"
                  key={`${category}-${index}`}
                  id={category}
                >
                  <NavLink to={`/beta/kit_category/${category}`}>
                    <CategoryTitle category={category} />
                  </NavLink>
                  <KitGrid>
                    {components
                    .filter(component => component.status === "stable")
                    .map(({ name, description }, index) => (
                      <KitCard
                        description={description}
                        name={name}
                        key={`${name}-${index}`}
                        platform={platform}
                      />
                    ))}
                  </KitGrid>
                </section>
              ))
            )}
          </PageContainer>
        </>
      )}

      <Outlet />
    </>
  )
}
