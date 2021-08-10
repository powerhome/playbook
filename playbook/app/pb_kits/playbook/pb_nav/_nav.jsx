/* @flow */

import React from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

import Caption from '../pb_caption/_caption'

type NavProps = {
  aria?: object,
  borderless?: boolean,
  children?: React.Node,
  className?: string | array<string>,
  data?: object,
  highlight?: boolean,
  id?: string,
  onClick?: EventHandler,
  orientation?: "vertical" | "horizontal",
  link: SVGFESpecularLightingElement,
  title: string,
  variant?: "normal" | "subtle",
}
const Nav = (props: NavProps) => {
  const {
    aria = {},
    borderless = false,
    children,
    className,
    data = {},
    highlight = true,
    id,
    link = '#',
    onClick = () => {},
    orientation = 'vertical',
    title = '',
    variant = 'normal',
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const cardCss = classnames(
    buildCss('pb_nav_list', variant, orientation, {
      highlight: highlight,
      borderless: borderless,
    }),
    globalProps(props),
    className
  )

  return (
    <nav
        {...ariaProps}
        {...dataProps}
        className={cardCss}
        id={id}
    >
      <If condition={title}>
        <div className="pb_nav_list_title">
          <a
              className="pb_nav_list_item_link_text"
              href={link}
              onClick={onClick}
          >
            <Caption
                size="md"
                text={`${title}`}
            />
          </a>
        </div>
      </If>
      <ul>{children}</ul>
    </nav>
  )
}

export default Nav
