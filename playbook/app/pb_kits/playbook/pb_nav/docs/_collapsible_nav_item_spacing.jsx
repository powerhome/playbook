import React from "react";
import Nav from '../../pb_nav/_nav'
import NavItem from '../../pb_nav/_item'

const CollapsibleNavItemSpacing = (props) => {
  return (
    <Nav 
        itemSpacing={{padding: "xs", marginY: "none"}}
        variant="bold"
        {...props}
    >
      <NavItem
          active
          collapsible 
          iconLeft="city" 
          link="#" 
          text="Overview" 
          {...props}
      >
        <NavItem
            link="#" 
            paddingY="none"
            text="City"
            {...props}
        />
        <NavItem
            link="#"
            paddingY="none"
            text="People"
            {...props}
        />
        <NavItem 
            link="#" 
            paddingY="none"
            text="Business" 
            {...props}
        />
      </NavItem>
      <NavItem 
          collapsible 
          iconLeft="theater-masks"
          link="#" 
          text="Albums" 
          {...props}
      >
        <NavItem 
            link="#" 
            paddingY="none"
            text="Entertainment" 
            {...props}
        />
        <NavItem 
            link="#" 
            paddingY="none"
            text="Food" 
            {...props}
        />
        <NavItem 
            link="#" 
            paddingY="none"
            text="Style" 
            {...props}
        />
      </NavItem>
      <NavItem 
          collapsible 
          iconLeft="city" 
          link="#" 
          text="Similar Artists" 
          {...props}
      >
        <NavItem 
            link="#" 
            paddingY="none"
            text="City"
            {...props} 
        />
        <NavItem
            link="#"
            paddingY="none"
            text="People"
            {...props}
        />
        <NavItem 
            link="#" 
            paddingY="none"
            text="Business" 
            {...props}
        />
      </NavItem>
    </Nav>
  );
};

export default CollapsibleNavItemSpacing
