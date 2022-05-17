/* @flow */

import React, { useEffect } from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

import datePickerHelper from './date_picker_helper'

import Icon from '../pb_icon/_icon'
import TextInput from '../pb_text_input/_text_input'

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
  inLine?: Boolean,
  inputAria?: object,
  inputData?: object,
  inputOnChange?: (String) => void,
  inputValue?: any,
  label?: String,
  maxDate: String,
  minDate: String,
  mode?: String,
  name: String,
  onChange: (String) => void,
  pickerId?: String,
  placeholder?: String,
  plugins: Boolean,
  monthSelect?: Boolean,
  weekSelect?: Boolean,
  selectionType?: "month" | "week",
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
    inLine = true,
    inputAria,
    inputData,
    inputOnChange,
    inputValue,
    label = 'Date Picker',
    maxDate,
    minDate,
    mode = 'single',
    name,
    onChange = () => {},
    pickerId,
    placeholder = 'Select Date',
    plugins = false,
    weekSelect = false,
    monthSelect = false,
    selectionType = '',
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
      inLine: inLine,
      maxDate: maxDate,
      minDate: minDate,
      mode: mode,
      onChange: onChange,
      pickerId: pickerId,
      plugins: plugins,
      weekSelect: weekSelect,
      monthSelect: monthSelect,
      selectionType: selectionType,
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
            onChange={inputOnChange}
            placeholder={placeholder}
            value={inputValue}
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

        <If condition={hideIcon && inLine}>
          <div
              className={iconWrapperClass()}
              id={`${pickerId}-icon-plus`}
          >
            <Icon
                className="date-picker-plus-icon"
                icon="plus"
            />
          </div>
          <div
              className={iconWrapperClass()}
              id={`${pickerId}-angle-down`}
          >
            <Icon
                className="angle_down_icon"
                icon="angle-down"
            />
          </div>
        </If>

      </div>
    </div>
  )
}

export default DatePicker
