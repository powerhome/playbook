import React from "react";
import Nav from '../../pb_nav/_nav'
import NavItem from '../../pb_nav/_item'

const CollapsibleNavNoIcon = (props) => {
  return (
    <Nav 
        variant="bold"
        {...props}
    >
      <NavItem
          active
          collapsed={false}
          collapsible 
          iconLeft="city" 
          iconRight="none"
          link="#" 
          text="Overview" 
          {...props}
      >
        <NavItem
            link="#" 
            text="City"
            {...props}
        />
        <NavItem
            link="#"
            text="People"
            {...props}
        />
        <NavItem 
            link="#" 
            text="Business" 
            {...props}
        />
      </NavItem>
      <NavItem 
          collapsible 
          iconLeft="theater-masks"
          iconRight="none"
          link="#" 
          text="Albums" 
          {...props}
      >
        <NavItem 
            link="#" 
            text="Entertainment" 
            {...props}
        />
        <NavItem 
            link="#" 
            text="Food" 
            {...props}
        />
        <NavItem 
            link="#" 
            text="Style" 
            {...props}
        />
      </NavItem>
      <NavItem 
          collapsible 
          iconLeft="city" 
          iconRight="none"
          link="#" 
          text="Similar Artists" 
          {...props}
      >
        <NavItem 
            link="#" 
            text="City"
            {...props} 
        />
        <NavItem
            link="#"
            text="People"
            {...props}
        />
        <NavItem 
            link="#" 
            text="Business" 
            {...props}
        />
      </NavItem>
    </Nav>
  );
};

export default CollapsibleNavNoIcon
