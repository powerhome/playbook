import React from "react";
import { NavItem } from "playbook-ui";
import { useNavigate } from "react-router-dom";

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
  global_props_and_tokens,
}: any) => {
console.log("global_props_and_tokens in OtherNavItems:", global_props_and_tokens);
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

  const globalPropsMenu = global_props_and_tokens?.global_props?.map((item: Record<string, any>) => ({
    name: item.replace(/_/g, ' ').replace(/\b\w/g, (char: string) => char.toUpperCase()),
    link: createLink(`/global_props/${item}`),
  }))

  const tokensMenu = global_props_and_tokens?.tokens?.map((item: Record<string, any>) => ({
    name: item.replace(/_/g, ' ').replace(/\b\w/g, (char: string) => char.toUpperCase()),
    link: createLink(`/tokens/${item}`),
  }))

  //conditionally render navitems depending on name
  if (name === "Global Props") {
    menuItems = globalPropsMenu
  } else if (name === "Tokens") {
    menuItems = tokensMenu
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
      // strip /react or /rails from the end of currentURL before comparing
      const normalizedCurrentURL = currentURL.replace(/\/(react|rails)$/, '');
      return link.link === currentURL || link.link === normalizedCurrentURL
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
