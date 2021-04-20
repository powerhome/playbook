/* @flow */

import React from 'react'
import classnames from 'classnames'
import { Icon, Image } from '../'
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
  imageUrl: String,
  link: string,
  onClick?: EventHandler,
  target?: '_blank' | '_self' | '_parent' | '_top',
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
    imageUrl,
    link,
    onClick = () => {},
    target = '_self',
    text = '',
  } = props
  const Tag = link ? 'a' : 'div'

  const activeClass = active === true ? 'active' : ''
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_nav_list_kit_item', activeClass), globalProps(props), className)

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
          target={target}
      >
        <If condition={imageUrl}>
          <div
              className="pb_nav_list_item_icon_section"
              key={imageUrl}
          >
            <Image
                className="pb_nav_img_wrapper"
                url={imageUrl}
            />
          </div>
        </If>
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
