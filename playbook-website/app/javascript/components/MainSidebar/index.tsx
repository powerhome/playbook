import React, { useEffect } from "react";
import { Nav, NavItem, useCollapsible } from "playbook-ui";
import { linkFormat } from "../../utilities/website_sidebar_helper";

const MainSidebar = ({ dark, type, category, kit, kits }) => {
  const collapsibles = kits.map(() => useCollapsible(true));

  //using localstorage to store index of clicked item in between page reloads
  useEffect(() => {
    const clicked = localStorage.getItem("clickedNavItem");
    setTimeout(() => {
      collapsibles.forEach(([, , setCollapsed], idx) => {
        if (idx.toString() === clicked) {
          setCollapsed(false);
        }
      });
    }, 100);
  }, []);

  //set up custom toggling
  const handleMainClick = (index) => {
    collapsibles.forEach(([, , setCollapsed], idx) => {
      if (idx === index) {
        setCollapsed(false);
        localStorage.setItem("clickedNavItem", idx);
      } else {
        setCollapsed(true);
      }
    });
  };

  return (
    <>
      <Nav
        dark={dark}
        link={`/kits${type ? `?type=${type}` : ""}`}
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
          link={`/kits`}
          marginY="none"
          text="Components"
          paddingY="xxs"
        >
          {kits.map((link, i) => {
            const [collapsed] = collapsibles[i];
            return typeof link === "object" ? (
              <NavItem
                active={category === Object.keys(link)[0]}
                collapsed={collapsed}
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
