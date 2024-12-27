import React from 'react'
import { components } from 'react-select'

import { MenuListProps, GroupBase } from 'react-select'


interface ExtendedMenuListProps<Option, IsMulti extends boolean, Group extends GroupBase<Option>> extends MenuListProps<Option, IsMulti, Group> {
  footer?: JSX.Element;
}

const MenuList = (props: ExtendedMenuListProps<unknown, boolean, GroupBase<unknown>>): JSX.Element => {
  return (
  <components.MenuList {...props}>
    {props.children}
    {props.footer}
  </components.MenuList>
)}

export default MenuList
