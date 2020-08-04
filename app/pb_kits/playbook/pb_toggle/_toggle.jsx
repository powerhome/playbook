// @flow

import React from 'react'
import classnames from 'classnames'
import type { InputCallback } from '../types'

import {
  buildAriaProps,
  buildCss,
  buildDataProps,
  noop,
} from '../utilities/props'

import { spacing } from '../utilities/spacing.js'

type Props = {
  aria?: object,
  checked?: Boolean,
  children?: React.Node,
  className?: String,
  data?: object,
  id?: String,
  name?: String,
  onChange?: InputCallback<HTMLInputElement>,
  onCheck?: InputCallback<HTMLInputElement>,
  onUncheck?: InputCallback<HTMLInputElement>,
  size?: "sm" | "md",
  value?: String,
}

const Toggle = ({
  aria = {},
  checked = false,
  children,
  className,
  data = {},
  id,
  name,
  onChange = noop,
  onCheck = noop,
  onUncheck = noop,
  size = 'md',
  value,
  ...props
}: Props) => {
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const handleChange = (event) => {
    onChange(event)
    event.target.checked ? onCheck(event) : onUncheck(event)
  }

  const css = classnames(
    buildCss('pb_toggle_kit',
      size,
      {
        on: checked,
        off: !checked,
      }
    ), className,
    spacing(props))

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={css}
        id={id}
    >
      <label className="pb_toggle_wrapper">
        <If condition={children}>
          {children}
          <Else />
          <input
              {...props}
              checked={checked}
              name={name}
              onChange={handleChange}
              type="checkbox"
              value={value}
          />
        </If>
        <div className="pb_toggle_control" />
      </label>
    </div>
  )
}

export default Toggle
