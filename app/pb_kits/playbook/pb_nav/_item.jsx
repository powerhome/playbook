/* @flow */

import React from 'react'
import classnames from 'classnames'
import { Icon } from '../'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'

type NavItemProps = {
  active?: boolean,
  aria?: object,
  children: React.Node,
  className?: string,
  data?: object,
  iconLeft: string,
  iconRight: string,
  id?: string,
  link: string,
  onClick?: EventHandler,
  text: string,
}

const NavItem = (props: NavItemProps) => {
  const {
    active = false,
    aria = {},
    children,
    className,
    data = {},
    iconLeft,
    iconRight,
    id,
    link,
    onClick = () => {},
    text = '',
  } = props
  const Tag = link ? 'a' : 'div'

  const activeClass = active === true ? 'active' : ''
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_nav_list_kit_item', activeClass), className, globalProps(props))

  return (
    <li
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      <Tag
          className="pb_nav_list_item_link"
          href={link}
          onClick={onClick}
      >
        <If condition={iconLeft}>
          <div
              className="pb_nav_list_item_icon_section"
              key={iconLeft}
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
              key={iconRight}
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
