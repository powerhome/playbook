import React from 'react'
import { Nav } from '../../'
import NavItem from '../_item.jsx'

const DefaultNav = () => (
  <Nav
      link='#'
      orientation='vertical'
      title='Title example'
  >
    <NavItem
        active
        link='#'
        text='Active Nav Item using text prop'
    />
    <NavItem
        link='#'
        text='Nav Item using text prop'
    />
    <NavItem
        link='#'
        text='Nav Item using text prop'
    />
  </Nav>
)

export default DefaultNav
