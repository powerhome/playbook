import React from 'react'
import { components } from 'react-select'

const MenuList = (props: any): JSX.Element => {
  return (
  <components.MenuList {...props}>
    {props.children}
    {props.footer}
  </components.MenuList>
)}

export default MenuList
