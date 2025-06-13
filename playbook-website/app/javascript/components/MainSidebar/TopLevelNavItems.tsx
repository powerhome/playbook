import React, { useState, useEffect } from "react";
import { NavItem, useCollapsible } from "playbook-ui";
import { KitsNavItem, kitsType } from "./NavComponents/KitsNavComponent";
import { SideBarNavItems } from "./MenuData/SidebarNavItems";
import { OtherNavItems } from "./NavComponents/OtherNavComponent";

const currentURL = window.location.pathname + window.location.search;

export const TopLevelNavItem = ({
  dark,
  type,
  isActive,
  setIsActive,
  kits,
  kit,
  category,
  collapsibles,
  patterns,
  getting_started,
  design_guidelines,
  whats_new,
  icons,
}) => {
  //hook into collapsible logic for top level item
  const topLevelCollapsibles = SideBarNavItems.map(() => useCollapsible());

  //logic to make it so no navigation if already on that page(prevent unneeded rerenders)
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
      ? currentURL === kitsLink || currentURL === link
      : false;
  };

  // if url starts with /visual_guidelines or /kits, then relevant collapsible nav to be toggled open on first render
  const currentPage = currentURL.match(/^(\/[^/]+)\/[^/]+/);
  const kitsPage = currentURL.match(/^\/([^/?#]+)/);
  // if url starts with /kit, then relevant collapsible nav to be toggled open on first render
  const kitCategoryPage = currentURL.match(/^\/([^/]{3})/);
  // if url matches /guides, than relevant collapsible nav to be toggled open on first render
  const guidesPage = currentURL.split("/").slice(0, 3).join("/");
  // if changelog_ is in the current url
  const changelogPage = currentURL.includes("changelog_");
  //extract render logic out of return for better performance
  const renderTopItems = (name, key, children, leftIcon, link, i) => {
    const [collapsed] = topLevelCollapsibles[i];

    //is link for navitem equal to current url? Logic will be redundant once website moves to react
    const onCurrentPage = () => {
      const categoryMatch =
        (currentPage &&
          (currentPage[1] === link ||
            (kitCategoryPage &&
              `/${kitCategoryPage[1]}` ===
                link.substring(0, link.length - 1)))) ||
        (kitsPage && kitsPage[0] === link);

      const guidesMatch = guidesPage === link;

      return categoryMatch || guidesMatch ? true : false;
    };

    //use state to handle toggle logic to make sure both main click and right icon click works as expected
    const [toggleTopNav, setToggleTopNav] = useState(
      onCurrentPage() ? false : true
    );

    //on first render, active item should be toggled open, after that custom toggling logic to run
    useEffect(() => {
      //isActive will always be empty on first render due to rails navigation. Once we move to React router, this code will not be needed
      if (Object.keys(isActive).length === 0) {
        setToggleTopNav(onCurrentPage() ? false : true);
      } else {
        setToggleTopNav(collapsed);
      }
    }, [collapsed, isActive]);

    //right icon click for top level item
    const handleComponentsIconClick = (i) => {
      topLevelCollapsibles.forEach(([, toggle], idx) => {
        if (idx === i) {
          toggleTopNav === true
            ? setToggleTopNav(false)
            : setToggleTopNav(true);
        }
      });
    };

    //callback function so top level nav item stays toggled opwn if child is clicked
    const updateTopLevelNav = (index) => {
      topLevelCollapsibles.forEach((collapsible, i) => {
        const [, , setCollapsed] = collapsible;

        if (i !== index) {
          setCollapsed(true);
        } else {
          setCollapsed(false);
        }
      });
    };

    return (
      <NavItem
        active={activeTopLevel(key, link)}
        collapsed={children && toggleTopNav}
        collapsible={children}
        collapsibleTrail={children}
        cursor="pointer"
        dark={dark}
        fontSize="small"
        fontWeight="bolder"
        iconLeft={leftIcon}
        iconRight={children && ["plus", "minus"]}
        key={key}
        link={TopLevelLink(link)}
        marginY="none"
        onClick={() => handleComponentsClick(key, i)}
        onIconRightClick={children && (() => handleComponentsIconClick(i))}
        paddingY="xxs"
        target={name === "Playground" ? "_blank" : "_self"}
        text={name}
      >
        {children && (
          <>
            {name === "Components" ? (
              <>
                {kits.map((link, index) => (
                  <KitsNavItem
                    link={link}
                    key={`kits-nav-item-${index}`}
                    kitIndex={index}
                    collapsibles={collapsibles}
                    category={category}
                    type={type}
                    dark={dark}
                    kit={kit}
                    isActive={isActive}
                    setIsActive={setIsActive}
                    updateTopLevelNav={updateTopLevelNav}
                    parentIndex={i}
                  />
                ))}
              </>
            ) : (
              <OtherNavItems
                name={name}
                currentURL={currentURL}
                dark={dark}
                patterns={patterns}
                setIsActive={setIsActive}
                isActive={isActive}
                updateTopLevelNav={updateTopLevelNav}
                parentIndex={i}
                getting_started={getting_started}
                design_guidelines={design_guidelines}
                whats_new={whats_new}
                icons={icons}
              />
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
