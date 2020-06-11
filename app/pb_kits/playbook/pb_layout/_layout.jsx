/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'

import { spacing } from '../utilities/spacing.js'

type LayoutPropTypes = {
  aria?: object,
  children?: Array<React.ReactNode> | React.ReactNode,
  className?: String,
  collapse?: "xs" | "sm" | "md" | "lg" | "xl",
  dark?: Boolean,
  data?: object,
  full?: Boolean,
  position?: 'left' | 'right',
  size?: 'xs' | 'sm' | 'md' | 'base' | 'lg' | 'xl',
  variant?: 'light' | 'dark' | 'gradient',
  transparent?: Boolean,
  layout?: 'sidebar' | 'collection',

}

type LayoutSideProps = {
  children: Array<React.ReactNode> | React.ReactNode,
  className?: String,
}

type LayoutBodyProps = {
  children: Array<React.ReactNode> | React.ReactNode,
  className?: String,
}

// Side component
const Side = (props: LayoutSideProps) => {
  const { children, className } = props
  return (
    <div className={classnames('layout_sidebar', className, spacing(props))}>{children}</div>
  )
}

// Body component
const Body = (props: LayoutBodyProps) => {
  const { children, className } = props
  return <div className={classnames('layout_body', className, spacing(props))}>{children}</div>
}

// Main componenet

const Layout = (props: LayoutPropTypes) => {
  const {
    aria = {},
    children,
    className,
    collapse = 'md',
    dark = false,
    data = {},
    full = false,
    position = 'left',
    size = 'md',
    layout = 'sidebar',
    variant = 'light',
    transparent = false,
  } = props
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const layoutCss = buildCss(`pb_layout_kit_${layout}`, `size_${size}`, position, variant, {
    'dark': dark,
    'transparent': transparent,
    'full': full,
  })

  const layoutCollapseCss = buildCss('layout', position, 'collapse', collapse)

  const layoutChildren =
    typeof children === 'object' && children.length ? children : [children]

  const subComponentTags = (tagName) => {
    return layoutChildren
      .filter((c) => {
        return c.type && c.type.displayName === tagName
      })
      .map((child, i) => {
        return React.cloneElement(child, {
          key: `${tagName.toLowerCase()}-${i}`,
        })
      })
  }

  const nonSideChildren = layoutChildren.filter(
    (child) => !child.type || child.type.displayName !== 'Side'
  )

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classnames(
        layoutCss,
        layoutCollapseCss,
        className,
        spacing(props)
      )}
    >
      {subComponentTags('Side')}
      {nonSideChildren}
    </div>
  )
}

Layout.Side = Side
Layout.Body = Body

export default Layout
