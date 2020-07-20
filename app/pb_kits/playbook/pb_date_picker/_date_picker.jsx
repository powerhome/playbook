/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { spacing } from '../utilities/spacing.js'

type DatePickerProps = {
  aria?: object,
  className?: String,
  data?: object,
  id?: String,
}

const DatePicker = (props: DatePickerProps) => {
  const {
    aria = {},
    className,
    data = {},
    id,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_date_picker'), className, spacing(props))

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

export default DatePicker
