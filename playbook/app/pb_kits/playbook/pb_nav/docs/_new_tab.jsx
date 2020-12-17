import React from 'react'
import { Nav } from '../../'
import NavItem from '../_item.jsx'

const NewTab = () => (
  <Nav
      link="#"
      orientation="vertical"
      title="Popular Websites"
  >
    <NavItem
        link="https://www.google.com/"
        target="_blank"
        text="Google"
    />
    <NavItem
        link="https://www.youtube.com/"
        target="_blank"
        text="YouTube"
    />
    <NavItem
        link="https://www.facebook.com/"
        target="_blank"
        text="Facebook"
    />
    <NavItem
        link="https://www.amazon.com/"
        target="_blank"
        text="Amazon"
    />
  </Nav>
)

export default NewTab
