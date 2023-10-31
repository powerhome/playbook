import React from "react"
import RoutedNavItem from "../RoutedNavItem"

export const OtherNavItems = ({
  dark,
  setIsActive,
  updateTopLevelNav,
  parentIndex,
  reloadDocument,
  navigation,
}) => {
  const handleItemClick = (link, i) => {
    const key = `${link.page_id}-${i}`
    setIsActive(() => {
      const newIsActive = {}
      newIsActive[key] = true
      return newIsActive
    })
    updateTopLevelNav(parentIndex)
  }

  return (
    <>
      {navigation.pages &&
        navigation.pages.map((page, i) => (
          <RoutedNavItem
            reloadDocument={reloadDocument}
            cursor='pointer'
            dark={dark}
            fontSize='small'
            key={`${page.page_id}-${i}`}
            path={`/` + page.url}
            marginBottom='none'
            marginTop='xxs'
            onClick={() => handleItemClick(page, i)}
            paddingY='xxs'
            text={page.title}
          />
        ))}
    </>
  )
}
