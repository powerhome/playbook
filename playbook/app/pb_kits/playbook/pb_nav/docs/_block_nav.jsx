import React from 'react'
import { Nav } from '../../'
import NavItem from '../_item.jsx'

const BlockNav = (props) => {
  return (
    <Nav
        link="#"
        title="Menu"
        {...props}
    >
      <NavItem
          active
          link="#"
          {...props}
      >
        {'Photos'}
      </NavItem>
      <NavItem link="#">{'Music'}</NavItem>
      <NavItem link="#">{'Video'}</NavItem>
      <NavItem link="#">{'Files'}</NavItem>
    </Nav>
  )
}

export default BlockNav
