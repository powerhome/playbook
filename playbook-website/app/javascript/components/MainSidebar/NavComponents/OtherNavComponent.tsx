import React from "react";
import { NavItem } from "playbook-ui";
import { useNavigate } from "react-router-dom";
import { VisualGuidelinesItems } from "../MenuData/GuidelinesNavItems";

export const OtherNavItems = ({
  name,
  currentURL,
  dark,
  building_blocks,
  setIsActive,
  isActive,
  updateTopLevelNav,
  parentIndex,
  getting_started,
  design_guidelines,
  whats_new,
  beta = false,
}) => {

  const navigate = beta ? useNavigate() : null;
  
  const createLink = (path) => {
    if (beta && !path.startsWith("/beta")) {
      return `/beta${path}`;
    }
    return path;
  };

  const buildingBlocksMenu = building_blocks?.BuildingBlocks?.map((item) => ({
    name: item.name,
    link: createLink(`/building_blocks/${item.link}`),
  }))

  let menuItems: { [key: string]: string }[] | string[] = []

  const guidesNavItems = getting_started["pages"].map(guide => ({
    name: guide.title,
    link: createLink(`/${guide.url}`)
  }))

  const designGuidesNavItems = design_guidelines["pages"].map(guide => ({
    name: guide.title,
    link: createLink(`/${guide.url}`)
  }))

  const whatsNewNavItems = whats_new["pages"].map(guide => ({
    name: guide.title,
    link: createLink(`/${guide.url}`)
  }))

  const tokensAndGuidelinesMenu = VisualGuidelinesItems.map(guide => ({
    name: guide.label,
    link: createLink(guide.value)
  }))

  //conditionally render navitems depending on name
  if (name === "Tokens & Guidelines") {
    menuItems = tokensAndGuidelinesMenu
  } else if (name === "Building Blocks" && building_blocks) {
    menuItems = buildingBlocksMenu
  } else if (name === "Getting Started") {
    menuItems = guidesNavItems
  } else if (name === "Design Guidelines") {
    menuItems = designGuidesNavItems
  } else if (name === "What's New") {
    menuItems = whatsNewNavItems
  }

  const handleItemClick = (link, i) => {
    if (beta) {
      if (navigate) {
        navigate(link.link);
      }
    }
    
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
          {...(!beta && { link: link.link })}
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
