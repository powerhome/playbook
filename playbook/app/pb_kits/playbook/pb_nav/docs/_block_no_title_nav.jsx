import React from 'react'
import { Nav } from '../../'
import NavItem from '../_item.jsx'

const BlockNoTitleNav = () => {
  return (
    <Nav>
      <NavItem
          iconLeft="newspaper"
          link="#"
          text="News Feed"
      />
      <NavItem
          active
          iconLeft="comments-alt"
          link="#"
          text="Messages"
      />
      <NavItem
          iconLeft="calendar-check"
          iconRight="angle-down"
          link="#"
          text="Events"
      />
      <NavItem
          iconLeft="calendar-check"
          iconRight="angle-down"
          link="#"
          text="Events"
      />
      <NavItem
          iconLeft="users-class"
          iconRight="angle-down"
          link="#"
          text="Groups"
      />
    </Nav>
  )
}

export default BlockNoTitleNav
