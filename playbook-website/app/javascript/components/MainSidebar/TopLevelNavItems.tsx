import React, { useState, useEffect } from "react";
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
  collapsibles,
  samples
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

  // if url starts with /visual_guidelines, then relevant collapsible nav to be toggled open on first render
  const currentPage = currentURL.match(/^(\/[^/]+)\/[^/]+/);
  // if url starts with /kit, then relevant collapsible nav to be toggled open on first render
  const kitCategoryPage = currentURL.match(/^\/([^/]{3})/);
  // if url matches /guides, than relevant collapsible nav to be toggled open on first render
  const guidesPage = currentURL.split("/").slice(0, 3).join("/");

  //extract render logic out of return for better performance
  const renderTopItems = (name, key, children, leftIcon, link, i) => {
    const [collapsed] = topLevelCollapsibles[i];
    //use state to hanlde toggle logic to make sure both main click and right icon click works as expected
    const [toggleWithIcon, setToggleWithIcon] = useState(false);

    const categoryMatch =
      currentPage &&
      (currentPage[1] === link ||
        (kitCategoryPage &&
          `/${kitCategoryPage[1]}` === link.substring(0, link.length - 1)));

    const guidesMatch = guidesPage === link;

    useEffect(() => {
      setToggleWithIcon(categoryMatch || guidesMatch ? false : collapsed);
    }, [collapsed]);

    //right icon click for top level item
    const handleComponentsIconClick = (i) => {
      topLevelCollapsibles.forEach(([, toggle], idx) => {
        if (idx === i) {
          toggleWithIcon === true
            ? setToggleWithIcon(false)
            : setToggleWithIcon(true);
        }
      });
    };

    return (
      <NavItem
        active={activeTopLevel(key, link)}
        collapsed={children && toggleWithIcon}
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
              renderOtherNavItems(name, currentURL, dark, samples)
            )}
          </>
        )}
      </NavItem>
    );
  };

  return (
    <>
      {SideBarNavItems.map(({ name, key, children, leftIcon, link }, i) => {
        return renderTopItems(name, key, children, leftIcon, link, i);
      })}
    </>
  );
};
