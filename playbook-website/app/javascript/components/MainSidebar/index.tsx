import React, { useState } from "react";
import { Nav, useCollapsible, Image, Badge, Flex } from "playbook-ui";
import { TopLevelNavItem } from "./TopLevelNavItems";
// @ts-ignore
import PBLogo from "../../images/pb-logo.svg";
import KitSearch from "../KitSearch";
import FlyingGhosts from "./FlyingGhosts";
import SantaFrog from "./SantaFrog";

const MainSidebar = ({
  dark,
  type,
  category,
  kit,
  kits_with_status,
  PBversion,
  search_list,
  building_blocks,
  getting_started,
  design_guidelines,
  whats_new,
  icons,
  global_props_and_tokens,
  beta = false,
}: any) => {
  //active state for navItems(will be redundant once routing moved to react router)
  const [isActive, setIsActive] = useState({});
  
  // --------------Halloween only-----------------------------
  // Check if we're in the last week of October (Oct 25-31)
  // Add special Halloween decorations during this week!
  const isHalloweenWeek = () => {
    const today = new Date();
    const month = today.getMonth(); // 0-indexed, so October is 9
    const date = today.getDate();
    return month === 9 && date >= 25 && date <= 31;
  };
  // --------------------------------------------------------

  // ---------------Christmas only----------------------------
  // Check fi we are in last two weeks of December (Dec 17-31)
  // Add special Christmas decorations during this time!
  const isChristmasTime = () => {
    const today = new Date();
    const month = today.getMonth(); // 0-indexed, so December is 11
    const date = today.getDate();
    return month === 11 && date >= 17 && date <= 31;
  };
  // --------------------------------------------------------

  const transformKitsData = (kitsArray: any) => {
    return kitsArray.map((kit: any) => {
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
    if (key === "advanced_table") return
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
        position="relative"
      >
        {isHalloweenWeek() && <FlyingGhosts />}
        {isChristmasTime() && <SantaFrog />}
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
          global_props_and_tokens={global_props_and_tokens}
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
          building_blocks={building_blocks}
          getting_started={getting_started}
          design_guidelines={design_guidelines}
          whats_new={whats_new}
          icons={icons}
          beta={beta}
          global_props_and_tokens={global_props_and_tokens}
        />
      </Nav>
    </>
  );
};

export default MainSidebar;
