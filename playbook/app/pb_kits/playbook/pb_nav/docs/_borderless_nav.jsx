import React from 'react'

import Nav from '../_nav'
import NavItem from '../_item'

const BorderlessNav = (props) => {
  return (
    <Nav borderless>
      <NavItem
          active
          link="#"
          text="All Categories"
          {...props}
      />
      <NavItem
          link="#"
          text="Food"
          {...props}
      />
      <NavItem
          link="#"
          text="Digital"
          {...props}
      />
      <NavItem
          link="#"
          text="Design Art"
          {...props}
      />
    </Nav>
  )
}

export default BorderlessNav
