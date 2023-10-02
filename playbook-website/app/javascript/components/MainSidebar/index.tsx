import React, { useState } from "react";
import { Nav, NavItem, useCollapsible } from "playbook-ui";
import { renderNavItem } from "./NestedNavItems";

const MainSidebar = ({ dark, type, category, kit, kits }) => {
  console.log("hi")
  console.log(kits)
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
    <Nav dark={dark} variant="bold" paddingTop="xxs">
      <NavItem
        active={activeTopLevel()}
        collapsed={isTopLevelCollapsed}
        collapsible
        collapsibleTrail
        cursor="pointer"
        dark={dark}
        fontSize="small"
        fontWeight="bolder"
        iconRight={["plus", "minus"]}
        key="top-nav-item"
        link={componentsLink}
        marginY="none"
        onClick={() => handleComponentsClick("top-nav-item")}
        onIconRightClick={handleComponentsIconClick}
        paddingY="xxs"
        text="Components"
      >
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
      </NavItem>
    </Nav>
  );
};

export default MainSidebar;
