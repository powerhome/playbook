/* @flow */

import React from 'react'
import { components } from 'react-select'

const MenuList = (props: any) => (
  <components.MenuList {...props}>
    {props.children}
  </components.MenuList>
)

export default MenuList
