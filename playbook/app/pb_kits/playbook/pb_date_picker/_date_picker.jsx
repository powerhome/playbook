/* @flow */

import React, { useEffect } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'
import { Icon, TextInput } from '../'
import datePickerHelper from './date_picker_helper.js'

type DatePickerProps = {
  allowInput?: Boolean,
  aria?: object,
  className?: String,
  dark?: Boolean,
  data?: object,
  defaultDate?: String,
  disableDate?: Array,
  disableInput?: Boolean,
  disableRange?: Array,
  disableWeekdays?: Array,
  error?: String,
  format?: String,
  hideIcon?: Boolean,
  hideLabel?: Boolean,
  id?: String,
  inputAria?: object,
  inputData?: object,
  label?: String,
  maxDate: String,
  minDate: String,
  mode?: String,
  name: String,
  onChange: (String) => void,
  pickerId?: String,
  placeholder?: String,
  type?: String,
  yearRange?: Array,
}
const DatePicker = (props: DatePickerProps) => {
  const {
    allowInput = false,
    aria = {},
    className,
    dark = false,
    data = {},
    defaultDate = '',
    disableDate = null,
    disableInput,
    disableRange = null,
    disableWeekdays = null,
    error,
    format = 'm/d/Y',
    hideIcon = false,
    hideLabel = false,
    id,
    inputAria,
    inputData,
    label = 'Date Picker',
    maxDate,
    minDate,
    mode = 'single',
    name,
    onChange = () => {},
    pickerId,
    placeholder = 'Select Date',
    yearRange = [ 1900, 2100 ],
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(
    buildCss('pb_date_picker_kit'),
    globalProps(props),
    error ? 'error' : null,
    className
  )

  useEffect(() => {
    datePickerHelper({
      allowInput: allowInput,
      defaultDate: defaultDate,
      disableDate: disableDate,
      disableRange: disableRange,
      disableWeekdays: disableWeekdays,
      format: format,
      hideIcon: hideIcon,
      maxDate: maxDate,
      minDate: minDate,
      mode: mode,
      onChange: onChange,
      pickerId: pickerId,
      yearRange: yearRange,
    })
  }, [])

  const iconWrapperClass = () => {
    let base = 'cal_icon_wrapper'
    if (dark){
      base += ' dark'
    }
    if (hideLabel){
      base += ' no_label_shift'
    }
    if (error){
      base += ' error'
    }
    return base
  }

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      {className}
      <div className="input_wrapper">
        <TextInput
            aria={inputAria}
            autoComplete="off"
            dark={dark}
            data={inputData}
            disabled={disableInput}
            error={error}
            id={pickerId}
            label={hideLabel ? null : label}
            name={name}
            placeholder={placeholder}
        />
        <If condition={!hideIcon}>
          <div
              className={iconWrapperClass()}
              id={`cal-icon-${pickerId}`}
          >
            <Icon
                className="cal_icon"
                icon="calendar-alt"
            />
          </div>
        </If>
      </div>
    </div>
  )
}

export default DatePicker
