import React from 'react'

import Nav from '../_nav'
import NavItem from '../_item'

const SubtleWithIconsNav = (props) => {
  return (
    <Nav variant="subtle">
      <NavItem
          iconLeft="city"
          link="#"
          text="City"
          {...props}
      />
      <NavItem
          iconLeft="user-friends"
          iconRight="angle-down"
          link="#"
          text="People"
          {...props}
      />
      <NavItem
          active
          iconLeft="user-tie"
          link="#"
          text="Business"
          {...props}
      />
      <NavItem
          iconLeft="theater-masks"
          link="#"
          text="Entertainment"
          {...props}
      />
      <NavItem
          iconLeft="salad"
          iconRight="angle-down"
          link="#"
          text="Food"
          {...props}
      />
      <NavItem
          iconLeft="sunglasses"
          link="#"
          text="Style"
          {...props}
      />
      <NavItem
          iconLeft="child"
          link="#"
          text="Childern"
          {...props}
      />
    </Nav>
  )
}

export default SubtleWithIconsNav
