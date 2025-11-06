import React from 'react'

import Nav from '../_nav'
import NavItem from '../_item'
import Caption from '../../pb_caption/_caption'

const HorizontalNavDisabled = (props) => {
  return (
    <>
    <Caption marginBottom="sm">Default Variant</Caption>
    <Nav
        link="#"
        orientation="horizontal"
        {...props}
    >
      <NavItem
          link="#"
          text="About"
          {...props}
      />
      <NavItem
          active
          link="#"
          text="Case Studies"
          {...props}
      />
      <NavItem
          disabled
          link="#"
          text="Service"
          {...props}
      />
      <NavItem
          link="#"
          text="Contacts"
          {...props}
      />
      </Nav>
      <Caption  
          marginBottom="sm" 
          marginTop="lg"
      >
        Subtle Variant
      </Caption>
      <Nav
          link="#"
          orientation="horizontal"
          variant="subtle"
          {...props}
      >
        <NavItem
            link="#"
            text="About"
            {...props}
        />
        <NavItem
            active
            link="#"
            text="Case Studies"
            {...props}
        />
        <NavItem
            disabled
            link="#"
            text="Service"
            {...props}
        />
        <NavItem
            link="#"
            text="Contacts"
            {...props}
        />
      </Nav>
      <Caption  
          marginBottom="sm" 
          marginTop="lg"
      >
        Bold Variant
      </Caption>
      <Nav
          link="#"
          orientation="horizontal"
          variant="bold"
          {...props}
      >
        <NavItem
            link="#"
            text="About"
            {...props}
        />
        <NavItem
            active
            link="#"
            text="Case Studies"
            {...props}
        />
        <NavItem
            disabled
            link="#"
            text="Service"
            {...props}
        />
        <NavItem
            link="#"
            text="Contacts"
            {...props}
        />
      </Nav>
    </>
  )
}

export default HorizontalNavDisabled