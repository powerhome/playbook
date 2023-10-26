import React from "react"
import { NavLink } from "react-router-dom"
import { NavItem } from "playbook-ui"

const RoutedNavItem = ({ text, path, ...props }) => {
  return (
    <NavLink to={path} end>
      {({ isActive }) => <NavItem active={isActive} link={"#"} text={text} {...props} />}
    </NavLink>
  )
}

export default RoutedNavItem
