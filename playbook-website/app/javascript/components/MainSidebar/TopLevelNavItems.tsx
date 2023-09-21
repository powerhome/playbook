import React from "react";
import { NavItem } from "playbook-ui";
import { renderNavItem, kitsType } from "./KitsNavItems";
import { VisualGuidelinesItems } from "./GuidelinesNavItems";
import { SideBarNavItems } from "./SidebarNavItems";

const currentURL = window.location.pathname + window.location.search;

export const renderTopLevelNavItem = (
  topLevelCollapsibles,
  dark,
  type,
  isActive,
  setIsActive,
  kits,
  kit,
  category,
  collapsibles
) => {
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
    // if url starts with visual_guidelines, then relevant collapsible nav to be toggled open on first render
    const currentPage = currentURL.match(/^(\/[^/]+)\/[^/]+/);
    const match = currentPage && currentPage[1] === link;

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
        );
      })}
    </>
  );
};
