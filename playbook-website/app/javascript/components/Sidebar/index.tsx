import React from "react";
import {Nav, NavItem, Caption} from 'playbook-ui'

export const MENU_ITEMS = [
  "Colors",
  "Max Width",
  "Position",
  "Z-Index",
  "Line Height",
  "Number Spacing",
  "Shadows",
  "Spacing",
  "Border Radius",
  "Typography",
  "Display",
  "Cursor",
  "Flex Box",
];

const Sidebar = () => {
  
  return (
    <>
    <Caption marginY="md" 
             marginLeft="md" >
      <a style={{color: 'unset'}} href="https://playbook.powerapp.cloud/visual_guidelines">Visual Guidelines</a>
    </Caption>
    <Nav variant="subtle">
        {
            MENU_ITEMS.map(item => (
                <NavItem
                link={`/visual_guidelines/${item.toLowerCase().replace(/[\sA-Z-]+/g, (match) => " ".replace(/[\s-]/g, '_'))}`}
                text={item}
                />
            ))
        }
    </Nav>
    </>
  )
  
};

export default Sidebar;
