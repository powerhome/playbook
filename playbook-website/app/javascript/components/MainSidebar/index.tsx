import React from "react";
import { Nav, NavItem, useCollapsible } from "playbook-ui";
import { linkFormat } from "../../utilities/website_sidebar_helper";

const MainSidebar = ({ dark, type, category, kit, kits }) => {
  //hook into collapsible logic for all nested nav items
  const collapsibles = kits.map(() => useCollapsible());

  //const currentURL = window.location.pathname + window.location.search;

  //set up custom toggling
  const handleMainClick = (index) => {
    collapsibles.forEach(([, , setCollapsed], idx) => {
      if (idx === index) {
        setCollapsed(false);
      } else {
        setCollapsed(true);
      }
    });
  };

  //click event for right icon
  const handleIconClick = (index) => {
    collapsibles.forEach(([collapsed, , setCollapsed], idx) => {
      if (idx === index) {
        //using setCollapsed instead of toggle() because using toggle() here was causing a strange animation bug
        collapsed === true ? setCollapsed(false) : setCollapsed(true)
      }
    });
  };

  const renderNavItem = (link, i) => {
    const [collapsed] = collapsibles[i];

    if (typeof link === "object") {
      const categoryKey = Object.keys(link)[0];
      const sublinks = link[categoryKey];
      const isActiveCategory = category === categoryKey;

      const hasActiveSublink = link[Object.keys(link)[0]].some(sublink => sublink === kit);
      
      return (
        <NavItem
          active={isActiveCategory}
          collapsed={isActiveCategory || hasActiveSublink ? false : collapsed}
          collapsible
          collapsibleTrail
          cursor="pointer"
          dark={dark}
          fontSize="small"
          iconRight={["plus", "minus"]}
          key={`${categoryKey}-${i}`}
          link={`/kit_category/${categoryKey}?type=${type}`}
          marginBottom="none"
          marginTop="xxs"
          onClick={() => handleMainClick(i)}
          onIconRightClick={() => handleIconClick(i)}
          paddingY="xxs"
          text={linkFormat(categoryKey)}
        >
          {sublinks.map((sublink, j) => (
            <NavItem
              active={kit === sublink}
              cursor="pointer"
              dark={dark}
              fontSize="small"
              key={`${sublink}-${j}`}
              link={`/kits/${sublink}/${type}`}
              marginY="none"
              paddingY="xxs"
              text={linkFormat(sublink)}
            />
          ))}
        </NavItem>
      );
    } else {
      return (
        <NavItem
          active={kit === link}
          cursor="pointer"
          dark={dark}
          fontSize="small"
          key={`${link}-${i}`}
          link={`/kits/${link}?type=${type}`}
          marginBottom="none"
          marginTop="xxs"
          text={linkFormat(link)}
          paddingY="xxs"
        />
      );
    }
  };
  
  return (
    <Nav dark={dark} variant="bold" paddingTop="xxs">
      <NavItem
        collapsed={false}
        collapsible
        collapsibleTrail
        cursor="pointer"
        dark={dark}
        fontSize="small"
        fontWeight="bolder"
        iconRight={["plus", "minus"]}
        key="top-nav-item"
        link={`/kits${type ? `?type=${type}` : ""}`}
        marginY="none"
        paddingY="xxs"
        text="Components"
      >
        {kits.map((link, i) => renderNavItem(link, i))}
      </NavItem>
    </Nav>
  );
};

export default MainSidebar;
