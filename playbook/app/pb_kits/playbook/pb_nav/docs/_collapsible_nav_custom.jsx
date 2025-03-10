import React from "react"

import Nav from '../../pb_nav/_nav'
import NavItem from '../../pb_nav/_item'
import useCollapsible from '../../pb_collapsible/useCollapsible'

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

  return (
    <>
      <Nav 
          variant="bold" 
          {...props}
      >
        {navItems.map((text, index) => {
          const [collapsed] = collapsibles[index]
          return (
            <NavItem
                collapsed={collapsed}
                collapsible
                collapsibleTrail
                fontSize="small"
                fontWeight="bolder"
                iconLeft="chevron-down"
                iconRight={["plus", "minus"]}
                id={`collapsible-nav-item-${index + 1}`}
                key={index}
                link="#"
                onClick={() => handleMainClick(index)}
                text={text}
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
