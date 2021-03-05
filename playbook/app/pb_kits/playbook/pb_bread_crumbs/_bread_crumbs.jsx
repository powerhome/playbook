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

type BreadCrumbsProps = {
  aria?: object,
  className?: string,
  data?: object,
  id?: string,
  text?: string
}
const BreadCrumbs = (props: BreadCrumbsProps) => {
  const {
    aria = {},
    className,
    data = {},
    id,
    children
  } = props
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const css = classnames(
    buildCss('pb_bread_crumbs_kit'),
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
      {children}
      </div>
  )
}

BreadCrumbs.propTypes = {
  aria: PropTypes.object,
  className: PropTypes.string,
  data: PropTypes.object,
  children: PropTypes.node
}
export default BreadCrumbs
