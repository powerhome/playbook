import React from "react";
import { NavItem } from "playbook-ui";
import { VisualGuidelinesItems } from "../MenuData/GuidelinesNavItems";

export const OtherNavItems = ({
  name,
  currentURL,
  dark,
  samples,
  setIsActive,
  isActive,
  updateTopLevelNav,
  parentIndex,
  getting_started,
  design_guidelines,
  whats_new,
}) => {
  //transform text from samples yml
  const transformMenuTitle = (link) => {
    if (name === "UI Samples") {
      const words = link
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      return words.join(" ")
    } else {
      return link.name
    }
  }

  const samplesMenu: string[] = []

  //Get samples pages from Samples yml file
  for (const key in samples) {
    if (samples.hasOwnProperty(key)) {
      samples[key].forEach((item: string) => samplesMenu.push(item))
    }
  }
  let menuItems: { [key: string]: string }[] | string[] = []
  
  const guidesNavItems = getting_started["pages"].map(guide => ({
    name: guide.title,
    link: `/${guide.url}`
  }))

  const designGuidesNavItems = design_guidelines["pages"].map(guide => ({
    name: guide.title,
    link: `/${guide.url}`
  }))

  const whatsNewNavItems = whats_new["pages"].map(guide => ({
    name: guide.title,
    link: `/${guide.url}`
  }))

  //conditionally render navitems depending on name
  if (name === "Tokens & Guidelines") {
    menuItems = VisualGuidelinesItems
  } else if (name === "UI Samples" && samples) {
    menuItems = samplesMenu
  } else if (name === "Getting Started") {
    menuItems = guidesNavItems
  } else if (name === "Design Guidelines") {
    menuItems = designGuidesNavItems
  } else if (name === "What's New") {
    menuItems = whatsNewNavItems
  }

  const handleItemClick = (link, i) => {
    const key = name === "UI Samples" ? `${link}-${i}` : `${link.link}-${i}`
    setIsActive(() => {
      const newIsActive = {}
      newIsActive[key] = true
      return newIsActive
    })
    updateTopLevelNav(parentIndex)
  }

  const activeForItems = (link, i) => {
    if (currentURL.startsWith("/guides/getting_started/icons") && link.name === "Icon Integration") {
      return true;
    }

    const key = name === "UI Samples" ? `${link}-${i}` : `${link.link}-${i}`
    return isActive[key]
      ? true
      : Object.keys(isActive).length === 0
      ? name === "UI Samples"
        ? `/samples/${link}` === currentURL
        : link.link === currentURL
      : null
  }

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
          paddingY="xxs"
          text={transformMenuTitle(link)}
        />
      ))}
    </>
  )
}
