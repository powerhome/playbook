import { useState } from "react";
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
  global_props_and_tokens,
}: any) => {

  const navigate = useNavigate();
  
  const createLink = (path) => {
    if (!path.startsWith("/beta")) {
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

  const globalPropsMenu = global_props_and_tokens?.global_props?.map((item: string) => {
    let displayName = item.replace(/_/g, ' ').replace(/\b\w/g, (char: string) => char.toUpperCase())
    
    const menuItem: any = {
      name: displayName,
      link: createLink(`/global_props/${item}`),
    }
    
    if (item === 'flex_box') {
      menuItem.tag = 'flex_box'
    } else if (item.startsWith('flex_box_')) {
      menuItem.tag = 'flex_box_child'
      // Remove 'Flex Box ' prefix from child items to avoid redundancy
      menuItem.name = displayName.replace(/^Flex Box\s+/, '')
    }
    
    return menuItem
  }).sort((a, b) => a.name.localeCompare(b.name))

  const tokensMenu = global_props_and_tokens?.tokens?.map((item: Record<string, any>) => ({
    name: item.replace(/_/g, ' ').replace(/\b\w/g, (char: string) => char.toUpperCase()),
    link: createLink(`/tokens/${item}`),
  })).sort((a, b) => a.name.localeCompare(b.name))

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
    if (navigate) {
      navigate(link.link);
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

  // flex_box items get special handling
  const flexBoxParent = menuItems.find((item: any) => item?.tag === 'flex_box')
  const flexBoxChildren = menuItems.filter((item: any) => item?.tag === 'flex_box_child')
  const otherItems = menuItems.filter((item: any) => !item?.tag || (item?.tag !== 'flex_box' && item?.tag !== 'flex_box_child'))

  // Create combined list with flex_box 
  const allItemsToRender: any[] = [...otherItems]
  if (flexBoxParent) {
    // Find the correct alphabetical position for flex_box
    const insertIndex = allItemsToRender.findIndex((item: any) => 
      ((item as any).name as string).localeCompare((flexBoxParent as any).name as string) > 0
    )
    const flexBoxWithFlag = { ...(flexBoxParent as any), isFlexBoxParent: true }
    if (insertIndex === -1) {
      allItemsToRender.push(flexBoxWithFlag)
    } else {
      allItemsToRender.splice(insertIndex, 0, flexBoxWithFlag)
    }
  }

  const [flexBoxCollapsed, setFlexBoxCollapsed] = useState(
    !currentURL.startsWith('/global_props/flex_box')
  )

  const handleFlexBoxIconClick = () => {
    setFlexBoxCollapsed(!flexBoxCollapsed)
  }

  const handleFlexBoxClick = (link: any, i: any) => {
    if (navigate) {
      navigate(link.link);
    }
    
    const key = `${link.link}-${i}`
    setIsActive(() => {
      const newIsActive: any = {}
      newIsActive[key] = true
      return newIsActive
    })
    updateTopLevelNav(parentIndex)
    return true
  }

  return (
    <>
      {allItemsToRender.map((link: any, i: number) => {
        if (link.isFlexBoxParent) {
          // Check if we're on a flex_box child page
          const isOnChildPage = flexBoxChildren.some((child: any) => {
            const normalizedCurrentURL = currentURL.replace(/\/(react|rails)$/, '');
            return child.link === currentURL || child.link === normalizedCurrentURL;
          });
          
          // Parent should only be active if we're on the exact flex_box page, not a child
          const isParentActive = !isOnChildPage && (
            currentURL === link.link || 
            currentURL.replace(/\/(react|rails)$/, '') === link.link
          );
          
          return (
            <NavItem
              active={isParentActive}
              collapsed={flexBoxCollapsed}
              collapsible={flexBoxChildren.length > 0}
              collapsibleTrail={flexBoxChildren.length > 0}
              cursor="pointer"
              dark={dark}
              fontSize="small"
              iconRight={flexBoxChildren.length > 0 ? ["plus", "minus"] : undefined}
              key={`${link.link}-flex-box-parent`}
              marginBottom="none"
              marginTop="xxs"
              onClick={() => handleFlexBoxClick(link, i)}
              onIconRightClick={flexBoxChildren.length > 0 ? handleFlexBoxIconClick : undefined}
              paddingY="xxs"
              text={link.name}
            >
              {flexBoxChildren.map((child: any, childIndex: number) => (
                <NavItem
                  active={activeForItems(child, childIndex)}
                  cursor="pointer"
                  dark={dark}
                  fontSize="small"
                  key={`${child.link}-${childIndex}`}
                  marginBottom="none"
                  marginTop="xxs"
                  onClick={() => handleItemClick(child, childIndex)}
                  paddingY="xxs"
                  text={child.name}
                />
              ))}
            </NavItem>
          )
        }
        
        return (
          <NavItem
            active={activeForItems(link, i)}
            cursor="pointer"
            dark={dark}
            fontSize="small"
            key={`${link.link}-${i}`}
            marginBottom="none"
            marginTop="xxs"
            onClick={() => handleItemClick(link, i)}
            paddingY="xxs"
            text={link.name}
          />
        )
      })}
    </>
  )
}
