import React, { useState } from "react"
import { NavLink, useLoaderData } from "react-router-dom"
import { Body, Flex, Icon } from "playbook-ui"

import { KitCard } from "../../components/KitCard"
import { KitFilter } from "../../components/KitFilter"
import { KitGrid } from "../../components/KitGrid"
import { Hero } from "../../components/Hero"
import { PageContainer } from "../../components/PageContainer"
import { linkFormat } from "../../../../../utilities/website_sidebar_helper"
import { Kit } from "../ComponentList"

import "./styles.scss"

export default function CategoryShow() {
  const { components, category, description } = useLoaderData()
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
            <Body className="previous-route" color="light">Components</Body>
          </NavLink>
          <Icon className="category-breadcrumb-icon" icon="angle-right" />
          <Body text={linkFormat(category)} />
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
          .map(({ description, name }: Kit, index: number) => {
            return(
              <KitCard
                description={description}
                name={name}
                key={`category-${name}-${index}`}
                platform={platform}
              />
            )
          })}
        </KitGrid>
      </PageContainer>
    </>
  )
}
