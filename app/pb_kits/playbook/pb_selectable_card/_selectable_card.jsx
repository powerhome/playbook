/* @flow */

import React from 'react'
import classnames from 'classnames'
import { Icon } from '../'

import type { InputCallback } from '../types'

import {
  buildAriaProps,
  buildCss,
  buildDataProps,
  noop,
} from '../utilities/props'

import { globalProps } from '../utilities/globalProps.js'

type SelectableCardProps = {
  aria?: object,
  checked: Boolean,
  children?: Array<React.ReactChild>,
  className?: String,
  data: object,
  disabled?: Boolean,
  icon?: Boolean,
  id?: String,
  inputId?: String,
  multi?: Boolean,
  name?: String,
  onChange: InputCallback<HTMLInputElement>,
  text?: String,
  value?: String,
}

const SelectableCard = ({
  aria = {},
  checked = false,
  children,
  className,
  data = {},
  disabled = false,
  icon = false,
  inputId = null,
  multi = true,
  name,
  onChange = noop,
  text,
  value,
  ...props
}: SelectableCardProps) => {
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)

  const classes = classnames(buildCss('pb_selectable_card_kit',
    { 'checked': checked,
      'disabled': disabled,
      'enabled': !disabled },
    className), globalProps(props))

  const displayIcon = () => {
    if (icon === true) {
      return (
        <div className="pb_selectable_card_circle">
          <Icon
              fixedWidth
              icon="check"
          />
        </div>
      )
    }
  }

  const inputType = multi === false ? 'radio' : 'checkbox'

  const inputIdPresent = inputId !== null ? inputId : name

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
    >
      <input
          {...props}
          checked={checked}
          disabled={disabled}
          id={inputIdPresent}
          name={name}
          onChange={onChange}
          type={inputType}
          value={value}
      />
      <label
          className={globalProps(props)}
          htmlFor={inputIdPresent}
      >
        {text || children}
        {displayIcon()}
      </label>
    </div>
  )
}
export default SelectableCard
