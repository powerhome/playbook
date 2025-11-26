import { useState } from "react"
import { NavLink, useLoaderData } from "react-router-dom"
import { Body, Flex } from "playbook-ui"

import { KitCard } from "../../components/KitCard"
import { KitFilter } from "../../components/KitFilter"
import { KitGrid } from "../../components/KitGrid"
import { Hero } from "../../components/Hero"
import { PageContainer } from "../../components/PageContainer"
import { linkFormat } from "../../../../../utilities/website_sidebar_helper"
import { Kit } from "../ComponentList"

import "./styles.scss"

type LoaderData = {
  components: Kit[],
  category: string,
  description: string
}

export default function CategoryShow() {
  const { components, category, description } = useLoaderData() as LoaderData
  const [kitsToShow, setKitsToShow] = useState(components)
  const [platform, setPlatform] = useState('react')

  return (
    <>
      <Hero description={description} title={linkFormat(category)} />

      <Flex
        align="center"
        orientation="column"
        paddingBottom="lg"
      >
        <KitFilter
          kits={components}
          setFilteredKits={setKitsToShow}
          setPlatform={setPlatform}
        />
      </Flex>

      <PageContainer>
        <Flex align="center" className="category-breadcrumb">
          <NavLink to="/beta/kits">
            <Body className="previous-route" color="link"><b>Components</b></Body>
          </NavLink>
          <Body marginX="xxs" text="/" />
          <Body><b>{linkFormat(category)}</b></Body>
        </Flex>

        {!kitsToShow.length && (
            <Flex
              justify="center"
              orientation="row"
            >
              <Body
                text="No Results, Try Again"
              />
            </Flex>
          )}

        <KitGrid>
          {kitsToShow.filter(component => component.status === "stable")
          .map(({ description, name, parent }: Kit, index: number) => {
            return(
              <KitCard
                description={description}
                name={name}
                key={`category-${name}-${index}`}
                parent={parent}
                platform={platform}
              />
            )
          })}
        </KitGrid>
      </PageContainer>
    </>
  )
}
