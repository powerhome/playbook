import React from "react";

// import Nav from "../_nav";
// import NavItem from "../_item";
import { Nav, NavItem, useCollapsible, Button } from '../..'


const CollapsibleNav = (props) => {

  const [isCollapsed, setIsCollapsed] = useCollapsible(true)

  return (
    <>
      <Button onClick={()=> setIsCollapsed(!isCollapsed)}>
        {isCollapsed ? "Expand" : "Collapse"}
      </Button>

    <Nav variant="subtle">
      <NavItem
          collapsible
          collapsibleClick={()=> console.log("main click!")}
          iconLeft="chevron-down" 
          iconLeftClick={()=> console.log("Left Icon Clicked!")}
          iconRightClick={()=> console.log("Right Icon Clicked!")}
          id="collapsible-nav-item-1"
          link="#" 
          text="Overview" 
          toggleCollapsed={isCollapsed} 
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
          active 
          collapsible 
          iconLeft="chevron-down"
          id="collapsible-nav-item-2"
          link="#" 
          text="Albums" 
          toggleCollapsed={isCollapsed}
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
          iconLeft="chevron-down" 
          id="collapsible-nav-item-3"
          link="#" 
          text="Similar Artists" 
          toggleCollapsed={isCollapsed}
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
    </>
  );
};

export default CollapsibleNav;
