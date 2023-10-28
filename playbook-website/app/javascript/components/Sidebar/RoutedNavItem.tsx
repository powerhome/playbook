import React from "react"
import { NavLink } from "react-router-dom"
import { NavItem } from "playbook-ui"

const RoutedNavItem = ({ text, path, reloadDocument, link, ...props }) => {
  return (
    <NavLink to={path} end reloadDocument={reloadDocument}>
      {({ isActive }) => (
        <NavItem link={link} text={text} {...props} />
      )}
    </NavLink>
  )
}

export default RoutedNavItem
