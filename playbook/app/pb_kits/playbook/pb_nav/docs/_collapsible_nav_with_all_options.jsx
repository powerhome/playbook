import React from "react"
import { Nav, NavItem } from "playbook-ui"

const CollapsibleNavWithAllOptions = (props) => {
  const navItems = ["Overview", "Albums", "Similar Artists"]

  return (
    <>
      <Nav 
          variant="bold" 
          {...props}
      >
        {navItems.map((text, index) => {
          return (
            <NavItem
                collapsible
                collapsibleTrail
                fontWeight="bolder"
                iconLeft="city"
                iconRight={["plus", "minus"]}
                key={index}
                link="#"
                text={text}
                {...props}
            >
              <NavItem 
                  fontSize="small"
                  link="#" 
                  marginY="none"
                  text="City" 
                  {...props} 
              />
              <NavItem 
                  fontSize="small"
                  link="#" 
                  marginY="none"
                  text="People" 
                  {...props} 
              />
              <NavItem
                  fontSize="small"
                  link="#" 
                  marginY="none"
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

export default CollapsibleNavWithAllOptions
