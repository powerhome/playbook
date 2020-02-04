/* @flow */

import React from 'react'
import { Caption } from '../'
import { buildCss } from '../utilities/props'

type NavProps = {
  title: String,
  orientation?: 'vertical' | 'horizontal',
  link: String,
  children?: React.Node,
  className?: String | Array<String>,
  highlight?: Boolean,
  variant?: 'normal' | 'subtle',
  onClick?: EventHandler,
}
const Nav = ({
  title = '',
  orientation = 'vertical',
  link = '',
  children,
  className,
  highlight = true,
  variant = 'normal',
  onClick = () => {},
}: NavProps) => {
  const cardCss = buildCss('pb_nav_list', variant, orientation, className, {
    'highlight': highlight,
  })
  return (
    <div className={cardCss}>
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
