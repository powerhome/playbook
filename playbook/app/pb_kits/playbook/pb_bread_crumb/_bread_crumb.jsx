/* @flow */

import React from 'react'
import classnames from 'classnames'
import { globalProps } from '../utilities/globalProps.js'

import {
  buildAriaProps,
  buildCss,
  buildDataProps,
} from '../utilities/props'

type BreadCrumbProps = {
  aria?: object,
  className?: string,
  data?: object,
  id?: string,
  text?: string
}
const BreadCrumb = (props: BreadCrumbProps) => {
  const {
    aria = {},
    className,
    data = {},
    id,
    text
  } = props
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const css = classnames(
    buildCss('pb_bread_crumb_kit'),
    globalProps(props),
    className
  )

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={css}
        id={id}
    >
      <div><span>Whatttt is a crumb</span></div>
    </div>
  )
}

export default BreadCrumb
