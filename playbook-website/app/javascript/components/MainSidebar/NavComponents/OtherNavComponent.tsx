import React from "react";
import { NavItem } from "playbook-ui";
import { VisualGuidelinesItems } from "../MenuData/GuidelinesNavItems";
import { GuidesNavItems } from "../MenuData/GuildesNavItems";

export const renderOtherNavItems = (name, currentURL, dark, samples) => {

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

  return (
    <>
      {menuItems.map((link, i) => (
        <NavItem
          active={
            name === "UI Samples"
              ? `/samples/${link}` === currentURL
              : link.link === currentURL
          }
          cursor="pointer"
          dark={dark}
          fontSize="small"
          key={`${link.link}-${i}`}
          link={name === "UI Samples" ? `/samples/${link}` : link.link}
          marginBottom="none"
          marginTop="xxs"
          text={transformMenuTitle(link)}
          paddingY="xxs"
        />
      ))}
    </>
  );
};
