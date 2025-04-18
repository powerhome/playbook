import React from "react";
import { NavItem } from "playbook-ui";
import { VisualGuidelinesItems } from "../MenuData/GuidelinesNavItems";

export const OtherNavItems = ({
  name,
  currentURL,
  dark,
  patterns,
  setIsActive,
  isActive,
  updateTopLevelNav,
  parentIndex,
  getting_started,
  design_guidelines,
  whats_new,
}) => {

  const patternsMenu = patterns?.Patterns?.map((item) => ({
    name: item.name,
    link: `/patterns/${item.link}`,
  }))

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

  const tokensAndGuidelinesMenu = VisualGuidelinesItems.map(guide => ({
    name: guide.label,
    link: guide.value
  }))

  //conditionally render navitems depending on name
  if (name === "Tokens & Guidelines") {
    menuItems = tokensAndGuidelinesMenu
  } else if (name === "Patterns" && patterns) {
    menuItems = patternsMenu
  } else if (name === "Getting Started") {
    menuItems = guidesNavItems
  } else if (name === "Design Guidelines") {
    menuItems = designGuidesNavItems
  } else if (name === "What's New") {
    menuItems = whatsNewNavItems
  }

  const handleItemClick = (link, i) => {
    const key = `${link.link}-${i}`
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
  
    const key = `${link.link}-${i}`
  
    if (isActive[key]) {
      return true
    }
  
    if (Object.keys(isActive).length === 0) {
      return link.link === currentURL
    }
  
    return null
  }

  return (
    <>
      {menuItems.map((link, i) => (
        <NavItem
          active={activeForItems(link, i)}
          cursor="pointer"
          dark={dark}
          fontSize="small"
          key={`${link.link}-${i}`}
          link={link.link}
          marginBottom="none"
          marginTop="xxs"
          onClick={() => handleItemClick(link, i)}
          paddingY="xxs"
          text={link.name}
        />
      ))}
    </>
  )
}
