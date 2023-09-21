import React from "react";
import { NavItem, useCollapsible } from "playbook-ui";
import { renderNavItem, kitsType } from "./KitsNavItems";
import { SideBarNavItems } from "./MenuData/SidebarNavItems";
import { renderOtherNavItems } from "./OtherNavItems";

const currentURL = window.location.pathname + window.location.search;

export const renderTopLevelNavItem = (
  dark,
  type,
  isActive,
  setIsActive,
  kits,
  kit,
  category,
  collapsibles
) => {
  //hook into collapsible logic for top level item
  const topLevelCollapsibles = SideBarNavItems.map(() => useCollapsible());

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
    topLevelCollapsibles.forEach(([, toggle], idx) => {
      if (idx === i) {
        toggle();
      }
    });
  };

  //NOTE: All toggle and active state logic should be replaced with state once website moves to react router
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

  //collapsed logic for toplevel nav items
  const toggleTopLevelNavItem = (key, link, collapsed) => {
    // if url starts with /visual_guidelines, then relevant collapsible nav to be toggled open on first render
    const currentPage = currentURL.match(/^(\/[^/]+)\/[^/]+/);
    // if url starts with /kit, then relevant collapsible nav to be toggled open on first render
    const kitCategoryPage = currentURL.match(/^\/([^/]{3})/);
    //NOTE: All toggle and active state logic should be replaced with state once website moves to react router
    const match =
      currentPage &&
      (currentPage[1] === link ||
        (kitCategoryPage &&
          `/${kitCategoryPage[1]}` === link.substring(0, link.length - 1)));
    return activeTopLevel(key, link) || match ? false : collapsed;
  };

  return (
    <>
      {SideBarNavItems.map(({ name, key, children, leftIcon, link }, i) => {
        const [collapsed] = topLevelCollapsibles[i];

        return (
          <NavItem
            active={activeTopLevel(key, link)}
            collapsed={children && toggleTopLevelNavItem(key, link, collapsed)}
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
            onIconRightClick={children && (() => handleComponentsIconClick(i))}
            paddingY="xxs"
            text={name}
          >
            {children && (
              <>
                {name === "Components" ? (
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
                ) : (
                  renderOtherNavItems(name, currentURL, dark)
                )}
              </>
            )}
          </NavItem>
        );
      })}
    </>
  );
};
