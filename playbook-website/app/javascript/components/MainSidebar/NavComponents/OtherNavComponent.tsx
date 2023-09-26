import React from "react";
import { NavItem } from "playbook-ui";
import { VisualGuidelinesItems } from "../MenuData/GuidelinesNavItems";
import { GuidesNavItems } from "../MenuData/GuildesNavItems";

export const OtherNavItems = ({
  name,
  currentURL,
  dark,
  samples,
  setIsActive,
  isActive,
}) => {
  //transform text from samples yml
  const transformMenuTitle = (link) => {
    if (name === "UI Samples") {
      const words = link
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1));
      return words.join(" ");
    } else {
      return link.name;
    }
  };

  const samplesMenu: string[] = [];

  //Get samples pages from Samples yml file
  for (const key in samples) {
    if (samples.hasOwnProperty(key)) {
      samples[key].forEach((item: string) => samplesMenu.push(item));
    }
  }
  let menuItems: { [key: string]: string }[] | string[] = [];

  //conditionally render navitems depending on name
  if (name === "Tokens & Guidelines") {
    menuItems = VisualGuidelinesItems;
  } else if (name === "UI Samples" && samples) {
    menuItems = samplesMenu;
  } else if (name === "Getting Started") {
    menuItems = GuidesNavItems;
  }

  const handleItemClick = (link, i) => {
    const key = name === "UI Samples" ? `${link}-${i}` : `${link.link}-${i}`;
    setIsActive(() => {
      const newIsActive = {};
      newIsActive[key] = true;
      return newIsActive;
    });
  };

  const activeForItems = (link, i) => {
    const key = name === "UI Samples" ? `${link}-${i}` : `${link.link}-${i}`;
    return isActive[key]
      ? true
      : Object.keys(isActive).length === 0
      ? name === "UI Samples"
        ? `/samples/${link}` === currentURL
        : link.link === currentURL
      : null;
  };

  return (
    <>
      {menuItems.map((link, i) => (
        <NavItem
          active={activeForItems(link, i)}
          cursor="pointer"
          dark={dark}
          fontSize="small"
          key={name === "UI Samples" ? `${link}-${i}` : `${link.link}-${i}`}
          link={name === "UI Samples" ? `/samples/${link}` : link.link}
          marginBottom="none"
          marginTop="xxs"
          onClick={() => handleItemClick(link, i)}
          text={transformMenuTitle(link)}
          paddingY="xxs"
        />
      ))}
    </>
  );
};
