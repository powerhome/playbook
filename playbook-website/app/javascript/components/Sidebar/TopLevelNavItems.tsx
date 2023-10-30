import React, { useEffect } from "react"
import { NavItem, useCollapsible } from "playbook-ui"
import { KitsNavItem} from "./NavComponents/KitsNavComponent"
import { SideBarNavItems } from "./MenuData/SidebarNavItems"
import { OtherNavItems } from "./NavComponents/OtherNavComponent"
import RoutedNavItem from "./RoutedNavItem"
import { useLocation, useParams, matchRoutes } from "react-router-dom"

// const currentURL = window.location.pathname + window.location.search

export const TopLevelNavItem = ({
  dark,
  isActive,
  setIsActive,
  kits,
  kit,
  category,
  collapsibles,
  samples,
}) => {
  const { name, type = "react" } = useParams()

  const location = useLocation()
  const topLevelCollapsibles = SideBarNavItems.map(() => useCollapsible())

  

  useEffect(() => {
    const matchedIndex = SideBarNavItems.findIndex((item, index) => {
      if (item.children) {
        // For React routes, we need to handle nested routes
        const currentRoutes = [{ path: `/beta/${item.link}/*` }]
        const match = matchRoutes(currentRoutes, location)
        return match != null
      } else {
        // For Rails routes, match against the pathname directly
        return location.pathname.includes(`/${item.link}`)
      }
    })

    if (matchedIndex !== -1) {
      topLevelCollapsibles[matchedIndex][2](false) // Use the setCollapsed function
    }
  }, [location.pathname, topLevelCollapsibles])
  
  const handleComponentsClick = (index: any) => {
    topLevelCollapsibles.forEach((collapsible, idx) => {
      collapsible[2](idx === index ? false : true) // Use the setCollapsed function
    })
  }

  const renderTopItems = (name, key, children, leftIcon, link, i) => {
    const [collapsed, , setCollapsed] = collapsibles[i]

    //callback function so top level nav item stays toggled opwn if child is clicked
    const updateTopLevelNav = (index) => {
      topLevelCollapsibles.forEach((collapsible, i) => {
        const [, , setCollapsed] = collapsible

        if (i !== index) {
          setCollapsed(true)
        } else {
          setCollapsed(false)
        }
      })
    }

    const handleComponentsIconClick = (i: any) => {
      topLevelCollapsibles.forEach(([collapsed, toggle, setCollapsed], idx) => {
        idx === i ? toggle : null
      })
    }

    const isComponents = name === "Components"
    const Tag = name == "Components" ? RoutedNavItem : NavItem

    return (
      <Tag
        reloadDocument={isComponents ? false : true}
        collapsed={children && collapsed}
        collapsible={children}
        collapsibleTrail={children}
        cursor='pointer'
        dark={dark}
        fontSize='small'
        fontWeight='bolder'
        iconLeft={leftIcon}
        iconRight={children && ["plus", "minus"]}
        key={key}
        path={isComponents ? link : null}
        link={isComponents ? "#" : link}
        marginY='none'
        onClick={() => handleComponentsClick(i)}
        onIconRightClick={children && (() => handleComponentsIconClick(i))}
        paddingY='xxs'
        target={name === "Playground" ? "_blank" : "_self"}
        text={name}
      >
        {children && (
          <>
            {name === "Components" ? (
              <>
                {kits.map((link, index) => (
                  <KitsNavItem
                    link={link}
                    kitIndex={index}
                    collapsibles={collapsibles}
                    category={category}
                    key={index}
                    type={type}
                    dark={dark}
                    kit={kit}
                    isActive={isActive}
                    setIsActive={setIsActive}
                    updateTopLevelNav={updateTopLevelNav}
                    parentIndex={i}
                  />
                ))}
              </>
            ) : (
              <OtherNavItems
                reloadDocument
                name={name}
                dark={dark}
                samples={samples}
                setIsActive={setIsActive}
                updateTopLevelNav={updateTopLevelNav}
                parentIndex={i}
              />
            )}
          </>
        )}
      </Tag>
    )
  }

  return (
    <>
      {SideBarNavItems.map(({ name, key, children, leftIcon, link }, i) => {
        return renderTopItems(name, key, children, leftIcon, link, i)
      })}
    </>
  )
}
