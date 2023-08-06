import React, {useState} from "react";
import { Nav, NavItem } from '../..'


const CollapsibleNav = (props) => {

  // const [isCollapsed, setIsCollapsed] = useCollapsible(true)
  const [allCollapsed, setAllCollapsed] = useState({})

  const handleMainClick = (e) => {
    const navItemId = e.target.closest('[id^="collapsible-nav-item"]').id; //don't like this at all, using it for testing for now. Better way of getting id needed
    setAllCollapsed(prevState => ({ ...prevState, [navItemId]: !prevState[navItemId] }));
    }

    const getToggleCollapsedValue = (navItemId) => {
      if (navItemId in allCollapsed && allCollapsed[navItemId] === true) {
        return true;
      }
    };

    // const handleButtonClick = () => {
    //   const newAllCollapsed = Object.fromEntries(
    //     Object.keys(allCollapsed).map(navItemId => [navItemId, true])
    //   );
    //   setAllCollapsed(newAllCollapsed);
    // }


  return (
    <>
      {/* <Button onClick={handleButtonClick}>
        {isCollapsed ? "Expand" : "Collapse"}
      </Button> */}

    <Nav variant="subtle">
      <NavItem
          collapsible
          collapsibleClick={(e)=> handleMainClick(e)}
          iconLeft="chevron-down" 
          iconLeftClick={()=> console.log("Left Icon Clicked!")}
          iconRightClick={()=> console.log("Right Icon Clicked!")}
          id="collapsible-nav-item-1"
          link="#" 
          text="Overview" 
          toggleCollapsed={getToggleCollapsedValue("collapsible-nav-item-1")} 
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
          collapsibleClick={(e)=> handleMainClick(e)}
          iconLeft="chevron-down"
          id="collapsible-nav-item-2"
          link="#" 
          text="Albums" 
          toggleCollapsed={getToggleCollapsedValue("collapsible-nav-item-2")}
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
          collapsibleClick={(e)=> handleMainClick(e)}
          iconLeft="chevron-down" 
          id="collapsible-nav-item-3"
          link="#" 
          text="Similar Artists" 
          toggleCollapsed={getToggleCollapsedValue("collapsible-nav-item-1")}
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
