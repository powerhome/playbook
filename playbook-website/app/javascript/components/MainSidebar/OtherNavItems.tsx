import React from "react";
import { NavItem } from "playbook-ui";
import { VisualGuidelinesItems } from "./MenuData/GuidelinesNavItems";

export const renderOtherNavItems = (name, currentURL, dark) => {
  const currentNav =
    name === "Tokens and Guidelines" ? VisualGuidelinesItems : null;
  return (
    <>
      {currentNav !== null &&
        currentNav.map(({ name, link }, i) => (
          <>
            <NavItem
              active={link === currentURL}
              cursor="pointer"
              dark={dark}
              fontSize="small"
              key={`${link}-${i}`}
              link={link}
              marginBottom="none"
              marginTop="xxs"
              text={name}
              paddingY="xxs"
            />
          </>
        ))}
    </>
  );
};
