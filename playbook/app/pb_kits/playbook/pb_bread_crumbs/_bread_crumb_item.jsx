/* @flow */

import React from 'react'
import classnames from 'classnames'
import { globalProps } from '../utilities/globalProps.js'

import {
  buildAriaProps,
  buildCss,
  buildDataProps,
} from '../utilities/props'

type BreadCrumbItemProps = {
  aria?: object,
  className?: string,
  data?: object,
  id?: string,
  component?: element
}
const BreadCrumbItem = (props: BreadCrumbItemProps) => {
  const {
    aria = {},
    className,
    data = {},
    id,
    component = 'a',
    ...rest
  } = props
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const css = classnames(
    buildCss('pb_bread_crumb_item_kit'),
    globalProps(props),
    className
  )
  const Component = component || 'span'
  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={css}
        id={id}
    >
      <Component
          className="pb_bread_crumb_item"
          {...rest}
      />
    </div>
  )
}
export default BreadCrumbItem
