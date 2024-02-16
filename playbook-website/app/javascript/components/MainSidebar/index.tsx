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
  kits_with_status,
  PBversion,
  search_list,
  samples,
}) => {
  //active state for navItems(will be redundant once routing moved to react router)
  const [isActive, setIsActive] = useState({});

  const transformKitsData = (kitsArray) => {
    return kitsArray.map(kit => {
      // There's only one key per object, so we get the kit name and its components
      const kitName = Object.keys(kit)[0];
      const components = kit[kitName];
  
      // Filter out any components with status 'beta', then map to get their names
      const componentNames = components
        .filter(component => component.status !== 'beta')
        .map(component => component.name);
  
      return { [kitName]: componentNames };
    });
  };
  
  const kits = transformKitsData(kits_with_status);
  
  //hook into collapsible logic for all components nested nav items
  const collapsibles = kits.map(() => useCollapsible());

  //kits in alphabetical order
  kits.map((obj: {[key: string]: string[]}) => {
  
    const key = Object.keys(obj)[0];
    const orderedArray = obj[key].sort((a, b) => a.localeCompare(b));
    return { [key]: orderedArray };
  });

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
