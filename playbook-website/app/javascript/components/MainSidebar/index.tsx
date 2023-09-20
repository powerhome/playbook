import React, { useState, useEffect } from "react";
import { Nav, NavItem, useCollapsible, Image, Pill, Flex } from "playbook-ui";
import { renderNavItem, kitsType } from "./KitsNavItems";
import PBLogo from "../../images/pb-logo.svg";
import KitSearch from "../KitSearch";
import { SideBarNavItems } from "./SidebarNavItems";
import { VisualGuidelinesItems } from "./GuidelinesNavItems";

const MainSidebar = ({
  dark,
  type,
  category,
  kit,
  kits,
  PBversion,
  search_list,
}) => {
  //active state for navItems(will be redundant once routing moved to react router)
  const [isActive, setIsActive] = useState({});

  //hook into collapsible logic for all components nested nav items
  const collapsibles = kits.map(() => useCollapsible());

  //hook into collapsible logic for top level item
  const topLevelCollapsibles = SideBarNavItems.map(()=> useCollapsible())

  const currentURL = window.location.pathname + window.location.search;

  const TopLevelLink = (link) => {
    if (link === "/kits") {
      return currentURL ===
        `/kits${kitsType(type) ? `?type=${kitsType(type)}` : ""}`
        ? ""
        : `/kits${kitsType(type) ? `?type=${kitsType(type)}` : ""}`;
    } else {
      return currentURL === link ? "" : link;
    }
  };

  //set up toggling for top level item
  const handleComponentsClick = (item, index) => {
    topLevelCollapsibles.forEach(([, , setCollapsed], idx) => {
     setIsActive(() => {
      const newIsActive = {};
      newIsActive[item] = true;
      return newIsActive;
    });
      if (idx === index) {
        setCollapsed(false);
      } else {
        setCollapsed(true);
      }
    });
    //return true at end to disable default collapsible behavior
    return true;
  };

  //right icon click for top level item
  const handleComponentsIconClick = (i) => {
    topLevelCollapsibles.forEach(([,toggle ,], idx) => {
      if (idx === i) {
        toggle()
      }
    })
  };

  const activeTopLevel = (key, link) => {
    const kitsLink =
      link === "/kits"
        ? `/kits${kitsType(type) ? `?type=${kitsType(type)}` : ""}`
        : link;
    return isActive[key]
      ? true
      : Object.keys(isActive).length === 0
      ? currentURL === kitsLink
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
        {SideBarNavItems.map(({ name, key, children, leftIcon, link }, i) => {
          const [collapsed] = topLevelCollapsibles[i]
        
          return (
          <NavItem
            active={activeTopLevel(key, link)}
            collapsed={children && activeTopLevel(key, link) ? false : collapsed}
            collapsible={children}
            collapsibleTrail={children}
            cursor="pointer"
            dark={dark}
            fontSize="small"
            fontWeight="bolder"
            iconRight={children && ["plus", "minus"]}
            key={key}
            iconLeft={leftIcon}
            link={TopLevelLink(link)}
            marginY="none"
            onClick={() => handleComponentsClick(key, i)}
            onIconRightClick={children && (()=>handleComponentsIconClick(i))}
            paddingY="xxs"
            text={name}
          >
            {children && (
              <>
                {name === "Components" && (
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
                )}
                {name === "Tokens and Guidelines" && (
                  <>
                    {VisualGuidelinesItems.map(({ name, link }, i) => (
                      <>
                        <NavItem
                          active={link === currentURL}
                          cursor="pointer"
                          dark={dark}
                          fontSize="small"
                          key={`${link}-${i}`}
                          link={link}
                          marginBottom="none"
                          marginTop="xxs"
                          text={name}
                          paddingY="xxs"
                        />
                      </>
                    ))}
                  </>
                )}
              </>
            )}
          </NavItem>
          )
                    })}
      </Nav>
    </>
  );
};

export default MainSidebar;
