import React, { useState } from "react"
import { Nav, useCollapsible, Image, Badge, Flex } from "playbook-ui"
import { TopLevelNavItem } from "./TopLevelNavItems"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// @ts-ignore
import PBLogo from "../../images/pb-logo.svg"
import KitSearch from "../KitSearch"
import Scaffold from "../Scaffold"

const MainSidebar = ({
  dark,
  type,
  category,
  kits,
  PBversion,
  searchList,
  samples,
}) => {
  //active state for navItems(will be redundant once routing moved to react router)
  const [isActive, setIsActive] = useState({})

  //hook into collapsible logic for all components nested nav items
  const collapsibles = kits.map(() => useCollapsible())
  console.log('here',kits)

  return (
    <>
      <Flex
        orientation='row'
        spacing='between'
        align='center'
        marginTop='lg'
        marginX='sm'
      >
        <a href={"/"}>
          <Image alt='Playbook logo' url={PBLogo} />
        </a>
        <Badge text={PBversion} dark={dark} variant='success' rounded />
      </Flex>
      <Flex
        orientation='column'
        align='stretch'
        marginBottom='xxs'
        marginTop='md'
        marginX='sm'
      >
        <KitSearch
          classname='desktop-kit-search'
          id='desktop-kit-search'
          kits={searchList}
        />
      </Flex>

      <Nav dark={dark} variant='bold' paddingTop='xxs'>
        <TopLevelNavItem
          dark={dark}
          type={type}
          isActive={isActive}
          setIsActive={setIsActive}
          kits={kits}
          category={category}
          collapsibles={collapsibles}
          samples={samples}
        />
      </Nav>
    </>
  )
}

export default MainSidebar
