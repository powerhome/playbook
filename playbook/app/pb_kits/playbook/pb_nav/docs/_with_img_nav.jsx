import React from 'react'

import Nav from '../_nav'
import NavItem from '../_item'

const WithImageNav = (props) => {
  return (
    <Nav
        link="#"
        title="Browse"
        {...props}
    >
      <NavItem
          imageUrl="https://upload.wikimedia.org/wikipedia/commons/0/00/Apple_News_icon_%28macOS%29.png"
          text="News Feed"
          {...props}
      />
      <NavItem
          active
          imageUrl="https://p7.hiclipart.com/preview/928/339/723/messages-iphone-apple-imessage-iphone-thumbnail.jpg"
          link="#"
          text="Messages"
          {...props}
      />
      <NavItem
          iconRight="angle-down"
          imageUrl="https://www.clipartmax.com/png/middle/103-1038653_circle-icons-calendar-svg-event-icon.png"
          link="#"
          text="Events"
          {...props}
      />
      <NavItem
          imageUrl="https://www.pngitem.com/pimgs/m/228-2289227_find-friends-icon-png-image-iphone-find-my.png"
          link="#"
          text="Friends"
          {...props}
      />
      <NavItem
          iconRight="angle-down"
          imageUrl="https://img.favpng.com/18/5/20/blue-human-behavior-silhouette-area-communication-png-favpng-wLT3QYknSwc68uu9GAUHGS5FY_t.jpg"
          link="#"
          text="Groups"
          {...props}
      />
    </Nav>
  )
}

export default WithImageNav
