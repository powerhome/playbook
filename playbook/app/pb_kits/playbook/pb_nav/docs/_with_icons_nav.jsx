import React from 'react'

import Nav from '../_nav'
import NavItem from '../_item'

const WithIconsNav = (props) => {
  return (
    <Nav
        link="#"
        title="Browse"
        {...props}
    >
      <NavItem
          iconLeft="newspaper"
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
          iconLeft="users"
          link="#"
          text="Friends"
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

export default WithIconsNav
