import React from "react";
import { Nav, NavItem } from '../..'

const CollapsibleNavEmphasize = (props) => {
  return (
    <Nav 
        variant="subtle"
        {...props}
    >
      <NavItem
          active 
          collapsible
          collapsibleTrail
          fontSize="small"
          fontWeight="bolder"
          iconLeft="city" 
          iconRight={["plus", "minus"]}
          link="#" 
          text="Overview" 
          {...props}
      >
        <NavItem
            fontSize="small"
            link="#" 
            text="City"
            {...props}
        />
        <NavItem
            fontSize="small"
            link="#"
            text="People"
            {...props}
        />
        <NavItem 
            fontSize="small"
            link="#" 
            text="Business" 
            {...props}
        />
      </NavItem>
      <NavItem 
          collapsible 
          collapsibleTrail
          fontSize="small"
          fontWeight="bolder"
          iconLeft="theater-masks"
          iconRight={["plus", "minus"]}
          link="#" 
          text="Albums" 
          {...props}
      >
        <NavItem 
            fontSize="small"
            link="#" 
            text="Entertainment" 
            {...props}
        />
        <NavItem 
            fontSize="small"
            link="#" 
            text="Food" 
            {...props}
        />
        <NavItem 
            fontSize="small"
            link="#" 
            text="Style" 
            {...props}
        />
      </NavItem>
      <NavItem 
          collapsible 
          collapsibleTrail
          fontSize="small"
          fontWeight="bolder"
          iconLeft="city" 
          iconRight={["plus", "minus"]}
          link="#" 
          text="Similar Artists" 
          {...props}
      >
        <NavItem 
            fontSize="small"
            link="#" 
            text="City"
            {...props} 
        />
        <NavItem
            fontSize="small"
            link="#"
            text="People"
            {...props}
        />
        <NavItem 
            fontSize="small"
            link="#" 
            text="Business" 
            {...props}
        />
      </NavItem>
    </Nav>
  );
};

export default CollapsibleNavEmphasize;
