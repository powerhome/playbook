/* @flow */

import React from 'react'
import classnames from 'classnames'

import {
  buildAriaProps,
  buildDataProps,
  buildCss,
} from '../utilities/props'

type LayoutProps = {
  aria?: object,
  children?: Array<React.ReactChild>,
  collapse?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  dark?: Boolean,
  data?: object,
  full?: Boolean,
  position?: 'left' | 'right',
  size?: 'xs' | 'sm' | 'md' | 'base' | 'lg' | 'xl',
  transparent?: Boolean
}

const Layout = ({
  aria = {},
  children,
  collapse = 'md',
  dark = false,
  data = {},
  full = false,
  position = 'left',
  transparent = false,
  size = 'base',
}: LayoutProps) => {
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)

  const collapseClass = 'layout' + position + '_collapse_' + collapse
  const css = buildCss({
    'pb_layout_kit': true,
    [size]: true,
    [position]: true,
    'dark': dark === true,
    'transparent': transparent === true,
    'full': full === true,
  })

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classnames(css, collapseClass)}
    >
      {children}
    </div>
  )
}

export default Layout
