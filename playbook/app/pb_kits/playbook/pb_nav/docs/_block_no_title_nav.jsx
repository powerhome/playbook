import React from 'react'

import Nav from '../_nav'
import NavItem from '../_item'

const BlockNoTitleNav = (props) => {
  return (
    <Nav>
      <NavItem
          iconLeft="newspaper"
          link="#"
          text="News Feed"
          {...props}
      />
      <NavItem
          active
          iconLeft="comments-alt"
          link="#"
          text="Messages"
          {...props}
      />
      <NavItem
          iconLeft="calendar-check"
          iconRight="angle-down"
          link="#"
          text="Events"
          {...props}
      />
      <NavItem
          iconLeft="calendar-check"
          iconRight="angle-down"
          link="#"
          text="Events"
          {...props}
      />
      <NavItem
          iconLeft="users-class"
          iconRight="angle-down"
          link="#"
          text="Groups"
          {...props}
      />
    </Nav>
  )
}

export default BlockNoTitleNav
