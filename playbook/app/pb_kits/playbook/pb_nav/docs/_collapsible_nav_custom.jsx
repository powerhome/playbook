import React from "react"
import { Nav, NavItem, useCollapsible } from "../.."

const CollapsibleNavCustom = (props) => {
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
    const [isCollapsed, setCollapsed] = collapsibles[index]
    setCollapsed(!isCollapsed)
  }

  return (
    <>
      <Nav variant='subtle'>
        {navItems.map((text, index) => {
          const [collapsed] = collapsibles[index]
          return (
            <NavItem
                collapsible
                collapsibleClick={() => handleMainClick(index)}
                emphasized
                iconLeft="chevron-down"
                iconRightClick={() => handleIconRightClick(index)}
                id={`collapsible-nav-item-${index + 1}`}
                key={index}
                link="#"
                text={text}
                toggleCollapsed={collapsed}
                {...props}
            >
              <NavItem link="#" 
                  text="City" 
                  {...props} 
              />
              <NavItem link="#" 
                  text="People" 
                  {...props} 
              />
              <NavItem link="#" 
                  text="Business" 
                  {...props} 
              />
            </NavItem>
          );
        })}
      </Nav>
    </>
  )
}

export default CollapsibleNavCustom
