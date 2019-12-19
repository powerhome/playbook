/* @flow */

import React from 'react'
import classnames from 'classnames'

import {
  buildAriaProps,
  buildCss,
  buildDataProps,
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
  const classes = classnames(
    buildCss('layout', position, 'collapse', collapse),
    buildCss('pb_layout_kit', size, position, {
      'dark': dark,
      'transparent': transparent,
      'full': full,
    })
  )

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classnames(classes)}
    >
      {children}
    </div>
  )
}

export default Layout
