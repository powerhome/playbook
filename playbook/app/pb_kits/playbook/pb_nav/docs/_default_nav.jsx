import React from 'react'
import { Nav } from '../../'
import NavItem from '../_item.jsx'

const DefaultNav = () => (
  <Nav
      link="#"
      orientation="vertical"
      title="Menu"
  >
    <NavItem
        link="#"
        text="Photos"
    />
    <NavItem
        link="#"
        text="Music"
    />
    <NavItem
        active
        link="#"
        text="Video"
    />
    <NavItem
        link="#"
        text="Files"
    />
  </Nav>
)

export default DefaultNav
