import React, { useState, useEffect } from "react";
import { NavItem } from "playbook-ui";
import { linkFormat } from "../../../utilities/website_sidebar_helper";

const currentURL = window.location.pathname + window.location.search;

export const kitsType = (type) => {
  if (type === null || type === undefined) {
    return "react";
  } else {
    return type;
  }
};

export const KitsNavItem = ({
  link,
  kitIndex,
  collapsibles,
  category,
  type,
  dark,
  kit,
  isActive,
  setIsActive,
  updateTopLevelNav,
  parentIndex
}) => {
  const [collapsed] = collapsibles[kitIndex];
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
      updateTopLevelNav(parentIndex);
    });
    //return true at end to disable default collapsible behavior
    return true;
  };

  //make sure kits nav will stay toggled open when nested item is clicked
  const updateKitsNav = (index) => {
    collapsibles.forEach((collapsible, i) => {
      const [, , setCollapsed] = collapsible;
      if (i !== index) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    });
  };

  //click on nested items
  const handleSubItemClick = (subLinkIndex, sublink, Index) => {
    setIsActive(() => {
      const newIsActive = {};
      newIsActive[`${sublink}-${subLinkIndex}`] = true;
      return newIsActive;
    });
    updateTopLevelNav(parentIndex);
    updateKitsNav(Index);
  };

  //click on non-collapsible navitem click
  const handleNonCollapseLinkClick = (link) => {
    setIsActive(() => {
      const newIsActive = {};
      newIsActive[link] = true;
      return newIsActive;
    });
    updateTopLevelNav(parentIndex);
  };

  const generateLink = (categoryKey, sublink, type) => {
    if (sublink) {
      if (categoryKey === "advanced_table") {
        // Special case for advanced_table
        const link = `/kits/advanced_table/${sublink}/${kitsType(type)}`;
        return currentURL === link ? "" : link;
      } else {
      const link = `/kits/${sublink}/${kitsType(type)}`;
      return currentURL === link ? "" : link;
      }
    } else {
      const link = `/kit_category/${categoryKey}?type=${kitsType(type)}`;
      return currentURL === link ? "" : link;
    }
  };

  if (typeof link === "object") {
    const categoryKey = Object.keys(link)[0];
    const sublinks = link[categoryKey];
    const isActiveCategory = isActive[kitIndex]
      ? true
      : Object.keys(isActive).length === 0
      ? category === categoryKey
      : false;

    const hasActiveSublink = link[Object.keys(link)[0]].some(
      (sublink) => sublink === kit
    );

    //useState for handling collapsed state
    const [toggleNav, setToggleNav] = useState(
      isActiveCategory || hasActiveSublink ? false : true
    );
    //useEffect to handle toggle to consolidate logic
    useEffect(() => {
      // isActive will always be empty on first render due to rails navigation. Once we move to React router, this code will not be needed
      if (Object.keys(isActive).length === 0) {
        setToggleNav(isActiveCategory || hasActiveSublink ? false : collapsed);
      } else {
        setToggleNav(collapsed);
      }
    }, [collapsed, isActive]);

    //click event for right icon
    const handleIconClick = (index) => {
      collapsibles.forEach(([, ,], idx) => {
        if (idx === index) {
          toggleNav === true ? setToggleNav(false) : setToggleNav(true);
        }
      });
    };

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

    return (
      <NavItem
        active={calculateIsActiveCategory(kitIndex, categoryKey, null)}
        collapsed={toggleNav}
        collapsible
        collapsibleTrail
        cursor="pointer"
        dark={dark}
        fontSize="small"
        iconRight={["plus", "minus"]}
        key={`${categoryKey}-${kitIndex}`}
        link={generateLink(categoryKey, null, type)}
        marginBottom="none"
        marginTop="xxs"
        onClick={() => handleMainClick(kitIndex, categoryKey)}
        onIconRightClick={() => handleIconClick(kitIndex)}
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
            onClick={() => handleSubItemClick(j, sublink, kitIndex)}
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
        key={`${link}-${kitIndex}`}
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
