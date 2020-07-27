/* @flow */

import React, { useEffect } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { spacing } from '../utilities/spacing.js'
import flatpickr from 'flatpickr'
import { Body, Caption } from '../'

type DatePickerProps = {
  aria?: object,
  className?: String,
  data?: object,
  disableDate?: Array,
  disableRange?: Array,
  disableWeekdays?: Array,
  error?: String,
  format?: String,
  id?: String,
  maxDate: String,
  minDate: String,
  mode?: String,
  pickerId?: String,
}

const DatePicker = (props: DatePickerProps) => {
  const {
    aria = {},
    className,
    data = {},
    disableDate = null,
    disableRange = null,
    disableWeekdays = null,
    error,
    format = 'm/d/Y',
    id,
    maxDate,
    minDate,
    mode = 'single',
    pickerId,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(
    buildCss('pb_date_picker'),
    className,
    spacing(props),
    error ? 'error' : null,
  )

  // document.addEventListener('DOMContentLoaded', () => {
  //   flatpickr(`#${pickerId}`, {
  //     allowInput: true,
  //     dateFormat: 'm/d/Y',
  //     defaultDate: Date.now(),
  //     mode: mode,
  //   })
  //   // debugger
  //   const picker = document.querySelector(`#${pickerId}`)._flatpickr

  //   picker.input.addEventListener('input', (e) => {
  //     picker.input.setAttribute('value', e.target.value)
  //     const variant = picker.config.mode
  //     if (variant === 'single' && e.target.value.split('').length === 10) {
  //       picker.setDate(e.target.value)
  //     } else if (variant === 'range' && e.target.value.split('').length === 24) {
  //       picker.setDate(e.target.value)
  //     }
  //   })
  // })

  useEffect(() => {
    const defaultDateGetter = () => {
      if (mode === 'single') {
        return new Date()
      } else if (mode === 'range') {
        const today = new Date()
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        return [today, tomorrow]
      }
    }
    const disabledParser = () => {
      if (disableDate) {
        return disableDate
      } else if (disableRange) {
        return disableRange
      } else {
        return []
      }
    }

    flatpickr(`#${pickerId}`, {
      allowInput: true,
      dateFormat: format,
      defaultDate: defaultDateGetter(),
      // disable: [disabledDates()],
      disable: disableWeekdays ? [
        (date) => {
          const weekdayObj = {
            Sunday: 0,
            Monday: 1,
            Tuesday: 2,
            Wednesday: 3,
            Thursday: 4,
            Friday: 5,
            Saturday: 6,
          }
          return (
            // try to refactor with for loop
            date.getDay() === weekdayObj[disableWeekdays[0]] ||
            date.getDay() === weekdayObj[disableWeekdays[1]] ||
            date.getDay() === weekdayObj[disableWeekdays[2]] ||
            date.getDay() === weekdayObj[disableWeekdays[3]] ||
            date.getDay() === weekdayObj[disableWeekdays[4]] ||
            date.getDay() === weekdayObj[disableWeekdays[5]] ||
            date.getDay() === weekdayObj[disableWeekdays[6]]
          )
        },
      ] : disabledParser(),
      maxDate: maxDate,
      minDate: minDate,
      mode: mode,
      static: true,
    })
    // debugger
    const picker = document.querySelector(`#${pickerId}`)._flatpickr

    picker.input.addEventListener('input', (e) => {
      picker.input.setAttribute('value', e.target.value)
      const variant = picker.config.mode
      if (variant === 'single' && e.target.value.split('').length === 10) {
        picker.setDate(e.target.value)
      } else if (variant === 'range' && e.target.value.split('').length === 24) {
        picker.setDate(e.target.value)
      }
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
          text="Date Picker"
      />
      <div className="input_wrapper">
        <input
            autoComplete="off"
            id={pickerId}
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
