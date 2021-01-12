import React from 'react'
import { Nav } from '../../'
import NavItem from '../_item.jsx'

const SubtleHorizontalNav = (props) => {
  return (
    <Nav
        link="#"
        orientation="horizontal"
        variant="subtle"
        {...props}
    >
      <NavItem
          link="#"
          text="About"
          {...props}
      />
      <NavItem
          active
          link="#"
          text="Case Studies"
          {...props}
      />
      <NavItem
          link="#"
          text="Service"
          {...props}
      />
      <NavItem
          link="#"
          text="Contacts"
          {...props}
      />
    </Nav>
  )
}

export default SubtleHorizontalNav
