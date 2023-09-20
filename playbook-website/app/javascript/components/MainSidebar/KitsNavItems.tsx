import React, { useState, useEffect } from "react";
import { NavItem } from "playbook-ui";
import { linkFormat } from "../../utilities/website_sidebar_helper";

const currentURL = window.location.pathname + window.location.search;

export const kitsType = (type) => {
  if (type === null || type === undefined) {
    return "rails";
  } else {
    return type;
  }
};

export const renderNavItem = (
  link,
  i,
  collapsibles,
  category,
  type,
  dark,
  kit,
  isActive,
  setIsActive
) => {
  const [collapsed] = collapsibles[i];
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

  const generateLink = (categoryKey, sublink, type) => {
    if (sublink) {
      const link = `/kits/${sublink}/${kitsType(type)}`;
      return currentURL === link ? "" : link;
    } else {
      const link = `/kit_category/${categoryKey}?type=${kitsType(type)}`;
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
