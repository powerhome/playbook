import React, { useState, useEffect } from "react";
import { Nav, NavItem, useCollapsible } from "playbook-ui";
import { linkFormat } from "../../utilities/website_sidebar_helper";

const MainSidebar = ({ dark, type, category, kit, kits }) => {
  //active state for navItems(will be deduntant once routing moved to react router)
  const [isActive, setIsActive] = useState({});

  //hook into collapsible logic for all nested nav items
  const collapsibles = kits.map(() => useCollapsible());

  //hook into collapsible logic for top level item
  const [isTopLevelCollapsed, setIsTopLevelCollapsed] = useState(false);

  const currentURL = window.location.pathname + window.location.search;
  const componentsLink = currentURL === `/kits${type ? `?type=${type}` : ""}`
  ? ""
  : `/kits${type ? `?type=${type}` : ""}`

  //set up custom toggling
  const handleMainClick = (index, categoryKey) => {
    collapsibles.forEach(([, , setCollapsed], idx) => {
      setIsActive(() => {
        const newIsActive = {};
        newIsActive[`${categoryKey}-${index}`] = true;
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

  //set up toggling for top level item
  const handleComponentsClick = () => {
    const topLevelLink = `/kits${type ? `?type=${type}` : ""}`;
    currentURL === topLevelLink
      ? null
      : setIsTopLevelCollapsed(!isTopLevelCollapsed);
    //return true at end to disable default collapsible behavior
    return true;
  };

  //right icon click for top level item
  const handleComponentsIconClick = () => {
    isTopLevelCollapsed === true
      ? setIsTopLevelCollapsed(false)
      : setIsTopLevelCollapsed(true);
  };

  //click on nested items
  const handleSubItemClick = (i, sublink) => {
    setIsActive(() => {
      const newIsActive = {};
      newIsActive[`${sublink}-${i}`] = true;
      return newIsActive;
    });
  };

  //click on non-collapsible navitem click
  const handleNonCollapseLinkClick = (link) => {
    setIsActive(() => {
      const newIsActive = {};
      newIsActive[link] = true;
      return newIsActive;
    });
  };

  const renderNavItem = (link, i) => {
    const [collapsed] = collapsibles[i];

    const generateLink = (categoryKey, sublink, type) => {
      if (sublink) {
        const link = `/kits/${sublink}/${type}`;
        return currentURL === link ? "" : link;
      } else {
        const link = `/kit_category/${categoryKey}?type=${type}`;
        return currentURL === link ? "" : link;
      }
    };

    if (typeof link === "object") {
      //useState for handling collapsed state
      const [toggleNav, setToggleNav] = useState(false);
      //useEffect to handle toggle to consolidate logic
      useEffect(() => {
        setToggleNav(isActiveCategory || hasActiveSublink ? false : collapsed);
      }, [collapsed]);

      //click event for right icon
      const handleIconClick = (index) => {
        collapsibles.forEach(([, ,], idx) => {
          if (idx === index) {
            toggleNav === true ? setToggleNav(false) : setToggleNav(true);
          }
        });
      };

      const categoryKey = Object.keys(link)[0];
      const sublinks = link[categoryKey];
      const isActiveCategory = isActive[i]
        ? true
        : Object.keys(isActive).length === 0
        ? category === categoryKey
        : false;

      const calculateIsActiveCategory = (i, categoryKey, sublink) => {
        if (sublink) {
          return isActive[`${sublink}-${i}`]
            ? true
            : Object.keys(isActive).length === 0
            ? kit === sublink
            : false;
        } else {
          return isActive[`${categoryKey}-${i}`]
            ? true
            : Object.keys(isActive).length === 0
            ? category === categoryKey
            : false;
        }
      };

      const hasActiveSublink = link[Object.keys(link)[0]].some(
        (sublink) => sublink === kit
      );

      return (
        <NavItem
          active={calculateIsActiveCategory(i, categoryKey, null)}
          collapsed={toggleNav}
          collapsible
          collapsibleTrail
          cursor="pointer"
          dark={dark}
          fontSize="small"
          iconRight={["plus", "minus"]}
          key={`${categoryKey}-${i}`}
          link={generateLink(categoryKey, null, type)}
          marginBottom="none"
          marginTop="xxs"
          onClick={() => handleMainClick(i, categoryKey)}
          onIconRightClick={() => handleIconClick(i)}
          paddingY="xxs"
          text={linkFormat(categoryKey)}
        >
          {sublinks.map((sublink, j) => (
            <NavItem
              active={calculateIsActiveCategory(j, null, sublink)}
              cursor="pointer"
              dark={dark}
              fontSize="small"
              key={`${sublink}-${j}`}
              link={generateLink(categoryKey, sublink, type)}
              marginY="none"
              onClick={() => handleSubItemClick(j, sublink)}
              paddingY="xxs"
              text={linkFormat(sublink)}
            />
          ))}
        </NavItem>
      );
    } else {
      return (
        <NavItem
          active={
            isActive[link]
              ? true
              : Object.keys(isActive).length === 0
              ? kit === link
              : false
          }
          cursor="pointer"
          dark={dark}
          fontSize="small"
          key={`${link}-${i}`}
          link={generateLink(null, link, type)}
          marginBottom="none"
          marginTop="xxs"
          onClick={() => handleNonCollapseLinkClick(link)}
          text={linkFormat(link)}
          paddingY="xxs"
        />
      );
    }
  };

  return (
    <Nav dark={dark} variant="bold" paddingTop="xxs">
      <NavItem
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
        onClick={handleComponentsClick}
        onIconRightClick={handleComponentsIconClick}
        paddingY="xxs"
        text="Components"
      >
        {kits.map((link, i) => renderNavItem(link, i))}
      </NavItem>
    </Nav>
  );
};

export default MainSidebar;
