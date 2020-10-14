import React from 'react'
import { Nav } from '../../'
import NavItem from '../_item.jsx'

const WithImageNav = () => {
  return (
    <Nav
        link="#"
        title="Browse"
    >
      <NavItem
          imageUrl="https://upload.wikimedia.org/wikipedia/commons/0/00/Apple_News_icon_%28macOS%29.png"
          text="News Feed"
      />
      <NavItem
          active
          imageUrl="https://p7.hiclipart.com/preview/928/339/723/messages-iphone-apple-imessage-iphone-thumbnail.jpg"
          link="#"
          text="Messages"
      />
      <NavItem
          iconRight="angle-down"
          imageUrl="https://www.clipartmax.com/png/middle/103-1038653_circle-icons-calendar-svg-event-icon.png"
          link="#"
          text="Events"
      />
      <NavItem
          imageUrl="https://www.pngitem.com/pimgs/m/228-2289227_find-friends-icon-png-image-iphone-find-my.png"
          link="#"
          text="Friends"
      />
      <NavItem
          iconRight="angle-down"
          imageUrl="https://img.favpng.com/18/5/20/blue-human-behavior-silhouette-area-communication-png-favpng-wLT3QYknSwc68uu9GAUHGS5FY_t.jpg"
          link="#"
          text="Groups"
      />
    </Nav>
  )
}

export default WithImageNav
