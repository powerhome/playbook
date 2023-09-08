import React, { useState } from "react";
import { Nav, NavItem, useCollapsible } from "playbook-ui";
import { linkFormat } from "../../utilities/website_sidebar_helper";

const MainSidebar = ({ dark, type, category, kit, kits }) => {
  //hook into collapsible logic for all nested nav items
  const collapsibles = kits.map(() => useCollapsible());

  const currentURL = window.location.pathname + window.location.search;

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

  return (
    <>
      <Nav dark={dark} variant="bold" paddingTop="xxs">
        <NavItem
          collapsed={false}
          collapsible
          collapsibleTrail
          dark={dark}
          fontSize="small"
          fontWeight="bolder"
          iconRight={["plus", "minus"]}
          key="top-nav-item"
          link={
            currentURL === `/kits${type ? `?type=${type}` : ""}`
              ? ""
              : `/kits${type ? `?type=${type}` : ""}`
          }
          marginY="none"
          paddingY="xxs"
          text="Components"
        >
          {kits.map((link, i) => {
            const [collapsed] = collapsibles[i];
            let hasActiveSublink = false;

            if (typeof link === "object") {
              // Check if any sublink is active
              link[Object.keys(link)[0]].forEach((sublink) => {
                if (sublink === kit) {
                  hasActiveSublink = true;
                }
              });
              return (
                <NavItem
                  active={category === Object.keys(link)[0]}
                  collapsed={
                    category === Object.keys(link)[0] ||
                    hasActiveSublink ||
                    currentURL ===
                      `/kit_category/${Object.keys(link)}?type=${type}`
                      ? false
                      : collapsed
                  }
                  collapsible
                  collapsibleTrail
                  dark={dark}
                  fontSize="small"
                  iconRight={["plus", "minus"]}
                  key={`${Object.keys(link)[0]}-${i}`}
                  link={
                    currentURL ===
                    `/kit_category/${Object.keys(link)}?type=${type}`
                      ? ""
                      : `/kit_category/${Object.keys(link)}?type=${type}`
                  }
                  marginBottom="none"
                  marginTop="xxs"
                  onClick={() => handleMainClick(i)}
                  onIconRightClick={() => handleIconClick(i)}
                  paddingY="xxs"
                  text={linkFormat(Object.keys(link))}
                >
                  {link[Object.keys(link)[0]].map((sublink, i) => (
                    <NavItem
                      active={kit === sublink}
                      dark={dark}
                      fontSize="small"
                      key={`${sublink}-${i}`}
                      link={
                        currentURL === `/kits/${sublink}/${type}`
                          ? ""
                          : `/kits/${sublink}/${type}`
                      }
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
                  dark={dark}
                  fontSize="small"
                  key={`${link}-${i}`}
                  link={
                    currentURL === `/kits/${link}?type=${type}`
                      ? ""
                      : `/kits/${link}?type=${type}`
                  }
                  marginBottom="none"
                  marginTop="xxs"
                  text={linkFormat(link)}
                  paddingY="xxs"
                />
              );
            }
          })}
        </NavItem>
      </Nav>
    </>
  );
};

export default MainSidebar;
