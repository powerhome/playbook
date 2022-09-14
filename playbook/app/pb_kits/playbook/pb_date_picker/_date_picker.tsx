import React, { useEffect } from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { deprecatedProps, globalProps, GlobalProps } from '../utilities/globalProps'

import datePickerHelper from './date_picker_helper'

import Icon from '../pb_icon/_icon'
import TextInput from '../pb_text_input/_text_input'

const DatePicker = (props: GlobalProps) => {
  if (props.plugins) deprecatedProps('Date Picker', ['plugins'])

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
    enableTime = false,
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
    position,
    positionElement,
    scrollContainer,
    selectionType = '',
    showTimezone = false,
    staticPosition = true,
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
      allowInput,
      defaultDate,
      disableDate,
      disableRange,
      disableWeekdays,
      enableTime,
      format,
      hideIcon,
      inLine,
      maxDate,
      minDate,
      mode,
      onChange,
      pickerId,
      plugins,
      position,
      positionElement,
      selectionType,
      showTimezone,
      staticPosition,
      yearRange,
      required: false,
    }, scrollContainer)
  })

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

        {!hideIcon &&
          <div
          className={iconWrapperClass()}
          id={`cal-icon-${pickerId}`}
      >
        <Icon
            className="cal_icon"
            icon="calendar-alt"
        />
      </div>
        }
          

        { hideIcon && inLine ? <><div
          className={iconWrapperClass()}
          id={`${pickerId}-icon-plus`}
        >
          <Icon
            className="date-picker-plus-icon"
            icon="plus" />
        </div><div
          className={iconWrapperClass()}
          id={`${pickerId}-angle-down`}
        >
            <Icon
              className="angle_down_icon"
              icon="angle-down" />
          </div></> : null}
          

      </div>
    </div>
  )
}

export default DatePicker
