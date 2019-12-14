import React from 'react'
import { Nav } from '../../'
import NavItem from '../_item.jsx'

const BlockNav = () => {
  return (
    <Nav
        link='#'
        orientation='vertical'
        title='Title example'
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

export default BlockNav
