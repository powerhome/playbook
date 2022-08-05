/* @flow */

import React from 'react'
import classnames from 'classnames'
import { globalProps } from '../utilities/globalProps'

import {
  buildAriaProps,
  buildCss,
  buildDataProps,
} from '../utilities/props'

type BreadCrumbsProps = {
  aria?: {[key: string]: string},
  className?: string,
  data?: object,
  id?: string,
  text?: string,
  children?: React.ReactChild[] | React.ReactNode,
}
const BreadCrumbs = (props: BreadCrumbsProps) => {
  const {
    aria = { label: 'Breadcrumb Navigation' },
    className,
    data = {},
    id,
    children,
  } = props
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const css = classnames(
    buildCss('pb_bread_crumbs_kit'),
    globalProps(props),
    className
  )

  return (
    <nav
        {...ariaProps}
        {...dataProps}
        className={css}
        id={id}
    >
      {children}
    </nav>
  )
}

export default BreadCrumbs
