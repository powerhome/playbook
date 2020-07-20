/* @flow */

import React, { useEffect } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { spacing } from '../utilities/spacing.js'
import flatpickr from 'flatpickr'
import { Caption } from '../'

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

  useEffect(() => {
    flatpickr('#flatpickr', {
      dateFormat: 'm/d/Y',
      defaultDate: Date.now(),
      // prevArrow: '<i class="fa-arrow-circle-left"></i>',
      // nextArrow: '<i class="fa-arrow-right"></i>',
    })
  })

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      {className}
      <Caption
          className="pb_text_input_kit_label"
          text="Date Picker"
      />
      <div className="input_wrapper">
        <input
            id="flatpickr"
        />
      </div>
    </div>
  )
}

export default DatePicker
