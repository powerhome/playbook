import React from 'react'
import { Nav } from '../../'
import NavItem from '../_item.jsx'

const HorizontalNav = () => {
  return (
    <Nav
        link="#"
        orientation="horizontal"
    >
      <NavItem
          link="#"
          text="About"
      />
      <NavItem
          active
          link="#"
          text="Case Studies"
      />
      <NavItem
          link="#"
          text="Service"
      />
      <NavItem
          link="#"
          text="Contacts"
      />
    </Nav>
  )
}

export default HorizontalNav
