import React from 'react'
import { Nav } from '../../'
import NavItem from '../_item.jsx'

const NewTab = (props) => (
  <Nav
      link="#"
      orientation="vertical"
      title="Popular Websites"
      {...props}
  >
    <NavItem
        link="https://www.google.com/"
        target="_blank"
        text="Google"
        {...props}
    />
    <NavItem
        link="https://www.youtube.com/"
        target="_blank"
        text="YouTube"
        {...props}
    />
    <NavItem
        link="https://www.facebook.com/"
        target="_blank"
        text="Facebook"
        {...props}
    />
    <NavItem
        link="https://www.amazon.com/"
        target="_blank"
        text="Amazon"
        {...props}
    />
  </Nav>
)

export default NewTab
