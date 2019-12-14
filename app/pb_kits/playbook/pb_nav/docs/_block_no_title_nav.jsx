import React from 'react'
import { Nav } from '../../'
import NavItem from '../_item.jsx'

const BlockNoTitleNav = () => {
  return (
    <Nav
        link='#'
        orientation='vertical'
    >
      <NavItem
          active
          link='#'
      >
        {'Active Nav Item using text prop'}
      </NavItem>
      <NavItem link='#'>{'Nav Item using text prop'}</NavItem>
      <NavItem link='#'>{'Nav Item using text prop'}</NavItem>
    </Nav>
  )
}

export default BlockNoTitleNav
