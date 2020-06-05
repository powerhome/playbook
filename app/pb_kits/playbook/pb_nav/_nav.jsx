/* @flow */

import React from 'react'
import classnames from 'classnames'
import { Caption } from '../'
import { buildCss } from '../utilities/props'
import { spacing } from '../utilities/spacing.js'

type NavProps = {
  title: String,
  orientation?: "vertical" | "horizontal",
  link: String,
  children?: React.Node,
  className?: String | Array<String>,
  highlight?: Boolean,
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
    <div className={classnames(cardCss, spacing(props))}>
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
