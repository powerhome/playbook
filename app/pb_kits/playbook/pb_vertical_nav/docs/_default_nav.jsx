import React from "react"
import VerticalNav from "../_vertical_nav.jsx"
import VerticalNavItem from "../_item.jsx"

function DefaultNav() {
  return (
    <VerticalNav title="Title Example">
      <VerticalNavItem active text="Active Nav Item" />
      <VerticalNavItem text="Nav Item" />
      <VerticalNavItem text="Nav Item" />
    </VerticalNav>
  )
}

export default DefaultNav;
