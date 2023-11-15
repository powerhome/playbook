import React from "react"

import Nav from "../_nav"
import NavItem from "../_item"

const NavWithSpacingControl = props => {
  return (
    <Nav link="#" orientation="vertical" variant="bold" {...props}>
      <NavItem link="#" margin="none" paddingY="xxs" text="About" {...props} />
      <NavItem
        active
        link="#"
        margin="none"
        paddingY="xxs"
        text="Case Studies"
        {...props}
      />
      <NavItem
        link="#"
        margin="none"
        paddingY="xxs"
        text="Service"
        {...props}
      />
      <NavItem
        link="#"
        margin="none"
        paddingY="xxs"
        text="Contacts"
        {...props}
      />
    </Nav>
  )
}

export default NavWithSpacingControl
