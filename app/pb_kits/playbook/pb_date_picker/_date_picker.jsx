/* @flow */

import React, { useEffect } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { spacing } from '../utilities/spacing.js'
import flatpickr from 'flatpickr'
import { Body, Caption } from '../'
import datePickerHelper from './date_picker_helper.js'

type DatePickerProps = {
  aria?: object,
  className?: String,
  data?: object,
  defaultDate?: String,
  disableDate?: Array,
  disableRange?: Array,
  disableWeekdays?: Array,
  error?: String,
  format?: String,
  id?: String,
  label?: String,
  maxDate: String,
  minDate: String,
  mode?: String,
  name: String,
  pickerId?: String,
}
const DatePicker = (props: DatePickerProps) => {
  const {
    aria = {},
    className,
    data = {},
    defaultDate = '',
    disableDate = null,
    disableRange = null,
    disableWeekdays = null,
    error,
    format = 'm/d/Y',
    id,
    label = 'Date Picker',
    maxDate,
    minDate,
    mode = 'single',
    name,
    pickerId,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(
    buildCss('pb_date_picker_kit'),
    className,
    spacing(props),
    error ? 'error' : null,
  )

  useEffect(() => {
    datePickerHelper({
      defaultDate: defaultDate,
      disableDate: disableDate,
      disableRange: disableRange,
      disableWeekdays: disableWeekdays,
      format: format,
      maxDate: maxDate,
      minDate: minDate,
      mode: mode,
      pickerId: pickerId,
      propModel: 'React',
    })
  }, [])

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      {className}
      <Caption
          text={label}
      />
      <div className="input_wrapper">
        <input
            autoComplete="off"
            id={pickerId}
            name={name}
        />
        <If condition={error}>
          <Body
              status="negative"
              text={error}
          />
        </If>
      </div>
    </div>
  )
}

export default DatePicker
