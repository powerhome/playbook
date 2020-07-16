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
          <div
              className="pb_nav_list_item_icon_section"
              key={`L-${iconLeft}`}
          >
            <Icon
                className="pb_nav_list_item_icon_left"
                fixedWidth
                icon={iconLeft}
            />
          </div>
        </If>
        <span className="pb_nav_list_item_text">
          {text || children}
        </span>
        <If condition={iconRight}>
          <div
              className="pb_nav_list_item_icon_section"
              key={`R-${iconRight}`}
          >
            <Icon
                className="pb_nav_list_item_icon_right"
                fixedWidth
                icon={iconRight}
            />
          </div>
        </If>
      </Tag>
    </li>
  )
}
export default NavItem
