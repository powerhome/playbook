import React from 'react'
import { Nav } from '../../'
import NavItem from '../_item.jsx'

const NoHighlightNav = () => {
  return (
    <Nav highlight={false}>
      <NavItem
          active
          link="#"
          text="All Categories"
      />
      <NavItem
          link="#"
          text="Food"
      />
      <NavItem
          link="#"
          text="Digital"
      />
      <NavItem
          link="#"
          text="Design Art"
      />
    </Nav>
  )
}

export default NoHighlightNav
