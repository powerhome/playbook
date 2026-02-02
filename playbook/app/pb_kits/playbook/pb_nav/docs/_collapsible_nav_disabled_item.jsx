import React from "react";
import Nav from '../../pb_nav/_nav'
import NavItem from '../../pb_nav/_item'

const CollapsibleNavDisabledItem = (props) => {
  return (
    <Nav 
        variant="bold"
        {...props}
    >
      <NavItem
          collapsed={false}
          collapsible
          disabled
          iconLeft="city" 
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
          link="#" 
          text="Albums" 
          {...props}
      >
        <NavItem 
            disabled
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

export default  CollapsibleNavDisabledItem
