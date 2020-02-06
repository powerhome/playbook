/* @flow */

import React from 'react'
import { Icon } from '../'

type NavItemProps = {
  text: String,
  link: String,
  iconLeft: String,
  iconRight: String,
  active?: Boolean,
  children: React.Node,
  onClick?: EventHandler,
}

const NavItem = ({
  text = '',
  link,
  active = false,
  iconLeft,
  iconRight,
  children,
  onClick = () => {},
}: NavItemProps) => {
  const Tag = link ? 'a' : 'div'

  return (
    <li className={`pb_nav_list_kit_item${active ? '_active' : ''}`}>
      <Tag
          className="pb_nav_list_item_link"
          href={link}
          onClick={onClick}
      >
        <If condition={iconLeft}>
          <Icon
              className="pb_nav_list_item_icon_left"
              fixedWidth
              icon={iconLeft}
          />
        </If>
        <span className="pb_nav_list_item_text">
          {text || children}
        </span>
        <If condition={iconRight}>
          <Icon
              className="pb_nav_list_item_icon_right"
              fixedWidth
              icon={iconRight}
          />
        </If>
      </Tag>
    </li>
  )
}
export default NavItem
