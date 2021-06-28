import React from 'react'

import Nav from '../_nav'
import NavItem from '../_item'

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
