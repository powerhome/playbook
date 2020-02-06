import React from 'react'
import { Nav } from '../../'
import NavItem from '../_item.jsx'

const SubtleNav = () => {
  return (
    <Nav variant="subtle">
      <NavItem
          link="#"
          text="Overview"
      />
      <NavItem
          active
          link="#"
          text="Albums"
      />
      <NavItem
          link="#"
          text="Similar Artists"
      />
      <NavItem
          link="#"
          text="Events"
      />
      <NavItem
          link="#"
          text="Discography"
      />
      <NavItem
          link="#"
          text="Listeners"
      />
    </Nav>
  )
}

export default SubtleNav
