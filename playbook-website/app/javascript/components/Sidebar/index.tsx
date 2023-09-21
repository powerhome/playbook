import React from "react";
import { Nav, NavItem } from 'playbook-ui'

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
  "Hover",
  "Text Align",
  "Overflow"
];

const Sidebar = () => {
  const regex = /(?:(?:[^/]*\/){2})(.*)/;
  return (
    <>
    <Nav variant="subtle">
        {
            MENU_ITEMS.map(item => (
                <NavItem
                active={item.toLowerCase().replace(/[\sA-Z-]+/g, (match) => " ".replace(/[\s-]/g, '_')) == window.location.pathname.match(regex)[1]}
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
