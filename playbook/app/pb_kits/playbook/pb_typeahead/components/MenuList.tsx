import React from 'react'
import { components } from 'react-select'

type MenuListProps = {
  children: React.ReactNode,
  footer: React.ReactNode,
}

const MenuList = (props: MenuListProps): React.ReactElement => {
  return (
    <components.MenuList {...props}>
      {props.children}
      {props.footer && (
        <div data-footer-wrapper>
          {props.footer}
        </div>
      )}
    </components.MenuList>
  )
}

export default MenuList
