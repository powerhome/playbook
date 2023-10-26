import React, { useState, useEffect } from "react"
import { NavItem, useCollapsible } from "playbook-ui"
import { KitsNavItem, kitsType } from "./NavComponents/KitsNavComponent"
import { SideBarNavItems } from "./MenuData/SidebarNavItems"
import { OtherNavItems } from "./NavComponents/OtherNavComponent"
import RoutedNavItem from "./RoutedNavItem"
import { useLocation, useParams } from "react-router-dom"

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

  const topLevelCollapsibles = SideBarNavItems.map(() => useCollapsible());

  const handleComponentsClick = (index: any) => {
    topLevelCollapsibles.forEach((collapsible, idx) => {
      collapsible[2](idx === index ? false : true); // Use the setCollapsed function
    });
  };
  // };

  const renderTopItems = (name, key, children, leftIcon, link, i) => {
    const [collapsed, , setCollapsed] = collapsibles[i];

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

    return (
      <RoutedNavItem
        collapsed={collapsed}
        collapsible
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
      </RoutedNavItem>
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
