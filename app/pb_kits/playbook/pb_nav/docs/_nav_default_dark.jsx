import React from 'react'
import { Nav } from '../../'
import NavItem from '../_item.jsx'

const NavDefaultDark = () => (
  <Nav
      dark
      link="#"
      orientation="vertical"
      title="Menu"
  >
    <NavItem
        dark
        link="#"
        text="Photos"
    />
    <NavItem
        dark
        link="#"
        text="Music"
    />
    <NavItem
        active
        dark
        link="#"
        text="Video"
    />
    <NavItem
        dark
        link="#"
        text="Files"
    />
  </Nav>
)

export default NavDefaultDark
