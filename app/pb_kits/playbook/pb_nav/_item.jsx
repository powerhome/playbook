/* @flow */

import React from 'react'

type NavItemProps = {
  text: String,
  link: String,
  active?: Boolean,
  children: React.Node,
}

const NavItem = ({
  text = '',
  link = '',
  active = false,
  children,
}: NavItemProps) => (
  <li className={`pb_nav_list_border_item${active ? '_active' : ''}`}>
    <a
        className="pb_nav_list_item_link"
        href={link}
    >
      <span className="pb_nav_list_item_text">
        {text || children}
      </span>
    </a>
  </li>
)

export default NavItem
