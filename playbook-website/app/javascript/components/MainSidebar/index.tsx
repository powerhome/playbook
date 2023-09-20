import React, { useState } from "react";
import { Nav, NavItem, useCollapsible, Image, Pill, Flex } from "playbook-ui";
import { renderNavItem } from "./NestedNavItems";
import PBLogo from "../../images/pb-logo.svg";
import KitSearch from "../KitSearch";
import { SideBarNavItems } from "./SidebarNavItems";

const MainSidebar = ({
  dark,
  type,
  category,
  kit,
  kits,
  PBversion,
  search_list,
}) => {
  //active state for navItems(will be dedundant once routing moved to react router)
  const [isActive, setIsActive] = useState({});

  //hook into collapsible logic for all nested nav items
  const collapsibles = kits.map(() => useCollapsible());

  //hook into collapsible logic for top level item
  const [isTopLevelCollapsed, setIsTopLevelCollapsed] = useState(false);

  const currentURL = window.location.pathname + window.location.search;
  const componentsLink =
    currentURL === `/kits${type ? `?type=${type}` : ""}`
      ? ""
      : `/kits${type ? `?type=${type}` : ""}`;

  //set up toggling for top level item
  const handleComponentsClick = (item) => {
    setIsActive(() => {
      const newIsActive = {};
      newIsActive[item] = true;
      return newIsActive;
    });

    //return true at end to disable default collapsible behavior
    return true;
  };

  //right icon click for top level item
  const handleComponentsIconClick = () => {
    isTopLevelCollapsed === true
      ? setIsTopLevelCollapsed(false)
      : setIsTopLevelCollapsed(true);
  };

  const activeTopLevel = () => {
    return isActive["top-nav-item"]
      ? true
      : Object.keys(isActive).length === 0
      ? currentURL === `/kits${type ? `?type=${type}` : ""}`
      : false;
  };

  return (
    <>
      <Flex
        orientation="row"
        spacing="between"
        align="center"
        marginTop="lg"
        marginX="sm"
      >
        <Image alt="Playbook logo" url={PBLogo} />
        <Pill text={PBversion} variant="success" />
      </Flex>
      <Flex orientation="column" align="stretch" margin="sm">
        <KitSearch
          classname="desktop-kit-search"
          id="desktop-kit-search"
          kits={search_list}
        />
      </Flex>
      <Nav dark={dark} variant="bold" paddingTop="xxs">
        {SideBarNavItems.map(({ name, key, children, leftIcon, link }) => (
          <NavItem
            // active={activeTopLevel()}
            collapsed={children && isTopLevelCollapsed}
            collapsible={children}
            collapsibleTrail={children}
            cursor="pointer"
            dark={dark}
            fontSize="small"
            fontWeight="bolder"
            iconRight={children && ["plus", "minus"]}
            key={key}
            iconLeft={leftIcon}
            link={link}
            marginY="none"
            onClick={() => handleComponentsClick(key)}
            onIconRightClick={children && handleComponentsIconClick}
            paddingY="xxs"
            text={name}
          >
            {children && (
              <>
              {
                name === "Components" && (
                  <>
                  {kits.map((link, i) =>
                  renderNavItem(
                    link,
                    i,
                    collapsibles,
                    category,
                    type,
                    dark,
                    kit,
                    isActive,
                    setIsActive
                  )
                )}
                </>
                )
              }
                
              </>
            )}
          </NavItem>
        ))}
      </Nav>
    </>
  );
};

export default MainSidebar;
