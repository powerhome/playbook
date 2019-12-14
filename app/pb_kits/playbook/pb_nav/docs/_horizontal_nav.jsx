import React from 'react'
import { Nav } from '../../'
import NavItem from '../_item.jsx'

const HorizontalNav = () => {
  return (
    <Nav
        link='#'
        orientation='horizontal'
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
}

export default HorizontalNav
