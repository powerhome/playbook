import React from "react";
import Nav from '../../pb_nav/_nav'
import NavItem from '../../pb_nav/_item'

const NavWithFontControl = (props) => {
  return (
    <Nav
        link="#"
        orientation="vertical"
        variant="bold"
        {...props}
    >
        <NavItem
            fontSize="small"
            fontWeight="bolder"            
            link="#"
            text="About"
            {...props}
        />
        <NavItem
            active
            fontSize="small"
            fontWeight="bolder" 
            link="#"
            text="Case Studies"
            {...props}
        />
        <NavItem
            fontSize="small"
            fontWeight="bolder" 
            link="#"
            text="Service"
            {...props}
        />
        <NavItem
            fontSize="small"
            fontWeight="bolder" 
            link="#"
            text="Contacts"
            {...props}
        />
    </Nav>

  );
};

export default NavWithFontControl;
