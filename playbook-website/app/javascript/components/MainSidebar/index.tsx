import React, { useState, useEffect } from "react";
import { Nav, NavItem, useCollapsible } from "playbook-ui";
import { linkFormat } from "../../utilities/website_sidebar_helper";

const MainSidebar = ({ dark, type, category, kit, kits }) => {
//state for which item is currently active
  const [activeItem, setActiveItem] = useState()
  //hook into collapsible logic for all nested nav items
  const collapsibles = kits.map(() => useCollapsible(true));

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

  const handleIconClick = (index) => {
    collapsibles.forEach(([,toggle, ], idx) => {
      if (idx === index) {
        toggle();
      } 
    });
  }

  const handleComponentsClick = () => {
    //logic here
  }

  return (
    <>
      <Nav
        dark={dark}
        variant="bold"
        paddingTop="xxs"
      >
        <NavItem
          collapsed={false}
          collapsible
          collapsibleTrail
          dark={dark}
          fontSize="small"
          fontWeight="bolder"
          iconRight={["plus", "minus"]}
          key="top-nav-item"
          link={`/kits${type ? `?type=${type}` : ""}`}
          marginY="none"
          onClick={()=> handleComponentsClick()}
          paddingY="xxs"
          text="Components"
        >
          {kits.map((link, i) => {
            const [collapsed] = collapsibles[i];
            return typeof link === "object" ? (
              <NavItem
                active={category === Object.keys(link)[0]}
                collapsed={category === Object.keys(link)[0] ? false : collapsed}
                collapsible
                collapsibleTrail
                dark={dark}
                fontSize="small"
                iconRight={["plus", "minus"]}
                key={`${Object.keys(link)[0]}-${i}`}
                link={`/kit_category/${Object.keys(link)}?type=${type}`}
                marginBottom="none"
                marginTop="xxs"
                onClick={() => handleMainClick(i)}
                onIconRightClick={()=> handleIconClick(i)}
                paddingY="xxs"
                text={linkFormat(Object.keys(link))}
              >
                {link[Object.keys(link)[0]].map((sublink, i) => (
                  <NavItem
                    active={kit === sublink}
                    dark={dark}
                    fontSize="small"
                    key={`${sublink}-${i}`}
                    link={`/kits/${sublink}/${type}`}
                    marginY="none"
                    paddingY="xxs"
                    text={linkFormat(sublink)}
                  />
                ))}
              </NavItem>
            ) : (
              <NavItem
                active={kit === link}
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
          })}
        </NavItem>
      </Nav>
    </>
  );
};

export default MainSidebar;
