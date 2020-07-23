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
  disableDate?: Array,
  disableRange?: Array,
  disableWeekdays?: Array,
  format?: String,
  id?: String,
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
    format = 'm/d/Y',
    id,
    mode = 'single',
    pickerId,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_date_picker'), className, spacing(props))

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
    const diasabledDates = (date) => {
      if (disableDate) {
        return disableDate
      } else if (disableRange) {
        return disableRange
      } else if (disableWeekdays) {
        const weekdayObj = {
          Sunday: 0,
          Monday: 1,
          Tuesday: 2,
          Wednesday: 3,
          Thursday: 4,
          Friday: 5,
          Saturday: 6,
        }
        disableWeekdays.forEach((weekday) => {
          return (date.getDay() === weekdayObj[weekday])
        })
      } else {
        return []
      }
    }

    flatpickr(`#${pickerId}`, {
      allowInput: true,
      dateFormat: format,
      defaultDate: defaultDateGetter(),
      disable: diasabledDates(),
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
      </div>
    </div>
  )
}

export default DatePicker
