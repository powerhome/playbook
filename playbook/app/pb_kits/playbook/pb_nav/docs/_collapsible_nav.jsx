import React from "react";

import Nav from "../_nav";
import NavItem from "../_item";

const CollapsibleNav = (props) => {
  return (
    <Nav variant="subtle">
      <NavItem
          collapsible 
          link="#" 
          text="Overview" 
          {...props}
      >
        <NavItem
            iconLeft="city" 
            link="#" 
            text="City"
            {...props}
        />
        <NavItem
            iconLeft="user-friends"
            link="#"
            text="People"
            {...props}
        />
        <NavItem 
            iconLeft="user-tie" 
            link="#" 
            text="Business" 
            {...props}
        />
      </NavItem>
      <NavItem 
          active 
          collapsible 
          link="#" 
          text="Albums" 
          {...props}
      >
        <NavItem 
            iconLeft="theater-masks" 
            link="#" 
            text="Entertainment" 
            {...props}
        />
        <NavItem 
            iconLeft="salad" 
            link="#" 
            text="Food" 
            {...props}
        />
        <NavItem 
            iconLeft="sunglasses" 
            link="#" 
            text="Style" 
            {...props}
        />
      </NavItem>
      <NavItem 
          collapsible 
          link="#" 
          text="Similar Artists" 
          {...props}
      >
        <NavItem 
            iconLeft="city" 
            link="#" 
            text="City"
            {...props} 
        />
        <NavItem
            iconLeft="user-friends"
            link="#"
            text="People"
            {...props}
        />
        <NavItem 
            iconLeft="user-tie" 
            link="#" 
            text="Business" 
            {...props}
        />
      </NavItem>
    </Nav>
  );
};

export default CollapsibleNav;
