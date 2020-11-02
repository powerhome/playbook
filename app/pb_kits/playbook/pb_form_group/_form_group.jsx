/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'

type FormGroupProps = {
  aria?: object,
  className?: string,
  data?: object,
  id?: string,
}

const FormGroup = (props: FormGroupProps) => {
  const {
    aria = {},
    className,
    data = {},
    id,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_form_group'), globalProps(props), className)

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      {className}
    </div>
  )
}

export default FormGroup
