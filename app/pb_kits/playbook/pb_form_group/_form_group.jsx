/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'

type FormGroupProps = {
  aria?: object,
  children?: Node,
  className?: string,
  data?: object,
  id?: string
}

const FormGroup = (props: FormGroupProps) => {
  const {
    aria = {},
    className,
    data = {},
    id,
    children,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_form_group_kit'), globalProps(props), className)

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      {children}
    </div>
  )
}

export default FormGroup
