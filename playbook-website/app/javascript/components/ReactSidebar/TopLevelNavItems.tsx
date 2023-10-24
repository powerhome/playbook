import React, { useState, useEffect } from "react"
import { NavItem, useCollapsible } from "playbook-ui"
import { KitsNavItem, kitsType } from "./NavComponents/KitsNavComponent"
import { SideBarNavItems } from "./MenuData/SidebarNavItems"
import { OtherNavItems } from "./NavComponents/OtherNavComponent"
import RoutedNavItem from "./RoutedNavItem"
import { useLocation } from "react-router-dom"

// const currentURL = window.location.pathname + window.location.search

export const TopLevelNavItem = ({
  dark,
  type,
  isActive,
  setIsActive,
  kits,
  kit,
  category,
  collapsibles,
  samples,
}) => {
  //hook into collapsible logic for top level item
  const topLevelCollapsibles = SideBarNavItems.map(() => useCollapsible())

  //set up toggling for top level item
  const handleComponentsClick = (index) => {
    topLevelCollapsibles.forEach(([, , setCollapsed], idx) => {
      if (idx === index) {
        setCollapsed(false)
      } else {
        setCollapsed(true)
      }
    })
    //return true at end to disable default collapsible behavior
    return true
  }

  //extract render logic out of return for better performance
  const renderTopItems = (name, key, children, leftIcon, link, i) => {
    const [collapsed] = topLevelCollapsibles[i]

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

    return (
      <NavItem
        collapsed={false}
        collapsible={children}
        collapsibleTrail={children}
        cursor='pointer'
        dark={dark}
        fontSize='small'
        fontWeight='bolder'
        iconLeft={leftIcon}
        iconRight={children && ["plus", "minus"]}
        key={key}
        path={link}
        marginY='none'
        // onClick={() => console.log("clicked the main one")}
        onIconRightClick={() => console.log("clicked the right icon")}
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
      </NavItem>
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
