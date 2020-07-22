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
}

const DatePicker = (props: DatePickerProps) => {
  const {
    aria = {},
    className,
    data = {},
    id,
    mode = 'single',
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_date_picker'), className, spacing(props))

  // document.addEventListener('DOMContentLoaded', () => {
  //   flatpickr(`#${id}`, {
  //     allowInput: true,
  //     dateFormat: 'm/d/Y',
  //     defaultDate: Date.now(),
  //     mode: mode,
  //   })
  //   const picker = document.querySelector(`#${id}`)._flatpickr
  //   debugger
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
    flatpickr(`#${id}`, {
      allowInput: true,
      dateFormat: 'm/d/Y',
      defaultDate: Date.now(),
      mode: mode,
    })
    const picker = document.querySelector(`#${id}`)._flatpickr
    picker.input.addEventListener('input', (e) => {
      picker.input.setAttribute('value', e.target.value)
      const variant = picker.config.mode
      if (variant === 'single' && e.target.value.split('').length === 10) {
        picker.setDate(e.target.value)
      } else if (variant === 'range' && e.target.value.split('').length === 24) {
        picker.setDate(e.target.value)
      }
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
          text="Date Picker"
      />
      <div className="input_wrapper">
        <input
            id={id}
        />
      </div>
    </div>
  )
}

export default DatePicker
