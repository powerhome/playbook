import React from 'react'
import { Nav } from '../../'
import NavItem from '../_item.jsx'

const SubtleWithIconsNav = () => {
  return (
    <Nav variant="subtle">
      <NavItem
          iconLeft="city"
          link="#"
          text="City"
      />
      <NavItem
          iconLeft="user-friends"
          iconRight="angle-down"
          link="#"
          text="People"
      />
      <NavItem
          active
          iconLeft="user-tie"
          link="#"
          text="Business"
      />
      <NavItem
          iconLeft="theater-masks"
          link="#"
          text="Entertainment"
      />
      <NavItem
          iconLeft="salad"
          iconRight="angle-down"
          link="#"
          text="Food"
      />
      <NavItem
          iconLeft="sunglasses"
          link="#"
          text="Style"
      />
      <NavItem
          iconLeft="child"
          link="#"
          text="Childern"
      />
    </Nav>
  )
}

export default SubtleWithIconsNav
