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
  mode?: String,
  pickerId?: String,
}

const DatePicker = (props: DatePickerProps) => {
  const {
    aria = {},
    className,
    data = {},
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

    flatpickr(`#${pickerId}`, {
      allowInput: true,
      dateFormat: 'm/d/Y',
      defaultDate: defaultDateGetter(),
      mode: mode,
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
