import React, {useState, useEffect} from "react";
import { Nav, NavItem, Button, useCollapsible } from '../..'


const CollapsibleNav = (props) => {

  const [isCollapsed, setIsCollapsed] = useCollapsible(true)
  const [allCollapsed, setAllCollapsed] = useState([])
  const [clickedId, setClickedId] = useState("")

  const handleMainClick = (e) => {
    const navItemId = e.target.closest('[id^="collapsible-nav-item"]').id; //don't like this at all, using it for testing for now. Better way of getting id needed
    // setAllCollapsed(prevState => [... prevState, navItemId])
    setAllCollapsed(prevState => {
      if (prevState.includes(navItemId)) {
        return prevState.filter(item => item !== navItemId);
      } else {
        return [...prevState, navItemId];
      }
    });    
    setClickedId(navItemId)
    setIsCollapsed(!isCollapsed)
    }

    useEffect(()=> {
      console.log("Id", clickedId)
      console.log("All Id", allCollapsed)
      console.log("ISCOLLAPSED",isCollapsed)
    },[clickedId])

    const handleClick = (id) => {
      // if (allCollapsed.includes(id)) {
      //   return true
      // }
      if (id === clickedId) {
        return isCollapsed
      }
      // return true
    }


  return (
    <>
      <Button onClick={()=> setIsCollapsed(!isCollapsed)}>
        {isCollapsed ? "Expand" : "Collapse"}
      </Button>

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
          toggleCollapsed={handleClick("collapsible-nav-item-1")}
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
          toggleCollapsed={handleClick("collapsible-nav-item-2")}
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
          toggleCollapsed={handleClick("collapsible-nav-item-3")}
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
