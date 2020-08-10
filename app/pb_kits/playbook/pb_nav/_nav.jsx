/* @flow */

import React from 'react'
import classnames from 'classnames'
import { Caption } from '../'
import { buildCss } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'

type NavProps = {
  title: string,
  orientation?: "vertical" | "horizontal",
  link: string,
  children?: React.Node,
  className?: string | array<string>,
  highlight?: boolean,
  variant?: "normal" | "subtle",
  onClick?: EventHandler,
}
const Nav = (props: NavProps) => {
  const {
    title = '',
    orientation = 'vertical',
    link = '',
    children,
    className,
    highlight = true,
    variant = 'normal',
    onClick = () => {},
  } = props
  const cardCss = buildCss('pb_nav_list', variant, orientation, className, {
    highlight: highlight,
  })
  return (
    <div className={classnames(cardCss, globalProps(props))}>
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
    </div>
  )
}

export default Nav
