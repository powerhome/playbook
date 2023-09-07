import React from "react";
import { Nav, NavItem } from "playbook-ui";
import { linkFormat } from "../../utilities/website_sidebar_helper";

const MainSidebar = ({ dark, type, category, kit, kits }) => {

  return (
    <>
      <Nav
        dark={dark}
        link={`/kits${type ? `?type=${type}` : ""}`}
        variant="bold"
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
          marginBottom="none"
          marginTop="xxs"
          text="Components"
          paddingY="xxs"
        >
          {kits.map((link, i) =>
            typeof link === "object" ? (
                <NavItem
                  active={category === Object.keys(link)[0]}
                  collapsible
                  collapsibleTrail
                  dark={dark}
                  fontSize="small"
                  iconRight={["plus", "minus"]}
                  key={`${Object.keys(link)[0]}-${i}`}
                  link={`/kit_category/${Object.keys(link)}?type=${type}`}
                  marginBottom="none"
                  marginTop="xxs"        
                  text={linkFormat(Object.keys(link))}
                  paddingY="xxs"
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
            )
          )}
        </NavItem>
      </Nav>
    </>
  );
};

export default MainSidebar;
