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

  const { name, type } = useParams()

  const [collapsed] = collapsibles[kitIndex]




  //set up custom toggling
  const handleMainClick = (index, categoryKey) => {
    collapsibles.forEach(([, , setCollapsed], idx) => {
      setIsActive(() => {
        const newIsActive = {}
        newIsActive[`${categoryKey}-${index}`] = true
        return newIsActive
      })
      if (idx === index) {
        setCollapsed(false)
      } else {
        setCollapsed(true)
      }
      updateTopLevelNav(parentIndex)
    })
    //return true at end to disable default collapsible behavior
    return true
  }


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
    setIsActive(() => {
      const newIsActive = {}
      newIsActive[`${sublink}-${subLinkIndex}`] = true
      return newIsActive
    })
    updateTopLevelNav(parentIndex)
    updateKitsNav(Index)
  }

  if (typeof link === "object") {
    const categoryKey = Object.keys(link)[0]
    const sublinks = link[categoryKey]
    const isActiveCategory = isActive[kitIndex]
      ? true
      : Object.keys(isActive).length === 0
      ? category === categoryKey
      : false

    //useState for handling collapsed state
    const [toggleNav, setToggleNav] = useState(false)
    //useEffect to handle toggle to consolidate logic
    useEffect(() => {
      setToggleNav(collapsed)
    }, [collapsed])

    //click event for right icon
    const handleIconClick = (index) => {
      collapsibles.forEach(([, ,], idx) => {
        if (idx === index) {
          toggleNav === true ? setToggleNav(false) : setToggleNav(true)
        }
      })
    }

    return (
      <RoutedNavItem
        collapsed={false}
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
        onClick={() => handleMainClick(kitIndex, categoryKey)}
        onIconRightClick={() => console.log("hello")}
        paddingY='xxs'
        text={linkFormat(categoryKey)}
      >
        {sublinks.map((sublink, j) => (
          <RoutedNavItem
            cursor='pointer'
            dark={dark}
            fontSize='small'
            key={`${sublink}-${j}`}
            path={`kits/${sublink}/${type}`}
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
