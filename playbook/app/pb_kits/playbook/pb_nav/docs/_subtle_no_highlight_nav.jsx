import React from 'react'
import { Nav } from '../../'
import NavItem from '../_item.jsx'

const SubtleNoHighlightNav = (props) => {
  return (
    <Nav
        highlight={false}
        variant="subtle"
        {...props}
    >
      <NavItem
          link="#"
          text="Dashboard"
          {...props}
      />
      <NavItem
          active
          link="#"
          text="Statistics"
          {...props}
      />
      <NavItem
          link="#"
          text="Pages"
          {...props}
      />
    </Nav>
  )
}

export default SubtleNoHighlightNav
