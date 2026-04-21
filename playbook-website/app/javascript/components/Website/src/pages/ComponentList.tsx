import { useState, useEffect, useMemo } from "react"
import type { ChangeEvent } from "react"
import { NavLink, Outlet, useLoaderData, useOutlet } from "react-router-dom"
import { EmptyState, Flex, TextInput } from "playbook-ui"
import { matchSorter } from "match-sorter"

import { KitCard } from "../components/KitCard"
import { Hero } from "../components/Hero"
import { KitGrid } from "../components/KitGrid"
import { PageContainer } from "../components/PageContainer"
import { CategoryTitle } from "../components/CategoryTitle"
import { usePlatform } from "../contexts/PlatformContext"

import "./ComponentList.scss"

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
    parent?: string;
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
  const { kits } = useLoaderData() as { kits: Kit[]; }
  const [kitsToShow, setKitsToShow] = useState(kits)
  const [searchQuery, setSearchQuery] = useState("")
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

  const displayedKits = useMemo(() => {
    const q = searchQuery.trim()
    if (!q) return kitsToShow
    return kitsToShow
      .map((kit) => ({
        ...kit,
        components: matchSorter(
          kit.components.filter((c) => c.status === "stable"),
          q,
          { keys: ["name"] }
        ),
      }))
      .filter((kit) => kit.components.length > 0)
  }, [kitsToShow, searchQuery])

  const hasVisibleKits = displayedKits.some((kit) =>
    kit.components.some((c) => c.status === "stable")
  )

  return (
    <>
      {!outlet && (
        <>
          <Hero description={description} title="Components" />

          <PageContainer>
            <Flex orientation="column" width="100%">
              <Flex
                justify="center"
                marginBottom="lg"
                paddingX={{ xs: "md", sm: "lg", xl: "none" }}
                width="100%"
              >
                <div className="component-list-search">
                  <TextInput
                    marginBottom="none"
                    name="component_list_search"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setSearchQuery(e.target.value)
                    }
                    placeholder="Search All Components"
                    value={searchQuery}
                    width="100%"
                  />
                </div>
              </Flex>

              {!hasVisibleKits ? (
                <Flex justify="center" width="100%">
                  <EmptyState
                    header="No results"
                    image="default"
                    size="lg"
                  />
                </Flex>
              ) : (
                displayedKits.map(({ category, components }: Kit, index: number) => (
                  <section
                    className="category mb_xl"
                    key={`${category}-${index}`}
                    id={category}
                    style={{ marginLeft: "40px" }}
                  >
                    <NavLink to={`/beta/kit_category/${category}`}>
                      <CategoryTitle category={category} />
                    </NavLink>
                    <KitGrid>
                      {components
                      .filter(component => component.status === "stable")
                      .map(({ name, description, parent }, index) => (
                        <KitCard
                          description={description}
                          name={name}
                          key={`${name}-${index}`}
                          parent={parent}
                          platform={platform}
                        />
                      ))}
                    </KitGrid>
                  </section>
                ))
              )}
            </Flex>
          </PageContainer>
        </>
      )}

      <Outlet />
    </>
  )
}
