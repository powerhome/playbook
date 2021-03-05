/* @flow */

import React from 'react'
import PropTypes from 'prop-types';
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
  text?: string
}
const BreadCrumbItem = (props: BreadCrumbItemProps) => {
  const {
    aria = {},
    className,
    data = {},
    id,
    text,
    component = 'a',
    dark,
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
      <Component className="pb_bread_crumb_item" {...rest} />
    </div>
  )
}

BreadCrumbItem.propTypes = {
  aria: PropTypes.object,
  className: PropTypes.string,
  data: PropTypes.object,
  handleClick: PropTypes.func,
  children: PropTypes.node
}
export default BreadCrumbItem
