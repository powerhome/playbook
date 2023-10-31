import React, { useState, useEffect } from "react"
import { linkFormat } from "../../../utilities/website_sidebar_helper"
import RoutedNavItem from "../RoutedNavItem"
import { useParams } from "react-router-dom"

export const KitsNavItem = ({
  link,
  kitIndex,
  collapsibles,
  category,
  dark,
  isActive,
  setIsActive,
  updateTopLevelNav,
  parentIndex,
}) => {
  const { name, type = "react" } = useParams()

  const [collapsed] = collapsibles[kitIndex]

  //make sure kits nav will stay toggled open when nested item is clicked
  const updateKitsNav = (index) => {
    collapsibles.forEach((collapsible, i) => {
      const [, , setCollapsed] = collapsible
      if (i !== index) {
        setCollapsed(true)
      } else {
        setCollapsed(false)
      }
    })
  }

  //click on nested items
  const handleSubItemClick = (subLinkIndex, sublink, Index) => {
    updateTopLevelNav(parentIndex)
    updateKitsNav(Index)
  }

  if (typeof link === "object") {
    const categoryKey = Object.keys(link)[0]
    const sublinks = link[categoryKey]

    //click event for right icon
    const handleComponentsIconClick = (e: any, i: any) => {
      collapsibles.forEach(([collapsed, toggle, setCollapsed], idx) => {
        idx === i ? toggle : null
      })
    }

    const handleMainClick = (event, index) => {
      if (!event || event.target.classList.contains("pb_icon_kit")) {
        return
      }
      collapsibles.forEach(([collapsed, toggle, setCollapsed], idx) => {
        setCollapsed(idx !== index)
      })
    }

    return (
      <RoutedNavItem
        collapsed={collapsed}
        collapsible
        collapsibleTrail
        cursor='pointer'
        dark={dark}
        fontSize='small'
        iconRight={["plus", "minus"]}
        key={`${categoryKey}-${kitIndex}`}
        path={`kit_category/${categoryKey}/${type}`}
        marginBottom='none'
        marginTop='xxs'
        onClick={(event) => handleMainClick(event, kitIndex)}
        onIconRightClick={(e: any) => handleComponentsIconClick(e, kitIndex)}
        paddingY='xxs'
        text={linkFormat(categoryKey)}
      >
        {sublinks.map((sublink, j) => (
          <RoutedNavItem
            cursor='pointer'
            dark={dark}
            fontSize='small'
            reloadDocument={true}
            key={`${sublink}-${j}`}
            path={`/kits/${sublink}/${type}`}
            marginY='none'
            onClick={() => handleSubItemClick(j, sublink, kitIndex)}
            paddingY='xxs'
            text={linkFormat(sublink)}
          />
        ))}
      </RoutedNavItem>
    )
  } else {
    return (
      <RoutedNavItem
        cursor='pointer'
        dark={dark}
        fontSize='small'
        key={`${link}-${kitIndex}`}
        path={`kits/${link}/${type}`}
        marginBottom='none'
        marginTop='xxs'
        onClick={() => updateTopLevelNav(parentIndex)}
        text={linkFormat(link)}
        paddingY='xxs'
      />
    )
  }
}
