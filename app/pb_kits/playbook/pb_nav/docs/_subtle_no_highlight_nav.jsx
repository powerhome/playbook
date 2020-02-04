import React from 'react'
import { Nav } from '../../'
import NavItem from '../_item.jsx'

const SubtleNoHighlightNav = () => {
  return (
    <Nav
        highlight={false}
        variant="subtle"
    >
      <NavItem
          link="#"
          text="Dashboard"
      />
      <NavItem
          active
          link="#"
          text="Statistics"
      />
      <NavItem
          link="#"
          text="Pages"
      />
    </Nav>
  )
}

export default SubtleNoHighlightNav
