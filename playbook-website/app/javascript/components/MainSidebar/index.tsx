import React, { useState } from "react";
import { Nav, useCollapsible, Image, Badge, Flex } from "playbook-ui";
import { TopLevelNavItem } from "./TopLevelNavItems";
// @ts-ignore
import PBLogo from "../../images/pb-logo.svg";
import KitSearch from "../KitSearch";

const MainSidebar = ({
  dark,
  type,
  category,
  kit,
  kits,
  PBversion,
  search_list,
  samples,
}) => {
  //active state for navItems(will be redundant once routing moved to react router)
  const [isActive, setIsActive] = useState({});

  //hook into collapsible logic for all components nested nav items
  const collapsibles = kits.map(() => useCollapsible());

  return (
    <>
      <Flex
        orientation="row"
        spacing="between"
        align="center"
        marginTop="lg"
        marginX="sm"
      >
        <a href={"/"}>
          <Image alt="Playbook logo" url={PBLogo} />
        </a>
        <Badge text={PBversion} dark={dark} variant="success" rounded />
      </Flex>
      <Flex
        orientation="column"
        align="stretch"
        marginBottom="xxs"
        marginTop="md"
        marginX="sm"
      >
        <KitSearch
          classname="desktop-kit-search"
          id="desktop-kit-search"
          kits={search_list}
        />
      </Flex>
      <Nav dark={dark} variant="bold" paddingTop="xxs">
        <TopLevelNavItem
          dark={dark}
          type={type}
          isActive={isActive}
          setIsActive={setIsActive}
          kits={kits}
          kit={kit}
          category={category}
          collapsibles={collapsibles}
          samples={samples}
        />
      </Nav>
    </>
  );
};

export default MainSidebar;
