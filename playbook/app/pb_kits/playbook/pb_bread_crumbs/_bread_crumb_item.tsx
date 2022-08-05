/* @flow */

import React from 'react'
import classnames from 'classnames'
import { globalProps, domSafeProps } from '../utilities/globalProps'

import {
  buildAriaProps,
  buildCss,
  buildDataProps,
} from '../utilities/props'

type BreadCrumbItemProps = {
  aria?: {[key: string]: string},
  className?: string,
  data?: object,
  id?: string,
  component?: "a" | "span",
  [x:string]: any;
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
  const Component = component || 'span';
  const css = classnames(
    buildCss('pb_bread_crumb_item_kit'),
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
      <Component
          className="pb_bread_crumb_item"
          {...domSafeProps(rest)}
      />
    </div>
  )
}
export default BreadCrumbItem
