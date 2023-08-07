import React from "react"
import { Nav, NavItem, Button, useCollapsible } from "../.."

const CollapsibleNav = (props) => {
  const navItems = ["Overview", "Albums", "Similar Artists"]
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const collapsibles = navItems.map(() => useCollapsible(true))

  const handleMainClick = (index) => {
    collapsibles.forEach(([, , setCollapsed], idx) => {
      if (idx === index) {
        setCollapsed(false)
      } else {
        setCollapsed(true)
      }
    })
  }

  const handleIconRightClick = (index) => {
    const [toggle] = collapsibles[index]
    toggle()
  }

  return (
    <>
      <Button
          onClick={() => collapsibles.forEach(([toggle]) => toggle())}
      >
        {collapsibles.every(([collapsed]) => collapsed) ? "Expand" : "Collapse"}
      </Button>

      <Nav variant='subtle'>
        {navItems.map((text, index) => {
          const [collapsed] = collapsibles[index]
          return (
            <NavItem
                collapsible
                collapsibleClick={() => handleMainClick(index)}
                iconLeft='chevron-down'
                iconRightClick={() => handleIconRightClick(index)}
                id={`collapsible-nav-item-${index + 1}`}
                key={index}
                link='#'
                text={text}
                toggleCollapsed={collapsed}
                {...props}
            >
              {text}
            </NavItem>
          )
        })}
      </Nav>
    </>
  )
}

export default CollapsibleNav
