// @flow

import React from 'react'

import type {
  InputCallback,
} from '../types'

import {
  buildAriaProps,
  buildDataProps,
  buildCss,
  noop,
} from '../utilities/props'

type Props = {
  aria: object,
  checked: boolean,
  data: object,
  onChange: InputCallback,
  onCheck: InputCallback,
  onUncheck: InputCallback,
  size: 'sm' | 'md',
}

const Toggle = ({
  aria = {},
  checked = false,
  data = {},
  onChange = noop,
  onCheck = noop,
  onUncheck = noop,
  size = 'md',
  ...props
}: Props) => {
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const handleChange = (event) => {
    onChange(event)
    event.target.checked ?
      onCheck(event) :
      onUncheck(event)
  }

  const css = buildCss({
    'pb_toggle_kit': true,
    [size]: true,
    'on': checked,
    'off': !checked,
  })

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={css}
    >
      <label className="pb_toggle_wrapper">
        <input
            {...props}
            checked={checked}
            onChange={handleChange}
            type="checkbox"
        />

        <div className="pb_toggle_control" />
      </label>
    </div>
  )
}

export default Toggle
