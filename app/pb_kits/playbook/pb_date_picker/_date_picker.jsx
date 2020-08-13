/* @flow */

import React, { useEffect } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'
// import flatpickr from 'flatpickr'
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
  hideLabel?: Boolean,
  id?: String,
  label?: String,
  maxDate: String,
  minDate: String,
  mode?: String,
  name: String,
  onChange: (e) => void,
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
    hideLabel = false,
    id,
    label = 'Date Picker',
    maxDate,
    minDate,
    mode = 'single',
    name,
    onChange,
    pickerId,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(
    buildCss('pb_date_picker_kit'),
    className,
    globalProps(props),
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
      onChange: onChange,
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
      <If condition={!hideLabel}>
        <Caption
            text={label}
        />
      </If>
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
