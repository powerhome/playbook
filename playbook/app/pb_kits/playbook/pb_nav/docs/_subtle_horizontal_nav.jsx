import React from 'react'
import { Nav } from '../../'
import NavItem from '../_item.jsx'

const SubtleHorizontalNav = () => {
  return (
    <Nav
        link="#"
        orientation="horizontal"
        variant="subtle"
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

export default SubtleHorizontalNav
