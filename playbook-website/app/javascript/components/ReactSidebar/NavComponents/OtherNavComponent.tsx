import React from "react";
import { VisualGuidelinesItems } from "../MenuData/GuidelinesNavItems";
import { GuidesNavItems } from "../MenuData/GuildesNavItems";
import RoutedNavItem from "../RoutedNavItem";

export const OtherNavItems = ({
  name,
  dark,
  samples,
  setIsActive,
  updateTopLevelNav,
  parentIndex,
  reloadDocument
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
    updateTopLevelNav(parentIndex);
  };

  return (
    <>
      {menuItems.map((link, i) => (
        <RoutedNavItem
          reloadDocument={reloadDocument}
          cursor="pointer"
          dark={dark}
          fontSize="small"
          key={name === "UI Samples" ? `${link}-${i}` : `${link.link}-${i}`}
          path={name === "UI Samples" ? `/samples/${link}` : link.link}
          marginBottom="none"
          marginTop="xxs"
          onClick={() => handleItemClick(link, i)}
          paddingY="xxs"
          text={transformMenuTitle(link)}
        />
      ))}
    </>
  );
};
